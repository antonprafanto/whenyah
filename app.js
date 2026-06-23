/* =====================================================
   #JuaraVibeCoding — JavaScript Logic
   ===================================================== */

// ── CONSTANTS ──────────────────────────────────────────
const START_TIME = Date.now();
const TOAST_DURATION = 3000;

const QUOTES = [
  { text: "Kode yang bagus itu kayak pizza — kalau udah jadi, kamu bakal lupa capek buatnya.", author: "— Proverb Vibe Coder" },
  { text: "Bug itu bukan error, itu *fitur yang belum terdokumentasi*.", author: "— Anonymous Dev" },
  { text: "Nunggu pengumuman itu kayak loading npm install — sabar aja, pasti kelar.", author: "— Developer Sejati" },
  { text: "Jangan takut gagal. Takutnya kalau kamu nunggu sambil nganggur.", author: "— JuaraVibeCoding 2026" },
  { text: "Vibe coding itu bukan soal tools-nya, tapi soal energinya. Stay hype!", author: "— Google DevRel" },
  { text: "100 orang menang SWAG, tapi semua orang menang pengalaman. GG WP semua!", author: "— Panitia" },
  { text: "Kalau kamu baca ini sambil nunggu pengumuman, berarti kamu udah cukup serius. Respect!", author: "— Bot Bijak" },
  { text: "Ship dulu, overthink nanti. Itu prinsip vibe coding yang sesungguhnya.", author: "— Gemini AI" },
  { text: "Setiap baris kode yang kamu tulis itu lebih berharga dari scrolling TikTok.", author: "— Mentor Imajiner" },
  { text: "Yang penting udah coba. Hasilnya? Itu urusan nanti. Sekarang: HYPE!", author: "— Komunitas #JVC" },
  { text: "Nunggu itu seni. Nunggu sambil main-main ini? Itu masterpiece.", author: "— Filosofer Kode" },
  { text: "Git commit sebelum pengumuman dateng. Just in case mau flex.", author: "— Senior Dev" },
];

const VIBE_LABELS = [
  { max: 20, label: "💤 Lagi hibernasi nih...", emoji: "😴" },
  { max: 40, label: "☕ Butuh kopi dulu bro", emoji: "😐" },
  { max: 60, label: "🌤️ Mulai keliatan cahayanya!", emoji: "🙂" },
  { max: 75, label: "🔥 Vibe-nya udah panas nih!", emoji: "😤" },
  { max: 88, label: "⚡ TURBO MODE ACTIVATED", emoji: "😤" },
  { max: 95, label: "🚀 GALAXY BRAIN ENGAGED", emoji: "🤯" },
  { max: 100, label: "💥 OVER 9000! MAXIMUM VIBE!", emoji: "🫠" },
];

const CRYSTAL_RESULTS = [
  { emoji: "🏆", msg: "Crystal ball bilang: KAMU MENANG! (mungkin...)" },
  { emoji: "🎯", msg: "Aura kamu hari ini sangat memenangkan SWAG!" },
  { emoji: "🌈", msg: "Keberuntunganmu level dewa. GG!" },
  { emoji: "😂", msg: "Maaf bro... aku cuma bola plastik biasa." },
  { emoji: "🔮", msg: "Masa depan kabur... tapi vibes-nya bagus kok!" },
  { emoji: "⭐", msg: "Bintang-bintang berpihak padamu. Probably." },
  { emoji: "🍀", msg: "Lucky clover detected! Tetap semangat!" },
  { emoji: "🎲", msg: "Probabilitas menangmu: sangat acak." },
  { emoji: "🦋", msg: "Butterfly effect: klikmu barusan mungkin mengubah segalanya." },
  { emoji: "🌟", msg: "LUAR BIASA! Crystal ball-ku panas nih kamu yang punya!" },
];

const SLOT_SYMBOLS = ["🎯", "⭐", "🔥", "💎", "🚀", "🎉", "🏆", "⚡", "🎪", "🌈"];
const SLOT_RESULTS = {
  win: "🎉 JACKPOT! Alamat bakal menang nih!",
  almost: "😲 Hampir jackpot! Spin lagi!",
  normal: "😅 Spin lagi, belum hoki!",
};

