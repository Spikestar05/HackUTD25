<script setup lang="ts">
const selectedEngine = ref<'V4' | 'V4-hybrid' | 'V6' | 'V8'>('V4')
const selectedTyre = ref<'A' | 'B'>('B')
</script>

<template>

  <TresCanvas window-size clear-color="#e5e5e5">
    <TresPerspectiveCamera :position="[4, 2, 6]" :look-at="[0, 0, 0]" />
    <!-- 💡 Lights -->
    <TresAmbientLight :intensity="0.6" />
    <TresDirectionalLight :position="[5, 10, 5]" :intensity="1" cast-shadow />
    <OrbitControls make-default :enableDamping="true" :dampingFactor="0.05" />
    <Suspense>
      <CarAssembly :selectedEngine="selectedEngine" :selectedTyre="selectedTyre" />
    </Suspense>
   
    <TresGridHelper />
  </TresCanvas>

</template>

<style scoped></style>
