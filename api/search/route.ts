/**
 * Serverless BM25 Search Endpoint — Ready for Vercel Deployment
 * Drop into `api/search/route.ts` or `app/api/search/route.ts` in your Vercel project.
 *
 * Features:
 * - Accepts HTTP GET with query parameter `q`
 * - In-memory Okapi BM25 lexical scoring (k1 = 1.2, b = 0.75) with Robertson-Spärck Jones IDF
 * - Hardcoded mini index of 10 real documentation & architecture records (title, url, snippet, score)
 * - Rate limiting: 10 requests per minute per IP using an in-memory Map with timestamps
 * - Strict CORS headers allowing https://santoshkumarvvv.github.io
 */

export interface SearchDocument {
  id: string;
  title: string;
  url: string;
  snippet: string;
  score: number;
  keywords: string;
}

// Hardcoded mini index of 10 real engineering & documentation records
const MINI_INDEX: SearchDocument[] = [
  {
    id: 'doc-1',
    title: 'SearchHub Federated BM25 Search Engine',
    url: 'https://search-hub-pearl.vercel.app/',
    snippet: 'Universal developer search hub with low-latency in-memory BM25 lexical search and Damerau-Levenshtein typo tolerance.',
    score: 1.0,
    keywords: 'searchhub federated bm25 search engine typescript nextjs inverted index lexical ranking typo tolerance'
  },
  {
    id: 'doc-2',
    title: 'SearchEmbed Standalone 1-Line Search Widget',
    url: 'https://santoshkumarvvv.github.io/#architecture',
    snippet: '14.8KB zero-dependency vanilla JavaScript search modal widget replacing heavy Algolia and Elasticsearch setups.',
    score: 1.0,
    keywords: 'searchembed widget embed.js modal vanilla javascript algolia elasticsearch replacement client-side search'
  },
  {
    id: 'doc-3',
    title: 'Okapi BM25 Probabilistic Ranking Specification',
    url: 'https://github.com/santoshkumarvvv/search-hub-',
    snippet: 'Robertson-Spärck Jones inverse document frequency (IDF) and term frequency saturation implementation in TypeScript.',
    score: 1.0,
    keywords: 'okapi bm25 idf inverse document frequency term saturation k1 b parameters document length normalization'
  },
  {
    id: 'doc-4',
    title: 'Dev Showcase — 120fps Native Flutter Architecture',
    url: 'https://github.com/santoshkumarvvv/dev-showcase',
    snippet: 'Production Flutter mobile engine built with Domain-Driven Design (DDD), Clean Architecture, and Riverpod state.',
    score: 1.0,
    keywords: 'dev-showcase flutter dart mobile 120fps clean architecture domain driven design ddd riverpod android ios'
  },
  {
    id: 'doc-5',
    title: 'SearchHub Mobile Companion App (SQLite & Offline)',
    url: 'https://github.com/santoshkumarvvv/search-hub-app',
    snippet: 'Cross-platform native mobile client featuring local SQLite inverted index caching and offline instant autocomplete.',
    score: 1.0,
    keywords: 'search-hub-app mobile flutter sqlite offline cache local inverted index autocomplete client'
  },
  {
    id: 'doc-6',
    title: 'Scrypt KDF Memory-Hard Cryptographic Gateway',
    url: 'https://santoshkumarvvv.github.io/#works',
    snippet: 'Sequential memory-hard key derivation function safeguarding API keys and credentials against GPU and ASIC brute-force attacks.',
    score: 1.0,
    keywords: 'scrypt kdf cryptography security authentication api key hashing memory-hard salt brute force protection'
  },
  {
    id: 'doc-7',
    title: 'Santosh Kumar — Systems Engineering Command Hub',
    url: 'https://santoshkumarvvv.github.io/',
    snippet: 'Interactive systems architecture portfolio, live GitHub repository telemetry, and BM25 query sandbox.',
    score: 1.0,
    keywords: 'santosh kumar santoshkumarvvv portfolio systems architect react 19 vite tailwind css github pages'
  },
  {
    id: 'doc-8',
    title: 'Automated CI/CD & CodeQL Security Matrix',
    url: 'https://github.com/santoshkumarvvv/santoshkumarvvv',
    snippet: 'Deterministic GitHub Actions pipelines running multi-version Node test matrices and zero-alert CodeQL static analysis.',
    score: 1.0,
    keywords: 'ci cd github actions codeql security static analysis automated testing node matrix deployment'
  },
  {
    id: 'doc-9',
    title: 'Progressive Web App (PWA) Offline Service Worker',
    url: 'https://santoshkumarvvv.github.io/sw.js',
    snippet: 'Versioned v2 service worker providing network-first HTML navigation and cache-first static asset delivery.',
    score: 1.0,
    keywords: 'pwa service worker sw.js offline cache v2 manifest apple-touch-icon web app performance'
  },
  {
    id: 'doc-10',
    title: 'Direct Engineering Inquiries & Architecture Consulting',
    url: 'https://santoshkumarvvv.github.io/#contact',
    snippet: 'Connect with Santosh Kumar for distributed search systems, custom BM25 engines, and high-frame-rate Flutter apps.',
    score: 1.0,
    keywords: 'contact email consulting hire systems engineerkumasantosh947@gmail.com web3forms inquiry'
  }
];

