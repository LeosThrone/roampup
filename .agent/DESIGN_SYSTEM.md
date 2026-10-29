# RoamPup Neobrutalism Design System & UI Guide

This document is the definitive design system specification and implementation guide for RoamPup. All future agents, developers, and components must adhere to the conventions documented here to maintain visual consistency, accessibility, and architectural integrity.

---

## 1. Design Philosophy

RoamPup uses a **Neobrutalist** design language adapted for modern travel and navigation:
- **Bold, unapologetic structure**: High-contrast, thick solid borders (`2px`, `2.5px`, `3px`) in deep charcoal/black (`#1b1c1a`).
- **Hard, directional drop shadows**: Crisp zero-blur shadows (`neo-shadow-sm`, `neo-shadow`, `neo-shadow-lg`) that simulate tangible tactile physical stamps and cards.
- **Physical press mechanics**: Interactive elements depress on click (`neo-press`, `neo-press-none`) with tactile translation (`translate-x-0.5`, `translate-y-0.5`).
- **Warm, outdoor-ready palette**: Warm sand/cream background (`#fbf9f6`), electric adventure yellow (`#ffe500` / `#f7cb46`), forest green (`#006d3a` / `#7af8a5`), waypoint teal (`#249e90`), warning error red (`#ba1a1a`), and emergency rescue pink (`#e91e8c`).
- **Clear typographic hierarchy**: Punchy, geometric headlines paired with clean, legible sans-serif body text.

---

## 2. Color Tokens

### Surface & Background
| Token | Hex Value | Usage |
| :--- | :--- | :--- |
| `background` / `surface` | `#fbf9f6` | Default page background, warm off-white canvas |
| `surface-low` | `#f5f3f0` | Subtle container backgrounds, route map canvas |
| `surface-lowest` | `#ffffff` | Pure white card surfaces, input backgrounds |
| `surface-high` | `#eae8e5` | Secondary card fills, muted sections |
| `surface-container` | `#efeeeb` | Metric chips, metadata badges |
| `foreground` / `on-surface` | `#1b1c1a` | Primary text, borders, hard drop shadows |
| `on-surface-variant` | `#4b4731` | Secondary descriptions, subheadings |
| `outline` | `#7d775f` | Secondary icons, inactive navigation text |
| `outline-variant` | `#cec7aa` | Muted dashed borders, inactive filter borders |

### Accents & Indicators
| Token | Hex Value | Usage |
| :--- | :--- | :--- |
| `primary` / `primary-container` | `#ffe500` | Signature brand yellow, active filters, logo box |
| `primary-button-accent` | `#f7cb46` | Primary action button base (hovers to `#ffe500`) |
| `secondary` | `#006d3a` | Verified route checkmarks, GPS signal, origin markers |
| `secondary-container` | `#7af8a5` | Progress bar fill, green pill badge background |
| `teal` | `#249e90` | Fuel & tolls badge, utility indicators |
| `error` | `#ba1a1a` | Form errors, destination markers, alert pills |
| `error-container` | `#ffdad6` | Danger button background, red badge fill |
| `sos-accent` | `#e91e8c` | Emergency SOS button, live active waypoint pulse |

---

## 3. Typography

RoamPup uses two primary Google Fonts loaded via Next.js Font Optimization in `app/layout.tsx`:

### Space Grotesk (`font-headline`)
- **Variable**: `--font-space-grotesk`
- **Class**: `font-headline`
- **Weights**: `500` (medium), `600` (semibold), `700` (bold), `900` (black)
- **Usage**:
  - Page titles: `font-headline font-black text-2xl md:text-3xl lg:text-4xl tracking-tight`
  - Section headers: `font-headline font-black text-xl`
  - Card titles: `font-headline font-black text-lg`
  - Buttons: `font-headline font-bold text-sm`
  - Badges & pills: `font-headline font-black text-xs`
  - Navigation labels: `font-headline font-bold text-xs`

### Plus Jakarta Sans (`font-sans`)
- **Variable**: `--font-plus-jakarta`
- **Class**: `font-sans`
- **Weights**: `400` (regular), `500` (medium), `600` (semibold), `700` (bold)
- **Usage**:
  - Body copy, descriptions, input placeholders, distance/duration stats, itinerary lists.

---

## 4. Shadow, Border & Texture Conventions

Defined in `app/globals.css`:

### Neobrutalist Hard Shadows
```css
.neo-shadow-sm {
  box-shadow: 2px 2px 0px #1b1c1a;
}
.neo-shadow {
  box-shadow: 4px 4px 0px #1b1c1a;
}
.neo-shadow-lg {
  box-shadow: 6px 6px 0px #1b1c1a;
}
```

