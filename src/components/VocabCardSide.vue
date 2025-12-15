<script setup lang="ts">
import Tag from 'primevue/tag'
import type { VocabTranslation } from '@/composables/useVocab'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const props = defineProps<{
  label: string
  translation: VocabTranslation
}>()
</script>

<template>
  <div :class="['p-4', 'text-left', 'space-y-4', 'max-w-full', 'whitespace-normal', 'wrap-break-word']">
    <p :class="['text-sm', 'font-semibold', 'uppercase', 'text-surface-500']">
      {{ props.label }}
    </p>
    <p :class="['text-xl', 'font-bold', 'mt-1', 'text-surface-950']">
      {{ props.translation.text }}
    </p>
    <p v-if="props.translation.phonetic" :class="['text-sm', 'text-surface-500', 'mt-1']">
      /{{ props.translation.phonetic }}/
    </p>
    <div v-if="props.translation.synonyms?.length" :class="['mt-2']">
      <p :class="['text-sm', 'font-semibold', 'text-surface-950']">
        {{ t('components.vocabCard.synonymsLabel') }}
      </p>
      <div :class="['flex', 'flex-wrap', 'gap-2', 'mt-1']">
        <Tag v-for="syn in props.translation.synonyms" :key="syn" :value="syn" rounded />
      </div>
    </div>
    <div v-if="props.translation.examples?.length" :class="['mt-2']">
      <p :class="['text-sm', 'font-semibold', 'text-surface-950']">
        {{ t('components.vocabCard.examplesLabel') }}
      </p>
      <ul :class="['list-disc', 'list-inside', 'text-sm', 'mt-1', 'text-surface-950']">
        <li v-for="ex in props.translation.examples" :key="ex">
          {{ ex }}
        </li>
      </ul>
    </div>
  </div>
</template>
