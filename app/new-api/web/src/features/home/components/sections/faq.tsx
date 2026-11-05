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

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Markdown } from '@/components/ui/markdown'
import { useFAQ } from '@/features/dashboard/hooks/use-status-data'
import { useStatus } from '@/hooks/use-status'

import { customerDocsLink } from '../../lib/customer-docs-link'

export function FAQ() {
  const { t } = useTranslation()
  const { items, loading } = useFAQ()
  const { status } = useStatus()
  if (loading || !items.length) return null
  return (
    <section
      aria-labelledby='home-faq'
      className='border-border/40 border-t px-6 py-20 md:py-24'
    >
      <div className='mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1fr_2fr] lg:gap-16'>
        <div>
          <h2
            id='home-faq'
            className='text-2xl font-semibold tracking-tight md:text-3xl'
          >
            {t('FAQ')}
          </h2>
          <p className='text-muted-foreground mt-4 max-w-sm text-sm leading-relaxed'>
            {t('Answers for common access and billing questions')}
          </p>
          <a
            href={customerDocsLink(status?.docs_link, 'help')}
            className='text-primary focus-visible:outline-ring mt-5 inline-flex rounded-sm text-sm font-medium underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4'
          >
            {t('Read the docs')}
          </a>
        </div>
        <Accordion className='w-full'>
          {items.map((item, index) => (
            <AccordionItem
              key={item.id ?? item.question}
              value={`faq-${item.id ?? index}`}
              className='border-border/60'
            >
              <AccordionTrigger className='py-5 text-start text-base hover:no-underline'>
                <span>{t(item.question, { defaultValue: item.question })}</span>
              </AccordionTrigger>
              <AccordionContent className='pb-5'>
                <Markdown className='text-muted-foreground text-sm leading-relaxed'>
                  {t(item.answer, { defaultValue: item.answer })}
                </Markdown>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
