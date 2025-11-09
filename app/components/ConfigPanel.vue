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
    <div class="flex border-b border-white/20 relative overflow-x-auto">
      <button
        @click="activeTab = 'model'"
        class="flex-1 py-6 px-3 text-sm font-medium relative transition-colors whitespace-nowrap"
        :class="activeTab === 'model' ? 'text-white' : 'text-gray-400'"
      >
        Model
      </button>
      <button
        @click="activeTab = 'trim'"
        class="flex-1 py-6 px-3 text-sm font-medium relative transition-colors whitespace-nowrap"
        :class="activeTab === 'trim' ? 'text-white' : 'text-gray-400'"
      >
        Trim
      </button>
      <button
        @click="activeTab = 'powertrain'"
        class="flex-1 py-6 px-3 text-sm font-medium relative transition-colors whitespace-nowrap"
        :class="activeTab === 'powertrain' ? 'text-white' : 'text-gray-400'"
      >
        Powertrain
      </button>
      <button
        @click="activeTab = 'colors'"
        class="flex-1 py-6 px-3 text-sm font-medium relative transition-colors whitespace-nowrap"
        :class="activeTab === 'colors' ? 'text-white' : 'text-gray-400'"
      >
        Colors
      </button>
      <button
        @click="activeTab = 'finance'"
        class="flex-1 py-6 px-3 text-sm font-medium relative transition-colors whitespace-nowrap"
        :class="activeTab === 'finance' ? 'text-white' : 'text-gray-400'"
      >
        Finance
      </button>
      
      <!-- Red Underline Indicator -->
      <div
        class="absolute bottom-0 h-1 bg-red-600 transition-all duration-300"
        :style="{
          width: '20%',
          left: activeTab === 'model' ? '0%' : 
                activeTab === 'trim' ? '20%' : 
                activeTab === 'powertrain' ? '40%' : 
                activeTab === 'colors' ? '60%' : '80%'
        }"
      ></div>
    </div>

    <!-- Scrollable Content -->
    <div class="flex-1 overflow-y-auto">
      <ModelTab v-if="activeTab === 'model'" />
      <TrimTab v-else-if="activeTab === 'trim'" />
      <PowertrainTab v-else-if="activeTab === 'powertrain'" />
      <ColorsTab v-else-if="activeTab === 'colors'" />
      <FinanceTab v-else-if="activeTab === 'finance'" />
    </div>
  </div>
</template>

<script setup>
const { activeTab, selections } = useCarConfigurator()

// Calculate progress based on selections and current tab
const progress = computed(() => {
  const steps = {
    model: { weight: 20, complete: !!selections.value.model },
    trim: { weight: 20, complete: !!selections.value.trim },
    powertrain: { 
      weight: 20, 
      complete: !!selections.value.engine && 
                !!selections.value.transmission && 
                !!selections.value.driveTrain 
    },
    colors: { 
      weight: 20, 
      complete: !!selections.value.exteriorColor || 
                !!selections.value.interiorColor 
    },
    finance: { weight: 20, complete: true } // Finance is always available
  }

  let currentProgress = 0
  const tabOrder = ['model', 'trim', 'powertrain', 'colors', 'finance']
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
        if (selections.value.engine) currentProgress += 6
        if (selections.value.transmission) currentProgress += 7
        if (selections.value.driveTrain) currentProgress += 7
        break
      case 'colors':
        if (selections.value.exteriorColor) currentProgress += 10
        if (selections.value.interiorColor) currentProgress += 10
        break
    }
  }

  return currentProgress
})
</script>`