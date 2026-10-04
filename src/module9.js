import './style.css'
import { module9Topics, module9QuestionCount } from './practice9.js'
import { lectureData, mentalModelMarkup, lessonMarkup, codebox } from './module9Lessons.js'

const esc = value => String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;')
const tracker = lectureData.map(([no, title, note]) => `<label><input type="checkbox" data-lecture="${no}"><span><b>${no}</b><i>${title}</i><small>${note}</small></span></label>`).join('')
const topicOptions = module9Topics.map(topic => `<option value="${topic.id}">${topic.label} (${topic.questions.length})</option>`).join('')
const pyqs = [
  {
    year: '2026', number: 'Q39', kind: 'DIRECT RECURSION PYQ',
    title: 'Recursive calls vs returned value',
    question: 'mystery(4) call hone par total stack activations kitni hongi? Initial call bhi count karo.',
    options: ['A · 5', 'B · 9', 'C · 15', 'D · 17'],
    answer: '15 (option C)',
    why: 'A(0)=A(-1)=1. For n>0, A(n)=1+A(n-1)+A(n-2). Therefore A(1)=3, A(2)=5, A(3)=9, A(4)=15. Yeh function ka returned numeric value nahi, total calls hai.',
    trace: '<div class="table-wrap"><table><thead><tr><th>n</th><th>Activations A(n)</th><th>Calculation</th></tr></thead><tbody><tr><td>−1, 0</td><td>1 each</td><td>Base call itself</td></tr><tr><td>1</td><td>3</td><td>1 + 1 + 1</td></tr><tr><td>2</td><td>5</td><td>1 + 3 + 1</td></tr><tr><td>3</td><td>9</td><td>1 + 5 + 3</td></tr><tr><td>4</td><td>15</td><td>1 + 9 + 5</td></tr></tbody></table></div>',
    code: ['def mystery(n):','    if n <= 0:','        return 1','    else:','        return mystery(n-1) + mystery(n-2)'].join('\n')
  },
  {
    year: '2026', number: 'Q31', kind: 'CROSS-TOPIC · RECURSIVE SEARCH',
    title: 'Unsuccessful binary search',
    question: '1000 sorted distinct values par recursive binary search mein unsuccessful search ke maximum comparisons kitne?',
    answer: '10',
    why: 'Candidate interval har comparison ke baad roughly half hota hai. 2^9=512 < 1000 < 2^10=1024, so worst unsuccessful path 10 comparisons leta hai. Ye Searching ka cross-topic PYQ hai, standalone Recursion question nahi.'
  }
]
const pyqMarkup = pyqs.map(item => `<details class="pyq-card searchable"><summary><span class="year">${item.year}<small>${item.number}</small></span><span><b>${item.title}</b><small>${item.kind}</small></span><i>＋</i></summary><div class="pyq-body"><div class="answer"><span>Verified answer</span><strong>${item.answer}</strong></div><div class="pyq-question"><h4>Paper question · concise transcript</h4><p>${item.question}</p>${item.code ? codebox('Python · paper code', item.code) : ''}${item.options ? `<div class="recursion-pyq-options">${item.options.map(option => `<span>${option}</span>`).join('')}</div>` : ''}${item.trace || ''}</div><aside class="transfer"><strong>Trace</strong><p>${item.why}</p></aside></div></details>`).join('')
const revisionMarkup = `<section class="revision-grid searchable" data-title="Recursion Quick Revision">
  <article><span>01 · STOP</span><h3>Base case</h3><p>Base input par direct return. Har recursive path ko eventually base tak pahunchna chahiye.</p></article>
  <article><span>02 · EXECUTION</span><h3>Call stack</h3><p>Parent child ko call karta hai aur wait karta hai. Last invoked frame first return karta hai.</p></article>
  <article><span>03 · COUNT</span><h3>Value ≠ activations</h3><p>Fibonacci-style branching mein returned result aur number of calls alag recurrence follow karte hain.</p></article>
  <article><span>04 · SPACE</span><h3>Peak depth, not total calls</h3><p>Auxiliary stack space ek time par active root-to-leaf path se milta hai.</p></article>
  <article><span>05 · ORDER</span><h3>Before vs after child</h3><p>Print before recursive call descent order; after recursive call unwind order.</p></article>
  <article><span>06 · DOMAIN</span><h3>Code limits</h3><p>Course ka count_digits(0)=0; negative input or exponent base tak na pahunche toh RecursionError.</p></article>
</section>`

