<template>
  <UContainer class="h-[calc(100dvh)] flex flex-col space-y-12 py-12 justify-around dark">
      <UContainer class="text-center text-5xl flex flex-col place-content-center select-none space-y-4 uppercase">
        <h1 class="text-8xl lg:text-9xl text-magenta-700">{{ error?.statusCode }}</h1>
        <h2>{{ error?.statusMessage }}</h2>
      </UContainer>
      <UContainer class="select-none">
          <UButton to="/" size="xl" label="TORNA ALLA HOME" />
      </UContainer>
      <UContainer class="flex place-content-center overflow-hidden">
          <img src="/img/landing.jpg" alt="Daboss" class="max-w-full max-h-full object-contain"/>
      </UContainer>
  </UContainer>
</template>

<script setup lang="ts">
import type { NuxtError } from '#app'


const props = defineProps({
  error: Object as () => NuxtError
})

useHead({
title: `DABOSS TOURNAMENT - ${props.error?.statusCode}`
})
</script>