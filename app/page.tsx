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
  const featuredProjects = hasResumeProjects
    ? resumeProjects.slice(0, 3)
    : portfolioProjects.slice(0, 3);

  return (
    <div className="container mx-auto px-4 py-8">
      <Hero />
      <section id="skills" className="py-16">
        <h2 className="text-3xl font-bold text-center mb-8 dark:text-white">
          Skills
        </h2>
        <SkillsGrid />
      </section>
      <section id="projects" className="py-16">
        <h2 className="text-3xl font-bold text-center mb-8 dark:text-white">
          Featured Projects
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {hasResumeProjects
            ? featuredProjects.map((project, index) => (
                <ResumeProjectCard
                  key={index}
                  project={project}
                  image={`/images/project-${(index % 3) + 1}.jpg`}
                />
              ))
            : featuredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
        </div>
      </section>
    </div>
  );
}

