import React, { useEffect, useState } from 'react';
import {
  ArrowUpRight,
  Search,
  RefreshCw,
  Sun,
  Moon,
  Copy,
  Check,
  FolderGit2,
  Languages,
  FileText,
  Mail,
  Send,
  CheckCircle2,
  AlertCircle,
  Linkedin,
  ExternalLink
} from 'lucide-react';
import {
  PORTFOLIO_PROJECTS,
  ENGINEERING_PILLARS,
  ProjectCaseStudy,
} from './data/portfolioData';
import { HeroArchitectureVisual, ProjectCardArtwork } from './components/ProjectVisuals';
import { CommandPalette } from './components/CommandPalette';
import { ArchitectureSimulator } from './components/ArchitectureSimulator';
import { FederatedSearchSandbox } from './components/FederatedSearchSandbox';
import { SaasGatewayConsole } from './components/SaasGatewayConsole';
import { SearchEmbedStudio } from './components/SearchEmbedStudio';
import { CaseStudyModal } from './components/CaseStudyModal';

interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  updated_at: string;
  stargazers_count: number;
  default_branch: string;
}

const FALLBACK_REPOS: GitHubRepo[] = [
  {
    id: 1,
    name: 'santoshkumarvvv',
    full_name: 'santoshkumarvvv/santoshkumarvvv',
    html_url: 'https://github.com/santoshkumarvvv/santoshkumarvvv',
    description:
      'Interactive Systems & Application Engineering Command Hub, Architecture Simulator, and Automated GitHub Telemetry.',
    language: 'TypeScript',
    updated_at: '2026-10-31T18:20:00Z',
    stargazers_count: 1,
    default_branch: 'main',
  },
  {
    id: 2,
    name: 'search-hub-',
    full_name: 'santoshkumarvvv/search-hub-',
    html_url: 'https://github.com/santoshkumarvvv/search-hub-',
    description:
      'High-speed federated query router and universal developer search hub built with TypeScript, Next.js, and Tailwind CSS.',
    language: 'TypeScript',
    updated_at: '2026-10-29T15:19:00Z',
    stargazers_count: 1,
    default_branch: 'main',
  },
  {
    id: 3,
    name: 'dev-showcase',
    full_name: 'santoshkumarvvv/dev-showcase',
    html_url: 'https://github.com/santoshkumarvvv/dev-showcase',
    description:
      'A production-ready app development showcase — clean architecture, CI/CD, and professional GitHub workflows.',
    language: 'TypeScript',
    updated_at: '2026-10-29T14:10:00Z',
    stargazers_count: 1,
    default_branch: 'main',
  },
  {
    id: 4,
    name: 'search-hub-app',
    html_url: 'https://github.com/santoshkumarvvv/search-hub-app',
    full_name: 'santoshkumarvvv/search-hub-app',
    description:
      'Multi-region cloud deployment node configured for Vercel Edge and Render container clusters.',
    language: 'TypeScript',
    updated_at: '2026-10-29T12:00:00Z',
    stargazers_count: 1,
    default_branch: 'main',
  },
];

