<template>
  <div class="bg-white">
    <div class="mx-auto max-w-7xl px-3 sm:px-6 py-3 lg:px-8 h-screen">
      <div
        class="h-full relative isolate overflow-hidden bg-gray-900 px-6 py-24 text-center shadow-2xl rounded-3xl sm:px-16"
      >
        <h2 class="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Battle View
        </h2>
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
            <div v-for="(battleParticipation, battleParticipationIndex) in battle.battleParticipations" :key="battleParticipationIndex">
              <template v-if="isHost">
                <h4 class="text-lg text-gray-300">
                  Rap Text - First Player:
                </h4>
                <p v-if="battleParticipation.rapText" class="mt-4 text-lg text-gray-300">
                  {{ battleParticipation.rapText }}
                </p>
                <p v-else class="mt-4 text-lg text-gray-300">
                  No rap text available for player {{ battleParticipationIndex }}.
                </p>
                <h4 class="mt-10 text-lg text-gray-300">
                  Audio - Player {{ battleParticipationIndex }}:
                </h4>
                <audio
                  v-if="battleParticipation.audioURL"
                  :key="battleParticipation.audioURL"
                  class="mt-4"
                  controls
                  :src="battleParticipation.audioURL"
                >Your browser does not support the audio element.</audio>
                <p v-else class="mt-4 text-lg text-gray-300">
                  No audio available for player {{ battleParticipationIndex }}.
                </p>
              </template>
              <template v-else>
                <button class="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" @click="vote(battleParticipation.id)">
                  Vote for {{ battleParticipation.participant.name }}
                </button>
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import { GameState, useGetGameQuery, useGetViewerQuery, useVoteMutation } from '~~/graphql/generated/graphql'

const isHost = ref(false)

const route = useRoute()
const gameCode = route.params.gameCode as string

const queryPolling = ref(true)
const { result: viewerResult, loading, error } = useGetViewerQuery()
const { result: gameResult } = useGetGameQuery({ gameCode }, () => ({
  pollInterval: queryPolling.value ? 1000 : 30000
}))

const battles = computed(() => {
  return gameResult.value?.game?.battles
})

watch(battles, (val) => {
  // Check if there are any battles
  if (val && val.length > 0) {
    let allHaveAudioURL = true

    // Iterate through the battles
    for (const battle of val) {
      // Check if all battleParticipations have an audioURL
      for (const participant of battle.battleParticipations) {
        if (!participant.audioURL) {
          allHaveAudioURL = false
          break
        }
      }

      // If any battleParticipation doesn't have an audioURL, stop checking further
      if (!allHaveAudioURL) {
        break
      }
    }

    // If all battleParticipations of all battles have an audioURL, stop polling
    if (allHaveAudioURL) {
      queryPolling.value = false
    }
  }
})

watch(viewerResult, (newValue) => {
  if (newValue && newValue.viewer) {
    isHost.value = newValue.viewer.isHost
  }
}, { immediate: true })

const { mutate: voteMutate } = useVoteMutation()

async function vote (battleParticipationId: string) {
  if (!viewerResult.value?.viewer?.id) {
    // eslint-disable-next-line no-console
    console.error('No viewer ID available.')
    return
  }

  try {
    await voteMutate({
      input: {
        battleParticipationId,
        voterId: viewerResult.value.viewer.id
      }
    })
    // eslint-disable-next-line no-console
    console.log('Vote submitted.')
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error submitting vote:', error)
  }
}

// watch the result of the useGetGameQuery hook and if the state changes
watch(gameResult, (newValue) => {
  if (newValue && newValue.game) {
    if (newValue.game.state === GameState.Results) {
      navigateTo({ name: 'game-gameCode-viewScore', params: { gameCode } })
    }
  }
})

</script>
