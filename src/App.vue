<script setup lang="ts">
import TopBar from '@/navigation/top-bar.vue'
import BotBar from '@/navigation/bot-bar.vue'
import { useVocab } from '@/composables/useVocab'

const { loadVocab } = useVocab()

loadVocab();
</script>

<template>
  <div class="bg-primary-100 min-h-screen">
    <header class="fixed top-0 left-0 right-0 z-20">
      <TopBar />
    </header>

    <main class="px-4 pt-20 pb-28">
      <RouterView v-slot="{ Component }">
        <Transition name="fade" mode="out-in">
          <component :is="Component" />
        </Transition>
      </RouterView>
    </main>

    <footer class="fixed bottom-0 left-0 right-0 z-20">
      <BotBar />
    </footer>
  </div>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 200ms ease, transform 200ms ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateX(10px);
}
</style>
