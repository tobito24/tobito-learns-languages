export type VocabItem = {
  id: number;
  term: string;
  translation: string;
  languageFrom?: string;
  languageTo?: string;
  examples?: string[];
};
