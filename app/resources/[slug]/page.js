import { getPostBySlug, getPostSlugs } from '@/lib/posts';
import ReactMarkdown from 'react-markdown';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
    const posts = getPostSlugs();
    return posts.map((slug) => ({
        slug: slug.replace(/\.md$/, ''),
    }));
}

export default async function Post({ params }) {
    // Await params in newer Next.js versions (if dynamic param access changes, but for now standard)
    /* NOTE: In Next.js 15+, params is a Promise. We should await it if using 15.
       The project was created with latest, which is likely Next 14 or 15. 
       I'll assume I need to await it or treat it as async context if forced, 
       but standard usage for now: */

    const { slug } = await params;
    const post = getPostBySlug(slug, ['title', 'date', 'slug', 'content']);

    if (!post) {
        notFound();
    }

    return (
        <article className="container" style={{ padding: '8rem 1rem 6rem 1rem', maxWidth: '800px' }}>
            <header style={{ marginBottom: '3rem', textAlign: 'center' }}>
                <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>{post.title}</h1>
                <time style={{ color: 'var(--text-secondary)' }}>{post.date}</time>
            </header>

            <div className="prose">
                <ReactMarkdown>{post.content}</ReactMarkdown>
            </div>


        </article>
    );
}
