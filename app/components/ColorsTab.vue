<template>
  <div class="p-6 space-y-4">
    <!-- Model Selection -->
    <ConfigSection
      title="Model"
      :is-open="activeSection === 'model'"
      @toggle="toggleSection('model')"
    >
      <div class="space-y-2">
        <p class="text-sm text-gray-500 mb-4">Choose your option</p>
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
    </ConfigSection>

    <!-- Trim Selection -->
    <ConfigSection
      title="Trim"
      :is-open="activeSection === 'trim'"
      :disabled="!selections.model"
      @toggle="toggleSection('trim')"
    >
      <div class="space-y-2">
        <p class="text-sm text-gray-500 mb-4">Choose your option</p>
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
    </ConfigSection>

    <!-- Interior Colors -->
    <ConfigSection
      title="Interior"
      :is-open="activeSection === 'interior'"
      @toggle="toggleSection('interior')"
    >
      <div class="space-y-3">
        <p class="text-sm text-gray-500 mb-4">Choose your option</p>
        <button
          @click="selectOption('interiorColor', null)"
          class="w-full text-left py-2 text-sm text-gray-600 hover:text-gray-900"
        >
          None
        </button>
        <button
          v-for="color in availableInteriorColors"
          :key="color"
          @click="selectOption('interiorColor', color)"
          :disabled="!isOptionAvailable('interiorColor', color)"
          class="flex items-center gap-3 w-full py-2 transition-opacity"
          :class="!isOptionAvailable('interiorColor', color) ? 'opacity-40 cursor-not-allowed' : ''"
        >
          <div
            class="w-8 h-8 rounded-full border-2 flex items-center justify-center"
            :class="[
              getColorClass(color),
              selections.interiorColor === color ? 'border-red-600' : 'border-gray-300'
            ]"
          >
            <svg
              v-if="selections.interiorColor === color"
              class="w-5 h-5 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <span class="text-sm">{{ color }}</span>
        </button>
      </div>
    </ConfigSection>

    <!-- Exterior Colors -->
    <ConfigSection
      title="Exterior"
      :is-open="activeSection === 'exterior'"
      @toggle="toggleSection('exterior')"
    >
      <div class="space-y-3">
        <p class="text-sm text-gray-500 mb-4">Choose your option</p>
        <button
          @click="selectOption('exteriorColor', null)"
          class="w-full text-left py-2 text-sm text-gray-600 hover:text-gray-900"
        >
          None
        </button>
        <button
          v-for="color in availableExteriorColors"
          :key="color"
          @click="selectOption('exteriorColor', color)"
          :disabled="!isOptionAvailable('exteriorColor', color)"
          class="flex items-center gap-3 w-full py-2 transition-opacity"
          :class="!isOptionAvailable('exteriorColor', color) ? 'opacity-40 cursor-not-allowed' : ''"
        >
          <div
            class="w-8 h-8 rounded-full border-2 flex items-center justify-center"
            :class="[
              getColorClass(color),
              selections.exteriorColor === color ? 'border-red-600' : 'border-gray-300'
            ]"
          >
            <svg
              v-if="selections.exteriorColor === color"
              class="w-5 h-5 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <span class="text-sm">{{ color }}</span>
        </button>
      </div>
    </ConfigSection>
  </div>
</template>

<script setup>
const { 
  activeSection, 
  toggleSection, 
  selections, 
  selectOption,
  availableModels,
  availableTrims,
  availableInteriorColors,
  availableExteriorColors,
  isOptionAvailable,
  getOptionClasses
} = useCarConfigurator()

const getColorClass = (color) => {
  if (color.includes('Black') || color.includes('Midnight')) return 'bg-gray-900'
  if (color.includes('Gray') || color.includes('Grey')) return 'bg-gray-300'
  if (color.includes('Red') || color.includes('Ruby Flare Pearl')) return 'bg-red-900'
  if (color.includes('Sonic Silver')) return 'bg-gray-500'
  if (color.includes ('Celestite')) return 'bg-gray-600'
  if (color.includes ('Ice Cap')) return 'bg-white-600'
  if (color.includes ('Blueprint')) return 'bg-blue-200'
  if (color.includes('White') || color.includes('Wind Chill Pearl')) return 'bg-gray-100'
  return 'bg-gray-400'
}
</script>