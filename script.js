/* ===========================
   script.js — 21
   - Modal open/close
   - Nested modal “Back” stack
   - Click outside to close
   - ESC closes modal / panel
   - Contact floating panel open/close (X works)
   =========================== */

(function () {
  "use strict";

  const qs  = (sel, root = document) => root.querySelector(sel);
  const qsa = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  const body = document.body;

  // ---------------------------
  // Modal state
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

    // already injected
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

    // hide visible h2 (aria-labelledby still works)
    if (h2) h2.style.display = "none";
  }

  function openModal(selector, { pushHistory = true } = {}) {
    const modalEl = qs(selector);
    if (!modalEl) return;

    // stack previous
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
    const prev = modalStack.pop();
    if (prev) {
      modalEl.classList.remove("is-open");
      modalEl.setAttribute("aria-hidden", "true");
      activeModal = null;
      openModal(prev, { pushHistory: false });
      return;
    }
    closeAllModals();
  }

  // ---------------------------
  // Contact panel state
  // ---------------------------
  const contactToggle = qs("#contactToggle");
  const contactPanel  = qs("#contactPanel");
  const contactClose  = qs("#contactClose");

  let panelLastFocused = null;

  function panelIsOpen() {
    return contactPanel && !contactPanel.hasAttribute("hidden");
  }

  function openPanel() {
    if (!contactPanel || !contactToggle) return;
    if (panelIsOpen()) return;

    panelLastFocused = document.activeElement;

    contactPanel.removeAttribute("hidden");
    // allow transition
    requestAnimationFrame(() => contactPanel.classList.add("is-open"));

    contactToggle.setAttribute("aria-expanded", "true");

    const firstFocusable = qs("a, button, [tabindex]:not([tabindex='-1'])", contactPanel);
    if (firstFocusable) firstFocusable.focus({ preventScroll: true });
  }

  function closePanel() {
    if (!contactPanel || !contactToggle) return;
    if (!panelIsOpen()) return;

    contactPanel.classList.remove("is-open");
    contactToggle.setAttribute("aria-expanded", "false");

    // match CSS transition duration
    window.setTimeout(() => {
      contactPanel.setAttribute("hidden", "");
      if (panelLastFocused && typeof panelLastFocused.focus === "function") {
        panelLastFocused.focus({ preventScroll: true });
      } else {
        contactToggle.focus({ preventScroll: true });
      }
    }, 180);
  }

  function togglePanel() {
    if (panelIsOpen()) closePanel();
    else openPanel();
  }

  if (contactToggle) {
    contactToggle.addEventListener("click", (e) => {
      e.stopPropagation();
      togglePanel();
    });
  }

  if (contactClose) {
    contactClose.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      closePanel();
    });
  }

  if (contactPanel) {
    // prevent “outside click” handler from firing when clicking inside panel
    contactPanel.addEventListener("click", (e) => e.stopPropagation());
  }

  // ---------------------------
  // Global click handling (delegated)
  // ---------------------------
  document.addEventListener("click", (e) => {
    // Open modal
    const launcher = e.target.closest("[data-modal-target]");
    if (launcher) {
      const target = launcher.getAttribute("data-modal-target");
      if (target) openModal(target);
      return;
    }

    // Close modals via X
    const closer = e.target.closest("[data-modal-close]");
    if (closer) {
      closeAllModals();
      return;
    }

    // Click outside modal-content closes all
    const backdrop = e.target.classList && e.target.classList.contains("modal") ? e.target : null;
    if (backdrop && backdrop.classList.contains("is-open")) {
      closeAllModals();
      return;
    }

    // Outside click closes contact panel
    if (panelIsOpen()) {
      const clickedInside = contactPanel.contains(e.target) || (contactToggle && contactToggle.contains(e.target));
      if (!clickedInside) closePanel();
    }
  });

  // ESC closes: panel first, otherwise modals
  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;

    if (panelIsOpen()) {
      e.preventDefault();
      closePanel();
      return;
    }

    if (qsa(".modal.is-open").length) {
      e.preventDefault();
      closeAllModals();
      return;
    }
  });

})();