<!-- eslint-disable no-console -->
<template>
  <div class="bg-white">
    <div class="mx-auto max-w-7xl px-3 sm:px-6 py-3 lg:px-8 h-screen">
      <div class="h-full relative isolate overflow-hidden bg-gray-900 px-6 py-24 text-center shadow-2xl rounded-3xl sm:px-16">
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
import { GameState, User as UserType, useGameStartMutation, useGetBattleViewerQuery, useGetGameQuery } from '~~/graphql/generated/graphql'

const gameId = localStorage.getItem('gameId') as string
const { result, loading, error } = useGetGameQuery({ gameId }, { pollInterval: 1000 })

const viewerId = localStorage.getItem('viewerId') as string
const { result: resultBattleViewerQuery, loading: loadingBattleViewerQuery, error: errorBattleViewerQuery } = useGetBattleViewerQuery({ userId: viewerId }, { pollInterval: 1000 })

const gameCode = ref('Loading...')

type User = Omit<UserType, 'game'>
const users = ref<User[]>([])
const gameState = ref<GameState | null>(null)

watch(result, (newValue) => {
  if (newValue && newValue.game) {
    gameCode.value = newValue.game.gameCode || 'GameCode Fehler'
    users.value = newValue.game.users || []
    gameState.value = newValue.game.state
  }
}, { immediate: true })

watch([result, resultBattleViewerQuery], ([gameResult, battleViewerResult]) => {
  if (gameResult?.game && gameResult.game.state === GameState.Prompt && battleViewerResult?.battleViewer?.id) {
    localStorage.setItem('battleId', battleViewerResult.battleViewer.id)
    navigateTo('/battleSubmit')
  }
})

const { mutate, loading: startGameLoading } = useGameStartMutation()

function startGame () {
  mutate(
    { input: { gameId } }
  )
    .then((res) => {
      if (res?.data?.gameStart?.battles[0].id) {
        localStorage.setItem('battleId', res?.data?.gameStart?.battles[0].id)
      }
      navigateTo('/battleSubmit')
    })
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.error(err)
    })
}

</script>
