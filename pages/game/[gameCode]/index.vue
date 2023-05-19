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
const viewerId = localStorage.getItem('viewerId')
if (!viewerId) {
  localStorage.removeItem('gameCode')
  navigateTo({ name: 'index' })
}

const { loading: gameLoading, error: gameError } = useGetGameQuery({ gameCode })
const { result: viewerResult, loading: viewerLoading, error: viewerError } = useGetViewerQuery()

const isHost = computed(() => viewerResult.value?.viewer?.isHost)

watch(gameError, (val) => {
  if (val) {
    // TODO: Popup that handles error
    localStorage.removeItem('gameCode')
    navigateTo({ name: 'index' })
  }
})
watch(viewerError, (val) => {
  if (val) {
    // TODO: Handle viewer error
    localStorage.removeItem('gameCode')
    alert(val)
  }
})
const loading = computed(() => gameLoading.value || viewerLoading.value)

</script>
