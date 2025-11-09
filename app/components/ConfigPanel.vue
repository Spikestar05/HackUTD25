<template>
  <div class="w-[480px] bg-black/70 backdrop-blur-md h-full flex flex-col">
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
const { activeTab } = useCarConfigurator()
</script>