// =============================================
//  UNICONVERT — app.js
// =============================================

// ---- DATA ----
const CATEGORIES = {
  length: {
    name: 'Panjang',
    icon: '📏',
    units: {
      km:    { label: 'Kilometer (km)',   factor: 1000 },
      m:     { label: 'Meter (m)',        factor: 1 },
      cm:    { label: 'Sentimeter (cm)',  factor: 0.01 },
      mm:    { label: 'Milimeter (mm)',   factor: 0.001 },
      mi:    { label: 'Mil (mi)',         factor: 1609.344 },
      yd:    { label: 'Yard (yd)',        factor: 0.9144 },
      ft:    { label: 'Kaki (ft)',        factor: 0.3048 },
      inch:  { label: 'Inci (in)',        factor: 0.0254 },
      nm:    { label: 'Mil Laut (nmi)',   factor: 1852 },
    }
  },
  weight: {
    name: 'Berat',
    icon: '⚖️',
    units: {
      ton:   { label: 'Ton (t)',          factor: 1000000 },
      kg:    { label: 'Kilogram (kg)',    factor: 1000 },
      g:     { label: 'Gram (g)',         factor: 1 },
      mg:    { label: 'Miligram (mg)',    factor: 0.001 },
      lb:    { label: 'Pon (lb)',         factor: 453.592 },
      oz:    { label: 'Ons (oz)',         factor: 28.3495 },
      kati:  { label: 'Kati (ID)',        factor: 617.4 },
    }
  },
  temperature: {
    name: 'Suhu',
    icon: '🌡️',
    special: true,
    units: {
      c:  { label: 'Celsius (°C)' },
      f:  { label: 'Fahrenheit (°F)' },
      k:  { label: 'Kelvin (K)' },
    }
  },
  area: {
    name: 'Luas',
    icon: '📐',
    units: {
      km2:   { label: 'km² (Km Persegi)',   factor: 1e6 },
      ha:    { label: 'Hektar (ha)',        factor: 10000 },
      m2:    { label: 'm² (Meter Persegi)', factor: 1 },
      cm2:   { label: 'cm² (cm Persegi)',  factor: 0.0001 },
      mi2:   { label: 'Mil Persegi (mi²)', factor: 2589988.11 },
      acre:  { label: 'Acre',              factor: 4046.856 },
      ft2:   { label: 'Kaki Persegi (ft²)',factor: 0.092903 },
    }
  },
  volume: {
    name: 'Volume',
    icon: '🧪',
    units: {
      m3:    { label: 'm³ (Meter Kubik)',   factor: 1000 },
      L:     { label: 'Liter (L)',          factor: 1 },
      ml:    { label: 'Mililiter (mL)',     factor: 0.001 },
      gal_us:{ label: 'Galon US',          factor: 3.78541 },
      gal_uk:{ label: 'Galon UK',          factor: 4.54609 },
      fl_oz: { label: 'Fl Ounce (fl oz)',   factor: 0.0295735 },
      cup:   { label: 'Cangkir (cup)',      factor: 0.236588 },
      tbsp:  { label: 'Sendok Makan',      factor: 0.0147868 },
      tsp:   { label: 'Sendok Teh',        factor: 0.00492892 },
    }
  },
  speed: {
    name: 'Kecepatan',
    icon: '⚡',
    units: {
      kmh:   { label: 'km/jam',            factor: 1 },
      mph:   { label: 'Mil/jam (mph)',      factor: 1.60934 },
      ms:    { label: 'Meter/detik (m/s)', factor: 3.6 },
      knot:  { label: 'Knot',              factor: 1.852 },
      mach:  { label: 'Mach',              factor: 1234.8 },
    }
  },
  data: {
    name: 'Data',
    icon: '💾',
    units: {
      bit:   { label: 'Bit',               factor: 1 },
      byte:  { label: 'Byte (B)',           factor: 8 },
      kb:    { label: 'Kilobyte (KB)',      factor: 8192 },
      mb:    { label: 'Megabyte (MB)',      factor: 8388608 },
      gb:    { label: 'Gigabyte (GB)',      factor: 8589934592 },
      tb:    { label: 'Terabyte (TB)',      factor: 8796093022208 },
      kbit:  { label: 'Kilobit (Kbps)',     factor: 1000 },
      mbit:  { label: 'Megabit (Mbps)',     factor: 1000000 },
    }
  },
  time: {
    name: 'Waktu',
    icon: '⏱️',
    units: {
      ms:    { label: 'Milidetik (ms)',     factor: 0.001 },
      s:     { label: 'Detik (s)',          factor: 1 },
      min:   { label: 'Menit (min)',        factor: 60 },
      h:     { label: 'Jam (h)',            factor: 3600 },
      d:     { label: 'Hari (d)',           factor: 86400 },
      wk:    { label: 'Minggu (wk)',        factor: 604800 },
      mo:    { label: 'Bulan (30 hari)',    factor: 2592000 },
      yr:    { label: 'Tahun (yr)',         factor: 31536000 },
    }
  }
};

