import { createApp } from 'vue'
import App from './App.vue'
import { i18n } from './translation/main'
import { router } from './router'
import '@/assets/main.css'
import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura';

const app = createApp(App)

app.use(router)
app.use(i18n)
app.use(PrimeVue, {
    theme: {
        preset: Aura
    }
});

app.mount('#app')
