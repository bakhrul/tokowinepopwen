<template>
  <section class="relative h-[360px] overflow-hidden sm:h-[460px] lg:h-[560px]">
    <div
      v-for="(slide, index) in slides"
      :key="slide.title"
      class="absolute inset-0 transition-all duration-700 ease-out"
      :class="index === activeSlide ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'"
    >
      <div :class="['absolute inset-0', slide.bgClass]" />
      <div class="absolute left-6 top-1/2 hidden -translate-y-1/2 rotate-[-16deg] items-end gap-4 lg:flex">
        <div class="product-bottle relative h-64 w-20 rounded-b-lg rounded-t-full shadow-2xl" :style="`--bottle:${slide.bottle}`" />
        <div class="h-20 w-20 rounded-full border-[12px] border-amber-100/65" />
      </div>

      <div class="relative mx-auto flex h-full max-w-[1920px] items-center justify-end px-6 sm:px-12">
        <div class="reveal w-full max-w-[520px] text-center text-[#e8d097]">
          <div class="mx-auto mb-6 grid size-32 place-items-center rounded-full border-4 border-[#d8bd75]/70 text-4xl font-black sm:size-48 sm:text-6xl">
            {{ slide.mark }}
          </div>
          <h1 class="text-xl font-semibold uppercase tracking-[0.24em] sm:text-3xl">{{ slide.title }}</h1>
          <p class="mt-4 text-sm leading-6 text-white/75 sm:text-base">{{ slide.copy }}</p>
        </div>
      </div>
    </div>

    <div class="absolute bottom-8 left-1/2 flex -translate-x-1/2 items-center gap-3">
      <button
        v-for="(slide, index) in slides"
        :key="slide.title"
        class="size-3 rounded-full border border-white transition"
        :class="index === activeSlide ? 'bg-white' : 'bg-white/40'"
        :aria-label="`Go to slide ${index + 1}`"
        @click="activeSlide = index"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
const activeSlide = ref(0)
let timer: ReturnType<typeof setInterval> | undefined

const slides = [
  {
    mark: 'CJ',
    title: 'Since 1948',
    copy: 'Curated bottles, smooth checkout, and fast local delivery.',
    bottle: '#9f3d24',
    bgClass: 'hero-wood'
  },
  {
    mark: 'SP',
    title: 'Spirits Deals',
    copy: 'Whisky, vodka, gin, and rum selections for easy hosting.',
    bottle: '#c1782e',
    bgClass: 'bg-[radial-gradient(circle_at_78%_42%,rgba(255,255,255,.18),transparent_20%),linear-gradient(90deg,#3c1913,#090807_58%,#16100d)]'
  },
  {
    mark: 'WN',
    title: 'Wine Picks',
    copy: 'Red, white, sparkling, and rose collections for dinner plans.',
    bottle: '#6d1826',
    bgClass: 'bg-[radial-gradient(circle_at_28%_48%,rgba(255,255,255,.18),transparent_22%),linear-gradient(90deg,#5d1f2d,#130d0d_60%,#080706)]'
  }
]

const nextSlide = () => {
  activeSlide.value = (activeSlide.value + 1) % slides.length
}

const startAutoplay = () => {
  timer = setInterval(nextSlide, 4200)
}

const stopAutoplay = () => {
  if (timer) clearInterval(timer)
}

onMounted(startAutoplay)
onUnmounted(stopAutoplay)
</script>
