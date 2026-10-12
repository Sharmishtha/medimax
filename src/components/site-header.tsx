"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { HOSPITAL, whatsappLink } from "@/lib/content";

const NAV = [
  { href: "/#journey", label: "Our Journey" },
  { href: "/#specialties", label: "Specialties" },
  { href: "/#doctors", label: "Doctors" },
  { href: "/#gallery", label: "Gallery" },
  { href: "/#contact", label: "Contact" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="logo-stripe" />
      <div className="bg-mist text-sm font-semibold">
        <div className="wrap flex flex-wrap justify-between gap-x-7 gap-y-1 py-2.5">
          <span className="text-alert">24 × 7 Emergency</span>
          <span>OPD: {HOSPITAL.opdTimings.join(" · ")}</span>
          <span>
            Call / WhatsApp{" "}
            <a href={HOSPITAL.phoneHref} className="font-extrabold text-blue hover:text-blue-dark">
              {HOSPITAL.phoneDisplay}
            </a>
          </span>
        </div>
      </div>
      <header className="sticky top-0 z-30 border-b border-line bg-white/95 backdrop-blur">
        <div className="wrap flex items-center justify-between gap-4 py-3">
          <Link href="/" aria-label={`${HOSPITAL.name} home`}>
            <img src="/logo.png" alt={HOSPITAL.name} className="h-14 w-auto md:h-16" />
          </Link>
          <nav className="hidden items-center gap-7 text-base font-bold lg:flex">
            {NAV.map((n) => (
              <Link key={n.href} href={n.href} className="text-ink hover:text-blue">
                {n.label}
              </Link>
            ))}
          </nav>
          <a
            href={whatsappLink("Hello Medimax Hospital, I would like to book an appointment.")}
            className="pill hidden bg-magenta text-white hover:bg-magenta-dark sm:inline-flex"
          >
            Book Appointment
          </a>
          <button
            className="flex h-11 w-11 items-center justify-center rounded-full border border-line lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
        {open && (
          <nav className="wrap flex flex-col gap-1 border-t border-line pb-4 pt-2 lg:hidden">
            {NAV.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-3 font-bold hover:bg-mist"
              >
                {n.label}
              </Link>
            ))}
            <a
              href={whatsappLink("Hello Medimax Hospital, I would like to book an appointment.")}
              className="pill mt-2 bg-magenta text-white"
            >
              Book Appointment
            </a>
          </nav>
        )}
      </header>
    </>
  );
}
