/*
Copyright (C) 2023-2026 QuantumNous

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program. If not, see <https://www.gnu.org/licenses/>.

For commercial licensing, please contact support@quantumnous.com
*/
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import {
  createMemoryHistory,
  createRootRoute,
  createRouter,
  RouterProvider,
} from '@tanstack/react-router'
import { act, fireEvent, render, screen } from '@testing-library/react'
import { createInstance } from 'i18next'
import { I18nextProvider, initReactI18next } from 'react-i18next'
import { expect, it, vi } from 'vitest'

import en from '@/i18n/locales/en.json'
import ko from '@/i18n/locales/ko.json'
import { api } from '@/lib/api'

import { Hero } from '../components/sections/hero'

it.each([
  ['en', 'Many AI models. One API.'],
  ['ko', '다양한 AI 모델을 하나의 API로.'],
])(
  'keeps the %s headline continuous and removes the decorative badge while retaining navigation',
  async (language, title) => {
    vi.spyOn(api, 'get').mockResolvedValue({
      data: { success: true, data: { docs_link: '/about' } },
    })
    const i18n = createInstance()
    await i18n.use(initReactI18next).init({
      lng: language,
      fallbackLng: false,
      resources: { en, ko },
      interpolation: { escapeValue: false },
    })
    const client = new QueryClient({
      defaultOptions: { queries: { retry: false } },
    })
    const router = createRouter({
      routeTree: createRootRoute({ component: Hero }),
      history: createMemoryHistory({ initialEntries: ['/'] }),
    })
    await router.load()
    const view = render(
      <I18nextProvider i18n={i18n}>
        <QueryClientProvider client={client}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </I18nextProvider>
    )
    try {
      const heading = await screen.findByRole('heading', {
        level: 1,
        name: title,
      })
      expect(heading).toHaveAttribute('lang', language)
      expect(heading.parentElement?.parentElement).toHaveClass(
        'lg:items-center'
      )
      expect(
        screen.getByText(
          i18n.t('Model access and paid top-ups are not available yet.')
        )
      ).toBeVisible()
      const claude = screen.getByRole('button', { name: 'Claude' })
      fireEvent.click(claude)
      expect(claude).toHaveAttribute('aria-pressed', 'true')
      vi.useFakeTimers()
      act(() => vi.advanceTimersByTime(10_000))
      expect(claude).toHaveAttribute('aria-pressed', 'true')
      vi.useRealTimers()
      expect(heading.querySelector('br')).toBeNull()
      expect(view.container.querySelector('.animate-ping')).toBeNull()
      expect(screen.queryByText('Cherry Studio')).not.toBeInTheDocument()
      expect(screen.queryByText('CC Switch')).not.toBeInTheDocument()
      expect(
        screen.queryByText(i18n.t('Supported Applications'))
      ).not.toBeInTheDocument()
      expect(heading.querySelector('span')).toHaveClass('block')
      expect(
        screen.queryByText(i18n.t('AI Application Infrastructure Foundation'))
      ).not.toBeInTheDocument()
      expect(
        screen.getByRole('button', { name: i18n.t('Create account') })
      ).toHaveAttribute('href', '/sign-up')
    } finally {
      vi.useRealTimers()
      view.unmount()
      client.clear()
      vi.restoreAllMocks()
    }
  }
)
