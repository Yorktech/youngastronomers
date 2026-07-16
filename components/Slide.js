'use client';

import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import remarkGfm from 'remark-gfm';
import rehypeKatex from 'rehype-katex';
import ApodSection from './ApodSection';
import Link from 'next/link';
import ResourcesGrid from './ResourcesGrid';
import MediaPackDialog from './MediaPackDialog';

export default function Slide({ content, meta, customData }) {
    const align = meta?.align === 'left' || meta?.align === 'right' ? meta.align : 'center';
    const textAlignClass = align === 'left' ? 'text-left' : align === 'right' ? 'text-right' : 'text-center';
    const imageAlignClass = align === 'left' ? 'justify-start' : align === 'right' ? 'justify-end' : 'justify-center';
    const imageMarginClass = align === 'left' ? 'mr-auto' : align === 'right' ? 'ml-auto' : 'mx-auto';

    return (
        <div className={`font-sans prose prose-invert max-w-4xl w-full ${textAlignClass} ${meta?.glass ? 'glass-card' : ''}`}>
            <ReactMarkdown
                remarkPlugins={[remarkMath, remarkGfm]}
                rehypePlugins={[rehypeKatex]}
                components={{
                    a: ({ node, ...props }) => <Link {...props} className="text-purple-400 hover:text-purple-300 underline" />,
                    h1: ({ node, ...props }) => <h1 {...props} className="font-display text-5xl font-extrabold mb-6 tracking-tight" />,
                    h2: ({ node, ...props }) => <h2 {...props} className="font-display text-3xl font-bold mb-4 text-white" />,
                    p: ({ node, children, ...props }) => {
                        if (children && children === 'APOD_SECTION') {
                            return (
                                <div className="w-full my-8">
                                    <ApodSection />
                                </div>
                            );
                        }
                        if (children && children === 'RESOURCES_GRID') {
                            return (
                                <div className="w-full my-8">
                                    <ResourcesGrid posts={customData?.posts || []} />
                                </div>
                            );
                        }
                        if (children && children === 'MEDIA_PACK_DIALOG') {
                            return (
                                <div className="w-full my-8">
                                    <MediaPackDialog />
                                </div>
                            );
                        }

                        // Check if the only child is an image. If so, don't wrap it in a <p> tag to prevent invalid HTML warnings
                        // ReactMarkdown sometimes passes images wrapped in paragraphs.
                        const hasImgChild = node && node.children && node.children.some(child => child.tagName === 'img');
                        if (hasImgChild) {
                            return <div className={`w-full flex ${imageAlignClass} my-8`}>{children}</div>;
                        }

                        return <p {...props} className="text-xl text-white mb-6 leading-relaxed">{children}</p>;
                    },
                    img: ({ node, ...props }) => (
                        <img {...props} className={`rounded-lg shadow-2xl max-h-[50vh] object-contain border border-white/10 ${imageMarginClass}`} />
                    ),
                    table: ({ node, ...props }) => (
                        <div className="overflow-x-auto my-8">
                            <table {...props} className="w-full border-collapse border border-white/15 text-left text-base md:text-lg" />
                        </div>
                    ),
                    thead: ({ node, ...props }) => <thead {...props} className="bg-white/5 text-white border-b border-white/15" />,
                    tbody: ({ node, ...props }) => <tbody {...props} className="divide-y divide-white/10" />,
                    tr: ({ node, ...props }) => <tr {...props} className="hover:bg-white/5 transition-colors" />,
                    th: ({ node, ...props }) => <th {...props} className="p-4 font-display font-semibold text-white border-r border-white/15 last:border-r-0" />,
                    td: ({ node, ...props }) => <td {...props} className="p-4 border-r border-white/10 last:border-r-0 text-white/80 leading-relaxed" />,
                }}
            >
                {content}
            </ReactMarkdown>
        </div>
    );
}
