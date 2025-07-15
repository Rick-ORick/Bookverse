import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './OpeningAnimation.css'

export default function Home() {
  const [showOpening, setShowOpening] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setShowOpening(false), 3000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <AnimatePresence>
        {showOpening && <OpeningAnimation onFinish={() => setShowOpening(false)} />}
      </AnimatePresence>

      {!showOpening && (
        <motion.div
          className="p-6 pt-24 max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold mb-2">📚 Welcome to BookVerse</h1>
          <p className="mt-2 text-neutral-300">
            Discover, save, and manage your favorite books.
          </p>

          <div className="mt-12 border-t border-neutral-700 pt-8">
            <h2 className="text-2xl font-semibold mb-2">About BookVerse</h2>
            <p className="text-neutral-400">
              This is an interactive, AI-assisted virtual book library made with heavy use of the React Framework. <br />
              For more information, visit my{' '}
              <a
                href="https://portfolio-git-main-ricks-projects-08c86335.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-yellow-400 hover:text-yellow-300 underline"
              >
                portfolio
              </a>.
            </p>
          </div>
        </motion.div>
      )}
    </>
  )
}

function OpeningAnimation({ onFinish }) {
  return (
    <motion.div
      className="opening-overlay"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 2, delay: 1 }}
      onAnimationComplete={onFinish}
    >
      <div className="glare"></div>
      <div className="opening-text">BookVerse</div>
    </motion.div>
  )
}
