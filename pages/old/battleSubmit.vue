<template>
  <div class="bg-white">
    <div class="mx-auto max-w-7xl px-3 sm:px-6 py-3 lg:px-8 h-screen">
      <div
        class="h-full relative isolate overflow-hidden bg-gray-900 px-6 py-24 text-center shadow-2xl rounded-3xl sm:px-16"
      >
        <h2 class="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Submit Your First Battle Part
        </h2>
        <h4 class="text-lg text-gray-300">
          First Line:
        </h4>
        <p v-if="openAIFirstPart" class="mt-4 text-lg text-gray-300">
          {{ openAIFirstPart }}
        </p>
        <p v-else class="mt-4 text-lg text-gray-300">
          No openai text has been responded. If this is in the worker please wait else there is an error.
        </p>
        <form class="mt-6 grid grid-cols-1 gap-y-6" @submit.prevent="submitMiddlePart">
          <div>
            <label for="middlePart" class="block text-sm font-medium text-gray-300">Now continue the rap from
              before with 2 lines of your own:</label>
            <div class="mt-1">
              <input
                id="middlePart"
                v-model="middlePart"
                required
                type="text"
                class="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
              >
            </div>
          </div>
          <button
            type="submit"
            class="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            :disabled="isLoading"
          >
            Submit Middle Part
          </button>
        </form>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { UserFragment, useBattleSubmitMutation, useGetBattleViewerQuery, useGetViewerQuery } from '~~/graphql/generated/graphql'

const middlePart = ref('')
const deviceId = ref('')
const isLoading = ref(false)

const route = useRoute()
const gameCode = route.params.gameCode as string
const battleId = localStorage.getItem('battleId') as string
const viewerId = useViewerId()
const users = ref<UserFragment[]>([])

const { result: resultBattleViewerQuery } = useGetBattleViewerQuery({ userId: viewerId.value || 'placeholder' }, { pollInterval: 1000 })
const { result } = useGetViewerQuery()
const { mutate: submitFirstBattleMutation } = useBattleSubmitMutation()

const openAIFirstPart = computed(() => {
  // eslint-disable-next-line no-console
  console.log('battleParticipations', resultBattleViewerQuery.value?.battleViewer?.battleParticipations)
  const { battleParticipations } = resultBattleViewerQuery.value?.battleViewer || {}
  if (battleParticipations) {
    const battleParticipation = battleParticipations.find(bp => bp.participant.id === viewerId.value)
    if (battleParticipation) {
      return battleParticipation.openAIFirstPart
    }
  }
})
watch(result, (newValue) => {
  if (newValue && newValue.viewer) {
    deviceId.value = newValue.viewer.deviceId || ''
  }
}, { immediate: true })

watch(resultBattleViewerQuery, (newValue) => {
  if (newValue && newValue.battleViewer) {
    users.value = newValue.battleViewer.battleParticipations.map(participant => participant.participant)
  }
}, { immediate: true })

async function submitMiddlePart () {
  isLoading.value = true
  try {
    const battle = await submitFirstBattleMutation({
      input: {
        battleId,
        middlePart: middlePart.value,
        deviceId: deviceId.value
      }
    })
    if (battle?.data && battle.data.battleSubmit) {
      navigateTo({ name: 'game-gameCode-battleView', params: { gameCode } })
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error submitting battle:', error)
  } finally {
    isLoading.value = false
  }
}
</script>
