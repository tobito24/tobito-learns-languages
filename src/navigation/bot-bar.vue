<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import Button from "primevue/button";

const { t } = useI18n()
</script>

<template>
    <nav aria-label="Bottom Navigation" :class="[
        'fixed',
        'bottom-0',
        'left-0',
        'right-0',
        'w-full',
        'z-1000',
        'p-2',
    ]">
        <div :class="[
            'flex',
            'flex-row',
            'justify-between',
            'items-center',
            'px-8',
            'py-4',
            'bg-surface-200',
            'shadow-2xl',
            'rounded-2xl',
            'h-16',
        ]">
            <router-link to="/">
                <Button icon="pi pi-home" rounded aria-label="Button Home" :label="t('ui.navigation.home')" class="hidden md:inline" />
            </router-link>
            <router-link to="/learn">
                <Button icon="pi pi-id-card" rounded aria-label="Button Learn" :label="t('ui.navigation.learn')" />
            </router-link>
            <router-link to="/">
                <Button icon="pi pi-play-circle" rounded disabled aria-label="Button Profile"
                    :label="t('ui.navigation.games')" />
            </router-link>
            <router-link to="/settings">
                <Button icon="pi pi-cog" rounded aria-label="Button Settings" :label="t('ui.navigation.settings')" />
            </router-link>
        </div>
    </nav>
</template>