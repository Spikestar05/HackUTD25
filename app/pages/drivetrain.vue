<script setup lang="ts">
import { useRouter } from 'vue-router';
// import { ChevronLeft, Car } from 'lucide-vue-next';

const router = useRouter();

// --- Utility Components ---

// const Car3D = () => (
const Car3D = {
    template: `
        <div class="flex-1 p-8 flex items-center justify-center min-h-[500px] bg-neutral-900 rounded-xl shadow-2xl m-4">
            <div class="text-white text-3xl font-light opacity-50 flex flex-col items-center">
                <Car :size="64" class="mb-4" />
                3D Car Model View (Placeholder)
            </div>
        </div>
    `,
};
// );

const DriveOption = defineComponent({
  props: {
    name: { type: String, required: true },
    description: { type: String, required: true },
    isSelected: { type: Boolean, default: false }
  },
  template: `
    <div :class="[
      'py-4 border-b border-white/10 px-2 rounded-lg cursor-pointer transition duration-200',
      isSelected ? 'bg-blue-600/20 border-blue-400/50' : 'hover:bg-white/5'
    ]">
      <div class="flex items-center justify-between">
        <p :class="['text-xl font-semibold', isSelected ? 'text-blue-300' : 'text-white']">
          {{ name }}
        </p>
        <div :class="[
          'w-6 h-6 rounded-full border-2 flex items-center justify-center',
          isSelected ? 'bg-blue-500 border-blue-500' : 'border-white/50'
        ]">
          <div v-if="isSelected" class="w-3 h-3 bg-white rounded-full"></div>
        </div>
      </div>
      <p class="text-sm mt-1 text-white/50">{{ description }}</p>
    </div>
  `
});
</script>

<template>
  <div class="min-h-screen bg-[#1E1E1E] flex flex-col lg:flex-row items-center justify-center p-4 sm:p-8 relative">
    <!-- Back Button -->
    <button
      @click="router.push('/')"
      class="absolute top-8 left-8 p-3 text-white bg-white/10 rounded-full z-20 hover:bg-white/20 transition flex items-center space-x-2 shadow-lg"
      :style="{ backdropFilter: 'blur(5px)' }"
    >
      <ChevronLeft :size="20" />
      <span class="hidden sm:inline">Back to Menu</span>
    </button>
    
    <Car3D />

    <!-- Configuration Panel -->
    <div class="w-full lg:w-1/3 max-w-lg h-auto lg:h-[90vh] p-6 lg:p-10 rounded-3xl shadow-2xl bg-gradient-to-b from-[#2D2D2E] to-black/50 border border-white/10 mt-8 lg:mt-0 lg:ml-8">
      <h2 class="text-white text-4xl font-extrabold mb-6 flex items-center space-x-3">
        <Car :size="36" />
        <span>Drivetrain Configuration</span>
      </h2>
      <p class="text-white/70 text-lg mb-8">Choose your option</p>

      <DriveOption name="Rear-Wheel Drive" description="RWD: Best for sporty handling." :isSelected="false" />
      <DriveOption name="Front-Wheel Drive" description="FWD: Efficient and stable." :isSelected="true" />
      <DriveOption name="All-Wheel Drive" description="AWD: Maximum traction and control." :isSelected="false" />
    </div>
  </div>
</template>