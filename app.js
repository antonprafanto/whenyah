/* =====================================================
   #JuaraVibeCoding — Waiting Room | app.js v3
   ===================================================== */

// ── CONSTANTS ──────────────────────────────────────────
var START_TIME = Date.now();
var TOAST_DURATION = 3000;

var QUOTES = [
  { text: "Kode yang bagus itu kayak pizza — kalau udah jadi, kamu bakal lupa capek buatnya.", author: "— Proverb Vibe Coder" },
  { text: "Bug itu bukan error, itu fitur yang belum terdokumentasi.", author: "— Anonymous Dev" },
  { text: "Nunggu pengumuman itu kayak loading npm install — sabar aja, pasti kelar.", author: "— Developer Sejati" },
  { text: "Jangan takut gagal. Takutnya kalau kamu nunggu sambil nganggur.", author: "— JuaraVibeCoding 2026" },
  { text: "Vibe coding itu bukan soal tools-nya, tapi soal energinya. Stay hype!", author: "— Google DevRel" },
  { text: "100 orang menang SWAG, tapi semua orang menang pengalaman. GG WP semua!", author: "— Panitia" },
  { text: "Kalau kamu baca ini sambil nunggu, berarti kamu udah cukup serius. Respect!", author: "— Bot Bijak" },
  { text: "Ship dulu, overthink nanti. Itu prinsip vibe coding yang sesungguhnya.", author: "— Gemini AI" },
  { text: "Setiap baris kode yang kamu tulis lebih berharga dari scrolling TikTok.", author: "— Mentor Imajiner" },
  { text: "Yang penting udah coba. Hasilnya? Itu urusan nanti. Sekarang: HYPE!", author: "— Komunitas #JVC" },
  { text: "Nunggu itu seni. Nunggu sambil main-main ini? Itu masterpiece.", author: "— Filosofer Kode" },
  { text: "Git commit sebelum pengumuman dateng. Just in case mau flex.", author: "— Senior Dev" },
];

var VIBE_LABELS = [
  { max: 20,  label: "Lagi hibernasi nih..." },
  { max: 40,  label: "Butuh kopi dulu bro" },
  { max: 60,  label: "Mulai keliatan cahayanya!" },
  { max: 75,  label: "Vibe-nya udah panas nih!" },
  { max: 88,  label: "TURBO MODE ACTIVATED" },
  { max: 95,  label: "GALAXY BRAIN ENGAGED" },
  { max: 100, label: "OVER 9000! MAXIMUM VIBE!" },
];

var CLICK_RANKS = [
  { min: 0,   label: "Santai banget nih..." },
  { min: 10,  label: "Udah mulai anget!" },
  { min: 30,  label: "Makin cepet nih!" },
  { min: 75,  label: "Jari kamu panas bro!" },
  { min: 150, label: "SUPERSONIC CLICKER!" },
  { min: 300, label: "Robot atau manusia?!" },
  { min: 500, label: "DEWA KLIK TURUN TANGAN!" },
];

var PATIENCE_EMOJIS = [
  { pct: 0,   emoji: "😑" },
  { pct: 25,  emoji: "😐" },
  { pct: 50,  emoji: "🙂" },
  { pct: 75,  emoji: "😊" },
  { pct: 95,  emoji: "😄" },
  { pct: 100, emoji: "🥳" },
];

var FUN_MSGS = [
  "Masih sabar kan? 😅",
  "Bentar lagi! (mungkin) 🤞",
  "Google lagi counting votes nih... 📊",
  "Jangan kemana-mana ya! 👀",
  "Tim Google lagi kerja keras! 💪",
  "Loading... 0% (just kidding) 🤣",
  "Vibe coding = vibe waiting! ✨",
  "Cek lagi sebentar! 🎯",
];

// ── TYPING GAME CONSTANTS ────────────────────────────────
var TYPING_PROMPTS = [
  "vibe coding bukan soal tools tapi soal semangat dan kreativitas",
  "google juara vibe coding indonesia dua ribu dua puluh enam",
  "ship early ship often iterate fast dan jangan lupa deploy",
  "kode yang bagus itu simpel mudah dibaca dan mudah diubah",
  "belajar coding itu susah tapi hasilnya worth it banget percaya deh",
  "debug itu bukan gagal tapi proses belajar yang menyenangkan",
  "satu commit sehari menjaga developer tetap produktif dan bahagia",
  "nunggu pengumuman sambil ngetik itu produktif namanya",
  "seratus pemenang akan dapat swag keren dari google indonesia",
  "vibe coding artinya coding dengan enjoy dan penuh semangat",
];

