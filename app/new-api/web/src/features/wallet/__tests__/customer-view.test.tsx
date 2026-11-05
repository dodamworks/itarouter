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
import { render, screen, waitFor } from '@testing-library/react'
import { expect, it, vi } from 'vitest'

import { api } from '@/lib/api'

import { Wallet } from '../index'

it('shows the customer balance and order entry without offering referrals or requesting a referral code', async () => {
  const requests: string[] = []
  vi.spyOn(api, 'get').mockImplementation(async (url) => {
    requests.push(String(url))
    const responses: Record<string, unknown> = {
      '/api/user/self': {
        id: 1,
        role: 1,
        quota: 0,
        used_quota: 0,
        request_count: 0,
        aff_quota: 0,
        aff_history_quota: 0,
        aff_count: 0,
      },
      '/api/subscription/plans': [],
      '/api/subscription/self': { subscriptions: [], all_subscriptions: [] },
      '/api/user/topup/info': {
        enable_online_topup: false,
        payment_compliance_confirmed: false,
        pay_methods: [],
        amount_options: [],
      },
      '/api/status': {
        system_name: 'ItaRouter',
        quota_per_unit: 500000,
        display_in_currency: true,
      },
    }
    const data = responses[String(url)]
    if (data === undefined) throw new Error(`Unexpected request: ${url}`)
    return { data: { success: true, data } }
  })
  const post = vi
    .spyOn(api, 'post')
    .mockResolvedValue({ data: { success: true, data: 0 } })
  const client = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  })
  const router = createRouter({
    routeTree: createRootRoute({ component: Wallet }),
    history: createMemoryHistory({ initialEntries: ['/'] }),
  })
  await router.load()
  const view = render(
    <QueryClientProvider client={client}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  )
  try {
    await screen.findByRole('button', { name: 'Order History' })
    await screen.findByText(
      'Online topup is not enabled. Please use redemption code or contact administrator.'
    )
    await waitFor(() => expect(requests).toContain('/api/subscription/plans'))
    expect(
      screen.queryByRole('heading', { name: 'Referral Program' })
    ).not.toBeInTheDocument()
    expect(
      screen.queryByRole('button', { name: 'Copy referral link' })
    ).not.toBeInTheDocument()
    expect(requests).not.toContain('/api/user/aff')
    expect(post.mock.calls.map(([url]) => url)).not.toContain(
      '/api/user/aff_transfer'
    )
  } finally {
    view.unmount()
    client.clear()
  }
})
