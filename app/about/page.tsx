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
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-5xl">
          <div className="mb-16 flex flex-col items-center gap-12 md:flex-row">
            <div className="relative flex-shrink-0">
              <div className="relative h-56 w-56 md:h-64 md:w-64">
                <div className="absolute inset-0 animate-pulse rounded-full bg-gradient-to-br from-blue-500 to-purple-600 opacity-20 blur-2xl" />
                <div className="relative h-full w-full overflow-hidden rounded-full shadow-2xl ring-4 ring-white dark:ring-gray-800">
                  <Image
                    src="/images/headshot.jpg"
                    alt="Aditya Gupta - Profile picture"
                    width={256}
                    height={256}
                    className="h-full w-full object-cover"
                    priority
                  />
                </div>
              </div>
            </div>
            <div className="flex-1 text-center md:text-left">
              <h1 className="mb-6 text-5xl font-extrabold dark:text-white md:text-6xl">
                About Me
              </h1>
              {(resume.summaryHtml || resume.summaryText || resume.summary) && (
                <div className="text-xl leading-relaxed text-gray-700 dark:text-gray-300">
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
            <section className="mb-16">
              <h2 className="mb-8 text-center text-4xl font-extrabold dark:text-white md:text-left">
                Experience
              </h2>
              <Timeline items={resume.experience} type="experience" />
            </section>
          )}

          {resume.education && resume.education.length > 0 && (
            <section className="mb-16">
              <h2 className="mb-8 text-center text-4xl font-extrabold dark:text-white md:text-left">
                Education
              </h2>
              <Timeline items={resume.education} type="education" />
            </section>
          )}

          {resume.awards && resume.awards.length > 0 && (
            <section className="mb-16">
              <h2 className="mb-8 text-center text-4xl font-extrabold dark:text-white md:text-left">
                Awards & Recognition
              </h2>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {resume.awards.map((award, index) => (
                  <div
                    key={index}
                    className="rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 to-purple-50 p-6 shadow-lg transition-all duration-300 hover:shadow-xl dark:border-gray-700 dark:from-gray-800 dark:to-gray-900"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 text-xl font-bold text-white">
                        🏆
                      </div>
                      <div className="flex-1">
                        <h3 className="mb-2 text-xl font-bold dark:text-white">
                          {award.title}
                        </h3>
                        {(award.organization || award.date) && (
                          <p className="mb-3 font-medium text-gray-600 dark:text-gray-400">
                            {[award.organization, award.date]
                              .filter(Boolean)
                              .join(" • ")}
                          </p>
                        )}
                        {award.descriptionHtml && (
                          <div className="text-gray-700 dark:text-gray-300">
                            <SafeHtml html={award.descriptionHtml} />
                          </div>
                        )}
                        {award.description && !award.descriptionHtml && (
                          <p className="text-gray-700 dark:text-gray-300">
                            {award.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          <section className="mb-12">
            <h2 className="mb-8 text-center text-4xl font-extrabold dark:text-white md:text-left">
              Gallery
            </h2>
            <PhotoGrid />
          </section>
        </div>
      </div>
    </div>
  );
}
