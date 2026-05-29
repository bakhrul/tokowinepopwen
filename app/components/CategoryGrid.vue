<template>
  <section class="bg-white px-5 py-12 sm:px-8 lg:px-12">
    <h2 class="mb-10 text-center text-3xl font-black tracking-tight text-[#333] sm:text-4xl">Categories</h2>
    <div class="mx-auto grid max-w-[1760px] grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-3 lg:grid-cols-4">
      <NuxtLink v-for="category in categories" :key="category.name" :to="categoryPath(category.name)" class="group text-center">
          <div class="relative mx-auto grid aspect-square max-w-[250px] place-items-center rounded-full bg-[#d9d9d9] transition duration-500 group-hover:-translate-y-1 group-hover:bg-[#eeeeee]">
            <div class="absolute -bottom-4 h-8 w-2/3 rounded-full bg-black/10 blur-xl" />
            <div class="flex items-end justify-center gap-2">
              <span
                v-for="(bottle, bottleIndex) in category.bottles"
                :key="bottleIndex"
                class="product-bottle relative block rounded-b-lg rounded-t-full shadow-xl"
                :class="bottle.size"
                :style="`--bottle:${bottle.color}`"
              />
            </div>
          </div>
          <h3 class="mt-6 text-xl font-black text-[#333]">{{ category.name }}</h3>
      </NuxtLink>
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  categories: Array<{
    name: string
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
