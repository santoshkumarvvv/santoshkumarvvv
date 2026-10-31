import React, { useState } from 'react';
import { Key, ShieldCheck, Zap, Copy, Check, ArrowUpRight, Activity, Terminal } from 'lucide-react';

interface GeneratedKey {
  rawKey: string;
  tier: 'free' | 'pro' | 'enterprise';
  remaining: number;
  totalQuota: number;
  rpm: number;
  createdAt: string;
}

const RADAR_DATA = [
  { name: 'TypeScript 5.8', category: 'Language', velocity: 98.4, growth: '+42.1%', downloads: '198M/mo', status: 'Surging' },
  { name: 'Next.js 15.5 App Router', category: 'Framework', velocity: 95.8, growth: '+38.6%', downloads: '48M/mo', status: 'Surging' },
  { name: 'Dart 3 / Flutter 3.24', category: 'Native UI', velocity: 92.1, growth: '+29.4%', downloads: '14M/mo', status: 'Surging' },
  { name: 'OCI Containers & Docker', category: 'DevOps', velocity: 96.5, growth: '+31.0%', downloads: '1.2B/mo', status: 'Stable' },
  { name: 'PyTorch 2.5 + CUDA', category: 'AI Tensor', velocity: 97.2, growth: '+64.8%', downloads: '34M/mo', status: 'Surging' },
];