const CLICK_RANKS = [
  { min: 0, label: "🐢 Santai banget nih..." },
  { min: 10, label: "🦆 Udah mulai anget!" },
  { min: 30, label: "🐇 Makin cepet nih!" },
  { min: 75, label: "🔥 Jari kamu panas bro!" },
  { min: 150, label: "⚡ SUPERSONIC CLICKER!" },
  { min: 300, label: "🤖 Robot atau manusia?!" },
  { min: 500, label: "💀 DEWA KLIK TURUN TANGAN!" },
];

const PATIENCE_EMOJIS = [
  { pct: 0, emoji: "😑" },
  { pct: 25, emoji: "😐" },
  { pct: 50, emoji: "🙂" },
  { pct: 75, emoji: "😊" },
  { pct: 95, emoji: "😄" },
  { pct: 100, emoji: "🥳" },
];

const FUN_MSGS = [
  "Masih sabar kan? 😅",
  "Bentar lagi! (mungkin) 🤞",
  "Google lagi counting votes nih... 📊",
  "Jangan kemana-mana ya! 👀",
  "Tim Google lagi kerja keras! 💪",
  "Loading... 0% (just kidding) 🤣",
  "Vibe coding = vibe waiting! ✨",
  "Cek lagi sebentar! 🎯",
];

// ── STATE ───────────────────────────────────────────────
let clickCount = 0;
let vibeChecked = false;
let patienceInterval = null;
let patienceProgress = 0;
let isPatienceRunning = false;
let patienceDone = false;
let quoteIndex = -1;
let lastFunMsgIndex = -1;

// ── INIT ────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initParticles();
  startWaitTimer();
  startStatsCounter();
  rotateFunMsg();
  animateEntrance();
});

// ── PARTICLES ───────────────────────────────────────────
function initParticles() {
  const container = document.getElementById('particles-container');
  const symbols = ['#', '{ }', '</>', '⚡', '🚀', '💻', '⭐', '🔥', '//'];
  const count = Math.min(20, Math.floor(window.innerWidth / 60));

  for (let i = 0; i < count; i++) {
    const el = document.createElement('div');
    el.className = 'particle';
    el.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    el.style.left = Math.random() * 100 + 'vw';
    el.style.animationDuration = (12 + Math.random() * 20) + 's';
    el.style.animationDelay = (Math.random() * 15) + 's';
    el.style.fontSize = (0.8 + Math.random() * 1.2) + 'rem';
    container.appendChild(el);
  }
}

// ── WAIT TIMER ──────────────────────────────────────────
function startWaitTimer() {
  const update = () => {
    const elapsed = Math.floor((Date.now() - START_TIME) / 1000);
    const h = Math.floor(elapsed / 3600);
    const m = Math.floor((elapsed % 3600) / 60);
    const s = elapsed % 60;
    document.getElementById('wait-hours').textContent = String(h).padStart(2, '0');
    document.getElementById('wait-minutes').textContent = String(m).padStart(2, '0');
    document.getElementById('wait-seconds').textContent = String(s).padStart(2, '0');
  };
  update();
  setInterval(update, 1000);
}

// ── FUN MESSAGE ROTATOR ─────────────────────────────────
function rotateFunMsg() {
  const el = document.getElementById('fun-msg');
  const update = () => {
    let idx;
    do { idx = Math.floor(Math.random() * FUN_MSGS.length); }
    while (idx === lastFunMsgIndex);
    lastFunMsgIndex = idx;
    el.style.opacity = '0';
    setTimeout(() => {
      el.textContent = FUN_MSGS[idx];
      el.style.transition = 'opacity 0.5s';
      el.style.opacity = '1';
    }, 400);
  };
  update();
  setInterval(update, 5000);
}

// ── STATS COUNTER ───────────────────────────────────────
function startStatsCounter() {
  // Update every second
  const update = () => {
    const elapsed = (Date.now() - START_TIME) / 1000;
    const minutes = elapsed / 60;

    // Coffee: 1 cup per 20 min of waiting
    const coffee = Math.max(0, Math.floor(minutes / 20));
    // Lines of code: avg 10 lines/min
    const lines = Math.floor(minutes * 10);
    // Songs: avg 3.5 min per song
    const songs = Math.floor(minutes / 3.5);
    // Steps: avg 100 steps per min (casual walk)
    const steps = Math.floor(minutes * 100);

    animateNumber('stat-coffee', coffee);
    animateNumber('stat-lines', lines);
    animateNumber('stat-songs', songs);
    animateNumber('stat-steps', steps);
  };

  update();
  setInterval(update, 3000);
}