### Physical Press Interactions
```css
.neo-press:active {
  transform: translate(2px, 2px);
  box-shadow: 1px 1px 0px #1b1c1a;
}
.neo-press-none:active {
  transform: translate(3px, 3px);
  box-shadow: 0px 0px 0px #1b1c1a;
}
```

### Texture: Dot Matrix
```css
.bg-dot-matrix {
  background-image: radial-gradient(#1b1c1a 1.2px, transparent 1.2px);
  background-size: 20px 20px;
}
```
> **Rule**: Dot matrix is reserved for auth page backgrounds, hero banners, and mini-map graphic placeholders. It must **not** be applied as the full background of the main `(app)` layout.

---

## 5. Shared UI Components (`components/ui/`)

### `NeoButton`
Customizable neobrutalist button supporting 4 variants and 3 sizes. Supports standard `<button>` attributes and an optional `icon` slot.

```tsx
import { NeoButton } from "@/components/ui/NeoButton";
import { Compass, Play, Trash2 } from "lucide-react";

// Primary action
<NeoButton variant="primary" size="md" icon={<Play className="w-4 h-4" />}>
  Create Trip
</NeoButton>

// Secondary action
<NeoButton variant="secondary" size="sm" icon={<Compass className="w-3.5 h-3.5" />}>
  Explore
</NeoButton>

// Danger action
<NeoButton variant="danger" size="md" icon={<Trash2 className="w-4 h-4" />}>
  Delete Preset
</NeoButton>

// Ghost action
<NeoButton variant="ghost" size="sm">
  Cancel
</NeoButton>
```

#### Variants & Sizes Reference
| Variant | Background | Border | Shadow | Active State |
| :--- | :--- | :--- | :--- | :--- |
| `primary` | `#f7cb46` → `#ffe500` | `2.5px #1b1c1a` | `4px 4px 0px #1b1c1a` | `neo-press-none` |
| `secondary` | `#ffffff` → `#fbf9f6` | `2px #1b1c1a` | `3px 3px 0px #1b1c1a` | `neo-press` |
| `danger` | `#ffdad6` → `#ffb4ab` | `2px #ba1a1a` | `3px 3px 0px #ba1a1a` | `neo-press` |
| `ghost` | `transparent` → `#f5f3f0` | `2px transparent` | None | None |

| Size | Padding | Font Size |
| :--- | :--- | :--- |
| `sm` | `px-3 py-1.5` | `text-xs` |
| `md` (default) | `px-4 py-2` | `text-sm` |
| `lg` | `px-6 py-3` | `text-base` |

---

### `NeoCard`
Base container for all cards, panels, and widgets.

```tsx
import { NeoCard } from "@/components/ui/NeoCard";

<NeoCard size="md" className="p-4 space-y-3">
  <h3 className="font-headline font-black text-lg">Card Title</h3>
  <p className="font-sans text-xs text-[#4b4731]">Card description</p>
</NeoCard>
```

#### Props
- `size?: "sm" | "md" | "lg"`: Selects `neo-shadow-sm`, `neo-shadow`, or `neo-shadow-lg` (default: `"lg"`).
- `className?: string`: Extra classes (e.g. padding, flex layout).
- Standard `HTMLAttributes<HTMLDivElement>`.

---

### `NeoBadge`
Compact pill badges for status tags, vehicle profiles, and cost estimates.

```tsx
import { NeoBadge } from "@/components/ui/NeoBadge";
import { Sparkles } from "lucide-react";

<NeoBadge variant="yellow">2-Wheeler Run</NeoBadge>
<NeoBadge variant="green">GPS Signal Locked</NeoBadge>
<NeoBadge variant="teal">Fuel & Tolls Incl.</NeoBadge>
<NeoBadge variant="red">Delayed</NeoBadge>
<NeoBadge variant="gray">~$42 est.</NeoBadge>
```

#### Badge Variants
- `yellow`: `bg-[#ffe500] text-[#1b1c1a]`
- `green`: `bg-[#7af8a5] text-[#004d28]`
- `teal`: `bg-[#249e90] text-white`
- `red`: `bg-[#ffdad6] text-[#93000a]`
- `gray`: `bg-[#efeeeb] text-[#4b4731]`

---

## 6. App Chrome Components (`components/app/`)

### `AppHeader`
Client component used exclusively across the authenticated `(app)` route group:
- **Left**: RoamPup Logo stamp (PawPrint in yellow border box) linked to `/dashboard`.
- **Right**:
  1. **Notification Bell**: White neobrutalist icon button with active red dot indicator.
  2. **Emergency SOS**: Distinct `#e91e8c` pink button with siren icon and `✱ SOS` bold text.
- **Styling**: `sticky top-0 z-50 bg-[#fbf9f6] border-b-[3px] border-[#1b1c1a] shadow-[0px_4px_0px_#1b1c1a]`.

