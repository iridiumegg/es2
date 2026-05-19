// ─────────────────────────────────────────────────────────────────────────────
// EmailJS configuration — fill these in after setting up your EmailJS account.
//
// Steps:
//  1. Sign up at https://www.emailjs.com (free tier = 200 emails/month)
//  2. Add an Email Service (Gmail, Outlook, etc.)
//  3. Create a Template. In the template body use these variables:
//       {{tech_name}}  — technician's name
//       {{date}}       — date/time of the test
//       {{score}}      — "18 / 22 points (82%)"
//       {{report}}     — full missed-question summary (pre-formatted text)
//  4. Paste your Service ID, Template ID, and Public Key below.
// ─────────────────────────────────────────────────────────────────────────────
const EMAILJS_SERVICE_ID  = 'YOUR_SERVICE_ID';
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';
const EMAILJS_PUBLIC_KEY  = 'YOUR_PUBLIC_KEY';

// ─────────────────────────────────────────────────────────────────────────────

const state = {
  techName: '',
  currentIndex: 0,
  answers: [],      // stores selected answer for each question by index
  transitioning: false,
};

// ── DOM refs ──────────────────────────────────────────────────────────────────
const screens = {
  welcome: document.getElementById('screen-welcome'),
  quiz:    document.getElementById('screen-quiz'),
  results: document.getElementById('screen-results'),
};

const el = {
  techNameInput:   document.getElementById('tech-name'),
  btnStart:        document.getElementById('btn-start'),
  progressText:    document.getElementById('progress-text'),
  progressPoints:  document.getElementById('progress-points'),
  progressFill:    document.getElementById('progress-fill'),
  questionCard:    document.getElementById('question-card'),
  questionPart:    document.getElementById('question-part'),
  scenarioBox:     document.getElementById('scenario-box'),
  questionText:    document.getElementById('question-text'),
  answersContainer:document.getElementById('answers-container'),
  btnNext:         document.getElementById('btn-next'),
  scorePercent:    document.getElementById('score-percent'),
  scoreFraction:   document.getElementById('score-fraction'),
  techNameDisplay: document.getElementById('tech-name-display'),
  missedList:      document.getElementById('missed-list'),
  btnSendEmail:    document.getElementById('btn-send-email'),
  emailStatus:     document.getElementById('email-status'),
};

// ── Boot ───────────────────────────────────────────────────────────────────
emailjs.init(EMAILJS_PUBLIC_KEY);

el.techNameInput.addEventListener('input', () => {
  el.btnStart.disabled = el.techNameInput.value.trim().length === 0;
});

el.techNameInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && !el.btnStart.disabled) startQuiz();
});

el.btnStart.addEventListener('click', startQuiz);
el.btnNext.addEventListener('click', nextQuestion);
el.btnSendEmail.addEventListener('click', sendEmail);

// ── Screen switching ───────────────────────────────────────────────────────
function showScreen(name) {
  Object.values(screens).forEach(s => s.classList.remove('active'));
  screens[name].classList.add('active');
}

// ── Quiz start ─────────────────────────────────────────────────────────────
function startQuiz() {
  state.techName = el.techNameInput.value.trim();
  state.currentIndex = 0;
  state.answers = new Array(QUESTIONS.length).fill(null);
  showScreen('quiz');
  renderQuestion(0);
}

// ── Progress bar ───────────────────────────────────────────────────────────
function updateProgress(index) {
  const total = QUESTIONS.length;
  const pct   = ((index) / total) * 100;
  el.progressFill.style.width = pct + '%';
  el.progressText.textContent = `Question ${index + 1} of ${total}`;

  const q = QUESTIONS[index];
  el.progressPoints.textContent = `${q.points} pt${q.points > 1 ? 's' : ''}`;
}

