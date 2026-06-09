<template>
  <div v-if="visible" class="fixed inset-0 z-[100] grid place-items-center bg-[#17130f]/75 px-4 py-8 backdrop-blur-sm">
    <div class="reveal w-full max-w-lg overflow-hidden rounded-lg bg-white text-[#333] shadow-2xl">
      <div class="bg-brand-red px-6 py-5 text-center text-white">
        <img src="/logo-white.png" alt="tokowinepop" class="mx-auto h-9 w-auto object-contain" />
        <h2 class="mt-2 text-2xl font-black leading-tight sm:text-3xl">Are you over 21?</h2>
      </div>

      <div class="px-6 py-7 text-center sm:px-8">
        <p class="mx-auto max-w-md text-sm leading-7 text-[#555] sm:text-base">
          Situs ini hanya ditujukan untuk pengunjung berusia 21 tahun ke atas. Dengan mengakses situs ini, Anda mengonfirmasi bahwa Anda telah memenuhi batas usia tersebut.
        </p>

        <div class="mt-7 grid gap-3 sm:grid-cols-2">
          <button class="h-12 bg-brand-red px-5 text-sm font-black text-white transition hover:brightness-95" @click="acceptAgeGate">
            Ya. Lanjutkan.
          </button>
          <button class="h-12 border border-brand-red px-5 text-sm font-black text-brand-red transition hover:bg-[#f7f4ee]" @click="rejectAgeGate">
            Tidak Jadi
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const ageGateKey = 'tokowinepop_age_verified'
const visible = ref(false)
let channel: BroadcastChannel | null = null

const acceptAgeGate = () => {
  sessionStorage.setItem(ageGateKey, 'true')
  channel?.postMessage('verified')
  visible.value = false
}

const rejectAgeGate = () => {
  window.location.href = 'https://google.com'
}

const syncBodyScroll = () => {
  document.body.style.overflow = visible.value ? 'hidden' : ''
}

watch(visible, syncBodyScroll)

onMounted(() => {
  // Cek apakah tab lain sudah verify di session ini
  visible.value = sessionStorage.getItem(ageGateKey) !== 'true'
  syncBodyScroll()

  // Sync antar tab dalam satu browser session
  channel = new BroadcastChannel(ageGateKey)
  channel.onmessage = (e) => {
    if (e.data === 'verified') {
      sessionStorage.setItem(ageGateKey, 'true')
      visible.value = false
    }
  }

  // Minta tab lain broadcast state mereka (kalau tab baru dibuka)
  channel.postMessage('check')
  channel.onmessage = (e) => {
    if (e.data === 'verified' || e.data === 'already_verified') {
      sessionStorage.setItem(ageGateKey, 'true')
      visible.value = false
    }
    if (e.data === 'check' && sessionStorage.getItem(ageGateKey) === 'true') {
      channel?.postMessage('already_verified')
    }
  }
})

onBeforeUnmount(() => {
  document.body.style.overflow = ''
  channel?.close()
})
</script>
