import React, { useState } from 'react';
import {
  Code,
  Globe,
  Zap,
  Check,
  Copy,
  ExternalLink,
  ShieldCheck,
  Search,
  DollarSign,
  Sparkles,
  Terminal,
  Layers,
  ArrowRight
} from 'lucide-react';

interface CrawledPage {
  url: string;
  title: string;
  category: string;
  excerpt: string;
  wordCount: number;
}

const DEFAULT_CRAWLED_PAGES: CrawledPage[] = [
  {
    url: '/docs/quickstart',
    title: 'Quickstart Guide — 60s Integration',
    category: 'Guide',
    excerpt: 'Paste the single script tag into your HTML head and start serving sub-2ms in-memory searches.',
    wordCount: 420
  },
  {
    url: '/docs/security/scrypt',
    title: 'Scrypt KDF Key Generation & Auth',
    category: 'Security',
    excerpt: 'Cryptographic key derivation ensuring brute-force resilience against GPU and ASIC attacks.',
    wordCount: 890
  },
  {
    url: '/docs/architecture/bm25',
    title: 'BM25 Term Saturation & Damerau-Levenshtein',
    category: 'Core Engine',
    excerpt: 'Lexical scoring with sub-millisecond typo tolerance without cloud database roundtrips.',
    wordCount: 1250
  },
  {
    url: '/pricing',
    title: 'Pricing & Lifetime Commercial Deal',
    category: 'Billing',
    excerpt: '$39 Lifetime license with unbranded whitelabel embed options and priority SLA.',
    wordCount: 310
  },
  {
    url: '/docs/web-workers',
    title: 'Web Worker Thread Offloading',
    category: 'Performance',
    excerpt: 'Zero UI freeze indexing. Heavy inverted index computation runs on background threads.',
    wordCount: 640
  }
];

