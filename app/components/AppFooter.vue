<template>
  <footer class="bg-brand-red px-5 py-12 text-white sm:px-8 lg:px-12">
    <div class="mx-auto grid max-w-[1920px] gap-12 md:grid-cols-2 xl:grid-cols-[0.7fr_1.35fr_1.55fr_1fr]">
      <div>
        <h3 class="mb-6 text-xl font-bold">About Us</h3>
        <ul class="space-y-4 text-lg">
          <li v-for="item in about" :key="item"><a href="#" class="hover:underline">{{ item }}</a></li>
        </ul>
      </div>

      <div>
        <h3 class="mb-6 text-xl font-bold">Our Social Media</h3>
        <ul class="space-y-3 text-lg underline underline-offset-4">
          <li v-for="item in social" :key="item"><a href="#">{{ item }}</a></li>
        </ul>
      </div>

      <div>
        <h3 class="mb-6 text-xl font-bold">Contact us</h3>
        <p class="max-w-xl text-lg leading-relaxed">For faster replies, please use our instant chat feature.</p>
        <div class="mt-10 space-y-5 text-lg leading-relaxed">
          <p><span class="font-bold">Phone:</span> 0812-3456-7890</p>
          <p><span class="font-bold">Email:</span> hello@tokowinepop.com</p>
          <p><span class="font-bold">Address:</span> Sunset Boulevard No. 88, Kebayoran<br />Baru, South Jakarta 12130, Indonesia</p>
        </div>
      </div>

      <div>
        <h3 class="mb-8 text-xl font-bold">Payment</h3>
        <div class="grid max-w-md grid-cols-2 gap-x-7 gap-y-5">
          <div v-for="item in payments" :key="item.name" class="flex h-9 items-center">
            <img v-if="item.logo" :src="item.logo" :alt="item.name" class="max-h-8 max-w-[110px] object-contain brightness-0 invert" />
            <span v-else class="text-xl font-black tracking-tight">{{ item.name }}</span>
          </div>
          <img src="/images/payments/qris.svg" alt="QRIS" class="col-span-2 mt-1 max-h-12 max-w-[220px] object-contain brightness-0 invert" />
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const about = ['About Our Store', 'Find Us', 'Privacy Policy', 'Terms and Conditions']
const social = ['Instagram', 'Facebook', 'Tiktok']
const payments = [
  { name: 'BCA', logo: '/images/payments/bca.svg' },
  { name: 'BNI', logo: '/images/payments/bni.svg' },
  { name: 'BANK BRI', logo: '/images/payments/bri.svg' },
  { name: 'mandiri', logo: '/images/payments/mandiri.svg' },
  { name: 'gopay', logo: '/images/payments/gopay.svg' },
  { name: 'OVO', logo: '/images/payments/ovo.svg' },
  { name: 'Jenius', logo: '/images/payments/jenius.svg' },
  { name: 'DANA', logo: '/images/payments/dana.svg' }
]
</script>
