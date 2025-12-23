import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { Star, MapPin, Search, Filter } from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { doctors, specialties } from '../data/doctors'
import { Input } from '../components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select'
import { AnimatedTooltip } from '../components/ui/animated-tooltip'
import { HoverBorderGradient } from '../components/ui/hover-border-gradient'

export default function DoctorsGallery() {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedSpecialty, setSelectedSpecialty] = useState('all')

  const filteredDoctors = useMemo(() => {
    return doctors.filter(doctor => {
      const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           doctor.hospitalBranch.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesSpecialty = selectedSpecialty === 'all' || doctor.specialty === selectedSpecialty
      return matchesSearch && matchesSpecialty
    })
  }, [searchTerm, selectedSpecialty])

  const tooltipItems = doctors.slice(0, 6).map(doctor => ({
    id: doctor.id,
    name: doctor.name,
    designation: doctor.specialty,
    image: doctor.image
  }))

  return (
    <div className="min-h-screen">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Our Doctors</h1>
          <p className="text-muted-foreground">
            Meet our team of verified specialists
          </p>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Featured Doctors</h2>
          <div className="flex justify-center">
            <AnimatedTooltip items={tooltipItems} />
          </div>
        </div>

        {/* Search and Filter Section */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search doctors by name, specialty, or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by specialty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Specialties</SelectItem>
                  {specialties.map(specialty => (
                    <SelectItem key={specialty} value={specialty}>
                      {specialty}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            Showing {filteredDoctors.length} of {doctors.length} doctors
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDoctors.map(doctor => (
            <div
              key={doctor.id}
              className="bg-card border rounded-lg p-6 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer hover:scale-105"
              onClick={() => navigate(`/doctor/${doctor.id}`)}
            >
              <div className="flex flex-col items-center text-center mb-4">
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="w-24 h-24 rounded-full object-cover mb-4 border-4 border-primary/20"
                  onError={(e) => {
                    e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(doctor.name)}&size=96&background=random`
                  }}
                />
                <h3 className="text-xl font-semibold mb-1">{doctor.name}</h3>
                <p className="text-sm text-primary font-medium mb-2">{doctor.specialty}</p>
                <div className="flex items-center gap-1 mb-2">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{doctor.rating}</span>
                  <span className="text-sm text-muted-foreground">({doctor.yearsOfExperience} yrs exp)</span>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  {doctor.hospitalBranch}
                </div>
                <p className="text-sm text-muted-foreground text-center">
                  {doctor.bio.substring(0, 80)}...
                </p>
              </div>

              <HoverBorderGradient
                containerClassName="rounded-md w-full"
                as="button"
                className="w-full bg-primary text-primary-foreground py-2 flex items-center justify-center"
                onClick={(e) => {
                  e.stopPropagation()
                  navigate(`/doctor/${doctor.id}`)
                }}
              >
                View Profile
              </HoverBorderGradient>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  )
}

