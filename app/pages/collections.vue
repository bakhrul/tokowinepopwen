<template>
  <main class="bg-white">
    <section class="border-b border-[#eeeeee] px-5 py-10 sm:px-8 lg:px-12">
      <div class="mx-auto max-w-[1920px]">
        <nav class="mb-6 flex items-center gap-2 text-sm text-[#777]">
          <NuxtLink to="/" class="text-[#3769aa] hover:underline">Home</NuxtLink>
          <IconChevronRight class="size-4" />
          <span>Collections</span>
        </nav>
        <div class="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p class="text-sm font-bold uppercase tracking-[0.2em] text-brand-red">Browse by brand</p>
            <h1 class="mt-2 text-3xl font-bold sm:text-4xl">Collections</h1>
          </div>
          <p class="max-w-xl text-sm leading-6 text-[#666]">
            Explore curated brand shelves with a cleaner grid, quick scanning, and smooth hover states.
          </p>
        </div>
      </div>
    </section>

    <section class="px-5 py-10 sm:px-8 lg:px-12">
      <div class="mx-auto grid max-w-[1920px] grid-cols-1 gap-px overflow-hidden border border-[#eeeeee] bg-[#eeeeee] sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        <NuxtLink
          v-for="brand in brands"
          :key="brand.name"
          :to="brand.to"
          class="group grid min-h-60 min-w-0 place-items-center overflow-hidden bg-white p-6 text-center transition duration-300 hover:z-10 hover:-translate-y-1 hover:shadow-xl"
        >
          <div class="min-w-0 w-full">
            <div :class="['mx-auto flex h-24 w-full max-w-[220px] items-center justify-center overflow-hidden bg-white px-4 transition', brand.logoTone]">
              <div v-if="brand.logoStyle === 'seal'" class="grid size-16 place-items-center rounded-full border-4 border-current text-2xl font-black">
                {{ brand.initials }}
              </div>
              <div v-else-if="brand.logoStyle === 'script'" class="max-w-full truncate font-display text-3xl font-bold italic leading-none">
                {{ brand.shortName }}
              </div>
              <div v-else-if="brand.logoStyle === 'stack'" class="max-w-full overflow-hidden text-center">
                <span class="block max-w-full truncate text-xl font-black uppercase leading-none tracking-[0.1em]">{{ brand.shortName }}</span>
                <span class="mt-2 block text-[10px] font-bold uppercase tracking-[0.24em] opacity-60">Reserve</span>
              </div>
              <div v-else class="max-w-full truncate text-2xl font-black uppercase tracking-tight">
                {{ brand.shortName }}
              </div>
            </div>
            <h2 class="mt-5 text-base font-semibold text-[#333]">{{ brand.name }}</h2>
          </div>
        </NuxtLink>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
const brandNames = [
  '1800 Tequila', 'Big Crimes', 'Aberfeldy', 'Accademia Acquavitae', 'Amrut', 'Anker', 'Arcadia', 'Asahi',
  'Astrolabe', 'Avion', 'Bali Hai', 'Balvenie', 'Batavia', 'Beells', 'Beringer', 'Bintang',
  'Black & White', 'Bols', 'Bombay', 'Bowmore', 'Buffalo Trace', 'Caldera', 'Canadian Club', 'Captain Morgan',
  'Cardhu', 'Carlsberg', 'Casillero del Diablo', 'Chivas Regal', 'Cheosnun', 'Cloud Seven', 'Cockburns', 'Concha Y Toro',
  'Coopers', 'Corona Extra', "Dewar's", 'Don Julio', 'Drambuie', 'Duvel', 'Fireball', 'Genesis',
  'Glenfiddich', "Gordon's", 'Guinness', 'Grey Goose', 'Hatten', 'Heineken', 'Hennessy', 'Hibiki',
  'Iceland', "Jack Daniel's", 'Jameson', 'Jim Beam', 'Jinro', 'Johnnie Walker', 'Jose Cuervo', 'Kahlua',
  'Kirin', 'Knob Creek', 'Konishi', 'Kura Kura', 'Label 5', 'Lagavulin', 'Laphroaig', 'Lark',
  'Lavau', 'Liefmans', 'Los Vascos', 'Lucarelli', "Maker's Mark", 'Martell', 'Midori', 'Monkey Shoulder',
  'Mortlach', "Myers's Rum", 'Naked Malt', 'Orang Tua', 'Patron', 'Peroni', 'Porto Cruz', 'Prost Beer',
  'Roche Mazet', 'Royal Brewhouse', 'San Miguel', 'Singleton', 'Smirnoff', 'Southern Comfort', 'Tanqueray', 'The Macallan',
  'Tsingtao', 'Two Islands', 'Vedett', 'Vibe', 'Wijaya', 'Yellow Tail'
]

const brands = brandNames.map((name) => ({
  name,
  initials: name.split(/\s+/).map((word) => word[0]).join('').slice(0, 2),
  shortName: name.length > 12 ? name.split(/\s+/)[0] : name,
  logoStyle: getLogoStyle(name),
  logoTone: getLogoTone(name),
  to: `/collections/${name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`
}))

function getLogoStyle(name: string) {
  const styles = ['word', 'seal', 'script', 'stack']
  return styles[name.length % styles.length]
}

function getLogoTone(name: string) {
  const tones = [
    'text-[#222]',
    'text-[#9b6a2f]',
    'text-[#0f5138]',
    'text-[#6e1f2d]',
    'text-[#1d4f91]'
  ]
  return tones[name.charCodeAt(0) % tones.length]
}
</script>
