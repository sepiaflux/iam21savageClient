<template>
  <div class="flex justify-center items-center h-screen">
    <slot />
  </div>
</template>

<script setup lang="ts">
useHead({
  bodyAttrs: {
    class: 'h-full'
  },
  htmlAttrs: {
    class: 'h-full'
  }
})
</script>
