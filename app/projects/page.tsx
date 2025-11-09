import { Metadata } from "next";
import ProjectCard from "@/components/ProjectCard";
import ResumeProjectCard from "@/components/ResumeProjectCard";
import { getProjects, getResume } from "@/lib/data";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Projects | Vibe Portfolio",
  description: "Explore my portfolio of web development projects",
};

export default function ProjectsPage() {
  const resume = getResume();
  const portfolioProjects = getProjects();
  const resumeProjects = resume.projects || [];

  // Use resume projects if available, otherwise fall back to portfolio projects
  const hasResumeProjects = resumeProjects.length > 0;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-12 dark:text-white">
        My Projects
      </h1>

      {hasResumeProjects ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resumeProjects.map((project, index) => (
            <ResumeProjectCard
              key={index}
              project={project}
              image={`/images/project-${(index % 3) + 1}.jpg`}
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolioProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </div>
  );
}

