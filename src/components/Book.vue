<template>
  <div class="border-2 my-3 p-4 bg-white rounded-lg flex justify-between">
    <div>
      <h3 class="text-xl flex justify-between">
        <input
          v-if="editing"
          class="border border-gray-600 py-1 px-3 my-1 rounded"
          type="text"
          v-model="newTitle"
        />
        <span v-else>{{ value.title }}</span>
      </h3>
      <p>
        <span class="opacity-60">Author:</span>&nbsp;
        <input
          v-if="editing"
          class="border border-gray-600 py-1 px-3 my-1 rounded"
          type="text"
          v-model="newAuthor"
        />
        <span v-else class="italic opacity-60">{{ value.author }}</span>
      </p>
    </div>
    <div class="flex flex-col gap-2 items-end">
      <button
        class="
          border
          text-gray-600
          grid
          items-center
          hover:(border-red-500
          text-red-500) text-sm
          w-6
          h-6
          rounded-full
        "
        @click="remove()"
        :title="`Remove ${value.title}`"
      >
        &times;
      </button>
      <span>
        <small class="opacity-70" v-if="editing">Editing...</small>&nbsp;
        <button
          class="border hover:border-blue-500 text-sm w-6 h-6 rounded-full"
          @click="editing = !editing"
          :title="!editing ? `Edit ${value.title}` : 'Save'"
        >
          ✏️
        </button>
      </span>
    </div>
  </div>
</template>
<script setup lang="ts">
type Book = {
  id: string
  title: string
  author: string
}

const props = defineProps<{ value: Book }>()

const emit = defineEmits<{
  (e: "remove", id: string): void
  (e: "update", book: Book): void
}>()

const remove = () => {
  emit("remove", props.value.id)
}

const editing = ref(false)

const newTitle = ref(props.value.title)
const newAuthor = ref(props.value.author)

watch(editing, (value) => {
  if (!value) {
    emit("update", {
      id: props.value.id,
      title: newTitle.value,
      author: newAuthor.value,
    })
  }
})
</script>
