<template>
    <UContainer class="h-[calc(100dvh)] flex flex-col space-y-12 py-12 justify-around">
        <UContainer class="text-center text-6xl md:text-8xl lg:text-9xl flex place-content-center select-none">
            <h1><span class="text-8xl lg:text-9xl">DA<span class="text-magenta-700">BOSS</span></span> TOURNAMENT</h1>
        </UContainer>
        <UContainer class="select-none">
            <h2 class="text-5xl">SEE Y'ALL NEXT YEAR</h2>
        </UContainer>
        <!--UContainer class="select-none">
            <UButton to="enroll" size="xl" label="ISCRIVI IL TUO TEAM" />
        </UContainer-->
        <UContainer class="flex place-content-center overflow-hidden">
            <img src="/img/landing.jpg" alt="Daboss" class="max-w-full max-h-full object-contain"/>
        </UContainer>
    </UContainer>
</template>

<script setup lang="ts">
useHead({
  title: 'DABOSS TOURNAMENT'
})
</script>

