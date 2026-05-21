import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import { getSectionPages } from '@/lib/content';

export default async function Navbar() {
    const societiesPages = getSectionPages('societies');
    const sciencePages = getSectionPages('science');

    return (
        <nav className="fixed w-full top-0 z-50 py-4 md:py-6 bg-gradient-to-b from-black/50 to-transparent">
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-4 gap-4 md:gap-0">
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="relative">
                        <img src="/logo.png" alt="Young Astronomers UK" className="h-10 md:h-12 w-auto object-contain transition-transform group-hover:scale-110 drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]" />
                    </div>
                </Link>

                <div className="flex gap-4 md:gap-8 flex-wrap justify-center items-center font-display">
                    <Link href="/" className="text-white/80 hover:text-white hover:text-shadow-glow transition-all text-sm md:text-lg font-medium">Home</Link>

                    <div className="relative group">
                        <Link href="/societies" className="text-white/80 hover:text-white hover:text-shadow-glow transition-all text-sm md:text-lg font-medium flex items-center gap-1">
                            Societies <ChevronDown className="w-4 h-4 md:w-5 md:h-5" />
                        </Link>
                        {societiesPages.length > 0 && (
                            <div className="absolute top-full left-0 pt-2 hidden group-hover:block z-50">
                                <div className="flex flex-col bg-black/80 backdrop-blur-md rounded-md p-2 min-w-[200px] shadow-lg border border-white/10">
                                    {societiesPages.map(page => (
                                        <Link key={page.slug} href={page.path} className="text-white/80 hover:text-white hover:bg-white/10 px-3 py-2 rounded transition-all text-sm md:text-base">
                                            {page.title}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="relative group">
                        <Link href="/science" className="text-white/80 hover:text-white hover:text-shadow-glow transition-all text-sm md:text-lg font-medium flex items-center gap-1">
                            Science <ChevronDown className="w-4 h-4 md:w-5 md:h-5" />
                        </Link>
                        {sciencePages.length > 0 && (
                            <div className="absolute top-full left-0 pt-2 hidden group-hover:block z-50">
                                <div className="flex flex-col bg-black/80 backdrop-blur-md rounded-md p-2 min-w-[250px] shadow-lg border border-white/10">
                                    {sciencePages.map(page => (
                                        <Link key={page.slug} href={page.path} className="text-white/80 hover:text-white hover:bg-white/10 px-3 py-2 rounded transition-all text-sm md:text-base">
                                            {page.title}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    <Link href="/resources" className="text-white/80 hover:text-white hover:text-shadow-glow transition-all text-sm md:text-lg font-medium">Resources</Link>

                    <div className="relative group">
                        <span className="text-white/80 group-hover:text-white group-hover:text-shadow-glow transition-all text-sm md:text-lg font-medium flex items-center gap-1 cursor-default">
                            Places to Visit <ChevronDown className="w-4 h-4 md:w-5 md:h-5" />
                        </span>
                        <div className="absolute top-full left-0 pt-2 hidden group-hover:block z-50">
                            <div className="flex flex-col bg-black/80 backdrop-blur-md rounded-md p-2 min-w-[220px] shadow-lg border border-white/10">
                                <Link href="/days-out" className="text-white/80 hover:text-white hover:bg-white/10 px-3 py-2 rounded transition-all text-sm md:text-base">
                                    Days Out
                                </Link>
                                <Link href="/dark-sky-sites" className="text-white/80 hover:text-white hover:bg-white/10 px-3 py-2 rounded transition-all text-sm md:text-base">
                                    Dark Sky Sites
                                </Link>
                                <Link href="/events" className="text-white/80 hover:text-white hover:bg-white/10 px-3 py-2 rounded transition-all text-sm md:text-base">
                                    Events
                                </Link>
                            </div>
                        </div>
                    </div>

                    <Link href="/advertisers" className="text-white/80 hover:text-white hover:text-shadow-glow transition-all text-sm md:text-lg font-medium">Advertisers</Link>
                    <Link href="/contact" className="text-white/80 hover:text-white hover:text-shadow-glow transition-all text-sm md:text-lg font-medium">Contact</Link>
                 
                </div>
            </div>
        </nav>
    );
}
