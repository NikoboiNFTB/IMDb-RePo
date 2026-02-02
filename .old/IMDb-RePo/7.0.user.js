// ==UserScript==
// @name         IMDb RePo: Simple and Fast Redirect Portal
// @namespace    https://github.com/NikoboiNFTB/IMDb-RePo
// @version      7.0
// @description  Injects an elegant button into IMDb Title pages that redirect you directly to an external streaming service.
// @author       Nikoboi
// @match        *://*.imdb.com/title/*
// @grant        none
// @icon         https://m.media-amazon.com/images/G/01/imdb/images-ANDW73HA/favicon_iPhone_retina_180x180._CB1582158069_UX196_.png
// ==/UserScript==

(function () {
    'use strict';

    const DEBUG = true;
    const log = (...a) => DEBUG && console.log('[IMDb-RePo]', ...a);

    function getIMDbID() {
        const match = window.location.pathname.match(/\/title\/(tt\d+)/); // On Movie/TV Show sites this is used to match the current IMDb title to the desired external site.
        return match ? match[1] : null;
    }

    function insertBeforeWatchlist(node) {
        const watchlistWrapper =
            document.querySelector('[data-testid="tm-box-wl-button"]')
                ?.closest('.ipc-split-button');

        if (watchlistWrapper?.parentElement) {
            watchlistWrapper.parentElement.insertBefore(node, watchlistWrapper);
        }
    }

    function createWatchButton(label = 'Watch') {
        const btn = document.createElement('button');

        btn.className = [
            'ipc-btn',
            'ipc-btn--full-width',
            'ipc-btn--left-align-content',
            'ipc-btn--large-height',
            'ipc-btn--core-accent1',
            'ipc-btn--theme-accent1',
            'ipc-btn--button-radius',
            'ipc-primary-button'
        ].join(' ');

        btn.type = 'button';
        btn.setAttribute('aria-disabled', 'false');
        btn.dataset.imdbRepo = 'true';

        // Force green background, white text, and margin-bottom
        btn.style.cssText = `
        background-color: #28a745;
        color: #fff;
        margin-bottom: 8px;
    `;

        const icon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        icon.setAttribute('viewBox', '0 0 24 24');
        icon.setAttribute('width', '24');
        icon.setAttribute('height', '24');
        icon.classList.add(
            'ipc-icon',
            'ipc-icon--play',
            'ipc-btn__icon',
            'ipc-btn__icon--pre'
        );
        icon.innerHTML = `<path d="M8 5v14l11-7z"></path>`;

        const text = document.createElement('span');
        text.className = 'ipc-btn__text';
        text.textContent = label;

        btn.append(icon, text);
        return btn;
    }

    function injectButton(type, target) {
        const imdbID = getIMDbID();
        if (!target || !imdbID) return false;

        const btn = createWatchButton('Watch');

        if (type === 'TV') {
            const s = document.createElement('input');
            const e = document.createElement('input');

            [s, e].forEach((inp, i) => {
                inp.type = 'number';
                inp.min = '1';
                inp.placeholder = i ? 'E' : 'S';
                inp.style.cssText = `
            width:28px;height:28px;border-radius:4px;border:1px solid #ccc;
            text-align:center;font-size:14px;background:#222;color:#fff;
            appearance:textfield;
        `;
            });

            btn.onclick = e => {
                e.preventDefault();
                window.open(
                    `https://111movies.com/tv/${seriesID}/${season}/${episode}`,
                    '_blank'
                );
            };

            // Wrap button + inputs so layout stays sane
            const wrap = document.createElement('div');
            wrap.style.display = 'flex';
            wrap.style.gap = '6px';
            wrap.append(btn, s, e);

            insertBeforeWatchlist(btn);
            return true;
        }


        else if (type === 'Episode') {
            const seriesLink = document.querySelector('[data-testid="hero-title-block__series-link"]');
            const seriesID = seriesLink?.href.match(/tt\d+/)?.[0];

            const seText = document
                .querySelector('[data-testid="hero-subnav-bar-season-episode-numbers-section"]')
                ?.textContent || '';

            const season = seText.match(/S(\d+)/)?.[1] || '1';
            const episode = seText.match(/E(\d+)/)?.[1] || '1';

            if (!seriesID) return false;

            btn.onclick = e => {
                e.preventDefault();
                window.open(`https://111movies.com/tv/${seriesID}/${season}/${episode}`, '_blank');
            };
        }

        else {
            btn.onclick = e => {
                e.preventDefault();
                window.open(
                    `https://111movies.com/movie/${imdbID}`,
                    '_blank'
                );
            };
        }


        // Insert directly before the Watchlist split button
        const watchlistWrapper =
            document.querySelector('[data-testid="tm-box-wl-button"]')
                ?.closest('.ipc-split-button');

        if (watchlistWrapper && watchlistWrapper.parentElement) {
            watchlistWrapper.parentElement.insertBefore(btn, watchlistWrapper);
        }

        log(`✅ Injected ${type} button.`);
        return true;
    }

    function determineType() {
        if (document.querySelector('[aria-label="View all episodes"]')) return 'Episode';
        if (document.querySelector('[aria-label="View episode guide"]')) return 'TV';
        if (document.querySelector('[aria-label="View Popular TV Shows"]')) return 'TV';
        if (document.querySelector('[aria-label="View Popular Movies"]')) return 'Movie';
        return 'Movie'; // These are used to check what type of page you're on. This is needed to determine the type of 111Movies link you should be directed to.
    }

    const observer = new MutationObserver((mutations, obs) => {
        const target = document.querySelector('.sc-dcb1530e-3.hgRMPJ');
        if (!target) return;

        const type = determineType();

        // Avoid double-injecting
        if (target.querySelector('[data-imdb-repo]')) {
            obs.disconnect();
            return;
        }

        if (injectButton(type, target)) obs.disconnect();
    });

    observer.observe(document.body, { childList: true, subtree: true });
    log('👀 MutationObserver active, waiting for IMDb action bar...');

})();
