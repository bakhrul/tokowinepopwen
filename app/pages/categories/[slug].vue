<template>
  <main class="bg-white">
    <section class="px-5 py-8 sm:px-8 lg:px-12">
      <div class="mx-auto max-w-[1920px]">
        <nav class="mb-5 flex items-center gap-2 text-sm text-[#777]">
          <NuxtLink to="/" class="text-[#3769aa] hover:underline">Home</NuxtLink>
          <IconChevronRight class="size-4" />
          <span>{{ collection.title }}</span>
        </nav>

        <div class="mb-8 max-w-3xl">
          <h2 class="text-3xl font-bold">{{ collection.title }}</h2>
          <p class="mt-3 text-sm leading-7 text-[#666]">{{ collection.description }}</p>
          <button class="mt-2 text-sm font-medium underline underline-offset-4" @click="descriptionOpen = !descriptionOpen">
            {{ descriptionOpen ? 'Show less' : 'Show more' }}
          </button>
          <Transition name="category-slide">
            <p v-if="descriptionOpen" class="mt-3 text-sm leading-7 text-[#666]">
              Explore a clean collection layout with quick filters, stable spacing, and product cards designed for easy scanning across desktop and mobile.
            </p>
          </Transition>
        </div>

        <div class="mb-5 flex flex-col gap-4 border-y border-[#eeeeee] py-4 sm:flex-row sm:items-center sm:justify-between">
          <div class="flex items-center gap-3 text-sm text-[#666]">
            <span class="inline-flex items-center gap-2 font-medium text-[#333]">
              <IconFilter class="size-4" />
              Filters
            </span>
            <span>{{ sortedProducts.length }} Results</span>
          </div>
          <div class="flex items-center gap-4 text-sm">
            <button class="grid size-9 place-items-center rounded border border-[#dddddd] text-[#777]">
              <IconGrid class="size-4" />
            </button>
            <label class="flex items-center gap-2 text-[#666]">
              Sort
              <select v-model="sortBy" class="rounded border border-[#dddddd] bg-white px-3 py-2 text-[#333] outline-none">
                <option>Best selling</option>
                <option>Newest</option>
                <option>Price low to high</option>
              </select>
            </label>
          </div>
        </div>

        <div class="grid gap-6 md:grid-cols-[240px_1fr] lg:grid-cols-[260px_1fr]">
          <aside>
            <CollectionFilters class="md:sticky md:top-6" :filters="filters" :selected="selectedFilters" @update:selected="selectedFilters = $event" />
          </aside>

          <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4">
            <ProductCard v-for="product in sortedProducts" :key="product.name" :product="product" />
            <div v-if="!sortedProducts.length" class="col-span-full rounded-lg border border-[#eeeeee] p-10 text-center text-[#777]">
              No products match the selected filters.
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
const route = useRoute()
const descriptionOpen = ref(false)
const sortBy = ref('Best selling')
const selectedFilters = ref<string[]>([])

const collection = computed(() => {
  const title = String(route.params.slug || 'red-wine')
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
  return {
    title,
    description: `Discover the ${title.toLowerCase()} collection with options for dinner, gifts, and casual hosting.`
  }
})

const filters = [
  { title: 'Brand', options: ['G7', 'Fortine', 'Roche Mazet', 'Two Islands', 'Cape Root', 'Sababay'] },
  { title: 'Category', options: ['Wine', 'Spirits', 'Sparkling', 'Local Pride'] },
  { title: 'Sub Category', options: ['Red Wine', 'White Wine', 'Rose Wine', 'Fortified Wine'] }
]

