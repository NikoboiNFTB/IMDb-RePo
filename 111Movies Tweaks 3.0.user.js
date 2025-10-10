// ==UserScript==
// @name         111Movies Tweaks
// @namespace    https://github.com/NikoboiNFTB/IMDb-RePo
// @version      3.0
// @description  Removes the black gradient overlay around the player bar and hides the cursor over video except near controls or edges.
// @match        *://111movies.com/*
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function() {
  'use strict';

  /*─────────────────────────────────────────────
    🧹 1. Kill FluidPlayer Gradient Overlay
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

  // Reapply if React/MUI re-renders elements
  const observer = new MutationObserver(() => {
    document.querySelectorAll('.css-rauu36').forEach(el => {
      el.style.background = 'none';
      el.style.backgroundImage = 'none';
      el.style.backgroundColor = 'transparent';
    });
  });
  observer.observe(document.documentElement, { childList: true, subtree: true });

  /*─────────────────────────────────────────────
    🖱️ 2. "Smart" Cursor Hiding
  ─────────────────────────────────────────────*/
  const controlsSelectors = [
    '.css-9sg0ji', // top-right buttons
    '.css-jqsnhq', // bottom controls container
    '.css-1xqa3sa' // other controls group
  ];

  function isOverControls(target) {
    return controlsSelectors.some(sel => target.closest(sel));
  }

  document.addEventListener('mousemove', e => {
    const x = e.clientX;
    const y = e.clientY;
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    const edgeThresholdX = vw * 0.1; // 10% from left/right edges
    const edgeThresholdY = vh * 0.1; // 10% from top/bottom edges

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
