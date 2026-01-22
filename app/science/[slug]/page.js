import { getPageContent } from '@/lib/content';
import SlideDeck from '@/components/SlideDeck';
import { notFound } from 'next/navigation';

export default async function SciencePage({ params }) {
    const { slug } = await params;
    // Prepend 'science/' to the slug so it looks in content/science/
    const page = getPageContent(`science/${slug}`);

    if (!page) {
        notFound();
    }

    return (
        <main>
            <SlideDeck slides={page.slides} />
        </main>
    );
}
