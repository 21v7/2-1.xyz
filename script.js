(function () {
  const root = document.documentElement;
  const themeBtn = document.getElementById('themeToggle');
  const bar = document.getElementById('contactBar');

  // Theme
  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    try { localStorage.setItem('theme', theme); } catch (e) {}
    if (themeBtn) themeBtn.textContent = theme === 'dark' ? '☀️' : '🌙';
  }
  applyTheme(root.getAttribute('data-theme') || 'light');
  themeBtn?.addEventListener('click', () => {
    const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    applyTheme(next);
  });

  // Reveal floating bar (slide-in animation)
  window.addEventListener('load', () => bar?.classList.add('visible'));

  // ===== Modal System =====
  const openers = document.querySelectorAll('[data-modal-target]');
  const closers = document.querySelectorAll('[data-modal-close]');
  let lastFocused = null;

  function openModal(selector) {
    const modal = document.querySelector(selector);
    if (!modal) return;
    lastFocused = document.activeElement;
    modal.setAttribute('aria-hidden', 'false');
    document.documentElement.classList.add('modal-open');
    document.body.classList.add('modal-open');
    const focusable = modal.querySelector('[data-modal-close]') || modal.querySelector('h2');
    focusable?.focus();
  }

  function closeModal(modal) {
    modal.setAttribute('aria-hidden', 'true');
    document.documentElement.classList.remove('modal-open');
    document.body.classList.remove('modal-open');
    lastFocused?.focus();
  }

  openers.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.getAttribute('data-modal-target');
      if (target) openModal(target);
    });
  });

  closers.forEach(btn => {
    btn.addEventListener('click', () => {
      const modal = btn.closest('.modal');
      if (modal) closeModal(modal);
    });
  });

  // Click outside to close
  document.addEventListener('click', (e) => {
    const openModalEl = document.querySelector('.modal[aria-hidden="false"]');
    if (!openModalEl) return;
    const content = openModalEl.querySelector('.modal-content');
    if (!content.contains(e.target) && !e.target.closest('[data-modal-target]')) {
      closeModal(openModalEl);
    }
  });

  // ESC to close
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const openModalEl = document.querySelector('.modal[aria-hidden="false"]');
      if (openModalEl) closeModal(openModalEl);
      // === Recently Sold — Instagram (handles, optional proof links) ===
  (function(){
    /**
     * HOW TO USE (no HTML/CSS edits needed later):
     * - Past sales without proof: just a string, e.g. "@afed"
     * - New sales with proof: object { handle:"@alpha", proof:"https://t.me/..." }
     * You can mix both formats.
     */
    const SOLD_IG = [
      // --- if you have proof for new ones, add like:
      // { handle: "@alpha", proof: "https://t.me/your_channel/12345" },

      // --- your current list (no proof links yet) ---
      "@afed","@ai7g","@allaying","@apah","@apoy","@azjb","@azpi","@bbpc","@bdng","@bkcg","@bped","@b9y0",
      "@c0dp","@cains","@cfib","@cgli","@crnp","@covp","@csjf",
      "@d4pb","@deadland","@djmf","@dqki",
      "@edvw","@elrj","@epjj",
      "@f40m","@fdqj","@fdwb","@fhug","@fligr","@fliu","@furled","@fzld",
      "@g3i9","@g3r1","@g6a9","@gepm","@gfsg","@ghif","@gohzilla","@gnx5","@gpvi","@gwrp","@gzw6","@_gt6",
      "@hbxt","@hiqr","@hjgo","@hopb","@horne","@htbv","@hwye","@hxgl","@hyoc",
      "@iemf","@ijyb","@istb",
      "@jdga","@jeyv","@jfxz","@jk16","@jn4e","@jnfy","@jol4","@j41x",
      "@kdlv","@kjui",
      "@ky2t",
      "@lkfj","@lndc","@lxc3",
      "@mo4p","@movk","@mzye",
      "@nc_t","@ngqo","@nlsd","@nqsz","@nyw0",
      "@od4t","@ofqu","@ogjh","@orpc","@owgi","@oyql",
      "@pashed","@pc62","@pf7i","@pfrv","@pmrc","@pxuj","@pvmn",
      "@qpyj","@qt70","@qtud","@qzip","@qz37",
      "@rbcy","@r46j","@raspado","@retightening","@rhpt","@rtgn","@ryjw",
      "@stillen",
      "@tae7","@tbgy","@tbpr","@tvrp","@t0ld",
      "@udn4","@uvi6",
      "@vcqw",
      "@wcmb","@wgta","@wkgo",
      "@wu1b","@wxas","@wyk0",
      "@xe74","@xem0","@xgqw","@xkrq","@xpdg",
      "@y0k_","@y0se","@yellowed","@yg0t","@ykdp","@ylsk","@ylxt",
      "@z1gm","@zyqh",
      "@1j8u","@27hp","@31hn","@3ukl","@4lj_","@4nvq","@4ra5",
      "@5341","@54jd","@54yg","@6bze","@7__i","@9ag4","@9xcg","@6930",
      "@1.6.4","@8.0.6",
      "@00049","@009726","@01501","@01681","@111421","@13611","@15753","@21593","@26753","@36644","@39702","@41076","@43679","@5224367","@5235478","@54242","@67778","@73859","@81866","@86168","@92499","@94040","@94040499","@0817191439","@0892912917","@0988041686"
    ];

    const listEl   = document.getElementById('soldList');
    const searchEl = document.getElementById('soldSearch');
    const toggleEl = document.getElementById('soldToggle');
    if (!listEl) return;

    // normalize to objects { handle, proof? }
    const normalized = SOLD_IG.map(x => typeof x === 'string' ? ({ handle: x }) : x);

    // sort alphabetically by handle
    normalized.sort((a,b)=> a.handle.localeCompare(b.handle));

    let showAll = false;
    let query = '';

    function render(){
      const filtered = normalized.filter(x => x.handle.toLowerCase().includes(query));
      const items = showAll ? filtered : filtered.slice(0, 24);

      listEl.innerHTML = items.map(x => {
        const hasProof = !!x.proof;
        const btnText = hasProof ? 'Vouch' : 'Verify';
        const href    = hasProof ? x.proof : 'https://t.me/id7321';
        return `
          <li class="sold-chip" data-handle="${x.handle}">
            <span class="handle">${x.handle}</span>
            <a class="card-button" href="${href}" target="_blank" rel="noopener">${btnText}</a>
          </li>
        `;
      }).join('');

      if (toggleEl) {
        const hidden = Math.max(filtered.length - 24, 0);
        if (hidden > 0) {
          toggleEl.style.display = '';
          toggleEl.textContent = showAll ? 'Show less' : \`Show all (\${hidden} more)\`;
          toggleEl.setAttribute('aria-expanded', String(showAll));
        } else {
          toggleEl.style.display = 'none';
        }
      }
    }

    searchEl && searchEl.addEventListener('input', e=>{
      query = String(e.target.value || '').toLowerCase().trim();
      render();
    });
    toggleEl && toggleEl.addEventListener('click', ()=>{ showAll = !showAll; render(); });

    render();
    }
  });
})();
