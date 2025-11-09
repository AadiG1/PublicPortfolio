import { Metadata } from "next";
import SkillsGrid from "@/components/SkillsGrid";
import SafeHtml from "@/components/SafeHtml";
import { getResume } from "@/lib/data";

export const metadata: Metadata = {
  title: "Skills | Vibe Portfolio",
  description: "My technical skills and proficiency levels",
};

export default function SkillsPage() {
  const resume = getResume();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-12 dark:text-white">
        Skills & Technologies
      </h1>
      <SkillsGrid />
      {(resume.summaryHtml || resume.summaryText || resume.summary) && (
        <div className="mt-12 max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-4 dark:text-white">
            Summary
          </h2>
          <div className="text-lg text-gray-700 dark:text-gray-300">
            {resume.summaryHtml ? (
              <SafeHtml html={resume.summaryHtml} />
            ) : (
              <p>{resume.summaryText || resume.summary}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

