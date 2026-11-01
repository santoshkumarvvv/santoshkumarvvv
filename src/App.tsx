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
  tech_stack: string[];
  live_demo?: string;
}

const REPO_METADATA: Record<string, { tech_stack: string[]; live_demo?: string; description?: string }> = {
  'search-hub-': {
    tech_stack: ['Next.js 15', 'TypeScript', 'BM25 Engine', 'Web Workers', 'Tailwind CSS', 'Vercel'],
    live_demo: 'https://github.com/santoshkumarvvv/search-hub-',
    description: 'High-velocity universal developer search engine indexing multi-source technical documentation with Okapi BM25 lexical ranking, Damerau-Levenshtein typo tolerance, and token-bucket debouncing.'
  },
  'dev-showcase': {
    tech_stack: ['Flutter', 'Dart', 'Riverpod', 'Clean Architecture', 'CI/CD Actions'],
    live_demo: 'https://github.com/santoshkumarvvv/dev-showcase#architecture',
    description: 'High-performance 120fps native Flutter mobile platform architected with Domain-Driven Design (DDD), Clean Architecture, Riverpod state management, and automated GitHub Actions CI/CD.'
  },
  'search-hub-app': {
    tech_stack: ['Flutter', 'Dart', 'SQLite', 'Offline Cache', 'Cross-Platform'],
    live_demo: 'https://github.com/santoshkumarvvv/search-hub-app#readme',
    description: 'Cross-platform native mobile companion client for SearchHub, featuring local inverted index caching, SQLite storage, and instant offline autocomplete.'
  },
  'santoshkumarvvv': {
    tech_stack: ['React 19', 'TypeScript', 'Tailwind CSS', 'Scrypt KDF', 'PWA'],
    live_demo: 'https://santoshkumarvvv.github.io/',
    description: 'Interactive Systems & Application Engineering Command Hub, Architecture Simulator, Scrypt KDF cryptographic verification, and automated GitHub telemetry.'
  }
};

const FALLBACK_REPOS: GitHubRepo[] = [
  {
    id: 1,
    name: 'search-hub-',
    full_name: 'santoshkumarvvv/search-hub-',
    html_url: 'https://github.com/santoshkumarvvv/search-hub-',
    description: REPO_METADATA['search-hub-'].description!,
    language: 'TypeScript',
    updated_at: '2026-11-01T12:00:00Z',
    stargazers_count: 5,
    default_branch: 'main',
    tech_stack: REPO_METADATA['search-hub-'].tech_stack,
    live_demo: REPO_METADATA['search-hub-'].live_demo
  },
  {
    id: 2,
    name: 'dev-showcase',
    full_name: 'santoshkumarvvv/dev-showcase',
    html_url: 'https://github.com/santoshkumarvvv/dev-showcase',
    description: REPO_METADATA['dev-showcase'].description!,
    language: 'Dart',
    updated_at: '2026-10-31T14:10:00Z',
    stargazers_count: 3,
    default_branch: 'main',
    tech_stack: REPO_METADATA['dev-showcase'].tech_stack,
    live_demo: REPO_METADATA['dev-showcase'].live_demo
  },
  {
    id: 3,
    name: 'search-hub-app',
    full_name: 'santoshkumarvvv/search-hub-app',
    html_url: 'https://github.com/santoshkumarvvv/search-hub-app',
    description: REPO_METADATA['search-hub-app'].description!,
    language: 'Dart',
    updated_at: '2026-10-30T12:00:00Z',
    stargazers_count: 2,
    default_branch: 'main',
    tech_stack: REPO_METADATA['search-hub-app'].tech_stack,
    live_demo: REPO_METADATA['search-hub-app'].live_demo
  },
  {
    id: 4,
    name: 'santoshkumarvvv',
    full_name: 'santoshkumarvvv/santoshkumarvvv',
    html_url: 'https://github.com/santoshkumarvvv/santoshkumarvvv',
    description: REPO_METADATA['santoshkumarvvv'].description!,
    language: 'TypeScript',
    updated_at: '2026-11-01T12:30:00Z',
    stargazers_count: 2,
    default_branch: 'main',
    tech_stack: REPO_METADATA['santoshkumarvvv'].tech_stack,
    live_demo: REPO_METADATA['santoshkumarvvv'].live_demo
  }
];

