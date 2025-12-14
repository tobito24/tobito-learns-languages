<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import Button from 'primevue/button'
import Select from 'primevue/select';
import { useVocab, type VocabItem } from '@/composables/useVocab'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const { vocab, isLoading, error } = useVocab()

type LangCode = 'en' | 'de' | 'es';

const languageOptions = [
    { label: t('indexCardLearning.languageOptions.en'), value: 'en' as LangCode },
    { label: t('indexCardLearning.languageOptions.de'), value: 'de' as LangCode },
    { label: t('indexCardLearning.languageOptions.es'), value: 'es' as LangCode },
];

const fromLanguage = ref<LangCode>('en');
const toLanguage = ref<LangCode>('es');
const isLanguageIconSwapped = ref(false)


const shuffledVocab = ref<VocabItem[]>([]);
const currentIndex = ref(0);
const isFlipped = ref(false);

const hasCards = computed(() => !isLoading.value && !error.value && shuffledVocab.value.length > 0)

const currentItem = computed(() => {
    if (!hasCards.value) return null
    return shuffledVocab.value[currentIndex.value] ?? null
})

function shuffle(list: VocabItem[]): VocabItem[] {
    const arr = [...list]
    for (let i = arr.length - 1; i > 0; i -= 1) {
        const j = Math.floor(Math.random() * (i + 1))
            ;[arr[i]!, arr[j]!] = [arr[j]!, arr[i]!]
    }
    return arr
}

watch(
    vocab,
    (newVocab) => {
        shuffledVocab.value = shuffle(newVocab)
        currentIndex.value = 0
        isFlipped.value = false
    },
    { immediate: true },
)

function swapLanguages() {
    const from = fromLanguage.value
    fromLanguage.value = toLanguage.value
    toLanguage.value = from
    isFlipped.value = false
    isLanguageIconSwapped.value = !isLanguageIconSwapped.value
}

function nextCard() {
    if (!hasCards.value) return
    currentIndex.value = (currentIndex.value + 1) % shuffledVocab.value.length
    isFlipped.value = false
}

function toggleFlip() {
    if (!hasCards.value) return
    isFlipped.value = !isFlipped.value
}
</script>

<template>
    <div :class="[
        'flex',
        'flex-col',
        'gap-4',
        'items-center',
    ]">
        <div :class="[
            'flex',
            'items-center',
            'justify-center',
            'gap-4',
            'w-full'
        ]">
            <div>
                <p :class="[
                    'text-md',
                    'text-surface-700'
                ]">{{ t('indexCardLearning.from') }}</p>
                <Select v-model="fromLanguage" :options="languageOptions" option-label="label" option-value="value"
                    class="w-[200px]" />
            </div>
            <div :class="[
                'transition-transform', 'duration-300', isLanguageIconSwapped ? 'rotate-180' : 'rotate-0', 'self-end'
            ]">
                <Button icon="pi pi-arrow-right-arrow-left" severity="secondary" rounded @click="swapLanguages" />
            </div>
            <div>
                <p :class="[
                    'text-md',
                    'text-surface-700'
                ]">{{ t('indexCardLearning.to') }}</p>
                <Select v-model="toLanguage" :options="languageOptions" option-label="label" option-value="value"
                    class="w-[200px]" />
            </div>
        </div>

        <div>{{ vocab.length }} cards</div>

        <div v-if="isLoading">
            Loading cards...
        </div>
        <div v-else-if="error">
            Error loading cards: {{ error }}
        </div>

        <div v-else-if="hasCards" :class="['flex', 'flex-col', 'items-center', 'gap-4']">
            <div :class="[
                'w-full',
                'max-w-md',
                'h-48',
                'flex',
                'items-center',
                'justify-center',
                'rounded-2xl',
                'bg-surface-100',
                'border',
                'border-surface-300',
                'shadow-sm',
                'cursor-pointer',
                'select-none',
                'transition-transform',
                'hover:shadow-md',
            ]" @click="toggleFlip">
                <p :class="[
                    'text-2xl',
                    'font-semibold',
                    'text-center',
                    'px-4',
                ]">
                    <span v-if="currentItem && !isFlipped">
                        {{ currentItem.translations[fromLanguage].text }}
                    </span>
                    <span v-else-if="currentItem && isFlipped">
                        {{ currentItem.translations[toLanguage].text }}
                    </span>
                </p>
            </div>

            <div :class="['flex', 'items-center', 'justify-between', 'w-full', 'max-w-md']">
                <span>
                    {{ currentIndex + 1 }} / {{ shuffledVocab.length }}
                </span>
                <Button label="Next" icon="pi pi-arrow-right" icon-pos="right" @click="nextCard" />
            </div>
        </div>

        <div v-else>
            No cards available.
        </div>
    </div>
</template>
