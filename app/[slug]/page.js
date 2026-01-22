import { getPageContent } from '@/lib/content';
import SlideDeck from '@/components/SlideDeck';
import { notFound } from 'next/navigation';
import BackgroundUpdater from '@/components/BackgroundUpdater';

export default async function GenericPage({ params }) {
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
