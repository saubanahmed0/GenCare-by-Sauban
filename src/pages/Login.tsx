import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Mail, Lock, Phone } from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'

export default function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showOTP, setShowOTP] = useState(false)
  const [otp, setOtp] = useState('')

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate login - in real app, this would call an API
    if (email && password) {
      navigate('/appointments')
    }
  }

  const handleOTP = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate OTP verification
    if (otp.length === 6) {
      navigate('/appointments')
    }
  }

  return (
    <div className="min-h-screen">
      <Header />
      <div className="container mx-auto px-4 py-20 max-w-md">
        <div className="bg-card border rounded-lg p-8 shadow-sm">
          <h1 className="text-3xl font-bold mb-2">Login</h1>
          <p className="text-muted-foreground mb-8">
            Access your appointments and medical records
          </p>

          {!showOTP ? (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <Input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Password</label>
                <Input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full" size="lg">
                Login
              </Button>
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={() => setShowOTP(true)}
              >
                <Phone className="mr-2 h-4 w-4" />
                Login with OTP
              </Button>
            </form>
          ) : (
            <form onSubmit={handleOTP} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Enter OTP</label>
                <Input
                  type="text"
                  placeholder="000000"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  maxLength={6}
                  required
                />
                <p className="text-xs text-muted-foreground mt-2">
                  OTP sent to {email || 'your phone'}
                </p>
              </div>
              <Button type="submit" className="w-full" size="lg">
                Verify OTP
              </Button>
              <Button
                type="button"
                variant="ghost"
                className="w-full"
                onClick={() => setShowOTP(false)}
              >
                Back to Email Login
              </Button>
            </form>
          )}

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Don't have an account?{' '}
              <Link to="/signup" className="text-primary hover:underline">
                Sign up
              </Link>
            </p>
          </div>

          <div className="mt-6 p-4 bg-muted rounded-lg">
            <p className="text-xs text-muted-foreground">
              🔒 Your data is protected with HIPAA-compliant encryption. We never share your medical information.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

