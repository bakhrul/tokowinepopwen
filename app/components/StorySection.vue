<template>
  <section class="bg-brand-red text-white">
    <div class="mx-auto grid max-w-[1920px] lg:grid-cols-2 lg:items-stretch">
      <div class="min-h-[360px] bg-cover bg-center lg:min-h-[520px]" :style="{ backgroundImage: `linear-gradient(rgba(109, 40, 217, 0.08), rgba(109, 40, 217, 0.08)), url(${deliveryImage})` }">
        <span class="sr-only">Instant delivery courier</span>
      </div>

      <div class="mx-auto flex max-w-[880px] flex-col justify-center px-6 py-12 text-center sm:px-12 lg:py-16">
        <h2 class="text-3xl font-bold leading-tight sm:text-4xl">Instant Delivery with tokowinepop</h2>
        <p class="mt-6 text-lg leading-relaxed">
          Discover a complete selection of wine, spirits, soju, and beer curated for every occasion.
        </p>
        <p class="mt-6 text-lg leading-relaxed">
          Your order can arrive within 60 minutes with secure packaging, and late-night orders are welcome until 11:00 PM.
        </p>
        <p class="mt-6 text-lg leading-relaxed">
          Enjoy a faster and simpler shopping experience with tokowinepop, from everyday picks to special celebration bottles.
        </p>
        <a class="mx-auto mt-10 bg-[#fffbe8] px-8 py-4 text-base font-bold uppercase tracking-wider text-brand-red transition hover:bg-white" href="#">Lokasi Kami</a>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import deliveryImage from '~/assets/images/story/delivery.jpg'
</script>
