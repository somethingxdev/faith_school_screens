<script setup lang="ts">
import ErrorVideo from "@/assets/videos/tiger_can't_find_card_3.mp4"
import BezalelLogo from '@/assets/images/bezazel-logo.svg'
import FaithSchoolLogo from '@/assets/images/faith_school-logo.svg'
import BodyBg from '@/assets/images/background.avif'
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const submitting = ref(false)

function extractTenDigits(text: string): string | null {
  const m = text.match(/\d{10}/)
  return m ? m[0] : null
}

async function handlePaste(e: ClipboardEvent) {
  e.preventDefault()
  if (submitting.value) return

  const raw = e.clipboardData?.getData('text') ?? ''
  const uid = extractTenDigits(raw)
  if (!uid) {
    console.warn('[paste] нет 10 подряд цифр в буфере:', JSON.stringify(raw))
    return
  }

  submitting.value = true
  try {
    const res = await fetch('https://kiosk.bezalelab.com/api/v1/attendance/scan', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ uid }),
    })
    console.log('[submit]', { uid, status: res.status, ok: res.ok })
    if (res.ok) {
      router.push({ name: 'profile', params: { id: uid } })
    } else {
      router.push({ name: 'error' })
    }
  } catch (err) {
    console.error('[submit] error', err)
    router.push({ name: 'error' })
  } finally {
    setTimeout(() => (submitting.value = false), 300)
  }
}

onMounted(() => {
  window.addEventListener('paste', handlePaste, true)
})

onBeforeUnmount(() => {
  window.removeEventListener('paste', handlePaste, true)
})
</script>

<template>
  <div class="container mx-auto max-w-[1080px] h-[1920px] bg-cover flex flex-col gap-22.5 pb-10" :style="{ backgroundImage: `url(${BodyBg})` }">
    <div class="relative">
      <div class="h-220 overflow-hidden video">
        <video class="h-full object-cover object-center" :src="ErrorVideo" autoplay loop muted></video>
      </div>
      <div class="absolute top-5 right-5 bg-white rounded-[10px] drop-shadow px-5 py-2.5">
        <div class="flex items-center gap-3">
          <p class="text-primary text-2xl">Powered by</p>
          <img :src="BezalelLogo" alt="logo" class="w-[195px]" />
        </div>
      </div>
    </div>
    <div class="flex flex-col items-center justify-between text-center text-primary h-full">
      <h1 class="font-bold font-heading text-heading/[70%] mb-10">Ошибка</h1>
      <p class="text-center text-subheading leading-none mb-20">Карта не найдена. <br />Повтори еще раз</p>
      <div class="text-center">
        <img :src="FaithSchoolLogo" alt="logo" />
      </div>
    </div>
  </div>
</template>