var TYPING_GRADES = [
  { min: 80,  toast: "WPM kamu luar biasa! Jempolan!" },
  { min: 60,  toast: "Kenceng! Jari kamu turbo nih!" },
  { min: 40,  toast: "Bagus! Masih bisa lebih ngebut!" },
  { min: 25,  toast: "Pelan-pelan juga fine kok!" },
  { min: 0,   toast: "Coba lagi, pasti lebih cepat!" },
];

// ── REACTION GAME CONSTANTS ──────────────────────────────
var REACTION_GRADES = [
  { max: 150,      toast: "Reflex dewa! Kamu jago banget!" },
  { max: 220,      toast: "Super cepet! Latihan terus!" },
  { max: 300,      toast: "Bagus! Masih bisa lebih cepet!" },
  { max: 400,      toast: "Lumayan! Coba lagi bro!" },
  { max: 550,      toast: "Tangan kamu lagi ngemil ya?" },
  { max: Infinity, toast: "Hayo fokus! Jangan ngantuk!" },
];

// ── STATE ───────────────────────────────────────────────
var clickCount = 0;
var quoteIndex = -1;
var lastFunMsgIndex = -1;
var statValues = { 'stat-coffee': 0, 'stat-lines': 0, 'stat-songs': 0, 'stat-steps': 0 };

// Typing state
var typingActive = false;
var typingStartTime = null;
var typingPromptText = '';
var typingBestWpm = null;

// Reaction state
var reactionState = 'idle';
var reactionGreenAt = null;
var reactionTimeout = null;
var reactionBest = null;
var reactionTries = 0;

// Patience state
var patienceProgress = 0;
var isPatienceRunning = false;
var patienceDone = false;
var patienceStart = null;
var patienceRAF = null;

// Memory game state
var memoryTiles = ['💻', '☕', '🚀', '🐛', '📦', '⚡', '💻', '☕', '🚀', '🐛', '📦', '⚡'];
var memoryFlipped = [];
var memoryMoves = 0;
var memoryLock = false;
var memoryBest = null;

// Simon game state
var simonSeq = [];
var simonUserSeq = [];
var simonRound = 0;
var simonActive = false;
var simonPlayingSeq = false;
var simonBest = null;

// ── INIT ────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', function() {
  initParticles();
  startWaitTimer();
  startStatsCounter();
  rotateFunMsg();
  animateEntrance();
  // Auto-load first quote
  setTimeout(newQuote, 500);
  // Init new games
  initMemoryGame();
  resetSimonState();
});

// ── PARTICLES ───────────────────────────────────────────
function initParticles() {
  var container = document.getElementById('particles-container');
  if (!container) return;
  var symbols = ['#', '{ }', '</>', 'code', 'git', '//'];
  var count = Math.min(18, Math.floor(window.innerWidth / 70));
  for (var i = 0; i < count; i++) {
    var el = document.createElement('div');
    el.className = 'particle';
    el.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    el.style.left = (Math.random() * 100) + 'vw';
    el.style.animationDuration = (12 + Math.random() * 20) + 's';
    el.style.animationDelay = (Math.random() * 15) + 's';
    el.style.fontSize = (0.8 + Math.random() * 1.2) + 'rem';
    container.appendChild(el);
  }
}

// ── WAIT TIMER ──────────────────────────────────────────
function startWaitTimer() {
  function update() {
    var elapsed = Math.floor((Date.now() - START_TIME) / 1000);
    var h = Math.floor(elapsed / 3600);
    var m = Math.floor((elapsed % 3600) / 60);
    var s = elapsed % 60;
    var hoursEl = document.getElementById('wait-hours');
    var minEl   = document.getElementById('wait-minutes');
    var secEl   = document.getElementById('wait-seconds');
    if (hoursEl) hoursEl.textContent = String(h).padStart(2, '0');
    if (minEl)   minEl.textContent   = String(m).padStart(2, '0');
    if (secEl)   secEl.textContent   = String(s).padStart(2, '0');
  }
  update();
  setInterval(update, 1000);
}

