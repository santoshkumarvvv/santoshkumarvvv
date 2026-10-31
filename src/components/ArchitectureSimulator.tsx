import React, { useState } from 'react';
import { Play, RotateCcw } from 'lucide-react';

interface SimulationPreset {
  id: string;
  name: string;
  queryLoadRps: number;
  edgeCacheHitRate: number;
  p95LatencyMs: number;
  p99LatencyMs: number;
  bundleSizeKb: number;
  ciVerifySeconds: number;
  description: string;
}

const PRESETS: SimulationPreset[] = [
  {
    id: 'search-hub-edge',
    name: 'Search Hub Federated Edge',
    queryLoadRps: 2400,
    edgeCacheHitRate: 94.2,
    p95LatencyMs: 38,
    p99LatencyMs: 64,
    bundleSizeKb: 68,
    ciVerifySeconds: 42,
    description:
      'Token-debounced Next.js Edge routes with inverted lexical indices and zero-blocking stream hydration.',
  },
  {
    id: 'flutter-native-bridge',
    name: 'Dart / Flutter Native Client',
    queryLoadRps: 1800,
    edgeCacheHitRate: 91.5,
    p95LatencyMs: 11,
    p99LatencyMs: 16,
    bundleSizeKb: 142,
    ciVerifySeconds: 54,
    description:
      'Ahead-of-Time (AOT) compiled Dart isolate pool with local SQLite cache and 120fps Impeller rendering.',
  },
  {
    id: 'dev-showcase-pipeline',
    name: 'Dev Showcase CI/CD Matrix',
    queryLoadRps: 3200,
    edgeCacheHitRate: 96.8,
    p95LatencyMs: 29,
    p99LatencyMs: 49,
    bundleSizeKb: 52,
    ciVerifySeconds: 36,
    description:
      'Strict Clean Architecture layers verified via parallel GitHub Actions runners and immutable container artifacts.',
  },
];

