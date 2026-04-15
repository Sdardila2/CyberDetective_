const GOOD_ENDING_SCORE = 220;
const KEYBINDS = {
  moveUp: ['w', 'arrowup'],
  moveDown: ['s', 'arrowdown'],
  moveLeft: ['a', 'arrowleft'],
  moveRight: ['d', 'arrowright'],
  interact: 'e',
  toggleStory: '1',
  toggleSide: '2',
  focusMap: 'm',
  toggleAllPanels: 'p'
};

const WORLD = { width: 1280, height: 720 };

const levels = [
  {
    id: 1,
    badge: 'Nivel 1',
    title: 'Las primeras señales',
    situation: 'Valeria comienza a recibir mensajes ofensivos en redes sociales. Al principio parecen bromas, pero se repiten constantemente.',
    objective: ['Recolectar capturas de pantalla', 'Identificar el usuario agresor', 'Clasificar la agresión'],
    correctCrime: 'Injuria',
    law: 'Artículo 220 del Código Penal Colombiano',
    penalty: 'Multa o sanciones por afectar el buen nombre.',
    evidencePool: [
      { text: 'Capturas de mensajes ofensivos', ok: true, detail: 'Las capturas muestran burlas repetidas dirigidas directamente a Valeria desde la misma cuenta.', implication: 'Existe afectación al buen nombre y repetición de insultos.' },
      { text: 'Nombre de usuario y hora de envío', ok: true, detail: 'El historial revela el alias de la cuenta y una secuencia de mensajes durante varios días.', implication: 'Ayuda a vincular la conducta con una persona y a demostrar persistencia.' },
      { text: 'Emoji sin contexto', ok: false, detail: 'No muestra insultos, amenazas ni contexto suficiente para asociarlo con un delito.', implication: 'No aporta valor probatorio fuerte por sí solo.' },
      { text: 'Testimonio de quien vio el chat', ok: true, detail: 'Una compañera confirma que los mensajes sí aparecieron en el grupo y afectaron a Valeria.', implication: 'Corrobora la existencia del hecho y su impacto social.' }
    ],
    cluePool: [
      'Los mensajes se repiten con el mismo estilo lingüístico.',
      'La frecuencia de envío muestra intención de hostigar.',
      'Hay coincidencia entre horarios de conexión y clases.'
    ],
    minEvidence: 2,
    modelConclusion: 'Las pruebas indican una injuria reiterada: hay mensajes ofensivos, persistencia en el tiempo y afectación directa al buen nombre de Valeria.'
  },
  {
    id: 2,
    badge: 'Nivel 2',
    title: 'El rumor viral',
    situation: 'Empiezan a circular publicaciones falsas sobre Valeria y el rumor daña su reputación en la escuela.',
    objective: ['Encontrar la publicación original', 'Rastrear el origen del rumor', 'Verificar si la información es falsa'],
    correctCrime: 'Calumnia',
    law: 'Artículo 221 del Código Penal Colombiano',
    penalty: 'Multas o sanciones por difundir acusaciones falsas.',
    evidencePool: [
      { text: 'URL de la publicación original', ok: true, detail: 'La publicación inicial contiene una acusación falsa y permite rastrear el primer origen del rumor.', implication: 'Conecta el contenido dañino con una fuente específica.' },
      { text: 'Capturas del rumor replicado', ok: true, detail: 'Varias cuentas compartieron la misma versión del rumor, amplificando su alcance.', implication: 'Demuestra difusión y daño reputacional.' },
      { text: 'Color favorito de Valeria', ok: false, detail: 'Es un dato irrelevante y no ayuda a probar ni el origen ni la falsedad del rumor.', implication: 'No aporta al análisis del delito.' },
      { text: 'Registro de tiempo del primer post', ok: true, detail: 'El orden de publicación permite reconstruir quién inició la cadena de difusión.', implication: 'Facilita identificar al responsable principal.' }
    ],
    cluePool: [
      'La publicación inicial fue modificada antes de viralizarse.',
      'Una cuenta difundió primero el contenido y luego lo borró.',
      'La imagen usada está fuera de contexto.'
    ],
    minEvidence: 2,
    modelConclusion: 'La evidencia apunta a una calumnia: hubo una acusación falsa, difusión en cadena y un origen rastreable del rumor.'
  },
  {
    id: 3,
    badge: 'Nivel 3',
    title: 'La cuenta fantasma',
    situation: 'Aparece un perfil falso con la foto de Valeria para publicar contenido ofensivo y agredir a terceros.',
    objective: ['Analizar los datos del perfil', 'Rastrear su creación', 'Identificar a quien suplanta'],
    correctCrime: 'Suplantación de identidad',
    law: 'Ley 1273 de 2009 – Delitos informáticos en Colombia',
    penalty: 'Sanciones penales y multas según el daño causado.',
    evidencePool: [
      { text: 'Fecha y correo de creación del perfil', ok: true, detail: 'Los datos de registro muestran cuándo se creó la cuenta falsa y con qué correo.', implication: 'Permite vincular la creación del perfil con una identidad digital concreta.' },
      { text: 'Comparación entre cuenta real y falsa', ok: true, detail: 'La cuenta falsa replica foto, nombre y estilo visual del perfil auténtico de Valeria.', implication: 'Demuestra suplantación y engaño a terceros.' },
      { text: 'Meme compartido por un tercero', ok: false, detail: 'No relaciona directamente al creador del perfil ni la intención de suplantar.', implication: 'Tiene bajo valor probatorio.' },
      { text: 'Metadatos de imagen del perfil', ok: true, detail: 'La imagen usada en la cuenta falsa conserva información de edición y posible origen.', implication: 'Puede conectar el archivo con un dispositivo o usuario.' }
    ],
    cluePool: [
      'El correo de recuperación coincide con otro sospechoso.',
      'La cuenta falsa replica fotos privadas de Valeria.',
      'El dispositivo usado reaparece en más de una plataforma.'
    ],
    minEvidence: 2,
    modelConclusion: 'La conclusión más fuerte es una suplantación de identidad: el perfil falso imitó la cuenta real y dejó rastros técnicos de su creación.'
  },
  {
    id: 4,
    badge: 'Nivel 4',
    title: 'El ataque coordinado',
    situation: 'Varias cuentas atacan a Valeria al mismo tiempo con comentarios humillantes y publicaciones ofensivas.',
    objective: ['Vincular cuentas relacionadas', 'Encontrar patrones', 'Detectar al responsable principal'],
    correctCrime: 'Hostigamiento digital',
    law: 'Amenazas u hostigamiento reiterado, según la gravedad',
    penalty: 'Sanciones penales y procesos judiciales según la persistencia.',
    evidencePool: [
      { text: 'Patrones de horario entre cuentas', ok: true, detail: 'Las cuentas agresoras publican casi al mismo tiempo y siguen secuencias muy parecidas.', implication: 'Sugiere coordinación o control por una sola persona.' },
      { text: 'Errores de escritura repetidos', ok: true, detail: 'Varias cuentas usan las mismas expresiones y los mismos errores ortográficos.', implication: 'Revela una posible autoría común.' },
      { text: 'Canción viral sin relación', ok: false, detail: 'No se relaciona con el patrón de acoso ni con las cuentas involucradas.', implication: 'No ayuda a la investigación.' },
      { text: 'Lista de IP o dispositivos asociados', ok: true, detail: 'Los registros técnicos muestran coincidencias entre dispositivos usados por varias cuentas.', implication: 'Fortalece la hipótesis de ataque coordinado.' }
    ],
    cluePool: [
      'Tres cuentas comparten la misma huella de navegador.',
      'Los insultos aparecen después de ciertas publicaciones de Valeria.',
      'Una cuenta publica y otra amplifica inmediatamente.'
    ],
    minEvidence: 2,
    modelConclusion: 'Las evidencias sostienen un hostigamiento digital coordinado: múltiples cuentas actúan con patrones comunes y probable autoría compartida.'
  },
  { id: 5, badge: 'Final', title: 'La verdad detrás del acoso', final: true, situation: 'Alex reúne todas las evidencias almacenadas en el árbol para reconstruir la línea de los hechos.', objective: ['Recorrer el árbol', 'Analizar nodos', 'Cerrar el caso con un reporte final'] }
];

