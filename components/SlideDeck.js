'use client';

export default function SlideDeck({ slides }) {
    return (
        <div className="snap-y snap-mandatory h-screen w-screen h-[100dvh] overflow-y-scroll scroll-smooth bg-transparent text-white">
            {slides.map((slideContent, index) => (
                <div key={index} className="snap-start h-screen h-[100dvh] w-screen flex flex-col items-center justify-center p-4 md:p-8 relative border-b border-white/10">
                    <Slide content={slideContent} />
                </div>
            ))}
        </div>
    )
}

import Slide from './Slide'; // Circular dependency if in same file? moving Slide to separate file or below.