// ── Render a question ──────────────────────────────────────────────────────
function renderQuestion(index) {
  const q = QUESTIONS[index];

  // Part label
  el.questionPart.textContent = q.part;

  // Scenario box
  if (q.type === 'scenario') {
    el.scenarioBox.style.display = 'block';
    el.scenarioBox.innerHTML = `
      <div class="scenario-label">Scenario</div>
      <div>${escHtml(q.scenario)}</div>
    `;
  } else {
    el.scenarioBox.style.display = 'none';
  }

  // Question text
  el.questionText.innerHTML = `<span class="question-number">Q${q.id}</span> ${buildQuestionText(q)}`;

  // Answer area
  el.answersContainer.innerHTML = '';
  switch (q.type) {
    case 'multiplechoice':
    case 'scenario':
      renderChoices(q, index);
      break;
    case 'truefalse':
      renderTrueFalse(q, index);
      break;
    case 'fillinblank':
      renderFillInBlank(q, index);
      break;
  }

  updateProgress(index);
  el.btnNext.disabled = state.answers[index] === null;
}

// For fill-in-blank, the question text contains the inline dropdown, so we
// render a plain label here and the sentence with select inside answersContainer.
function buildQuestionText(q) {
  if (q.type === 'fillinblank') return '';
  return escHtml(q.text);
}

// ── Multiple choice & scenario ─────────────────────────────────────────────
function renderChoices(q, index) {
  const list = document.createElement('div');
  list.className = 'choices-list';

  q.choices.forEach(choice => {
    const btn = document.createElement('button');
    btn.className = 'choice-btn' + (state.answers[index] === choice.letter ? ' selected' : '');
    btn.innerHTML = `
      <span class="choice-letter">${escHtml(choice.letter)}</span>
      <span>${escHtml(choice.text)}</span>
    `;
    btn.addEventListener('click', () => selectAnswer(choice.letter, index));
    list.appendChild(btn);
  });

  el.answersContainer.appendChild(list);
}

// ── True / False ───────────────────────────────────────────────────────────
function renderTrueFalse(q, index) {
  const group = document.createElement('div');
  group.className = 'tf-group';

  ['TRUE', 'FALSE'].forEach(val => {
    const btn = document.createElement('button');
    btn.className = 'tf-btn' + (state.answers[index] === val ? ' selected' : '');
    btn.textContent = val;
    btn.addEventListener('click', () => selectAnswer(val, index));
    group.appendChild(btn);
  });

  el.answersContainer.appendChild(group);
}

// ── Fill in the Blank ──────────────────────────────────────────────────────
function renderFillInBlank(q, index) {
  const parts = q.text.split('___');
  const before = parts[0] || '';
  const after  = parts[1] || '';

  const sentence = document.createElement('div');
  sentence.className = 'blank-sentence';

  const buildSelect = () => {
    const sel = document.createElement('select');
    sel.className = 'blank-select';

    const placeholder = document.createElement('option');
    placeholder.value = '';
    placeholder.textContent = '— select —';
    placeholder.disabled = true;
    placeholder.selected = state.answers[index] === null;
    sel.appendChild(placeholder);

    WORD_BANK.forEach(word => {
      const opt = document.createElement('option');
      opt.value = word;
      opt.textContent = word;
      if (state.answers[index] === word) opt.selected = true;
      sel.appendChild(opt);
    });

    sel.addEventListener('change', () => {
      if (sel.value) selectAnswer(sel.value, index);
    });
    return sel;
  };

  sentence.appendChild(document.createTextNode(before));
  sentence.appendChild(buildSelect());
  sentence.appendChild(document.createTextNode(after));

  const hint = document.createElement('p');
  hint.className = 'word-bank-hint';
  hint.innerHTML = `<strong>Word bank:</strong> ${WORD_BANK.join(' | ')}`;

  el.answersContainer.appendChild(sentence);
  el.answersContainer.appendChild(hint);
}

// ── Answer selection ───────────────────────────────────────────────────────
function selectAnswer(value, index) {
  state.answers[index] = value;
  el.btnNext.disabled = false;

  // Refresh answer visuals without a full re-render
  const q = QUESTIONS[index];
  if (q.type === 'multiplechoice' || q.type === 'scenario') {
    el.answersContainer.querySelectorAll('.choice-btn').forEach(btn => {
      const letter = btn.querySelector('.choice-letter').textContent;
      btn.classList.toggle('selected', letter === value);
    });
  } else if (q.type === 'truefalse') {
    el.answersContainer.querySelectorAll('.tf-btn').forEach(btn => {
      btn.classList.toggle('selected', btn.textContent === value);
    });
  }
  // fill-in-blank select updates itself via DOM
}

