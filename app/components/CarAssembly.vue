<script setup lang="ts">
import { useGLTF, useAnimations } from '#imports';
import { shallowRef } from 'vue';

const props = defineProps<{
  selectedEngine: string,
  selectedTyre: string
}>()

const { state: carBody } = await useGLTF('./models/body.glb')
const { state: carHood } = await useGLTF('./models/hood.glb')
const carEngine = shallowRef<any>(null)
const carTyres = shallowRef<any[]>([])

// Handle Hood Lift Animation
const animations = computed(() => carHood.value?.animations || [])
const model = computed(() => carHood.value?.scene)
const { actions } = useAnimations(animations, model)
let hoodOpen = false

function toggleHoodAnimation(event: MouseEvent) {
  // Prevent click from triggering during orbit drag
  event.stopPropagation()
  
  hoodOpen = !hoodOpen
  const openAction = Object.values(actions.value || {})[0]
  if (!openAction) return
  
  openAction.timeScale = hoodOpen ? 1 : -1
  openAction.paused = false
  openAction.play()
}

const tyreTransforms = [
  {
    position: [0.05, 0.05, -1.85],   // front-right
    rotation: [0, Math.PI, 0],
  },
  {
    position: [-0.05, 0.05, 1.85],  // front-left
    rotation: [0, 0, 0],
  },
  {
    position: [0.05, 0.05, 0],  // rear-right
    rotation: [0, Math.PI, 0],
  },
  {
    position: [-0.05, 0.05, 0], // rear-left
    rotation: [0, 0, 0],
  },
]

async function loadEngine(name: string) {
  try {
    console.log('Loading engine:', name)
    const { state: e } = await useGLTF(`./models/engine/${name}.glb`)
    // shallowRef handles this properly now, no need for toRaw
    carEngine.value = e.value
    console.log('Engine loaded:', carEngine.value)
  } catch (error) {
    console.error('Failed to load engine:', error)
  }
}

async function loadTyres(name: string) {
  try {
    console.log('Loading tyres:', name)
    const { state: t } = await useGLTF(`./models/tyre/${name}.glb`)
    
    // With shallowRef, we can clone directly without toRaw
    const scene = t.value?.scene
    
    // Create 4 clones of the tyre scene for each wheel position
    carTyres.value = Array(4).fill(null).map(() => {
      return scene?.clone(true) // true = recursive clone
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
    <primitive v-if="carBody?.scene" :object="carBody.scene" :scale="1.5"/>
    
    <!-- Hood Primitive -->
    <primitive 
      v-if="carHood?.scene" 
      :object="carHood.scene" 
      @click="toggleHoodAnimation"
      :scale="1.5"
    />
    
    <!-- Engine Primitive -->
    <primitive 
      v-if="carEngine?.scene" 
      :object="carEngine.scene"
      :position="[0, 0.09, -0.5]"
      :scale="0.009"
    />
    
    <!-- Tyre Primitives -->
    <primitive
      v-if="carTyres[0]"
      :object="carTyres[0]"
      :position="tyreTransforms[0].position"
      :rotation="tyreTransforms[0].rotation"
      :scale="1.5"
    />
    <primitive
      v-if="carTyres[1]"
      :object="carTyres[1]"
      :position="tyreTransforms[1].position"
      :rotation="tyreTransforms[1].rotation"
      :scale="1.5"
    />
    <primitive
      v-if="carTyres[2]"
      :object="carTyres[2]"
      :position="tyreTransforms[2].position"
      :rotation="tyreTransforms[2].rotation"
      :scale="1.5"
    />
    <primitive
      v-if="carTyres[3]"
      :object="carTyres[3]"
      :position="tyreTransforms[3].position"
      :rotation="tyreTransforms[3].rotation"
      :scale="1.5"
    />
  </TresGroup>
</template>