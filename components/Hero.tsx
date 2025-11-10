import Image from "next/image";
import Link from "next/link";
import { getResume } from "@/lib/data";
import SafeHtml from "./SafeHtml";

export default function Hero() {
  const resume = getResume();
  const summary =
    resume.summaryHtml || resume.summaryText || resume.summary || "";

  return (
    <section className="relative overflow-hidden py-20 md:py-32">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900" />

      <div className="container mx-auto px-4">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-12 md:flex-row">
          {/* Profile Image */}
          <div className="flex-shrink-0 animate-scale-in">
            <div className="relative h-56 w-56 md:h-72 md:w-72">
              <div className="absolute inset-0 animate-pulse rounded-full bg-gradient-to-br from-blue-500 to-purple-600 opacity-20 blur-2xl" />
              <div className="relative h-full w-full transform overflow-hidden rounded-full shadow-2xl ring-4 ring-white transition-transform duration-300 hover:scale-105 dark:ring-gray-800">
                <Image
                  src="/images/headshot.jpeg"
                  alt="Aditya Gupta - Profile picture"
                  width={288}
                  height={288}
                  className="h-full w-full object-cover"
                  priority
                />
              </div>
              <div className="absolute -bottom-2 -right-2 flex h-16 w-16 items-center justify-center rounded-full border-4 border-white bg-green-500 shadow-lg dark:border-gray-900">
                <div className="h-3 w-3 animate-pulse rounded-full bg-white" />
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 animate-slide-up text-center md:text-left">
            <div className="mb-4 inline-block rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
              👋 Welcome to my portfolio
            </div>
            <h1 className="mb-6 text-5xl font-extrabold leading-tight dark:text-white md:text-7xl">
              Hi, I&apos;m{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-purple-400">
                Aditya Gupta
              </span>
            </h1>
            <p className="mb-6 text-xl font-semibold text-gray-700 dark:text-gray-300 md:text-2xl">
              Full-Stack Developer
            </p>
            {summary && (
              <div className="mb-10 max-w-2xl text-lg leading-relaxed text-gray-600 dark:text-gray-400 md:text-xl">
                {resume.summaryHtml ? (
                  <SafeHtml html={summary} />
                ) : (
                  <p>{summary}</p>
                )}
              </div>
            )}
            <div className="flex flex-col justify-center gap-4 sm:flex-row md:justify-start">
              <Link
                href="/projects"
                className="group flex transform items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:from-blue-700 hover:to-purple-700 hover:shadow-xl"
              >
                <span>View Projects</span>
                <svg
                  className="h-5 w-5 transition-transform group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </Link>
              <Link
                href="/contact"
                className="transform rounded-xl border-2 border-gray-300 bg-white px-8 py-4 text-lg font-semibold text-gray-900 shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-blue-500 hover:shadow-lg dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:hover:border-blue-400"
              >
                Get In Touch
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