// ── FUN MESSAGE ROTATOR ─────────────────────────────────
function rotateFunMsg() {
  var el = document.getElementById('fun-msg');
  if (!el) return;
  function update() {
    var idx;
    do { idx = Math.floor(Math.random() * FUN_MSGS.length); }
    while (idx === lastFunMsgIndex);
    lastFunMsgIndex = idx;
    el.style.opacity = '0';
    setTimeout(function() {
      el.textContent = FUN_MSGS[idx];
      el.style.transition = 'opacity 0.5s';
      el.style.opacity = '1';
    }, 400);
  }
  update();
  setInterval(update, 5000);
}

// ── STATS COUNTER ───────────────────────────────────────
function startStatsCounter() {
  function update() {
    var elapsed = (Date.now() - START_TIME) / 1000;
    var minutes = elapsed / 60;
    var coffee = Math.max(0, Math.floor(minutes / 20));
    var lines  = Math.floor(minutes * 10);
    var songs  = Math.floor(minutes / 3.5);
    var steps  = Math.floor(minutes * 100);
    animateNumber('stat-coffee', coffee);
    animateNumber('stat-lines',  lines);
    animateNumber('stat-songs',  songs);
    animateNumber('stat-steps',  steps);
  }
  update();
  setInterval(update, 3000);
}

function animateNumber(id, target) {
  var el = document.getElementById(id);
  if (!el) return;
  var current = statValues[id] || 0;
  if (current === target) return;
  statValues[id] = target;
  var diff  = target - current;
  var steps = 20;
  var step  = 0;
  var interval = setInterval(function() {
    step++;
    var val = Math.round(current + (diff * step / steps));
    el.textContent = val.toLocaleString('id-ID');
    if (step >= steps) clearInterval(interval);
  }, 50);
}

// ── TYPING SPEED TEST ────────────────────────────────────
function startTyping() {
  var btn      = document.getElementById('typing-btn');
  var input    = document.getElementById('typing-input');
  var promptEl = document.getElementById('typing-prompt');
  var wpmEl    = document.getElementById('typing-wpm');
  var accEl    = document.getElementById('typing-acc');
  if (!input || !promptEl) return;

  // Pick a random prompt different from the last
  var newPrompt;
  do {
    newPrompt = TYPING_PROMPTS[Math.floor(Math.random() * TYPING_PROMPTS.length)];
  } while (newPrompt === typingPromptText && TYPING_PROMPTS.length > 1);
  typingPromptText = newPrompt;

  // Render prompt as per-character spans
  var html = '';
  for (var i = 0; i < typingPromptText.length; i++) {
    var ch = typingPromptText[i];
    html += '<span class="typing-char" id="tc-' + i + '">' + (ch === ' ' ? '&nbsp;' : ch) + '</span>';
  }
  promptEl.innerHTML = html;

  // Cursor on first char
  var firstChar = document.getElementById('tc-0');
  if (firstChar) firstChar.classList.add('cursor');

  // Reset
  input.value    = '';
  input.disabled = false;
  input.focus();
  if (wpmEl) wpmEl.textContent = '—';
  if (accEl) accEl.textContent = '—';
  typingStartTime = null;
  typingActive    = true;

  if (btn) btn.textContent = '🔄 Ganti Soal';
  input.oninput = handleTypingInput;
}

function handleTypingInput(e) {
  if (!typingActive) return;
  var typed = e.target.value;

  // Start timer on first keypress
  if (!typingStartTime && typed.length > 0) {
    typingStartTime = Date.now();
  }

  // Highlight each character
  for (var i = 0; i < typingPromptText.length; i++) {
    var span = document.getElementById('tc-' + i);
    if (!span) continue;
    span.classList.remove('correct', 'wrong', 'cursor');
    if (i < typed.length) {
      span.classList.add(typed[i] === typingPromptText[i] ? 'correct' : 'wrong');
    } else if (i === typed.length) {
      span.classList.add('cursor');
    }
  }

  // Finished?
  if (typed.length >= typingPromptText.length) {
    finishTyping(typed);
  }
}

