# Srinivasa Reddy Photography — Website

A premium, editorial photography portfolio site built with React, TypeScript,
Tailwind CSS v4, and Framer Motion.

## Getting started

```bash
npm install
npm run dev       # local dev server
npm run build     # production build -> dist/
```

## Adding your photography

See `public/images/README.md` for the exact folder structure and filenames.
Until real files are added, every image slot shows a clean, labeled
placeholder — never a stock photo — so it's obvious what's still needed.

To add more portfolio images beyond the starter set, edit
`src/data/portfolio.ts`.

## Filling in real details

Edit `src/data/siteConfig.ts` to replace the placeholder phone number,
WhatsApp number, email, and social links (all marked `// TODO`).

Replace the placeholder testimonials in `src/data/testimonials.ts` with real
ones once you have them.

## Structure

- `src/components/` — reusable UI (Navbar, Hero, Stats, Timeline, Testimonials,
  Lightbox, ServiceHero/ServiceGallery, ContactForm, etc.)
- `src/pages/` — one file per route (Home, About, Portfolio, Weddings,
  Maternity, Newborn, Models, Academy, Contact)
- `src/data/` — all editable content: portfolio images, courses, timeline,
  testimonials, site/contact config
- `public/images/` — drop your photographs here

## Contact form

The enquiry form on the Contact page is front-end only right now (it shows a
confirmation message on submit but doesn't send anywhere). Wire the
`handleSubmit` function in `src/components/ContactForm.tsx` to your email
service or form backend of choice (e.g. Formspree, a serverless function, or
your own API route).

## Deploying

This is a static Vite build — `npm run build` outputs a `dist/` folder that
can be deployed to Vercel, Netlify, Cloudflare Pages, GitHub Pages, or any
static host. Since routing uses React Router in browser mode, configure your
host to redirect all paths to `index.html` (a "SPA fallback").
