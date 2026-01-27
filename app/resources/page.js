import Link from 'next/link';
import { getAllPosts } from '@/lib/posts';

export default function ResourcesPage() {
    const posts = getAllPosts(['slug', 'title', 'excerpt', 'date']);

    return (
        <main className="container" style={{ padding: '8rem 1rem 4rem 1rem', minHeight: '80vh' }}>
            <h1 style={{
                fontSize: '3rem',
                marginBottom: '3rem',
                textAlign: 'center',
                textAlign: 'center',
                color: '#ffffff',
            }}>
                Resources
            </h1>

            <div style={{ display: 'grid', gap: '2rem', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}>
                {posts.map((post) => (
                    <Link href={`/resources/${post.slug}`} key={post.slug}>
                        <div className="glass-card" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                            <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: '#ffffff' }}>{post.title}</h2>
                            <p style={{ color: '#ffffff', fontSize: '0.9rem', marginBottom: '1rem' }}>
                                {post.date}
                            </p>
                            <p style={{ color: '#ffffff', flex: 1 }}>
                                {post.excerpt}
                            </p>
                            <span style={{
                                marginTop: '1.5rem',
                                color: '#ffffff',
                                fontWeight: 'bold',
                                display: 'inline-block'
                            }}>
                                Read Article &rarr;
                            </span>
                        </div>
                    </Link>
                ))}
            </div>
        </main>
    );
}