const products = [
  { brand: 'G7', category: 'Wine', subCategory: 'Red Wine', name: 'G7 Merlot 750ml', price: 'Rp 290.000,00', color: '#38151c', size: 'h-72 w-20', slug: 'g7-merlot-750ml' },
  { brand: 'Hatten Wines', category: 'Wine', subCategory: 'Red Wine', name: 'Hatten Wines Bali Red Wine Cask 2000ml', price: 'Rp 395.000,00', color: '#c52238', size: 'h-64 w-28', slug: 'hatten-bali-red-wine-cask-2000ml' },
  { brand: 'Sababay', category: 'Wine', subCategory: 'Red Wine', name: 'Sababay Mascetti 750ml', price: 'Rp 390.000,00', color: '#232323', size: 'h-72 w-20', slug: 'sababay-mascetti-750ml' },
  { brand: 'Sababay', category: 'Wine', subCategory: 'Red Wine', name: 'Sababay Wine Ludisia 750ml', price: 'Rp 325.000,00', color: '#1c1c1c', size: 'h-72 w-20', slug: 'sababay-wine-ludisia-750ml' },
  { brand: 'Fortine', category: 'Wine', subCategory: 'Red Wine', name: 'Fortine Sweet Selection 750ml', price: 'Rp 240.000,00', color: '#9c2d1f', size: 'h-72 w-20', slug: 'fortine-sweet-selection-750ml' },
  { brand: 'Fortine', category: 'Wine', subCategory: 'Red Wine', name: 'Fortine Merlot 750ml', price: 'Rp 240.000,00', color: '#f2e8df', size: 'h-72 w-20', slug: 'fortine-merlot-750ml' },
  { brand: 'Arenalba', category: 'Wine', subCategory: 'Red Wine', name: 'Arenalba Petit Verdot Cabernet Merlot 750ml', price: 'Rp 430.000,00', color: '#7a321f', size: 'h-72 w-20', slug: 'arenalba-petit-verdot-cabernet-merlot-750ml' },
  { brand: 'Grande Vento', category: 'Wine', subCategory: 'Red Wine', name: 'Grande Vento Monte Cabernet Sauvignon 750ml', price: 'Rp 1.540.000,00', color: '#241a19', size: 'h-72 w-20', slug: 'grande-vento-monte-cabernet-sauvignon-750ml' },
  { brand: 'G7', category: 'Wine', subCategory: 'Red Wine', name: 'G7 Cabernet Merlot 750ml', price: 'Rp 290.000,00', color: '#32171b', size: 'h-72 w-20', slug: 'g7-cabernet-merlot-750ml' },
  { brand: 'Roche Mazet', category: 'Wine', subCategory: 'Red Wine', name: 'Roche Mazet Cabernet Sauvignon 750ml', price: 'Rp 299.000,00', color: '#602020', size: 'h-72 w-20', slug: 'roche-mazet-cabernet-sauvignon-750ml' },
  { brand: 'Lucarelli', category: 'Wine', subCategory: 'Red Wine', name: 'Lucarelli Negroamaro Puglia 750ml', price: 'Rp 340.000,00', color: '#1f1c2b', size: 'h-72 w-20', slug: 'lucarelli-negroamaro-puglia-750ml' },
  { brand: 'Two Islands', category: 'Wine', subCategory: 'Red Wine', name: 'Two Islands Shiraz 750ml', price: 'Rp 390.000,00', color: '#4b1b4a', size: 'h-72 w-20', slug: 'two-islands-shiraz-750ml' },
  { brand: 'Cape Root', category: 'Wine', subCategory: 'Red Wine', name: 'Cape Root Sweet Red Wine 750ml', price: 'Rp 290.000,00', color: '#a05245', size: 'h-72 w-20', slug: 'cape-root-sweet-red-wine-750ml' },
  { brand: 'Sababay', category: 'Wine', subCategory: 'Red Wine', name: 'Sababay Sarga Red Wine 750ml', price: 'Rp 325.000,00', color: '#e46c4c', size: 'h-72 w-20', slug: 'sababay-sarga-red-wine-750ml' },
  { brand: 'Hatten Wines', category: 'Wine', subCategory: 'Red Wine', name: 'Hatten Wines Aga Red 750ml', price: 'Rp 300.000,00', color: '#f6f0e6', size: 'h-72 w-20', slug: 'hatten-wines-aga-red-750ml' },
  { brand: 'Hatten Wines', category: 'Wine', subCategory: 'Red Wine', name: 'Hatten Wines Sweet Syrah 750ml', price: 'Rp 450.000,00', color: '#f4f0e8', size: 'h-72 w-20', slug: 'hatten-wines-sweet-syrah-750ml' }
]

const filteredProducts = computed(() => {
  if (!selectedFilters.value.length) return products
  return products.filter((product) =>
    selectedFilters.value.includes(product.brand) ||
    selectedFilters.value.includes(product.category) ||
    selectedFilters.value.includes(product.subCategory)
  )
})

const sortedProducts = computed(() => {
  const list = filteredProducts.value
  if (sortBy.value === 'Price low to high') {
    return [...list].sort((a, b) => Number(a.price.replace(/\D/g, '')) - Number(b.price.replace(/\D/g, '')))
  }
  if (sortBy.value === 'Newest') return [...list].reverse()
  return list
})

useSeoMeta({
  title: `${collection.value.title} - tokowinepop`,
  description: collection.value.description
})


</script>
