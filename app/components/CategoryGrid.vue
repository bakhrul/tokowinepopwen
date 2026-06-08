<template>
  <section class="bg-white px-5 py-12 sm:px-8 lg:px-12">
    <h2 class="mb-10 text-center text-3xl font-bold tracking-tight text-[#333] sm:text-4xl">Categories</h2>
    <div class="mx-auto grid max-w-[1760px] grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-6 sm:gap-y-10 md:grid-cols-3 lg:grid-cols-4">
      <NuxtLink v-for="category in categories" :key="category.name" :to="categoryPath(category.name)" class="group min-w-0 text-center">
          <div class="relative mx-auto grid aspect-square w-full max-w-[250px] place-items-center overflow-hidden rounded-full bg-[#d9d9d9] transition duration-500 group-hover:-translate-y-1 group-hover:bg-[#eeeeee]">
            <img v-if="category.logoUrl" :src="category.logoUrl" :alt="category.name" class="h-full w-full object-cover transition duration-500 group-hover:scale-105" loading="lazy" />
            <div class="absolute -bottom-4 h-8 w-2/3 rounded-full bg-black/10 blur-xl" />
            <div v-if="!category.logoUrl" class="absolute inset-x-0 bottom-[8%] flex origin-bottom scale-[0.38] items-end justify-center gap-2 sm:scale-[0.48] lg:scale-[0.62] xl:scale-[0.72]">
              <span
                v-for="(bottle, bottleIndex) in category.bottles"
                :key="bottleIndex"
                class="product-bottle relative block rounded-b-lg rounded-t-full shadow-xl"
                :class="bottle.size"
                :style="`--bottle:${bottle.color}`"
              />
            </div>
          </div>
          <h3 class="mt-4 text-base font-semibold text-[#333] sm:mt-6 sm:text-xl">{{ category.name }}</h3>
      </NuxtLink>
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  categories: Array<{
    name: string
    logoUrl?: string
    children: string[]
    bottles: Array<{
      color: string
      size: string
    }>
  }>
}>()

const categoryLinks: Record<string, string> = {
  Spirits: '/categories/spirits',
  Wine: '/categories/red-wine',
  Sparkling: '/categories/champagne-sparkling',
  'Beer & Cider': '/categories/beer-cider',
  Sake: '/categories/sake',
  'Non Alcoholic': '/categories/non-alcoholic',
  'Local Pride': '/categories/local-pride'
}

const categoryPath = (name: string) => categoryLinks[name] || `/categories/${name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`
</script>
