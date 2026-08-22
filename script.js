// ============ UTIL ============
const $ = (sel, ctx=document) => ctx.querySelector(sel);
const $$ = (sel, ctx=document) => Array.from(ctx.querySelectorAll(sel));
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ============ HERO PARTICLES ============
(function heroParticles(){
  const container = $('#heroParticles');
  if(!container) return;
  const count = prefersReducedMotion ? 0 : 24;
  for(let i=0;i<count;i++){
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.left = Math.random()*100 + '%';
    p.style.animationDuration = (6 + Math.random()*8) + 's';
    p.style.animationDelay = (Math.random()*8) + 's';
    container.appendChild(p);
  }
})();

// ============ HERO FLOW WORDS ============
(function heroFlow(){
  const words = $$('.flow-word');
  if(!words.length) return;
  let i = 0;
  function lightNext(){
    words.forEach(w => w.classList.remove('lit'));
    words[i].classList.add('lit');
    i = (i+1) % words.length;
  }
  lightNext();
  setInterval(lightNext, 1400);
})();

// ============ EXPLORE BUTTON ============
$('#exploreBtn')?.addEventListener('click', () => {
  $('#ato1')?.scrollIntoView({ behavior: 'smooth' });
});

// ============ ACT NAV: scroll spy + click ============
(function actNav(){
  const items = $$('.actnav-item');
  const acts = $$('.act');
  items.forEach(item => {
    item.addEventListener('click', () => {
      const target = document.querySelector(item.dataset.target);
      target?.scrollIntoView({ behavior: 'smooth' });
    });
  });
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        const id = '#' + entry.target.id;
        items.forEach(i => i.classList.toggle('active', i.dataset.target === id));
      }
    });
  }, { rootMargin: '-40% 0px -50% 0px' });
  acts.forEach(a => obs.observe(a));
})();

// ============ SCROLL REVEAL ============
(function scrollReveal(){
  const els = $$('.reveal');
  if(!els.length) return;
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('in-view');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  els.forEach(el => obs.observe(el));
})();

// ============ EVERYDAY MAPS (both instances) ============
function wireEverydayMap(mapId, detailId){
  const map = document.getElementById(mapId);
  const detail = document.getElementById(detailId);
  if(!map || !detail) return;
  map.addEventListener('click', (e) => {
    const btn = e.target.closest('.everyday-item');
    if(!btn) return;
    $$('.everyday-item', map).forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    detail.textContent = btn.dataset.info;
    detail.classList.add('show');
  });
}
wireEverydayMap('everydayMap', 'everydayDetail');
wireEverydayMap('realWorldMap', 'realWorldDetail');

// ============ CONDUCTIVITY RULER ============
(function ruler(){
  const ruler = $('#ruler');
  const info = $('#rulerInfo');
  if(!ruler || !info) return;
  const texts = {
    conductor: 'Condutores (ex: metais) — alta facilidade para passagem de corrente elétrica.',
    semicondutor: 'Semicondutores — condutividade intermediária, que pode ser controlada por dopagem.',
    isolante: 'Isolantes (ex: borracha) — dificultam fortemente a passagem de corrente.'
  };
  $$('.ruler-zone', ruler).forEach(zone => {
    const activate = () => {
      $$('.ruler-zone', ruler).forEach(z => z.classList.remove('active'));
      zone.classList.add('active');
      info.textContent = texts[zone.dataset.zone];
    };
    zone.addEventListener('mouseenter', activate);
    zone.addEventListener('click', activate);
    zone.addEventListener('touchstart', activate, { passive: true });
  });
})();

// ============ LATTICES (doping) ============
function buildLattice(containerId, carrierSymbol, isN){
  const el = document.getElementById(containerId);
  if(!el) return;
  const total = 15;
  const carrierIndex = 7;
  for(let i=0;i<total;i++){
    const dot = document.createElement('div');
    dot.className = 'lattice-dot';
    if(i === carrierIndex){
      dot.classList.add('carrier');
      dot.textContent = carrierSymbol;
    } else {
      dot.textContent = isN ? '●' : '○';
    }
    el.appendChild(dot);
  }
}
buildLattice('latticeN', 'e⁻', true);
buildLattice('latticeP', '+', false);

// approach materials button -> pulses the two cards together
$('#approachBtn')?.addEventListener('click', function(){
  const n = $('#dopingN'), p = $('#dopingP');
  n?.animate([{ transform:'translateX(0)' }, { transform:'translateX(10px)' }, { transform:'translateX(0)' }], { duration: 700 });
  p?.animate([{ transform:'translateX(0)' }, { transform:'translateX(-10px)' }, { transform:'translateX(0)' }], { duration: 700 });
  this.textContent = 'MATERIAIS APROXIMADOS ✓';
});