function finishTyping(typed) {
  typingActive = false;
  var input = document.getElementById('typing-input');
  var btn   = document.getElementById('typing-btn');
  if (input) input.disabled = true;

  var elapsedMin = (Date.now() - typingStartTime) / 60000;
  var wordCount  = typingPromptText.trim().split(' ').length;
  var wpm        = Math.round(wordCount / elapsedMin);

  var correct = 0;
  for (var i = 0; i < typingPromptText.length; i++) {
    if (typed[i] === typingPromptText[i]) correct++;
  }
  var acc = Math.round((correct / typingPromptText.length) * 100);

  if (typingBestWpm === null || wpm > typingBestWpm) typingBestWpm = wpm;

  var wpmEl  = document.getElementById('typing-wpm');
  var accEl  = document.getElementById('typing-acc');
  var bestEl = document.getElementById('typing-best');
  if (wpmEl)  wpmEl.textContent  = wpm;
  if (accEl)  accEl.textContent  = acc + '%';
  if (bestEl) bestEl.textContent = typingBestWpm;

  var grade = TYPING_GRADES[TYPING_GRADES.length - 1];
  for (var j = 0; j < TYPING_GRADES.length; j++) {
    if (wpm >= TYPING_GRADES[j].min) { grade = TYPING_GRADES[j]; break; }
  }
  showToast(grade.toast + ' (' + wpm + ' WPM, ' + acc + '% akurat)');

  if (btn) btn.textContent = '⌨️ COBA LAGI';
}

// ── VIBE CHECKER ────────────────────────────────────────
function checkVibe() {
  var btn   = document.getElementById('vibe-btn');
  var fill  = document.getElementById('vibe-fill');
  var pct   = document.getElementById('vibe-pct');
  var label = document.getElementById('vibe-label');
  if (!btn) return;

  btn.disabled    = true;
  btn.textContent = '⏳ Menganalisis...';

  var phase = 0;
  var flicker = setInterval(function() {
    phase++;
    var flickVal = Math.floor(Math.random() * 40 + 20);
    if (fill) fill.style.width  = flickVal + '%';
    if (pct)  pct.textContent   = flickVal + '%';
    if (phase >= 8) clearInterval(flicker);
  }, 180);

  setTimeout(function() {
    var finalVal = Math.floor(Math.random() * 60 + 30);
    if (fill) fill.style.width = finalVal + '%';
    if (pct)  pct.textContent  = finalVal + '%';

    var match = VIBE_LABELS[VIBE_LABELS.length - 1];
    for (var i = 0; i < VIBE_LABELS.length; i++) {
      if (finalVal <= VIBE_LABELS[i].max) { match = VIBE_LABELS[i]; break; }
    }
    if (label) label.textContent = match.label;
    btn.textContent = '⚡ CEK LAGI';
    btn.disabled    = false;
  }, 1700);
}

// ── CLICK COUNTER ───────────────────────────────────────
function addClick() {
  clickCount++;
  var countEl = document.getElementById('click-count');
  var rankEl  = document.getElementById('click-rank');
  if (countEl) {
    countEl.textContent = clickCount.toLocaleString('id-ID');
    countEl.classList.add('bump');
    setTimeout(function() { countEl.classList.remove('bump'); }, 100);
  }

  var rank = CLICK_RANKS[0];
  for (var i = CLICK_RANKS.length - 1; i >= 0; i--) {
    if (clickCount >= CLICK_RANKS[i].min) { rank = CLICK_RANKS[i]; break; }
  }
  if (rankEl) rankEl.textContent = rank.label;

  if ([10, 50, 100, 250, 500].indexOf(clickCount) !== -1) {
    showToast(clickCount + ' klik! ' + rank.label);
  }
}

// ── QUOTE GENERATOR ─────────────────────────────────────
function newQuote() {
  var idx;
  do { idx = Math.floor(Math.random() * QUOTES.length); }
  while (idx === quoteIndex);
  quoteIndex = idx;

  var q      = QUOTES[idx];
  var textEl = document.getElementById('quote-text');
  var authEl = document.getElementById('quote-author');
  var box    = document.getElementById('quote-box');
  if (!box) return;

  box.style.opacity   = '0';
  box.style.transform = 'translateY(8px)';
  box.style.transition = 'all 0.3s ease';

  setTimeout(function() {
    if (textEl) textEl.textContent = '"' + q.text + '"';
    if (authEl) authEl.textContent = q.author;
    box.style.opacity   = '1';
    box.style.transform = 'translateY(0)';
  }, 300);
}

