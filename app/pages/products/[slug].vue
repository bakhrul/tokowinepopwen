<template>
  <main class="bg-white">
    <section class="px-5 py-8 sm:px-8 lg:px-12">
      <div class="mx-auto max-w-[1920px]">
        <nav class="mb-8 flex items-center gap-2 text-sm text-[#777]">
          <NuxtLink to="/" class="text-[#3769aa] hover:underline">Home</NuxtLink>
          <IconChevronRight class="size-4" />
          <span>{{ product.name }}</span>
        </nav>

        <div class="grid gap-10 lg:grid-cols-[0.9fr_1fr]">
          <ProductDetailGallery :images="product.images" />

          <div class="reveal">
            <div class="flex flex-col gap-4 border-b border-[#dddddd] pb-6 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p class="mb-2 text-sm font-bold uppercase tracking-wide text-brand-red">{{ product.category }}</p>
                <h1 class="text-3xl font-black leading-tight sm:text-4xl">{{ product.name }}</h1>
                <p class="mt-2 text-sm text-[#777]">SKU: {{ product.sku }}</p>
              </div>
              <div class="flex items-center gap-2 text-sm text-[#777]">
                <IconStar class="size-4 text-[#f4b235]" />
                <span>No Reviews</span>
              </div>
            </div>

            <div class="py-6">
              <p class="text-2xl font-black">{{ product.price }}</p>
              <div class="mt-6 grid gap-3 sm:grid-cols-[140px_1fr]">
                <div>
                  <p class="mb-2 text-sm font-bold">Quantity</p>
                  <div class="flex h-12 border border-[#cfcfcf]">
                    <button class="grid w-12 place-items-center text-xl transition hover:bg-[#fafafa]" @click="quantity = Math.max(1, quantity - 1)">-</button>
                    <span class="grid flex-1 place-items-center font-bold">{{ quantity }}</span>
                    <button class="grid w-12 place-items-center text-xl transition hover:bg-[#fafafa]" @click="quantity++">+</button>
                  </div>
                </div>
                <div class="flex flex-col justify-end gap-3">
                  <button class="h-12 bg-[#e5f187] text-sm font-black uppercase tracking-wide text-brand-red transition hover:brightness-95">Add to Cart</button>
                  <button class="h-12 bg-brand-red text-sm font-black uppercase tracking-wide text-white transition hover:bg-[#a9271e]">Buy It Now</button>
                </div>
              </div>

              <div class="mt-6 rounded-lg bg-[#f8fbf7] p-4">
                <p class="flex items-center gap-2 font-bold text-[#3d8a4d]">
                  <IconCheck class="size-5" />
                  Pickup available at CELLARJAK KG
                </p>
                <p class="mt-1 text-sm text-[#777]">In stock, usually ready in 1 hour.</p>
                <a href="#" class="mt-3 inline-block text-sm font-bold underline underline-offset-4">Check availability at other stores</a>
              </div>

              <div class="mt-5 flex flex-wrap gap-3">
                <button class="inline-flex items-center gap-2 border border-[#dddddd] px-4 py-3 text-sm font-bold transition hover:border-brand-red hover:text-brand-red" @click="shareProduct">
                  <IconShare class="size-4" />
                  Share this
                </button>
                <NuxtLink to="/" class="inline-flex items-center gap-2 border border-[#dddddd] px-4 py-3 text-sm font-bold transition hover:border-brand-red hover:text-brand-red">
                  Continue shopping
                </NuxtLink>
              </div>
            </div>

            <div class="border border-[#dddddd]">
              <button class="flex w-full items-center justify-between px-5 py-4 text-left font-black" @click="descriptionOpen = !descriptionOpen">
                Description
                <IconChevronDown class="size-5 transition" :class="descriptionOpen ? 'rotate-180' : ''" />
              </button>
              <Transition name="category-slide">
                <div v-if="descriptionOpen" class="px-5 pb-5 text-sm leading-7 text-[#555]">
                  <dl class="mb-5 grid gap-x-6 gap-y-1 sm:grid-cols-[120px_1fr]">
                    <template v-for="meta in product.meta" :key="meta.label">
                      <dt class="font-bold text-[#333]">{{ meta.label }}</dt>
                      <dd>{{ meta.value }}</dd>
                    </template>
                  </dl>
                  <p>{{ product.description }}</p>
                </div>
              </Transition>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="border-y border-[#eeeeee] px-5 py-8 sm:px-8 lg:px-12">
      <div class="mx-auto grid max-w-[1920px] gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div v-for="benefit in benefits" :key="benefit.title" class="flex gap-4">
          <span class="grid size-10 shrink-0 place-items-center rounded-full border border-[#dddddd] text-brand-red">
            <IconCheck class="size-5" />
          </span>
          <div>
            <h3 class="text-lg font-black">{{ benefit.title }}</h3>
            <p class="mt-1 text-sm leading-6 text-[#666]">{{ benefit.copy }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="px-5 py-10 sm:px-8 lg:px-12">
      <div class="mx-auto max-w-[1920px]">
        <h2 class="mb-6 text-2xl font-black sm:text-3xl">You may also like</h2>
        <div class="grid gap-4 sm:grid-cols-3">
          <NuxtLink v-for="item in mayLike" :key="item.name" :to="item.slug" class="group flex items-center gap-4 border border-[#dddddd] p-4 transition hover:-translate-y-1 hover:border-brand-red/40 hover:shadow-lg">
            <span class="product-bottle relative block h-24 w-9 shrink-0 rounded-b rounded-t-full transition group-hover:-translate-y-1" :style="`--bottle:${item.color}`" />
            <span>
              <span class="block text-sm font-semibold text-[#777]">{{ item.brand }}</span>
              <span class="mt-1 block font-bold">{{ item.name }}</span>
              <span class="mt-2 block font-black">{{ item.price }}</span>
            </span>
          </NuxtLink>
        </div>
      </div>
    </section>

    <ProductSlider title="Recommended products" :products="recommendedProducts" />
  </main>
</template>

<script setup lang="ts">
const route = useRoute()
const quantity = ref(1)
const descriptionOpen = ref(true)

const product = {
  name: 'McDonald Vodka Mix 1000ml',
  sku: 'SPV-VK-0021',
  category: 'Spirits',
  price: 'Rp 110.000,00',
  images: [
    { label: 'Main bottle', color: '#f0bd2f' },
    { label: 'Bottle with pack', color: '#283ca0' }
  ],
  meta: [
    { label: 'ABV', value: '19.8%' },
    { label: 'Brand', value: 'McDonald' },
    { label: 'Category', value: 'Spirits' },
    { label: 'Country', value: 'Indonesia' },
    { label: 'Size', value: '1000ml' },
    { label: 'Sub Category', value: 'Vodka' },
    { label: 'Variety', value: 'Original' }
  ],
  description:
    'McDonald Vodka Mix is formulated to complement premium vodka, enhancing its smoothness and clarity without overpowering its natural character. Ideal for home bars and professional mixing, this blend keeps cocktails balanced, clean, and easy to serve.'
}

const benefits = [
  { title: 'Same Day Delivery', copy: 'Fast delivery with professional driver partners.' },
  { title: '100% Original', copy: 'All products are curated and checked before listing.' },
  { title: 'Lowest Price Guarantee', copy: 'Regular promos and attractive prices for selected products.' },
  { title: 'Largest Selection', copy: 'More than 1000 choices of alcoholic and non-alcoholic drinks.' }
]

const mayLike = [
  { brand: 'Cloud Seven', name: 'Friendship Black Tea Vodka 650ml', price: 'Rp 85.000,00', color: '#7b4b21', slug: '/products/friendship-black-tea-vodka-650ml' },
  { brand: 'Maze Maze', name: 'Maze Maze Vodka Original 700ml', price: 'Rp 350.000,00', color: '#f3f3f3', slug: '/products/maze-maze-vodka-original-700ml' },
  { brand: 'Orang Tua', name: 'Intisari Blackcurrant 620ml', price: 'Rp 76.000,00', color: '#3c1937', slug: '/products/intisari-blackcurrant-620ml' }
]

const recommendedProducts = [
  { brand: 'Cloud Seven', name: 'Friendship Black Tea Vodka 650ml', price: 'Rp 85.000,00', color: '#7b4b21', size: 'h-72 w-20', slug: 'friendship-black-tea-vodka-650ml' },
  { brand: 'Maze Maze', name: 'Maze Maze Vodka Original 700ml', price: 'Rp 350.000,00', color: '#f3f3f3', size: 'h-72 w-24', slug: 'maze-maze-vodka-original-700ml' },
  { brand: 'Orang Tua', name: 'Intisari Blackcurrant 620ml', price: 'Rp 76.000,00', color: '#3c1937', size: 'h-72 w-20', slug: 'intisari-blackcurrant-620ml' },
  { brand: 'Iceland', name: 'Iceland Vodka Original 350ml', price: 'Rp 90.000,00', color: '#e8eef8', size: 'h-72 w-20', slug: 'iceland-vodka-original-350ml' },
  { brand: 'Kawa Kawa', name: 'Kawa Kawa Anggur Hijau 600ml', price: 'Rp 76.000,00', color: '#4f7c3e', size: 'h-72 w-20', slug: 'kawa-kawa-anggur-hijau-600ml' },
  { brand: 'Happy Soju', name: 'Happy Soju Lemon 360ml', price: 'Rp 70.000,00', color: '#61a43e', size: 'h-72 w-20', slug: 'happy-soju-lemon-360ml' }
]

useSeoMeta({
  title: `${product.name} - Cellarjak`,
  description: product.description
})

watchEffect(() => {
  if (route.params.slug) quantity.value = 1
})

const shareProduct = async () => {
  if (typeof navigator !== 'undefined' && navigator.share) {
    try {
      await navigator.share({
        title: product.name,
        text: product.description,
        url: window.location.href
      })
    } catch {
      // User cancelled the native share sheet.
    }
  }
}
</script>
