import type { MessageSchema } from './schema'

export const de: MessageSchema = {
  ui: {
    test: 'TEST DE',
    vocabCount: 'Vokabeln: {count}',
    loading: 'Lade Vokabeln…',
    error: 'Fehler: {msg}',
    arrow: '→',
  },
  nav: {
    learn: 'Lernen',
    review: 'Wiederholen',
    settings: 'Einstellungen',
  },
}