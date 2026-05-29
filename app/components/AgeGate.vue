<template>
  <div v-if="visible" class="fixed inset-0 z-50 grid place-items-center bg-ink/70 px-4 backdrop-blur-md">
    <div class="reveal w-full max-w-md rounded-lg bg-white p-6 text-center shadow-soft">
      <p class="mx-auto mb-4 grid size-14 place-items-center rounded-full bg-clay text-sm font-black text-white">21+</p>
      <h2 class="font-display text-3xl font-bold">Harap verifikasi usia Anda</h2>
      <p class="mt-3 text-sm leading-6 text-ink/60">Anda harus berusia 21 tahun ke atas untuk masuk dan melihat katalog ini.</p>
      <button class="mt-6 w-full rounded-full bg-ink px-5 py-3.5 text-sm font-black text-white transition hover:bg-clay" @click="visible = false">
        Masuk
      </button>
      <p class="mt-4 text-xs leading-5 text-ink/45">Dengan masuk, Anda menyatakan berusia 21 tahun atau lebih.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
const visible = ref(true)
</script>
