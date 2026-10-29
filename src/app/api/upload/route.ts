import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const GITHUB_TOKEN = process.env.GITHUB_TOKEN || '';
const REPO_OWNER = process.env.GITHUB_REPO_OWNER || 'chayamadvertising';
const REPO_NAME = process.env.GITHUB_REPO_NAME || 'jubu-protoflio';

async function commitToGitHub(folder: string, filename: string, buffer: Buffer): Promise<string | null> {
  if (!GITHUB_TOKEN) {
    return null;
  }

  try {
    const url = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/public/${folder}/${filename}`;
    const res = await fetch(url, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${GITHUB_TOKEN}`,
        'Accept': 'application/vnd.github+json',
        'User-Agent': 'jubu-portfolio-app',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: `feat(upload): add ${folder}/${filename} [admin]`,
        content: buffer.toString('base64'),
        branch: 'main',
      }),
    });

    if (res.ok) {
      // Direct raw GitHub URL - accessible globally immediately without waiting for rebuild
      return `https://raw.githubusercontent.com/${REPO_OWNER}/${REPO_NAME}/main/public/${folder}/${filename}`;
    } else {
      const err = await res.text();
      console.error('GitHub API error:', res.status, err);
      return null;
    }
  } catch (error) {
    console.error('GitHub API commit failed:', error);
    return null;
  }
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const type = (formData.get('type') as string) || 'image'; // 'video' | 'image'
    const folder = type === 'image' ? 'designs' : 'videos';

    // Support multiple files or single file
    const multiFiles = formData.getAll('files') as File[];
    const singleFile = formData.get('file') as File | null;
    const filesToProcess: File[] = multiFiles.length > 0 ? multiFiles : singleFile ? [singleFile] : [];

    if (filesToProcess.length === 0) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const uploadedResults: Array<{ url: string; filename: string; originalName: string; size: number }> = [];

    // Local upload directory (for local dev / server)
    const uploadDir = path.join(process.cwd(), 'public', folder);
    const isVercel = process.env.VERCEL === '1';

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

      let publicUrl = `/${folder}/${filename}`;
      let diskSaved = false;

      // 1. Try writing to local disk (succeeds in local development)
      try {
        if (!fs.existsSync(uploadDir)) {
          fs.mkdirSync(uploadDir, { recursive: true });
        }
        const filePath = path.join(uploadDir, filename);
        fs.writeFileSync(filePath, buffer);
        diskSaved = true;
      } catch (err: any) {
        // Expected on read-only environments like Vercel serverless
        console.warn('Local filesystem write skipped/failed:', err?.message);
      }

      // 2. If running on Vercel or local disk write failed, commit directly to GitHub repository
      if (isVercel || !diskSaved) {
        const ghUrl = await commitToGitHub(folder, filename, buffer);
        if (ghUrl) {
          publicUrl = ghUrl;
        } else if (!diskSaved) {
          // If GitHub API also failed and disk is read-only, return base64 data url as fallback
          const mime = type === 'image' ? (file.type || 'image/jpeg') : 'video/mp4';
          publicUrl = `data:${mime};base64,${buffer.toString('base64')}`;
        }
      }

      uploadedResults.push({
        url: publicUrl,
        filename,
        originalName: file.name.replace(originalExt, '').replace(/[_-]/g, ' '),
        size: buffer.length,
      });
    }

    // Single file response format
    if (filesToProcess.length === 1 && !multiFiles.length) {
      return NextResponse.json({
        success: true,
        url: uploadedResults[0].url,
        filename: uploadedResults[0].filename,
        size: uploadedResults[0].size,
      });
    }

    // Multiple files response format
    return NextResponse.json({
      success: true,
      count: uploadedResults.length,
      uploaded: uploadedResults,
    });
  } catch (error: any) {
    console.error('File upload error:', error);
    return NextResponse.json({ error: error.message || 'Upload failed' }, { status: 500 });
  }
}
