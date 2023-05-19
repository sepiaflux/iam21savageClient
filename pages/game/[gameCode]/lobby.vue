<!-- eslint-disable no-console -->
<template>
  <div class="bg-white">
    <div class="mx-auto max-w-7xl px-3 sm:px-6 py-3 lg:px-8 h-screen">
      <div
        class="h-full relative isolate overflow-hidden bg-gray-900 px-6 py-24 text-center shadow-2xl rounded-3xl sm:px-16"
      >
        <h2 class="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Lobby
        </h2>
        <p class="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-300">
          Game Code: {{ gameCode }}
        </p>
        <h3 class="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-300">
          Participants:
        </h3>
        <ul class="mx-auto mt-4 max-w-xl text-lg leading-8 text-gray-300">
          <li v-for="user in users" :key="user.id">
            {{ user.name }}
          </li>
        </ul>
        <button
          type="button"
          :disabled="startGameLoading"
          :class="startGameLoading ? 'opacity-50 cursor-not-allowed' : ''"
          class="mt-6 rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          @click="startGame"
        >
          START GAME
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import { GameState, UserFragment, useGameStartMutation, useGameSubSubscription, useGetBattleViewerQuery, useGetViewerQuery, useGetGameQuery } from '~~/graphql/generated/graphql'

const deviceId = ref('')
const isHost = ref(false)
const users = ref<UserFragment[]>([])

const gameCodeStorage = useGameCode()

const viewerId = useViewerId()

const gameCode = ref(gameCodeStorage)

const { result: resultViewer } = useGetViewerQuery()
watch(resultViewer, (newValue) => {
  if (newValue && newValue.viewer) {
    deviceId.value = newValue.viewer.deviceId || ''
    isHost.value = newValue.viewer.isHost
  }
}, { immediate: true })

const { result } = useGetGameQuery({ gameCode: gameCodeStorage.value || 'placeholder' }, { pollInterval: 1000 })
watch(result, (newValue) => {
  if (newValue && newValue.game) {
    users.value = newValue.game.users.filter(user => !user.isHost) || []
  }
}, { immediate: true })

const { result: resultGameSub } = useGameSubSubscription({ gameCode: gameCodeStorage.value || 'placeholder' })
watch(resultGameSub, (newValue) => {
  if (newValue && newValue.game) {
    if (newValue.game.state === GameState.Prompt) {
      navigateTo({ name: 'game-gameCode-battleFirstSubmit', params: { gameCode: gameCodeStorage.value } })
    }
  }
}, { immediate: true })

const { result: resultBattleViewerQuery } = useGetBattleViewerQuery({ userId: viewerId.value || 'placeholder' }, { pollInterval: 1000 })
watch([result, resultBattleViewerQuery], ([gameResult, battleViewerResult]) => {
  // eslint-disable-next-line no-console
  console.log('battleViewerResult: ' + battleViewerResult?.battleViewer?.id)
  if (gameResult?.game && gameResult.game.state === GameState.Prompt && battleViewerResult?.battleViewer?.id) {
    localStorage.setItem('battleId', battleViewerResult.battleViewer.id)
    navigateTo({ name: 'game-gameCode-battleFirstSubmit', params: { gameCode: gameCodeStorage.value } })
  } else if (isHost.value && gameResult?.game?.state === GameState.Prompt) {
    navigateTo({ name: 'game-gameCode-battleFirstSubmit', params: { gameCode: gameCodeStorage.value } })
  }
})

const { mutate, loading: startGameLoading } = useGameStartMutation()

function startGame () {
  mutate(
    {
      input: {
        gameCode: gameCodeStorage.value || 'placeholder'
      }
    }
  )
    .then((res) => {
      res?.data?.gameStart?.battles?.forEach((battle) => {
        battle.battleParticipants.forEach((battleParticipant) => {
          if (battleParticipant.participant.id === viewerId.value) {
            localStorage.setItem('battleId', battle.id)
            navigateTo({ name: 'game-gameCode-battleFirstSubmit', params: { gameCode: gameCodeStorage.value } })
          }
        })
      })
    })
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.error(err)
    })
}

</script>
