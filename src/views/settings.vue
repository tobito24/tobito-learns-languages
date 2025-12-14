<script setup lang="ts">
import { ref, watch } from 'vue';
import Button from "primevue/button";
import ColorPicker from 'primevue/colorpicker';
import { useI18n } from 'vue-i18n'
import { updatePrimaryPalette, palette, dt } from '@primeuix/themes'
import type { PaletteDesignToken } from '@primeuix/themes/types'
import { setLocale } from '@/translation/main'


const { t } = useI18n()

const initialPrimaryColor = (dt('primary.500', '#56070C', 'value') as string) ?? '#56070C';
const color = ref<string>(initialPrimaryColor);
watch(color, (newColor) => {
    updatePrimaryPalette(palette(newColor) as PaletteDesignToken);
});
function languageSwitch() {
    const newLocale = t('ui.currentLocale') === 'en' ? 'de' : 'en';
    // TODO: setLocale does not yet update the displayed texts immediately
    setLocale(newLocale);
}
</script>

<template>
    <div :class="[
        'flex',
        'flex-col',
        'gap-4',
    ]">
        <p :class="[
            'text-2xl',
            'font-bold',
        ]">
            {{ t('settings.title') }}
        </p>
        <Button :label="t('settings.test')" @click="languageSwitch"/>
        <div :class="[
            'flex',
            'gap-4',
            'items-center',
        ]">
            <p>{{ t('settings.colorPicker') }}</p>
            <ColorPicker v-model="color" inputId="cp-hex" format="hex" />
        </div>
        <p>{{ t('settings.currentColor', { color }) }}</p>
    </div>
</template>
