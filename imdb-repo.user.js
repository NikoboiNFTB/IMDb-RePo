// ==UserScript==
// @name         IMDb RePo: Simple and Fast Redirect Portal
// @namespace    https://github.com/NikoboiNFTB/IMDb-RePo
// @downloadURL  https://github.com/NikoboiNFTB/IMDb-RePo/raw/refs/heads/main/imdb-repo.user.js
// @version      8.0
// @description  Adds Watch (111movies) and Download (VidSrc) buttons to IMDb movie, TV, season, and episode pages.
// @author       Nikoboi
// @match        *://*.imdb.com/title/*
// @grant        none
// @icon         https://m.media-amazon.com/images/G/01/imdb/images-ANDW73HA/favicon_iPhone_retina_180x180._CB1582158069_UX196_.png
// ==/UserScript==

(function () {
  'use strict';

  /* ---------- Icons ---------- */

  const ICONS = {
    play: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="20" height="20" fill="currentColor"><path d="M187.2 100.9C174.8 94.1 159.8 94.4 147.6 101.6C135.4 108.8 128 121.9 128 136L128 504C128 518.1 135.5 531.2 147.6 538.4C159.7 545.6 174.8 545.9 187.2 539.1L523.2 355.1C536 348.1 544 334.6 544 320C544 305.4 536 291.9 523.2 284.9L187.2 100.9z"/></svg>`,
    download: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="20" height="20" fill="currentColor"><path d="M352 96C352 78.3 337.7 64 320 64C302.3 64 288 78.3 288 96L288 306.7L246.6 265.3C234.1 252.8 213.8 252.8 201.3 265.3C188.8 277.8 188.8 298.1 201.3 310.6L297.3 406.6C309.8 419.1 330.1 419.1 342.6 406.6L438.6 310.6C451.1 298.1 451.1 277.8 438.6 265.3C426.1 252.8 405.8 252.8 393.3 265.3L352 306.7L352 96zM160 384C124.7 384 96 412.7 96 448L96 480C96 515.3 124.7 544 160 544L480 544C515.3 544 544 515.3 544 480L544 448C544 412.7 515.3 384 480 384L433.1 384L376.5 440.6C345.3 471.8 294.6 471.8 263.4 440.6L206.9 384L160 384zM464 440C477.3 440 488 450.7 488 464C488 477.3 477.3 488 464 488C450.7 488 440 477.3 440 464C440 450.7 450.7 440 464 440z"/></svg>`
  };

  /* ---------- Helpers ---------- */

  const getIMDbID = () =>
    location.pathname.match(/\/title\/(tt\d+)/)?.[1] || null;

  const getContainer = () =>
    document.querySelector('.sc-dcb1530e-3.hgRMPJ');

  function insertBeforeWatchlist(node) {
    const wl =
      document.querySelector('[data-testid="tm-box-wl-button"]')
        ?.closest('.ipc-split-button');
    wl?.parentElement?.insertBefore(node, wl);
  }

  function killBubble(el) {
    ['click', 'mousedown', 'mouseup', 'keydown'].forEach(evt =>
      el.addEventListener(evt, e => e.stopPropagation())
    );
  }

  function numberInput(ph) {
    const i = document.createElement('input');
    i.type = 'number';
    i.min = '1';
    i.placeholder = ph;
    i.style.cssText = `
      width:72px;
      height:28px;
      border:none;
      border-radius:4px;
      text-align:center;
      background:rgba(0,0,0,0.25);
      color:#fff;
    `;
    killBubble(i);
    return i;
  }

  function baseButton(color, icon, label) {
    const b = document.createElement('div');
    b.className = 'ipc-btn ipc-btn--full-width ipc-btn--large-height ipc-btn--button-radius';
    b.style.cssText = `
      display:flex;
      align-items:center;
      gap:6px;
      padding:6px 12px;
      margin-bottom:8px;
      cursor:pointer;
      font-weight:bold;
      color:#fff;
      background:${color};
      user-select:none;
    `;
    b.innerHTML = icon + `<span>${label}</span>`;
    return b;
  }

  /* ---------- Movie / Show / Episode buttons ---------- */

  function createButtonPair(type, data) {
    const wrap = document.createElement('div');
    wrap.dataset.imdbRepo = 'true';

    const watch = baseButton('#28a745', ICONS.play, 'Watch');
    const dl = baseButton('#125784', ICONS.download, 'Download');

    if (type === 'movie') {
      watch.onclick = () =>
        window.open(`https://111movies.com/movie/${data.imdb}`, '_blank');
      dl.onclick = () =>
        window.open(`https://dl.vidsrc.vip/movie/${data.imdb}`, '_blank');
    }

    if (type === 'tv') {
      // Watch inputs
      const seasonWatch = numberInput('Season');
      const episodeWatch = numberInput('Episode');
      const inputsWatch = document.createElement('div');
      inputsWatch.style.cssText = 'display:flex; gap:8px; margin-left:24px;';
      inputsWatch.append(seasonWatch, episodeWatch);
      watch.appendChild(inputsWatch);

      // Download inputs
      const seasonDL = numberInput('Season');
      const episodeDL = numberInput('Episode');
      const inputsDL = document.createElement('div');
      inputsDL.style.cssText = 'display:flex; gap:8px; margin-left:24px;';
      inputsDL.append(seasonDL, episodeDL);
      dl.appendChild(inputsDL);

      const openWatch = () => {
        const S = seasonWatch.value || 1;
        const E = episodeWatch.value || 1;
        window.open(`https://111movies.com/tv/${data.imdb}/${S}/${E}`, '_blank');
      };
      const openDL = () => {
        const S = seasonDL.value || 1;
        const E = episodeDL.value || 1;
        window.open(`https://dl.vidsrc.vip/tv/${data.imdb}/${S}/${E}`, '_blank');
      };

      watch.onclick = openWatch;
      dl.onclick = openDL;

      // Trigger button click on Enter key
      [seasonWatch, episodeWatch].forEach(inp =>
        inp.addEventListener('keydown', e => e.key === 'Enter' && openWatch())
      );
      [seasonDL, episodeDL].forEach(inp =>
        inp.addEventListener('keydown', e => e.key === 'Enter' && openDL())
      );
    }



    if (type === 'episode') {
      watch.onclick = () =>
        window.open(`https://111movies.com/tv/${data.series}/${data.season}/${data.episode}`, '_blank');
      dl.onclick = () =>
        window.open(`https://dl.vidsrc.vip/tv/${data.series}/${data.season}/${data.episode}`, '_blank');
    }

    wrap.append(watch, dl);
    return wrap;
  }

  /* ---------- Season page buttons ---------- */

  function enhanceSeasonPage() {
    const series = getIMDbID();
    if (!series) return;

    const season =
      parseInt(new URLSearchParams(location.search).get('season') || '1', 10);

    document.querySelectorAll('.episode-item-wrapper, .list_item').forEach(card => {
      if (card.querySelector('[data-imdb-repo]')) return;

      const ep =
        card.textContent.match(/Episode\s+(\d+)/i)?.[1];
      if (!ep) return;

      card.style.position ||= 'relative';

      const wrap = document.createElement('div');
      wrap.dataset.imdbRepo = 'true';
      wrap.style.cssText = `
        position:absolute;
        right:8px;
        bottom:8px;
        display:flex;
        gap:6px;
      `;

      const w = document.createElement('a');
      w.innerHTML = ICONS.play + ' Watch';
      w.href = `https://111movies.com/tv/${series}/${season}/${ep}`;
      w.target = '_blank';

      const d = document.createElement('a');
      d.innerHTML = ICONS.download + ' Download';
      d.href = `https://dl.vidsrc.vip/tv/${series}/${season}/${ep}`;
      d.target = '_blank';

      [w, d].forEach(b => {
        b.style.cssText = `
          display:flex;
          align-items:center;
          gap:4px;
          background:${b === w ? '#28a745' : '#125784'};
          color:#fff;
          padding:4px 8px;
          border-radius:4px;
          font-weight:bold;
          text-decoration:none;
        `;
      });

      wrap.append(w, d);
      card.appendChild(wrap);
    });
  }

  /* ---------- Page detection ---------- */

  function pageType() {
    if (location.pathname.includes('/episodes')) return 'season';
    if (document.querySelector('[data-testid="hero-title-block__series-link"]'))
      return 'episode';
    if (document.querySelector('[aria-label="View episode guide"]')) return 'tv';
    return 'movie';
  }

  /* ---------- Init ---------- */

  function init() {
    const type = pageType();

    if (type === 'season') {
      enhanceSeasonPage();
      new MutationObserver(enhanceSeasonPage)
        .observe(document.body, { childList: true, subtree: true });
      return;
    }

    const c = getContainer();
    if (!c || c.querySelector('[data-imdb-repo]')) return;

    if (type === 'episode') {
      const series =
        document.querySelector('[data-testid="hero-title-block__series-link"]')
          ?.href.match(/tt\d+/)?.[0];
      const se =
        document.querySelector('[data-testid="hero-subnav-bar-season-episode-numbers-section"]')
          ?.textContent || '';
      insertBeforeWatchlist(
        createButtonPair('episode', {
          series,
          season: se.match(/S(\d+)/)?.[1] || 1,
          episode: se.match(/E(\d+)/)?.[1] || 1
        })
      );
      return;
    }

    insertBeforeWatchlist(
      createButtonPair(type, { imdb: getIMDbID() })
    );
  }

  document.readyState === 'loading'
    ? document.addEventListener('DOMContentLoaded', init)
    : init();

})();
