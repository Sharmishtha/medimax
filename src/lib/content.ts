/**
 * Site content, sourced from the Medimax Drive folder ("Content",
 * "Doctor details.txt", contact notes). Edit here to update the website.
 */

const PHONE_DIGITS = "918290269412";

export const HOSPITAL = {
  name: "Medimax Hospital",
  url: "https://medimaxhospitals.in",
  domain: "medimaxhospitals.in",
  summary:
    "A 100-bed multi-specialty hospital in Hanumangarh with 24-hour emergency care, modular operation theatres and specialist doctors — premium care at affordable prices.",
  phoneDisplay: "+91 82902 69412",
  phoneHref: `tel:+${PHONE_DIGITS}`,
  whatsappHref: `https://wa.me/${PHONE_DIGITS}`,
  opdTimings: ["10:00 am – 2:30 pm", "5:00 pm – 7:00 pm"],
  address: [
    "Shri Kumar City, Near Hanuman Mandir,",
    "Town–Junction Road, Hanumangarh,",
    "Rajasthan – 335513, India",
  ],
  mapsHref:
    "https://www.google.com/maps/search/?api=1&query=Medimax+Hospital+Shri+Kumar+City+Town+Junction+Road+Hanumangarh",
  instagramHref: "https://www.instagram.com/medimax_hospital",
  instagramHandle: "@medimax_hospital",
  openingYear: 2027,
};

export function whatsappLink(message: string): string {
  return `${HOSPITAL.whatsappHref}?text=${encodeURIComponent(message)}`;
}

export const JOURNEY = [
  {
    year: "1985",
    name: "Gupta Hospital",
    text: "Where it began — a trusted family hospital serving Hanumangarh for over 30 years.",
    tone: "blue",
  },
  {
    year: "2018",
    name: "Gupta Life Care Hospital",
    text: "Renovated and upgraded, with new specialists joining the team.",
    tone: "teal",
  },
  {
    year: "2027",
    name: "Medimax Hospital",
    text: "More super-specialists and a bigger, better space — a one-stop destination for complete care.",
    tone: "magenta",
  },
] as const;

export type Tone = "blue" | "teal" | "magenta" | "orange";

export const TONES: Record<Tone, { text: string; bg: string; border: string }> = {
  blue: { text: "text-blue", bg: "bg-blue-tint", border: "border-blue" },
  teal: { text: "text-teal", bg: "bg-teal-tint", border: "border-teal" },
  magenta: { text: "text-magenta", bg: "bg-magenta-tint", border: "border-magenta" },
  orange: { text: "text-orange", bg: "bg-orange-tint", border: "border-orange" },
};

export interface Doctor {
  slug: string;
  name: string;
  role: string;
  credentials: string;
  bio: string;
  photo?: string;
}

export const DOCTORS: Record<string, Doctor> = {
  "ashok-gupta": {
    slug: "ashok-gupta",
    name: "Dr. Ashok Gupta",
    role: "Senior Pediatrician",
    credentials: "MD Pediatrics · 40+ years of experience",
    bio: "Providing experienced medical care for infants, children and adolescents.",
  },
  "aishwary-gupta": {
    slug: "aishwary-gupta",
    name: "Dr. Aishwary Gupta",
    role: "Internal Medicine · Critical Care & Diabetes Specialist",
    credentials: "MD Internal Medicine · 11+ years of experience",
    bio: "Expertise in adult medical conditions, diabetes management and critical care.",
  },
  "shreya-agrawal": {
    slug: "shreya-agrawal",
    name: "Dr. Shreya Agrawal",
    role: "Dermatologist · Skin, Hair & Aesthetic Specialist",
    credentials:
      "MD Dermatology · Fellowship in Lasers & Aesthetics · 11+ years of experience",
    bio: "Specialized care for skin and hair concerns, laser treatments and aesthetic dermatology.",
    photo: "/images/dr-shreya-agrawal.jpg",
  },
};

export interface Specialty {
  slug: string;
  name: string;
  line: string;
  tone: Tone;
  doctors: string[];
  services: string[];
  procedures: string[];
}

