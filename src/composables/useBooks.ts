import {
  collection,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  query,
  where,
  orderBy,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore"

import { db } from "../firebaseConfig"

type Book = {
  id: string
  title: string
  author: string
}

export function useBooks() {
  const colRef = collection(db, "books")

  const books = ref<Book[]>([])

  // filtering by title using a query
  const authorFilter = ref("")
  watchEffect(() => {
    let q
    if (authorFilter.value) {
      q = query(
        colRef,
        where("author", "==", authorFilter.value),
        orderBy("createdAt", "desc")
      )
    } else {
      q = query(colRef, orderBy("createdAt", "desc"))
    }

    // adding a listener on the books collection to update the
    // books array whenever the collection is changed
    onSnapshot(q, (snapshot) => {
      let newBooks: Book[] = []

      snapshot.docs.forEach((doc) => {
        newBooks.push({
          id: doc.id,
          ...(doc.data() as { title: string; author: string }),
        })
      })

      books.value = newBooks
    })
  })

  const addBook = (book: { title: string; author: string }) => {
    addDoc(colRef, { ...book, createdAt: serverTimestamp() })
  }

  const removeBook = (id: string) => {
    const docRef = doc(colRef, id)
    deleteDoc(docRef)
  }

  const editBook = (book: { id: string; title: string; author: string }) => {
    const docRef = doc(colRef, book.id)
    updateDoc(docRef, {
      title: book.title,
      author: book.author,
    })
  }

  return {
    books,
    authorFilter,
    addBook,
    removeBook,
    editBook,
  }
}
