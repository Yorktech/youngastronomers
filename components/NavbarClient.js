'use client';

import Link from 'next/link';
import { ChevronDown, Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function NavbarClient({ societiesPages, sciencePages }) {
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [openSection, setOpenSection] = useState(null);
    const [openDesktopDropdown, setOpenDesktopDropdown] = useState(null);

    useEffect(() => {
        if (!isMobileOpen) {
            document.body.classList.remove('overflow-hidden');
            return;
        }

        const onKeyDown = (event) => {
            if (event.key === 'Escape') {
                setIsMobileOpen(false);
                setOpenSection(null);
            }
        };

        document.body.classList.add('overflow-hidden');
        window.addEventListener('keydown', onKeyDown);

        return () => {
            document.body.classList.remove('overflow-hidden');
            window.removeEventListener('keydown', onKeyDown);
        };
    }, [isMobileOpen]);

    // Close desktop dropdown on outside tap/click or Escape key
    useEffect(() => {
        if (!openDesktopDropdown) return;

        const handlePointerDown = (event) => {
            if (!event.target.closest('.desktop-dropdown-container')) {
                setOpenDesktopDropdown(null);
            }
        };

        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                setOpenDesktopDropdown(null);
            }
        };

        document.addEventListener('pointerdown', handlePointerDown);
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('pointerdown', handlePointerDown);
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [openDesktopDropdown]);

    const toggleSection = (sectionKey) => {
        setOpenSection((current) => (current === sectionKey ? null : sectionKey));
    };

    const toggleDesktopDropdown = (dropdownKey) => {
        setOpenDesktopDropdown((current) => (current === dropdownKey ? null : dropdownKey));
    };

    const closeAllMenus = () => {
        setIsMobileOpen(false);
        setOpenSection(null);
        setOpenDesktopDropdown(null);
    };

    return (
        <nav className="fixed w-full top-0 z-50 py-4 lg:py-6 bg-gradient-to-b from-black/50 to-transparent">
            <div className="container mx-auto flex items-center justify-between px-4 gap-4">
                <Link href="/" className="flex items-center gap-2 group" onClick={closeAllMenus}>
                    <div className="relative">
                        <img src="/logo.png" alt="Young Astronomers UK" className="h-10 lg:h-12 w-auto object-contain transition-transform group-hover:scale-110 drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]" />
                    </div>
                </Link>

                <button
                    type="button"
                    className="lg:hidden inline-flex items-center justify-center rounded-md border border-white/20 bg-black/40 p-2 text-white hover:bg-black/60 transition"
                    onClick={() => setIsMobileOpen((open) => !open)}
                    aria-label={isMobileOpen ? 'Close menu' : 'Open menu'}
                    aria-expanded={isMobileOpen}
                    aria-controls="mobile-main-menu"
                >
                    {isMobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </button>

                <div className="hidden lg:flex gap-4 lg:gap-8 flex-wrap justify-center items-center font-display">
                    <Link href="/" onClick={closeAllMenus} className="text-white/80 hover:text-white hover:text-shadow-glow transition-all text-sm lg:text-lg font-medium">Home</Link>

                    <div className="relative group desktop-dropdown-container">
                        <button
                            type="button"
                            onClick={() => toggleDesktopDropdown('societies')}
                            className="text-white/80 group-hover:text-white group-hover:text-shadow-glow transition-all text-sm lg:text-lg font-medium flex items-center gap-1"
                            aria-expanded={openDesktopDropdown === 'societies'}
                        >
                            Societies <ChevronDown className={`w-4 h-4 lg:w-5 lg:h-5 transition-transform ${openDesktopDropdown === 'societies' ? 'rotate-180' : ''}`} />
                        </button>
                        {societiesPages.length > 0 && (
                            <div className={`absolute top-full left-0 pt-2 ${openDesktopDropdown === 'societies' ? 'block' : 'hidden group-hover:block'} z-50`}>
                                <div className="flex flex-col bg-black/80 backdrop-blur-md rounded-md p-2 min-w-[200px] shadow-lg border border-white/10">
                                    {societiesPages.map((page) => (
                                        <Link key={page.slug} href={page.path} onClick={closeAllMenus} className="text-white/80 hover:text-white hover:bg-white/10 px-3 py-2 rounded transition-all text-sm lg:text-base">
                                            {page.title}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="relative group desktop-dropdown-container flex items-center gap-1">
                        <Link href="/science" onClick={closeAllMenus} className="text-white/80 group-hover:text-white hover:text-white hover:text-shadow-glow transition-all text-sm lg:text-lg font-medium flex items-center gap-1">
                            Science
                        </Link>
                        {sciencePages.length > 0 && (
                            <>
                                <button
                                    type="button"
                                    onClick={() => toggleDesktopDropdown('science')}
                                    className="text-white/80 hover:text-white group-hover:text-white transition-all p-1"
                                    aria-label="Toggle Science menu"
                                    aria-expanded={openDesktopDropdown === 'science'}
                                >
                                    <ChevronDown className={`w-4 h-4 lg:w-5 lg:h-5 transition-transform ${openDesktopDropdown === 'science' ? 'rotate-180' : ''}`} />
                                </button>
                                <div className={`absolute top-full left-0 pt-2 ${openDesktopDropdown === 'science' ? 'block' : 'hidden group-hover:block'} z-50`}>
                                    <div className="flex flex-col bg-black/80 backdrop-blur-md rounded-md p-2 min-w-[250px] shadow-lg border border-white/10">
                                        {sciencePages.map((page) => (
                                            <Link key={page.slug} href={page.path} onClick={closeAllMenus} className="text-white/80 hover:text-white hover:bg-white/10 px-3 py-2 rounded transition-all text-sm lg:text-base">
                                                {page.title}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </>
                        )}
                    </div>

                    <Link href="/resources" onClick={closeAllMenus} className="text-white/80 hover:text-white hover:text-shadow-glow transition-all text-sm lg:text-lg font-medium">Resources</Link>

                    <div className="relative group desktop-dropdown-container">
                        <button
                            type="button"
                            onClick={() => toggleDesktopDropdown('places')}
                            className="text-white/80 group-hover:text-white group-hover:text-shadow-glow transition-all text-sm lg:text-lg font-medium flex items-center gap-1"
                            aria-expanded={openDesktopDropdown === 'places'}
                        >
                            Places to Visit <ChevronDown className={`w-4 h-4 lg:w-5 lg:h-5 transition-transform ${openDesktopDropdown === 'places' ? 'rotate-180' : ''}`} />
                        </button>
                        <div className={`absolute top-full left-0 pt-2 ${openDesktopDropdown === 'places' ? 'block' : 'hidden group-hover:block'} z-50`}>
                            <div className="flex flex-col bg-black/80 backdrop-blur-md rounded-md p-2 min-w-[220px] shadow-lg border border-white/10">
                                <Link href="/days-out" onClick={closeAllMenus} className="text-white/80 hover:text-white hover:bg-white/10 px-3 py-2 rounded transition-all text-sm lg:text-base">
                                    Days Out
                                </Link>
                                <Link href="/dark-sky-sites" onClick={closeAllMenus} className="text-white/80 hover:text-white hover:bg-white/10 px-3 py-2 rounded transition-all text-sm lg:text-base">
                                    Dark Sky Sites
                                </Link>
                                <Link href="/events" onClick={closeAllMenus} className="text-white/80 hover:text-white hover:bg-white/10 px-3 py-2 rounded transition-all text-sm lg:text-base">
                                    Events
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="relative group desktop-dropdown-container">
                        <button
                            type="button"
                            onClick={() => toggleDesktopDropdown('info')}
                            className="text-white/80 group-hover:text-white group-hover:text-shadow-glow transition-all text-sm lg:text-lg font-medium flex items-center gap-1"
                            aria-expanded={openDesktopDropdown === 'info'}
                        >
                            Information <ChevronDown className={`w-4 h-4 lg:w-5 lg:h-5 transition-transform ${openDesktopDropdown === 'info' ? 'rotate-180' : ''}`} />
                        </button>
                        <div className={`absolute top-full left-0 pt-2 ${openDesktopDropdown === 'info' ? 'block' : 'hidden group-hover:block'} z-50`}>
                            <div className="flex flex-col bg-black/80 backdrop-blur-md rounded-md p-2 min-w-[220px] shadow-lg border border-white/10">
                                <Link href="/advertisers" onClick={closeAllMenus} className="text-white/80 hover:text-white hover:bg-white/10 px-3 py-2 rounded transition-all text-sm lg:text-base">
                                    Advertisers
                                </Link>
                                <Link href="/contact" onClick={closeAllMenus} className="text-white/80 hover:text-white hover:bg-white/10 px-3 py-2 rounded transition-all text-sm lg:text-base">
                                    Contact
                                </Link>
                                <Link href="/officers" onClick={closeAllMenus} className="text-white/80 hover:text-white hover:bg-white/10 px-3 py-2 rounded transition-all text-sm lg:text-base">
                                    Officers
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {isMobileOpen && (
                <div className="lg:hidden">
                    <button
                        type="button"
                        className="fixed inset-0 z-40 bg-black/55"
                        aria-label="Close menu"
                        onClick={closeAllMenus}
                    />
                    <div id="mobile-main-menu" className="relative z-50 mt-3 px-4">
                        <div className="rounded-lg border border-white/15 bg-black/90 backdrop-blur-md p-3 font-display space-y-2">
                            <Link href="/" onClick={closeAllMenus} className="block px-3 py-2 rounded text-white/90 hover:bg-white/10">Home</Link>

                            <button type="button" onClick={() => toggleSection('societies')} className="w-full flex items-center justify-between px-3 py-2 rounded text-white/90 hover:bg-white/10">
                                <span>Societies</span>
                                <ChevronDown className={`h-4 w-4 transition-transform ${openSection === 'societies' ? 'rotate-180' : ''}`} />
                            </button>
                            {openSection === 'societies' && (
                                <div className="pl-4 pb-1 space-y-1">
                                    {societiesPages.map((page) => (
                                        <Link key={page.slug} href={page.path} onClick={closeAllMenus} className="block px-3 py-2 rounded text-white/80 hover:bg-white/10">
                                            {page.title}
                                        </Link>
                                    ))}
                                </div>
                            )}

                            <div className="flex items-center gap-1">
                                <Link href="/science" onClick={closeAllMenus} className="flex-1 px-3 py-2 rounded text-white/90 hover:bg-white/10">
                                    Science
                                </Link>
                                <button
                                    type="button"
                                    onClick={() => toggleSection('science')}
                                    className="px-3 py-2 rounded text-white/90 hover:bg-white/10"
                                    aria-label="Toggle Science submenu"
                                    aria-expanded={openSection === 'science'}
                                >
                                    <ChevronDown className={`h-4 w-4 transition-transform ${openSection === 'science' ? 'rotate-180' : ''}`} />
                                </button>
                            </div>
                            {openSection === 'science' && (
                                <div className="pl-4 pb-1 space-y-1">
                                    {sciencePages.map((page) => (
                                        <Link key={page.slug} href={page.path} onClick={closeAllMenus} className="block px-3 py-2 rounded text-white/80 hover:bg-white/10">
                                            {page.title}
                                        </Link>
                                    ))}
                                </div>
                            )}

                            <button type="button" onClick={() => toggleSection('places')} className="w-full flex items-center justify-between px-3 py-2 rounded text-white/90 hover:bg-white/10">
                                <span>Places to Visit</span>
                                <ChevronDown className={`h-4 w-4 transition-transform ${openSection === 'places' ? 'rotate-180' : ''}`} />
                            </button>
                            {openSection === 'places' && (
                                <div className="pl-4 pb-1 space-y-1">
                                    <Link href="/days-out" onClick={closeAllMenus} className="block px-3 py-2 rounded text-white/80 hover:bg-white/10">Days Out</Link>
                                    <Link href="/dark-sky-sites" onClick={closeAllMenus} className="block px-3 py-2 rounded text-white/80 hover:bg-white/10">Dark Sky Sites</Link>
                                    <Link href="/events" onClick={closeAllMenus} className="block px-3 py-2 rounded text-white/80 hover:bg-white/10">Events</Link>
                                </div>
                            )}

                            <Link href="/resources" onClick={closeAllMenus} className="block px-3 py-2 rounded text-white/90 hover:bg-white/10">Resources</Link>
                            <button type="button" onClick={() => toggleSection('info')} className="w-full flex items-center justify-between px-3 py-2 rounded text-white/90 hover:bg-white/10">
                                <span>Information</span>
                                <ChevronDown className={`h-4 w-4 transition-transform ${openSection === 'info' ? 'rotate-180' : ''}`} />
                            </button>
                            {openSection === 'info' && (
                                <div className="pl-4 pb-1 space-y-1">
                                    <Link href="/advertisers" onClick={closeAllMenus} className="block px-3 py-2 rounded text-white/80 hover:bg-white/10">Advertisers</Link>
                                    <Link href="/contact" onClick={closeAllMenus} className="block px-3 py-2 rounded text-white/80 hover:bg-white/10">Contact</Link>
                                    <Link href="/officers" onClick={closeAllMenus} className="block px-3 py-2 rounded text-white/80 hover:bg-white/10">Officers</Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}
