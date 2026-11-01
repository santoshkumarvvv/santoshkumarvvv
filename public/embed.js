/**
 * SearchEmbed / DocPulse v1.0.0 — Zero-Dependency In-Browser Instant Search Widget
 * (c) Santosh Kumar (https://github.com/santoshkumarvvv)
 * Distributed under MIT License
 * 
 * Usage:
 * <script src="https://santoshkumarvvv.github.io/embed.js" data-site-key="sh_live_demo" defer></script>
 */
(function () {
  'use strict';

  if (window.__SEARCH_EMBED_INITIALIZED__) return;
  window.__SEARCH_EMBED_INITIALIZED__ = true;

  const currentScript = document.currentScript || (function () {
    const scripts = document.getElementsByTagName('script');
    return scripts[scripts.length - 1];
  })();

  const siteKey = currentScript?.getAttribute('data-site-key') || 'sh_live_demo';
  const customAccent = currentScript?.getAttribute('data-accent') || '#2563eb';
  const placeholderText = currentScript?.getAttribute('data-placeholder') || 'Search documentation, guides, and pages...';
  const position = currentScript?.getAttribute('data-position') || 'bottom-right';

  // Sample or fetched search index
  let searchIndex = [
    { title: 'Getting Started Guide', url: '/docs/getting-started', excerpt: 'Learn how to install and configure SearchEmbed on your website in under 60 seconds.', category: 'Guide' },
    { title: 'API Authentication & Scrypt Keys', url: '/docs/api-keys', excerpt: 'Cryptographically hashed API key provisioning with sliding-window rate limiting.', category: 'Security' },
    { title: 'Edge Deployment on Vercel & Cloudflare', url: '/docs/edge-deploy', excerpt: 'Deploy sub-millisecond federated search routers with multi-region failover.', category: 'Infrastructure' },
    { title: 'Clean Architecture in Flutter & Dart', url: '/docs/clean-architecture', excerpt: 'Domain-driven design, immutable value objects, and monadic Result contracts.', category: 'Architecture' },
    { title: 'Pricing & Lifetime Deal License', url: '/pricing', excerpt: 'Single payment $39 lifetime license with unbranded whitelabel embed capabilities.', category: 'Billing' },
    { title: 'Typo-Tolerant BM25 Search Algorithm', url: '/docs/bm25-algorithm', excerpt: 'In-memory inverted index calculation using TF-IDF term saturation and Damerau-Levenshtein distance.', category: 'Search Core' }
  ];

  // If a custom JSON endpoint is provided
  const indexUrl = currentScript?.getAttribute('data-index-url');
  if (indexUrl) {
    fetch(indexUrl)
      .then(res => res.json())
      .then(data => { if (Array.isArray(data)) searchIndex = data; })
      .catch(err => console.warn('[SearchEmbed] Failed to load custom index:', err));
  }

  // --- Damerau-Levenshtein Distance Calculation ---
  function damerauLevenshtein(a, b) {
    const al = a.length, bl = b.length;
    if (al === 0) return bl;
    if (bl === 0) return al;
    const matrix = Array.from({ length: al + 1 }, () => new Int32Array(bl + 1));
    for (let i = 0; i <= al; i++) matrix[i][0] = i;
    for (let j = 0; j <= bl; j++) matrix[0][j] = j;

    for (let i = 1; i <= al; i++) {
      for (let j = 1; j <= bl; j++) {
        const cost = a[i - 1] === b[j - 1] ? 0 : 1;
        matrix[i][j] = Math.min(
          matrix[i - 1][j] + 1,       // deletion
          matrix[i][j - 1] + 1,       // insertion
          matrix[i - 1][j - 1] + cost // substitution
        );
        if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) {
          matrix[i][j] = Math.min(matrix[i][j], matrix[i - 2][j - 2] + cost); // transposition
        }
      }
    }
    return matrix[al][bl];
  }

  // --- In-Memory BM25 Term Matching & Scoring ---
  function executeSearch(query) {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    const queryTokens = q.split(/\s+/).filter(Boolean);

    const scored = searchIndex.map(doc => {
      let score = 0;
      const titleLower = doc.title.toLowerCase();
      const excerptLower = (doc.excerpt || '').toLowerCase();
      const combined = `${titleLower} ${excerptLower}`;

      for (const token of queryTokens) {
        // Exact substring matches get highest weight
        if (titleLower.includes(token)) score += 10;
        if (excerptLower.includes(token)) score += 4;

        // Word-level token match
        const words = combined.split(/\W+/).filter(Boolean);
        for (const w of words) {
          if (w === token) {
            score += 5;
          } else if (token.length >= 3) {
            const dist = damerauLevenshtein(w, token);
            if (dist === 1) score += 2.5; // Typo match
          }
        }
      }

      return { doc, score };
    });

    return scored
      .filter(item => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .map(item => item.doc);
  }

  // --- Inject Minimal Styles ---
  const styleEl = document.createElement('style');
  styleEl.textContent = `
    #se-trigger-btn {
      position: fixed;
      ${position === 'bottom-left' ? 'bottom: 24px; left: 24px;' : 'bottom: 24px; right: 24px;'}
      z-index: 999998;
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 10px 16px;
      background: #09090b;
      color: #fafafa;
      border: 1px solid #27272a;
      border-radius: 9999px;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      font-size: 13px;
      font-weight: 500;
      cursor: pointer;
      box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.4);
      transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
    }
    #se-trigger-btn:hover {
      transform: translateY(-2px);
      border-color: #3f3f46;
      box-shadow: 0 14px 30px -5px rgba(0, 0, 0, 0.6);
    }
    #se-trigger-btn kbd {
      background: #18181b;
      border: 1px solid #3f3f46;
      border-radius: 4px;
      padding: 2px 6px;
      font-size: 11px;
      color: #a1a1aa;
    }
    #se-modal-backdrop {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.75);
      backdrop-filter: blur(4px);
      z-index: 999999;
      display: none;
      align-items: flex-start;
      justify-content: center;
      padding-top: 12vh;
      padding-left: 16px;
      padding-right: 16px;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    }
    #se-modal-backdrop.se-open {
      display: flex;
    }
    #se-modal-container {
      width: 100%;
      max-width: 620px;
      background: #09090b;
      border: 1px solid #27272a;
      border-radius: 16px;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.8);
      overflow: hidden;
      animation: seScaleIn 0.15s cubic-bezier(0.16, 1, 0.3, 1);
    }
    @keyframes seScaleIn {
      from { opacity: 0; transform: scale(0.97); }
      to { opacity: 1; transform: scale(1); }
    }
    #se-input-row {
      display: flex;
      align-items: center;
      padding: 16px 20px;
      border-bottom: 1px solid #27272a;
      gap: 12px;
    }
    #se-search-input {
      width: 100%;
      background: transparent;
      border: none;
      outline: none;
      color: #fafafa;
      font-size: 15px;
    }
    #se-search-input::placeholder {
      color: #71717a;
    }
    #se-results-box {
      max-height: 380px;
      overflow-y: auto;
      padding: 8px;
    }
    .se-result-item {
      display: block;
      padding: 12px 14px;
      border-radius: 10px;
      color: #d4d4d8;
      text-decoration: none;
      transition: background 0.15s ease;
      cursor: pointer;
    }
    .se-result-item:hover, .se-result-item.se-selected {
      background: #18181b;
      color: #fafafa;
    }
    .se-result-title {
      font-weight: 600;
      font-size: 14px;
      color: #f4f4f5;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .se-badge {
      font-size: 10px;
      font-weight: 600;
      text-transform: uppercase;
      padding: 2px 6px;
      border-radius: 4px;
      background: #27272a;
      color: #a1a1aa;
    }
    .se-result-excerpt {
      font-size: 12px;
      color: #a1a1aa;
      margin-top: 4px;
      line-height: 1.4;
    }
    #se-footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px 16px;
      border-top: 1px solid #27272a;
      background: #0e0e11;
      font-size: 11px;
      color: #71717a;
    }
    #se-footer a {
      color: #a1a1aa;
      text-decoration: none;
    }
    #se-footer a:hover {
      color: #fafafa;
    }
  `;
  document.head.appendChild(styleEl);

  // --- Render DOM Elements ---
  const triggerBtn = document.createElement('button');
  triggerBtn.id = 'se-trigger-btn';
  triggerBtn.innerHTML = `
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
    <span>Search</span>
    <kbd>⌘K</kbd>
  `;
  document.body.appendChild(triggerBtn);

  const modalBackdrop = document.createElement('div');
  modalBackdrop.id = 'se-modal-backdrop';
  modalBackdrop.innerHTML = `
    <div id="se-modal-container">
      <div id="se-input-row">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="${customAccent}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
        <input id="se-search-input" type="text" placeholder="${placeholderText}" autocomplete="off" />
        <span style="font-size: 11px; color: #71717a; background: #18181b; border: 1px solid #27272a; padding: 2px 6px; border-radius: 4px;">ESC</span>
      </div>
      <div id="se-results-box">
        <div style="padding: 24px; text-align: center; color: #71717a; font-size: 13px;">Type to search pages, guides, and documentation...</div>
      </div>
      <div id="se-footer">
        <div>Navigate with <kbd style="background:#18181b; padding:1px 4px; border-radius:3px;">↑</kbd> <kbd style="background:#18181b; padding:1px 4px; border-radius:3px;">↓</kbd> · Select with <kbd style="background:#18181b; padding:1px 4px; border-radius:3px;">↵</kbd></div>
        <div id="se-whitelabel-mark"><a href="https://github.com/santoshkumarvvv/search-hub-" target="_blank" rel="noopener">⚡ Powered by Santosh Search</a></div>
      </div>
    </div>
  `;
  document.body.appendChild(modalBackdrop);

  const searchInput = modalBackdrop.querySelector('#se-search-input');
  const resultsBox = modalBackdrop.querySelector('#se-results-box');

  let selectedIndex = -1;
  let currentResults = [];

  function openModal() {
    modalBackdrop.classList.add('se-open');
    searchInput.value = '';
    selectedIndex = -1;
    renderResults([]);
    setTimeout(() => searchInput.focus(), 50);
  }

  function closeModal() {
    modalBackdrop.classList.remove('se-open');
  }

  function renderResults(results) {
    currentResults = results;
    selectedIndex = results.length > 0 ? 0 : -1;

    if (!searchInput.value.trim()) {
      resultsBox.innerHTML = `
        <div style="padding: 24px; text-align: center; color: #71717a; font-size: 13px;">
          Type anything to search across ${searchIndex.length} indexed documents (2ms in-memory BM25)...
        </div>
      `;
      return;
    }

    if (results.length === 0) {
      resultsBox.innerHTML = `
        <div style="padding: 24px; text-align: center; color: #a1a1aa; font-size: 13px;">
          No matching documents found for "<strong>${searchInput.value.replace(/</g, '&lt;')}</strong>".
        </div>
      `;
      return;
    }

    resultsBox.innerHTML = results.map((r, i) => `
      <a href="${r.url}" class="se-result-item ${i === selectedIndex ? 'se-selected' : ''}" data-index="${i}">
        <div class="se-result-title">
          <span>${r.title}</span>
          ${r.category ? `<span class="se-badge">${r.category}</span>` : ''}
        </div>
        ${r.excerpt ? `<div class="se-result-excerpt">${r.excerpt}</div>` : ''}
      </a>
    `).join('');
  }

  triggerBtn.addEventListener('click', openModal);
  modalBackdrop.addEventListener('click', (e) => {
    if (e.target === modalBackdrop) closeModal();
  });

  searchInput.addEventListener('input', (e) => {
    const q = e.target.value;
    const results = executeSearch(q);
    renderResults(results);
  });

  window.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      if (modalBackdrop.classList.contains('se-open')) {
        closeModal();
      } else {
        openModal();
      }
    } else if (e.key === 'Escape' && modalBackdrop.classList.contains('se-open')) {
      closeModal();
    } else if (modalBackdrop.classList.contains('se-open') && currentResults.length > 0) {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        selectedIndex = (selectedIndex + 1) % currentResults.length;
        updateSelectedHighlight();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        selectedIndex = (selectedIndex - 1 + currentResults.length) % currentResults.length;
        updateSelectedHighlight();
      } else if (e.key === 'Enter' && selectedIndex >= 0) {
        e.preventDefault();
        const selected = currentResults[selectedIndex];
        if (selected?.url) window.location.href = selected.url;
      }
    }
  });

  function updateSelectedHighlight() {
    const items = resultsBox.querySelectorAll('.se-result-item');
    items.forEach((item, idx) => {
      if (idx === selectedIndex) {
        item.classList.add('se-selected');
        item.scrollIntoView({ block: 'nearest' });
      } else {
        item.classList.remove('se-selected');
      }
    });
  }

  // Whitelabel check: if paid Pro key, hide footer branding
  if (siteKey && siteKey.startsWith('sh_ltd_') || siteKey.startsWith('sh_pro_')) {
    const mark = modalBackdrop.querySelector('#se-whitelabel-mark');
    if (mark) mark.style.display = 'none';
  }

  // Public API
  window.SearchEmbed = {
    open: openModal,
    close: closeModal,
    setIndex: (newIndex) => { if (Array.isArray(newIndex)) searchIndex = newIndex; }
  };
})();
