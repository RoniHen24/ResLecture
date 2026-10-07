// =========================================================
// Quiz questions — edit these.
//   question:    the question text
//   answers:     the answer options (any number, 4 recommended)
//   correct:     index of the correct answer (0 = first)
//   explanation: shown after answering
//   monitor:     optional live patient monitor shown above the answers
//                  rhythm: "sinus" | "vt" | "torsades" | "vf" | "asystole"
//                  hr:     heart rate number (also sets the trace speed),
//                          or null to show "--"
//                  spo2:   number or null for "--"
//                  nibp:   "120/80" or null for "--/--"
//   image:       optional photo instead of a monitor, e.g. "images/q1.jpg"
//   (leave out both monitor and image for a question with no picture)
// =========================================================
const QUESTIONS = [
  {
    question: "מטופל נמצא בדום לב. אין דופק, והצוות כבר התחיל עיסויים. מהי התרופה המרכזית שיש לתת כחלק מפרוטוקול ההחייאה?",
    monitor: { rhythm: "asystole", hr: null, spo2: null, nibp: null },
    answers: [
      "אדרנלין",
      "אמיודרון",
      "מגנזיום",
      "לידוקאין",
    ],
    correct: 0,
    explanation: 'אדרנלין הוא הבחירה הנכונה. בדום לב עם אסיסטולה, אדרנלין הוא חלק מרכזי מאלגוריתם ההחייאה. הוא גורם בעיקר לכיווץ כלי הדם, וכך עוזר לשפר את זרימת הדם ללב ולמוח בזמן העיסויים. הוא לא פשוט "מפעיל מחדש" את הלב.',
  },
  {
    question: "המטופל נמצא ב־VF. בוצעו עיסויים וניסיונות דפיברילציה, אך ה־VF ממשיך. איזו תרופה יכולה להינתן במצב כזה כדי לעזור לייצב את הפעילות החשמלית של הלב?",
    monitor: { rhythm: "vf", hr: null, spo2: null, nibp: null },
    answers: [
      "אדרנלין",
      "אמיודרון",
      "מגנזיום",
      "סודיום ביקרבונט",
    ],
    correct: 1,
    explanation: "אמיודרון הוא הבחירה הנכונה. כאשר VF ממשיך למרות דפיברילציה, ניתן להשתמש באמיודרון כאנטי־אריתמי. הוא משפיע על תעלות היונים ועל ההולכה החשמלית בלב, ועוזר לשנות את הפעילות החשמלית הלא־תקינה. אפשר לזכור: אדרנלין עוזר לנו עם זרימת הדם, ואמיודרון עוזר לנו עם הבעיה החשמלית.",
  },
    {
    question: "הגעתם להחייאה והמטופל עדיין ללא דופק. עברו מספר דקות מאז מנת האדרנלין הקודמת, והצוות ממשיך בהחייאה. איזו תרופה צפויה להינתן שוב בהתאם לפרוטוקול?",
    monitor: { rhythm: "asystole", hr: null, spo2: null, nibp: null },
    answers: [
      "אמיודרון",
      "אדרנלין",
      "סידן",
      "מגנזיום",
    ],
    correct: 1,
    explanation: "אדרנלין הוא הבחירה הנכונה. במהלך דום לב ניתן לחזור על מתן אדרנלין במרווחים המתאימים לפי פרוטוקול ההחייאה. המטרה היא להמשיך לתמוך בזרימת הדם ללב ולמוח בזמן שהעיסויים והטיפול בגורם לדום הלב נמשכים.",
  },
    {
    question: "מטופל בדום לב עם VT ללא דופק. אחרי 3 שוקים הקצב לא השתנה. איזו תרופה נותנים?",
    monitor: { rhythm: "vt", hr: 243, spo2: null, nibp: null },
    answers: [
      "מגנזיום",
      "סודיום ביקרבונט",
      "אמיודרון",
      "סידן",
    ],
    correct: 2,
    explanation: "כאשר הקצב נשאר VT גם אחרי כמה שוקים, שריר הלב \"עצבני\" מדי, והשוק לא מצליח להחזיק. אמיודרון היא תרופה אנטי-אריתמית שמאריכה את זמן ההתאוששות של תאי הלב. כך התאים לא יכולים לירות שוב ושוב, והלב מתייצב. המטרה היא שהשוק הבא יחזיר את הלב לקצב תקין, והפעם הקצב יישאר.",
  },
  {
    question: "מטופל מפתח Torsades de Pointes, וה־ECG מראה גלים משונים   . איזו תרופה מתאימה במיוחד למצב הזה?",
    monitor: { rhythm: "torsades", hr: 252, spo2: null, nibp: null },
    answers: [
      "אדרנלין",
      "אמיודרון",
      "לידוקאין",
      "מגנזיום",
    ],
    correct: 3,
    explanation: "במקרה של Torsades de Pointes  , מגנזיום הוא התרופה המועדפת. הוא עוזר לייצב את הפעילות החשמלית של הלב ולמנוע החמרה של האריתמיה.",
  },
];

