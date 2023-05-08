<template>
  <div>
    <h2 class="text-3xl font-bold tracking-tight text-white sm:text-4xl">
      View Scores
    </h2>
    <div v-if="isHost">
      <div v-for="(battle, index) in battles" :key="index">
        <h3 class="text-lg text-gray-300">
          Battle {{ index + 1 }}
        </h3>
        <div v-for="(battleParticipant, battleParticipantIndex) in battle.battleParticipants" :key="battleParticipantIndex">
          <p class="text-lg text-gray-300">
            Player {{ battleParticipantIndex }} - Score: {{ battleParticipant.participant.score }}
          </p>
        </div>
      </div>
    </div>
    <div v-else>
      <p class="text-lg text-gray-300">
        Only the host can view scores.
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import { useGetGameQuery, useGetViewerQuery } from '~~/graphql/generated/graphql'

const isHost = ref(false)

const gameId = localStorage.getItem('gameId') as string

const { result: viewerResult } = useGetViewerQuery()
const { result: gameResult } = useGetGameQuery({ gameId })

const battles = computed(() => {
  return gameResult.value?.game?.battles
})

watch(viewerResult, (newValue) => {
  if (newValue && newValue.viewer) {
    isHost.value = newValue.viewer.isHost
  }
}, { immediate: true })

</script>
