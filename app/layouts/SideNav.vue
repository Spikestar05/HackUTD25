<template>
  <aside
    class="w-[350px] h-screen bg-[#2D2D2E] rounded-[45px] shadow-[0.5px_0px_0px_0px_rgba(84,84,88,0.65)] flex flex-col justify-start items-start p-8"
  >
    <nav class="flex flex-col gap-10 mt-10 text-[rgba(255,255,255,0.96)] text-[32px] leading-[19px] tracking-[-0.4px] font-['SF_Pro']">
      <NuxtLink
        to="/interior"
        class="hover:text-white hover:font-semibold transition"
      >
        Interior
      </NuxtLink>

      <div class="border-b border-white/50 w-[250px]"></div>

      <NuxtLink
        to="/exterior"
        class="hover:text-white hover:font-semibold transition"
      >
        Exterior
      </NuxtLink>

      <div class="border-b border-white/50 w-[250px]"></div>

      <NuxtLink
        to="/engine"
        class="hover:text-white hover:font-semibold transition"
      >
        Engine
      </NuxtLink>

      <div class="border-b border-white/50 w-[250px]"></div>

      <NuxtLink
        to="/drivetrain"
        class="hover:text-white hover:font-semibold transition"
      >
        Drivetrain
      </NuxtLink>

      <div class="border-b border-white/50 w-[250px]"></div>

      <NuxtLink
        to="/transmission"
        class="hover:text-white hover:font-semibold transition"
      >
        Transmission
      </NuxtLink>
    </nav>
  </aside>
</template>
