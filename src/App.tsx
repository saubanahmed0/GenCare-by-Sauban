import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './components/theme-provider'
import Home from './pages/Home'
import DoctorFinder from './pages/DoctorFinder'
import DoctorProfile from './pages/DoctorProfile'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Checkout from './pages/Checkout'
import Confirmation from './pages/Confirmation'
import Appointments from './pages/Appointments'
import DoctorsGallery from './pages/DoctorsGallery'
import Locations from './pages/Locations'
import EmergencyButton from './components/EmergencyButton'
import BySauban from './components/BySauban'

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="sauban-healthgen-theme">
      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <div className="min-h-screen bg-background">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/find-doctors" element={<DoctorFinder />} />
            <Route path="/doctor/:id" element={<DoctorProfile />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/confirmation" element={<Confirmation />} />
            <Route path="/appointments" element={<Appointments />} />
            <Route path="/doctors" element={<DoctorsGallery />} />
            <Route path="/locations" element={<Locations />} />
          </Routes>
          <EmergencyButton />
          <BySauban />
        </div>
      </Router>
    </ThemeProvider>
  )
}

export default App

