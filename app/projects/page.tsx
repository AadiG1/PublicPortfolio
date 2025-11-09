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
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-5xl font-extrabold dark:text-white md:text-6xl">
            My Projects
          </h1>
          <p className="mx-auto max-w-2xl text-xl text-gray-600 dark:text-gray-400">
            Explore my portfolio of work and side projects
          </p>
        </div>

        {hasResumeProjects ? (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {resumeProjects.map((project, index) => (
              <ResumeProjectCard
                key={index}
                project={project}
                image={`/images/project-${(index % 3) + 1}.jpg`}
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {portfolioProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
