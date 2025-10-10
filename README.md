# IMDb RePo: Simple and Fast Redirect Portal

**IMDb RePo** is a lightweight, no-dependency userscript that adds native-style buttons to IMDb movie and TV show pages. These buttons allow instant redirection to an external streaming portal using the IMDb ID—making your browsing experience faster and smoother.

---

## 🎯 Features

- 🟡 **Native IMDb-style Buttons**  
  Seamlessly integrates next to IMDb’s own buttons, preserving the aesthetic.

- 🎬 **One-click Redirect to Streaming**  
  - Movie button → `https://111movies.com/movie/{IMDb-ID}`
  - TV button → `https://111movies.com/tv/{IMDb-ID}/S/E`  
    You can even specify **season** and **episode** before clicking!

- ⚡ **Fast-Loading Buttons**  
  No waiting for the full page to render—buttons appear almost instantly.

- 🧩 **Tiny & Dependency-Free**  
  Script is self-contained, readable, and easily tweakable.

---

## 🛠 Installation

1. Install a userscript manager (Firefox + Tampermonkey recommended, not tested on any other combination):
   - [Tampermonkey (Firefox, Chrome, Edge)](https://tampermonkey.net/)
   - [Violentmonkey (Firefox, Chromium)](https://violentmonkey.github.io/)
   - [Greasemonkey (Firefox)](https://www.greasespot.net/)

2. Install the script:
   - Click the **Raw** button on [`imdb-repo.user.js`](https://github.com/NikoboiNFTB/IMDb-RePo/blob/main/IMDb%20RePo-%20Simple%20and%20Fast%20Redirect%20Portal-2.1.user.js)
   - Your userscript manager will prompt you to install it
   - Alternatively, download the user.js and import it to your userscript injector

3. Done!

> **Heads-up for Chrome/Edge/Brave users:**  
> After installing Tampermonkey, make sure it’s allowed to run userscripts:
>
> - Go to `chrome://extensions/` (or `edge://extensions/`)
> - Click **“Details”** under Tampermonkey
> - Enable **“Allow user scripts”** (you may need to toggle Developer Mode first)
> - Refresh IMDb to ensure it kicks in  
>
> If you skip this, the script won’t work—even if it’s installed!

---

## 📦 How to Use

1. **Go to any IMDb title page** (movie or show).
2. You'll see two new buttons:
   - **MOVIE** → Redirects you to 111movies.com/movie
   - **TV** → Redirects you to 111movies.com/tv
3. For TV shows, optionally enter:
   - **Season (`S`)**
   - **Episode (`E`)**
   - Defaults to `1/1` if left blank
4. Click **Go** — done!

---

## 🚧 Limitations

- This tool does not verify content availability on the target site (but it should be, hasn't failed me yet).
- Only works on IMDb URLs in the `/title/ttXXXXXXX/` format (which is all of them).
- Hardcoded to use `111movies.com` as the redirect base (but you're free to fork/commit to add choices).

---

## 🤝 Credits

Created with 💻 by [Nikoboi]  
Iconography and button styling inspired by IMDb's native UI.

---

## 📜 License

This project is released under the GPLv3 License. Feel free to fork, modify, or redistribute with attribution.
