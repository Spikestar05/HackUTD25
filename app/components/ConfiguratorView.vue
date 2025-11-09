<template>
  <div class="flex w-full h-full">
    <!-- Left: Car Image -->
    <div class="flex-1 flex items-center justify-center relative">
      <img
        src="/RedCamryNav.png"
        alt="Vehicle interior placeholder"
        class="w-full max-w-2xl h-96 object-cover rounded-3xl shadow-2xl"
      />

      <!-- 3D Icon - Returns to Exterior -->
      <button
        @click="$emit('go-to-exterior')"
        class="absolute top-8 right-8 w-14 h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all"
      >
        <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" stroke-width="2"/>
          <circle cx="12" cy="12" r="3" fill="currentColor"/>
        </svg>
      </button>

      <!-- Model Icon (Right Side) -->
      <button class="absolute top-8 right-28 w-14 h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all">
        <span class="text-xl">🚗</span>
      </button>

      <!-- Bottom Pulsing Dot -->
      <div class="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div class="w-4 h-4 rounded-full bg-red-500 glow-red animate-pulse"></div>
      </div>
    </div>

    <!-- Right: Configuration Panel -->
    <ConfigPanel />
  </div>
</template>

<script setup>
defineEmits(['go-to-exterior'])
</script>