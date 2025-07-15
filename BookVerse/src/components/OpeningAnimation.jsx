import { motion } from 'framer-motion'
import './OpeningAnimation.css'

export default function OpeningAnimation({ onFinish }) {
  return (
    <motion.div
      className="fixed inset-0 z-50 bg-black flex items-center justify-center text-yellow-400 text-4xl font-bold overflow-hidden"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 2, delay: 1 }}
      onAnimationComplete={onFinish}
    >
      <div className="glare" />
      <div className="relative z-10">📚 BookVerse</div>
    </motion.div>
  )
}
