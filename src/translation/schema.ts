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
}