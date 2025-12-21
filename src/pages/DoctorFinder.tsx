import { useState, useMemo } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Search, Filter, Star, MapPin, Clock, Phone } from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { doctors, type Doctor } from '../data/doctors'
import { Input } from '../components/ui/input'
import { Button } from '../components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select'
import { AnimatedTooltip } from '../components/ui/animated-tooltip'
import { HoverBorderGradient } from '../components/ui/hover-border-gradient'

export default function DoctorFinder() {
  const location = useLocation()
  const navigate = useNavigate()
  const initialSearch = location.state?.searchQuery || ''
  const initialSpecialty = location.state?.specialty || ''

  const [searchQuery, setSearchQuery] = useState(initialSearch)
  const [selectedSpecialty, setSelectedSpecialty] = useState(initialSpecialty || 'all')
  const [selectedGender, setSelectedGender] = useState('any')
  const [selectedAvailability, setSelectedAvailability] = useState('any')
  const [selectedLanguage, setSelectedLanguage] = useState('any')

  const filteredDoctors = useMemo(() => {
    return doctors.filter(doctor => {
      const matchesSearch = !searchQuery || 
        doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase())
      
      const matchesSpecialty = selectedSpecialty === 'all' || doctor.specialty === selectedSpecialty
      const matchesGender = selectedGender === 'any' || doctor.gender === selectedGender
      const matchesLanguage = selectedLanguage === 'any' || doctor.languages.includes(selectedLanguage)
      
      const matchesAvailability = selectedAvailability === 'any' || 
        (selectedAvailability === 'today' && doctor.availableDates.includes(new Date().toISOString().split('T')[0])) ||
        (selectedAvailability === 'week' && doctor.availableDates.some(date => {
          const dateObj = new Date(date)
          const today = new Date()
          const weekFromNow = new Date(today)
          weekFromNow.setDate(today.getDate() + 7)
          return dateObj >= today && dateObj <= weekFromNow
        }))

      return matchesSearch && matchesSpecialty && matchesGender && matchesLanguage && matchesAvailability
    })
  }, [searchQuery, selectedSpecialty, selectedGender, selectedAvailability, selectedLanguage])

  const specialties = Array.from(new Set(doctors.map(d => d.specialty)))
  const languages = Array.from(new Set(doctors.flatMap(d => d.languages)))

  return (
    <div className="min-h-screen">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Find Your Doctor</h1>

        {/* Search and Filters */}
        <div className="bg-card border rounded-lg p-6 mb-8 shadow-sm">
          <div className="space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <Input
                  type="text"
                  placeholder="Search by doctor name, specialty, or symptoms..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-12"
                />
              </div>
              <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
                <SelectTrigger className="w-full md:w-[200px] h-12">
                  <SelectValue placeholder="Specialty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Specialties</SelectItem>
                  {specialties.map(spec => (
                    <SelectItem key={spec} value={spec}>{spec}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Select value={selectedGender} onValueChange={setSelectedGender}>
                <SelectTrigger>
                  <SelectValue placeholder="Gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any Gender</SelectItem>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedAvailability} onValueChange={setSelectedAvailability}>
                <SelectTrigger>
                  <SelectValue placeholder="Availability" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any Time</SelectItem>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="week">This Week</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                <SelectTrigger>
                  <SelectValue placeholder="Language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any Language</SelectItem>
                  {languages.map(lang => (
                    <SelectItem key={lang} value={lang}>{lang}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="mb-4">
          <p className="text-muted-foreground">
            Found {filteredDoctors.length} doctor{filteredDoctors.length !== 1 ? 's' : ''}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDoctors.map(doctor => (
            <div
              key={doctor.id}
              className="bg-card border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => navigate(`/doctor/${doctor.id}`)}
            >
              <div className="flex items-start gap-4 mb-4">
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="w-20 h-20 rounded-full object-cover"
                />
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-1">{doctor.name}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{doctor.specialty}</p>
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{doctor.rating}</span>
                    <span className="text-sm text-muted-foreground">
                      ({doctor.yearsOfExperience} years exp.)
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  {doctor.hospitalBranch}
                </div>
                {doctor.nextAvailableSlot && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    Next: {doctor.nextAvailableSlot}
                  </div>
                )}
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Phone className="h-4 w-4" />
                  {doctor.phone}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-primary">₹{doctor.consultationFee}</p>
                  <p className="text-xs text-muted-foreground">Consultation Fee</p>
                </div>
                <HoverBorderGradient
                  containerClassName="rounded-md"
                  as="button"
                  className="bg-primary text-primary-foreground px-4 py-2 flex items-center justify-center"
                  onClick={(e) => {
                    e.stopPropagation()
                    navigate(`/doctor/${doctor.id}`)
                  }}
                >
                  Book Now
                </HoverBorderGradient>
              </div>
            </div>
          ))}
        </div>

        {filteredDoctors.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-muted-foreground mb-4">No doctors found</p>
            <Button onClick={() => {
              setSearchQuery('')
              setSelectedSpecialty('all')
              setSelectedGender('any')
              setSelectedAvailability('any')
              setSelectedLanguage('any')
            }}>
              Clear Filters
            </Button>
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}

