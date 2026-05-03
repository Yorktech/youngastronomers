# Young Astronomers UK Website

Young Astronomers UK is a content-driven website designed to inspire children and young people to explore astronomy and science.

The project focuses on:
- A vibrant, useful resource for parents, children, and educators.
- A distinctive Elite wireframe + retro visual style.
- Slide-based page experiences authored in Markdown.

For contributor and agent rules, read AGENTS.md in the repository root.

## Tech Stack

- Next.js App Router
- React 19
- Tailwind CSS
- gray-matter for frontmatter parsing
- react-markdown for markdown rendering (resource-style pages)

## Local Development

1. Install dependencies:

```bash
npm install
```

2. Start the dev server:

```bash
npm run dev
```

3. Open:

```text
http://localhost:8001
```

## Scripts

- `npm run dev` starts development server on port `8001`.
- `npm run build` creates a production build.
- `npm run start` runs the production server.
- `npm run lint` runs ESLint.

## Content Model

Most site pages are authored in Markdown under `content/`.

Slide parsing behavior:
- Files are parsed by `lib/content.js`.
- Slides are split on a line containing only `***`.
- File-level frontmatter is supported.
- Slide-level frontmatter is also supported inside each slide block.

Example slide file pattern:

```md
---
title: Example Page
---

# Slide 1
Intro text.

***

---
align: center
---

# Slide 2
More content.
```

## Content Authoring Cheat Sheet

Use these templates when creating new slide-based pages.

General content page template:

File location:
- `content/<slug>.md`

Route:
- `/<slug>`

Template:

```md
---
title: Page Title
description: One-line summary for this page
background:
	theme: stars
---

# Slide 1

Start with a clear, engaging intro for young learners.

***

---
align: center
---

# Slide 2

Add one core idea with a simple example.

***

# Slide 3

End with a takeaway or question to explore.
```

Science page template:

File location:
- `content/science/<slug>.md`

Route:
- `/science/<slug>`

Template:

```md
---
title: Science Topic Title
description: Child-friendly summary of this science topic
background:
	theme: nebula
---

# What Is It?

Define the topic in plain, age-appropriate language.

***

# How It Works

Explain the process in short steps.

***

# Try This

Give a safe activity, prompt, or observation task.
```

Authoring tips:
- Keep one big idea per slide.
- Use short paragraphs and clear headings.
- Keep language accessible for children while staying scientifically accurate.
- Use `***` on its own line between slides.
- Use slide-level frontmatter only when you need layout metadata.
- To hide a page from the Resources list, add `resource: false` in that file's frontmatter.

## Routing Overview

- `app/page.js` loads the home experience from `content/landing.md`.
- `app/[slug]/page.js` loads generic slide pages from `content/<slug>.md`.
- `app/science/[slug]/page.js` loads science slide pages from `content/science/<slug>.md`.
- `app/resources/[slug]/page.js` renders markdown article style content.

## Core Components

- `components/SlideDeck.js` handles full-screen vertical slide snapping.
- `components/Slide.js` renders each slide's markdown and metadata.
- `components/Starfield.js`, `components/WireframeObjects.js`, and `components/BlackHole.js` support the visual identity.
- `components/BackgroundUpdater.js` applies per-page background configuration.

## Contribution Notes

- Prefer content updates in `content/` over hardcoded text in React components.
- Preserve slide boundaries (`***`) and existing route behavior.
- Keep the retro wireframe identity intact.
- Verify readability over animated backgrounds.
- Run `npm run lint` for meaningful code changes.

## Quick Validation

Before finalizing changes:
- Confirm main routes render correctly.
- Check slide scrolling behavior on at least one desktop and one mobile viewport.
- Verify Markdown parsing still supports frontmatter and `***` splits.
