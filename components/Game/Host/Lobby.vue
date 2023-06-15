<!-- eslint-disable no-console -->
<template>
  <div>
    <div>HOST</div>
    <div>Code: {{ gameCode.toUpperCase() }}</div>
    <div>
      <label for="rounds" class="block text-sm font-medium leading-6 text-gray-900">number of rounds:</label>
      <div class="mt-2">
        <input id="rounds" v-model="numberOfRoundsInput" type="number" name="rounds" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
      </div>
    </div>
    <div v-if="players && players.filter(x => !x.isHost).length > 0">
      Spieler:
      <div v-for="player in players?.filter(x => !x.isHost)" :key="player.id">
        {{ player.user.name }}
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
import { useGameStartMutation, useGamePlayersQuery } from '~~/graphql/generated/graphql'

const { gameCode } = defineProps<{
              gameCode: string,
              }>()

const { result, loading: gameLoading } = useGamePlayersQuery({ gameCode }, { pollInterval: 1500 })
const { mutate: startGameMutate, loading: startGameLoading } = useGameStartMutation()
const loading = computed(() => gameLoading.value || startGameLoading.value)
const numberOfRoundsInput = ref(1)
function startGame () {
  startGameMutate(
    {
      input: {
        gameCode,
        numberOfRounds: numberOfRoundsInput.value
      }
    }
  )
    .catch((err) => {
      alert(err)
    })
}

const players = computed(() => result.value?.game?.gameUserLinks)
</script>
