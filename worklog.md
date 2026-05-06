# Carter Digitals — Project Worklog

## Session: Image + Gradient + Typography + Mobile Upgrade

### Project Status
- Next.js 16 with App Router, dark aesthetic (#080808), gold accent (#C9A84C)
- All 5 uploaded images integrated into homepage
- Extended color palette added: emerald, cyan, violet, rose, amber, teal, indigo
- Bigger headings with gradient text and shadow effects
- Gradient backgrounds and glassmorphism cards across all sections
- Mobile optimization pass completed
- ESLint: 0 errors | HTTP 200 on / | Dev server compiling clean

### Completed Changes

#### Task 1: Copy Images to Public
- `/hero-banner.png` — Cinematic hero banner (1.8MB)
- `/email-marketing-banner.png` — Email marketing header (1.8MB)
- `/social-media-ad.png` — Social media advertisement (2MB)
- `/pitch-deck-cover.png` — Sales pitch deck cover (2MB)
- `/team-photo.png` — Team photo (6.2MB)

#### Task 2: globals.css — Extended Color Palette + Design System
- Added 10 new color tokens: emerald, violet, rose, cyan, amber, orange, teal, indigo
- Added gradient text classes: `gold-gradient-text`, `rainbow-gradient-text`, `emerald-gradient-text`, `cyan-gradient-text`, `violet-gradient-text`, `rose-gradient-text`
- Added heading shadow classes: `heading-shadow`, `heading-shadow-lg`, `heading-shadow-emerald`, `heading-shadow-cyan`
- Added card shadow classes: `card-shadow-gold`, `card-shadow-emerald`, `card-shadow-cyan`, `card-shadow-violet`
- Added colored glass card classes: `glass-card-emerald`, `glass-card-cyan`, `glass-card-violet`, `glass-card-rose`
- Added aurora background: `aurora-bg` (multi-color radial gradient)
- Added gradient border: `gradient-border` (animated gold→cyan→violet)
- Added image overlay gradient: `image-overlay-gradient`
- Added neon line: `neon-line` (animated gradient line)
- Added floating orb keyframes: `float-orb-1`, `float-orb-2`, `float-orb-3`
- Increased type scale: hero `clamp(3rem, 7vw, 7rem)`, h1 `clamp(2.5rem, 5vw, 4.5rem)`, h2 `clamp(2rem, 3.5vw, 3rem)`
- Added gradient-shift animation for multi-color gradient text

#### Task 3: Hero — Cinematic Banner + Gradient Heading
- Added `/hero-banner.png` as semi-transparent background image (Next.js Image with fill)
- Dark overlay gradient over banner
- 4 floating aurora orbs (gold, cyan, violet, emerald) with CSS animations
- Main heading uses `gold-gradient-text` + `heading-shadow-lg`
- Badge strip has multi-color accents: emerald (B-BBEE), violet (Black-Owned), cyan (CSD), gold (Delivery)
- Gradient border on "See Our Work" CTA button
- Counter cards with individual color schemes
- Neon gradient line at top of hero

#### Task 4: Services — Images + Color Accents
- 3 service cards now show actual images: email-marketing-banner, social-media-ad, pitch-deck-cover
- Each card has unique color accent (gold→emerald→cyan→violet→rose→gold)
- Section heading uses `heading-shadow-lg` + `gold-gradient-text`
- Colored top borders, icon backgrounds, taglines, and shadows per card
- Mobile: single column, proper aspect ratios

#### Task 5: Portfolio — Gradient Overlays + Shimmer Borders
- Section heading: `gold-gradient-text` + `heading-shadow`
- Aurora background on section
- Coming Soon card has animated gradient border (gold→cyan→violet)
- Card shadows with gold accent
- Mobile: single-column layout

#### Task 6a: WhyCarter + CarterStory
- WhyCarter: 4 color-coded cards (emerald, cyan, violet, gold) with matching glass cards and shadows
- CarterStory: team photo added (right side desktop, top mobile), `heading-shadow-lg`, aurora background, floating orbs
- Multi-color keyword highlights in story text

#### Task 6b: Pricing + Testimonials
- Pricing: color-coded tiers (gold, emerald, cyan), gradient prices, B-BBEE box with emerald accents, alternating add-on colors
- Testimonials: `gold-gradient-text` + `heading-shadow`, aurora background

#### Task 7a+8: Navigation + Footer + Contact Form
- Navigation: neon gradient line on scroll, gradient CTA button, gold-gradient logo text, gradient active underlines, gradient mobile menu
- Footer: `heading-shadow-lg` on CTA, aurora background, social hover gold→emerald, alternating contact icon colors, neon-line borders
- Contact Form: `gold-gradient-text` + `heading-shadow`, aurora background, gradient focus borders, gradient submit button

#### Task 10: ImageGallery — Real Images
- Replaced gradient placeholders with actual uploaded images (5 of 6 items)
- Each item has color accent matching its category badge
- Gradient overlay on images, hover scale effect
- View + Details buttons on hover overlay

#### Task 10b: SectionDivider — Gradient Effect
- Left line: gold to cyan gradient
- Center diamond: gold-to-cyan gradient with glow
- Right line: cyan to violet gradient

#### Process + StatsTicker
- Process: colored phase circles (gold, emerald, cyan, violet, rose), `heading-shadow` on heading
- StatsTicker: gradient number text per stat, aurora background, gold card shadow

### Unresolved Issues / Next Phase Recommendations
- Verify all components render correctly via agent-browser QA
- Test mobile layout on actual device simulation
- Consider adding more micro-interactions (hover effects, scroll-triggered animations)
- Potentially add more sections with images (Team section with team-photo)
- Blog preview section could use gradient upgrades
- Process section mobile connecting line could use gradient colors per phase

---

## Session: Pricing Page Separation (Task ID: 1 + 3)

### Project Status
- Pricing section removed from homepage; now lives on dedicated `/pricing` route
- Homepage: no double `<SectionDivider />` elements, clean CompanyTimeline → SectionDivider → FAQ flow
- Pricing page: standalone page with hero banner, Navigation, Footer, and Pricing component
- Both pages return HTTP 200; dev server compiling clean

### Completed Changes

#### Task 1: Remove Pricing from Homepage (`src/app/page.tsx`)
- Removed `import Pricing from '@/components/pricing'` line
- Removed `<SectionDivider />`, `<Pricing />`, `<SectionDivider />` block (3 lines) between CompanyTimeline and FAQ
- Kept a single `<SectionDivider />` between CompanyTimeline and FAQ to avoid double dividers
- Result: CompanyTimeline → SectionDivider → FAQ (clean, no adjacent dividers)

#### Task 3: Create Dedicated Pricing Page (`src/app/pricing/page.tsx`)
- Created server component `page.tsx` with Next.js metadata (title, description, openGraph)
- Created client component `pricing-client.tsx` with:
  - `Navigation` component (top nav bar)
  - Hero banner section with `aurora-bg`, gradient heading "Our Pricing", subtitle, and back-to-homepage link
  - `Pricing` component (full pricing section with small business and school plans)
  - `Footer` component with `mt-auto` for sticky footer behavior
  - `bg-[#080808]` dark theme matching the homepage
  - Framer Motion animations on hero elements (fade-in, slide-up)
  - Responsive design with mobile-first approach

---

## Session: Hero Section Cinematic Redesign (Task ID: 2)

### Project Status
- Hero section completely redesigned with premium cinematic animations
- hero-typing.tsx upgraded with multi-phrase cycling
- ESLint: 0 errors | HTTP 200 on / | Dev server compiling clean

### Completed Changes

#### Task 2a: Upgrade hero-typing.tsx — Multi-Phrase Cycling
- Now cycles through 4 phrases: "Make Money.", "Get Found.", "Close Deals.", "Stand Out."
- Each phrase types in character by character, pauses, then deletes character by character
- Slight random delay variation on each keystroke for natural typing feel
- Smooth cursor blink (530ms interval) with visibility during typing/pausing/deleting
- Infinite looping via ref-based state machine (phase + phraseIndex refs)
- Refactored to avoid lint error: setState calls moved out of direct effect body, using scheduleNext pattern instead
- Configurable props: typeSpeed, deleteSpeed, pauseDuration, initialDelay

#### Task 2b: Complete Hero Redesign — Premium Cinematic Experience

**Visual Design:**
- Full viewport height (`h-screen min-h-[600px]`) — cinematic aspect ratio
- Hero banner image at stronger opacity (0.4 instead of 0.3)
- Multiple layered gradients for depth: primary dark overlay, warm gold color wash (left), cool cyan color wash (right), vignette overlay
- Cinematic letterbox bars at top and bottom with pulsing gold gradient lines
- 35 floating golden particles that drift upward with varying sizes, speeds, and opacities
- Dramatic parallax scrolling on 3 layers: background (150px range), orbs (80px range), content (60px range)
- Content fades out as user scrolls (contentOpacity transforms from 1 to 0)

**Typography:**
- Main heading uses `var(--text-hero)` scale: `clamp(3rem, 7vw, 7rem)` — massive and dramatic
- Gold gradient text with deep shadow effects (`heading-shadow-lg`)
- Pre-heading label with animated reveal (letter-spacing transition + line scale-in)
- Subtitle uses clip-path wipe-in reveal from left to right

**Cinematic Animations (Framer Motion):**
- **Staggered reveal sequence** — elements appear one by one with 0.2s stagger, 0.6s initial delay
- **Scale-up + blur reveal** for heading (0.82 scale + 12px blur → 1.0 scale + 0px blur over 1.4s)
- **Clip-path reveal** for subtitle (inset(0 100% 0 0) → inset(0 0% 0 0) over 1.2s)
- **Ken Burns effect** on background image (scale 1.0 → 1.1 over 20s, then reverse, infinite)
- **3-layer parallax** on scroll — background, orbs, and content all move at different speeds
- **Floating particles** — 35 tiny golden specks drifting upward with random properties
- **Pulse breathing** on primary CTA button (box-shadow oscillates over 3s)
- **Spring slide-in** for badge strip from below (stiffness: 120, damping: 14)
- **Dramatic delayed entrance** for counter row (1.5s delay after main content, staggered per card)
- **Scroll indicator** appears after 2.5s delay with gentle bounce animation

**Color Scheme:**
- Deep cinematic blacks (#080808) and golds (#C9A84C)
- Subtle cyan light accent in top-right color wash
- Emerald orb in mid-left for depth variety
- Neon line at top pulses slowly (opacity 0.4 → 0.8 → 0.4 over 3s)
- Letterbox bars pulse with gold gradient lines

**Layout:**
- Content centered vertically and horizontally within viewport
- CTAs are larger (px-8 py-4 / px-12 py-5 on sm+) with more prominent styling
- Badge strip in refined glass container with max-w-3xl for better proportions
- Counter row feels like end credits with staggered card entrances
- Scroll indicator uses font-mono + tracking-wider for cinematic feel

**Technical:**
- Uses 'use client' directive throughout
- All animations powered by framer-motion
- Next.js Image component for hero banner with priority loading
- Imports HeroTyping from '@/components/hero-typing'
- Fully responsive (mobile-first) with sm: breakpoints
- Scroll handlers use requestAnimationFrame with ticking flag and passive listeners
- will-change-transform on parallax layers for GPU acceleration
- Performance-optimized: useMemo for particle generation, useCallback for handlers
- IntersectionObserver for AnimatedCounter instead of useInView
- Section ref for scroll-linked transforms

---
Task ID: 1-5
Agent: main
Task: Remove pricing from homepage, create pricing page, redesign Hero, upgrade animations

Work Log:
- Removed Pricing import and component from homepage (page.tsx)
- Created /pricing route with dedicated page (page.tsx + pricing-client.tsx)
- Pricing page has its own hero banner with gradient heading, navigation, and footer
- Completely redesigned Hero section (575 lines) with:
  - Ken Burns effect on background image (slow zoom 1.0→1.1 over 20s)
  - 8 visual layers: banner, gradients, aurora orbs, particles, grid, grain, letterbox bars, neon line
  - 35 floating golden particles drifting upward
  - Cinematic letterbox bars at top/bottom with breathing opacity
  - Scale-up + blur reveal for heading (0.82→1.0 scale, 12px→0px blur)
  - Clip-path wipe-in for subtitle
  - 3-layer parallax on scroll (background 150px, orbs 80px, content 60px)
  - Pulse breathing on primary CTA
  - Spring slide-in for badge strip
  - Dramatic delayed counter entrance (1.5s)
  - Scroll-linked content fade-out
- Upgraded hero-typing.tsx with multi-phrase cycling:
  - "Make Money." → "Get Found." → "Close Deals." → "Stand Out."
  - Type → Pause → Delete → Next flow with natural typing jitter
  - Smooth cursor blink at 530ms
- Upgraded animations across ALL key components:
  - WhyCarter: scale+blur reveal (0.95→1.0, blur 8px→0px), longer stagger
  - Services: scale+blur reveal (0.96→1.0, blur 6px→0px), cinematic ease
  - Portfolio: scale+blur reveal (0.95→1.0, blur 6px→0px)
  - Process: scale+blur reveal (0.95→1.0, blur 6px→0px)
  - ImageGallery: scale+blur reveal (0.95→1.0, blur 6px→0px)
  - Pricing: scale+blur reveal (0.96→1.0, blur 6px→0px)
  - All section headers: scale+blur reveal with [0.16, 1, 0.3, 1] ease (expo out)
  - All using cinematic easing [0.16, 1, 0.3, 1] instead of basic ease

Stage Summary:
- Homepage: Pricing removed, clean flow
- /pricing: Dedicated page with hero + full pricing component
- Hero: Completely redesigned with cinematic 8-layer visuals + sophisticated animations
- All animations upgraded to cinematic scale+blur reveals with expo-out easing
- ESLint: 0 errors | HTTP 200 on both / and /pricing | Dev server compiling clean

---

## Session: Cinematic Animation CSS System (Task ID: 5)

### Project Status
- globals.css expanded with 10 new cinematic keyframes, 12 utility classes, 5 section transition classes, 3 glass effect enhancements, and 3 pricing-specific styles
- Build compiles cleanly with 0 errors
- All new content appended to end of existing file (no overwrites)

### Completed Changes

#### Task 5: Cinematic Animation Keyframes + CSS Effects

**10 New Keyframes:**
1. `cinematic-reveal` — Fade up from below with slight scale (0.96→1.0) + blur dissolve (6px→0px)
2. `shimmer-sweep` — Light sweep across element (skewed -15°, translateX -100%→200%)
3. `rotate-gradient` — Rotating gradient angle (0→360deg) via CSS custom property `--gradient-angle`
4. `pulse-ring` — Expanding ring effect (scale 0.8→1.3 with opacity fade)
5. `cursor-blink` — Smooth typewriter cursor blink (visible 0-45%, hidden 50-100%)
6. `float-gentle` — Subtle floating with micro-rotation (±0.5deg, -10px max lift)
7. `slide-in-left` — Slide from left with blur dissolve (-60px→0, 4px→0 blur)
8. `slide-in-right` — Slide from right with blur dissolve (60px→0, 4px→0 blur)
9. `scale-reveal` — Scale from center with fade + blur (0.85→1.0, 8px→0 blur)
10. `shake-subtle` — Micro interaction feedback (±2px shake, 4 steps)

**12 New Utility Classes:**
- `.cinematic-reveal` — Uses cinematic-reveal keyframe (0.9s expo-out)
- `.shimmer-sweep` — Card shimmer on hover (gold-tinted pseudo-element sweep)
- `.rotating-gradient-border` — Conic gradient border (gold→cyan→violet→rose) rotating 360°/4s
- `.pulse-ring` — Expanding gold ring pulse on CTAs
- `.float-gentle` — 6s gentle floating animation
- `.slide-in-left` / `.slide-in-right` — 0.8s directional slide reveals
- `.scale-reveal` — 0.9s scale reveal from center
- `.premium-card-hover` — Lift (-4px), scale (1.02), gold border glow, deep shadow, 0.4s transition
- `.magnetic-hover` — Subtle magnetic feel hover (translateY -2px, scale 1.01)
- `.text-reveal-mask` — Clip-path wipe-in reveal (inset 100%→0%)
- `.stagger-1` through `.stagger-6` — Animation delays 0.1s→0.6s

**5 Section Transition Classes:**
- `.section-cinematic-in` — Entrance animation (translateY 40px, scale 0.97, blur 4px → reset, triggered by `.is-visible`)
- `.section-cinematic-out` — Exit animation (triggered by `.is-exiting`, subtle reverse)
- `.parallax-slow` / `.parallax-medium` / `.parallax-fast` — will-change: transform, ready for JS parallax

**3 Glass Effect Enhancements:**
- `.glass-card-premium` — 24px blur, gold tint, animated border on hover, premium shadow
- `.glass-card-floating` — Glass card with 8s float-gentle animation
- `.glass-card-highlight` — Gold glow highlight behind card (40px→60px on hover)

**3 Pricing-Specific Styles:**
- `.pricing-card-featured` — Animated conic gradient border (gold→cyan→violet), scale(1.02) on lg+, premium shadow + gold glow
- `.pricing-toggle` — Toggle switch styling with role="switch" support, gold accent when active, smooth knob slide
- `.price-animate` — Smooth price number transition with `.changing` state (opacity 0, translateY -8px, scale 0.95)

**Design Tokens Used:**
- Color scheme: Dark (#080808) with gold (#C9A84C), emerald (#34D399), cyan (#22D3EE), violet (#A78BFA), rose (#FB7185)
- Easing: `cubic-bezier(0.16, 1, 0.3, 1)` (expo-out) for all cinematic animations
- CSS custom property `--gradient-angle` used for conic gradient rotation

Stage Summary:
- Build: ✓ Compiled successfully, 0 errors, all routes (/, /pricing) generated
- File: globals.css grew from 887 lines to 1371 lines (+484 lines of new CSS)
- No existing content was modified or overwritten

---

## Session: Premium Pricing Page Redesign (Task ID: 4)

### Project Status
- Pricing page completely rewritten with premium, cinematic, sophisticated design
- pricing-client.tsx: 580+ lines with cinematic hero, toggle, comparison tables, guarantee, FAQ, CTA
- pricing.tsx: 480+ lines with enhanced PricingCard, animated borders, shimmer badges, price animations, stagger checkmarks, ribbon effect, glass add-ons
- ESLint: 0 errors | HTTP 200 on /pricing | Dev server compiling clean

### Completed Changes

#### pricing-client.tsx — Premium Pricing Page

**Cinematic Hero Banner:**
- 4 animated gradient orbs (gold, cyan, violet, emerald) with floating motion using framer-motion
- Scan lines overlay (repeating-linear-gradient at 4px intervals, 3% opacity)
- Grain overlay (SVG feTurbulence noise filter, 3.5% opacity)
- 24 floating sparkle/star particles (random sizes, durations, delays, opacities)
- Neon line at top of hero
- Scale-up + blur reveal for heading (0.96→1.0 scale, 8px→0px blur)
- All animations use cinematic easing [0.16, 1, 0.3, 1]

**Pricing Toggle:**
- Once-off / Monthly Retainer toggle with animated sliding indicator (layoutId="billingToggle")
- Spring animation for toggle (stiffness: 300, damping: 25)
- Contextual label under toggle showing billing mode description
- billingMode state passed down to Pricing component

**Comparison Table Section:**
- Side-by-Side Comparison section with glass-card tables
- Business compare: 15-row table with Vula/Khula/Elevate columns
- School compare: 15-row table with Presença/Ikredibo/Mastery columns
- Expandable via AnimatePresence with height animation
- Color-coded column headers (gold-gradient-text, emerald-gradient-text, cyan-gradient-text)
- Custom CellValue renderer: green ✓ for true, — dash for false, text for string values
- Highlighted Khula/Ikredibo column with subtle emerald background

**Money-Back Guarantee Section:**
- Glass-card-gold container with shimmer sweep overlay
- Shield icon in gold circle with scale+blur reveal
- "Money-Back Guarantee" gold-gradient heading
- Trust messaging with 3 green checkmark items (Full deposit refund, No questions asked, Zero risk)
- Auraura background

**FAQ Accordion Section:**
- 8 pricing-specific FAQ items using Radix Accordion
- Glass-card styling on each item with gold border on open state
- Questions: payment methods, switching plans, hosting renewal, NGO discounts, delivery time, money-back guarantee, B-BBEE explanation, add-on features
- Scale+blur reveal for section header

**CTA Section:**
- "Ready to Get Started?" with heading-shadow-lg
- Dual CTA: Start Your Project (gold gradient button) + WhatsApp chat link
- Aurora background with gold glow orb

**Sticky Footer:**
- mt-auto on Footer wrapper for proper sticky footer behavior

#### pricing.tsx — Enhanced Pricing Component

**Enhanced PricingCard:**
- Animated gradient border on hover: conic-gradient that rotates using requestAnimationFrame + gradientAngle state
- Rotating gradient uses accent colors (gold→emerald, emerald→cyan, cyan→violet)
- Shimmer/shine animation on "MOST POPULAR" badge: gold-shimmer keyframe overlay with 2.5s cycle
- AnimatedPrice component: AnimatePresence with mode="wait" for smooth price transitions
  - Enters: opacity 0→1, y 12→0, blur 4px→0px
  - Exits: opacity 1→0, y 0→-12, blur 0px→4px
  - Price text enlarged to text-4xl/text-5xl for better visual hierarchy
- Feature checkmarks with stagger animation (0.06s delay per item, custom variant)
- Ribbon effect on highlighted card: "BEST VALUE" ribbon with clipPath polygon
- Star icon next to highlighted plan name with emerald fill
- Zap icon for "Best Value" note

**Billing Mode Integration:**
- billingMode prop ('onceoff' | 'retainer') passed from parent
- AnimatedPrice shows once-off price or retainer price with animated transition
- Contextual note below price switches between "Optional retainer" and "Once-off alternative"
- Section subheaders update text based on billing mode

**Better Add-ons Section:**
- Glass card treatment per add-on (glass-card-gold, -emerald, -cyan, -violet, -rose)
- Icons for each add-on: Bot, Search, Presentation, Server, Database
- Icon in colored rounded container (8×8 with bg-[rgba(255,255,255,0.04)])
- Hover lift effect (-2px translateY + shadow)
- Staggered entrance animation per card

**B-BBEE Box Enhancement:**
- Shimmer sweep overlay (8s gold-shimmer animation)
- Scale+blur reveal animation (0.97→1.0 scale, 6px→0px blur)

**All Animations:**
- Cinematic easing [0.16, 1, 0.3, 1] throughout
- Scale+blur reveals for section headers
- Container stagger (0.12s per child, 0.15s initial delay)
- Card variants: 40px y-offset, 0.96 scale, 6px blur → reset over 0.8s

Stage Summary:
- /pricing: Complete premium redesign with 7 new sections (hero, pricing, comparison, guarantee, FAQ, CTA, footer)
- PricingCard: 6 major enhancements (rotating border, shimmer badge, animated price, stagger checkmarks, ribbon, glass add-ons)
- All plan data preserved: Vula R3,999/R399, Khula R7,999/R799, Elevate R14,999/R1,199, Presença R4,999/R499, Ikredibo R9,999/R899, Mastery R18,999/R1,499
- ESLint: 0 errors | HTTP 200 on /pricing | Dev server compiling clean

---

## Session: Hydration Fix + Hero Redesign + Pricing Upgrade + Cinematic Animations (Task IDs: 1-5)

### Project Status
- Fixed critical hydration mismatch error caused by Math.random() in FloatingParticles (server vs client values)
- Hero section completely rewritten with deterministic particle system, mouse parallax, cinematic light rays, scan lines
- Pricing page and component completely rewritten with premium features (toggle, comparison tables, FAQ, guarantee)
- 484 lines of cinematic CSS animations added to globals.css
- ESLint: 0 errors | HTTP 200 on / and /pricing | Dev server compiling clean

### Completed Changes

#### Task 1: Fix FloatingParticles Hydration Mismatch
**Root Cause:** Math.random() calls in hero.tsx FloatingParticles generated different values on server vs client, causing React hydration mismatch warnings.

**Fix Applied:**
- Replaced all Math.random() with deterministic seeded random (Math.sin formula)
- Moved particle data to module-level constant for SSR/client consistency
- Fixed same issue in pricing-client.tsx FloatingSparkles
- Removed Math.random() from hero-typing.tsx typing delay

#### Task 2: Remove Pricing from Homepage (already done)
- Confirmed Pricing component not present on homepage

#### Task 3: Hero Section Premium Cinematic Redesign
- Mouse parallax tracking (spring physics on orb layer)
- Cinematic Light Rays (central burst + horizontal/vertical streaks)
- Scan Lines overlay for film effect
- 5 aurora gradient orbs (added rose orb)
- 40 deterministic particles (seeded random)
- Enhanced parallax (4 depth layers)
- Premium scroll indicator (mouse icon with animated dot)
- Staggered badge animations
- Enhanced counter animations with accent lines

#### Task 4: Premium Pricing Page Upgrade
- Cinematic hero with gradient orbs, scan lines, grain, sparkles
- Pricing toggle (Once-off / Monthly Retainer) with spring animation
- Expandable comparison tables (15 rows each)
- Money-Back Guarantee section
- FAQ accordion (8 questions)
- CTA section (Start Project + WhatsApp)
- Rotating gradient borders on card hover
- Shimmer badges, animated prices, stagger checkmarks
- Glass card add-ons with icons

#### Task 5: Cinematic Animation CSS System
- 10 new keyframes, 12 utility classes, 5 section transitions
- 3 glass effect enhancements, 3 pricing-specific styles
- +484 lines appended to globals.css

### Unresolved Issues / Next Phase Recommendations
- Other pages (/about, /portfolio, /contact, /blog) return 404
- Consider upgrading other homepage components with new cinematic animation classes
- Test mobile layout on actual device simulation
- Consider IntersectionObserver-based scroll animations
