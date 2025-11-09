import { Metadata } from "next";
import Image from "next/image";
import Timeline from "@/components/Timeline";
import PhotoGrid from "@/components/PhotoGrid";
import SafeHtml from "@/components/SafeHtml";
import { getResume } from "@/lib/data";

export const metadata: Metadata = {
  title: "About | Vibe Portfolio",
  description: "Learn more about my background, experience, and education",
};

export default function AboutPage() {
  const resume = getResume();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row gap-8 items-center mb-12">
          <div className="relative w-48 h-48 rounded-full overflow-hidden flex-shrink-0">
            <Image
              src="/images/headshot.jpg"
              alt="Profile picture"
              width={192}
              height={192}
              className="object-cover"
              priority
            />
          </div>
          <div className="flex-1">
            <h1 className="text-4xl font-bold mb-4 dark:text-white">About Me</h1>
            {(resume.summaryHtml || resume.summaryText || resume.summary) && (
              <div className="text-lg text-gray-700 dark:text-gray-300">
                {resume.summaryHtml ? (
                  <SafeHtml html={resume.summaryHtml} />
                ) : (
                  <p>{resume.summaryText || resume.summary}</p>
                )}
              </div>
            )}
          </div>
        </div>

        {resume.experience && resume.experience.length > 0 && (
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 dark:text-white">Experience</h2>
            <Timeline items={resume.experience} type="experience" />
          </section>
        )}

        {resume.education && resume.education.length > 0 && (
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 dark:text-white">Education</h2>
            <Timeline items={resume.education} type="education" />
          </section>
        )}

        {resume.awards && resume.awards.length > 0 && (
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 dark:text-white">Awards</h2>
            <div className="space-y-4">
              {resume.awards.map((award, index) => (
                <div
                  key={index}
                  className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg"
                >
                  <h3 className="text-xl font-semibold dark:text-white">
                    {award.title}
                  </h3>
                  {(award.organization || award.date) && (
                    <p className="text-gray-600 dark:text-gray-400">
                      {[award.organization, award.date].filter(Boolean).join(" • ")}
                    </p>
                  )}
                  {award.descriptionHtml && (
                    <div className="text-gray-700 dark:text-gray-300 mt-2">
                      <SafeHtml html={award.descriptionHtml} />
                    </div>
                  )}
                  {award.description && !award.descriptionHtml && (
                    <p className="text-gray-700 dark:text-gray-300 mt-2">
                      {award.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 dark:text-white">Gallery</h2>
          <PhotoGrid />
        </section>
      </div>
    </div>
  );
}

