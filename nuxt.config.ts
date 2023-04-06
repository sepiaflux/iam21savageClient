import { defineNuxtConfig } from 'nuxt/config'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  ssr: false,
  app: { head: { link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }] } },
  build: {
    transpile: ['@headlessui/vue']
  },
  modules: ['@nuxtjs/tailwindcss'],
  typescript: {
    strict: true,
    shim: false
  },
  plugins: [
    '~/plugins/apollo/index.ts'
  ]
})
