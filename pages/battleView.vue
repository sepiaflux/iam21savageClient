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
              <p v-if="battle.rapTextFirstPlayer" class="mt-4 text-lg text-gray-300">
                {{ battle.rapTextFirstPlayer }}
              </p>
              <p v-else class="mt-4 text-lg text-gray-300">
                No rap text available for the first player.
              </p>
              <h4 class="mt-10 text-lg text-gray-300">
                Audio - First Player:
              </h4>
              <audio
                v-if="battle.audioURLFirstPlayer"
                :key="battle.audioURLFirstPlayer"
                class="mt-4"
                controls
                :src="battle.audioURLFirstPlayer"
              >Your browser does not support the audio element.</audio>
              <p v-else class="mt-4 text-lg text-gray-300">
                No audio available for the first player.
              </p>
              <h4 class="mt-10 text-lg text-gray-300">
                Rap Text - Second Player:
              </h4>
              <p v-if="battle.rapTextSecondPlayer" class="mt-4 text-lg text-gray-300">
                {{ battle.rapTextSecondPlayer }}
              </p>
              <p v-else class="mt-4 text-lg text-gray-300">
                No rap text available for the second player.
              </p>
              <h4 class="mt-10 text-lg text-gray-300">
                Audio - Second Player:
              </h4>
              <audio
                v-if="battle.audioURLSecondPlayer"
                :key="battle.audioURLSecondPlayer"
                class="mt-4"
                controls
                :src="battle.audioURLSecondPlayer"
              >Your browser does not support the audio element.</audio>
              <p v-else class="mt-4 text-lg text-gray-300">
                No audio available for the second player.
              </p>
              <!-- <hr class="my-10 text-gray-600" v-if="battles && index + 1 < battles.length"> -->
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

const viewerId = localStorage.getItem('viewerId') as string
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

// watch(gameResult, (newValue) => {
//   if (battles.value.length === 0 && !gameLoading.value && !gameError.value && newValue) {
//     battles.value = newValue.game?.battles || []
//   }
// }, { immediate: true })

// onMounted(() => {
//   if (!gameLoading.value && !gameError.value && gameResult.value) {
//     battles.value = gameResult.value.game?.battles || []
//   }
// })

</script>
