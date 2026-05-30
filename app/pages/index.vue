<template>
  <main>
    <HeroSection />
    <CategoryGrid :categories="categories" />
    <OfferTiles :offers="offers" />
    <ProductCollection
      id="collections"
      title="Best Seller"
      :products="featuredProducts"
      cta-title="New Arrivals"
      cta-text="Shop all"
    />
    <StorySection />
    <BrandStrip :brands="brands" />
  </main>
</template>

<script setup lang="ts">
import beerOffer from '~/assets/images/offers/beer.jpg'
import bundlesOffer from '~/assets/images/offers/bundles.jpg'
import spiritsOffer from '~/assets/images/offers/spirits.jpg'
import wineOffer from '~/assets/images/offers/wine.jpg'

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
    image: spiritsOffer
  },
  {
    title: 'Wine',
    image: wineOffer
  },
  {
    title: 'Beer',
    image: beerOffer
  },
  {
    title: 'Bundles',
    image: bundlesOffer
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

const brands = ['Macallan', 'Hibiki', 'Don Julio', 'Jose Cuervo', 'Singleton', 'Cardhu']
</script>
