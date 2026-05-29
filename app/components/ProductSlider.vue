<template>
  <section class="px-5 py-12 sm:px-8 lg:px-12">
    <div class="mx-auto max-w-[1920px]">
      <div class="mb-8 flex items-center justify-between gap-4">
        <h2 class="text-2xl font-black sm:text-3xl">{{ title }}</h2>
        <div class="flex gap-2">
          <button class="grid size-10 place-items-center rounded-full border border-[#dddddd] transition hover:border-brand-red hover:text-brand-red" aria-label="Previous products" @click="previous">
            <IconChevronRight class="size-5 rotate-180" />
          </button>
          <button class="grid size-10 place-items-center rounded-full border border-[#dddddd] transition hover:border-brand-red hover:text-brand-red" aria-label="Next products" @click="next">
            <IconChevronRight class="size-5" />
          </button>
        </div>
      </div>

      <div class="overflow-hidden border-l border-[#d8d8d8]">
        <div class="flex transition-transform duration-500 ease-out" :style="{ transform: `translateX(-${activeIndex * slideWidth}%)` }">
          <div v-for="product in products" :key="product.name" class="w-full shrink-0 sm:w-1/2 lg:w-1/4">
            <ProductCard :product="product" />
          </div>
        </div>
      </div>

      <div class="mt-6 flex justify-center gap-2">
        <button
          v-for="(_, index) in pageCount"
          :key="index"
          class="size-2 rounded-full transition"
          :class="activeIndex === index ? 'bg-[#333]' : 'bg-[#d8d8d8]'"
          :aria-label="`Go to product slide ${index + 1}`"
          @click="activeIndex = index"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const props = defineProps<{
  title: string
  products: Array<{
    brand: string
    name: string
    price: string
    color: string
    size?: string
    slug?: string
  }>
}>()

const activeIndex = ref(0)
const visibleCount = ref(4)

const updateVisibleCount = () => {
  if (window.innerWidth < 640) visibleCount.value = 1
  else if (window.innerWidth < 1024) visibleCount.value = 2
  else visibleCount.value = 4
}

const pageCount = computed(() => Math.max(1, props.products.length - visibleCount.value + 1))
const slideWidth = computed(() => 100 / visibleCount.value)

const next = () => {
  activeIndex.value = (activeIndex.value + 1) % pageCount.value
}

const previous = () => {
  activeIndex.value = activeIndex.value === 0 ? pageCount.value - 1 : activeIndex.value - 1
}

onMounted(() => {
  updateVisibleCount()
  window.addEventListener('resize', updateVisibleCount)
})

onUnmounted(() => window.removeEventListener('resize', updateVisibleCount))
</script>
