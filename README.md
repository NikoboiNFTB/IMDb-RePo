⚠️ Update regular versions 3.0-4.1 to 5.0, and AutoRePo from 2.0 to 3.0, they don't work on 99% of pages ⚠️
# 🎬 IMDb RePo: Simple & Fast Redirect Portal

**IMDb RePo** is a lightweight, dependency-free userscript that adds IMDb-style buttons to movie and TV pages for instant redirection to external streaming. Simple, fast, and smooth — Sailing the High Seas done right!

---

## 🚀 Features

- 🟡 **Native IMDb-Style Buttons**  
  Blends seamlessly with IMDb’s own UI.

- 🎬 **One-Click Redirects**  
  - Movies → `https://111movies.com/movie/{IMDb-ID}`  
  - TV Shows → `https://111movies.com/tv/{IMDb-ID}/S/E`  
    - You can even prefill **season** and **episode** before clicking (or just hit Enter).

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
   - Click **Raw** on [`IMDb RePo 5.0 - Simple and Fast Redirect Portal.user.js`](https://github.com/NikoboiNFTB/IMDb-RePo/blob/main/IMDb%20RePo%205.0%20-%20Simple%20and%20Fast%20Redirect%20Portal.user.js)  
   - Your userscript manager should prompt for installation.  
   - Or download the `.user.js` file manually and import it.

3. **Alternatively; Automatic Redirect Edition**  
   For automatic redirect to streaming site: [`IMDb AutoRePo 3.0 - IMDb RePo, Automatic Redirect Edition`](https://github.com/NikoboiNFTB/IMDb-RePo/blob/main/IMDb%20AutoRePo%203.0%20-%20IMDb%20RePo%2C%20Automatic%20Redirect%20Edition.user.js)

4. **Recommended Add-on**  
   [`111Movies Tweaks 3.0.user.js`](https://github.com/NikoboiNFTB/IMDb-RePo/blob/main/111Movies%20Tweaks%203.0.user.js)  
   - Removes the persistent shadow overlay.  
   - Hides the cursor (brute-force, but works).  
     - Contributions for a more elegant solution are welcome.
   - Version 3.1 also hides the persistent server button. This is separate because some may want the server button. 
     - [`111Movies Tweaks 3.1.user.js`](https://github.com/NikoboiNFTB/IMDb-RePo/blob/main/111Movies%20Tweaks%203.1.user.js)  

5. **Done. Enjoy.**

> **Chrome / Edge / Brave Users:**  
> Make sure Tampermonkey can actually *run* userscripts:  
> - Go to `chrome://extensions/` (or equivalent)  
> - Click **Details** under Tampermonkey  
> - Enable **“Allow access to file URLs”** and **“Allow User Scripts”** (toggle Developer Mode if needed)  
> - Refresh IMDb afterward

---

## 💡 How to Use

1. Open any **IMDb movie or show** page.  
2. A new button appears next to *IMDb Rating*, *Your Rating*, and *Popularity*, either;  
   - **MOVIE** → Redirects to 111movies.com/movie  
   - **TV** → Redirects to 111movies.com/tv  
3. For TV shows, optionally enter:  
   - **Season (S)**  
   - **Episode (E)**  
   - Defaults to `1/1` if blank  
4. Click **Go** and you’re there.

---

## ⚠️ Limitations

- Doesn’t check if the content actually exists (though it usually does, new releases are usually available within a day or two).  
- Redirect domain is hardcoded to `111movies.com` (feel free to fork and change it).
- [FIXED IN 3.0] In theory, very slow internet could cause a **TV** page to load with a **MOVIE** button, since the script detects page type before IMDb fully loads.
  - This has never been observed, but please report it if it happens.
  - Any self-correcting solution would add overhead or reduce speed, so it’s not a fix priority until confirmed.

---

## 🤝 Credits

- Created by **Nikoboi**  
- Script logic fine-tuned with **ChatGPT**  
- Styling inspired by IMDb’s native interface  

---

## 📜 License

Released under the **GPLv3 License**
