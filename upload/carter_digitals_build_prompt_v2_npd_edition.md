# CARTER DIGITALS — WEBSITE BUILD PROMPT v2.0
## Informed by New Perspective Studio Deep Analysis | May 2026
## The "Beat NPD" Edition

---

## 1. STRATEGIC BRIEF

You are building the Carter Digitals agency website. The primary competitor to beat is **New Perspective Studio (NPD)** at newperspectivestudio.co.za — currently the highest-ranking web design agency in the Pretoria SERP despite being physically based in East London.

**NPD's formula:** content volume + 107 reviews + 9 free tools = national rankings.

**Carter's counter-formula:** Pretoria physical presence + B-BBEE Level 1 + GCP tech stack + Carter's story + custom business tools niche + free tools on own domain = a competitor NPD literally cannot replicate.

**The site must feel like:** a senior developer from Soshanguve sat down with a world-class brand strategist and built the agency they deserved — not the agency they could afford. Dark, confident, warm to clients, technically formidable. No white backgrounds. No WordPress apologies.

**Primary audience:** Pretoria/Tshwane SME owner who has been burned by cheap agencies, been invisible on Google, or who needs more than a brochure site.

**Secondary audience:** Government suppliers, B-BBEE procurement officers, corporate procurement teams looking for qualifying spend.

---

## 2. TECH STACK

| Layer | Technology | Rationale |
|---|---|---|
| Framework | **Next.js 14 App Router** | SSR/SSG for SEO, GCP-deployable, modern |
| Styling | **Tailwind CSS** + CSS custom properties | Token-based, no runtime cost |
| Animation | **Framer Motion** | Premium scroll reveals, page transitions |
| CMS | **Sanity.io** | Blog + portfolio, version-controlled, headless |
| Forms | **React Hook Form** + **Resend** (email) | No WPForms, no spam |
| Free Tools | **React** components (hosted on same Next.js app) | All tools on own domain — no Lovable, no ClickUp |
| Hosting | **Vercel** (primary) | CI/CD, Edge Network, auto SSL, free tier |
| Analytics | **GA4** | Standard |
| Maps | **Google Maps iframe** embed | Local SEO trust |
| Icons | **Lucide React** | Consistent, clean |
| Fonts | Space Grotesk + DM Sans (see Design Philosophy) | |
| Images | **next/image** WebP with explicit dimensions | Core Web Vitals |
| Schema | **JSON-LD** LocalBusiness + Service | E-E-A-T + local SEO |
| SEO meta | **next-seo** or App Router metadata API | Per-page control |

---

## 3. DESIGN PHILOSOPHY

### Named Aesthetic: **"Soshanguve Steel"**

Dark. Technical. Warm. The colour of a computer screen glowing in a township at 2am building something the world hasn't seen yet. Premium without apology. Nothing about this site should look like it was made with a Divi theme.

### Colour Palette (CSS Custom Properties)

```css
:root {
  /* Backgrounds */
  --cd-bg:          #080808;   /* Near-black — main background */
  --cd-surface:     #111111;   /* Cards, sections */
  --cd-elevated:    #1A1A1A;   /* Elevated cards, modals */
  --cd-border:      #242424;   /* Subtle borders */
  --cd-border-glow: #3A3A3A;   /* Hover border */

  /* Gold — Carter's colour. Use sparingly. */
  --cd-gold:        #C9A84C;   /* Primary accent */
  --cd-gold-light:  #E8CA7A;   /* Hover / highlight */
  --cd-gold-dim:    #7A6330;   /* Muted gold for tags, labels */
  --cd-gold-bg:     rgba(201, 168, 76, 0.08); /* Gold tint background */

  /* Text */
  --cd-text:        #F0EFE8;   /* Primary text — warm white */
  --cd-text-muted:  #888880;   /* Secondary text */
  --cd-text-dim:    #555550;   /* Placeholder, captions */

  /* Functional */
  --cd-success:     #2A6B4A;
  --cd-link:        var(--cd-gold);

  /* Gradients */
  --cd-gradient-hero: radial-gradient(ellipse at 20% 50%, #1a1408 0%, #080808 60%);
  --cd-gradient-gold: linear-gradient(90deg, #7A6330, #C9A84C, #E8CA7A, #C9A84C, #7A6330);
  --cd-gradient-card: linear-gradient(135deg, #131313, #1A1A1A);
}
```

