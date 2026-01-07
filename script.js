/* =========================================================
   21 Modal Manager
   - Uses History API for true Back navigation:
     open modal -> pushState({ modalId })
     back -> popstate -> show previous modal (or none)
   - Works for nested modals (CapCut -> Emotions -> Back)
   - ESC closes (history.back)
   - Click outside closes (history.back)
   - Converts the existing × buttons into "← Back" automatically
   - Locks scroll while any modal is open
   - Handles theme toggle + stores theme in localStorage
   ========================================================= */

(function () {
  "use strict";

  const qs = (s, r = document) => r.querySelector(s);
  const qsa = (s, r = document) => Array.from(r.querySelectorAll(s));

  const modals = new Map(); // id -> element
  const root = document.documentElement;

  let lastFocused = null;

  function initModals() {
    qsa(".modal").forEach(m => {
      if (m.id) modals.set(m.id, m);
      // Ensure hidden at start
      m.classList.remove("is-open");
      m.setAttribute("aria-hidden", "true");

      // Clicking the shaded overlay (outside the content) should go back
      m.addEventListener("mousedown", (e) => {
        const content = qs(".modal-content", m);
        if (!content) return;
        if (!content.contains(e.target)) {
          // go back one state (close current modal / return to previous)
          safeHistoryBack();
        }
      });
    });

    // Convert all modal close buttons into a Back pill (without changing markup)
    qsa("[data-modal-close]").forEach(btn => {
      // Keep aria-label "Back" from HTML; if not present, set it.
      if (!btn.getAttribute("aria-label")) btn.setAttribute("aria-label", "Back");
      // Visual text to match a back button
      btn.textContent = "← Back";
      btn.classList.add("modal-back");
      btn.addEventListener("click", () => safeHistoryBack());
    });
  }

  function initLaunchers() {
    // Any element with data-modal-target opens that modal
    document.addEventListener("click", (e) => {
      const opener = e.target.closest("[data-modal-target]");
      if (!opener) return;

      const sel = opener.getAttribute("data-modal-target");
      if (!sel || !sel.startsWith("#")) return;

      const id = sel.slice(1);
      if (!modals.has(id)) return;

      e.preventDefault();
      openModal(id);
    });
  }

  function openModal(modalId) {
    // Save focus so we can restore when all modals close
    if (!lastFocused) lastFocused = document.activeElement;

    // Push history state representing this modal
    // If the current state is already this modal, don't push again.
    const current = history.state && history.state.__modalId;
    if (current !== modalId) {
      history.pushState({ __modalId: modalId }, "", `#${modalId}`);
    }

    // Showing is handled by popstate too, but we apply immediately for responsiveness
    showOnly(modalId);
  }

  function showOnly(modalIdOrNull) {
    // Toggle each modal on/off
    modals.forEach((m, id) => {
      const isOpen = (modalIdOrNull === id);
      m.classList.toggle("is-open", isOpen);
      m.setAttribute("aria-hidden", isOpen ? "false" : "true");
    });

    const anyOpen = !!modalIdOrNull;
    document.body.classList.toggle("modal-open", anyOpen);

    if (anyOpen) {
      // Move focus inside modal for accessibility
      const modal = modals.get(modalIdOrNull);
      focusFirst(modal);
    } else {
      // Restore focus when all modals closed
      if (lastFocused && typeof lastFocused.focus === "function") {
        lastFocused.focus();
      }
      lastFocused = null;

      // Clean hash (optional). Not strictly necessary, but keeps URL clean.
      // We avoid replaceState to not break the user's back stack.
      if (location.hash) {
        history.replaceState({ __modalId: null }, "", location.pathname + location.search);
      }
    }
  }

  function focusFirst(modal) {
    if (!modal) return;
    const content = qs(".modal-content", modal);
    if (!content) return;

    // Prefer the back button, otherwise first focusable
    const backBtn = qs("[data-modal-close]", content) || qs("[data-modal-close]", modal);
    const target = backBtn || firstFocusable(content) || content;
    if (target && typeof target.focus === "function") {
      // Make content focusable as fallback
      if (target === content && !content.hasAttribute("tabindex")) {
        content.setAttribute("tabindex", "-1");
      }
      target.focus({ preventScroll: true });
    }
  }

  function firstFocusable(rootEl) {
    const focusables = qsa(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      rootEl
    ).filter(el => !el.disabled && el.getAttribute("aria-hidden") !== "true");

    return focusables[0] || null;
  }

  function safeHistoryBack() {
    // If there is a modal state, back should go to previous modal (or none).
    // If there isn't, do nothing.
    const st = history.state && history.state.__modalId;
    if (st) history.back();
    else showOnly(null);
  }

  function initPopstate() {
    // Ensure base state exists
    if (!history.state || typeof history.state.__modalId === "undefined") {
      history.replaceState({ __modalId: null }, "", location.pathname + location.search + location.hash);
    }

    // On browser back/forward, show the modal referenced by state (or none)
    window.addEventListener("popstate", (e) => {
      const id = e.state && e.state.__modalId ? e.state.__modalId : null;
      if (id && modals.has(id)) showOnly(id);
      else showOnly(null);
    });

    // If page loads with a hash that matches a modal id, open it (no push)
    const initialHash = (location.hash || "").replace("#", "");
    if (initialHash && modals.has(initialHash)) {
      history.replaceState({ __modalId: initialHash }, "", `#${initialHash}`);
      showOnly(initialHash);
    } else {
      showOnly(null);
    }
  }

  function initEscClose() {
    document.addEventListener("keydown", (e) => {
      if (e.key !== "Escape") return;
      const st = history.state && history.state.__modalId;
      if (st) {
        e.preventDefault();
        history.back();
      }
    });
  }

  function initTheme() {
    const btn = qs("#themeToggle");
    if (!btn) return;

    function apply(theme) {
      root.setAttribute("data-theme", theme);
      try { localStorage.setItem("theme", theme); } catch (e) {}

      // Icon hint only (not required)
      btn.textContent = theme === "dark" ? "☀️" : "🌙";
    }

    btn.addEventListener("click", () => {
      const current = root.getAttribute("data-theme") || "dark";
      apply(current === "dark" ? "light" : "dark");
    });

    // Sync icon with current theme
    const current = root.getAttribute("data-theme") || "dark";
    btn.textContent = current === "dark" ? "☀️" : "🌙";
  }

  // Boot
  initModals();
  initLaunchers();
  initPopstate();
  initEscClose();
  initTheme();
})();
