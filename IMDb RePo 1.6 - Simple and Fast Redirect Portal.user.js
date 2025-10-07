// ==UserScript==
// @name         IMDb RePo: Simple and Fast Redirect Portal
// @namespace    https://github.com/NikoboiNFTB/IMDb-RePo
// @version      1.6
// @description  Adds buttons to IMDb for redirecting to 111movies.com using the IMDb ID dynamically, with season/episode inputs for TV.
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

    function createIMDbButtonGroup(labelText) {
        const groupContainer = document.createElement('div');
        groupContainer.className = 'sc-9d3bc82f-0 ipxRZe rating-bar__base-button';

        const label = document.createElement('div');
        label.className = 'sc-9d3bc82f-1 lhxLQH';
        label.textContent = labelText;

        groupContainer.appendChild(label);
        return groupContainer;
    }

    function injectButtonGroups() {
        const targetSelector = '.sc-8e956c5c-1.dzAXeE';
        const target = document.querySelector(targetSelector);
        if (!target) return false;

        const imdbID = getIMDbID();
        if (!imdbID) {
            console.warn('❌ IMDb ID not found in URL.');
            return false;
        }

        // MOVIE Button group
        const movieGroup = createIMDbButtonGroup('MOVIE');
        const movieButton = document.createElement('a');
        movieButton.className = 'ipc-btn ipc-btn--single-padding ipc-btn--center-align-content ipc-btn--default-height ipc-btn--core-baseAlt ipc-btn--theme-baseAlt ipc-btn--button-radius ipc-btn--on-textPrimary ipc-text-button';
        movieButton.setAttribute('tabindex', '0');
        movieButton.setAttribute('role', 'button');
        movieButton.href = '#';
        movieButton.style.userSelect = 'none';

        const movieSpan = document.createElement('span');
        movieSpan.className = 'ipc-btn__text';
        movieSpan.textContent = 'Go';
        movieButton.appendChild(movieSpan);

        movieButton.addEventListener('click', e => {
            e.preventDefault();
            const url = `https://111movies.com/movie/${imdbID}`;
            window.open(url, '_blank');
        });

        movieGroup.appendChild(movieButton);

        // TV Button group
        const tvGroup = createIMDbButtonGroup('TV');

        const inputButtonContainer = document.createElement('div');
        inputButtonContainer.style.display = 'flex';
        inputButtonContainer.style.alignItems = 'center';
        inputButtonContainer.style.gap = '8px';

        const tvButton = document.createElement('a');
        tvButton.className = 'ipc-btn ipc-btn--single-padding ipc-btn--center-align-content ipc-btn--default-height ipc-btn--core-baseAlt ipc-btn--theme-baseAlt ipc-btn--button-radius ipc-btn--on-textPrimary ipc-text-button';
        tvButton.setAttribute('tabindex', '0');
        tvButton.setAttribute('role', 'button');
        tvButton.href = '#';
        tvButton.style.userSelect = 'none';

        const tvSpan = document.createElement('span');
        tvSpan.className = 'ipc-btn__text';
        tvSpan.textContent = 'Go';
        tvButton.appendChild(tvSpan);

        const seasonInput = document.createElement('input');
        seasonInput.type = 'number';
        seasonInput.min = '1';
        seasonInput.placeholder = 'S';
        seasonInput.style.width = '30px';
        seasonInput.style.height = '30px';
        seasonInput.style.padding = '4px 6px';
        seasonInput.style.borderRadius = '4px';
        seasonInput.style.border = '1px solid #ccc';
        seasonInput.style.fontSize = '14px';
        seasonInput.style.textAlign = 'center';
        seasonInput.style.userSelect = 'text';

        const episodeInput = document.createElement('input');
        episodeInput.type = 'number';
        episodeInput.min = '1';
        episodeInput.placeholder = 'E';
        episodeInput.style.width = '30px';
        episodeInput.style.height = '30px';
        episodeInput.style.padding = '4px 6px';
        episodeInput.style.borderRadius = '4px';
        episodeInput.style.border = '1px solid #ccc';
        episodeInput.style.fontSize = '14px';
        episodeInput.style.textAlign = 'center';
        episodeInput.style.userSelect = 'text';

        const spinnerStyles = `
            -moz-appearance: textfield !important;
            appearance: textfield !important;
        `;
        seasonInput.style.cssText += spinnerStyles;
        episodeInput.style.cssText += spinnerStyles;

        // Helper function: open TV link
        function openTVLink() {
            const season = seasonInput.value && parseInt(seasonInput.value) > 0 ? seasonInput.value : '1';
            const episode = episodeInput.value && parseInt(episodeInput.value) > 0 ? episodeInput.value : '1';
            const url = `https://111movies.com/tv/${imdbID}/${season}/${episode}`;
            window.open(url, '_blank');
        }

        // Click listener for TV Go button
        tvButton.addEventListener('click', e => {
            e.preventDefault();
            openTVLink();
        });

        // Trigger redirect on Enter key inside either input
        [seasonInput, episodeInput].forEach(input => {
            input.addEventListener('keydown', e => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    openTVLink();
                }
            });
        });

        inputButtonContainer.appendChild(tvButton);
        inputButtonContainer.appendChild(seasonInput);
        inputButtonContainer.appendChild(episodeInput);

        tvGroup.appendChild(inputButtonContainer);

        target.appendChild(movieGroup);
        target.appendChild(tvGroup);

        console.log('✅ IMDb redirect buttons with inputs and Enter key added.');
        return true;
    }

    const intervalId = setInterval(() => {
        if (injectButtonGroups()) {
            clearInterval(intervalId);
        }
    }, 100);
})();
