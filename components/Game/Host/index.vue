<!-- eslint-disable no-console -->
<template>
  <div v-if="loading">
    ...
  </div>
  <div v-else-if="error">
    {{ error }}
  </div>
  <GameHostLobby v-else-if="gameState === GameState.WaitingToJoin" :game-code="gameCode" />
</template>

<script lang="ts" setup>
import { GameState, useGetGameQuery } from '~~/graphql/generated/graphql'

const { gameCode } = defineProps<{
              gameCode: string,
              }>()

const { result, loading, error } = useGetGameQuery({ gameCode }, { pollInterval: 3000 })
const gameState = computed(() => result.value?.game?.state)
const roundIndex = computed(() => result.value?.game?.roundIndex)
</script>
