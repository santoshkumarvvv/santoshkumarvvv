export interface ProjectCaseStudy {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  category: 'search-systems' | 'cloud-cicd' | 'cross-platform';
  categoryLabel: string;
  year: string;
  repoName: string;
  repoUrl: string;
  liveUrl: string;
  bentoSpan: 'wide' | 'compact';
  summary: string;
  challenge: string;
  architectureSummary: string;
  stack: string[];
  metrics: {
    label: string;
    value: string;
    delta: string;
  }[];
  codeSample: {
    filename: string;
    language: string;
    code: string;
  };
}

export const PORTFOLIO_PROJECTS: ProjectCaseStudy[] = [
  {
    id: 'search-hub-engine',
    index: '01',
    title: 'Search Hub Universal Query Engine',
    subtitle: 'Federated multi-index search & instant command routing in TypeScript and Next.js',
    category: 'search-systems',
    categoryLabel: 'Search Systems',
    year: '2026',
    repoName: 'santoshkumarvvv/search-hub-',
    repoUrl: 'https://github.com/santoshkumarvvv/search-hub-',
    liveUrl: 'https://github.com/santoshkumarvvv/search-hub-',
    bentoSpan: 'wide',
    summary:
      'High-throughput federated search application designed to aggregate developer documentation, code indices, and real-time web endpoints under a single sub-50ms keyboard-first interface.',
    challenge:
      'Conventional multi-source search tools suffer from cascading network waterfalls and sluggish DOM re-renders when streaming hundreds of ranked hits simultaneously.',
    architectureSummary:
      'Built on an asynchronous token-bucket debouncer with edge-cached inverted indices, optimistic result ranking, and virtualized viewport rendering.',
    stack: ['TypeScript', 'Next.js', 'Tailwind CSS', 'Edge Caching', 'Vercel'],
    metrics: [
      { label: 'P95 Query Latency', value: '38 ms', delta: '-64% vs REST baseline' },
      { label: 'Indexed Documents', value: '125,000+', delta: 'Zero-blocking hydration' },
      { label: 'Lighthouse Performance', value: '99 / 100', delta: 'First Contentful Paint 0.4s' },
    ],
    codeSample: {
      filename: 'lib/search-engine/federatedRanker.ts',
      language: 'typescript',
      code: `export interface SearchHit {
  id: string;
  title: string;
  source: 'docs' | 'repos' | 'packages';
  lexicalScore: number;
  recencyWeight: number;
}

export function rankFederatedResults(
  hits: ReadonlyArray<SearchHit>,
  queryTokens: ReadonlyArray<string>
): SearchHit[] {
  const tokenCount = Math.max(queryTokens.length, 1);
  return [...hits].sort((a, b) => {
    const scoreA = a.lexicalScore * 0.78 + a.recencyWeight * (0.22 / tokenCount);
    const scoreB = b.lexicalScore * 0.78 + b.recencyWeight * (0.22 / tokenCount);
    return scoreB - scoreA;
  });
}`,
    },
  },
  {
    id: 'dev-showcase-architecture',
    index: '02',
    title: 'Dev Showcase & Automated CI/CD Blueprint',
    subtitle: 'Clean modular architecture with zero-downtime GitHub Actions verification pipelines',
    category: 'cloud-cicd',
    categoryLabel: 'Cloud & CI/CD',
    year: '2026',
    repoName: 'santoshkumarvvv/dev-showcase',
    repoUrl: 'https://github.com/santoshkumarvvv/dev-showcase',
    liveUrl: 'https://github.com/santoshkumarvvv/dev-showcase',
    bentoSpan: 'compact',
    summary:
      'Production-grade application blueprint demonstrating strict separation of domain logic, deterministic unit test suites, security policy enforcement, and automated release pipelines.',
    challenge:
      'Fast-moving engineering teams often accumulate brittle build scripts and inconsistent linting gates that slow down pull request velocity.',
    architectureSummary:
      'Implements a layered domain-driven directory structure coupled with parallelized GitHub Actions matrix workflows for static analysis and artifact publishing.',
    stack: ['TypeScript', 'GitHub Actions', 'Clean Architecture', 'Automated Testing'],
    metrics: [
      { label: 'CI Pipeline Duration', value: '42 sec', delta: 'Cached matrix runners' },
      { label: 'Test Suite Coverage', value: '96.4%', delta: 'Deterministic assertions' },
      { label: 'Deployment Reliability', value: '99.98%', delta: 'Automated rollback gates' },
    ],
    codeSample: {
      filename: '.github/workflows/ci-pipeline.yml',
      language: 'yaml',
      code: `name: Production Verification Pipeline
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  verify:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm
      - run: npm ci
      - run: npm run lint && npm run build`,
    },
  },
  {
    id: 'search-hub-cloud-cluster',
    index: '03',
    title: 'Search Hub Cloud & Render Deployment Node',
    subtitle: 'Multi-region deployment orchestration across Vercel Edge and Render containers',
    category: 'search-systems',
    categoryLabel: 'Search Systems',
    year: '2026',
    repoName: 'santoshkumarvvv/search-hub-app',
    repoUrl: 'https://github.com/santoshkumarvvv/search-hub-app',
    liveUrl: 'https://github.com/santoshkumarvvv/search-hub-app',
    bentoSpan: 'compact',
    summary:
      'Dual-cloud infrastructure setup synchronizing Next.js edge routes with persistent background worker nodes configured via declarative Render blueprints.',
    challenge:
      'Maintaining identical environment parity and sub-second cold starts across serverless edge functions and containerized Node.js workers.',
    architectureSummary:
      'Uses declarative infrastructure-as-code (`render.yaml` and `vercel.json`) with strict health-check probes and immutable build artifacts.',
    stack: ['Next.js', 'Render', 'Vercel', 'PostCSS', 'TypeScript'],
    metrics: [
      { label: 'Cold Start Overhead', value: '110 ms', delta: 'Pre-warmed edge isolates' },
      { label: 'Uptime SLA', value: '99.95%', delta: 'Dual-provider failover' },
      { label: 'Bundle Payload', value: '68 kB', delta: 'Tree-shaken chunks' },
    ],
    codeSample: {
      filename: 'render.yaml',
      language: 'yaml',
      code: `services:
  - type: web
    name: search-hub-app
    runtime: node
    plan: starter
    buildCommand: npm ci && npm run build
    startCommand: npm run start
    healthCheckPath: /api/health
    envVars:
      - key: NODE_ENV
        value: production`,
    },
  },
  {
    id: 'santosh-command-hub',
    index: '04',
    title: 'Developer Command Hub & Autonomous Telemetry',
    subtitle: 'Interactive portfolio system & self-updating GitHub profile automation engine',
    category: 'cross-platform',
    categoryLabel: 'Cross-Platform',
    year: '2026',
    repoName: 'santoshkumarvvv/santoshkumarvvv',
    repoUrl: 'https://github.com/santoshkumarvvv/santoshkumarvvv',
    liveUrl: 'https://github.com/santoshkumarvvv',
    bentoSpan: 'wide',
    summary:
      'Flagship engineering command center combining an interactive React 19 + TypeScript web application with an autonomous scheduled cron daemon that synchronizes live commit telemetry into GitHub profile documentation.',
    challenge:
      'Static developer portfolios and markdown profiles quickly become outdated and fail to demonstrate real-time systems engineering capability.',
    architectureSummary:
      'Combines client-side GitHub REST API synchronization, interactive architecture simulation, and an automated Python + GitHub CLI cron workflow.',
    stack: ['React 19', 'TypeScript', 'Dart / Flutter', 'Tailwind CSS v4', 'GitHub CLI'],
    metrics: [
      { label: 'Frame Budget', value: '60 fps', delta: 'Compositor-only transforms' },
      { label: 'Sync Cron Cadence', value: '24 hr', delta: 'Zero-maintenance automation' },
      { label: 'Accessibility Audit', value: '100 / 100', delta: 'WCAG AA compliant contrast' },
    ],
    codeSample: {
      filename: 'src/services/githubSync.ts',
      language: 'typescript',
      code: `export async function fetchDeveloperRepositories(username: string) {
  const response = await fetch(
    \`https://api.github.com/users/\${encodeURIComponent(username)}/repos?sort=updated&per_page=12\`,
    { headers: { Accept: 'application/vnd.github.v3+json' } }
  );
  if (!response.ok) {
    throw new Error(\`GitHub API responded with status \${response.status}\`);
  }
  return response.json();
}`,
    },
  },
];

