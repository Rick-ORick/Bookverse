// src/services/bookAPI.js
import axios from 'axios'

const API_URL = 'https://www.googleapis.com/books/v1/volumes?q='

// Search for books by query (title, author, etc.)
export const searchBooks = async (query) => {
  const res = await axios.get(`${API_URL}${encodeURIComponent(query)}`)
  return res.data.items || []
}

// Get detailed info about a single book by ID
export const getBookById = async (id) => {
  const res = await axios.get(`https://www.googleapis.com/books/v1/volumes/${id}`)
  return res.data
}
