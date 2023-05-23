<template>
  <div class="max-w-md">
    <label for="first-name" class="block text-sm font-medium leading-6 text-gray-300">Benutzername</label>
    <div class="mt-1">
      <input
        id="first-name"
        v-model="username"
        required
        type="text"
        name="first-name"
        autocomplete="given-name"
        class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
      >
    </div>
    <button
      class="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
      @click="registerUser"
    >
      Registrieren
    </button>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useGetViewerQuery, useUserCreateMutation } from '~~/graphql/generated/graphql'

const username = ref('')
const viewerId = useViewerId()
const { mutate: userCreateMutation } = useUserCreateMutation()
const { error } = useGetViewerQuery()

async function registerUser () {
  if (!viewerId.value || error) {
    viewerId.value = (await userCreateMutation({
      input: {
        user: {
          name: username.value
        }
      }
    }))?.data?.userCreate?.user.id
    // eslint-disable-next-line no-console
    console.log('Created new user', viewerId.value)
    if (!viewerId.value) { throw new Error('No viewerId') }
    setViewerId(viewerId.value)
  }

  if (viewerId.value) {
    navigateTo({ name: 'index' })
  }
}
</script>
