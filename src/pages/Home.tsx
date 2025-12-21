import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, Shield, Clock, Users, Award, Stethoscope } from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { HeroPill } from '../components/ui/hero-pill'
import { WavyBackground } from '../components/ui/wavy-background'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select'
import DisplayCards from '../components/ui/display-cards'
import { HoverBorderGradient } from '../components/ui/hover-border-gradient'
import { Sparkles, Heart, Clock as ClockIcon } from 'lucide-react'

export default function Home() {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedSpecialty, setSelectedSpecialty] = useState('all')

  const handleSearch = () => {
    navigate('/find-doctors', { 
      state: { searchQuery, specialty: selectedSpecialty === 'all' ? '' : selectedSpecialty } 
    })
  }

  const features = [
    {
      icon: <Shield className="h-8 w-8 text-primary" />,
      title: "Verified Doctors",
      description: "All doctors are verified and certified by medical boards"
    },
    {
      icon: <Clock className="h-8 w-8 text-primary" />,
      title: "Book in 2 Minutes",
      description: "Quick and easy appointment booking process"
    },
    {
      icon: <Users className="h-8 w-8 text-primary" />,
      title: "24/7 Support",
      description: "Round-the-clock customer support for your needs"
    },
    {
      icon: <Award className="h-8 w-8 text-primary" />,
      title: "Accredited Hospitals",
      description: "NABH and JCI accredited healthcare facilities"
    }
  ]

  const testimonials = [
    {
      name: "Rajesh Kumar",
      rating: 5,
      text: "Excellent service! Found the right cardiologist and booked an appointment within minutes.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces"
    },
    {
      name: "Priya Sharma",
      rating: 5,
      text: "The telehealth feature is amazing. Had my consultation from home without any hassle.",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=faces"
    },
    {
      name: "Amit Patel",
      rating: 5,
      text: "Transparent pricing and no hidden charges. Highly recommended!",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=faces"
    }
  ]

  const displayCardsData = [
    {
      icon: <Heart className="size-4 text-blue-300" />,
      title: "New Feature",
      description: "Telehealth consultations now available",
      date: "Just now",
      iconClassName: "text-blue-500",
      titleClassName: "text-blue-500",
      className: "[grid-area:stack] hover:-translate-y-10 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration:700 hover:grayscale-0 before:left-0 before:top-0",
    },
    {
      icon: <ClockIcon className="size-4 text-blue-300" />,
      title: "Fast Booking",
      description: "Book appointments in under 2 minutes",
      date: "2 days ago",
      iconClassName: "text-blue-500",
      titleClassName: "text-blue-500",
      className: "[grid-area:stack] translate-x-12 translate-y-10 hover:-translate-y-1 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration:700 hover:grayscale-0 before:left-0 before:top-0",
    },
    {
      icon: <Sparkles className="size-4 text-blue-300" />,
      title: "Trusted",
      description: "50+ verified specialists",
      date: "Today",
      iconClassName: "text-blue-500",
      titleClassName: "text-blue-500",
      className: "[grid-area:stack] translate-x-24 translate-y-20 hover:translate-y-10",
    },
  ]

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="relative">
        <WavyBackground
          colors={['#38bdf8', '#818cf8', '#c084fc']}
          waveWidth={50}
          backgroundFill="rgba(255, 255, 255, 0.1)"
          blur={10}
          className="min-h-[600px]"
        >
          <div className="container mx-auto px-4 py-20 relative z-10">
            <div className="flex justify-center mb-6">
              <HeroPill
                href="#features"
                label="New: Telehealth Consultations Available"
                announcement="📣 Announcement"
                isExternal={false}
              />
            </div>
            
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-6xl font-bold mb-4 text-foreground">
                Find Verified Specialists.
                <br />
                <span className="text-primary">Book Appointments in Under 2 Minutes.</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Trusted healthcare services with transparent pricing, secure booking, and verified medical professionals.
              </p>
            </div>

            {/* Doctor Finder Search */}
            <div className="max-w-4xl mx-auto">
              <div className="bg-background/95 backdrop-blur rounded-lg shadow-xl p-6 space-y-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <Input
                      type="text"
                      placeholder="Search by doctor name, specialty, or symptoms..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="h-12"
                      onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                    />
                  </div>
                  <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
                    <SelectTrigger className="w-full md:w-[200px] h-12">
                      <SelectValue placeholder="Specialty" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Specialties</SelectItem>
                      <SelectItem value="Cardiology">Cardiology</SelectItem>
                      <SelectItem value="Pediatrics">Pediatrics</SelectItem>
                      <SelectItem value="Orthopedics">Orthopedics</SelectItem>
                      <SelectItem value="Dermatology">Dermatology</SelectItem>
                      <SelectItem value="Neurology">Neurology</SelectItem>
                    </SelectContent>
                  </Select>
                  <HoverBorderGradient
                    containerClassName="rounded-lg"
                    as="button"
                    className="h-12 px-8 bg-primary text-primary-foreground flex items-center justify-center space-x-2"
                    onClick={handleSearch}
                  >
                    <Search className="h-5 w-5" />
                    <span>Find Doctors</span>
                  </HoverBorderGradient>
                </div>
              </div>
            </div>

            {/* Trust Signals */}
            <div className="mt-12 flex flex-wrap justify-center gap-8 text-center">
              <div>
                <p className="text-3xl font-bold text-foreground">50+</p>
                <p className="text-sm text-muted-foreground">Verified Doctors</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-foreground">10+</p>
                <p className="text-sm text-muted-foreground">Hospital Locations</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-foreground">24/7</p>
                <p className="text-sm text-muted-foreground">Support Available</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-foreground">NABH</p>
                <p className="text-sm text-muted-foreground">Accredited</p>
              </div>
            </div>
          </div>
        </WavyBackground>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Sauban?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-card p-6 rounded-lg border shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Display Cards Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Latest Updates</h2>
          <div className="flex justify-center">
            <DisplayCards cards={displayCardsData} />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Patients Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-card p-6 rounded-lg border shadow-sm"
              >
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <div className="flex text-yellow-500">
                      {'★'.repeat(testimonial.rating)}
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground">{testimonial.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

