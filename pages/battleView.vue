<template>
  <div class="bg-white">
    <div class="mx-auto max-w-7xl px-3 sm:px-6 py-3 lg:px-8 h-screen">
      <div class="h-full relative isolate overflow-hidden bg-gray-900 px-6 py-24 text-center shadow-2xl rounded-3xl sm:px-16">
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
          <h3 class="text-lg text-gray-300">
            Rap Text - First Player:
          </h3>
          <p class="mt-4 text-lg text-gray-300">
            {{ rapTextFirstPlayer }}
          </p>
          <h3 class="mt-10 text-lg text-gray-300">
            Audio - First Player:
          </h3>
          <audio class="mt-4" controls :src="audioURLFirstPlayer">Your browser does not support the audio element.</audio>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { useGetBattleQuery } from '~~/graphql/generated/graphql'

const battleId = localStorage.getItem('battleId') as string
const { result, loading, error } = useGetBattleQuery({ id: battleId })

const rapTextFirstPlayer = ref('')
const audioURLFirstPlayer = ref('')

onMounted(() => {
  if (!loading.value && !error.value && result.value) {
    rapTextFirstPlayer.value = result.value.battle?.rapTextFirstPlayer || ''
    audioURLFirstPlayer.value = result.value.battle?.audioURLFirstPlayer || ''
  }
})
</script>
