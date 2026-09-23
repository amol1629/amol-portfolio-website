<a id="top"></a>

<div align="center">
  <a href="https://amol-portfolio-website.vercel.app">
    <img src="./public/images/hero-bg.jpg" alt="Amol Rathod portfolio preview" width="100%" />
  </a>

  <br />
  <br />

  <img src="https://readme-typing-svg.demolab.com?font=Space+Grotesk&weight=600&size=26&duration=2800&pause=900&color=06B6D4&center=true&vCenter=true&width=640&lines=AMOL+RATHOD+%E2%80%94+PORTFOLIO;Technical+Consultant+%26+Frontend+Specialist;Designing+digital+experiences+that+feel+effortless." alt="Animated introduction" />

  <p>
    An immersive, motion-led portfolio for <strong>thoughtful interfaces</strong>,<br />
    scalable frontend systems, and work that earns a second look.
  </p>

  <p>
    <a href="https://amol-portfolio-website.vercel.app"><img src="https://img.shields.io/badge/✦_EXPLORE_THE_SITE-06B6D4?style=for-the-badge&labelColor=0B1220" alt="Explore the live portfolio" /></a>
    <a href="mailto:rathodamol1554@gmail.com"><img src="https://img.shields.io/badge/LET'S_TALK-FFFFFF?style=for-the-badge&labelColor=0B1220&color=FFFFFF" alt="Email Amol" /></a>
  </p>

  <p>
    <a href="https://www.linkedin.com/in/amol-rathod-44b4aa230/">LinkedIn</a>
    &nbsp;·&nbsp;
    <a href="https://github.com/amol1629">GitHub</a>
    &nbsp;·&nbsp;
    <a href="https://amol-portfolio-website.vercel.app">Live portfolio</a>
  </p>
</div>

<br />

<div align="center">

| `Next.js 16` | `React 19` | `TypeScript` | `Tailwind CSS 4` | `Framer Motion` |
| :---: | :---: | :---: | :---: | :---: |

</div>

## 01 / The experience

> **A personal portfolio with the restraint of an editorial, the energy of a product launch, and the technical foundation to match.**

The site turns a career story into an experience worth exploring—pairing a glass-inspired visual language with intentional motion, sharp typography, and fully responsive layouts. Every route is shaped to make the work, perspective, and person behind it easy to discover.

<table>
  <tr>
    <td width="33.33%" valign="top">
      <h3>✦ Work, in context</h3>
      <p>Case studies move beyond thumbnails with focused project detail pages and technology-led storytelling.</p>
    </td>
    <td width="33.33%" valign="top">
      <h3>◌ Crafted to move</h3>
      <p>Framer Motion and Lenis create an elevated, tactile feel while keeping the interface purposeful.</p>
    </td>
    <td width="33.33%" valign="top">
      <h3>↗ Ready to be found</h3>
      <p>Metadata, sitemap, robots configuration, and a web app manifest support a polished production presence.</p>
    </td>
  </tr>
</table>

## 02 / Explore the world

```text
HOME
 ├─ About · services · skills · experience · testimonials · contact
 ├─ /projects             Selected work and case studies
 ├─ /projects/[slug]      The detail behind each build
 ├─ /certifications       Credentials and learning milestones
 ├─ /blog                 Notes, ideas, and writing
 ├─ /blog/[slug]          Individual articles
 └─ /work-with-me         A direct path to collaborate
```

## 03 / Launch locally

**You’ll need:** Node.js 20.9+ and npm. This repository is locked with `package-lock.json`, so `npm ci` is the preferred install command.

```bash
# Clone
git clone https://github.com/amol1629/amol-portfolio-website.git
cd amol-portfolio-website

# Install + run
npm ci
npm run dev
```

Open **[localhost:3000](http://localhost:3000)** and start exploring.

<details>
<summary><strong>Available commands</strong></summary>
<br />

| Command | What it does |
| :--- | :--- |
| `npm run dev` | Starts the development server with Turbopack. |
| `npm run build` | Creates an optimized production build. |
| `npm run start` | Serves the production build locally. |
| `npm run lint` | Runs ESLint across the project. |
| `npm run type-check` | Checks TypeScript without emitting files. |
| `npm run analyze` | Builds with bundle analysis enabled. |

</details>

## 04 / Make it yours

The portfolio is deliberately organized so content and interface can evolve together—not fight each other.

```text
src/
├── app/           → Routes, metadata, loading, and error states
├── components/    → Layouts, shared UI, effects, glass, and page sections
├── config/        → Identity, navigation, social links, SEO, and assets
├── data/          → Portfolio content and supporting data
├── hooks/         → Reusable React hooks
├── lib/           → Utilities, animation, and performance helpers
├── styles/        → Theme and styling foundations
└── types/         → Shared TypeScript definitions
```

Start with [`src/config/site.ts`](src/config/site.ts) for the name, title, contact email, canonical URL, and primary links. Then tailor navigation in [`src/config/navigation.ts`](src/config/navigation.ts) and profiles in [`src/config/social.ts`](src/config/social.ts).

## 05 / Ship it

Built for Vercel. Import the GitHub repository and keep the default Next.js settings:

```text
Install command  → npm ci
Build command    → npm run build
```

<div align="center">
  <br />
  <a href="https://amol-portfolio-website.vercel.app"><strong>See the live experience&nbsp; →</strong></a>
  <br />
  <br />
  <sub>Designed and built by <a href="https://github.com/amol1629">Amol Rathod</a> · <a href="#top">Back to top ↑</a></sub>
</div>
