// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],

  runtimeConfig: {
    mongoUser: process.env.MONGO_USER,
    mongoPass: process.env.MONGO_PASSWORD,
    mongoCluster: process.env.MONGO_CLUSTER,
    mongoAppName: process.env.MONGO_APP_NAME,
    mongoDbName: process.env.MONGO_DB_NAME || 'your_database_name',
    mongoCollection: process.env.MONGO_COLLECTION || 'vehicles',
  },
    nitro: {
    typescript: {
      tsConfig: {
        compilerOptions: {
          types: ['node']
        }
      }
    }
  },
  modules: [
    '@nuxt/content',
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/scripts',
    '@nuxt/test-utils',
    '@nuxt/ui'
  ]
})