const LETTERS = ["א", "ב", "ג", "ד", "ה", "ו"];

// ---------- Elements ----------
const $ = (id) => document.getElementById(id);

const screens = {
  start: $("screen-start"),
  quiz: $("screen-quiz"),
  result: $("screen-result"),
};

const progressLabel = $("progress-label");
const progressFill = $("progress-fill");
const questionText = $("question-text");
const questionMedia = $("question-media");
const questionImage = $("question-image");
const monitorBox = $("monitor");
const answersBox = $("answers");
const feedback = $("feedback");
const feedbackTitle = $("feedback-title");
const feedbackText = $("feedback-text");
const btnNext = $("btn-next");

// ---------- State ----------
let current = 0;
let score = 0;

// ---------- Screens ----------
function showScreen(name) {
  for (const key in screens) {
    screens[key].hidden = key !== name;
  }
  window.scrollTo(0, 0);
}

function startQuiz() {
  current = 0;
  score = 0;
  showScreen("quiz");
  renderQuestion();
}

function renderQuestion() {
  const q = QUESTIONS[current];

  progressLabel.textContent = `שאלה ${current + 1} מתוך ${QUESTIONS.length}`;
  progressFill.style.width = `${(current / QUESTIONS.length) * 100}%`;

  questionText.textContent = q.question;

  // Picture: live monitor, photo, or nothing
  const hasMonitor = !!q.monitor;
  const hasImage = !hasMonitor && !!q.image;
  questionMedia.hidden = !hasMonitor && !hasImage;
  monitorBox.hidden = !hasMonitor;
  questionImage.hidden = !hasImage;
  if (hasImage) questionImage.src = q.image;
  else questionImage.removeAttribute("src");
  if (hasMonitor) startMonitor(q.monitor);
  else stopMonitor();

  answersBox.innerHTML = "";
  q.answers.forEach((text, i) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "answer";
    btn.innerHTML = `<span class="answer-letter">${LETTERS[i]}</span><span class="answer-text" dir="auto"></span>`;
    btn.querySelector(".answer-text").textContent = text;
    btn.addEventListener("click", () => chooseAnswer(i, btn));
    answersBox.appendChild(btn);
  });

  feedback.hidden = true;
  feedback.className = "feedback";
  btnNext.hidden = true;

  // Replay the slide-in animation
  screens.quiz.classList.remove("enter");
  void screens.quiz.offsetWidth;
  screens.quiz.classList.add("enter");
}