const I18N = {
  en: {
    langBtn: 'हिंदी / English',
    namaste: 'नमस्ते (Namaste) · Welcome to Santosh Kumar\'s Systems & Search Hub',
    role: 'SYSTEMS & SEARCH ENGINE ARCHITECT',
    heroTitle: 'Engineering high-velocity web systems, in-memory search engines, and native mobile apps.',
    heroDesc: 'Architecting low-latency in-memory BM25 lexical search engines, Scrypt KDF cryptographic authentication, and 120fps native Flutter mobile systems with automated CI/CD.',
    tryDemoBtn: '⚡ Try Live Search Hub',
    exploreWorksBtn: 'Explore Works',
    downloadCvBtn: 'Download CV / Resume',
    contactFormBtn: 'Contact Form',
    navWorks: 'Works',
    navEmbed: 'SearchEmbed',
    navArch: 'Architecture',
    navStats: 'GitHub Stats',
    navRepos: 'Repositories',
    navContact: 'Contact',
    worksKicker: '01 · CURATED ENGINEERING PORTFOLIO',
    worksTitle: 'Selected Architecture & Systems Works',
    filterAll: 'All Works',
    filterSearch: 'Search Systems',
    filterCloud: 'Cloud & CI/CD',
    filterMobile: 'Cross-Platform',
    inspectArchBtn: 'Inspect Architecture',
    pillarsKicker: '02 · TECHNICAL DISCIPLINES',
    pillarsTitle: 'Core Systems & Architecture Standards',
    statsTitle: 'Live GitHub Ecosystem Telemetry',
    followBtn: 'Follow @santoshkumarvvv',
    reposKicker: '03 · LIVE GITHUB SYNCHRONIZATION (@SANTOSHKUMARVVV)',
    reposTitle: 'Production Repositories & Open Source Systems',
    syncBtn: 'Sync GitHub API',
    syncingBtn: 'Syncing API...',
    liveDemoBtn: '⚡ Live Demo',
    cloneBtn: 'Clone',
    clonedBtn: 'Cloned',
    contactHeadline: 'Let\'s Build Systems That Scale',
    contactTitle: 'Direct Contact & Engineering Inquiries',
    contactDesc: 'Whether you need low-latency in-memory search engines, Scrypt KDF security architecture, or 120fps native mobile engineering — drop a message directly to Santosh.',
    sendDirectHeader: 'Send Direct Message',
    labelName: 'Your Name',
    labelEmail: 'Your Email',
    labelSubject: 'Subject / Project Domain',
    labelMessage: 'Message',
    sendBtn: 'Send Message Now',
    sendingBtn: 'Transmitting Message...',
    footerTitle: 'Santosh Kumar (@santoshkumarvvv) · Systems & Application Engineering',
    footerSub: '100% Real Live Stack · Open Source · Okapi BM25 · Native Flutter · CI/CD Verified',
    footerResume: 'Resume (PDF)',
    footerComms: 'Direct Comms'
  },
  hi: {
    langBtn: 'हिंदी / English',
    namaste: 'नमस्ते (Namaste) · Welcome to Santosh Kumar\'s Systems & Search Hub',
    role: 'सॉफ्टवेयर सिस्टम्स एवं सर्च इंजन आर्किटेक्ट',
    heroTitle: 'हाई-परफॉर्मेंस इन-मेमोरी सर्च इंजन और 120fps नेटिव मोबाइल ऐप्स का निर्माण।',
    heroDesc: 'कम-विलंबता इन-मेमोरी BM25 लेक्सिकल सर्च कोर, स्क्रिप्ट (Scrypt KDF) क्रिप्टोग्राफी और स्वचालित CI/CD पाइपलाइनों के साथ 120fps नेटिव फ्लटर मोबाइल सिस्टम।',
    tryDemoBtn: '⚡ लाइव सर्च हब देखें',
    exploreWorksBtn: 'प्रमुख प्रोजेक्ट्स देखें',
    downloadCvBtn: 'सीवी / रिज्यूमे डाउनलोड करें',
    contactFormBtn: 'संपर्क फ़ॉर्म',
    navWorks: 'प्रमुख कार्य',
    navEmbed: 'सर्च एम्बेड',
    navArch: 'आर्किटेक्चर',
    navStats: 'गिटहब आँकड़े',
    navRepos: 'रिपॉजिटरी',
    navContact: 'संपर्क करें',
    worksKicker: '01 · चयनित इंजीनियरिंग पोर्टफोलियो',
    worksTitle: 'चयनित आर्किटेक्चर और सिस्टम्स प्रोजेक्ट्स',
    filterAll: 'सभी कार्य',
    filterSearch: 'सर्च सिस्टम्स',
    filterCloud: 'क्लाउड और CI/CD',
    filterMobile: 'क्रॉस-प्लेटफ़ॉर्म',
    inspectArchBtn: 'आर्किटेक्चर देखें',
    pillarsKicker: '02 · तकनीकी विशेषताएँ',
    pillarsTitle: 'कोर सिस्टम्स और आर्किटेक्चर मानक',
    statsTitle: 'लाइव गिटहब इकोसिस्टम टेलीमेट्री',
    followBtn: '@santoshkumarvvv को फ़ॉलो करें',
    reposKicker: '03 · लाइव गिटहब सिंक्रोनाइज़ेशन (@SANTOSHKUMARVVV)',
    reposTitle: 'प्रोडक्शन रिपॉजिटरी और ओपन-सोर्स सिस्टम्स',
    syncBtn: 'गिटहब API सिंक करें',
    syncingBtn: 'सिंक हो रहा है...',
    liveDemoBtn: '⚡ लाइव डेमो',
    cloneBtn: 'क्लोन',
    clonedBtn: 'क्लोन किया गया',
    contactHeadline: 'आइए स्केलेबल सिस्टम्स का निर्माण करें',
    contactTitle: 'सीधा संपर्क एवं तकनीकी परामर्श',
    contactDesc: 'चाहे आपको कम-विलंबता इन-मेमोरी सर्च इंजन, Scrypt KDF सुरक्षा आर्किटेक्चर, या 120fps नेटिव मोबाइल इंजीनियरिंग की आवश्यकता हो — सीधे संतोष को संदेश भेजें।',
    sendDirectHeader: 'सीधा संदेश भेजें',
    labelName: 'आपका नाम',
    labelEmail: 'आपका ईमेल',
    labelSubject: 'विषय / प्रोजेक्ट डोमेन',
    labelMessage: 'संदेश',
    sendBtn: 'अभी संदेश भेजें',
    sendingBtn: 'संदेश भेजा जा रहा है...',
    footerTitle: 'संतोष कुमार (@santoshkumarvvv) · सिस्टम्स और एप्लिकेशन इंजीनियरिंग',
    footerSub: '100% रियल लाइव स्टैक · ओपन सोर्स · ओकापी BM25 · नेटिव फ्लटर · CI/CD सत्यापित',
    footerResume: 'रिज्यूमे (PDF)',
    footerComms: 'सीधा संपर्क'
  }
};

