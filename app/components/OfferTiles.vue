<template>
  <section id="offers" class="bg-white px-5 py-10 sm:px-8 lg:px-12">
    <h2 class="mb-10 text-center text-3xl font-black tracking-tight text-[#333] sm:text-4xl">Featured Offers</h2>
    <div class="mx-auto grid max-w-[1920px] gap-8 lg:grid-cols-3">
      <a v-for="offer in offers" :key="offer.title" href="#" class="group wide-promo-bg relative h-[280px] overflow-hidden border border-[#d6d6d6] transition duration-500 hover:-translate-y-1 hover:shadow-xl">
        <div class="absolute left-0 top-0 flex h-full w-[40%] flex-col justify-center bg-brand-red px-7 text-white">
          <p class="text-base">Recommendation</p>
          <h3 class="mt-5 text-3xl font-black uppercase leading-none">{{ offer.title }}</h3>
          <p class="mt-6 text-lg">Buy Now !</p>
        </div>
        <div class="absolute right-8 top-8 text-right text-xl font-black uppercase leading-tight text-[#ef403b]">
          {{ offer.title }}<br />Recommendations
        </div>
        <div class="absolute bottom-6 right-12 flex items-end gap-4 transition duration-500 group-hover:-translate-x-4">
          <span
            v-for="(bottle, index) in offer.bottles"
            :key="index"
            class="product-bottle relative block rounded-b-lg rounded-t-full shadow-xl"
            :class="bottle.size"
            :style="`--bottle:${bottle.color}`"
          />
        </div>
      </a>
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  offers: Array<{
    title: string
    bottles: Array<{
      color: string
      size: string
    }>
  }>
}>()
</script>
