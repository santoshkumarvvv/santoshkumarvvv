import React from 'react';

export const HeroArchitectureVisual: React.FC = () => {
  return (
    <div className="relative w-full h-full min-h-[380px] bg-zinc-950 border border-zinc-800 rounded-2xl overflow-hidden flex flex-col justify-between p-6 sm:p-8 text-zinc-100">
      {/* Top schematic header */}
      <div className="relative z-10 flex items-center justify-between border-b border-zinc-800 pb-4">
        <div>
          <p className="text-xs font-mono text-zinc-400">
            SYSTEM TOPOLOGY · SANTOSH KUMAR (@santoshkumarvvv)
          </p>
          <p className="text-sm font-medium text-zinc-100 mt-0.5">
            Federated App &amp; Edge Pipeline Architecture
          </p>
        </div>
        <span className="text-xs font-mono text-[#EF9F27] tabular-nums">REV 2026.10</span>
      </div>

      {/* Central Node Schematic SVG */}
      <div className="relative z-10 my-6 flex items-center justify-center">
        <svg
          viewBox="0 0 600 260"
          className="w-full max-w-[560px] h-auto"
          role="img"
          aria-label="System architecture diagram connecting Client UI, Search Hub Engine, and Automated CI/CD Runners"
        >
          {/* Connection lines */}
          <path
            d="M 150 75 L 285 75 L 285 130 L 420 130"
            fill="none"
            stroke="#EF9F27"
            strokeWidth="1.75"
            strokeDasharray="4 4"
          />
          <path
            d="M 150 185 L 285 185 L 285 130 L 420 130"
            fill="none"
            stroke="#71717A"
            strokeWidth="1.5"
          />
          <path
            d="M 310 130 L 430 65"
            fill="none"
            stroke="#EF9F27"
            strokeWidth="1.5"
            opacity="0.7"
          />
          <path
            d="M 310 130 L 430 195"
            fill="none"
            stroke="#71717A"
            strokeWidth="1.5"
            opacity="0.7"
          />

          {/* Left Column Nodes: Client & Mobile Interfaces */}
          <g transform="translate(20, 35)">
            <rect
              width="145"
              height="76"
              rx="10"
              fill="#09090B"
              stroke="#27272A"
              strokeWidth="1.5"
            />
            <text x="16" y="26" fill="#A1A1AA" fontSize="10" fontFamily="JetBrains Mono, monospace">
              01 · CLIENT LAYER
            </text>
            <text x="16" y="46" fill="#F4F4F5" fontSize="13" fontWeight="600">
              React 19 + Next.js
            </text>
            <text x="16" y="63" fill="#EF9F27" fontSize="10" fontFamily="JetBrains Mono, monospace">
              Edge SSR · 38ms P95
            </text>
          </g>

          <g transform="translate(20, 145)">
            <rect
              width="145"
              height="76"
              rx="10"
              fill="#09090B"
              stroke="#27272A"
              strokeWidth="1.5"
            />
            <text x="16" y="26" fill="#A1A1AA" fontSize="10" fontFamily="JetBrains Mono, monospace">
              02 · NATIVE CLIENT
            </text>
            <text x="16" y="46" fill="#F4F4F5" fontSize="13" fontWeight="600">
              Dart &amp; Flutter Engine
            </text>
            <text x="16" y="63" fill="#A1A1AA" fontSize="10" fontFamily="JetBrains Mono, monospace">
              60/120fps Skia/Impeller
            </text>
          </g>

          {/* Center Core Node: Search Hub & Core Router */}
          <g transform="translate(215, 82)">
            <rect
              width="165"
              height="96"
              rx="12"
              fill="#18181B"
              stroke="#EF9F27"
              strokeWidth="2"
            />
            <text x="18" y="28" fill="#EF9F27" fontSize="10" fontFamily="JetBrains Mono, monospace">
              CORE ORCHESTRATOR
            </text>
            <text x="18" y="50" fill="#FFFFFF" fontSize="14" fontWeight="700">
              Search Hub Engine
            </text>
            <text x="18" y="68" fill="#A1A1AA" fontSize="11">
              TypeScript Strict AST
            </text>
            <text x="18" y="84" fill="#EF9F27" fontSize="10" fontFamily="JetBrains Mono, monospace">
              125k+ Indexed Nodes
            </text>
          </g>

          {/* Right Column Nodes: Deployment & CI/CD */}
          <g transform="translate(425, 25)">
            <rect
              width="155"
              height="76"
              rx="10"
              fill="#09090B"
              stroke="#27272A"
              strokeWidth="1.5"
            />
            <text x="16" y="26" fill="#A1A1AA" fontSize="10" fontFamily="JetBrains Mono, monospace">
              03 · CI/CD PIPELINE
            </text>
            <text x="16" y="46" fill="#F4F4F5" fontSize="13" fontWeight="600">
              GitHub Actions
            </text>
            <text x="16" y="63" fill="#EF9F27" fontSize="10" fontFamily="JetBrains Mono, monospace">
              Automated Matrix
            </text>
          </g>

          <g transform="translate(425, 155)">
            <rect
              width="155"
              height="76"
              rx="10"
              fill="#09090B"
              stroke="#27272A"
              strokeWidth="1.5"
            />
            <text x="16" y="26" fill="#A1A1AA" fontSize="10" fontFamily="JetBrains Mono, monospace">
              04 · CLOUD RUNTIME
            </text>
            <text x="16" y="46" fill="#F4F4F5" fontSize="13" fontWeight="600">
              Vercel + Render
            </text>
            <text x="16" y="63" fill="#A1A1AA" fontSize="10" fontFamily="JetBrains Mono, monospace">
              99.98% Uptime SLA
            </text>
          </g>
        </svg>
      </div>

      {/* Bottom technical readout bar */}
      <div className="relative z-10 grid grid-cols-3 gap-4 pt-4 border-t border-zinc-800 text-xs font-mono">
        <div>
          <span className="text-zinc-500 block">PRIMARY STACK</span>
          <span className="text-zinc-200 mt-0.5 block">TypeScript · Dart · React</span>
        </div>
        <div>
          <span className="text-zinc-500 block">VERIFICATION</span>
          <span className="text-zinc-200 mt-0.5 block">Strict Types · Automated CI</span>
        </div>
        <div className="text-right">
          <span className="text-zinc-500 block">GITHUB HANDLE</span>
          <span className="text-[#EF9F27] mt-0.5 block">@santoshkumarvvv</span>
        </div>
      </div>
    </div>
  );
};