// ============ PN JUNCTION PARTICLES ============
(function pnJunction(){
  const eWrap = $('#pnJunction .pn-electrons');
  const hWrap = $('#pnJunction .pn-holes');
  if(!eWrap || !hWrap) return;
  if(prefersReducedMotion) return;
  function spawn(wrap, cls, fromLeft){
    const p = document.createElement('div');
    p.className = 'pn-particle ' + cls;
    p.style.top = (10 + Math.random()*80) + '%';
    p.style.left = fromLeft ? '5%' : '85%';
    wrap.appendChild(p);
    const anim = p.animate([
      { left: fromLeft ? '5%' : '85%' },
      { left: '50%' }
    ], { duration: 2200, easing: 'linear' });
    anim.onfinish = () => p.remove();
  }
  setInterval(() => { spawn(eWrap, 'e', true); }, 500);
  setInterval(() => { spawn(hWrap, 'h', false); }, 650);
})();

$('#discoverBtn')?.addEventListener('click', function(){
  $('#ato3')?.scrollIntoView({ behavior: 'smooth' });
});

// ============ SEQUENCE STEPS (Ato 3) ============
(function sequenceSteps(){
  const wrap = $('#sequenceSteps');
  if(!wrap) return;
  const steps = $$('.seq-step', wrap);
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        obs.unobserve(entry.target);
        setTimeout(() => {
          let i = steps.indexOf(entry.target);
          const lightThrough = () => {
            for(let j=0;j<=i;j++) steps[j].classList.add('lit');
          };
          lightThrough();
        }, 100);
      }
    });
  }, { threshold: 0.6 });
  steps.forEach(s => obs.observe(s));
})();

// ============ RECOMBINATION LOOP already CSS animated ============

// ============ BAND GAP SLIDER ============
(function bandgapSlider(){
  const slider = $('#bandgapSlider');
  const led = $('#bandgapLed');
  const readout = $('#bandgapReadout');
  if(!slider || !led || !readout) return;
  function update(){
    const v = Number(slider.value); // 0 = red (low energy), 100 = blue (high energy)
    // interpolate hue from red(0) to blue(240)
    const hue = 0 + (v/100) * 240;
    const color = `hsl(${hue}, 90%, 55%)`;
    led.style.background = color;
    led.style.boxShadow = `0 0 30px 8px hsla(${hue},90%,55%,0.45)`;
    let desc;
    if(v < 20) desc = 'Baixa energia · maior comprimento de onda · fóton vermelho';
    else if(v < 40) desc = 'Energia baixa-média · laranja/âmbar';
    else if(v < 60) desc = 'Energia intermediária · verde/ciano';
    else if(v < 80) desc = 'Energia alta · azul';
    else desc = 'Alta energia · menor comprimento de onda · fóton azul/violeta';
    readout.textContent = desc;
  }
  slider.addEventListener('input', update);
  update();
})();

// ============ MATERIALS FLOW ============
(function materialsFlow(){
  const btns = $$('.material-btn');
  const nodes = $$('.flow-node');
  if(!btns.length) return;
  const data = {
    gaas: { color: '#ff3b4e', label: 'GaAs → band gap pequeno → fóton de menor energia → maior comprimento de onda → VERMELHO' },
    gap:  { color: '#35e07a', label: 'GaP → band gap intermediário → energia média → comprimento de onda médio → VERDE' },
    gan:  { color: '#3d8bff', label: 'GaN → band gap grande → fóton de maior energia → menor comprimento de onda → AZUL' }
  };
  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      nodes.forEach((n, i) => {
        setTimeout(() => n.classList.add('lit'), i * 150);
      });
      nodes[4].style.color = data[btn.dataset.material].color;
    });
  });
})();

