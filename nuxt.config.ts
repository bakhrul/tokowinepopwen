// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  srcDir: 'app/',
  dir: {
    public: '../public'
  },
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss'],
  css: ['~/assets/css/main.css'],
  app: {
    head: {
      title: 'tokowinepop - Curated Drinks Delivery',
      meta: [
        {
          name: 'description',
          content: 'A modern storefront UI for curated beverage delivery.'
        }
      ]
    }
  }
})
