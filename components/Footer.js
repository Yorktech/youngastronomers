'use client';

import Link from 'next/link';
import { Mail, MessageCircle } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="fixed bottom-0 w-full py-4 z-40 bg-gradient-to-t from-black/80 to-transparent backdrop-blur-[2px]">
            <div className="container mx-auto flex justify-between items-center px-6 text-white/50 text-sm">
                <p>&copy; {new Date().getFullYear()} Young Astronomers UK</p>

                <div className="flex gap-6 items-center">
                    <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>

                </div>
            </div>
        </footer>
    );
}