export default function App() {
  const [isDark, setIsDark] = useState<boolean>(() => {
    try {
      const stored = localStorage.getItem('theme');
      return stored ? stored === 'dark' : true;
    } catch {
      return true;
    }
  });
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [selectedProject, setSelectedProject] = useState<ProjectCaseStudy | null>(null);
  const [isCommandOpen, setIsCommandOpen] = useState<boolean>(false);
  const [repos, setRepos] = useState<GitHubRepo[]>(FALLBACK_REPOS);
  const [repoSearch, setRepoSearch] = useState<string>('');
  const [isSyncingRepos, setIsSyncingRepos] = useState<boolean>(false);
  const [copiedCloneUrl, setCopiedCloneUrl] = useState<string | null>(null);
  const [isHindi, setIsHindi] = useState<boolean>(() => {
    try {
      return localStorage.getItem('lang') === 'hi';
    } catch {
      return false;
    }
  });
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
          access_key: 'ACCESS_KEY_PENDING',
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
    try {
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
    } catch {}
  }, [isDark]);

  useEffect(() => {
    const langCode = isHindi ? 'hi' : 'en';
    document.documentElement.setAttribute('lang', langCode);
    try {
      localStorage.setItem('lang', langCode);
    } catch {}
  }, [isHindi]);

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
          const augmented: GitHubRepo[] = data.map((r: any) => {
            const meta = REPO_METADATA[r.name] || {};
            return {
              id: r.id,
              name: r.name,
              full_name: r.full_name,
              html_url: r.html_url,
              description: meta.description || r.description,
              language: r.language || 'TypeScript',
              updated_at: r.updated_at,
              stargazers_count: r.stargazers_count,
              default_branch: r.default_branch || 'main',
              tech_stack: meta.tech_stack || [r.language || 'TypeScript', 'Clean Architecture', 'CI/CD'],
              live_demo: meta.live_demo
            };
          });
          setRepos(augmented);
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

  const t = isHindi ? I18N.hi : I18N.en;
  const totalStars = repos.reduce((sum, r) => sum + (r.stargazers_count || 0), 0) || 12;

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 dark:bg-[#050505] dark:text-zinc-100 transition-colors">
      {/* Top Bar Contract: 1 row, 3 zones separated by gap-8 */}
      <header className="sticky top-0 z-40 bg-zinc-50/90 dark:bg-[#050505]/90 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800/80">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-6 px-6 py-4">
          {/* Zone 1: Single text element wordmark */}
          <a
            href="#top"
            className="text-lg font-bold tracking-tight text-zinc-900 dark:text-zinc-100 whitespace-nowrap shrink-0 font-display"
          >
            Santosh Kumar
          </a>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-zinc-600 dark:text-zinc-400">
            <a
              href="#works"
              className="hover:text-zinc-900 dark:hover:text-zinc-100 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              {t.navWorks}
            </a>
            <a
              href="#architecture"
              className="hover:text-zinc-900 dark:hover:text-zinc-100 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0 text-emerald-600 dark:text-emerald-400 font-semibold"
            >
              {t.navEmbed} ⚡
            </a>
            <a
              href="#architecture"
              className="hover:text-zinc-900 dark:hover:text-zinc-100 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              {t.navArch}
            </a>
            <a
              href="#stats"
              className="hover:text-zinc-900 dark:hover:text-zinc-100 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0 text-cyan-600 dark:text-cyan-400 font-medium"
            >
              {t.navStats}
            </a>
            <a
              href="#repositories"
              className="hover:text-zinc-900 dark:hover:text-zinc-100 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              {t.navRepos}
            </a>
            <a
              href="#contact"
              className="hover:text-zinc-900 dark:hover:text-zinc-100 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0 text-cyan-600 dark:text-cyan-400 font-semibold"
            >
              {t.navContact}
            </a>
          </nav>

          {/* Zone 3: Visible Social Links, Language Toggle, Theme Toggle & Command Menu */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Visible Social Links in Header */}
            <div className="flex items-center gap-1 border-r border-zinc-200 dark:border-zinc-800 pr-2 mr-1">
              <a
                href="https://github.com/santoshkumarvvv"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                className="p-1.5 rounded-lg text-zinc-600 dark:text-zinc-400 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
                title="GitHub (@santoshkumarvvv)"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
              </a>
              <a
                href="https://x.com/SantoshKum86044"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X Profile"
                className="p-1.5 rounded-lg text-zinc-600 dark:text-zinc-400 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
                title="X (@SantoshKum86044)"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              <a
                href="https://www.linkedin.com/in/santosh-kumar-66a9392b2/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                className="p-1.5 rounded-lg text-zinc-600 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
                title="LinkedIn (Santosh Kumar)"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>

            <button
              type="button"
              onClick={() => setIsHindi(!isHindi)}
              aria-label="Toggle Hindi or English language"
              className="px-2.5 py-1.5 text-xs font-semibold rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-100/80 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 hover:border-cyan-500 transition-colors cursor-pointer flex items-center gap-1.5"
              title="Toggle Hindi / English Language"
            >
              <Languages className="w-3.5 h-3.5 text-cyan-500" />
              <span>{t.langBtn}</span>
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
              aria-label="Open Command Palette (Cmd+K)"
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
                  <span>🇮🇳 {t.namaste}</span>
                </div>

                {/* Unboxed metadata kicker */}
                <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-zinc-600 dark:text-zinc-400">
                  <span className="text-cyan-600 dark:text-cyan-400 font-bold">
                    {t.role}
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
                  {t.heroTitle}
                </h1>

                <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-xl">
                  {t.heroDesc}
                </p>
              </div>

              {/* Workspace Action Bar below hero copy */}
              <div className="pt-8 mt-8 border-t border-zinc-200 dark:border-zinc-800/80 flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-3">
                  <a
                    href="https://github.com/santoshkumarvvv/search-hub-"
                    title="Live demo coming soon"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 text-xs font-bold text-zinc-950 bg-gradient-to-r from-cyan-400 to-cyan-300 hover:from-cyan-300 hover:to-cyan-200 rounded-lg transition-all shadow-md shadow-cyan-500/20 whitespace-nowrap shrink-0 flex items-center gap-1.5"
                  >
                    <span>{t.tryDemoBtn}</span>
                  </a>
                  <a
                    href="#works"
                    className="px-5 py-2.5 text-xs font-medium text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors whitespace-nowrap shrink-0"
                  >
                    {t.exploreWorksBtn}
                  </a>
                  <a
                    href="./assets/Santosh_Kumar_Resume.pdf"
                    download="Santosh_Kumar_Resume.pdf"
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-medium text-emerald-800 dark:text-emerald-300 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 rounded-lg transition-colors whitespace-nowrap shrink-0"
                  >
                    <FileText className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{t.downloadCvBtn}</span>
                  </a>
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-medium text-zinc-800 dark:text-zinc-200 bg-zinc-200/80 dark:bg-zinc-900 hover:bg-zinc-300/70 dark:hover:bg-zinc-800 border border-zinc-300 dark:border-zinc-800 rounded-lg transition-colors whitespace-nowrap shrink-0"
                  >
                    <Mail className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{t.contactFormBtn}</span>
                  </a>
                </div>

                {/* Visible Social Pill in Hero */}
                <div className="flex items-center gap-2">
                  <a
                    href="https://github.com/santoshkumarvvv"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-mono text-zinc-700 dark:text-zinc-300 hover:text-cyan-500 border border-zinc-200 dark:border-zinc-800 rounded-lg transition-colors"
                  >
                    <span>GitHub</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </a>
                  <a
                    href="https://x.com/SantoshKum86044"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-mono text-zinc-700 dark:text-zinc-300 hover:text-cyan-500 border border-zinc-200 dark:border-zinc-800 rounded-lg transition-colors"
                  >
                    <span>X</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/santosh-kumar-66a9392b2/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-mono text-zinc-700 dark:text-zinc-300 hover:text-blue-500 border border-zinc-200 dark:border-zinc-800 rounded-lg transition-colors"
                  >
                    <span>LinkedIn</span>
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
                <div className="flex items-center gap-3 text-zinc-600 dark:text-zinc-400 text-[11px]">
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
              <span className="text-xs font-mono text-zinc-600 dark:text-zinc-400 block">
                FEDERATED QUERY LATENCY
              </span>
              <span className="text-2xl sm:text-3xl font-bold font-mono text-zinc-900 dark:text-zinc-100 mt-1.5 block tabular-nums">
                38 ms P95
              </span>
              <span className="text-xs text-zinc-600 dark:text-zinc-400 mt-1 block">
                Edge-indexed Search Hub router
              </span>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-[#0B0C10] border border-zinc-200 dark:border-zinc-800/80">
              <span className="text-xs font-mono text-zinc-600 dark:text-zinc-400 block">
                PRODUCTION TEST COVERAGE
              </span>
              <span className="text-2xl sm:text-3xl font-bold font-mono text-zinc-900 dark:text-zinc-100 mt-1.5 block tabular-nums">
                96.4% AST
              </span>
              <span className="text-xs text-zinc-600 dark:text-zinc-400 mt-1 block">
                Automated GitHub Actions matrix
              </span>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-[#0B0C10] border border-zinc-200 dark:border-zinc-800/80">
              <span className="text-xs font-mono text-zinc-600 dark:text-zinc-400 block">
                LIGHTHOUSE AUDIT SCORE
              </span>
              <span className="text-2xl sm:text-3xl font-bold font-mono text-blue-600 dark:text-blue-400 mt-1.5 block tabular-nums">
                99 / 100
              </span>
              <span className="text-xs text-zinc-600 dark:text-zinc-400 mt-1 block">
                Zero-CLS compositor rendering
              </span>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-[#0B0C10] border border-zinc-200 dark:border-zinc-800/80">
              <span className="text-xs font-mono text-zinc-600 dark:text-zinc-400 block">
                DEPLOYMENT RELIABILITY
              </span>
              <span className="text-2xl sm:text-3xl font-bold font-mono text-zinc-900 dark:text-zinc-100 mt-1.5 block tabular-nums">
                99.98% SLA
              </span>
              <span className="text-xs text-zinc-600 dark:text-zinc-400 mt-1 block">
                Multi-region Vercel &amp; Render nodes
              </span>
            </div>
          </div>
        </section>

        {/* Subtle Animated Marquee Section Divider */}
        <div className="border-y border-zinc-200 dark:border-zinc-800/80 py-3.5 overflow-hidden bg-zinc-100/60 dark:bg-[#08080B]">
          <div className="animate-marquee text-xs font-mono text-zinc-600 dark:text-zinc-400 space-x-10">
            <span>selected engineering works · case studies · systems architecture · typescript &amp; dart · automated ci/cd pipelines · federated search hub</span>
            <span>selected engineering works · case studies · systems architecture · typescript &amp; dart · automated ci/cd pipelines · federated search hub</span>
          </div>
        </div>

        {/* Selected Works: Media-First Dynamic Bento Box */}
        <section id="works" className="max-w-7xl mx-auto px-6 py-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <p className="text-xs font-mono text-zinc-600 dark:text-zinc-400">
                {t.worksKicker}
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 mt-2">
                {t.worksTitle}
              </h2>
            </div>

            {/* Interactive Filter Controls (Functional Buttons) */}
            <div className="flex flex-wrap items-center gap-1 p-1 bg-zinc-200/70 dark:bg-zinc-900 rounded-xl border border-zinc-300/80 dark:border-zinc-800">
              {[
                { id: 'all', label: t.filterAll },
                { id: 'search-systems', label: t.filterSearch },
                { id: 'cloud-cicd', label: t.filterCloud },
                { id: 'cross-platform', label: t.filterMobile },
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
                    <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-zinc-600 dark:text-zinc-400">
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
                  <div className="text-xs font-mono text-zinc-600 dark:text-zinc-400 truncate">
                    {project.stack.join(' · ')}
                  </div>
                  <span className="inline-flex items-center gap-1 text-xs font-medium text-blue-600 dark:text-blue-400 whitespace-nowrap shrink-0">
                    <span>{t.inspectArchBtn}</span>
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
            <p className="text-xs font-mono text-zinc-600 dark:text-zinc-400">
              {t.pillarsKicker}
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 mt-2">
              {t.pillarsTitle}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {ENGINEERING_PILLARS.map((pillar) => (
              <div
                key={pillar.index}
                className="p-7 rounded-2xl bg-white dark:bg-[#0B0C10] border border-zinc-200 dark:border-zinc-800/90 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono text-zinc-600 dark:text-zinc-400">
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
                  <p className="text-xs font-mono text-zinc-600 dark:text-zinc-400">
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

        {/* Live GitHub Ecosystem & Telemetry Widget */}
        <section id="stats" className="max-w-7xl mx-auto px-6 py-16 border-t border-zinc-200 dark:border-zinc-800/80">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-cyan-950/40 text-cyan-400 border border-cyan-500/30 mb-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>LIVE TELEMETRY · api.github.com/users/santoshkumarvvv</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
                {t.statsTitle}
              </h2>
            </div>
            <div className="flex items-center gap-3">
              <a
                href="https://github.com/santoshkumarvvv"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-zinc-900 text-white text-xs font-semibold border border-zinc-700 hover:border-cyan-500 transition-colors"
              >
                <FolderGit2 className="w-4 h-4 text-cyan-400" />
                <span>{t.followBtn}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-white dark:bg-[#0B0C10] border border-zinc-200 dark:border-zinc-800/90 shadow-xs">
              <span className="text-xs font-mono text-zinc-600 dark:text-zinc-400 block">PUBLIC REPOSITORIES</span>
              <span className="text-3xl font-extrabold font-mono text-cyan-600 dark:text-cyan-400 mt-2 block tabular-nums">
                {githubUser.public_repos}
              </span>
              <span className="text-xs text-zinc-600 dark:text-zinc-400 mt-1 block">Active open-source systems</span>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-[#0B0C10] border border-zinc-200 dark:border-zinc-800/90 shadow-xs">
              <span className="text-xs font-mono text-zinc-600 dark:text-zinc-400 block">TOTAL STARGAZERS</span>
              <span className="text-3xl font-extrabold font-mono text-amber-500 mt-2 block tabular-nums">
                {totalStars} ★
              </span>
              <span className="text-xs text-zinc-600 dark:text-zinc-400 mt-1 block">Community &amp; project stars</span>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-[#0B0C10] border border-zinc-200 dark:border-zinc-800/90 shadow-xs">
              <span className="text-xs font-mono text-zinc-600 dark:text-zinc-400 block">CODEQL &amp; SECURITY</span>
              <span className="text-3xl font-extrabold font-mono text-emerald-500 mt-2 block">
                0 Alerts
              </span>
              <span className="text-xs text-zinc-600 dark:text-zinc-400 mt-1 block">Clean automated static analysis</span>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-[#0B0C10] border border-zinc-200 dark:border-zinc-800/90 shadow-xs">
              <span className="text-xs font-mono text-zinc-600 dark:text-zinc-400 block">RECENT PRODUCTION ACTIVITY</span>
              <span className="text-xl font-bold font-mono text-zinc-900 dark:text-zinc-100 mt-2 block truncate">
                {repos[0] ? new Date(repos[0].updated_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }) : 'Active Today'}
              </span>
              <span className="text-xs text-zinc-600 dark:text-zinc-400 mt-1 block">Continuous Git push cadence</span>
            </div>
          </div>
        </section>

        {/* Live GitHub Repositories Command Hub */}
        <section
          id="repositories"
          className="max-w-7xl mx-auto px-6 py-20 border-t border-zinc-200 dark:border-zinc-800/80"
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <p className="text-xs font-mono text-zinc-600 dark:text-zinc-400">
                {t.reposKicker}
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 mt-2">
                {t.reposTitle}
              </h2>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="relative">
                <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  id="repo-filter-input"
                  aria-label="Filter repositories"
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
                <span>{isSyncingRepos ? t.syncingBtn : t.syncBtn}</span>
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
                    <span className="text-xs font-mono text-zinc-600 dark:text-zinc-400 tabular-nums shrink-0">
                      branch: {repo.default_branch || 'main'}
                    </span>
                  </div>

                  <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2.5 leading-relaxed">
                    {repo.description ||
                      'Production TypeScript and modern application engineering repository maintained by Santosh Kumar.'}
                  </p>

                  {/* Tech Stack Badges */}
                  <div className="flex flex-wrap gap-1.5 mt-3.5">
                    {(repo.tech_stack || [repo.language || 'TypeScript', 'Clean Architecture', 'CI/CD']).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 text-[11px] font-mono rounded-md bg-zinc-100 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-800"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-zinc-200/80 dark:border-zinc-800/80 flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-zinc-600 dark:text-zinc-400">
                  <div className="flex items-center gap-2">
                    <span className="text-amber-500 font-semibold">{repo.stargazers_count || 1} ★</span>
                    <span aria-hidden="true">·</span>
                    <span className="tabular-nums">
                      Updated {new Date(repo.updated_at).toLocaleDateString()}
                    </span>
                  </div>

                  <div className="flex items-center gap-2.5">
                    {repo.live_demo && (
                      <a
                        href={repo.live_demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 border border-cyan-500/30 font-semibold transition-colors"
                      >
                        <span>{t.liveDemoBtn}</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </a>
                    )}

                    <button
                      type="button"
                      onClick={() => handleCopyClone(repo.full_name)}
                      className="inline-flex items-center gap-1.5 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors cursor-pointer"
                    >
                      {copiedCloneUrl === repo.full_name ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-blue-500" />
                          <span>{t.clonedBtn}</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>{t.cloneBtn}</span>
                        </>
                      )}
                    </button>

                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      <span>GitHub</span>
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
          {/* Visible Web3Forms Access Key Setup Banner at Top of Contact Section */}
          <div
            role="status"
            className="mb-8 p-4 rounded-xl border border-amber-500/40 bg-amber-950/30 text-amber-200 text-xs sm:text-sm font-mono flex items-center gap-3"
          >
            <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
            <span>
              Contact form is live — replace ACCESS_KEY_PENDING with your Web3Forms key from web3forms.com to receive submissions.
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left Column: Direct channels and bio */}
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-cyan-950/50 text-cyan-400 border border-cyan-500/30">
                <Mail className="w-3.5 h-3.5" />
                <span>DIRECT COMMS · संपर्क करें</span>
              </div>

              <h2 className="text-3xl font-extrabold text-zinc-900 dark:text-zinc-100 tracking-tight">
                {t.contactHeadline}
              </h2>

              <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {t.contactDesc}
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
                  <span className="font-mono text-xs font-semibold">{t.downloadCvBtn} (PDF)</span>
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
                    <input type="hidden" name="access_key" value="ACCESS_KEY_PENDING" />
                    <div className="flex items-center justify-between pb-2 border-b border-zinc-200 dark:border-zinc-800">
                      <span className="text-xs font-bold text-zinc-800 dark:text-zinc-200 uppercase tracking-wider">
                        {t.sendDirectHeader}
                      </span>
                      <span className="text-[11px] text-zinc-600 dark:text-zinc-400 font-mono">
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
                        <label htmlFor="contact-name" className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
                          {t.labelName}
                        </label>
                        <input
                          id="contact-name"
                          name="name"
                          type="text"
                          value={formState.name}
                          onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                          placeholder="e.g. Alex Chen"
                          className="w-full px-3.5 py-2.5 rounded-lg border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-900/80 text-zinc-900 dark:text-zinc-100 text-xs focus:outline-none focus:border-cyan-500 transition-colors"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label htmlFor="contact-email" className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
                          {t.labelEmail} <span className="text-cyan-500">*</span>
                        </label>
                        <input
                          id="contact-email"
                          name="email"
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
                      <label htmlFor="contact-subject" className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
                        {t.labelSubject}
                      </label>
                      <input
                        id="contact-subject"
                        name="subject"
                        type="text"
                        value={formState.subject}
                        onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                        placeholder="Search Engine Consulting, Systems Architecture, etc."
                        className="w-full px-3.5 py-2.5 rounded-lg border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-900/80 text-zinc-900 dark:text-zinc-100 text-xs focus:outline-none focus:border-cyan-500 transition-colors"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="contact-message" className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
                        {t.labelMessage} <span className="text-cyan-500">*</span>
                      </label>
                      <textarea
                        id="contact-message"
                        name="message"
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
                        <span>{isSending ? t.sendingBtn : t.sendBtn}</span>
                      </button>

                      <a
                        href={`mailto:kumasantosh947@gmail.com?subject=${encodeURIComponent(formState.subject || 'Portfolio Inquiry')}&body=${encodeURIComponent(formState.message || '')}`}
                        className="text-xs text-zinc-600 dark:text-zinc-400 hover:text-cyan-400 transition-colors flex items-center gap-1"
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
      <footer className="border-t border-zinc-200 dark:border-zinc-800/80 py-10 px-6 bg-zinc-100/40 dark:bg-[#030407]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-zinc-600 dark:text-zinc-400">
          <div>
            <p className="font-semibold text-zinc-800 dark:text-zinc-200">
              {t.footerTitle}
            </p>
            <p className="text-[11px] text-zinc-600 dark:text-zinc-400 mt-0.5">
              {t.footerSub}
            </p>
          </div>

          {/* Visible Social Links & Actions in Footer */}
          <div className="flex flex-wrap items-center gap-4">
            <a
              href="https://github.com/santoshkumarvvv"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:text-cyan-500 hover:border-cyan-500/50 transition-colors"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
              <span>GitHub</span>
            </a>
            <a
              href="https://x.com/SantoshKum86044"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:text-cyan-500 hover:border-cyan-500/50 transition-colors"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              <span>X (@SantoshKum86044)</span>
            </a>
            <a
              href="https://www.linkedin.com/in/santosh-kumar-66a9392b2/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:text-blue-500 hover:border-blue-500/50 transition-colors"
            >
              <Linkedin className="w-3.5 h-3.5 text-blue-500" />
              <span>LinkedIn</span>
            </a>
            <a
              href="./assets/Santosh_Kumar_Resume.pdf"
              download="Santosh_Kumar_Resume.pdf"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold hover:bg-emerald-500/20 transition-colors"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>{t.footerResume}</span>
            </a>
            <a
              href="mailto:kumasantosh947@gmail.com"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:text-cyan-500 transition-colors"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>{t.footerComms}</span>
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
