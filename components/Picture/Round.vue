<template>
  <div v-if="loading" class="h-32 w-32 flex items-center rounded-full ring-4 ring-white bg-white sm:h-40 sm:w-40">
    <div class="h-full w-full bg-slate-200 animate-pulse rounded-full" />
  </div>
  <img v-else-if="url" class="h-32 w-32 bg-slate-200 object-cover rounded-full ring-4 ring-white sm:h-40 sm:w-40" :src="url" alt="">
  <div v-else class="h-32 w-32 flex items-center rounded-full ring-4 ring-white bg-white sm:h-40 sm:w-40">
    <div class="h-full w-full bg-slate-200 rounded-full flex items-center">
      <component :is="icon" v-if="icon" class="h-16 w-16 sm:h-20 sm:w-20 mx-auto text-slate-400" />
      <UserIcon v-else class="h-16 w-16 sm:h-20 sm:w-20 mx-auto text-slate-400" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { UserIcon } from '@heroicons/vue/24/outline'
import { FunctionalComponent, HTMLAttributes, VNodeProps } from 'vue'

defineProps<{
      loading?: boolean,
      url?: string|null,
      icon?: FunctionalComponent<HTMLAttributes & VNodeProps, {}>
    }>()
</script>
