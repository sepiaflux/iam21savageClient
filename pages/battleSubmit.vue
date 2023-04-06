<template>
  <div class="bg-white">
    <div class="mx-auto max-w-7xl px-3 sm:px-6 py-3 lg:px-8 h-screen">
      <div class="h-full relative isolate overflow-hidden bg-gray-900 px-6 py-24 text-center shadow-2xl rounded-3xl sm:px-16">
        <h2 class="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Submit Your Battle
        </h2>
        <form class="mt-6 grid grid-cols-1 gap-y-6" @submit.prevent="submitBattle">
          <div>
            <label for="attribute1" class="block text-sm font-medium text-gray-300">Attribute 1</label>
            <div class="mt-1">
              <input
                id="attribute1"
                v-model="attribute1"
                required
                type="text"
                class="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
              >
            </div>
          </div>
          <div>
            <label for="attribute2" class="block text-sm font-medium text-gray-300">Attribute 2</label>
            <div class="mt-1">
              <input
                id="attribute2"
                v-model="attribute2"
                required
                type="text"
                class="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
              >
            </div>
          </div>
          <div>
            <label for="attribute3" class="block text-sm font-medium text-gray-300">Attribute 3</label>
            <div class="mt-1">
              <input
                id="attribute3"
                v-model="attribute3"
                required
                type="text"
                class="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
              >
            </div>
          </div>
          <div>
            <label for="deviceId" class="block text-sm font-medium text-gray-300">Device Id</label>
            <div class="mt-1">
              <input
                id="deviceId"
                v-model="deviceId"
                required
                type="text"
                class="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
              >
            </div>
          </div>
          <button
            type="submit"
            class="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Submit Battle
          </button>
        </form>
        <h3 class="mx-auto mt-10 max-w-xl text-lg leading-8 text-gray-300">
          Users in the game:
        </h3>
        <ul class="mx-auto mt-4 max-w-xl text-lg leading-8 text-gray-300">
          <li v-for="user in users" :key="user.id">
            {{ user.name }} - {{ user.deviceId }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { User as UserType, useBattleSubmitMutation, useGetGameQuery } from '~~/graphql/generated/graphql'

const attribute1 = ref('')
const attribute2 = ref('')
const attribute3 = ref('')
const deviceId = ref('')

const gameId = localStorage.getItem('gameId') as string
const { result, loading, error } = useGetGameQuery({ gameId })

type User = Omit<UserType, 'game'>
const users = ref<User[]>([])

watch(result, (newValue) => {
  if (newValue && newValue.game) {
    users.value = newValue.game.users || []
  }
}, { immediate: true })

const battleId = localStorage.getItem('battleId') as string
const { mutate: submitBattleMutation } = useBattleSubmitMutation()

async function submitBattle () {
  try {
    const battle = await submitBattleMutation({
      input: {
        battleId,
        attribute1: attribute1.value,
        attribute2: attribute2.value,
        attribute3: attribute3.value,
        deviceId: deviceId.value
      }
    })

    if (battle?.data && battle.data.battleSubmit) {
      navigateTo('/battleView')
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error submitting battle:', error)
  }
}
</script>
