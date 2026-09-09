// Dispara evento de conversão Meta Pixel Lead
function fireLead() {
  if (typeof fbq === 'function') {
    fbq('track', 'Lead');
  }
}

document.getElementById('cta')?.addEventListener('click', fireLead);
document.getElementById('cta-seduc')?.addEventListener('click', fireLead);
document.getElementById('cta2')?.addEventListener('click', fireLead);
document.getElementById('cta3')?.addEventListener('click', fireLead);

// Sticky CTA: Exibe o botão fixo no rodapé quando o CTA principal sai de vista
(function () {
  const bar = document.getElementById('sticky-cta');
  const ctaContainer = document.getElementById('cta-container') || document.getElementById('cta');

  if (!bar || !ctaContainer) return;

  function updateSticky() {
    const rect = ctaContainer.getBoundingClientRect();
    const isVisible = rect.top < (window.innerHeight - 60) && rect.bottom > 60;
    bar.classList.toggle('show', !isVisible);
  }

  window.addEventListener('scroll', updateSticky, { passive: true });
  window.addEventListener('resize', updateSticky);
  setInterval(updateSticky, 350); // Fallback para in-app webviews (Instagram, Facebook)
  updateSticky();
})();

// Temporizador Regressivo Persistido no LocalStorage (60s, reseta após 6h)
(function () {
  const TOTAL_SECONDS = 60;
  const WINDOW_MS = 6 * 60 * 60 * 1000; // 6 horas
  const KEY = 'prof_seedf_timer_v1';
  const EXPIRED_MSG = "⚡Materiais enviados 1 hora antes da aula⚡! Garanta sua vaga no grupo abaixo 👇";

  const box = document.getElementById('cd-box');
  const timeEl = document.getElementById('cd-time');
  const leadEl = document.getElementById('cd-lead');

  if (!box || !timeEl || !leadEl) return;

  let session = null;
  try {
    session = JSON.parse(localStorage.getItem(KEY));
  } catch (e) {}

  const now = Date.now();
  if (!session || typeof session.t0 !== 'number' || (now - session.t0) > WINDOW_MS) {
    session = { t0: now };
    try {
      localStorage.setItem(KEY, JSON.stringify(session));
    } catch (e) {}
  }

  let remaining = TOTAL_SECONDS - Math.floor((now - session.t0) / 1000);

  function expire() {
    box.classList.add('expired');
    leadEl.textContent = EXPIRED_MSG;
  }

  function render() {
    const minutes = Math.floor(remaining / 60);
    const seconds = remaining % 60;
    timeEl.innerHTML =
      (minutes < 10 ? '0' : '') + minutes + '<span class="sep">:</span>' + (seconds < 10 ? '0' : '') + seconds;
  }

  if (remaining <= 0) {
    expire();
    return;
  }

  render();

  const timerInterval = setInterval(function () {
    remaining--;
    if (remaining <= 0) {
      clearInterval(timerInterval);
      expire();
      return;
    }
    render();
  }, 1000);
})();

// Barra de Escassez com Decremento Dinâmico
(function () {
  const TOTAL = 100;
  const START = 14;
  const FLOOR = 3;
  const KEY = 'prof_seedf_vagas_v1';
  const STEP_MS = 3 * 60 * 1000; // -1 vaga a cada 3 min

  const nEl = document.getElementById('sc-n');
  const barEl = document.getElementById('sc-bar');
  const pctEl = document.getElementById('sc-pct');

  function save(n, t) {
    try {
      localStorage.setItem(KEY, JSON.stringify({ n: n, t: t }));
    } catch (e) {}
  }

  function load() {
    const now = Date.now();
    let session = null;
    try {
      session = JSON.parse(localStorage.getItem(KEY));
    } catch (e) {}

    if (!session || typeof session.n !== 'number') {
      session = { n: START, t: now };
    }

    const dec = Math.floor((now - session.t) / STEP_MS);
    const n = Math.max(FLOOR, session.n - dec);
    save(n, dec > 0 ? now : session.t);
    return n;
  }

  function render(n) {
    if (nEl) nEl.textContent = n;
    const pct = Math.round(((TOTAL - n) / TOTAL) * 100);
    if (barEl) barEl.style.width = pct + '%';
    if (pctEl) pctEl.textContent = pct + '%';
  }

  let currentVagas = load();
  render(currentVagas);

  function tick() {
    if (currentVagas > FLOOR) {
      currentVagas--;
      save(currentVagas, Date.now());
      render(currentVagas);
    }
    setTimeout(tick, 12000 + Math.floor(Math.random() * 8000));
  }

  setTimeout(tick, 10000 + Math.floor(Math.random() * 6000));
})();
