<script setup lang="ts">
import { ref } from "vue";
import Button from "primevue/button";
import Menu from "primevue/menu";
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const items = [
    {
        label: t('ui.navigation.home'),
        icon: 'pi pi-home',
        to: '/',
    },
    {
        label: t('ui.navigation.learn'),
        icon: 'pi pi-id-card',
        to: '/learn',
    },
    {
        label: t('ui.navigation.games'),
        icon: 'pi pi-play-circle',
        disabled: true,
    },
    {
        label: t('ui.navigation.settings'),
        icon: 'pi pi-cog',
        to: '/settings',
    },
];

const menu = ref();
function toggle(event: Event) {
    menu.value?.toggle(event);
}
</script>

<template>
    <nav aria-label="Top Navigation" :class="[
        'flex',
        'flex-row',
        'justify-between',
        'items-center',
        'gap-4',
        'p-4',
        'bg-surface-200',
        'shadow-2xl',
    ]">
        <router-link to="/">
            <img src="@/img/logo.png" alt="Tobito Learns Languages Logo" :class="[
                'h-10',
                'w-10',
                'rounded-full',
                'shadow-xs',
            ]" />
        </router-link>

        <p :class="[
            'text-primary',
            'font-bold',
            'text-lg',
        ]">
            {{ t('ui.appTitle') }}
        </p>

        <Button icon="pi pi-bars" rounded aria-label="Menu" @click="toggle" aria-haspopup="true"
            aria-controls="overlay_menu" />
        <Menu ref="menu" id="overlay_menu" :model="items" :popup="true" appendTo="body">
            <template #item="{ item, props }">
                <router-link v-if="item.to" v-slot="{ href, navigate }" :to="item.to" custom>
                    <a v-ripple :href="href" v-bind="props.action" @click="navigate">
                        <span :class="item.icon" class="text-primary" />
                        <span class="ml-2">{{ item.label }}</span>
                    </a>
                </router-link>
            </template>
        </Menu>
    </nav>
</template>