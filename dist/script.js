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
    id: "reasoning",
    kicker: "Quick challenge · Evidence",
    title: "Which parts of the bombers should be reinforced?",
    help: "During World War II, Allied analysts mapped damage on bombers that returned from missions.",
    answerPrompt: "Which parts of the bombers should be reinforced?",
    type: "single",
    puzzle: "survivorship",
    correct: "vital",
    options: [
      ["visible", "Wings and fuselage — they show the most hits"],
      ["vital", "Engines and cockpit — they show the fewest hits"],
      ["unclear", "There is not enough information"]
    ]
  },
  {
    id: "spatial",
    kicker: "Quick challenge · Visual intuition",
    title: "How many times does the moving coin rotate during one full orbit?",
    help: "Assume it rolls without slipping.",
    answerPrompt: "How many times does the moving coin rotate during one full orbit?",
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
const US_DOLLAR_COIN_OBVERSE_IMAGE = "https://www.usmint.gov/learn/coins-and-medals/circulating-coins/susan-b-anthony-dollar/_jcr_content/root/container_1426747781/imagegallerypdp/image.coreimg.jpeg/1757100978937/1999-susan-b-anthony-dollar-obverse.jpeg";
const US_DOLLAR_COIN_REVERSE_IMAGE = "https://www.usmint.gov/learn/coins-and-medals/circulating-coins/susan-b-anthony-dollar/_jcr_content/root/container_1426747781/imagegallerypdp/item_1742502596121.coreimg.jpeg/1757101006286/1999-susan-b-anthony-dollar-reverse.jpeg";
const US_DOLLAR_COIN_SOURCE = "https://www.usmint.gov/learn/coins-and-medals/circulating-coins/susan-b-anthony-dollar";

const startScreen = document.querySelector("#start-screen");
const quizScreen = document.querySelector("#quiz-screen");
const resultScreen = document.querySelector("#result-screen");
const questionTitle = document.querySelector("#question-title");
const questionKicker = document.querySelector("#question-kicker");
const questionHelp = document.querySelector("#question-help");
const puzzleStage = document.querySelector("#puzzle-stage");
const answerPrompt = document.querySelector("#answer-prompt");
const answersEl = document.querySelector("#answers");
const selectionNote = document.querySelector("#selection-note");
const nextButton = document.querySelector("#next-button");
const backButton = document.querySelector("#back-button");
const feedbackDialog = document.querySelector("#feedback-dialog");
const feedbackTitle = document.querySelector("#feedback-title");
const feedbackVisual = document.querySelector("#feedback-visual");
const feedbackExplanation = document.querySelector("#feedback-explanation");
const feedbackNext = document.querySelector("#feedback-next");
let coinAnimationFrame = null;

function showScreen(screen) {
  [startScreen, quizScreen, resultScreen].forEach((item) => item.classList.remove("is-active"));
  screen.classList.add("is-active");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function coinImageMarkup(radius, clipId, imageUrl) {
  const diameter = radius * 2;
  return `
    <circle cx="0" cy="0" r="${radius}" fill="#d9dce4" />
    <image href="${imageUrl}" x="-${radius}" y="-${radius}" width="${diameter}" height="${diameter}" preserveAspectRatio="xMidYMid slice" clip-path="url(#${clipId})" />`;
}

function coinCreditMarkup() {
  return `<p class="coin-credit"><a href="${US_DOLLAR_COIN_SOURCE}" target="_blank" rel="noreferrer">United States Mint image</a></p>`;
}

function puzzleMarkup(kind) {
  if (kind === "dots") {
    return `
      <div class="dot-sequence" aria-label="A sequence containing one dot, three dots, six dots, then an unknown number">
        <div class="dot-figure">
          <div class="dot-stack"><span class="dot-row"><i class="dot"></i></span></div><span>1</span>
        </div>
        <div class="dot-figure">
          <div class="dot-stack"><span class="dot-row"><i class="dot"></i></span><span class="dot-row"><i class="dot"></i><i class="dot"></i></span></div><span>2</span>
        </div>
        <div class="dot-figure">
          <div class="dot-stack"><span class="dot-row"><i class="dot"></i></span><span class="dot-row"><i class="dot"></i><i class="dot"></i></span><span class="dot-row"><i class="dot"></i><i class="dot"></i><i class="dot"></i></span></div><span>3</span>
        </div>
        <div class="dot-figure"><div class="dot-question">?</div><span>4</span></div>
      </div>`;
  }

  if (kind === "survivorship") {
    return `
      <div class="survivorship-board" aria-label="Returned planes show many hits on the wings and fuselage, but few on the engines and cockpit">
        <p class="damage-heading">Damage recorded on returning bombers</p>
        <div class="damage-comparison">
          <div class="damage-zone is-heavy">
            <strong>Wings + fuselage</strong>
            <span class="hit-field" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></span>
            <small>Many hits</small>
          </div>
          <div class="damage-zone is-light">
            <strong>Engines + cockpit</strong>
            <span class="hit-field" aria-hidden="true"><i></i><i></i></span>
            <small>Few hits</small>
          </div>
        </div>
      </div>`;
  }

  if (kind === "coin") {
    return `
      <div class="coin-board">
        <svg viewBox="0 0 560 245" role="img" aria-label="A moving United States dollar coin positioned to the left of an identical stationary coin">
          <defs>
            <marker id="arrowhead" markerWidth="6" markerHeight="5" refX="5.2" refY="2.5" orient="auto"><polygon points="0 0, 6 2.5, 0 5" fill="#59617a" /></marker>
            <clipPath id="question-moving-coin" clipPathUnits="userSpaceOnUse"><circle cx="0" cy="0" r="60" /></clipPath>
            <clipPath id="question-fixed-coin" clipPathUnits="userSpaceOnUse"><circle cx="0" cy="0" r="60" /></clipPath>
          </defs>
          <circle cx="325" cy="120" r="120" fill="none" stroke="#aab5dc" stroke-width="3" stroke-dasharray="7 9" />
          <path d="M 205 120 A 120 120 0 0 0 265 224" fill="none" stroke="#59617a" stroke-width="3" stroke-linecap="round" marker-end="url(#arrowhead)" />
          <g transform="translate(205 120)">${coinImageMarkup(60, "question-moving-coin", US_DOLLAR_COIN_OBVERSE_IMAGE)}</g>
          <g transform="translate(325 120)">${coinImageMarkup(60, "question-fixed-coin", US_DOLLAR_COIN_REVERSE_IMAGE)}</g>
          <text x="205" y="204" text-anchor="middle" fill="#9e3c2d" font-weight="850" font-size="15">moving coin</text>
          <text x="325" y="204" text-anchor="middle" fill="#1738e8" font-weight="850" font-size="15">fixed coin</text>
        </svg>
        ${coinCreditMarkup()}
      </div>`;
  }
  return "";
}

function renderQuestion() {
  const question = questions[state.step];
  const progress = Math.round(((state.step + 1) / questions.length) * 100);
  document.querySelector("#progress-label").textContent = `Question ${state.step + 1} of ${questions.length}`;
  document.querySelector("#progress-bar").style.width = `${progress}%`;
  questionKicker.textContent = question.kicker;
  questionTitle.textContent = question.title;
  questionHelp.textContent = question.help;
  puzzleStage.innerHTML = question.puzzle ? puzzleMarkup(question.puzzle) : "";
  answerPrompt.textContent = question.answerPrompt || "";
  answersEl.innerHTML = "";
  answersEl.className = `answers ${question.options.length > 4 || question.id === "reasoning" ? "single-column" : ""}`;
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

function feedbackMarkup(kind) {
  if (kind === "dots") {
    return `
      <div class="feedback-pattern" aria-label="The sequence is 1, 3, 6, 10 dots">
        <span>1</span><i>+2</i><span>3</span><i>+3</i><span>6</span><i>+4</i><span class="highlight">10</span>
      </div>`;
  }

  if (kind === "survivorship") {
    return `
      <div class="feedback-survivorship" aria-label="Returned aircraft reveal survivable damage, while missing aircraft reveal the vulnerable areas">
        <div class="evidence-card">
          <span>What we can see</span>
          <b>Returned aircraft</b>
          <p>Many had hits on their wings and fuselage — and still made it home.</p>
        </div>
        <div class="evidence-card is-missing">
          <span>What is missing</span>
          <b>Aircraft that did not return</b>
          <p>Hits to engines or the cockpit were more likely to prevent a safe return.</p>
        </div>
      </div>`;
  }

  const reducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  if (reducedMotion) {
    return `
      <div class="feedback-coin" aria-label="One orbit around the fixed coin produces two full turns">
        <svg viewBox="0 0 620 300" role="img" aria-label="A moving United States dollar coin starts to the left of a fixed coin; one orbit produces two full turns">
          <defs>
            <marker id="feedback-arrow-static" markerWidth="6" markerHeight="5" refX="5.2" refY="2.5" orient="auto"><polygon points="0 0, 6 2.5, 0 5" fill="#59617a" /></marker>
            <clipPath id="feedback-static-moving" clipPathUnits="userSpaceOnUse"><circle cx="0" cy="0" r="52" /></clipPath>
            <clipPath id="feedback-static-fixed" clipPathUnits="userSpaceOnUse"><circle cx="0" cy="0" r="52" /></clipPath>
          </defs>
          <circle cx="250" cy="145" r="104" fill="none" stroke="#aab5dc" stroke-width="3" stroke-dasharray="7 9" />
          <path d="M 146 145 A 104 104 0 0 1 250 41" fill="none" stroke="#59617a" stroke-width="3" stroke-linecap="round" marker-end="url(#feedback-arrow-static)" />
          <g transform="translate(146 145)">${coinImageMarkup(52, "feedback-static-moving", US_DOLLAR_COIN_OBVERSE_IMAGE)}<line x1="0" y1="0" x2="0" y2="-39" stroke="#10152f" stroke-width="5" stroke-linecap="round" /><circle cx="0" cy="-39" r="7" fill="#ff6b52" /></g>
          <g transform="translate(250 145)">${coinImageMarkup(52, "feedback-static-fixed", US_DOLLAR_COIN_REVERSE_IMAGE)}</g>
          <text x="476" y="125" text-anchor="middle" fill="#10152f" font-weight="900" font-size="24">One full orbit</text>
          <text x="476" y="162" text-anchor="middle" fill="#1738e8" font-weight="900" font-size="24">= two turns</text>
          <text x="476" y="192" text-anchor="middle" fill="#59617a" font-weight="700" font-size="14">Follow the orange marker</text>
        </svg>
        ${coinCreditMarkup()}
      </div>`;
  }

  return `
    <div class="feedback-coin" aria-label="Animation: the moving coin completes two full rotations during one orbit">
      <svg viewBox="0 0 620 300" role="img" aria-label="A moving United States dollar coin starts to the left of a fixed coin and rotates twice during one complete orbit.">
        <defs>
          <clipPath id="feedback-moving-coin" clipPathUnits="userSpaceOnUse"><circle cx="0" cy="0" r="52" /></clipPath>
          <clipPath id="feedback-fixed-coin" clipPathUnits="userSpaceOnUse"><circle cx="0" cy="0" r="52" /></clipPath>
        </defs>
        <circle cx="250" cy="150" r="104" fill="none" stroke="#aab5dc" stroke-width="3" stroke-dasharray="7 9" />
        <g transform="translate(250 150)">${coinImageMarkup(52, "feedback-fixed-coin", US_DOLLAR_COIN_REVERSE_IMAGE)}</g>

        <g transform="translate(250 150)">
          <g class="coin-orbit" transform="rotate(0)">
            <g transform="translate(-104 0)">
              <g class="coin-spin" transform="rotate(0)">
                ${coinImageMarkup(52, "feedback-moving-coin", US_DOLLAR_COIN_OBVERSE_IMAGE)}
                <line x1="0" y1="0" x2="0" y2="-39" stroke="#10152f" stroke-width="5" stroke-linecap="round" />
                <circle cx="0" cy="-39" r="7" fill="#ff6b52" />
              </g>
            </g>
          </g>
        </g>

        <text x="486" y="122" text-anchor="middle" fill="#10152f" font-weight="900" font-size="24">Watch the marker</text>
        <text x="486" y="160" text-anchor="middle" fill="#1738e8" font-weight="900" font-size="24">One orbit = two turns</text>
      </svg>
      ${coinCreditMarkup()}
    </div>`;
}

function stopCoinAnimation() {
  if (coinAnimationFrame !== null) cancelAnimationFrame(coinAnimationFrame);
  coinAnimationFrame = null;
}

function startCoinAnimation() {
  stopCoinAnimation();
  const orbit = feedbackVisual.querySelector(".coin-orbit");
  const spin = feedbackVisual.querySelector(".coin-spin");
  if (!orbit || !spin) return;

  const startAt = performance.now() + 500;
  const orbitDuration = 5500;

  function animateCoin(now) {
    if (!feedbackDialog.open || !orbit.isConnected) {
      coinAnimationFrame = null;
      return;
    }

    const elapsed = Math.max(0, now - startAt);
    const progress = (elapsed % orbitDuration) / orbitDuration;
    const angle = elapsed === 0 ? 0 : -360 * progress;
    orbit.setAttribute("transform", `rotate(${angle})`);
    spin.setAttribute("transform", `rotate(${angle})`);
    coinAnimationFrame = requestAnimationFrame(animateCoin);
  }

  coinAnimationFrame = requestAnimationFrame(animateCoin);
}

function showPuzzleFeedback(question) {
  const isCorrect = state.answers[question.id] === question.correct;
  const content = {
    pattern: {
      correct: "Nice catch — the answer is 10.",
      other: "A tricky one — the answer is 10.",
      explanation: "Each figure adds one more dot than the previous one: +2, then +3, then +4."
    },
    reasoning: {
      correct: "Exactly — reinforce the engines and cockpit.",
      other: "The key is the aircraft missing from the data.",
      explanation: "The maps included only planes that returned. Damage to wings and fuselage was often survivable; aircraft hit in vital areas were less likely to come back. This is survivorship bias."
    },
    spatial: {
      correct: "Exactly — now watch what happens.",
      other: "This one challenges intuition — watch the marker closely.",
      explanation: "During one complete trip around the fixed coin, the marker completes two full rotations. The moving coin's center follows a circle twice the coin's own radius."
    }
  }[question.id];

  feedbackTitle.textContent = isCorrect ? content.correct : content.other;
  feedbackVisual.innerHTML = feedbackMarkup(question.puzzle);
  feedbackExplanation.textContent = content.explanation;
  feedbackNext.innerHTML = state.step === questions.length - 1
    ? `Got it — see my result <span aria-hidden="true">→</span>`
    : `Got it — next challenge <span aria-hidden="true">→</span>`;
  feedbackDialog.showModal();
  startCoinAnimation();
}

function advanceQuiz() {
  if (state.step < questions.length - 1) {
    state.step += 1;
    renderQuestion();
  } else {
    renderResult();
  }
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
    reasoning: state.answers.reasoning === "vital",
    spatial: state.answers.spatial === "2"
  };
  const total = Object.values(correct).filter(Boolean).length;
  let summary;

  if (total === 3) summary = "You move comfortably between patterns, evidence, and visual intuition — without needing calculation-heavy tasks.";
  else if (correct.pattern && correct.reasoning) summary = "You connect patterns with careful, evidence-based reasoning.";
  else if (correct.pattern && correct.spatial) summary = "You quickly notice visual patterns and are willing to question your first instinct.";
  else if (correct.reasoning && correct.spatial) summary = "Evidence-based reasoning and visual puzzles appear to bring out your strongest thinking.";
  else if (correct.pattern) summary = "Growing patterns catch your eye quickly — a useful instinct for exploring mathematical ideas.";
  else if (correct.reasoning) summary = "You appear most at home when a problem rewards questioning the evidence in front of you.";
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
    ["reasoning", "Evidence-based reasoning"],
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
  const question = questions[state.step];
  if (question.puzzle) showPuzzleFeedback(question);
  else advanceQuiz();
});

feedbackNext.addEventListener("click", () => {
  stopCoinAnimation();
  feedbackDialog.close();
  advanceQuiz();
});

feedbackDialog.addEventListener("close", stopCoinAnimation);

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
