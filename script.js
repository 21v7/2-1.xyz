// ══════════════════════════════════════════════════════════════════════════════
// ⚡⚡⚡ SUPER EASY DAILY EDITING SECTION ⚡⚡⚡
// THIS IS THE ONLY PART YOU NEED TO EDIT!
// ══════════════════════════════════════════════════════════════════════════════

// ── YOUR CONTACT LINKS ────────────────────────────────────────────────────────
const D = {
  vouchCount: '570+',
  telegram:         'https://t.me/abuto',
  instagram:        'https://www.instagram.com/7521',
  ogu:              'https://oguser.com/21',
  moreLinks:        'https://solo.to/215',
  vouchesLink:      'https://t.me/id7221',
  vouchesInstagram: 'https://www.instagram.com/21v7',
};

// ── CLOUDFLARE WORKER URL (for real visitor counter) ──────────────────────────
// ⚠️ PASTE YOUR CLOUDFLARE WORKER URL HERE AFTER SETUP ⚠️
const COUNTER_API = 'PASTE_YOUR_CLOUDFLARE_WORKER_URL_HERE';

// ── CURRENT STOCK ─────────────────────────────────────────────────────────────
// SUPER EASY FORMAT: Just type "handle price" on each line!
// Example: guia 500
//
// To add item:    Add new line with "handle price"
// To change price: Change the number
// To remove item:  Delete the line
// When sold:       Cut line, paste in SOLD section below (remove price)
// ──────────────────────────────────────────────────────────────────────────────

const STOCK = {
  ig: `
    guia  500
    gawx  200
    la1o  150
    33578 70
    qsio  65
    fjke  45
    c5lg  30
  `,
  
  tw: `
    359893          20
    522613          20
    687286          20
    964945          30
    mmssqq          30
    wanted_criminal 50
  `,
  
  tt: `
    c__p_m(stat) 15
  `,
  
  cc: `
    adjust 5
    alter 5
    antisociality 5
    avoid 5
    awful 5
    Bankroll 8
    Boost 8
    burden 8
    clap 5
    clean 5
    color 8
    creature 8
    crop 5
    delusional 5
    ecstasy 5
    grasp 5
    grateful 5
    hazard 8
    heroism 8
    impatient 5
    inferior 5
    irresponsible 5
    jailbreak 5
    offense 8
    orphan 8
    physic 8
    place 8
    producer 8
    rack 8
    ransom 8
    reap 5
    request 8
    sack 8
    science 8
    selfless 8
    sore 5
    spain 8
    spine 8
    stair 8
    stolen 8
    street 8
    supervillain 8
    talk 5
    thread 5
    tier 8
    tied 5
    timid 5
    tool 8
    topic 8
    turf 8
    want 8
    writer 8
  `,
  
  proxy: `
    hoca 850
    mram 850
    msfo 230
    3m.n 100
    3r_x 100
    awzm 100
    pie0 100
    qh.o 100
    vacb 100
    vagc 100
    rhf9 85
    rske 85
    smta 85
    wtoa 85
    x674 85
    qsho 80
    rwnm 80
    0kld 75
    duep 75
    769k 70
    yaxv 70
    zlav 70
    4esm 65
    7a9h 65
    _8ra 65
    awej 65
    gjnj 65
    hebc 65
    hk1d 65
    ipyt 65
    iyqu 65
    jcyn 65
    jcoz 65
    juzp 65
    kol1 65
    ldkl 65
    mzoh 65
    oank 65
    rdse 65
    rtls 65
    skfs 65
    tkir 65
    fhfw 60
    ia7h 60
    ljwl 60
    rdpc 60
    si9_ 60
    tbqe 60
    wbcy 60
    xnld 60
    yo4f 60
    8_qa 55
    acrp 55
    ddpc 55
    gdne 55
    jr3h 55
    miqt 55
    oajd 55
    ofnh 55
    yh7p 55
    43nd 50
    krcp 50
    nq2q 50
    pwjd 50
    q_j4 50
    spvd 50
    tfdj 50
    v_7l 50
    vqfl 50
    wfmb 50
    xg7x 50
    xp6r 50
    xw7y 50
    xy3b 50
    bdvt 45
    bjrh 45
    cn1d 45
    eplh 45
    erkj 45
    etpj 45
    eyhf 45
    fblh 45
    hcms 45
    jsgq 45
    jvps 45
    ljmz 45
    lwmj 45
    mvjb 45
    mzdk 45
    ob3m 45
    qnmt 45
    rcfp 45
    wjbf 45
    wlgk 45
    1cym 40
    4mti 40
    slqg 40
    0nho 35
    8ly6 35
    dx3o 35
    e7ha 35
    eh0b 35
    eq7w 35
    fkj1 35
    hfo2 35
    k26q 35
    m65n 35
    m7aq 35
    ms3a 35
    n1d2 35
    nd7r 35
    q8k4 35
    uj12 35
    vl7p 35
    wb2s 35
    wq7u 35
  `,
  
  psn: ``,
};

