// ==UserScript==
// @name         111Movies - Hide Server
// @namespace    https://github.com/NikoboiNFTB/IMDb-RePo
// @downloadURL  https://github.com/NikoboiNFTB/IMDb-RePo/raw/refs/heads/main/111Movies/server.user.js
// @version      1.1
// @author       Nikoboi
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
      serverBtn.style.display = '';
    } else {
      serverBtn.style.display = 'none';
    }
  };

  const observer = new MutationObserver(updateServerButton);
  observer.observe(mainPlayer, { attributes: true, attributeFilter: ['class'] });

  updateServerButton();
})();
