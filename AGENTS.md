# AGENTS.md - Drip Bag Project

## ⚠️ CRITICAL: Use pnpm ONLY

**Package Manager:** Always use `pnpm`. Never use `npm`, `yarn`, or `bun`.

When providing shell commands for package management, ALWAYS use `pnpm`:
- `pnpm install` (NOT `npm install`)
- `pnpm add <package>` (NOT `npm install <package>`)
- `pnpm dev` (NOT `npm run dev`)

## Project Context

For full project details, read: `SYSTEM CONTEXT Drip Bag.md`

This project is an Astro-based e-commerce for "Drip Bag" (El Salvador coffee brand).

## Tech Stack Enforcement

- **Framework:** Astro (SSG)
- **Package Manager:** pnpm (STRICTLY ENFORCED)
- **Styling:** Tailwind CSS
- **Interactivity:** Preact + Nanostores
- **Backend:** Shopify Storefront API (GraphQL)

## Design System

- Colors: brand-blue `#4B65D1`, brand-orange `#E6735C`, brand-cream `#FBF9F4`
- Typography: Playfair Display (display), Montserrat (accent), Lato (body)