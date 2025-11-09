import Hero from "@/components/Hero";
import SkillsGrid from "@/components/SkillsGrid";
import ProjectCard from "@/components/ProjectCard";
import ResumeProjectCard from "@/components/ResumeProjectCard";
import { getProjects, getResume } from "@/lib/data";

export default function Home() {
  const resume = getResume();
  const portfolioProjects = getProjects();
  const resumeProjects = resume.projects || [];

  // Use resume projects if available, otherwise use portfolio projects
  const hasResumeProjects = resumeProjects.length > 0;

  return (
    <div className="min-h-screen">
      <Hero />
      <section id="skills" className="bg-gray-50 py-20 dark:bg-gray-900/50">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-4xl font-extrabold dark:text-white md:text-5xl">
              Skills & Technologies
            </h2>
            <p className="mx-auto max-w-2xl text-xl text-gray-600 dark:text-gray-400">
              Technologies I work with to build amazing digital experiences
            </p>
          </div>
          <SkillsGrid />
        </div>
      </section>
      <section id="projects" className="py-20">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-4xl font-extrabold dark:text-white md:text-5xl">
              Featured Projects
            </h2>
            <p className="mx-auto max-w-2xl text-xl text-gray-600 dark:text-gray-400">
              A selection of my recent work and side projects
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {hasResumeProjects
              ? resumeProjects
                  .slice(0, 3)
                  .map((project, index) => (
                    <ResumeProjectCard
                      key={index}
                      project={project}
                      image={`/images/project-${(index % 3) + 1}.jpg`}
                    />
                  ))
              : portfolioProjects
                  .slice(0, 3)
                  .map((project) => (
                    <ProjectCard key={project.id} project={project} />
                  ))}
          </div>
        </div>
      </section>
    </div>
  );
}
