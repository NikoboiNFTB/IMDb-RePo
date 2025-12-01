// ==UserScript==
// @name         IMDb RePo: Automatic Redirect Edition
// @namespace    https://github.com/NikoboiNFTB/IMDb-RePo
// @version      2.0
// @description  Automatically redirects IMDb movie/TV pages. Works standalone or alongside IMDb RePo 1.5+.
// @author       Nikoboi
// @match        *://*.imdb.com/title/*
// @grant        none
// ==/UserScript==

(function () {
  'use strict';

  const DEBUG = true; // set false to disable console logs
  function log(...args) { if (DEBUG) console.log(...args); }
  function warn(...args) { if (DEBUG) console.warn(...args); }

  // Extract IMDb ID from the URL (cached)
  let imdbID = null;
  function getIMDbID() {
    if (!imdbID) {
      const match = window.location.pathname.match(/\/title\/(tt\d+)/);
      imdbID = match ? match[1] : null;
    }
    return imdbID;
  }

  // Determine TV or Movie based on the aria-labels
  function determineType() {
    if (document.querySelector('[aria-label="View Popular TV Shows"]')) return 'TV';
    if (document.querySelector('[aria-label="View Popular Movies"]')) return 'Movie';
    return null;
  }

  // Safe redirect with error handling (via try-catch)
  function safeRedirect() {
    try {
      const type = determineType();
      if (!type) return false; // Wait until the type is determined

      const imdbID = getIMDbID();
      if (!imdbID) return false; // Ensure IMDb ID is available

      const redirectURL = type === 'TV'
        ? `https://111movies.com/tv/${imdbID}/1/1`
        : `https://111movies.com/movie/${imdbID}`;

      log(`🎬 IMDb RePo AutoRedirect → ${redirectURL}`);
      window.location.replace(redirectURL);
    } catch (err) {
      console.error('IMDb RePo: AutoRedirect error', err);
    }
  }

  // Create and initialize MutationObserver to watch for the relevant aria-labels
  const observer = new MutationObserver((mutations, obs) => {
    const type = determineType();
    if (type) {
      safeRedirect();
      obs.disconnect(); // Stop observing once redirect is triggered
    }
  });

  // Observe body for changes related to aria-label presence
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });

})();
