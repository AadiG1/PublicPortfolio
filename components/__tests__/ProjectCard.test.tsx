import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import ProjectCard from "../ProjectCard";
import { Project } from "@/lib/data";

const mockProject: Project = {
  id: "1",
  title: "Test Project",
  description: "Test description",
  longDescription: "Long test description",
  technologies: ["React", "TypeScript"],
  image: "/images/project-1.jpg",
  githubUrl: "https://github.com/test",
  liveUrl: "https://test.com",
  featured: true,
};

describe("ProjectCard", () => {
  it("renders project title and description", () => {
    render(<ProjectCard project={mockProject} />);
    expect(screen.getByText("Test Project")).toBeInTheDocument();
    expect(screen.getByText("Test description")).toBeInTheDocument();
  });

  it("renders project technologies", () => {
    render(<ProjectCard project={mockProject} />);
    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("TypeScript")).toBeInTheDocument();
  });

  it("renders GitHub and Live Demo links", () => {
    render(<ProjectCard project={mockProject} />);
    expect(screen.getByText("GitHub")).toBeInTheDocument();
    expect(screen.getByText("Live Demo")).toBeInTheDocument();
  });
});
