// ─────────────────────────────────────────────────────────────────────────────
// EmailJS configuration
// ─────────────────────────────────────────────────────────────────────────────
const EMAILJS_SERVICE_ID  = 'service_twrhmkv';
const EMAILJS_TEMPLATE_ID = 'template_0chbw3a';
const EMAILJS_PUBLIC_KEY  = 'yzjo7MW0MOK8x3yla';

// ── State ─────────────────────────────────────────────────────────────────────
const state = {
  techName: '',
  currentIndex: 0,
  answers: [],
  transitioning: false,
};

// ── DOM refs ──────────────────────────────────────────────────────────────────
const screens = {
  welcome: document.getElementById('screen-welcome'),
  quiz:    document.getElementById('screen-quiz'),
  results: document.getElementById('screen-results'),
};

const el = {
  techNameInput:    document.getElementById('tech-name'),
  btnStart:         document.getElementById('btn-start'),
  progressText:     document.getElementById('progress-text'),
  progressPoints:   document.getElementById('progress-points'),
  progressFill:     document.getElementById('progress-fill'),
  questionCard:     document.getElementById('question-card'),
  questionPart:     document.getElementById('question-part'),
  scenarioBox:      document.getElementById('scenario-box'),
  questionText:     document.getElementById('question-text'),
  answersContainer: document.getElementById('answers-container'),
  btnNext:          document.getElementById('btn-next'),
  scorePercent:     document.getElementById('score-percent'),
  scoreFraction:    document.getElementById('score-fraction'),
  techNameDisplay:  document.getElementById('tech-name-display'),
  missedList:       document.getElementById('missed-list'),
  btnSendEmail:     document.getElementById('btn-send-email'),
  emailStatus:      document.getElementById('email-status'),
};

// ── Boot ───────────────────────────────────────────────────────────────────────
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

// ── Screen switching ───────────────────────────────────────────────────────────
function showScreen(name) {
  Object.values(screens).forEach(s => s.classList.remove('active'));
  screens[name].classList.add('active');
}

// ── Quiz start ─────────────────────────────────────────────────────────────────
function startQuiz() {
  state.techName = el.techNameInput.value.trim();
  state.currentIndex = 0;
  state.answers = new Array(QUESTIONS.length).fill(null);
  showScreen('quiz');
  renderQuestion(0);
}

// ── Progress bar ───────────────────────────────────────────────────────────────
function updateProgress(index) {
  const total = QUESTIONS.length;
  const pct   = (index / total) * 100;
  el.progressFill.style.width = pct + '%';
  el.progressText.textContent = `Question ${index + 1} of ${total}`;

  const q = QUESTIONS[index];
  el.progressPoints.textContent = `${q.points} pt${q.points !== 1 ? 's' : ''}`;
}

// ── Render a question ──────────────────────────────────────────────────────────
function renderQuestion(index) {
  const q = QUESTIONS[index];

  el.questionPart.textContent = q.part;

  if (q.type === 'scenario') {
    el.scenarioBox.style.display = 'block';
    el.scenarioBox.innerHTML = `
      <div class="scenario-label">Scenario</div>
      <div>${escHtml(q.scenario)}</div>
    `;
  } else {
    el.scenarioBox.style.display = 'none';
  }

  el.questionText.innerHTML = q.type === 'fillinblank'
    ? `<span class="question-number">Q${q.id}</span>`
    : `<span class="question-number">Q${q.id}</span> ${escHtml(q.text)}`;

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
    case 'matching':
      renderMatching(q, index);
      break;
  }

  updateProgress(index);
  el.btnNext.disabled = !isAnswered(index);
}

// ── Multiple choice & scenario ─────────────────────────────────────────────────
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

// ── True / False ───────────────────────────────────────────────────────────────
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