// ── REACTION TIME GAME ──────────────────────────────────
function startReaction() {
  if (reactionState === 'countdown' || reactionState === 'waiting' || reactionState === 'go') return;

  reactionState = 'countdown';
  clearTimeout(reactionTimeout);

  var box     = document.getElementById('reaction-box');
  var stateEl = document.getElementById('reaction-state');
  var subEl   = document.getElementById('reaction-sub');
  var btn     = document.getElementById('reaction-btn');
  if (!box || !stateEl) return;

  box.className = 'reaction-box';
  if (btn) { btn.disabled = true; btn.textContent = '⏳ Tunggu...'; }

  var count = 3;
  stateEl.textContent = count;
  if (subEl) subEl.textContent = 'Bersiap...';

  function tick() {
    count--;
    if (count > 0) {
      stateEl.textContent = count;
      reactionTimeout = setTimeout(tick, 700);
    } else {
      // Red phase — random delay
      reactionState = 'waiting';
      stateEl.textContent = 'TUNGGU!';
      if (subEl) subEl.textContent = 'Jangan klik dulu!';
      box.classList.add('state-waiting');

      var delay = 1000 + Math.random() * 2500;
      reactionTimeout = setTimeout(function() {
        reactionState   = 'go';
        reactionGreenAt = Date.now();
        box.classList.remove('state-waiting');
        box.classList.add('state-go');
        stateEl.textContent = 'KLIK!';
        if (subEl) subEl.textContent = 'SEKARANG!!!';
      }, delay);
    }
  }
  reactionTimeout = setTimeout(tick, 700);
}

function handleReactionClick() {
  if (reactionState === 'idle' || reactionState === 'result') return;
  clearTimeout(reactionTimeout);

  var box     = document.getElementById('reaction-box');
  var stateEl = document.getElementById('reaction-state');
  var subEl   = document.getElementById('reaction-sub');
  var btn     = document.getElementById('reaction-btn');
  if (!box || !stateEl) return;

  if (reactionState === 'waiting' || reactionState === 'countdown') {
    reactionState = 'result';
    box.className = 'reaction-box state-early';
    stateEl.textContent = 'TERLALU CEPAT!';
    if (subEl) subEl.textContent = 'Tunggu sampai HIJAU dulu!';
    showToast('Salah klik! Tunggu sampai hijau ya!');
    if (btn) { btn.disabled = false; btn.textContent = '⚡ COBA LAGI'; }
    return;
  }

  if (reactionState === 'go') {
    var elapsed = Date.now() - reactionGreenAt;
    reactionTries++;
    reactionState = 'result';

    if (reactionBest === null || elapsed < reactionBest) reactionBest = elapsed;

    var grade = REACTION_GRADES[REACTION_GRADES.length - 1];
    for (var i = 0; i < REACTION_GRADES.length; i++) {
      if (elapsed <= REACTION_GRADES[i].max) { grade = REACTION_GRADES[i]; break; }
    }

    box.className       = 'reaction-box';
    box.style.background = 'rgba(0,0,0,0.08)';
    stateEl.textContent = elapsed + ' ms';
    if (subEl) subEl.textContent = elapsed < 200 ? 'Kilat!' : elapsed < 350 ? 'Mantap!' : 'Coba lagi!';

    var lastEl  = document.getElementById('reaction-last');
    var bestEl  = document.getElementById('reaction-best');
    var triesEl = document.getElementById('reaction-tries');
    if (lastEl)  lastEl.textContent  = elapsed + ' ms';
    if (bestEl)  bestEl.textContent  = reactionBest + ' ms';
    if (triesEl) triesEl.textContent = reactionTries;

    showToast(grade.toast + ' (' + elapsed + 'ms)');
    if (btn) { btn.disabled = false; btn.textContent = '⚡ COBA LAGI'; }

    setTimeout(function() { box.style.background = ''; }, 2000);
  }
}

// ── PATIENCE GAME ───────────────────────────────────────
var PATIENCE_DURATION = 3000;

function startPatience() {
  if (patienceDone) return;
  isPatienceRunning = true;
  patienceStart     = Date.now();
  animatePatience();
}

