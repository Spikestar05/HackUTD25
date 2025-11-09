<template>
  <div class="w-[480px] bg-black/70 backdrop-blur-md h-full flex flex-col">
    <!-- Progress Bar -->
    <div class="relative h-1 bg-gray-700">
      <div
        class="absolute h-full bg-red-600 transition-all duration-300"
        :style="{ width: `${progress}%` }"
      ></div>
    </div>

    <!-- Tabs Header -->
    <div class="flex border-b border-white/20 relative">
      <button
        @click="activeTab = 'model'"
        class="flex-1 py-6 text-sm font-medium relative transition-colors"
        :class="activeTab === 'model' ? 'text-white' : 'text-gray-400'"
      >
        Model
      </button>
      <button
        @click="activeTab = 'trim'"
        class="flex-1 py-6 text-sm font-medium relative transition-colors"
        :class="activeTab === 'trim' ? 'text-white' : 'text-gray-400'"
      >
        Trim
      </button>
      <button
        @click="activeTab = 'powertrain'"
        class="flex-1 py-6 text-sm font-medium relative transition-colors"
        :class="activeTab === 'powertrain' ? 'text-white' : 'text-gray-400'"
      >
        Powertrain
      </button>
      <button
        @click="activeTab = 'colors'"
        class="flex-1 py-6 text-sm font-medium relative transition-colors"
        :class="activeTab === 'colors' ? 'text-white' : 'text-gray-400'"
      >
        Colors
      </button>
      
      <!-- Red Underline Indicator -->
      <div
        class="absolute bottom-0 h-1 bg-red-600 transition-all duration-300"
        :style="{
          width: '25%',
          left: activeTab === 'model' ? '0%' : activeTab === 'trim' ? '25%' : activeTab === 'powertrain' ? '50%' : '75%'
        }"
      ></div>
    </div>

    <!-- Scrollable Content -->
    <div class="flex-1 overflow-y-auto">
      <ModelTab v-if="activeTab === 'model'" />
      <TrimTab v-else-if="activeTab === 'trim'" />
      <PowertrainTab v-else-if="activeTab === 'powertrain'" />
      <ColorsTab v-else />
    </div>
  </div>
</template>

<script setup>
const { activeTab, selections } = useCarConfigurator()

// Calculate progress based on selections and current tab
const progress = computed(() => {
  const steps = {
    model: { weight: 25, complete: !!selections.value.model },
    trim: { weight: 25, complete: !!selections.value.trim },
    powertrain: { 
      weight: 25, 
      complete: !!selections.value.engine && 
                !!selections.value.transmission && 
                !!selections.value.driveTrain 
    },
    colors: { 
      weight: 25, 
      complete: !!selections.value.exteriorColor || 
                !!selections.value.interiorColor 
    }
  }

  let currentProgress = 0
  const tabOrder = ['model', 'trim', 'powertrain', 'colors']
  const currentTabIndex = tabOrder.indexOf(activeTab.value)

  // Add progress for completed steps
  for (let i = 0; i < currentTabIndex; i++) {
    const step = steps[tabOrder[i]]
    if (step.complete) {
      currentProgress += step.weight
    }
  }

  // Add progress for current tab if completed
  const currentStep = steps[activeTab.value]
  if (currentStep.complete) {
    currentProgress += currentStep.weight
  } else {
    // Add partial progress for current tab
    switch (activeTab.value) {
      case 'powertrain':
        if (selections.value.engine) currentProgress += 8
        if (selections.value.transmission) currentProgress += 8
        if (selections.value.driveTrain) currentProgress += 9
        break
      case 'colors':
        if (selections.value.exteriorColor) currentProgress += 12.5
        if (selections.value.interiorColor) currentProgress += 12.5
        break
    }
  }

  return currentProgress
})
</script>