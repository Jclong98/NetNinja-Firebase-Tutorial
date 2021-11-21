<script setup lang="ts">
const counter = ref(0)
</script>

<template>
  <button
    @click="counter++"
    class="
      px-4
      py-2
      bg-emerald-500
      text-emerald-50
      rounded-md
      shadow
      focus:(ring-3
      ring-amber-500
      )
      hover:bg-emerald-600
    "
  >
    You've clicked me {{ counter }} times!
  </button>
</template>
