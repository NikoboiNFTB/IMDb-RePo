// ==UserScript==
// @name         IMDb to 111movies Redirect
// @namespace    https://github.com/NikoboiNFTB/IMDb-RePo/
// @version      1.1
// @description  Redirects IMDb movie/TV show pages to my custom GitHub Pages 111movies.com viewer, which I don't even know if it's up anymore.
// @author       Nikoboi
// @match        https://www.imdb.com/title/tt*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // *** IMPORTANT: Replace this with your actual GitHub Pages URL ***
    // This is the base URL of your GitHub Pages site where index.html is hosted.
    const GITHUB_PAGES_BASE_URL = 'https://NikoboiNFTB.github.io/imdb-111movies-redirect/';

    // Function to extract the ttID from the IMDb URL
    function getTtId() {
        const match = window.location.pathname.match(/\/title\/(tt\d+)/);
        return match ? match[1] : null;
    }

    const ttId = getTtId();

    if (ttId) {
        // Create the container for the redirect options
        const redirectContainer = document.createElement('div');
        redirectContainer.id = 'imdb-redirect-panel';
        redirectContainer.style.position = 'fixed';
        redirectContainer.style.top = '10px';
        redirectContainer.style.right = '10px';
        redirectContainer.style.backgroundColor = '#2c3e50'; // Dark blue-gray
        redirectContainer.style.color = '#ecf0f1'; // Light gray text
        redirectContainer.style.padding = '10px 15px';
        redirectContainer.style.borderRadius = '8px';
        redirectContainer.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
        redirectContainer.style.zIndex = '99999';
        redirectContainer.style.fontFamily = 'Arial, sans-serif';
        redirectContainer.style.fontSize = '14px';
        redirectContainer.style.display = 'flex';
        redirectContainer.style.flexDirection = 'column';
        redirectContainer.style.gap = '8px';

        // Add a title/label
        const titleLabel = document.createElement('span');
        titleLabel.textContent = 'View on your 111movies site:';
        titleLabel.style.marginBottom = '5px';
        titleLabel.style.fontWeight = 'bold';
        redirectContainer.appendChild(titleLabel);

        // Create the "As Movie" button
        const movieButton = document.createElement('button');
        movieButton.textContent = 'As Movie';
        movieButton.style.backgroundColor = '#3498db'; // Blue
        movieButton.style.color = 'white';
        movieButton.style.border = 'none';
        movieButton.style.padding = '8px 12px';
        movieButton.style.borderRadius = '5px';
        movieButton.style.cursor = 'pointer';
        movieButton.style.transition = 'background-color 0.2s ease';
        movieButton.onmouseover = () => movieButton.style.backgroundColor = '#2980b9'; // Darker blue on hover
        movieButton.onmouseout = () => movieButton.style.backgroundColor = '#3498db';
        movieButton.onclick = () => {
            // Construct the URL for your GitHub Pages site with ttid and type=movie
            const redirectUrl = `${GITHUB_PAGES_BASE_URL}?ttid=${ttId}&type=movie`;
            window.location.replace(redirectUrl);
        };
        redirectContainer.appendChild(movieButton);

        // Create the "As TV Show" button
        const tvButton = document.createElement('button');
        tvButton.textContent = 'As TV Show';
        tvButton.style.backgroundColor = '#2ecc71'; // Green
        tvButton.style.color = 'white';
        tvButton.style.border = 'none';
        tvButton.style.padding = '8px 12px';
        tvButton.style.borderRadius = '5px';
        tvButton.style.cursor = 'pointer';
        tvButton.style.transition = 'background-color 0.2s ease';
        tvButton.onmouseover = () => tvButton.style.backgroundColor = '#27ae60'; // Darker green on hover
        tvButton.onmouseout = () => tvButton.style.backgroundColor = '#2ecc71';
        tvButton.onclick = () => {
            // Construct the URL for your GitHub Pages site with ttid and type=tv
            const redirectUrl = `${GITHUB_PAGES_BASE_URL}?ttid=${ttId}&type=tv`;
            window.location.replace(redirectUrl);
        };
        redirectContainer.appendChild(tvButton);

        // Append the container to the body
        document.body.appendChild(redirectContainer);
    }
})();
