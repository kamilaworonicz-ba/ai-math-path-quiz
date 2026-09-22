const questions = [
  {
    id: "attitude",
    kicker: "About you",
    title: "Do you like mathematics?",
    help: "Choose the answer that feels most honest today.",
    type: "single",
    options: [
      ["love", "I love it"],
      ["understand", "I like it when I understand it"],
      ["neutral", "I'm neutral about it"],
      ["intimidated", "Math has always intimidated me"],
      ["avoid", "I actively avoid it"]
    ]
  },
  {
    id: "context",
    kicker: "Your everyday life",
    title: "Where does math show up in your life most often?",
    help: "Think beyond equations — money, data, games, and homework all count.",
    type: "single",
    options: [
      ["work", "At work"],
      ["finance", "Personal finances"],
      ["kids", "Helping my kids"],
      ["news", "News and statistics"],
      ["hobbies", "Hobbies and games"],
      ["nowhere", "Almost nowhere"]
    ]
  },
  {
    id: "workUse",
    kicker: "Your work",
    title: "How often do you use math at work?",
    help: "There is no better answer — this simply helps us understand your context.",
    type: "single",
    options: [
      ["never", "Never or not applicable"],
      ["rarely", "Rarely"],
      ["sometimes", "Sometimes for everyday tasks"],
      ["spreadsheets", "Regularly — spreadsheets, percentages, or budgets"],
      ["data", "Frequently — statistics, analysis, or data"]
    ]
  },
  {
    id: "goals",
    kicker: "What matters to you",
    title: "What would you like to get out of a math course?",
    help: "Choose up to two goals.",
    type: "multi",
    max: 2,
    options: [
      ["rediscover", "Rediscover math — and maybe start enjoying it"],
      ["everyday", "Use math more confidently in everyday life"],
      ["statistics", "Understand statistics"],
      ["news", "Make better sense of numbers in the news"],
      ["fun", "Have fun and challenge my brain"],
      ["parent", "Help my child with math"]
    ]
  },
  {
    id: "pattern",
    kicker: "Quick challenge · Patterns",
    title: "How many dots will the fourth figure contain?",
    help: "Go with the pattern you see — no calculation is required.",
    type: "single",
    puzzle: "dots",
    correct: "10",
    options: [["8", "8"], ["9", "9"], ["10", "10"], ["12", "12"]]
  },
  {
    id: "logic",
    kicker: "Quick challenge · Logic",
    title: "Exactly one person is telling the truth. Who is it?",
    help: "Test each statement against the other two.",
    type: "single",
    puzzle: "logic",
    correct: "blake",
    options: [["alex", "Alex"], ["blake", "Blake"], ["casey", "Casey"], ["unclear", "It can't be determined"]]
  },
  {
    id: "spatial",
    kicker: "Quick challenge · Visual intuition",
    title: "How many full turns does the moving coin make?",
    help: "Two identical coins touch. One rolls all the way around the other without slipping.",
    type: "single",
    puzzle: "coin",
    correct: "2",
    options: [["1", "1 turn"], ["1.5", "1½ turns"], ["2", "2 turns"], ["3", "3 turns"]]
  }
];