// ---- STATE ----
let currentCat = 'length';
let history    = JSON.parse(localStorage.getItem('uc_history') || '[]');
let isDark     = localStorage.getItem('uc_dark') === 'true';

// ---- DOM REFS ----
const fromValueEl  = document.getElementById('fromValue');
const toValueEl    = document.getElementById('toValue');
const fromUnitEl   = document.getElementById('fromUnit');
const toUnitEl     = document.getElementById('toUnit');
const formulaEl    = document.getElementById('formulaText');
const badgeIconEl  = document.getElementById('badgeIcon');
const badgeNameEl  = document.getElementById('badgeName');
const historyListEl= document.getElementById('historyList');
const allUnitsGrid = document.getElementById('allUnitsGrid');
const allUnitsFrom = document.getElementById('allUnitsFrom');
const toastEl      = document.getElementById('toast');
const themeToggle  = document.getElementById('themeToggle');
const themeIconEl  = document.getElementById('themeIcon');
const categoryNav  = document.getElementById('categoryNav');
const sidebar      = document.getElementById('sidebar');
const mobileCatBtn = document.getElementById('mobileCatToggle');

// ---- TEMPERATURE CONVERSION ----
function convertTemp(value, from, to) {
  // to Celsius first
  let c;
  if (from === 'c') c = value;
  else if (from === 'f') c = (value - 32) * 5 / 9;
  else if (from === 'k') c = value - 273.15;
  // from Celsius to target
  if (to === 'c') return c;
  if (to === 'f') return c * 9 / 5 + 32;
  if (to === 'k') return c + 273.15;
}

// ---- GENERAL CONVERSION ----
function convertValue(value, from, to, cat) {
  if (cat === 'temperature') return convertTemp(value, from, to);
  const units = CATEGORIES[cat].units;
  const inBase = value * units[from].factor;
  return inBase / units[to].factor;
}

// ---- FORMAT NUMBER ----
function fmt(num) {
  if (num === null || num === undefined || isNaN(num)) return '—';
  if (Math.abs(num) < 1e-9 && num !== 0) return num.toExponential(4);
  if (Math.abs(num) >= 1e12) return num.toExponential(4);
  // significant digits
  const abs = Math.abs(num);
  let decimals = 6;
  if (abs >= 1000) decimals = 2;
  else if (abs >= 10) decimals = 4;
  const str = parseFloat(num.toPrecision(7)).toString();
  // add thousand separator
  const parts = str.split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return parts.join('.');
}

// ---- POPULATE SELECTS ----
function populateSelects(cat) {
  const units = CATEGORIES[cat].units;
  const keys  = Object.keys(units);

  [fromUnitEl, toUnitEl].forEach((sel, idx) => {
    sel.innerHTML = '';
    keys.forEach(key => {
      const opt = document.createElement('option');
      opt.value = key;
      opt.textContent = units[key].label;
      sel.appendChild(opt);
    });
    // default: from = first, to = second
    sel.value = keys[idx === 0 ? 0 : 1];
  });
}

// ---- CONVERT & RENDER ----
function doConvert() {
  const raw = fromValueEl.value;
  const val = parseFloat(raw);
  const from = fromUnitEl.value;
  const to   = toUnitEl.value;
  const cat  = currentCat;
  const units = CATEGORIES[cat].units;

  if (raw === '' || isNaN(val)) {
    toValueEl.textContent = '0';
    formulaEl.textContent = 'Masukkan angka untuk melihat konversi';
    renderAllUnits(null, from, cat);
    return;
  }

  const result = convertValue(val, from, to, cat);
  const fromLabel = units[from].label.split('(')[0].trim();
  const toLabel   = units[to].label.split('(')[0].trim();

  // Animate result
  toValueEl.classList.remove('pop');
  void toValueEl.offsetWidth;
  toValueEl.classList.add('pop');
  toValueEl.textContent = fmt(result);

  formulaEl.textContent = `${fmt(val)} ${fromLabel} = ${fmt(result)} ${toLabel}`;

  // All units
  renderAllUnits(val, from, cat);

  // Add to history (debounce by checking duplicate)
  if (raw !== '') addHistory(val, from, result, to, units);
}

// ---- RENDER ALL UNITS ----
function renderAllUnits(val, fromKey, cat) {
  const units = CATEGORIES[cat].units;
  const keys  = Object.keys(units);

  if (val === null) {
    allUnitsFrom.textContent = '—';
    allUnitsGrid.innerHTML   = '<p style="color:var(--text-muted);font-size:0.8rem">Masukkan angka di atas</p>';
    return;
  }

  const fromLabel = units[fromKey].label.split('(')[0].trim();
  allUnitsFrom.textContent = `${fmt(val)} ${fromLabel}`;

  allUnitsGrid.innerHTML = '';
  keys.forEach(key => {
    if (key === fromKey) return;
    const converted = convertValue(val, fromKey, key, cat);
    const item = document.createElement('div');
    item.className = 'unit-result-item';
    item.innerHTML = `
      <span class="unit-val">${fmt(converted)}</span>
      <span class="unit-name">${units[key].label}</span>
    `;
    item.title = 'Klik untuk salin';
    item.addEventListener('click', () => {
      navigator.clipboard.writeText(fmt(converted)).then(() => showToast(`✓ ${fmt(converted)} disalin`));
    });
    allUnitsGrid.appendChild(item);
  });
}

