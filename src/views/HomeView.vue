<script setup lang="ts">
import HelloVideo from '@/assets/videos/tiger_waving_hi.mp4'
import BezalelLogo from '@/assets/images/bezazel-logo.svg'
import FaithSchoolLogo from '@/assets/images/faith_school-logo.svg'
import BodyBg from '@/assets/images/background.avif'
</script>

<template>
  <div class="container mx-auto max-w-[1080px] h-[1920px] bg-cover flex flex-col gap-22.5 pb-10" :style="{ backgroundImage: `url(${BodyBg})` }">
    <div class="relative">
      <div class="h-220 overflow-hidden video">
        <video class="h-full object-cover object-center" :src="HelloVideo" autoplay loop muted></video>
      </div>
      <div class="absolute top-5 right-5 bg-white rounded-[10px] drop-shadow px-5 py-2.5">
        <div class="flex items-center gap-3">
          <p class="text-primary text-2xl">Powered by</p>
          <img :src="BezalelLogo" alt="logo" class="w-[195px]" />
        </div>
      </div>
    </div>
    <div class="flex flex-col items-center justify-between text-center text-primary h-full">
      <h1 class="font-bold font-heading text-heading/[70%] mb-10">
        Привет! <br />
        Мы рады, что ты здесь
      </h1>
      <p class="text-center text-subheading leading-none mb-20">
        Приложи карту, <br />
        чтобы отметиться
      </p>
      <div class="text-center">
        <img :src="FaithSchoolLogo" alt="logo" />
      </div>
    </div>
  </div>
</template>
