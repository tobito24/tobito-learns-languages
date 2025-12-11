<script setup lang="ts">

</script>

<template>
    <nav aria-label="Main navigation" :class="[
        'flex',
        'flex-row',
        'justify-between',
        'items-center',
        'gap-4',
        'p-4',
        'bg-gray-500',
        'shadow-2xl',
        'mb-4',
    ]">
        <router-link to="/">
            <img src="@/img/logo.png" alt="Tobito Learns Languages Logo" :class="[
                'h-10',
                'w-10',
                'rounded-full',
                'shadow-md',
            ]" />
        </router-link>

        <!-- 
        <router-link to="/learn">Lernen</router-link>
        <router-link to="/review">Wiederholen</router-link>
        <router-link to="/settings">Einstellungen</router-link> 
        -->
    </nav>
</template>