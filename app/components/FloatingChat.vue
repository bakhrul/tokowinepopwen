<template>
  <a :href="chatUrl" target="_blank" rel="noreferrer" class="fixed bottom-7 right-7 z-40 grid size-16 place-items-center rounded-full bg-[#25d366] text-white shadow-xl transition hover:scale-105 sm:size-20" aria-label="Chat on WhatsApp">
    <IconWhatsapp class="size-11 sm:size-14" />
  </a>
</template>

<script setup lang="ts">
const { data: footerData } = await useAsyncData('tokowine-footer', fetchTokowineFooter)
const chatUrl = computed(() => whatsappUrl(footerData.value?.hpno || '0812-3456-7890'))
</script>
