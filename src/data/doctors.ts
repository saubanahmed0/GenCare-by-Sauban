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
"Dr. Ayaan Siddiqui", "Dr. Rahimullah Khan", "Dr. Mustafa Ansari", "Dr. Salman Qureshi", "Dr. Irfan Ahmed",
"Dr. Shafiq Ali", "Dr. Kamran Malik", "Dr. Adnan Farooq", "Dr. Junaid Hassan", "Dr. Naveed Akhtar",
"Dr. Faisal Rahman", "Dr. Imtiaz Hussain", "Dr. Sohail Abbas", "Dr. Rajesh Sharma", "Dr. Amit Verma",
"Dr. Suresh Gupta", "Dr. Rohit Mehta", "Dr. Anil Kapoor", "Dr. Vikram Singh", "Dr. Prakash Joshi",
"Dr. Ramesh Chandra", "Dr. Michael Anderson", "Dr. Daniel Thompson", "Dr. Karthik Rajan", "Dr. Suresh Raman"

];

const femaleNames = [
  "Dr. Ayesha Siddiqui", "Dr. Fatima Qureshi", "Dr. Zainab Ansari", "Dr. Mariam Farooq", "Dr. Huda Rahman",
"Dr. Sana Ahmed", "Dr. Iman Hussain", "Dr. Rukhsar Ali", "Dr. Samira Khan", "Dr. Anum Sheikh",
"Dr. Bushra Malik", "Dr. Tayyaba Noor", "Dr. Mehwish Akhtar",
"Dr. Pooja Sharma", "Dr. Neha Verma", "Dr. Kavita Gupta", "Dr. Ritu Mehta", "Dr. Anjali Singh",
"Dr. Sunita Joshi", "Dr. Rekha Chandra",
"Dr. Emily Johnson", "Dr. Sophia Martinez",
"Dr. Priya Raman", "Dr. Lakshmi Iyer", "Dr. Anitha Subramanian"

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
  return `${cleanName}@saubanGenCare.com`;
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
      image: `/assets/doctors/doctor-${doctorId - 1}.jpg`,
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
      hospitalAffiliation: `GenCare ${getRandomElement(hospitalBranches)}`,
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