let statValues = { 'stat-coffee': 0, 'stat-lines': 0, 'stat-songs': 0, 'stat-steps': 0 };

function animateNumber(id, target) {
  const el = document.getElementById(id);
  if (!el) return;
  const current = statValues[id] || 0;
  if (current === target) return;
  statValues[id] = target;
  const diff = target - current;
  const steps = 20;
  let step = 0;
  const interval = setInterval(() => {
    step++;
    const val = Math.round(current + (diff * step / steps));
    el.textContent = val.toLocaleString('id-ID');
    if (step >= steps) clearInterval(interval);
  }, 50);
}

// ── SLOT MACHINE ────────────────────────────────────────
let isSpinning = false;

function spinSlot() {
  if (isSpinning) return;
  isSpinning = true;

  const btn = document.getElementById('spin-btn');
  const resultEl = document.getElementById('slot-result');
  btn.disabled = true;
  btn.textContent = '🌀 SPINNING...';
  resultEl.textContent = '...';

  const reels = ['slot-a', 'slot-b', 'slot-c'];
  reels.forEach(id => {
    document.getElementById(id).classList.add('spinning');
  });

  // Animate each reel landing
  const finalSymbols = [];
  reels.forEach((id, i) => {
    const delay = 700 + i * 400;
    setTimeout(() => {
      const sym = SLOT_SYMBOLS[Math.floor(Math.random() * SLOT_SYMBOLS.length)];
      finalSymbols.push(sym);
      const el = document.getElementById(id);
      el.classList.remove('spinning');
      el.querySelector('span').textContent = sym;
    }, delay);
  });

  // Final result
  setTimeout(() => {
    const [a, b, c] = finalSymbols;
    let msg;
    if (a === b && b === c) {
      msg = SLOT_RESULTS.win;
      resultEl.style.background = '#FFE135';
      resultEl.style.color = '#000';
      showToast('🎰 JACKPOT! Lucky banget kamu!');
    } else if (a === b || b === c || a === c) {
      msg = SLOT_RESULTS.almost;
      resultEl.style.background = 'rgba(0,0,0,0.1)';
      resultEl.style.color = '';
    } else {
      msg = SLOT_RESULTS.normal;
      resultEl.style.background = 'rgba(0,0,0,0.1)';
      resultEl.style.color = '';
    }
    resultEl.textContent = msg;
    btn.disabled = false;
    btn.textContent = '🎰 SPIN LAGI!';
    isSpinning = false;
  }, 2200);
}

// ── VIBE CHECKER ────────────────────────────────────────
function checkVibe() {
  const btn = document.getElementById('vibe-btn');
  const fill = document.getElementById('vibe-fill');
  const pct = document.getElementById('vibe-pct');
  const label = document.getElementById('vibe-label');

  btn.disabled = true;
  btn.textContent = '⏳ Menganalisis...';

  // Fun animation: go up and down a few times
  let phase = 0;
  const flicker = setInterval(() => {
    phase++;
    const flickVal = Math.floor(Math.random() * 40 + 20);
    fill.style.width = flickVal + '%';
    pct.textContent = flickVal + '%';
    if (phase >= 8) clearInterval(flicker);
  }, 180);

  setTimeout(() => {
    const finalVal = Math.floor(Math.random() * 60 + 30);
    fill.style.width = finalVal + '%';
    pct.textContent = finalVal + '%';

    const match = VIBE_LABELS.find(v => finalVal <= v.max) || VIBE_LABELS[VIBE_LABELS.length - 1];
    label.textContent = match.label;

    btn.textContent = '⚡ CEK LAGI';
    btn.disabled = false;
  }, 1700);
}

// ── CLICK COUNTER ───────────────────────────────────────
function addClick() {
  clickCount++;
  const countEl = document.getElementById('click-count');
  const rankEl = document.getElementById('click-rank');

  countEl.textContent = clickCount.toLocaleString('id-ID');
  countEl.classList.add('bump');
  setTimeout(() => countEl.classList.remove('bump'), 100);

  // Update rank
  const rank = [...CLICK_RANKS].reverse().find(r => clickCount >= r.min);
  if (rank) rankEl.textContent = rank.label;

  // Milestone toasts
  if ([10, 50, 100, 250, 500].includes(clickCount)) {
    showToast(`🎉 ${clickCount} klik! ${rank?.label || 'GG!'}`);
  }
}

