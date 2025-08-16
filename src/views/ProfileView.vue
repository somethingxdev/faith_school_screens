<script setup lang="ts">
import { useRoute } from 'vue-router'
import BodyBg from '@/assets/images/background.avif'
import Kid from '@/assets/images/kid.png'
import Successful from '@/assets/images/successful.webp'
import Logo2 from '@/assets/images/logo-light.webp'
import Dirham from '@/assets/images/dirham.webp'
import BlobDecor from '@/assets/images/bloob-decor.webp'
import DirhamAccount from '@/assets/images/dirham-account.webp'
import GoldCoin from '@/assets/images/gold-coin.webp'
import SilverCoin from '@/assets/images/silver-coin.webp'

const route = useRoute()
const nfcId = route.params.id
</script>

<template>
  <div class="container mx-auto max-w-[1080px] bg-cover flex flex-col gap-20 pb-20" :style="{ backgroundImage: `url(${BodyBg})` }">
    <div class="relative h-260">
      <img :src="Successful" class="absolute inset-0 size-full" alt="welcome" />
      <div class="absolute inset-10">
        <img :src="Logo2" alt="logo" />
      </div>

      <div class="flex flex-col justify-center items-center relative z-10">
        <img :src="Kid" alt="kid" />
        <div class="z-15 text-center">
          <h1 class="text-heading font-bold text-white text-shadow-custom font-heading leading-[70%]">Ваня</h1>
<p class="text-white">NFC ID: {{ nfcId }}</p>
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