// ============ RGB TESTER ============
(function rgbTester(){
  const led = $('#rgbTesterLed');
  const buttons = $$('.btn-rgb');
  if(!led || !buttons.length) return;
  const state = { r:false, g:false, b:false };
  function render(){
    const colors = [];
    if(state.r) colors.push('255,59,78');
    if(state.g) colors.push('53,224,122');
    if(state.b) colors.push('61,139,255');
    if(!colors.length){
      led.style.background = '#111528';
      led.style.boxShadow = 'none';
      return;
    }
    // mix by averaging channels
    let r=0,g=0,b=0;
    if(state.r){ r+=255; }
    if(state.g){ g+=224; r+=(state.r?0:0); }
    if(state.b){ b+=255; }
    if(state.r) g+= state.g?30:0;
    const mixed = `rgb(${state.r?255:30}, ${state.g?224:30}, ${state.b?255:30})`;
    led.style.background = mixed;
    led.style.boxShadow = `0 0 34px 10px ${mixed}`;
  }
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const c = btn.dataset.c;
      state[c] = !state[c];
      btn.classList.toggle('active', state[c]);
      render();
    });
  });
})();

// ============ ADDITIVE SYNTHESIS LAB ============
(function additiveLab(){
  const r = $('#sliderR'), g = $('#sliderG'), b = $('#sliderB');
  const circleR = $('.circle-r'), circleG = $('.circle-g'), circleB = $('.circle-b');
  const result = $('#additiveResult');
  if(!r || !g || !b) return;
  function update(){
    const rv = Number(r.value), gv = Number(g.value), bv = Number(b.value);
    circleR.style.background = `rgb(${rv},0,0)`;
    circleG.style.background = `rgb(0,${gv},0)`;
    circleB.style.background = `rgb(0,0,${bv})`;
    result.textContent = `rgb(${rv}, ${gv}, ${bv})`;
    result.style.color = `rgb(${rv},${gv},${bv})`;
    result.style.textShadow = `0 0 12px rgb(${rv},${gv},${bv})`;
  }
  [r,g,b].forEach(s => s.addEventListener('input', update));
  update();
})();

// ============ PWM LAB ============
(function pwmLab(){
  const slider = $('#pwmSlider');
  const led = $('#pwmLed');
  const readout = $('#pwmReadout');
  const wave = $('#pwmWave');
  if(!slider || !led) return;
  const barCount = 20;
  for(let i=0;i<barCount;i++){
    const bar = document.createElement('div');
    bar.className = 'pwm-bar';
    wave.appendChild(bar);
  }
  function update(){
    const v = Number(slider.value);
    readout.textContent = v + '%';
    led.style.opacity = Math.max(0.08, v/100);
    led.style.boxShadow = `0 0 ${10 + v*0.3}px ${4 + v*0.08}px var(--elec-blue-soft)`;
    const onCount = Math.round((v/100) * barCount);
    $$('.pwm-bar', wave).forEach((bar, i) => {
      const isOn = (i % Math.max(1, Math.round(barCount/Math.max(1,onCount||1)))) < (onCount ? Math.ceil(onCount/ (barCount/Math.max(1,onCount))) : 0);
      // simpler: alternate pattern based on duty cycle
      bar.classList.toggle('off', (i % barCount) >= onCount);
      bar.style.height = ((i % barCount) < onCount ? 100 : 30) + '%';
    });
  }
  slider.addEventListener('input', update);
  update();
})();

// ============ BLINK / PWM PERCEPTION LAB ============
(function blinkLab(){
  const led = $('#blinkLed');
  const btn = $('#blinkSpeedBtn');
  const readout = $('#blinkReadout');
  if(!led || !btn) return;
  const speeds = [1.4, 0.6, 0.25, 0.08, 0.02];
  const labels = [
    'Piscar lento e visível',
    'Piscar mais rápido, ainda perceptível',
    'Piscar rápido — quase um tremor',
    'Muito rápido — parece luz contínua tremeluzente',
    'O olho já não percebe o piscar: luz aparentemente contínua'
  ];
  let idx = 0;
  function apply(){
    led.style.animationDuration = speeds[idx] + 's';
    readout.textContent = labels[idx];
  }
  apply();
  btn.addEventListener('click', () => {
    idx = Math.min(idx+1, speeds.length-1);
    apply();
    if(idx === speeds.length-1){ btn.textContent = 'VELOCIDADE MÁXIMA'; }
  });
})();

// ============ CIRCUIT POWER ============
$('#powerCircuitBtn')?.addEventListener('click', function(){
  const diagram = $('#circuitDiagram');
  diagram?.classList.toggle('powered');
  this.textContent = diagram?.classList.contains('powered') ? 'DESLIGAR CIRCUITO' : 'LIGAR CIRCUITO';
});

