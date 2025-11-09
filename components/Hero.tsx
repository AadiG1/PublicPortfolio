import Image from "next/image";
import Link from "next/link";
import { getResume } from "@/lib/data";
import SafeHtml from "./SafeHtml";

export default function Hero() {
  const resume = getResume();
  const summary = resume.summaryHtml || resume.summaryText || resume.summary || "";

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="flex-shrink-0">
            <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden ring-4 ring-blue-500 dark:ring-blue-400">
              <Image
                src="/images/headshot.jpg"
                alt="Profile picture"
                width={256}
                height={256}
                className="object-cover"
                priority
              />
            </div>
          </div>
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 dark:text-white">
              Hi, I'm{" "}
              <span className="text-blue-600 dark:text-blue-400">
                Aditya Gupta
              </span>
            </h1>
            {summary && (
              <div className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-2xl">
                {resume.summaryHtml ? (
                  <SafeHtml html={summary} />
                ) : (
                  <p>{summary}</p>
                )}
              </div>
            )}
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link
                href="/projects"
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                View Projects
              </Link>
              <Link
                href="/contact"
                className="px-6 py-3 border-2 border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400 rounded-lg hover:bg-blue-50 dark:hover:bg-gray-800 transition-colors font-medium"
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