export const ProjectCardArtwork: React.FC<{ projectId: string }> = ({ projectId }) => {
  if (projectId === 'search-hub-engine') {
    return (
      <div className="w-full h-56 sm:h-64 bg-zinc-950 border-b border-zinc-800 p-6 flex flex-col justify-between relative overflow-hidden">
        <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
          <span>FEDERATED QUERY ROUTER</span>
          <span className="text-[#EF9F27] tabular-nums">38ms P95</span>
        </div>
        <div className="my-auto bg-zinc-900/90 border border-zinc-800 rounded-xl p-4">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-2.5 mb-3">
            <span className="text-xs font-mono text-zinc-300">
              query: &quot;edge ranker algorithm&quot;
            </span>
            <span className="text-[11px] font-mono text-zinc-500">⌘K</span>
          </div>
          <div className="space-y-2 font-mono text-xs">
            <div className="flex items-center justify-between text-zinc-200 bg-[#EF9F27]/10 border border-[#EF9F27]/40 rounded px-2.5 py-1.5">
              <span>01. lib/search-engine/federatedRanker.ts</span>
              <span className="text-[#EF9F27] tabular-nums">score: 0.98</span>
            </div>
            <div className="flex items-center justify-between text-zinc-400 px-2.5 py-1">
              <span>02. app/api/search/edge-index.ts</span>
              <span className="text-zinc-500 tabular-nums">score: 0.91</span>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between text-[11px] font-mono text-zinc-500">
          <span>INDEXED SHARDS: 12</span>
          <span>ZERO-BLOCKING STREAM</span>
        </div>
      </div>
    );
  }

  if (projectId === 'dev-showcase-architecture') {
    return (
      <div className="w-full h-56 sm:h-64 bg-zinc-950 border-b border-zinc-800 p-6 flex flex-col justify-between relative overflow-hidden">
        <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
          <span>CI/CD MATRIX VERIFICATION</span>
          <span className="text-[#EF9F27] tabular-nums">96.4% COV</span>
        </div>
        <div className="my-auto space-y-2.5 font-mono text-xs">
          <div className="flex items-center justify-between bg-zinc-900 border border-zinc-800 rounded-lg px-3.5 py-2 text-zinc-200">
            <span>01 · Static Type &amp; AST Audit</span>
            <span className="text-[#EF9F27] tabular-nums">11.2s · PASS</span>
          </div>
          <div className="flex items-center justify-between bg-zinc-900 border border-zinc-800 rounded-lg px-3.5 py-2 text-zinc-200">
            <span>02 · Unit &amp; Integration Matrix</span>
            <span className="text-[#EF9F27] tabular-nums">18.4s · PASS</span>
          </div>
          <div className="flex items-center justify-between bg-zinc-900 border border-zinc-800 rounded-lg px-3.5 py-2 text-zinc-200">
            <span>03 · Production Artifact Build</span>
            <span className="text-[#EF9F27] tabular-nums">12.4s · PASS</span>
          </div>
        </div>
        <div className="flex items-center justify-between text-[11px] font-mono text-zinc-500">
          <span>CLEAN ARCHITECTURE</span>
          <span>GITHUB ACTIONS</span>
        </div>
      </div>
    );
  }

  if (projectId === 'search-hub-cloud-cluster') {
    return (
      <div className="w-full h-56 sm:h-64 bg-zinc-950 border-b border-zinc-800 p-6 flex flex-col justify-between relative overflow-hidden">
        <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
          <span>MULTI-CLOUD INFRASTRUCTURE</span>
          <span className="text-[#EF9F27] tabular-nums">99.95% SLA</span>
        </div>
        <div className="my-auto grid grid-cols-2 gap-3 font-mono text-xs">
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-3.5">
            <span className="text-zinc-500 text-[10px] block">EDGE NETWORK</span>
            <span className="text-zinc-100 font-semibold mt-1 block">Vercel Edge</span>
            <span className="text-[#EF9F27] text-[11px] mt-2 block tabular-nums">
              Cold Start: 110ms
            </span>
          </div>
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-3.5">
            <span className="text-zinc-500 text-[10px] block">WORKER NODE</span>
            <span className="text-zinc-100 font-semibold mt-1 block">Render Cluster</span>
            <span className="text-zinc-300 text-[11px] mt-2 block tabular-nums">
              Payload: 68 kB
            </span>
          </div>
        </div>
        <div className="flex items-center justify-between text-[11px] font-mono text-zinc-500">
          <span>DECLARATIVE IAC</span>
          <span>RENDER.YAML + VERCEL.JSON</span>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-56 sm:h-64 bg-zinc-950 border-b border-zinc-800 p-6 flex flex-col justify-between relative overflow-hidden">
      <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
        <span>AUTONOMOUS TELEMETRY &amp; HUB</span>
        <span className="text-[#EF9F27] tabular-nums">60 FPS UI</span>
      </div>
      <div className="my-auto bg-zinc-900 border border-zinc-800 rounded-xl p-4 font-mono text-xs space-y-2">
        <div className="text-zinc-400">
          <span className="text-[#EF9F27]">cron(17 2 * * *)</span> → sync GitHub REST events
        </div>
        <div className="text-zinc-200 truncate">
          ✓ Updated README.md activity stream &amp; SVG architecture cards
        </div>
        <div className="text-zinc-400 truncate">
          ✓ Interactive React 19 + TypeScript command center compiled
        </div>
      </div>
      <div className="flex items-center justify-between text-[11px] font-mono text-zinc-500">
        <span>REACT 19 · TAILWIND V4</span>
        <span>SELF-UPDATING PROFILE</span>
      </div>
    </div>
  );
};

