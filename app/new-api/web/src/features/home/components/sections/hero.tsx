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
import { Link } from '@tanstack/react-router'
import { ArrowRight, BookOpen } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { Button } from '@/components/ui/button'
import { useStatus } from '@/hooks/use-status'

import { customerDocsLink } from '../../lib/customer-docs-link'
import { HeroTerminalDemo } from '../hero-terminal-demo'

interface HeroProps {
  className?: string
  isAuthenticated?: boolean
}

export function Hero(props: HeroProps) {
  const { t, i18n } = useTranslation()
  const { status } = useStatus()
  const docsUrl = customerDocsLink(status?.docs_link)

  const renderDocsButton = () => {
    const isExternal = docsUrl.startsWith('http')
    if (isExternal) {
      return (
        <Button
          variant='outline'
          className='group border-border/50 hover:border-border hover:bg-muted/50 inline-flex h-11 items-center gap-1.5 rounded-lg px-5 text-sm font-medium'
          render={
            <a href={docsUrl} target='_blank' rel='noopener noreferrer' />
          }
        >
          <BookOpen className='text-muted-foreground/80 group-hover:text-foreground size-4 transition-colors duration-200' />
          <span>{t('Read the docs')}</span>
        </Button>
      )
    }
    return (
      <Button
        variant='outline'
        className='group border-border/50 hover:border-border hover:bg-muted/50 inline-flex h-11 items-center gap-1.5 rounded-lg px-5 text-sm font-medium'
        render={<Link to={docsUrl} />}
      >
        <BookOpen className='text-muted-foreground/80 group-hover:text-foreground size-4 transition-colors duration-200' />
        <span>{t('Read the docs')}</span>
      </Button>
    )
  }

  return (
    <section
      lang={i18n.resolvedLanguage || i18n.language}
      className='relative z-10 overflow-hidden px-6 pt-24 pb-16 md:pt-32 md:pb-24 lg:pt-36 lg:pb-28'
    >
      <div className='mx-auto grid max-w-6xl grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:items-center lg:gap-8'>
        {/* Left column: product message and existing navigation */}
        <div className='flex flex-col items-start text-left lg:col-span-6'>
          <h1
            lang={i18n.resolvedLanguage || i18n.language}
            className='itarouter-hero-title text-[clamp(2rem,3.8vw,3rem)] leading-[1.15] font-semibold tracking-tight'
          >
            {t('Many AI models.')}{' '}
            <span className='text-primary block'>{t('One API.')}</span>
          </h1>
          <p className='itarouter-hero-copy text-muted-foreground mt-5 max-w-xl text-base leading-relaxed text-pretty md:text-[15px]'>
            {t(
              'Connect your apps to multiple AI models. Manage API keys, credits, and usage in one place.'
            )}
          </p>

          <div className='mt-8 flex flex-wrap items-center gap-3'>
            {props.isAuthenticated ? (
              <>
                <Button
                  className='group h-11 rounded-lg px-5 text-sm font-medium'
                  render={<Link to='/dashboard' />}
                >
                  {t('Open console')}
                  <ArrowRight className='ml-1.5 size-4 transition-transform duration-200' />
                </Button>
                {renderDocsButton()}
              </>
            ) : (
              <>
                <Button
                  className='group h-11 rounded-lg px-5 text-sm font-medium'
                  render={<Link to='/sign-up' />}
                >
                  {t('Create account')}
                  <ArrowRight className='ml-1.5 size-4 transition-transform duration-200' />
                </Button>
                <Button
                  variant='outline'
                  className='border-border/50 hover:border-border hover:bg-muted/50 h-11 rounded-lg px-5 text-sm font-medium'
                  render={<Link to='/pricing' />}
                >
                  {t('Models')}
                </Button>
                {renderDocsButton()}
              </>
            )}
          </div>
          <p className='itarouter-hero-copy text-muted-foreground mt-4 max-w-xl text-xs leading-relaxed'>
            {t('Model access and paid top-ups are not available yet.')}
          </p>
        </div>

        {/* Right Column: Hero Terminal API Demo */}
        <div className='flex w-full justify-center lg:col-span-6'>
          <HeroTerminalDemo className='mt-8 lg:mt-0' />
        </div>
      </div>
    </section>
  )
}
