import { Experience, Education } from "@/lib/data";
import SafeHtml from "./SafeHtml";

interface TimelineProps {
  items: Experience[] | Education[];
  type: "experience" | "education";
}

export default function Timeline({ items, type }: TimelineProps) {
  if (!items || items.length === 0) {
    return (
      <p className="text-gray-600 dark:text-gray-400">No items to display.</p>
    );
  }

  return (
    <div className="relative">
      <div className="absolute left-4 h-full w-1 transform rounded-full bg-gradient-to-b from-blue-400 to-purple-500 dark:from-blue-600 dark:to-purple-600 md:left-1/2 md:-translate-x-1/2" />
      <div className="space-y-12">
        {items.map((item, index) => {
          const exp = type === "experience" ? (item as Experience) : null;
          const edu = type === "education" ? (item as Education) : null;

          const startDate = item.startDate || "N/A";
          const endDate =
            type === "experience"
              ? exp?.current
                ? "Present"
                : exp?.endDate || "Present"
              : edu?.endDate || "N/A";

          return (
            <div
              key={index}
              className="relative animate-slide-up pl-12 md:pl-0"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="absolute left-2 z-10 h-6 w-6 transform rounded-full border-4 border-white bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg dark:border-gray-900 md:left-1/2 md:-translate-x-1/2" />
              <div className="gap-8 md:flex md:items-start">
                <div className="md:w-1/2 md:pr-8 md:text-right">
                  <div className="mb-2 inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                    {startDate} - {endDate}
                  </div>
                  {type === "experience" && exp && (
                    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-lg transition-all duration-300 hover:shadow-xl dark:border-gray-700 dark:bg-gray-800">
                      <h3 className="mb-1 mt-2 text-xl font-bold dark:text-white">
                        {exp.title}
                      </h3>
                      <p className="mb-1 text-lg font-semibold text-blue-600 dark:text-blue-400">
                        {exp.company}
                      </p>
                      {exp.location && (
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          📍 {exp.location}
                        </p>
                      )}
                    </div>
                  )}
                  {type === "education" && edu && (
                    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-lg transition-all duration-300 hover:shadow-xl dark:border-gray-700 dark:bg-gray-800">
                      <h3 className="mb-1 mt-2 text-xl font-bold dark:text-white">
                        {edu.degree}
                      </h3>
                      <p className="mb-1 text-lg font-semibold text-purple-600 dark:text-purple-400">
                        {edu.school}
                      </p>
                      {edu.location && (
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          📍 {edu.location}
                        </p>
                      )}
                    </div>
                  )}
                </div>
                <div className="mt-4 md:mt-0 md:w-1/2 md:pl-8">
                  {type === "experience" && exp && (
                    <div className="rounded-xl border border-gray-200 bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-900/50">
                      <div className="leading-relaxed text-gray-700 dark:text-gray-300">
                        {exp.bulletsHtml && exp.bulletsHtml.length > 0 ? (
                          <ul className="list-inside list-disc space-y-2">
                            {exp.bulletsHtml.map((bullet, i) => (
                              <li key={i}>
                                <SafeHtml html={bullet} />
                              </li>
                            ))}
                          </ul>
                        ) : exp.bullets && exp.bullets.length > 0 ? (
                          <ul className="list-inside list-disc space-y-2">
                            {exp.bullets.map((bullet, i) => (
                              <li key={i}>{bullet}</li>
                            ))}
                          </ul>
                        ) : exp.description ? (
                          <p>{exp.description}</p>
                        ) : null}
                      </div>
                    </div>
                  )}
                  {type === "education" && edu && (
                    <div className="rounded-xl border border-gray-200 bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-900/50">
                      <div className="leading-relaxed text-gray-700 dark:text-gray-300">
                        {edu.descriptionHtml ? (
                          <SafeHtml html={edu.descriptionHtml} />
                        ) : edu.description ? (
                          <p>{edu.description}</p>
                        ) : null}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
