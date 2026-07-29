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

    // First we separate global frontmatter from the rest of the file
    // gray-matter does this by finding the first --- block
    const { data: globalMeta, content: rawContent } = matter(fileContents);

    // One caveat: gray-matter removes ONLY the first frontmatter block.
    // However, if the slide has its own frontmatter right after, the file looks like:
    // ---
    // global meta
    // ---
    // 
    // ---
    // slide meta
    // ---
    // # Slide 1 

    // Split content based on horizontal rule (***) on its own line
    // We use *** for slides to avoid conflict with YAML frontmatter (---)
    const rawSlides = rawContent.split(/^\*\*\*$/gm);

    const slides = rawSlides
        .map(s => s.trim())
        .filter(s => s.length > 0)
        .map(slideText => {
            // gray-matter expects the first line to be --- for frontmatter.
            // Ensure no leading whitespace/new lines mess up gray-matter parsing
            const cleanSlideText = slideText.replace(/^\s+/, '');
            const { data: slideMeta, content: slideContent } = matter(cleanSlideText);
            return {
                meta: slideMeta,
                content: slideContent
            };
        });

    return {
        meta: globalMeta,
        slides
    };
}

export function getSectionPages(sectionName) {
    const sectionDir = path.join(contentDir, sectionName);

    if (!fs.existsSync(sectionDir)) {
        return [];
    }

    const files = fs.readdirSync(sectionDir);
    const pages = [];

    for (const file of files) {
        if (file.endsWith('.md')) {
            const slug = file.replace(/\.md$/, '');
            if (slug === 'index') continue;
            const filePath = path.join(sectionDir, file);
            const fileContents = fs.readFileSync(filePath, 'utf8');
            const { data: meta } = matter(fileContents);
            pages.push({
                slug,
                title: meta.title || slug,
                path: `/${sectionName}/${slug}`
            });
        }
    }

    return pages;
}
