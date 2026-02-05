// ==UserScript==
// @name         111Movies - Hide Cursor
// @namespace    https://github.com/NikoboiNFTB/IMDb-RePo
// @downloadURL  https://github.com/NikoboiNFTB/IMDb-RePo/raw/refs/heads/main/111Movies/cursor.user.js
// @version      1.2
// @description  Hides cursor when not near UI controls. Slightly more intelligent with timing. Brute force, but works.
// @author       Nikoboi
// @icon         https://111movies.com/assets/img/logo.png
// @match        *://111movies.com/*
// @run-at       document-idle
// ==/UserScript==

(function() {
  'use strict';

  const controlsSelectors = ['.css-9sg0ji', '.css-jqsnhq', '.css-1xqa3sa'];
  const mainPlayer = document.querySelector('.mainplayer');
  if (!mainPlayer) return;

  function isOverControls(target) {
    return !!controlsSelectors.some(sel => target && target.closest && target.closest(sel));
  }

  // exact same hide/show logic as your original script
  function applyCursorHide(e) {
    const x = e.clientX, y = e.clientY;
    const vw = window.innerWidth, vh = window.innerHeight;
    const edgeX = vw * 0.0, edgeY = vh * 0.0;
    const overControls = isOverControls(e.target);

    if (!overControls && x > edgeX && x < vw - edgeX && y > edgeY && y < vh - edgeY) {
      document.querySelectorAll('*').forEach(el => el.style.cursor = 'none');
    } else {
      document.querySelectorAll('*').forEach(el => el.style.cursor = '');
    }
  }

  // keep a reference so we can add/remove the exact same handler
  const mouseHandler = function(e) { applyCursorHide(e); };

  // helper: run a synthetic check using the current pointer location (or center fallback)
  function runImmediateCheck() {
    // try to use last known pointer via document.pointerLockElement or elementFromPoint
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    // try to find a realistic target under the cursor if possible
    const realX = (typeof window._lastMouseX === 'number') ? window._lastMouseX : cx;
    const realY = (typeof window._lastMouseY === 'number') ? window._lastMouseY : cy;
    const tgt = document.elementFromPoint(realX, realY) || document.body;
    applyCursorHide({ clientX: realX, clientY: realY, target: tgt });
  }

  // keep last mouse coords so synthetic check is accurate if the user moved earlier
  window.addEventListener('mousemove', e => {
    window._lastMouseX = e.clientX;
    window._lastMouseY = e.clientY;
  }, { passive: true });

  // Toggle the continuous mousemove handler based on controls visibility
  function onControlsClassChange() {
    if (mainPlayer.classList.contains('controls_visible')) {
      // Controls visible -> remove active hiding behavior and restore cursor
      document.removeEventListener('mousemove', mouseHandler, true);
      document.querySelectorAll('*').forEach(el => el.style.cursor = '');
    } else {
      // Controls hidden -> enable the identical spatial logic on mousemove
      // use capture to catch events reliably
      document.addEventListener('mousemove', mouseHandler, true);
      // run an immediate check so we don't wait for next physical mousemove
      runImmediateCheck();
    }
  }

  // Observe class changes on the player (same timing mechanism as your Hide Server script)
  const observer = new MutationObserver(onControlsClassChange);
  observer.observe(mainPlayer, { attributes: true, attributeFilter: ['class'] });

  // Initialize according to current state
  onControlsClassChange();
})();
