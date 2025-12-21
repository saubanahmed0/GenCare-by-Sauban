import { useState } from 'react'
import { Calendar, Clock, User, Video, MapPin } from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Button } from '../components/ui/button'

export default function Appointments() {
  // Mock appointments data
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      doctorName: 'Dr. Ahmed Khan',
      specialty: 'Cardiology',
      date: '2025-01-15',
      time: '10:00 AM',
      type: 'physical',
      status: 'upcoming'
    },
    {
      id: 2,
      doctorName: 'Dr. Aisha Khan',
      specialty: 'Pediatrics',
      date: '2025-01-10',
      time: '2:30 PM',
      type: 'video',
      status: 'completed'
    }
  ])

  const handleCancel = (id: number) => {
    if (window.confirm('Are you sure you want to cancel this appointment?')) {
      setAppointments(appointments.filter(apt => apt.id !== id))
    }
  }

  return (
    <div className="min-h-screen">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">My Appointments</h1>

        <div className="space-y-4">
          {appointments.map(appointment => (
            <div
              key={appointment.id}
              className="bg-card border rounded-lg p-6 shadow-sm"
            >
              <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2">{appointment.doctorName}</h3>
                  <p className="text-muted-foreground mb-4">{appointment.specialty}</p>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4 text-primary" />
                      {appointment.date}
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="h-4 w-4 text-primary" />
                      {appointment.time}
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      {appointment.type === 'video' ? (
                        <Video className="h-4 w-4 text-primary" />
                      ) : (
                        <MapPin className="h-4 w-4 text-primary" />
                      )}
                      {appointment.type === 'video' ? 'Video Consultation' : 'Physical Visit'}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    appointment.status === 'upcoming' 
                      ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                      : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                  }`}>
                    {appointment.status === 'upcoming' ? 'Upcoming' : 'Completed'}
                  </span>
                  {appointment.status === 'upcoming' && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleCancel(appointment.id)}
                    >
                      Cancel
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}

          {appointments.length === 0 && (
            <div className="text-center py-12">
              <p className="text-xl text-muted-foreground mb-4">No appointments found</p>
              <Button onClick={() => window.location.href = '/find-doctors'}>
                Book an Appointment
              </Button>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  )
}