// ── QUOTE GENERATOR ─────────────────────────────────────
function newQuote() {
  let idx;
  do { idx = Math.floor(Math.random() * QUOTES.length); }
  while (idx === quoteIndex);
  quoteIndex = idx;

  const q = QUOTES[idx];
  const textEl = document.getElementById('quote-text');
  const authorEl = document.getElementById('quote-author');
  const box = document.getElementById('quote-box');

  box.style.opacity = '0';
  box.style.transform = 'translateY(8px)';
  box.style.transition = 'all 0.3s ease';

  setTimeout(() => {
    textEl.textContent = `"${q.text}"`;
    authorEl.textContent = q.author;
    box.style.opacity = '1';
    box.style.transform = 'translateY(0)';
  }, 300);
}

// ── CRYSTAL BALL ────────────────────────────────────────
let lastCrystalIdx = -1;

function predictWin() {
  const ball = document.getElementById('crystal-ball');
  const emoji = document.getElementById('crystal-emoji');
  const result = document.getElementById('predict-result');
  const glow = document.getElementById('crystal-glow');

  // Shake animation
  ball.style.animation = 'wiggle 0.4s ease-in-out';
  emoji.textContent = '✨';
  result.textContent = 'Crystal ball sedang berpikir...';
  glow.classList.add('active');

  setTimeout(() => {
    let idx;
    do { idx = Math.floor(Math.random() * CRYSTAL_RESULTS.length); }
    while (idx === lastCrystalIdx);
    lastCrystalIdx = idx;

    const r = CRYSTAL_RESULTS[idx];
    emoji.textContent = r.emoji;
    result.textContent = r.msg;
    ball.style.animation = '';
  }, 1200);
}

// ── PATIENCE GAME ───────────────────────────────────────
const PATIENCE_DURATION = 3000; // 3 seconds
let patienceStart = null;
let patienceRAF = null;

function startPatience() {
  if (patienceDone) return;
  isPatienceRunning = true;
  patienceStart = Date.now();
  animatePatience();
}

function animatePatience() {
  if (!isPatienceRunning) return;

  const elapsed = Date.now() - patienceStart;
  const pct = Math.min(elapsed / PATIENCE_DURATION, 1);
  patienceProgress = pct;

  // Update ring
  const circle = document.getElementById('patience-progress');
  const circumference = 251.2;
  circle.style.strokeDashoffset = circumference * (1 - pct);

  // Update emoji
  const pctVal = Math.floor(pct * 100);
  const match = [...PATIENCE_EMOJIS].reverse().find(p => pctVal >= p.pct);
  document.getElementById('patience-emoji').textContent = match?.emoji || '😑';

  // Update msg
  const msgEl = document.getElementById('patience-msg');
  if (pctVal < 30) msgEl.textContent = 'Tahan... jangan lepas! 🤏';
  else if (pctVal < 70) msgEl.textContent = 'Bagus! Setengah jalan! 💪';
  else if (pctVal < 95) msgEl.textContent = 'Hampir! JANGAN LEPAS! 😤';

  if (pct >= 1) {
    patienceDone = true;
    isPatienceRunning = false;
    document.getElementById('patience-msg').textContent = '🥳 BERHASIL! Kamu super sabar!';
    document.getElementById('patience-btn').textContent = '✅ SELESAI!';
    document.getElementById('patience-btn').disabled = true;
    document.getElementById('patience-progress').style.stroke = '#3DD68C';
    showToast('🧘 Kesabaran level dewa! Pasti menang SWAG!');
    return;
  }

  patienceRAF = requestAnimationFrame(animatePatience);
}

