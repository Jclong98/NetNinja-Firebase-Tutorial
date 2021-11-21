<script setup lang="ts">
import AddBookForm from "~/components/AddBookForm.vue"
import Book from "~/components/Book.vue"
import { useBooks } from "~/composables/useBooks"

const { books, addBook, removeBook, authorFilter, editBook } = useBooks()
</script>

<template>
  <nav class="bg-amber-500 text-amber-50">
    <div class="max-w-prose mx-auto p-4">
      <p class="text-xl">NetNinja Firebase Tutorial</p>
    </div>
  </nav>
  <main class="p-4 max-w-prose mx-auto">
    <h1 class="text-3xl mb-3">Add A Book:</h1>

    <AddBookForm class="mb-5" @submit="addBook($event)" />

    <h2 class="mt-5 flex justify-between items-end">
      <span class="text-2xl">Books</span>
      <label>
        <p>Author Filter</p>
        <input
          type="text"
          v-model="authorFilter"
          placeholder="author"
          class="border p-2 border-2 focus:border-amber-500 rounded-lg"
        />
      </label>
    </h2>

    <Book
      v-for="book in books"
      :key="book.id"
      :value="book"
      @remove="removeBook($event)"
      @update="editBook($event)"
    >
    </Book>
  </main>
</template>

<style>
#app {
  @apply "bg-orange-50 min-h-100vh";
}
</style>
