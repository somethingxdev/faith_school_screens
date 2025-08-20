<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { ref, onMounted, onBeforeUnmount, watch, computed } from 'vue'
import { useIdle, useFetch } from '@vueuse/core'
import BodyBg from '@/assets/images/background.avif'
import Successful from '@/assets/images/successful.webp'
import Logo2 from '@/assets/images/logo-light.webp'
import Dirham from '@/assets/images/dirham.webp'
import DirhamAccount from '@/assets/images/dirham-account.webp'
import GoldCoin from '@/assets/images/gold-coin.webp'
import SilverCoin from '@/assets/images/silver-coin.webp'
import BlobDecor from '@/assets/images/bloob-decor.webp'
const route = useRoute()
const router = useRouter()

interface Student {
  id: number;
  name: string;
  profilePhoto: string;
}

interface ApiScanResponse {
  success: boolean;
  student: Student;
  scannedAt: string;
  points: number;
  message: string;
  token: string;
}


const nfcId = route.params.id

const scan = ref<ApiScanResponse | null>(null)
const buffer = ref('')

async function submitUid(uid: string) {
  try {
    const { data, response } = await useFetch('https://kiosk.bezalelab.com/api/v1/attendance/scan')
      .post({ uid })
      .json<ApiScanResponse>()
    if (response.value?.ok && data.value?.success) {
      scan.value = data.value
    } else {
      scan.value = null
    }
  } catch (e) {
    console.error('Error fetching student data:', e)
    scan.value = null
  }
}

onMounted(() => {
  if (nfcId) submitUid(String(nfcId))
  window.addEventListener('keydown', handleKeydown, true)
});

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

const formattedPoints = computed(() => scan.value ? scan.value.points.toLocaleString('ru-RU') : '0')
</script>

<template>
  <div class="container mx-auto max-w-[1080px] bg-cover flex flex-col gap-20 pb-20"
    :style="{ backgroundImage: `url(${BodyBg})` }">

    <div class="relative h-240">
      <img :src="Successful" class="absolute inset-0 size-full" alt="welcome" />
      <div class="absolute inset-10">
        <img :src="Logo2" alt="logo" />
      </div>
      <RouterLink to="/" class="absolute right-10 top-10 bg-white px-6 py-3 uppercase rounded-lg drop-shadow z-50">
        Выйти
      </RouterLink>

      <div v-if="scan" class="flex flex-col justify-center items-center relative gap-10 z-10 pt-10">
        <img :src="scan.student.profilePhoto" alt="student photo" class="size-80" />
        <div class="z-15 text-center -mt-10">
          <h1 class="text-[120px] font-bold text-white text-shadow-custom font-heading leading-none">{{ scan.student.name }}
          </h1>
          <p class="text-white font-heading text-subheading font-bold mb-10">{{ scan.message }}</p>
          <div class="flex items-center justify-center gap-5">
            <img :src="Dirham" alt="dirham" class="h-15 w-auto" />
            <span class="text-white text-[100px] font-medium">{{ formattedPoints }}</span>
          </div>
        </div>
        <div class="absolute bottom-30 z-10">
          <img :src="BlobDecor" alt="blob" />
        </div>
      </div>
    </div>

    <div class="flex justify-center items-center gap-10">
      <img :src="DirhamAccount" alt="dirham-account" />
      <div>
        <div class="flex flex-col items-center mb-17.5 relative">
          <img :src="GoldCoin" alt="gold-coin" />
          <p class="text-primary text-3xl font-medium">1 талант = 60 мин</p>
          <div class="absolute top-[35%] -left-[15%] -z-5 w-[400px] h-[2px] border-b-5 border-dashed border-[#6A9F4D]">
          </div>
        </div>
        <div class="flex flex-col items-center relative">
          <img :src="SilverCoin" alt="silver-coin" />
          <p class="text-primary text-[30px] font-medium">1 мина = 100 динариев</p>
          <div class="absolute top-[35%] -left-[15%] -z-5 w-[400px] h-[2px] border-b-5 border-dashed border-[#6A9F4D]">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
