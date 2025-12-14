import type IndexCardLearning from "@/views/index-card-learning.vue"

export type MessageSchema = {
  ui: {
    appTitle: string
    currentLocale: string
  },
  home: {
    welcomeMessage: string
    getStartedMessage: string
    currentVocabCount: string
    loadingVocab: string
    errorLoadingVocab: string
  },
  settings: {
    title: string
    colorPicker: string
    currentColor: string
    test: string
  },
  indexCardLearning: {
    from: string,
    to: string,
    languageOptions: {
      en: string
      de: string
      es: string
    }
  }
}