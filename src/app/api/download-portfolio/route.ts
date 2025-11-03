import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import archiver from 'archiver';
import { z } from 'zod';

// Esquema Zod basado en PortfolioContext
const portfolioSchema = z.object({
  aboutMe: z.object({
    profilePhoto: z.any().optional(),
    fullName: z.string().min(1, { message: "Debes completar tu nombre completo." }),
    jobTitle: z.string().min(1, { message: "Debes completar tu puesto de trabajo." }),
    githubLink: z.string()
      .min(1, { message: "Debes completar tu enlace de GitHub." })
      .regex(/^(https?:\/\/)?(www\.)?github\.com\/[A-Za-z0-9_-]+\/?$/, { message: "El enlace de GitHub debe ser válido, por ejemplo: github.com/usuario" }).optional(),
    linkedinLink: z.string()
      .min(1, { message: "Debes completar tu enlace de LinkedIn." })
      .regex(/^(https?:\/\/)?(www\.)?linkedin\.com\/in\/[A-Za-z0-9_-]+\/?$/, { message: "El enlace de LinkedIn debe ser válido, por ejemplo: linkedin.com/in/usuario" }).optional(),
    email: z.string().email({ message: "Debes ingresar un email válido." }),
    aboutMe: z.string().min(1, { message: "Debes completar la descripción sobre ti." }),
    techStack: z.array(z.string().min(1, { message: "Debes agregar al menos una tecnología." })),
    features: z.array(
      z.object({
        title: z.string().min(1, { message: "Debes completar el título de la característica." }),
        description: z.string().min(1, { message: "Debes completar la descripción de la característica." }),
      })
    ),
  }),
  workExperience: z.array(
    z.object({
      id: z.string().min(1, { message: "Debes completar el ID de la experiencia." }),
      specialty: z.string().min(1, { message: "Debes completar la especialidad." }),
      company: z.string().min(1, { message: "Debes completar la empresa." }),
      location: z.string().min(1, { message: "Debes completar la ubicación." }),
      description: z.string().min(1, { message: "Debes completar la descripción." }),
      startDate: z.string().min(1, { message: "Debes completar la fecha de inicio." }),
      endDate: z.string().min(1, { message: "Debes completar la fecha de fin." }),
    })
  ).optional(),
  education: z.array(
    z.object({
      id: z.string().min(1, { message: "Debes completar el ID de la educación." }),
      title: z.string().min(1, { message: "Debes completar el título." }),
      academy: z.string().min(1, { message: "Debes completar la academia." }),
      startDate: z.string().min(1, { message: "Debes completar la fecha de inicio." }),
      endDate: z.string().min(1, { message: "Debes completar la fecha de fin." }),
      certificateType: z.enum(['diploma', 'course', 'bootcamp', 'other'], { message: "Debes seleccionar el tipo de certificado." }),
      description: z.string().min(1, { message: "Debes completar la descripción." }),
    })
  ).optional(),
  projects: z.array(
    z.object({
      id: z.string().min(1, { message: "Debes completar el ID del proyecto." }),
      projectName: z.string().min(1, { message: "Debes completar el nombre del proyecto." }),
      projectImages: z.any().optional(),
      description: z.string().min(1, { message: "Debes completar la descripción del proyecto." }),
      technologiesUsed: z.array(z.string().min(1, { message: "Debes agregar al menos una tecnología usada." })),
      githubLink: z.string().optional(),
      liveDemoLink: z.string().optional(),
    })
  ).optional(),
  currentSection: z.enum(['about', 'work', 'education', 'projects'], { message: "Debes seleccionar una sección actual." }),
});

// Convierte FormData a objeto y parsea arrays/objetos desde JSON
function formDataToPortfolioObject(formData: FormData) {
  const obj: any = {};
  for (const [key, value] of formData.entries()) {
    if (value instanceof File) {
      obj[key] = value;
      continue;
    }
    try {
      obj[key] = JSON.parse(value as string);
    } catch {
      obj[key] = value;
    }
  }
  return obj;
}

export async function POST(request: Request) {
  try {
    const contentType = request.headers.get('content-type') || '';
    let data: any;

    if (contentType.includes('application/json')) {
      data = await request.json();
    } else if (contentType.includes('multipart/form-data')) {
      const formData = await request.formData();
      data = formDataToPortfolioObject(formData);
    } else {
      return NextResponse.json({ error: 'Tipo de contenido no soportado' }, { status: 400 });
    }

    // Validación Zod
    const result = portfolioSchema.safeParse(data);
    if (!result.success) {
      // Mensajes personalizados por campo
      const errorMessages = result.error.issues.map((err) => {
        return err.message;
      });

      return NextResponse.json(
        { error: 'Datos inválidos', details: errorMessages },
        { status: 400 }
      );
    }

    // Aquí puedes usar result.data para continuar tu lógica
    const { aboutMe } = result.data;
    const testDownloadPath = path.join(process.cwd(), 'src', 'test_download');
    const envPath = path.join(testDownloadPath, '.env');

    const envContent = `# Personal Information
FULLNAME=${aboutMe.fullName}
EMAIL=${aboutMe.email}
JOB_TITLE=${aboutMe.jobTitle}
GITHUB_LINK=${aboutMe.githubLink}
LINKEDIN_LINK=${aboutMe.linkedinLink}
ABOUT_ME=${aboutMe.aboutMe}
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
