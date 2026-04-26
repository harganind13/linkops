# LinkOps — Landing Page PRD

## Original Problem Statement
Build a modern, high-authority landing page for **LinkOps** (B2B connector / outbound agency) that emphasizes tangible ROI and business growth, mirroring the minimalist, high-end design of the Cassis template.

## User Choices
- Theme: **Dark mode primary** (executive, premium feel)
- Accent color: **Electric green** (#6BE05A — matches uploaded brand logo)
- CTAs: open contact form modal (saves to MongoDB)
- Logo: user-provided LinkOps logo (white wordmark + green icon)

## Architecture
- **Backend**: FastAPI + Motor (async MongoDB), `/api` prefix
  - `POST /api/leads` — saves contact submissions (name, email, company, message, source)
  - `GET /api/leads` — list submissions
  - Pydantic `EmailStr` validation
- **Frontend**: React 19 + Tailwind + shadcn/ui + recharts + sonner + lucide-react
  - Single page at `/` composed of: Header, Hero, Impact, Framework, Proof, Advantage, FinalCTA, Footer
  - ContactModal (Radix Dialog) shared across all 4 CTAs
  - IntersectionObserver scroll-reveal animations
  - Recharts mini line chart for hero "Qualified Opportunities" trend

## User Personas
- **Revenue leaders** at Series A → Enterprise B2B companies looking for predictable outbound pipeline
- **Sales executives / COOs** who want to replace volatile agency retainers with a system

## Core Requirements (static)
- Cassis-inspired minimalist executive aesthetic (dark, bordered cards, no soft shadows)
- High-contrast statistics (huge electric-green numbers)
- Bento metrics grid (35%, 15+ Hours, 100%, 24/7)
- 4-phase Results Framework (Targeted Intelligence, Narrative Excellence, Seamless Integration, Scalable ROI)
- Social proof with testimonials + 4× ROI case study
- Old-way vs LinkOps-way comparison
- Final CTA "Stop Guessing. Start Closing."
- All interactive elements have `data-testid`

## Implemented (2026-04-26)
- ✅ Backend `/api/leads` POST + GET endpoints with Pydantic validation
- ✅ Header with sticky blur, large LinkOps logo, mobile menu, primary CTA
- ✅ Hero — headline, sub-headline, primary + secondary CTAs, animated trend chart (recharts)
- ✅ Impact bento (4 metric cards) with hover lift + glow
- ✅ Results Framework (4 numbered phase rows)
- ✅ Social Proof — marquee logo strip, 3 testimonials, 4× ROI case study card
- ✅ Why LinkOps — Old way vs LinkOps way comparison
- ✅ Final CTA — massive typography + email fallback
- ✅ Footer — logo, sitemap, legal
- ✅ ContactModal — shadcn Dialog, all fields, sonner success toast, persists to MongoDB
- ✅ Outfit (display) + Manrope (body) fonts
- ✅ Logo sizing iterated (h-32/md:h-40/lg:h-44 in header) per user feedback
- ✅ Backend tests 7/7 passing; frontend Playwright validated all CTAs + modal flow

## Backlog (not yet built)
- **P1**: Admin dashboard at `/admin` to view captured leads
- **P1**: Light-mode toggle (dark currently primary)
- **P2**: Calendar booking integration (e.g., Cal.com / Google Calendar embed)
- **P2**: Resend / SendGrid notification email when a lead submits
- **P2**: SEO meta tags, Open Graph image, sitemap.xml, robots.txt
- **P2**: Animated scroll-spy for nav active state
- **P3**: Blog/insights section
- **P3**: A/B test variants of hero headline