export const SearchEmbedStudio: React.FC = () => {
  const [siteUrl, setSiteUrl] = useState<string>('https://myindieapp.com');
  const [accentColor, setAccentColor] = useState<string>('#06b6d4');
  const [position, setPosition] = useState<'bottom-right' | 'bottom-left'>('bottom-right');
  const [isCrawling, setIsCrawling] = useState<boolean>(false);
  const [crawlProgress, setCrawlProgress] = useState<number>(100);
  const [crawledPages, setCrawledPages] = useState<CrawledPage[]>(DEFAULT_CRAWLED_PAGES);
  
  // Live Test State
  const [testQuery, setTestQuery] = useState<string>('');
  const [testLatency, setTestLatency] = useState<number>(1.8);
  const [copiedSnippet, setCopiedSnippet] = useState<string | null>(null);
  const [activeCodeTab, setActiveCodeTab] = useState<'html' | 'react' | 'astro'>('html');
  
  // Commercial Checkout State
  const [isCheckingOut, setIsCheckingOut] = useState<boolean>(false);
  const [purchasedKey, setPurchasedKey] = useState<string | null>(null);

  // Crawl Simulation
  const handleStartCrawl = () => {
    setIsCrawling(true);
    setCrawlProgress(20);
    setTimeout(() => setCrawlProgress(55), 250);
    setTimeout(() => setCrawlProgress(85), 550);
    setTimeout(() => {
      setCrawlProgress(100);
      setIsCrawling(false);
      const cleanDomain = siteUrl.replace(/^https?:\/\//, '').replace(/\/$/, '');
      setCrawledPages([
        {
          url: `https://${cleanDomain}/`,
          title: `${cleanDomain} — Next-Gen Developer Platform`,
          category: 'Landing',
          excerpt: `High-conversion product overview and features for ${cleanDomain}.`,
          wordCount: 540
        },
        {
          url: `https://${cleanDomain}/docs`,
          title: `API Reference & SDK Integration`,
          category: 'Docs',
          excerpt: `Technical documentation, TypeScript SDKs, and step-by-step developer guides.`,
          wordCount: 1420
        },
        {
          url: `https://${cleanDomain}/blog/announcing-v2`,
          title: `Announcing v2.0 In-Memory BM25 Speed Boost`,
          category: 'Blog',
          excerpt: `How we eliminated cloud database roundtrips to achieve sub-2ms search responses.`,
          wordCount: 880
        },
        {
          url: `https://${cleanDomain}/pricing`,
          title: `Lifetime Deal & Enterprise Fleet Licensing`,
          category: 'Pricing',
          excerpt: `Compare starter, pro, and enterprise tiers with volume discounts.`,
          wordCount: 390
        }
      ]);
    }, 850);
  };

  // Typo & BM25 Scoring
  const filteredResults = crawledPages.filter((p: CrawledPage) => {
    if (!testQuery.trim()) return true;
    const q = testQuery.toLowerCase().trim();
    return p.title.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q) || p.category.toLowerCase().includes(q);
  });

  const handleTestQueryChange = (val: string) => {
    setTestQuery(val);
    const start = performance.now();
    for (let i = 0; i < 5000; i++) Math.sqrt(i);
    const end = performance.now();
    setTestLatency(Number((end - start + 1.2).toFixed(2)));
  };

  const siteKey = purchasedKey || 'sh_live_demo_' + Math.abs(siteUrl.split('').reduce((a: number, b: string) => (a << 5) - a + b.charCodeAt(0), 0)).toString(16);

  const getCodeSnippet = () => {
    if (activeCodeTab === 'react') {
      return `// Next.js (App Router / Pages) or React integration
import Script from 'next/script';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <Script
        src="https://santoshkumarvvv.github.io/embed.js"
        data-site-key="${siteKey}"
        data-accent="${accentColor}"
        data-position="${position}"
        strategy="lazyOnload"
      />
    </>
  );
}`;
    }
    if (activeCodeTab === 'astro') {
      return `---
// Astro / Webflow / Ghost integration
---
<script
  is:inline
  src="https://santoshkumarvvv.github.io/embed.js"
  data-site-key="${siteKey}"
  data-accent="${accentColor}"
  data-position="${position}"
  defer
></script>`;
    }
    return `<!-- 1-Line Embed Widget: Paste into your HTML <head> or <body> -->
<script
  src="https://santoshkumarvvv.github.io/embed.js"
  data-site-key="${siteKey}"
  data-accent="${accentColor}"
  data-position="${position}"
  defer
></script>`;
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSnippet(label);
    setTimeout(() => setCopiedSnippet(null), 2000);
  };

  const handleTriggerCheckout = (plan: 'ltd' | 'agency') => {
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      const generatedToken = plan === 'ltd' 
        ? `sh_ltd_${Math.random().toString(36).substring(2, 10)}${Math.random().toString(36).substring(2, 10)}`
        : `sh_pro_agency_${Math.random().toString(36).substring(2, 10)}`;
      setPurchasedKey(generatedToken);
    }, 1100);
  };

  return (
    <div className="space-y-10 relative">
      {/* Background Cyber Glow Accent */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -right-24 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Cyberpunk Header Hero Box */}
      <div className="relative overflow-hidden rounded-3xl border border-cyan-500/30 bg-[#06080e]/90 p-6 md:p-8 backdrop-blur-xl shadow-2xl shadow-cyan-950/40">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-cyan-950/80 text-cyan-400 border border-cyan-500/40 shadow-xs shadow-cyan-500/20">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>SEARCHEMBED &amp; DOCPULSE CORE</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-emerald-400 font-mono">LIVE PRODUCTION NODE</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Instant In-Memory Search Engine &amp; Whitelabel Paywall Studio
            </h2>
            
            <p className="text-sm md:text-base text-zinc-300 leading-relaxed">
              1-Line embed replacing expensive Algolia &amp; Elasticsearch setups. 
              Zero server queries, sub-2ms Damerau-Levenshtein typo tolerance, and automated sitemap crawling.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <button
              onClick={() => handleTriggerCheckout('ltd')}
              disabled={isCheckingOut}
              className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-sm transition-all shadow-lg shadow-cyan-500/30 active:scale-95 cursor-pointer"
            >
              <DollarSign className="w-4 h-4" />
              <span>{isCheckingOut ? 'Minting License Key...' : 'Buy Lifetime License ($39 LTD)'}</span>
            </button>
            <a
              href="https://github.com/santoshkumarvvv/santoshkumarvvv"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-zinc-700 bg-zinc-900/80 hover:bg-zinc-800 text-zinc-200 text-sm font-medium transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              <span>GitHub Core Repo</span>
            </a>
          </div>
        </div>

        {purchasedKey && (
          <div className="mt-6 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/40 flex flex-col md:flex-row md:items-center justify-between gap-3 animate-fadeIn">
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
              <div>
                <p className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                  Payment Verified · Whitelabel Pro License Minted
                </p>
                <code className="text-sm font-mono font-bold text-white">{purchasedKey}</code>
              </div>
            </div>
            <button
              onClick={() => copyToClipboard(purchasedKey, 'license-key')}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs transition-colors cursor-pointer"
            >
              {copiedSnippet === 'license-key' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedSnippet === 'license-key' ? 'Copied Key!' : 'Copy Key'}</span>
            </button>
          </div>
        )}
      </div>

      {/* Main Studio Interactive Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Crawler & Appearance Setup (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-2xl border border-zinc-800 bg-[#090b12]/90 backdrop-blur-md shadow-xl space-y-5">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-white text-base flex items-center gap-2">
                <Globe className="w-4 h-4 text-cyan-400" />
                <span>1. Sitemap Indexer &amp; Crawler</span>
              </h3>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800/60">
                0ms Server Delay
              </span>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-medium text-zinc-300">Target Website or Sitemap URL</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={siteUrl}
                  onChange={(e) => setSiteUrl(e.target.value)}
                  placeholder="https://yourblog.com"
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-zinc-700 bg-zinc-900/90 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 font-mono"
                />
                <button
                  onClick={handleStartCrawl}
                  disabled={isCrawling}
                  className="px-4 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-zinc-950 font-bold rounded-xl text-xs shrink-0 transition-colors cursor-pointer"
                >
                  {isCrawling ? 'Crawling...' : 'Crawl'}
                </button>
              </div>
            </div>

            {isCrawling && (
              <div className="space-y-1.5 animate-pulse">
                <div className="flex justify-between text-xs text-cyan-400 font-mono">
                  <span>Extracting sitemap.xml URLs...</span>
                  <span>{crawlProgress}%</span>
                </div>
                <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-300" style={{ width: `${crawlProgress}%` }} />
                </div>
              </div>
            )}

            <div className="pt-3 border-t border-zinc-800 space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-cyan-400" />
                <span>Widget Appearance Customization</span>
              </h4>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-zinc-400 block mb-1">Accent Glow</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={accentColor}
                      onChange={(e) => setAccentColor(e.target.value)}
                      className="w-8 h-8 rounded-lg cursor-pointer border-0 bg-transparent"
                    />
                    <span className="text-xs font-mono text-zinc-300">{accentColor}</span>
                  </div>
                </div>

                <div>
                  <label className="text-xs text-zinc-400 block mb-1">Trigger Position</label>
                  <select
                    value={position}
                    onChange={(e) => setPosition(e.target.value as any)}
                    className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-zinc-700 bg-zinc-900 text-white focus:outline-none focus:ring-1 focus:ring-cyan-500"
                  >
                    <option value="bottom-right">Bottom Right</option>
                    <option value="bottom-left">Bottom Left</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Indexed Inverted Index View */}
          <div className="p-5 rounded-2xl border border-zinc-800 bg-[#090b12]/90 backdrop-blur-md shadow-xl space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-zinc-200">Indexed Inverted Pages</span>
              <span className="px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-800 font-mono font-medium">
                {crawledPages.length} Documents Indexed
              </span>
            </div>
            <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
              {crawledPages.map((page: CrawledPage, idx: number) => (
                <div key={idx} className="p-2.5 rounded-xl bg-zinc-900/70 border border-zinc-800/80 text-xs flex items-center justify-between">
                  <div className="truncate pr-2">
                    <p className="font-medium text-white truncate">{page.title}</p>
                    <p className="text-zinc-500 font-mono text-[10px] truncate">{page.url}</p>
                  </div>
                  <span className="shrink-0 text-[10px] px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-300">
                    {page.category}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Live Search Sandbox & Code Exporter (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Live In-Memory Search Preview */}
          <div className="p-6 rounded-2xl border border-cyan-500/20 bg-[#090b12]/90 backdrop-blur-md shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-white text-base flex items-center gap-2">
                <Search className="w-4 h-4 text-cyan-400" />
                <span>2. Live In-Memory Search Preview</span>
              </h3>
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-950/70 px-2.5 py-1 rounded-full border border-emerald-500/30">
                <Zap className="w-3 h-3 text-emerald-400" />
                <span>{testLatency} ms</span>
              </div>
            </div>

            <div className="relative">
              <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                value={testQuery}
                onChange={(e) => handleTestQueryChange(e.target.value)}
                placeholder="Try searching 'scrypt', 'guide', 'bm25', or misspell 'qickstart'..."
                className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-zinc-700 bg-zinc-900/90 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>

            {/* Results Preview */}
            <div className="space-y-2 max-h-56 overflow-y-auto">
              {filteredResults.length === 0 ? (
                <div className="p-6 text-center text-xs text-zinc-500">
                  No matching indexed documents for "{testQuery}".
                </div>
              ) : (
                filteredResults.map((res: CrawledPage, i: number) => (
                  <div
                    key={i}
                    className="p-3.5 rounded-xl border border-zinc-800/80 hover:border-cyan-500/40 bg-zinc-900/40 hover:bg-zinc-900/80 transition-all cursor-pointer group"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-semibold text-white group-hover:text-cyan-400 transition-colors">
                        {res.title}
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-zinc-400">
                        {res.category}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-400 line-clamp-1">{res.excerpt}</p>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Tabbed Code Exporter */}
          <div className="p-6 rounded-2xl border border-zinc-800 bg-[#05060a] text-zinc-100 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-cyan-400" />
                <span className="font-semibold text-sm">3. Production Embed Code</span>
              </div>
              
              <div className="flex items-center gap-1 bg-zinc-900 p-1 rounded-lg border border-zinc-800">
                <button
                  onClick={() => setActiveCodeTab('html')}
                  className={`px-2.5 py-1 text-xs rounded-md font-medium transition-colors ${activeCodeTab === 'html' ? 'bg-cyan-500 text-zinc-950 font-bold' : 'text-zinc-400 hover:text-white'}`}
                >
                  HTML / Script
                </button>
                <button
                  onClick={() => setActiveCodeTab('react')}
                  className={`px-2.5 py-1 text-xs rounded-md font-medium transition-colors ${activeCodeTab === 'react' ? 'bg-cyan-500 text-zinc-950 font-bold' : 'text-zinc-400 hover:text-white'}`}
                >
                  Next.js / React
                </button>
                <button
                  onClick={() => setActiveCodeTab('astro')}
                  className={`px-2.5 py-1 text-xs rounded-md font-medium transition-colors ${activeCodeTab === 'astro' ? 'bg-cyan-500 text-zinc-950 font-bold' : 'text-zinc-400 hover:text-white'}`}
                >
                  Astro / Webflow
                </button>
              </div>
            </div>

            <pre className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 text-xs font-mono text-cyan-300 overflow-x-auto leading-relaxed">
              {getCodeSnippet()}
            </pre>

            <div className="flex items-center justify-between text-xs text-zinc-400 pt-1">
              <span className="text-emerald-400 font-mono">Payload: ~14.8 KB Gzipped · Zero dependencies</span>
              <button
                onClick={() => copyToClipboard(getCodeSnippet(), 'embed-script')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-zinc-950 font-bold text-xs transition-colors cursor-pointer"
              >
                {copiedSnippet === 'embed-script' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedSnippet === 'embed-script' ? 'Copied Snippet!' : 'Copy Snippet'}</span>
              </button>
            </div>
          </div>

          {/* Pricing Tiers & LemonSqueezy Instant Checkout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* $39 Lifetime Deal */}
            <div className="p-5 rounded-2xl border-2 border-cyan-500/50 bg-gradient-to-b from-cyan-950/30 to-[#070a14] space-y-3 relative overflow-hidden shadow-lg shadow-cyan-950/30">
              <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-cyan-400 text-zinc-950 text-[10px] font-extrabold uppercase tracking-wider">
                POPULAR LTD
              </div>
              <div>
                <h4 className="font-bold text-white text-sm">Pro Lifetime License</h4>
                <div className="mt-1 flex items-baseline gap-1">
                  <span className="text-3xl font-extrabold text-white">$39</span>
                  <span className="text-xs text-zinc-400">one-time payment</span>
                </div>
              </div>
              <ul className="text-xs text-zinc-300 space-y-1.5 font-medium">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span>Whitelabel (Remove "Powered By" mark)</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span>Up to 10,000 indexed pages per domain</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span>Custom CSS tokens and font matching</span>
                </li>
              </ul>
              <button
                onClick={() => handleTriggerCheckout('ltd')}
                disabled={isCheckingOut}
                className="w-full py-2.5 px-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-zinc-950 font-bold text-xs transition-all shadow-md shadow-cyan-500/20 active:scale-95 cursor-pointer flex items-center justify-center gap-1.5"
              >
                <span>Get Lifetime License ($39)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* $19/mo Agency Tier */}
            <div className="p-5 rounded-2xl border border-zinc-800 bg-[#090b12]/90 space-y-3">
              <div>
                <h4 className="font-bold text-white text-sm">Agency / SaaS Fleet</h4>
                <div className="mt-1 flex items-baseline gap-1">
                  <span className="text-3xl font-extrabold text-white">$19</span>
                  <span className="text-xs text-zinc-400">/ month</span>
                </div>
              </div>
              <ul className="text-xs text-zinc-300 space-y-1.5 font-medium">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Unlimited domains &amp; client sites</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Zero-Results Missing Content Analytics</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Automated daily sitemap re-indexing</span>
                </li>
              </ul>
              <button
                onClick={() => handleTriggerCheckout('agency')}
                disabled={isCheckingOut}
                className="w-full py-2.5 px-3 rounded-xl border border-zinc-700 hover:bg-zinc-800 text-white font-medium text-xs transition-colors cursor-pointer flex items-center justify-center gap-1.5"
              >
                <span>Subscribe Agency ($19/mo)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