function stopPatience() {
  if (patienceDone) return;
  isPatienceRunning = false;
  cancelAnimationFrame(patienceRAF);

  const pctVal = Math.floor(patienceProgress * 100);
  const msgEl = document.getElementById('patience-msg');

  if (pctVal < 10) {
    msgEl.textContent = '😔 Baru mulai udah nyerah...';
  } else if (pctVal < 50) {
    msgEl.textContent = `😬 Baru ${pctVal}%! Coba lagi!`;
  } else if (pctVal < 90) {
    msgEl.textContent = `😤 ${pctVal}%! Hampir! Sekali lagi!`;
  } else {
    msgEl.textContent = `😱 ${pctVal}% — setipis kertas!`;
  }

  // Reset ring slowly
  setTimeout(() => {
    if (!patienceDone) {
      patienceProgress = 0;
      document.getElementById('patience-progress').style.strokeDashoffset = '251.2';
      document.getElementById('patience-progress').style.transition = 'stroke-dashoffset 0.5s ease';
      document.getElementById('patience-emoji').textContent = '😐';
      msgEl.textContent = 'Tahan tombol buat mulai!';
      setTimeout(() => {
        document.getElementById('patience-progress').style.transition = '';
      }, 600);
    }
  }, 1000);
}

// ── SHARE FUNCTIONS ─────────────────────────────────────
function shareTwitter() {
  const text = encodeURIComponent(
    'Masih nunggu pengumuman 100 pemenang SWAG #JuaraVibeCoding dari @GoogleIndonesia? Sambil nunggu, main-main dulu di sini! 🎮\n\n'
  );
  const url = encodeURIComponent(window.location.href);
  window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
}

function copyLink() {
  const url = window.location.href;
  navigator.clipboard.writeText(url).then(() => {
    const copied = document.getElementById('share-copied');
    copied.classList.add('show');
    showToast('📋 Link tersalin! Share ke teman-teman!');
    setTimeout(() => copied.classList.remove('show'), 3000);
  }).catch(() => {
    // Fallback
    const ta = document.createElement('textarea');
    ta.value = url;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    showToast('📋 Link tersalin!');
  });
}

// ── TOAST NOTIFICATION ──────────────────────────────────
let toastTimeout = null;

function showToast(msg) {
  const toast = document.getElementById('toast');
  if (toastTimeout) clearTimeout(toastTimeout);

  toast.textContent = msg;
  toast.classList.add('show');
  toastTimeout = setTimeout(() => toast.classList.remove('show'), TOAST_DURATION);
}

// ── ENTRANCE ANIMATIONS ─────────────────────────────────
function animateEntrance() {
  const cards = document.querySelectorAll('.game-card');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  cards.forEach((card, i) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `opacity 0.5s ease ${i * 0.08}s, transform 0.5s ease ${i * 0.08}s`;
    observer.observe(card);
  });

  // Stats cards
  const statCards = document.querySelectorAll('.stat-card');
  const statObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, i * 100);
        statObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  statCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
    statObserver.observe(card);
  });
}

// ── EASTER EGG ──────────────────────────────────────────
let konamiCode = [];
const KONAMI = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];

document.addEventListener('keydown', e => {
  konamiCode.push(e.key);
  konamiCode = konamiCode.slice(-10);
  if (konamiCode.join(',') === KONAMI.join(',')) {
    showToast('🕹️ KONAMI CODE! Kamu resmi jadi Dewa Vibe Coding!');
    document.body.style.animation = 'rainbowBg 0.5s linear 6';
    confettiBlast();
  }
});

function confettiBlast() {
  const colors = ['#FFE135', '#FF5DA0', '#4A90FF', '#3DD68C', '#FF7A35', '#B57BFF'];
  for (let i = 0; i < 60; i++) {
    setTimeout(() => {
      const el = document.createElement('div');
      el.style.cssText = `
        position: fixed;
        top: ${Math.random() * 60}vh;
        left: ${Math.random() * 100}vw;
        width: 10px;
        height: 10px;
        background: ${colors[Math.floor(Math.random() * colors.length)]};
        border: 2px solid black;
        z-index: 9998;
        pointer-events: none;
        animation: confettiFall 2s ease forwards;
        transform: rotate(${Math.random() * 360}deg);
      `;
      document.body.appendChild(el);
      setTimeout(() => el.remove(), 2000);
    }, i * 30);
  }
}

// Add confetti animation
const style = document.createElement('style');
style.textContent = `
  @keyframes confettiFall {
    0% { transform: translateY(0) rotate(0deg); opacity: 1; }
    100% { transform: translateY(80vh) rotate(720deg); opacity: 0; }
  }
  @keyframes rainbowBg {
    0% { filter: hue-rotate(0deg); }
    100% { filter: hue-rotate(360deg); }
  }
`;
document.head.appendChild(style);

// ── AUTO QUOTE ON LOAD ──────────────────────────────────
setTimeout(newQuote, 500);
