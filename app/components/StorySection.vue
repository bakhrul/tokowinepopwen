<template>
  <section class="bg-brand-red px-5 py-12 text-white sm:px-8 lg:px-12">
    <div class="mx-auto grid max-w-[1920px] gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
      <div class="relative min-h-[460px] overflow-hidden bg-[#1b1410] shadow-xl">
        <div class="absolute inset-0 bg-[radial-gradient(circle_at_40%_44%,rgba(255,255,255,0.26),transparent_22%),linear-gradient(135deg,#4a3125,#15110f_58%,#70412a)]" />
        <div class="absolute inset-x-0 bottom-0 flex items-end justify-center gap-2 px-8">
          <span v-for="bottle in bottles" :key="bottle.color" class="product-bottle relative block rounded-b-lg rounded-t-full shadow-2xl" :class="bottle.size" :style="`--bottle:${bottle.color}`" />
        </div>
      </div>

      <div class="mx-auto max-w-[840px] text-center">
        <h2 class="text-3xl font-black leading-tight sm:text-4xl">Beli Minuman Alkohol Langsung Kirim?</h2>
        <p class="mt-6 text-lg leading-relaxed">
          Hanya di Cellarjak Anda akan menemukan koleksi minuman beralkohol lengkap dengan lebih dari 1000 pilihan terbaik wine, spirits, soju, dan bir.
        </p>
        <p class="mt-6 text-lg leading-relaxed">
          Pesanan dikirim dalam 60 menit dengan kemasan aman, dan pemesanan diterima hingga pukul 23.00 WIB.
        </p>
        <p class="mt-6 text-lg leading-relaxed">
          Rayakan acara Anda dengan praktis bersama Cellarjak!
        </p>
        <div class="mt-10 flex flex-col justify-center gap-5 sm:flex-row">
          <a class="bg-[#a9271e] px-8 py-4 text-base font-black uppercase tracking-wider transition hover:bg-[#8f211a]" href="#">Belanja Online</a>
          <a class="bg-[#fffbe8] px-8 py-4 text-base font-black uppercase tracking-wider text-brand-red transition hover:bg-white" href="#">Lokasi Kami</a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const bottles = [
  { color: '#f0d6a0', size: 'h-80 w-20' },
  { color: '#87331f', size: 'h-72 w-20' },
  { color: '#2f7957', size: 'h-64 w-16' },
  { color: '#c18a35', size: 'h-72 w-20' },
  { color: '#1c1c1c', size: 'h-60 w-16' },
  { color: '#c52820', size: 'h-64 w-16' }
]
</script>
