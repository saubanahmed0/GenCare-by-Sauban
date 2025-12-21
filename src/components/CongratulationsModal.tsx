import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, Sparkles } from 'lucide-react'
import { Button } from './ui/button'
import { useNavigate } from 'react-router-dom'

interface CongratulationsModalProps {
  isOpen: boolean
  onClose: () => void
  doctorName: string
  date: string
  time: string
}

export default function CongratulationsModal({
  isOpen,
  onClose,
  doctorName,
  date,
  time
}: CongratulationsModalProps) {
  const navigate = useNavigate()

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0, y: 50 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-gradient-to-br from-primary/10 via-background to-background border-2 border-primary/20 rounded-2xl shadow-2xl max-w-md w-full p-8 relative overflow-hidden"
        >
          {/* Animated background sparkles */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                initial={{
                  x: Math.random() * 100 + '%',
                  y: Math.random() * 100 + '%',
                  opacity: 0,
                }}
                animate={{
                  y: [null, Math.random() * -100 - 50],
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              >
                <Sparkles className="h-4 w-4 text-primary/50" />
              </motion.div>
            ))}
          </div>

          <div className="relative z-10 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ 
                type: "spring", 
                stiffness: 200, 
                damping: 15,
                delay: 0.2 
              }}
            >
              <CheckCircle2 className="h-24 w-24 text-green-600 mx-auto mb-6" />
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-3xl font-bold mb-2 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent"
            >
              Congratulations!
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg text-muted-foreground mb-6"
            >
              Your appointment has been successfully booked
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-card/50 backdrop-blur-sm border border-primary/20 rounded-lg p-6 mb-6"
            >
              <div className="space-y-2 text-left">
                <div>
                  <p className="text-sm text-muted-foreground">Doctor</p>
                  <p className="font-semibold text-lg">{doctorName}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Date & Time</p>
                  <p className="font-semibold">{date} at {time}</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex gap-3"
            >
              <Button
                onClick={() => {
                  onClose()
                  navigate('/appointments')
                }}
                className="flex-1"
                size="lg"
              >
                View Appointments
              </Button>
              <Button
                onClick={() => {
                  onClose()
                  navigate('/')
                }}
                variant="outline"
                className="flex-1"
                size="lg"
              >
                Home
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

