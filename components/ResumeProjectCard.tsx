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
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow p-6">
      <h3 className="text-xl font-bold mb-2 dark:text-white">
        {project.name}
      </h3>
      {project.role && (
        <p className="text-gray-600 dark:text-gray-400 mb-2">{project.role}</p>
      )}
      {(project.startDate || project.endDate) && (
        <p className="text-sm text-gray-500 dark:text-gray-500 mb-4">
          {project.startDate || ""} - {project.endDate || "Present"}
        </p>
      )}
      {project.bulletsHtml && project.bulletsHtml.length > 0 ? (
        <ul className="list-disc list-inside space-y-2 mb-4 text-gray-700 dark:text-gray-300">
          {project.bulletsHtml.map((bullet, i) => (
            <li key={i}>
              <SafeHtml html={bullet} />
            </li>
          ))}
        </ul>
      ) : project.bullets && project.bullets.length > 0 ? (
        <ul className="list-disc list-inside space-y-2 mb-4 text-gray-700 dark:text-gray-300">
          {project.bullets.map((bullet, i) => (
            <li key={i}>{bullet}</li>
          ))}
        </ul>
      ) : null}
      {project.links && project.links.length > 0 && (
        <div className="flex gap-4 mt-4">
          {project.links.map((link, i) => (
            <a
              key={i}
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline text-sm"
            >
              {link.match(/github/i) ? "GitHub" : "View Project"}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

