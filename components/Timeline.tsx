import { Experience, Education } from "@/lib/data";
import SafeHtml from "./SafeHtml";

interface TimelineProps {
  items: Experience[] | Education[];
  type: "experience" | "education";
}

export default function Timeline({ items, type }: TimelineProps) {
  if (!items || items.length === 0) {
    return <p className="text-gray-600 dark:text-gray-400">No items to display.</p>;
  }

  return (
    <div className="relative">
      <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 h-full w-0.5 bg-gray-300 dark:bg-gray-700" />
      <div className="space-y-8">
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
            <div key={index} className="relative pl-12 md:pl-0">
              <div className="absolute left-2 md:left-1/2 transform md:-translate-x-1/2 w-4 h-4 bg-blue-600 dark:bg-blue-400 rounded-full border-4 border-white dark:border-gray-900" />
              <div className="md:flex md:items-start">
                <div className="md:w-1/2 md:pr-8 md:text-right">
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {startDate} - {endDate}
                  </div>
                  {type === "experience" && exp && (
                    <>
                      <h3 className="text-lg font-semibold dark:text-white mt-1">
                        {exp.title}
                      </h3>
                      <p className="text-gray-700 dark:text-gray-300">
                        {exp.company}
                      </p>
                      {exp.location && (
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {exp.location}
                        </p>
                      )}
                    </>
                  )}
                  {type === "education" && edu && (
                    <>
                      <h3 className="text-lg font-semibold dark:text-white mt-1">
                        {edu.degree}
                      </h3>
                      <p className="text-gray-700 dark:text-gray-300">
                        {edu.school}
                      </p>
                      {edu.location && (
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {edu.location}
                        </p>
                      )}
                    </>
                  )}
                </div>
                <div className="md:w-1/2 md:pl-8 mt-4 md:mt-0">
                  {type === "experience" && exp && (
                    <div className="text-gray-700 dark:text-gray-300">
                      {exp.bulletsHtml && exp.bulletsHtml.length > 0 ? (
                        <ul className="list-disc list-inside space-y-1">
                          {exp.bulletsHtml.map((bullet, i) => (
                            <li key={i}>
                              <SafeHtml html={bullet} />
                            </li>
                          ))}
                        </ul>
                      ) : exp.bullets && exp.bullets.length > 0 ? (
                        <ul className="list-disc list-inside space-y-1">
                          {exp.bullets.map((bullet, i) => (
                            <li key={i}>{bullet}</li>
                          ))}
                        </ul>
                      ) : exp.description ? (
                        <p>{exp.description}</p>
                      ) : null}
                    </div>
                  )}
                  {type === "education" && edu && (
                    <div className="text-gray-700 dark:text-gray-300">
                      {edu.descriptionHtml ? (
                        <SafeHtml html={edu.descriptionHtml} />
                      ) : edu.description ? (
                        <p>{edu.description}</p>
                      ) : null}
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

