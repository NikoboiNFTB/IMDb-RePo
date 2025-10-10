// ==UserScript==
// @name         IMDb RePo: Simple and Fast Redirect Portal
// @namespace    https://github.com/NikoboiNFTB/IMDb-RePo
// @version      2.1
// @description  Adds IMDb-native styled redirect buttons: TV if series, MOVIE if movie, with green Go button. Season/Episode inputs aligned naturally.
// @author       Nikoboi
// @match        *://*.imdb.com/title/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

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
        const goBtn = document.createElement('a');
        goBtn.className = 'ipc-btn ipc-btn--single-padding ipc-btn--center-align-content ipc-btn--default-height ipc-btn--core-baseAlt ipc-btn--theme-baseAlt ipc-btn--button-radius ipc-btn--on-textPrimary ipc-text-button';
        goBtn.href = '#';
        goBtn.style.backgroundColor = color;
        goBtn.style.color = '#fff';
        goBtn.style.fontWeight = 'bold';
        goBtn.style.userSelect = 'none';

        const span = document.createElement('span');
        span.className = 'ipc-btn__text';
        span.textContent = 'Go';
        goBtn.appendChild(span);

        return goBtn;
    }

    function injectButton() {
        const target = document.querySelector('.sc-8e956c5c-1.dzAXeE');
        if (!target) return false;

        const imdbID = getIMDbID();
        if (!imdbID) return false;

        const isTVPage = !!document.querySelector('[aria-label="View episode guide"]');

        if (isTVPage) {
            const tvGroup = createNativeButtonGroup('TV');
            const goBtn = createGoButton('#28a745');

            const seasonInput = document.createElement('input');
            const episodeInput = document.createElement('input');

            [seasonInput, episodeInput].forEach((input, i) => {
                input.type = 'number';
                input.min = '1';
                input.placeholder = i === 0 ? 'S' : 'E';
                input.style.width = '28px';
                input.style.height = '28px';
                input.style.borderRadius = '4px';
                input.style.border = '1px solid #ccc';
                input.style.textAlign = 'center';
                input.style.fontSize = '14px';
                input.style.background = '#222';
                input.style.color = '#fff';
                input.style.cssText += '-moz-appearance: textfield !important; appearance: textfield !important;';
            });

            function openTVLink(e) {
                if (e) e.preventDefault();
                const season = seasonInput.value && parseInt(seasonInput.value) > 0 ? seasonInput.value : '1';
                const episode = episodeInput.value && parseInt(episodeInput.value) > 0 ? episodeInput.value : '1';
                window.open(`https://111movies.com/tv/${imdbID}/${season}/${episode}`, '_blank');
            }

            goBtn.addEventListener('click', openTVLink);
            [seasonInput, episodeInput].forEach(input => {
                input.addEventListener('keydown', e => { if (e.key === 'Enter') openTVLink(); });
            });

            tvGroup.container.appendChild(goBtn);
            tvGroup.container.appendChild(seasonInput);
            tvGroup.container.appendChild(episodeInput);

            target.insertBefore(tvGroup.groupContainer, target.firstChild);
            console.log('✅ TV button added (native style, green).');
        } else {
            const movieGroup = createNativeButtonGroup('MOVIE');
            const goBtn = createGoButton('#28a745');

            goBtn.addEventListener('click', e => {
                e.preventDefault();
                window.open(`https://111movies.com/movie/${imdbID}`, '_blank');
            });

            movieGroup.container.appendChild(goBtn);
            target.insertBefore(movieGroup.groupContainer, target.firstChild);
            console.log('✅ MOVIE button added (native style, green).');
        }

        return true;
    }

    const intervalId = setInterval(() => {
        if (injectButton()) clearInterval(intervalId);
    }, 100);
})();
