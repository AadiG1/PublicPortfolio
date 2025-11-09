import { getResume } from "@/lib/data";

export default function SkillsGrid() {
  const resume = getResume();
  
  if (!resume.skills || resume.skills.length === 0) {
    return <p className="text-gray-600 dark:text-gray-400">No skills to display.</p>;
  }

  // Group skills by category if categories exist
  const skillsByCategory = resume.skills.reduce((acc, skill) => {
    const category = skill.category || "Other";
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(skill);
    return acc;
  }, {} as Record<string, typeof resume.skills>);

  const hasCategories = Object.keys(skillsByCategory).length > 0 && 
    resume.skills.some(s => s.category);

  if (!hasCategories) {
    // Display as a simple grid without categories
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {resume.skills.map((skill, index) => (
          <div key={index} className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium dark:text-gray-300">
                {skill.name}
              </span>
              {skill.level !== undefined && (
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {skill.level}%
                </span>
              )}
            </div>
            {skill.level !== undefined && (
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className="bg-blue-600 dark:bg-blue-400 h-2 rounded-full transition-all"
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
    <div className="space-y-8">
      {Object.entries(skillsByCategory).map(([category, skills]) => (
        <div key={category}>
          <h3 className="text-xl font-semibold mb-4 dark:text-white">
            {category}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {skills.map((skill, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium dark:text-gray-300">
                    {skill.name}
                  </span>
                  {skill.level !== undefined && (
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {skill.level}%
                    </span>
                  )}
                </div>
                {skill.level !== undefined && (
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-blue-600 dark:bg-blue-400 h-2 rounded-full transition-all"
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

