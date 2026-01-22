import { getPageContent } from '@/lib/content';
import SlideDeck from '@/components/SlideDeck';
import { notFound } from 'next/navigation';
import BackgroundUpdater from '@/components/BackgroundUpdater';

export default async function SciencePage({ params }) {
    const { slug } = await params;
    // Prepend 'science/' to the slug so it looks in content/science/
    const page = getPageContent(`science/${slug}`);

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
