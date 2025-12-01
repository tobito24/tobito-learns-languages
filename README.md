# Tobito Learns Languages

Tobito Learns Languages is a small Vue 3 + TypeScript app to practice vocabulary using external JSON data.

## Tech stack
- Vue 3
- TypeScript
- Vite
- Tailwind CSS

## Setup
```bash
npm install
npm run dev
```

## Vocabulary data
Vocabulary is loaded from an external JSON file defined by `VOCAB_URL` in `src/composables/useVocab.ts`. A local sample of the expected structure is available at `data/example-vocab-en-de.json`.
