<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import Button from "primevue/button";

const { t } = useI18n()
</script>

<template>
    <nav aria-label="Bottom Navigation" :class="[
        'w-full',
        'px-4',
        'pt-2',
        'pb-4',
        'bg-transparent',
    ]">
        <div :class="[
            'sm:px-8',
            'px-4',
            'py-2',
            'bg-surface-200/80',
            'shadow-2xl',
            'rounded-2xl',
            'h-16',
            'flex',
            'items-center',
            'justify-between',
        ]">
            <!-- with labels -->
            <div class="hidden w-full items-center justify-between sm:flex">
                <router-link to="/">
                    <Button icon="pi pi-home" rounded aria-label="Button Home" :label="t('ui.navigation.home')" />
                </router-link>
                <router-link to="/learn">
                    <Button icon="pi pi-id-card" rounded aria-label="Button Learn" :label="t('ui.navigation.learn')" />
                </router-link>
                <router-link to="/">
                    <Button icon="pi pi-play-circle" rounded disabled aria-label="Button Profile"
                        :label="t('ui.navigation.games')" />
                </router-link>
                <router-link to="/settings">
                    <Button icon="pi pi-cog" rounded aria-label="Button Settings"
                        :label="t('ui.navigation.settings')" />
                </router-link>
            </div>

            <!-- without -->
            <div class="flex w-full items-center justify-between sm:hidden">
                <router-link to="/">
                    <Button icon="pi pi-home" rounded aria-label="Button Home" />
                </router-link>
                <router-link to="/learn">
                    <Button icon="pi pi-id-card" rounded aria-label="Button Learn" />
                </router-link>
                <router-link to="/">
                    <Button icon="pi pi-play-circle" rounded disabled aria-label="Button Profile" />
                </router-link>
                <router-link to="/settings">
                    <Button icon="pi pi-cog" rounded aria-label="Button Settings" />
                </router-link>
            </div>
        </div>
    </nav>
</template>

<style></style>
