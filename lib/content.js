import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDir = path.join(process.cwd(), 'content');

export function getPageContent(slug) {
    // Slug should include extension or we assume .md?
    // Let's assume input is "landing.md" or just "landing"
    const realSlug = slug.endsWith('.md') ? slug : `${slug}.md`;
    const fullPath = path.join(contentDir, realSlug);

    if (!fs.existsSync(fullPath)) {
        // Try looking in pages subdirectory if not in root content
        const pagesPath = path.join(contentDir, 'pages', realSlug);
        if (fs.existsSync(pagesPath)) {
            return parseFile(pagesPath);
        }
        return null;
    }

    return parseFile(fullPath);
}

function parseFile(fullPath) {
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    // Split content based on horizontal rule (***) on its own line
    // We use *** for slides to avoid conflict with YAML frontmatter (---)
    const rawSlides = content.split(/^\*\*\*$/gm);

    const slides = rawSlides
        .map(s => s.trim())
        .filter(s => s.length > 0)
        .map(slideText => {
            // Parse individual slide frontmatter if present
            // We need to ensure we don't trip on non-frontmatter dashes, 
            // but standard gray-matter expects --- at start.
            // Since we split by ---, the slide text might not have --- at the start if it was used as delimiter.
            // But if the user adds frontmatter inside the slide, they will write:
            // ---
            // key: value
            // ---
            // Content

            // gray-matter expects the first line to be --- for frontmatter.
            const { data: slideMeta, content: slideContent } = matter(slideText);
            return {
                meta: slideMeta,
                content: slideContent
            };
        });

    return {
        meta: data,
        slides
    };
}
