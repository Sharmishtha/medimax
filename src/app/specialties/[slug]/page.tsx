import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DoctorCard } from "@/components/doctor-card";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { DOCTORS, HOSPITAL, SPECIALTIES, TONES, whatsappLink } from "@/lib/content";
import { JsonLd, specialtyJsonLd } from "@/lib/seo";

export function generateStaticParams() {
  return SPECIALTIES.map((s) => ({ slug: s.slug }));
}

export const dynamicParams = false;

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const s = SPECIALTIES.find((x) => x.slug === slug);
  if (!s) return {};
  const doctors = s.doctors.map((d) => DOCTORS[d].name).join(", ");
  const description = `${s.name} at ${HOSPITAL.name}, Hanumangarh. ${s.line}${
    doctors ? ` Consult ${doctors}.` : ""
  } Book on ${HOSPITAL.phoneDisplay}.`;
  const path = `/specialties/${s.slug}/`;
  return {
    title: s.name,
    description,
    alternates: { canonical: path },
    openGraph: { title: `${s.name} · ${HOSPITAL.name}`, description, url: path },
  };
}

function List({ title, items, dot }: { title: string; items: string[]; dot: string }) {
  return (
    <div className="rounded-3xl border-[1.5px] border-line bg-white p-7">
      <h2 className="mb-5 text-2xl font-black">{title}</h2>
      <ul className="grid gap-x-6 gap-y-3 sm:grid-cols-2">
        {items.map((i) => (
          <li key={i} className="flex gap-3 leading-snug text-body">
            <span className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${dot}`} aria-hidden="true" />
            {i}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default async function SpecialtyPage({ params }: Params) {
  const { slug } = await params;
  const s = SPECIALTIES.find((x) => x.slug === slug);
  if (!s) notFound();
  const t = TONES[s.tone];
  const dot = t.text.replace("text-", "bg-");
  const doctors = s.doctors.map((d) => DOCTORS[d]);
  const hasDetails = s.services.length + s.procedures.length > 0;

  return (
    <>
      <JsonLd data={specialtyJsonLd(s)} />
      <SiteHeader />
      <main>
        <section className={`${t.bg} py-16`}>
          <div className="wrap">
            <Link href="/#specialties" className={`text-sm font-extrabold ${t.text}`}>
              ← All specialties
            </Link>
            <h1 className="mb-4 mt-4 text-5xl font-black">{s.name}</h1>
            <p className="max-w-2xl text-xl leading-relaxed text-body">{s.line}</p>
            <a
              href={whatsappLink(`Hello, I would like to book a ${s.name} appointment.`)}
              className="pill mt-8 bg-magenta text-white hover:bg-magenta-dark"
            >
              Book a {s.name} appointment
            </a>
          </div>
        </section>

        <section className="wrap grid gap-8 py-16 lg:grid-cols-[1fr_360px]">
          <div className="flex flex-col gap-6">
            {s.services.length > 0 && <List title="Services" items={s.services} dot={dot} />}
            {s.procedures.length > 0 && (
              <List title="Procedures & treatments" items={s.procedures} dot={dot} />
            )}
            {!hasDetails && (
              <div className="rounded-3xl border-[1.5px] border-line bg-mist p-7">
                <h2 className="mb-2 text-2xl font-black">Full details coming soon</h2>
                <p className="leading-relaxed text-body">
                  We&apos;re preparing the complete list of services and procedures for{" "}
                  {s.name}. For enquiries, call or WhatsApp us on{" "}
                  <a href={HOSPITAL.phoneHref} className="font-extrabold text-blue">
                    {HOSPITAL.phoneDisplay}
                  </a>
                  .
                </p>
              </div>
            )}
          </div>
          <aside className="flex flex-col gap-6">
            {doctors.map((d) => (
              <div key={d.slug} className="overflow-hidden rounded-3xl border-[1.5px] border-line">
                <DoctorCard doctor={d} dept={s.name} tone={s.tone} />
              </div>
            ))}
            <div className="rounded-3xl bg-ink p-7 text-white">
              <div className="font-extrabold text-[#9FD3FF]">OPD timings</div>
              {HOSPITAL.opdTimings.map((x) => (
                <div key={x} className="text-[#D9DEE5]">{x}</div>
              ))}
              <a href={HOSPITAL.phoneHref} className="mt-4 block text-2xl font-black">
                {HOSPITAL.phoneDisplay}
              </a>
            </div>
          </aside>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
