import { useState, useEffect, useRef } from 'react'
import { searchBooks } from '../services/bookAPI'
import BookCard from '../components/BookCard'
import { motion } from 'framer-motion'

const API_KEY = "" // Replace with your actual key or import from env
const API_URL = "https://api.openai.com/v1/chat/completions"

export default function Search() {
  const [query, setQuery] = useState(() => localStorage.getItem('bookverse-query') || '')
  const [results, setResults] = useState([])
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const inputRef = useRef(null)
  const searchInputRef = useRef(null)

  useEffect(() => {
    if (query) {
      handleSearch()
    }
  }, [])

  const handleSearch = async () => {
    localStorage.setItem('bookverse-query', query)
    const books = await searchBooks(query)
    setResults(books || [])
  }

  const handleSend = async () => {
    if (!input.trim()) return
    const userMessage = { sender: 'user', text: input }
    setMessages((prev) => [...prev, userMessage])
    setInput('')

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            { role: 'system', content: 'You are a helpful assistant that summarizes and explains books. If someone tries to ask for something general like "a romance withh a philosphical twist, try giving the person more than just one suggestion."' },
            { role: 'user', content: input }
          ]
        })
      })

      const data = await response.json()
      const botReply = data.choices?.[0]?.message?.content || "Sorry, I didn't understand that."
      setMessages((prev) => [...prev, { sender: 'bot', text: botReply }])
    } catch (err) {
      console.error('[BookVerse] Chat error:', err)
      setMessages((prev) => [...prev, { sender: 'bot', text: "Something went wrong. Please try again later." }])
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleSearchKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleSearch()
    }
  }

  return (
    <motion.div
      className="p-6 pt-24 max-w-5xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mb-6 flex flex-col items-center">
        <input
          ref={searchInputRef}
          type="text"
          className="border p-2 rounded mb-2 w-full md:w-2/3 text-black"
          placeholder="Search for books..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleSearchKeyDown}
        />
        <button className="bg-blue-500 text-white px-4 py-2" onClick={handleSearch}>
          Search
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
        {results.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>

      <div className="mt-10 mx-auto w-full max-w-2xl border-t border-neutral-700 pt-6">
        <h2 className="text-xl font-semibold mb-2">📎 BookVerse Assistant</h2>
        <div className="bg-white rounded shadow p-4 text-black">
          <div className="h-48 overflow-y-auto border p-2 rounded mb-3 bg-neutral-100">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`mb-2 ${msg.sender === 'user' ? 'text-right' : 'text-left text-blue-600'}`}
              >
                <span className="inline-block px-2 py-1 rounded bg-gray-200">
                  {msg.text}
                </span>
              </div>
            ))}
          </div>
          <form className="flex gap-2" onSubmit={(e) => { e.preventDefault(); handleSend(); }}>
            <input
              ref={inputRef}
              type="text"
              className="flex-1 border px-3 py-2 rounded text-black"
              placeholder="Ask something about books..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </motion.div>
  )
}
