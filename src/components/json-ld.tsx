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
  url: "https://carterdigitals.co.za",
  telephone: "+27724026893",
  email: "kadiakakabelo4@gmail.com",
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
  priceRange: "R3999 - R50000",
  description:
    "Carter Digitals is a 100% Black-owned, 100% Youth-owned, B-BBEE Level 1 digital services studio based in Soshanguve, Pretoria. High-performance websites, bespoke web applications, internal business tools, and strategic brand collateral. 5–7 day delivery. CIPC: 2025/907839/07.",
  areaServed: ["Soshanguve", "Pretoria", "Centurion", "Tshwane", "Gauteng"],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Digital Services & Business Tools",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Website Development",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Bespoke Web Applications",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Internal Business Tools",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Logo & Brand Identity",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Flyers, Posters & Print Media",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Pitch Decks & Company Profiles",
        },
      },
    ],
  },
};

export function CarterDigitalsJsonLd() {
  return <JsonLd data={localBusinessSchema} />;
}
