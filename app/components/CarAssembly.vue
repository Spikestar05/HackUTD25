<script setup lang="ts">
import { useGLTF, useAnimations } from '#imports';
import { toRaw } from 'vue';

const props = defineProps<{
  selectedEngine: string,
  selectedTyre: string
}>()

const { state: carBody } = await useGLTF('./models/body.glb')
const { state: carHood } = await useGLTF('./models/hood.glb')
const carEngine = ref<any>(null)
const carTyres = ref<any[]>([])

// Handle Hood Lift Animation
const animations = computed(() => carHood.value?.animations || [])
const model = computed(() => carHood.value?.scene)
const { actions } = useAnimations(animations, model)
let hoodOpen = false

function toggleHoodAnimation() {
  hoodOpen = !hoodOpen
  const openAction = Object.values(actions.value || {})[0]
  if (!openAction) return
  
  openAction.timeScale = hoodOpen ? 1 : -1
  openAction.paused = false
  openAction.play()
}

const tyrePositions = [
  [1.2, 0.3, 1.5],   // front-right
  [-1.2, 0.3, 1.5],  // front-left
  [1.2, 0.3, -1.5],  // rear-right
  [-1.2, 0.3, -1.5], // rear-left
]

async function loadEngine(name: string) {
  try {
    console.log('Loading engine:', name)
    const { state: e } = await useGLTF(`./models/engine/${name}.glb`)
    // Use toRaw to get the unwrapped Three.js object
    carEngine.value = toRaw(e.value)
    console.log('Engine loaded:', carEngine.value)
  } catch (error) {
    console.error('Failed to load engine:', error)
  }
}

async function loadTyres(name: string) {
  try {
    console.log('Loading tyres:', name)
    const { state: t } = await useGLTF(`./models/tyre/${name}.glb`)
    
    // Get the raw scene object first, then clone
    const rawScene = toRaw(t.value?.scene)
    
    // Create 4 clones of the tyre scene for each wheel position
    carTyres.value = Array(4).fill(null).map(() => {
      return rawScene?.clone(true) // true = recursive clone
    })
    
    console.log('Tyres loaded:', carTyres.value.length)
  } catch (error) {
    console.error('Failed to load tyres:', error)
  }
}

// Watch for prop changes and load models
watch(() => props.selectedEngine, (v) => {
  if (v) loadEngine(v)
}, { immediate: true })

watch(() => props.selectedTyre, (v) => {
  if (v) loadTyres(v)
}, { immediate: true })
</script>

<template>
  <TresGroup>
    <!-- Body Primitive -->
    <primitive v-if="carBody?.scene" :object="carBody.scene" />
    
    <!-- Hood Primitive -->
    <primitive 
      v-if="carHood?.scene" 
      :object="carHood.scene" 
      @click="toggleHoodAnimation"
    />
    
    <!-- Engine Primitive -->
    <primitive 
      v-if="carEngine?.scene" 
      :object="carEngine.scene"
    />
    
    <!-- Tyre Primitives -->
    <primitive
      v-for="(tyre, i) in carTyres"
      :key="`tyre-${i}`"
      :object="tyre"
      :position="tyrePositions[i]"
    />
  </TresGroup>
</template>