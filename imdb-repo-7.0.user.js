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

    function createNativeButtonGroup(labelText) {
        const groupContainer = document.createElement('div');
        groupContainer.className = 'sc-9d3bc82f-0 ipxRZe rating-bar__base-button';

        const label = document.createElement('div');
        label.className = 'sc-9d3bc82f-1 lhxLQH';
        label.textContent = labelText;
        groupContainer.appendChild(label);

        const container = document.createElement('div');
        container.style.display = 'flex';
        container.style.alignItems = 'center';
        container.style.gap = '6px';
        groupContainer.appendChild(container);

        return { groupContainer, container };
    }

    function createGoButton(color = '#28a745') {
        const btn = document.createElement('a');
        btn.className = 'ipc-btn ipc-btn--single-padding ipc-btn--center-align-content ipc-btn--default-height ipc-btn--core-baseAlt ipc-btn--theme-baseAlt ipc-btn--button-radius ipc-btn--on-textPrimary ipc-text-button';
        btn.href = '#';
        btn.style.backgroundColor = color;
        btn.style.color = '#fff';
        btn.style.fontWeight = 'bold';
        btn.style.userSelect = 'none';
        const span = document.createElement('span');
        span.className = 'ipc-btn__text';
        span.textContent = 'Go';
        btn.appendChild(span);
        return btn;
    }

    function injectButton(type, target) {
        const imdbID = getIMDbID();
        if (!target || !imdbID) return false;

        const group = createNativeButtonGroup('WATCH');
        const goBtn = createGoButton('#28a745');

        if (type === 'TV') {
            const s = document.createElement('input'), e = document.createElement('input');
            [s, e].forEach((inp, i) => {
                inp.type = 'number';
                inp.min = '1';
                inp.placeholder = i ? 'E' : 'S';
                inp.style.cssText = `
                    width:28px;height:28px;border-radius:4px;border:1px solid #ccc;
                    text-align:center;font-size:14px;background:#222;color:#fff;
                    -moz-appearance:textfield !important;appearance:textfield !important;
                `;
            });
            const open = evt => {
                evt && evt.preventDefault();
                const season = s.value > 0 ? s.value : '1';
                const episode = e.value > 0 ? e.value : '1';
                window.open(`https://111movies.com/tv/${imdbID}/${season}/${episode}`, '_blank'); // This likely will get flagged as suspicious by any program you use for two reasons - once because it tries to open a new window and again because of the site it leads to. Opening a new tab is the core functionality of the script, so it's expected. The website 111movies.com is a minimal streaming site, used by hundreds of other sites (it's a content aggregator). The script will tell the site what id to input, and it may be able to tell what site you came from. These privacy concerns are negligible. Simply entering youtube.com is a way bigger privacy concern than anything this script welcomes.
            };
            goBtn.onclick = open;
            [s, e].forEach(i => i.addEventListener('keydown', ev => ev.key === 'Enter' && open()));
            group.container.append(goBtn, s, e);
        }

        else if (type === 'Episode') {
            // extract series ID from link
            const seriesLink = document.querySelector('[data-testid="hero-title-block__series-link"]');
            const seriesID = seriesLink?.getAttribute('href')?.match(/tt\d+/)?.[0];
            // extract season & episode number
            const seText = document.querySelector('[data-testid="hero-subnav-bar-season-episode-numbers-section"]')?.textContent || '';
            const season = seText.match(/S(\d+)/)?.[1] || '1';
            const episode = seText.match(/E(\d+)/)?.[1] || '1';
            if (!seriesID) {
                log('⚠️ Could not find parent series ID.');
                return false;
            }
            goBtn.onclick = e => {
                e.preventDefault();
                window.open(`https://111movies.com/tv/${seriesID}/${season}/${episode}`, '_blank'); // This likely will get flagged as suspicious by any program you use for two reasons - once because it tries to open a new window and again because of the site it leads to. Opening a new tab is the core functionality of the script, so it's expected. The website 111movies.com is a minimal streaming site, used by hundreds of other sites (it's a content aggregator). The script will tell the site what id to input, and it may be able to tell what site you came from. These privacy concerns are negligible. Simply entering youtube.com is a way bigger privacy concern than anything this script welcomes.
            };
            group.container.appendChild(goBtn);
        }

        else {
            // Movie
            goBtn.onclick = e => {
                e.preventDefault();
                window.open(`https://111movies.com/movie/${imdbID}`, '_blank'); // This likely will get flagged as suspicious by any program you use for two reasons - once because it tries to open a new window and again because of the site it leads to. Opening a new tab is the core functionality of the script, so it's expected. The website 111movies.com is a minimal streaming site, used by hundreds of other sites (it's a content aggregator). The script will tell the site what id to input, and it may be able to tell what site you came from. These privacy concerns are negligible. Simply entering youtube.com is a way bigger privacy concern than anything this script welcomes.
            };
            group.container.appendChild(goBtn);
        }

        // Insert directly before the Watchlist split button
        const watchlistWrapper =
            document.querySelector('[data-testid="tm-box-wl-button"]')?.closest('.ipc-split-button');

        group.groupContainer.dataset.imdbRepo = 'true';

        if (watchlistWrapper && watchlistWrapper.parentElement) {
            watchlistWrapper.parentElement.insertBefore(
                group.groupContainer,
                watchlistWrapper
            );
        } else {
            // Fallback: append to target container
            target.appendChild(group.groupContainer);
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