document.querySelector('#app').innerHTML = `
<div class="read-progress"><span></span></div>
<header class="topbar"><a class="brand" href="#top"><b>DA</b><span><strong>Python + DSA</strong><small>GATE 2027 Notebook</small></span></a><nav><button class="tab active" data-view="notes">Detailed Notes</button><button class="tab" data-view="pyq">PYQ Evidence <i>1+1</i></button><button class="tab" data-view="practice">Practice <i>${module9QuestionCount}</i></button><button class="tab" data-view="revision">Revision</button></nav><div class="actions"><button id="searchButton" aria-label="Search">⌕</button><button id="themeButton" aria-label="Theme">◐</button></div></header>
<div class="searchbox"><input id="search" type="search" placeholder="Search: factorial, Fibonacci, stack, return…"><span>Search current view</span></div>
<div class="layout" id="top"><aside class="sidebar"><p class="overline">Module 09</p><h2>Recursion</h2><div class="module-switch"><a href="./index.html">M01</a><a href="./module2.html">M02</a><a href="./module3.html">M03</a><a href="./module4.html">M04</a><a href="./module5.html">M05</a><a href="./module6.html">M06</a><a href="./module7.html">M07</a><a href="./module8.html">M08</a><a class="active" href="./module9.html">M09</a></div><div class="completion"><span><b>Lecture progress</b><i id="count">0/${lectureData.length}</i></span><div><i id="bar"></i></div></div><nav id="toc"></nav><p class="source"><b>Sources</b>Supplied CampusX Recursion notebooks · supplied GATE DA syllabus · supplied 2024–2026 DA papers</p></aside><main>
<div class="view active" data-panel="notes">
<section class="hero searchable" data-title="Overview"><p class="eyebrow"><i></i> Module 09 · think in frames</p><h1>Recursion mein har call ka <em>apna kaam aur apna wait</em> hota hai.</h1><p>Base case tak calls descend karti hain; answers unwind hote waqt parent ko milte hain. Diagram mein dono directions alag mark karo—tab factorial, Fibonacci aur call-count questions clear honge.</p><div class="metrics"><span><b>${lectureData.length}</b>lecture sessions</span><span><b>${module9QuestionCount}</b>lecture-wise drills</span><span><b>1</b>direct PYQ</span></div><div class="syllabus"><b>GATE DA connection</b>Recursion syllabus mein standalone item nahi hai, lekin Python code-tracing, binary search, merge/quick sort aur tree/graph traversal samajhne ke liye zaroori hai.</div></section>
<section class="lecture-track searchable" id="lecture-track" data-title="Module 9 lecture tracker"><div class="track-head"><div><p class="eyebrow"><i></i> Exact lecture sequence</p><h2>Module 9 · Lecture Tracker</h2><p>Screenshot ke 9.1 se 9.6 tak same order. Har topic ke baad 50 practice questions milenge.</p></div><strong id="lecturePercent">0%</strong></div><div class="lecture-list">${tracker}</div></section>
${mentalModelMarkup}
${lessonMarkup}
</div>
<div class="view" data-panel="pyq"><section class="page-hero searchable" data-title="Recursion PYQ Evidence"><p class="eyebrow"><i></i> Supplied paper evidence</p><h1>Recursion PYQ Lab</h1><p>2026 DA Q39 direct recursion; Q31 recursive binary search ka cross-topic example. Generated practice questions ko PYQ nahi kaha gaya hai.</p><div class="practice-summary"><span><b>1</b>direct recursion PYQ</span><span><b>1</b>cross-topic PYQ</span><span><b>2026</b>paper</span></div></section><section class="pyq-list">${pyqMarkup}</section></div>
<div class="view" data-panel="practice"><section class="page-hero practice-head searchable" data-title="Practice Lab"><p class="eyebrow"><i></i> Lecture-wise GATE drills</p><h1>Module 9 Practice</h1><p>${module9QuestionCount} original practice variants · ${lectureData.length} lecture sets · 50 questions per set. Ye PYQs nahi hain.</p><div class="practice-summary"><span><b>${lectureData.length}</b>lecture sets</span><span><b>50</b>each</span><span><b>saved</b>attempt progress</span></div></section><section class="practice-controls searchable"><div><label for="practiceTopic">Lecture topic</label><select id="practiceTopic">${topicOptions}</select></div><div><label for="practiceDifficulty">Difficulty</label><select id="practiceDifficulty"><option value="all">All levels</option><option>Foundation</option><option>Core</option><option>Practice</option></select></div><div class="practice-score"><span>Attempted</span><b id="practiceScore">0/0</b></div></section><section class="practice-context" id="practiceContext"></section><section class="question-list" id="questionList"></section></div>
<div class="view" data-panel="revision"><section class="page-hero revision-head searchable" data-title="Recursion revision"><p class="eyebrow"><i></i> GATE DA · quick recall</p><h1>Recursion Quick Revision</h1><p>Base case, call order, return order, time aur stack space ek jagah.</p><button id="print">Print sheet</button></section>${revisionMarkup}</div>
</main></div><button class="menu" id="menu">☰</button><div class="toast">Copied</div>`