### Typography

```css
/* Import via next/font/google */
--font-display:  'Space Grotesk', sans-serif;  /* Headlines, nav, CTAs */
--font-body:     'DM Sans', sans-serif;         /* Body copy, descriptions */
--font-mono:     'JetBrains Mono', monospace;   /* Code, tool outputs, stats */
```

### Type Scale

```css
--text-hero:     clamp(2.75rem, 5.5vw + 0.5rem, 5.5rem);
--text-h1:       clamp(2rem, 4vw + 0.5rem, 3.5rem);
--text-h2:       clamp(1.5rem, 2.5vw + 0.25rem, 2.25rem);
--text-h3:       clamp(1.125rem, 1.5vw, 1.5rem);
--text-body-lg:  clamp(1.0625rem, 1.25vw, 1.1875rem);
--text-body:     1rem;
--text-sm:       0.875rem;
--text-xs:       0.75rem;
```

### Visual Rules
- **Dark bg everywhere.** No white-background pages. Even the blog uses dark.
- **Gold is earned.** Only on: primary CTAs, section accent lines, stat numbers, hover states, the Carter tribute section.
- **Cards use glassmorphism:** `background: rgba(255,255,255,0.03); backdrop-filter: blur(12px); border: 1px solid var(--cd-border);`
- **Grain overlay on hero:** `0 0 / 200px 200px` noise texture at 4% opacity — premium print feel.
- **Grid lines in hero:** subtle `1px solid var(--cd-border)` grid at 8% opacity behind hero text.
- **Every section** uses `whileInView` Framer Motion — nothing is static.
- **No slider/carousel plugins.** Use CSS scroll-snap or Framer Motion horizontal scroll.

---

## 4. SITE STRUCTURE

```
Phase 1 — Launch (build all of these)
├── /                         Home
├── /about                    Our Story — Carter, Gee, Block L
├── /services                 Services Overview
├── /services/websites        SME Websites
├── /services/dashboards      Business Dashboards & Internal Tools
├── /services/seo             SEO & Content
├── /services/google-ads      Google Ads & PPC
├── /pricing                  Packages & Transparent Pricing
├── /portfolio                Work & Case Studies
├── /blog                     SEO Blog (Sanity-powered)
├── /contact                  Contact + Quote Form
├── /tools                    Free Tools Hub (BEAT NPD HERE)
├── /tools/website-cost       Website Cost Calculator
├── /tools/roi-calculator     Website ROI Calculator
├── /tools/seo-audit          Free SEO Audit
├── /tools/bbbee-score        B-BBEE Supplier Score Estimator ← NUCLEAR OPTION
└── /web-design-soshanguve    Local SEO landing page

Phase 2 — Post-launch
├── /web-design-pretoria
├── /web-design-centurion
├── /web-design-tshwane
├── /web-design-pretoria-north
├── /tools/dashboard-demo     Interactive business dashboard demo
├── /tools/whatsapp-simulator WhatsApp booking tool simulator
└── /client-portal            Login for existing clients
```

---

## 5. PAGE-BY-PAGE SPECIFICATIONS

---

### HOME (/)

**Meta title:** `Carter Digitals | Web Design & Business Tools — Pretoria, Soshanguve`
**Meta description:** `100% Black-owned B-BBEE Level 1 digital agency based in Soshanguve, Pretoria. We build SME websites, business dashboards, and internal tools that make your business run. From R7,950.`

