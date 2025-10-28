// ==UserScript==
// @name         111Movies - Hide Server
// @namespace    https://github.com/NikoboiNFTB/IMDb-RePo
// @version      1.1
// @description  Hide server button when player controls disappear
// @match        *://111movies.com/*
// @run-at       document-idle
// @icon         https://111movies.com/assets/img/logo.png
// ==/UserScript==

(function() {
  'use strict';

  const serverButtonSelector = 'button.MuiBox-root.css-9sg0ji';
  const mainPlayer = document.querySelector('.mainplayer');

  if (!mainPlayer) return;

  const updateServerButton = () => {
    const serverBtn = document.querySelector(serverButtonSelector);
    if (!serverBtn) return;
    if (mainPlayer.classList.contains('controls_visible')) {
      serverBtn.style.display = ''; // show when controls visible
    } else {
      serverBtn.style.display = 'none'; // hide when controls hidden
    }
  };

  // Observe changes to the main player classes
  const observer = new MutationObserver(updateServerButton);
  observer.observe(mainPlayer, { attributes: true, attributeFilter: ['class'] });

  // Run once on load
  updateServerButton();
})();
