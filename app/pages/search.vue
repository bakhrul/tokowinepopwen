<template>
  <main class="bg-white">
    <section class="border-b border-[#eeeeee] bg-[#fafafa] px-5 py-8 sm:px-8 lg:px-12">
      <div class="mx-auto max-w-[1920px]">
        <nav class="mb-5 flex items-center gap-2 text-sm text-[#777]">
          <NuxtLink to="/" class="text-[#3769aa] hover:underline">Home</NuxtLink>
          <IconChevronRight class="size-4" />
          <span>Search</span>
        </nav>

        <div class="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-end">
          <div>
            <p class="text-xs font-semibold uppercase tracking-[0.24em] text-brand-red">Search</p>
            <h1 class="mt-3 text-3xl font-bold leading-tight text-[#333] sm:text-4xl">Search results</h1>
            <p class="mt-3 max-w-2xl text-sm leading-7 text-[#666]">
              <span v-if="queryText">Showing products related to "{{ queryText }}".</span>
              <span v-else>Type a keyword in the search bar to browse matching products.</span>
            </p>
          </div>

          <form class="flex h-12 overflow-hidden border border-[#dddddd] bg-white shadow-sm" @submit.prevent="updateKeyword">
            <IconSearch class="ml-4 mt-3.5 size-5 text-[#777]" />
            <input v-model="draftKeyword" class="h-full min-w-0 flex-1 px-4 text-sm outline-none" placeholder="Search wine, whisky, soju..." />
            <button class="bg-brand-red px-5 text-sm font-semibold text-white transition hover:bg-[#5b21b6]">Search</button>
          </form>
        </div>
      </div>
    </section>

    <section class="px-5 py-8 sm:px-8 lg:px-12">
      <div class="mx-auto max-w-[1920px]">
        <div class="mb-5 flex flex-col gap-4 border-y border-[#eeeeee] py-4 sm:flex-row sm:items-center sm:justify-between">
          <div class="flex items-center gap-3 text-sm text-[#666]">
            <span class="inline-flex items-center gap-2 font-medium text-[#333]">
              <IconFilter class="size-4" />
              Filters
            </span>
            <span>{{ sortedProducts.length }} Results</span>
          </div>
          <div class="flex items-center gap-4 text-sm">
            <button class="grid size-9 place-items-center rounded border border-[#dddddd] text-[#777]" aria-label="Grid view">
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

          <div>
            <div v-if="sortedProducts.length" class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4">
              <ProductCard v-for="product in sortedProducts" :key="product.name" :product="product" />
            </div>

            <div v-else class="rounded-lg border border-[#eeeeee] bg-[#fafafa] p-10 text-center">
              <p class="text-lg font-semibold text-[#333]">No products found</p>
              <p class="mt-2 text-sm leading-6 text-[#666]">Try another keyword or clear some filters.</p>
              <button class="mt-5 bg-brand-red px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#5b21b6]" @click="resetSearch">
                Reset search
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
const route = useRoute()
const router = useRouter()

const sortBy = ref('Best selling')
const selectedFilters = ref<string[]>([])
const draftKeyword = ref('')

const queryText = computed(() => String(route.query.q || '').trim())

watch(
  queryText,
  (value) => {
    draftKeyword.value = value
    selectedFilters.value = []
  },
  { immediate: true }
)

const filters = [
  { title: 'Brand', options: ['Johnnie Walker', 'McDonald', 'Iceland', 'Cheosnun Soju', 'Bintang', 'Roche Mazet', 'Sababay', 'Kawa Kawa'] },
  { title: 'Category', options: ['Wine', 'Spirits', 'Beer & Cider', 'Soju', 'Local Pride'] },
  { title: 'Sub Category', options: ['Red Wine', 'Vodka', 'Whisky', 'Beer', 'Lychee Soju', 'Blackcurrant'] }
]