export const SaasGatewayConsole: React.FC = () => {
  const [activeKey, setActiveKey] = useState<GeneratedKey>({
    rawKey: 'sh_live_demo_enterprise_key_2026',
    tier: 'enterprise',
    remaining: 499942,
    totalQuota: 500000,
    rpm: 300,
    createdAt: 'Active Session',
  });

  const [copied, setCopied] = useState<boolean>(false);
  const [simulatedCalls, setSimulatedCalls] = useState<number>(58);
  const [lastLatency, setLastLatency] = useState<number>(24);
  const [lastResponseJson, setLastResponseJson] = useState<string | null>(null);

  const handleMintKey = (tier: 'free' | 'pro' | 'enterprise') => {
    const randomHex = Array.from({ length: 16 }, () =>
      Math.floor(Math.random() * 16).toString(16)
    ).join('');
    const newRawKey = `sh_live_${randomHex}`;
    const quota = tier === 'free' ? 1000 : tier === 'pro' ? 50000 : 500000;
    const rpm = tier === 'free' ? 10 : tier === 'pro' ? 60 : 300;

    setActiveKey({
      rawKey: newRawKey,
      tier,
      remaining: quota,
      totalQuota: quota,
      rpm,
      createdAt: new Date().toLocaleTimeString(),
    });
  };

  const handleCopyKey = () => {
    navigator.clipboard.writeText(activeKey.rawKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleExecuteApiCall = () => {
    if (activeKey.remaining <= 0) return;

    const lat = Math.floor(Math.random() * 15) + 18;
    setLastLatency(lat);
    setActiveKey((prev) => ({ ...prev, remaining: prev.remaining - 1 }));
    setSimulatedCalls((prev) => prev + 1);

    const mockResponse = {
      status: 200,
      authenticated: true,
      tier: activeKey.tier,
      remainingQuota: activeKey.remaining - 1,
      edgeRegion: 'iad1-edge-gateway',
      latencyMs: lat,
      radarDataCount: RADAR_DATA.length,
      sampleIndex: RADAR_DATA[0],
    };
    setLastResponseJson(JSON.stringify(mockResponse, null, 2));
  };

  return (
    <div className="bg-white dark:bg-[#0B0C10] border border-zinc-200 dark:border-zinc-800/90 rounded-2xl p-6 sm:p-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-zinc-200 dark:border-zinc-800">
        <div>
          <p className="text-xs font-mono text-blue-600 dark:text-blue-400">
            MICRO-SAAS MONETIZATION LAYER · REVENUE ENGINE
          </p>
          <h3 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-100 mt-1">
            Autonomous API Key Gateway &amp; Global Tech Radar
          </h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
            Monetized developer API infrastructure with cryptographic key generation, sliding-window quotas, and automated 6-hour daemon cycles.
          </p>
        </div>

        {/* Tier Minting Controls */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-mono text-zinc-500">MINT KEY:</span>
          <button
            type="button"
            onClick={() => handleMintKey('free')}
            className={`px-3 py-1.5 text-xs font-mono rounded-lg border transition-colors cursor-pointer ${
              activeKey.tier === 'free'
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-zinc-100 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-800'
            }`}
          >
            Free ($0/mo)
          </button>
          <button
            type="button"
            onClick={() => handleMintKey('pro')}
            className={`px-3 py-1.5 text-xs font-mono rounded-lg border transition-colors cursor-pointer ${
              activeKey.tier === 'pro'
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-zinc-100 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-800'
            }`}
          >
            Pro ($29/mo)
          </button>
          <button
            type="button"
            onClick={() => handleMintKey('enterprise')}
            className={`px-3 py-1.5 text-xs font-mono rounded-lg border transition-colors cursor-pointer ${
              activeKey.tier === 'enterprise'
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-zinc-100 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-800'
            }`}
          >
            Enterprise ($99/mo)
          </button>
        </div>
      </div>

      {/* API Key Vault & Meter Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 py-6 border-b border-zinc-200 dark:border-zinc-800 items-start">
        {/* Left: Active Key Display */}
        <div className="lg:col-span-7 space-y-4">
          <div className="p-4 rounded-xl bg-zinc-950 text-zinc-100 border border-zinc-800 space-y-3">
            <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
              <span className="flex items-center gap-1.5">
                <Key className="w-3.5 h-3.5 text-blue-400" />
                ACTIVE CRYPTOGRAPHIC API KEY (SHA-256 VAULT)
              </span>
              <span className="text-blue-400 uppercase font-semibold">
                TIER: {activeKey.tier}
              </span>
            </div>

            <div className="flex items-center justify-between gap-2 p-2.5 rounded-lg bg-zinc-900 border border-zinc-800 font-mono text-xs">
              <span className="text-zinc-200 truncate">{activeKey.rawKey}</span>
              <button
                type="button"
                onClick={handleCopyKey}
                className="inline-flex items-center gap-1 text-blue-400 hover:text-blue-300 shrink-0 cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-zinc-400 pt-1">
              <span>SLIDING RATE LIMIT: {activeKey.rpm} REQ/MIN</span>
              <span>TOTAL CALLS CONSUMED: {simulatedCalls}</span>
            </div>
          </div>

          {/* Test API Action */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={handleExecuteApiCall}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-mono font-medium text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors cursor-pointer"
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Simulate Authenticated Request (GET /api/v1/radar)</span>
            </button>
            <span className="text-xs font-mono text-zinc-500 tabular-nums">
              Edge Latency: {lastLatency} ms
            </span>
          </div>

          {lastResponseJson && (
            <div className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800 text-[11px] font-mono text-zinc-300 overflow-x-auto max-h-40">
              <pre>{lastResponseJson}</pre>
            </div>
          )}
        </div>

        {/* Right: Meter Readouts */}
        <div className="lg:col-span-5 grid grid-cols-2 gap-3.5">
          <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900/70 border border-zinc-200 dark:border-zinc-800">
            <span className="text-xs font-mono text-zinc-500 block">REMAINING QUOTA</span>
            <span className="text-2xl font-bold font-mono text-zinc-900 dark:text-zinc-100 mt-1 block tabular-nums">
              {activeKey.remaining.toLocaleString()}
            </span>
            <span className="text-xs text-zinc-500 mt-1 block">
              of {activeKey.totalQuota.toLocaleString()} requests
            </span>
          </div>

          <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900/70 border border-zinc-200 dark:border-zinc-800">
            <span className="text-xs font-mono text-zinc-500 block">TIER PRICING</span>
            <span className="text-2xl font-bold font-mono text-blue-600 dark:text-blue-400 mt-1 block tabular-nums">
              {activeKey.tier === 'free' ? '$0' : activeKey.tier === 'pro' ? '$29' : '$99'}
            </span>
            <span className="text-xs text-zinc-500 mt-1 block">per month (MRR)</span>
          </div>

          <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900/70 border border-zinc-200 dark:border-zinc-800">
            <span className="text-xs font-mono text-zinc-500 block">DAEMON STATUS</span>
            <span className="text-sm font-semibold font-mono text-zinc-900 dark:text-zinc-100 mt-1.5 block">
              cron(0 */6 * * *)
            </span>
            <span className="text-xs text-zinc-500 mt-1 block">Autonomous cycle</span>
          </div>

          <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900/70 border border-zinc-200 dark:border-zinc-800">
            <span className="text-xs font-mono text-zinc-500 block">SECURITY HASH</span>
            <span className="text-sm font-semibold font-mono text-blue-600 dark:text-blue-400 mt-1.5 block">
              SHA-256 Vault
            </span>
            <span className="text-xs text-zinc-500 mt-1 block">0 plain-text storage</span>
          </div>
        </div>
      </div>

      {/* Live Market Velocity Table */}
      <div className="pt-6">
        <div className="flex items-center justify-between text-xs font-mono text-zinc-500 mb-3 px-1">
          <span>REAL-TIME TECH RADAR INTELLIGENCE FEED</span>
          <span className="tabular-nums">UPDATED VIA AUTONOMOUS CLOUD DAEMON</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-zinc-200 dark:border-zinc-800 text-zinc-500 pb-2">
                <th className="py-2.5 px-3">TECHNOLOGY</th>
                <th className="py-2.5 px-3">CATEGORY</th>
                <th className="py-2.5 px-3">MARKET VELOCITY</th>
                <th className="py-2.5 px-3">DOWNLOADS</th>
                <th className="py-2.5 px-3">OUTLOOK</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200/60 dark:divide-zinc-800/60 text-zinc-800 dark:text-zinc-200">
              {RADAR_DATA.map((item) => (
                <tr key={item.name} className="hover:bg-zinc-100/50 dark:hover:bg-zinc-900/50 transition-colors">
                  <td className="py-3 px-3 font-semibold text-zinc-900 dark:text-zinc-100">{item.name}</td>
                  <td className="py-3 px-3 text-zinc-500">{item.category}</td>
                  <td className="py-3 px-3 text-blue-600 dark:text-blue-400 font-bold tabular-nums">
                    {item.velocity.toFixed(1)} / 100 ({item.growth})
                  </td>
                  <td className="py-3 px-3 tabular-nums">{item.downloads}</td>
                  <td className="py-3 px-3 text-zinc-400">{item.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