### `BottomNav`
Fixed bottom navigation bar for mobile & desktop application views:
- **Tabs**:
  1. `Saved Presets` → `/dashboard` (`BookMarked` icon)
  2. `Scheduled` → `/trips` (`CalendarDays` icon, includes `(3)` pill badge)
  3. `Map` → `/map` (`Map` icon)
  4. `Profile` → `/profile` (`UserCircle2` icon)
- **Active Tab Styling**: Highlighted with `text-[#1b1c1a] bg-[#f5f3f0]` and a top indicator line (`h-[3px] bg-[#1b1c1a]`).
- **Styling**: `fixed bottom-0 inset-x-0 z-50 bg-[#fbf9f6] border-t-[3px] border-[#1b1c1a] shadow-[0px_-4px_0px_#1b1c1a]`.

---

## 7. Layout Conventions: `(auth)` vs `(app)`

| Feature | `app/(auth)` Group | `app/(app)` Group |
| :--- | :--- | :--- |
| **Purpose** | Public auth flows (Login, Register, Forgot Password) | Protected app experience (Dashboard, Trips, Map, Profile) |
| **Header** | `components/layout/Header.tsx` (Sign In / Sign Up CTA) | `components/app/AppHeader.tsx` (Logo, Bell, SOS) |
| **Footer** | `components/layout/Footer.tsx` (Links, Copyright) | **None** |
| **Bottom Navigation** | **None** | `components/app/BottomNav.tsx` (Fixed bottom) |
| **Background Texture**| `bg-dot-matrix` texture visible | Solid `bg-[#fbf9f6]` (no dot matrix on page shell) |
| **Bottom Padding** | Normal | `pb-24` (prevents content hiding behind bottom nav) |
| **Auth Protection** | Open / Redirects if already logged in | Server-side `auth()` check + redirect to `/login` |
| **Instant Navigation**| Default prerendered | `export const instant = false;` (bypasses prerender blocking) |

---

## 8. Next.js 16 Proxy & Auth Integration

Next.js 16 deprecates `middleware.ts` in favor of `proxy.ts`:
- **File location**: Root directory `proxy.ts` (alongside `auth.ts`).
- **Named export**: `export async function proxy(request: NextRequest) { ... }`.
- **Config**: `export const config = { matcher: [...] }`.
- **Defense-in-depth**: In addition to `proxy.ts`, `app/(app)/layout.tsx` must always call `await auth()` and `redirect("/login")` if unauthenticated.
- **Cache Components rule**: When accessing `auth()` (which reads request headers/cookies) in Server Components under Next.js 16 with `cacheComponents: true`, always export `export const instant = false;` on the layout or page to allow dynamic server-rendered execution.

---

## 9. DO and DON'T Guidelines

### DO
- **DO** use solid, high-contrast borders (`border-2 border-[#1b1c1a]` or `border-[3px] border-[#1b1c1a]`).
- **DO** use hard drop shadows (`shadow-[3px_3px_0px_#1b1c1a]` or `.neo-shadow`).
- **DO** combine `font-headline` for headlines/buttons/badges with `font-sans` for descriptions.
- **DO** include `pb-24` on any page or main area rendered inside `(app)` to prevent overlap with `BottomNav`.
- **DO** import reusable UI components from `@/components/ui/` (`NeoButton`, `NeoCard`, `NeoBadge`).
- **DO** clearly mark mocked/placeholder data with clear comment headers.

### DON'T
- **DON'T** use soft, blurry box shadows like `shadow-md`, `shadow-lg`, or `shadow-xl`.
- **DON'T** use subtle, borderless gray pills or flat buttons.
- **DON'T** wrap `(app)/layout.tsx` in `<html>` or `<body>` tags (this is already handled by root `app/layout.tsx`).
- **DON'T** create `middleware.ts` (use `proxy.ts` in Next.js 16).
- **DON'T** introduce arbitrary new colors outside the defined design system palette.
- **DON'T** remove `export const instant = false;` from server pages that read `await auth()`.

---

## 10. How to Extend the Design System

When creating new features or components:
1. **New UI Primitives**: Place inside `components/ui/` (e.g., `NeoInput.tsx`, `NeoSelect.tsx`, `NeoModal.tsx`). Always extend native HTML element props and wrap with `React.forwardRef`.
2. **Icons**: Use existing icons from `lucide-react` with `stroke-[2]` or `stroke-[2.5]` to match the neobrutalist weight.
3. **Form Fields**: Use `bg-white border-2 border-[#1b1c1a] rounded-xl shadow-[3px_3px_0px_#1b1c1a] focus:ring-2 focus:ring-[#ffe500]`.
4. **Interactive Cards**: Add hover translation (`hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_#1b1c1a] transition-all`).
