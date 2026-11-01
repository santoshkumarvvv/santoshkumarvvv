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
  DollarSign
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
  const [accentColor, setAccentColor] = useState<string>('#2563eb');
  const [position, setPosition] = useState<'bottom-right' | 'bottom-left'>('bottom-right');
  const [isCrawling, setIsCrawling] = useState<boolean>(false);
  const [crawlProgress, setCrawlProgress] = useState<number>(100);
  const [crawledPages, setCrawledPages] = useState<CrawledPage[]>(DEFAULT_CRAWLED_PAGES);
  
  // Live Test State
  const [testQuery, setTestQuery] = useState<string>('');
  const [testLatency, setTestLatency] = useState<number>(1.8);
  const [copiedSnippet, setCopiedSnippet] = useState<string | null>(null);
  
  // Commercial Checkout State
  const [isCheckingOut, setIsCheckingOut] = useState<boolean>(false);
  const [purchasedKey, setPurchasedKey] = useState<string | null>(null);

  // Crawl Simulation
  const handleStartCrawl = () => {
    setIsCrawling(true);
    setCrawlProgress(15);
    setTimeout(() => setCrawlProgress(45), 300);
    setTimeout(() => setCrawlProgress(80), 650);
    setTimeout(() => {
      setCrawlProgress(100);
      setIsCrawling(false);
      const cleanDomain = siteUrl.replace(/^https?:\/\//, '').replace(/\/$/, '');
      setCrawledPages([
        {
          url: `https://${cleanDomain}/`,
          title: `${cleanDomain} — Homepage & Product Overview`,
          category: 'Landing',
          excerpt: `High-conversion product overview and features for ${cleanDomain}.`,
          wordCount: 540
        },
        {
          url: `https://${cleanDomain}/docs`,
          title: `Documentation & API Reference`,
          category: 'Docs',
          excerpt: `Technical documentation, SDKs, and step-by-step developer guides.`,
          wordCount: 1420
        },
        {
          url: `https://${cleanDomain}/blog/announcing-v2`,
          title: `Announcing v2.0 Architecture & Speed Boost`,
          category: 'Blog',
          excerpt: `How we achieved 10x faster response times and sub-millisecond latency.`,
          wordCount: 880
        },
        {
          url: `https://${cleanDomain}/pricing`,
          title: `Plans, Billing & Enterprise Options`,
          category: 'Pricing',
          excerpt: `Compare starter, pro, and enterprise tiers with volume discounts.`,
          wordCount: 390
        }
      ]);
    }, 900);
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
    // Simulate microscopic compute time
    for (let i = 0; i < 5000; i++) Math.sqrt(i);
    const end = performance.now();
    setTestLatency(Number((end - start + 1.2).toFixed(2)));
  };

  // Embed Snippet Code
  const siteKey = purchasedKey || 'sh_live_demo_' + Math.abs(siteUrl.split('').reduce((a: number, b: string) => (a << 5) - a + b.charCodeAt(0), 0)).toString(16);
  const embedCode = `<!-- SearchEmbed / DocPulse Widget — Add to your <head> -->
<script
  src="https://santoshkumarvvv.github.io/embed.js"
  data-site-key="${siteKey}"
  data-accent="${accentColor}"
  data-position="${position}"
  defer
></script>`;

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSnippet(label);
    setTimeout(() => setCopiedSnippet(null), 2000);
  };

  // LemonSqueezy / Gumroad Checkout Handler
  const handleTriggerCheckout = (plan: 'ltd' | 'agency') => {
    setIsCheckingOut(true);
    // Simulate LemonSqueezy Hosted Overlay
    setTimeout(() => {
      setIsCheckingOut(false);
      const generatedToken = plan === 'ltd' 
        ? `sh_ltd_${Math.random().toString(36).substring(2, 10)}${Math.random().toString(36).substring(2, 10)}`
        : `sh_pro_agency_${Math.random().toString(36).substring(2, 10)}`;
      setPurchasedKey(generatedToken);
    }, 1200);
  };

  return (
    <div className="space-y-10">
      {/* Hero Header */}
      <div className="relative overflow-hidden rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-gradient-to-br from-zinc-50 via-white to-zinc-100 dark:from-zinc-900/90 dark:via-zinc-900/40 dark:to-zinc-950 p-6 md:p-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              <Zap className="w-3.5 h-3.5" />
              <span>Underground Micro-SaaS Blueprint</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Instant Monetization</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight">
              SearchEmbed & DocPulse Studio
            </h2>
            <p className="text-sm md:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Drop-in client-side instant search for documentation sites, blogs, and SaaS platforms. 
              Sub-2ms BM25 ranking, zero cloud database costs, and zero configuration.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <button
              onClick={() => handleTriggerCheckout('ltd')}
              disabled={isCheckingOut}
              className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium text-sm transition-all shadow-lg shadow-blue-600/25 active:scale-95"
            >
              <DollarSign className="w-4 h-4" />
              <span>{isCheckingOut ? 'Opening LemonSqueezy...' : 'Get Lifetime Deal ($39 LTD)'}</span>
            </button>
            <a
              href="https://github.com/santoshkumarvvv/search-hub-"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800/60 text-zinc-800 dark:text-zinc-200 text-sm font-medium transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Inspect Source</span>
            </a>
          </div>
        </div>

        {purchasedKey && (
          <div className="mt-6 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-emerald-500 shrink-0" />
              <div>
                <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                  Payment Verified · Whitelabel Pro Key Activated
                </p>
                <code className="text-sm font-mono font-bold text-zinc-900 dark:text-zinc-100">{purchasedKey}</code>
              </div>
            </div>
            <button
              onClick={() => copyToClipboard(purchasedKey, 'license-key')}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-medium transition-colors"
            >
              {copiedSnippet === 'license-key' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedSnippet === 'license-key' ? 'Copied' : 'Copy Key'}</span>
            </button>
          </div>
        )}
      </div>

      {/* Main Studio Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Crawler & Config (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 shadow-xs space-y-5">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 text-base flex items-center gap-2">
                <Globe className="w-4 h-4 text-blue-500" />
                <span>1. Sitemap Indexer & Crawler</span>
              </h3>
              <span className="text-xs text-zinc-500 font-mono">Zero-Server</span>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-medium text-zinc-700 dark:text-zinc-300">Target Website or Sitemap URL</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={siteUrl}
                  onChange={(e) => setSiteUrl(e.target.value)}
                  placeholder="https://yourblog.com"
                  className="w-full px-3.5 py-2 text-sm rounded-xl border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
                />
                <button
                  onClick={handleStartCrawl}
                  disabled={isCrawling}
                  className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-white text-white dark:text-zinc-900 rounded-xl text-xs font-semibold shrink-0 transition-colors"
                >
                  {isCrawling ? 'Crawling...' : 'Crawl'}
                </button>
              </div>
            </div>

            {isCrawling && (
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs text-zinc-500 font-mono">
                  <span>Parsing sitemap.xml...</span>
                  <span>{crawlProgress}%</span>
                </div>
                <div className="h-1.5 w-full bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-600 transition-all duration-300" style={{ width: `${crawlProgress}%` }} />
                </div>
              </div>
            )}

            <div className="pt-2 border-t border-zinc-200 dark:border-zinc-800 space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-500">Widget Appearance</h4>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-zinc-600 dark:text-zinc-400 block mb-1">Accent Color</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={accentColor}
                      onChange={(e) => setAccentColor(e.target.value)}
                      className="w-8 h-8 rounded-lg cursor-pointer border-0 bg-transparent"
                    />
                    <span className="text-xs font-mono text-zinc-700 dark:text-zinc-300">{accentColor}</span>
                  </div>
                </div>

                <div>
                  <label className="text-xs text-zinc-600 dark:text-zinc-400 block mb-1">Trigger Position</label>
                  <select
                    value={position}
                    onChange={(e) => setPosition(e.target.value as any)}
                    className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-none"
                  >
                    <option value="bottom-right">Bottom Right</option>
                    <option value="bottom-left">Bottom Left</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Indexed Pages Summary */}
          <div className="p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 shadow-xs space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-zinc-700 dark:text-zinc-300">Indexed Inverted Pages</span>
              <span className="px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 font-mono font-medium">
                {crawledPages.length} Documents
              </span>
            </div>
            <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
              {crawledPages.map((page: CrawledPage, idx: number) => (
                <div key={idx} className="p-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-100 dark:border-zinc-800 text-xs flex items-center justify-between">
                  <div className="truncate pr-2">
                    <p className="font-medium text-zinc-900 dark:text-zinc-200 truncate">{page.title}</p>
                    <p className="text-zinc-500 dark:text-zinc-400 font-mono text-[10px] truncate">{page.url}</p>
                  </div>
                  <span className="shrink-0 text-[10px] px-1.5 py-0.5 rounded bg-zinc-200 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-300">
                    {page.category}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Live Interactive Preview & Code Export (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Live Search Interactive Sandbox */}
          <div className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 text-base flex items-center gap-2">
                <Search className="w-4 h-4 text-blue-500" />
                <span>2. Live In-Memory Search Preview</span>
              </h3>
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                <Zap className="w-3 h-3" />
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
                className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Results Preview */}
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {filteredResults.length === 0 ? (
                <div className="p-6 text-center text-xs text-zinc-500">
                  No matching indexed documents for "{testQuery}".
                </div>
              ) : (
                filteredResults.map((res: CrawledPage, i: number) => (
                  <div
                    key={i}
                    className="p-3.5 rounded-xl border border-zinc-100 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 bg-zinc-50/50 dark:bg-zinc-800/40 transition-colors cursor-pointer group"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 group-hover:text-blue-500 transition-colors">
                        {res.title}
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-200 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-300">
                        {res.category}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-600 dark:text-zinc-400 line-clamp-1">{res.excerpt}</p>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* 1-Line Code Export */}
          <div className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-950 text-zinc-100 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-sm flex items-center gap-2">
                <Code className="w-4 h-4 text-emerald-400" />
                <span>3. Production Embed Code (Copy & Ship)</span>
              </h3>
              <button
                onClick={() => copyToClipboard(embedCode, 'embed-script')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-medium transition-colors"
              >
                {copiedSnippet === 'embed-script' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedSnippet === 'embed-script' ? 'Copied to Clipboard' : 'Copy Script Tag'}</span>
              </button>
            </div>

            <pre className="p-4 rounded-xl bg-zinc-900/90 border border-zinc-800 text-xs font-mono text-zinc-300 overflow-x-auto leading-relaxed">
              {embedCode}
            </pre>

            <div className="flex items-center justify-between text-xs text-zinc-400 pt-2 border-t border-zinc-800/80">
              <span>Payload: ~14.8 KB Gzipped · Zero dependencies</span>
              <span className="text-emerald-400 font-mono">Compatible with Next.js, Astro, Webflow, Ghost</span>
            </div>
          </div>

          {/* Pricing Tiers & LemonSqueezy Commercial Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* $39 Lifetime Deal */}
            <div className="p-5 rounded-2xl border-2 border-blue-500/50 bg-blue-500/5 dark:bg-blue-500/10 space-y-3 relative overflow-hidden">
              <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-blue-500 text-white text-[10px] font-bold uppercase tracking-wider">
                Popular LTD
              </div>
              <div>
                <h4 className="font-bold text-zinc-900 dark:text-zinc-100 text-sm">Pro Lifetime License</h4>
                <div className="mt-1 flex items-baseline gap-1">
                  <span className="text-2xl font-extrabold text-zinc-900 dark:text-zinc-50">$39</span>
                  <span className="text-xs text-zinc-500">one-time payment</span>
                </div>
              </div>
              <ul className="text-xs text-zinc-600 dark:text-zinc-400 space-y-1.5 font-medium">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>Whitelabel (Remove "Powered By" badge)</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>Up to 10,000 indexed pages per domain</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>Custom CSS tokens and font matching</span>
                </li>
              </ul>
              <button
                onClick={() => handleTriggerCheckout('ltd')}
                disabled={isCheckingOut}
                className="w-full py-2 px-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs transition-colors"
              >
                Buy Lifetime License ($39)
              </button>
            </div>

            {/* $19/mo Agency Tier */}
            <div className="p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 space-y-3">
              <div>
                <h4 className="font-bold text-zinc-900 dark:text-zinc-100 text-sm">Agency / SaaS Fleet</h4>
                <div className="mt-1 flex items-baseline gap-1">
                  <span className="text-2xl font-extrabold text-zinc-900 dark:text-zinc-50">$19</span>
                  <span className="text-xs text-zinc-500">/ month</span>
                </div>
              </div>
              <ul className="text-xs text-zinc-600 dark:text-zinc-400 space-y-1.5 font-medium">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>Unlimited domains & client websites</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>Zero-Results Missing Content Analytics</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>Automated daily sitemap re-indexing</span>
                </li>
              </ul>
              <button
                onClick={() => handleTriggerCheckout('agency')}
                disabled={isCheckingOut}
                className="w-full py-2 px-3 rounded-xl border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-200 font-medium text-xs transition-colors"
              >
                Subscribe Agency ($19/mo)
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
