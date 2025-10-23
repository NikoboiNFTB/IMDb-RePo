// ==UserScript==
// @name         IMDb RePo: Automatic Redirect Edition
// @namespace    https://github.com/NikoboiNFTB/IMDb-RePo
// @version      6.0
// @description  Automatically redirects IMDb pages to 111movies, with support for Movies, TV, and Episode pages.
// @author       Nikoboi
// @match        *://*.imdb.com/title/*
// @grant        none
// ==/UserScript==

(function () {
  'use strict';

  const DEBUG = true;
  const log = (...a) => DEBUG && console.log('[IMDb-RePo AutoRedirect]', ...a);

  function getIMDbID() {
    const match = window.location.pathname.match(/\/title\/(tt\d+)/);
    return match ? match[1] : null;
  }

  function determineType() {
    if (document.querySelector('[aria-label="View all episodes"]')) return 'Episode';
    if (document.querySelector('[aria-label="View episode guide"]')) return 'TV';
    if (document.querySelector('[aria-label="View Popular TV Shows"]')) return 'TV';
    if (document.querySelector('[aria-label="View Popular Movies"]')) return 'Movie';
    return 'Movie'; // fallback
  }

  function buildRedirectURL(type) {
    const imdbID = getIMDbID();
    if (!imdbID) return null;

    if (type === 'Episode') {
      const seriesLink = document.querySelector('[data-testid="hero-title-block__series-link"]');
      const seriesID = seriesLink?.getAttribute('href')?.match(/tt\d+/)?.[0];
      const seText = document.querySelector('[data-testid="hero-subnav-bar-season-episode-numbers-section"]')?.textContent || '';
      const season = seText.match(/S(\d+)/)?.[1] || '1';
      const episode = seText.match(/E(\d+)/)?.[1] || '1';
      if (!seriesID) return null;
      return `https://111movies.com/tv/${seriesID}/${season}/${episode}`;
    }

    if (type === 'TV') return `https://111movies.com/tv/${imdbID}/1/1`;
    if (type === 'Movie') return `https://111movies.com/movie/${imdbID}`;
    return null;
  }

  function safeRedirect() {
    try {
      const type = determineType();
      const url = buildRedirectURL(type);
      if (!url) {
        log('❌ Could not construct redirect URL.');
        return;
      }
      log(`🎬 Redirecting (${type}) → ${url}`);
      window.location.replace(url);
    } catch (err) {
      console.error('[IMDb-RePo AutoRedirect] Error:', err);
    }
  }

  const observer = new MutationObserver((_, obs) => {
    const type = determineType();
    if (type) {
      safeRedirect();
      obs.disconnect();
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });
  log('👀 MutationObserver active, waiting for IMDb content...');
})();
