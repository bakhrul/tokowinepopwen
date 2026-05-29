import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  content: [
    './app/components/**/*.{vue,js,ts}',
    './app/app.vue',
    './app/pages/**/*.{vue,js,ts}'
  ],
  theme: {
    extend: {
      colors: {
        ink: '#17130f',
        clay: '#a0442c',
        cork: '#f2e9d9',
        mist: '#f7f4ee',
        sage: '#596c5f',
        'brand-red': '#c52820',
        'brand-green': '#1f5c48'
      },
      boxShadow: {
        soft: '0 22px 70px rgba(31, 23, 16, 0.12)'
      },
      fontFamily: {
        sans: ['Nunito Sans', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Fraunces', 'ui-serif', 'Georgia', 'serif']
      }
    }
  }
}
