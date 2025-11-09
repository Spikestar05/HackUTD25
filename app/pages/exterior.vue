<script setup lang="ts">
import { useRouter } from 'vue-router';
// import { ChevronLeft, Car, PaintBucket } from 'lucide-vue-next';

const router = useRouter();

// --- Utility Components ---

// const Car3D = () => (
//   <div className="flex-1 p-8 flex items-center justify-center min-h-[500px] bg-neutral-900 rounded-xl shadow-2xl m-4">
//     <div className="text-white text-3xl font-light opacity-50 flex flex-col items-center">
//       <Car size={64} className="mb-4" />
//       3D Car Model View (Placeholder)
//     </div>
//   </div>
// );

// const ColorOption = ({ name, hex }) => (
//   <div className="flex items-center justify-between py-4 border-b border-white/10 hover:bg-white/5 px-2 rounded-lg cursor-pointer transition">
//     <p className="text-white text-xl font-light">{name}</p>
//     <div className="flex items-center space-x-3">
//       <div
//         className="w-8 h-8 rounded-full border-2 border-white/50 shadow-inner"
//         style={{ backgroundColor: hex }}
//       ></div>
//       <ChevronLeft size={20} className="text-white rotate-180 opacity-50" />
//     </div>
//   </div>
// );

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
        <PaintBucket :size="36" />
        <span>Exterior Configuration</span>
      </h2>
      <p class="text-white/70 text-lg mb-8">Choose your options</p>

      <ColorOption name="Midnight Black" hex="#000000" />
      <ColorOption name="Titanium Silver" hex="#C0C0C0" />
      <ColorOption name="Racing Red" hex="#FF0000" />
      <ColorOption name="Electric Blue" hex="#00FFFF" />
    </div>
  </div>
</template>