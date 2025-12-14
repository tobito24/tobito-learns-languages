<script setup lang="ts">
import Button from "primevue/button";

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
                <Button icon="pi pi-home" rounded aria-label="Button Home" />
            </router-link>
            <router-link to="/learn">
                <Button icon="pi pi-id-card" rounded aria-label="Button Learn" />
            </router-link>
            <router-link to="/">
                <Button icon="pi pi-user" rounded disabled aria-label="Button Profile" />
            </router-link>
            <router-link to="/settings">
                <Button icon="pi pi-cog" rounded aria-label="Button Settings" />
            </router-link>
        </div>
    </nav>
</template>