import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;
    const type = (formData.get('type') as string) || 'video'; // 'video' | 'image'

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Target folder
    const folder = type === 'image' ? 'designs' : 'videos';
    const uploadDir = path.join(process.cwd(), 'public', folder);

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    // Generate safe unique filename
    const originalExt = path.extname(file.name) || (type === 'image' ? '.jpg' : '.mp4');
    const safeBase = file.name
      .replace(originalExt, '')
      .replace(/[^a-zA-Z0-9_-]/g, '_')
      .substring(0, 20);
    const filename = `${safeBase}_${Date.now()}${originalExt}`;
    const filePath = path.join(uploadDir, filename);

    fs.writeFileSync(filePath, buffer);

    const publicUrl = `/${folder}/${filename}`;
    return NextResponse.json({
      success: true,
      url: publicUrl,
      filename,
      size: buffer.length
    });
  } catch (error: any) {
    console.error('File upload error:', error);
    return NextResponse.json({ error: error.message || 'Upload failed' }, { status: 500 });
  }
}
