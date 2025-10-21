// ==UserScript==
// @name         111Movies - Hide Server
// @namespace    https://github.com/NikoboiNFTB/IMDb-RePo
// @version      1.0
// @description  Hide the server button on 111Movies UI
// @author       Nikoboi
// @match        *://111movies.com/*
// @run-at       document-idle
// ==/UserScript==

(function() {
  'use strict';
  function hideTopRightButton() {
    document.querySelectorAll('button.MuiBox-root.css-9sg0ji').forEach(btn => btn.style.display = 'none');
  }
  hideTopRightButton();
  const buttonObserver = new MutationObserver(hideTopRightButton);
  buttonObserver.observe(document.documentElement, { childList: true, subtree: true });
})();