const crimeOptions = ['Injuria', 'Calumnia', 'Suplantación de identidad', 'Hostigamiento digital'];

const state = {
  levelIndex: 0,
  score: 0,
  root: null,
  insertedCases: [],
  currentEvidence: [],
  interactables: [],
  canUseTerminal: false,
  terminalSolved: false,
  keys: {},
  messageUntil: 0,
  evidenceIndex: 0,
  layout: { storyVisible: true, sideVisible: true, mapFocus: false }
};

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = WORLD.width;
canvas.height = WORLD.height;

const player = { x: 90, y: 360, size: 24, speed: 3.1, spriteSize: 52 };
const terminal = { x: 1120, y: 280, w: 84, h: 150 };
const walls = [
  { x: 210, y: 90, w: 24, h: 430 },
  { x: 420, y: 180, w: 24, h: 420 },
  { x: 640, y: 60, w: 24, h: 370 },
  { x: 860, y: 250, w: 24, h: 380 },
  { x: 980, y: 110, w: 200, h: 24 },
  { x: 300, y: 620, w: 380, h: 24 }
];

const detectiveSprite = new Image();
let detectiveSpriteLoaded = false;
let detectiveSpriteFailed = false;
detectiveSprite.onload = () => { detectiveSpriteLoaded = true; detectiveSpriteFailed = false; renderLayoutLegend(); };
detectiveSprite.onerror = () => { detectiveSpriteLoaded = false; detectiveSpriteFailed = true; renderLayoutLegend(); };
detectiveSprite.src = 'detective.png';

