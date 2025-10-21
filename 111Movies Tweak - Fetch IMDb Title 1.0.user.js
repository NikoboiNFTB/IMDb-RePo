// ==UserScript==
// @name         111Movies Tweak - Fetch IMDb Title
// @namespace    https://github.com/NikoboiNFTB/IMDb-RePo
// @version      1.0
// @description  Fetch IMDb title and set page title
// @author       Nikoboi
// @match        *://111movies.com/*
// @grant        GM_xmlhttpRequest
// @connect      imdb.com
// @run-at       document-idle
// ==/UserScript==

(function() {
  'use strict';
  const m = location.href.match(/(tt\d{6,9})/i);
  if (!m) return;
  const imdbId = m[1];
  const imdbUrl = `https://www.imdb.com/title/${imdbId}/`;

  GM_xmlhttpRequest({
    method: 'GET',
    url: imdbUrl,
    headers: { 'User-Agent': navigator.userAgent, 'Accept': 'text/html' },
    onload(response) {
      try {
        if (response.status < 200 || response.status >= 400) return;
        const parser = new DOMParser();
        const imdbDoc = parser.parseFromString(response.responseText, 'text/html');
        let imdbTitle = imdbDoc.querySelector('title')?.textContent?.trim() ||
                        imdbDoc.querySelector('meta[property="og:title"]')?.getAttribute('content')?.trim();
        if (!imdbTitle) return;
        const newTitle = imdbTitle.replace(/\s*-\s*IMDb\s*$/i, ' - 111Movies');
        document.title = newTitle;
        let titleEl = document.head.querySelector('title') || document.head.appendChild(document.createElement('title'));
        titleEl.textContent = newTitle;
      } catch (err) { console.error('IMDb fetch error:', err); }
    },
    onerror(err) { console.error('IMDb request failed:', err); }
  });
})();
