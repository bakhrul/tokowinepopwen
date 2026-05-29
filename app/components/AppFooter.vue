<template>
  <footer class="bg-brand-red px-5 py-12 text-white sm:px-8 lg:px-12">
    <div class="mx-auto grid max-w-[1920px] gap-12 md:grid-cols-2 xl:grid-cols-4">
      <div>
        <h3 class="mb-6 text-xl font-black">About Us</h3>
        <ul class="space-y-4 text-lg">
          <li v-for="item in about" :key="item"><a href="#" class="hover:underline">{{ item }}</a></li>
        </ul>
        <button class="mt-16 border border-white/35 px-4 py-3 text-base">English v</button>
        <p class="mt-6 text-base text-white/75">Copyright (c) 2026, Cellarjak</p>
      </div>

      <div>
        <h3 class="mb-6 text-xl font-black">Our Social Media</h3>
        <ul class="space-y-3 text-lg underline underline-offset-4">
          <li v-for="item in social" :key="item"><a href="#">{{ item }}</a></li>
        </ul>
      </div>

      <div>
        <h3 class="mb-6 text-xl font-black">Contact us</h3>
        <p class="max-w-xl text-lg leading-relaxed">For faster replies, please use our instant chat feature.</p>
        <div class="mt-10 space-y-5 text-lg leading-relaxed">
          <p>Phone: 0811-8869-172</p>
          <p>Email: support@cellarjak.test</p>
          <p>Address: Jalan Katalog Raya Ruko Sample Center 2<br />Blok B. 18, Tangerang, Banten 15810</p>
        </div>
      </div>

      <div>
        <h3 class="mb-8 text-xl font-black">Payment</h3>
        <div class="grid max-w-md grid-cols-2 gap-4 text-xl font-black">
          <span v-for="item in payments" :key="item" class="rounded bg-white/10 px-4 py-3">{{ item }}</span>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const about = ['About Our Store', 'Find Us', 'Recipes', 'Privacy Policy', 'Terms and Conditions']
const social = ['Instagram', 'Facebook', 'Tiktok']
const payments = ['BCA', 'BNI', 'BRI', 'Mandiri', 'Gopay', 'OVO', 'Jenius', 'DANA', 'QRIS']
</script>