function chooseAnswer(index, btn) {
  const q = QUESTIONS[current];
  const buttons = answersBox.querySelectorAll(".answer");
  const isCorrect = index === q.correct;

  buttons.forEach((b) => (b.disabled = true));
  buttons[q.correct].classList.add("is-correct");
  progressFill.style.width = `${((current + 1) / QUESTIONS.length) * 100}%`;

  if (isCorrect) {
    score++;
    feedback.classList.add("is-correct");
    feedbackTitle.textContent = "✓ נכון!";
    burst(btn);
    vibrate(30);
  } else {
    btn.classList.add("is-wrong");
    feedback.classList.add("is-wrong");
    feedbackTitle.textContent = "✗ לא נכון";
    vibrate([40, 60, 40]);
  }

  feedbackText.textContent = q.explanation;
  feedback.hidden = false;

  const isLast = current === QUESTIONS.length - 1;
  btnNext.textContent = isLast ? "לתוצאות" : "לשאלה הבאה";
  btnNext.hidden = false;
  btnNext.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

function nextQuestion() {
  current++;
  if (current < QUESTIONS.length) {
    renderQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  stopMonitor();
  showScreen("result");
  const total = QUESTIONS.length;
  const ratio = score / total;

  $("score-number").textContent = `${Math.round(ratio * 100)}%`;
  $("score-ring").style.setProperty("--score", ratio);

  let message;
  if (ratio === 1) message = "מושלם! ענית נכון על כל השאלות";
  else if (ratio >= 0.5) message = `כל הכבוד! ענית נכון על ${score} מתוך ${total}`;
  else message = `ענית נכון על ${score} מתוך ${total}. נסה שוב!`;
  $("score-text").textContent = message;

  if (ratio === 1) burst($("score-ring"), 40);
}

// ---------- Patient monitor ----------

const SWEEP_SECONDS = 4; // seconds of trace across the screen

const monitor = {
  canvas: $("monitor-canvas"),
  heart: $("monitor-heart"),
  cfg: null,
  raf: 0,
  x: 0, // current pen position (canvas px)
  y: 0,
  time: 0, // simulated seconds
  lastFrame: 0,
  carry: 0, // fraction of a pixel left over from the last frame
  beatStart: 0,
  beatLen: 1,
};

function startMonitor(cfg) {
  stopMonitor();
  const m = monitor;
  m.cfg = { rhythm: "sinus", ...cfg };

  $("monitor-hr").textContent = cfg.hr ?? "--";
  $("monitor-spo2").textContent = cfg.spo2 ?? "--";
  $("monitor-nibp").textContent = cfg.nibp ?? "--/--";

  // Match the canvas to its on-screen size for a sharp line
  const dpr = window.devicePixelRatio || 1;
  m.canvas.width = Math.round(m.canvas.clientWidth * dpr);
  m.canvas.height = Math.round(m.canvas.clientHeight * dpr);

  const ctx = m.canvas.getContext("2d");
  ctx.clearRect(0, 0, m.canvas.width, m.canvas.height);
  ctx.strokeStyle = "#3be37f";
  ctx.lineWidth = 2 * dpr;
  ctx.lineJoin = "round";
  ctx.shadowColor = "rgba(59, 227, 127, 0.6)";
  ctx.shadowBlur = 4 * dpr;

  m.x = 0;
  m.time = 0;
  m.beatStart = 0;
  m.beatLen = beatLength();
  m.vfPhases = Array.from({ length: 8 }, () => Math.random() * Math.PI * 2);
  m.y = toCanvasY(ecgSample(0));
  m.carry = 0;

  // The sweep always runs (even with "reduce motion") because the
  // moving trace is part of what the question is showing
  m.lastFrame = performance.now();
  m.raf = requestAnimationFrame(frame);
}

function stopMonitor() {
  cancelAnimationFrame(monitor.raf);
  monitor.raf = 0;
}

function frame(now) {
  const m = monitor;
  const pxPerSec = m.canvas.width / SWEEP_SECONDS;
  const elapsed = Math.min(Math.max(now - m.lastFrame, 0) / 1000, 0.1);
  m.lastFrame = now;

  // Keep the leftover fraction so slow sweeps / fast screens still move
  m.carry += elapsed * pxPerSec;
  const steps = Math.floor(m.carry);
  m.carry -= steps;
  if (steps > 0) drawTrace(steps, 14 * (window.devicePixelRatio || 1));
  m.raf = requestAnimationFrame(frame);
}

// Advance the pen `steps` pixels, erasing a small gap ahead of it
function drawTrace(steps, gap) {
  const m = monitor;
  const ctx = m.canvas.getContext("2d");
  const w = m.canvas.width;
  const dt = SWEEP_SECONDS / w;

  ctx.clearRect(m.x, 0, steps + gap, m.canvas.height);
  if (m.x + steps + gap > w) ctx.clearRect(0, 0, m.x + steps + gap - w, m.canvas.height);

  // Several samples per pixel so narrow spikes (the R wave) are never
  // skipped over — otherwise beats come out at different heights
  const SUB = 8;

  ctx.beginPath();
  ctx.moveTo(m.x, m.y);
  for (let i = 0; i < steps; i++) {
    for (let j = 1; j < SUB; j++) {
      ctx.lineTo(m.x + j / SUB, toCanvasY(ecgSample(m.time + (dt * j) / SUB)));
    }
    m.time += dt;
    m.x += 1;
    m.y = toCanvasY(ecgSample(m.time));
    if (m.x >= w) {
      ctx.stroke();
      ctx.beginPath();
      m.x = 0;
      ctx.moveTo(m.x, m.y);
    } else {
      ctx.lineTo(m.x, m.y);
    }
  }
  ctx.stroke();
}

function toCanvasY(v) {
  const h = monitor.canvas.height;
  return h * 0.55 - v * h * 0.38;
}

function beatLength() {
  const fallback = monitor.cfg.rhythm === "torsades" ? 230 : 75;
  return 60 / (monitor.cfg.hr || fallback);
}

function gauss(t, center, width, amp) {
  return amp * Math.exp(-((t - center) ** 2) / (2 * width * width));
}

// ECG value (about -1..1) at simulated time T seconds
function ecgSample(T) {
  const m = monitor;
  const rhythm = m.cfg.rhythm;
  const TWO_PI = Math.PI * 2;

  if (rhythm === "vf") {
    // Several waves whose speeds drift, with random starting phases and an
    // amplitude that swells and fades, so the pattern never repeats
    const ph = m.vfPhases;
    const wobble = (freq, drift, driftSpeed, p1, p2) =>
      Math.sin(TWO_PI * (freq * T + drift * Math.sin(TWO_PI * driftSpeed * T + p1)) + p2);

    const waves =
      0.35 * wobble(4.3, 0.6, 0.23, ph[0], ph[1]) +
      0.28 * wobble(5.9, 0.5, 0.31, ph[2], ph[3]) +
      0.2 * wobble(7.7, 0.4, 0.17, ph[4], ph[5]) +
      0.15 * Math.sin(TWO_PI * 3.1 * T + ph[6]) +
      0.08 * Math.sin(TWO_PI * 11.3 * T + ph[7]);
    const amplitude =
      0.6 + 0.25 * Math.sin(TWO_PI * 0.27 * T + ph[0]) + 0.15 * Math.sin(TWO_PI * 0.61 * T + ph[3]);
    const wander = 0.08 * Math.sin(TWO_PI * 0.4 * T + ph[5]);
    return 1.25 * waves * amplitude + wander;
  }
  if (rhythm === "asystole") {
    return 0.015 * Math.sin(TWO_PI * 0.4 * T);
  }

  // Beat-based rhythms
  while (T >= m.beatStart + m.beatLen) {
    m.beatStart += m.beatLen;
    m.beatLen = beatLength();
    pulseHeart();
  }
  const t = T - m.beatStart;

  if (rhythm === "vt") {
    const p = t / m.beatLen;
    return 0.85 * Math.sin(TWO_PI * p) + 0.25 * Math.sin(2 * TWO_PI * p);
  }

  if (rhythm === "torsades") {
    // Polymorphic VT: complexes grow, shrink and flip polarity
    // ("twisting of the points") every ~2.5 seconds
    const p = t / m.beatLen;
    const twist = Math.cos((Math.PI * T) / 2.5);
    const envelope = Math.sign(twist) * (0.15 + 0.85 * Math.abs(twist));
    return envelope * (0.9 * Math.sin(TWO_PI * p) + 0.2 * Math.sin(2 * TWO_PI * p));
  }

  // Sinus: P wave, narrow QRS, T wave — squeezed a bit at fast rates
  const k = Math.min(1, m.beatLen / 0.6);
  return (
    gauss(t, 0.08 * k, 0.02 * k, 0.12) +
    gauss(t, 0.16 * k, 0.006, -0.12) +
    gauss(t, 0.18 * k, 0.009, 1) +
    gauss(t, 0.2 * k, 0.008, -0.25) +
    gauss(t, 0.4 * k, 0.045 * k, 0.25)
  );
}

function pulseHeart() {
  const heart = monitor.heart;
  heart.classList.remove("beat");
  void heart.offsetWidth;
  heart.classList.add("beat");
}

// Redraw at the new size when the phone rotates
window.addEventListener("resize", () => {
  if (monitor.raf) {
    startMonitor(monitor.cfg);
  }
});

// ---------- Effects ----------

// Little confetti burst from the center of an element
function burst(el, count = 18) {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const rect = el.getBoundingClientRect();
  const x = rect.left + rect.width / 2;
  const y = rect.top + rect.height / 2;
  const colors = ["#2fd67b", "#a6f5c8", "#ffffff", "#ff8a5c", "#ffd166"];

  for (let i = 0; i < count; i++) {
    const p = document.createElement("span");
    p.className = "confetti";
    const angle = Math.random() * Math.PI * 2;
    const distance = 50 + Math.random() * 90;
    p.style.left = `${x}px`;
    p.style.top = `${y}px`;
    p.style.background = colors[i % colors.length];
    p.style.setProperty("--dx", `${Math.cos(angle) * distance}px`);
    p.style.setProperty("--dy", `${Math.sin(angle) * distance}px`);
    p.style.setProperty("--rot", `${Math.random() * 720 - 360}deg`);
    document.body.appendChild(p);
    p.addEventListener("animationend", () => p.remove());
  }
}

function vibrate(pattern) {
  if (navigator.vibrate) navigator.vibrate(pattern);
}

// ---------- Wire up ----------
$("year").textContent = new Date().getFullYear();
$("btn-begin").addEventListener("click", startQuiz);
$("btn-restart").addEventListener("click", startQuiz);
btnNext.addEventListener("click", nextQuestion);
