/* ===========================
   21 — Script
   - Modal open/close
   - Nested modal “Back” stack
   - Click outside to close
   - ESC support
   - Floating Contact button + panel
   =========================== */

(function () {
  "use strict";

  const qs = (sel, root = document) => root.querySelector(sel);
  const qsa = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  const body = document.body;

  // ---------------------------
  // MODALS
  // ---------------------------
  let activeModal = null;
  const modalStack = [];
  let lastFocusedEl = null;

  function lockScroll(lock) {
    if (lock) body.classList.add("modal-open");
    else body.classList.remove("modal-open");
  }

  function closeAllModals() {
    qsa(".modal.is-open").forEach((m) => {
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

    // already created
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

    // hide visible h2 to prevent duplicate title line
    if (h2) h2.style.display = "none";
  }

  function openModal(selector, { pushHistory = true } = {}) {
    const modalEl = qs(selector);
    if (!modalEl) return;

    // Stack previous modal if we’re opening from within another modal
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

    // focus back button first (best UX), else close button, else first focusable
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

    // No previous modal: back behaves like close at root
    closeAllModals();
  }

  // ---------------------------
  // CLICK DELEGATION
  // ---------------------------
  document.addEventListener("click", (e) => {
    // open modal
    const launcher = e.target.closest("[data-modal-target]");
    if (launcher) {
      const target = launcher.getAttribute("data-modal-target");
      if (target) openModal(target);
      return;
    }

    // close via X
    const closer = e.target.closest("[data-modal-close]");
    if (closer) {
      closeAllModals();
      return;
    }

    // click outside modal-content closes (overlay click)
    const overlay = e.target.classList && e.target.classList.contains("modal") ? e.target : null;
    if (overlay && overlay.classList.contains("is-open")) {
      closeAllModals();
      return;
    }
  });

  // ESC closes modals OR contact panel (handled below too)
  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;

    // if any modal open, close modals
    if (qsa(".modal.is-open").length) {
      e.preventDefault();
      closeAllModals();
      return;
    }
  });

  // ---------------------------
  // FLOATING CONTACT PANEL
  // ---------------------------
  (function initContactPanel() {
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
      if (firstFocusable) firstFocusable.focus({ preventScroll: true });
    }

    function closePanel() {
      if (panel.hasAttribute("hidden")) return;

      panel.classList.remove("is-open");
      toggleBtn.setAttribute("aria-expanded", "false");

      // match CSS transition timing
      window.setTimeout(() => {
        panel.setAttribute("hidden", "");
        if (lastFocused && typeof lastFocused.focus === "function") {
          lastFocused.focus({ preventScroll: true });
        } else {
          toggleBtn.focus({ preventScroll: true });
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

    // click outside closes
    document.addEventListener("click", (e) => {
      const isOpen = !panel.hasAttribute("hidden");
      if (!isOpen) return;

      const clickedInside = panel.contains(e.target) || toggleBtn.contains(e.target);
      if (!clickedInside) closePanel();
    });

    // ESC closes panel (if no modals are open)
    document.addEventListener("keydown", (e) => {
      const isOpen = !panel.hasAttribute("hidden");
      if (!isOpen) return;
      if (e.key !== "Escape") return;

      // if modals are open, modal handler owns ESC
      if (qsa(".modal.is-open").length) return;

      e.preventDefault();
      closePanel();
    });
  })();
})();