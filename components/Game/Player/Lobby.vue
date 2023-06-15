<!-- eslint-disable no-console -->
<template>
  <div>
    <div>Code: {{ gameCode.toUpperCase() }}</div>
    <div v-if="players && players.filter(x => x.name !== 'Host').length > 0">
      Spieler:
      <div v-for="player in players?.filter(x => x.name !== 'Host')" :key="player.id">
        {{ player.name }}
      </div>
      <LoadingPinger v-if="loading" />
    </div>
    <div v-else>
      Noch keine Spieler.
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useGamePlayersQuery } from '~~/graphql/generated/graphql'

const { gameCode } = defineProps<{
              gameCode: string,
              }>()

const { result, loading: gameLoading } = useGamePlayersQuery({ gameCode }, { pollInterval: 1500 })
const loading = computed(() => gameLoading.value)

const players = computed(() => result.value?.game?.gameUserLinks.map(x => x.user))
</script>
