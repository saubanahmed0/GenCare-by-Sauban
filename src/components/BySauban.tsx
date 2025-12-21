import { motion } from 'framer-motion'

export default function BySauban() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1 }}
      className="fixed bottom-4 right-4 z-30 text-xs text-muted-foreground/60 font-medium pointer-events-none"
    >
      by sauban
    </motion.div>
  )
}

