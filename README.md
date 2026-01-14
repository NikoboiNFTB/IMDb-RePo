# IMDb RePo: Simple & Fast Redirect Portal

Simple and Fast Redirect Portal, adds quick and easy way to access your favorite movies and TV-shows directly from the IMDb website.

## Description

**IMDb RePo** is a lightweight, dependency-free userscript that adds IMDb-style buttons to movie, TV and Episode pages for instant redirection to external streaming. Simple, fast, and smooth — Sailing the High Seas done right!

## Features

- ### Native IMDb-Style Buttons

  Blends seamlessly with IMDb’s own UI.

- ### One-Click Redirects

  On Movie pages → `https://111movies.com/movie/{IMDb-ID}`

  On TV Show pages → `https://111movies.com/tv/{IMDb-ID}/S/E`
  - Defaults to **S01E01**
  - You can prefill **Season** and **Episode** before clicking (or just hit Enter)!

  On Episode pages → `https://111movies.com/tv/{IMDb-ID}/S/E`
  - Automatically finds the Series ID, Season and Episode, and constructs the link!

- ### Instant Load

  Buttons appear as soon as possible.

- ### Tiny & Readable

  Fully self-contained. No dependencies. Easy to tweak.

## Installation

### 1. Install a Userscript Manager

- Recommended: Firefox + Violentmonkey
  - Fully Free and Open-Source, simpler setup, install screen shows notable permissions.
- [Violentmonkey for Firefox](https://addons.mozilla.org/en-US/firefox/addon/violentmonkey/)
- [Tampermonkey for Chromium](https://chromewebstore.google.com/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo)

### 2. Install the Script

- choose one way, listed most to least convenient:
  - Click [here](https://github.com/NikoboiNFTB/IMDb-RePo/raw/refs/heads/main/imdb-repo-6.1.user.js) and install when prompted.
  - Copy-paste all code into a new userscript.
  - Or download the [`.user.js`](https://github.com/NikoboiNFTB/IMDb-RePo/blob/main/imdb-repo-6.1.user.js) file manually and import it (why would you do this?).

### 3. Firefox users, you're done, enjoy!

### 4. Chromium users:

You will need to enable running scripts in Tampermonkey settings:

1. Go to `chrome://extensions/`
2. Click **Details** under Tampermonkey
3. Enable **“Allow access to file URLs”**, **“Allow User Scripts”** and **"Developer Mode"**, then hit **"Update"**
4. Re-open the IMDb tab. Reloading it wasn't enough in my testing.

## How to Use

1. Open any IMDb **Movie**, **TV Show** or **Episode** page.
2. A new button appears next to *IMDb Rating*, *Your Rating*, and *Popularity*;
   - **Watch** → Hit **Go** to redirect to **111Movies**
3. For TV shows, optionally enter:
   - **Season (S)**
   - **Episode (E)**
   - Defaults to `1/1` if blank

## **Recommended 111Movies Tweaks**

### [`Remove Player Gradient`](https://github.com/NikoboiNFTB/IMDb-RePo/raw/refs/heads/main/111Movies/111movies-gradient-1.0.user.js)
- Removes the persistent shadow overlay on the player.

### [`Hide Server`](https://github.com/NikoboiNFTB/IMDb-RePo/raw/refs/heads/main/111Movies/111movies-server-1.2.user.js)
- Hides the server button along with the rest of the Player UI.

#### [`Hide Cursor`](https://github.com/NikoboiNFTB/IMDb-RePo/raw/refs/heads/main/111Movies/111movies-cursor-1.2.user.js)
- Hides the cursor with the rest of the Player GUI when not hovering over player controls.
- Brute force, but works. Contributions for a more elegant solution are welcome.

#### [`Add Page Title`](https://github.com/NikoboiNFTB/IMDb-RePo/raw/refs/heads/main/111Movies/111movies-title-1.2.user.js)  
- Add a page title based on IMDb ID.
- For example, the title `South Park (TV Series 1997– ) - IMDb` becomes `South Park (TV Series 1997– ) - 111Movies`.

- [`Add Page Favicon`](https://github.com/NikoboiNFTB/IMDb-RePo/raw/refs/heads/main/111Movies/111movies-favicon-1.2.user.js)
  - Fetches the 111Movies logo from [`https://111movies.com/assets/img/logo.png`](https://111movies.com/assets/img/logo.png)

## Contributing

Feel free to fork this repository and submit issues or pull requests if you have any suggestions or improvements. If you encounter any bugs or have feature requests, please open an issue.

## Credits

Created by **[Nikoboi](https://github.com/NikoboiNFTB/)**  
Script logic fine-tuned with **ChatGPT**  
Styling inspired by IMDb’s native interface

## License

This project is licenced under the GNU General Public License V3. See [LICENSE](LICENSE) for details.

## ⚖️ Legal Disclaimer

IMDb RePo is a redirecting tool to a external content aggregator that scrapes publicly available sources from the internet. We do not host, upload, or store any copyrighted content on our servers. All videos, images, and links displayed on this site are gathered automatically from third-party websites. If you are a copyright owner and believe that any content found through IMDb RePo violates your rights, please be aware that we do not control or host any of the content. Any copyright infringement claims should be directed to the respective third-party sites where the content is hosted. For any DMCA takedown requests, please contact the original content provider or hosting website.  

IMDb RePo is an independent project and is not affiliated with, endorsed by, or in any way connected to IMDb.com or 111Movies.com. IMDb and 111Movies are trademarks of their respective owners, and all rights to these trademarks are acknowledged. The use of these names and references is for descriptive purposes only.
