import { getPageContent } from '@/lib/content';
import SlideDeck from '@/components/SlideDeck';
import { notFound } from 'next/navigation';

export default async function GenericPage({ params }) {
    const { slug } = await params;
    const page = getPageContent(slug);

    if (!page) {
        notFound();
    }

    return (
        <main>
            <SlideDeck slides={page.slides} />
        </main>
    );
}
