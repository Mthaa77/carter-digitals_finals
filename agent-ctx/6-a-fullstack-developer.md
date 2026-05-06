# Task 6-a: Upgrade why-carter.tsx and carter-story.tsx

## Work Completed

### why-carter.tsx
- Section heading: `gold-gradient-text heading-shadow` + `fontSize: var(--text-h2)`
- 4 color-coded cards:
  - Card 01 (Shield/B-BBEE): emerald accent (glass-card-emerald, card-shadow-emerald, emerald left border, emerald icon/bg/tag/dot)
  - Card 02 (Cloud/Enterprise Stack): cyan accent (glass-card-cyan, card-shadow-cyan, cyan left border, cyan icon/bg/tag/dot)
  - Card 03 (LayoutDashboard/Business Tools): violet accent (glass-card-violet, card-shadow-violet, violet left border, violet icon/bg/tag/dot)
  - Card 04 (MapPin/Pretoria Roots): gold accent (glass-card-gold, card-shadow-gold, gold left border, gold icon/bg/tag/dot)
- aurora-bg on section
- 3 floating gradient orbs (emerald, violet, cyan)
- Permanent colored left borders
- Hover: accent-matched gradient overlay, icon scale, card lift
- Mobile: grid-cols-1 → sm:2 → lg:4

### carter-story.tsx
- Section heading: `gold-gradient-text heading-shadow-lg` + `fontSize: var(--text-h2)`
- Team photo via Next.js Image (/team-photo.png):
  - Desktop: right side, image-overlay-gradient, hover scale+shimmer
  - Mobile: full width above text
- aurora-bg background
- 3 floating gradient orbs (violet, gold, cyan)
- Multi-color keywords: gold ("April 2021", "Carter", "Carter Digitals"), emerald ("living monument"), cyan ("building something real"), violet ("promise kept")
- Since 2021 badge
- Responsive flex layout

### Verification
- ESLint: 0 errors
- Dev server: HTTP 200, compiled successfully
- Work log appended to /home/z/my-project/worklog.md
