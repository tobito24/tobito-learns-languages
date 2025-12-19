export const supportedLanguages = ['en', 'de'] as const
export const fallbackLocale = 'en'
export type AppLocale = typeof supportedLanguages[number]
export const supportedLocales = supportedLanguages
