<template>
  <div class="bg-white">
    <div class="mx-auto max-w-7xl px-3 sm:px-6 py-3 lg:px-8 h-screen">
      <div class="h-full relative isolate overflow-hidden bg-gray-900 px-6 py-24 text-center shadow-2xl rounded-3xl sm:px-16">
        <p class="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-300">
          Gib den Code des Raumes und deinen Benutzernamen ein und klicke auf "Beitreten".
        </p>
        <form class="mt-6 place-items-center gap-6 grid grid-cols-1" @submit.prevent="joinGame">
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
          </div>
          <div class="max-w-md">
            <label for="code" class="block text-sm font-medium leading-6 text-gray-300">Code</label>
            <div class="mt-1">
              <input
                id="code"
                v-model="gameCode"
                required
                type="text"
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              >
            </div>
          </div>
          <div class="max-w-md">
            <label for="adlibs" class="block text-sm font-medium leading-6 text-gray-300">Adlibs</label>
            <div class="mt-1">
              <select
                id="adlibs"
                v-model="selectedAdlibs"
                multiple
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              >
                <option v-for="adlib in adlibs" :key="adlib" :value="adlib">
                  {{ adlib }}
                </option>
              </select>
            </div>
          </div>
          <div class="max-w-md">
            <label for="svcModel" class="block text-sm font-medium leading-6 text-gray-300">SVC Model</label>
            <div class="mt-1">
              <select
                id="svcModel"
                v-model="selectedSvcModel"
                required
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              >
                <option disabled value="">
                  Please select one
                </option>
                <option v-for="model in svcModels" :key="model" :value="model">
                  {{ model }}
                </option>
              </select>
            </div>
          </div>
          <button
            type="submit"
            class="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            RAUM BEITRETEN
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { Adlib, SvcModel, useGameJoinMutation, useGetViewerQuery, useUserCreateMutation } from '~~/graphql/generated/graphql'

const viewerId = useViewerId()
const gameCode = ref('')
const selectedAdlibs = ref<Adlib[]>([Adlib.Datway, Adlib.Twentyone])
const selectedSvcModel = ref<SvcModel>(SvcModel.Drake)
const adlibs = ref(Object.values(Adlib))
const svcModels = ref(Object.values(SvcModel))
const username = ref('')

const { mutate: joinGameMutation } = useGameJoinMutation()
const { mutate: userCreateMutation } = useUserCreateMutation()
const { error } = useGetViewerQuery()

async function joinGame () {
  resetState()
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
  }

  if (!viewerId.value) { throw new Error('No viewerId') }
  // eslint-disable-next-line no-console
  console.log('joinGame function called') // Log when the function is called
  try {
    const res = await joinGameMutation({
      input: {
        gameCode: gameCode.value,
        SVCModel: selectedSvcModel.value,
        adlibs: selectedAdlibs.value,
        userId: viewerId.value
      }
    })

    // eslint-disable-next-line no-console
    console.log('Mutation response:', res) // Log the response from the mutation
    const gameUserLink = res?.data?.gameJoin?.gameUserLink
    if (gameUserLink) {
      setViewerId(gameUserLink.user.id)
      setGameCode(gameUserLink.game.gameCode)
      navigateTo({ name: 'game-gameCode-lobby', params: { gameCode: gameUserLink.game.gameCode } })
      // eslint-disable-next-line no-console
      console.log('Stored items in localStorage') // Log when localStorage is updated
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error joining the game:', error)
    // Handle error, e.g., show a notification or error message
  }
}
</script>
