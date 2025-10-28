// ==UserScript==
// @name         IMDb AutoRePo - IMDb RePo, Automatic Redirect Edition
// @namespace    https://github.com/NikoboiNFTB/IMDb-RePo
// @version      1.0
// @description  Automatically redirects IMDb movie/TV pages. Works standalone or alongside IMDb RePo 1.5+.
// @author       Nikoboi
// @match        *://*.imdb.com/title/*
// @grant        none
// ==/UserScript==

(function () {
  'use strict';

  // Extract IMDb ID from the URL
  const match = window.location.pathname.match(/\/title\/(tt\d+)/);
  if (!match) return;
  const imdbID = match[1];

  // Wait until IMDb fully loads (to detect episode guide reliably)
  const checkInterval = setInterval(() => {
    const isTV = !!document.querySelector('[aria-label="View episode guide"]');

    // Decide target URL
    const redirectURL = isTV
      ? `https://111movies.com/tv/${imdbID}/1/1`
      : `https://111movies.com/movie/${imdbID}`;

    if (document.readyState === 'complete' || document.body) {
      clearInterval(checkInterval);
      console.log(`🎬 IMDb RePo AutoRedirect → ${redirectURL}`);
      window.location.replace(redirectURL);
    }
  }, 200);
})();
