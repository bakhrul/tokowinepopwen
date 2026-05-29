<template>
  <div class="mb-6 flex flex-col gap-3 sm:mb-8 sm:flex-row sm:items-end sm:justify-between">
    <div>
      <p v-if="eyebrow" class="mb-2 text-xs font-extrabold uppercase tracking-[0.22em] text-clay">{{ eyebrow }}</p>
      <h2 class="font-display text-3xl font-bold leading-tight sm:text-4xl">{{ title }}</h2>
    </div>
    <a v-if="action" href="#" class="text-sm font-extrabold text-ink/60 transition hover:text-clay">{{ action }}</a>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  eyebrow?: string
  action?: string
}>()
</script>