// ── Next question / finish ─────────────────────────────────────────────────
function nextQuestion() {
  if (state.transitioning) return;
  state.transitioning = true;

  el.questionCard.classList.add('exiting');

  setTimeout(() => {
    el.questionCard.classList.remove('exiting');
    state.currentIndex++;

    if (state.currentIndex >= QUESTIONS.length) {
      state.transitioning = false;
      showResults();
    } else {
      renderQuestion(state.currentIndex);
      state.transitioning = false;
    }
  }, 280);
}

// ── Scoring ────────────────────────────────────────────────────────────────
function calcScore() {
  let earned = 0;
  let total  = 0;
  const missed = [];

  QUESTIONS.forEach((q, i) => {
    total += q.points;
    const given   = state.answers[i];
    const correct = q.correct;

    if (given !== null && given.trim().toLowerCase() === correct.trim().toLowerCase()) {
      earned += q.points;
    } else {
      missed.push({ q, given, correct });
    }
  });

  return { earned, total, pct: Math.round((earned / total) * 100), missed };
}

// ── Results screen ─────────────────────────────────────────────────────────
function showResults() {
  const { earned, total, pct, missed } = calcScore();

  el.scorePercent.textContent    = pct + '%';
  el.scoreFraction.textContent   = `${earned} / ${total} points`;
  el.techNameDisplay.textContent = state.techName;

  if (missed.length === 0) {
    el.missedList.innerHTML = '<div class="all-correct">Perfect score — no questions to review!</div>';
  } else {
    el.missedList.innerHTML = missed.map(({ q, given, correct }) => {
      const givenLabel   = formatAnswer(q, given);
      const correctLabel = formatAnswer(q, correct);
      return `
        <div class="missed-item">
          <div class="missed-q">Q${q.id}: ${escHtml(q.text.replace('___', '____'))}</div>
          <div class="missed-yours">Your answer: ${escHtml(givenLabel || '(no answer)')}</div>
          <div class="missed-correct">Correct answer: ${escHtml(correctLabel)}</div>
        </div>
      `;
    }).join('');
  }

  showScreen('results');
}

function formatAnswer(q, value) {
  if (!value) return '';
  if (q.type === 'multiplechoice' || q.type === 'scenario') {
    const choice = q.choices.find(c => c.letter === value);
    return choice ? `${value} — ${choice.text}` : value;
  }
  return value;
}

// ── Email ──────────────────────────────────────────────────────────────────
function sendEmail() {
  const { earned, total, pct, missed } = calcScore();
  const dateStr = new Date().toLocaleString();

  let report;
  if (missed.length === 0) {
    report = 'All questions answered correctly — perfect score!';
  } else {
    report = missed.map(({ q, given, correct }) => {
      const givenLabel   = formatAnswer(q, given) || '(no answer)';
      const correctLabel = formatAnswer(q, correct);
      return `Q${q.id}: ${q.text}\n  Their answer:   ${givenLabel}\n  Correct answer: ${correctLabel}`;
    }).join('\n\n');
  }

  el.btnSendEmail.disabled = true;
  el.emailStatus.textContent = 'Sending…';
  el.emailStatus.className = 'email-status';

  emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
    tech_name: state.techName,
    date:      dateStr,
    score:     `${earned} / ${total} points (${pct}%)`,
    report,
  }).then(() => {
    el.emailStatus.textContent = 'Results sent successfully!';
    el.emailStatus.className   = 'email-status success';
  }).catch(err => {
    console.error('EmailJS error:', err);
    el.emailStatus.textContent = 'Failed to send — check your EmailJS config in app.js.';
    el.emailStatus.className   = 'email-status error';
    el.btnSendEmail.disabled   = false;
  });
}

// ── Utility ────────────────────────────────────────────────────────────────
function escHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
