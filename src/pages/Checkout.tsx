import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { CreditCard, Shield, CheckCircle } from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select'
import PaymentGatewayModal from '../components/PaymentGatewayModal'
import CongratulationsModal from '../components/CongratulationsModal'
import { HoverBorderGradient } from '../components/ui/hover-border-gradient'

export default function Checkout() {
  const location = useLocation()
  const navigate = useNavigate()
  const { doctor, date, time, type } = location.state || {}
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [showCongratulations, setShowCongratulations] = useState(false)

  if (!doctor) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <p className="text-xl">No booking information found</p>
          <Button onClick={() => navigate('/find-doctors')} className="mt-4">
            Find Doctors
          </Button>
        </div>
        <Footer />
      </div>
    )
  }

  const consultationFee = doctor.consultationFee
  const hospitalCharges = type === 'physical' ? doctor.hospitalCharges : 0
  const total = consultationFee + hospitalCharges

  const handlePaymentClick = () => {
    setShowPaymentModal(true)
  }

  const handlePaymentSuccess = () => {
    setShowPaymentModal(false)
    setShowCongratulations(true)
  }

  return (
    <div className="min-h-screen">
      <Header />
      
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Payment Form */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-card border rounded-lg p-6 shadow-sm">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <CreditCard className="h-6 w-6" />
                Payment Details
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Card Number</label>
                  <Input
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    maxLength={19}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Expiry Date</label>
                    <Input type="text" placeholder="MM/YY" maxLength={5} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">CVV</label>
                    <Input type="text" placeholder="123" maxLength={3} />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Cardholder Name</label>
                  <Input type="text" placeholder="John Doe" />
                </div>
              </div>
            </div>

            <div className="bg-card border rounded-lg p-6 shadow-sm">
              <h2 className="text-xl font-bold mb-4">Payment Method</h2>
              <Select defaultValue="razorpay">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="razorpay">Razorpay</SelectItem>
                  <SelectItem value="stripe">Stripe</SelectItem>
                  <SelectItem value="paypal">PayPal</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="bg-card border rounded-lg p-6 shadow-sm">
              <h2 className="text-xl font-bold mb-4">Insurance (Optional)</h2>
              <Input
                type="text"
                placeholder="Enter your insurance policy number"
              />
              <p className="text-xs text-muted-foreground mt-2">
                Check if your insurance covers this visit
              </p>
            </div>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            <div className="bg-card border rounded-lg p-6 shadow-sm sticky top-24">
              <h2 className="text-2xl font-bold mb-6">Booking Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div>
                  <p className="text-sm text-muted-foreground">Doctor</p>
                  <p className="font-semibold">{doctor.name}</p>
                  <p className="text-sm text-muted-foreground">{doctor.specialty}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Date & Time</p>
                  <p className="font-semibold">{date} at {time}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Type</p>
                  <p className="font-semibold">
                    {type === 'physical' ? 'Physical Visit' : 'Video Consultation'}
                  </p>
                </div>
                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Consultation Fee</span>
                    <span>₹{consultationFee}</span>
                  </div>
                  {hospitalCharges > 0 && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Hospital Charges</span>
                      <span>₹{hospitalCharges}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-lg font-bold pt-2 border-t">
                    <span>Total</span>
                    <span className="text-primary">₹{total}</span>
                  </div>
                </div>
              </div>

              <HoverBorderGradient
                containerClassName="rounded-lg w-full"
                as="button"
                className="w-full bg-primary text-primary-foreground flex items-center justify-center space-x-2 py-3"
                onClick={handlePaymentClick}
              >
                <Shield className="h-5 w-5" />
                <span>Pay Securely ₹{total}</span>
              </HoverBorderGradient>

              <div className="mt-4 p-4 bg-muted rounded-lg">
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                  <div className="text-xs text-muted-foreground">
                    <p className="font-semibold mb-1">Refund Policy</p>
                    <p>Full refund if cancelled 24+ hours before appointment. 50% refund if cancelled 12-24 hours before.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <PaymentGatewayModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        onSuccess={handlePaymentSuccess}
        total={total}
        doctorName={doctor.name}
      />

      <CongratulationsModal
        isOpen={showCongratulations}
        onClose={() => {
          setShowCongratulations(false)
          navigate('/confirmation', {
            state: { doctor, date, time, type, total }
          })
        }}
        doctorName={doctor.name}
        date={date}
        time={time}
      />

      <Footer />
    </div>
  )
}

