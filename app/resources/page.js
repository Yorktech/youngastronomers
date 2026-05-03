import BackgroundUpdater from '@/components/BackgroundUpdater';
import SlideDeck from '@/components/SlideDeck';
import { getAllPosts } from '@/lib/posts';

export default function ResourcesPage() {
    const posts = getAllPosts(['slug', 'title', 'excerpt', 'date']);

    const slides = [
        {
            meta: { glass: true },
            content: `# Resources\n\nExplore our library of articles and guides.\n\nRESOURCES_GRID`
        }
    ];

    return (
        <main>
            <BackgroundUpdater config={{ scrollIndicator: false }} />
            <SlideDeck slides={slides} pageMeta={{ scrollIndicator: false }} customData={{ posts }} />
        </main>
    );
}
