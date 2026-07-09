:root{
  --night: #1B1035;
  --violet: #3B2063;
  --lavender: #C9AEE8;
  --pink: #F6C9DA;
  --cream: #FBF4F8;
  --gold: #E8C77E;
}

*{ box-sizing:border-box; margin:0; padding:0; }

html,body{
  height:100%;
  background: var(--night);
  color: var(--cream);
  font-family: 'Quicksand', sans-serif;
  overflow:hidden;
}

.display{ font-family:'Cormorant Garamond', serif; font-weight:600; }
.italic{ font-style:italic; }

#stars{
  position:fixed;
  inset:0;
  width:100%;
  height:100%;
  z-index:0;
  background: radial-gradient(ellipse at 50% 20%, var(--violet) 0%, var(--night) 70%);
}

/* ---------- opening animation ---------- */
.intro-overlay{
  position:fixed;
  inset:0;
  z-index:50;
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:center;
  gap: 1rem;
  background: radial-gradient(ellipse at 50% 50%, var(--violet) 0%, var(--night) 75%);
  transition: opacity 1s ease, transform 1s ease;
}
.intro-overlay.opening{ opacity:0; transform: scale(1.08); pointer-events:none; }
.intro-glow{
  position:absolute;
  width: 40px; height:40px;
  border-radius:50%;
  background: var(--pink);
  filter: blur(20px);
  opacity:.7;
  animation: introPulse 2.8s ease-in-out infinite;
}
@keyframes introPulse{
  0%,100%{ transform: scale(1); opacity:.5; }
  50%{ transform: scale(9); opacity:.9; }
}
.intro-eyebrow{
  position:relative;
  font-size:.75rem;
  letter-spacing:.25em;
  text-transform:uppercase;
  color: var(--lavender);
  opacity:0;
  animation: introFadeUp 1s ease .3s forwards;
}
.intro-name{
  position:relative;
  font-size: clamp(2rem, 9vw, 3rem);
  color: var(--gold);
  opacity:0;
  animation: introFadeUp 1s ease .7s forwards;
}
.intro-btn{
  position:relative;
  margin-top: 1.6rem;
  padding: .7rem 2.2rem;
  border-radius:999px;
  border:1px solid rgba(255,255,255,0.35);
  background: rgba(255,255,255,0.08);
  color: var(--cream);
  font-family:'Quicksand', sans-serif;
  letter-spacing:.05em;
  cursor:pointer;
  opacity:0;
  animation: introFadeUp 1s ease 1.2s forwards;
}
@keyframes introFadeUp{
  from{ opacity:0; transform: translateY(14px); }
  to{ opacity:1; transform: translateY(0); }
}

/* ---------- mini "now playing" indicator ---------- */
.mini-player{
  position:fixed;
  top: 18px;
  left: 18px;
  z-index:6;
  display:flex;
  align-items:center;
  gap:8px;
  padding: 6px 14px 6px 10px;
  border-radius: 999px;
  background: rgba(255,255,255,0.08);
  border: 1px solid rgba(255,255,255,0.2);
  backdrop-filter: blur(8px);
  font-size:.7rem;
  letter-spacing:.05em;
  color: rgba(251,244,248,0.85);
  transition: opacity .4s ease, transform .4s ease;
  cursor:pointer;
}
.mini-player.hidden{ opacity:0; transform: translateY(-8px); pointer-events:none; }
.mini-note{ display:inline-block; color: var(--pink); animation: notebob 1.2s ease-in-out infinite; }
@keyframes notebob{
  0%,100%{ transform: translateY(0) rotate(-4deg); }
  50%{ transform: translateY(-3px) rotate(4deg); }
}

/* ---------- side nav dots ---------- */
.dots{
  position:fixed;
  right:18px;
  top:50%;
  transform:translateY(-50%);
  z-index:5;
  display:flex;
  flex-direction:column;
  gap:12px;
}
.dot{
  width:7px; height:7px;
  border-radius:50%;
  background: rgba(251,244,248,0.25);
  transition: background .3s, transform .3s;
  cursor:pointer;
}
.dot.active{ background: var(--pink); transform:scale(1.4); }