#### Section 1: Hero
```
Layout: Full-viewport. Dark radial gradient bg. Grain overlay. Subtle grid lines.

H1: "We Build Websites That Make Money."
Sub: "Carter Digitals is a 100% Black-owned B-BBEE Level 1 agency from Soshanguve,
      Pretoria. Premium websites and business tools for SMEs done waiting to be seen."

CTAs:
  [primary — gold]  "Get a Free Quote"  → /contact
  [ghost]           "See Our Work"      → /portfolio

Badge strip (below CTAs):
  🏆 B-BBEE Level 1  |  🇿🇦 Pretoria-Based  |  ⚡ Next.js + GCP Stack

Animated counter row (Framer Motion counter animation on scroll-into-view):
  [47+] Projects Built  |  [R0] Spent on Templates  |  [2] Years of Real Work
```

#### Section 2: Why Carter Digitals (4-card horizontal grid)
```
Card style: glassmorphism, gold left-border on hover, stagger animation

Card 1 — B-BBEE Level 1
  Icon: Shield
  Title: "Your Procurement Spend Qualifies"
  Body: "We're 100% Black-owned and B-BBEE Level 1. Your supplier development spend
         works here. We're on the right list."

Card 2 — GCP-Powered Stack
  Icon: Cloud (Lucide)
  Title: "Not WordPress. Not Guesswork."
  Body: "Next.js, Firebase, Vertex AI, Google Cloud. We build for speed, scale, and
         the future — not whatever a theme builder allows."

Card 3 — Business Tools
  Icon: LayoutDashboard
  Title: "Beyond Websites"
  Body: "Booking systems. Stock trackers. Staff portals. Quote generators. We build
         the internal tools that actually run your business."

Card 4 — Pretoria Roots
  Icon: MapPin
  Title: "From Soshanguve. For You."
  Body: "We didn't fly in from Cape Town. We built Carter Digitals in Block L. We know
         what Pretoria SMEs actually need — because we are one."
```

#### Section 3: Services Teaser (3 cards)
```
Service 1: SME Websites
  Tagline: "Fast, beautiful, built to rank."
  CTA: "Website Packages →"

Service 2: Dashboards & Internal Tools
  Tagline: "Run your business, not just a page."
  CTA: "See What We Build →"

Service 3: SEO & Growth
  Tagline: "Get found. Stay found."
  CTA: "Growth Packages →"
```

#### Section 4: Portfolio Preview (3 featured)
```
Dark project cards: image with dark overlay, client industry badge, result metric.
Featured (Phase 1): 
  - Soshanguve Automotive School of Specialisation
  - Direla Bakgatla Trading Projects (Pty) Ltd
  - [3rd client — confirm with Gee]
CTA: "View All Work →" → /portfolio
```

#### Section 5: Testimonials (3 quotes — MUST BE REAL CLIENTS)
```
Layout: 3-column glassmorphism cards
Content per card:
  - ★★★★★ star row (gold)
  - Quote (2-3 sentences, verbatim)
  - Client name + business name + location
  - "Source: Google Review" tag
CTA below: "See All Reviews →" → [Google Business link]

⚠️ ACTION: Gee must collect minimum 3 real testimonials before launch.
   Target: Soshanguve SOS, Direla Bakgatla, any other paying client.
   Even a WhatsApp screenshot testimonial is better than nothing.
```

#### Section 6: Free Tools Strip
```
H2: "Free Tools for Pretoria Business Owners"
Sub: "No email required. Just useful."

Tool cards (horizontal scroll on mobile):
  🧮 Website Cost Calculator
  📊 ROI Calculator
  🔍 SEO Audit
  🏅 B-BBEE Score Estimator ← UNIQUE

Each card: tool name, one-line description, "Use Free Tool →" link
```

#### Section 7: Carter's Story (tribute section)
```
Layout: full-width dark section, gold accent line on left

H2: "Why We're Called Carter Digitals"
Copy:
  "In April 2021, we lost a brother. Carter was one of three friends from Soshanguve
   with a shared dream — to trade, to build, to prove that where you come from doesn't
   limit where you go.

   He never got to see what we built. But his name is on every project we ship.
   Carter Digitals isn't just a company name. It's a promise kept."

CTA: "Read Our Full Story →" → /about
```

