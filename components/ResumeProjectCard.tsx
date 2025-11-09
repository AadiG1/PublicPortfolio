import Image from "next/image";
import { ResumeProject } from "@/lib/data";
import SafeHtml from "./SafeHtml";

interface ResumeProjectCardProps {
  project: ResumeProject;
  image?: string;
}

export default function ResumeProjectCard({
  project,
  image,
}: ResumeProjectCardProps) {
  return (
    <div className="group transform overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl dark:border-gray-700 dark:bg-gray-800">
      {image && (
        <div className="relative h-56 w-full overflow-hidden">
          <Image
            src={image}
            alt={project.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </div>
      )}
      <div className="p-6">
        <h3 className="mb-2 text-2xl font-bold transition-colors group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
          {project.name}
        </h3>
        {project.role && (
          <p className="mb-2 font-medium text-gray-600 dark:text-gray-400">
            {project.role}
          </p>
        )}
        {(project.startDate || project.endDate) && (
          <p className="mb-4 text-sm font-medium text-gray-500 dark:text-gray-500">
            {project.startDate || ""} - {project.endDate || "Present"}
          </p>
        )}
        {project.bulletsHtml && project.bulletsHtml.length > 0 ? (
          <ul className="mb-4 list-inside list-disc space-y-2 text-gray-700 dark:text-gray-300">
            {project.bulletsHtml.map((bullet, i) => (
              <li key={i} className="leading-relaxed">
                <SafeHtml html={bullet} />
              </li>
            ))}
          </ul>
        ) : project.bullets && project.bullets.length > 0 ? (
          <ul className="mb-4 list-inside list-disc space-y-2 text-gray-700 dark:text-gray-300">
            {project.bullets.map((bullet, i) => (
              <li key={i} className="leading-relaxed">
                {bullet}
              </li>
            ))}
          </ul>
        ) : null}
        {project.links && project.links.length > 0 && (
          <div className="flex gap-4 border-t border-gray-200 pt-4 dark:border-gray-700">
            {project.links.map((link, i) => (
              <a
                key={i}
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="group/link flex items-center gap-2 font-semibold text-blue-600 transition-colors hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
              >
                {link.match(/github/i) ? (
                  <>
                    <svg
                      className="h-5 w-5 transition-transform group-hover/link:translate-x-1"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                    GitHub
                  </>
                ) : (
                  <>
                    <svg
                      className="h-5 w-5 transition-transform group-hover/link:translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                    View Project
                  </>
                )}
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
