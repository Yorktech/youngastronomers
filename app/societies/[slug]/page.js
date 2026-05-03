import { getPageContent } from '@/lib/content';
import SlideDeck from '@/components/SlideDeck';
import { notFound } from 'next/navigation';
import BackgroundUpdater from '@/components/BackgroundUpdater';

export default async function SocietiesPage({ params }) {
    const { slug } = await params;
    // Prepend 'societies/' to the slug so it looks in content/societies/
    const page = getPageContent(`societies/${slug}`);

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
