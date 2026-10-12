import { DOCTORS, HOSPITAL, SPECIALTIES, type Specialty } from "./content";

/** schema.org data so search engines can show address, phone and hours. */

const address = {
  "@type": "PostalAddress",
  streetAddress: "Shri Kumar City, Near Hanuman Mandir, Town–Junction Road",
  addressLocality: "Hanumangarh",
  addressRegion: "Rajasthan",
  postalCode: "335513",
  addressCountry: "IN",
};

export function hospitalJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Hospital",
    "@id": `${HOSPITAL.url}/#hospital`,
    name: HOSPITAL.name,
    alternateName: ["Gupta Life Care Hospital", "Gupta Hospital"],
    url: `${HOSPITAL.url}/`,
    logo: `${HOSPITAL.url}/logo.png`,
    image: `${HOSPITAL.url}/images/building-front.jpg`,
    description: HOSPITAL.summary,
    telephone: "+91-8290269412",
    foundingDate: "1985",
    address,
    areaServed: "Hanumangarh, Rajasthan",
    sameAs: [HOSPITAL.instagramHref],
    medicalSpecialty: SPECIALTIES.map((s) => s.name),
    openingHoursSpecification: [
      { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"], opens: "00:00", closes: "23:59", description: "24 × 7 emergency" },
    ],
    availableService: { "@type": "MedicalTherapy", name: "24-hour emergency care" },
  };
}

export function specialtyJsonLd(s: Specialty) {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    name: `${s.name} at ${HOSPITAL.name}`,
    url: `${HOSPITAL.url}/specialties/${s.slug}/`,
    about: { "@type": "MedicalSpecialty", name: s.name },
    provider: { "@id": `${HOSPITAL.url}/#hospital` },
    mentions: s.doctors.map((d) => ({
      "@type": "Physician",
      name: DOCTORS[d].name,
      description: `${DOCTORS[d].role}. ${DOCTORS[d].credentials}.`,
      telephone: "+91-8290269412",
      address,
    })),
  };
}

/** Render JSON-LD safely (escape "<" so content can never close the script tag). */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
