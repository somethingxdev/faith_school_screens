<script setup lang="ts">
import { useRoute } from 'vue-router'
import { ref, onMounted } from 'vue'
import BodyBg from '@/assets/images/background.avif'
import Successful from '@/assets/images/successful.webp'
import Logo2 from '@/assets/images/logo-light.webp'
import Dirham from '@/assets/images/dirham.webp'
import DirhamAccount from '@/assets/images/dirham-account.webp'
import GoldCoin from '@/assets/images/gold-coin.webp'
import SilverCoin from '@/assets/images/silver-coin.webp'
import BlobDecor from '@/assets/images/bloob-decor.webp'
const route = useRoute()

interface Student {
  id: number;
  name: string;
  profilePhoto: string;
}
// const nfcId = route.params.id
const nfcId = route.params.id

const student = ref<Student | null>(null)

onMounted(async () => {
  if (nfcId) {
    try {
      const response = await fetch('https://kiosk.bezalelab.com/api/v1/attendance/scan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ uid: nfcId })
      });
      const data = await response.json();
      if (data.success) {
        student.value = data.student;
      }
    } catch (error) {
      console.error('Error fetching student data:', error);
    }
  }
});
</script>

<template>
  <div class="container mx-auto max-w-[1080px] bg-cover flex flex-col gap-20 pb-20"
    :style="{ backgroundImage: `url(${BodyBg})` }">

    <div class="relative h-260">
      <img :src="Successful" class="absolute inset-0 size-full" alt="welcome" />
      <div class="absolute inset-10">
        <img :src="Logo2" alt="logo" />
      </div>
      <div v-if="student" class="flex flex-col justify-center items-center relative gap-10 z-10 pt-10">
        <img :src="student.profilePhoto" alt="student photo" class="size-80" />
        <div class="z-15 text-center -mt-10">
          <h1 class="text-heading font-bold text-white text-shadow-custom font-heading leading-[70%]">{{ student.name }}
          </h1>
          <p class="text-white font-heading text-subheading font-bold mb-10">Русский язык (3-6 лет)</p>
          <div class="flex items-center justify-center gap-5">
            <img :src="Dirham" alt="dirham" class="h-15 w-auto" />
            <span class="text-white text-[100px] font-medium">3,240</span>
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
