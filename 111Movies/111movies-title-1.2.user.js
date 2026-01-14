// ==UserScript==
// @name         111Movies - Add Page Title (IMDb + TMDB)
// @namespace    https://github.com/NikoboiNFTB/IMDb-RePo
// @version      1.2
// @description  Auto-set page title from IMDb or TMDB with unified suffix
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

  // Detect IMDb ID (anywhere)
  const imdbId = (href.match(/(tt\d{6,9})/i) || [])[1];

  // Detect TMDB type + ID based on the site’s structure
  const tmdb = href.match(/\/(movie|tv)\/(\d{1,7})(?:\/|$)/i);
  const tmdbType = tmdb ? tmdb[1].toLowerCase() : null;
  const tmdbId = tmdb ? tmdb[2] : null;

  let fetchUrl = null;

  if (imdbId) {
    fetchUrl = `https://www.imdb.com/title/${imdbId}/`;
  } else if (tmdbId && tmdbType) {
    fetchUrl = `https://www.themoviedb.org/${tmdbType}/${tmdbId}`;
  } else {
    return;
  }

  function cleanTitle(raw) {
    if (!raw) return null;
    let t = raw.trim();

    // Strip IMDb suffixes
    t = t.replace(/\s*-\s*IMDb\s*$/i, "");

    // Strip TMDB suffixes (both dash and em dash)
    t = t.replace(/\s*[—-]\s*The Movie Database\s*\(TMDB\)\s*$/i, "");

    // Strip accidental leftover "111Movies" endings
    t = t.replace(/\s*[—-]\s*111Movies\s*$/i, "");

    // Trim and add canonical suffix
    return t.trim() + " | 111Movies";
  }

  function applyTitle(title) {
    if (!title) return;

    document.title = title;

    let el = document.head.querySelector("title");
    if (!el) {
      el = document.createElement("title");
      document.head.appendChild(el);
    }
    el.textContent = title;
  }

  GM_xmlhttpRequest({
    method: "GET",
    url: fetchUrl,
    headers: { "Accept": "text/html" },
    onload(res) {
      if (res.status < 200 || res.status >= 400) return;
      const doc = new DOMParser().parseFromString(res.responseText, "text/html");

      const remoteTitle =
        doc.querySelector('meta[property="og:title"]')?.content?.trim() ||
        doc.querySelector("title")?.textContent?.trim();

      applyTitle(cleanTitle(remoteTitle));
    },
    onerror(err) {
      console.error("Failed to fetch title:", err);
    }
  });
})();
