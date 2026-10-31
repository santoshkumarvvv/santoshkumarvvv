import React, { useEffect, useState } from 'react';
import { Search, ArrowUpRight, Code2, Sun, Moon, X, FolderGit2 } from 'lucide-react';
import { ProjectCaseStudy } from '../data/portfolioData';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  projects: ProjectCaseStudy[];
  onSelectProject: (project: ProjectCaseStudy) => void;
  isDark: boolean;
  onToggleTheme: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  projects,
  onSelectProject,
  isDark,
  onToggleTheme,
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) {
          onClose();
        }
      } else if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const normalized = query.trim().toLowerCase();
  const filteredProjects = projects.filter(
    (p) =>
      p.title.toLowerCase().includes(normalized) ||
      p.subtitle.toLowerCase().includes(normalized) ||
      p.stack.some((s) => s.toLowerCase().includes(normalized))
  );

  return (
    <div
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-start justify-center pt-20 px-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Command Menu"
    >
      <div
        className="w-full max-w-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 px-5 py-4 border-b border-zinc-200 dark:border-zinc-800">
          <Search className="w-4 h-4 text-zinc-400 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search projects, architecture specs, TypeScript modules, or actions..."
            autoFocus
            className="w-full bg-transparent text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none"
          />
          <button
            onClick={onClose}
            className="p-1.5 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 rounded-lg transition-colors"
            aria-label="Close command menu"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="max-h-96 overflow-y-auto p-3 space-y-4">
          <div>
            <p className="px-3 py-1 text-xs font-mono text-zinc-500">
              01 · ENGINEERING CASE STUDIES
            </p>
            <div className="mt-1 space-y-1">
              {filteredProjects.map((project) => (
                <button
                  key={project.id}
                  onClick={() => {
                    onSelectProject(project);
                    onClose();
                  }}
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left hover:bg-zinc-100 dark:hover:bg-zinc-800/80 transition-colors group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <Code2 className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                    <div className="truncate">
                      <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100 truncate">
                        {project.title}
                      </p>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400 truncate">
                        {project.repoName} · {project.stack.slice(0, 3).join(' · ')}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-mono text-zinc-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 shrink-0 ml-3">
                    Inspect Spec →
                  </span>
                </button>
              ))}
              {filteredProjects.length === 0 && (
                <p className="px-3 py-6 text-sm text-zinc-500 text-center">
                  No matching architectural modules found for &ldquo;{query}&rdquo;.
                </p>
              )}
            </div>
          </div>

          <div className="border-t border-zinc-200 dark:border-zinc-800 pt-3">
            <p className="px-3 py-1 text-xs font-mono text-zinc-500">02 · WORKSPACE ACTIONS</p>
            <div className="mt-1 grid grid-cols-1 sm:grid-cols-2 gap-1">
              <button
                onClick={() => {
                  onToggleTheme();
                  onClose();
                }}
                className="flex items-center justify-between px-3 py-2.5 rounded-xl text-left hover:bg-zinc-100 dark:hover:bg-zinc-800/80 transition-colors"
              >
                <span className="flex items-center gap-2.5 text-sm font-medium text-zinc-800 dark:text-zinc-200">
                  {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-blue-600" />}
                  Switch to {isDark ? 'Light' : 'Dark'} Surface
                </span>
              </button>

              <a
                href="https://github.com/santoshkumarvvv"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between px-3 py-2.5 rounded-xl text-left hover:bg-zinc-100 dark:hover:bg-zinc-800/80 transition-colors"
              >
                <span className="flex items-center gap-2.5 text-sm font-medium text-zinc-800 dark:text-zinc-200">
                  <FolderGit2 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  Open GitHub (@santoshkumarvvv)
                </span>
                <ArrowUpRight className="w-4 h-4 text-zinc-400" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
