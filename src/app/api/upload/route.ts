import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const type = (formData.get('type') as string) || 'image'; // 'video' | 'image'
    const folder = type === 'image' ? 'designs' : 'videos';
    const uploadDir = path.join(process.cwd(), 'public', folder);

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    // Check for multiple files
    const multiFiles = formData.getAll('files') as File[];
    const singleFile = formData.get('file') as File | null;

    const filesToProcess: File[] = multiFiles.length > 0 ? multiFiles : singleFile ? [singleFile] : [];

    if (filesToProcess.length === 0) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const uploadedResults: Array<{ url: string; filename: string; originalName: string; size: number }> = [];

    for (let i = 0; i < filesToProcess.length; i++) {
      const file = filesToProcess[i];
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const originalExt = path.extname(file.name) || (type === 'image' ? '.jpg' : '.mp4');
      const safeBase = file.name
        .replace(originalExt, '')
        .replace(/[^a-zA-Z0-9_-]/g, '_')
        .substring(0, 20);
      const filename = `${safeBase}_${Date.now()}_${i + 1}${originalExt}`;
      const filePath = path.join(uploadDir, filename);

      fs.writeFileSync(filePath, buffer);

      const publicUrl = `/${folder}/${filename}`;
      uploadedResults.push({
        url: publicUrl,
        filename,
        originalName: file.name.replace(originalExt, '').replace(/[_-]/g, ' '),
        size: buffer.length
      });
    }

    // Single file response for backward compatibility
    if (filesToProcess.length === 1 && !multiFiles.length) {
      return NextResponse.json({
        success: true,
        url: uploadedResults[0].url,
        filename: uploadedResults[0].filename,
        size: uploadedResults[0].size
      });
    }

    // Multiple files response
    return NextResponse.json({
      success: true,
      count: uploadedResults.length,
      uploaded: uploadedResults
    });
  } catch (error: any) {
    console.error('File upload error:', error);
    return NextResponse.json({ error: error.message || 'Upload failed' }, { status: 500 });
  }
}
