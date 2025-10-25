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
   - Click **Raw** on [`IMDb RePo 6.0 - Simple and Fast Redirect Portal.user.js`](https://github.com/NikoboiNFTB/IMDb-RePo/blob/main/IMDb%20RePo%206.0%20-%20Simple%20and%20Fast%20Redirect%20Portal.user.js)  
   - Your userscript manager should prompt for installation.  
   - Or download the `.user.js` file manually and import it.

3. **Alternatively; Automatic Redirect Edition**  
   For automatic redirect to streaming site: [`IMDb AutoRePo 6.0 - IMDb RePo, Automatic Redirect Edition`](https://github.com/NikoboiNFTB/IMDb-RePo/blob/main/IMDb%20AutoRePo%206.0%20-%20IMDb%20RePo%2C%20Automatic%20Redirect%20Edition.user.js)
     - not recommended for watching a specific episode of a series.

5. **Recommended 111Movies Tweaks**  

   - [`111Movies - Fetch Title`](https://github.com/NikoboiNFTB/IMDb-RePo/blob/main/111Movies%20-%20Fetch%20Title%201.0.user.js)  
     Fetches the proper title from IMDb and updates the browser tab.  

   - [`111Movies - Hide Cursor`](https://github.com/NikoboiNFTB/IMDb-RePo/blob/main/111Movies%20-%20Hide%20Cursor%201.0.user.js)  
     Removes the persistent shadow overlay on the player.  

   - [`111Movies - Hide Server`](https://github.com/NikoboiNFTB/IMDb-RePo/blob/main/111Movies%20-%20Hide%20Server%201.1.user.js)  
     Dynamically hides the server button along with the player controls.  

   - [`111Movies - Remove Gradient`](https://github.com/NikoboiNFTB/IMDb-RePo/blob/main/111Movies%20-%20Remove%20Gradient%201.0.user.js)  
     Hides the cursor when not hovering over player controls.  
     - Brute force, but works. Contributions for a more elegant solution are welcome.

   - [`111Movies - Add Favicon`](https://github.com/NikoboiNFTB/IMDb-RePo/blob/main/111Movies%20-%20Remove%20Gradient%201.0.user.js)
     - Similarly to `111Movies - Fetch Title`, this fetches the 111Movies logo and adds it as Favicon.

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
