// ==UserScript==
// @name         IMDb Test Pink Box (Debug Script)
// @namespace    https://github.com/NikoboiNFTB/IMDb-RePo
// @version      1.2
// @description  Test injection point on IMDb pages
// @match        *://*.imdb.com/title/*
// @grant        none
// @icon         https://m.media-amazon.com/images/G/01/imdb/images-ANDW73HA/favicon_iPhone_retina_180x180._CB1582158069_UX196_.png
// ==/UserScript==

(function() {
    'use strict';

    const observer = new MutationObserver((mutations, obs) => {
        const target = document.querySelector('[data-testid="hero-rating-bar__aggregate-rating"]')?.parentElement;
        if (!target || target.querySelector('.test-pink-box')) return;

        const box = document.createElement('div');
        box.className = 'test-pink-box';
        box.style.width = '100%';
        box.style.height = '50px';
        box.style.backgroundColor = 'hotpink';
        box.style.display = 'flex';
        box.style.justifyContent = 'center';
        box.style.alignItems = 'center';
        box.style.fontWeight = 'bold';
        box.textContent = 'Test Box';

        target.insertBefore(box, target.firstChild);
        console.log('✅ Pink box injected!');
        obs.disconnect();
    });

    observer.observe(document.body, { childList: true, subtree: true });
})();