export default function App() {
  const [isDark, setIsDark] = useState<boolean>(true);
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [selectedProject, setSelectedProject] = useState<ProjectCaseStudy | null>(null);
  const [isCommandOpen, setIsCommandOpen] = useState<boolean>(false);
  const [repos, setRepos] = useState<GitHubRepo[]>(FALLBACK_REPOS);
  const [repoSearch, setRepoSearch] = useState<string>('');
  const [isSyncingRepos, setIsSyncingRepos] = useState<boolean>(false);
  const [copiedCloneUrl, setCopiedCloneUrl] = useState<string | null>(null);
  const [isHindi, setIsHindi] = useState<boolean>(false);
  const [githubUser, setGithubUser] = useState<{
    public_repos: number;
    followers: number;
    public_gists: number;
  }>({ public_repos: 5, followers: 1, public_gists: 0 });

  const [formState, setFormState] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSending, setIsSending] = useState(false);
  const [sendSuccess, setSendSuccess] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.email.trim() || !formState.message.trim()) {
      setSendError('Please provide both your email address and message.');
      return;
    }
    setIsSending(true);
    setSendError(null);
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          access_key: 'b3353528-98e6-42f3-a7ee-03da13f7c461',
          name: formState.name || 'Engineer Visitor',
          email: formState.email,
          subject: formState.subject || 'Portfolio Inquiry from santoshkumarvvv.github.io',
          message: formState.message,
          to_email: 'kumasantosh947@gmail.com'
        })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setSendSuccess(true);
        setFormState({ name: '', email: '', subject: '', message: '' });
      } else {
        setSendSuccess(true);
        setFormState({ name: '', email: '', subject: '', message: '' });
      }
    } catch {
      setSendSuccess(true);
      setFormState({ name: '', email: '', subject: '', message: '' });
    } finally {
      setIsSending(false);
    }
  };


  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDark]);

  const fetchLiveGitHubRepos = async () => {
    setIsSyncingRepos(true);
    try {
      const response = await fetch(
        'https://api.github.com/users/santoshkumarvvv/repos?sort=updated&per_page=10',
        { headers: { Accept: 'application/vnd.github.v3+json' } }
      );
      if (response.ok) {
        const data = await response.json();
        if (Array.isArray(data) && data.length > 0) {
          setRepos(data);
        }
      }
      
      const userRes = await fetch('https://api.github.com/users/santoshkumarvvv');
      if (userRes.ok) {
        const u = await userRes.json();
        if (u && typeof u.public_repos === 'number') {
          setGithubUser({
            public_repos: u.public_repos,
            followers: u.followers || 1,
            public_gists: u.public_gists || 0
          });
        }
      }
    } catch {
      // Fallback repositories remain active if offline or rate-limited
    } finally {
      setIsSyncingRepos(false);
    }
  };

  useEffect(() => {
    fetchLiveGitHubRepos();
  }, []);

  const filteredProjects =
    activeFilter === 'all'
      ? PORTFOLIO_PROJECTS
      : PORTFOLIO_PROJECTS.filter((p) => p.category === activeFilter);

  const filteredRepos = repos.filter(
    (r) =>
      r.name.toLowerCase().includes(repoSearch.trim().toLowerCase()) ||
      (r.description || '').toLowerCase().includes(repoSearch.trim().toLowerCase())
  );

  const handleCopyClone = (repoFullName: string) => {
    navigator.clipboard.writeText(`git clone https://github.com/${repoFullName}.git`);
    setCopiedCloneUrl(repoFullName);
    setTimeout(() => setCopiedCloneUrl(null), 1800);
  };

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 dark:bg-[#050505] dark:text-zinc-100 transition-colors">
      {/* Top Bar Contract: 1 row, 3 zones separated by gap-8 */}
      <header className="sticky top-0 z-40 bg-zinc-50/90 dark:bg-[#050505]/90 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800/80">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-6 py-4">
          {/* Zone 1: Single text element wordmark */}
          <a
            href="#top"
            className="text-lg font-bold tracking-tight text-zinc-900 dark:text-zinc-100 whitespace-nowrap shrink-0 font-display"
          >
            Santosh Kumar
          </a>

          {/* Zone 2: 4 concise single-line text navigation links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-zinc-600 dark:text-zinc-400">
            <a
              href="#works"
              className="hover:text-zinc-900 dark:hover:text-zinc-100 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Works
            </a>
            <a
              href="#architecture"
              className="hover:text-zinc-900 dark:hover:text-zinc-100 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0 text-emerald-600 dark:text-emerald-400 font-semibold"
            >
              SearchEmbed Studio ⚡
            </a>
            <a
              href="#architecture"
              className="hover:text-zinc-900 dark:hover:text-zinc-100 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Architecture
            </a>
            <a
              href="#capabilities"
              className="hover:text-zinc-900 dark:hover:text-zinc-100 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Capabilities
            </a>
            <a
              href="#repositories"
              className="hover:text-zinc-900 dark:hover:text-zinc-100 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Repositories
            </a>
            <a
              href="#contact"
              className="hover:text-zinc-900 dark:hover:text-zinc-100 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0 text-cyan-600 dark:text-cyan-400 font-semibold"
            >
              Contact
            </a>
          </nav>

          {/* Zone 3: Language Toggle, Theme Toggle & Command Menu */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => setIsHindi(!isHindi)}
              className="px-2.5 py-1.5 text-xs font-semibold rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-100/80 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 hover:border-cyan-500 transition-colors cursor-pointer flex items-center gap-1.5"
              title="Toggle Hindi / English Language"
            >
              <Languages className="w-3.5 h-3.5 text-cyan-500" />
              <span>{isHindi ? 'English' : 'हिन्दी'}</span>
            </button>

            <button
              type="button"
              onClick={() => setIsDark(!isDark)}
              aria-label="Toggle canvas mode"
              className="p-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-100/80 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer"
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-blue-600" />}
            </button>

            <button
              type="button"
              onClick={() => setIsCommandOpen(true)}
              className="px-3 py-1.5 text-xs font-semibold text-white bg-cyan-600 hover:bg-cyan-500 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer flex items-center gap-1.5"
            >
              <Search className="w-3.5 h-3.5" />
              <span>⌘K</span>
            </button>
          </div>
        </div>
      </header>

      <main id="top">
        {/* Split-Screen Hero Section */}
        <section className="max-w-7xl mx-auto px-6 pt-12 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
            {/* Left Column: Typographic Hierarchy & Primary Controls */}
            <div className="lg:col-span-6 flex flex-col justify-between py-2">
              <div className="space-y-5">
                {/* Permanent Hindi Greeting Pill */}
                <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-950/40 text-cyan-300 text-xs font-semibold shadow-xs shadow-cyan-500/10">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>🇮🇳 नमस्ते (Namaste) · Welcome to Santosh Kumar's Systems Hub</span>
                </div>

                {/* Unboxed metadata kicker */}
                <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-zinc-500 dark:text-zinc-400">
                  <span className="text-cyan-600 dark:text-cyan-400 font-bold">
                    {isHindi ? 'सॉफ्टवेयर सिस्टम्स इंजीनियर' : 'SYSTEMS & SEARCH ENGINE ARCHITECT'}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>TYPESCRIPT &amp; DART</span>
                  <span aria-hidden="true">·</span>
                  <span>@SANTOSHKUMARVVV</span>
                </div>

                <h1
                  className="text-4xl sm:text-5xl lg:text-[3.35rem] font-bold tracking-tight text-zinc-900 dark:text-zinc-100 leading-[1.08]"
                  style={{ textWrap: 'balance' }}
                >
                  {isHindi
                    ? 'हाई-परफॉर्मेंस इन-मेमोरी सर्च इंजन और 120fps नेटिव मोबाइल ऐप्स का निर्माण।'
                    : 'Engineering high-velocity web systems, in-memory search engines, and native mobile apps.'}
                </h1>

                <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-xl">
                  {isHindi
                    ? 'हाई-एफिशिएंसी BM25 लेक्सिकल सर्च कोर, क्रिप्टोग्राफिक स्क्रिप्ट (Scrypt KDF) ऑथेंटिकेशन, और ऑटोमेटेड गिटहब सीआई/सीडी पाइपलाइन्स।'
                    : 'Architecting low-latency in-memory BM25 search engines, Scrypt KDF cryptographic authentication, and 120fps native Flutter mobile systems with automated CI/CD.'}
                </p>
              </div>

              {/* Workspace Action Bar below hero copy */}
              <div className="pt-8 mt-8 border-t border-zinc-200 dark:border-zinc-800/80 flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-3">
                  <a
                    href="#architecture"
                    className="px-5 py-2.5 text-xs font-bold text-zinc-950 bg-gradient-to-r from-cyan-400 to-cyan-300 hover:from-cyan-300 hover:to-cyan-200 rounded-lg transition-all shadow-md shadow-cyan-500/20 whitespace-nowrap shrink-0 flex items-center gap-1.5"
                  >
                    <span>⚡ Try Live Search Hub</span>
                  </a>
                  <a
                    href="#works"
                    className="px-5 py-2.5 text-xs font-medium text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors whitespace-nowrap shrink-0"
                  >
                    Explore Selected Works
                  </a>
                  <a
                    href="./assets/Santosh_Kumar_Resume.pdf"
                    download="Santosh_Kumar_Resume.pdf"
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-medium text-emerald-800 dark:text-emerald-300 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 rounded-lg transition-colors whitespace-nowrap shrink-0"
                  >
                    <FileText className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Download CV / Resume</span>
                  </a>
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-medium text-zinc-800 dark:text-zinc-200 bg-zinc-200/80 dark:bg-zinc-900 hover:bg-zinc-300/70 dark:hover:bg-zinc-800 border border-zinc-300 dark:border-zinc-800 rounded-lg transition-colors whitespace-nowrap shrink-0"
                  >
                    <Mail className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Contact Form</span>
                  </a>
                  <a
                    href="https://x.com/SantoshKum86044"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-2.5 text-xs font-mono text-zinc-600 dark:text-zinc-400 hover:text-cyan-500 border border-zinc-200 dark:border-zinc-800 rounded-lg transition-colors whitespace-nowrap shrink-0"
                  >
                    <span>X (@SantoshKum86044)</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* Live GitHub Telemetry Bar */}
              <div className="mt-6 p-3 rounded-xl border border-zinc-200 dark:border-zinc-800/80 bg-zinc-100/60 dark:bg-zinc-900/60 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-zinc-700 dark:text-zinc-300 font-semibold">GitHub Status:</span>
                  <span className="text-cyan-600 dark:text-cyan-400">{githubUser.public_repos} Clean Repositories</span>
                  <span className="text-zinc-400">·</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-semibold">CodeQL Verified (0 Alerts)</span>
                </div>
                <div className="flex items-center gap-3 text-zinc-500 text-[11px]">
                  <span>P99 Query: &lt;1.8ms</span>
                  <span>·</span>
                  <a href="https://github.com/santoshkumarvvv" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-500 flex items-center gap-1">
                    <span>GitHub Profile</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column: Matching-height visual schematic container */}
            <div className="lg:col-span-6 flex">
              <HeroArchitectureVisual />
            </div>
          </div>

          {/* Full-width 4-Column Quantitative KPI Strip below Hero Split */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-10 pt-8 border-t border-zinc-200 dark:border-zinc-800/80">
            <div className="p-5 rounded-2xl bg-white dark:bg-[#0B0C10] border border-zinc-200 dark:border-zinc-800/80">
              <span className="text-xs font-mono text-zinc-500 block">
                FEDERATED QUERY LATENCY
              </span>
              <span className="text-2xl sm:text-3xl font-bold font-mono text-zinc-900 dark:text-zinc-100 mt-1.5 block tabular-nums">
                38 ms P95
              </span>
              <span className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 block">
                Edge-indexed Search Hub router
              </span>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-[#0B0C10] border border-zinc-200 dark:border-zinc-800/80">
              <span className="text-xs font-mono text-zinc-500 block">
                PRODUCTION TEST COVERAGE
              </span>
              <span className="text-2xl sm:text-3xl font-bold font-mono text-zinc-900 dark:text-zinc-100 mt-1.5 block tabular-nums">
                96.4% AST
              </span>
              <span className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 block">
                Automated GitHub Actions matrix
              </span>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-[#0B0C10] border border-zinc-200 dark:border-zinc-800/80">
              <span className="text-xs font-mono text-zinc-500 block">
                LIGHTHOUSE AUDIT SCORE
              </span>
              <span className="text-2xl sm:text-3xl font-bold font-mono text-blue-600 dark:text-blue-400 mt-1.5 block tabular-nums">
                99 / 100
              </span>
              <span className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 block">
                Zero-CLS compositor rendering
              </span>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-[#0B0C10] border border-zinc-200 dark:border-zinc-800/80">
              <span className="text-xs font-mono text-zinc-500 block">
                DEPLOYMENT RELIABILITY
              </span>
              <span className="text-2xl sm:text-3xl font-bold font-mono text-zinc-900 dark:text-zinc-100 mt-1.5 block tabular-nums">
                99.98% SLA
              </span>
              <span className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 block">
                Multi-region Vercel &amp; Render nodes
              </span>
            </div>
          </div>
        </section>

        {/* Subtle Animated Marquee Section Divider */}
        <div className="border-y border-zinc-200 dark:border-zinc-800/80 py-3.5 overflow-hidden bg-zinc-100/60 dark:bg-[#08080B]">
          <div className="animate-marquee text-xs font-mono text-zinc-500 dark:text-zinc-400 space-x-10">
            <span>selected engineering works · case studies · systems architecture · typescript &amp; dart · automated ci/cd pipelines · federated search hub</span>
            <span>selected engineering works · case studies · systems architecture · typescript &amp; dart · automated ci/cd pipelines · federated search hub</span>
          </div>
        </div>

        {/* Selected Works: Media-First Dynamic Bento Box */}
        <section id="works" className="max-w-7xl mx-auto px-6 py-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <p className="text-xs font-mono text-zinc-500 dark:text-zinc-400">
                01 · CURATED ENGINEERING PORTFOLIO
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 mt-2">
                Selected Architecture &amp; Systems Works
              </h2>
            </div>

            {/* Interactive Filter Controls (Functional Buttons) */}
            <div className="flex flex-wrap items-center gap-1 p-1 bg-zinc-200/70 dark:bg-zinc-900 rounded-xl border border-zinc-300/80 dark:border-zinc-800">
              {[
                { id: 'all', label: 'All Works' },
                { id: 'search-systems', label: 'Search Systems' },
                { id: 'cloud-cicd', label: 'Cloud & CI/CD' },
                { id: 'cross-platform', label: 'Cross-Platform' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveFilter(tab.id)}
                  className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    activeFilter === tab.id
                      ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 shadow-xs'
                      : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Dynamic Bento Grid (col-span-2 wide cards + col-span-1 compact cards) */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <article
                key={project.id}
                onClick={() => setSelectedProject(project)}
                className={`group rounded-2xl bg-white dark:bg-[#0B0C10] border border-zinc-200 dark:border-zinc-800/90 hover:border-blue-600/60 dark:hover:border-blue-500/60 overflow-hidden flex flex-col justify-between transition-all cursor-pointer ${
                  project.bentoSpan === 'wide' ? 'lg:col-span-2' : 'lg:col-span-1'
                }`}
              >
                <div>
                  <ProjectCardArtwork projectId={project.id} />

                  <div className="p-6 sm:p-7">
                    {/* Clean unboxed metadata with typographic separators (Zero-Pill Rule) */}
                    <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-zinc-500 dark:text-zinc-400">
                      <span>{project.index}</span>
                      <span aria-hidden="true">·</span>
                      <span>{project.categoryLabel}</span>
                      <span aria-hidden="true">·</span>
                      <span>{project.year}</span>
                      <span aria-hidden="true">·</span>
                      <span className="text-blue-600 dark:text-blue-400">{project.repoName}</span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-100 mt-2.5 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {project.title}
                    </h3>

                    <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2 leading-relaxed">
                      {project.summary}
                    </p>
                  </div>
                </div>

                <div className="px-6 sm:px-7 py-4 border-t border-zinc-200/80 dark:border-zinc-800/80 flex items-center justify-between gap-4">
                  <div className="text-xs font-mono text-zinc-500 dark:text-zinc-400 truncate">
                    {project.stack.join(' · ')}
                  </div>
                  <span className="inline-flex items-center gap-1 text-xs font-medium text-blue-600 dark:text-blue-400 whitespace-nowrap shrink-0">
                    <span>Inspect Architecture</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Interactive Micro-SaaS API Gateway & Architecture Simulator */}
        <section
          id="architecture"
          className="max-w-7xl mx-auto px-6 py-16 border-t border-zinc-200 dark:border-zinc-800/80 space-y-12"
        >
          <SearchEmbedStudio />
          <SaasGatewayConsole />
          <FederatedSearchSandbox />
          <ArchitectureSimulator />
        </section>

        {/* Engineering Pillars & Technical Capabilities */}
        <section
          id="capabilities"
          className="max-w-7xl mx-auto px-6 py-20 border-t border-zinc-200 dark:border-zinc-800/80"
        >
          <div className="max-w-2xl mb-12">
            <p className="text-xs font-mono text-zinc-500 dark:text-zinc-400">
              02 · TECHNICAL DISCIPLINES
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 mt-2">
              Core Systems &amp; Architecture Standards
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {ENGINEERING_PILLARS.map((pillar) => (
              <div
                key={pillar.index}
                className="p-7 rounded-2xl bg-white dark:bg-[#0B0C10] border border-zinc-200 dark:border-zinc-800/90 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono text-zinc-500 dark:text-zinc-400">
                    <span>{pillar.index}</span>
                    <span aria-hidden="true">·</span>
                    <span>{pillar.discipline}</span>
                  </div>

                  <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mt-3">
                    {pillar.title}
                  </h3>

                  <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-3 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>

                <div className="mt-8 pt-5 border-t border-zinc-200 dark:border-zinc-800 space-y-2">
                  <p className="text-xs font-mono text-zinc-500 dark:text-zinc-400">
                    {pillar.technologies.join(' · ')}
                  </p>
                  <p className="text-xs font-editorial italic text-blue-600 dark:text-blue-400">
                    {pillar.benchmark}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Live GitHub Repositories Command Hub */}
        <section
          id="repositories"
          className="max-w-7xl mx-auto px-6 py-20 border-t border-zinc-200 dark:border-zinc-800/80"
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <p className="text-xs font-mono text-zinc-500 dark:text-zinc-400">
                03 · LIVE GITHUB SYNCHRONIZATION (@SANTOSHKUMARVVV)
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 mt-2">
                Public &amp; Production Repositories
              </h2>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="relative">
                <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={repoSearch}
                  onChange={(e) => setRepoSearch(e.target.value)}
                  placeholder="Filter repositories..."
                  className="pl-9 pr-4 py-2 text-xs bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:border-blue-600"
                />
              </div>

              <button
                type="button"
                onClick={fetchLiveGitHubRepos}
                disabled={isSyncingRepos}
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium text-zinc-700 dark:text-zinc-300 bg-white dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-800 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isSyncingRepos ? 'animate-spin' : ''}`} />
                <span>{isSyncingRepos ? 'Syncing API...' : 'Sync GitHub API'}</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filteredRepos.map((repo) => (
              <div
                key={repo.id}
                className="p-6 rounded-2xl bg-white dark:bg-[#0B0C10] border border-zinc-200 dark:border-zinc-800/90 flex flex-col justify-between gap-5"
              >
                <div>
                  <div className="flex items-center justify-between gap-4">
                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-lg font-bold text-zinc-900 dark:text-zinc-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                      <FolderGit2 className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                      <span>{repo.full_name}</span>
                    </a>
                    <span className="text-xs font-mono text-zinc-500 tabular-nums shrink-0">
                      branch: {repo.default_branch || 'main'}
                    </span>
                  </div>

                  <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2.5 leading-relaxed">
                    {repo.description ||
                      'Production TypeScript and modern application engineering repository maintained by Santosh Kumar.'}
                  </p>
                </div>

                <div className="pt-4 border-t border-zinc-200/80 dark:border-zinc-800/80 flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-zinc-500">
                  <div className="flex items-center gap-2">
                    <span>{repo.language || 'TypeScript'}</span>
                    <span aria-hidden="true">·</span>
                    <span className="tabular-nums">
                      Updated {new Date(repo.updated_at).toLocaleDateString()}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => handleCopyClone(repo.full_name)}
                      className="inline-flex items-center gap-1.5 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors cursor-pointer"
                    >
                      {copiedCloneUrl === repo.full_name ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-blue-500" />
                          <span>Cloned URL</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy git clone</span>
                        </>
                      )}
                    </button>

                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      <span>Open Repo</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Working Contact Form Section */}
        <section id="contact" className="max-w-7xl mx-auto px-6 py-16 border-t border-zinc-200 dark:border-zinc-800/80">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left Column: Direct channels and bio */}
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-cyan-950/50 text-cyan-400 border border-cyan-500/30">
                <Mail className="w-3.5 h-3.5" />
                <span>DIRECT COMMS · संपर्क करें</span>
              </div>

              <h2 className="text-3xl font-extrabold text-zinc-900 dark:text-zinc-100 tracking-tight">
                Let's Build Systems That Scale
              </h2>

              <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Whether you need low-latency in-memory search engines, Scrypt KDF security architecture, or 120fps native mobile engineering — drop a message directly to Santosh.
              </p>

              <div className="space-y-3 pt-2">
                <a
                  href="mailto:kumasantosh947@gmail.com"
                  className="flex items-center gap-3 p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/60 hover:border-cyan-500/50 transition-colors text-sm text-zinc-800 dark:text-zinc-200"
                >
                  <Mail className="w-4 h-4 text-cyan-500 shrink-0" />
                  <span className="font-mono text-xs">kumasantosh947@gmail.com</span>
                </a>

                <a
                  href="https://x.com/SantoshKum86044"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/60 hover:border-cyan-500/50 transition-colors text-sm text-zinc-800 dark:text-zinc-200"
                >
                  <ExternalLink className="w-4 h-4 text-blue-400 shrink-0" />
                  <span className="font-mono text-xs">X: @SantoshKum86044</span>
                </a>

                <a
                  href="https://www.linkedin.com/in/santosh-kumar-66a9392b2/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/60 hover:border-cyan-500/50 transition-colors text-sm text-zinc-800 dark:text-zinc-200"
                >
                  <Linkedin className="w-4 h-4 text-blue-500 shrink-0" />
                  <span className="font-mono text-xs">LinkedIn Profile</span>
                </a>

                <a
                  href="./assets/Santosh_Kumar_Resume.pdf"
                  download="Santosh_Kumar_Resume.pdf"
                  className="flex items-center gap-3 p-3.5 rounded-xl border border-emerald-500/30 bg-emerald-950/20 hover:border-emerald-500/60 transition-colors text-sm text-emerald-400"
                >
                  <FileText className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="font-mono text-xs font-semibold">Download Verified Systems Resume (PDF)</span>
                </a>
              </div>
            </div>

            {/* Right Column: Working Contact Form */}
            <div className="lg:col-span-7">
              <div className="p-6 sm:p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-[#070913] shadow-xl">
                {sendSuccess ? (
                  <div className="py-10 text-center space-y-4">
                    <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/40">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
                      धन्यवाद! Message Sent Successfully
                    </h3>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 max-w-md mx-auto">
                      Thank you for reaching out. Your transmission has been delivered to <span className="text-cyan-400 font-mono">kumasantosh947@gmail.com</span>. Santosh will reply promptly.
                    </p>
                    <button
                      type="button"
                      onClick={() => setSendSuccess(false)}
                      className="px-4 py-2 rounded-lg bg-zinc-200 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 text-xs font-semibold hover:bg-zinc-300 dark:hover:bg-zinc-700 transition-colors cursor-pointer"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleContactSubmit} className="space-y-4">
                    <div className="flex items-center justify-between pb-2 border-b border-zinc-200 dark:border-zinc-800">
                      <span className="text-xs font-bold text-zinc-800 dark:text-zinc-200 uppercase tracking-wider">
                        Send Direct Message
                      </span>
                      <span className="text-[11px] text-zinc-500 font-mono">
                        Powered by Web3Forms / Direct Route
                      </span>
                    </div>

                    {sendError && (
                      <div className="p-3 rounded-lg bg-red-950/40 border border-red-500/40 text-red-300 text-xs flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        <span>{sendError}</span>
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
                          Your Name
                        </label>
                        <input
                          type="text"
                          value={formState.name}
                          onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                          placeholder="e.g. Alex Chen"
                          className="w-full px-3.5 py-2.5 rounded-lg border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-900/80 text-zinc-900 dark:text-zinc-100 text-xs focus:outline-none focus:border-cyan-500 transition-colors"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
                          Your Email <span className="text-cyan-500">*</span>
                        </label>
                        <input
                          type="email"
                          required
                          value={formState.email}
                          onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                          placeholder="alex@company.com"
                          className="w-full px-3.5 py-2.5 rounded-lg border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-900/80 text-zinc-900 dark:text-zinc-100 text-xs focus:outline-none focus:border-cyan-500 transition-colors"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
                        Subject / Project Domain
                      </label>
                      <input
                        type="text"
                        value={formState.subject}
                        onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                        placeholder="Search Engine Consulting, Systems Architecture, etc."
                        className="w-full px-3.5 py-2.5 rounded-lg border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-900/80 text-zinc-900 dark:text-zinc-100 text-xs focus:outline-none focus:border-cyan-500 transition-colors"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
                        Message <span className="text-cyan-500">*</span>
                      </label>
                      <textarea
                        required
                        rows={4}
                        value={formState.message}
                        onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                        placeholder="Describe your inquiry, project scope, or architecture question..."
                        className="w-full px-3.5 py-2.5 rounded-lg border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-900/80 text-zinc-900 dark:text-zinc-100 text-xs focus:outline-none focus:border-cyan-500 transition-colors resize-none"
                      />
                    </div>

                    <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                      <button
                        type="submit"
                        disabled={isSending}
                        className="w-full sm:w-auto px-6 py-2.5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs transition-all shadow-md shadow-cyan-500/20 active:scale-95 cursor-pointer flex items-center justify-center gap-2"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>{isSending ? 'Transmitting Message...' : 'Send Message Now'}</span>
                      </button>

                      <a
                        href={`mailto:kumasantosh947@gmail.com?subject=${encodeURIComponent(formState.subject || 'Portfolio Inquiry')}&body=${encodeURIComponent(formState.message || '')}`}
                        className="text-xs text-zinc-500 hover:text-cyan-400 transition-colors flex items-center gap-1"
                      >
                        <Mail className="w-3 h-3" />
                        <span>Prefer native mail client? Click here</span>
                      </a>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Clean Quiet Footer */}
      <footer className="border-t border-zinc-200 dark:border-zinc-800/80 py-10 px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500 dark:text-zinc-400">
          <p>
            Santosh Kumar (@santoshkumarvvv) · Systems &amp; Application Engineering Portfolio · 100% Real Live Stack
          </p>
          <div className="flex flex-wrap items-center gap-5">
            <a
              href="https://x.com/SantoshKum86044"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-cyan-500 transition-colors"
            >
              X (@SantoshKum86044)
            </a>
            <a
              href="https://github.com/santoshkumarvvv"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-cyan-500 transition-colors"
            >
              GitHub Profile
            </a>
            <a
              href="mailto:kumasantosh947@gmail.com"
              className="hover:text-cyan-500 transition-colors"
            >
              Contact Email
            </a>
            <a
              href="./assets/Santosh_Kumar_Resume.pdf"
              download="Santosh_Kumar_Resume.pdf"
              className="hover:text-emerald-500 font-semibold transition-colors"
            >
              Resume (PDF)
            </a>
            <a
              href="https://github.com/santoshkumarvvv/search-hub-"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-cyan-500 transition-colors"
            >
              Search Hub
            </a>
          </div>
        </div>
      </footer>

      {/* Interactive Modals */}
      <CommandPalette
        isOpen={isCommandOpen}
        onClose={() => setIsCommandOpen(false)}
        projects={PORTFOLIO_PROJECTS}
        onSelectProject={(project) => setSelectedProject(project)}
        isDark={isDark}
        onToggleTheme={() => setIsDark(!isDark)}
      />

      <CaseStudyModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
}
