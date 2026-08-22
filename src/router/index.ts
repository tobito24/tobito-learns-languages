import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/home-view.vue'
import IndexCardLearning from '@/views/index-card-learning.vue'
import Settings from '@/views/settings-view.vue'
import Dice2W6View from '@/views/dice-2W6-view.vue'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: HomeView },
    { path: '/learn', component: IndexCardLearning },
    { path: '/settings', component: Settings },
    { path: '/2w6', component: Dice2W6View },
  ],
})
