import React, { useEffect, useState } from 'react';
import { X, ArrowUpRight, Copy, Check } from 'lucide-react';
import { ProjectCaseStudy } from '../data/portfolioData';
import { ProjectCardArtwork } from './ProjectVisuals';

interface CaseStudyModalProps {
  project: ProjectCaseStudy | null;
  onClose: () => void;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({ project, onClose }) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && project) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [project, onClose]);

  if (!project) return null;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(project.codeSample.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
    >
      <div
        className="w-full max-w-4xl bg-white dark:bg-[#0B0C10] border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-200 dark:border-zinc-800 shrink-0">
          <div className="flex items-center gap-2 text-xs font-mono text-zinc-500 dark:text-zinc-400">
            <span>{project.index}</span>
            <span aria-hidden="true">·</span>
            <span>{project.categoryLabel}</span>
            <span aria-hidden="true">·</span>
            <span>{project.repoName}</span>
          </div>
          <button
            onClick={onClose}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono text-zinc-700 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded-lg transition-colors cursor-pointer"
            aria-label="Close case study modal"
          >
            <span>ESC</span>
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable content */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-8">
          <div>
            <h2
              id="modal-project-title"
              className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-zinc-100 tracking-tight"
            >
              {project.title}
            </h2>
            <p className="text-base text-zinc-600 dark:text-zinc-400 mt-2">
              {project.subtitle}
            </p>
          </div>

          {/* High-contrast schematic visual */}
          <div className="rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800">
            <ProjectCardArtwork projectId={project.id} />
          </div>

          {/* 3-Column Metrics Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {project.metrics.map((metric) => (
              <div
                key={metric.label}
                className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800"
              >
                <span className="text-xs font-mono text-zinc-500 block">{metric.label}</span>
                <span className="text-2xl font-bold font-mono text-zinc-900 dark:text-zinc-100 mt-1 block tabular-nums">
                  {metric.value}
                </span>
                <span className="text-xs text-blue-600 dark:text-blue-400 mt-1 block">
                  {metric.delta}
                </span>
              </div>
            ))}
          </div>

          {/* Problem & Architecture breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                01. Engineering Challenge
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2 leading-relaxed">
                {project.challenge}
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                02. System Architecture
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2 leading-relaxed">
                {project.architectureSummary}
              </p>
            </div>
          </div>

          {/* Code implementation preview */}
          <div className="rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-950 text-zinc-100">
            <div className="flex items-center justify-between px-4 py-2.5 border-b border-zinc-800 text-xs font-mono text-zinc-400">
              <span>{project.codeSample.filename}</span>
              <button
                onClick={handleCopyCode}
                className="inline-flex items-center gap-1.5 text-zinc-300 hover:text-white transition-colors cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-blue-400" />
                    <span>Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Snippet</span>
                  </>
                )}
              </button>
            </div>
            <pre className="p-4 text-xs font-mono overflow-x-auto leading-relaxed text-zinc-200">
              <code>{project.codeSample.code}</code>
            </pre>
          </div>

          {/* Footer actions */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-zinc-200 dark:border-zinc-800">
            <div className="text-xs font-mono text-zinc-500">
              Stack: {project.stack.join(' · ')}
            </div>
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-medium text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors whitespace-nowrap shrink-0"
            >
              <span>Inspect GitHub Repository</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
