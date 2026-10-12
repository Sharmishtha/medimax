import Link from "next/link";
import { DoctorCard } from "@/components/doctor-card";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import {
  DOCTORS,
  GALLERY,
  HOSPITAL,
  IMPACT,
  JOURNEY,
  SPECIALTIES,
  TONES,
  whatsappLink,
} from "@/lib/content";
import { JsonLd, hospitalJsonLd } from "@/lib/seo";

const FEATURED_DOCTORS = [
  { slug: "ashok-gupta", dept: "Pediatrics", tone: "teal" },
  { slug: "aishwary-gupta", dept: "Internal Medicine", tone: "blue" },
  { slug: "shreya-agrawal", dept: "Dermatology & Aesthetics", tone: "magenta" },
] as const;

export default function HomePage() {
  return (
    <>
      <JsonLd data={hospitalJsonLd()} />
      <SiteHeader />
      <main>
        {/* Hero */}
        <section className="wrap flex flex-wrap items-center gap-12 pb-18 pt-10">
          <div className="min-w-0 flex-[1_1_480px]">
            <div className="flex flex-wrap items-center gap-3">
              <span className="eyebrow text-blue">Hanumangarh · Since 1985</span>
              <span className="rounded-full bg-magenta-tint px-3 py-1 text-xs font-extrabold uppercase tracking-wider text-magenta">
                New hospital opening {HOSPITAL.openingYear}
              </span>
            </div>
            <h1 className="mb-5 mt-4 text-5xl font-black leading-[1.05] tracking-tight md:text-6xl">
              Complete care,
              <br />
              <span className="text-blue">close to home.</span>
            </h1>
            <p className="mb-8 max-w-[520px] text-xl leading-relaxed text-body">
              {HOSPITAL.summary}
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href={whatsappLink("Hello Medimax Hospital, I would like to book an appointment.")}
                className="pill bg-blue text-[17px] text-white hover:bg-blue-dark"
              >
                WhatsApp to book
              </a>
              <a
                href={HOSPITAL.phoneHref}
                className="pill border-2 border-ink py-3 text-[17px] text-ink hover:bg-mist"
              >
                Call {HOSPITAL.phoneDisplay}
              </a>
            </div>
          </div>
          <div className="relative min-w-0 flex-[1_1_440px]">
            <img
              src="/images/building-front.jpg"
              alt="Rendering of the new Medimax Hospital building at night"
              className="h-[440px] w-full rounded-t-[220px] rounded-b-[32px] object-cover"
            />
            <div className="absolute -left-3 bottom-7 flex items-center gap-3.5 rounded-[20px] bg-white px-5 py-4 shadow-[0_10px_30px_rgba(20,40,70,.14)]">
              <img src="/logo-mark.png" alt="" className="h-12 w-12" />
              <div>
                <div className="text-[22px] font-black">100 beds</div>
                <div className="text-sm text-body">8 specialties under one roof</div>
              </div>
            </div>
          </div>
        </section>

        {/* Journey */}
        <section id="journey" className="scroll-mt-24 bg-mist py-20">
          <div className="wrap">
            <div className="eyebrow text-magenta">Our journey</div>
            <h2 className="mb-12 mt-3 text-4xl font-black">
              Four decades of care, growing with Hanumangarh
            </h2>
            <ol className="grid gap-6 md:grid-cols-3">
              {JOURNEY.map((j) => {
                const t = TONES[j.tone];
                return (
                  <li key={j.year} className={`rounded-3xl border-t-[6px] bg-white p-7 ${t.border}`}>
                    <div className={`text-[44px] font-black ${t.text}`}>{j.year}</div>
                    <div className="mb-2.5 mt-1.5 text-[22px] font-extrabold">{j.name}</div>
                    <p className="leading-relaxed text-body">{j.text}</p>
                  </li>
                );
              })}
            </ol>
          </div>
        </section>

        {/* Specialties */}
        <section id="specialties" className="wrap scroll-mt-24 py-22">
          <div className="eyebrow text-blue">Our specialties</div>
          <h2 className="mb-10 mt-3 text-4xl font-black">Eight departments, one roof</h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {SPECIALTIES.map((s) => {
              const t = TONES[s.tone];
              return (
                <Link
                  key={s.slug}
                  href={`/specialties/${s.slug}/`}
                  className="flex flex-col gap-3 rounded-[20px] border-[1.5px] border-line bg-white p-6 transition-shadow hover:shadow-[0_10px_30px_rgba(20,40,70,.10)]"
                >
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-[14px] text-xl font-black ${t.bg} ${t.text}`}
                    aria-hidden="true"
                  >
                    {s.name[0]}
                  </div>
                  <div className="text-xl font-extrabold">{s.name}</div>
                  <div className="text-[15px] leading-normal text-body">{s.line}</div>
                  <div className={`mt-auto text-sm font-extrabold ${t.text}`}>
                    Doctors &amp; procedures →
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Doctors */}
        <section id="doctors" className="scroll-mt-24 bg-mist py-22">
          <div className="wrap">
            <div className="eyebrow text-magenta">Meet our doctors</div>
            <h2 className="mb-10 mt-3 text-4xl font-black">Experienced hands, familiar faces</h2>
            <div className="grid gap-6 md:grid-cols-3">
              {FEATURED_DOCTORS.map((f) => (
                <DoctorCard key={f.slug} doctor={DOCTORS[f.slug]} dept={f.dept} tone={f.tone} />
              ))}
            </div>
          </div>
        </section>

        {/* Impact */}
        <section className="wrap py-22">
          <div className="eyebrow text-blue">Our impact</div>
          <h2 className="mb-10 mt-3 text-4xl font-black">Trusted by Hanumangarh since 1985</h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {IMPACT.map((i) => {
              const t = TONES[i.tone];
              return (
                <div key={i.label} className={`rounded-3xl p-7 ${t.bg}`}>
                  <div className={`text-5xl font-black ${t.text}`}>{i.value}</div>
                  <div className="font-bold">{i.label}</div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Gallery */}
        <section id="gallery" className="wrap scroll-mt-24 pb-22">
          <div className="eyebrow text-magenta">Gallery</div>
          <h2 className="mb-3 mt-3 text-4xl font-black">Inside Medimax</h2>
          <p className="mb-8 text-body">
            Architectural renderings of the new hospital, opening {HOSPITAL.openingYear}.
          </p>
          <div className="grid auto-rows-[240px] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {GALLERY.map((g) => (
              <figure
                key={g.src}
                className={`group relative overflow-hidden rounded-[20px] ${g.wide ? "sm:col-span-2" : ""}`}
              >
                <img
                  src={g.src}
                  alt={g.caption}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-4 pb-3 pt-8 text-sm font-bold text-white">
                  {g.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
