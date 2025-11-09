<template>
  <div class="fixed inset-0 overflow-hidden">
    <!-- Logo Animation Screen -->
    <div
      v-if="screen === 'logo'"
      class="fixed inset-0 bg-black flex items-center justify-center z-50"
    >
      <img
        v-if="logoPhase === 1 || logoPhase === 3"
        src="/ToyotaLogo.png"
        alt="Toyota Logo"
        class="transition-opacity duration-2000000"
        style="opacity: 1; width: 500; height: 300px;"
      />
    </div>

    <!-- Car Exterior View -->
    <div
      v-else-if="screen === 'exterior'"
      class="fixed inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black"
    >
      <CarExteriorView 
        @go-to-interior="screen = 'interior'"
        @go-to-config="screen = 'config'"
      />
    </div>

    <!-- Car Interior View -->
    <div
      v-else-if="screen === 'interior'"
      class="fixed inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black"
    >
      <CarInteriorView 
        @go-to-exterior="screen = 'exterior'"
        @go-to-config="screen = 'config'"
      />
    </div>

    <!-- Configuration Screen -->
    <div
      v-else-if="screen === 'config'"
      class="fixed inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black flex"
    >
      <ConfiguratorView @go-to-exterior="screen = 'exterior'" />
    </div>
  </div>
</template>

<script setup>
const screen = ref('logo')
const logoPhase = ref(0)

// Logo animation sequence
onMounted(() => {
  const phases = [
    { delay: 0, phase: 1 },      // Fade in
    { delay: 500, phase: 2 },    // Fade out
    { delay: 1000, phase: 3 },   // Fade in again
    { delay: 1500, phase: 4 },   // Fade out again
    { delay: 2000, phase: 5 }    // Delay before car
  ]

  phases.forEach(({ delay, phase }) => {
    setTimeout(() => {
      logoPhase.value = phase
      if (phase === 5) {
        setTimeout(() => {
          screen.value = 'exterior'
        }, 200)
      }
    }, delay)
  })
})
</script>
