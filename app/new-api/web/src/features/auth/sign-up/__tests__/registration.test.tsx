import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import {
  createMemoryHistory,
  createRootRoute,
  createRoute,
  createRouter,
  Outlet,
  RouterProvider,
} from '@tanstack/react-router'
import { act, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, beforeEach, expect, it, vi } from 'vitest'

import { api } from '@/lib/api'

import { registerFormSchema, loginFormSchema } from '../../constants'
import { SignUpForm } from '../components/sign-up-form'

const valid = {
  username: 'test-user',
  password: 'Example1!',
  confirmPassword: 'Example1!',
  email: 'qa@example.com',
}

beforeEach(() => {
  vi.spyOn(window, 'scrollTo').mockImplementation(() => {})
  Object.defineProperty(Element.prototype, 'scrollIntoView', {
    configurable: true,
    value: vi.fn(),
  })
})
afterEach(() => {
  delete window.turnstile
  document.querySelector('#cf-turnstile')?.remove()
  localStorage.clear()
})

it('rejects a 21-character username while accepting the 20-character boundary', () => {
  expect(
    registerFormSchema.safeParse({ ...valid, username: 'a'.repeat(20) }).success
  ).toBe(true)
  expect(
    registerFormSchema.safeParse({ ...valid, username: 'a'.repeat(21) }).success
  ).toBe(false)
})
it.each(['12345678', 'abcdefgh', 'Abcdefg!', 'Abcdefg1', '1234567!'])(
  'rejects signup password %s without all three character types',
  (password) => {
    expect(
      registerFormSchema.safeParse({
        ...valid,
        password,
        confirmPassword: password,
      }).success
    ).toBe(false)
  }
)
it('keeps existing weak-password login compatible', () => {
  expect(
    loginFormSchema.safeParse({ username: 'existing', password: '12345678' })
      .success
  ).toBe(true)
})

async function renderSignup() {
  const callbacks: Record<string, unknown>[] = []
  window.turnstile = {
    render: (_element, options) => {
      callbacks.push(options)
      return String(callbacks.length)
    },
    remove: vi.fn(),
  }
  const client = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  })
  client.setQueryData(['status'], {
    turnstile_check: true,
    turnstile_site_key: 'test-site',
    email_verification: true,
    oauth_register_enabled: false,
  })
  const root = createRootRoute({ component: Outlet })
  const route = createRoute({
    getParentRoute: () => root,
    path: '/sign-up',
    component: SignUpForm,
  })
  const router = createRouter({
    routeTree: root.addChildren([route]),
    history: createMemoryHistory({ initialEntries: ['/sign-up'] }),
  })
  render(
    <QueryClientProvider client={client}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  )
  await screen.findByLabelText('Username')
  await waitFor(() => expect(callbacks.length).toBeGreaterThan(0))
  return { callbacks, user: userEvent.setup() }
}

it.each(['business rejection', 'network failure'])(
  'renews verification after %s and retries without losing form values',
  async (failure) => {
    const post = vi.spyOn(api, 'post')
    if (failure === 'business rejection') {
      post.mockResolvedValue({
        data: {
          success: false,
          message: 'Verification code is incorrect or has expired',
        },
      })
    } else post.mockRejectedValue(new Error('Network unavailable'))
    const { callbacks, user } = await renderSignup()
    await user.type(screen.getByLabelText('Username'), valid.username)
    await user.type(
      screen.getByLabelText('Password', { exact: true }),
      valid.password
    )
    await user.type(screen.getByLabelText('Confirm password'), valid.password)
    await user.type(
      screen.getByLabelText('Email (required for verification)'),
      valid.email
    )
    await user.type(
      screen.getByPlaceholderText('Verification code'),
      'bad-code'
    )
    await act(async () => {
      ;((callbacks.at(-1) ?? {}).callback as (token: string) => void)(
        'first-token'
      )
    })
    const before = callbacks.length
    await user.click(screen.getByRole('button', { name: 'Create account' }))
    await waitFor(() => expect(callbacks.length).toBeGreaterThan(before))
    expect(
      screen.getByRole('button', { name: 'Create account' })
    ).toBeDisabled()
    expect(screen.getByLabelText('Username')).toHaveValue(valid.username)
    expect(screen.getByLabelText('Password', { exact: true })).toHaveValue(
      valid.password
    )
    await act(async () => {
      ;((callbacks.at(-1) ?? {}).callback as (token: string) => void)(
        'fresh-token'
      )
    })
    await user.click(screen.getByRole('button', { name: 'Create account' }))
    await waitFor(() => expect(post).toHaveBeenCalledTimes(2))
    expect(post.mock.calls[1][1]).toMatchObject({
      username: valid.username,
      turnstile: 'fresh-token',
    })
  }
)

it('clears expired verification and disables submission', async () => {
  const { callbacks } = await renderSignup()
  await act(async () => {
    ;((callbacks.at(-1) ?? {}).callback as (token: string) => void)(
      'verified-token'
    )
  })
  expect(screen.getByRole('button', { name: 'Create account' })).toBeEnabled()
  await act(async () => {
    ;((callbacks.at(-1) ?? {})['expired-callback'] as () => void)()
  })
  expect(screen.getByRole('button', { name: 'Create account' })).toBeDisabled()
})

it('shows the username limit on blur before any registration request', async () => {
  const post = vi.spyOn(api, 'post')
  const { user } = await renderSignup()
  expect(screen.getByText('Use no more than 20 characters.')).toBeVisible()
  expect(
    screen.getByText(
      'Use 8–128 characters, including a letter, a number, and a special character.'
    )
  ).toBeVisible()
  await user.type(screen.getByLabelText('Username'), 'a'.repeat(21))
  await user.tab()
  expect(
    await screen.findByText('Username must contain no more than 20 characters.')
  ).toBeVisible()
  expect(screen.getByLabelText('Username')).toHaveAttribute(
    'aria-invalid',
    'true'
  )
  expect(post).not.toHaveBeenCalled()
})

it('renews the challenge after a rejected email-code request without clearing email', async () => {
  vi.spyOn(api, 'get').mockResolvedValue({
    data: { success: false, message: 'Unable to send verification email' },
  })
  const { callbacks, user } = await renderSignup()
  await user.type(
    screen.getByLabelText('Email (required for verification)'),
    valid.email
  )
  await act(async () => {
    ;((callbacks.at(-1) ?? {}).callback as (token: string) => void)(
      'email-token'
    )
  })
  const before = callbacks.length
  await user.click(screen.getByRole('button', { name: 'Send code' }))
  await waitFor(() => expect(callbacks.length).toBeGreaterThan(before))
  expect(screen.getByRole('button', { name: 'Send code' })).toBeDisabled()
  expect(
    screen.getByLabelText('Email (required for verification)')
  ).toHaveValue(valid.email)
  await act(async () => {
    ;((callbacks.at(-1) ?? {}).callback as (token: string) => void)(
      'next-email-token'
    )
  })
  expect(screen.getByRole('button', { name: 'Send code' })).toBeEnabled()
})
