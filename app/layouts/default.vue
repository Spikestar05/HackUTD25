<template>
  <div class="flex min-h-screen bg-[#1E1E1E]">
    <!-- Sidebar -->
    <SideNav />

    <!-- Main Content Area -->
    <main class="flex-1 p-8 overflow-auto">
      <slot />
    </main>
  </div>
</template>

<script setup>
import SideNav from '~/layouts/SideNav.vue'
</script>
