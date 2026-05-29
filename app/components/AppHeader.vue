<template>
  <header ref="headerRef" class="relative z-40 bg-white text-[#333]">
    <Transition name="backdrop-fade">
      <button v-if="isOverlayOpen" class="fixed inset-0 z-[45] cursor-default bg-black/25 backdrop-blur-[2px]" aria-label="Close menu overlay" @click="closeAll" />
    </Transition>
    <div class="h-9 border-t border-[#1f1f1f] bg-[#eeeeee]">
      <div class="relative mx-auto flex h-full max-w-[1920px] items-center px-5 text-sm sm:px-8 lg:px-12">
        <button class="relative flex items-center gap-2 font-medium transition duration-200" :class="focusClass('language')" @click="toggleOverlay('language')">
          <IconGlobe class="size-4" />
          {{ selectedLanguage }}
          <IconChevronDown class="size-4 transition" :class="languageOpen ? 'rotate-180' : ''" />
        </button>
        <Transition name="dropdown-pop">
          <div v-if="languageOpen" class="absolute left-5 top-9 z-50 w-44 border border-[#dddddd] bg-white p-2 shadow-xl sm:left-8 lg:left-12">
            <button
              v-for="language in languages"
              :key="language"
              class="flex w-full items-center justify-between rounded px-3 py-2 text-left transition hover:bg-[#f7f7f7]"
              :class="selectedLanguage === language ? 'font-bold text-brand-red' : ''"
              @click="selectLanguage(language)"
            >
              {{ language }}
              <IconCheck v-if="selectedLanguage === language" class="size-4" />
            </button>
          </div>
        </Transition>
      </div>
    </div>

    <div class="bg-brand-red">
      <div class="mx-auto flex max-w-[1920px] items-center gap-4 px-5 py-4 sm:px-8 lg:px-12">
        <NuxtLink to="/" class="shrink-0 text-2xl font-light uppercase tracking-[0.16em] text-white transition duration-200 sm:text-4xl" :class="passiveHeaderClass" aria-label="Cellarjak home">
          Cellarjak
        </NuxtLink>

        <div class="relative hidden h-12 flex-1 items-center bg-white transition duration-200 md:flex" :class="focusClass('search')">
          <IconSearch class="ml-4 size-5 text-[#777]" />
          <input
            v-model="searchQuery"
            class="h-full w-full px-4 text-base outline-none placeholder:text-[#777]"
            placeholder="Search wine, whisky, soju..."
            @focus="toggleOverlay('search')"
            @keydown.enter.prevent="submitSearch"
          />
          <button v-if="searchQuery" class="grid h-12 w-12 place-items-center text-[#777]" aria-label="Clear search" @click="searchQuery = ''">
            <IconX class="size-5" />
          </button>
          <button class="grid h-12 w-20 place-items-center bg-[#a9271e] text-sm font-bold text-white transition hover:bg-[#8f211a]" @click="submitSearch">
            Search
          </button>
          <Transition name="dropdown-pop">
            <div v-if="searchOpen" class="absolute left-0 right-0 top-[calc(100%+8px)] z-50 border border-[#dddddd] bg-white p-4 text-[#333] shadow-2xl">
              <div class="mb-3 flex items-center justify-between">
                <p class="text-sm font-black uppercase tracking-wide text-[#777]">{{ searchQuery ? 'Search results' : 'Popular searches' }}</p>
                <button class="text-sm font-bold text-brand-red" @click="searchOpen = false">Close</button>
              </div>
              <div class="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                <NuxtLink v-for="item in filteredSuggestions" :key="item.name" :to="item.slug" class="flex items-center gap-3 rounded border border-[#eeeeee] p-3 transition hover:border-brand-red/40 hover:bg-[#fafafa]" @click="searchOpen = false">
                  <span class="product-bottle relative block h-14 w-5 shrink-0 rounded-b rounded-t-full" :style="`--bottle:${item.color}`" />
                  <span>
                    <span class="block text-sm font-bold">{{ item.name }}</span>
                    <span class="text-xs text-[#777]">{{ item.category }}</span>
                  </span>
                </NuxtLink>
              </div>
            </div>
          </Transition>
        </div>

        <div class="ml-auto flex items-center gap-3 text-white sm:gap-5">
          <a class="hidden items-center gap-2 text-base transition duration-200 sm:flex" :class="passiveHeaderClass" href="#">
            <IconUser class="size-6" />
            Log in
          </a>
          <div class="relative transition duration-200" :class="focusClass('cart')">
            <button class="flex items-center gap-2 text-base" @click="toggleOverlay('cart')">
              <span class="relative">
                <IconShoppingCart class="size-7" />
                <span class="absolute -right-2 -top-2 grid size-5 place-items-center rounded-full bg-white text-xs font-black text-brand-red">{{ cartItems.length }}</span>
              </span>
              <span class="hidden sm:inline">Cart</span>
            </button>
            <Transition name="dropdown-pop">
              <div v-if="cartOpen" class="absolute right-0 top-[calc(100%+16px)] z-50 w-[min(360px,calc(100vw-32px))] border border-[#dddddd] bg-white p-4 text-[#333] shadow-2xl">
                <div class="mb-3 flex items-center justify-between">
                  <h3 class="font-black">Shopping Cart</h3>
                  <button class="text-sm font-bold text-brand-red" @click="cartOpen = false">Close</button>
                </div>
                <div v-if="cartItems.length" class="space-y-3">
                  <div v-for="item in cartItems" :key="item.name" class="flex gap-3 border-b border-[#eeeeee] pb-3">
                    <span class="product-bottle relative mt-1 block h-16 w-6 shrink-0 rounded-b rounded-t-full" :style="`--bottle:${item.color}`" />
                    <div class="min-w-0 flex-1">
                      <p class="truncate text-sm font-bold">{{ item.name }}</p>
                      <p class="mt-1 text-sm text-[#777]">{{ item.qty }} x {{ formatRupiah(item.price) }}</p>
                    </div>
                    <button aria-label="Remove item" class="text-[#777] transition hover:text-brand-red" @click="removeCartItem(item.name)">
                      <IconTrash class="size-5" />
                    </button>
                  </div>
                </div>
                <div v-else class="rounded bg-[#fafafa] p-6 text-center text-sm text-[#777]">
                  Your cart is empty.
                </div>
                <div class="mt-4 flex items-center justify-between text-sm">
                  <span class="font-bold">Subtotal</span>
                  <span class="font-black">{{ subtotal }}</span>
                </div>
                <div class="mt-4 grid grid-cols-2 gap-3">
                  <NuxtLink to="/cart" class="border border-[#333] px-4 py-3 text-center text-sm font-black" @click="closeAll">View Cart</NuxtLink>
                  <a href="#" class="bg-brand-red px-4 py-3 text-center text-sm font-black text-white">Checkout</a>
                </div>
              </div>
            </Transition>
          </div>
        </div>
      </div>

      <div class="px-5 pb-4 md:hidden">
        <div class="relative flex h-11 bg-white transition duration-200" :class="focusClass('search')">
          <IconSearch class="ml-3 mt-3 size-5 text-[#777]" />
          <input v-model="searchQuery" class="h-full w-full px-3 text-sm outline-none placeholder:text-[#777]" placeholder="Search..." @focus="toggleOverlay('search')" @keydown.enter.prevent="submitSearch" />
          <button class="grid h-11 w-16 place-items-center bg-[#a9271e] text-xs font-bold text-white" @click="submitSearch">Search</button>
        </div>
        <Transition name="dropdown-pop">
          <div v-if="searchOpen" class="relative z-50 mt-2 border border-[#dddddd] bg-white p-3 text-[#333] shadow-xl">
            <div class="mb-2 flex items-center justify-between">
              <p class="text-xs font-black uppercase tracking-wide text-[#777]">{{ searchQuery ? 'Search results' : 'Popular searches' }}</p>
              <button class="text-xs font-bold text-brand-red" @click="searchOpen = false">Close</button>
            </div>
            <NuxtLink v-for="item in filteredSuggestions" :key="item.name" :to="item.slug" class="flex items-center gap-3 rounded border-b border-[#eeeeee] py-3 last:border-b-0" @click="searchOpen = false">
              <span class="product-bottle relative block h-12 w-5 shrink-0 rounded-b rounded-t-full" :style="`--bottle:${item.color}`" />
              <span>
                <span class="block text-sm font-bold">{{ item.name }}</span>
                <span class="text-xs text-[#777]">{{ item.category }}</span>
              </span>
            </NuxtLink>
          </div>
        </Transition>
      </div>
    </div>

    <nav class="border-b border-[#dedede] bg-white">
      <div class="relative mx-auto flex max-w-[1920px] items-center gap-8 overflow-visible px-5 text-base sm:px-8 lg:px-12">
        <div class="relative transition duration-200" :class="focusClass('category')">
          <button class="relative flex h-14 items-center gap-2 whitespace-nowrap border-b-2 border-[#333] font-semibold" @click="toggleOverlay('category')">
            Categories
            <IconChevronDown class="size-4 transition" :class="categoryOpen ? 'rotate-180' : ''" />
          </button>
          <Transition name="dropdown-pop">
            <div v-if="categoryOpen" class="absolute left-0 top-full z-50 grid w-[min(720px,calc(100vw-40px))] grid-cols-1 border border-[#eeeeee] bg-white shadow-xl sm:grid-cols-[300px_1fr]">
              <div class="border-b border-[#eeeeee] p-3 sm:border-b-0 sm:border-r">
                <button
                  v-for="(item, index) in categories"
                  :key="item.name"
                  class="flex w-full items-center justify-between px-4 py-3 text-left text-base transition hover:bg-[#f7f7f7] hover:text-brand-red"
                  :class="activeCategory === index ? 'bg-[#f7f7f7] font-bold text-brand-red' : ''"
                  @focus="activeCategory = index"
                  @mouseenter="activeCategory = index"
                  @click="goToCategory(item.name)"
                >
                  <span>{{ item.name }}</span>
                  <IconChevronRight class="size-4" />
                </button>
              </div>
              <div class="min-h-64 p-5">
                <Transition name="menu-fade" mode="out-in">
                  <div :key="categories[activeCategory].name" class="grid gap-3 sm:grid-cols-2">
                    <NuxtLink v-for="sub in categories[activeCategory].children" :key="sub" :to="categoryPath(sub)" class="rounded border border-transparent px-3 py-2 text-base transition hover:border-[#eeeeee] hover:bg-[#fafafa] hover:text-brand-red" @click="closeAll">
                      {{ sub }}
                    </NuxtLink>
                  </div>
                </Transition>
              </div>
            </div>
          </Transition>
        </div>
        <NuxtLink v-for="item in navItems" :key="item.label" :to="item.to" class="whitespace-nowrap py-4 font-semibold transition hover:text-brand-red" :class="passiveHeaderClass">
          {{ item.label }}
        </NuxtLink>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
const navItems = [
  { label: 'Deals', to: '#' },
  { label: 'Brands', to: '/collections' },
  { label: 'Guides', to: '#' },
  { label: 'Contact', to: '/contact' }
]
const route = useRoute()
const headerRef = ref<HTMLElement | null>(null)
const activeCategory = ref(0)
const languageOpen = ref(false)
const cartOpen = ref(false)
const searchOpen = ref(false)
const categoryOpen = ref(false)
const selectedLanguage = ref('English')
const searchQuery = ref('')

const languages = ['English', 'Bahasa Indonesia']

const categories = [
  { name: 'Wine', children: ['Red Wine', 'White Wine', 'Rose Wine', 'Fortified Wine', 'Ice Wine'] },
  { name: 'Champagne & Sparkling', children: ['Champagne', 'Prosecco', 'Cava', 'Sparkling Rose'] },
  { name: 'Spirits', children: ['Whisky', 'Vodka', 'Gin', 'Rum', 'Tequila', 'Brandy'] },
  { name: 'Glassware', children: ['Wine Glasses', 'Whisky Glasses', 'Decanter', 'Bar Tools'] },
  { name: 'Other', children: ['Sake', 'Beer & Cider', 'Non Alcoholic', 'Local Pride'] }
]

const suggestions = [
  { name: 'McDonald Vodka Mix 1000ml', category: 'Spirits', color: '#f0bd2f', slug: '/products/mcdonald-vodka-mix-1000ml' },
  { name: 'Red Label Whisky 750ml', category: 'Spirits', color: '#d88426', slug: '/products/red-label-whisky-750ml' },
  { name: 'Sauvignon Blanc 750ml', category: 'Wine', color: '#d8c36a', slug: '/products/sauvignon-blanc-750ml' },
  { name: 'Cheosnun Soju Lychee', category: 'Soju', color: '#2f8b45', slug: '/products/cheosnun-soju-lychee' },
  { name: 'Bintang Beer Can', category: 'Beer & Cider', color: '#d9d9d9', slug: '/products/bintang-beer-can' },
  { name: 'Kawa Kawa Blackcurrant', category: 'Local Pride', color: '#4b203f', slug: '/products/kawa-kawa-blackcurrant' }
]

const cartItems = ref([
  { name: 'Red Label Whisky 750ml', qty: 1, price: 350000, color: '#d88426' },
  { name: 'Cheosnun Soju Lychee', qty: 2, price: 60000, color: '#2f8b45' }
])

const filteredSuggestions = computed(() => {
  const keyword = searchQuery.value.trim().toLowerCase()
  if (!keyword) return suggestions.slice(0, 6)
  return suggestions.filter((item) => `${item.name} ${item.category}`.toLowerCase().includes(keyword)).slice(0, 6)
})

const formatRupiah = (value: number) => `Rp ${value.toLocaleString('id-ID')}`

const subtotal = computed(() => formatRupiah(cartItems.value.reduce((total, item) => total + item.qty * item.price, 0)))

const removeCartItem = (name: string) => {
  cartItems.value = cartItems.value.filter((item) => item.name !== name)
}

const selectLanguage = (language: string) => {
  selectedLanguage.value = language
  languageOpen.value = false
}

const isOverlayOpen = computed(() => languageOpen.value || cartOpen.value || searchOpen.value || categoryOpen.value)
const activeOverlay = computed(() => {
  if (languageOpen.value) return 'language'
  if (searchOpen.value) return 'search'
  if (cartOpen.value) return 'cart'
  if (categoryOpen.value) return 'category'
  return ''
})

const focusClass = (name: 'language' | 'search' | 'cart' | 'category') => {
  if (!isOverlayOpen.value) return 'z-40'
  return activeOverlay.value === name ? 'z-50' : 'z-40 blur-sm opacity-55'
}

const passiveHeaderClass = computed(() => (isOverlayOpen.value ? 'blur-sm opacity-55' : ''))

const closeAll = () => {
  languageOpen.value = false
  cartOpen.value = false
  searchOpen.value = false
  categoryOpen.value = false
}

const toggleOverlay = (target: 'language' | 'search' | 'cart' | 'category') => {
  const nextState = {
    language: target === 'language' ? !languageOpen.value : false,
    search: target === 'search' ? !searchOpen.value : false,
    cart: target === 'cart' ? !cartOpen.value : false,
    category: target === 'category' ? !categoryOpen.value : false
  }

  languageOpen.value = nextState.language
  searchOpen.value = nextState.search
  cartOpen.value = nextState.cart
  categoryOpen.value = nextState.category
}

const categoryPath = (name: string) => `/categories/${name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`

const goToCategory = async (name: string) => {
  closeAll()
  await navigateTo(categoryPath(name))
}

const submitSearch = async () => {
  const keyword = searchQuery.value.trim()
  if (!keyword) {
    languageOpen.value = false
    searchOpen.value = true
    cartOpen.value = false
    categoryOpen.value = false
    return
  }

  closeAll()
  await navigateTo({ path: '/search', query: { q: keyword } })
}

const handlePointerDown = (event: PointerEvent) => {
  if (!isOverlayOpen.value) return
  if (headerRef.value?.contains(event.target as Node)) return
  closeAll()
}

watch(() => route.fullPath, closeAll)

onMounted(() => document.addEventListener('pointerdown', handlePointerDown))
onUnmounted(() => document.removeEventListener('pointerdown', handlePointerDown))
</script>
