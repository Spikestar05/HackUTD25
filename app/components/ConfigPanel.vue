<template>
  <div class="w-[480px] bg-white h-full flex flex-col">
    <!-- Tabs Header -->
    <div class="flex border-b border-gray-200 relative">
      <button
        @click="activeTab = 'colors'"
        class="flex-1 py-6 text-sm font-medium relative transition-colors"
        :class="activeTab === 'colors' ? 'text-gray-900' : 'text-gray-500'"
      >
        Colors
      </button>
      <button
        @click="activeTab = 'powertrain'"
        class="flex-1 py-6 text-sm font-medium relative transition-colors"
        :class="activeTab === 'powertrain' ? 'text-gray-900' : 'text-gray-500'"
      >
        Powertrain
      </button>
      
      <!-- Red Underline Indicator -->
      <div
        class="absolute bottom-0 h-1 bg-red-600 transition-all duration-300"
        :style="{
          width: '50%',
          left: activeTab === 'colors' ? '0%' : '50%'
        }"
      ></div>
    </div>

    <!-- Scrollable Content -->
    <div class="flex-1 overflow-y-auto">
      <ColorsTab v-if="activeTab === 'colors'" />
      <PowertrainTab v-else />
    </div>
  </div>
</template>

<script setup>
const activeTab = ref('colors')
</script>