// ============ POLARITY LAB ============
(function polarityLab(){
  const btn = $('#invertBtn');
  const diagram = $('#polarityDiagram');
  const result = $('#polarityResult');
  if(!btn || !diagram || !result) return;
  let inverted = false;
  btn.addEventListener('click', () => {
    inverted = !inverted;
    if(inverted){
      diagram.innerHTML = '<span class="pol-minus">−</span> → Cátodo | LED | Ânodo → <span class="pol-plus">+</span>';
      result.textContent = '❌ não conduz / ❌ não acende';
    } else {
      diagram.innerHTML = '<span class="pol-plus">+</span> → Ânodo | LED | Cátodo → <span class="pol-minus">−</span>';
      result.textContent = '✅ conduz corrente / ✅ acende';
    }
  });
})();

// ============ RESISTOR CALCULATOR ============
(function resistorCalc(){
  const vFonte = $('#vFonte'), vLed = $('#vLed'), iLed = $('#iLed'), resultEl = $('#resistorResult');
  if(!vFonte || !vLed || !iLed || !resultEl) return;
  function calc(){
    const vf = parseFloat(vFonte.value) || 0;
    const vl = parseFloat(vLed.value) || 0;
    const il = (parseFloat(iLed.value) || 0) / 1000; // mA to A
    if(il <= 0 || vf <= vl){
      resultEl.textContent = '—';
      return;
    }
    const r = (vf - vl) / il;
    resultEl.textContent = r.toFixed(0);
  }
  [vFonte, vLed, iLed].forEach(inp => inp.addEventListener('input', calc));
  calc();
})();

// ============ PIXEL ZOOM CANVAS ============
(function pixelZoom(){
  const canvas = $('#pixelCanvas');
  const slider = $('#zoomSlider');
  if(!canvas || !slider) return;
  const ctx = canvas.getContext('2d');
  const W = canvas.width, H = canvas.height;

  function drawWholeImage(){
    // simple gradient "photo" placeholder
    const grad = ctx.createLinearGradient(0,0,W,H);
    grad.addColorStop(0, '#3d8bff');
    grad.addColorStop(0.5, '#d63bff');
    grad.addColorStop(1, '#ff3b4e');
    ctx.fillStyle = grad;
    ctx.fillRect(0,0,W,H);
  }

  function drawPixelGrid(zoom){
    // zoom 0..1: 0 = whole image, 1 = fully zoomed subpixels
    drawWholeImage();
    if(zoom <= 0) return;
    // sample a small region of the "image" and enlarge into RGB subpixel blocks
    const gridSize = Math.max(2, Math.round(10 - zoom*8)); // fewer, bigger pixels as zoom increases
    const cellSize = (W / gridSize);
    ctx.save();
    // fade in pixelation
    ctx.globalAlpha = Math.min(1, zoom*1.3);
    for(let y=0; y<H; y+=cellSize){
      for(let x=0; x<W; x+=cellSize){
        // sample color from gradient position
        const t = (x+y) / (W+H);
        const r = Math.round(61 + t*(255-61));
        const g = Math.round(139 - t*100);
        const b = Math.round(255 - t*100);
        if(zoom < 0.55){
          ctx.fillStyle = `rgb(${r},${g},${b})`;
          ctx.fillRect(x, y, cellSize, cellSize);
        } else {
          // draw subpixels R G B as thirds
          const third = cellSize/3;
          ctx.fillStyle = `rgb(${r},0,0)`;
          ctx.fillRect(x, y, third, cellSize);
          ctx.fillStyle = `rgb(0,${g},0)`;
          ctx.fillRect(x+third, y, third, cellSize);
          ctx.fillStyle = `rgb(0,0,${b})`;
          ctx.fillRect(x+2*third, y, third, cellSize);
        }
      }
    }
    ctx.restore();
  }

  function update(){
    const zoom = Number(slider.value)/100;
    drawPixelGrid(zoom);
  }
  slider.addEventListener('input', update);
  update();
})();

// ============ QUIZ REVEAL ============
(function quiz(){
  $$('.quiz-item').forEach(item => {
    const btn = $('.quiz-btn', item);
    const answer = $('.quiz-a', item);
    btn?.addEventListener('click', () => {
      answer.textContent = item.dataset.a;
      answer.classList.toggle('show');
      btn.textContent = answer.classList.contains('show') ? 'OCULTAR RESPOSTA' : 'REVELAR RESPOSTA';
    });
  });
})();

// ============ CLOSING LED -> WHITE ON VIEW ============
(function closingLed(){
  const led = $('#closingLed');
  if(!led) return;
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        setTimeout(() => led.classList.add('white'), 600);
        obs.disconnect();
      }
    });
  }, { threshold: 0.5 });
  obs.observe(led);
})();
