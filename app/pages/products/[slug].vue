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
                <p class="mb-2 text-sm font-semibold uppercase tracking-wide text-brand-red">{{ product.category }}</p>
                <h1 class="text-3xl font-bold leading-tight sm:text-4xl">{{ product.name }}</h1>
                <p class="mt-2 text-sm text-[#777]">SKU: {{ product.sku }}</p>
              </div>
              <div class="flex items-center gap-2 text-sm text-[#777]">
                <IconStar class="size-4 text-[#f4b235]" />
                <span>No Reviews</span>
              </div>
            </div>

            <div class="py-6">
              <div>
                <p v-if="product.originalPrice" class="text-base font-semibold text-[#999] line-through">{{ product.originalPrice }}</p>
                <p class="text-2xl font-bold">{{ product.currentPrice || product.price }}</p>
              </div>
              <div class="mt-6 grid gap-3 sm:grid-cols-[140px_1fr]">
                <div>
                  <p class="mb-2 text-sm font-medium">Quantity</p>
                  <div class="flex h-12 border border-[#cfcfcf]">
                    <button class="grid w-12 place-items-center text-xl transition hover:bg-[#fafafa]" @click="quantity = Math.max(1, quantity - 1)">-</button>
                    <span class="grid flex-1 place-items-center font-medium">{{ quantity }}</span>
                    <button class="grid w-12 place-items-center text-xl transition hover:bg-[#fafafa]" @click="quantity++">+</button>
                  </div>
                </div>
                <div class="flex flex-col justify-end gap-3">
                  <button class="h-12 bg-[#e5f187] text-sm font-semibold uppercase tracking-wide text-brand-red transition hover:brightness-95">Add to Cart</button>
                  <button class="h-12 bg-brand-red text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-[#5b21b6]">Buy It Now</button>
                </div>
              </div>

              <div class="mt-5 flex flex-wrap gap-3">
                <NuxtLink to="/" class="inline-flex items-center gap-2 border border-[#dddddd] px-4 py-3 text-sm font-medium transition hover:border-brand-red hover:text-brand-red">
                  Continue shopping
                </NuxtLink>
              </div>
            </div>

            <div class="border border-[#dddddd]">
              <button class="flex w-full items-center justify-between px-5 py-4 text-left font-semibold" @click="descriptionOpen = !descriptionOpen">
                Description
                <IconChevronDown class="size-5 transition" :class="descriptionOpen ? 'rotate-180' : ''" />
              </button>
              <Transition name="category-slide">
                <div v-if="descriptionOpen" class="px-5 pb-5 text-sm leading-7 text-[#555]">
                  <dl class="mb-5 grid gap-x-6 gap-y-1 sm:grid-cols-[120px_1fr]">
                    <template v-for="meta in product.meta" :key="meta.label">
                      <dt class="font-medium text-[#333]">{{ meta.label }}</dt>
                      <dd>{{ meta.value }}</dd>
                    </template>
                  </dl>
                  <div class="product-description" v-html="product.description" />
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
            <h3 class="text-lg font-semibold">{{ benefit.title }}</h3>
            <p class="mt-1 text-sm leading-6 text-[#666]">{{ benefit.copy }}</p>
          </div>
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
const productSlug = computed(() => String(route.params.slug || ''))
const { data: productDetail } = await useAsyncData('tokowine-product-detail', () => fetchTokowineProductDetail(productSlug.value), {
  watch: [productSlug]
})

const fallbackProduct = {
  name: 'McDonald Vodka Mix 1000ml',
  sku: 'SPV-VK-0021',
  category: 'Spirits',
  price: 'Rp 110.000,00',
  currentPrice: 'Rp 110.000,00',
  originalPrice: '',
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

const product = computed(() => {
  if (!productDetail.value) return fallbackProduct
  const detail = productDetail.value
  const sortedImages = [...(detail.images || [])].sort((a, b) => Number(b.mainimage) - Number(a.mainimage))

  return {
    name: detail.productname,
    sku: detail.sku,
    category: detail.category,
    price: formatRupiahValue(detail.price),
    currentPrice: formatRupiahValue(hasPromoPrice(detail.promoprice) ? detail.promoprice : detail.price),
    originalPrice: hasPromoPrice(detail.promoprice) ? formatRupiahValue(detail.price) : '',
    images: sortedImages.length
      ? sortedImages.map((image, index) => ({
        label: `${detail.productname} image ${index + 1}`,
        color: '#6620d5',
        imageUrl: image.imageurl
      }))
      : fallbackProduct.images,
    meta: [
      { label: 'Brand', value: detail.brandname },
      { label: 'Category', value: detail.category },
      { label: 'Sub Category', value: detail.subcategory },
      { label: 'Weight', value: `${detail.weight} g` },
      { label: 'Stock', value: detail.stock }
    ],
    description: detail.productdesc
  }
})

const benefits = [
  { title: 'Same Day Delivery', copy: 'Fast delivery with professional driver partners.' },
  { title: '100% Original', copy: 'All products are curated and checked before listing.' },
  { title: 'Lowest Price Guarantee', copy: 'Regular promos and attractive prices for selected products.' },
  { title: 'Largest Selection', copy: 'More than 1000 choices of alcoholic and non-alcoholic drinks.' }
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
  title: () => `${product.value.name} - tokowinepop`,
  description: () => product.value.description.replace(/<[^>]+>/g, '')
})

watchEffect(() => {
  if (route.params.slug) quantity.value = 1
})

</script>