// ── Fill in the Blank ──────────────────────────────────────────────────────────
function renderFillInBlank(q, index) {
  const parts  = q.text.split('___');
  const before = parts[0] || '';
  const after  = parts[1] || '';

  const sentence = document.createElement('div');
  sentence.className = 'blank-sentence';

  const sel = document.createElement('select');
  sel.className = 'blank-select';

  const placeholder = document.createElement('option');
  placeholder.value    = '';
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

  sentence.appendChild(document.createTextNode(before));
  sentence.appendChild(sel);
  sentence.appendChild(document.createTextNode(after));

  const hint = document.createElement('p');
  hint.className = 'word-bank-hint';
  hint.innerHTML = `<strong>Word bank:</strong> ${WORD_BANK.join(' | ')}`;

  el.answersContainer.appendChild(sentence);
  el.answersContainer.appendChild(hint);
}

// ── Matching ───────────────────────────────────────────────────────────────────
function renderMatching(q, index) {
  const saved = state.answers[index] || {};

  // Definitions reference box
  const defsBox = document.createElement('div');
  defsBox.className = 'matching-defs';
  defsBox.innerHTML = '<strong>Definitions</strong>';
  const defList = document.createElement('div');
  defList.className = 'def-list';
  q.definitions.forEach(d => {
    const item = document.createElement('div');
    item.className = 'def-item';
    item.innerHTML = `<strong>${escHtml(d.letter)}.</strong> ${escHtml(d.text)}`;
    defList.appendChild(item);
  });
  defsBox.appendChild(defList);

  // Matching rows
  const rowsContainer = document.createElement('div');
  rowsContainer.className = 'matching-rows';

  q.pairs.forEach(pair => {
    const row = document.createElement('div');
    row.className = 'match-row';

    const termEl = document.createElement('span');
    termEl.className = 'match-term';
    termEl.textContent = pair.term;

    const sel = document.createElement('select');
    sel.className = 'match-select';
    sel.dataset.term = pair.term;

    const placeholder = document.createElement('option');
    placeholder.value       = '';
    placeholder.textContent = '—';
    placeholder.disabled    = true;
    placeholder.selected    = !saved[pair.term];
    sel.appendChild(placeholder);

    q.definitions.forEach(d => {
      const opt = document.createElement('option');
      opt.value = d.letter;
      opt.textContent = d.letter;
      if (saved[pair.term] === d.letter) opt.selected = true;
      sel.appendChild(opt);
    });

    sel.addEventListener('change', () => {
      const current = state.answers[index] || {};
      current[pair.term] = sel.value;
      state.answers[index] = current;
      el.btnNext.disabled = !isAnswered(index);
    });

    row.appendChild(termEl);
    row.appendChild(sel);
    rowsContainer.appendChild(row);
  });

  el.answersContainer.appendChild(defsBox);
  el.answersContainer.appendChild(rowsContainer);
}

// ── Answer selection (simple types) ───────────────────────────────────────────
function selectAnswer(value, index) {
  state.answers[index] = value;
  el.btnNext.disabled  = false;

  const q = QUESTIONS[index];
  if (q.type === 'multiplechoice' || q.type === 'scenario') {
    el.answersContainer.querySelectorAll('.choice-btn').forEach(btn => {
      btn.classList.toggle('selected', btn.querySelector('.choice-letter').textContent === value);
    });
  } else if (q.type === 'truefalse') {
    el.answersContainer.querySelectorAll('.tf-btn').forEach(btn => {
      btn.classList.toggle('selected', btn.textContent === value);
    });
  }
}

// ── Check if current question is fully answered ────────────────────────────────
function isAnswered(index) {
  const q      = QUESTIONS[index];
  const answer = state.answers[index];
  if (answer === null) return false;
  if (q.type === 'matching') {
    return q.pairs.every(p => answer[p.term]);
  }
  return true;
}

// ── Next question / finish ─────────────────────────────────────────────────────
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

