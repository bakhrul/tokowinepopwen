<template>
  <section class="bg-white px-5 py-12 sm:px-8 lg:px-12">
    <h2 class="mb-9 text-center text-3xl font-bold text-[#333] sm:text-4xl">Best Collection</h2>
    <div class="relative mx-auto max-w-[1920px]">
      <div class="overflow-hidden border border-[#d8d8d8] bg-[#d8d8d8]">
        <div class="flex gap-px transition-transform duration-500 ease-out" :style="{ transform: `translateX(-${activeIndex * slideWidth}%)` }">
          <NuxtLink v-for="brand in brandItems" :key="brand.name" :to="brand.to" class="group grid min-h-60 min-w-0 shrink-0 place-items-center overflow-hidden bg-white p-6 text-center transition duration-300 hover:z-10 hover:-translate-y-1 hover:shadow-xl" :style="{ width: `${slideWidth}%` }">
            <div class="min-w-0 w-full">
              <div :class="['mx-auto flex h-24 w-full max-w-[220px] items-center justify-center overflow-hidden bg-white px-4 transition', brand.logoTone]">
                <img v-if="brand.logoUrl" :src="brand.logoUrl" :alt="brand.name" class="max-h-20 max-w-full object-contain" loading="lazy" />
                <div v-else-if="brand.logoStyle === 'seal'" class="grid size-16 place-items-center rounded-full border-4 border-current text-2xl font-black">
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
      </div>

      <button class="absolute left-0 top-1/2 z-20 grid size-10 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-[#dddddd] bg-white transition hover:border-brand-red hover:text-brand-red" aria-label="Previous brands" @click="previous">
        <IconChevronRight class="size-5 rotate-180" />
      </button>
      <button class="absolute right-0 top-1/2 z-20 grid size-10 -translate-y-1/2 translate-x-1/2 place-items-center rounded-full border border-[#dddddd] bg-white transition hover:border-brand-red hover:text-brand-red" aria-label="Next brands" @click="next">
        <IconChevronRight class="size-5" />
      </button>
    </div>
  </section>
</template>

<script setup lang="ts">
const props = defineProps<{
  brands: Array<string | {
    name: string
    logoUrl?: string
  }>
}>()

const activeIndex = ref(0)
const visibleCount = ref(6)

const brandItems = computed(() => props.brands.map((brand) => {
  const name = typeof brand === 'string' ? brand : brand.name
  return {
    name,
    logoUrl: typeof brand === 'string' ? '' : brand.logoUrl,
    initials: name.split(/\s+/).map((word) => word[0]).join('').slice(0, 2),
    shortName: name.length > 12 ? name.split(/\s+/)[0] : name,
    logoStyle: getLogoStyle(name),
    logoTone: getLogoTone(name),
    to: `/collections/${name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`
  }
}))

const effectiveVisibleCount = computed(() => Math.min(visibleCount.value, Math.max(brandItems.value.length, 1)))
const slideWidth = computed(() => 100 / effectiveVisibleCount.value)
const maxIndex = computed(() => Math.max(0, brandItems.value.length - effectiveVisibleCount.value))

const updateVisibleCount = () => {
  if (window.innerWidth < 640) visibleCount.value = 1
  else if (window.innerWidth < 1024) visibleCount.value = 2
  else if (window.innerWidth < 1280) visibleCount.value = 3
  else visibleCount.value = 6
  activeIndex.value = Math.min(activeIndex.value, maxIndex.value)
}

const next = () => {
  activeIndex.value = activeIndex.value >= maxIndex.value ? 0 : activeIndex.value + 1
}

const previous = () => {
  activeIndex.value = activeIndex.value <= 0 ? maxIndex.value : activeIndex.value - 1
}

onMounted(() => {
  updateVisibleCount()
  window.addEventListener('resize', updateVisibleCount)
})

onUnmounted(() => window.removeEventListener('resize', updateVisibleCount))

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
