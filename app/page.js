import { getPageContent } from '@/lib/content';
import SlideDeck from '@/components/SlideDeck';
import BackgroundUpdater from '@/components/BackgroundUpdater';

export default function Home() {
  const page = getPageContent('landing');

  if (!page) {
    return (
      <div className="flex h-screen items-center justify-center text-white bg-black">
        <h1>Landing page content not found (content/landing.md)</h1>
      </div>
    );
  }

  return (
    <main>
      <BackgroundUpdater config={page.meta.background} />
      <SlideDeck slides={page.slides} pageMeta={page.meta} />
    </main>
  );
}
