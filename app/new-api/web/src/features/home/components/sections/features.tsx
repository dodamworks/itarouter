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
import { useTranslation } from 'react-i18next'

import { AnimateInView } from '@/components/animate-in-view'
import { useStatus } from '@/hooks/use-status'

import { customerDocsLink } from '../../lib/customer-docs-link'

export function Features() {
  const { t } = useTranslation()
  const { status } = useStatus()
  const features = [
    {
      id: 'models',
      title: t('Models'),
      description: t(
        'Check available models, capabilities, and prices before you connect.'
      ),
      guide: 'models',
    },
    {
      id: 'keys',
      title: t('API Keys'),
      description: t(
        'Create a separate key for each app, with its own expiry and spending limit.'
      ),
      guide: 'api-keys',
    },
    {
      id: 'usage',
      title: t('Usage Logs'),
      description: t(
        'Review requests and charges alongside your wallet balance.'
      ),
      guide: 'usage-logs',
    },
  ]
  return (
    <section
      aria-labelledby='home-features'
      className='border-border/40 border-t px-6 py-20 md:py-24'
    >
      <div className='mx-auto max-w-6xl'>
        <h2
          id='home-features'
          className='max-w-2xl text-2xl font-semibold tracking-tight text-balance md:text-3xl'
        >
          {t('Manage your API access in one place.')}
        </h2>
        <AnimateInView
          animation='fade-up'
          className='mt-10 grid gap-8 md:grid-cols-3 md:gap-10'
        >
          {features.map((feature) => (
            <div key={feature.id} className='border-border/60 border-t pt-5'>
              <h3 className='text-base font-semibold'>{feature.title}</h3>
              <p className='text-muted-foreground mt-3 max-w-sm text-sm leading-relaxed text-pretty'>
                {feature.description}
              </p>
              <a
                href={customerDocsLink(status?.docs_link, feature.guide)}
                className='text-primary focus-visible:outline-ring mt-5 inline-flex rounded-sm text-sm font-medium underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4'
              >
                {t('Read the docs')}
                <span className='sr-only'>: {feature.title}</span>
              </a>
            </div>
          ))}
        </AnimateInView>
      </div>
    </section>
  )
}
