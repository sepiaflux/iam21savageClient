<!-- eslint-disable no-console -->
<template>
  <div>
    <div>Code: {{ gameCode.toUpperCase() }}</div>
    <div v-if="players && players.filter(x => x.name !== 'Host').length > 0">
      Spieler:
      <div v-for="player in players?.filter(x => x.name !== 'Host')" :key="player.id">
        {{ player.name }}
      </div>
    </div>
    <div v-else>
      Noch keine Spieler.
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useGetGameQuery } from '~~/graphql/generated/graphql'

const { gameCode } = defineProps<{
              gameCode: string,
              }>()

const { result, loading, error } = useGetGameQuery({ gameCode }, { pollInterval: 1500 })
const players = computed(() => result.value?.game?.users)
const gameState = computed(() => result.value?.game?.state)
</script>