// ── SOLD ITEMS ────────────────────────────────────────────────────────────────
// Just list handles (space-separated or one per line - both work!)
// When you sell something: Copy handle from STOCK, paste here (remove price)
// ──────────────────────────────────────────────────────────────────────────────

const SOLD = {
  ig: `
    afed ai7g allaying apah apoy apvc azjb azpi bbpc bdng bkcg bkwu bd0g bped bmo9 b9y0
    c0dp cains cfib cgli crnp covp csjf d4pb deadland djmf dqki edvw elrj epjg epre enj9
    f40m fdqj fdwb fhug fligr fliu furled fzld f67o gr8b gzev g3i9 g3r1 g6a9 gepm gfsg
    ghif gohzilla gnx5 gpvi gwrp gzw6 _gt6 hbxt hijt hiqr hjgo hopb horne htbv hwye hxgl
    hyoc igba iemf ijyb istb jdga jeyv jxuj jfxz jk16 jn4e jnfy jol4 j41x kdlv kjui ky2t
    ljpf lkfj lndc lxc3 mo4p movk mzye nyqe nc_t ngqo nlsd nqsz nfyb nyw0 ne0o od4t ofqu
    ogjh orpc owgi oyql pashed pc62 pf7i pfrv pmrc pxuj pvmn qyjo qzip qtud qpyj qdhv qt70
    qz37 rbcy r46j raspado retightening rhpt rtgn ryjw rm4c stillen tae7 tbgy tbpr tvrp
    tydv t0ld tuqz udn4 uvi6 vaqz vcqw vqem wpvh wcmb wgta wkgo wu1b wxas wxzd wiqo wyk0
    xe74 xem0 xgqw xkrq xpdg y0k_ y0se yellowed yg0t ykdp ylsk ylkz ylxt z1gm zyqh 1j8u
    14ld 27hp 31hn 3ukl 4lj_ 4nvq 4ra5 5341 54jd 54yg 5ucy 6bze 6ihv 7__i 9ag4 9xcg 94ej
    3930 4340 6930 8106 8720 1.6.4 8.0.6 00049 009726 01501 01681 111421 10331 13611 15753
    21593 26753 36644 39702 41076 43679 5224367 5235478 54242 67778 73859 81866 86168 92499
    94040 94040499 0817191439 0892912917 0988041686
  `,
  
  tt: `
    aa(font) aisf anmp bm73 c(font) cidb cjly dd(font) god(font) gb3 m3me hgfx ibga jlmo
    kczs kfex kbry kngm los(font) luey peqw tazn tnsg uhvf v1to vrgw widc wbsk xywr xdmi
    yjqs zmqr moonlight(font) 00(font) 11(font) 21(font) 99(font) 55854(font) 318502(font)
    520491(font) 529416(font) 810153(font) 827513(font) 829114(font) invisibleuser(font)
  `,
  
  tw: `
    o2x_ codq r0un yg65 _dine billi0n topage delacree paqmane vendetta_ 062183 173601
    179170 222824 230204 296945 313178 337723
  `,
  
  cc: `
    riot tool ecstacy
  `,
  
  psn: `
    llHw
  `,
};

// ══════════════════════════════════════════════════════════════════════════════
// 🔒 END OF DAILY EDITING SECTION 🔒
// Everything below is site code - don't edit unless you know what you're doing!
// ══════════════════════════════════════════════════════════════════════════════


// ── PARSER FUNCTIONS ──────────────────────────────────────────────────────────
// These convert the easy text format into JavaScript arrays automatically
// ──────────────────────────────────────────────────────────────────────────────

function parseStock(text) {
  return text
    .trim()
    .split('\n')
    .map(line => line.trim())
    .filter(line => line && !line.startsWith('//'))
    .map(line => {
      const parts = line.split(/\s+/);
      const name = parts[0];
      const price = parts[1] ? parseInt(parts[1]) : 0;
      return { name: '@' + name, price };
    });
}

function parseSold(text) {
  return text
    .trim()
    .split(/\s+/)
    .filter(handle => handle && !handle.startsWith('//'))
    .map(handle => '@' + handle);
}

