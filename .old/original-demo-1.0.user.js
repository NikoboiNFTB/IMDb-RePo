// ==UserScript==
// @name         IMDb to 111movies Redirect
// @namespace    https://github.com/NikoboiNFTB/IMDb-RePo/
// @version      1.0
// @description  Quickly redirect IMDb movie/TV show pages to 111movies.com! You have to manually choose whether it's a movie or TV show because IMDb uses the same link structure for movies and tv, which 111movies doesn't do. They are not interchangeable.
// @author       Nikoboi
// @match        https://www.imdb.com/title/tt*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Function to extract the ttID from the URL
    function getTtId() {
        const match = window.location.pathname.match(/\/title\/(tt\d+)/);
        return match ? match[1] : null;
    }

    const ttId = getTtId();

    if (ttId) {
        // Create the container for the redirect buttons
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
        titleLabel.textContent = 'Redirect to 111movies:';
        titleLabel.style.marginBottom = '5px';
        titleLabel.style.fontWeight = 'bold';
        redirectContainer.appendChild(titleLabel);

        // Create the "Movie" button
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
            window.location.replace(`https://111movies.com/movie/${ttId}`);
        };
        redirectContainer.appendChild(movieButton);

        // Create the "TV Show" button
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
            window.location.replace(`https://111movies.com/tv/${ttId}/1/1`);
        };
        redirectContainer.appendChild(tvButton);

        // Append the container to the body
        document.body.appendChild(redirectContainer);
    }
})();
