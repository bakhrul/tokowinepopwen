<template>
  <section class="bg-white px-5 py-12 sm:px-8 lg:px-12">
    <h2 class="mb-9 text-center text-3xl font-bold text-[#333] sm:text-4xl">Best Collection</h2>
    <div class="mx-auto grid max-w-[1920px] grid-cols-1 gap-px overflow-hidden border border-[#d8d8d8] bg-[#d8d8d8] sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
      <NuxtLink v-for="brand in brandItems" :key="brand.name" :to="brand.to" class="group grid min-h-60 min-w-0 place-items-center overflow-hidden bg-white p-6 text-center transition duration-300 hover:z-10 hover:-translate-y-1 hover:shadow-xl">
        <div class="min-w-0 w-full">
          <div :class="['mx-auto flex h-24 w-full max-w-[220px] items-center justify-center overflow-hidden bg-white px-4 transition', brand.logoTone]">
            <div v-if="brand.logoStyle === 'seal'" class="grid size-16 place-items-center rounded-full border-4 border-current text-2xl font-black">
              {{ brand.initials }}
            </div>
            <div v-else-if="brand.logoStyle === 'script'" class="max-w-full truncate font-display text-3xl font-bold italic leading-none">
              {{ brand.shortName }}
            </div>
            <div v-else-if="brand.logoStyle === 'stack'" class="max-w-full overflow-hidden text-center">
              <span class="block max-w-full truncate text-xl font-black uppercase leading-none tracking-[0.1em]">{{ brand.shortName }}</span>
              <span class="mt-2 block text-[10px] font-bold uppercase tracking-[0.24em] opacity-60">Reserve</span>
            </div>
            <div v-else class="max-w-full truncate text-2xl font-black uppercase tracking-tight">
              {{ brand.shortName }}
            </div>
          </div>
          <p class="mt-5 text-base font-semibold text-[#333]">{{ brand.name }}</p>
        </div>
      </NuxtLink>
    </div>
  </section>
</template>

<script setup lang="ts">
const props = defineProps<{
  brands: string[]
}>()

const brandItems = computed(() => props.brands.map((name) => ({
  name,
  initials: name.split(/\s+/).map((word) => word[0]).join('').slice(0, 2),
  shortName: name.length > 12 ? name.split(/\s+/)[0] : name,
  logoStyle: getLogoStyle(name),
  logoTone: getLogoTone(name),
  to: `/collections/${name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`
})))

function getLogoStyle(name: string) {
  const styles = ['word', 'seal', 'script', 'stack']
  return styles[name.length % styles.length]
}

function getLogoTone(name: string) {
  const tones = [
    'text-[#222]',
    'text-[#9b6a2f]',
    'text-[#0f5138]',
    'text-[#6e1f2d]',
    'text-[#1d4f91]'
  ]
  return tones[name.charCodeAt(0) % tones.length]
}
</script>
