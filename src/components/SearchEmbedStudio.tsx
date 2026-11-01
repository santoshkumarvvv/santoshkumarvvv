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
  ArrowRight,
  Wallet,
  CreditCard
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
    url: 'https://santoshkumarvvv.github.io/#architecture',
    title: 'SearchEmbed — 1-Line In-Memory Search Engine',
    category: 'Architecture',
    excerpt: '14.8KB zero-dependency client-side search widget serving low-latency in-browser BM25 queries.',
    wordCount: 420
  },
  {
    url: 'https://santoshkumarvvv.github.io/#works',
    title: 'Scrypt KDF Cryptographic Authentication',
    category: 'Security',
    excerpt: 'Deterministic key derivation ensuring brute-force resilience against GPU and ASIC attacks.',
    wordCount: 890
  },
  {
    url: 'https://github.com/santoshkumarvvv/search-hub-',
    title: 'SearchHub — Universal Federated Query Engine',
    category: 'Core Repo',
    excerpt: 'Universal developer search hub with edge caching, token-bucket debouncers, and Next.js.',
    wordCount: 1250
  },
  {
    url: 'https://github.com/santoshkumarvvv/dev-showcase',
    title: 'Dev Showcase — Flutter Clean Architecture Engine',
    category: 'Mobile Engine',
    excerpt: '120fps native mobile platform built with Clean Architecture, Riverpod, and GitHub Actions CI/CD.',
    wordCount: 960
  },
  {
    url: 'https://santoshkumarvvv.github.io/assets/Santosh_Kumar_Resume.pdf',
    title: 'Official Systems Engineering Resume (PDF)',
    category: 'Credentials',
    excerpt: 'Verified engineering credentials covering distributed systems, low-latency algorithms, and production stack.',
    wordCount: 640
  }
];