// Auto-convert to arrays
const STOCK_PARSED = {
  ig: parseStock(STOCK.ig),
  tw: parseStock(STOCK.tw),
  tt: parseStock(STOCK.tt),
  cc: parseStock(STOCK.cc),
  proxy: parseStock(STOCK.proxy),
  psn: [],
};

const SOLD_PARSED = {
  ig: parseSold(SOLD.ig),
  tt: parseSold(SOLD.tt),
  tw: parseSold(SOLD.tw),
  cc: parseSold(SOLD.cc),
  psn: parseSold(SOLD.psn),
};

// ── PLATFORM ICONS ────────────────────────────────────────────────────────────

const ICONS = {
  ig:    `<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>`,
  tw:    `<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.258 5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>`,
  tt:    `<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.76a4.85 4.85 0 01-1.01-.07z"/></svg>`,
  cc:    `<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/></svg>`,
  psn:   `<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M8.984 2.596v17.545l3.915 1.261V6.688c0-.69.304-1.151.794-.995.636.181.76.814.76 1.504v4.558c2.853.895 4.997-.28 4.997-3.955 0-3.755-1.909-5.355-4.572-6.254-1.073-.354-3.111-.629-5.894.05zM2 19.152l4.786 1.411V11.97L2 10.675v8.477zm17.879-5.464c-2.138-.65-4.898-.507-4.898-.507v2.312s2.367-.19 2.834.507c.365.547.198 1.5-.573 2.033l-2.261 1.518v2.594l4.165-2.729c2.259-1.553 2.574-3.786.733-5.728z"/></svg>`,
  proxy: `<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>`,
  tg:    `<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>`,
};

// ── REAL VISITOR COUNTER (Cloudflare Worker) ─────────────────────────────────

async function initRealVisitCounter() {
  const navEl = document.getElementById('nav-visit-count');
  if (!navEl) return;
  
  try {
    if (COUNTER_API === 'PASTE_YOUR_CLOUDFLARE_WORKER_URL_HERE') {
      // Worker not set up yet - show fallback
      navEl.textContent = '2,670';
      console.log('⚠️ Cloudflare Worker not configured yet. Visit counter showing fallback value.');
      return;
    }
    
    // Fetch REAL global count from Cloudflare Worker
    const response = await fetch(COUNTER_API);
    const data = await response.json();
    
    // Display real count (works for ALL visitors globally)
    navEl.textContent = data.visits.toLocaleString();
    console.log('✓ Real counter loaded:', data.visits);
  } catch (err) {
    console.error('Counter API error:', err);
    // Fallback if Worker unavailable
    navEl.textContent = '2,670';
  }
}

// Run when page loads
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initRealVisitCounter);
} else {
  initRealVisitCounter();
}


// ── NAV TICKER BUILD ──────────────────────────────────────────────────────────

const TICKER_ITEMS = [
  { label: 'Telegram',   val: '@abuto',          href: D.telegram,         icon: ICONS.tg    },
  { label: 'Instagram',  val: '@7521',            href: D.instagram,        icon: ICONS.ig    },
  { label: 'OGUsers',    val: 'oguser.com/21',    href: D.ogu,              icon: ICONS.proxy },
  { label: 'Vouches',    val: 'Telegram',         href: D.vouchesLink,      icon: ICONS.tg    },
  { label: 'Links',      val: 'solo.to/215',      href: D.moreLinks,        icon: ICONS.proxy },
  { label: 'Vouches IG', val: '@21v7',            href: D.vouchesInstagram, icon: ICONS.ig    },
];

function buildTicker() {
  const all = [...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS];
  document.getElementById('ticker-track').innerHTML = all.map(item => `
    <a class="nav-ticker-item" href="${item.href}" target="_blank">
      <span class="nav-ticker-icon">${item.icon}</span>
      <span class="nav-ticker-label">${item.label}</span>
      <span class="nav-ticker-val">${item.val}</span>
    </a>
  `).join('');
}
buildTicker();

// ── INTERACTIVE TICKER (drag to spin) ────────────────────────────────────────