class AVLNode { constructor(data) { this.data = data; this.left = null; this.right = null; this.height = 1; } }
const getHeight = (n) => n ? n.height : 0;
const updateHeight = (n) => n.height = 1 + Math.max(getHeight(n.left), getHeight(n.right));
const getBalance = (n) => n ? getHeight(n.left) - getHeight(n.right) : 0;
function rotateRight(y) { const x = y.left; const t2 = x.right; x.right = y; y.left = t2; updateHeight(y); updateHeight(x); return x; }
function rotateLeft(x) { const y = x.right; const t2 = y.left; y.left = x; x.right = t2; updateHeight(x); updateHeight(y); return y; }
function insertAVL(node, data) {
  if (!node) return new AVLNode(data);
  if (data.severity < node.data.severity) node.left = insertAVL(node.left, data);
  else if (data.severity > node.data.severity) node.right = insertAVL(node.right, data);
  else { data.severity += Math.random() < 0.5 ? -1 : 1; return insertAVL(node, data); }
  updateHeight(node);
  const balance = getBalance(node);
  if (balance > 1 && data.severity < node.left.data.severity) return rotateRight(node);
  if (balance < -1 && data.severity > node.right.data.severity) return rotateLeft(node);
  if (balance > 1 && data.severity > node.left.data.severity) { node.left = rotateLeft(node.left); return rotateRight(node); }
  if (balance < -1 && data.severity < node.right.data.severity) { node.right = rotateRight(node.right); return rotateLeft(node); }
  return node;
}
function traverse(node, order, acc = []) {
  if (!node) return acc;
  if (order === 'pre') acc.push(node.data);
  traverse(node.left, order, acc);
  if (order === 'in') acc.push(node.data);
  traverse(node.right, order, acc);
  if (order === 'post') acc.push(node.data);
  return acc;
}
function shuffle(arr) { return [...arr].sort(() => Math.random() - 0.5); }
function pickRandom(items, count) { return shuffle(items).slice(0, count); }
function clamp(v, min, max) { return Math.max(min, Math.min(max, v)); }
function rectsOverlap(a, b) { return a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y; }
function playerRect(x = player.x, y = player.y) { return { x: x - player.size / 2, y: y - player.size / 2, w: player.size, h: player.size }; }
function setSubtitle(text) { document.getElementById('subtitleBox').textContent = `Alex: ${text}`; }
function showHint(text, duration = 1800) { document.getElementById('interactionHint').textContent = text; state.messageUntil = performance.now() + duration; }
function showFeedback(message, type = 'success') { const box = document.getElementById('feedbackBox'); box.className = `feedback ${type}`; box.innerHTML = `<p>${message}</p>`; box.classList.remove('hidden'); }
function hideFeedback() { document.getElementById('feedbackBox').classList.add('hidden'); }

function renderLayoutLegend() {
  const legend = document.getElementById('keyLegend');
  legend.innerHTML = `
    <span class="key-pill"><kbd>${KEYBINDS.toggleStory.toUpperCase()}</kbd> historia</span>
    <span class="key-pill"><kbd>${KEYBINDS.toggleSide.toUpperCase()}</kbd> detective</span>
    <span class="key-pill"><kbd>${KEYBINDS.focusMap.toUpperCase()}</kbd> foco mapa</span>
    <span class="key-pill"><kbd>${KEYBINDS.toggleAllPanels.toUpperCase()}</kbd> ambos</span>
    ${detectiveSpriteLoaded ? '<span class="key-pill">sprite: detective.png</span>' : '<span class="key-pill">sprite: fallback</span>'}
  `;
}

function applyLayoutState() {
  document.body.classList.toggle('hide-story', !state.layout.storyVisible);
  document.body.classList.toggle('hide-side', !state.layout.sideVisible);
  document.body.classList.toggle('map-focus', state.layout.mapFocus);
  const badge = document.getElementById('layoutModeBadge');
  if (state.layout.mapFocus) badge.textContent = 'Modo mapa total';
  else if (!state.layout.storyVisible && !state.layout.sideVisible) badge.textContent = 'Solo mapa';
  else if (!state.layout.storyVisible || !state.layout.sideVisible) badge.textContent = 'Modo compacto';
  else badge.textContent = 'Modo normal';
}

function toggleStoryPanel() { state.layout.storyVisible = !state.layout.storyVisible; state.layout.mapFocus = false; applyLayoutState(); }
function toggleSidePanel() { state.layout.sideVisible = !state.layout.sideVisible; state.layout.mapFocus = false; applyLayoutState(); }
function toggleMapFocus() { state.layout.mapFocus = !state.layout.mapFocus; applyLayoutState(); }
function toggleAllPanels() {
  const allVisible = state.layout.storyVisible && state.layout.sideVisible;
  state.layout.storyVisible = !allVisible;
  state.layout.sideVisible = !allVisible;
  state.layout.mapFocus = false;
  applyLayoutState();
}

