# RelateEdge — Project Bible

> **Positioning**: Not an "AI proposal generator" — a **tool that helps freelancers get more replies**.

---

## What is RelateEdge?

RelateEdge is a SaaS for freelancers (primarily Upwork) that solves one specific pain:
> Freelancers write proposals → get no replies → don't understand why → copy templates → still doesn't work.

**RelateEdge solves this by**: analyzing + generating + improving + teaching.

---

## Tech Stack

### Frontend
- **Framework**: Next.js 16 (App Router) + React 19 + TypeScript
- **Styling**: Tailwind CSS v4 (`@import "tailwindcss"` syntax — NOT v3)
- **Font**: Inter (Google Fonts, loaded via `next/font/google`)

### Backend (planned)
- **Database + Auth**: Supabase
- **AI**: OpenAI API (generation, analysis, insights)
- **Payments**: Stripe or Lemon Squeezy
- **Analytics**: PostHog

---

## Design System

### Color Palette (defined in `globals.css` via `@theme`)
```css
--color-primary:   #4F46E5  /* Indigo — main CTA, buttons */
--color-secondary: #7170B6  /* Soft purple — secondary actions */
--color-tertiary:  #A54100  /* Burnt orange — accents/warnings */
--color-neutral:   #64748B  /* Slate — muted text, nav links */
```

### Typography
- Font: **Inter** (variable weight 100–900)
- Applied via `font-sans` class on `<html>`

### Component Conventions
- **ButtonLink** (`components/Button.tsx`): Link-based button with 3 variants (`primary`, `secondary`, `tertiary`), shimmer hover animation, `rounded-xl`
- **Header** (`components/Header.tsx`): Max-width `1440px`, centered, `xl:px-0 px-4`
- **Max content width**: `1440px` / `1444px` — keep consistent at `1440px`
- **Border radius**: `rounded-xl` for cards/buttons
- **Shadow**: `shadow-md` on interactive elements

### Aesthetic Direction
- Clean, modern SaaS feel
- **No dark mode yet** — light theme first
- Subtle micro-animations (shimmer on buttons)
- Professional but not corporate

---

## Project Structure

```
relateedge/
├── app/
│   ├── globals.css        # Tailwind v4 + design tokens (@theme)
│   ├── layout.tsx         # Root layout with Header
│   └── page.tsx           # Landing page (/)
├── components/
│   ├── Button.tsx         # ButtonLink component (variants: primary/secondary/tertiary)
│   └── Header.tsx         # Top navigation
├── public/
│   └── icons/logo.svg     # Logo
└── CLAUDE.md              # This file
```

### Planned Route Structure
```
app/
├── (public)/
│   ├── page.tsx              # / — Landing
│   └── pricing/page.tsx      # /pricing
├── (auth)/
│   ├── login/page.tsx
│   └── register/page.tsx
└── (dashboard)/
    ├── dashboard/page.tsx
    ├── proposal/
    │   ├── new/page.tsx      # Job input → generate
    │   └── result/page.tsx   # Show generated proposal
    ├── proposals/page.tsx    # History
    ├── tracker/page.tsx      # Sent / Replied / Hired
    ├── analytics/page.tsx    # Insights
    └── profile-analysis/page.tsx
```

---

## Core Features (MVP Priority Order)

### 🔥 MUST HAVE — Ship first
1. **Proposal Generator** — user pastes job description → gets ready proposal + hooks
2. **Result Screen** — displays proposal, hooks, structured text + Copy button
3. **Simple Auth** — login/register (Supabase)

### ⚡ NICE TO HAVE — After first users
4. **Proposal Score** — hook strength, personalization, clarity, specificity → score out of 100
5. **Job Analyzer** — client quality, win chance, red flags (shown before generation)
6. **Proposal Tracker** — sent / replied / interview / hired → reply rate, success rate
7. **Insights** — "short proposals get more replies", "this hook type converts better"

### 🚫 DO NOT BUILD NOW
- Team features
- Browser extension
- API integrations
- Complex custom analytics

---

## Core User Flow

```
Job Description (paste)
    → Job Analyze (client quality, red flags, win chance)
    → Generate Proposal (hook + body + CTA)
    → Score (82/100 with breakdown)
    → Copy & Send
    → Track (sent → reply → interview → hired)
    → Insights (learn what works)
```

---

## Tailwind v4 Notes — IMPORTANT

This project uses **Tailwind CSS v4** which has breaking changes from v3:

- Config is in `globals.css` via `@theme {}` block — NOT `tailwind.config.js`
- Import: `@import "tailwindcss"` — NOT `@tailwind base/components/utilities`
- Custom colors accessed as: `bg-primary`, `text-neutral` etc. (no need for `theme()`)
- PostCSS plugin: `@tailwindcss/postcss` — NOT `tailwindcss` directly

---

## Next.js 16 Notes — IMPORTANT

- Uses **App Router** exclusively — no Pages Router
- Check `node_modules/next/dist/docs/` for API changes before coding
- `next/font/google` is used for Inter — do NOT use `@import` from Google Fonts in CSS for font loading (already done in layout.tsx)
- Server Components by default — add `'use client'` only when needed

---

## Key Principles

1. **Ship fast** — MVP in 3–5 days, real users before perfection
2. **One core value** — proposal that gets a reply. Everything else is secondary.
3. **No bloat** — if it doesn't help a freelancer get a reply, don't build it now
4. **Copy button always visible** — the CTA is always "copy and use this"
5. **Show the value immediately** — user sees a better proposal within seconds
