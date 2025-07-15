//BookDetail.jsx
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getBookById } from '../services/bookAPI'

export default function BookDetail() {
  const { id } = useParams()
  const [book, setBook] = useState(null)

  useEffect(() => {
    getBookById(id).then(setBook)
  }, [id])

  if (!book) return <p className="p-6">Loading...</p>

  const info = book.volumeInfo

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-2">{info.title}</h2>
      <p className="text-gray-700 mb-4">By {info.authors?.join(', ')}</p>
      <img
        src={info.imageLinks?.thumbnail}
        alt={info.title}
        className="mb-4 shadow-md"
      />
      <div
        className="prose max-w-none mt-4"
        dangerouslySetInnerHTML={{ __html: info.description || '<em>No description available.</em>' }}
      />
    </div>
  )
}