function buildLevel() {
  const level = levels[state.levelIndex];
  state.currentEvidence = [];
  state.canUseTerminal = false;
  state.terminalSolved = false;
  state.evidenceIndex = 0;
  player.x = 90;
  player.y = 360;
  document.getElementById('terminalPanel').classList.add('hidden');
  document.getElementById('submitDecisionBtn').disabled = false;
  document.getElementById('nextBtn').disabled = true;
  document.getElementById('conclusionInput').value = '';
  hideFeedback();

  if (!level.final) {
    playCinematic({
      title: `Nivel ${level.id}: ${level.title}`,
      text: `Todo comienza con pequeños indicios.
  Mensajes que parecen bromas.
  Comentarios que otros prefieren ignorar.
  
  Pero para Valeria ya no es un juego.
  Cada notificación pesa.
  Cada día, un poco más.
  
  Tu tarea es leer entre líneas,
  reunir pruebas
  y decidir si esto se quedará en simples palabras… 
  o se convertirá en algo mucho más grave.`
    });
  }

  if (level.final) {
    const isGoodEnding = state.score >= GOOD_ENDING_SCORE;
    const storyCard = document.getElementById('storyCard');
  
    if (isGoodEnding) {
      storyCard.innerHTML = `
        <h3>✅ Caso resuelto</h3>
        <p>
          Gracias al trabajo del detective, el caso de ciberacoso fue correctamente investigado.
          Las evidencias se analizaron, los delitos se identificaron y se tomaron acciones legales.
        </p>
        <p>
          <strong>Resultado:</strong> Valeria recibe apoyo, el acoso se detiene y el colegio
          refuerza sus protocolos de convivencia digital.
        </p>
        <p class="ending-good">
          Este final demuestra que una investigación responsable puede cambiar una vida.
        </p>
        <p><strong>Puntaje final:</strong> ${state.score}</p>
      `;
      setSubtitle('Buen trabajo, detective. Lograste reconstruir la verdad.');
    } else {
      storyCard.innerHTML = `
        <h3>❌ Caso no resuelto</h3>
        <p>
          La investigación no logró reunir suficientes pruebas ni conclusiones claras.
          El acoso continuó sin consecuencias para el agresor.
        </p>
        <p>
          <strong>Resultado:</strong> Valeria decide abandonar el colegio
          al no encontrar un entorno seguro.
        </p>
        <p class="ending-bad">
          Este final muestra cómo la falta de acción y análisis puede tener consecuencias reales.
        </p>
        <p><strong>Puntaje final:</strong> ${state.score}</p>
      `;
      setSubtitle('El caso quedó inconcluso. Las consecuencias fueron graves.');
    }
  
    const nextBtn = document.getElementById('nextBtn');
    nextBtn.textContent = 'Volver a jugar';
    nextBtn.disabled = false;

    state.layout.storyVisible = true;
    state.layout.sideVisible = false;
    state.layout.mapFocus = false;
    applyLayoutState();
  
    renderTraversal('in');
    updateHUD();
    return;
  }

  document.getElementById('mapBadge').textContent = 'Explora con WASD';
  const positions = [
    { x: 120, y: 110 },
    { x: 270, y: 610 },
    { x: 520, y: 90 },
    { x: 760, y: 530 },
    { x: 980, y: 170 },
    { x: 1080, y: 610 },
    { x: 350, y: 330 },
    { x: 690, y: 250 }
  ];
  state.interactables = pickRandom(level.evidencePool.map((item, idx) => ({ ...item, id: idx })), 4).map((item, i) => ({
    type: 'evidence',
    id: `${level.id}-${item.id}-${i}`,
    x: positions[i].x,
    y: positions[i].y,
    w: 34,
    h: 34,
    collected: false,
    text: item.text,
    detail: item.detail,
    implication: item.implication,
    ok: item.ok,
    read: false
  }));
  renderStory();
  renderHUD();
  renderEvidenceViewer();
  showHint(detectiveSpriteLoaded
    ? 'Mapa ampliado listo. Recorre la escena y usa M para foco total.'
    : 'Mapa ampliado listo. Si añades detective.png a la carpeta, el detective usará tu imagen.');
}

function renderStory() {
  const level = levels[state.levelIndex];
  document.getElementById('levelBadge').textContent = level.badge;
  const card = document.getElementById('storyCard');
  if (level.final) {
    const report = traverse(state.root, 'in').map((item, idx) => `
      <li><strong>${idx + 1}. ${item.levelTitle}</strong><br>
      Delito: ${item.crime}<br>
      Ley: ${item.law}<br>
      Pena: ${item.penalty}<br>
      Conclusión: ${item.conclusion}<br>
      Evidencias: ${item.evidence.join(', ')}</li>`).join('');
    card.innerHTML = `<h3>${level.title}</h3><p>${level.situation}</p><p><strong>Objetivos finales:</strong></p><ul>${level.objective.map(item => `<li>${item}</li>`).join('')}</ul><h3>Reporte final</h3>${report ? `<ol>${report}</ol>` : '<p>No se insertaron casos.</p>'}<p><strong>Conclusión:</strong> una cadena de "bromas" digitales puede convertirse en varios delitos reales.</p>`;
    document.getElementById('nextBtn').textContent = 'Volver al inicio';
    document.getElementById('nextBtn').disabled = false;
    setSubtitle('El árbol de la verdad está completo.');
    renderTraversal('in');
    return;
  }
  card.innerHTML = `<h3>${level.title}</h3><p>${level.situation}</p><p><strong>Objetivos:</strong></p><ul>${level.objective.map(item => `<li>${item}</li>`).join('')}</ul><p><strong>Meta:</strong> recoge y lee al menos ${level.minEvidence} evidencias válidas antes de usar el terminal.</p><p><strong>Consejo:</strong> usa <kbd>${KEYBINDS.focusMap.toUpperCase()}</kbd> para dejar el mapa como protagonista.</p>`;
  document.getElementById('terminalPrompt').textContent = 'Ya en el terminal, usa tu conclusión para clasificar el delito e insertarlo en el árbol AVL.';
  document.getElementById('crimeSelect').innerHTML = crimeOptions.map(c => `<option value="${c}">${c}</option>`).join('');
  const recommended = Math.min(95, 20 + level.id * 18 + Math.floor(Math.random() * 8));
  document.getElementById('severityRange').value = recommended;
  document.getElementById('severityValue').textContent = recommended;
  document.getElementById('collectedEvidence').innerHTML = '<li class="muted">Aún no has analizado evidencias.</li>';
  document.getElementById('nextBtn').textContent = 'Siguiente caso';
  renderClues();
  setSubtitle(detectiveSpriteLoaded ? 'El mapa manda. Usa M, 1, 2 o P para organizar la interfaz.' : 'Añade detective.png a la carpeta para reemplazar el círculo azul.');
}

