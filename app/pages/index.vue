<script setup lang="ts">
import { defineProps } from 'vue';
import { useRouter } from 'vue-router';
// import { ChevronLeft, Car, PaintBucket, Zap } from 'lucide-vue-next';

const router = useRouter();

// --- Utility Components (Moved inside this file for single-file mandate) ---

// // A simple component to simulate the 3D Car View
// const Car3D = () => (
//   <div className="flex-1 p-8 flex items-center justify-center min-h-[500px] bg-neutral-900 rounded-xl shadow-2xl m-4">
//     <div className="text-white text-3xl font-light opacity-50 flex flex-col items-center">
//       <Car size={64} className="mb-4" />
//       3D Car Model View (Placeholder)
//     </div>
//   </div>
// );

// Menu Item Component
const MenuItem = defineProps({
  title: String,
  icon: Object, // Component
  targetRoute: String,
  isDisabled: { type: Boolean, default: false }
});

const navigateToRoute = () => {
  if (!MenuItem.isDisabled && MenuItem.targetRoute) {
    router.push(MenuItem.targetRoute);
  }
};
</script>

<template>
  <div class="min-h-screen bg-[#1E1E1E] flex flex-col lg:flex-row items-center justify-center p-4 sm:p-8">
    <!-- Configuration Panel (MenuScreen logic) -->
    <div
      class="w-full lg:w-1/3 max-w-lg h-auto lg:h-[90vh] p-6 lg:p-10 rounded-3xl shadow-2xl bg-gradient-to-b from-[#2D2D2E] to-black/50 border border-white/10 mb-8 lg:mb-0"
    >
      <h1 class="text-white text-5xl font-extrabold mb-10 tracking-tight">
        Configure DP-9
      </h1>

      <!-- Exterior -->
      <div
        :class="[
          'flex items-center justify-between py-4 border-b border-white/10 transition duration-200',
          'cursor-pointer hover:bg-white/5 rounded-lg px-2',
        ]"
        @click="router.push('/exterior')"
      >
        <div class="flex items-center space-x-4">
          <PaintBucket :size="32" class="text-white" />
          <p class="text-white text-3xl font-['SF_Pro'] tracking-tight">
            Exterior
          </p>
        </div>
        <ChevronLeft :size="24" class="text-white rotate-180" />
      </div>

      <!-- Interior (Disabled) -->
      <div
        class="flex items-center justify-between py-4 border-b border-white/10 opacity-30 cursor-not-allowed"
      >
        <div class="flex items-center space-x-4">
          <Zap :size="32" class="text-white" />
          <p class="text-white text-3xl font-['SF_Pro'] tracking-tight">
            Interior
          </p>
        </div>
      </div>
      
      <!-- Engine (Disabled) -->
      <div
        class="flex items-center justify-between py-4 border-b border-white/10 opacity-30 cursor-not-allowed"
      >
        <div class="flex items-center space-x-4">
          <Zap :size="32" class="text-white" />
          <p class="text-white text-3xl font-['SF_Pro'] tracking-tight">
            Engine
          </p>
        </div>
      </div>

      <!-- Drivetrain -->
      <div
        :class="[
          'flex items-center justify-between py-4 border-b border-white/10 transition duration-200',
          'cursor-pointer hover:bg-white/5 rounded-lg px-2',
        ]"
        @click="router.push('/drivetrain')"
      >
        <div class="flex items-center space-x-4">
          <Car :size="32" class="text-white" />
          <p class="text-white text-3xl font-['SF_Pro'] tracking-tight">
            Drivetrain
          </p>
        </div>
        <ChevronLeft :size="24" class="text-white rotate-180" />
      </div>

      <!-- Transmission (Disabled) -->
      <div
        class="flex items-center justify-between py-4 border-b border-white/10 opacity-30 cursor-not-allowed"
      >
        <div class="flex items-center space-x-4">
          <Zap :size="32" class="text-white" />
          <p class="text-white text-3xl font-['SF_Pro'] tracking-tight">
            Transmission
          </p>
        </div>
      </div>

      <div class="mt-12 text-center text-lg text-white/50">
        <p>Choose your car configuration path.</p>
      </div>
    </div>
    
    <!-- 3D Car View -->
    <Car3D />
  </div>
</template>