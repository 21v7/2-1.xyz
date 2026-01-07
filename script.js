/* ===========================
   21 — Script
   - Modal open/close
   - Nested modal “Back” stack
   - Click outside to close
   - ESC support
   - (Optional) Theme toggle (persist) if #themeToggle exists
   - Floating Contact Panel (button -> panel)
   =========================== */

(function () {
  "use strict";

  const qs = (sel, root = document) => root.querySelector(sel);
  const qsa = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  const body = document.body;
  const html = document.documentElement;

  // ---------------------------
  // Theme (optional; safe if no toggle in HTML)
  // ---------------------------
  function setTheme(theme) {
    html.setAttribute("data-theme", theme);
    try { localStorage.setItem("theme", theme); } catch (e) {}
    syncThemeIcon();
  }

  function syncThemeIcon() {
    const icon = qs(".theme-toggle__icon");
    if (!icon) return;
    const t = html.getAttribute("data-theme") || "light";
    icon.textContent = (t === "dark") ? "☀️" : "🌙";
  }

  function toggleTheme() {
    const current = html.getAttribute("data-theme") || "light";
    setTheme(current === "dark" ? "light" : "dark");
  }

  // ---------------------------
  // Modal system
  // ---------------------------
  let activeModal = null;
  const modalStack = [];
  let lastFocusedEl = null;

  function lockScroll(lock) {
    if (lock) body.classList.add("modal-open");
    else body.classList.remove("modal-open");
  }

  function closeAllModals() {
    qsa(".modal.is-open").forEach(m => {
      m.classList.remove("is-open");
      m.setAttribute("aria-hidden", "true");
    });
    activeModal = null;
    modalStack.length = 0;
    lockScroll(false);

    if (lastFocusedEl && typeof lastFocusedEl.focus === "function") {
      lastFocusedEl.focus({ preventScroll: true });
    }
  }

  function ensureTopbar(modalEl) {
    const content = qs(".modal-content", modalEl);
    if (!content) return;

    // Already added
    if (qs(".modal-topbar", content)) return;

    const h2 = qs("h2", content);

    const topbar = document.createElement("div");
    topbar.className = "modal-topbar";

    const backBtn = document.createElement("button");
    backBtn.className = "modal-back";
    backBtn.type = "button";
    backBtn.textContent = "Back";
    backBtn.addEventListener("click", () => goBack(modalEl));

    const title = document.createElement("div");
    title.className = "modal-title";
    title.setAttribute("role", "heading");
    title.setAttribute("aria-level", "2");
    title.textContent = h2 ? h2.textContent : "Menu";

    topbar.appendChild(backBtn);
    topbar.appendChild(title);

    content.insertBefore(topbar, content.firstChild);

    // Hide visible h2 so you don't see duplicate titles.
    // aria-labelledby still works because the h2 exists in DOM.
    if (h2) h2.style.display = "none";
  }

  function openModal(selector, { pushHistory = true } = {}) {
    const modalEl = qs(selector);
    if (!modalEl) return;

    // stack previous modal if opening nested
    if (activeModal && pushHistory) {
      modalStack.push("#" + activeModal.id);
      activeModal.classList.remove("is-open");
      activeModal.setAttribute("aria-hidden", "true");
    }

    lastFocusedEl = document.activeElement;

    modalEl.classList.add("is-open");
    modalEl.setAttribute("aria-hidden", "false");
    activeModal = modalEl;

    lockScroll(true);
    ensureTopbar(modalEl);

    const focusTarget =
      qs(".modal-back", modalEl) ||
      qs("[data-modal-close]", modalEl) ||
      qs("a,button,[tabindex]:not([tabindex='-1'])", modalEl);

    if (focusTarget) focusTarget.focus({ preventScroll: true });
  }

  function goBack(modalEl) {
    if (!modalEl) return;

    const prev = modalStack.pop();
    if (prev) {
      modalEl.classList.remove("is-open");
      modalEl.setAttribute("aria-hidden", "true");
      activeModal = null;
      openModal(prev, { pushHistory: false });
      return;
    }

    // root -> close all
    closeAllModals();
  }

  // ---------------------------
  // Floating Contact Panel
  // ---------------------------
  const contactToggleBtn = document.getElementById("contactToggle");
  const contactPanel = document.getElementById("contactPanel");
  const contactCloseBtn = document.getElementById("contactClose");

  let contactLastFocused = null;

  function isContactOpen() {
    return !!(contactPanel && !contactPanel.hasAttribute("hidden"));
  }

  function openContact() {
    if (!contactToggleBtn || !contactPanel || !contactCloseBtn) return;
    if (isContactOpen()) return;

    contactLastFocused = document.activeElement;

    contactPanel.removeAttribute("hidden");

    // animate in (CSS expects .is-open)
    requestAnimationFrame(() => contactPanel.classList.add("is-open"));

    contactToggleBtn.setAttribute("aria-expanded", "true");

    const firstFocusable = contactPanel.querySelector("a, button, [tabindex]:not([tabindex='-1'])");
    if (firstFocusable) firstFocusable.focus({ preventScroll: true });
  }

  function closeContact({ restoreFocus = true } = {}) {
    if (!contactToggleBtn || !contactPanel) return;
    if (!isContactOpen()) return;

    contactPanel.classList.remove("is-open");
    contactToggleBtn.setAttribute("aria-expanded", "false");

    // match your CSS transition time
    setTimeout(() => {
      contactPanel.setAttribute("hidden", "");

      if (!restoreFocus) return;

      if (contactLastFocused && typeof contactLastFocused.focus === "function") {
        contactLastFocused.focus({ preventScroll: true });
      } else {
        contactToggleBtn.focus({ preventScroll: true });
      }
    }, 180);
  }

  function toggleContact() {
    if (isContactOpen()) closeContact();
    else openContact();
  }

  // ---------------------------
  // Event wiring (single delegation layer)
  // ---------------------------
  document.addEventListener("click", (e) => {
    // Theme toggle (only if exists in DOM)
    if (e.target.closest("#themeToggle")) {
      toggleTheme();
      return;
    }

    // Contact toggle button
    if (e.target.closest("#contactToggle")) {
      e.stopPropagation();
      toggleContact();
      return;
    }

    // Contact close button
    if (e.target.closest("#contactClose")) {
      e.stopPropagation();
      closeContact();
      return;
    }

    // If contact is open and click is outside contact UI, close it
    if (isContactOpen()) {
      const clickedInsideContact =
        (contactPanel && contactPanel.contains(e.target)) ||
        (contactToggleBtn && contactToggleBtn.contains(e.target));

      if (!clickedInsideContact) {
        closeContact({ restoreFocus: false });
        // don't return; user might be clicking a launcher underneath
        // but closing contact first is fine
      } else {
        // clicked inside contact panel; don't let it trigger modal close logic
        return;
      }
    }

    // Open modal (any element with data-modal-target)
    const launcher = e.target.closest("[data-modal-target]");
    if (launcher) {
      const target = launcher.getAttribute("data-modal-target");
      if (target) openModal(target);
      return;
    }

    // Close modals via [data-modal-close] (your X buttons)
    const closer = e.target.closest("[data-modal-close]");
    if (closer) {
      closeAllModals();
      return;
    }

    // Click outside modal-content closes everything
    const openModalEl = (e.target.classList && e.target.classList.contains("modal")) ? e.target : null;
    if (openModalEl && openModalEl.classList.contains("is-open")) {
      closeAllModals();
      return;
    }
  });

  // One ESC handler:
  // - If contact is open -> close it
  // - else if any modal open -> close modals
  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;

    if (isContactOpen()) {
      e.preventDefault();
      closeContact();
      return;
    }

    if (qsa(".modal.is-open").length) {
      e.preventDefault();
      closeAllModals();
    }
  });

  // Stop clicks inside contact panel from bubbling into document handler
  if (contactPanel) {
    contactPanel.addEventListener("click", (e) => e.stopPropagation());
  }

  // Init
  syncThemeIcon();
})();
/* ===========================
   Floating Contact Panel
   =========================== */
