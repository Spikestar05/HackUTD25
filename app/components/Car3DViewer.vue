<script setup lang="ts">
const selectedEngine = ref<'V4'>('V4')
const selectedTyre = ref<'B'>('B')
</script>

<template>
  <TresCanvas window-size clear-color="#e5e5e5">
    <TresPerspectiveCamera :position="[4, 2, 6]" :look-at="[0, 0, 0]" />
    
    <!-- Lights -->
    <TresAmbientLight :intensity="0.6" />
    <TresDirectionalLight :position="[5, 10, 5]" :intensity="1" cast-shadow />
    
    <!-- Car Assembly -->
    <Suspense>
      <CarAssembly :selectedEngine="selectedEngine" :selectedTyre="selectedTyre" />
    </Suspense>
    
    <!-- Orbit Controls - configured to allow interactions -->
    <OrbitControls 
      :enableDamping="true" 
      :dampingFactor="0.05"
      :minDistance="3"
      :maxDistance="15"
      :maxPolarAngle="Math.PI / 2"
    />
    
    <TresGridHelper />
  </TresCanvas>
</template>

<style scoped></style>