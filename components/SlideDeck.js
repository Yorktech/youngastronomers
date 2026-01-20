'use client';

export default function SlideDeck({ slides }) {
    return (
        <div className="snap-y snap-mandatory h-screen w-full h-[100dvh] overflow-y-scroll scroll-smooth bg-transparent text-white">
            {slides.map((slide, index) => (
                <div key={index} className="snap-start min-h-[100dvh] w-full flex flex-col items-center justify-center p-6 md:p-8 py-20 relative border-b border-white/10">
                    <Slide content={slide.content} meta={slide.meta} />
                </div>
            ))}
        </div>
    )
}

import Slide from './Slide'; // Circular dependency if in same file? moving Slide to separate file or below.
