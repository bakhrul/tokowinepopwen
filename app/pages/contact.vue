<template>
  <main class="bg-white">
    <section class="relative overflow-hidden bg-[#f7f4ef] px-5 py-16 sm:px-8 lg:px-12">
      <div class="absolute inset-y-0 right-0 hidden w-1/2 bg-[radial-gradient(circle_at_70%_30%,rgba(197,40,32,.12),transparent_28%),linear-gradient(135deg,transparent,#fff)] lg:block" />
      <div class="relative mx-auto grid max-w-[1400px] gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <p class="text-sm font-semibold uppercase tracking-[0.22em] text-brand-red">Contact Us</p>
          <h1 class="mt-4 text-4xl font-bold leading-tight sm:text-5xl">Tokowinepop support, made simple.</h1>
          <p class="mt-5 max-w-xl text-base leading-8 text-[#666]">
            Reach us for store questions, product availability, delivery support, and partnership requests.
          </p>
        </div>

        <div class="rounded-xl border border-[#eeeeee] bg-white p-6 shadow-xl sm:p-8">
          <div class="grid gap-5 sm:grid-cols-2">
            <div class="rounded-lg bg-[#fafafa] p-5">
              <p class="text-xs font-semibold uppercase tracking-wide text-[#777]">Store</p>
              <h2 class="mt-2 text-2xl font-bold">tokowinepop</h2>
            </div>
            <a href="https://wa.me/628118869172" target="_blank" rel="noreferrer" class="rounded-lg bg-[#eaffef] p-5 transition hover:-translate-y-1 hover:shadow-lg">
              <p class="text-xs font-semibold uppercase tracking-wide text-[#327a42]">WhatsApp</p>
              <div class="mt-2 flex items-center gap-3 text-2xl font-semibold text-[#1f5c48]">
                <IconWhatsapp class="size-8" />
                xxxxxxx
              </div>
              <p class="mt-2 text-sm text-[#4f7c5b]">Click to open WhatsApp</p>
            </a>
          </div>

          <div class="mt-6 grid gap-5">
            <div class="rounded-lg border border-[#eeeeee] p-5">
              <p class="text-xs font-semibold uppercase tracking-wide text-[#777]">Address</p>
              <p class="mt-2 text-lg font-medium leading-7">Address line placeholder, Tangerang, Banten 15810</p>
            </div>
            <a href="mailto:support@tokowinepop.test" class="rounded-lg border border-[#eeeeee] p-5 transition hover:border-brand-red/40 hover:shadow-lg">
              <p class="text-xs font-semibold uppercase tracking-wide text-[#777]">Email</p>
              <p class="mt-2 text-lg font-medium">support@tokowinepop.test</p>
            </a>
          </div>
        </div>
      </div>
    </section>

    <section class="px-5 py-12 sm:px-8 lg:px-12">
      <div class="mx-auto grid max-w-[1400px] gap-5 md:grid-cols-3">
        <div v-for="item in cards" :key="item.title" class="rounded-lg border border-[#eeeeee] bg-white p-6 shadow-sm">
          <h2 class="text-xl font-semibold">{{ item.title }}</h2>
          <p class="mt-3 text-sm leading-7 text-[#666]">{{ item.copy }}</p>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
const cards = [
  { title: 'Fast Response', copy: 'Use WhatsApp for urgent questions about order status and availability.' },
  { title: 'Store Information', copy: 'Ask about address, delivery coverage, and pickup availability.' },
  { title: 'Product Support', copy: 'Need product recommendations? Send us your occasion and budget.' }
]

useSeoMeta({
  title: 'Contact Us - tokowinepop',
  description: 'Contact Tokowinepop support by WhatsApp or email.'
})
</script>
