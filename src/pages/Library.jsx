//Library.jsx
import { useLibrary } from '../context/LibraryContext'

export default function Library() {
  const { library, removeBook, toggleFavorite } = useLibrary()

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">📖 My Library</h2>

      {library.length === 0 ? (
        <p className="text-gray-600">Your library is empty. Go search and add some books!</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {library.map((book) => (
            <div key={book.id} className="p-4 border rounded shadow-sm bg-white transform transition-transform hover:-translate-y-1 hover:shadow-lg">
              <h3 className="text-lg font-semibold">{book.volumeInfo.title}</h3>
              <p className="text-sm text-gray-600">
                {book.volumeInfo.authors?.join(', ') || 'Unknown Author'}
              </p>
              <img
                src={book.volumeInfo.imageLinks?.thumbnail}
                alt={book.volumeInfo.title}
                className="my-2"
              />
              {book.volumeInfo.description && (
                <p className="text-gray-700 text-sm mt-2 max-h-24 overflow-y-auto">
                  {book.volumeInfo.description}
                </p>
              )}
              <div className="flex justify-between items-center mt-2">
                <button
                  className="bg-red-600 text-white px-3 py-1 rounded"
                  onClick={() => removeBook(book.id)}
                >
                  Remove
                </button>
                <span
                  onClick={() => toggleFavorite(book.id)}
                  className={`text-2xl cursor-pointer transition-transform ${
                    book.favorite ? 'text-yellow-400 scale-125' : 'text-gray-400 hover:text-yellow-300'
                  }`}
                >
                  ★
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
