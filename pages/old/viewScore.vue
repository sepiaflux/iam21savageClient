<template>
  <div class="bg-white">
    <div class="mx-auto max-w-7xl px-3 sm:px-6 py-3 lg:px-8 h-screen">
      <div class="h-full relative isolate overflow-hidden bg-gray-900 px-6 py-24 text-center shadow-2xl rounded-3xl sm:px-16">
        <h2 class="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
          View Scores
        </h2>
        <div v-if="isHost">
          <div v-for="(battle, index) in battles" :key="index">
            <h3 class="mx-auto max-w-xl text-lg leading-8 text-gray-300">
              Battle {{ index + 1 }}
            </h3>
            <div v-for="(battleParticipation, battleParticipationIndex) in battle.battleParticipations" :key="battleParticipationIndex">
              <p class="mx-auto max-w-xl text-lg leading-8 text-gray-300">
                Player {{ battleParticipationIndex }} - Score: {{ battleParticipation.participant.score * 1000 }}
              </p>
            </div>
          </div>
        </div>
        <div v-else>
          <p class="mx-auto max-w-xl text-lg leading-8 text-gray-300">
            Only the host can view scores.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import { useGetGameQuery, useGetViewerQuery } from '~~/graphql/generated/graphql'

const isHost = ref(false)

const route = useRoute()
const gameCode = route.params.gameCode as string

const { result: viewerResult } = useGetViewerQuery()
const { result: gameResult } = useGetGameQuery({ gameCode })

const battles = computed(() => {
  return gameResult.value?.game?.battles
})

watch(viewerResult, (newValue) => {
  if (newValue && newValue.viewer) {
    isHost.value = newValue.viewer.isHost
  }
}, { immediate: true })

</script>
