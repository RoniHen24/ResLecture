// =========================================================
// Quiz questions — edit these.
//   question:    the question text
//   answers:     the answer options (any number, 4 recommended)
//   correct:     index of the correct answer (0 = first)
//   explanation: shown after answering
//   image:       optional photo shown above the answers
//                  ""                  -> shows a placeholder box
//                  "images/q1.jpg"     -> shows that photo
//                  (remove the line)   -> no image for that question
// =========================================================
const QUESTIONS = [
  {
    question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit?",
    image: "",
    answers: [
      "Lorem ipsum dolor",
      "Sit amet consectetur",
      "Adipiscing elit sed",
      "Do eiusmod tempor",
    ],
    correct: 0,
    explanation: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.",
  },
  {
    question: "Ut enim ad minim veniam, quis nostrud exercitation?",
    image: "",
    answers: [
      "Ullamco laboris",
      "Nisi ut aliquip",
      "Ex ea commodo",
      "Consequat duis aute",
    ],
    correct: 2,
    explanation: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi.",
  },
  {
    question: "Duis aute irure dolor in reprehenderit in voluptate?",
    image: "",
    answers: [
      "Velit esse cillum",
      "Dolore eu fugiat",
      "Nulla pariatur",
      "Excepteur sint",
    ],
    correct: 1,
    explanation: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.",
  },
  {
    question: "Excepteur sint occaecat cupidatat non proident?",
    image: "",
    answers: [
      "Sunt in culpa",
      "Qui officia deserunt",
      "Mollit anim",
      "Id est laborum",
    ],
    correct: 3,
    explanation: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia.",
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
const questionPlaceholder = $("question-placeholder");
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

  // Image: photo, placeholder, or nothing
  questionMedia.hidden = !("image" in q);
  questionImage.hidden = !q.image;
  questionPlaceholder.hidden = !!q.image;
  if (q.image) questionImage.src = q.image;
  else questionImage.removeAttribute("src");

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
  showScreen("result");
  const total = QUESTIONS.length;
  const ratio = score / total;

  $("score-number").textContent = `${score}/${total}`;
  $("score-ring").style.setProperty("--score", ratio);

  let message;
  if (ratio === 1) message = "מושלם! ענית נכון על כל השאלות";
  else if (ratio >= 0.5) message = `כל הכבוד! ענית נכון על ${score} מתוך ${total}`;
  else message = `ענית נכון על ${score} מתוך ${total}. נסה שוב!`;
  $("score-text").textContent = message;

  if (ratio === 1) burst($("score-ring"), 40);
}

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
