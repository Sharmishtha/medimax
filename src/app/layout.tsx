import type { Metadata } from "next";
import "./globals.css";
import { HOSPITAL } from "@/lib/content";

export const metadata: Metadata = {
  metadataBase: new URL(HOSPITAL.url),
  title: {
    default: `${HOSPITAL.name}, Hanumangarh · Multi-specialty Hospital & 24×7 Emergency`,
    template: `%s · ${HOSPITAL.name}, Hanumangarh`,
  },
  description: HOSPITAL.summary,
  keywords: [
    "Medimax Hospital",
    "hospital in Hanumangarh",
    "multi-specialty hospital Hanumangarh",
    "24 hour emergency Hanumangarh",
    "Gupta Life Care Hospital",
    "Gupta Hospital Hanumangarh",
    "pediatrician Hanumangarh",
    "dermatologist Hanumangarh",
  ],
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: HOSPITAL.name,
    title: `${HOSPITAL.name}, Hanumangarh`,
    description: HOSPITAL.summary,
    url: "/",
    images: [{ url: "/images/building-front.jpg", alt: "Medimax Hospital building" }],
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-IN">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&display=swap"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
