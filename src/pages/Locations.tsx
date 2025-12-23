import { MapPin, Phone, Mail } from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { WorldMap } from '../components/ui/world-map'
import { Button } from '../components/ui/button'

export default function Locations() {
  const locations = [
    {
      name: 'GenCare - Hyderabad',
      address: '123 Medical Street, Hyderabad, Telangana 500001',
      phone: '+91 40 1234 5678',
      email: 'hyderabad@gencare.com',
      atmosphere: 'State-of-the-art healthcare facility in the vibrant city of Hyderabad, offering comprehensive medical services with a focus on patient-centered care.',
      lat: 17.3850,
      lng: 78.4867
    },
    {
      name: 'GenCare - Mumbai',
      address: '456 Health Avenue, Mumbai, Maharashtra 400001',
      phone: '+91 22 2345 6789',
      email: 'mumbai@gencare.com',
      atmosphere: 'Premier medical center in the bustling metropolis of Mumbai, providing advanced treatments and emergency care round the clock.',
      lat: 19.0760,
      lng: 72.8777
    },
    {
      name: 'GenCare - Kochi',
      address: '789 Care Road, Kochi, Kerala 682001',
      phone: '+91 484 3456 7890',
      email: 'kochi@gencare.com',
      atmosphere: 'Tranquil healthcare environment in the coastal city of Kochi, combining traditional healing practices with modern medical technology.',
      lat: 9.9312,
      lng: 76.2673
    },
    {
      name: 'GenCare - Germany',
      address: '101 Wellness Boulevard, Berlin, Germany 10115',
      phone: '+49 30 1234 5678',
      email: 'germany@gencare.com',
      atmosphere: 'International medical excellence in the heart of Europe, offering world-class healthcare services with German precision and care.',
      lat: 52.5200,
      lng: 13.4050
    }
  ]

  return (
    <div className="min-h-screen">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Our Locations</h1>

        <div className="mb-12">
          <WorldMap
            locations={locations}
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

