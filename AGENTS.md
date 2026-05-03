# AGENTS.md

## Project Identity

This repository powers the Young Astronomers UK website.

Primary goal:
- Build a vibrant, useful astronomy and science resource for parents, children, and educators.

Experience goal:
- Inspire young people to explore astronomy and science through engaging content and interactive presentation.

## Visual And UX Direction

This site has a deliberate "Elite" wireframe + retro aesthetic.

When making UI changes:
- Preserve the wireframe, vector, and starfield personality.
- Keep the retro tone intentional, not novelty.
- Avoid replacing the visual language with generic modern templates.
- Ensure layouts work well on desktop and mobile.
- Maintain readability and contrast over animated/complex backgrounds.

## Architecture Snapshot

Framework and app model:
- Next.js App Router project.
- Tailwind-based styling.
- Content-driven pages from Markdown.

Key runtime pattern:
- Markdown content is parsed in `lib/content.js`.
- Slides are split using a line containing `***`.
- Each slide may include optional frontmatter parsed by `gray-matter`.
- Dynamic page rendering uses `SlideDeck` and `Slide` components.

Important files and areas:
- `content/` for page source Markdown.
- `content/science/` for science content Markdown.
- `app/[slug]/page.js` for generic page routes.
- `app/resources/[slug]/page.js` and `app/science/[slug]/page.js` for section-specific routes.
- `components/SlideDeck.js` and `components/Slide.js` for slide rendering.
- Background and wireframe effects under `components/` (for example `WireframeObjects.js`, `Starfield.js`, `BlackHole.js`).

## Content Rules

When creating or editing content pages:
- Keep pages Markdown-first.
- Prefer adding/editing Markdown in `content/` over hardcoding text in React components.
- Preserve slide boundaries with `***` delimiters.
- Use frontmatter only when needed and keep metadata consistent.
- Keep language age-appropriate, clear, and educational.
- Balance scientific accuracy with accessibility for younger audiences.

## Change Rules For Contributors And Agents

General:
- Make the smallest safe change that solves the task.
- Do not rewrite major structures without clear benefit.
- Keep existing route behavior stable unless task requirements explicitly call for changes.

Design:
- Do not remove or flatten the retro wireframe identity.
- Reuse existing visual components before introducing new design systems.

Code:
- Prefer server-rendered/data-driven patterns already used in `app/` and `lib/`.
- Keep component APIs backward compatible where practical.
- Avoid introducing heavy dependencies when existing utilities are sufficient.

Accessibility and quality:
- Preserve keyboard usability and semantic markup.
- Verify text/background contrast and readability.
- Keep motion/effects tasteful and non-blocking.

## Validation Checklist

Before finalizing meaningful changes:
- Run lint and address issues related to your edits.
- Verify core routes render and slide scrolling works.
- Confirm Markdown parsing still handles frontmatter and `***` slide splits.
- Check one desktop and one mobile viewport for layout regressions.

## Non-Goals

Avoid these unless explicitly requested:
- Converting the site into a generic blog layout.
- Replacing the slide-based interaction model.
- Removing background/wireframe systems that define brand feel.
