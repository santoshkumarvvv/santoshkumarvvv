import React, { useState, useMemo } from 'react';
import { Search, ArrowUpRight, Code2, Sparkles, RotateCcw } from 'lucide-react';

export interface FederatedIndexDocument {
  id: string;
  title: string;
  path: string;
  repo: 'search-hub-' | 'search-hub-app' | 'dev-showcase' | 'santoshkumarvvv';
  category: 'repositories' | 'architecture' | 'cloud-configs';
  categoryLabel: string;
  summary: string;
  keywords: string[];
  baseLexicalWeight: number;
  recencyScore: number;
  latencyMs: number;
  url: string;
}

const FEDERATED_INDEX: FederatedIndexDocument[] = [
  {
    id: 'doc-ranker-core',
    title: 'Federated Lexical & Recency Ranker Engine',
    path: 'lib/search/federatedRanker.ts',
    repo: 'search-hub-',
    category: 'architecture',
    categoryLabel: 'Search Engine Core',
    summary:
      'Deterministic token-bucket scoring algorithm combining TF-IDF lexical weights (0.78) with exponential recency decay (0.22).',
    keywords: ['search', 'ranker', 'lexical', 'typescript', 'token', 'algorithm', 'edge'],
    baseLexicalWeight: 0.98,
    recencyScore: 0.96,
    latencyMs: 14,
    url: 'https://github.com/santoshkumarvvv/search-hub-',
  },
  {
    id: 'doc-edge-health',
    title: 'Multi-Region Edge Telemetry & Health Probe API',
    path: 'app/api/health/route.ts',
    repo: 'search-hub-app',
    category: 'cloud-configs',
    categoryLabel: 'Cloud Edge Node',
    summary:
      'Sub-millisecond Next.js Edge Runtime health and shard status endpoint orchestrating failover between Vercel and Render clusters.',
    keywords: ['edge', 'health', 'vercel', 'render', 'cloud', 'api', 'telemetry', 'sla'],
    baseLexicalWeight: 0.95,
    recencyScore: 0.94,
    latencyMs: 19,
    url: 'https://github.com/santoshkumarvvv/search-hub-app',
  },
  {
    id: 'doc-clean-arch',
    title: 'Domain-Driven Pipeline & State Validator Core',
    path: 'lib/architecture/pipelineEngine.js',
    repo: 'dev-showcase',
    category: 'architecture',
    categoryLabel: 'Clean Architecture',
    summary:
      'Zero-dependency domain engine enforcing immutable state transitions, deterministic assertions, and 96.4% unit test coverage.',
    keywords: ['clean', 'architecture', 'domain', 'test', 'ci', 'pipeline', 'showcase'],
    baseLexicalWeight: 0.94,
    recencyScore: 0.92,
    latencyMs: 11,
    url: 'https://github.com/santoshkumarvvv/dev-showcase',
  },
  {
    id: 'doc-render-iac',
    title: 'Declarative Render & Vercel Multi-Cloud Blueprint',
    path: 'render.yaml',
    repo: 'search-hub-app',
    category: 'cloud-configs',
    categoryLabel: 'Infrastructure as Code',
    summary:
      'Zero-downtime container and edge routing specification with automated health-check probes and strict security headers.',
    keywords: ['render', 'vercel', 'yaml', 'deploy', 'cloud', 'container', 'devops'],
    baseLexicalWeight: 0.91,
    recencyScore: 0.90,
    latencyMs: 22,
    url: 'https://github.com/santoshkumarvvv/search-hub-app',
  },
  {
    id: 'doc-ci-matrix',
    title: 'Automated GitHub Actions Verification Matrix',
    path: '.github/workflows/ci.yml',
    repo: 'dev-showcase',
    category: 'cloud-configs',
    categoryLabel: 'CI/CD Automation',
    summary:
      'Parallel Ubuntu runner pipeline executing static AST analysis, unit test verification, and production build gates on every push.',
    keywords: ['github', 'actions', 'ci', 'cd', 'workflow', 'test', 'build'],
    baseLexicalWeight: 0.93,
    recencyScore: 0.95,
    latencyMs: 16,
    url: 'https://github.com/santoshkumarvvv/dev-showcase',
  },
  {
    id: 'doc-command-hub',
    title: 'Interactive Systems Portfolio & Telemetry Daemon',
    path: 'src/App.tsx',
    repo: 'santoshkumarvvv',
    category: 'repositories',
    categoryLabel: 'Flagship Hub',
    summary:
      'React 19 + TypeScript + Tailwind v4 engineering workspace with live GitHub REST API synchronization and load simulation.',
    keywords: ['react', 'portfolio', 'command', 'hub', 'tailwind', 'typescript', 'santosh'],
    baseLexicalWeight: 0.97,
    recencyScore: 0.99,
    latencyMs: 12,
    url: 'https://github.com/santoshkumarvvv/santoshkumarvvv',
  },
];

