# Task: Build Interactive Calculator Tools for Carter Digitals

## Completed Work

### 1. Website Cost Calculator (`src/components/website-cost-calculator.tsx`)
- Section ID: `website-cost-calc`
- Built with 'use client', framer-motion animations, shadcn/ui components
- Features:
  - Slider for Number of pages (1-20) with gold thumb and track styling
  - Checkboxes for 6 features (Blog, Online Booking, E-commerce, Staff Portal, WhatsApp, Google Ads)
  - Radio group for timeline (Urgent +30%, Standard base, Flexible -10%)
  - Live calculation with animated output
  - Price formula: R7,950 base (5 pages) + R800/additional page + feature costs + timeline multiplier
  - Display: "Estimated: R[X] – R[Y]" with ±15% range
  - Best matching package: Starter/Business/Growth/Custom
  - CTA: "Get exact quote →" linking to #contact
  - Dark theme styling: gold accents, glass-card backgrounds, font-mono for numbers

### 2. B-BBEE Calculator (`src/components/bbbee-calculator.tsx`)
- Section ID: `bbbee-calc`
- Built with 'use client', framer-motion animations, shadcn/ui components
- Features:
  - Project budget input with R prefix
  - B-BBEE level dropdown (Level 1-8 + Non-compliant)
  - Procurement element selection (General 135%, Supplier Dev 125%, Enterprise Dev 110%)
  - Qualifying spend calculation: budget × multiplier
  - Animated results display with gold numbers
  - Carter Digitals status badges (Level 1, 100% Black-Owned, Qualifying Supplier)
  - CTA: "Start a project with a qualifying supplier" linking to #contact

### 3. Updated FreeTools Component
- Added `href` property to tool cards
- Website Cost Calculator → `#website-cost-calc`
- B-BBEE Score Estimator → `#bbbee-calc`

### 4. Updated page.tsx
- Imported both calculator components
- Placed them between FreeTools and CarterStory sections

## Design System Applied
- Background: #080808, Surface: #111111, Border: #242424
- Gold accent: #C9A84C, Gold light: #E8CA7A, Gold dim: #7A6330
- Text: #F0EFE8, Muted: #888880, Dim: #555550
- Glass-card styling with backdrop-blur
- Font-mono for all numbers/currency
- Framer-motion animations for value changes and mount

## Bug Fix
- Fixed `BBBEE_LEVELS` → `BBEE_LEVELS` naming inconsistency in bbbee-calculator.tsx
