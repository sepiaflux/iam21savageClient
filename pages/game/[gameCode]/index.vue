<!-- eslint-disable no-console -->
<template>
  <div>
    <LoadingPinger v-if="loading || gameUserLinkError" />
    <GameHost v-else-if="isHost" :game-code="gameCode" />
    <GamePlayer v-else :game-code="gameCode" />
  </div>
</template>

<script lang="ts" setup>
import { useGameUserLinkInfoByCodeQuery } from '~~/graphql/generated/graphql'

const route = useRoute()
const gameCode = route.params.gameCode as string
if (!gameCode || gameCode.length !== 4) {
  localStorage.removeItem('gameCode')
  navigateTo({ name: 'index' })
}
localStorage.setItem('gameCode', gameCode)
const token = localStorage.getItem('userToken')
if (!token) {
  localStorage.removeItem('gameCode')
  navigateTo({ name: 'index' })
}

const { result: gameUserLinkResult, loading: gameUserLinkLoading, error: gameUserLinkError } = useGameUserLinkInfoByCodeQuery({ gameCode })

const gameUserLink = computed(() => gameUserLinkResult.value?.gameUserLinkByCode)
const isHost = computed(() => gameUserLink.value?.isHost)

watch(gameUserLinkError, (val) => {
  if (val) {
    // TODO: Popup that handles error
    localStorage.removeItem('gameCode')
    alert(val)
    navigateTo({ name: 'index' })
  }
})

const loading = computed(() => gameUserLinkLoading.value)

</script>