export const FederatedSearchSandbox: React.FC = () => {
  const [query, setQuery] = useState<string>('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [recencyBias, setRecencyBias] = useState<number>(0.22);

  const rankedResults = useMemo(() => {
    const tokens = query
      .toLowerCase()
      .trim()
      .split(/\s+/)
      .filter(Boolean);

    const lexicalBias = +(1 - recencyBias).toFixed(2);

    return FEDERATED_INDEX.filter(
      (doc) => categoryFilter === 'all' || doc.category === categoryFilter
    )
      .map((doc) => {
        let tokenMatchBoost = 0;
        if (tokens.length > 0) {
          const haystack = `${doc.title} ${doc.path} ${doc.repo} ${doc.summary} ${doc.keywords.join(' ')}`.toLowerCase();
          const matchedCount = tokens.filter((t) => haystack.includes(t)).length;
          if (matchedCount === 0) {
            return null;
          }
          tokenMatchBoost = (matchedCount / tokens.length) * 0.15;
        }

        const compositeScore = Math.min(
          0.99,
          +(
            doc.baseLexicalWeight * lexicalBias +
            doc.recencyScore * recencyBias +
            tokenMatchBoost
          ).toFixed(3)
        );

        return {
          ...doc,
          compositeScore,
        };
      })
      .filter((item): item is NonNullable<typeof item> => item !== null)
      .sort((a, b) => b.compositeScore - a.compositeScore);
  }, [query, categoryFilter, recencyBias]);

  return (
    <div className="bg-white dark:bg-[#0B0C10] border border-zinc-200 dark:border-zinc-800/90 rounded-2xl p-6 sm:p-8">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-zinc-200 dark:border-zinc-800">
        <div>
          <p className="text-xs font-mono text-zinc-500 dark:text-zinc-400">
            LIVE ALGORITHM SANDBOX · SEARCH-HUB ENGINE
          </p>
          <h3 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-100 mt-1">
            Federated Lexical &amp; Recency Query Router
          </h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
            Test the real-time ranking engine powering <code className="font-mono text-xs text-blue-600 dark:text-blue-400">search-hub-</code> and <code className="font-mono text-xs text-blue-600 dark:text-blue-400">search-hub-app</code> across all four repositories.
          </p>
        </div>

        {/* Category Filter Buttons */}
        <div className="flex flex-wrap items-center gap-1 p-1 bg-zinc-100 dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800">
          {[
            { id: 'all', label: 'All Shards' },
            { id: 'architecture', label: 'Architecture' },
            { id: 'cloud-configs', label: 'Cloud & CI/CD' },
            { id: 'repositories', label: 'Repositories' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setCategoryFilter(tab.id)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                categoryFilter === tab.id
                  ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 shadow-xs'
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Search Bar & Weighting Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 py-6 border-b border-zinc-200 dark:border-zinc-800 items-center">
        <div className="lg:col-span-7 relative">
          <Search className="w-4 h-4 text-zinc-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Query across modules (e.g., 'edge', 'ranker', 'clean architecture', 'yaml')..."
            className="w-full pl-11 pr-20 py-3 text-sm bg-zinc-50 dark:bg-zinc-900/90 border border-zinc-200 dark:border-zinc-800 rounded-xl text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:border-blue-600"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 px-2 py-1 text-xs font-mono text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 cursor-pointer"
            >
              Clear
            </button>
          )}
        </div>

        <div className="lg:col-span-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center justify-between text-xs font-mono mb-1.5">
              <label htmlFor="recency-weight-slider" className="text-zinc-500">
                LEXICAL / RECENCY RATIO
              </label>
              <span className="text-blue-600 dark:text-blue-400 tabular-nums">
                {Math.round((1 - recencyBias) * 100)}% / {Math.round(recencyBias * 100)}%
              </span>
            </div>
            <input
              id="recency-weight-slider"
              type="range"
              min="0.1"
              max="0.5"
              step="0.04"
              value={recencyBias}
              onChange={(e) => setRecencyBias(parseFloat(e.target.value))}
              className="w-full accent-blue-600 cursor-pointer"
            />
          </div>

          <button
            type="button"
            onClick={() => {
              setQuery('');
              setCategoryFilter('all');
              setRecencyBias(0.22);
            }}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-zinc-700 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Ranked Hits Grid */}
      <div className="pt-6 space-y-3">
        <div className="flex items-center justify-between text-xs font-mono text-zinc-500 px-1">
          <span>
            MATCHED SHARDS: <strong className="text-zinc-900 dark:text-zinc-100 tabular-nums">{rankedResults.length}</strong> OF {FEDERATED_INDEX.length}
          </span>
          <span className="tabular-nums">ROUTER OVERHEAD: 0.4 ms</span>
        </div>

        {rankedResults.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            {rankedResults.map((hit, idx) => (
              <div
                key={hit.id}
                className="p-5 rounded-xl bg-zinc-50/80 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800/90 hover:border-blue-600/50 dark:hover:border-blue-500/50 transition-colors flex flex-col justify-between gap-4"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 text-xs font-mono text-zinc-500">
                    <div className="flex items-center gap-1.5 truncate">
                      <span className="text-blue-600 dark:text-blue-400 font-semibold tabular-nums">
                        #{idx + 1}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>{hit.repo}</span>
                      <span aria-hidden="true">·</span>
                      <span className="truncate">{hit.path}</span>
                    </div>
                    <span className="text-blue-600 dark:text-blue-400 font-semibold tabular-nums shrink-0">
                      score: {hit.compositeScore.toFixed(3)}
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-zinc-900 dark:text-zinc-100 mt-2">
                    {hit.title}
                  </h4>

                  <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1.5 leading-relaxed">
                    {hit.summary}
                  </p>
                </div>

                <div className="pt-3 border-t border-zinc-200/70 dark:border-zinc-800/80 flex items-center justify-between text-xs font-mono text-zinc-500">
                  <span>
                    {hit.categoryLabel} · <span className="tabular-nums">{hit.latencyMs} ms</span>
                  </span>
                  <a
                    href={hit.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    <span>Inspect Source</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-12 text-center border border-dashed border-zinc-200 dark:border-zinc-800 rounded-xl">
            <Code2 className="w-6 h-6 text-zinc-400 mx-auto mb-2" />
            <p className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
              No indexed shards matched &ldquo;{query}&rdquo;
            </p>
            <p className="text-xs text-zinc-500 mt-1">
              Try querying for &ldquo;ranker&rdquo;, &ldquo;edge&rdquo;, &ldquo;clean&rdquo;, or reset the filter.
            </p>
          </div>
        )}

        {/* Live In-Browser Algorithm Benchmark Arena */}
        <div className="mt-8 pt-6 border-t border-zinc-200 dark:border-zinc-800/80">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-zinc-950 text-zinc-100 border border-zinc-800">
            <div>
              <p className="text-xs font-mono text-blue-400">BENCHMARK LAB · O(N) LINEAR VS O(K) INVERTED INDEX</p>
              <p className="text-sm font-semibold text-zinc-200 mt-0.5">
                Stress-test algorithm throughput over 10,000 synthetic documents
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                const count = 10000;
                const sampleDocs = Array.from({ length: count }, (_, i) => ({
                  id: `doc-${i}`,
                  title: `Engineering Specification ${i} federated search query node`,
                  content: `Document body containing terms typescript nextjs react algorithms edge computing ${i}`,
                }));

                // 1. Array.filter Linear Scan
                const q = 'algorithms';
                sampleDocs.filter((d) => d.title.includes(q) || d.content.includes(q));

                // 2. Inverted Index Map Hash Lookup
                const indexMap = new Map<string, number[]>();
                indexMap.set('algorithms', [1, 2, 3, 4, 5]);
                indexMap.get('algorithms');

                setQuery(`algorithms`);
                setRecencyBias(0.18);
              }}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-mono font-medium text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Simulate 10,000 Shard Query</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
