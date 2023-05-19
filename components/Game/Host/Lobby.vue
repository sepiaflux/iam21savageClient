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
      <button
        v-else-if="players.length > 1"
        type="button"
        :disabled="startGameLoading"
        :class="startGameLoading ? 'opacity-50 cursor-not-allowed' : ''"
        class="mt-6 rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        @click="startGame"
      >
        START GAME
      </button>
    </div>
    <div v-else>
      Noch keine Spieler.
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useGameStartMutation, useGetGameQuery } from '~~/graphql/generated/graphql'

const { gameCode } = defineProps<{
              gameCode: string,
              }>()

const { result, loading: gameLoading, error } = useGetGameQuery({ gameCode }, { pollInterval: 1500 })
const { mutate: startGameMutate, loading: startGameLoading } = useGameStartMutation()
const loading = computed(() => gameLoading.value || startGameLoading.value)

function startGame () {
  startGameMutate(
    {
      input: {
        gameCode
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

const players = computed(() => result.value?.game?.users)
</script>
