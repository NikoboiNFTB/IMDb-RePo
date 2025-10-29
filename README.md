# 🎬 IMDb RePo: Simple & Fast Redirect Portal

**IMDb RePo** is a lightweight, dependency-free userscript that adds IMDb-style buttons to movie, TV and Episode pages for instant redirection to external streaming. Simple, fast, and smooth — Sailing the High Seas done right!

---

## 🚀 Features

- 🟡 **Native IMDb-Style Buttons**  
  Blends seamlessly with IMDb’s own UI.

- 🎬 **One-Click Redirects**  
  - On Movie pages → `https://111movies.com/movie/{IMDb-ID}`  
  - On TV Show pages → `htps://111movies.com/tv/{IMDb-ID}/S/E`  
    - You can even prefill **season** and **episode** before clicking (or just hit Enter)!
  - On Episode pages → `https://111movies.com/tv/{IMDb-ID}/S/E`
    - Automatically finds the Series ID and constructs the link!

- ⚡ **Instant Load**  
  Buttons appear before the full page finishes loading.

- 🧩 **Tiny & Readable**  
  Fully self-contained. No dependencies. Easy to tweak.

---

## 🛠 Installation

1. **Install a Userscript Manager**  
   Recommended: Firefox + Tampermonkey  
   - [Tampermonkey (Firefox)](https://addons.mozilla.org/en-US/firefox/addon/tampermonkey/)  
   - [Tampermonkey (Chromium)](https://chromewebstore.google.com/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo)  
   *(Violentmonkey and Greasemonkey may work, but aren’t officially supported.)*

2. **Install the Script**  
   - Click [here](https://github.com/NikoboiNFTB/IMDb-RePo/raw/refs/heads/main/IMDb-RePo-6.0.user.js) and install when prompted.
   - Your userscript manager should prompt for installation.  
   - Or download the `.user.js` file manually and import it.

3. **Alternatively; Automatic Redirect Edition**  
   For automatic redirect to streaming site: Click [here](https://github.com/NikoboiNFTB/IMDb-RePo/raw/refs/heads/main/IMDb-AutoRePo-6.0.user.js)
     - Not recommended for watching a specific episode of a series, or in general, really.

5. **Recommended 111Movies Tweaks**  

   - [`Remove Player Gradient`](https://github.com/NikoboiNFTB/IMDb-RePo/raw/refs/heads/main/111Movies-Gradient-1.0.user.js)  
     Removes the persistent shadow overlay on the player.  

   - [`Hide Server`](https://github.com/NikoboiNFTB/IMDb-RePo/raw/refs/heads/main/111Movies-Server-1.1.user.js)  
     Hides the server button along with the rest of the Player UI.

   - [`Hide Cursor`](https://github.com/NikoboiNFTB/IMDb-RePo/raw/refs/heads/main/111Movies-Cursor-1.1.user.js)  
     Hides the cursor with the rest of the Player GUI when not hovering over player controls.  
     - Brute force, but works. Contributions for a more elegant solution are welcome.

   - [`Add Page Title`](https://github.com/NikoboiNFTB/IMDb-RePo/raw/refs/heads/main/111Movies-Title-1.0.user.js)  
     Add a page title based on IMDb ID.
     - For example, the title `South Park (TV Series 1997– ) - IMDb` becomes `South Park (TV Series 1997– ) - 111Movies`.

   - [`Add Page Favicon`](https://github.com/NikoboiNFTB/IMDb-RePo/raw/refs/heads/main/111Movies-Favicon-1.0.user.js)  
     Fetches the 111Movies logo from [`https://111movies.com/assets/img/logo.png`](https://111movies.com/assets/img/logo.png)

6. **Done. Enjoy.**

> **Chrome / Edge / Brave Users:**  
> Make sure Tampermonkey can actually *run* userscripts:  
> - Go to `chrome://extensions/` (or equivalent)  
> - Click **Details** under Tampermonkey  
> - Enable **“Allow access to file URLs”**, **“Allow User Scripts”** and **"Developer Mode"**, then hit **"Update"**
>   - Yes, this is annoying.
>   - Yes, it's Chromium's fault.
>   - No, I can't fix this. 
> - Re-open the IMDb tab. Reloading wasn't enough in my testing. 

---

## 💡 How to Use

1. Open any **IMDb movie**, **TV Show** or **Episode** page.  
2. A new button appears next to *IMDb Rating*, *Your Rating*, and *Popularity*;  
   - **Watch** → Hit **Go** to redirect to **111Movies**  
3. For TV shows, optionally enter:  
   - **Season (S)**  
   - **Episode (E)**  
   - Defaults to `1/1` if blank  

---

## ⚠️ Limitations

- Doesn’t check if the content actually exists (though it usually does, new releases are usually available within a day or two).  
- Redirect domain is hardcoded to `111movies.com` (feel free to fork and change it).

---

## 🤝 Credits

- Created by **Nikoboi**  
- Script logic fine-tuned with **ChatGPT**  
- Styling inspired by IMDb’s native interface  

---

## 📜 License

Released under the **GPLv3 License**

DMCA Disclaimer IMDb RePo is a content aggregator that scrapes publicly available sources from the internet. We do not host, upload, or store any copyrighted content on our servers. All videos, images, and links displayed on this site are gathered automatically from third-party websites. If you are a copyright owner and believe that any content found through IMDb RePo violates your rights, please be aware that we do not control or host any of the content. Any copyright infringement claims should be directed to the respective third-party sites where the content is hosted. For any DMCA takedown requests, please contact the original content provider or hosting website.
