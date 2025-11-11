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
    githubLink: z.string().optional().or(z.literal('')),
    linkedinLink: z.string().optional().or(z.literal('')),
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
      description: z.string(),
      startDate: z.string().min(1, { message: "Debes completar la fecha de inicio." }),
      endDate: z.string().min(1, { message: "Debes completar la fecha de fin." }),
    })
  ),
  education: z.array(
    z.object({
      id: z.string().min(1, { message: "Debes completar el ID de la educación." }),
      title: z.string().min(1, { message: "Debes completar el título." }),
      academy: z.string().min(1, { message: "Debes completar la academia." }),
      startDate: z.string().min(1, { message: "Debes completar la fecha de inicio." }),
      endDate: z.string().min(1, { message: "Debes completar la fecha de fin." }),
      certificateType: z.enum(['diploma', 'course', 'bootcamp', 'other'], { message: "Debes seleccionar el tipo de certificado." }),
      description: z.string(),
    })
  ),
  projects: z.array(
    z.object({
      id: z.string().min(1, { message: "Debes completar el ID del proyecto." }),
      projectName: z.string().min(1, { message: "Debes completar el nombre del proyecto." }),
      projectImages: z.any().optional(),
      description: z.string().min(1, { message: "Debes completar la descripción del proyecto." }),
      technologiesUsed: z.array(z.string().min(1, { message: "Debes agregar al menos una tecnología usada." })),
      githubLink: z.string().optional().or(z.literal('')),
      liveDemoLink: z.string().optional().or(z.literal('')),
      imageCount: z.number().optional(),
    })
  ),
  currentSection: z.enum(['about', 'work', 'education', 'projects'], { message: "Debes seleccionar una sección actual." }),
});

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    // Get the JSON data
    const portfolioDataString = formData.get('portfolioData') as string;
    if (!portfolioDataString) {
      return NextResponse.json({ error: 'No portfolio data provided' }, { status: 400 });
    }

    const portfolioData = JSON.parse(portfolioDataString);

    console.log('Received portfolio data:', JSON.stringify(portfolioData, null, 2));

    // Get files
    const profilePhoto = formData.get('profilePhoto') as File | null;

    console.log('Profile photo received:', profilePhoto ? `Yes - ${profilePhoto.name} (${profilePhoto.size} bytes)` : 'No');

    // Collect project images
    const projectImages: Record<string, File[]> = {};
    for (const [key, value] of formData.entries()) {
      if (key.startsWith('projectImage_')) {
        const [, projectId, indexStr] = key.split('_');
        if (!projectImages[projectId]) {
          projectImages[projectId] = [];
        }
        projectImages[projectId][parseInt(indexStr)] = value as File;
      }
    }

    console.log('Project images collected:', Object.keys(projectImages).map(id => ({
      projectId: id,
      imageCount: projectImages[id].length
    })));

    // Add files to portfolio data for validation
    if (portfolioData.aboutMe) {
      portfolioData.aboutMe.profilePhoto = profilePhoto;
    }

    if (portfolioData.projects && Array.isArray(portfolioData.projects)) {
      portfolioData.projects = portfolioData.projects.map((project: { id: string;[key: string]: unknown }) => ({
        ...project,
        projectImages: projectImages[project.id] || [],
      }));
    }

    // Ensure arrays exist (even if empty)
    portfolioData.workExperience = portfolioData.workExperience || [];
    portfolioData.education = portfolioData.education || [];
    portfolioData.projects = portfolioData.projects || [];

    console.log('Portfolio data before validation:', JSON.stringify({
      aboutMe: portfolioData.aboutMe,
      workExperienceCount: portfolioData.workExperience?.length || 0,
      educationCount: portfolioData.education?.length || 0,
      projectsCount: portfolioData.projects?.length || 0,
    }, null, 2));

    // Validate with Zod
    const result = portfolioSchema.safeParse(portfolioData);
    if (!result.success) {
      console.error('Validation errors:', result.error.issues);
      const errorMessages = result.error.issues.map((err) => ({
        path: err.path.join('.'),
        message: err.message,
      }));
      return NextResponse.json(
        {
          error: 'Datos inválidos',
          details: errorMessages,
        },
        { status: 400 }
      );
    }

    const { aboutMe, projects, workExperience, education } = result.data;
    const testDownloadPath = path.join(process.cwd(), 'src', 'test_download');

    console.log('Validated data summary:', {
      workExperienceCount: workExperience.length,
      educationCount: education.length,
      projectsCount: projects.length,
    });

    // Create necessary directories
    const imagesPath = path.join(testDownloadPath, 'public', 'images');
    if (!fs.existsSync(imagesPath)) {
      fs.mkdirSync(imagesPath, { recursive: true });
    }

    console.log('Images directory created at:', imagesPath);

    // Save profile photo
    if (profilePhoto && aboutMe.profilePhoto) {
      const profilePhotoPath = path.join(imagesPath, 'profile.jpg');
      const buffer = Buffer.from(await profilePhoto.arrayBuffer());
      fs.writeFileSync(profilePhotoPath, buffer);
      console.log('Profile photo saved at:', profilePhotoPath);
    } else {
      console.log('No profile photo to save');
    }

    // Save project images
    if (projects) {
      console.log('Processing project images for', projects.length, 'projects');
      for (const project of projects) {
        if (project.projectImages) {
          console.log(`Project ${project.projectName} has ${project.projectImages.length} images`);
          const projectImagesPath = path.join(imagesPath, 'projects', project.id);
          if (!fs.existsSync(projectImagesPath)) {
            fs.mkdirSync(projectImagesPath, { recursive: true });
          }

          for (let i = 0; i < project.projectImages.length; i++) {
            const image = project.projectImages[i];
            if (image instanceof File) {
              const imagePath = path.join(projectImagesPath, `image_${i}.jpg`);
              const buffer = Buffer.from(await image.arrayBuffer());
              fs.writeFileSync(imagePath, buffer);
              console.log(`Saved project image at: ${imagePath}`);
            }
          }
        }
      }
    }

    // Create userData.ts file with all validated data
    const userDataPath = path.join(testDownloadPath, 'src', 'data');
    if (!fs.existsSync(userDataPath)) {
      fs.mkdirSync(userDataPath, { recursive: true });
    }

    const userDataFilePath = path.join(userDataPath, 'userData.ts');

    const userDataContent = `// Auto-generated portfolio data
// This file contains all your portfolio information

export interface Feature {
  title: string;
  description: string;
}

export interface AboutMe {
  fullName: string;
  jobTitle: string;
  githubLink: string;
  linkedinLink: string;
  email: string;
  aboutMe: string;
  techStack: string[];
  features: Feature[];
  hasProfilePhoto: boolean;
}

export interface WorkExperience {
  id: string;
  specialty: string;
  company: string;
  location: string;
  description: string;
  startDate: string;
  endDate: string;
}

export interface Education {
  id: string;
  title: string;
  academy: string;
  startDate: string;
  endDate: string;
  certificateType: 'diploma' | 'course' | 'bootcamp' | 'other';
  description: string;
}

export interface Project {
  id: string;
  projectName: string;
  description: string;
  technologiesUsed: string[];
  githubLink?: string;
  liveDemoLink?: string;
  imageCount: number;
}

// Personal Information
export const aboutMe: AboutMe = ${JSON.stringify(
      {
        fullName: aboutMe.fullName,
        jobTitle: aboutMe.jobTitle,
        githubLink: aboutMe.githubLink,
        linkedinLink: aboutMe.linkedinLink,
        email: aboutMe.email,
        aboutMe: aboutMe.aboutMe,
        techStack: aboutMe.techStack,
        features: aboutMe.features,
        hasProfilePhoto: !!profilePhoto,
      },
      null,
      2
    )};

// Work Experience
export const workExperience: WorkExperience[] = ${JSON.stringify(workExperience, null, 2)};

// Education & Certifications
export const education: Education[] = ${JSON.stringify(education, null, 2)};

// Featured Projects
export const projects: Project[] = ${JSON.stringify(
      projects.map(p => ({
        id: p.id,
        projectName: p.projectName,
        description: p.description,
        technologiesUsed: p.technologiesUsed,
        githubLink: p.githubLink || '',
        liveDemoLink: p.liveDemoLink || '',
        imageCount: p.projectImages?.length || 0,
      })),
      null,
      2
    )};

// Helper functions
export const getProjectImagePath = (projectId: string, imageIndex: number): string => {
  return \`/images/projects/\${projectId}/image_\${imageIndex}.jpg\`;
};

export const getProfileImagePath = (): string => {
  return '/images/profile.jpg';
};

// Get all project images for a specific project
export const getProjectImages = (projectId: string): string[] => {
  const project = projects.find(p => p.id === projectId);
  if (!project) return [];
  
  return Array.from({ length: project.imageCount }, (_, i) => 
    getProjectImagePath(projectId, i)
  );
};

// Get projects by technology
export const getProjectsByTechnology = (technology: string): Project[] => {
  return projects.filter(p => 
    p.technologiesUsed.some(tech => 
      tech.toLowerCase().includes(technology.toLowerCase())
    )
  );
};

// Get projects with live demos
export const getProjectsWithLiveDemo = (): Project[] => {
  return projects.filter(p => p.liveDemoLink && p.liveDemoLink !== '');
};

// Get projects with GitHub links
export const getProjectsWithGitHub = (): Project[] => {
  return projects.filter(p => p.githubLink && p.githubLink !== '');
};

// Get education by certificate type
export const getEducationByType = (type: 'diploma' | 'course' | 'bootcamp' | 'other'): Education[] => {
  return education.filter(edu => edu.certificateType === type);
};

// Get most recent education
export const getMostRecentEducation = (): Education | undefined => {
  return education.sort((a, b) => new Date(b.endDate).getTime() - new Date(a.endDate).getTime())[0];
};

// Get work experience sorted by date (most recent first)
export const getSortedWorkExperience = (): WorkExperience[] => {
  return [...workExperience].sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime());
};
`;

    fs.writeFileSync(userDataFilePath, userDataContent);

    const archive = archiver('zip', {
      zlib: { level: 9 }
    });

    const chunks: Buffer[] = [];

    archive.on('data', (chunk: Buffer) => {
      chunks.push(chunk);
    });

    archive.directory(testDownloadPath, 'portfolio');

    await new Promise((resolve, reject) => {
      archive.on('end', resolve);
      archive.on('error', reject);
      archive.finalize();
    });

    // Cleanup
    if (fs.existsSync(userDataFilePath)) {
      fs.unlinkSync(userDataFilePath);
    }
    if (fs.existsSync(imagesPath)) {
      fs.rmSync(imagesPath, { recursive: true });
    }

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