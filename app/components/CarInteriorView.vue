<template>
  <div class="relative w-full h-full">
    <!-- Top Controls -->
    <div class="absolute top-8 left-0 right-0 flex justify-between items-center px-8 z-20">
      <!-- Left: Car Icon (Go back to Exterior) -->
      <button
        @click="$emit('go-to-exterior')"
        class="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all"
      >
        <span class="text-2xl">🚗</span>
      </button>

      <!-- Right: X Button -->
      <button
        @click="$emit('go-to-config')"
        class="w-16 h-16 rounded-full bg-white border-4 border-white/30 flex items-center justify-center hover:scale-110 transition-all"
      >
        <span class="text-3xl font-light text-gray-800">×</span>
      </button>
    </div>

    <!-- Interior Image Placeholder -->
    <div class="absolute inset-0 flex items-center justify-center">
      <div class="w-full max-w-4xl h-96 bg-gradient-to-br from-gray-700 to-gray-900 rounded-3xl shadow-2xl flex items-center justify-center text-white text-2xl font-bold">
        INTERIOR VIEW
      </div>
    </div>

    <!-- Bottom Voice Agent -->
    <div class="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 z-20">
      <div class="w-4 h-4 rounded-full bg-red-500 glow-red animate-pulse"></div>
      <div class="flex gap-1 items-end">
        <div
          v-for="i in 5"
          :key="i"
          class="w-1 bg-white/60 rounded-full animate-pulse"
          :style="{
            height: `${20 + Math.sin(i) * 10}px`,
            animationDelay: `${i * 0.1}s`
          }"
        ></div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineEmits(['go-to-exterior', 'go-to-config'])
</script>