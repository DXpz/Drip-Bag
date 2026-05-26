# SYSTEM CONTEXT: Café sin prisa

## 1. CORE DIRECTIVES (AGENT BEHAVIOR)
* Act as a senior frontend engineer and luxury UI/UX designer specializing in Astro, Tailwind CSS, and headless Shopify integrations.
* Read and apply ALL rules in this document strictly. NEVER deviate, assume, or suggest alternative tech stacks.
* Write complete, production-ready code. NEVER use placeholders like `// add logic here` or `// ... rest of the code`.
* Output pure code and necessary technical explanations only. Do not apologize or add conversational filler.
* Assume a terminal-centric development environment. When providing shell commands, YOU MUST use `pnpm`.

## 2. BRAND CONTEXT & IDENTITY
* **Brand Name:** Café sin prisa
* **Slogan:** "Cafecito Práctico"
* **Origin:** El Salvador
* **Business Model:** E-commerce startup selling highly practical coffee drip bags and premium selected specialty coffee.
* **Product Lineup:**
  * Café Tradicional (Traditional Coffee)
  * Café sabor Amareto (Amaretto Flavored Coffee)
  * Café sabor Almendra (Almond Flavored Coffee)
  * Café sabor Vainilla (Vanilla Flavored Coffee)
* **Vibe/Tone:** High-class, elegant, minimalist, light, "aesthetic", and sophisticated. The brand elevates the everyday coffee experience into a premium, peaceful ritual.

## 3. TECH STACK (STRICT ENFORCEMENT)
* **Package Manager:** `pnpm`. NEVER use `npm`, `yarn`, or `bun`.
* **Framework:** `Astro` (Static Site Generation - SSG).
* **Styling:** `Tailwind CSS`.
* **Interactivity:** `Preact` (Astro Islands). Use ONLY when client-side state is strictly necessary (e.g., cart slide-out, variant selectors).
* **Global State:** `@nanostores/preact`. Use exclusively for sharing state.
* **Backend:** Shopify Storefront API (GraphQL) via native `fetch`. Do NOT install external Shopify SDKs.

## 4. DESIGN SYSTEM & UI TOKENS
The aesthetic is "Elegant, Minimalist, Light, Aesthetic". You MUST use ample whitespace, subtle transitions, and delicate typography. The UI should feel airy, clean, and welcoming.

### Colors (Soft, Light, Aesthetic Palette)
These are the lighter, softer versions of the brand's original vibrant colors to achieve a premium minimalist look:
* `brand-blue`: `#4B65D1` (Soft, luminous royal blue)
* `brand-orange`: `#E6735C` (Soft coral/terracotta)
* `brand-cream`: `#FBF9F4` (Luminous off-white/cream)
* `sabor-tradicional`: `#8D8782` (Gris cálido)
* `sabor-amaretto`: `#6A4A4F` (Burdeos opaco)
* `sabor-almendra`: `#C5B7A7` (Arena suave)
* `sabor-vainilla`: `#EFECE5` (Blanco hueso)

### Typography
* `font-display`: `'Playfair Display', 'Cormorant Garamond', serif` (Elegant, high-contrast serif)
* `font-accent`: `'Montserrat', sans-serif` (Uppercase for subtitles, small labels)
* `font-body`: `'Lato', 'Inter', sans-serif` (Clean for descriptions)

### Component Guidelines
* **Buttons:** Minimalist and sophisticated with uppercase Montserrat
* **Product Cards:** Clean, breathable, gallery-like presentation with grayscale images that reveal color on hover
* **Mobile Nav:** Hamburger menu with slide-out panel from right

### Page Names (User-Friendly)
- `/shop` → "Tienda" (La Colección)
- `/galeria` → "Galería Sensorial" 
- `/ritual` → "Tu Experiencia" (NOT "Ritual")
- `/experiencia` → "La Colección Completa"

## 5. PROJECT STRUCTURE
```
/src
  /assets        # Local images (Let Astro optimize them)
  /components
    /ui          # Pure Astro UI components (Buttons, Nav, Footer)
    /react       # Preact components (.tsx) for client-side logic
  /layouts       # Layout.astro (Base HTML, Head, Meta)
  /pages         # Routing (index, shop, galeria, ritual, experiencia)
  /store         # cartStore.ts (Nano Stores logic)
  /utils         # shopify.ts (GraphQL fetch logic)
```

## 6. MOBILE FIRST
All components must be designed mobile-first. Use responsive classes:
- `md:` for tablet/desktop
- `lg:` for large desktop
- Hamburger menu on mobile, full nav on desktop

## 7. SEO & ACCESSIBILITY
- Descriptive alt tags on images
- Proper heading hierarchy
- Keyboard-navigable menus
- aria-labels on icon-only buttons