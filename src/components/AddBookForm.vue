<script setup lang="ts">
const title = ref("")
const author = ref("")
const isDisabled = computed(() => !title.value || !author.value)

const emit = defineEmits(["submit"])

const submit = () => {
  emit("submit", { title: title.value, author: author.value })
  title.value = ""
  author.value = ""
}
</script>

<template>
  <form @submit.prevent="submit()">
    <div class="grid gap-2">
      <input
        class="w-full p-2 border-2 focus:border-amber-500 rounded-lg"
        type="text"
        placeholder="Title"
        v-model="title"
      />

      <input
        class="w-full p-2 border-2 focus:border-amber-500 rounded-lg"
        type="text"
        placeholder="Author"
        v-model="author"
      />

      <button
        class="
          w-full
          p-2
          bg-amber-500
          text-amber-50
          hover:bg-amber-600
          focus:(ring-2
          ring-offset-2 ring-amber-500)
          disabled:(bg-gray-400
          hover:bg-gray-400
          cursor-default)
          rounded-lg
        "
        type="submit"
        :disabled="isDisabled"
      >
        Add Book
      </button>
    </div>
  </form>
</template>
