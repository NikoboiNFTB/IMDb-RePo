// ==UserScript==
// @name         IMDb RePo: Simple and Fast Redirect Portal
// @namespace    https://github.com/NikoboiNFTB/IMDb-RePo
// @version      7.1
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
        const match = window.location.pathname.match(/\/title\/(tt\d+)/);
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

    function createWatchButton(type) {
        const btn = document.createElement('div'); // use div container for flexible layout
        btn.className = 'ipc-btn ipc-btn--full-width ipc-btn--large-height ipc-btn--button-radius';
        btn.dataset.imdbRepo = 'true';
        btn.style.cssText = `
            display: flex;
            align-items: center;
            gap: 6px;
            background-color: #28a745;
            color: #fff;
            font-weight: bold;
            padding: 6px 12px;
            margin-bottom: 8px;
            cursor: pointer;
            user-select: none;
        `;

        const icon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        icon.setAttribute('viewBox', '0 0 24 24');
        icon.setAttribute('width', '24');
        icon.setAttribute('height', '24');
        icon.classList.add('ipc-icon');
        icon.innerHTML = `<path d="M8 5v14l11-7z"></path>`;

        const label = document.createElement('span');
        label.textContent = 'Watch';

        btn.append(icon, label);

        if (type === 'TV') {
            const seasonInput = document.createElement('input');
            const episodeInput = document.createElement('input');
            [seasonInput, episodeInput].forEach((inp, i) => {
                inp.type = 'number';
                inp.min = '1';
                inp.placeholder = i ? 'E' : 'S';
                inp.style.cssText = `
                    width:36px;height:28px;border-radius:4px;border:none;
                    text-align:center;font-size:14px;background:#1c7c34;color:#fff;
                    appearance:textfield; -moz-appearance:textfield;
                `;
                // Prevent clicks on inputs from bubbling to button
                inp.addEventListener('click', e => e.stopPropagation());
                inp.addEventListener('keydown', e => e.stopPropagation());
            });

            const inputsWrapper = document.createElement('div');
            inputsWrapper.style.display = 'flex';
            inputsWrapper.style.gap = '4px';
            inputsWrapper.append(seasonInput, episodeInput);

            btn.appendChild(inputsWrapper);

            // Button click uses current input values
            const open = () => {
                const season = seasonInput.value > 0 ? seasonInput.value : '1';
                const episode = episodeInput.value > 0 ? episodeInput.value : '1';
                const imdbID = getIMDbID();
                window.open(`https://111movies.com/tv/${imdbID}/${season}/${episode}`, '_blank');
            };
            btn.addEventListener('click', open);
            [seasonInput, episodeInput].forEach(inp => {
                inp.addEventListener('keydown', ev => ev.key === 'Enter' && open());
            });
        } else if (type === 'Episode') {
            const seriesLink = document.querySelector('[data-testid="hero-title-block__series-link"]');
            const seriesID = seriesLink?.href.match(/tt\d+/)?.[0];
            const seText = document.querySelector('[data-testid="hero-subnav-bar-season-episode-numbers-section"]')?.textContent || '';
            const season = seText.match(/S(\d+)/)?.[1] || '1';
            const episode = seText.match(/E(\d+)/)?.[1] || '1';

            if (!seriesID) return btn;

            btn.addEventListener('click', e => {
                e.preventDefault();
                window.open(`https://111movies.com/tv/${seriesID}/${season}/${episode}`, '_blank');
            });
        } else {
            btn.addEventListener('click', e => {
                e.preventDefault();
                const imdbID = getIMDbID();
                window.open(`https://111movies.com/movie/${imdbID}`, '_blank');
            });
        }

        return btn;
    }

    function injectButton(type, target) {
        const btn = createWatchButton(type);
        insertBeforeWatchlist(btn);
        log(`✅ Injected ${type} button.`);
        return true;
    }

    function determineType() {
        if (document.querySelector('[aria-label="View all episodes"]')) return 'Episode';
        if (document.querySelector('[aria-label="View episode guide"]')) return 'TV';
        if (document.querySelector('[aria-label="View Popular TV Shows"]')) return 'TV';
        if (document.querySelector('[aria-label="View Popular Movies"]')) return 'Movie';
        return 'Movie';
    }

    // Optimized observer
    const container = document.querySelector('.sc-dcb1530e-3.hgRMPJ');
    if (container && !container.querySelector('[data-imdb-repo]')) {
        injectButton(determineType(), container);
    } else {
        const observer = new MutationObserver((mutations, obs) => {
            const target = document.querySelector('.sc-dcb1530e-3.hgRMPJ');
            if (!target) return;
            if (!target.querySelector('[data-imdb-repo]')) {
                injectButton(determineType(), target);
                obs.disconnect();
            }
        });
        observer.observe(document.body, { childList: true, subtree: true });
    }

})();