function renderClues() {
  const level = levels[state.levelIndex];
  const clues = pickRandom(level.cluePool, 2);
  document.getElementById('cluesList').innerHTML = clues.map(item => `<li>${item}</li>`).join('');
}

function renderHUD() {
  document.getElementById('progressText').textContent = `${Math.min(state.levelIndex + 1, 5)} / 5`;
  document.getElementById('scoreText').textContent = state.score;
  document.getElementById('treeStats').textContent = `${state.insertedCases.length} caso${state.insertedCases.length === 1 ? '' : 's'}`;
  const analyzed = state.currentEvidence.filter(ev => ev.read);
  document.getElementById('collectedEvidence').innerHTML = analyzed.length ? analyzed.map(ev => `<li>${ev.text}</li>`).join('') : '<li class="muted">Aún no has analizado evidencias.</li>';
}

function updateHUD() {
  renderHUD();
}

function renderEvidenceViewer() {
  const viewer = document.getElementById('evidenceViewer');
  const counter = document.getElementById('evidenceCounter');
  const readBtn = document.getElementById('markReadBtn');
  const prevBtn = document.getElementById('prevEvidenceBtn');
  const nextBtn = document.getElementById('nextEvidenceBtn');
  const level = levels[state.levelIndex];
  document.getElementById('dossierCaseCode').textContent = `NET-CASE-0${Math.min(state.levelIndex + 1, 5)}`;

  if (!state.currentEvidence.length) {
    viewer.innerHTML = '<p class="muted">Recoge una evidencia para abrir el expediente.</p>';
    counter.textContent = '0 / 0';
    document.getElementById('dossierStatus').textContent = 'Sin evidencias';
    document.getElementById('readStatusText').textContent = 'Pendiente';
    readBtn.disabled = true; prevBtn.disabled = true; nextBtn.disabled = true;
    updateConclusionBox();
    return;
  }

  state.evidenceIndex = clamp(state.evidenceIndex, 0, state.currentEvidence.length - 1);
  const ev = state.currentEvidence[state.evidenceIndex];
  viewer.innerHTML = `<div class="file-header"><div class="file-title">${ev.text}</div><span class="file-tag ${ev.ok ? 'relevant' : 'weak'}">${ev.ok ? 'Prueba relevante' : 'Prueba débil'}</span></div><div class="dossier-grid"><div class="data-row"><div class="data-key">Resumen</div><div class="data-value">${ev.detail}</div></div><div class="data-row"><div class="data-key">Inferencia</div><div class="data-value">${ev.implication}</div></div><div class="data-row"><div class="data-key">Caso asociado</div><div class="data-value">${level.title}</div></div><div class="data-row"><div class="data-key">Uso probatorio</div><div class="data-value">${ev.ok ? 'Puede respaldar una hipótesis central del caso.' : 'Requiere contexto adicional; por sí sola no sostiene la conclusión.'}</div></div></div><div class="read-state ${ev.read ? 'done' : 'pending'}">${ev.read ? 'Estado: evidencia leída y validada por el detective.' : 'Estado: pendiente de lectura analítica.'}</div>`;
  counter.textContent = `${state.evidenceIndex + 1} / ${state.currentEvidence.length}`;
  document.getElementById('dossierStatus').textContent = ev.read ? 'Analizada' : 'En revisión';
  document.getElementById('readStatusText').textContent = ev.read ? 'Válida para análisis' : 'Pendiente';
  readBtn.disabled = ev.read; prevBtn.disabled = state.evidenceIndex === 0; nextBtn.disabled = state.evidenceIndex === state.currentEvidence.length - 1;
  updateConclusionBox();
}

function markCurrentEvidenceRead() {
  if (!state.currentEvidence.length) return;
  const ev = state.currentEvidence[state.evidenceIndex];
  if (ev.read) return;
  ev.read = true;
  const validReadCount = state.currentEvidence.filter(item => item.ok && item.read).length;
  if (validReadCount >= levels[state.levelIndex].minEvidence) state.canUseTerminal = true;
  renderHUD();
  renderEvidenceViewer();
  showHint(`Evidencia analizada: ${ev.text}`);
  setSubtitle('Bien. Cruza esta pista con las demás y luego vuelve al terminal.');
}

