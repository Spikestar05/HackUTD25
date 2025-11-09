<template>
  <div class="p-6 space-y-4 text-white">
    <div class="space-y-2">
      <p class="text-sm text-gray-500 mb-4">Choose your trim</p>
      <button
        v-for="trim in availableTrims"
        :key="trim"
        @click="selectOption('trim', trim)"
        :disabled="!isOptionAvailable('trim', trim)"
        :class="getOptionClasses('trim', trim)"
      >
        {{ trim }}
      </button>
    </div>
  </div>
</template>

<script setup>
const { 
  selections, 
  selectOption,
  availableTrims,
  isOptionAvailable,
  getOptionClasses
} = useCarConfigurator()
</script>