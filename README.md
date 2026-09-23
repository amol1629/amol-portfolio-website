<div align="center">

# Amol Rathod — Portfolio

### Technical Consultant · Frontend Specialist · Digital Experience Builder

A high-performance, editorial-style portfolio that brings together selected work, professional experience, certifications, writing, and clear ways to start a conversation.

[![Live site](https://img.shields.io/badge/Explore_the_portfolio-06B6D4?style=for-the-badge&logo=vercel&logoColor=white)](https://amol-portfolio-website.vercel.app)
[![Next.js](https://img.shields.io/badge/Next.js-16-000000?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-149ECA?style=for-the-badge&logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38BDF8?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

[**Live Site**](https://amol-portfolio-website.vercel.app) · [**LinkedIn**](https://www.linkedin.com/in/amol-rathod-44b4aa230/) · [**GitHub**](https://github.com/amol1629) · [**Get in touch**](mailto:rathodamol1554@gmail.com)

</div>

---

## ✦ Overview

This repository contains the source for Amol Rathod’s personal portfolio. It is designed to feel considered rather than template-driven: fluid motion, a glass-inspired visual system, responsive layouts, and content-led pages help each case study and career milestone take center stage.

> **Built for clarity, speed, and a memorable first impression.**

## ✦ Experience highlights

<table>
  <tr>
    <td width="50%" valign="top">
      <h3>◆ Focused storytelling</h3>
      <p>Dedicated pages for projects, certifications, blog posts, and collaboration opportunities make it easy to explore the work in context.</p>
    </td>
    <td width="50%" valign="top">
      <h3>◇ Motion with purpose</h3>
      <p>Framer Motion and Lenis support polished, deliberate interactions without losing sight of readability and performance.</p>
    </td>
  </tr>
  <tr>
    <td width="50%" valign="top">
      <h3>✦ Responsive by default</h3>
      <p>Layouts, navigation, and visual details are crafted to remain elegant across phones, tablets, and larger screens.</p>
    </td>
    <td width="50%" valign="top">
      <h3>◈ Discoverable and deployable</h3>
      <p>Metadata, sitemap, robots configuration, and a web app manifest are included alongside a Vercel-ready Next.js setup.</p>
    </td>
  </tr>
</table>

## ✦ Built with

| Layer | Tools |
| :--- | :--- |
| **Framework** | Next.js 16 (App Router), React 19, TypeScript |
| **Styling** | Tailwind CSS 4, custom global styles, glass UI primitives |
| **Motion & UI** | Framer Motion, Lenis, Lucide React, Iconify |
| **Quality** | ESLint, TypeScript compiler checks |
| **Deployment** | Vercel |

## ✦ Site map

```text
/
├── About, services, skills, experience, testimonials, and contact
├── /projects          Selected work and case studies
├── /projects/[slug]   Individual project details
├── /certifications    Credentials and learning milestones
├── /blog              Writing and ideas
├── /blog/[slug]       Individual articles
└── /work-with-me      Collaboration and enquiry page
```

## ✦ Getting started

### Prerequisites

- **Node.js 20.9+**
- **npm** (the repository includes a `package-lock.json`)

### Local setup

```bash
# 1. Clone the repository
git clone https://github.com/amol1629/amol-portfolio-website.git
cd amol-portfolio-website

# 2. Install dependencies
npm ci

# 3. Start the development server
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

## ✦ Commands

| Command | Description |
| :--- | :--- |
| `npm run dev` | Start the local development server with Turbopack. |
| `npm run build` | Create an optimized production build. |
| `npm run start` | Serve the production build locally. |
| `npm run lint` | Run ESLint across the project. |
| `npm run type-check` | Run TypeScript without emitting files. |
| `npm run analyze` | Build with bundle analysis enabled. |

## ✦ Project structure

```text
src/
├── app/           # App Router routes, metadata, loading, and error states
├── components/    # Layout, shared UI, effects, glass, and section components
├── config/        # Site identity, navigation, social, SEO, and asset settings
├── data/          # Portfolio content and supporting data
├── hooks/         # Reusable React hooks
├── lib/           # Utilities, animation, and performance helpers
├── styles/        # Shared theme and styling foundations
└── types/         # Shared TypeScript definitions
public/
├── images/        # Portfolio, project, and certification imagery
├── fonts/         # Self-hosted Satoshi font files
└── pdfs/          # Resume and certification documents
```

## ✦ Customizing the portfolio

Most identity-level details live in a single place. Update [`src/config/site.ts`](src/config/site.ts) to change the portfolio name, professional title, contact email, canonical URL, and primary links. Navigation and social profiles are maintained in [`src/config/navigation.ts`](src/config/navigation.ts) and [`src/config/social.ts`](src/config/social.ts).

Content is intentionally organized alongside its feature areas, so projects, certifications, experience, testimonials, and page-level sections can evolve without turning the application into a single large content file.

## ✦ Deployment

The portfolio is optimized for deployment on Vercel. Push the repository to GitHub, import it into Vercel, and use the default Next.js build settings:

```text
Build command:  npm run build
Install command: npm ci
```

The live deployment is available at [amol-portfolio-website.vercel.app](https://amol-portfolio-website.vercel.app).

---

<div align="center">

**Interested in building something thoughtful?**

[Start a conversation →](mailto:rathodamol1554@gmail.com)

<sub>Designed and built by <a href="https://github.com/amol1629">Amol Rathod</a>.</sub>

</div>
