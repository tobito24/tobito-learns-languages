<script setup lang="ts">
import TopBar from '@/navigation/top-bar.vue'
import { useVocab } from '@/composables/useVocab'

const { loadVocab } = useVocab()

loadVocab();
</script>

<template>
  <div class="app">
    <header>
      <TopBar />
    </header>

    <main class="app-main" role="main">
      <RouterView />
    </main>

    <footer :class="[
      'flex',
      'justify-center',
      'items-center',
      'bg-gray-200',
      'text-gray-600',
      'text-sm',
      'mt-4',
      'p-4',
    ]">
      <small>&copy; 2025 Tobito Learns Languages</small>
    </footer>
  </div>
</template>
