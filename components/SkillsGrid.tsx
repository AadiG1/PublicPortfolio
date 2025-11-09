import { getResume } from "@/lib/data";

export default function SkillsGrid() {
  const resume = getResume();

  if (!resume.skills || resume.skills.length === 0) {
    return (
      <p className="text-gray-600 dark:text-gray-400">No skills to display.</p>
    );
  }

  // Group skills by category if categories exist
  const skillsByCategory = resume.skills.reduce(
    (acc, skill) => {
      const category = skill.category || "Other";
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(skill);
      return acc;
    },
    {} as Record<string, typeof resume.skills>
  );

  const hasCategories =
    Object.keys(skillsByCategory).length > 0 &&
    resume.skills.some((s) => s.category);

  if (!hasCategories) {
    // Display as a simple grid without categories
    return (
      <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
        {resume.skills.map((skill, index) => (
          <div
            key={index}
            className="transform rounded-xl border border-gray-200 bg-white p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-gray-700 dark:bg-gray-800"
          >
            <div className="mb-3 flex items-center justify-between">
              <span className="text-base font-semibold dark:text-white">
                {skill.name}
              </span>
              {skill.level !== undefined && (
                <span className="text-sm font-bold text-blue-600 dark:text-blue-400">
                  {skill.level}%
                </span>
              )}
            </div>
            {skill.level !== undefined && (
              <div className="h-3 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                <div
                  className="h-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-500 ease-out"
                  style={{ width: `${skill.level}%` }}
                  role="progressbar"
                  aria-valuenow={skill.level}
                  aria-valuemin={0}
                  aria-valuemax={100}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-10">
      {Object.entries(skillsByCategory).map(([category, skills]) => (
        <div key={category} className="animate-fade-in">
          <h3 className="mb-6 flex items-center gap-3 text-2xl font-bold dark:text-white">
            <span className="h-8 w-1 rounded-full bg-gradient-to-b from-blue-500 to-purple-600" />
            {category}
          </h3>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {skills.map((skill, index) => (
              <div
                key={index}
                className="transform rounded-xl border border-gray-200 bg-white p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-gray-700 dark:bg-gray-800"
              >
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-base font-semibold dark:text-white">
                    {skill.name}
                  </span>
                  {skill.level !== undefined && (
                    <span className="text-sm font-bold text-blue-600 dark:text-blue-400">
                      {skill.level}%
                    </span>
                  )}
                </div>
                {skill.level !== undefined && (
                  <div className="h-3 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                    <div
                      className="h-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-500 ease-out"
                      style={{ width: `${skill.level}%` }}
                      role="progressbar"
                      aria-valuenow={skill.level}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