function updateConclusionBox() {
  const level = levels[state.levelIndex];
  const box = document.getElementById('conclusionBox');
  if (level.final) { box.innerHTML = '<strong>Conclusión preliminar:</strong> el caso ya fue cerrado. Revisa el reporte final.'; return; }
  const readCount = state.currentEvidence.filter(ev => ev.read).length;
  const validReadCount = state.currentEvidence.filter(ev => ev.ok && ev.read).length;
  if (readCount === 0) box.innerHTML = '<strong>Conclusión preliminar:</strong> aún no hay suficientes evidencias leídas.';
  else if (validReadCount < level.minEvidence) box.innerHTML = `<strong>Conclusión preliminar:</strong> has leído ${readCount} evidencia(s), pero todavía faltan pruebas relevantes para sostener una hipótesis sólida.`;
  else box.innerHTML = `<strong>Conclusión preliminar:</strong> ${level.modelConclusion}`;
}

function renderTree(node = state.root) {
  const treeContainer = document.getElementById('treeContainer');
  treeContainer.innerHTML = node ? `<div class="tree">${renderNode(node)}</div>` : '<p class="muted">Aún no hay nodos.</p>';
}
function renderNode(node) {
  if (!node) return '';
  return `<ul><li><div class="node"><div class="key">${node.data.severity}</div><div><strong>${node.data.crime}</strong></div><div class="meta">${node.data.levelTitle}</div><span class="small">${node.data.law}</span></div>${node.left || node.right ? `<ul><li>${node.left ? renderNode(node.left) : ''}</li><li>${node.right ? renderNode(node.right) : ''}</li></ul>` : ''}</li></ul>`;
}
function renderTraversal(order) {
  const labels = { in: 'Inorden', pre: 'Preorden', post: 'Postorden' };
  const nodes = traverse(state.root, order);
  document.getElementById('traversalOutput').innerHTML = nodes.length ? `<strong>${labels[order]}:</strong> ` + nodes.map(n => `${n.levelTitle} [${n.severity}]`).join(' → ') : 'Sin nodos todavía.';
}

function collectEvidence(item) {
  if (item.collected) return;
  item.collected = true;
  state.currentEvidence.push({ text: item.text, detail: item.detail, implication: item.implication, ok: item.ok, read: false });
  state.evidenceIndex = state.currentEvidence.length - 1;
  renderHUD();
  renderEvidenceViewer();
  showHint(`Evidencia recogida: ${item.text}. Revísala en el expediente.`);
  setSubtitle('Nueva evidencia encontrada. Puedes jugar solo con el mapa y abrir el resto cuando lo necesites.');
}

function nearInteractable() {
  const p = playerRect();
  for (const item of state.interactables) {
    if (!item.collected) {
      const expanded = { x: item.x - 20, y: item.y - 20, w: item.w + 40, h: item.h + 40 };
      if (rectsOverlap(p, expanded)) return item;
    }
  }
  const termExpanded = { x: terminal.x - 24, y: terminal.y - 24, w: terminal.w + 48, h: terminal.h + 48 };
  if (rectsOverlap(p, termExpanded)) return { type: 'terminal' };
  return null;
}

function interact() {
  const target = nearInteractable();
  const level = levels[state.levelIndex];
  if (!target) { showHint('No hay nada con qué interactuar aquí.'); return; }
  if (target.type === 'evidence') { collectEvidence(target); return; }
  if (target.type === 'terminal') {
    if (level.final) return;
    const validReadCount = state.currentEvidence.filter(ev => ev.ok && ev.read).length;
    if (validReadCount < level.minEvidence) {
      showHint(`Antes de usar el terminal debes leer al menos ${level.minEvidence} evidencias relevantes.`);
      setSubtitle('Todavía no. Revisa el expediente y luego regresa al terminal.');
      return;
    }
    state.layout.storyVisible = true;
    applyLayoutState();
    document.getElementById('terminalPanel').classList.remove('hidden');
    showHint('Terminal desbloqueado. Redacta tu conclusión y clasifica el caso.');
    setSubtitle('Perfecto. Ya tienes base para redactar una conclusión razonada.');
  }
}

