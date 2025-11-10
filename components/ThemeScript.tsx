/**
 * ThemeScript - Prevents flash of wrong theme by applying theme before React hydrates
 * This script runs before React loads, preventing the flash of light mode
 */
export function ThemeScript() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
          (function() {
            try {
              var theme = localStorage.getItem('theme');
              if (!theme) {
                var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                theme = prefersDark ? 'dark' : 'light';
              }
              if (theme === 'dark') {
                document.documentElement.classList.add('dark');
              } else {
                document.documentElement.classList.remove('dark');
              }
            } catch (e) {
              // Fallback to light mode if there's an error
              document.documentElement.classList.remove('dark');
            }
          })();
        `,
      }}
    />
  );
}
