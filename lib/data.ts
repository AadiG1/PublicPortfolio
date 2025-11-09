import resumeData from "@/content/resume.json";
import projectsData from "@/content/projects.json";

export interface Skill {
  name: string;
  level?: number;
  category?: string;
}

export interface Experience {
  title: string;
  company: string;
  location?: string;
  startDate?: string;
  endDate?: string | null;
  current?: boolean;
  bullets?: string[];
  bulletsHtml?: string[];
  description?: string; // For backward compatibility
}

export interface Education {
  degree: string;
  school: string;
  location?: string;
  startDate?: string;
  endDate?: string;
  description?: string;
  descriptionHtml?: string;
}

export interface Award {
  title: string;
  organization?: string;
  date?: string;
  description?: string;
  descriptionHtml?: string;
}

export interface ResumeProject {
  name: string;
  role?: string;
  startDate?: string;
  endDate?: string;
  bullets?: string[];
  bulletsHtml?: string[];
  links?: string[];
}

export interface Resume {
  summaryText?: string;
  summaryHtml?: string;
  summary?: string; // For backward compatibility
  skills?: Skill[];
  experience?: Experience[];
  education?: Education[];
  projects?: ResumeProject[];
  awards?: Award[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  technologies: string[];
  image: string;
  githubUrl: string;
  liveUrl: string;
  featured: boolean;
}

export function getResume(): Resume {
  const data = resumeData as Resume;
  // Provide backward compatibility
  if (data.summaryText && !data.summary) {
    data.summary = data.summaryText;
  }
  if (data.summaryHtml && !data.summaryText) {
    data.summaryText = data.summaryHtml.replace(/<[^>]+>/g, "").trim();
  }
  return data;
}

export function getProjects(): Project[] {
  return projectsData.projects as Project[];
}

export function getProject(id: string): Project | undefined {
  return getProjects().find((project) => project.id === id);
}