export const SPECIALTIES: Specialty[] = [
  {
    slug: "internal-medicine",
    name: "Internal Medicine",
    line: "Diabetes, blood pressure, thyroid, fevers and long-term care for adults.",
    tone: "blue",
    doctors: ["aishwary-gupta"],
    services: [
      "Diabetes Management",
      "Hypertension & Blood Pressure Control",
      "Thyroid Disorders",
      "Fever & Infectious Diseases",
      "Heart & Respiratory Conditions",
      "Gastrointestinal Disorders",
      "Kidney & Liver Diseases",
      "Lifestyle & Metabolic Disorders",
      "Critical Care Management",
      "Emergency Medical Care",
      "Preventive Health Check-ups",
      "Chronic Disease Management",
    ],
    procedures: [
      "ECG (Electrocardiogram)",
      "Nebulization Therapy",
      "Intravenous (IV) Medication & Fluid Therapy",
      "Blood Pressure & Blood Glucose Monitoring",
      "Diabetic Foot Assessment",
      "Diabetic Complication Screening",
      "Oxygen Therapy",
      "Emergency Stabilization",
      "Critical Care Monitoring",
      "Arterial Blood Gas (ABG) Analysis",
      "Central Venous Catheterization",
      "Endotracheal Intubation",
    ],
  },
  {
    slug: "pediatrics",
    name: "Pediatrics",
    line: "Newborn care, vaccination, growth monitoring and childhood illness.",
    tone: "teal",
    doctors: ["ashok-gupta"],
    services: [
      "Newborn & Infant Care",
      "Child Growth & Development Monitoring",
      "Vaccination & Immunization",
      "Fever & Common Childhood Illnesses",
      "Pediatric Infections & Allergies",
      "Nutrition & Feeding Guidance",
      "Respiratory & Gastrointestinal Disorders",
      "Childhood Asthma Management",
      "Developmental Assessment",
      "Adolescent Health Care",
      "Newborn Care & Follow-up",
      "Pediatric Emergency Assessment",
    ],
    procedures: [],
  },
  {
    slug: "gynecology",
    name: "Gynecology",
    line: "Pregnancy, delivery and women’s health.",
    tone: "magenta",
    doctors: [],
    services: [],
    procedures: [],
  },
  {
    slug: "critical-care-anaesthesia",
    name: "Critical Care & Anaesthesia",
    line: "ICU care and round-the-clock emergency support.",
    tone: "orange",
    doctors: ["aishwary-gupta"],
    services: [],
    procedures: [],
  },
  {
    slug: "ent",
    name: "ENT",
    line: "Ear, nose and throat care for all ages.",
    tone: "blue",
    doctors: [],
    services: [],
    procedures: [],
  },
  {
    slug: "dermatology-aesthetics",
    name: "Dermatology & Aesthetics",
    line: "Skin, hair, lasers and aesthetic treatments.",
    tone: "magenta",
    doctors: ["shreya-agrawal"],
    services: [
      "Medical Dermatology",
      "Acne & Acne Scar Management",
      "Pigmentation & Melasma Treatment",
      "Hair Fall & Scalp Disorders",
      "Skin Allergies & Infections",
      "Laser Hair Reduction",
      "Anti-Ageing & Skin Rejuvenation",
      "Aesthetic & Bridal Skin Care",
      "Nail Disorders",
    ],
    procedures: [
      "HydraFacial & Medical Facials",
      "Chemical Peels",
      "Laser Toning & Carbon Laser Facial",
      "Laser Hair Reduction",
      "Fractional CO₂ Laser",
      "Q-Switched Nd:YAG Laser Treatments",
      "Microneedling Radiofrequency (MNRF)",
      "PRP & GFC Hair Therapy",
      "Exosome Hair Treatment",
      "Botox Treatment",
      "HIFU Skin Tightening",
      "PDRN Skin Rejuvenation",
      "Subcision & TCA CROSS for Acne Scars",
      "White Hair Removal (Electrolysis)",
      "Minor Dermatological Procedures",
    ],
  },
  {
    slug: "general-surgery",
    name: "General Surgery",
    line: "Planned and emergency surgery in modular operation theatres.",
    tone: "teal",
    doctors: [],
    services: [],
    procedures: [],
  },
  {
    slug: "orthopaedics",
    name: "Orthopaedics",
    line: "Bones, joints, fractures and mobility.",
    tone: "orange",
    doctors: [],
    services: [],
    procedures: [],
  },
];

/** Only figures that are confirmed; add patients served / surgeries once real numbers arrive. */
export const IMPACT: { value: string; label: string; tone: Tone }[] = [
  { value: "40+", label: "years of service", tone: "blue" },
  { value: "100", label: "beds", tone: "teal" },
  { value: "8", label: "specialties under one roof", tone: "magenta" },
  { value: "24×7", label: "emergency care", tone: "orange" },
];

export const GALLERY: { src: string; caption: string; wide?: boolean }[] = [
  { src: "/images/building-front.jpg", caption: "Medimax Hospital — front elevation", wide: true },
  { src: "/images/reception.jpg", caption: "Reception & waiting lounge" },
  { src: "/images/reception-lounge.jpg", caption: "Main reception" },
  { src: "/images/emergency.jpg", caption: "Emergency department" },
  { src: "/images/icu.jpg", caption: "Intensive care unit" },
  { src: "/images/single-room.jpg", caption: "Single patient room" },
  { src: "/images/single-room-2.jpg", caption: "Single patient room" },
  { src: "/images/nursing-station.jpg", caption: "Nursing station" },
  { src: "/images/pharmacy.jpg", caption: "Pharmacy" },
  { src: "/images/corridor.jpg", caption: "Ward corridor" },
  { src: "/images/building-corner.jpg", caption: "Medimax Hospital — night view" },
];