#### Section 8: Pricing Teaser
```
H2: "Transparent Pricing. No Surprises."
  Websites from R7,950
  Dashboards from R15,000
  No hidden fees. No retainer traps.
CTA: "See All Packages →" → /pricing
```

#### Section 9: Latest Blog Posts (3 posts from Sanity)
```
Card: Title | Date | Category tag | Read time estimate | "Read →"
```

#### Section 10: Footer CTA
```
H2: "Let's Build Something That Works."
CTA: [gold button] "Start Your Project" → /contact
Secondary: WhatsApp direct link

Footer columns:
  Carter Digitals wordmark + tagline
  Quick Links: Home | About | Services | Pricing | Portfolio | Blog | Contact
  Services: Websites | Dashboards | SEO | Google Ads
  Contact: phone | email | Soshanguve, Pretoria
  B-BBEE Level 1 badge
  © 2025 Carter Digitals (Pty) Ltd

Floating WhatsApp button: fixed bottom-right, always visible
```

---

### ABOUT (/about)

**Meta title:** `About Carter Digitals | Founded in Soshanguve, Built for Pretoria`
**Meta description:** `Founded by Kabelo "Gee" Kadiaka in Soshanguve. Named for Carter. 100% Black-owned B-BBEE Level 1 digital agency building websites and business tools for SMEs across Pretoria and Tshwane.`

Sections:
1. Hero: "Built in Block L. For Everyone Who Was Told to Wait Their Turn."
2. Founder Story: Gee's background, trading dreams, Soshanguve roots
3. Carter Tribute: The friend, April 2021, the promise, the name
4. The Mission: Who we serve, what we refuse to do (cookie-cutter, disappear-after-launch)
5. Tech credentials: GCP, Firebase, Vertex AI, Next.js — with visual icons
6. B-BBEE Level 1 formal statement + certificate scan
7. Our Values: Honesty | Speed | Craft | Community
8. CTA: "Work With Us" → /contact

---

### FREE TOOLS HUB (/tools)

**Meta title:** `Free Business Tools for Pretoria SMEs | Carter Digitals`
**Meta description:** `Free website cost calculator, ROI calculator, SEO audit tool, and South Africa's only B-BBEE supplier score estimator. Built by Carter Digitals in Soshanguve, Pretoria.`

**H1:** "Free Tools. Real Numbers. No Catch."

**Layout:** Grid of tool cards, each linking to its own page

#### /tools/website-cost — Website Cost Calculator
```
Interactive React component with sliders:
  - Number of pages (slider: 1-20)
  - Features needed (checkboxes):
      □ Blog
      □ Online booking
      □ E-commerce
      □ Staff portal / dashboard
      □ WhatsApp integration
      □ Google Ads landing page
  - Timeline needed (radio: Urgent 1 week / Standard 3 weeks / Flexible)

Output:
  Estimated range: R[X] – R[Y]
  Best matching package: [Starter / Business / Growth / Custom]
  CTA: "Get exact quote →" /contact (with pre-filled budget data in URL params)

⚠️ DEVELOPER NOTE: This tool captures lead data. On submit/quote-click,
   fire a GA4 event with the estimated budget range.
```

#### /tools/roi-calculator — Website ROI Calculator
```
Inputs:
  - Monthly website visitors (current estimate)
  - Current conversion rate %
  - Average sale value (ZAR)
  - New website conversion rate (we pre-fill 3.5% as industry avg)

Output:
  Current monthly revenue from web: R[X]
  Projected monthly revenue (new site): R[Y]
  Monthly uplift: R[Z]
  Payback period: [N] months

CTA: "This is why a website pays for itself. Let's build yours." → /contact
```

#### /tools/seo-audit — Free SEO Audit
```
Input: URL field + email field
Output: Basic audit via third-party API (Moz, Ahrefs, or Google PageSpeed Insights API)
  - Page speed score
  - Mobile-friendliness
  - Meta title / description check
  - HTTPS status
  - Core Web Vitals summary

CTA: "Want us to fix these? Get a free consult." → /contact

⚠️ DEVELOPER NOTE: Email is required for full report — this is the lead capture.
   Use Resend to email the report PDF to the user and notify Gee.
```

