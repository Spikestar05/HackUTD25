<template>
  <div class="p-6 space-y-4 text-white">
    <!-- Engine -->
    <ConfigSection
      title="Engine"
      :is-open="activeSection === 'engine'"
      @toggle="toggleSection('engine')"
    >
      <div class="space-y-3">
        <p class="text-sm text-gray-500 mb-4">Choose your option</p>
        <button
          v-for="engine in availableEngines"
          :key="engine.name"
          @click="selectOption('engine', engine.name)"
          :disabled="!isOptionAvailable('engine', engine.name)"
          :class="getRadioOptionClasses('engine', engine.name)"
        >
          <div class="flex items-center gap-3">
            <div
              class="w-4 h-4 rounded-full border-2 flex items-center justify-center"
              :class="selections.engine === engine.name ? 'border-red-600' : 'border-gray-400'"
            >
              <div
                v-if="selections.engine === engine.name"
                class="w-2 h-2 rounded-full bg-red-600"
              ></div>
            </div>
            <div class="text-left">
              <div class="font-medium">{{ engine.name }}</div>
              <div class="text-xs text-gray-500 mt-1">
                {{ engine.fuelType }} • {{ engine.mpg }} MPG
              </div>
            </div>
          </div>
        </button>
      </div>
    </ConfigSection>

    <!-- Transmission -->
    <ConfigSection
      title="Transmission"
      :is-open="activeSection === 'transmission'"
      @toggle="toggleSection('transmission')"
    >
      <div class="space-y-3">
        <p class="text-sm text-gray-500 mb-4">Choose your option</p>
        <button
          v-for="trans in availableTransmissions"
          :key="trans"
          @click="selectOption('transmission', trans)"
          :disabled="!isOptionAvailable('transmission', trans)"
          :class="getRadioOptionClasses('transmission', trans)"
        >
          <div class="flex items-center gap-3">
            <div
              class="w-4 h-4 rounded-full border-2 flex items-center justify-center"
              :class="selections.transmission === trans ? 'border-red-600' : 'border-gray-400'"
            >
              <div
                v-if="selections.transmission === trans"
                class="w-2 h-2 rounded-full bg-red-600"
              ></div>
            </div>
            <span>{{ trans }}</span>
          </div>
        </button>
      </div>
    </ConfigSection>

    <!-- DriveTrain -->
    <ConfigSection
      title="DriveTrain"
      :is-open="activeSection === 'drivetrain'"
      @toggle="toggleSection('drivetrain')"
    >
      <div class="space-y-3">
        <p class="text-sm text-gray-500 mb-4">Choose your option</p>
        <button
          v-for="dt in availableDriveTrains"
          :key="dt"
          @click="selectOption('driveTrain', dt)"
          :disabled="!isOptionAvailable('driveTrain', dt)"
          :class="getRadioOptionClasses('driveTrain', dt)"
        >
          <div class="flex items-center gap-3">
            <div
              class="w-4 h-4 rounded-full border-2 flex items-center justify-center"
              :class="selections.driveTrain === dt ? 'border-red-600' : 'border-gray-400'"
            >
              <div
                v-if="selections.driveTrain === dt"
                class="w-2 h-2 rounded-full bg-red-600"
              ></div>
            </div>
            <span>{{ dt }}</span>
          </div>
        </button>
      </div>
    </ConfigSection>

    <!-- Wheels -->
    <ConfigSection
      title="Wheels"
      :is-open="activeSection === 'wheels'"
      @toggle="toggleSection('wheels')"
    >
      <div class="space-y-3">
        <p class="text-sm text-gray-500 mb-4">Choose your option</p>
        <button
          v-for="wheel in availableWheels"
          :key="wheel"
          @click="selectOption('wheels', wheel)"
          :disabled="!isOptionAvailable('wheels', wheel)"
          :class="getRadioOptionClasses('wheels', wheel)"
        >
          <div class="flex items-center gap-3">
            <div
              class="w-4 h-4 rounded-full border-2 flex items-center justify-center"
              :class="selections.wheels === wheel ? 'border-red-600' : 'border-gray-400'"
            >
              <div
                v-if="selections.wheels === wheel"
                class="w-2 h-2 rounded-full bg-red-600"
              ></div>
            </div>
            <span>{{ wheel }}</span>
          </div>
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
  availableEngines,
  availableTransmissions,
  availableDriveTrains,
  availableWheels,
  isOptionAvailable,
  getRadioOptionClasses
} = useCarConfigurator()
</script>