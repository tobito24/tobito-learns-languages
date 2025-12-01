import { ref } from 'vue';
import type { VocabItem } from '../types/vocab';

const VOCAB_URL = 'https://example.com/vocab/en-de.json';

export const useVocab = () => {
  const vocab = ref<VocabItem[]>([]);
  const isLoading = ref<boolean>(false);
  const error = ref<string | null>(null);

  const loadVocab = async () => {
    isLoading.value = true;
    error.value = null;

    try {
      const response = await fetch(VOCAB_URL);
      if (!response.ok) {
        throw new Error(`Failed to load vocabulary (${response.status})`);
      }

      const data = await response.json();
      vocab.value = Array.isArray(data) ? (data as VocabItem[]) : [];
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Unknown error occurred while loading vocabulary.';
      vocab.value = [];
    } finally {
      isLoading.value = false;
    }
  };

  return {
    vocab,
    isLoading,
    error,
    loadVocab,
  };
};

export { VOCAB_URL };
