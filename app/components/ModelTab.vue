<template>
  <div class="p-6 space-y-4 text-white">
    <div class="space-y-2">
      <p class="text-sm text-gray-500 mb-4">Choose your model</p>
      <button
        v-for="model in availableModels"
        :key="model"
        @click="selectOption('model', model)"
        :disabled="!isOptionAvailable('model', model)"
        :class="getOptionClasses('model', model)"
      >
        {{ model }}
      </button>
    </div>
  </div>
</template>

<script setup>
const { 
  selections, 
  selectOption,
  availableModels,
  isOptionAvailable,
  getOptionClasses
} = useCarConfigurator()
</script>