<template>
  <div>
    <button
      @click="$emit('toggle')"
      :disabled="disabled"
      class="w-full text-left py-4 border-b border-gray-200 font-medium flex justify-between items-center transition-colors"
      :class="disabled ? 'text-gray-400 cursor-not-allowed' : 'text-gray-900 hover:text-red-600'"
    >
      {{ title }}
    </button>
    
    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      leave-active-class="transition-all duration-200 ease-in"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div v-if="isOpen && !disabled" class="mt-4">
        <slot />
      </div>
    </Transition>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  isOpen: Boolean,
  disabled: {
    type: Boolean,
    default: false
  }
})

defineEmits(['toggle'])
</script>