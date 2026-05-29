<template>
  <main>
    <HeroSection />
    <CategoryGrid :categories="categories" />
    <OfferTiles :offers="offers" />
    <ProductCollection
      id="collections"
      title="Tabbed Collections"
      :tabs="['New Collection', 'Bestseller', 'Featured Product']"
      :products="featuredProducts"
      cta-title="New Arrivals"
      cta-text="Shop all"
    />
    <StorySection />
    <PromoProductGrid title="Local Pride" promo-class="local-promo-bg" href="/categories/local-pride" :products="localProducts" />
    <PromoProductGrid title="Soju" promo-class="soju-promo-bg" href="/categories/soju" :products="sojuProducts" reverse />
    <BrandStrip :brands="brands" />
  </main>
</template>

<script setup lang="ts">
const categories = [
  {
    name: 'Spirits',
    children: ['Whisky', 'Vodka', 'Gin', 'Rum', 'Tequila', 'Brandy'],
    bottles: [
      { color: '#d7953d', size: 'h-60 w-20' },
      { color: '#5fa6cf', size: 'h-72 w-24' },
      { color: '#c48342', size: 'h-36 w-24' }
    ]
  },
  {
    name: 'Wine',
    children: ['Red Wine', 'White Wine', 'Rose Wine', 'Sparkling Wine', 'Fortified Wine'],
    bottles: [
      { color: '#26231f', size: 'h-80 w-24' },
      { color: '#7b1e2a', size: 'h-56 w-12' }
    ]
  },
  {
    name: 'Sparkling',
    children: ['Champagne', 'Prosecco', 'Cava', 'Sparkling Rose'],
    bottles: [
      { color: '#2e7d46', size: 'h-80 w-20' },
      { color: '#ead070', size: 'h-60 w-12' }
    ]
  },
  {
    name: 'Beer & Cider',
    children: ['Lager', 'Ale', 'Craft Beer', 'Cider', 'Beer Bundles'],
    bottles: [
      { color: '#e0a030', size: 'h-64 w-16' },
      { color: '#b06b24', size: 'h-80 w-16' }
    ]
  },
  {
    name: 'Sake',
    children: ['Junmai', 'Ginjo', 'Daiginjo', 'Nigori', 'Sake Sets'],
    bottles: [
      { color: '#fffaf0', size: 'h-80 w-24' },
      { color: '#f7f1e1', size: 'h-36 w-16' }
    ]
  },
  {
    name: 'Non Alcoholic',
    children: ['Soda', 'Tonic Water', 'Mocktail', 'Zero Alcohol Beer'],
    bottles: [
      { color: '#315bbd', size: 'h-40 w-20' },
      { color: '#64c58b', size: 'h-72 w-20' }
    ]
  },
  {
    name: 'Local Pride',
    children: ['Local Whisky', 'Local Wine', 'Soju Lokal', 'Beer Lokal'],
    bottles: [
      { color: '#2c7b6b', size: 'h-56 w-16' },
      { color: '#a23a66', size: 'h-72 w-20' },
      { color: '#bf5c2b', size: 'h-80 w-20' }
    ]
  }
]

const offers = [
  {
    title: 'Spirits',
    bottles: [
      { color: '#d98b32', size: 'h-52 w-16' },
      { color: '#b56c2c', size: 'h-48 w-16' }
    ]
  },
  {
    title: 'Wine',
    bottles: [
      { color: '#25221d', size: 'h-56 w-16' },
      { color: '#6d1826', size: 'h-60 w-16' }
    ]
  },
  {
    title: 'Beer',
    bottles: [
      { color: '#e2a72d', size: 'h-52 w-14' },
      { color: '#202020', size: 'h-48 w-16' }
    ]
  }
]

