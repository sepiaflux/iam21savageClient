<!-- eslint-disable no-console -->
<template>
  <div>
    <LoadingPinger v-if="loading || gameError || viewerError" />
    <GameHost v-else-if="isHost" :game-code="gameCode" />
    <GamePlayer v-else :game-code="gameCode" />
  </div>
</template>

<script lang="ts" setup>
import { useGetGameQuery, useGetViewerQuery } from '~~/graphql/generated/graphql'

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

const { result: gameResult, loading: gameLoading, error: gameError } = useGetGameQuery({ gameCode })
const { result: viewerResult, loading: viewerLoading, error: viewerError } = useGetViewerQuery()

const viewer = computed(() => viewerResult.value?.viewer)
const isHost = computed(() => gameResult.value?.game?.gameUserLink.find(x => x.user.id === viewer.value?.id)?.isHost || false)

watch(gameError, (val) => {
  if (val) {
    // TODO: Popup that handles error
    localStorage.removeItem('gameCode')
    alert(val)
    navigateTo({ name: 'index' })
  }
})
watch(viewerError, (val) => {
  if (val) {
    // TODO: Handle viewer error
    localStorage.removeItem('gameCode')
    alert(val)
    navigateTo({ name: 'index' })
  }
})
const loading = computed(() => gameLoading.value || viewerLoading.value)

</script>