#### /tools/bbbee-score — B-BBEE Supplier Score Estimator ← NUCLEAR OPTION
```
H1: "Is Your Agency B-BBEE Compliant? Find Out What Your Spend Qualifies For."

Context copy:
  "Under South Africa's B-BBEE framework, procuring from a Level 1 supplier like
   Carter Digitals earns your company 135% of the procurement value toward your
   enterprise development and supplier development scorecard targets."

Inputs:
  - Project budget (ZAR)
  - Your company's B-BBEE level (dropdown)
  - Procurement element (dropdown: Enterprise Dev / Supplier Dev / General Procurement)

Output:
  Qualifying spend value: R[X × multiplier]
  Your B-BBEE scorecard contribution: [N] points
  Carter Digitals' status: ✅ Level 1 | 100% Black-Owned | Qualifying Supplier

CTA: "Start a project with a qualifying supplier." → /contact

⚠️ WHY THIS MATTERS: NPD has NOTHING like this. No Pretoria competitor does.
   Government suppliers, corporates, and BEE-conscious procurement officers will
   find this tool on Google and convert. It's a zero-competition page.
```

---

### PRICING (/pricing)

**Meta title:** `Web Design Prices Pretoria 2026 | Carter Digitals | From R7,950`
**Meta description:** `Transparent web design pricing for Pretoria SMEs. Websites from R7,950. Dashboards from R15,000. No hidden fees. B-BBEE Level 1 — your procurement spend qualifies.`

**H1:** "Real Prices. Real Work. No Surprises."

#### Package Table

| | Starter | Business | Growth | Dashboard |
|---|---|---|---|---|
| **Price** | R7,950 | R14,500 | R22,000 | From R15,000 |
| **Best for** | First website | Established SME | Lead generation | Internal tools |
| **Pages** | Up to 5 | Up to 10 | Up to 15 | Custom scope |
| **Mobile-responsive** | ✅ | ✅ | ✅ | ✅ |
| **SEO foundations** | ✅ | ✅ | ✅ | ✅ |
| **WhatsApp CTA** | ✅ | ✅ | ✅ | ✅ |
| **Contact/quote form** | ✅ | ✅ | ✅ | ✅ |
| **Google Analytics** | — | ✅ | ✅ | ✅ |
| **Blog setup** | — | ✅ | ✅ | — |
| **Google My Business** | — | ✅ | ✅ | — |
| **Booking / quote tool** | — | — | ✅ | ✅ |
| **SEO content (5 pages)** | — | — | ✅ | — |
| **Turnaround** | 2 weeks | 3 weeks | 4–5 weeks | Custom |
| **Hosting (free)** | 3 months | 6 months | 6 months | — |

#### Add-ons Table
| Add-on | Price |
|---|---|
| Google Ads management | R3,500/month |
| SEO content (per month) | R2,500/month |
| Maintenance & updates | R1,200/month |
| Additional pages | R800/page |
| Logo design | R2,500 once-off |
| WhatsApp chatbot setup | R3,000 once-off |

#### B-BBEE Procurement Box (sticky callout)
```
🏅 B-BBEE Level 1 — 100% Black-Owned
"Procuring from Carter Digitals earns your company 135% of the spend value
 toward your B-BBEE scorecard. Use our [B-BBEE Score Estimator] to see
 exactly what this project is worth to your compliance targets."
```

---

### PORTFOLIO (/portfolio)

**H1:** "Work That Speaks for Itself."
**Filter tabs:** All | Websites | Dashboards | Soshanguve | Pretoria | Education

**Case study card structure:**
- Project image (dark overlay, gold accent on hover)
- Client name + industry badge
- Services used (tag pills)
- Key result metric (e.g., "Site delivered in 11 days" / "Now ranked on Google")
- "View Case Study →" link

