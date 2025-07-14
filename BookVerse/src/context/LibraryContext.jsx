// src/context/LibraryContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react'

const LibraryContext = createContext()

export function LibraryProvider({ children }) {
  const [library, setLibrary] = useState(() => {
    const stored = localStorage.getItem('bookverse-library')
    try {
      return stored ? JSON.parse(stored) : []
    } catch (e) {
      console.error('[BookVerse] Failed to parse localStorage:', e)
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem('bookverse-library', JSON.stringify(library))
  }, [library])

  const addBook = (book) => {
    const exists = library.some((b) => b.id === book.id)
    if (!exists) {
      const withFavorite = { ...book, favorite: false }
      setLibrary([...library, withFavorite])
    }
  }

  const removeBook = (id) => {
    setLibrary(library.filter((b) => b.id !== id))
  }

  const toggleFavorite = (id) => {
    setLibrary((prev) =>
      prev.map((b) =>
        b.id === id ? { ...b, favorite: !b.favorite } : b
      )
    )
  }

  return (
    <LibraryContext.Provider value={{ library, addBook, removeBook, toggleFavorite }}>
      {children}
    </LibraryContext.Provider>
  )
}

export const useLibrary = () => useContext(LibraryContext)
