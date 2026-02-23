import { getPostSlugs } from '@/lib/posts';
import { getPageContent } from '@/lib/content';
import SlideDeck from '@/components/SlideDeck';
import BackgroundUpdater from '@/components/BackgroundUpdater';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
    const posts = getPostSlugs();
    return posts.map((slug) => ({
        slug: slug.replace(/\.md$/, ''),
    }));
}

export default async function Post({ params }) {
    const { slug } = await params;
    const page = getPageContent(slug);

    if (!page) {
        notFound();
    }

    return (
        <main>
            <BackgroundUpdater config={page.meta.background} />
            <SlideDeck slides={page.slides} pageMeta={page.meta} />
        </main>
    );
}
