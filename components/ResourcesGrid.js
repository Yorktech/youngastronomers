import Link from 'next/link';

export default function ResourcesGrid({ posts }) {
    if (!posts || posts.length === 0) return null;

    return (
        <div style={{ display: 'grid', gap: '2rem', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', width: '100%', marginTop: '2rem', textAlign: 'left' }}>
            {posts.map((post) => (
                <Link href={`/resources/${post.slug}`} key={post.slug}>
                    <div className="glass-card" style={{ height: '100%', display: 'flex', flexDirection: 'column', transition: 'transform 0.2s', padding: '1.5rem' }}>
                        <h2 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: '#ffffff', fontWeight: 'bold' }}>{post.title}</h2>
                        <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem', marginBottom: '1rem' }}>
                            {post.date}
                        </p>
                        <p style={{ color: '#ffffff', flex: 1, fontSize: '0.95rem', lineHeight: '1.5' }}>
                            {post.excerpt}
                        </p>
                        <span style={{
                            marginTop: '1.5rem',
                            color: '#a855f7', // purple-400
                            fontWeight: 'bold',
                            display: 'inline-block',
                            fontSize: '0.9rem'
                        }}>
                            Read Article &rarr;
                        </span>
                    </div>
                </Link>
            ))}
        </div>
    );
}