(function initInteractiveTicker() {
  const track = document.getElementById('ticker-track');
  if (!track) return;

  let isDragging = false;
  let startX = 0;
  let lastX = 0;
  let currentScroll = 0;
  let velocity = 0;
  let animationId = null;
  let hasMoved = false;
  
  track.style.animation = 'none';
  const trackWidth = track.scrollWidth / 2;

  function autoScroll() {
    if (isDragging) return;
    currentScroll += 0.5;
    if (currentScroll >= trackWidth) currentScroll = 0;
    track.style.transform = `translateX(-${currentScroll}px)`;
    animationId = requestAnimationFrame(autoScroll);
  }

  autoScroll();

  function onStart(e) {
    isDragging = true;
    hasMoved = false;
    const clientX = e.type === 'mousedown' ? e.clientX : e.touches[0].clientX;
    startX = clientX;
    lastX = clientX;
    velocity = 0;
    
    if (animationId) {
      cancelAnimationFrame(animationId);
      animationId = null;
    }
    
    track.style.cursor = 'grabbing';
    track.style.userSelect = 'none';
  }

  function onMove(e) {
    if (!isDragging) return;
    
    const clientX = e.type === 'mousemove' ? e.clientX : e.touches[0].clientX;
    const delta = clientX - lastX;
    
    if (Math.abs(clientX - startX) > 5) {
      hasMoved = true;
      e.preventDefault();
    }
    
    currentScroll -= delta;
    if (currentScroll < 0) currentScroll += trackWidth;
    if (currentScroll >= trackWidth) currentScroll -= trackWidth;
    
    track.style.transform = `translateX(-${currentScroll}px)`;
    velocity = delta;
    lastX = clientX;
  }

  function onEnd() {
    if (!isDragging) return;
    isDragging = false;
    track.style.cursor = 'grab';
    track.style.userSelect = '';
    
    if (Math.abs(velocity) > 2) {
      let momentumVelocity = -velocity * 0.8;
      
      function applyMomentum() {
        if (Math.abs(momentumVelocity) < 0.1) {
          autoScroll();
          return;
        }
        
        currentScroll += momentumVelocity;
        if (currentScroll < 0) currentScroll += trackWidth;
        if (currentScroll >= trackWidth) currentScroll -= trackWidth;
        
        track.style.transform = `translateX(-${currentScroll}px)`;
        momentumVelocity *= 0.94;
        
        animationId = requestAnimationFrame(applyMomentum);
      }
      
      applyMomentum();
    } else {
      autoScroll();
    }
  }

  track.addEventListener('mousedown', onStart);
  document.addEventListener('mousemove', onMove);
  document.addEventListener('mouseup', onEnd);
  
  track.addEventListener('touchstart', onStart, { passive: true });
  document.addEventListener('touchmove', onMove, { passive: false });
  document.addEventListener('touchend', onEnd);
  
  track.addEventListener('click', (e) => {
    if (hasMoved) {
      e.preventDefault();
      e.stopPropagation();
    }
  }, { capture: true });

  track.style.cursor = 'grab';
})();

// ── NAV ───────────────────────────────────────────────────────────────────────

function goto(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + scrollY - 60;
  window.scrollTo({ top, behavior: 'smooth' });
}

// ── ACCORDION ─────────────────────────────────────────────────────────────────

function toggleAcc(trigger) {
  const body = trigger.nextElementSibling;
  const isOpen = trigger.classList.contains('open');
  document.querySelectorAll('.acc-trigger.open').forEach(t => {
    t.classList.remove('open');
    t.nextElementSibling.classList.remove('open');
  });
  if (!isOpen) {
    trigger.classList.add('open');
    body.classList.add('open');
  }
}

// ── STOCK ─────────────────────────────────────────────────────────────────────

const PLATFORMS = [
  { id:'ig',    name:'Instagram', icon: ICONS.ig,    data: STOCK_PARSED.ig    },
  { id:'tw',    name:'Twitter',   icon: ICONS.tw,    data: STOCK_PARSED.tw    },
  { id:'tt',    name:'TikTok',    icon: ICONS.tt,    data: STOCK_PARSED.tt    },
  { id:'cc',    name:'CapCut',    icon: ICONS.cc,    data: STOCK_PARSED.cc    },
  { id:'proxy', name:'IG Proxy',  icon: ICONS.proxy, data: STOCK_PARSED.proxy },
  { id:'psn',   name:'PSN',       icon: ICONS.psn,   data: STOCK_PARSED.psn   },
];
let activeP = 'ig';

function buildTabs() {
  document.getElementById('ptabs').innerHTML = PLATFORMS.map(p => `
    <button class="ptab${p.id===activeP?' on':''}" onclick="switchP('${p.id}')">
      ${p.icon} ${p.name}
      <span class="ptab-ct">${p.data.length || (p.id==='psn' ? 'Soon' : 0)}</span>
    </button>
  `).join('');
}

function switchP(id) {
  activeP = id;
  document.getElementById('stock-search').value = '';
  buildTabs();
  renderStock();
}

