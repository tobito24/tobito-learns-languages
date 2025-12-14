<script setup lang="ts">
import { useVocab } from '@/composables/useVocab'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const { vocab, isLoading, error } = useVocab()
</script>

<template>
    <div :class="[
        'flex',
        'flex-col',
        'gap-4',
    ]">
        <p :class="[
            'text-2xl',
            'font-bold',
            'text-surface-950',
        ]">
            {{ t('home.welcomeMessage') }}
        </p>
        <p :class="[
            'text-lg',
            'text-surface-950'
        ]">
            {{ t('home.getStartedMessage') }}
        </p>
        <p v-if="!isLoading" :class="[
            'text-md',
            'text-surface-950'
        ]">
            {{ t('home.currentVocabCount', { count: vocab.length }) }}
        </p>
        <div v-else-if="isLoading && !error" :class="[
            'text-md',
            'text-surface-950'
        ]">
            {{ t('home.loadingVocab') }}
        </div>
        <div v-else-if="error" :class="[
            'text-md',
            'text-surface-950'
        ]">
            {{ t('home.errorLoadingVocab', { msg: error }) }}
        </div>
    </div>
</template>
