// ==UserScript==
// @name         111Movies - Remove Gradient
// @namespace    https://github.com/NikoboiNFTB/IMDb-RePo
// @version      1.0
// @description  Remove gradient overlay on 111Movies
// @author       Nikoboi
// @match        *://111movies.com/*
// @run-at       document-idle
// ==/UserScript==

(function() {
  'use strict';
  const css = `.css-rauu36{background:none !important;background-image:none !important;background-color:transparent !important;}`;
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
})();
