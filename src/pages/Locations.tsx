import { MapPin, Phone, Mail } from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { WorldMap } from '../components/ui/world-map'
import { Button } from '../components/ui/button'

export default function Locations() {
  const locations = [
    {
      name: 'Mumbai Central',
      address: '123 Medical Street, Mumbai, Maharashtra 400001',
      phone: '+91 22 1234 5678',
      email: 'mumbai@saubanhealthgen.com'
    },
    {
      name: 'Delhi NCR',
      address: '456 Health Avenue, New Delhi, Delhi 110001',
      phone: '+91 11 2345 6789',
      email: 'delhi@saubanhealthgen.com'
    },
    {
      name: 'Bangalore South',
      address: '789 Care Road, Bangalore, Karnataka 560001',
      phone: '+91 80 3456 7890',
      email: 'bangalore@saubanhealthgen.com'
    }
  ]

  return (
    <div className="min-h-screen">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Our Locations</h1>

        <div className="mb-12">
          <WorldMap
            dots={[
              {
                start: { lat: 19.0760, lng: 72.8777 }, // Mumbai
                end: { lat: 28.6139, lng: 77.2090 }, // Delhi
              },
              {
                start: { lat: 28.6139, lng: 77.2090 }, // Delhi
                end: { lat: 12.9716, lng: 77.5946 }, // Bangalore
              }
            ]}
            lineColor="#0ea5e9"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {locations.map((location, index) => (
            <div
              key={index}
              className="bg-card border rounded-lg p-6 shadow-sm"
            >
              <h3 className="text-xl font-semibold mb-4">{location.name}</h3>
              
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-primary mt-0.5" />
                  <p className="text-sm text-muted-foreground">{location.address}</p>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-primary" />
                  <a href={`tel:${location.phone}`} className="text-sm hover:text-primary">
                    {location.phone}
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-primary" />
                  <a href={`mailto:${location.email}`} className="text-sm hover:text-primary">
                    {location.email}
                  </a>
                </div>
              </div>

              <Button className="w-full mt-4">
                Get Directions
              </Button>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  )
}

