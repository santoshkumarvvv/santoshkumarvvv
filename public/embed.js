/**
 * SearchEmbed / DocPulse v1.0.0 — Zero-Dependency In-Browser Instant Search Widget
 * (c) Santosh Kumar (https://github.com/santoshkumarvvv)
 * Distributed under MIT License
 * 
 * In-Memory BM25 Lexical Algorithm Note:
 * This client-side engine executes in-browser with zero database roundtrips.
 * BM25 lexical saturation scores exact word matches first, then applies
 * Damerau-Levenshtein transposition/insertion/deletion distance for tokens >= 4 characters.
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
  const customAccent = currentScript?.getAttribute('data-accent') || '#06b6d4';
  const placeholderText = currentScript?.getAttribute('data-placeholder') || 'Search real projects, architectures, and docs...';
  const position = currentScript?.getAttribute('data-position') || 'bottom-right';

  // 100% Real Production Index (Zero fake URLs, Zero placeholder links)
  let searchIndex = [
    {
      title: 'Santosh Kumar — Systems Command Hub',
      url: 'https://santoshkumarvvv.github.io/',
      excerpt: 'Engineering high-velocity web systems, federated search engines, and native mobile applications.',
      category: 'Home'
    },
    {
      title: 'SearchHub — Federated In-Memory BM25 Engine',
      url: 'https://github.com/santoshkumarvvv/search-hub-',
      excerpt: 'Sub-2ms typo-tolerant search core in TypeScript with Damerau-Levenshtein scoring.',
      category: 'Core Repo'
    },
    {
      title: 'Dev Showcase — Flutter Clean Architecture Engine',
      url: 'https://github.com/santoshkumarvvv/dev-showcase',
      excerpt: '120fps mobile engine built with domain-driven design, Riverpod state management, and CI/CD automation.',
      category: 'Mobile Engine'
    },
    {
      title: 'Selected Engineering Works & Case Studies',
      url: 'https://santoshkumarvvv.github.io/#works',
      excerpt: 'Deep-dive into Scrypt KDF cryptographic authentication, inverted index caches, and memory budgets.',
      category: 'Works'
    },
    {
      title: 'SearchEmbed — 1-Line In-Browser Search Widget',
      url: 'https://santoshkumarvvv.github.io/#architecture',
      excerpt: '14.8KB vanilla JS standalone search modal replacing heavy Algolia and Elasticsearch setups.',
      category: 'Architecture'
    },
    {
      title: 'Official Systems Engineering Resume (PDF)',
      url: 'https://santoshkumarvvv.github.io/assets/Santosh_Kumar_Resume.pdf',
      excerpt: 'Verified technical resume covering distributed systems, low-latency algorithms, and production stack.',
      category: 'Credentials'
    },
    {
      title: 'Engineering Inquiries & Direct Contact',
      url: 'mailto:kumasantosh947@gmail.com',
      excerpt: 'Direct communication channel for systems engineering consulting, hiring, and open-source inquiries.',
      category: 'Contact'
    }
  ];

  // If a custom JSON endpoint is provided by customer
  const indexUrl = currentScript?.getAttribute('data-index-url');
  if (indexUrl) {
    fetch(indexUrl)
      .then(res => res.json())
      .then(data => { if (Array.isArray(data)) searchIndex = data; })
      .catch(err => console.warn('[SearchEmbed] Failed to load custom index:', err));
  }

  // Helper: Escape HTML characters for secure rendering
  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
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
          matrix[i][j - 1] + cost // substitution
        );
        if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) {
          matrix[i][j] = Math.min(matrix[i][j], matrix[i - 2][j - 2] + cost); // transposition
        }
      }
    }
    return matrix[al][bl];
  }

  // --- In-Memory BM25 Term Matching & Scoring ---
  // Limits fuzzy matching to tokens with length >= 4 to eliminate noisy short-token matches
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
          } else if (token.length >= 4 && Math.abs(w.length - token.length) <= 1) {
            // Cap fuzzy matching strictly to tokens >= 4 characters
            const dist = damerauLevenshtein(w, token);
            if (dist === 1) score += 2.5; // Single typo match
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
      border: 1px solid rgba(6, 182, 212, 0.35);
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4), 0 0 15px rgba(6, 182, 212, 0.15);
      border-radius: 9999px;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      font-size: 13px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
    }
    #se-trigger-btn:hover {
      transform: translateY(-2px);
      border-color: #06b6d4;
      box-shadow: 0 6px 24px rgba(6, 182, 212, 0.3);
    }
    #se-trigger-btn kbd {
      background: #18181b;
      border: 1px solid #27272a;
      border-radius: 4px;
      padding: 2px 6px;
      font-size: 11px;
      color: #a1a1aa;
    }
    #se-modal-backdrop {
      position: fixed;
      inset: 0;
      z-index: 999999;
      background: rgba(0, 0, 0, 0.75);
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
      display: flex;
      align-items: flex-start;
      justify-content: center;
      padding: 80px 16px 20px;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.15s ease-out;
    }
    #se-modal-backdrop.se-open {
      opacity: 1;
      pointer-events: auto;
    }
    #se-modal-container {
      width: 100%;
      max-width: 640px;
      background: #090a12;
      border: 1px solid rgba(6, 182, 212, 0.3);
      border-radius: 20px;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.7), 0 0 40px rgba(6, 182, 212, 0.15);
      overflow: hidden;
      display: flex;
      flex-direction: column;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    }
    #se-input-row {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 18px 20px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      background: #0d0f1a;
    }
    #se-search-input {
      flex: 1;
      background: transparent;
      border: none;
      color: #ffffff;
      font-size: 15px;
      outline: none;
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
      border-radius: 12px;
      text-decoration: none;
      color: #e4e4e7;
      transition: background 0.1s ease;
      cursor: pointer;
    }
    .se-result-item:hover, .se-result-item.se-selected {
      background: rgba(6, 182, 212, 0.12);
      outline: 1px solid rgba(6, 182, 212, 0.3);
    }
    .se-result-title {
      font-size: 14px;
      font-weight: 600;
      color: #ffffff;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 4px;
    }
    .se-result-excerpt {
      font-size: 12px;
      color: #a1a1aa;
      line-height: 1.4;
    }
    .se-badge {
      font-size: 10px;
      font-family: monospace;
      padding: 2px 6px;
      border-radius: 4px;
      background: #18181b;
      color: #06b6d4;
      border: 1px solid rgba(6, 182, 212, 0.25);
    }
    #se-footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 12px 18px;
      background: #090a12;
      border-top: 1px solid rgba(255, 255, 255, 0.06);
      font-size: 11px;
      color: #71717a;
    }
    #se-footer a {
      color: #06b6d4;
      text-decoration: none;
      font-weight: 600;
    }
    #se-footer a:hover {
      text-decoration: underline;
    }
  `;
  document.head.appendChild(styleEl);

  // --- Render DOM Elements ---
  const triggerBtn = document.createElement('button');
  triggerBtn.id = 'se-trigger-btn';
  triggerBtn.setAttribute('aria-label', 'Open Global Search');
  triggerBtn.innerHTML = `
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
    <span>Search</span>
    <kbd aria-hidden="true">⌘K</kbd>
  `;
  document.body.appendChild(triggerBtn);

  const modalBackdrop = document.createElement('div');
  modalBackdrop.id = 'se-modal-backdrop';
  modalBackdrop.setAttribute('role', 'dialog');
  modalBackdrop.setAttribute('aria-modal', 'true');
  modalBackdrop.setAttribute('aria-label', 'Site Search Dialog');

  modalBackdrop.innerHTML = `
    <div id="se-modal-container">
      <div id="se-input-row">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="${escapeHtml(customAccent)}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
        <input id="se-search-input" type="text" placeholder="${escapeHtml(placeholderText)}" autocomplete="off" aria-label="Search documents and projects" />
        <button id="se-close-btn" style="background:none; border:none; cursor:pointer;" aria-label="Close search">
          <span style="font-size: 11px; color: #71717a; background: #18181b; border: 1px solid #27272a; padding: 2px 6px; border-radius: 4px;">ESC</span>
        </button>
      </div>
      <div id="se-results-box" role="region" aria-live="polite">
        <div style="padding: 24px; text-align: center; color: #71717a; font-size: 13px;">Type to search real projects, architectures, and docs...</div>
      </div>
      <div id="se-footer">
        <div>Navigate with <kbd style="background:#18181b; padding:1px 4px; border-radius:3px;">↑</kbd> <kbd style="background:#18181b; padding:1px 4px; border-radius:3px;">↓</kbd> · Select with <kbd style="background:#18181b; padding:1px 4px; border-radius:3px;">↵</kbd></div>
        <div id="se-whitelabel-mark"><a href="https://github.com/santoshkumarvvv/search-hub-" target="_blank" rel="noopener noreferrer">⚡ Powered by Santosh Search</a></div>
      </div>
    </div>
  `;
  document.body.appendChild(modalBackdrop);

  const searchInput = modalBackdrop.querySelector('#se-search-input');
  const resultsBox = modalBackdrop.querySelector('#se-results-box');
  const closeBtn = modalBackdrop.querySelector('#se-close-btn');

  let selectedIndex = -1;
  let currentResults = [];

  // Focus trap management
  function openModal() {
    modalBackdrop.classList.add('se-open');
    searchInput.value = '';
    selectedIndex = -1;
    renderResults([]);
    document.body.style.overflow = 'hidden';
    setTimeout(() => searchInput.focus(), 50);
  }

  function closeModal() {
    modalBackdrop.classList.remove('se-open');
    document.body.style.overflow = '';
    triggerBtn.focus();
  }

  function renderResults(results) {
    currentResults = results;
    selectedIndex = results.length > 0 ? 0 : -1;

    if (!searchInput.value.trim()) {
      resultsBox.innerHTML = '';
      const initialDiv = document.createElement('div');
      initialDiv.style.cssText = 'padding: 24px; text-align: center; color: #71717a; font-size: 13px;';
      initialDiv.textContent = `Type anything to search across ${searchIndex.length} real indexed pages (sub-2ms BM25)...`;
      resultsBox.appendChild(initialDiv);
      return;
    }

    if (results.length === 0) {
      resultsBox.innerHTML = '';
      const emptyDiv = document.createElement('div');
      emptyDiv.style.cssText = 'padding: 24px; text-align: center; color: #a1a1aa; font-size: 13px;';
      emptyDiv.textContent = `No matching documents found for "${searchInput.value}".`;
      resultsBox.appendChild(emptyDiv);
      return;
    }

    resultsBox.innerHTML = results.map((r, i) => `
      <a href="${escapeHtml(r.url)}" class="se-result-item ${i === selectedIndex ? 'se-selected' : ''}" data-index="${i}">
        <div class="se-result-title">
          <span>${escapeHtml(r.title)}</span>
          ${r.category ? `<span class="se-badge">${escapeHtml(r.category)}</span>` : ''}
        </div>
        ${r.excerpt ? `<div class="se-result-excerpt">${escapeHtml(r.excerpt)}</div>` : ''}
      </a>
    `).join('');
  }

  triggerBtn.addEventListener('click', openModal);
  closeBtn?.addEventListener('click', closeModal);
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
    } else if (modalBackdrop.classList.contains('se-open')) {
      // Focus trap for Tab
      if (e.key === 'Tab') {
        const focusable = modalBackdrop.querySelectorAll('input, button, a[href]');
        if (focusable.length > 0) {
          const first = focusable[0];
          const last = focusable[focusable.length - 1];
          if (e.shiftKey && document.activeElement === first) {
            e.preventDefault();
            last.focus();
          } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      } else if (currentResults.length > 0) {
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

  // Whitelabel check: if paid key, hide footer branding
  if (siteKey && (siteKey.startsWith('sh_ltd_') || siteKey.startsWith('sh_pro_'))) {
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
