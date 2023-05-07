<template>
  <div class="bg-white">
    <div class="mx-auto max-w-7xl px-3 sm:px-6 py-3 lg:px-8 h-screen">
      <div
        class="h-full relative isolate overflow-hidden bg-gray-900 px-6 py-24 text-center shadow-2xl rounded-3xl sm:px-16"
      >
        <h2 class="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Erstelle jetzt einen Raum dem deine Freunde beitreten können.
        </h2>
        <p class="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-300">
          Gib deinen Benutzername ein und klicke auf "Raum erstellen".
        </p>
        <form class="mt-6 place-items-center gap-6 grid grid-cols-1" @submit.prevent="createRoom">
          <div class="max-w-md">
            <label for="first-name" class="block text-sm font-medium leading-6 text-gray-300">Benutzername</label>
            <div class="mt-1">
              <input
                id="first-name"
                v-model="nameInput"
                required
                type="text"
                name="first-name"
                autocomplete="given-name"
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              >
            </div>
          </div>
          <button
            type="submit"
            :disabled="loading"
            :class="loading ? 'opacity-50 cursor-not-allowed' : ''"
            class="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            RAUM ERSTELLEN
          </button>
        </form>
        <svg
          viewBox="0 0 1024 1024"
          class="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-x-1/2 [mask-image:radial-gradient(closest-side,white,transparent)]"
          aria-hidden="true"
        >
          <circle cx="512" cy="512" r="512" fill="url(#827591b1-ce8c-4110-b064-7cb85a0b1217)" fill-opacity="0.7" />
          <defs>
            <radialGradient id="827591b1-ce8c-4110-b064-7cb85a0b1217">
              <stop stop-color="#7775D6" />
              <stop offset="1" stop-color="#E935C1" />
            </radialGradient>
          </defs>
        </svg>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useGameCreateMutation } from '~~/graphql/generated/graphql'

const { mutate, loading } = useGameCreateMutation()
const nameInput = ref('')

function createRoom () {
  mutate({
    input: {
      numberOfRounds: 1
    }
  })
    .then((res) => {
      if (res?.data?.gameCreate?.user.game.id) {
        localStorage.setItem('viewerId', res.data.gameCreate.user.id)
        localStorage.setItem('gameId', res.data.gameCreate.user.game.id)
      }
      navigateTo('/lobby')
    })
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.error(err)
    })
}
</script>
