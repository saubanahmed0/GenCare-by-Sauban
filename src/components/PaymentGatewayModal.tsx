import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, CreditCard, Loader2, CheckCircle2 } from 'lucide-react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { HoverBorderGradient } from './ui/hover-border-gradient'

interface PaymentGatewayModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
  total: number
  doctorName: string
}

export default function PaymentGatewayModal({
  isOpen,
  onClose,
  onSuccess,
  total,
  doctorName
}: PaymentGatewayModalProps) {
  const [step, setStep] = useState<'payment' | 'processing' | 'success'>('payment')
  const [paymentMethod, setPaymentMethod] = useState('razorpay')
  const [cardNumber, setCardNumber] = useState('')
  const [expiry, setExpiry] = useState('')
  const [cvv, setCvv] = useState('')
  const [cardName, setCardName] = useState('')

  const handlePayment = () => {
    setStep('processing')
    // Simulate payment processing
    setTimeout(() => {
      setStep('success')
      setTimeout(() => {
        onSuccess()
      }, 2000)
    }, 2000)
  }

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    const matches = v.match(/\d{4,16}/g)
    const match = (matches && matches[0]) || ''
    const parts = []
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }
    if (parts.length) {
      return parts.join(' ')
    } else {
      return v
    }
  }

  const formatExpiry = (value: string) => {
    const v = value.replace(/\D/g, '')
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4)
    }
    return v
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-background rounded-lg shadow-xl max-w-md w-full p-6 relative"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
          >
            <X className="h-5 w-5" />
          </button>

          {step === 'payment' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-2">Payment Gateway</h2>
                <p className="text-muted-foreground">Complete your payment securely</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Payment Method</label>
                  <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="razorpay">Razorpay</SelectItem>
                      <SelectItem value="stripe">Stripe</SelectItem>
                      <SelectItem value="paypal">PayPal</SelectItem>
                      <SelectItem value="upi">UPI</SelectItem>
                      <SelectItem value="netbanking">Net Banking</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {paymentMethod === 'razorpay' || paymentMethod === 'stripe' ? (
                  <>
                    <div>
                      <label className="block text-sm font-medium mb-2">Card Number</label>
                      <Input
                        type="text"
                        placeholder="1234 5678 9012 3456"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                        maxLength={19}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Expiry</label>
                        <Input
                          type="text"
                          placeholder="MM/YY"
                          value={expiry}
                          onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                          maxLength={5}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">CVV</label>
                        <Input
                          type="text"
                          placeholder="123"
                          value={cvv}
                          onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').slice(0, 3))}
                          maxLength={3}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Cardholder Name</label>
                      <Input
                        type="text"
                        placeholder="John Doe"
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value)}
                      />
                    </div>
                  </>
                ) : paymentMethod === 'upi' ? (
                  <div>
                    <label className="block text-sm font-medium mb-2">UPI ID</label>
                    <Input type="text" placeholder="yourname@upi" />
                  </div>
                ) : (
                  <div>
                    <label className="block text-sm font-medium mb-2">Select Bank</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose your bank" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sbi">State Bank of India</SelectItem>
                        <SelectItem value="hdfc">HDFC Bank</SelectItem>
                        <SelectItem value="icici">ICICI Bank</SelectItem>
                        <SelectItem value="axis">Axis Bank</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}

                <div className="bg-muted p-4 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">Total Amount</span>
                    <span className="text-2xl font-bold text-primary">₹{total}</span>
                  </div>
                </div>
              </div>

              <HoverBorderGradient
                containerClassName="rounded-lg"
                as="button"
                className="w-full bg-primary text-primary-foreground flex items-center justify-center space-x-2 py-3"
                onClick={handlePayment}
              >
                <CreditCard className="h-5 w-5" />
                <span>Pay ₹{total}</span>
              </HoverBorderGradient>
            </div>
          )}

          {step === 'processing' && (
            <div className="text-center py-12">
              <Loader2 className="h-16 w-16 animate-spin text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Processing Payment</h3>
              <p className="text-muted-foreground">Please wait while we process your payment...</p>
            </div>
          )}

          {step === 'success' && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center py-12"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
              >
                <CheckCircle2 className="h-20 w-20 text-green-600 mx-auto mb-4" />
              </motion.div>
              <h3 className="text-2xl font-bold mb-2">Payment Successful!</h3>
              <p className="text-muted-foreground mb-4">
                Your appointment with {doctorName} has been confirmed.
              </p>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

