'use client';

import ReactMarkdown from 'react-markdown';
import ApodSection from './ApodSection';
import Link from 'next/link';

export default function Slide({ content, meta }) {
    return (
        <div className={`font-sans prose prose-invert max-w-4xl w-full text-center ${meta?.glass ? 'glass-card' : ''}`}>
            <ReactMarkdown
                components={{
                    a: ({ node, ...props }) => <Link {...props} className="text-purple-400 hover:text-purple-300 underline" />,
                    h1: ({ node, ...props }) => <h1 {...props} className="font-sans text-5xl font-extrabold mb-6 tracking-tight" />,
                    h2: ({ node, ...props }) => <h2 {...props} className="text-3xl font-bold mb-4 text-white" />,
                    p: ({ node, children, ...props }) => {
                        if (children && children === 'APOD_SECTION') {
                            return (
                                <div className="w-full my-8">
                                    <ApodSection />
                                </div>
                            );
                        }
                        return <p {...props} className="text-xl text-white mb-6 leading-relaxed">{children}</p>;
                    },
                }}
            >
                {content}
            </ReactMarkdown>
        </div>
    );
}
