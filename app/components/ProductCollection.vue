<template>
  <section :id="id" class="bg-white px-5 py-10 sm:px-8 lg:px-12">
    <div class="mx-auto max-w-[1920px]">
      <h2 class="mb-6 text-center text-3xl font-black tracking-tight text-[#333] sm:text-4xl">{{ title }}</h2>
      <div v-if="tabs?.length" class="mb-9 flex justify-center overflow-x-auto text-base">
        <div class="relative flex gap-10">
          <button
            v-for="(tab, index) in tabs"
            :key="tab"
            :ref="(element) => setTabRef(element, index)"
            class="relative shrink-0 pb-3 transition hover:text-brand-red"
            :class="activeTab === index ? 'text-[#333]' : 'text-[#777]'"
            @click="setActiveTab(index)"
          >
            {{ tab }}
          </button>
          <span class="absolute bottom-0 h-1 bg-[#333] transition-all duration-300 ease-out" :style="indicatorStyle" />
        </div>
      </div>

      <Transition name="tab-panel" mode="out-in">
        <div :key="activeTab" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5">
          <TransitionGroup name="product-card" tag="div" class="contents" appear>
            <ProductCard v-for="product in visibleProducts" :key="`${activeTab}-${product.name}`" :product="product" />
          </TransitionGroup>
          <NuxtLink v-if="ctaTitle" to="/collections" class="relative flex min-h-[430px] flex-col border border-[#d8d8d8] bg-white p-8 transition hover:bg-[#fafafa]">
            <p class="text-sm font-black uppercase tracking-[0.18em] text-brand-red">Show more</p>
            <h3 class="mt-3 text-3xl font-black leading-tight text-[#333] sm:text-4xl">{{ ctaTitle }}</h3>
            <p class="mt-4 text-lg text-[#333]">{{ ctaText }}</p>
            <span class="mt-auto grid size-12 place-items-center rounded-full bg-[#2b2b2b] text-3xl font-light text-white">&gt;</span>
          </NuxtLink>
        </div>
      </Transition>
    </div>
  </section>
</template>

<script setup lang="ts">
const props = defineProps<{
  id?: string
  title: string
  tabs?: string[]
  ctaTitle?: string
  ctaText?: string
  products: Array<{
    brand: string
    name: string
    price: string
    color: string
    size?: string
    slug?: string
  }>
}>()

const activeTab = ref(0)
const tabRefs = ref<HTMLElement[]>([])

const setTabRef = (element: unknown, index: number) => {
  if (typeof HTMLElement !== 'undefined' && element instanceof HTMLElement) tabRefs.value[index] = element
}

const visibleProducts = computed(() => {
  if (!props.tabs?.length || activeTab.value === 0) return props.products.slice(0, 9)
  const offset = activeTab.value === 1 ? 4 : 2
  return [...props.products.slice(offset), ...props.products.slice(0, offset)].slice(0, 9)
})

const indicatorStyle = ref({ left: '0px', width: '0px' })

const updateIndicator = async () => {
  await nextTick()
  const activeElement = tabRefs.value[activeTab.value]
  if (!activeElement) return
  indicatorStyle.value = {
    left: `${activeElement.offsetLeft}px`,
    width: `${activeElement.offsetWidth}px`
  }
}

const setActiveTab = (index: number) => {
  activeTab.value = index
  updateIndicator()
}

onMounted(updateIndicator)
</script>
