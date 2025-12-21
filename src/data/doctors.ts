export interface Doctor {
  id: number;
  name: string;
  phone: string;
  email: string;
  image: string;
  yearsOfExperience: number;
  rating: number;
  hospitalBranch: string;
  specialty: string;
  gender: "male" | "female";
  languages: string[];
  nextAvailableSlot?: string;
  bio: string;
  qualifications: string[];
  hospitalAffiliation: string;
  consultationFee: number;
  hospitalCharges: number;
  availableDates: string[];
}

export const specialties = [
  "Cardiology",
  "Pediatrics",
  "Orthopedics",
  "Dermatology",
  "Neurology",
  "Oncology",
  "Gynecology",
  "Psychiatry",
  "Endocrinology",
  "Gastroenterology",
  "Pulmonology",
  "Ophthalmology",
  "ENT",
  "Urology",
  "General Medicine",
];

const maleNames = [
  "Dr. Ahmed Khan", "Dr. Muhammad Ali", "Dr. Hassan Sheikh", "Dr. Omar Farooq", "Dr. Zain Malik",
  "Dr. Ibrahim Hussain", "Dr. Yusuf Rahman", "Dr. Hamza Ansari", "Dr. Bilal Ahmad", "Dr. Tariq Islam",
  "Dr. Saifuddin Khan", "Dr. Arif Sheikh", "Dr. Faisal Malik", "Dr. Nadeem Ahmed", "Dr. Rashid Ali",
  "Dr. Asad Khan", "Dr. Usman Sheikh", "Dr. Imran Malik", "Dr. Salman Ahmad", "Dr. Waseem Ali",
  "Dr. Farhan Khan", "Dr. Danish Sheikh", "Dr. Aamir Malik", "Dr. Sameer Ahmad", "Dr. Zubair Ali"
];

const femaleNames = [
  "Dr. Aisha Khan", "Dr. Fatima Sheikh", "Dr. Zainab Malik", "Dr. Maryam Ahmad", "Dr. Khadija Ali",
  "Dr. Amina Khan", "Dr. Hafsa Sheikh", "Dr. Safiya Malik", "Dr. Sumaiya Ahmad", "Dr. Hira Ali",
  "Dr. Noor Khan", "Dr. Layla Sheikh", "Dr. Aaliyah Malik", "Dr. Mariam Ahmad", "Dr. Zara Ali",
  "Dr. Sarah Khan", "Dr. Ayesha Sheikh", "Dr. Rabia Malik", "Dr. Sana Ahmad", "Dr. Hina Ali",
  "Dr. Nida Khan", "Dr. Amna Sheikh", "Dr. Farah Malik", "Dr. Saima Ahmad", "Dr. Nadia Ali"
];

const hospitalBranches = [
  "Mumbai Central", "Delhi NCR", "Bangalore South", "Chennai Central", "Hyderabad",
  "Pune", "Kolkata", "Ahmedabad", "Jaipur", "Lucknow"
];

const languages = ["Hindi", "English", "Marathi", "Tamil", "Telugu", "Gujarati", "Bengali"];

function getRandomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

function getRandomElements<T>(array: T[], count: number): T[] {
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

function generatePhoneNumber(): string {
  const prefixes = ["91", "91", "91"];
  const prefix = getRandomElement(prefixes);
  const number = Math.floor(1000000000 + Math.random() * 9000000000);
  return `+${prefix} ${number.toString().slice(0, 2)} ***${number.toString().slice(-4)}`;
}

function generateEmail(name: string): string {
  const cleanName = name.toLowerCase().replace(/[^a-z]/g, "");
  return `${cleanName}@saubanhealthgen.com`;
}

function generateAvailableDates(): string[] {
  const dates: string[] = [];
  const today = new Date();
  for (let i = 1; i <= 30; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    // Skip Sundays (0) and some random holidays
    if (date.getDay() !== 0 && Math.random() > 0.1) {
      dates.push(date.toISOString().split('T')[0]);
    }
  }
  return dates.slice(0, 15);
}

function generateDoctors(): Doctor[] {
  const doctors: Doctor[] = [];
  const allNames = [...maleNames, ...femaleNames];
  
  // Ensure specialty distribution
  const specialtyCounts: Record<string, number> = {};
  specialties.forEach(spec => specialtyCounts[spec] = 0);
  
  let doctorId = 1;
  
  for (let i = 0; i < 50; i++) {
    const isMale = i < 25;
    const name = isMale 
      ? maleNames[Math.floor(Math.random() * maleNames.length)]
      : femaleNames[Math.floor(Math.random() * femaleNames.length)];
    
    // Distribute specialties evenly
    let specialty: string;
    if (i < specialties.length) {
      specialty = specialties[i];
    } else {
      // After first 15, randomly assign but ensure max 10 per specialty
      const availableSpecialties = specialties.filter(spec => 
        specialtyCounts[spec] < 10
      );
      specialty = getRandomElement(availableSpecialties.length > 0 ? availableSpecialties : specialties);
    }
    specialtyCounts[specialty] = (specialtyCounts[specialty] || 0) + 1;
    
    const yearsOfExperience = Math.floor(Math.random() * 30) + 5;
    const rating = parseFloat((4.0 + Math.random() * 1.0).toFixed(1));
    const consultationFee = Math.floor(Math.random() * 1000) + 500;
    const hospitalCharges = Math.floor(consultationFee * 0.1);
    
    const availableDates = generateAvailableDates();
    const nextAvailableSlot = availableDates[0] 
      ? `${availableDates[0]} at ${Math.floor(Math.random() * 8) + 9}:00 AM`
      : undefined;
    
    doctors.push({
      id: doctorId++,
      name,
      phone: generatePhoneNumber(),
      email: generateEmail(name),
      image: `https://images.unsplash.com/photo-${isMale ? '1559839734' : '1494790108377'}-${Math.floor(Math.random() * 1000000)}?w=400&h=400&fit=crop&crop=faces`,
      yearsOfExperience,
      rating,
      hospitalBranch: getRandomElement(hospitalBranches),
      specialty,
      gender: isMale ? "male" : "female",
      languages: getRandomElements(languages, Math.floor(Math.random() * 3) + 2),
      nextAvailableSlot,
      bio: `Experienced ${specialty} specialist with ${yearsOfExperience} years of practice. Committed to providing compassionate and comprehensive healthcare services.`,
      qualifications: [
        `MBBS from ${getRandomElement(["AIIMS", "PGI", "CMC Vellore", "KEM Hospital"])}`,
        `MD in ${specialty}`,
        `Fellowship in Advanced ${specialty}`
      ],
      hospitalAffiliation: `Sauban ${getRandomElement(hospitalBranches)}`,
      consultationFee,
      hospitalCharges,
      availableDates,
    });
  }
  
  return doctors;
}

export const doctors: Doctor[] = generateDoctors();

export const indianHolidays = [
  "2025-01-26", // Republic Day
  "2025-03-29", // Holi
  "2025-04-14", // Ambedkar Jayanti
  "2025-08-15", // Independence Day
  "2025-10-02", // Gandhi Jayanti
  "2025-10-23", // Dussehra
  "2025-11-12", // Diwali
  "2025-12-25", // Christmas
];