**Featured case studies at launch:**
1. Soshanguve Automotive School of Specialisation (SOS) — Education website
2. Direla Bakgatla Trading Projects (Pty) Ltd — CCTV / corporate

---

### CONTACT (/contact)

**H1:** "Let's Build Something."

Form fields:
```
Name *
Business Name *
Email *
Phone *
Service (dropdown): Website | Dashboard | SEO | Google Ads | Not sure
Budget range (dropdown): Under R10k | R10k–R20k | R20k–R50k | R50k+
Tell us about your project (textarea)
```

Below form:
```
WhatsApp alternative:
  "Prefer to chat? Message us on WhatsApp."
  [Button] → wa.me/27XXXXXXXXX

Office details:
  📍 Soshanguve, Pretoria, Gauteng
  📞 [phone]
  ✉️  info@carterdigitals.co.za
  ⏱  We reply within 4 business hours

Google Maps iframe (LocalBusiness location)
```

JSON-LD LocalBusiness schema on this page.

---

## 6. FREE TOOLS — NPD COUNTER-STRATEGY TABLE

| NPD Tool | Hosted On | Carter Digitals Version | Hosted On |
|---|---|---|---|
| Website SEO Audit | Own domain | Free SEO Audit | Own domain ✅ |
| Website ROI Calculator | Own domain | ROI Calculator | Own domain ✅ |
| Website Cost Calculator | Own domain | Website Cost Calculator | Own domain ✅ |
| Brand Story Builder | Lovable (external ❌) | — | — |
| Website Launch Framework | ClickUp (external ❌) | — | — |
| Website Launch Checklist | GitHub (external ❌) | — | — |
| Hosting Cost Calculator | Own domain | — | Phase 2 |
| Structural Integrity Scanner | Own domain | — | Phase 2 |
| SA Price Checker | Own domain | — | Phase 2 |
| **B-BBEE Score Estimator** | **NPD has NOTHING** | ✅ **Unique to Carter** | **Own domain** |

---

## 7. GLOBAL INTERACTIVE COMPONENTS

### Floating WhatsApp Button
```jsx
// Position: fixed bottom-right
// z-index: 9999
// WhatsApp green: #25D366
// Icon: Lucide MessageCircle
// Tooltip on hover: "Chat on WhatsApp"
// href: "https://wa.me/27XXXXXXXXX?text=Hi%20Carter%20Digitals%2C%20I%27d%20like%20to%20discuss%20a%20project"
// Pulse ring animation every 10s
// Never hidden — always accessible on all pages, all viewports
```

### Sticky Navigation
```jsx
// Transparent on load → dark (--cd-surface) + backdrop-blur on scroll (>50px)
// Left: Carter Digitals logotype (gold accent on "Digitals")
// Right: Home | About | Services | Pricing | Portfolio | Blog | [Get a Quote button]
// Mobile: hamburger → full-screen dark overlay, menu items stacked
// "Get a Quote" button: gold background, dark text — always the last nav item
// Active page: gold underline indicator
```

### Page Transitions
```jsx
// Framer Motion AnimatePresence
// Fade-up entrance: y: 20 → 0, opacity: 0 → 1, duration: 0.35s
// Exit: opacity: 1 → 0, duration: 0.2s
```

### Scroll Reveal System
```jsx
// All section H2s, all cards, all stat blocks use:
// whileInView={{ opacity: 1, y: 0 }}
// initial={{ opacity: 0, y: 30 }}
// transition={{ duration: 0.5, ease: "easeOut" }}
// viewport={{ once: true, margin: "-100px" }}
// Stagger children using variants with staggerChildren: 0.1
```

### Custom Cursor (Desktop only)
```jsx
// Small gold dot (12px) following mouse
// Enlarges to 40px ring on hover over links, buttons, cards
// Blend mode: difference on light surfaces
// Disabled on mobile/touch devices via pointer media query
```

---

## 8. SEO REQUIREMENTS

