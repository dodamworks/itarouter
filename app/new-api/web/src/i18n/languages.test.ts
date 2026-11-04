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
import { createInstance } from 'i18next'
import { describe, expect, test } from 'vitest'

import { resources } from './config'
import {
  convertDetectedLanguage,
  normalizeInterfaceLanguage,
  toIntlLocale,
} from './languages'

describe('convertDetectedLanguage', () => {
  test('maps browser BCP-47 Chinese tags onto interface codes', () => {
    expect(convertDetectedLanguage('zh-TW')).toBe('zhTW')
    expect(convertDetectedLanguage('zh-HK')).toBe('zhTW')
    expect(convertDetectedLanguage('zh-MO')).toBe('zhTW')
    expect(convertDetectedLanguage('zh-Hant-TW')).toBe('zhTW')
    expect(convertDetectedLanguage('zh')).toBe('zhCN')
    expect(convertDetectedLanguage('zh-CN')).toBe('zhCN')
    expect(convertDetectedLanguage('zh-Hans')).toBe('zhCN')
  })

  test('keeps already-normalized interface codes stable (localStorage round-trip)', () => {
    // i18next caches `zhTW`/`zhCN` (the supportedLngs codes) to localStorage,
    // and the detector runs this converter on the cached value at every page
    // load — if `zhTW` does not survive the round-trip, a user who picked
    // Traditional Chinese is flipped to Simplified on the next load and the
    // cache is overwritten, making the flip permanent.
    expect(convertDetectedLanguage('zhTW')).toBe('zhTW')
    expect(convertDetectedLanguage('zhCN')).toBe('zhCN')
  })

  test('passes non-Chinese values through unchanged', () => {
    expect(convertDetectedLanguage('en')).toBe('en')
    expect(convertDetectedLanguage('fr-FR')).toBe('fr-FR')
    expect(convertDetectedLanguage('ja')).toBe('ja')
  })
})

describe('Korean interface language', () => {
  test('recognizes browser regional tags and cached Korean selection', () => {
    for (const value of ['ko', 'ko-KR', 'ko_KR', 'KO-kr']) {
      expect(convertDetectedLanguage(value)).toBe('ko')
      expect(normalizeInterfaceLanguage(value)).toBe('ko')
    }
    expect(toIntlLocale('ko')).toBe('ko')
    expect(normalizeInterfaceLanguage('unsupported')).toBe('en')
  })
})

describe('Korean translations', () => {
  test('switches customer navigation and authentication copy, retaining English fallback', async () => {
    const instance = createInstance()
    await instance.init({
      resources,
      lng: 'en',
      fallbackLng: 'en',
      nsSeparator: false,
    })
    expect(instance.t('Home')).toBe('Home')
    await instance.changeLanguage('ko')
    expect(instance.t('Home')).toBe('홈')
    expect(instance.t('Sign in')).toBe('로그인')
    expect(instance.t('Confirm password')).toBe('비밀번호 확인')
    expect(instance.t('Resend ({{seconds}}s)', { seconds: 30 })).toBe(
      '다시 보내기 (30초)'
    )
    expect(instance.t('New API')).toBe('New API')
    await instance.changeLanguage('en')
    expect(instance.t('Home')).toBe('Home')
  })
})

describe('Spanish and Brazilian Portuguese', () => {
  test.each([
    ['es', 'es'],
    ['es-MX', 'es'],
    ['es_ES', 'es'],
    ['pt', 'pt-BR'],
    ['pt-BR', 'pt-BR'],
    ['pt_BR', 'pt-BR'],
    ['PT-br', 'pt-BR'],
  ])(
    'normalizes %s and restores the selected %s interface',
    (input, language) => {
      expect(normalizeInterfaceLanguage(input)).toBe(language)
      expect(convertDetectedLanguage(input)).toBe(language)
      expect(toIntlLocale(language)).toBe(language)
    }
  )

  test.each([
    ['es', 'Inicio', 'Iniciar sesión'],
    ['pt-BR', 'Início', 'Entrar'],
  ])(
    'loads %s customer translations from registered resources',
    async (language, home, signIn) => {
      const instance = createInstance()
      await instance.init({
        resources,
        lng: language,
        fallbackLng: 'en',
        nsSeparator: false,
      })
      expect(instance.t('Home')).toBe(home)
      expect(instance.t('Sign in')).toBe(signIn)
      expect(instance.t('Pay {{amount}}', { amount: '$10.00' })).toContain(
        '$10.00'
      )
      expect(instance.t('New API')).toBe('New API')
      await instance.changeLanguage('en')
      expect(instance.t('Home')).toBe('Home')
    }
  )
})

describe('Translated interpolation contracts', () => {
  test.each(['ko', 'es', 'pt-BR'] as const)(
    'preserves all interpolation variables in %s',
    (language) => {
      const english: Record<string, string> = resources.en.translation
      const translated: Record<string, string> = resources[language].translation
      for (const [key, value] of Object.entries(translated)) {
        const sourceVariables = english[key].match(/{{.*?}}/g) ?? []
        const translatedVariables = value.match(/{{.*?}}/g) ?? []
        expect(translatedVariables.sort(), key).toEqual(sourceVariables.sort())
      }
    }
  )
})