function renderStock() {
  const body = document.getElementById('stock-body');
  const p = PLATFORMS.find(p => p.id === activeP);

  if (p.id === 'psn' || !p.data.length) {
    body.innerHTML = `<div style="padding:40px;text-align:center;color:var(--f3);font-size:13px">
      PSN usernames coming soon —
      <a href="${D.telegram}" target="_blank" style="color:var(--f1);text-decoration:underline">get notified on Telegram</a>
    </div>`;
    return;
  }

  const q = document.getElementById('stock-search').value.toLowerCase();
  const sort = document.getElementById('stock-sort').value;

  let arr = p.data.filter(i => i.name.toLowerCase().includes(q));

  if (sort === 'az') arr.sort((a,b) => a.name.localeCompare(b.name));
  else if (sort === 'lo') arr.sort((a,b) => a.price - b.price);
  else if (sort === 'hi') arr.sort((a,b) => b.price - a.price);

  if (!arr.length) {
    body.innerHTML = `<div style="padding:36px;text-align:center;color:var(--f3)">No results for "${q}"</div>`;
    return;
  }

  body.innerHTML = arr.map((item, i) => {
    const priceStr = item.price > 0 ? `$${item.price}` : 'Contact';
    return `
    <div class="srow" style="animation-delay:${i * 0.022}s">
      <div class="sname">${item.name}</div>
      <div class="sprice">${priceStr}</div>
      <button class="sbtn" onclick="buy('${item.name.replace(/'/g,"\\'")}','${priceStr}')">Buy</button>
    </div>`;
  }).join('');
}

buildTabs();
renderStock();

// ── SOLD ──────────────────────────────────────────────────────────────────────

const SOLD_PLATFORMS = [
  { id:'ig',  name:'Instagram', icon: ICONS.ig,  data: SOLD_PARSED.ig  },
  { id:'tt',  name:'TikTok',    icon: ICONS.tt,  data: SOLD_PARSED.tt  },
  { id:'tw',  name:'Twitter',   icon: ICONS.tw,  data: SOLD_PARSED.tw  },
  { id:'cc',  name:'CapCut',    icon: ICONS.cc,  data: SOLD_PARSED.cc  },
  { id:'psn', name:'PSN',       icon: ICONS.psn, data: SOLD_PARSED.psn },
];
let activeSold = 'ig';

function buildSoldTabs() {
  document.getElementById('sold-tabs').innerHTML = SOLD_PLATFORMS.map(p => `
    <button class="ptab${p.id===activeSold?' on':''}" onclick="switchSold('${p.id}')">
      ${p.icon} ${p.name} <span class="ptab-ct">${p.data.length}</span>
    </button>
  `).join('');
}

function renderSold() {
  const p = SOLD_PLATFORMS.find(p => p.id === activeSold);
  document.getElementById('sold-body').innerHTML = `
    <div class="sold-chips">${p.data.map(u => `<div class="chip">${u}</div>`).join('')}</div>
  `;
}

function switchSold(id) { activeSold = id; buildSoldTabs(); renderSold(); }

buildSoldTabs();
renderSold();

// Build profile sold stats
(function buildProfileSoldStats() {
  const el = document.getElementById('profile-sold-stats');
  if (!el) return;
  const stats = [
    { n: SOLD_PARSED.ig.length,  l: 'Instagram' },
    { n: SOLD_PARSED.tt.length,  l: 'TikTok'    },
    { n: SOLD_PARSED.tw.length,  l: 'Twitter'   },
    { n: SOLD_PARSED.cc.length,  l: 'CapCut'    },
    { n: SOLD_PARSED.psn.length, l: 'PSN'       },
  ];
  el.innerHTML = stats.map(s => `
    <div class="pss-item">
      <span class="pss-n">${s.n}</span>
      <span class="pss-l">${s.l}</span>
    </div>
  `).join('');
})();

// ── SOLD MODAL ────────────────────────────────────────────────────────────────

function openSold() {
  document.getElementById('sold-backdrop').classList.add('open');
  document.getElementById('sold-modal').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeSold() {
  document.getElementById('sold-backdrop').classList.remove('open');
  document.getElementById('sold-modal').classList.remove('open');
  document.body.style.overflow = '';
}

document.addEventListener('keydown', e => { if (e.key === 'Escape') closeSold(); });

// ── BUY ───────────────────────────────────────────────────────────────────────

function buy(name, price) {
  window.open(`/tos?item=${encodeURIComponent(name)}&price=${encodeURIComponent(price)}`, '_blank');
}

// ── REVEAL ANIMATION ──────────────────────────────────────────────────────────

const ro = new IntersectionObserver(entries => {
  entries.forEach(e => { if(e.isIntersecting){ e.target.classList.add('on'); ro.unobserve(e.target); }});
}, { threshold: 0.06 });
document.querySelectorAll('.rev').forEach(el => ro.observe(el));
