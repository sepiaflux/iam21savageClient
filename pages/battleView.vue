<template>
  <div class="bg-white">
    <div class="mx-auto max-w-7xl px-3 sm:px-6 py-3 lg:px-8 h-screen">
      <div
        class="h-full relative isolate overflow-hidden bg-gray-900 px-6 py-24 text-center shadow-2xl rounded-3xl sm:px-16"
      >
        <h2 class="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Battle View
        </h2>
        <div v-if="isHost">
          <div v-if="loading" class="mt-6 text-lg text-gray-300">
            Loading...
          </div>
          <div v-else-if="error" class="mt-6 text-lg text-red-500">
            Error loading battle data.
          </div>
          <div v-else class="mt-6">
            <div v-if="!battles" class="text-lg text-gray-300">
              No battles have been submitted yet.
            </div>
            <div v-for="(battle, index) in battles" :key="index">
              <h3 class="text-lg text-gray-300">
                Battle {{ index + 1 }}
              </h3>
              <h4 class="text-lg text-gray-300">
                Rap Text - First Player:
              </h4>
              <div v-for="(battleParticipant, battleParticipantIndex) in battle.battleParticipants" :key="battleParticipantIndex">
                <p v-if="battleParticipant.rapText" class="mt-4 text-lg text-gray-300">
                  {{ battleParticipant.rapText }}
                </p>
                <p v-else class="mt-4 text-lg text-gray-300">
                  No rap text available for player {{ battleParticipantIndex }}.
                </p>
                <h4 class="mt-10 text-lg text-gray-300">
                  Audio - Player {{ battleParticipantIndex }}:
                </h4>
                <audio
                  v-if="battleParticipant.audioURL"
                  :key="battleParticipant.audioURL"
                  class="mt-4"
                  controls
                  :src="battleParticipant.audioURL"
                >Your browser does not support the audio element.</audio>
                <p v-else class="mt-4 text-lg text-gray-300">
                  No audio available for player {{ battleParticipantIndex }}.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div v-else>
          <h3 class="mx-auto mt-10 max-w-xl text-lg leading-8 text-gray-300">
            Look at the computer
          </h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import { useGetGameQuery, useGetViewerQuery } from '~~/graphql/generated/graphql'

const isHost = ref(false)

const gameId = localStorage.getItem('gameId') as string

const queryPolling = ref(true)
const { result: viewerResult, loading, error } = useGetViewerQuery()
const { result: gameResult, loading: gameLoading, error: gameError } = useGetGameQuery({ gameId }, () => ({
  pollInterval: queryPolling.value ? 1000 : undefined
}))

const battles = computed(() => {
  return gameResult.value?.game?.battles
})

watch(battles, (val) => {
  if (val) {
    queryPolling.value = false
  }
})

watch(viewerResult, (newValue) => {
  if (newValue && newValue.viewer) {
    isHost.value = newValue.viewer.isHost
  }
}, { immediate: true })

</script>
