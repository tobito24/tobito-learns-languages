import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/home-view.vue'
// import LearnView from '@/views/LearnView.vue'
// import ReviewView from '@/views/ReviewView.vue'
// import SettingsView from '@/views/SettingsView.vue'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: HomeView },
    // { path: '/learn', component: LearnView },
    // { path: '/review', component: ReviewView },
    // { path: '/settings', component: SettingsView },
  ],
})
