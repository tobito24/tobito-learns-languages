import { createI18n } from 'vue-i18n'
import type { MessageSchema } from './schema'
import { en } from './en'
import { de } from './de'

const supported = ['en', 'de'] as const
export type AppLocale = typeof supported[number]
export const supportedLocales = supported

function detectLocale(supportedLocales: readonly AppLocale[], fallback: AppLocale = 'en'): AppLocale {
  const candidates = Array.isArray(navigator.languages) && navigator.languages.length
    ? navigator.languages
    : [navigator.language]

  for (const cand of candidates) {
    if (!cand) continue
    const base = cand.toLowerCase().split('-')[0] as AppLocale
    if (supportedLocales.includes(base)) return base
  }
  return fallback
}

const initialLocale: AppLocale = detectLocale(supported, 'en')

export const i18n = createI18n<[MessageSchema], AppLocale>({
  legacy: false,
  locale: initialLocale,
  fallbackLocale: 'en',
  messages: {
    en,
    de,
  },
})

export function setLocale(locale: AppLocale) {
  i18n.global.locale = locale
}
