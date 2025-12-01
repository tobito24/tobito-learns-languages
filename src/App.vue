<script setup lang="ts">
import { onMounted } from 'vue';
import { useVocab } from './composables/useVocab';

const { vocab, isLoading, error, loadVocab } = useVocab();

onMounted(() => {
  loadVocab();
});
</script>

<template>
  <div class="min-h-screen bg-slate-50 text-slate-900">
    <div
      class="mx-auto flex min-h-screen max-w-4xl flex-col px-4 py-10 sm:px-8 lg:px-10"
    >
      <header class="mb-8 text-center">
        <p class="text-sm font-semibold uppercase tracking-[0.2em] text-sky-600">
          Vocabulary Trainer
        </p>
        <h1 class="mt-2 text-3xl font-bold sm:text-4xl">
          Tobito Learns Languages
        </h1>
        <p class="mt-3 text-base text-slate-600">
          Loads practice words from an external JSON feed.
        </p>
      </header>

      <main class="flex-1">
        <div
          v-if="isLoading"
          class="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
        >
          <p class="text-slate-700">Loading vocabulary...</p>
        </div>

        <div
          v-else-if="error"
          class="rounded-xl border-l-4 border-red-500 bg-red-50 p-6 text-red-800 shadow-sm"
        >
          <p class="font-semibold">Could not load vocabulary</p>
          <p class="mt-1 text-sm">{{ error }}</p>
        </div>

        <div v-else class="space-y-4">
          <p
            v-if="!vocab.length"
            class="rounded-xl border border-slate-200 bg-white p-6 text-slate-600 shadow-sm"
          >
            No vocabulary loaded yet.
          </p>

          <ul v-else class="grid gap-3 sm:grid-cols-2">
            <li
              v-for="item in vocab"
              :key="item.id"
              class="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
            >
              <p class="text-lg font-semibold text-slate-900">{{ item.term }}</p>
              <p class="mt-1 text-slate-600">{{ item.translation }}</p>

              <p
                v-if="item.languageFrom || item.languageTo"
                class="mt-2 text-xs uppercase tracking-wide text-slate-500"
              >
                {{ item.languageFrom ?? 'Source' }} → {{ item.languageTo ?? 'Target' }}
              </p>

              <ul
                v-if="item.examples?.length"
                class="mt-3 space-y-1 text-sm text-slate-700"
              >
                <li v-for="example in item.examples" :key="example" class="flex items-start gap-2">
                  <span class="mt-1 h-1.5 w-1.5 rounded-full bg-sky-500"></span>
                  <span>{{ example }}</span>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </main>
    </div>
  </div>
</template>
