<template>
  <section class="bg-white px-5 py-10 sm:px-8 lg:px-12">
    <div :class="['mx-auto grid max-w-[1920px] gap-10', reverse ? 'lg:grid-cols-[1.18fr_0.82fr]' : 'lg:grid-cols-[0.74fr_1.26fr]']">
      <NuxtLink :to="href" :class="['relative min-h-[620px] overflow-hidden', reverse ? 'lg:col-start-2' : '']">
        <div :class="['absolute inset-0', promoClass]" />
        <div class="absolute inset-0 bg-black/12" />
        <div class="absolute inset-x-0 bottom-12 text-center">
          <h3 class="mb-7 text-4xl font-black text-white drop-shadow">{{ title }}</h3>
          <span class="inline-flex bg-brand-red px-8 py-4 text-base font-black uppercase tracking-wider text-white transition hover:bg-[#a9271e]">Shop Now</span>
        </div>
      </NuxtLink>

      <div :class="['grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3', reverse ? 'lg:col-start-1 lg:row-start-1' : '']">
        <ProductCard v-for="product in products" :key="product.name" :product="product" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  title: string
  promoClass: string
  href?: string
  reverse?: boolean
  products: Array<{
    brand: string
    name: string
    price: string
    color: string
    size?: string
  }>
}>(), {
  href: '/categories/local-pride',
  reverse: false
})
</script>