const paths = {
  curious: {
    name: "The Curious Explorer",
    badge: "?",
    description: "You are drawn to surprising ideas, patterns, and problems that reward a second look. Math is most appealing when it feels like discovery rather than a lesson.",
    recommendations: [
      ["🎥", "5-minute video", "The Math Behind Coincidences"],
      ["🧩", "Interactive challenge", "Can You Outsmart Probability?"],
      ["📖", "Article", "Why Randomness Isn't as Random as It Seems"]
    ]
  },
  practical: {
    name: "The Practical Thinker",
    badge: "%",
    description: "You like math best when it earns its place in real life. Useful shortcuts, clearer choices, and everyday confidence matter more to you than abstract theory.",
    recommendations: [
      ["🎥", "5-minute video", "The Math You Actually Use Every Day"],
      ["🧩", "Interactive challenge", "Which Deal Is Really Better?"],
      ["📖", "Article", "Percentages, Interest and Discounts Without the Headache"]
    ]
  },
  data: {
    name: "The Data Decoder",
    badge: "↗",
    description: "You want numbers to make the world clearer. Charts, claims, and statistics interest you most when they help you question information and reach better conclusions.",
    recommendations: [
      ["🎥", "5-minute video", "How Charts Can Change the Story"],
      ["🧩", "Interactive challenge", "Can You Spot the Misleading Statistic?"],
      ["📖", "Article", "5 Statistics Tricks That Can Mislead You in the News"]
    ]
  },
  parent: {
    name: "The Math Parent",
    badge: "½",
    description: "You want to make math feel more understandable for someone else as well as yourself. Clear explanations and visual ways of thinking are likely to serve you best.",
    recommendations: [
      ["🎥", "5-minute video", "How to Explain Fractions Without Memorizing Rules"],
      ["🧩", "Interactive challenge", "Can You Solve It the Way Your Child Would?"],
      ["📖", "Article", "5 Ways to Help With Math Without Giving Away the Answer"]
    ]
  },
  confidence: {
    name: "The Confidence Builder",
    badge: "+",
    description: "You do not need more pressure — you need a different way in. Friendly, visual, low-stakes ideas can help replace old assumptions with genuine confidence.",
    recommendations: [
      ["🎥", "5-minute video", "You're Better at Math Than You Think"],
      ["🧩", "Interactive challenge", "Three Puzzles That Need Almost No Calculation"],
      ["📖", "Article", "Why Being ‘Bad at Math’ Is Often About How You Learned It"]
    ]
  }
};

const state = { step: 0, answers: {} };

const startScreen = document.querySelector("#start-screen");
const quizScreen = document.querySelector("#quiz-screen");
const resultScreen = document.querySelector("#result-screen");
const questionTitle = document.querySelector("#question-title");
const questionKicker = document.querySelector("#question-kicker");
const questionHelp = document.querySelector("#question-help");
const puzzleStage = document.querySelector("#puzzle-stage");
const answersEl = document.querySelector("#answers");
const selectionNote = document.querySelector("#selection-note");
const nextButton = document.querySelector("#next-button");
const backButton = document.querySelector("#back-button");