### Per-Page Essentials
- Unique `<title>` and `<meta name="description">` — NEVER duplicate
- One `<h1>` per page — includes primary keyword + location
- Heading hierarchy: H1 → H2 → H3 (no skipping)
- All internal links use descriptive anchor text (no "click here")
- All images: alt text, explicit width/height, WebP format
- robots.txt and sitemap.xml auto-generated by Next.js

### JSON-LD Schema — Homepage & Contact

```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Carter Digitals (Pty) Ltd",
  "url": "https://www.carterdigitals.co.za",
  "telephone": "+27XXXXXXXXX",
  "email": "info@carterdigitals.co.za",
  "founder": {
    "@type": "Person",
    "name": "Kabelo Kadiaka"
  },
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "[Gee's address]",
    "addressLocality": "Soshanguve",
    "addressRegion": "Pretoria, Gauteng",
    "postalCode": "0152",
    "addressCountry": "ZA"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": -25.5269,
    "longitude": 28.0981
  },
  "priceRange": "R7950 - R50000",
  "description": "Carter Digitals is a 100% Black-owned B-BBEE Level 1 digital agency based in Soshanguve, Pretoria. We build premium SME websites, business dashboards, and internal tools using Next.js and Google Cloud Platform.",
  "areaServed": ["Soshanguve", "Pretoria", "Centurion", "Tshwane", "Gauteng"],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Web Design & Business Tools",
    "itemListElement": [
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "SME Website Design" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Business Dashboard Development" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "SEO Services Pretoria" } }
    ]
  }
}
```

### Core Web Vitals Targets
| Metric | Target | Notes |
|---|---|---|
| LCP | < 2.5s | Hero image: preload + priority |
| FID/INP | < 100ms | No blocking scripts |
| CLS | < 0.1 | All images have explicit dimensions |
| TTFB | < 600ms | Vercel Edge serves pre-rendered pages |
| Lighthouse Desktop | ≥ 92 | Measure before launch |
| Lighthouse Mobile | ≥ 82 | SA mobile data constraints matter |

---

## 9. ALL CONFIRMED COPY & CONTACTS

