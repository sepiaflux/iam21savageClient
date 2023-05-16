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
import { GameState, UserFragment, useGameStartMutation, useGetBattleViewerQuery, useGetGameQuery, useGetViewerQuery } from '~~/graphql/generated/graphql'

const deviceId = ref('')
const isHost = ref(false)
const users = ref<UserFragment[]>([])
const gameState = ref<GameState | null>(null)

const gameId = localStorage.getItem('gameId') as string
const { result, loading, error } = useGetGameQuery({ gameId }, { pollInterval: 1000 })

const viewerId = localStorage.getItem('viewerId') as string
const { result: resultBattleViewerQuery, loading: loadingBattleViewerQuery, error: errorBattleViewerQuery } = useGetBattleViewerQuery({ userId: viewerId }, { pollInterval: 1000 })
const { result: resultViewer, loading: loadingViewer, error: errorViewer } = useGetViewerQuery()

const gameCode = ref('Loading...')

watch(resultViewer, (newValue) => {
  if (newValue && newValue.viewer) {
    deviceId.value = newValue.viewer.deviceId || ''
    isHost.value = newValue.viewer.isHost
  }
}, { immediate: true })

watch(result, (newValue) => {
  if (newValue && newValue.game) {
    gameCode.value = newValue.game.gameCode || 'GameCode Fehler'
    // Filter out users with isHost set to true
    users.value = newValue.game.users.filter(user => !user.isHost) || []
    gameState.value = newValue.game.state
  }
}, { immediate: true })

watch([result, resultBattleViewerQuery], ([gameResult, battleViewerResult]) => {
  if (gameResult?.game && gameResult.game.state === GameState.Prompt && battleViewerResult?.battleViewer?.id) {
    localStorage.setItem('battleId', battleViewerResult.battleViewer.id)
    navigateTo('/battleFirstSubmit')
  } else if (isHost.value && gameResult?.game?.state === GameState.Prompt) {
    navigateTo('/battleFirstSubmit')
  }
})

const { mutate, loading: startGameLoading } = useGameStartMutation()

function startGame () {
  mutate(
    { input: { gameId } }
  )
    .then((res) => {
      res?.data?.gameStart?.battles?.forEach((battle) => {
        battle.battleParticipants.forEach((battleParticipant) => {
          if (battleParticipant.participant.id === viewerId) {
            localStorage.setItem('battleId', battle.id)
            navigateTo('/battleFirstSubmit')
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
