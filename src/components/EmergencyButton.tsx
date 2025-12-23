import { useState } from 'react'
import { Phone, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from './ui/button'

export default function EmergencyButton() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 h-16 w-16 rounded-full bg-red-600 text-white shadow-lg hover:bg-red-700 flex items-center justify-center"
        aria-label="Emergency Services"
      >
        <Phone className="h-6 w-6" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-background rounded-lg p-6 max-w-md w-full shadow-xl"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-red-600">Emergency Services</h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <div className="space-y-4">
                <a
                  href="tel:+91108"
                  className="flex items-center gap-3 p-4 rounded-lg bg-red-50 dark:bg-red-950 hover:bg-red-100 dark:hover:bg-red-900 transition-colors"
                >
                  <Phone className="h-6 w-6 text-red-600" />
                  <div>
                    <p className="font-semibold">Call Ambulance</p>
                    <p className="text-sm text-muted-foreground">108 Emergency</p>
                  </div>
                </a>
                <a
                  href="tel:+91102"
                  className="flex items-center gap-3 p-4 rounded-lg bg-blue-50 dark:bg-blue-950 hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors"
                >
                  <Phone className="h-6 w-6 text-blue-600" />
                  <div>
                    <p className="font-semibold">Police Emergency</p>
                    <p className="text-sm text-muted-foreground">102</p>
                  </div>
                </a>
                <div className="p-4 rounded-lg bg-muted">
                  <p className="font-semibold mb-2">GenCare Emergency</p>
                  <a href="tel:+919876543210" className="text-primary hover:underline">
                    +91 ***8890
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

