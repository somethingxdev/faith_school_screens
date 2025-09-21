<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { ref, onMounted, onBeforeUnmount, watch, computed } from 'vue'
import { useIdle, useFetch } from '@vueuse/core'
import BodyBg from '@/assets/images/background.avif'
import Successful from '@/assets/images/successful.webp'
import Logo2 from '@/assets/images/logo-light.webp'
import Dirham from '@/assets/images/dirham.webp'
import GoldCoin from '@/assets/images/gold-coin.webp'
import SilverCoin from '@/assets/images/silver-coin.webp'
import BlobDecor from '@/assets/images/bloob-decor.webp'
import Tree_0x50 from '@/assets/images/dirham-tree/0x50.avif'
import Tree_51x750 from '@/assets/images/dirham-tree/51x750.avif'
import Tree_751x1500 from '@/assets/images/dirham-tree/751x1500.avif'
import Tree_1501x2250 from '@/assets/images/dirham-tree/1501x2250.avif'
import Tree_2251x3000 from '@/assets/images/dirham-tree/2251x3000.avif'
import Tree_3001x3750 from '@/assets/images/dirham-tree/3001x3750.avif'
import Tree_3751x5000 from '@/assets/images/dirham-tree/3751x5000.avif'
import Tree_5001x6000plus from '@/assets/images/dirham-tree/5001x6000+.avif'

interface Student {
  id: number
  name: string
  profilePhoto: string
}

interface ApiScanResponse {
  success: boolean
  student: Student
  scannedAt: string
  points: number
  message: string
  token: string
}

const route = useRoute()
const router = useRouter()

const POINTS = 1512

const nfcId = route.params.id

const scan = ref<ApiScanResponse | null>(null)
const buffer = ref('')

async function submitUid(uid: string) {
  try {
    const { data: response, error } = await useFetch('https://kiosk.bezalelab.com/api/v1/attendance/scan').post({ uid }).json<ApiScanResponse>()
    if (error.value) {
      console.error('Error fetching student data:', error.value)
      scan.value = null
    } else {
      scan.value = response.value
    }
  } catch (e) {
    console.error('Error fetching student data:', e)
    scan.value = null
  }
}

onMounted(() => {
  if (nfcId) submitUid(String(nfcId))
  window.addEventListener('keydown', handleKeydown, true)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeydown, true)
})

function handleKeydown(e: KeyboardEvent) {
  if (/^\d$/.test(e.key)) {
    buffer.value += e.key
    if (buffer.value.length === 10) {
      const uid = buffer.value
      buffer.value = ''
      submitUid(uid)
    }
  }
}

const { idle, reset } = useIdle(60 * 1000)
watch(idle, (idleValue) => {
  if (idleValue) {
    router.push({ name: 'home' })
    reset()
  }
})

const dirhamTreeSrc = computed(() => {
  const ranges: { min: number; max: number; src: string }[] = [
    { min: 0, max: 50, src: Tree_0x50 },
    { min: 51, max: 750, src: Tree_51x750 },
    { min: 751, max: 1500, src: Tree_751x1500 },
    { min: 1501, max: 2250, src: Tree_1501x2250 },
    { min: 2251, max: 3000, src: Tree_2251x3000 },
    { min: 3001, max: 3750, src: Tree_3001x3750 },
    { min: 3751, max: 5000, src: Tree_3751x5000 },
    { min: 5001, max: Number.POSITIVE_INFINITY, src: Tree_5001x6000plus },
  ]
  const match = ranges.find((r) => POINTS >= r.min && POINTS <= r.max)
  return match?.src
})
</script>

<template>
  <div class="container mx-auto max-w-[1080px] bg-cover flex flex-col gap-20 pb-20" :style="{ backgroundImage: `url(${BodyBg})` }">
    <div class="relative h-240">
      <img :src="Successful" class="absolute inset-0 size-full" alt="welcome" />
      <div class="absolute inset-10">
        <img :src="Logo2" alt="logo" />
      </div>
      <RouterLink to="/" class="absolute right-10 top-10 bg-white px-6 py-3 uppercase rounded-lg drop-shadow z-50"> Выйти </RouterLink>

      <div v-if="scan" class="flex flex-col justify-center items-center relative gap-10 z-10 pt-10">
        <img :src="scan.student.profilePhoto" alt="student photo" class="size-80" />
        <div class="z-15 text-center -mt-10">
          <h1 class="text-[120px] font-bold text-white text-shadow-custom font-heading leading-none">{{ scan.student.name }}</h1>
          <p class="text-white font-heading text-subheading font-bold mb-10">{{ scan.message }}</p>
          <div class="flex items-center justify-center gap-5">
            <img :src="Dirham" alt="dirham" class="h-15 w-auto" />
            <span class="text-white text-[100px] font-medium">{{ POINTS }}</span>
          </div>
        </div>
        <div class="absolute bottom-30 z-10">
          <img :src="BlobDecor" alt="blob" />
        </div>
      </div>
    </div>

    <div v-if="scan" class="flex justify-center items-end gap-10">
      <div class="w-[300px]">
        <img :src="dirhamTreeSrc" alt="dirham-account" />
      </div>
      <div>
        <div class="flex flex-col items-center mb-17.5 relative">
          <img :src="GoldCoin" alt="gold-coin" />
          <p class="text-primary text-3xl font-medium">1 талант = 60 мин</p>
          <div class="absolute top-[35%] -left-[15%] -z-5 w-[400px] h-[2px] border-b-5 border-dashed border-[#6A9F4D]"></div>
        </div>
        <div class="flex flex-col items-center relative">
          <img :src="SilverCoin" alt="silver-coin" />
          <p class="text-primary text-[30px] font-medium">1 мина = 100 динариев</p>
          <div class="absolute top-[35%] -left-[15%] -z-5 w-[400px] h-[2px] border-b-5 border-dashed border-[#6A9F4D]"></div>
        </div>
      </div>
    </div>
  </div>
</template>
