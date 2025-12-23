# GenCare by Sauban - Hospital Appointment Booking Platform

A production-grade hospital appointment booking platform built with React.js, TypeScript, Tailwind CSS, and shadcn/ui. Designed for trust, clarity, speed, and security.

## 🎯 Features

- **Doctor Finder**: Advanced search and filtering by name, specialty, symptoms, availability, gender, and language
- **Secure Authentication**: Email/password and OTP-based login with HIPAA-compliant messaging
- **Appointment Booking**: Interactive calendar with physical visit and telehealth options
- **Transparent Pricing**: Clear fee breakdown with insurance support
- **Patient Portal**: View appointments, medical records preview, and booking history
- **Emergency Services**: Quick access to emergency contacts
- **Multiple Locations**: Hospital locations with interactive map
- **AI Chatbot**: Healthcare assistant for patient support

## 🛠️ Tech Stack

- **React.js** 18.2+ (Functional Components)
- **TypeScript** 5.2+
- **Tailwind CSS** 3.3+
- **shadcn/ui** components
- **Framer Motion** for animations
- **React Router** for navigation
- **date-fns** for date handling
- **Vite** as build tool

## 📦 Installation

1. **Navigate to the project directory:**
   ```bash
   cd "GenCare by Sauban"
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to `http://localhost:5173`

## 🏗️ Project Structure

```
Sauban HealthGen/
├── src/
│   ├── components/
│   │   ├── ui/              # shadcn/ui components
│   │   ├── Header.tsx       # Navigation header
│   │   ├── Footer.tsx       # Footer with links
│   │   └── EmergencyButton.tsx
│   ├── pages/               # Route pages
│   │   ├── Home.tsx
│   │   ├── DoctorFinder.tsx
│   │   ├── DoctorProfile.tsx
│   │   ├── Login.tsx
│   │   ├── Signup.tsx
│   │   ├── Checkout.tsx
│   │   ├── Confirmation.tsx
│   │   ├── Appointments.tsx
│   │   ├── DoctorsGallery.tsx
│   │   └── Locations.tsx
│   ├── data/
│   │   └── doctors.ts       # Mock doctor data (50 doctors)
│   ├── hooks/
│   │   └── use-media-query.ts
│   ├── lib/
│   │   └── utils.ts         # Utility functions
│   ├── App.tsx              # Main app component with routing
│   ├── main.tsx             # Entry point
│   └── index.css            # Global styles
├── public/                  # Static assets
├── package.json
├── tsconfig.json
├── tailwind.config.js
└── vite.config.ts
```

## 🎨 Design Principles

- **Trust-First**: Medical-grade security messaging and verified doctor badges
- **Calm & Reassuring**: Soft color palette (blue, teal, white)
- **Mobile-First**: Responsive design for all devices
- **Accessible**: ARIA roles and readable contrast ratios
- **Fast**: Optimized performance with lazy loading and memoization

## 🔐 Security & Privacy

- HIPAA/GDPR awareness messaging
- Encrypted data transmission (UI simulation)
- Privacy-first authentication flow
- Guest booking option to reduce drop-offs

## 📱 Key Pages

- **Home**: Hero section with doctor finder, trust signals, features
- **Find Doctors**: Advanced search with filters and doctor cards
- **Doctor Profile**: Detailed doctor info, calendar, booking flow
- **Checkout**: Transparent pricing with payment gateway placeholders
- **Confirmation**: Appointment summary with calendar integration
- **Appointments**: Patient dashboard for managing bookings
- **Doctors Gallery**: Browse all doctors with animated tooltips
- **Locations**: Hospital locations with world map visualization

## 🎯 Mock Data

The project includes 50 doctors with:
- Indian phone numbers and emails
- Unsplash profile images
- 15 different specialties
- Availability dates (excluding Sundays and holidays)
- Ratings, experience, and qualifications

## 🚀 Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

## 📝 Notes

- This is a **frontend-only** project with mock data
- No backend API integration
- Authentication is UI-only (no real auth logic)
- Payment processing is simulated
- All doctor images use Unsplash stock photos

## 📧 Contact

- **Phone**: +91 ***8890
- **Email**: sauban@gmail.com
- **Company**: Sauban HealthGen

## 📄 License

This project is for demonstration purposes.

---

Built with ❤️ for healthcare excellence