function animatePatience() {
  if (!isPatienceRunning) return;
  var elapsed = Date.now() - patienceStart;
  var pct     = Math.min(elapsed / PATIENCE_DURATION, 1);
  patienceProgress = pct;

  var circle = document.getElementById('patience-progress');
  if (circle) circle.style.strokeDashoffset = (251.2 * (1 - pct)).toString();

  var pctVal = Math.floor(pct * 100);
  var match  = PATIENCE_EMOJIS[0];
  for (var i = PATIENCE_EMOJIS.length - 1; i >= 0; i--) {
    if (pctVal >= PATIENCE_EMOJIS[i].pct) { match = PATIENCE_EMOJIS[i]; break; }
  }
  var emojiEl = document.getElementById('patience-emoji');
  if (emojiEl) emojiEl.textContent = match.emoji;

  var msgEl = document.getElementById('patience-msg');
  if (msgEl) {
    if (pctVal < 30)       msgEl.textContent = 'Tahan... jangan lepas!';
    else if (pctVal < 70)  msgEl.textContent = 'Bagus! Setengah jalan!';
    else if (pctVal < 95)  msgEl.textContent = 'Hampir! JANGAN LEPAS!';
  }

  if (pct >= 1) {
    patienceDone      = true;
    isPatienceRunning = false;
    if (msgEl) msgEl.textContent = 'BERHASIL! Kamu super sabar!';
    var patienceBtn = document.getElementById('patience-btn');
    if (patienceBtn) { patienceBtn.textContent = 'SELESAI!'; patienceBtn.disabled = true; }
    if (circle) circle.style.stroke = '#3DD68C';
    showToast('Kesabaran level dewa! Pasti menang SWAG!');
    return;
  }
  patienceRAF = requestAnimationFrame(animatePatience);
}

function stopPatience() {
  if (patienceDone) return;
  isPatienceRunning = false;
  cancelAnimationFrame(patienceRAF);

  var pctVal = Math.floor(patienceProgress * 100);
  var msgEl  = document.getElementById('patience-msg');
  if (msgEl) {
    if (pctVal < 10)       msgEl.textContent = 'Baru mulai udah nyerah...';
    else if (pctVal < 50)  msgEl.textContent = 'Baru ' + pctVal + '%! Coba lagi!';
    else if (pctVal < 90)  msgEl.textContent = pctVal + '%! Hampir! Sekali lagi!';
    else                   msgEl.textContent = pctVal + '% — setipis kertas!';
  }

  setTimeout(function() {
    if (!patienceDone) {
      patienceProgress = 0;
      var circle = document.getElementById('patience-progress');
      if (circle) {
        circle.style.transition      = 'stroke-dashoffset 0.5s ease';
        circle.style.strokeDashoffset = '251.2';
        setTimeout(function() { circle.style.transition = ''; }, 600);
      }
      var emojiEl = document.getElementById('patience-emoji');
      if (emojiEl) emojiEl.textContent = '😐';
      if (msgEl)   msgEl.textContent   = 'Tahan tombol buat mulai!';
    }
  }, 1000);
}

// ── SHARE FUNCTIONS ─────────────────────────────────────
function shareTwitter() {
  var text = encodeURIComponent('Masih nunggu pengumuman 100 pemenang SWAG #JuaraVibeCoding dari @GoogleIndonesia? Sambil nunggu, main-main dulu di sini! ');
  var url  = encodeURIComponent(window.location.href);
  window.open('https://twitter.com/intent/tweet?text=' + text + '&url=' + url, '_blank');
}

function copyLink() {
  var url = window.location.href;
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(url).then(function() {
      showCopied();
    }).catch(function() { fallbackCopy(url); });
  } else {
    fallbackCopy(url);
  }
}

function fallbackCopy(text) {
  var ta = document.createElement('textarea');
  ta.value = text;
  ta.style.position = 'fixed';
  ta.style.opacity  = '0';
  document.body.appendChild(ta);
  ta.focus();
  ta.select();
  try { document.execCommand('copy'); } catch(e) {}
  document.body.removeChild(ta);
  showCopied();
}

function showCopied() {
  var el = document.getElementById('share-copied');
  if (el) { el.classList.add('show'); setTimeout(function() { el.classList.remove('show'); }, 3000); }
  showToast('Link tersalin! Share ke teman-teman!');
}

// ── TOAST ───────────────────────────────────────────────
var toastTimeout = null;

function showToast(msg) {
  var toast = document.getElementById('toast');
  if (!toast) return;
  if (toastTimeout) clearTimeout(toastTimeout);
  toast.textContent = msg;
  toast.classList.add('show');
  toastTimeout = setTimeout(function() { toast.classList.remove('show'); }, TOAST_DURATION);
}