function showScreen(screen) {
  [startScreen, quizScreen, resultScreen].forEach((item) => item.classList.remove("is-active"));
  screen.classList.add("is-active");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function puzzleMarkup(kind) {
  if (kind === "dots") {
    return `
      <div class="dot-sequence" aria-label="A sequence containing one dot, three dots, six dots, then an unknown number">
        <div class="dot-figure"><div class="dot-stack one"><i class="dot"></i></div><span>1</span></div>
        <div class="dot-figure"><div class="dot-stack two"><i class="dot"></i><i class="dot"></i><i class="dot"></i></div><span>2</span></div>
        <div class="dot-figure"><div class="dot-stack three"><i class="dot"></i><i class="dot"></i><i class="dot"></i><i class="dot"></i><i class="dot"></i><i class="dot"></i></div><span>3</span></div>
        <div class="dot-figure"><div class="dot-question">?</div><span>4</span></div>
      </div>`;
  }

  if (kind === "logic") {
    return `
      <div class="logic-board">
        <div class="statement"><strong>Alex:</strong> “Blake is lying.”</div>
        <div class="statement"><strong>Blake:</strong> “Casey is lying.”</div>
        <div class="statement"><strong>Casey:</strong> “Alex and Blake are both telling the truth.”</div>
        <p class="logic-rule">Exactly one of these three statements is true.</p>
      </div>`;
  }

  if (kind === "coin") {
    return `
      <div class="coin-board">
        <svg viewBox="0 0 520 210" role="img" aria-label="One coin rolling around an identical stationary coin">
          <defs>
            <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="8" refY="3.5" orient="auto"><polygon points="0 0, 10 3.5, 0 7" fill="#ff6b52" /></marker>
          </defs>
          <circle cx="260" cy="120" r="64" fill="#dce3ff" stroke="#1738e8" stroke-width="4" />
          <circle cx="260" cy="120" r="39" fill="none" stroke="#8998de" stroke-width="2" stroke-dasharray="6 7" />
          <text x="260" y="126" text-anchor="middle" fill="#1738e8" font-weight="800" font-size="17">fixed</text>
          <circle cx="260" cy="-8" r="64" fill="#dfff54" stroke="#10152f" stroke-width="4" />
          <line x1="260" y1="-8" x2="260" y2="45" stroke="#10152f" stroke-width="4" stroke-linecap="round" />
          <circle cx="260" cy="-8" r="7" fill="#10152f" />
          <path d="M 345 38 A 125 125 0 0 1 405 135" fill="none" stroke="#ff6b52" stroke-width="5" stroke-linecap="round" marker-end="url(#arrowhead)" />
          <text x="420" y="58" fill="#626986" font-size="15" font-weight="700">rolls around</text>
        </svg>
      </div>`;
  }
  return "";
}

function renderQuestion() {
  const question = questions[state.step];
  const progress = Math.round(((state.step + 1) / questions.length) * 100);
  document.querySelector("#progress-label").textContent = `Question ${state.step + 1} of ${questions.length}`;
  document.querySelector("#progress-percent").textContent = `${progress}%`;
  document.querySelector("#progress-bar").style.width = `${progress}%`;
  questionKicker.textContent = question.kicker;
  questionTitle.textContent = question.title;
  questionHelp.textContent = question.help;
  puzzleStage.innerHTML = question.puzzle ? puzzleMarkup(question.puzzle) : "";
  answersEl.innerHTML = "";
  answersEl.className = `answers ${question.options.length > 4 ? "single-column" : ""}`;
  selectionNote.textContent = question.type === "multi" ? "Choose one or two options." : "";

  question.options.forEach(([value, label]) => {
    const selected = question.type === "multi"
      ? (state.answers[question.id] || []).includes(value)
      : state.answers[question.id] === value;
    const button = document.createElement("button");
    button.type = "button";
    button.className = `answer-option ${question.type === "multi" ? "is-multi" : ""} ${selected ? "is-selected" : ""}`;
    button.setAttribute("aria-pressed", selected ? "true" : "false");
    button.dataset.value = value;
    button.innerHTML = `<span class="option-marker" aria-hidden="true"></span><span>${label}</span>`;
    button.addEventListener("click", () => selectAnswer(question, value));
    answersEl.appendChild(button);
  });

  backButton.style.visibility = state.step === 0 ? "hidden" : "visible";
  nextButton.innerHTML = state.step === questions.length - 1
    ? `See my result <span aria-hidden="true">→</span>`
    : `Continue <span aria-hidden="true">→</span>`;
  updateNextState(question);
  questionTitle.focus?.();
}

function selectAnswer(question, value) {
  if (question.type === "multi") {
    const current = [...(state.answers[question.id] || [])];
    const index = current.indexOf(value);
    if (index >= 0) {
      current.splice(index, 1);
    } else if (current.length < question.max) {
      current.push(value);
    } else {
      selectionNote.textContent = "You can choose up to two goals. Deselect one to change your answer.";
      selectionNote.style.color = "#9e1a0b";
      return;
    }
    state.answers[question.id] = current;
  } else {
    state.answers[question.id] = value;
  }
  selectionNote.style.color = "";
  renderQuestion();
}

function updateNextState(question) {
  const answer = state.answers[question.id];
  nextButton.disabled = question.type === "multi" ? !answer || answer.length === 0 : !answer;
}

function add(scores, path, points) { scores[path] += points; }

function calculatePath() {
  const scores = { curious: 0, practical: 0, data: 0, parent: 0, confidence: 0 };
  const a = state.answers;

  ({
    love: () => { add(scores, "curious", 4); add(scores, "data", 1); },
    understand: () => { add(scores, "practical", 2); add(scores, "confidence", 1); },
    neutral: () => add(scores, "practical", 1),
    intimidated: () => add(scores, "confidence", 5),
    avoid: () => add(scores, "confidence", 6)
  }[a.attitude] || (() => {}))();

  ({
    work: () => { add(scores, "practical", 4); add(scores, "data", 1); },
    finance: () => add(scores, "practical", 5),
    kids: () => add(scores, "parent", 7),
    news: () => add(scores, "data", 6),
    hobbies: () => add(scores, "curious", 5),
    nowhere: () => { add(scores, "confidence", 2); add(scores, "curious", 1); }
  }[a.context] || (() => {}))();

  ({
    never: () => add(scores, "confidence", 1),
    rarely: () => add(scores, "practical", 1),
    sometimes: () => add(scores, "practical", 2),
    spreadsheets: () => { add(scores, "practical", 4); add(scores, "data", 1); },
    data: () => add(scores, "data", 6)
  }[a.workUse] || (() => {}))();

  (a.goals || []).forEach((goal) => {
    ({
      rediscover: () => add(scores, "confidence", 7),
      everyday: () => add(scores, "practical", 7),
      statistics: () => add(scores, "data", 7),
      news: () => add(scores, "data", 6),
      fun: () => add(scores, "curious", 7),
      parent: () => add(scores, "parent", 8)
    }[goal] || (() => {}))();
  });

  const priority = ["parent", "confidence", "data", "practical", "curious"];
  return priority.reduce((best, key) => scores[key] > scores[best] ? key : best, priority[0]);
}

function challengeProfile() {
  const correct = {
    pattern: state.answers.pattern === "10",
    logic: state.answers.logic === "blake",
    spatial: state.answers.spatial === "2"
  };
  const total = Object.values(correct).filter(Boolean).length;
  let summary;

  if (total === 3) summary = "You move comfortably between patterns, logic, and visual intuition — without needing calculation-heavy tasks.";
  else if (correct.pattern && correct.logic) summary = "You seem to enjoy logic and pattern-based challenges more than calculation-heavy tasks.";
  else if (correct.pattern && correct.spatial) summary = "You quickly notice visual patterns and are willing to question your first instinct.";
  else if (correct.logic && correct.spatial) summary = "Rule-based reasoning and visual puzzles appear to bring out your strongest thinking.";
  else if (correct.pattern) summary = "Growing patterns catch your eye quickly — a useful instinct for exploring mathematical ideas.";
  else if (correct.logic) summary = "You appear most at home when a problem rewards careful, rule-based reasoning.";
  else if (correct.spatial) summary = "Your visual intuition stands out, especially when a problem asks you to picture movement.";
  else summary = "These puzzles were designed to challenge first instincts — your path reflects what you want from math, not a test score.";

  return { correct, summary };
}

function renderResult() {
  const pathKey = calculatePath();
  const path = paths[pathKey];
  const profile = challengeProfile();
  document.querySelector("#thinking-summary").textContent = profile.summary;
  document.querySelector("#path-name").textContent = path.name;
  document.querySelector("#path-description").textContent = path.description;
  document.querySelector("#result-badge").textContent = path.badge;

  const chipLabels = [
    ["pattern", "Pattern spotting"],
    ["logic", "Logical reasoning"],
    ["spatial", "Visual intuition"]
  ];
  document.querySelector("#skill-chips").innerHTML = chipLabels.map(([key, label]) =>
    `<span class="skill-chip ${profile.correct[key] ? "is-strong" : ""}">${label}${profile.correct[key] ? " · strong signal" : ""}</span>`
  ).join("");

  document.querySelector("#recommendations").innerHTML = path.recommendations.map(([icon, type, title]) => `
    <article class="recommendation-card">
      <div class="rec-icon" aria-hidden="true">${icon}</div>
      <p class="rec-type">${type}</p>
      <h4 class="rec-title">${title}</h4>
    </article>`).join("");

  showScreen(resultScreen);
}

document.querySelector("#start-button").addEventListener("click", () => {
  state.step = 0;
  showScreen(quizScreen);
  renderQuestion();
});

nextButton.addEventListener("click", () => {
  if (nextButton.disabled) return;
  if (state.step < questions.length - 1) {
    state.step += 1;
    renderQuestion();
  } else {
    renderResult();
  }
});

backButton.addEventListener("click", () => {
  if (state.step > 0) {
    state.step -= 1;
    renderQuestion();
  }
});

document.querySelector("#restart-button").addEventListener("click", () => {
  state.step = 0;
  state.answers = {};
  document.querySelector("#email-form").reset();
  document.querySelector("#form-message").className = "form-message";
  document.querySelector("#form-message").textContent = "Portfolio prototype — your email will not be stored or sent.";
  showScreen(startScreen);
});

document.querySelector("#brand-link").addEventListener("click", (event) => {
  event.preventDefault();
  showScreen(startScreen);
});

document.querySelector("#email-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const input = document.querySelector("#email");
  const message = document.querySelector("#form-message");
  if (!input.validity.valid) {
    message.className = "form-message is-error";
    message.textContent = "Enter a valid email address to preview the confirmation state.";
    input.focus();
    return;
  }
  message.className = "form-message is-success";
  message.textContent = "You're on the list — in a live product, your first tailored idea would arrive soon. No data was stored.";
  input.value = "";
});