// ---- HISTORY ----
function addHistory(val, from, result, to, units) {
  const fromLabel = units[from].label.split('(')[0].trim();
  const toLabel   = units[to].label.split('(')[0].trim();
  const entry = {
    from: `${fmt(val)} ${fromLabel}`,
    to:   `${fmt(result)} ${toLabel}`,
    cat:  currentCat,
    ts:   Date.now()
  };
  // avoid exact duplicate
  if (history.length && history[0].from === entry.from && history[0].to === entry.to) return;
  history.unshift(entry);
  if (history.length > 20) history.pop();
  localStorage.setItem('uc_history', JSON.stringify(history));
  renderHistory();
}

function renderHistory() {
  historyListEl.innerHTML = '';
  if (!history.length) {
    historyListEl.innerHTML = '<li class="history-empty">Belum ada riwayat</li>';
    return;
  }
  history.slice(0, 10).forEach(entry => {
    const li = document.createElement('li');
    li.className = 'history-item';
    const icon = CATEGORIES[entry.cat]?.icon || '⟳';
    li.innerHTML = `${icon} ${entry.from}<br><span class="h-result">→ ${entry.to}</span>`;
    historyListEl.appendChild(li);
  });
}

// ---- CATEGORY SWITCH ----
function switchCat(cat) {
  currentCat = cat;
  const info = CATEGORIES[cat];
  badgeIconEl.textContent = info.icon;
  badgeNameEl.textContent = info.name;

  document.querySelectorAll('.cat-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.cat === cat);
  });

  populateSelects(cat);
  fromValueEl.value = '';
  toValueEl.textContent = '0';
  formulaEl.textContent = 'Masukkan angka untuk melihat konversi';
  renderAllUnits(null, Object.keys(info.units)[0], cat);

  // close mobile sidebar
  sidebar.classList.remove('open');
  document.querySelector('.sidebar-overlay')?.classList.remove('active');
}

// ---- COPY ----
function copyResult() {
  const text = toValueEl.textContent;
  if (!text || text === '0' || text === '—') return;
  navigator.clipboard.writeText(text).then(() => showToast('✓ Hasil disalin!'));
}

// ---- TOAST ----
let toastTimer;
function showToast(msg) {
  toastEl.textContent = msg;
  toastEl.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toastEl.classList.remove('show'), 1800);
}

// ---- SWAP ----
function swapUnits() {
  const fromVal = fromUnitEl.value;
  const toVal   = toUnitEl.value;
  fromUnitEl.value = toVal;
  toUnitEl.value   = fromVal;
  doConvert();
}

// ---- RESET ----
function resetAll() {
  fromValueEl.value = '';
  toValueEl.textContent = '0';
  formulaEl.textContent = 'Masukkan angka untuk melihat konversi';
  renderAllUnits(null, fromUnitEl.value, currentCat);
  fromValueEl.focus();
}

// ---- THEME ----
function applyTheme() {
  document.body.classList.toggle('dark', isDark);
  themeIconEl.textContent = isDark ? '☀️' : '🌙';
  localStorage.setItem('uc_dark', isDark);
}

// ---- MOBILE SIDEBAR ----
function setupMobileSidebar() {
  // overlay
  let overlay = document.querySelector('.sidebar-overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.className = 'sidebar-overlay';
    document.body.appendChild(overlay);
  }

  mobileCatBtn.addEventListener('click', () => {
    sidebar.classList.toggle('open');
    overlay.classList.toggle('active', sidebar.classList.contains('open'));
  });

  overlay.addEventListener('click', () => {
    sidebar.classList.remove('open');
    overlay.classList.remove('active');
  });
}

// ---- EVENTS ----
fromValueEl.addEventListener('input', doConvert);
fromUnitEl.addEventListener('change', doConvert);
toUnitEl.addEventListener('change', doConvert);
document.getElementById('swapBtn').addEventListener('click', swapUnits);
document.getElementById('copyBtn').addEventListener('click', copyResult);
document.getElementById('resetBtn').addEventListener('click', resetAll);
document.getElementById('clearHistory').addEventListener('click', () => {
  history = [];
  localStorage.removeItem('uc_history');
  renderHistory();
});
themeToggle.addEventListener('click', () => {
  isDark = !isDark;
  applyTheme();
});

categoryNav.addEventListener('click', e => {
  const btn = e.target.closest('.cat-btn');
  if (btn) switchCat(btn.dataset.cat);
});

// Keyboard shortcut: Enter to copy
fromValueEl.addEventListener('keydown', e => {
  if (e.key === 'Enter') copyResult();
});

// ---- INIT ----
function init() {
  applyTheme();
  setupMobileSidebar();
  switchCat(currentCat);
  renderHistory();
  fromValueEl.focus();
}

init();
