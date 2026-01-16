import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const contentDir = path.join(process.cwd(), 'content');

// Helper to ensure we stay in content dir
function getSafePath(filename) {
    const safeFilename = filename.replace(/[^a-zA-Z0-9-_\.]/g, '');
    return path.join(contentDir, safeFilename);
}

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const filename = searchParams.get('filename');

        if (filename) {
            if (!filename.endsWith('.md')) {
                return NextResponse.json({ error: 'Invalid file type' }, { status: 400 });
            }
            const filePath = getSafePath(filename);
            if (fs.existsSync(filePath)) {
                const content = fs.readFileSync(filePath, 'utf8');
                return NextResponse.json({ content });
            } else {
                return NextResponse.json({ error: 'File not found' }, { status: 404 });
            }
        }

        if (!fs.existsSync(contentDir)) {
            return NextResponse.json({ files: [] });
        }
        const files = fs.readdirSync(contentDir).filter(f => f.endsWith('.md'));
        return NextResponse.json({ files });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to list/get files' }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        const { filename, content } = await request.json();
        if (!filename || !content) {
            return NextResponse.json({ error: 'Missing filename or content' }, { status: 400 });
        }

        if (!filename.endsWith('.md')) {
            return NextResponse.json({ error: 'File must end with .md' }, { status: 400 });
        }

        const filePath = getSafePath(filename);
        fs.writeFileSync(filePath, content, 'utf8');

        return NextResponse.json({ success: true, message: 'File saved' });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to save file' }, { status: 500 });
    }
} // NOTE: Next.js 13+ App Router uses named exports like POST, GET

export async function DELETE(request) {
    try {
        const { searchParams } = new URL(request.url);
        const filename = searchParams.get('filename');

        if (!filename) {
            return NextResponse.json({ error: 'Missing filename' }, { status: 400 });
        }

        const filePath = getSafePath(filename);
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }

        return NextResponse.json({ success: true, message: 'File deleted' });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete file' }, { status: 500 });
    }
}
