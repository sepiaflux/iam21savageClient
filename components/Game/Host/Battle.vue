<!-- eslint-disable no-console -->
<template>
  <div v-if="loading">
    Lädt...
  </div>
  <div v-else>
    {{ activeParticipation?.participant.user.name }}
    <div class="flex">
      <PictureRound :loading="loading" :url="activeParticipation?.participant.user.avatar" />
    </div>
    <div class="flex">
      <video v-if="activeParticipation?.avatarVideoURL" :src="activeParticipation?.avatarVideoURL" autoplay />
    </div>
    <div @click="activeParticipation?.audioURL ? playSound(activeParticipation.audioURL) : undefined">
      {{ activeParticipation?.rapText }}
    </div>
    <div v-if="firstPerson" class="text-gray-600 mt-12" @click="firstPerson = false">
      Next Person in this battle
    </div>
    <div v-else class="text-gray-600 mt-12" @click="firstPerson = true">
      Previous Person in this battle
    </div>
    <div v-if="numberOfInactiveBattles && numberOfInactiveBattles > 0 && !firstPerson" class="text-gray-600" @click="activateNextBattle">
      next battle
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useBattleNextActiveMutation, useGameUserLinkBattlesByCodeQuery } from '~~/graphql/generated/graphql'

const { gameCode } = defineProps<{
              gameCode: string,
              }>()

const { result, loading: queryLoading } = useGameUserLinkBattlesByCodeQuery({ gameCode }, { pollInterval: 10000 })
const { mutate, loading: mutateLoading } = useBattleNextActiveMutation()
const loading = computed(() => queryLoading.value || mutateLoading.value)
const activeRound = computed(() => result.value?.gameUserLinkByCode?.game.gameRounds.find(x => x.active))
const activeBattle = computed(() => activeRound.value?.battles.find(x => x.active))
const firstPerson = ref(true)
const activeParticipation = computed(() => firstPerson.value ? activeBattle.value?.participations[0] : activeBattle.value?.participations[1])
const playingAudio = ref<HTMLAudioElement|undefined>()
const numberOfInactiveBattles = computed(() => activeRound.value?.battles.filter(x => !x.active).length)

function playSound (url: string) {
  if (playingAudio.value) {
    playingAudio.value.pause()
  }
  const audio = new Audio(url)
  playingAudio.value = audio
  audio.play()
  return audio
}

function handleAudioEnded () {
  if (firstPerson.value) {
    firstPerson.value = false
  } else if (numberOfInactiveBattles.value && numberOfInactiveBattles.value > 0) {
    activateNextBattle()
  }
}
onBeforeUnmount(() => {
  if (playingAudio.value) {
    playingAudio.value.pause()
  }
})

watch(activeBattle, (val, oldVal) => {
  if (val && oldVal && val.id !== oldVal.id) {
    firstPerson.value = true
  }
})
watch(activeParticipation, (val, oldVal) => {
  if (val && !oldVal && !playingAudio.value) {
    if (!val.audioURL) {
      alert('no audio url')
      return
    }
    const audio = playSound(val.audioURL)
    audio.onended = handleAudioEnded
  }
  if (val && oldVal && val.id !== oldVal.id) {
    if (!val.audioURL) {
      alert('no audio url')
      return
    }
    const audio = playSound(val.audioURL)
    audio.onended = handleAudioEnded
  }
}, { immediate: true })

function activateNextBattle () {
  if (activeBattle.value) {
    mutate(
      {
        input: {
          battleId: activeBattle.value.id
        }
      }
    ).then(() => {
      firstPerson.value = true
    })
      .catch((err) => {
        alert(err)
      })
  }
}

</script>
