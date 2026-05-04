# Task: Build 4 Carter Digitals Components

## Summary
Built 4 production-ready dark-themed components for the Carter Digitals website following the "Soshanguve Steel" design system.

## Components Created

### 1. Free Tools (`/src/components/free-tools.tsx`)
- Section with "Free Tools for Pretoria Business Owners" heading
- 4 tool cards: Website Cost Calculator, ROI Calculator, Free SEO Audit, B-BBEE Score Estimator
- Horizontal scroll on mobile (scroll-snap), grid on desktop
- B-BBEE card has special gold glow border + UNIQUE badge
- Framer-motion stagger animations
- glass-card styling with hover border transitions

### 2. Carter's Story (`/src/components/carter-story.tsx`)
- Emotional tribute section with #0A0A0A background
- gold-accent-left class for left border accent
- "Carter" highlighted in gold throughout
- Gold gradient divider line above section
- Outline CTA button with gold border

### 3. Pricing (`/src/components/pricing.tsx`)
- 4 pricing cards: Starter (R7,950), Business (R14,500 - highlighted), Growth (R22,000), Dashboard (From R15,000)
- Business card has gold border + MOST POPULAR badge
- B-BBEE Procurement Box with gold left border
- Add-ons grid with 6 items
- All with framer-motion animations

### 4. Blog Preview (`/src/components/blog-preview.tsx`)
- 3 blog post cards with left gold border accent
- Category badges in gold-dim style
- Framer-motion stagger animations
- Read time + CTA links

## Page Integration
- All 4 components wired into `/src/app/page.tsx`
- Lint passes with no errors
- Dev server compiles successfully (200 responses)
