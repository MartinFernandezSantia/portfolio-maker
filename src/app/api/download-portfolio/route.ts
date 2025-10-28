import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import archiver from 'archiver';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { fullname, email, apiKey } = body;

        const testDownloadPath = path.join(process.cwd(), 'src', 'test_download');
        const envPath = path.join(testDownloadPath, '.env');

        const envContent = `# Personal Information
            FULLNAME=${fullname}
            EMAIL=${email}

            # API Configuration
            API_KEY=${apiKey}
            `;

        fs.writeFileSync(envPath, envContent);

        const archive = archiver('zip', {
            zlib: { level: 9 }
        });

        const chunks: Buffer[] = [];

        archive.on('data', (chunk: Buffer) => {
            chunks.push(chunk);
        });

        archive.directory(testDownloadPath, 'test_download');

        await new Promise((resolve, reject) => {
            archive.on('end', resolve);
            archive.on('error', reject);
            archive.finalize();
        });

        fs.unlinkSync(envPath);

        const zipBuffer = Buffer.concat(chunks);

        return new NextResponse(zipBuffer, {
            headers: {
                'Content-Type': 'application/zip',
                'Content-Disposition': 'attachment; filename="portfolio.zip"',
            },
        });
    } catch (error) {
        console.error('Error creating zip:', error);
        return NextResponse.json(
            { error: 'Failed to create zip file' },
            { status: 500 }
        );
    }
}
