<template>
  <div class="bg-white">
    <div class="mx-auto max-w-7xl px-3 sm:px-6 py-3 lg:px-8 h-screen">
      <div
        class="h-full relative isolate overflow-hidden bg-gray-900 px-6 py-24 text-center shadow-2xl rounded-3xl sm:px-16"
      >
        <h2 class="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Spiel mit uns unser Spiel.
        </h2>
        <p class="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-300">
          Unser Spiel macht VIEL Spaß.
        </p>
        <div class="mt-4 place-items-center gap-4 grid grid-cols-1">
          <NuxtLink
            to="/createGame"
            class="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            RAUM ERSTELLEN
          </NuxtLink>
          <NuxtLink
            to="/joinGame"
            class="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            RAUM BEITRETEN
          </NuxtLink>
        </div>
        <svg
          viewBox="0 0 1024 1024"
          class="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-x-1/2 [mask-image:radial-gradient(closest-side,white,transparent)]"
          aria-hidden="true"
        >
          <circle cx="512" cy="512" r="512" fill="url(#827591b1-ce8c-4110-b064-7cb85a0b1217)" fill-opacity="0.7" />
          <defs>
            <radialGradient id="827591b1-ce8c-4110-b064-7cb85a0b1217">
              <stop stop-color="#7775D6" />
              <stop offset="1" stop-color="#E935C1" />
            </radialGradient>
          </defs>
        </svg>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useGetGameLazyQuery, useGetViewerQuery } from '~~/graphql/generated/graphql'

resetState()

// get viewer and check if exist in DB
const viewerId = useViewerId()

const chosenGameCode = useGameCode()
const chosenGameOptions = ref({
  gameCode: chosenGameCode.value || 'placeholder'
})
const { result: chosenGameResult, load: loadChosenGame } = useGetGameLazyQuery(chosenGameOptions)
if (chosenGameCode.value) {
  chosenGameOptions.value.gameCode = chosenGameCode.value
  loadChosenGame()
}

watch(chosenGameCode, (val) => {
  if (val !== undefined) {
    chosenGameOptions.value.gameCode = val
    loadChosenGame()
  }
})

const { error } = useGetViewerQuery()

watch(error, () => {
  if (error) {
    localStorage.removeItem('viewerId')
    navigateTo({ name: 'register' })
  }
})
const _chosenGame = computed(() => chosenGameResult.value?.game || undefined)

</script>
