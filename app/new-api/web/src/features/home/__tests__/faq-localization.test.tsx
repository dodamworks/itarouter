import { fireEvent, render, screen } from '@testing-library/react'
import { createInstance } from 'i18next'
import { I18nextProvider, initReactI18next } from 'react-i18next'
import { expect, it, vi } from 'vitest'

import { FAQ } from '../components/sections/faq'

const fixture = vi.hoisted(() => ({
  items: [
    {
      question: 'Do I need my own provider key?',
      answer:
        'No. Use an ItaRouter-issued API key with your app. Provider channels are managed by ItaRouter.',
    },
    { question: 'Custom operator question', answer: 'Custom operator answer' },
  ],
}))
vi.mock('@/features/dashboard/hooks/use-status-data', () => ({
  useFAQ: () => ({ items: fixture.items, loading: false }),
}))
vi.mock('@/hooks/use-status', () => ({
  useStatus: () => ({ status: { docs_link: 'https://itarouter.com/docs' } }),
}))
const locales = import.meta.glob<{ translation: Record<string, string> }>(
  '../../../i18n/locales/*.json',
  { eager: true, import: 'default' }
)
it.each(['en', 'zh', 'zh-TW', 'fr', 'ja', 'ko', 'pt-BR', 'ru', 'es', 'vi'])(
  'renders configured FAQ in %s and preserves custom content',
  async (locale) => {
    const resource = locales[`../../../i18n/locales/${locale}.json`]
    const i18n = createInstance()
    await i18n
      .use(initReactI18next)
      .init({
        lng: locale,
        fallbackLng: false,
        resources: { [locale]: resource },
        interpolation: { escapeValue: false },
      })
    const view = render(
      <I18nextProvider i18n={i18n}>
        <FAQ />
      </I18nextProvider>
    )
    try {
      const question = resource.translation[fixture.items[0].question]
      const answer = resource.translation[fixture.items[0].answer]
      expect(question).toBeTruthy()
      expect(answer).toBeTruthy()
      fireEvent.click(screen.getByRole('button', { name: question }))
      expect(screen.getByText(answer)).toBeVisible()
      expect(
        screen.getByRole('button', { name: 'Custom operator question' })
      ).toBeVisible()
      expect(
        screen.getByRole('link', { name: i18n.t('Read the docs') })
      ).toHaveAttribute('href', 'https://itarouter.com/docs/help')
    } finally {
      view.unmount()
    }
  }
)
