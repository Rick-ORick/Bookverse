// --- src/components/BookCard.jsx ---
import { Link } from 'react-router-dom'
import { useLibrary } from '../context/LibraryContext'

export default function BookCard({ book }) {
  const { addBook, library, toggleFavorite } = useLibrary()
  const info = book.volumeInfo

  const isInLibrary = library.some((b) => b.id === book.id)
  const isFavorite = library.find((b) => b.id === book.id)?.favorite

  return (
    <div className="p-4 border rounded shadow-md bg-white flex flex-col justify-between h-full">
      <div>
        <h3 className="text-xl font-bold mb-1">{info.title}</h3>
        <p className="text-sm text-gray-600 mb-2">
          {info.authors?.join(', ') || 'Unknown Author'}
        </p>
        {info.imageLinks?.thumbnail && (
          <img
            src={info.imageLinks.thumbnail}
            alt={info.title}
            className="w-32 h-auto mb-3"
          />
        )}
      </div>

      <div className="flex justify-between items-center mt-2">
        <button
          className={`px-3 py-1 rounded ${
            isInLibrary ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
          } text-white`}
          onClick={() => {
            if (!isInLibrary) {
              addBook(book)
            }
          }}
          disabled={isInLibrary}
        >
          {isInLibrary ? 'In Library' : 'Add to Library'}
        </button>

        <Link
          to={`/book/${book.id}`}
          className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded"
        >
          Details
        </Link>

        {isInLibrary && (
          <span
            onClick={() => toggleFavorite(book.id)}
            className={`text-2xl cursor-pointer transition-transform ${
              isFavorite ? 'text-yellow-400 scale-125' : 'text-gray-400 hover:text-yellow-300'
            }`}
          >
            ★
          </span>
        )}
      </div>
    </div>
  )
}
