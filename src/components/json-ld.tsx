interface JsonLdProps {
  data: Record<string, unknown>;
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Carter Digitals (Pty) Ltd",
  url: "https://www.carterdigitals.co.za",
  telephone: "+27724026893",
  email: "info@carterdigitals.co.za",
  founder: {
    "@type": "Person",
    name: "Kabelo Kadiaka",
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Soshanguve",
    addressRegion: "Pretoria, Gauteng",
    postalCode: "0152",
    addressCountry: "ZA",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: -25.5269,
    longitude: 28.0981,
  },
  priceRange: "R7950 - R50000",
  description:
    "Carter Digitals is a 100% Black-owned B-BBEE Level 1 digital agency based in Soshanguve, Pretoria. We build premium SME websites, business dashboards, and internal tools using Next.js and Google Cloud Platform.",
  areaServed: ["Soshanguve", "Pretoria", "Centurion", "Tshwane", "Gauteng"],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Web Design & Business Tools",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "SME Website Design",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Business Dashboard Development",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "SEO Services Pretoria",
        },
      },
    ],
  },
};

export function CarterDigitalsJsonLd() {
  return <JsonLd data={localBusinessSchema} />;
}
