import { act, render } from '@testing-library/react'
import { afterEach, expect, it, vi } from 'vitest'

import { Turnstile } from '../turnstile'

afterEach(() => {
  delete window.turnstile
  document.querySelector('#cf-turnstile')?.remove()
})

it('removes the widget on unmount and uses the latest callbacks without rerendering it', () => {
  let options: Record<string, unknown> = {}
  const renderWidget = vi.fn((_el, opts) => {
    options = opts
    return 'widget'
  })
  const remove = vi.fn()
  window.turnstile = { render: renderWidget, remove }
  const first = vi.fn(),
    next = vi.fn()
  const view = render(<Turnstile siteKey='test-site' onVerify={first} />)
  view.rerender(<Turnstile siteKey='test-site' onVerify={next} />)
  act(() => {
    ;(options.callback as (value: string) => void)('new-token')
  })
  expect(next).toHaveBeenCalledWith('new-token')
  expect(first).not.toHaveBeenCalled()
  expect(renderWidget).toHaveBeenCalledTimes(1)
  view.unmount()
  expect(remove).toHaveBeenCalledWith('widget')
})

it('renders a remounted widget when an already-present script finishes loading', () => {
  const first = render(<Turnstile siteKey='test-site' onVerify={() => {}} />)
  first.unmount()
  const verify = vi.fn()
  render(<Turnstile siteKey='test-site' onVerify={verify} />)
  let options: Record<string, unknown> = {}
  window.turnstile = {
    render: (_el, opts) => {
      options = opts
      return 'new-widget'
    },
    remove: vi.fn(),
  }
  act(() => {
    document.querySelector('#cf-turnstile')?.dispatchEvent(new Event('load'))
  })
  act(() => {
    ;(options.callback as (value: string) => void)('valid-token')
  })
  expect(verify).toHaveBeenCalledWith('valid-token')
})
