//OpenAnimation.jsx
import { motion } from 'framer-motion'

export default function OpeningAnimation({ onFinish }) {
  return (
    <motion.div
      className="fixed inset-0 z-50 bg-black flex items-center justify-center text-white text-4xl font-bold"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 2, delay: 1 }}
      onAnimationComplete={onFinish}
    >
      BookVerse
    </motion.div>
  )
}
