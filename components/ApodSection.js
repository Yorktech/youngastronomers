'use client';

import { useState, useEffect } from 'react';

export default function ApodSection() {
    const [apodParams, setApodParams] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchApod() {
            try {
                const res = await fetch('https://api.nasa.gov/planetary/apod?api_key=GoeoXqqfR1HQXUZpRv7TxDv3kpQPG1gdYscFO0Lr');
                const data = await res.json();
                setApodParams(data);
            } catch (error) {
                console.error('Failed to fetch APOD', error);
            } finally {
                setLoading(false);
            }
        }
        fetchApod();
    }, []);

    if (loading) return null;
    if (!apodParams) return null;

    return (
        <>
            <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', overflow: 'hidden' }}>
                {apodParams.media_type === 'image' && (
                    <div style={{ position: 'relative', width: '100%', height: '500px' }}>
                        <img
                            src={apodParams.url}
                            alt={apodParams.title}
                            style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }}
                        />
                    </div>
                )}
                {apodParams.media_type === 'video' && (
                    <div style={{ position: 'relative', width: '100%', height: '500px' }}>
                        <iframe
                            src={apodParams.url}
                            style={{ width: '100%', height: '100%', border: 'none', borderRadius: '8px' }}
                            title="APOD Video"
                        />
                    </div>
                )}

                <div style={{ padding: '1rem' }}>
                    <h3 style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>{apodParams.title}</h3>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>{apodParams.date}</p>
                    <p>{apodParams.explanation}</p>
                    {apodParams.copyright && <p style={{ marginTop: '1rem', fontSize: '0.8rem', opacity: 0.6 }}>&copy; {apodParams.copyright}</p>}
                </div>
            </div>
        </>
    );
}
