// ==UserScript==
// @name         111Movies Enhancer
// @namespace    https://github.com/NikoboiNFTB/IMDb-RePo
// @version      4.0
// @description  UI fixes (gradient, cursor, buttons) + fetch IMDb title for proper tab naming
// @author       Nikoboi
// @match        *://111movies.com/*
// @grant        GM_xmlhttpRequest
// @connect      imdb.com
// @run-at       document-idle
// ==/UserScript==

(function () {
  'use strict';

  /*─────────────────────────────────────────────
    🎬 IMDb Title Fetch + Replace
  ─────────────────────────────────────────────*/
  const m = location.href.match(/(tt\d{6,9})/i);
  if (m) {
    const imdbId = m[1];
    const imdbUrl = `https://www.imdb.com/title/${imdbId}/`;

    GM_xmlhttpRequest({
      method: 'GET',
      url: imdbUrl,
      headers: {
        'User-Agent': navigator.userAgent,
        'Accept': 'text/html'
      },
      onload(response) {
        try {
          if (response.status < 200 || response.status >= 400) return;

          const parser = new DOMParser();
          const imdbDoc = parser.parseFromString(response.responseText, 'text/html');

          let imdbTitle = imdbDoc.querySelector('title')?.textContent?.trim() ||
                          imdbDoc.querySelector('meta[property="og:title"]')?.getAttribute('content')?.trim();

          if (!imdbTitle) return;

          const newTitle = imdbTitle.replace(/\s*-\s*IMDb\s*$/i, ' - 111Movies');
          document.title = newTitle;

          let titleEl = document.head.querySelector('title');
          if (!titleEl) {
            titleEl = document.createElement('title');
            document.head.appendChild(titleEl);
          }
          titleEl.textContent = newTitle;
        } catch (err) {
          console.error('IMDb fetch error:', err);
        }
      },
      onerror(err) {
        console.error('IMDb request failed:', err);
      }
    });
  }

  /*─────────────────────────────────────────────
    🧹 1. Remove Gradient Overlay
  ─────────────────────────────────────────────*/
  const css = `
    .css-rauu36 {
      background: none !important;
      background-image: none !important;
      background-color: transparent !important;
    }
  `;
  const style = document.createElement('style');
  style.textContent = css;
  document.documentElement.appendChild(style);

  const overlayObserver = new MutationObserver(() => {
    document.querySelectorAll('.css-rauu36').forEach(el => {
      el.style.background = 'none';
      el.style.backgroundImage = 'none';
      el.style.backgroundColor = 'transparent';
    });
  });
  overlayObserver.observe(document.documentElement, { childList: true, subtree: true });

  /*─────────────────────────────────────────────
    🗑️ 2. Hide Top-Right Button
  ─────────────────────────────────────────────*/
  function hideTopRightButton() {
    document.querySelectorAll('button.MuiBox-root.css-9sg0ji').forEach(btn => btn.style.display = 'none');
  }
  hideTopRightButton();

  const buttonObserver = new MutationObserver(hideTopRightButton);
  buttonObserver.observe(document.documentElement, { childList: true, subtree: true });

  /*─────────────────────────────────────────────
    🖱️ 3. Smart Cursor Hiding
  ─────────────────────────────────────────────*/
  const controlsSelectors = [
    '.css-9sg0ji', // top-right
    '.css-jqsnhq', // bottom controls
    '.css-1xqa3sa' // other UI elements
  ];

  function isOverControls(target) {
    return controlsSelectors.some(sel => target.closest(sel));
  }

  document.addEventListener('mousemove', e => {
    const x = e.clientX;
    const y = e.clientY;
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    const edgeThresholdX = vw * 0.1;
    const edgeThresholdY = vh * 0.1;

    if (!isOverControls(e.target) &&
        x > edgeThresholdX &&
        x < vw - edgeThresholdX &&
        y > edgeThresholdY &&
        y < vh - edgeThresholdY) {
      document.querySelectorAll('*').forEach(el => { el.style.cursor = 'none'; });
    } else {
      document.querySelectorAll('*').forEach(el => { el.style.cursor = ''; });
    }
  });
})();