const featuredProducts = [
  { brand: 'McDonald', name: 'McDonald Vodka Mix 1000ml', price: 'Rp 110.000,00', color: '#f0bd2f', size: 'h-80 w-24', slug: 'mcdonald-vodka-mix-1000ml' },
  { brand: 'Johnnie Walker', name: 'Johnnie Walker Red Label Blended Whisky 750ml', price: 'Rp 350.000,00', color: '#d88426', size: 'h-80 w-24' },
  { brand: 'Jim Beam', name: 'Jim Beam White Bourbon Whiskey 750ml', price: 'Rp 370.000,00', color: '#c1782e', size: 'h-72 w-24' },
  { brand: "Jack Daniel's", name: 'Jack Daniels Tennessee Whiskey 700ml', price: 'Rp 500.000,00', color: '#1f1f1f', size: 'h-80 w-24' },
  { brand: 'Jameson', name: 'Jameson Original Irish Whiskey 700ml', price: 'Rp 430.000,00', color: '#235f3e', size: 'h-80 w-24' },
  { brand: 'Batavia', name: 'Batavia Whisky 350ml', price: 'Rp 170.000,00', color: '#ba6a2e', size: 'h-64 w-24' },
  { brand: 'Chivas Regal', name: 'Chivas Regal 12 Years Old 700ml', price: 'Rp 570.000,00', color: '#d69a3a', size: 'h-80 w-28' },
  { brand: 'Monkey Shoulder', name: 'Monkey Shoulder Blended Whisky 700ml', price: 'Rp 700.000,00', color: '#d19035', size: 'h-72 w-24' },
  { brand: 'Glenfiddich', name: 'Glenfiddich 12yrs Single Malt Whisky 700ml', price: 'Rp 820.000,00', color: '#285338', size: 'h-80 w-24' },
  { brand: 'Buffalo Trace', name: 'Buffalo Trace Bourbon Whiskey 750ml', price: 'Rp 715.000,00', color: '#9c351d', size: 'h-72 w-24' }
]

const localProducts = [
  { brand: 'Iceland', name: 'Iceland Vodka Original 700ml', price: 'Rp 160.000,00', color: '#e8eef8', size: 'h-72 w-20' },
  { brand: 'Kawa Kawa', name: 'Kawa Kawa Blackcurrant 600ml', price: 'Rp 76.000,00', color: '#4b203f', size: 'h-64 w-20' },
  { brand: 'Cheosnun Soju', name: 'Cheosnun Soju Lychee 360ml', price: 'Rp 60.000,00', color: '#2f8b45', size: 'h-72 w-20' },
  { brand: 'Bintang', name: 'Bintang Beer Can 500ml', price: 'Rp 34.000,00', color: '#d9d9d9', size: 'h-52 w-24' },
  { brand: 'Vibe', name: 'Vibe Exotic Lychee 700ml', price: 'Rp 290.000,00', color: '#c33376', size: 'h-80 w-24' },
  { brand: 'Kawa Kawa', name: 'Kawa Kawa Anggur Hijau 600ml', price: 'Rp 76.000,00', color: '#4f7c3e', size: 'h-72 w-20' }
]

const sojuProducts = [
  { brand: 'Cheosnun Soju', name: 'Cheosnun Soju Lychee 360ml', price: 'Rp 60.000,00', color: '#2f8b45', size: 'h-72 w-20' },
  { brand: 'Happy Soju', name: 'Happy Soju Strawberry 360ml', price: 'Rp 70.000,00', color: '#3a964e', size: 'h-72 w-20' },
  { brand: 'Cheosnun Soju', name: 'Cheosnun Soju Peach 360ml', price: 'Rp 60.000,00', color: '#319150', size: 'h-72 w-20' },
  { brand: 'Happy Soju', name: 'Andong Strength Soju Original 700ml', price: 'Rp 225.000,00', color: '#e8e8e8', size: 'h-72 w-24' },
  { brand: 'Cheosnun Soju', name: 'Cheosnun Soju Mango 360ml', price: 'Rp 60.000,00', color: '#3e7b39', size: 'h-64 w-20' },
  { brand: 'Happy Soju', name: 'Happy Soju Lemon 360ml', price: 'Rp 70.000,00', color: '#61a43e', size: 'h-72 w-20' }
]

const brands = ['Macallan', 'Hibiki', 'Don Julio', 'Jose Cuervo', 'Singleton', 'Cardhu']
</script>
