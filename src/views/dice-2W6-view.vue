<script setup lang="ts">
import { computed, ref } from 'vue';

import Column from 'primevue/column';
import DataTable from 'primevue/datatable';
import Divider from 'primevue/divider';
import InputNumber from 'primevue/inputnumber';

interface ExactProbability {
    target: number;
    combinations: number;
    probability: number;
}

interface Probability {
    target: number;
    probability: number;
}

interface BoosterProbability {
    target: number;
    baseProbability: number;
    boostedProbability: number;
    improvement: number;
    relativeImprovement: number | null;
}

const MIN_ROLL = 2;
const MAX_ROLL = 12;
const TOTAL_COMBINATIONS = 36;

const booster = ref(2);

const combinationsByRoll: Record<number, number> = {
    2: 1,
    3: 2,
    4: 3,
    5: 4,
    6: 5,
    7: 6,
    8: 5,
    9: 4,
    10: 3,
    11: 2,
    12: 1,
};

const rolls = Array.from(
    { length: MAX_ROLL - MIN_ROLL + 1 },
    (_, index) => index + MIN_ROLL,
);

const exactProbabilities = computed<ExactProbability[]>(() =>
    rolls.map((target) => {
        const combinations = combinationsByRoll[target];

        return {
            target,
            combinations,
            probability: combinations / TOTAL_COMBINATIONS,
        };
    }),
);

const getMinimumProbability = (target: number): number => {
    if (target <= MIN_ROLL) {
        return 1;
    }

    if (target > MAX_ROLL) {
        return 0;
    }

    const combinations = rolls
        .filter((roll) => roll >= target)
        .reduce((sum, roll) => sum + combinationsByRoll[roll], 0);

    return combinations / TOTAL_COMBINATIONS;
};

const getMaximumProbability = (target: number): number => {
    if (target < MIN_ROLL) {
        return 0;
    }

    if (target >= MAX_ROLL) {
        return 1;
    }

    const combinations = rolls
        .filter((roll) => roll <= target)
        .reduce((sum, roll) => sum + combinationsByRoll[roll], 0);

    return combinations / TOTAL_COMBINATIONS;
};

const minimumProbabilities = computed<Probability[]>(() =>
    rolls.map((target) => ({
        target,
        probability: getMinimumProbability(target),
    })),
);

const maximumProbabilities = computed<Probability[]>(() =>
    rolls.map((target) => ({
        target,
        probability: getMaximumProbability(target),
    })),
);

const boosterProbabilities = computed<BoosterProbability[]>(() =>
    rolls.map((target) => {
        const baseProbability = getMinimumProbability(target);

        // Example:
        // target 9 with +2 means the dice only need to roll 7 or higher.
        const requiredDiceRoll = target - booster.value;

        const boostedProbability = getMinimumProbability(requiredDiceRoll);
        const improvement = boostedProbability - baseProbability;

        const relativeImprovement =
            baseProbability === 0
                ? null
                : improvement / baseProbability;

        return {
            target,
            baseProbability,
            boostedProbability,
            improvement,
            relativeImprovement,
        };
    }),
);

const formatPercent = (value: number): string =>
    new Intl.NumberFormat('de-DE', {
        style: 'percent',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(value);

const formatPercentagePoints = (value: number): string => {
    const formatted = new Intl.NumberFormat('de-DE', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
        signDisplay: 'always',
    }).format(value * 100);

    return `${formatted} %-Pkt.`;
};

const formatRelativeImprovement = (value: number | null): string => {
    if (value === null) {
        return '–';
    }

    return new Intl.NumberFormat('de-DE', {
        style: 'percent',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
        signDisplay: 'always',
    }).format(value);
};

const formatBooster = (value: number): string =>
    value >= 0 ? `+${value}` : `${value}`;
</script>

<template>
    <div class="p-6">
        <h1 class="mb-2 text-2xl font-bold">2W6 Wahrscheinlichkeiten</h1>

        <p class="mb-6 text-sm text-surface-600">
            Wahrscheinlichkeiten für die Summe von zwei sechsseitigen Würfeln.
        </p>

        <section>
            <h2 class="mb-3 text-xl font-semibold">Genau eine Zahl würfeln</h2>

            <DataTable :value="exactProbabilities" stripedRows>
                <Column field="target" header="Ergebnis" />
                <Column field="combinations" header="Kombinationen" />
                <Column header="Wahrscheinlichkeit">
                    <template #body="{ data }">
                        {{ formatPercent(data.probability) }}
                    </template>
                </Column>
            </DataTable>
        </section>

        <Divider />

        <section>
            <h2 class="mb-3 text-xl font-semibold">Mindestens eine Zahl würfeln</h2>

            <DataTable :value="minimumProbabilities" stripedRows>
                <Column field="target" header="Mindestens" />

                <Column header="Wahrscheinlichkeit">
                    <template #body="{ data }">
                        {{ formatPercent(data.probability) }}
                    </template>
                </Column>
            </DataTable>
        </section>

        <Divider />

        <section>
            <h2 class="mb-3 text-xl font-semibold">Maximal eine Zahl würfeln</h2>

            <DataTable :value="maximumProbabilities" stripedRows>
                <Column field="target" header="Maximal" />

                <Column header="Wahrscheinlichkeit">
                    <template #body="{ data }">
                        {{ formatPercent(data.probability) }}
                    </template>
                </Column>
            </DataTable>
        </section>

        <Divider />

        <section>
            <h2 class="mb-2 text-xl font-semibold">Booster vergleichen</h2>

            <p class="mb-4 text-sm text-surface-600">
                Zeigt, wie sich ein Würfelbonus auf einen Mindestwurf auswirkt.
            </p>

            <div class="mb-6 flex items-end gap-4">
                <div class="flex flex-col gap-2">
                    <label for="booster" class="font-medium">
                        Würfelbonus
                    </label>

                    <InputNumber id="booster" v-model="booster" showButtons :min="-10" :max="10" :step="1" prefix="+" />
                </div>
            </div>

            <DataTable :value="boosterProbabilities" stripedRows>
                <Column field="target" header="Benötigt" />

                <Column header="Ohne Bonus">
                    <template #body="{ data }">
                        {{ formatPercent(data.baseProbability) }}
                    </template>
                </Column>

                <Column :header="`Mit ${formatBooster(booster)}`">
                    <template #body="{ data }">
                        {{ formatPercent(data.boostedProbability) }}
                    </template>
                </Column>

                <Column header="Verbesserung">
                    <template #body="{ data }">
                        {{ formatPercentagePoints(data.improvement) }}
                    </template>
                </Column>

                <Column header="Relative Verbesserung">
                    <template #body="{ data }">
                        {{ formatRelativeImprovement(data.relativeImprovement) }}
                    </template>
                </Column>
            </DataTable>
        </section>
    </div>
</template>