(function () {
  "use strict";

  const toggleBtn = document.getElementById("contactToggle");
  const panel = document.getElementById("contactPanel");
  const closeBtn = document.getElementById("contactClose");

  if (!toggleBtn || !panel || !closeBtn) return;

  let lastFocused = null;

  function openPanel() {
    if (!panel.hasAttribute("hidden")) return;

    lastFocused = document.activeElement;

    panel.removeAttribute("hidden");
    // allow CSS transition to run
    requestAnimationFrame(() => panel.classList.add("is-open"));

    toggleBtn.setAttribute("aria-expanded", "true");

    const firstFocusable = panel.querySelector("a, button, [tabindex]:not([tabindex='-1'])");
    if (firstFocusable) firstFocusable.focus({ preventScroll: true });
  }

  function closePanel() {
    if (panel.hasAttribute("hidden")) return;

    panel.classList.remove("is-open");
    toggleBtn.setAttribute("aria-expanded", "false");

    // wait for transition to finish before hiding
    setTimeout(() => {
      panel.setAttribute("hidden", "");
      if (lastFocused && typeof lastFocused.focus === "function") {
        lastFocused.focus({ preventScroll: true });
      } else {
        toggleBtn.focus({ preventScroll: true });
      }
    }, 190);
  }

  function togglePanel() {
    const isOpen = !panel.hasAttribute("hidden");
    if (isOpen) closePanel();
    else openPanel();
  }

  toggleBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    togglePanel();
  });

  closeBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    closePanel();
  });

  // Prevent clicks inside panel from bubbling and closing it
  panel.addEventListener("click", (e) => e.stopPropagation());

  // Close on outside click
  document.addEventListener("click", () => {
    const isOpen = !panel.hasAttribute("hidden");
    if (!isOpen) return;
    closePanel();
  });

  // Close on ESC
  document.addEventListener("keydown", (e) => {
    const isOpen = !panel.hasAttribute("hidden");
    if (!isOpen) return;

    if (e.key === "Escape") {
      e.preventDefault();
      closePanel();
    }
  });
})();