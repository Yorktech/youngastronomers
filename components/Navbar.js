import Link from 'next/link';

export default function Navbar() {
    return (
        <nav className="fixed w-full top-0 z-50 py-4 md:py-6 bg-gradient-to-b from-black/50 to-transparent">
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-4 gap-4 md:gap-0">
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="relative">
                        <img src="/logo.png" alt="Young Astronomers UK" className="h-10 md:h-12 w-auto object-contain transition-transform group-hover:scale-110 drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]" />
                    </div>
                </Link>

                <div className="flex gap-4 md:gap-8 flex-wrap justify-center">
                    <Link href="/resources" className="text-white/80 hover:text-white hover:text-shadow-glow transition-all text-sm md:text-lg font-medium">Resources</Link>
                    <Link href="/contact" className="text-white/80 hover:text-white hover:text-shadow-glow transition-all text-sm md:text-lg font-medium">Contact</Link>
                    <Link href="/admin" className="text-white/80 hover:text-white hover:text-shadow-glow transition-all text-sm md:text-lg font-medium">Admin</Link>
                </div>
            </div>
        </nav>
    );
}
