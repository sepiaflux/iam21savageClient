<template>
    <div class="bg-white">
        <div class="mx-auto max-w-7xl px-3 sm:px-6 py-3 lg:px-8 h-screen">
            <div
                class="h-full relative isolate overflow-hidden bg-gray-900 px-6 py-24 text-center shadow-2xl rounded-3xl sm:px-16">
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
                            <input id="middlePart" v-model="middlePart" required type="text"
                                class="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md">
                        </div>
                    </div>
                    <button type="submit"
                        class="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        :disabled="isLoading">
                        Submit Middle Part
                    </button>
                </form>
            </div>
        </div>
    </div>
</template>
  
<script lang="ts" setup>
import { UserInfoFragment, useBattleSubmitMutation, useGetBattleViewerQuery, useGetViewerQuery } from '~~/graphql/generated/graphql'

// Add imports and logic specific to battleFirstSubmit.vue


const middlePart = ref('')
const isFirstPlayer = ref(false)

const deviceId = ref('')
const isLoading = ref(false)

const battleId = localStorage.getItem('battleId') as string
const viewerId = localStorage.getItem('viewerId') as string
const gameId = localStorage.getItem('gameId') as string
const users = ref<UserInfoFragment[]>([])

// Add logic for setting isFirstPlayer based on viewer.deviceId matching the deviceId of the firstPlayer of the battle
// Add logic for setting openAIFirstPartFirstPlayer and openAIFirstPartSecondPlayer
const { result: resultBattleViewerQuery, loading: loadingBattleViewerQuery, error: errorBattleViewerQuery } = useGetBattleViewerQuery({ userId: viewerId }, { pollInterval: 1000 })
const { result, loading, error } = useGetViewerQuery()
const { mutate: submitFirstBattleMutation } = useBattleSubmitMutation()

const openAIFirstPart = computed(() => {
    const battleViewer = resultBattleViewerQuery.value?.battleViewer
    const { firstPlayer } = resultBattleViewerQuery.value?.battleViewer || {}
    if (firstPlayer?.id === viewerId) {
        return battleViewer?.openAIFirstPartFirstPlayer
    }
    return battleViewer?.openAIFirstPartSecondPlayer
})

watch(result, (newValue) => {
    if (newValue && newValue.viewer) {
        deviceId.value = newValue.viewer.deviceId || ''
    }
}, { immediate: true })

watch(resultBattleViewerQuery, (newValue) => {
    if (newValue && newValue.battleViewer) {
        users.value = [newValue.battleViewer.firstPlayer, newValue.battleViewer.secondPlayer] || []
    }
}, { immediate: true })

async function submitMiddlePart() {
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
            navigateTo('/battleView')
        }
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error submitting battle:', error)
    } finally {
        isLoading.value = false
    }
}
</script>
  