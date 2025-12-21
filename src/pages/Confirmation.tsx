import { useLocation, useNavigate } from 'react-router-dom'
import { CheckCircle, Calendar, Download, Share2 } from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Button } from '../components/ui/button'

export default function Confirmation() {
  const location = useLocation()
  const navigate = useNavigate()
  const { doctor, date, time, type, total } = location.state || {}

  if (!doctor) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <p className="text-xl">No confirmation data found</p>
          <Button onClick={() => navigate('/')} className="mt-4">
            Go Home
          </Button>
        </div>
        <Footer />
      </div>
    )
  }

  const handleAddToCalendar = () => {
    const startDate = new Date(`${date}T${time}`)
    const endDate = new Date(startDate.getTime() + 30 * 60000) // 30 minutes
    
    const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=Appointment with ${doctor.name}&dates=${startDate.toISOString().replace(/[-:]/g, '').split('.')[0]}/${endDate.toISOString().replace(/[-:]/g, '').split('.')[0]}&details=Appointment with ${doctor.name} - ${doctor.specialty}`
    window.open(calendarUrl, '_blank')
  }

  return (
    <div className="min-h-screen">
      <Header />
      
      <div className="container mx-auto px-4 py-20 max-w-2xl">
        <div className="bg-card border rounded-lg p-8 shadow-sm text-center">
          <div className="mb-6">
            <CheckCircle className="h-20 w-20 text-green-600 mx-auto mb-4" />
            <h1 className="text-3xl font-bold mb-2">Appointment Confirmed!</h1>
            <p className="text-muted-foreground">
              Your appointment has been successfully booked
            </p>
          </div>

          <div className="bg-muted rounded-lg p-6 mb-6 text-left">
            <h2 className="text-xl font-bold mb-4">Appointment Details</h2>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-semibold">{doctor.name}</p>
                  <p className="text-sm text-muted-foreground">{doctor.specialty}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-semibold">{date}</p>
                  <p className="text-sm text-muted-foreground">{time}</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Type</p>
                <p className="font-semibold">
                  {type === 'physical' ? 'Physical Visit' : 'Video Consultation'}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Paid</p>
                <p className="text-2xl font-bold text-primary">₹{total}</p>
              </div>
            </div>
          </div>

          <div className="space-y-3 mb-6">
            <Button onClick={handleAddToCalendar} className="w-full" variant="outline">
              <Calendar className="mr-2 h-4 w-4" />
              Add to Google Calendar
            </Button>
            <Button onClick={() => window.print()} className="w-full" variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Download Receipt
            </Button>
          </div>

          <div className="bg-blue-50 dark:bg-blue-950 rounded-lg p-4 mb-6">
            <p className="text-sm text-blue-900 dark:text-blue-100">
              <strong>Reminder:</strong> You will receive SMS and WhatsApp reminders 24 hours and 2 hours before your appointment.
            </p>
          </div>

          <div className="bg-muted rounded-lg p-4 mb-6">
            <h3 className="font-semibold mb-2">Important Instructions</h3>
            <ul className="text-sm text-muted-foreground space-y-1 text-left">
              <li>• Please arrive 15 minutes before your appointment time</li>
              <li>• Bring a valid ID and any previous medical records</li>
              {type === 'video' && (
                <li>• Ensure you have a stable internet connection for video consultation</li>
              )}
              <li>• You can cancel or reschedule up to 24 hours before the appointment</li>
            </ul>
          </div>

          <div className="flex gap-4">
            <Button onClick={() => navigate('/appointments')} className="flex-1">
              View My Appointments
            </Button>
            <Button onClick={() => navigate('/')} variant="outline" className="flex-1">
              Book Another Appointment
            </Button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