| Field | Data |
|---|---|
| Agency Name | Carter Digitals (Pty) Ltd |
| Founder | Kabelo "Gee" Kadiaka |
| Origin | Block L, Soshanguve, Pretoria |
| Agency named after | Carter — passed April 2021 |
| B-BBEE Status | Level 1, 100% Black-Owned |
| Colleague noted | Figo (shared Carter's story) |
| Primary Services | SME Websites + Business Dashboards |
| Tech Stack | Next.js, Firebase, GCP, Vertex AI, Sanity |
| Website domain | carterdigitals.co.za |
| Starting price (websites) | R7,950 |
| Starting price (dashboards) | R15,000 |

**⚠️ COLLECT BEFORE LAUNCH:**
- [ ] Gee's WhatsApp number for floating button + forms
- [ ] Full physical address (street number, Soshanguve)
- [ ] Company registration number (Pty Ltd)
- [ ] B-BBEE certificate — scan as WebP for About page
- [ ] 3 real client testimonials — names, business, quotes
- [ ] Portfolio images for SOS + Direla Bakgatla (with permission)
- [ ] Professional photo of Gee for About page hero
- [ ] Carter photo or memorial graphic (with consent)

---

## 10. BLOG CONTENT — LAUNCH POSTS (5 ARTICLES)

Target 1,200–1,800 words each. Publish through Sanity. All must be unique, no thin content.

| # | Title | Primary Keyword | Intent |
|---|---|---|---|
| 1 | "How Much Does a Website Cost in Pretoria in 2026?" | web design prices Pretoria | Commercial |
| 2 | "Why Your Soshanguve Business Needs a Website in 2026" | web design Soshanguve | Local |
| 3 | "What is a B-BBEE Level 1 Web Design Agency — and Why It Matters for Your Procurement" | B-BBEE web design agency | Unique — no competitor targets this |
| 4 | "WordPress vs Next.js: The Honest Answer for South African SMEs" | Next.js web design South Africa | Commercial |
| 5 | "Business Dashboards for SMEs: What They Cost and Who Needs One" | business dashboard Pretoria | Commercial |

---

## 11. "WHAT PREMIUM MEANS" — DO NOT & DO LIST

### ❌ DO NOT:
- Serve the same HTML content on more than one page (learned from Yireh's catastrophe)
- Use a white background on ANY page
- Use Inter, Arial, Roboto, or Lato as primary font
- Use stock photos of white hands at keyboards or Sandton skylines
- List 29+ services in a dropdown — max 6 nav items
- Call it "affordable" in headlines (signals cheap)
- Host any free tools on external platforms (Lovable, ClickUp, GitHub)
- Say "10 years experience" unless it's provably true
- Hide pricing behind "contact us for a quote" as the ONLY option
- Use a slider/carousel plugin — use CSS scroll-snap instead
- Run Google Ads before the site has 90+ Lighthouse score

### ✅ DO:
- Every page has a unique H1, unique meta, unique body copy — always
- WhatsApp button on EVERY page, every viewport — no exceptions
- Show the B-BBEE Level 1 badge above the fold on the homepage
- Name the founder — "Founded by Kabelo 'Gee' Kadiaka in Soshanguve"
- Show Carter's tribute — this story is irreplaceable competitive differentiation
- Price table on /pricing: real numbers, not "contact us"
- 5 blog posts live at launch — not "coming soon"
- Google Maps embed on /contact — local SEO trust signal
- All free tools hosted on carterdigitals.co.za — not external platforms
- B-BBEE Score Estimator at launch — first mover advantage is everything
- Lighthouse ≥ 90 desktop before going live — SA mobile data constraints mean performance IS the product
- Request a Google review from every client immediately after project delivery

---

## 12. DEPLOYMENT

| Layer | Detail |
|---|---|
| Hosting | Vercel — free tier, custom domain |
| Domain | carterdigitals.co.za |
| Branch strategy | main → production auto-deploy |
| Preview URLs | Vercel preview per PR — send to Gee for approval |
| CMS | Sanity Studio → studio.carterdigitals.co.za |
| Forms | Resend (free: 3,000 emails/month) |
| Analytics | GA4 → Google Analytics property |
| Performance monitoring | Vercel Speed Insights (built-in) |
| SSL | Automatic (Vercel) |

---

## 13. HEAD-TO-HEAD: CARTER vs NPD

| Battleground | NPD | Carter | Edge |
|---|---|---|---|
| Physical Pretoria presence | ❌ East London | ✅ Soshanguve | **Carter** |
| B-BBEE Level 1 | ❌ Not found | ✅ | **Carter** |
| Tech stack | WordPress | Next.js + GCP + Firebase | **Carter** |
| Custom dashboards | ❌ Not offered | ✅ Core service | **Carter** |
| Free tools (own domain) | 6/9 own domain | All own domain | **Carter** |
| B-BBEE procurement tool | ❌ Nothing | ✅ Unique | **Carter** |
| Emotional brand story | Generic "vision" | ✅ Carter tribute | **Carter** |
| Navigation clarity | 29+ items | 6 items | **Carter** |
| Company age honesty | "10 years" / reg 2023 | Transparent | **Carter** |
| WhatsApp CTA | ❌ Not found | ✅ | **Carter** |
| Google reviews | 107 ★★★★★ | 0 at launch | **NPD (for now)** |
| Content volume | 30+ pages | 15 at launch | **NPD** |
| National reach | ✅ Established | Pretoria-focused initially | **NPD** |
| Blog domain structure | /wp/ (split authority) | /blog (integrated) | **Carter** |

**Carter wins 11 of 14 categories at launch.** The 3 NPD wins (reviews, content, national reach) are all solved by time and consistent client work — not by technical or strategic failure.

---

*Build prompt v2.0 compiled by Carter Digitals Intelligence Pipeline — May 2026*
*Based on full crawl of newperspectivestudio.co.za (6 pages) + market analysis*
