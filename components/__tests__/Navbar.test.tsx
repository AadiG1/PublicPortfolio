import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import Navbar from "../Navbar";
import { ThemeProvider } from "../ThemeProvider";

// Mock next/navigation
vi.mock("next/navigation", () => ({
  usePathname: () => "/",
}));

describe("Navbar", () => {
  it("renders the navbar with logo", () => {
    render(
      <ThemeProvider>
        <Navbar />
      </ThemeProvider>
    );
    expect(screen.getByText("Vibe Portfolio")).toBeInTheDocument();
  });

  it("renders all navigation links", () => {
    render(
      <ThemeProvider>
        <Navbar />
      </ThemeProvider>
    );
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Projects")).toBeInTheDocument();
    expect(screen.getByText("Skills")).toBeInTheDocument();
    expect(screen.getByText("About")).toBeInTheDocument();
    expect(screen.getByText("Contact")).toBeInTheDocument();
  });

  it("has a dark mode toggle button", () => {
    render(
      <ThemeProvider>
        <Navbar />
      </ThemeProvider>
    );
    const toggleButton = screen.getByLabelText("Toggle dark mode");
    expect(toggleButton).toBeInTheDocument();
  });
});

