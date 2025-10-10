# IMDb RePo: Simple and Fast Redirect Portal

**IMDb RePo** is a lightweight, no-dependency userscript that adds buttons to IMDb movie and TV show pages. These buttons allow instant redirection (hence the name, RePo) to an external streaming service, making your browsing experience faster and smoother.

---

## 🎯 Features

- 🟡 **Native IMDb-style Buttons**  
  Seamlessly integrates next to IMDb’s own buttons, preserving the aesthetic.

- 🎬 **One-click Redirect to Streaming**  
  - Movie button → `https://111movies.com/movie/{IMDb-ID}`
  - TV button → `https://111movies.com/tv/{IMDb-ID}/S/E`  
      - You can even specify **season** and **episode** before clicking! (you can also just hit enter)

- ⚡ **Fast-Loading Buttons**  
  No waiting for the full page to render—buttons appear almost instantly.

- 🧩 **Tiny & Dependency-Free**  
  Script is self-contained, readable, and easily tweakable.

---

## 🛠 Installation

1. Install a userscript manager (Firefox + Tampermonkey recommended):
   - [Tampermonkey (Firefox)](https://addons.mozilla.org/en-US/firefox/addon/tampermonkey/)
   - [Tampermonkey (Chromium)](https://chromewebstore.google.com/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo)
   - (Violentmonkey and Greasemonkey allegedly work, but are not officially supported or endorsed by the IMDb RePo project.)

2. Install the script:
   - Click the **Raw** button on [`IMDb RePo 2.1 - Simple and Fast Redirect Portal.user.js`](https://github.com/NikoboiNFTB/IMDb-RePo/blob/main/IMDb%20RePo%202.1%20-%20Simple%20and%20Fast%20Redirect%20Portal.user.js)
   - Your userscript manager will prompt you to install it.
   - Alternatively, download the user.js and import it to your userscript injector.

3. Done!

> **Heads-up for Chrome/Edge/Brave users:**  
> After installing Tampermonkey, make sure it’s allowed to run userscripts:
>
> - Go to `chrome://extensions/` (or `edge://extensions/` etc.)
> - Click **“Details”** under Tampermonkey
> - Enable **“Allow User Scripts”** (you may need to toggle Developer Mode first)
> - Refresh IMDb to ensure it kicks in  
>
> If you skip this, the script won’t work—even if it’s installed!

---

## 📦 How to Use

1. **Go to any IMDb title page** (movie or show).
2. You'll see a new button next to IMDb RATING, YOUR RATING and POPULARITY:
   - **MOVIE** → Redirects you to 111movies.com/movie
   - or
   - **TV** → Redirects you to 111movies.com/tv
3. For TV shows, optionally enter:
   - **Season (`S`)**
   - **Episode (`E`)**
   - Defaults to `1/1` if left blank
4. Click **Go** — Enjoy!

---

## 🚧 Limitations

- This tool does not verify content availability on the target site (but it should be, hasn't failed me yet).
- Only works on IMDb URLs in the `/title/ttXXXXXXX/` format (which is all of them).
- Hardcoded to use `111movies.com` as the redirect base (but you're free to fork/commit to add choices).

---

## 🤝 Credits

- Created by Nikoboi
- Script logic engineered with ChatGPT
- Iconography and button styling inspired by IMDb's native UI.

---

## 📜 License

This project is released under the GPLv3 License. Feel free to fork, modify, or redistribute with attribution.
