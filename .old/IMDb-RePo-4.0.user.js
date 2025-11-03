// ==UserScript==
// @name         IMDb RePo: Simple and Fast Redirect Portal
// @namespace    https://github.com/NikoboiNFTB/IMDb-RePo
// @version      4.0
// @description  Adds a native-style “WATCH” button on IMDb movie or TV pages with optimized injection, caching, and safer handling.
// @author       Nikoboi
// @match        *://*.imdb.com/title/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    const DEBUG = true; // set false to disable console logs

    function log(...args) { if (DEBUG) console.log(...args); }
    function warn(...args) { if (DEBUG) console.warn(...args); }

    // Cached selectors
    let mainTarget = null;
    let imdbID = null;

    function getIMDbID() {
        if (!imdbID) {
            const match = window.location.pathname.match(/\/title\/(tt\d+)/);
            imdbID = match ? match[1] : null;
        }
        return imdbID;
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

    function createGoButton(label = 'Go', color = '#28a745') {
        const btn = document.createElement('a');
        btn.className = 'ipc-btn ipc-btn--single-padding ipc-btn--center-align-content ipc-btn--default-height ipc-btn--core-baseAlt ipc-btn--theme-baseAlt ipc-btn--button-radius ipc-btn--on-textPrimary ipc-text-button';
        btn.href = '#';
        btn.style.backgroundColor = color;
        btn.style.color = '#fff';
        btn.style.fontWeight = 'bold';
        btn.style.userSelect = 'none';

        const span = document.createElement('span');
        span.className = 'ipc-btn__text';
        span.textContent = label;
        btn.appendChild(span);

        return btn;
    }

    function injectButton(type) {
        if (!mainTarget) mainTarget = document.querySelector('.sc-8e956c5c-1.dzAXeE');
        const id = getIMDbID();
        if (!mainTarget || !id) return false;

        const group = createNativeButtonGroup('WATCH');
        const goBtn = createGoButton('Go', '#28a745');

        if (type === 'TV') {
            const seasonInput = document.createElement('input');
            const episodeInput = document.createElement('input');

            [seasonInput, episodeInput].forEach((input, i) => {
                input.type = 'number';
                input.min = '1';
                input.placeholder = i === 0 ? 'S' : 'E';
                input.style.cssText = `
                    width:28px;height:28px;border-radius:4px;border:1px solid #ccc;
                    text-align:center;font-size:14px;background:#222;color:#fff;
                    -moz-appearance:textfield !important;appearance:textfield !important;
                `;
            });

            let opened = false;
            function openTVLink(e) {
                if (e) e.preventDefault();
                if (opened) return; // prevent multiple rapid calls
                opened = true;
                const season = seasonInput.value && parseInt(seasonInput.value) > 0 ? seasonInput.value : '1';
                const episode = episodeInput.value && parseInt(episodeInput.value) > 0 ? episodeInput.value : '1';
                window.open(`https://111movies.com/tv/${id}/${season}/${episode}`, '_blank');
                setTimeout(() => { opened = false; }, 100);
            }

            goBtn.addEventListener('click', openTVLink);
            [seasonInput, episodeInput].forEach(input => {
                input.addEventListener('keydown', e => { if (e.key === 'Enter') openTVLink(); });
            });

            group.container.appendChild(goBtn);
            group.container.appendChild(seasonInput);
            group.container.appendChild(episodeInput);
            mainTarget.insertBefore(group.groupContainer, mainTarget.firstChild);
            log('✅ TV button added (v4.0).');

        } else if (type === 'Movie') {
            goBtn.addEventListener('click', e => {
                e.preventDefault();
                window.open(`https://111movies.com/movie/${id}`, '_blank');
            });

            group.container.appendChild(goBtn);
            mainTarget.insertBefore(group.groupContainer, mainTarget.firstChild);
            log('✅ Movie button added (v4.0).');
        } else {
            warn('⚠️ IMDb-RePo: Could not determine title type.');
            return false;
        }

        return true;
    }

    function determineType() {
        if (document.querySelector('[aria-label="View Popular TV Shows"]')) return 'TV';
        if (document.querySelector('[aria-label="View Popular Movies"]')) return 'Movie';
        return null;
    }

    function initInjection() {
        const type = determineType();
        if (!type) return false;
        return injectButton(type);
    }

    // Observe only popularity container to react faster
    const popularityNode = document.querySelector('[data-testid="hero-rating-bar__popularity"]');
    if (popularityNode) {
        initInjection();
    } else {
        const observer = new MutationObserver((mutations, obs) => {
            const node = document.querySelector('[data-testid="hero-rating-bar__popularity"]');
            const type = determineType();
            if (node && type) {
                initInjection();
                obs.disconnect();
            }
        });
        observer.observe(document.body, { childList: true, subtree: true });
    }

})();