function evaluateDecision() {
  const level = levels[state.levelIndex];
  const selectedCrime = document.getElementById('crimeSelect').value;
  const severity = Number(document.getElementById('severityRange').value);
  const validReadCount = state.currentEvidence.filter(ev => ev.ok && ev.read).length;
  const readCount = state.currentEvidence.filter(ev => ev.read).length;
  const conclusion = document.getElementById('conclusionInput').value.trim();
  let points = 0;
  const messages = [];

  if (selectedCrime === level.correctCrime) { points += 35; messages.push('Clasificación correcta.'); }
  else messages.push(`El delito esperado era <strong>${level.correctCrime}</strong>.`);
  if (validReadCount >= level.minEvidence) { points += 25; messages.push('Leíste suficientes evidencias relevantes.'); }
  else messages.push('Te faltó leer o relacionar evidencias relevantes.');
  if (readCount === state.currentEvidence.length && state.currentEvidence.length > 0) { points += 10; messages.push('Revisaste todas las evidencias disponibles del nivel.'); }
  else messages.push('Todavía quedaban evidencias sin revisar.');
  if (severity >= (20 + level.id * 15)) { points += 15; messages.push('La gravedad asignada es coherente con la escalada del caso.'); }
  else messages.push('La gravedad quedó un poco baja frente al caso.');
  if (conclusion.length >= 30) { points += 15; messages.push('Tu conclusión está suficientemente desarrollada.'); }
  else messages.push('Escribe una conclusión más clara para justificar tu análisis.');

  if (validReadCount < level.minEvidence || conclusion.length < 30) {
    showFeedback('Antes de insertar el caso debes leer evidencias relevantes y redactar una conclusión más sólida.', 'error');
    setSubtitle('Aún falta análisis. Usa el expediente y mejora tu conclusión.');
    return;
  }

  const caseData = { id: `CASO-${level.id}-${Date.now().toString().slice(-5)}`, levelTitle: level.title, crime: level.correctCrime, law: level.law, penalty: level.penalty, evidence: state.currentEvidence.map(ev => ev.text), severity, conclusion };
  state.root = insertAVL(state.root, caseData);
  state.insertedCases.push(caseData);
  state.score += points;
  state.terminalSolved = true;
  renderTree();
  renderTraversal('in');
  renderHUD();
  document.getElementById('submitDecisionBtn').disabled = true;
  document.getElementById('nextBtn').disabled = false;
  const good = selectedCrime === level.correctCrime && validReadCount >= level.minEvidence;
  showFeedback(`${messages.join(' ')} <br><strong>Puntos ganados: ${points}</strong>`, good ? 'success' : 'error');
  setSubtitle(good ? 'Caso insertado con éxito. Tu conclusión quedó registrada en el árbol.' : 'Caso insertado. Aún puedes mejorar la calidad de tu análisis.');
}

function nextStep() {
  if (state.levelIndex === levels.length - 1) {
    resetGame();
    return;
  }

  playCinematic({
    title: 'La investigación continúa',
    text: 'Aunque el caso avanza, el acoso no se ha detenido. Nuevas pruebas salen a la luz…',
    onEnd: () => {
      window.scrollTo({ top: 0, behavior: 'instant' });
      state.levelIndex++;
      buildLevel();
    }
  });
}

function resetGame() {
  state.levelIndex = 0;
  state.score = 0;
  state.root = null;
  state.insertedCases = [];
  state.layout.storyVisible = true;
  state.layout.sideVisible = true;
  state.layout.mapFocus = false;
  applyLayoutState();
  renderTree();
  renderTraversal('in');
  buildLevel();
}

function isPressed(keys) { return keys.some(k => state.keys[k]); }
function movePlayer() {
  let dx = 0, dy = 0;
  if (isPressed(KEYBINDS.moveUp)) dy -= player.speed;
  if (isPressed(KEYBINDS.moveDown)) dy += player.speed;
  if (isPressed(KEYBINDS.moveLeft)) dx -= player.speed;
  if (isPressed(KEYBINDS.moveRight)) dx += player.speed;
  if (!dx && !dy) return;
  const nx = clamp(player.x + dx, player.size / 2, canvas.width - player.size / 2);
  const ny = clamp(player.y + dy, player.size / 2, canvas.height - player.size / 2);
  const nextRect = playerRect(nx, ny);
  if (!walls.some(w => rectsOverlap(nextRect, w))) { player.x = nx; player.y = ny; }
}

function drawPlayer() {
  if (detectiveSpriteLoaded) {
    const size = player.spriteSize;
    ctx.save();
    ctx.imageSmoothingEnabled = true;
    ctx.drawImage(detectiveSprite, player.x - size / 2, player.y - size / 2, size, size);
    ctx.restore();
  } else {
    ctx.fillStyle = '#38bdf8';
    ctx.beginPath();
    ctx.arc(player.x, player.y, player.size / 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#04111d';
    ctx.fillRect(player.x - 4, player.y - 2, 8, 8);
  }
}

function drawTerminal() {
  ctx.fillStyle = state.canUseTerminal ? '#123a28' : '#3a1e1e';
  ctx.fillRect(terminal.x, terminal.y, terminal.w, terminal.h);
  ctx.fillStyle = '#bdeeff';
  ctx.fillRect(terminal.x + 10, terminal.y + 10, terminal.w - 20, 34);
  ctx.fillStyle = '#e5eefc';
  ctx.font = '14px sans-serif';
  ctx.fillText('TERMINAL', terminal.x + 10, terminal.y + 68);
  ctx.fillText(state.canUseTerminal ? 'LISTO' : 'BLOQ.', terminal.x + 15, terminal.y + 92);
  ctx.fillStyle = 'rgba(255,255,255,0.08)';
  ctx.fillRect(terminal.x + 18, terminal.y + 112, terminal.w - 36, 18);
}

function drawEvidence(item) {
  ctx.fillStyle = item.ok ? '#22c55e' : '#f59e0b';
  if (typeof ctx.roundRect === 'function') {
    ctx.beginPath();
    ctx.roundRect(item.x, item.y, item.w, item.h, 8);
    ctx.fill();
  } else {
    ctx.fillRect(item.x, item.y, item.w, item.h);
  }
  ctx.fillStyle = '#04111d';
  ctx.font = '14px sans-serif';
  ctx.fillText('E', item.x + 12, item.y + 22);
}

function playCinematic({ title, text, onEnd }) {
  const overlay = document.getElementById('cinematicOverlay');
  const titleEl = document.getElementById('cinematicTitle');
  const textEl = document.getElementById('cinematicText');
  const btn = document.getElementById('cinematicBtn');

  titleEl.textContent = title;
  textEl.textContent = text;

  overlay.classList.remove('hidden');

  btn.onclick = () => {
    overlay.classList.add('hidden');
    if (onEnd) onEnd();
  };
}

function drawScene() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#0b1220';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.strokeStyle = 'rgba(255,255,255,0.04)';
  for (let x = 0; x <= canvas.width; x += 40) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke(); }
  for (let y = 0; y <= canvas.height; y += 40) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke(); }

  walls.forEach(w => { ctx.fillStyle = '#23314a'; ctx.fillRect(w.x, w.y, w.w, w.h); });
  drawTerminal();
  state.interactables.forEach(item => { if (!item.collected) drawEvidence(item); });
  drawPlayer();

  const target = nearInteractable();
  if (target) {
    const text = target.type === 'terminal' ? 'Presiona E para usar terminal' : 'Presiona E para recoger';
    ctx.fillStyle = 'rgba(0,0,0,0.62)';
    ctx.fillRect(16, 16, 290, 34);
    ctx.fillStyle = '#e9f2ff';
    ctx.font = '15px sans-serif';
    ctx.fillText(text, 26, 38);
  }

  if (performance.now() > state.messageUntil) {
    document.getElementById('interactionHint').textContent = detectiveSpriteFailed ? 'Muévete hacia una evidencia o al terminal. Falta detective.png.' : 'Muévete hacia una evidencia o al terminal.';
  }

  movePlayer();
  requestAnimationFrame(drawScene);
}

