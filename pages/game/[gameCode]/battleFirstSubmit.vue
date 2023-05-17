<template>
  <div class="bg-white">
    <div class="mx-auto max-w-7xl px-3 sm:px-6 py-3 lg:px-8 h-screen">
      <div
        class="h-full relative isolate overflow-hidden bg-gray-900 px-6 py-24 text-center shadow-2xl rounded-3xl sm:px-16"
      >
        <h2 class="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Submit Your Battle
        </h2>
        <div v-if="isHost">
          <h3 class="mx-auto mt-10 max-w-xl text-lg leading-8 text-gray-300">
            Look at your phone
          </h3>
        </div>
        <div v-else>
          <form class="mt-6 grid grid-cols-1 gap-y-6" @submit.prevent="submitBattle">
            <div>
              <label for="attribute1" class="block text-sm font-medium text-gray-300">Attribute 1</label>
              <div class="mt-1">
                <input
                  id="attribute1"
                  v-model="attribute1"
                  required
                  type="text"
                  class="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                >
              </div>
            </div>
            <div>
              <label for="attribute2" class="block text-sm font-medium text-gray-300">Attribute 2</label>
              <div class="mt-1">
                <input
                  id="attribute2"
                  v-model="attribute2"
                  required
                  type="text"
                  class="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                >
              </div>
            </div>
            <div>
              <label for="attribute3" class="block text-sm font-medium text-gray-300">Attribute 3</label>
              <div class="mt-1">
                <input
                  id="attribute3"
                  v-model="attribute3"
                  required
                  type="text"
                  class="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                >
              </div>
            </div>
            <button
              type="submit"
              class="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 relative"
              :disabled="isLoading"
            >
              <span v-show="!isLoading">Submit Battle</span>
              <span v-show="isLoading" class="absolute inset-0 flex items-center justify-center">
                <div class="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white" />
              </span>
            </button>
          </form>
          <div>
            <label class="block text-sm font-medium text-gray-300">Device Id</label>
            <div class="mt-1">
              <span class="block w-full p-2 shadow-sm sm:text-sm bg-gray-200 text-gray-900 rounded-md">
                {{ deviceId }}
              </span>
            </div>
          </div>
          <h3 class="mx-auto mt-10 max-w-xl text-lg leading-8 text-gray-300">
            Users in this battle:
          </h3>
          <ul class="mx-auto mt-4 max-w-xl text-lg leading-8 text-gray-300">
            <li v-for="user in users" :key="user.id">
              {{ user.name }} - {{ user.deviceId }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import { GameState, UserFragment, useBattleFirstSubmitMutation, useGetBattleViewerQuery, useGetGameQuery, useGetViewerQuery } from '~~/graphql/generated/graphql'

const attribute1 = ref('')
const attribute2 = ref('')
const attribute3 = ref('')
const isLoading = ref(false)
const deviceId = ref('')
const isHost = ref(false)

const users = ref<UserFragment[]>([])

const battleId = localStorage.getItem('battleId') as string
const viewerId = useViewerId()

// eslint-disable-next-line no-console
console.log('viewerId: ', viewerId)
const route = useRoute()
const gameCode = route.params.gameCode as string

const { result } = useGetViewerQuery()
const { result: resultBattleViewerQuery } = useGetBattleViewerQuery({ userId: viewerId.value || 'placeholder' })
const { mutate: submitFirstBattleMutation } = useBattleFirstSubmitMutation()
// use the useGetGameQuery hook to get the game data

watch(result, (newValue) => {
  if (newValue && newValue.viewer) {
    deviceId.value = newValue.viewer.deviceId || ''
    isHost.value = newValue.viewer.isHost
  }
}, { immediate: true })

watch(resultBattleViewerQuery, (newValue) => {
  if (newValue && newValue.battleViewer) {
    users.value = newValue.battleViewer.battleParticipants.map(participant => participant.participant)
  }
}, { immediate: true })

const { result: resultGetGameQuery } = useGetGameQuery({ gameCode }, { pollInterval: 1000 })

// watch the result of the useGetGameQuery hook and if the state changes
watch(resultGetGameQuery, (newValue) => {
  if (newValue && newValue.game) {
    if (isHost.value && newValue.game.state === GameState.Voting) {
      navigateTo({ name: 'game-gameCode-battleView', params: { gameCode } })
    }
  }
})

async function submitBattle () {
  isLoading.value = true
  try {
    const battleParticipant = await submitFirstBattleMutation({
      input: {
        battleId,
        attribute1: attribute1.value,
        attribute2: attribute2.value,
        attribute3: attribute3.value,
        deviceId: deviceId.value
      }
    })

    if (battleParticipant?.data && battleParticipant.data.battleFirstSubmit) {
      navigateTo({ name: 'game-gameCode-battleSubmit', params: { gameCode } })
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error submitting battle:', error)
  } finally {
    isLoading.value = false
  }
}
</script>
