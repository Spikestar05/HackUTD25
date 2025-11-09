<template>
  <div class="relative w-full h-full">
    <!-- Top Controls (unchanged) -->
    <div class="absolute top-8 left-0 right-0 flex justify-between items-center px-8 z-20">
      <button @click="$emit('go-to-interior')" class="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all">
        <div class="w-8 h-8 rounded-full border-4 border-white"></div>
      </button>
      <div class="flex gap-4">
        <button @click="$emit('go-to-config')" class="w-16 h-16 rounded-full bg-white border-4 border-white/30 flex items-center justify-center hover:scale-110 transition-all">
          <span class="text-3xl font-light text-gray-800">×</span>
        </button>
        <button class="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all">
          <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" stroke-width="2"/>
            <circle cx="12" cy="12" r="3" fill="currentColor"/>
          </svg>
        </button>
        <button class="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all">
          <span class="text-2xl">🚗</span>
        </button>
      </div>
    </div>

    <!-- Car Image Placeholder -->
    <div class="absolute inset-0 flex items-center justify-center">
      <div class="w-full max-w-4xl h-96 bg-gradient-to-br from-red-600 to-red-800 rounded-3xl shadow-2xl flex items-center justify-center text-white text-2xl font-bold">
        RED CAMRY - EXTERIOR VIEW
      </div>
    </div>

    <!-- Bottom Voice Agent -->
    <div 
      class="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 z-20 cursor-pointer"
      @click="startRecording"
    >
      <!-- Red Pulsing Dot -->
      <div class="w-4 h-4 rounded-full bg-red-500 glow-red animate-pulse"></div>
      
      <!-- Voice Wave Animation -->
      <div class="flex gap-1 items-end">
        <div
          v-for="i in 5"
          :key="i"
          class="w-1 bg-white/60 rounded-full animate-pulse"
          :style="{ height: `${20 + Math.sin(i) * 10}px`, animationDelay: `${i * 0.1}s` }"
        ></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

defineEmits(['go-to-interior', 'go-to-config'])

const sessionId = ref(Date.now().toString())

async function startRecording() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
    const mediaRecorder = new MediaRecorder(stream)
    const chunks = []

    mediaRecorder.ondataavailable = (e) => chunks.push(e.data)
    mediaRecorder.onstop = async () => {
      const blob = new Blob(chunks, { type: 'audio/webm' })
      const formData = new FormData()
      formData.append('audio', blob)
      formData.append('sessionId', sessionId.value)

      // Call your backend API which sends audio to ElevenLabs STT + agent
      const response = await $fetch('/api/voiceChat', {
        method: 'POST',
        body: formData
      })

      console.log('Bot reply:', response.reply)

      if (response.audioUrl) {
        const audio = new Audio(response.audioUrl)
        audio.play()
      }
    }

    mediaRecorder.start()

    // Stop recording automatically after 5 seconds (or you can add dynamic stop)
    setTimeout(() => mediaRecorder.stop(), 5000)
  } catch (err) {
    console.error('Error accessing microphone:', err)
  }
}
</script>
