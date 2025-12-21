import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Star, MapPin, Phone, Mail, Calendar, Video, User, Award } from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { doctors } from '../data/doctors'
import { Button } from '../components/ui/button'
import { FullScreenCalendar } from '../components/ui/fullscreen-calendar'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select'
import { Input } from '../components/ui/input'
import { AnimatedTooltip } from '../components/ui/animated-tooltip'
import { HoverBorderGradient } from '../components/ui/hover-border-gradient'
import { format } from 'date-fns'

export default function DoctorProfile() {
  const { id } = useParams()
  const navigate = useNavigate()
  const doctor = doctors.find(d => d.id === parseInt(id || '0'))

  const [selectedDate, setSelectedDate] = useState<string>('')
  const [selectedTime, setSelectedTime] = useState('')
  const [appointmentType, setAppointmentType] = useState<'physical' | 'video'>('physical')

  if (!doctor) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <p className="text-xl">Doctor not found</p>
          <Button onClick={() => navigate('/find-doctors')} className="mt-4">
            Find Doctors
          </Button>
        </div>
        <Footer />
      </div>
    )
  }

  const timeSlots = [
    '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM', '5:00 PM'
  ]

  const calendarEvents = doctor.availableDates.map((date, index) => ({
    day: new Date(date),
    events: [{
      id: index + 1,
      name: 'Available',
      time: '9:00 AM',
      datetime: date
    }]
  }))

  const handleBookAppointment = () => {
    if (!selectedDate || !selectedTime) {
      alert('Please select a date and time')
      return
    }
    navigate('/checkout', {
      state: {
        doctor,
        date: selectedDate,
        time: selectedTime,
        type: appointmentType
      }
    })
  }

  const totalFee = appointmentType === 'video' 
    ? doctor.consultationFee 
    : doctor.consultationFee + doctor.hospitalCharges

  return (
    <div className="min-h-screen">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Doctor Header */}
        <div className="bg-card border rounded-lg p-6 mb-8 shadow-sm">
          <div className="flex flex-col md:flex-row gap-6">
            <img
              src={doctor.image}
              alt={doctor.name}
              className="w-32 h-32 rounded-full object-cover"
            />
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-2">{doctor.name}</h1>
              <p className="text-xl text-muted-foreground mb-4">{doctor.specialty}</p>
              
              <div className="flex items-center gap-2 mb-4">
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                <span className="font-semibold text-lg">{doctor.rating}</span>
                <span className="text-muted-foreground">({doctor.yearsOfExperience} years experience)</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  {doctor.hospitalBranch}
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Phone className="h-4 w-4" />
                  {doctor.phone}
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Mail className="h-4 w-4" />
                  {doctor.email}
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <User className="h-4 w-4" />
                  {doctor.gender === 'male' ? 'Male' : 'Female'}
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {doctor.languages.map(lang => (
                  <span key={lang} className="px-3 py-1 bg-muted rounded-full text-sm">
                    {lang}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Doctor Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Bio */}
            <div className="bg-card border rounded-lg p-6 shadow-sm">
              <h2 className="text-2xl font-bold mb-4">About</h2>
              <p className="text-muted-foreground mb-4">{doctor.bio}</p>
              
              <h3 className="text-xl font-semibold mb-3">Qualifications</h3>
              <ul className="space-y-2">
                {doctor.qualifications.map((qual, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <Award className="h-4 w-4 text-primary" />
                    <span>{qual}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Calendar */}
            <div className="bg-card border rounded-lg p-6 shadow-sm">
              <h2 className="text-2xl font-bold mb-4">Select Date & Time</h2>
              
              <div className="mb-6">
                <FullScreenCalendar data={calendarEvents} />
              </div>

              <div className="mt-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Select Date</label>
                  <Input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Select Time</label>
                  <Select value={selectedTime} onValueChange={setSelectedTime}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a time slot" />
                    </SelectTrigger>
                    <SelectContent>
                      {timeSlots.map(slot => (
                        <SelectItem key={slot} value={slot}>{slot}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Appointment Type</label>
                  <div className="flex gap-4">
                    <Button
                      variant={appointmentType === 'physical' ? 'default' : 'outline'}
                      onClick={() => setAppointmentType('physical')}
                      className="flex-1"
                    >
                      <User className="mr-2 h-4 w-4" />
                      Physical Visit
                    </Button>
                    <Button
                      variant={appointmentType === 'video' ? 'default' : 'outline'}
                      onClick={() => setAppointmentType('video')}
                      className="flex-1"
                    >
                      <Video className="mr-2 h-4 w-4" />
                      Video Consultation
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Booking Summary */}
          <div className="space-y-6">
            <div className="bg-card border rounded-lg p-6 shadow-sm sticky top-24">
              <h2 className="text-2xl font-bold mb-4">Booking Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div>
                  <p className="text-sm text-muted-foreground">Consultation Fee</p>
                  <p className="text-xl font-semibold">₹{doctor.consultationFee}</p>
                </div>
                {appointmentType === 'physical' && (
                  <div>
                    <p className="text-sm text-muted-foreground">Hospital Charges</p>
                    <p className="text-xl font-semibold">₹{doctor.hospitalCharges}</p>
                  </div>
                )}
                <div className="border-t pt-4">
                  <p className="text-sm text-muted-foreground">Total Payable</p>
                  <p className="text-3xl font-bold text-primary">₹{totalFee}</p>
                </div>
              </div>

              {selectedDate && selectedTime ? (
                <HoverBorderGradient
                  containerClassName="rounded-lg w-full"
                  as="button"
                  className="w-full bg-primary text-primary-foreground py-3 flex items-center justify-center"
                  onClick={handleBookAppointment}
                >
                  Proceed to Payment
                </HoverBorderGradient>
              ) : (
                <Button 
                  onClick={handleBookAppointment}
                  className="w-full"
                  size="lg"
                  disabled
                >
                  Proceed to Payment
                </Button>
              )}

              <p className="text-xs text-muted-foreground mt-4 text-center">
                Cancellation allowed up to 24 hours before appointment
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

