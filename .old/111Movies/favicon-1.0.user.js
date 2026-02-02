// ==UserScript==
// @name         111Movies - Add Page Favicon
// @namespace    https://github.com/NikoboiNFTB/IMDb-RePo
// @version      1.0
// @description  Injects a favicon into the site because they forgor.
// @author       you
// @match        https://111movies.com/*
// @grant        none
// @icon         https://111movies.com/assets/img/logo.png
// ==/UserScript==

(function() {
    'use strict';

    const faviconUrl = "https://111movies.com/assets/img/logo.png";

    document.querySelectorAll('link[rel="icon"], link[rel="shortcut icon"]').forEach(e => e.remove());

    const link = document.createElement("link");
    link.rel = "icon";
    link.type = "image/x-icon";
    link.href = faviconUrl;

    document.head.appendChild(link);
})();
