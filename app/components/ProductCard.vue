<template>
  <article class="group relative flex min-h-[430px] flex-col border border-[#d8d8d8] bg-white p-4 transition duration-300 hover:z-10 hover:shadow-xl">
    <button class="absolute right-4 top-4 z-10 grid size-10 place-items-center rounded-full bg-brand-green text-3xl font-light leading-none text-white shadow-md transition group-hover:scale-110" aria-label="Add to cart">
      +
    </button>
    <NuxtLink :to="productPath" class="contents" :aria-label="`View ${product.name}`">
      <div class="grid h-[250px] place-items-center overflow-hidden">
        <img v-if="product.imageUrl" :src="product.imageUrl" :alt="product.name" class="max-h-[230px] max-w-full object-contain transition duration-500 group-hover:-translate-y-2" loading="lazy" />
        <div
          v-else
          class="product-bottle relative rounded-b-lg rounded-t-full shadow-xl transition duration-500 group-hover:-translate-y-2"
          :class="product.size || 'h-64 w-20'"
          :style="`--bottle:${product.color}`"
        />
      </div>
      <div class="mt-auto px-1 pb-3">
        <p class="text-sm font-medium text-[#8b8b8b]">{{ product.brand }}</p>
        <h3 class="mt-2 min-h-[52px] text-lg font-medium leading-snug text-[#333]">{{ product.name }}</h3>
        <div class="mt-3 min-h-[52px]">
          <p v-if="product.originalPrice" class="text-sm font-semibold text-[#999] line-through">{{ product.originalPrice }}</p>
          <p class="text-lg font-bold text-[#333]">{{ product.currentPrice || product.price }}</p>
        </div>
        <p class="mt-5 flex items-center gap-2 text-sm font-medium text-[#4e8b3d]">
          <span class="size-2 rounded-full bg-[#4e8b3d]" />
          In stock
        </p>
      </div>
    </NuxtLink>
  </article>
</template>

<script setup lang="ts">
const props = defineProps<{
  product: {
    brand: string
    name: string
    price: string
    currentPrice?: string
    originalPrice?: string
    color: string
    size?: string
    slug?: string
    imageUrl?: string
  }
}>()

const productPath = computed(() => {
  const slug = props.product.slug || props.product.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
  if (slug.startsWith('/')) return slug
  return `/products/${slug}`
})
</script>
