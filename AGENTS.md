# AGENTS.md - Café sin prisa

## ⚠️ CRITICAL: Use pnpm ONLY

**Package Manager:** Always use `pnpm`. Never use `npm`, `yarn`, or `bun`.

## Project Context

For full project details, read: `SYSTEM CONTEXT Drip Bag.md`

This project is an Astro-based e-commerce for **"Café sin prisa"** (El Salvador coffee brand).

## Tech Stack Enforcement

- **Framework:** Astro (SSG)
- **Package Manager:** pnpm (STRICTLY ENFORCED)
- **Styling:** Tailwind CSS
- **Interactivity:** Preact + Nanostores
- **Backend:** Shopify Storefront API (GraphQL)
- **Deployment:** Vercel with @astrojs/vercel adapter

## Design System

- Colors: brand-blue `#4B65D1`, brand-orange `#E6735C`, brand-cream `#FBF9F4`
- Typography: Playfair Display (display), Montserrat (accent), Lato (body)
- Flavor colors: Tradicional `#8D8782`, Amaretto `#6A4A4F`, Almendra `#C5B7A7`, Vainilla `#EFECE5`

## Page Routes

- `/` - Home
- `/shop` - Tienda (La Colección)
- `/galeria` - Galería Sensorial
- `/ritual` - Tu Experiencia  
- `/experiencia` - La Colección Completa