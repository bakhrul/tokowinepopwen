<template>
  <footer class="bg-brand-red px-5 py-12 text-white sm:px-8 lg:px-12">
    <div class="mx-auto grid max-w-[1920px] gap-12 md:grid-cols-12 md:gap-8">
      <div class="md:col-span-3 lg:col-span-2">
        <h3 class="mb-6 text-xl font-bold">About Us</h3>
        <ul class="space-y-4 text-lg">
          <li v-for="item in about" :key="item"><a href="#" class="hover:underline">{{ item }}</a></li>
        </ul>
      </div>

      <div class="md:col-span-3 lg:col-span-2 lg:col-start-4">
        <h3 class="mb-6 text-xl font-bold">Our Social Media</h3>
        <ul class="space-y-3 text-lg underline underline-offset-4">
          <li v-for="item in social" :key="item.name"><a :href="item.url" target="_blank" rel="noreferrer">{{ item.name }}</a></li>
        </ul>
      </div>

      <div class="md:col-span-6 lg:col-span-4 lg:col-start-9">
        <h3 class="mb-6 text-xl font-bold">Contact us</h3>
        <p class="max-w-xl text-lg leading-relaxed">For faster replies, please use our instant chat feature.</p>
        <div class="mt-10 space-y-5 text-lg leading-relaxed">
          <p><span class="font-bold">Phone:</span> <a class="hover:underline" :href="chatUrl" target="_blank" rel="noreferrer">{{ contactPhone }}</a></p>
          <p><span class="font-bold">Email:</span> {{ contactEmail }}</p>
          <p>
            <span class="font-bold">Address:</span>
            <a class="whitespace-pre-line hover:underline" :href="footerMapsUrl" target="_blank" rel="noreferrer">{{ contactAddress }}</a>
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const { data: footerData } = await useAsyncData('tokowine-footer', fetchTokowineFooter)

const about = ['Privacy Policy', 'Terms and Conditions']
const social = computed(() => [
  { name: 'Instagram', url: footerData.value?.instagram || '#' },
  { name: 'Facebook', url: footerData.value?.facebook || '#' },
  { name: 'Tiktok', url: footerData.value?.tiktok || '#' },
  { name: 'Tokopedia', url: footerData.value?.tokopedia || '#' },
  { name: 'Shopee', url: footerData.value?.shopee || '#' }
].filter((item) => item.url !== '#'))
const contactPhone = computed(() => footerData.value?.hpno || '0812-3456-7890')
const contactEmail = computed(() => footerData.value?.email || 'hello@tokowinepop.com')
const contactAddress = computed(() => footerData.value?.address || 'Sunset Boulevard No. 88, Kebayoran\nBaru, South Jakarta 12130, Indonesia')
const chatUrl = computed(() => whatsappUrl(contactPhone.value))
const footerMapsUrl = computed(() => mapsUrl(footerData.value?.lat, footerData.value?.lon))
</script>
