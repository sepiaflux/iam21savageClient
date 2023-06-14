<!-- eslint-disable no-console -->
<template>
  <div v-if="loading">
    ...
  </div>
  <div v-else-if="error">
    {{ error }}
  </div>
  <GamePlayerLobby v-else-if="gameState === GameState.WaitingToJoin" :game-code="gameCode" />
  <GamePlayerAttributes v-else-if="gameState === GameState.Attributes" :game-code="gameCode" />
  <GamePlayerPrompt v-else-if="gameState === GameState.Prompt" :game-code="gameCode" />
  <GamePlayerLoading v-else-if="gameState === GameState.Loading" :game-code="gameCode" />
  <GamePlayerBattle v-else-if="gameState === GameState.Battle" :game-code="gameCode" />
  <div class="text-gray-200 font-sm mt-12" @click="leaveGame">
    Spiel verlassen
  </div>
</template>

<script lang="ts" setup>
import { GameState, useGameInfoQuery } from '~~/graphql/generated/graphql'

const { gameCode } = defineProps<{
                gameCode: string,
                }>()

const { result, loading, error } = useGameInfoQuery({ gameCode }, { pollInterval: 3000 })
const gameState = computed(() => result.value?.game?.state)

function leaveGame () {
  localStorage.removeItem('gameCode')
  navigateTo({ name: 'index' })
}
</script>
