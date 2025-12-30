import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    default: "DICE Dental Academy | Premier Dental Training Institute Islamabad",
    template: "%s | DICE Dental Academy",
  },
  description:
    "Pakistan's premier dental training institute in F-8 Markaz, Islamabad. Advanced clinical training, PG diplomas, and international licensing exam preparation (ORE, NDEB, Abu Dhabi DOH).",
  keywords: [
    "dental academy",
    "dental training pakistan",
    "orthodontics course",
    "aesthetic dentistry",
    "ORE preparation",
    "dental licensing exams",
    "Islamabad dental academy",
    "PG diploma dentistry",
    "clear aligners course",
    "international dental certification",
  ],
  authors: [{ name: "DICE Dental Academy" }],
  creator: "DICE Dental Academy",
  publisher: "DICE Dental Academy",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://dicedentalacademy.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://dicedentalacademy.com",
    title: "DICE Dental Academy | Premier Dental Training Institute Islamabad",
    description:
      "Advanced dental education with hands-on training, international faculty, and exam preparation. Located in F-8 Markaz, Islamabad.",
    siteName: "DICE Dental Academy",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "DICE Dental Academy - Learn Locally. Practice Confidently. Qualify Globally.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DICE Dental Academy | Premier Dental Training Institute",
    description:
      "Advanced dental education in Islamabad. PG diplomas, international exam prep, hands-on training.",
    images: ["/og-image.jpg"],
    creator: "@dicedentalacad",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
    // Add other verification codes as needed
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: "DICE Dental Academy",
  description:
    "Premier dental training institute offering advanced clinical training and international licensing exam preparation",
  url: "https://dicedentalacademy.com",
  logo: "https://dicedentalacademy.com/logo.png",
  image: "https://dicedentalacademy.com/og-image.jpg",
  telephone: "+92-51-1234567",
  email: "info@dicedentalacademy.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "F-8 Markaz",
    addressLocality: "Islamabad",
    addressCountry: "Pakistan",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: "33.712345",
    longitude: "73.051234",
  },
  sameAs: [
    "https://facebook.com/dicedentalacademy",
    "https://instagram.com/dicedentalacademy",
    "https://linkedin.com/company/dice-dental-academy",
    "https://youtube.com/@dicedentalacademy",
  ],
  areaServed: {
    "@type": "Country",
    name: "Pakistan",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Dental Training Programs",
    itemListElement: [
      {
        "@type": "Course",
        name: "PG Diploma in Orthodontics",
        description: "Comprehensive 12-month orthodontics training program",
        provider: {
          "@type": "Organization",
          name: "DICE Dental Academy",
        },
      },
      {
        "@type": "Course",
        name: "PG Diploma in Aesthetic Dentistry",
        description: "Advanced cosmetic dentistry training with digital workflows",
        provider: {
          "@type": "Organization",
          name: "DICE Dental Academy",
        },
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}

