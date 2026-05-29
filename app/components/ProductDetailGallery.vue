<template>
  <div class="grid gap-5 md:grid-cols-[74px_1fr]">
    <div class="flex gap-3 overflow-x-auto md:flex-col">
      <button
        v-for="(image, index) in images"
        :key="image.label"
        class="grid size-20 shrink-0 place-items-center border bg-white transition hover:border-brand-red"
        :class="activeImage === index ? 'border-[#333] ring-1 ring-[#333]' : 'border-[#dddddd]'"
        @click="activeImage = index"
      >
        <span class="product-bottle relative block h-12 w-5 rounded-b rounded-t-full" :style="`--bottle:${image.color}`" />
      </button>
    </div>

    <div
      class="group relative grid min-h-[520px] cursor-zoom-in place-items-center overflow-hidden bg-white"
      @mousemove="handleMouseMove"
      @mouseleave="resetZoom"
      @click="zoomOpen = true"
    >
      <div class="zoom-glow absolute inset-0 opacity-0 transition group-hover:opacity-100" />
      <div
        class="product-bottle relative h-[420px] w-32 rounded-b-xl rounded-t-full shadow-2xl transition duration-300"
        :class="isZooming ? 'scale-125' : 'scale-100'"
        :style="`--bottle:${images[activeImage].color}; transform-origin:${zoomX}% ${zoomY}%`"
      />
      <span class="absolute bottom-5 right-5 rounded-full bg-[#111]/80 px-4 py-2 text-xs font-bold text-white opacity-0 transition group-hover:opacity-100">
        Click to zoom
      </span>
    </div>

    <Transition name="dropdown-pop">
      <div v-if="zoomOpen" class="fixed inset-0 z-[80] grid place-items-center bg-black/75 p-5 backdrop-blur-sm" @click.self="zoomOpen = false">
        <button class="absolute right-5 top-5 grid size-11 place-items-center rounded-full bg-white text-[#333]" aria-label="Close zoom" @click="zoomOpen = false">
          <IconX class="size-5" />
        </button>
        <div class="grid h-[min(760px,84vh)] w-full max-w-4xl place-items-center rounded bg-white">
          <div class="product-bottle relative h-[min(620px,72vh)] w-44 rounded-b-xl rounded-t-full shadow-2xl" :style="`--bottle:${images[activeImage].color}`" />
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  images: Array<{
    label: string
    color: string
  }>
}>()

const activeImage = ref(0)
const zoomOpen = ref(false)
const isZooming = ref(false)
const zoomX = ref(50)
const zoomY = ref(50)

const handleMouseMove = (event: MouseEvent) => {
  const target = event.currentTarget as HTMLElement
  const rect = target.getBoundingClientRect()
  zoomX.value = Math.round(((event.clientX - rect.left) / rect.width) * 100)
  zoomY.value = Math.round(((event.clientY - rect.top) / rect.height) * 100)
  target.style.setProperty('--zoom-x', `${zoomX.value}%`)
  target.style.setProperty('--zoom-y', `${zoomY.value}%`)
  isZooming.value = true
}

const resetZoom = () => {
  isZooming.value = false
  zoomX.value = 50
  zoomY.value = 50
}
</script>
