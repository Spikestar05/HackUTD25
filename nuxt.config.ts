// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: [
    '@nuxt/content',
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/scripts',
    '@nuxt/test-utils',
<<<<<<< Updated upstream
    '@nuxt/ui'
  ]
=======
    '@nuxt/ui',
    '@tresjs/nuxt'
  ],
  
  tres: {
    devtools: true
  },
  
  css: ['~/assets/css/main.css'],
  
  vite: {
    plugins: [tailwindcss()]
  },
  runtimeConfig: {
    // private keys only available on server
    elevenlabsApiKey: process.env.ELEVENLABS_API_KEY,
    // optionally public config (client‐safe) can go under public:
    public: {
      // e.g., agent id that’s safe for client
    }
  }

>>>>>>> Stashed changes
})