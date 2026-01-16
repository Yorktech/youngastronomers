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

    // Split content based on horizontal rule (---) on its own line
    const slides = content.split(/^---$/gm)
        .map(s => s.trim())
        .filter(s => s.length > 0);

    return {
        meta: data,
        slides
    };
}