function isTypingTarget(target) {
  if (!target) return false;
  const tag = target.tagName;
  return tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || target.isContentEditable;
}

function handleKeyCommand(key) {
  if (key === KEYBINDS.interact) { interact(); return; }
  if (key === KEYBINDS.toggleStory) { toggleStoryPanel(); showHint('Panel de investigación alternado.'); return; }
  if (key === KEYBINDS.toggleSide) { toggleSidePanel(); showHint('Panel del detective alternado.'); return; }
  if (key === KEYBINDS.focusMap) { toggleMapFocus(); showHint(state.layout.mapFocus ? 'Modo mapa total activado.' : 'Modo mapa total desactivado.'); return; }
  if (key === KEYBINDS.toggleAllPanels) { toggleAllPanels(); showHint('Se alternó la visibilidad de ambos paneles secundarios.'); }
}

function initControls() {
  window.addEventListener('keydown', (e) => {
    const key = e.key.toLowerCase();

    // ✅ FIX: Check for typing target FIRST before anything else
    if (isTypingTarget(document.activeElement)) {
      if (key === 'escape') document.activeElement.blur();
      return;
    }

    state.keys[key] = true;
    const movementKeys = [...KEYBINDS.moveUp, ...KEYBINDS.moveDown, ...KEYBINDS.moveLeft, ...KEYBINDS.moveRight];
    const commandKeys = [KEYBINDS.interact, KEYBINDS.toggleStory, KEYBINDS.toggleSide, KEYBINDS.focusMap, KEYBINDS.toggleAllPanels];
    if ([...movementKeys, ...commandKeys, ' '].includes(key)) e.preventDefault();

    if (e.repeat && commandKeys.includes(key)) return;
    handleKeyCommand(key);
  });

  window.addEventListener('keyup', (e) => {
    // ✅ FIX: Also guard keyup so keys don't get stuck after typing
    if (isTypingTarget(document.activeElement)) return;
    state.keys[e.key.toLowerCase()] = false;
  });
}

function initUI() {
  document.getElementById('submitDecisionBtn').addEventListener('click', evaluateDecision);
  document.getElementById('nextBtn').addEventListener('click', nextStep);
  document.getElementById('restartBtn').addEventListener('click', resetGame);
  document.getElementById('severityRange').addEventListener('input', (e) => { document.getElementById('severityValue').textContent = e.target.value; });
  document.querySelectorAll('.traversal-actions button').forEach(btn => btn.addEventListener('click', () => renderTraversal(btn.dataset.order)));
  document.getElementById('prevEvidenceBtn').addEventListener('click', () => { state.evidenceIndex -= 1; renderEvidenceViewer(); });
  document.getElementById('nextEvidenceBtn').addEventListener('click', () => { state.evidenceIndex += 1; renderEvidenceViewer(); });
  document.getElementById('markReadBtn').addEventListener('click', markCurrentEvidenceRead);
  const modal = document.getElementById('modalOverlay');
  document.getElementById('helpBtn').addEventListener('click', () => modal.classList.remove('hidden'));
  document.getElementById('closeModalBtn').addEventListener('click', () => modal.classList.add('hidden'));
  modal.addEventListener('click', (e) => { if (e.target === modal) modal.classList.add('hidden'); });
  document.getElementById('contrastBtn').addEventListener('click', () => document.body.classList.toggle('high-contrast'));
}

function init() {
  renderLayoutLegend();
  applyLayoutState();
  initControls();
  initUI();
  buildLevel();
  renderTree();
  renderTraversal('in');
  requestAnimationFrame(drawScene);
}

document.addEventListener('DOMContentLoaded', init);