// ── Scoring ────────────────────────────────────────────────────────────────────
function calcScore() {
  let earned = 0;
  let total  = 0;
  const missed = [];

  QUESTIONS.forEach((q, i) => {
    total += q.points;
    const given = state.answers[i];

    if (q.type === 'matching') {
      if (given) {
        const wrongPairs = [];
        q.pairs.forEach(pair => {
          if (given[pair.term] === pair.correct) {
            earned += 1;
          } else {
            wrongPairs.push({ term: pair.term, given: given[pair.term], correct: pair.correct });
          }
        });
        if (wrongPairs.length > 0) missed.push({ q, wrongPairs });
      } else {
        missed.push({ q, wrongPairs: q.pairs.map(p => ({ term: p.term, given: null, correct: p.correct })) });
      }
    } else {
      const correct = q.correct;
      if (given !== null && given.trim().toLowerCase() === correct.trim().toLowerCase()) {
        earned += q.points;
      } else {
        missed.push({ q, given, correct });
      }
    }
  });

  return { earned, total, pct: Math.round((earned / total) * 100), missed };
}

// ── Results screen ─────────────────────────────────────────────────────────────
function showResults() {
  const { earned, total, pct, missed } = calcScore();

  el.scorePercent.textContent   = pct + '%';
  el.scoreFraction.textContent  = `${earned} / ${total} points`;
  el.techNameDisplay.textContent = state.techName;

  if (missed.length === 0) {
    el.missedList.innerHTML = '<div class="all-correct">Perfect score — no questions to review!</div>';
  } else {
    el.missedList.innerHTML = missed.map(({ q, given, wrongPairs }) => {
      if (q.type === 'matching') {
        const rows = wrongPairs.map(wp => {
          const correctDef = q.definitions.find(d => d.letter === wp.correct);
          const givenDef   = wp.given ? q.definitions.find(d => d.letter === wp.given) : null;
          return `<div class="match-miss-row">
            <strong>${escHtml(wp.term)}</strong>
            <span class="missed-yours">Your answer: ${wp.given ? escHtml(wp.given) + ' — ' + escHtml(givenDef ? givenDef.text : '') : '(no answer)'}</span>
            <span class="missed-correct">Correct: ${escHtml(wp.correct)} — ${escHtml(correctDef ? correctDef.text : '')}</span>
          </div>`;
        }).join('');
        return `<div class="missed-item"><div class="missed-q">Part 4 — Matching (incorrect pairs)</div>${rows}</div>`;
      }

      const givenLabel   = formatAnswer(q, given);
      const correctLabel = formatAnswer(q, q.correct);
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

// ── Email ──────────────────────────────────────────────────────────────────────
function sendEmail() {
  const { earned, total, pct, missed } = calcScore();
  const dateStr = new Date().toLocaleString();

  let report;
  if (missed.length === 0) {
    report = 'All questions answered correctly — perfect score!';
  } else {
    report = missed.map(({ q, given, wrongPairs }) => {
      if (q.type === 'matching') {
        const lines = wrongPairs.map(wp => {
          const correctDef = q.definitions.find(d => d.letter === wp.correct);
          const givenDef   = wp.given ? q.definitions.find(d => d.letter === wp.given) : null;
          return `  ${wp.term}: answered "${wp.given || 'none'} — ${givenDef ? givenDef.text : ''}" | correct: "${wp.correct} — ${correctDef ? correctDef.text : ''}"`;
        }).join('\n');
        return `Part 4 — Matching (incorrect pairs):\n${lines}`;
      }
      const givenLabel   = formatAnswer(q, given) || '(no answer)';
      const correctLabel = formatAnswer(q, q.correct);
      return `Q${q.id}: ${q.text}\n  Their answer:   ${givenLabel}\n  Correct answer: ${correctLabel}`;
    }).join('\n\n');
  }

  el.btnSendEmail.disabled   = true;
  el.emailStatus.textContent = 'Sending…';
  el.emailStatus.className   = 'email-status';

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

// ── Utility ────────────────────────────────────────────────────────────────────
function escHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
