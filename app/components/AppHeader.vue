<template>
  <header ref="headerRef" class="relative z-40 max-w-full overflow-x-clip bg-white text-[#333]">
    <Transition name="backdrop-fade">
      <button v-if="isOverlayOpen" class="fixed inset-0 z-[45] cursor-default bg-black/25 backdrop-blur-[2px]" aria-label="Close menu overlay" @click="closeAll" />
    </Transition>
    <div class="bg-brand-red">
      <div class="mx-auto flex max-w-[1920px] items-center gap-3 px-4 py-4 sm:gap-4 sm:px-8 lg:px-12">
        <NuxtLink to="/" class="min-w-0 shrink truncate text-[1.35rem] font-light tracking-[0.04em] text-white transition duration-200 sm:shrink-0 sm:text-4xl sm:tracking-[0.08em]" :class="passiveHeaderClass" aria-label="tokowinepop home">
          tokowinepop
        </NuxtLink>

        <div class="relative hidden h-12 flex-1 items-center bg-white transition duration-200 md:flex" :class="focusClass('search')">
          <input
            v-model="searchQuery"
            class="h-full w-full px-5 text-base outline-none placeholder:text-[#777]"
            placeholder="Search"
            @focus="toggleOverlay('search')"
            @keydown.enter.prevent="submitSearch"
          />
          <button v-if="searchQuery" class="grid h-12 w-12 place-items-center text-[#777]" aria-label="Clear search" @click="searchQuery = ''">
            <IconX class="size-5" />
          </button>
          <button class="grid h-12 w-20 place-items-center bg-brand-red text-white transition hover:bg-[#5b21b6]" aria-label="Search" @click="submitSearch">
            <IconSearch class="size-6" />
          </button>
          <Transition name="dropdown-pop">
            <div v-if="searchOpen" class="absolute left-0 right-0 top-[calc(100%+8px)] z-50 border border-[#dddddd] bg-white p-4 text-[#333] shadow-2xl">
              <div class="mb-3 flex items-center justify-between">
                <p class="text-sm font-semibold uppercase tracking-wide text-[#777]">{{ searchQuery ? 'Search results' : 'Popular searches' }}</p>
                <button class="text-sm font-medium text-brand-red" @click="searchOpen = false">Close</button>
              </div>
              <div class="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                <NuxtLink v-for="item in filteredSuggestions" :key="item.name" :to="item.slug" class="flex items-center gap-3 rounded border border-[#eeeeee] p-3 transition hover:border-brand-red/40 hover:bg-[#fafafa]" @click="searchOpen = false">
                  <span class="product-bottle relative block h-14 w-5 shrink-0 rounded-b rounded-t-full" :style="`--bottle:${item.color}`" />
                  <span>
                    <span class="block text-sm font-medium">{{ item.name }}</span>
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
                  <h3 class="font-bold">Shopping Cart</h3>
                  <button class="text-sm font-medium text-brand-red" @click="cartOpen = false">Close</button>
                </div>
                <div v-if="cartItems.length" class="space-y-3">
                  <div v-for="item in cartItems" :key="item.name" class="flex gap-3 border-b border-[#eeeeee] pb-3">
                    <span class="product-bottle relative mt-1 block h-16 w-6 shrink-0 rounded-b rounded-t-full" :style="`--bottle:${item.color}`" />
                    <div class="min-w-0 flex-1">
                      <p class="truncate text-sm font-medium">{{ item.name }}</p>
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
                  <span class="font-medium">Subtotal</span>
                  <span class="font-semibold">{{ subtotal }}</span>
                </div>
                <div class="mt-4 grid grid-cols-2 gap-3">
                  <NuxtLink to="/cart" class="border border-[#333] px-4 py-3 text-center text-sm font-semibold" @click="closeAll">View Cart</NuxtLink>
                  <a href="#" class="bg-brand-red px-4 py-3 text-center text-sm font-semibold text-white">Checkout</a>
                </div>
              </div>
            </Transition>
          </div>
          <div class="relative transition duration-200 sm:hidden" :class="focusClass('menu')">
            <button class="grid size-10 place-items-center" aria-label="Open navigation menu" @click="toggleOverlay('menu')">
              <span class="flex w-6 flex-col gap-1.5">
                <span class="h-0.5 w-full bg-white" />
                <span class="h-0.5 w-full bg-white" />
                <span class="h-0.5 w-full bg-white" />
              </span>
            </button>
            <Transition name="dropdown-pop">
              <div v-if="menuOpen" class="absolute right-0 top-[calc(100%+16px)] z-50 w-[min(260px,calc(100vw-32px))] border border-[#dddddd] bg-white p-3 text-[#333] shadow-2xl">
                <NuxtLink v-for="item in navItems" :key="item.label" :to="item.to" class="block border-b border-[#eeeeee] px-3 py-3 text-sm font-medium last:border-b-0" @click="closeAll">
                  {{ item.label }}
                </NuxtLink>
                <a class="mt-2 flex items-center gap-2 border-t border-[#eeeeee] px-3 py-3 text-sm font-medium" href="#" @click="closeAll">
                  <IconUser class="size-5" />
                  Log in
                </a>
              </div>
            </Transition>
          </div>
        </div>
      </div>

      <div class="px-5 pb-4 md:hidden">
        <div class="relative flex h-11 bg-white transition duration-200" :class="focusClass('search')">
          <input v-model="searchQuery" class="h-full w-full px-4 text-sm outline-none placeholder:text-[#777]" placeholder="Search" @focus="toggleOverlay('search')" @keydown.enter.prevent="submitSearch" />
          <button class="grid h-11 w-16 place-items-center bg-brand-red text-white" aria-label="Search" @click="submitSearch"><IconSearch class="size-5" /></button>
        </div>
        <Transition name="dropdown-pop">
          <div v-if="searchOpen" class="relative z-50 mt-2 border border-[#dddddd] bg-white p-3 text-[#333] shadow-xl">
            <div class="mb-2 flex items-center justify-between">
              <p class="text-xs font-semibold uppercase tracking-wide text-[#777]">{{ searchQuery ? 'Search results' : 'Popular searches' }}</p>
              <button class="text-xs font-medium text-brand-red" @click="searchOpen = false">Close</button>
            </div>
            <NuxtLink v-for="item in filteredSuggestions" :key="item.name" :to="item.slug" class="flex items-center gap-3 rounded border-b border-[#eeeeee] py-3 last:border-b-0" @click="searchOpen = false">
              <span class="product-bottle relative block h-12 w-5 shrink-0 rounded-b rounded-t-full" :style="`--bottle:${item.color}`" />
              <span>
                <span class="block text-sm font-medium">{{ item.name }}</span>
                <span class="text-xs text-[#777]">{{ item.category }}</span>
              </span>
            </NuxtLink>
          </div>
        </Transition>
      </div>
    </div>

    <nav class="border-b border-[#dedede] bg-white">
      <div class="relative mx-auto flex max-w-[1920px] items-center gap-6 px-4 text-sm sm:gap-8 sm:px-8 sm:text-base lg:px-12">
        <div class="relative transition duration-200" :class="focusClass('category')">
          <button class="relative flex h-14 items-center gap-2 whitespace-nowrap border-b-2 border-[#333] font-medium" @click="toggleOverlay('category')">
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
        <NuxtLink v-for="item in navItems" :key="item.label" :to="item.to" class="hidden whitespace-nowrap py-4 font-medium transition hover:text-brand-red sm:block" :class="passiveHeaderClass">
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
const cartOpen = ref(false)
const searchOpen = ref(false)
const categoryOpen = ref(false)
const menuOpen = ref(false)
const searchQuery = ref('')

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

const isOverlayOpen = computed(() => cartOpen.value || searchOpen.value || categoryOpen.value || menuOpen.value)
const activeOverlay = computed(() => {
  if (searchOpen.value) return 'search'
  if (cartOpen.value) return 'cart'
  if (categoryOpen.value) return 'category'
  if (menuOpen.value) return 'menu'
  return ''
})

const focusClass = (name: 'search' | 'cart' | 'category' | 'menu') => {
  if (!isOverlayOpen.value) return 'z-40'
  return activeOverlay.value === name ? 'z-50' : 'z-40 blur-sm opacity-55'
}

const passiveHeaderClass = computed(() => (isOverlayOpen.value ? 'blur-sm opacity-55' : ''))

const closeAll = () => {
  cartOpen.value = false
  searchOpen.value = false
  categoryOpen.value = false
  menuOpen.value = false
}

const toggleOverlay = (target: 'search' | 'cart' | 'category' | 'menu') => {
  const nextState = {
    search: target === 'search' ? !searchOpen.value : false,
    cart: target === 'cart' ? !cartOpen.value : false,
    category: target === 'category' ? !categoryOpen.value : false,
    menu: target === 'menu' ? !menuOpen.value : false
  }

  searchOpen.value = nextState.search
  cartOpen.value = nextState.cart
  categoryOpen.value = nextState.category
  menuOpen.value = nextState.menu
}

const categoryPath = (name: string) => `/categories/${name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`

const goToCategory = async (name: string) => {
  closeAll()
  await navigateTo(categoryPath(name))
}

const submitSearch = async () => {
  const keyword = searchQuery.value.trim()
  if (!keyword) {
    searchOpen.value = true
    cartOpen.value = false
    categoryOpen.value = false
    menuOpen.value = false
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
