# CLAUDE.md — Aerium Residence (aerium-residence.co)

## 1. SITE IDENTITY

- **Domain:** aerium-residence.co
- **Property:** Aerium Residence — Taman Permata Buana, Kembangan, Jakarta Barat
- **Developer:** Sinar Mas Land x Itochu x Shimizu (Japan)
- **Entity:** PT Berjaya Global Makmur (property advisory, bukan developer)
- **Site type:** Dedicated single-property site (bukan portfolio)

---

## 2. TECH STACK

- **Hosting:** Cloudflare Pages — config via `_headers` file
- **No vercel.json** — no redirect aliases needed
- **Build:** None — pure static HTML, inline CSS/JS
- **Language:** Bahasa Indonesia (`<html lang="id">`)
- **Locales:** 1 (single-language site)
- **Interactive map:** MapLibre 3D (`/js/aerium-map.js`, `/vendor/maplibre-gl/`)
- **Map tiles:** OpenFreeMap (free, no API key)
- **IndexNow:** Active — key `0530ef5c...75`, GitHub Action auto-submits on push

---

## 3. FILE STRUCTURE

```
aerium-residence.co/
├── index.html                          ← Main property page (5,260 lines)
├── artikel/index.html                  ← Article hub
├── artikel/cafe-resto-permata-buana/   ← Neighborhood guide
├── artikel/restoran-puri-indah-mall-lippo-mall-puri/
├── artikel/sekolah-dekat-aerium/
├── apartemen-dekat-puri-indah-mall/    ← Geo SEO area page
├── apartemen-dog-friendly-jakarta/     ← USP/lifestyle area page
├── js/aerium-map.js                    ← MapLibre map script
├── vendor/maplibre-gl/                 ← Self-hosted MapLibre
├── images/                             ← Source images (JPG/HEIC originals)
│   └── web/                            ← Optimized WebP (full + -sm, 56 files)
├── _headers                            ← Cloudflare Pages headers
├── llms.txt                            ← AI crawler index
├── robots.txt                          ← AI crawler whitelist (22 bots)
└── sitemap.xml                         ← 7 URLs with image extensions
```

**Image convention:** Source in `images/`, optimized WebP in `images/web/`. Dual-size: `[name].webp` (full, max 1600px) + `[name]-sm.webp` (max 800px).

---

## 4. DESIGN SYSTEM — UPPER-MIDDLE ("Air / Breath")

```css
:root {
  --color-forest: #1F3A33;        /* Primary green */
  --color-forest-deep: #142824;
  --color-linen: #F6F1E7;         /* Background */
  --color-brass: #B8905A;         /* Accent gold */
  --color-brass-light: #D8B57F;
  --color-terracotta: #B8664A;
  --color-sage: #8FAE9B;
  --color-wa: #25D366;
}
/* Design concept: "Air / Breath" — green sanctuary lifted into the sky
   Primary: forest green → trust, nature, health
   Accent: brass gold → premium, warm
   Background: linen → soft, inviting */
```
- **Display font:** Instrument Serif (serif)
- **Body font:** Manrope (sans-serif)
- **Tone:** Nature, health, family, dog-friendly, green living
- **USPs:** Dog park, vertical garden, PM2.5 filtration, Sinar Mas Land + Japanese quality

---

## 5. WHATSAPP

- **Number:** 62819888089 (budget/affordable line)
- **Display:** 0819-888-089
- **wa.me link:** `https://wa.me/62819888089`
- **Pre-filled template:** `Halo, saya tertarik dengan Aerium Residence. Mohon info [context].`
- **Floating button:** Required on every page (bottom-right, #25D366 pulse)

---

## 6. HOSTING CONFIG (`_headers`)

```
/llms.txt         → text/plain; charset=utf-8, 1h cache
/robots.txt       → text/plain
/sitemap.xml      → application/xml
/images/*         → 1 year immutable cache
```

---

## 7. CROSS-REPO STANDARDS (Shared across all PT Berjaya Global Makmur sites)

### Entity & E-E-A-T
- Brand focus: **PT Berjaya Global Makmur** (not personal name)
- E-E-A-T author block: hidden microdata, brand as author
- Organization schema: `sameAs` links to jakartaapartments.co, berjayapropertiesjakarta.com

### AEO (Answer Engine Optimization)
- **BLUF Data Layer:** Hidden div, English, class `bluf-data`, structured fields (What/Developer/Units/Promos/Status/Why/Contact/Last updated)
- **llms.txt:** Present at root, link tags in `<head>` (`rel="describedby"` v2 + `rel="alternate"` v1)
- **SpeakableSpecification:** In JSON-LD @graph WebPage type, targeting `.bluf-data`, `.hero-headline`, `.hero-subheadline`, `.faq-a`
- **H2-as-questions:** Format headings as search queries for featured snippet targeting

### Schema (JSON-LD @graph)
Minimum 7 types: WebPage (with Speakable), RealEstateListing, RealEstateAgent, Organization, WebSite, BreadcrumbList, FAQPage

### robots.txt
Follow Bab 41.2 template — 22 bot entries. Allow all AI search + user-triggered + training crawlers. Block: CCBot, Bytespider, AhrefsBot, SemrushBot, MJ12bot, DotBot.

### IndexNow
Auto-submit via GitHub Action on push to main. Manual: `workflow_dispatch` with `all=true`.

### FAQ Rules
- 4-8 questions, MUST include 1 "kekurangan/downside" question for E-E-A-T credibility
- FAQPage schema in JSON-LD

### Canonical URL
- Always `https://aerium-residence.co/` (no www, no .html)

### Image Standards
- WebP format, dual-size (`[name].webp` + `[name]-sm.webp`)
- Hero: `fetchpriority="high"`, `loading="eager"`
- Below-fold: `loading="lazy"`
- Alt text: keyword-rich, descriptive
- `onerror="this.remove()"` with gradient fallback on parent

---

## 8. FULL PLAYBOOK REFERENCE

For the complete 42-chapter playbook covering all design systems, behavioral copy frameworks, schema templates, and detailed patterns, see:
**`berjayapropertiesjakarta.com/CLAUDE.md`**
