# Young Astronomers Project Context

## Overview
Young Astronomers is a Next.js (App Router) web application that serves as a presentation/interactive site. The core mechanic is rendering content from Markdown files (`content/`) into text slides (`SlideDeck`), overlaying them on top of dynamic, interactive 3D WebGL backgrounds (`BackgroundUpdater`, `Starfield`, `BlackHole`).

## Tech Stack
- **Framework**: Next.js 16.1 (App Router)
- **UI Library**: React 19
- **Styling**: Tailwind CSS v4, `clsx`, `tailwind-merge`
- **3D Canvas**: `three`, `@react-three/fiber`, `@react-three/drei`, `@react-three/rapier`
- **Content Parsing**: `gray-matter`, `react-markdown`
- **Components**: `embla-carousel-react`, `@radix-ui/react-slot`, `lucide-react`
- **Linting**: ESLint 9

## Architecture
- **`app/`**: Next.js App Router structure. `page.js` defaults to loading the `landing` content. Dynamic routes load other content pages.
- **`components/`**: React functional components. Contains layout elements (Navbar, Footer, Slide deck) and Three.js 3D scene elements (Starfield, BlackHole).
  - 3D components must be client-side only (using `"use client"`).
- **`content/`**: Markdown files serving as the data source.
  - Files are parsed by `gray-matter`.
  - Content is separated into slides using `***` on its own line.
  - The frontmatter (YAML) defines page-level and slide-level metadata (e.g., configuring the 3D background via `meta.background`).
- **`lib/`**: Utilities, notably `content.js` which maps the Markdown into structured data (`getPageContent`, `parseFile`).

## Coding Guidelines
- **Components**: Use modern React patterns (functional components, hooks).
- **3D Performance**: Group 3D canvas logic tightly, avoiding unnecessary re-renders of heavy WebGL components. Use `useFrame` and other R3F hooks optimally.
- **Styling**: Use utility-first Tailwind CSS classes. Compose complex conditional classes using `clsx` and `tailwind-merge`.
- **Content Expansion**: When adding new pages, place `.md` files in the `content/` directory and use the existing Markdown syntax (`---` for frontmatter, `***` to separate slides).
