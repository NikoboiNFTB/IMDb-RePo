// ==UserScript==
// @name         111Movies - Add Page Favicon
// @namespace    https://github.com/NikoboiNFTB/IMDb-RePo
// @downloadURL  https://github.com/NikoboiNFTB/IMDb-RePo/raw/refs/heads/main/111Movies/favicon.user.js
// @version      1.2
// @description  Injects a favicon into the site because they forgot to include one.
// @author       Nikoboi
// @match        https://111movies.com/*
// @grant        none
// @icon         https://111movies.com/assets/img/logo.png
// ==/UserScript==

(function () {
    'use strict';

    var faviconUrl = "https://111movies.com/assets/img/logo.png";

    function removeExistingFavicons() {
        var selectors = 'link[rel="icon"], link[rel="shortcut icon"]';
        var existingLinks = document.querySelectorAll(selectors);

        for (var i = 0; i < existingLinks.length; i++) {
            var element = existingLinks[i];
            if (element && element.parentNode) {
                element.parentNode.removeChild(element);
            }
        }
    }

    function addNewFavicon(url) {
        var newLink = document.createElement("link");
        newLink.setAttribute("rel", "icon");
        newLink.setAttribute("type", "image/x-icon");
        newLink.setAttribute("href", url);

        document.head.appendChild(newLink);
    }

    removeExistingFavicons();
    addNewFavicon(faviconUrl);

})();
