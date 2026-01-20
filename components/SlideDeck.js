'use client';

import Slide from './Slide';

export default function SlideDeck({ slides, pageMeta }) {
    const showScrollIndicator = pageMeta?.scrollIndicator !== false;

    return (
        <div className="snap-y snap-mandatory h-screen w-full h-[100dvh] overflow-y-scroll scroll-smooth bg-transparent text-white relative">
            {slides.map((slide, index) => (
                <div key={index} className="snap-start min-h-[100dvh] w-full flex flex-col items-center justify-center p-6 md:p-8 py-20 relative border-b border-white/10 group">
                    <Slide content={slide.content} meta={slide.meta} />

                    {/* Scroll Indicator for all but last slide */}
                    {showScrollIndicator && index < slides.length - 1 && (
                        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="animate-bounce flex flex-col items-center gap-2 text-white/50">
                                <span className="text-xs uppercase tracking-[0.2em] font-light">Scroll</span>
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                                </svg>
                            </div>
                        </div>
                    )}
                </div>
            ))}
        </div>
    )
}