/* ---------- paging track ---------- */
.scroller{
  position:relative;
  z-index:1;
  height:100vh;
  overflow:hidden;
}
.track{
  display:flex;
  flex-direction:column;
  width:100%;
  height:100%;
  transition: transform .7s cubic-bezier(.65,0,.35,1);
  will-change: transform;
}
.panel{
  height:100vh;
  width:100%;
  flex: 0 0 100vh;
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:center;
  text-align:center;
  padding: 6vh 6vw;
  position:relative;
}

/* ---------- hero ---------- */
.hero .eyebrow{
  letter-spacing:.2em;
  text-transform:uppercase;
  font-size:.7rem;
  color: var(--lavender);
  margin-bottom:1.2rem;
}
.hero h1{
  font-size: clamp(2.2rem, 8vw, 3.6rem);
  line-height:1.15;
  background: linear-gradient(120deg, var(--pink), var(--lavender));
  -webkit-background-clip:text;
  background-clip:text;
  color:transparent;
}
.hero .name{ color: var(--gold); -webkit-text-fill-color: var(--gold); }
.hero .lead{
  max-width:38ch;
  margin: 1.6rem auto 0;
  color: rgba(251,244,248,0.8);
  font-size:.95rem;
  line-height:1.6;
}
.scroll-hint{
  position:absolute;
  bottom:6vh;
  left:50%;
  transform:translateX(-50%);
  font-size:.7rem;
  letter-spacing:.15em;
  text-transform:uppercase;
  color: rgba(251,244,248,0.5);
  display:flex;
  flex-direction:column;
  align-items:center;
  gap:6px;
}
.arrow{
  width:8px; height:8px;
  border-right:1px solid var(--lavender);
  border-bottom:1px solid var(--lavender);
  transform:rotate(45deg);
  animation: bob 1.6s ease-in-out infinite;
}
@keyframes bob{
  0%,100%{ transform:rotate(45deg) translate(0,0); opacity:.5;}
  50%{ transform:rotate(45deg) translate(4px,4px); opacity:1;}
}

/* ---------- journal-page poster cards ---------- */
.poster{
  background: #FBF6EC;
  background-image: repeating-linear-gradient(
    to bottom, transparent 0, transparent 33px,
    rgba(75,50,110,0.16) 33px, rgba(75,50,110,0.16) 34px
  );
  background-position: 0 148px;
  border: none;
  border-radius: 4px;
  padding: 16px 16px 20px;
  width: min(84vw, 300px);
  min-height: min(70vh, 430px);
  box-shadow: 0 25px 45px rgba(0,0,0,0.45), 0 2px 0 rgba(0,0,0,0.05);
  transition: transform .4s ease;
  position:relative;
}
.poster::before{
  content:"";
  position:absolute;
  top: 6px; left:50%;
  width: 60px; height:18px;
  background: rgba(246,201,218,0.55);
  transform: translateX(-50%) rotate(-2deg);
  box-shadow: 0 2px 4px rgba(0,0,0,0.15);
}
.poster:hover{ transform: scale(1.03) rotate(0deg) !important; }

.poster-photo{
  width:100%;
  aspect-ratio: 4/3.4;
  overflow:hidden;
  border-radius:2px;
  border: 6px solid #fff;
  box-shadow: 0 4px 10px rgba(0,0,0,0.25);
  background: linear-gradient(160deg, var(--violet), var(--night));
  display:flex; align-items:center; justify-content:center;
}
.poster-photo img{ width:100%; height:100%; object-fit:cover; display:block; }
.poster-photo.img-missing::after{
  content:"add photo here";
  color: rgba(251,244,248,0.4);
  font-size:.7rem;
}

.poster-note{
  color: #4B3268;
  font-family: 'Caveat', cursive;
  font-size: 1.3rem;
  line-height: 33px;
  margin-top: .6rem;
}

.tilt-a{ transform: rotate(-8deg); }
.tilt-b{ transform: rotate(6deg); }
.tilt-c{ transform: rotate(-3deg); }

