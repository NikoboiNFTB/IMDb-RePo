// ==UserScript==
// @name         IMDb RePo: Automatic Redirect Edition
// @namespace    https://github.com/NikoboiNFTB/IMDb-RePo
// @version      3.0
// @description  Automatically redirects IMDb movie/TV pages using all reliable aria-labels, intelligently choosing the correct option.
// @author       Nikoboi
// @match        *://*.imdb.com/title/*
// @grant        none
// ==/UserScript==

(function () {
  'use strict';

  const DEBUG = true;
  const log = (...args) => DEBUG && console.log('[IMDb RePo AutoRedirect]', ...args);

  // Cached IMDb ID
  let imdbID = null;
  function getIMDbID() {
    if (!imdbID) {
      const match = window.location.pathname.match(/\/title\/(tt\d+)/);
      imdbID = match ? match[1] : null;
    }
    return imdbID;
  }

  // Determine type using all relevant elements
  function determineType() {
    if (document.querySelector('[aria-label="View episode guide"]')) return 'TV';
    if (document.querySelector('[aria-label="View Popular TV Shows"]')) return 'TV';
    if (document.querySelector('[aria-label="View Popular Movies"]')) return 'Movie';
    return null;
  }

  function safeRedirect() {
    try {
      const type = determineType();
      if (!type) return false;

      const id = getIMDbID();
      if (!id) return false;

      const redirectURL = type === 'TV'
        ? `https://111movies.com/tv/${id}/1/1`
        : `https://111movies.com/movie/${id}`;

      log(`🎬 Redirecting → ${redirectURL}`);
      window.location.replace(redirectURL);
    } catch (err) {
      console.error('[IMDb RePo AutoRedirect] Error:', err);
    }
  }

  // MutationObserver to wait until any of the relevant elements exist
  const observer = new MutationObserver((mutations, obs) => {
    const type = determineType();
    if (type) {
      safeRedirect();
      obs.disconnect();
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });
})();
