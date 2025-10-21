// ==UserScript==
// @name         IMDb RePo: Simple and Fast Redirect Portal
// @namespace    https://github.com/NikoboiNFTB/IMDb-RePo
// @version      5.0
// @description  Injects an elegant button into IMDb Title pages that redirect you directly to an external streaming service.
// @author       Nikoboi
// @match        *://*.imdb.com/title/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    const DEBUG = true;
    const log = (...a) => DEBUG && console.log('[IMDb-RePo]', ...a);

    function getIMDbID() {
        const match = window.location.pathname.match(/\/title\/(tt\d+)/);
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

    function injectButton(type) {
        const target = document.querySelector('.sc-8e956c5c-1.dzAXeE');
        const imdbID = getIMDbID();
        if (!target || !imdbID) return false;

        const group = createNativeButtonGroup('WATCH');
        const goBtn = createGoButton('#28a745');

        if (type === 'TV') {
            const s = document.createElement('input'), e = document.createElement('input');
            [s, e].forEach((inp, i) => {
                inp.type = 'number'; inp.min = '1';
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
                window.open(`https://111movies.com/tv/${imdbID}/${season}/${episode}`, '_blank');
            };
            goBtn.onclick = open;
            [s, e].forEach(i => i.addEventListener('keydown', ev => ev.key === 'Enter' && open()));
            group.container.append(goBtn, s, e);
            target.insertBefore(group.groupContainer, target.firstChild);
            log('✅ Injected TV button.');
        } else {
            goBtn.onclick = e => {
                e.preventDefault();
                window.open(`https://111movies.com/movie/${imdbID}`, '_blank');
            };
            group.container.appendChild(goBtn);
            target.insertBefore(group.groupContainer, target.firstChild);
            log('✅ Injected Movie button.');
        }
        return true;
    }

    function determineType() {
        if (document.querySelector('[aria-label="View episode guide"]')) return 'TV';
        if (document.querySelector('[aria-label="View Popular TV Shows"]')) return 'TV';
        if (document.querySelector('[aria-label="View Popular Movies"]')) return 'Movie';
        return null;
    }

    function tryInject() {
        const target = document.querySelector('.sc-8e956c5c-1.dzAXeE');
        if (!target) return false;
        const type = determineType() || 'Movie';
        return injectButton(type);
    }

    // Smarter observer: waits until *all* relevant parts exist before acting
    const observer = new MutationObserver(() => {
        const allReady =
            document.querySelector('.sc-8e956c5c-1.dzAXeE') &&
            (
                document.querySelector('[aria-label="View episode guide"]') ||
                document.querySelector('[aria-label="View Popular Movies"]') ||
                document.querySelector('[aria-label="View Popular TV Shows"]')
            );
        if (allReady) {
            if (tryInject()) observer.disconnect();
        }
    });

    observer.observe(document.body, { childList: true, subtree: true });
    log('👀 MutationObserver active, waiting for IMDb content...');
})();