/* ---------- photo grid: top-left / top-right / bottom-center ---------- */
.photo-grid{
  display:grid;
  grid-template-columns: 1fr 1fr;
  grid-auto-rows: auto;
  gap: 14px 10px;
  width:100%;
  max-width: 440px;
  align-items:start;
}
.poster--small{
  width: min(40vw, 155px);
  min-height: unset;
  padding: 10px 10px 12px;
  background-position: 0 84px;
}
.poster--small .poster-note{ font-size:1rem; line-height:23px; margin-top:.4rem; }
.pos-top-left{ grid-column:1; grid-row:1; justify-self:start; }
.pos-top-right{ grid-column:2; grid-row:1; justify-self:end; }
.pos-bottom-center{
  grid-column: 1 / 3;
  grid-row:2;
  justify-self:center;
  width: min(48vw, 185px) !important;
  margin-top: 6px;
}

/* ---------- videos ---------- */
.video-stack{
  display:flex;
  flex-direction:column;
  gap: 1.6rem;
  align-items:center;
}
.video-card{ width: min(80vw, 280px); }
.video-card video{ width:100%; border: 6px solid #fff; box-shadow: 0 4px 10px rgba(0,0,0,0.25); display:block; background:#000; }

/* ---------- CD player ---------- */
.section-title{ font-size: clamp(1.6rem,6vw,2.2rem); margin-bottom:2rem; color: var(--pink); }
.cd-wrap{ margin: 1rem 0 2rem; }
.cd{
  width: 190px; height:190px;
  border-radius:50%;
  background: conic-gradient(from 90deg, var(--lavender), var(--pink), var(--gold), var(--lavender));
  box-shadow: 0 0 40px rgba(201,174,232,0.45), inset 0 0 30px rgba(0,0,0,0.4);
  display:flex; align-items:center; justify-content:center;
}
.cd.spinning{ animation: spin 3.2s linear infinite; }
.cd-hole{
  width:34px; height:34px;
  border-radius:50%;
  background: var(--night);
  box-shadow: inset 0 0 8px rgba(0,0,0,0.6);
}
@keyframes spin{ to{ transform: rotate(360deg); } }

.play-btn{
  width:56px; height:56px;
  border-radius:50%;
  border:1px solid rgba(255,255,255,0.3);
  background: rgba(255,255,255,0.08);
  color: var(--cream);
  font-size:1.1rem;
  cursor:pointer;
  backdrop-filter: blur(6px);
}
.play-btn .icon{ display:inline-block; transform: translateX(2px); }

/* ---------- question panel ---------- */
.question-photo{
  width: 120px; height:120px;
  border-radius:50%;
  overflow:hidden;
  border: 2px solid var(--pink);
  margin-bottom:1.4rem;
  box-shadow: 0 0 30px rgba(246,201,218,0.4);
}
.question-photo img{ width:100%; height:100%; object-fit:cover; }
.question-panel h2{ font-size: clamp(1.8rem,7vw,2.6rem); color: var(--pink); }

.answer-row{ display:flex; gap:1.2rem; margin-top:2rem; position:relative; }
.answer{
  padding:.7rem 2rem;
  border-radius: 999px;
  border:1px solid rgba(255,255,255,0.3);
  font-family:'Quicksand', sans-serif;
  font-weight:600;
  letter-spacing:.03em;
  cursor:pointer;
  background: rgba(255,255,255,0.08);
  color: var(--cream);
  transition: transform .2s ease, background .2s ease;
}
.answer.yes{ background: linear-gradient(120deg, var(--pink), var(--lavender)); color: var(--night); }
.answer.no.dodging{ position:fixed; }

.heartbreak{ margin-top:2rem; display:flex; flex-direction:column; align-items:center; gap:.8rem; }
.heartbreak.hidden{ display:none; }
.crack{
  width:70px; height:60px;
  background: var(--pink);
  clip-path: path("M35 58 C10 40, 0 22, 12 10 C20 2, 32 4, 35 14 C38 4, 50 2, 58 10 C70 22, 60 40, 35 58 Z");
  position:relative;
  animation: shatter .6s ease forwards;
}
@keyframes shatter{
  0%{ transform: scale(1); opacity:1; }
  60%{ transform: scale(1.1) rotate(-4deg); }
  100%{ transform: scale(0.9) rotate(6deg); opacity:.6; filter: drop-shadow(0 0 2px #000); }
}
.heartbreak p{ font-size:.85rem; color: rgba(251,244,248,0.7); font-style:italic; }

/* ---------- reveal modal: huge heart + roses ---------- */
.reveal-modal{
  position:fixed; inset:0;
  background: rgba(10,5,20,0.88);
  backdrop-filter: blur(6px);
  display:flex; align-items:center; justify-content:center;
  z-index:20;
}
.reveal-modal.hidden{ display:none; }
.reveal-card{
  position:relative;
  background: radial-gradient(ellipse at center, rgba(246,201,218,0.18), transparent 70%);
  border-radius:18px;
  padding:1.4rem;
  width:min(88vw,360px);
  text-align:center;
  animation: revealPop .6s cubic-bezier(.34,1.56,.64,1);
}
@keyframes revealPop{
  from{ transform: scale(0.6); opacity:0; }
  to{ transform: scale(1); opacity:1; }
}
.reveal-card img{ width:100%; margin-bottom:1rem; }
.reveal-card img.heart-clip{
  aspect-ratio: 1/1;
  object-fit: cover;
  -webkit-mask-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 29'><path d='M16 29 C16 29 0 18.5 0 9.2 C0 3.6 4 0 8.6 0 C12 0 14.8 2 16 5 C17.2 2 20 0 23.4 0 C28 0 32 3.6 32 9.2 C32 18.5 16 29 16 29 Z'/></svg>");
  mask-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 29'><path d='M16 29 C16 29 0 18.5 0 9.2 C0 3.6 4 0 8.6 0 C12 0 14.8 2 16 5 C17.2 2 20 0 23.4 0 C28 0 32 3.6 32 9.2 C32 18.5 16 29 16 29 Z'/></svg>");
  -webkit-mask-repeat: no-repeat; mask-repeat: no-repeat;
  -webkit-mask-size: contain; mask-size: contain;
  -webkit-mask-position: center; mask-position: center;
  transform: scale(1.25);
}
.rose{
  position:absolute;
  font-size:1.7rem;
  animation: roseFloat 3s ease-in-out infinite;
  filter: drop-shadow(0 4px 6px rgba(0,0,0,0.4));
}
.rose.r1{ top:-16px; left:-14px; }
.rose.r2{ top:-16px; right:-14px; animation-delay:.4s; }
.rose.r3{ bottom:44px; left:-20px; animation-delay:.8s; }
.rose.r4{ bottom:44px; right:-20px; animation-delay:1.2s; }
@keyframes roseFloat{
  0%,100%{ transform: translateY(0) rotate(-6deg); }
  50%{ transform: translateY(-9px) rotate(6deg); }
}
.close-reveal{
  margin-top:.6rem;
  background:none;
  border:1px solid rgba(255,255,255,0.3);
  color:var(--cream);
  padding:.5rem 1.4rem;
  border-radius:999px;
  cursor:pointer;
}

/* ---------- finale: only slide with kisses + roses ---------- */
.finale-panel{ padding: 6vh 10vw; overflow:hidden; }
.script-note{
  font-family:'Dancing Script', cursive;
  font-size: clamp(1.6rem, 6vw, 2.4rem);
  line-height:1.5;
  color: var(--pink);
  max-width: 34ch;
  position:relative;
  z-index:2;
}
.signoff{
  margin-top:2rem;
  font-family:'Dancing Script', cursive;
  font-size:1.4rem;
  color: var(--lavender);
  position:relative;
  z-index:2;
}
.finale-petal{
  position:fixed;
  z-index:1;
  pointer-events:none;
  opacity:.55;
}

/* ---------- reduced motion ---------- */
@media (prefers-reduced-motion: reduce){
  .cd.spinning, .arrow, .crack, .mini-note, .rose{ animation: none !important; }
  .track{ transition: none !important; }
}

/* ---------- small phones ---------- */
@media (max-width:360px){
  .cd{ width:150px; height:150px; }
  .question-photo{ width:96px; height:96px; }
  .poster--small{ width: min(42vw, 140px); }
}
