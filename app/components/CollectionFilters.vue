<template>
  <div class="rounded-lg border border-[#eeeeee] bg-white p-4 shadow-sm">
    <div class="mb-4 flex items-center justify-between">
      <h2 class="text-sm font-semibold uppercase tracking-wide">Filters</h2>
      <button class="text-xs font-medium text-brand-red" @click="clearFilters">Clear</button>
    </div>

    <div class="space-y-3">
      <div v-for="filter in filters" :key="filter.title" class="border-b border-[#eeeeee] pb-3 last:border-b-0 last:pb-0">
        <button class="flex w-full items-center justify-between py-2 text-left font-medium" @click="toggle(filter.title)">
          {{ filter.title }}
          <IconChevronDown class="size-4 transition" :class="openFilters.includes(filter.title) ? 'rotate-180' : ''" />
        </button>
        <Transition name="category-slide">
          <div v-if="openFilters.includes(filter.title)" class="space-y-2 pt-2">
            <label v-for="option in filter.options" :key="option" class="flex cursor-pointer items-center gap-3 rounded px-2 py-1.5 text-sm transition hover:bg-[#fafafa]">
              <input v-model="selectedValues" :value="option" type="checkbox" class="size-4 accent-brand-red" />
              <span>{{ option }}</span>
            </label>
          </div>
        </Transition>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  filters: Array<{
    title: string
    options: string[]
  }>
  selected?: string[]
}>()

const emit = defineEmits<{
  'update:selected': [value: string[]]
}>()

const openFilters = ref(['Brand', 'Category', 'Sub Category'])

const selectedValues = computed({
  get: () => props.selected || [],
  set: (value: string[]) => emit('update:selected', value)
})

const toggle = (title: string) => {
  if (openFilters.value.includes(title)) {
    openFilters.value = openFilters.value.filter((item) => item !== title)
  } else {
    openFilters.value = [...openFilters.value, title]
  }
}

const clearFilters = () => {
  selectedValues.value = []
}
</script>
