/* ===========================
   21 — Script
   - Modal open/close
   - Nested modal “Back” stack
   - Click outside to close
   - ESC support
   - Theme toggle (persist)
   =========================== */

(function () {
  "use strict";

  const qs = (sel, root = document) => root.querySelector(sel);
  const qsa = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  const body = document.body;
  const html = document.documentElement;

  // Modal state
  let activeModal = null;
  const modalStack = [];
  let lastFocusedEl = null;

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

    // Hide the visible h2 to prevent duplicate title lines (aria-labelledby still works)
    if (h2) h2.style.display = "none";
  }

  function openModal(selector, { pushHistory = true } = {}) {
    const modalEl = qs(selector);
    if (!modalEl) return;

    // If opening a modal from inside another modal, stack the previous one
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

    // Focus close/back for accessibility
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

    // No previous modal -> close everything (back acts like close at root)
    closeAllModals();
  }

  function closeModal(modalEl, { clearStack = true } = {}) {
    if (!modalEl) return;

    modalEl.classList.remove("is-open");
    modalEl.setAttribute("aria-hidden", "true");
    activeModal = null;

    if (clearStack) modalStack.length = 0;

    const anyOpen = qsa(".modal.is-open").length > 0;
    if (!anyOpen) {
      lockScroll(false);
      if (lastFocusedEl && typeof lastFocusedEl.focus === "function") {
        lastFocusedEl.focus({ preventScroll: true });
      }
    }
  }

  // ---------------------------
  // Event wiring (delegation)
  // ---------------------------
  document.addEventListener("click", (e) => {
    // Theme toggle
    if (e.target.closest("#themeToggle")) {
      toggleTheme();
      return;
    }

    // Open modal (any button with data-modal-target)
    const launcher = e.target.closest("[data-modal-target]");
    if (launcher) {
      const target = launcher.getAttribute("data-modal-target");
      if (target) openModal(target);
      return;
    }

    // Close modal (X button)
    const closer = e.target.closest("[data-modal-close]");
    if (closer) {
      // X closes everything, not “back”
      closeAllModals();
      return;
    }

    // Click outside modal-content closes current modal (and clears stack)
    const openModalEl = e.target.classList && e.target.classList.contains("modal") ? e.target : null;
    if (openModalEl && openModalEl.classList.contains("is-open")) {
      closeAllModals();
      return;
    }
  });

  // ESC closes everything
  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;
    if (!qsa(".modal.is-open").length) return;
    closeAllModals();
  });

  // Init
  syncThemeIcon();
})();
/* ===========================
   Floating Contact Panel
   =========================== */
(function () {
  const toggleBtn = document.getElementById("contactToggle");
  const panel = document.getElementById("contactPanel");
  const closeBtn = document.getElementById("contactClose");

  if (!toggleBtn || !panel || !closeBtn) return;

  let lastFocused = null;

  function openPanel() {
    if (!panel.hasAttribute("hidden")) return;

    lastFocused = document.activeElement;

    panel.removeAttribute("hidden");
    requestAnimationFrame(() => panel.classList.add("is-open"));
    toggleBtn.setAttribute("aria-expanded", "true");

    const firstFocusable = panel.querySelector("a, button, [tabindex]:not([tabindex='-1'])");
    if (firstFocusable) firstFocusable.focus();
  }

  function closePanel() {
    if (panel.hasAttribute("hidden")) return;

    panel.classList.remove("is-open");
    toggleBtn.setAttribute("aria-expanded", "false");

    setTimeout(() => {
      panel.setAttribute("hidden", "");
      if (lastFocused && typeof lastFocused.focus === "function") {
        lastFocused.focus();
      } else {
        toggleBtn.focus();
      }
    }, 180);
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

  panel.addEventListener("click", (e) => e.stopPropagation());

  document.addEventListener("click", (e) => {
    const isOpen = !panel.hasAttribute("hidden");
    if (!isOpen) return;

    const clickedInside = panel.contains(e.target) || toggleBtn.contains(e.target);
    if (!clickedInside) closePanel();
  });

  document.addEventListener("keydown", (e) => {
    const isOpen = !panel.hasAttribute("hidden");
    if (!isOpen) return;

    if (e.key === "Escape") {
      e.preventDefault();
      closePanel();
    }
  });
})();