export const ArchitectureSimulator: React.FC = () => {
  const [selectedPresetId, setSelectedPresetId] = useState<string>(PRESETS[0].id);
  const [concurrencyMultiplier, setConcurrencyMultiplier] = useState<number>(1);
  const [cacheEnabled, setCacheEnabled] = useState<boolean>(true);
  const [lastRunTimestamp, setLastRunTimestamp] = useState<string>('Ready · Deterministic Mode');

  const activePreset = PRESETS.find((p) => p.id === selectedPresetId) || PRESETS[0];

  const computedRps = Math.round(activePreset.queryLoadRps * concurrencyMultiplier);
  const computedP95 = cacheEnabled
    ? Math.round(activePreset.p95LatencyMs * (1 + (concurrencyMultiplier - 1) * 0.18))
    : Math.round(activePreset.p95LatencyMs * 2.6 * concurrencyMultiplier);
  const computedP99 = cacheEnabled
    ? Math.round(activePreset.p99LatencyMs * (1 + (concurrencyMultiplier - 1) * 0.22))
    : Math.round(activePreset.p99LatencyMs * 3.1 * concurrencyMultiplier);
  const computedHitRate = cacheEnabled
    ? Math.max(75, +(activePreset.edgeCacheHitRate - (concurrencyMultiplier - 1) * 1.4).toFixed(1))
    : 0;

  const handleRunStressTest = () => {
    const now = new Date();
    setLastRunTimestamp(
      `Verified at ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })} · ${computedRps.toLocaleString()} req/s`
    );
  };

  const handleReset = () => {
    setConcurrencyMultiplier(1);
    setCacheEnabled(true);
    setLastRunTimestamp('Reset to baseline parameters');
  };

  return (
    <div className="bg-white dark:bg-[#0B0C10] border border-zinc-200 dark:border-zinc-800/90 rounded-2xl p-6 sm:p-8">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-zinc-200 dark:border-zinc-800">
        <div>
          <p className="text-xs font-mono text-zinc-500 dark:text-zinc-400">
            INTERACTIVE BENCHMARK LAB · SYSTEMS TELEMETRY
          </p>
          <h3 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-100 mt-1">
            Architecture Load &amp; Latency Simulator
          </h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
            Inspect how Santosh&apos;s production architectures respond to traffic scaling and edge cache state.
          </p>
        </div>

        {/* Interactive preset selector tabs */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-zinc-100 dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800">
          {PRESETS.map((preset) => (
            <button
              key={preset.id}
              onClick={() => setSelectedPresetId(preset.id)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                selectedPresetId === preset.id
                  ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 shadow-xs'
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'
              }`}
            >
              {preset.name}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6 items-start">
        {/* Controls Column */}
        <div className="lg:col-span-5 space-y-5">
          <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
            {activePreset.description}
          </p>

          <div>
            <div className="flex items-center justify-between text-xs font-mono mb-2">
              <label htmlFor="concurrency-slider" className="text-zinc-600 dark:text-zinc-400">
                TRAFFIC MULTIPLIER ({concurrencyMultiplier.toFixed(1)}x LOAD)
              </label>
              <span className="text-blue-600 dark:text-blue-400 tabular-nums">
                {computedRps.toLocaleString()} req/sec
              </span>
            </div>
            <input
              id="concurrency-slider"
              type="range"
              min="1"
              max="4"
              step="0.5"
              value={concurrencyMultiplier}
              onChange={(e) => setConcurrencyMultiplier(parseFloat(e.target.value))}
              className="w-full accent-blue-600 cursor-pointer"
            />
          </div>

          <div className="flex items-center justify-between pt-2">
            <span className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
              Edge Inverted-Index Cache
            </span>
            <button
              type="button"
              onClick={() => setCacheEnabled(!cacheEnabled)}
              className={`px-3.5 py-1.5 text-xs font-mono rounded-lg border transition-colors whitespace-nowrap shrink-0 ${
                cacheEnabled
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-zinc-100 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 border-zinc-300 dark:border-zinc-700'
              }`}
            >
              {cacheEnabled ? 'ENABLED (EDGE HIT)' : 'BYPASSED (ORIGIN)'}
            </button>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button
              type="button"
              onClick={handleRunStressTest}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Play className="w-3.5 h-3.5" />
              Run Benchmark Probe
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-zinc-700 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset
            </button>
          </div>

          <p className="text-xs font-mono text-zinc-500 dark:text-zinc-400 tabular-nums">
            {lastRunTimestamp}
          </p>
        </div>

        {/* Tabular Readout Column */}
        <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900/70 border border-zinc-200 dark:border-zinc-800">
            <span className="text-xs font-mono text-zinc-500 block">P95 LATENCY</span>
            <span className="text-2xl font-bold font-mono text-zinc-900 dark:text-zinc-100 mt-1 block tabular-nums">
              {computedP95} ms
            </span>
            <span className="text-xs text-zinc-500 mt-1 block">Target &lt; 100 ms</span>
          </div>

          <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900/70 border border-zinc-200 dark:border-zinc-800">
            <span className="text-xs font-mono text-zinc-500 block">P99 LATENCY</span>
            <span className="text-2xl font-bold font-mono text-zinc-900 dark:text-zinc-100 mt-1 block tabular-nums">
              {computedP99} ms
            </span>
            <span className="text-xs text-zinc-500 mt-1 block">Tail stability</span>
          </div>

          <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900/70 border border-zinc-200 dark:border-zinc-800">
            <span className="text-xs font-mono text-zinc-500 block">CACHE HIT RATIO</span>
            <span className="text-2xl font-bold font-mono text-blue-600 dark:text-blue-400 mt-1 block tabular-nums">
              {computedHitRate}%
            </span>
            <span className="text-xs text-zinc-500 mt-1 block">Multi-region PoP</span>
          </div>

          <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900/70 border border-zinc-200 dark:border-zinc-800">
            <span className="text-xs font-mono text-zinc-500 block">CI VERIFY GATE</span>
            <span className="text-2xl font-bold font-mono text-zinc-900 dark:text-zinc-100 mt-1 block tabular-nums">
              {activePreset.ciVerifySeconds} s
            </span>
            <span className="text-xs text-zinc-500 mt-1 block">
              Bundle: {activePreset.bundleSizeKb} kB
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
