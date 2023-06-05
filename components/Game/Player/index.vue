<!-- eslint-disable no-console -->
<template>
  <div v-if="loading">
    ...
  </div>
  <div v-else-if="error">
    {{ error }}
  </div>
  <GamePlayerLobby v-else-if="gameState === GameState.WaitingToJoin" :game-code="gameCode" />
</template>

<script lang="ts" setup>
import { GameState, useGameInfoQuery } from '~~/graphql/generated/graphql'

const { gameCode } = defineProps<{
                gameCode: string,
                }>()

const { result, loading, error } = useGameInfoQuery({ gameCode }, { pollInterval: 3000 })
const gameState = computed(() => result.value?.game?.state)
</script>
