// ==UserScript==
// @name         IMDb RePo: Automatic Redirect Edition
// @namespace    https://github.com/NikoboiNFTB/IMDb-RePo
// @version      6.1
// @description  Automatically redirects IMDb pages to 111movies, with support for Movies, TV, and Episode pages. We highly recommend using the standard edition over this.
// @author       Nikoboi
// @match        *://*.imdb.com/title/*
// @grant        none
// @icon         https://m.media-amazon.com/images/G/01/imdb/images-ANDW73HA/favicon_iPhone_retina_180x180._CB1582158069_UX196_.png
// ==/UserScript==

(function () {
  'use strict';

  const DEBUG = true;
  const log = (...a) => DEBUG && console.log('[IMDb-RePo AutoRedirect]', ...a);

  function getIMDbID() {
    const match = window.location.pathname.match(/\/title\/(tt\d+)/); // On Movie/TV Show sites this is used to match the current IMDb title to the desired external site.
    return match ? match[1] : null;
  }

  function determineType() {
    if (document.querySelector('[aria-label="View all episodes"]')) return 'Episode';
    if (document.querySelector('[aria-label="View episode guide"]')) return 'TV';
    if (document.querySelector('[aria-label="View Popular TV Shows"]')) return 'TV';
    if (document.querySelector('[aria-label="View Popular Movies"]')) return 'Movie';
    return 'Movie'; // These are used to check what type of page you're on. This is needed to determine the type of 111Movies link you should be directed to.
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

  function safeRedirect() { //This likely will get flagged as suspicious by any program you use for two reasons - once because it tries to open a new window and again because of the site it leads to. Opening a new tab is the core functionality of the script, so it's expected. The website 111movies.com is a minimal streaming site, used by hundreds of other sites (it's a content aggregator). The script will tell the site what id to input, and it may be able to tell what site you came from. These privacy concerns are negligible. Simply entering youtube.com is a way bigger privacy concern than anything this script welcomes.
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
