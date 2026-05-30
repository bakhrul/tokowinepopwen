<template>
  <section id="offers" class="bg-white px-5 py-10 sm:px-8 lg:px-12">
    <h2 class="mb-10 text-center text-3xl font-bold tracking-tight text-[#333] sm:text-4xl">Featured Offers</h2>
    <div class="mx-auto grid max-w-[1920px] gap-6 md:grid-cols-2 xl:grid-cols-4">
      <a v-for="offer in offers" :key="offer.title" href="#" class="group block aspect-square overflow-hidden rounded-3xl bg-[#f4f4f4] transition duration-500 hover:-translate-y-1 hover:shadow-xl">
        <img :src="offer.image" :alt="offer.title" class="h-full w-full object-cover transition duration-500 group-hover:scale-105" loading="lazy" />
      </a>
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  offers: Array<{
    title: string
    image: string
  }>
}>()
</script>
