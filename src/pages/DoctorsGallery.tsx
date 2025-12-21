import { useNavigate } from 'react-router-dom'
import { Star, MapPin } from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { doctors } from '../data/doctors'
import { Button } from '../components/ui/button'
import { AnimatedTooltip } from '../components/ui/animated-tooltip'
import { HoverBorderGradient } from '../components/ui/hover-border-gradient'

export default function DoctorsGallery() {
  const navigate = useNavigate()

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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {doctors.map(doctor => (
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
                  </div>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  {doctor.hospitalBranch}
                </div>
                <p className="text-sm text-muted-foreground">
                  {doctor.yearsOfExperience} years of experience
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