const products = [
  { brand: 'Johnnie Walker', category: 'Spirits', subCategory: 'Whisky', name: 'Red Label Whisky 750ml', price: 'Rp 350.000,00', color: '#d88426', size: 'h-72 w-20', slug: 'red-label-whisky-750ml' },
  { brand: 'McDonald', category: 'Spirits', subCategory: 'Vodka', name: 'McDonald Vodka Mix 1000ml', price: 'Rp 110.000,00', color: '#f0bd2f', size: 'h-72 w-20', slug: 'mcdonald-vodka-mix-1000ml' },
  { brand: 'Iceland', category: 'Spirits', subCategory: 'Vodka', name: 'Iceland Vodka Original 700ml', price: 'Rp 160.000,00', color: '#e7eefb', size: 'h-72 w-20', slug: 'iceland-vodka-original-700ml' },
  { brand: 'Cheosnun Soju', category: 'Soju', subCategory: 'Lychee Soju', name: 'Cheosnun Soju Lychee 360ml', price: 'Rp 60.000,00', color: '#2f8b45', size: 'h-64 w-20', slug: 'cheosnun-soju-lychee' },
  { brand: 'Happy Soju', category: 'Soju', subCategory: 'Fruit Soju', name: 'Happy Soju Strawberry 360ml', price: 'Rp 70.000,00', color: '#3c9b4e', size: 'h-64 w-20', slug: 'happy-soju-strawberry-360ml' },
  { brand: 'Bintang', category: 'Beer & Cider', subCategory: 'Beer', name: 'Bintang Beer Can 500ml', price: 'Rp 34.000,00', color: '#d9d9d9', size: 'h-52 w-24', slug: 'bintang-beer-can-500ml' },
  { brand: 'Kawa Kawa', category: 'Local Pride', subCategory: 'Blackcurrant', name: 'Kawa Kawa Blackcurrant 600ml', price: 'Rp 76.000,00', color: '#4b203f', size: 'h-72 w-20', slug: 'kawa-kawa-blackcurrant-600ml' },
  { brand: 'Roche Mazet', category: 'Wine', subCategory: 'Red Wine', name: 'Roche Mazet Cabernet Sauvignon 750ml', price: 'Rp 299.000,00', color: '#602020', size: 'h-72 w-20', slug: 'roche-mazet-cabernet-sauvignon-750ml' },
  { brand: 'Sababay', category: 'Wine', subCategory: 'Red Wine', name: 'Sababay Mascetti 750ml', price: 'Rp 390.000,00', color: '#232323', size: 'h-72 w-20', slug: 'sababay-mascetti-750ml' },
  { brand: 'Cloud Seven', category: 'Spirits', subCategory: 'Vodka', name: 'Friendship Black Tea Vodka 650ml', price: 'Rp 85.000,00', color: '#9c5f24', size: 'h-72 w-20', slug: 'friendship-black-tea-vodka-650ml' },
  { brand: 'Jim Beam', category: 'Spirits', subCategory: 'Whisky', name: 'Jim Beam White Bourbon Whiskey 750ml', price: 'Rp 370.000,00', color: '#d8892b', size: 'h-72 w-20', slug: 'jim-beam-white-bourbon-whiskey-750ml' },
  { brand: 'Sababay', category: 'Wine', subCategory: 'Red Wine', name: 'Sababay Sarga Red Wine 750ml', price: 'Rp 325.000,00', color: '#e46c4c', size: 'h-72 w-20', slug: 'sababay-sarga-red-wine-750ml' }
]

const searchedProducts = computed(() => {
  const keyword = queryText.value.toLowerCase()
  if (!keyword) return products

  return products.filter((product) =>
    `${product.name} ${product.brand} ${product.category} ${product.subCategory}`.toLowerCase().includes(keyword)
  )
})

const filteredProducts = computed(() => {
  if (!selectedFilters.value.length) return searchedProducts.value
  return searchedProducts.value.filter((product) =>
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

const updateKeyword = async () => {
  const keyword = draftKeyword.value.trim()
  await router.push({ path: '/search', query: keyword ? { q: keyword } : {} })
}

const resetSearch = async () => {
  draftKeyword.value = ''
  selectedFilters.value = []
  await router.push({ path: '/search' })
}

useSeoMeta({
  title: () => (queryText.value ? `Search ${queryText.value} - tokowinepop` : 'Search - tokowinepop'),
  description: 'Browse search results with filters, sorting, and product cards.'
})
</script>
