/* ============================================================
   OPENING ANIMATION
   ============================================================ */
(function introAnimation(){
  const overlay = document.getElementById('introOverlay');
  const btn = document.getElementById('introBtn');
  btn?.addEventListener('click', () => {
    overlay.classList.add('opening');
    setTimeout(() => overlay.remove(), 1100);

    // start the ambient background music right on this same tap,
    // since it's a genuine user gesture
    const bgMusic = document.getElementById('bgMusic');
    bgMusic.play().then(() => {
      document.getElementById('miniPlayer').classList.remove('hidden');
    }).catch(() => { /* she hasn't added assets/bg-music.mp3 yet */ });
  });
})();

/* ============================================================
   STARFIELD — lightweight 3D-style particle field with parallax
   ============================================================ */
(function starfield(){
  const canvas = document.getElementById('stars');
  const ctx = canvas.getContext('2d');
  let w, h, stars = [];
  const STAR_COUNT = 160;

  function resize(){ w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; }
  window.addEventListener('resize', resize);
  resize();

  function makeStar(){
    return {
      x: Math.random() * w, y: Math.random() * h,
      z: Math.random() * 1 + 0.15,
      r: Math.random() * 1.4 + 0.3,
      twinkle: Math.random() * Math.PI * 2,
      speed: Math.random() * 0.15 + 0.02
    };
  }
  for (let i = 0; i < STAR_COUNT; i++) stars.push(makeStar());

  let parallaxX = 0, parallaxY = 0, targetX = 0, targetY = 0;
  window.addEventListener('mousemove', (e) => {
    targetX = (e.clientX / w - 0.5) * 18;
    targetY = (e.clientY / h - 0.5) * 18;
  });
  window.addEventListener('deviceorientation', (e) => {
    if (e.gamma == null) return;
    targetX = Math.max(-18, Math.min(18, e.gamma / 3));
    targetY = Math.max(-18, Math.min(18, (e.beta - 40) / 4));
  });

  function draw(){
    ctx.clearRect(0, 0, w, h);
    parallaxX += (targetX - parallaxX) * 0.04;
    parallaxY += (targetY - parallaxY) * 0.04;
    for (const s of stars){
      s.twinkle += s.speed;
      s.y += s.speed * 0.4;
      if (s.y > h) s.y = 0;
      const dx = parallaxX * s.z, dy = parallaxY * s.z;
      const alpha = 0.5 + Math.sin(s.twinkle) * 0.4;
      const size = s.r * s.z * 2;
      ctx.beginPath();
      ctx.fillStyle = `rgba(251,244,248,${Math.max(0.15, alpha).toFixed(2)})`;
      ctx.arc(s.x + dx, s.y + dy, size, 0, Math.PI * 2);
      ctx.fill();
    }
    requestAnimationFrame(draw);
  }
  draw();
})();

/* ============================================================
   PAGER — one swipe / wheel notch / arrow key = exactly one
   slide. No native scrolling involved, so nothing can be
   skipped or glide past a slide.
   ============================================================ */
const pager = (function pagedScroll(){
  const track = document.querySelector('.track');
  const panels = Array.from(document.querySelectorAll('.panel'));
  const dots = document.querySelectorAll('.dot');
  let current = 0;
  let locked = false;
  const LOCK_MS = 800;

  function render(){
    track.style.transform = `translateY(-${current * 100}vh)`;
    dots.forEach(d => d.classList.toggle('active', d.dataset.target === panels[current].id));
    document.dispatchEvent(new CustomEvent('slidechange', {
      detail: { id: panels[current].id, index: current }
    }));
  }

  function goTo(index){
    if (index < 0 || index >= panels.length || locked) return;
    locked = true;
    current = index;
    render();
    setTimeout(() => { locked = false; }, LOCK_MS);
  }

  dots.forEach((dot, i) => dot.addEventListener('click', () => goTo(i)));

  const scroller = document.querySelector('.scroller');
  scroller.addEventListener('wheel', (e) => {
    e.preventDefault();
    if (locked) return;
    goTo(current + (e.deltaY > 0 ? 1 : -1));
  }, { passive: false });

  let touchStartY = 0;
  scroller.addEventListener('touchstart', (e) => { touchStartY = e.touches[0].clientY; }, { passive: true });
  scroller.addEventListener('touchend', (e) => {
    const dy = touchStartY - e.changedTouches[0].clientY;
    if (Math.abs(dy) < 40 || locked) return;
    goTo(current + (dy > 0 ? 1 : -1));
  }, { passive: true });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown' || e.key === 'PageDown') goTo(current + 1);
    if (e.key === 'ArrowUp' || e.key === 'PageUp') goTo(current - 1);
  });

  render(); // set initial dot state
  return { goTo, get current(){ return current; } };
})();

/* ============================================================
   RECORDED MESSAGE SLIDE — background music ducks out
   automatically while her message plays, and resumes after.
   ============================================================ */
