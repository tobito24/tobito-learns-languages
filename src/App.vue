<script setup lang="ts">
import TopBar from '@/navigation/top-bar.vue'
import BotBar from '@/navigation/bot-bar.vue'
import { useVocab } from '@/composables/useVocab'

const { loadVocab } = useVocab()

loadVocab();
</script>

<template>
  <div class="bg-primary-100 min-h-screen">
    <header>
      <TopBar />
    </header>

    <main class="p-4" role="main">
      <RouterView />
    </main>

    <footer>
      <BotBar />
    </footer>
  </div>
</template>