// Rate Limiting Store: Map<ip, timestamp[]>
const rateLimitMap = new Map<string, number[]>();
const WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS = 10;     // 10 requests per minute per IP

function isRateLimited(ip: string): { limited: boolean; remaining: number; resetSeconds: number } {
  const now = Date.now();
  const windowStart = now - WINDOW_MS;

  const existingTimestamps = rateLimitMap.get(ip) || [];
  const activeTimestamps = existingTimestamps.filter((ts) => ts > windowStart);

  if (activeTimestamps.length >= MAX_REQUESTS) {
    const oldest = activeTimestamps[0] || now;
    const resetSeconds = Math.max(1, Math.ceil((oldest + WINDOW_MS - now) / 1000));
    rateLimitMap.set(ip, activeTimestamps);
    return { limited: true, remaining: 0, resetSeconds };
  }

  activeTimestamps.push(now);
  rateLimitMap.set(ip, activeTimestamps);

  return {
    limited: false,
    remaining: Math.max(0, MAX_REQUESTS - activeTimestamps.length),
    resetSeconds: 60
  };
}

// Tokenize text into normalized lowercase terms
function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, ' ')
    .split(/\s+/)
    .filter((token) => token.length > 1);
}

// Compute in-memory Okapi BM25 scores across the 10-document mini index
function runBM25Search(query: string): Array<{ title: string; url: string; snippet: string; score: number }> {
  const queryTokens = tokenize(query);
  if (queryTokens.length === 0) {
    return MINI_INDEX.map(({ title, url, snippet, score }) => ({ title, url, snippet, score }));
  }

  const k1 = 1.2;
  const b = 0.75;
  const N = MINI_INDEX.length;

  // Precompute document token lists and average document length
  const docTokensList = MINI_INDEX.map((doc) =>
    tokenize(`${doc.title} ${doc.snippet} ${doc.keywords}`)
  );
  const totalTokens = docTokensList.reduce((acc, tokens) => acc + tokens.length, 0);
  const avgdl = totalTokens / N;

  const scoredResults: Array<{ title: string; url: string; snippet: string; score: number }> = [];

  for (let i = 0; i < N; i++) {
    const doc = MINI_INDEX[i];
    const docTokens = docTokensList[i];
    const dl = docTokens.length;
    let totalScore = 0;

    for (const qToken of queryTokens) {
      // Count how many documents contain qToken (or prefix match)
      let df = 0;
      for (const tokens of docTokensList) {
        if (tokens.some((t) => t === qToken || t.includes(qToken))) {
          df += 1;
        }
      }

      if (df === 0) continue;

      // Term frequency in current document
      let tf = 0;
      for (const t of docTokens) {
        if (t === qToken) {
          tf += 1.0;
        } else if (t.includes(qToken)) {
          tf += 0.5;
        }
      }

      if (tf === 0) continue;

      // Boost title matches
      if (doc.title.toLowerCase().includes(qToken)) {
        tf += 1.5;
      }

      // Robertson-Spärck Jones IDF
      const idf = Math.log(1 + (N - df + 0.5) / (df + 0.5));
      const numerator = tf * (k1 + 1);
      const denominator = tf + k1 * (1 - b + b * (dl / avgdl));

      totalScore += idf * (numerator / denominator);
    }

    if (totalScore > 0) {
      scoredResults.push({
        title: doc.title,
        url: doc.url,
        snippet: doc.snippet,
        score: Number(totalScore.toFixed(4))
      });
    }
  }

  return scoredResults.sort((a, b) => b.score - a.score);
}

const CORS_HEADERS: Record<string, string> = {
  'Access-Control-Allow-Origin': 'https://santoshkumarvvv.github.io',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Content-Type': 'application/json; charset=utf-8'
};

export async function OPTIONS(): Promise<Response> {
  return new Response(null, {
    status: 204,
    headers: CORS_HEADERS
  });
}

export async function GET(request: Request): Promise<Response> {
  // Determine client IP from standard proxy headers
  const forwardedFor = request.headers.get('x-forwarded-for');
  const clientIp = forwardedFor
    ? forwardedFor.split(',')[0].trim()
    : request.headers.get('x-real-ip') || '127.0.0.1';

  const rateStatus = isRateLimited(clientIp);
  const responseHeaders: Record<string, string> = {
    ...CORS_HEADERS,
    'X-RateLimit-Limit': String(MAX_REQUESTS),
    'X-RateLimit-Remaining': String(rateStatus.remaining),
    'X-RateLimit-Reset': String(rateStatus.resetSeconds)
  };

  if (rateStatus.limited) {
    return new Response(
      JSON.stringify({
        error: 'Too Many Requests',
        message: 'Rate limit of 10 requests per minute exceeded.',
        retryAfterSeconds: rateStatus.resetSeconds
      }),
      {
        status: 429,
        headers: {
          ...responseHeaders,
          'Retry-After': String(rateStatus.resetSeconds)
        }
      }
    );
  }

  const url = new URL(request.url);
  const q = (url.searchParams.get('q') || '').trim();
  const results = runBM25Search(q);

  return new Response(
    JSON.stringify({
      query: q,
      count: results.length,
      results
    }),
    {
      status: 200,
      headers: responseHeaders
    }
  );
}