// ── ENTRANCE ANIMATIONS ─────────────────────────────────
function animateEntrance() {
  var cards = document.querySelectorAll('.game-card');
  if (!('IntersectionObserver' in window)) {
    // Fallback: just show everything
    cards.forEach(function(c) { c.style.opacity = '1'; c.style.transform = 'none'; });
    return;
  }

  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.style.opacity   = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  cards.forEach(function(card, i) {
    card.style.opacity    = '0';
    card.style.transform  = 'translateY(30px)';
    card.style.transition = 'opacity 0.5s ease ' + (i * 0.08) + 's, transform 0.5s ease ' + (i * 0.08) + 's';
    observer.observe(card);
  });

  var statCards = document.querySelectorAll('.stat-card');
  var statObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry, i) {
      if (entry.isIntersecting) {
        var el = entry.target;
        setTimeout(function() {
          el.style.opacity   = '1';
          el.style.transform = 'translateY(0)';
        }, i * 100);
        statObserver.unobserve(el);
      }
    });
  }, { threshold: 0.2 });

  statCards.forEach(function(card) {
    card.style.opacity    = '0';
    card.style.transform  = 'translateY(20px)';
    card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
    statObserver.observe(card);
  });
}

// ── CARI PASANGAN (MEMORY MATCH) ────────────────────────
function shuffleArray(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

function initMemoryGame() {
  var grid = document.getElementById('memory-grid');
  if (!grid) return;
  grid.innerHTML = '';

  memoryFlipped = [];
  memoryMoves = 0;
  memoryLock = false;

  var movesEl = document.getElementById('memory-moves');
  if (movesEl) movesEl.textContent = '0';

  var shuffled = shuffleArray(memoryTiles.slice());
  for (var i = 0; i < shuffled.length; i++) {
    var tile = document.createElement('div');
    tile.className = 'memory-tile';
    tile.setAttribute('data-index', i);
    tile.setAttribute('data-value', shuffled[i]);
    // Inner wrapper needed for padding-bottom aspect-ratio trick
    var inner = document.createElement('div');
    inner.className = 'memory-tile-inner';
    inner.textContent = '?';
    tile.appendChild(inner);
    tile.onclick = handleTileClick;
    grid.appendChild(tile);
  }
}

function startMemoryGame() {
  initMemoryGame();
  showToast('Game di-reset! Cari semua pasangan emoji!');
}

function handleTileClick(e) {
  if (memoryLock) return;
  var tile = e.currentTarget;

  // Don't click already flipped or matched tiles
  if (tile.classList.contains('flipped') || tile.classList.contains('matched')) return;

  // Reveal emoji in inner div
  var inner = tile.querySelector('.memory-tile-inner');
  if (inner) inner.textContent = tile.getAttribute('data-value');
  tile.classList.add('flipped');
  memoryFlipped.push(tile);

  if (memoryFlipped.length === 2) {
    memoryMoves++;
    var movesEl = document.getElementById('memory-moves');
    if (movesEl) movesEl.textContent = memoryMoves;

    var tile1 = memoryFlipped[0];
    var tile2 = memoryFlipped[1];
    var val1 = tile1.getAttribute('data-value');
    var val2 = tile2.getAttribute('data-value');

    if (val1 === val2) {
      // Match!
      tile1.classList.add('matched');
      tile2.classList.add('matched');
      tile1.classList.remove('flipped');
      tile2.classList.remove('flipped');
      memoryFlipped = [];

      // Check win
      var matchedCount = document.querySelectorAll('.memory-tile.matched').length;
      if (matchedCount === memoryTiles.length) {
        if (memoryBest === null || memoryMoves < memoryBest) {
          memoryBest = memoryMoves;
          var bestEl = document.getElementById('memory-best');
          if (bestEl) bestEl.textContent = memoryBest;
        }
        showToast('HEBAT! Semua pasangan ketemu dalam ' + memoryMoves + ' langkah! 🎉');
      }
    } else {
      // No match — flip back after delay
      memoryLock = true;
      setTimeout(function() {
        var inner1 = tile1.querySelector('.memory-tile-inner');
        var inner2 = tile2.querySelector('.memory-tile-inner');
        tile1.classList.remove('flipped');
        tile2.classList.remove('flipped');
        if (inner1) inner1.textContent = '?';
        if (inner2) inner2.textContent = '?';
        memoryFlipped = [];
        memoryLock = false;
      }, 900);
    }
  }
}

// ── VIBE SEQUENCE (SIMON SAYS) ──────────────────────────
function resetSimonState() {
  simonSeq = [];
  simonUserSeq = [];
  simonRound = 0;
  simonActive = false;
  simonPlayingSeq = false;
  
  var scoreEl = document.getElementById('simon-score');
  if (scoreEl) scoreEl.textContent = '0';
  
  var btn = document.getElementById('simon-btn');
  if (btn) {
    btn.disabled = false;
    btn.textContent = '🚥 MULAI MAIN';
  }
}

function startSimonGame() {
  resetSimonState();
  simonActive = true;
  var btn = document.getElementById('simon-btn');
  if (btn) {
    btn.disabled = true;
    btn.textContent = '🎮 SEDANG BERMAIN';
  }
  nextSimonRound();
}

function nextSimonRound() {
  simonUserSeq = [];
  simonRound++;
  var scoreEl = document.getElementById('simon-score');
  if (scoreEl) scoreEl.textContent = (simonRound - 1).toString();
  
  // Add random step (0, 1, 2, or 3)
  simonSeq.push(Math.floor(Math.random() * 4));
  
  playSimonSequence();
}

function playSimonSequence() {
  simonPlayingSeq = true;
  var i = 0;
  
  function flashNext() {
    if (i >= simonSeq.length) {
      simonPlayingSeq = false;
      return;
    }
    
    var padIndex = simonSeq[i];
    flashSimonPad(padIndex);
    i++;
    setTimeout(flashNext, 800);
  }
  
  // Wait a bit before starting the playback
  setTimeout(flashNext, 500);
}

function flashSimonPad(index) {
  var pad = document.getElementById('simon-pad-' + index);
  if (!pad) return;
  pad.classList.add('active');
  setTimeout(function() {
    pad.classList.remove('active');
  }, 400);
}

function handleSimonPadClick(index) {
  if (!simonActive || simonPlayingSeq) return;
  
  // Flash clicked pad
  flashSimonPad(index);
  
  simonUserSeq.push(index);
  
  // Check correctness
  var stepIndex = simonUserSeq.length - 1;
  if (simonUserSeq[stepIndex] !== simonSeq[stepIndex]) {
    // Incorrect! Game over
    var score = simonRound - 1;
    showToast('Yah salah urutan! Skor kamu: ' + score);
    
    if (simonBest === null || score > simonBest) {
      simonBest = score;
      var bestEl = document.getElementById('simon-best');
      if (bestEl) bestEl.textContent = simonBest;
    }
    
    resetSimonState();
    return;
  }
  
  // Correct click. Check if sequence is complete
  if (simonUserSeq.length === simonSeq.length) {
    // Round complete!
    showToast('Mantap! Lanjut ke ronde ' + (simonRound + 1));
    setTimeout(nextSimonRound, 1000);
  }
}

// ── EASTER EGG (Konami Code) ────────────────────────────
var konamiSeq = [];
var KONAMI    = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];