(function messagePlayer(){
  const cd = document.getElementById('cd');
  const btn = document.getElementById('playBtn');
  const message = document.getElementById('message');
  const bgMusic = document.getElementById('bgMusic');
  const miniPlayer = document.getElementById('miniPlayer');
  let bgWasPlaying = false;

  function setIcon(playing){
    btn.querySelector('.icon').innerHTML = playing ? '&#10074;&#10074;' : '&#9658;';
  }

  function playMessage(){
    bgWasPlaying = !bgMusic.paused;
    bgMusic.pause();
    message.play().then(() => {
      cd.classList.add('spinning');
      setIcon(true);
      miniPlayer.classList.remove('hidden');
    }).catch(() => { /* assets/message.mp3 not added yet */ });
  }

  function stopMessage(){
    message.pause();
    cd.classList.remove('spinning');
    setIcon(false);
    if (bgWasPlaying){
      bgMusic.play().then(() => miniPlayer.classList.remove('hidden')).catch(() => {});
    } else {
      miniPlayer.classList.add('hidden');
    }
  }

  btn.addEventListener('click', () => {
    if (message.paused) playMessage(); else stopMessage();
  });

  message.addEventListener('ended', stopMessage);

  // Entering the recorded-message slide auto-starts it and ducks the
  // background music; leaving it (before it finishes) stops it and
  // brings the background music back.
  document.addEventListener('slidechange', (e) => {
    if (e.detail.id === 'player'){
      if (message.paused) playMessage();
    } else {
      if (!message.paused) stopMessage();
    }
  });

  miniPlayer.addEventListener('click', () => {
    if (!message.paused){ stopMessage(); }
    else if (!bgMusic.paused){ bgMusic.pause(); miniPlayer.classList.add('hidden'); }
  });
})();

/* ============================================================
   "DOES SHE LOVE ME?" — the "no" button dodges the cursor and
   is genuinely hard to land a click on. Only once it's actually
   been pressed more than five times does the heartbreak show.
   "Yes" opens a big heart-shaped reveal surrounded by roses.
   ============================================================ */
(function questionGame(){
  const noBtn = document.getElementById('noBtn');
  const yesBtn = document.getElementById('yesBtn');
  const heartbreak = document.getElementById('heartbreak');
  const revealModal = document.getElementById('revealModal');
  const closeReveal = document.getElementById('closeReveal');
  const answerRow = noBtn?.closest('.answer-row');

  let dodges = 0;
  let presses = 0;
  const MAX_DODGES = 5;

  function dodge(){
    if (dodges >= MAX_DODGES || !answerRow) return;
    dodges++;
    const btnRect = noBtn.getBoundingClientRect();
    const maxX = window.innerWidth - btnRect.width - 20;
    const maxY = window.innerHeight - btnRect.height - 20;
    const newX = Math.max(20, Math.random() * maxX);
    const newY = Math.max(20, Math.random() * maxY);
    noBtn.classList.add('dodging');
    noBtn.style.left = newX + 'px';
    noBtn.style.top = newY + 'px';
  }

  noBtn?.addEventListener('mouseenter', dodge);
  noBtn?.addEventListener('touchstart', (e) => { e.preventDefault(); dodge(); }, { passive: false });

  noBtn?.addEventListener('click', () => {
    presses++;
    if (presses > 5){
      heartbreak.classList.remove('hidden');
      setTimeout(() => {
        heartbreak.classList.add('hidden');
        noBtn.classList.remove('dodging');
        noBtn.style.left = ''; noBtn.style.top = '';
        dodges = 0; presses = 0;
      }, 2400);
    } else {
      dodge();
    }
  });

  yesBtn?.addEventListener('click', () => revealModal.classList.remove('hidden'));
  closeReveal?.addEventListener('click', () => revealModal.classList.add('hidden'));
})();

/* ============================================================
   FINALE PETALS — kisses + roses drifting erratically.
   This is the ONLY slide that gets this ambient decoration.
   ============================================================ */
(function finalePetals(){
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const EMOJIS = ['&#128139;', '&#127801;']; // kiss mark, rose
  let intervalId = null;

  function rand(min, max){ return Math.random() * (max - min) + min; }

  function spawnPetal(){
    const petal = document.createElement('div');
    petal.className = 'finale-petal';
    petal.innerHTML = EMOJIS[Math.floor(Math.random() * EMOJIS.length)];
    const startX = rand(0, window.innerWidth - 20);
    petal.style.left = startX + 'px';
    petal.style.top = (window.innerHeight + 30) + 'px';
    petal.style.fontSize = rand(14, 26) + 'px';
    document.body.appendChild(petal);

    const totalRise = window.innerHeight + 100;
    const steps = 5 + Math.floor(rand(0, 3));
    const keyframes = [];
    for (let i = 0; i <= steps; i++){
      const progress = i / steps;
      keyframes.push({
        transform: `translate(${rand(-80, 80)}px, ${-totalRise * progress}px) rotate(${rand(-40, 40)}deg) scale(${rand(0.8, 1.2)})`,
        opacity: i === 0 ? 0 : (i === steps ? 0 : rand(0.35, 0.65)),
        offset: progress
      });
    }
    const anim = petal.animate(keyframes, { duration: rand(8000, 13000), easing: 'ease-in-out', fill: 'forwards' });
    anim.onfinish = () => petal.remove();
  }

  document.addEventListener('slidechange', (e) => {
    if (e.detail.id === 'finale' && !intervalId){
      spawnPetal();
      intervalId = setInterval(spawnPetal, 900);
    } else if (e.detail.id !== 'finale' && intervalId){
      clearInterval(intervalId);
      intervalId = null;
    }
  });
})();
