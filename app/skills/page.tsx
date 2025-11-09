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
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-5xl font-extrabold dark:text-white md:text-6xl">
            Skills & Technologies
          </h1>
          <p className="mx-auto max-w-2xl text-xl text-gray-600 dark:text-gray-400">
            Technologies and tools I use to bring ideas to life
          </p>
        </div>
        <SkillsGrid />
        {(resume.summaryHtml || resume.summaryText || resume.summary) && (
          <div className="mx-auto mt-16 max-w-3xl rounded-2xl bg-gradient-to-br from-blue-50 to-purple-50 p-8 shadow-lg dark:from-gray-800 dark:to-gray-900">
            <h2 className="mb-6 text-center text-3xl font-bold dark:text-white">
              Professional Summary
            </h2>
            <div className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
              {resume.summaryHtml ? (
                <SafeHtml html={resume.summaryHtml} />
              ) : (
                <p>{resume.summaryText || resume.summary}</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
