// ==UserScript==
// @name         111Movies - Add Page Title (IMDb + TMDB)
// @namespace    https://github.com/NikoboiNFTB/IMDb-RePo
// @version      1.1
// @description  Auto-set page title by fetching metadata from IMDb or TMDB and normalize suffix to "111Movies"
// @author       Nikoboi
// @match        *://111movies.com/*
// @grant        GM_xmlhttpRequest
// @connect      imdb.com
// @connect      themoviedb.org
// @run-at       document-idle
// @icon         https://111movies.com/assets/img/logo.png
// ==/UserScript==

(function() {
  "use strict";

  const href = location.href;

  // IMDb ID detection: tt1234567
  const imdbMatch = href.match(/(tt\d{6,9})/i);

  // TMDB ID detection: /movie/<digits> or /tv/<digits>
  const tmdbMatch = href.match(/\/(?:movie|tv)\/(\d{3,7})(?:[^\d]|$)/i);

  // Decide source
  let sourceUrl = null;
  let sourceType = null; // 'imdb'|'tmdb'

  if (imdbMatch) {
    sourceType = 'imdb';
    const imdbId = imdbMatch[1];
    sourceUrl = `https://www.imdb.com/title/${imdbId}/`;
  } else if (tmdbMatch) {
    sourceType = 'tmdb';
    const tmdbId = tmdbMatch[1];
    // Start with movie page; fallback to tv if needed
    sourceUrl = `https://www.themoviedb.org/movie/${tmdbId}`;
  } else {
    // No recognizable ID in URL — nothing to do
    return;
  }

  function cleanTitle(raw, from) {
    if (!raw) return null;
    let title = raw.trim();

    // Remove typical TMDB suffixes
    // Examples: " — The Movie Database (TMDB)" or " — The Movie Database (TMDB) - " variants
    title = title.replace(/\s*—\s*The Movie Database\s*\(TMDB\)\s*$/i, '');
    title = title.replace(/\s*-\s*The Movie Database\s*\(TMDB\)\s*$/i, '');

    // Remove trailing site-specific garbage like " - IMDb"
    title = title.replace(/\s*-\s*IMDb\s*$/i, '');

    // Remove any preexisting " - 111Movies" or " — 111Movies" to avoid duplication
    title = title.replace(/\s*[-—]\s*111Movies\s*$/i, '');

    // Trim again and append our canonical suffix
    title = title.trim() + ' — 111Movies';
    return title;
  }

  function setDocumentTitle(newTitle) {
    if (!newTitle) return;
    document.title = newTitle;
    let titleEl = document.head.querySelector('title');
    if (!titleEl) {
      titleEl = document.createElement('title');
      document.head.appendChild(titleEl);
    }
    titleEl.textContent = newTitle;
  }

  function fetchAndApply(url, tryTvFallback = false) {
    GM_xmlhttpRequest({
      method: "GET",
      url,
      headers: { "User-Agent": navigator.userAgent, "Accept": "text/html" },
      onload(response) {
        // If TMDB movie page returns 404/other, try TV fallback
        if (response.status < 200 || response.status >= 400) {
          if (sourceType === 'tmdb' && !tryTvFallback) {
            const tmdbId = tmdbMatch[1];
            return fetchAndApply(`https://www.themoviedb.org/tv/${tmdbId}`, true);
          }
          return;
        }

        const doc = new DOMParser().parseFromString(response.responseText, "text/html");

        // Prefer og:title (cleaner), fallback to <title>
        let remoteTitle = doc.querySelector('meta[property="og:title"]')?.getAttribute('content')?.trim()
                        || doc.querySelector('title')?.textContent?.trim();

        if (!remoteTitle) return;

        const normalized = cleanTitle(remoteTitle, sourceType);
        setDocumentTitle(normalized);
      },
      onerror(err) {
        // If tmdb movie page failed and we haven't tried TV fallback yet, try it
        if (sourceType === 'tmdb' && !tryTvFallback) {
          const tmdbId = tmdbMatch[1];
          fetchAndApply(`https://www.themoviedb.org/tv/${tmdbId}`, true);
        } else {
          console.error('Title fetch failed:', err);
        }
      }
    });
  }

  fetchAndApply(sourceUrl);

})();