const tabs = [...document.querySelectorAll('.tab')]
document.querySelector('.module-switch').insertAdjacentHTML('beforeend', '<a href="./module10.html">M10</a>')
const panels = [...document.querySelectorAll('.view')]
const practiceTopic = document.querySelector('#practiceTopic')
const practiceDifficulty = document.querySelector('#practiceDifficulty')
const searchInput = document.querySelector('#search')
function setView(view) {
  tabs.forEach(tab => tab.classList.toggle('active', tab.dataset.view === view))
  panels.forEach(panel => panel.classList.toggle('active', panel.dataset.panel === view))
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
tabs.forEach(tab => tab.onclick = () => setView(tab.dataset.view))

function renderPractice() {
  const topic = module9Topics.find(item => item.id === practiceTopic.value)
  const questions = topic.questions.filter(item => practiceDifficulty.value === 'all' || item.difficulty === practiceDifficulty.value)
  const saved = JSON.parse(localStorage.getItem('da-m9-practice') || '{}')
  const key = item => `${topic.id}-${item.id}`
  const updateScore = () => {
    const attempted = questions.filter(item => saved[key(item)]).length
    const correct = questions.filter(item => saved[key(item)]?.correct).length
    document.querySelector('#practiceScore').textContent = `${attempted}/${questions.length} · ${correct} correct`
  }
  updateScore()
  document.querySelector('#practiceContext').innerHTML = `<div><span>LECTURE TOPIC</span><h2>${esc(topic.label)}</h2><p>Ek option choose karo; turant sahi/galat aur short explanation dikhegi.</p></div><strong>${questions.length} shown</strong>`
  document.querySelector('#questionList').innerHTML = questions.map((item, i) => {
    const choice = saved[key(item)]?.selection
    const answered = typeof choice === 'string'
    const correct = choice === item.answer
    return `<article class="question-card ${answered ? correct ? 'answered-correct' : 'answered-wrong' : ''}" data-question-index="${i}"><div class="question-card-meta"><span>Q${String(i + 1).padStart(2, '0')}</span><small>${esc(item.difficulty)}</small></div><h3>${esc(item.prompt)}</h3><div class="options" role="group" aria-label="Question ${i + 1} options">${item.options.map((option, index) => `<button type="button" data-option-index="${index}" class="${answered && option === item.answer ? 'correct' : ''} ${answered && option === choice && !correct ? 'wrong' : ''}" ${answered ? 'disabled' : ''}><b>${String.fromCharCode(65 + index)}</b><span>${esc(option)}</span></button>`).join('')}</div><div class="question-feedback ${answered ? correct ? 'is-correct' : 'is-wrong' : ''}" role="status" ${answered ? '' : 'hidden'}><strong>${answered ? correct ? '✓ Sahi jawab' : '✗ Galat jawab' : ''}</strong><p><b>Correct option:</b> ${esc(item.answer)}</p><p>${esc(item.explanation)}</p></div></article>`
  }).join('')
  document.querySelectorAll('.question-card .options button').forEach(button => button.onclick = () => {
    const card = button.closest('.question-card')
    const item = questions[Number(card.dataset.questionIndex)]
    const selection = item.options[Number(button.dataset.optionIndex)]
    if (saved[key(item)]?.selection) return
    const correct = selection === item.answer
    saved[key(item)] = { selection, correct }
    localStorage.setItem('da-m9-practice', JSON.stringify(saved))
    card.classList.add(correct ? 'answered-correct' : 'answered-wrong')
    card.querySelectorAll('.options button').forEach(optionButton => {
      const value = item.options[Number(optionButton.dataset.optionIndex)]
      optionButton.disabled = true
      optionButton.classList.toggle('correct', value === item.answer)
      optionButton.classList.toggle('wrong', value === selection && !correct)
    })
    const feedback = card.querySelector('.question-feedback')
    feedback.hidden = false
    feedback.classList.add(correct ? 'is-correct' : 'is-wrong')
    feedback.querySelector('strong').textContent = correct ? '✓ Sahi jawab' : '✗ Galat jawab'
    updateScore()
  })
}
practiceTopic.onchange = renderPractice
practiceDifficulty.onchange = renderPractice
renderPractice()

const toc = document.querySelector('#toc')
toc.innerHTML = [...document.querySelectorAll('[data-panel="notes"] .searchable')].map((section, i) => `<a href="#${section.id || 'top'}"><span>${String(i + 1).padStart(2, '0')}</span>${section.dataset.title}</a>`).join('')
const stored = JSON.parse(localStorage.getItem('da-m9-lectures') || '{}')
const checks = [...document.querySelectorAll('[data-lecture]')]
function refreshProgress() {
  const done = checks.filter(check => check.checked).length
  document.querySelector('#count').textContent = `${done}/${lectureData.length}`
  document.querySelector('#bar').style.width = `${done / lectureData.length * 100}%`
  document.querySelector('#lecturePercent').textContent = `${Math.round(done / lectureData.length * 100)}%`
}
checks.forEach(check => {
  check.checked = Boolean(stored[check.dataset.lecture])
  check.onchange = () => {
    stored[check.dataset.lecture] = check.checked
    localStorage.setItem('da-m9-lectures', JSON.stringify(stored))
    refreshProgress()
  }
})
refreshProgress()
module9Topics.forEach(topic => {
  document.getElementById(topic.id).insertAdjacentHTML('beforeend', `<button class="topic-practice" data-practice-topic="${topic.id}">Is topic ke ${topic.questions.length} questions solve karo →</button>`)
})
document.querySelectorAll('[data-practice-topic]').forEach(button => button.onclick = () => {
  practiceTopic.value = button.dataset.practiceTopic
  practiceDifficulty.value = 'all'
  renderPractice()
  setView('practice')
})
document.querySelectorAll('.codebox button').forEach(button => button.onclick = async () => {
  await navigator.clipboard.writeText(button.closest('.codebox').querySelector('code').textContent)
  const toast = document.querySelector('.toast')
  toast.classList.add('show')
  setTimeout(() => toast.classList.remove('show'), 1200)
})
document.querySelector('#searchButton').onclick = () => {
  document.querySelector('.searchbox').classList.toggle('open')
  searchInput.focus()
}
searchInput.oninput = () => {
  const term = searchInput.value.toLowerCase()
  document.querySelector('.view.active').querySelectorAll('.searchable').forEach(section => {
    section.hidden = Boolean(term) && !section.textContent.toLowerCase().includes(term)
  })
}
document.querySelector('#themeButton').onclick = () => {
  document.documentElement.classList.toggle('dark')
  localStorage.setItem('da-theme', document.documentElement.classList.contains('dark') ? 'dark' : 'light')
}
if (localStorage.getItem('da-theme') !== 'light') document.documentElement.classList.add('dark')
document.querySelector('#menu').onclick = () => document.querySelector('.sidebar').classList.toggle('open')
document.querySelector('[data-jump="practice"]').onclick = () => setView('practice')
document.querySelector('#print').onclick = () => window.print()
const read = document.querySelector('.read-progress span')
window.addEventListener('scroll', () => {
  const h = document.documentElement.scrollHeight - window.innerHeight
  read.style.width = `${h ? window.scrollY / h * 100 : 0}%`
})
