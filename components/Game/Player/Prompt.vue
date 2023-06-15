<!-- eslint-disable no-console -->
<template>
  <div>
    <div v-if="loading">
      ...
    </div>
    <div v-else-if="activeParticipationDone">
      ...
    </div>
    <form
      v-else-if="activeParticipation && opponent"
      class="max-w-md"
      @submit.prevent="submitBattle"
    >
      <label for="attribute-input" class="block text-sm font-medium leading-6 text-gray-900">
        Du bist in einem Rap Battle gegen {{ opponent.name }}! <br>
        Vervollständige die Zeile: <br>
        {{ activeParticipation.openAIFirstPart }}
      </label>
      <div class="mt-1">
        <input
          id="attribute-input"
          v-model="textInput"
          required
          type="text"
          name="attribute-input"
          class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        >
      </div>
      <button
        type="submit"
        class="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
      >
        Absenden
      </button>
    </form>
    <div v-else>
      Ein unbekannter Fehler ist aufgetreten.
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useGameUserLinkBattleParticipationsByCodeQuery, useBattleSubmitMutation } from '~~/graphql/generated/graphql'

const { gameCode } = defineProps<{
                  gameCode: string,
                  }>()

const { result, loading: queryLoading } = useGameUserLinkBattleParticipationsByCodeQuery({ gameCode }, { pollInterval: 15000 })
const { mutate, loading: mutateLoading } = useBattleSubmitMutation({})
const loading = computed(() => queryLoading.value || mutateLoading.value)
const textInput = ref('')
const activeParticipation = computed(() => result.value?.gameUserLinkByCode?.battleParticipations?.find(x => x.battle.gameRound.active))
const opponent = computed(() => activeParticipation.value?.battle.participations.find(x => x.id !== activeParticipation.value?.id)?.participant.user)
const activeParticipationDone = computed(() => !!activeParticipation.value?.userMiddlePart)
function submitBattle () {
  if (!textInput.value) {
    alert('Bitte gib etwas ein!')
    return
  }
  if (activeParticipation.value) {
    mutate({
      input: {
        battleId: activeParticipation.value.battle.id,
        middlePart: textInput.value
      }
    })
      .catch((err) => {
        alert(err)
      }).then(() => {
        textInput.value = ''
      })
  }
}
</script>