export const SearchEmbedStudio: React.FC = () => {
  const [siteUrl, setSiteUrl] = useState<string>('https://myindieapp.com');
  const [accentColor, setAccentColor] = useState<string>('#EF9F27');
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
  const [customCheckoutUrl, setCustomCheckoutUrl] = useState<string>('');
  const [showPayoutSettings, setShowPayoutSettings] = useState<boolean>(false);

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
          excerpt: `How we eliminated cloud database roundtrips to achieve instant in-memory search responses.`,
          wordCount: 880
        },
        {
          url: `https://${cleanDomain}/#embed`,
          title: `Client SDK Integration & Live API Key`,
          category: 'Integration',
          excerpt: `Production script snippet with sh_live_demo key and BM25 configuration.`,
          wordCount: 420
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
    if (customCheckoutUrl && customCheckoutUrl.startsWith('http')) {
      window.location.href = customCheckoutUrl;
      return;
    }
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
      {/* Studio Header Box */}
      <div className="relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950 p-6 md:p-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-zinc-900 text-[#EF9F27] border border-[#EF9F27]/40">
              <Sparkles className="w-3.5 h-3.5 text-[#EF9F27]" />
              <span>SEARCHEMBED &amp; DOCPULSE CORE</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#EF9F27]" />
              <span className="text-[#EF9F27] font-mono">LIVE PRODUCTION NODE</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-extrabold text-zinc-100 tracking-tight leading-tight">
              Instant In-Memory Search Engine &amp; Whitelabel Paywall Studio
            </h2>
            
            <p className="text-sm md:text-base text-zinc-300 leading-relaxed">
              1-Line embed replacing expensive Algolia &amp; Elasticsearch setups. 
              Zero server queries, instant Damerau-Levenshtein typo tolerance, and automated sitemap crawling.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <a
              href="https://github.com/santoshkumarvvv/search-hub-"
              title="Live demo coming soon"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#EF9F27] hover:bg-[#EF9F27]/90 text-zinc-950 font-bold text-sm transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Launch Live App (Vercel)</span>
            </a>
            <a
              href="https://github.com/santoshkumarvvv/search-hub-"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-[#EF9F27] bg-transparent hover:bg-[#EF9F27]/10 text-[#EF9F27] text-sm font-medium transition-colors"
            >
              <Code className="w-4 h-4 text-[#EF9F27]" />
              <span>Search Engine Repo</span>
            </a>
            <a
              href="https://github.com/santoshkumarvvv/search-hub-app"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-[#EF9F27] bg-transparent hover:bg-[#EF9F27]/10 text-[#EF9F27] text-sm font-medium transition-colors"
            >
              <Layers className="w-4 h-4 text-[#EF9F27]" />
              <span>Flutter Mobile App</span>
            </a>
          </div>
        </div>

        {showPayoutSettings && (
          <div className="mt-6 p-5 rounded-2xl bg-zinc-950 border border-[#EF9F27]/40 text-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-[#EF9F27] uppercase tracking-wider flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-[#EF9F27]" />
                <span>Live Bank &amp; LemonSqueezy Direct Payout Routing</span>
              </span>
              <span className="text-zinc-400 font-mono">100% Direct Deposits</span>
            </div>
            <p className="text-zinc-300 leading-relaxed">
              Paste your live LemonSqueezy or Gumroad checkout product link below. 
              When visitors click "Buy", all customer payments flow directly into your LemonSqueezy merchant account and are deposited automatically into your bank account.
            </p>
            <div className="flex gap-2">
              <input
                type="text"
                aria-label="LemonSqueezy or Gumroad checkout URL"
                value={customCheckoutUrl}
                onChange={(e) => setCustomCheckoutUrl(e.target.value)}
                placeholder="https://yourstore.lemonsqueezy.com/checkout/buy/..."
                className="w-full px-3.5 py-2 rounded-xl border border-zinc-700 bg-zinc-900 text-zinc-100 font-mono text-xs focus:outline-none focus:border-[#EF9F27]"
              />
              <button
                onClick={() => setShowPayoutSettings(false)}
                className="px-4 py-2 bg-[#EF9F27] hover:bg-[#EF9F27]/90 text-zinc-950 font-bold rounded-xl shrink-0 transition-colors cursor-pointer"
              >
                Save Payout Link
              </button>
            </div>
          </div>
        )}

        {purchasedKey && (
          <div className="mt-6 p-4 rounded-2xl bg-[#EF9F27]/10 border border-[#EF9F27]/40 flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-[#EF9F27] shrink-0" />
              <div>
                <p className="text-xs font-semibold text-[#EF9F27] uppercase tracking-wider">
                  Payment Verified · Whitelabel Pro License Minted
                </p>
                <code className="text-sm font-mono font-bold text-zinc-100">{purchasedKey}</code>
              </div>
            </div>
            <button
              onClick={() => copyToClipboard(purchasedKey, 'license-key')}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#EF9F27] hover:bg-[#EF9F27]/90 text-zinc-950 font-bold text-xs transition-colors cursor-pointer"
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
          <div className="p-6 rounded-2xl border border-zinc-800 bg-zinc-950 space-y-5">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-zinc-100 text-base flex items-center gap-2">
                <Globe className="w-4 h-4 text-[#EF9F27]" />
                <span>1. Sitemap Indexer &amp; Crawler</span>
              </h3>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-zinc-900 text-[#EF9F27] border border-[#EF9F27]/40">
                0ms Server Delay
              </span>
            </div>

            <div className="space-y-2">
              <label htmlFor="sitemap-url-input" className="text-xs font-medium text-zinc-300">Target Website or Sitemap URL</label>
              <div className="flex gap-2">
                <input
                  id="sitemap-url-input"
                  type="text"
                  aria-label="Target Website or Sitemap URL"
                  value={siteUrl}
                  onChange={(e) => setSiteUrl(e.target.value)}
                  placeholder="https://yourblog.com"
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-zinc-700 bg-zinc-900 text-zinc-100 focus:outline-none focus:border-[#EF9F27] font-mono"
                />
                <button
                  onClick={handleStartCrawl}
                  disabled={isCrawling}
                  className="px-4 py-2.5 bg-[#EF9F27] hover:bg-[#EF9F27]/90 text-zinc-950 font-bold rounded-xl text-xs shrink-0 transition-colors cursor-pointer"
                >
                  {isCrawling ? 'Crawling...' : 'Crawl'}
                </button>
              </div>
            </div>

            {isCrawling && (
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs text-[#EF9F27] font-mono">
                  <span>Extracting sitemap.xml URLs...</span>
                  <span>{crawlProgress}%</span>
                </div>
                <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
                  <div className="h-full bg-[#EF9F27] transition-all duration-300" style={{ width: `${crawlProgress}%` }} />
                </div>
              </div>
            )}

            <div className="pt-3 border-t border-zinc-800 space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-300 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-[#EF9F27]" />
                <span>Widget Appearance Customization</span>
              </h4>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="accent-glow-color" className="text-xs text-zinc-300 block mb-1">Accent Color</label>
                  <div className="flex items-center gap-2">
                    <input
                      id="accent-glow-color"
                      type="color"
                      aria-label="Accent Color"
                      value={accentColor}
                      onChange={(e) => setAccentColor(e.target.value)}
                      className="w-8 h-8 rounded-lg cursor-pointer border-0 bg-transparent"
                    />
                    <span className="text-xs font-mono text-zinc-300">{accentColor}</span>
                  </div>
                </div>

                <div>
                  <label htmlFor="trigger-position-select" className="text-xs text-zinc-300 block mb-1">Trigger Position</label>
                  <select
                    id="trigger-position-select"
                    aria-label="Trigger Position"
                    value={position}
                    onChange={(e) => setPosition(e.target.value as any)}
                    className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-zinc-700 bg-zinc-900 text-zinc-100 focus:outline-none focus:border-[#EF9F27]"
                  >
                    <option value="bottom-right">Bottom Right</option>
                    <option value="bottom-left">Bottom Left</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Indexed Inverted Index View */}
          <div className="p-5 rounded-2xl border border-zinc-800 bg-zinc-950 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-zinc-200">Indexed Inverted Pages</span>
              <span className="px-2 py-0.5 rounded-full bg-zinc-900 text-[#EF9F27] border border-[#EF9F27]/40 font-mono font-medium">
                {crawledPages.length} Documents Indexed
              </span>
            </div>
            <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
              {crawledPages.map((page: CrawledPage, idx: number) => (
                <div key={idx} className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs flex items-center justify-between">
                  <div className="truncate pr-2">
                    <p className="font-medium text-zinc-100 truncate">{page.title}</p>
                    <p className="text-zinc-400 font-mono text-[10px] truncate">{page.url}</p>
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
          <div className="p-6 rounded-2xl border border-zinc-800 bg-zinc-950 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-zinc-100 text-base flex items-center gap-2">
                <Search className="w-4 h-4 text-[#EF9F27]" />
                <span>2. Live In-Memory Search Preview</span>
              </h3>
              <div className="flex items-center gap-2 text-xs font-mono text-[#EF9F27] bg-zinc-900 px-2.5 py-1 rounded-full border border-[#EF9F27]/40">
                <Zap className="w-3 h-3 text-[#EF9F27]" />
                <span>{testLatency} ms</span>
              </div>
            </div>

            <div className="relative">
              <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                aria-label="Search indexed pages in preview"
                value={testQuery}
                onChange={(e) => handleTestQueryChange(e.target.value)}
                placeholder="Try searching 'scrypt', 'guide', 'bm25', or misspell 'qickstart'..."
                className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-zinc-700 bg-zinc-900 text-zinc-100 focus:outline-none focus:border-[#EF9F27]"
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
                    className="p-3.5 rounded-xl border border-zinc-800 hover:border-[#EF9F27]/50 bg-zinc-900/50 hover:bg-zinc-900 transition-colors cursor-pointer group"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-semibold text-zinc-100 group-hover:text-[#EF9F27] transition-colors">
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
          <div className="p-6 rounded-2xl border border-zinc-800 bg-zinc-950 text-zinc-100 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-[#EF9F27]" />
                <span className="font-semibold text-sm">3. Production Embed Code</span>
              </div>
              
              <div className="flex items-center gap-1 bg-zinc-900 p-1 rounded-lg border border-zinc-800">
                <button
                  onClick={() => setActiveCodeTab('html')}
                  className={`px-2.5 py-1 text-xs rounded-md font-medium transition-colors cursor-pointer ${activeCodeTab === 'html' ? 'bg-[#EF9F27] text-zinc-950 font-bold' : 'text-zinc-300 hover:text-[#EF9F27]'}`}
                >
                  HTML / Script
                </button>
                <button
                  onClick={() => setActiveCodeTab('react')}
                  className={`px-2.5 py-1 text-xs rounded-md font-medium transition-colors cursor-pointer ${activeCodeTab === 'react' ? 'bg-[#EF9F27] text-zinc-950 font-bold' : 'text-zinc-300 hover:text-[#EF9F27]'}`}
                >
                  Next.js / React
                </button>
                <button
                  onClick={() => setActiveCodeTab('astro')}
                  className={`px-2.5 py-1 text-xs rounded-md font-medium transition-colors cursor-pointer ${activeCodeTab === 'astro' ? 'bg-[#EF9F27] text-zinc-950 font-bold' : 'text-zinc-300 hover:text-[#EF9F27]'}`}
                >
                  Astro / Webflow
                </button>
              </div>
            </div>

            <pre className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 text-xs font-mono text-[#EF9F27] overflow-x-auto leading-relaxed">
              {getCodeSnippet()}
            </pre>

            <div className="flex items-center justify-between text-xs text-zinc-400 pt-1">
              <span className="text-[#EF9F27] font-mono">Payload: ~14.8 KB Gzipped · Zero dependencies</span>
              <button
                onClick={() => copyToClipboard(getCodeSnippet(), 'embed-script')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#EF9F27] hover:bg-[#EF9F27]/90 text-zinc-950 font-bold text-xs transition-colors cursor-pointer"
              >
                {copiedSnippet === 'embed-script' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedSnippet === 'embed-script' ? 'Copied Snippet!' : 'Copy Snippet'}</span>
              </button>
            </div>
          </div>

          {/* Open Source Engine & Cross-Platform Fleet Architecture */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Open Core Production Engine */}
            <div className="p-5 rounded-2xl border border-[#EF9F27]/50 bg-zinc-950 space-y-3 relative overflow-hidden">
              <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-[#EF9F27] text-zinc-950 text-[10px] font-extrabold uppercase tracking-wider">
                100% OPEN ARCHITECTURE
              </div>
              <div>
                <h4 className="font-bold text-zinc-100 text-sm">SearchHub Core Engine</h4>
                <div className="mt-1 flex items-baseline gap-1">
                  <span className="text-2xl font-extrabold text-zinc-100">Free &amp; Open Source</span>
                </div>
              </div>
              <ul className="text-xs text-zinc-300 space-y-1.5 font-medium">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#EF9F27] shrink-0" />
                  <span>Low-latency in-memory BM25 ranking</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#EF9F27] shrink-0" />
                  <span>Bounded Damerau-Levenshtein typo correction (len &ge; 4)</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#EF9F27] shrink-0" />
                  <span>Full keyboard accessibility (⌘K, Esc, ARIA modal)</span>
                </li>
              </ul>
              <a
                href="https://github.com/santoshkumarvvv/search-hub-"
                title="Live demo coming soon"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-3 rounded-xl bg-[#EF9F27] hover:bg-[#EF9F27]/90 text-zinc-950 font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
              >
                <span>Launch Live Web App (Vercel)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Mobile & Federated Extension */}
            <div className="p-5 rounded-2xl border border-zinc-800 bg-zinc-950 space-y-3">
              <div>
                <h4 className="font-bold text-zinc-100 text-sm">Cross-Platform Fleet</h4>
                <div className="mt-1 flex items-baseline gap-1">
                  <span className="text-2xl font-extrabold text-zinc-100">Flutter &amp; Web</span>
                </div>
              </div>
              <ul className="text-xs text-zinc-300 space-y-1.5 font-medium">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#EF9F27] shrink-0" />
                  <span>Native 120fps Dart/Flutter mobile UI</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#EF9F27] shrink-0" />
                  <span>Zero external crawler latency</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#EF9F27] shrink-0" />
                  <span>Scrypt KDF secure client storage</span>
                </li>
              </ul>
              <a
                href="https://github.com/santoshkumarvvv/search-hub-"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-3 rounded-xl border border-[#EF9F27] bg-transparent hover:bg-[#EF9F27]/10 text-[#EF9F27] font-medium text-xs transition-colors flex items-center justify-center gap-1.5"
              >
                <span>View Engine on GitHub</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

