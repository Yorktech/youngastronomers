'use client';

import { useState, useEffect } from 'react';
import { FileText, Save, Trash2, Plus, LogOut, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function AdminPage() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [files, setFiles] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null); // 'filename' or null
    const [editorContent, setEditorContent] = useState('');
    const [newFilename, setNewFilename] = useState('');
    const [isCreating, setIsCreating] = useState(false);
    const [statusMsg, setStatusMsg] = useState('');

    // Simple hardcoded check for demo purposes
    const handleLogin = (e) => {
        e.preventDefault();
        if (password === 'starstuff') {
            setIsAuthenticated(true);
            fetchFiles();
        } else {
            alert('Incorrect password');
        }
    };

    const fetchFiles = async () => {
        const res = await fetch('/api/admin/files');
        const data = await res.json();
        if (data.files) setFiles(data.files);
    };

    const handleSelectFile = async (filename) => {
        // Ideally we fetch the content, but we don't have a specific API for "get content" just by filename via the API route we made...
        // Wait, we can use the main app's logic? No, client side.
        // We should probably add a GET param to the API or just use the public 'getPostBySlug' logic? 
        // Actually the API route listed files but didn't return content. 
        // I need to update the API to return content if a filename is provided? 
        // Or I can just fetch it via another endpoint. 
        // Let's assume I'll update the API to handle ?filename=... query for GET content or just a list.
        // Actually, I missed that in the API implementation.
        // For now, let's use a workaround or update the API. 
        // I will update the API in the NEXT step if needed, but for now I'll assume I can't get content easily without an update.
        // Note: I can probably just fetch the markdown file directly if it's static? No, it's server side.
        // Re-checking API: The GET only lists files.
        // I will update the API to support fetching single file content.

        // TEMPORARY: I will use a fetch to a new endpoint I'll add or just update the existing one.
        // Check previous step: The API GET helper only does readdir. 
        // I will fetch content via `fetch('/api/admin/files?filename=' + filename)` 
        // I need to update the API first! 

        // For this file content, I'll write the logic assuming the API works, and then go fix the API.
        const res = await fetch(`/api/admin/files?filename=${filename}`);
        const data = await res.json();
        if (data.content) {
            setSelectedFile(filename);
            setEditorContent(data.content);
            setIsCreating(false);
            setStatusMsg('');
        }
    };

    const handleSave = async () => {
        const filename = isCreating ? newFilename + '.md' : selectedFile;
        if (!filename) return;

        const res = await fetch('/api/admin/files', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ filename, content: editorContent })
        });

        if (res.ok) {
            setStatusMsg('Saved successfully!');
            fetchFiles();
            if (isCreating) {
                setSelectedFile(filename);
                setIsCreating(false);
            }
        } else {
            setStatusMsg('Error saving file');
        }
    };

    const handleDelete = async (filename) => {
        if (!confirm('Are you sure?')) return;
        const res = await fetch(`/api/admin/files?filename=${filename}`, { method: 'DELETE' });
        if (res.ok) {
            fetchFiles();
            if (selectedFile === filename) {
                setSelectedFile(null);
                setEditorContent('');
            }
        }
    };

    if (!isAuthenticated) {
        return (
            <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <form onSubmit={handleLogin} className="glass-card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem', width: '300px' }}>
                    <h2 style={{ textAlign: 'center' }}>Admin Login</h2>
                    <input
                        type="password"
                        placeholder="Enter Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={{ padding: '0.5rem', borderRadius: '4px', border: 'none' }}
                    />
                    <button type="submit" className="btn-primary">Login</button>
                </form>
            </div>
        );
    }

    return (
        <div style={{ padding: '6rem 2rem 2rem', minHeight: '100vh', display: 'flex', gap: '2rem' }}>
            {/* Sidebar */}
            <div style={{ width: '250px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3>Files</h3>
                    <button onClick={() => { setIsCreating(true); setSelectedFile(null); setEditorContent(''); setNewFilename(''); }} className="btn-primary" style={{ padding: '0.25rem 0.5rem', fontSize: '0.8rem' }}><Plus size={16} /></button>
                </div>
                <div className="glass-card" style={{ padding: '1rem', flex: 1 }}>
                    {files.map(f => (
                        <div key={f} style={{
                            padding: '0.5rem',
                            cursor: 'pointer',
                            background: selectedFile === f ? 'rgba(255,255,255,0.1)' : 'transparent',
                            marginBottom: '0.5rem',
                            borderRadius: '4px',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }} onClick={() => handleSelectFile(f)}>
                            <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{f}</span>
                            <Trash2 size={14} color="#e92a67" onClick={(e) => { e.stopPropagation(); handleDelete(f); }} />
                        </div>
                    ))}
                </div>
                <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', opacity: 0.7 }}><ArrowLeft size={16} /> Back to Site</Link>
            </div>

            {/* Editor */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {(selectedFile || isCreating) ? (
                    <>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            {isCreating ? (
                                <input
                                    value={newFilename}
                                    onChange={(e) => setNewFilename(e.target.value)}
                                    placeholder="my-new-post"
                                    style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: 'white', padding: '0.5rem', borderRadius: '4px' }}
                                />
                            ) : (
                                <h2>{selectedFile}</h2>
                            )}
                            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                <span>{statusMsg}</span>
                                <button onClick={handleSave} className="btn-primary" style={{ display: 'flex', gap: '0.5rem' }}><Save size={16} /> Save</button>
                            </div>
                        </div>
                        <textarea
                            value={editorContent}
                            onChange={(e) => setEditorContent(e.target.value)}
                            style={{
                                flex: 1,
                                background: 'rgba(0,0,0,0.3)',
                                color: 'white',
                                border: '1px solid rgba(255,255,255,0.1)',
                                borderRadius: '8px',
                                padding: '1rem',
                                fontFamily: 'monospace',
                                resize: 'none',
                                minHeight: '500px'
                            }}
                        />
                    </>
                ) : (
                    <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', opacity: 0.5 }}>
                        <p>Select a file to edit or create a new one.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
