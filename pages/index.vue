<template>
  <LoadingPinger v-if="loading" />
  <div v-else-if="currentState == State.Home">
    <div @click="currentState = State.Joining">
      Beitreten
    </div>
    <div @click="createGame">
      Erstellen
    </div>
  </div>
  <div v-else-if="currentState === State.Joining">
    <form class="place-items-center gap-6 grid grid-cols-1" @submit.prevent="joinGame">
      <div class="max-w-md">
        <label for="first-name" class="block text-sm font-medium leading-6 text-gray-900">Benutzername</label>
        <div class="mt-1">
          <input
            id="first-name"
            v-model="usernameInput"
            required
            type="text"
            name="first-name"
            autocomplete="given-name"
            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          >
        </div>
      </div>
      <div class="max-w-md">
        <label for="code" class="block text-sm font-medium leading-6 text-gray-900">Code</label>
        <div class="mt-1">
          <input
            id="code"
            v-model="codeInput"
            required
            type="text"
            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          >
        </div>
      </div>
      <button
        type="submit"
        class="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
      >
        RAUM BEITRETEN
      </button>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { useGameCreateMutation, useGameJoinMutation } from '~~/graphql/generated/graphql'

enum State {
    Home,
    Joining
}
const currentState = ref(State.Home)
const storedGameCode = localStorage.getItem('gameCode')
if (storedGameCode) {
  navigateTo({ name: 'game-gameCode', params: { gameCode: storedGameCode } })
}

const usernameInput = ref('')
const codeInput = ref('')

const { mutate: createMutate, loading: createLoading } = useGameCreateMutation()
const { mutate: joinMutate, loading: joinLoading } = useGameJoinMutation()

const loading = computed(() => createLoading.value || joinLoading.value)

function createGame () {
  createMutate({
    input: {
      numberOfRounds: 1
    }
  })
    .then((res) => {
      const viewerId = res?.data?.gameCreate?.user.id
      if (!viewerId) {
        alert('ViewerId could not be found.')
        return
      }
      localStorage.setItem('viewerId', viewerId)
      const gameCode = res?.data?.gameCreate?.user.game.gameCode
      if (gameCode) {
        navigateTo({ name: 'game-gameCode', params: { gameCode } })
      } else {
        alert('GameCode could not be found.')
      }
    })
    .catch((err) => {
      alert(err)
    })
}

function joinGame () {
  joinMutate({
    input: {
      gameCode: codeInput.value,
      user: {
        name: usernameInput.value
      }
    }
  }).then((res) => {
    const viewerId = res?.data?.gameJoin?.user.id
    if (!viewerId) {
      alert('ViewerId could not be found.')
      return
    }
    localStorage.setItem('viewerId', viewerId)
    const gameCode = res?.data?.gameJoin?.user.game.gameCode
    if (gameCode) {
      navigateTo({ name: 'game-gameCode', params: { gameCode } })
    } else {
      alert('GameCode could not be found.')
    }
  })
    .catch((err) => {
      alert(err)
    })
}

</script>
