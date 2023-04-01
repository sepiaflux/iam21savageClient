import { DefaultApolloClient } from '@vue/apollo-composable'
import client from './client'

/**
 * This plugin will connect @nuxt/apollojs with @vue/apollo-composable
 */
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.provide(DefaultApolloClient, client)
})