document.addEventListener('keydown', function(e) {
  konamiSeq.push(e.key);
  if (konamiSeq.length > 10) konamiSeq.shift();
  if (konamiSeq.join(',') === KONAMI.join(',')) {
    showToast('KONAMI CODE! Kamu resmi jadi Dewa Vibe Coding!');
    confettiBlast();
  }
});

function confettiBlast() {
  var colors = ['#FFE135','#FF5DA0','#4A90FF','#3DD68C','#FF7A35','#B57BFF'];
  for (var i = 0; i < 60; i++) {
    (function(delay) {
      setTimeout(function() {
        var el = document.createElement('div');
        el.style.cssText = [
          'position:fixed',
          'top:' + (Math.random() * 60) + 'vh',
          'left:' + (Math.random() * 100) + 'vw',
          'width:10px',
          'height:10px',
          'background:' + colors[Math.floor(Math.random() * colors.length)],
          'border:2px solid black',
          'z-index:9998',
          'pointer-events:none',
          'animation:confettiFall 2s ease forwards',
          'transform:rotate(' + (Math.random() * 360) + 'deg)',
        ].join(';');
        document.body.appendChild(el);
        setTimeout(function() { if (el.parentNode) el.parentNode.removeChild(el); }, 2000);
      }, delay);
    })(i * 30);
  }
}

// Inject confetti keyframe
(function() {
  var s = document.createElement('style');
  s.textContent = '@keyframes confettiFall{0%{transform:translateY(0) rotate(0deg);opacity:1}100%{transform:translateY(80vh) rotate(720deg);opacity:0}}';
  document.head.appendChild(s);
})();
