// ==UserScript==
// @name         111Movies - Hide Cursor
// @namespace    https://github.com/NikoboiNFTB/IMDb-RePo
// @version      1.0
// @description  Hides cursor when not near UI controls. Brute force, but works.
// @author       Nikoboi
// @match        *://111movies.com/*
// @run-at       document-idle
// ==/UserScript==

(function() {
  'use strict';
  const controlsSelectors = ['.css-9sg0ji', '.css-jqsnhq', '.css-1xqa3sa'];

  function isOverControls(target) {
    return controlsSelectors.some(sel => target.closest(sel));
  }

  document.addEventListener('mousemove', e => {
    const x = e.clientX, y = e.clientY;
    const vw = window.innerWidth, vh = window.innerHeight;
    const edgeX = vw * 0.1, edgeY = vh * 0.1;

    if (!isOverControls(e.target) && x > edgeX && x < vw - edgeX && y > edgeY && y < vh - edgeY) {
      document.querySelectorAll('*').forEach(el => el.style.cursor = 'none');
    } else {
      document.querySelectorAll('*').forEach(el => el.style.cursor = '');
    }
  });
})();
