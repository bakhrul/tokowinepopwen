<template>
  <main class="bg-[#fafafa]">
    <section class="px-5 py-8 sm:px-8 lg:px-12">
      <div class="mx-auto max-w-[1500px]">
        <nav class="mb-6 flex items-center gap-2 text-sm text-[#777]">
          <NuxtLink to="/" class="text-[#3769aa] hover:underline">Home</NuxtLink>
          <IconChevronRight class="size-4" />
          <span>Cart</span>
        </nav>

        <div class="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p class="text-sm font-black uppercase tracking-[0.2em] text-brand-red">Shopping Cart</p>
            <h1 class="mt-2 text-3xl font-black sm:text-4xl">Review your order</h1>
          </div>
          <NuxtLink to="/" class="text-sm font-black underline underline-offset-4">Continue shopping</NuxtLink>
        </div>

        <div class="cart-shell">
          <section class="cart-list-card">
            <div class="cart-list-head">
              <span>Product</span>
              <span class="ml-auto w-28 text-center">Quantity</span>
              <span class="w-36 text-right">Total</span>
              <span class="w-10" />
            </div>

            <div>
              <div v-for="item in cartItems" :key="item.name" class="cart-line-item">
                <div class="flex min-w-0 flex-1 gap-4">
                  <div class="grid size-24 shrink-0 place-items-center rounded-lg bg-[#fafafa]">
                    <span class="product-bottle relative block h-16 w-7 rounded-b rounded-t-full" :style="`--bottle:${item.color}`" />
                  </div>
                  <div class="min-w-0">
                    <p class="text-sm font-semibold text-[#777]">{{ item.brand }}</p>
                    <h2 class="mt-1 text-lg font-black">{{ item.name }}</h2>
                    <p class="mt-2 text-sm text-[#777]">{{ formatRupiah(item.price) }}</p>
                    <p class="mt-3 inline-flex items-center gap-2 rounded-full bg-[#f2fbf1] px-3 py-1 text-xs font-bold text-[#3d8a4d]">
                      <span class="size-1.5 rounded-full bg-[#3d8a4d]" />
                      In stock
                    </p>
                  </div>
                </div>

                <div class="flex h-9 w-28 shrink-0 overflow-hidden rounded-full border border-[#d8d8d8] bg-white">
                  <button class="grid w-9 place-items-center text-base transition hover:bg-[#fafafa]" @click="decrease(item.name)">-</button>
                  <span class="grid flex-1 place-items-center text-sm font-black">{{ item.qty }}</span>
                  <button class="grid w-9 place-items-center text-base transition hover:bg-[#fafafa]" @click="increase(item.name)">+</button>
                </div>

                <p class="w-36 shrink-0 text-left text-lg font-black md:text-right">{{ formatRupiah(item.price * item.qty) }}</p>

                <button class="grid size-10 shrink-0 place-items-center rounded-full text-[#777] transition hover:bg-[#f5f3ff] hover:text-brand-red" aria-label="Remove item" @click="removeItem(item.name)">
                  <IconTrash class="size-5" />
                </button>
              </div>
            </div>

            <div v-if="!cartItems.length" class="p-12 text-center">
              <h2 class="text-2xl font-black">Your cart is empty</h2>
              <p class="mt-3 text-[#666]">Add a few bottles and they will appear here.</p>
              <NuxtLink to="/" class="mt-6 inline-flex bg-brand-red px-6 py-3 text-sm font-black uppercase tracking-wide text-white">Start shopping</NuxtLink>
            </div>
          </section>

          <aside class="cart-summary-col">
            <div class="rounded-xl border border-[#eeeeee] bg-white p-6 shadow-xl">
              <h2 class="text-xl font-black">Order summary</h2>

              <div class="mt-6 space-y-4 text-sm">
                <div class="flex justify-between">
                  <span class="text-[#666]">Subtotal</span>
                  <span class="font-black">{{ formatRupiah(subtotal) }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-[#666]">Delivery estimate</span>
                  <span class="font-black">{{ deliveryFee ? formatRupiah(deliveryFee) : 'Free' }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-[#666]">Packaging</span>
                  <span class="font-black">{{ formatRupiah(packagingFee) }}</span>
                </div>
              </div>

              <div class="mt-6 rounded-lg bg-[#fafafa] p-4">
                <label class="text-xs font-black uppercase tracking-wide text-[#777]">Promo code</label>
                <div class="mt-2 flex gap-2">
                  <input v-model="promoCode" class="h-11 min-w-0 flex-1 border border-[#dddddd] bg-white px-3 text-sm outline-none focus:border-brand-red" placeholder="Enter code" />
                  <button class="h-11 bg-[#333] px-4 text-sm font-black text-white transition hover:bg-brand-red">Apply</button>
                </div>
              </div>

              <div class="mt-6 border-t border-[#eeeeee] pt-5">
                <div class="flex items-center justify-between">
                  <span class="text-lg font-black">Total</span>
                  <span class="text-2xl font-black">{{ formatRupiah(total) }}</span>
                </div>
                <p class="mt-2 text-xs leading-5 text-[#777]">Taxes and final delivery fees are calculated at checkout.</p>
              </div>

              <button class="mt-6 h-12 w-full bg-brand-red text-sm font-black uppercase tracking-wide text-white transition hover:bg-[#5b21b6]">
                Checkout
              </button>
            </div>

            <div class="mt-5 rounded-xl border border-[#eeeeee] bg-white p-5 shadow-sm">
              <h3 class="font-black">Delivery perks</h3>
              <div class="mt-4 space-y-3 text-sm text-[#666]">
                <p class="flex gap-3"><IconCheck class="mt-0.5 size-4 shrink-0 text-[#3d8a4d]" /> Same day delivery in selected areas.</p>
                <p class="flex gap-3"><IconCheck class="mt-0.5 size-4 shrink-0 text-[#3d8a4d]" /> Protective packaging for bottles.</p>
                <p class="flex gap-3"><IconCheck class="mt-0.5 size-4 shrink-0 text-[#3d8a4d]" /> 21+ verification on delivery.</p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>

    <ProductSlider title="You may also like" :products="recommendedProducts" />
  </main>
</template>

<script setup lang="ts">
const promoCode = ref('')

const cartItems = ref([
  { brand: 'Johnnie Walker', name: 'Red Label Whisky 750ml', qty: 1, price: 350000, color: '#d88426' },
  { brand: 'Cheosnun Soju', name: 'Cheosnun Soju Lychee', qty: 2, price: 60000, color: '#2f8b45' },
  { brand: 'McDonald', name: 'McDonald Vodka Mix 1000ml', qty: 1, price: 110000, color: '#f0bd2f' }
])

const deliveryFee = 0
const packagingFee = 10000

const subtotal = computed(() => cartItems.value.reduce((total, item) => total + item.price * item.qty, 0))
const total = computed(() => subtotal.value + deliveryFee + packagingFee)

const formatRupiah = (value: number) => `Rp ${value.toLocaleString('id-ID')}`

const increase = (name: string) => {
  const item = cartItems.value.find((entry) => entry.name === name)
  if (item) item.qty += 1
}

const decrease = (name: string) => {
  const item = cartItems.value.find((entry) => entry.name === name)
  if (!item) return
  if (item.qty === 1) removeItem(name)
  else item.qty -= 1
}

const removeItem = (name: string) => {
  cartItems.value = cartItems.value.filter((item) => item.name !== name)
}

const recommendedProducts = [
  { brand: 'Cloud Seven', name: 'Friendship Black Tea Vodka 650ml', price: 'Rp 85.000,00', color: '#7b4b21', size: 'h-72 w-20', slug: 'friendship-black-tea-vodka-650ml' },
  { brand: 'Maze Maze', name: 'Maze Maze Vodka Original 700ml', price: 'Rp 350.000,00', color: '#f3f3f3', size: 'h-72 w-24', slug: 'maze-maze-vodka-original-700ml' },
  { brand: 'Orang Tua', name: 'Intisari Blackcurrant 620ml', price: 'Rp 76.000,00', color: '#3c1937', size: 'h-72 w-20', slug: 'intisari-blackcurrant-620ml' },
  { brand: 'Iceland', name: 'Iceland Vodka Original 350ml', price: 'Rp 90.000,00', color: '#e8eef8', size: 'h-72 w-20', slug: 'iceland-vodka-original-350ml' },
  { brand: 'Kawa Kawa', name: 'Kawa Kawa Anggur Hijau 600ml', price: 'Rp 76.000,00', color: '#4f7c3e', size: 'h-72 w-20', slug: 'kawa-kawa-anggur-hijau-600ml' }
]

useSeoMeta({
  title: 'Cart - tokowinepop',
  description: 'Review your shopping cart and checkout.'
})
</script>
