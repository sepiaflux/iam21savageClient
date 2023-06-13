<!-- eslint-disable no-console -->
<template>
  <div>
    <div v-if="loading">
      ...
    </div>
    <div v-else-if="attributes && currentAttributeIndex >= attributes?.length">
      Warte auf die anderen Spieler...
    </div>
    <form
      v-else-if="currentAttribute"
      class="max-w-md"
      @submit.prevent="submitAttribute"
    >
      <label for="attribute-input" class="block text-sm font-medium leading-6 text-gray-900">
        Schreibe etwas über {{ currentAttribute.target.user.name }}
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
  </div>
</template>

<script lang="ts" setup>
import { useGameUserLinkAttributesByCodeQuery, useGivenAttributeSubmitMutation } from '~~/graphql/generated/graphql'

const { gameCode } = defineProps<{
                  gameCode: string,
                  }>()

const { result, loading: queryLoading } = useGameUserLinkAttributesByCodeQuery({ gameCode }, { pollInterval: 1500 })
const { mutate, loading: mutateLoading } = useGivenAttributeSubmitMutation({})
const loading = computed(() => queryLoading.value || mutateLoading.value)
const currentAttributeIndex = ref(0)
const textInput = ref('')
const attributes = computed(() => result.value?.gameUserLinkByCode?.givenAttributesAuthored.filter(x => !x.attribute))
const currentAttribute = computed(() => attributes.value?.[currentAttributeIndex.value])
function submitAttribute () {
  if (!textInput.value) {
    alert('Bitte gib etwas ein!')
    return
  }
  if (currentAttribute.value) {
    mutate({
      input: {
        givenAttributeId: currentAttribute.value.id,
        attribute: textInput.value
      }
    })
      .catch((err) => {
        alert(err)
      }).then(() => {
        currentAttributeIndex.value++
        textInput.value = ''
      })
  }
}
</script>