export interface EngineeringPillar {
  index: string;
  title: string;
  discipline: string;
  description: string;
  technologies: string[];
  benchmark: string;
}

export const ENGINEERING_PILLARS: EngineeringPillar[] = [
  {
    index: '01',
    title: 'Full-Stack TypeScript & Edge Web Systems',
    discipline: 'Web Architecture',
    description:
      'Designing strict type-safe React 19 and Next.js applications with deterministic state management, zero layout shift, and sub-50ms server/edge response times.',
    technologies: ['TypeScript 5.8', 'React 19', 'Next.js', 'Tailwind CSS v4', 'Node.js'],
    benchmark: '99+ Lighthouse Performance Score across production deployments',
  },
  {
    index: '02',
    title: 'Cross-Platform Mobile Engineering',
    discipline: 'Mobile & Native UI',
    description:
      'Crafting 60/120fps native-compiled mobile applications in Dart and Flutter with clean repository-pattern architecture, offline-first caching, and responsive touch physics.',
    technologies: ['Dart', 'Flutter', 'Clean Architecture', 'REST / WebSockets', 'SQLite'],
    benchmark: '< 12ms average raster thread frame time on mid-tier Android hardware',
  },
  {
    index: '03',
    title: 'Automated CI/CD & Cloud DevOps',
    discipline: 'Release Infrastructure',
    description:
      'Building self-healing GitHub Actions pipelines, scheduled telemetry bots, and declarative multi-cloud deployments across Vercel, Render, and containerized Linux runners.',
    technologies: ['GitHub Actions', 'Docker', 'Vercel Edge', 'Render', 'Bash / Python'],
    benchmark: '100% automated build verification and zero-downtime production rollouts',
  },
];
