import { getPageContent } from '@/lib/content';
import SlideDeck from '@/components/SlideDeck';

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
      <SlideDeck slides={page.slides} />
    </main>
  );
}
