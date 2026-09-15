import './style.css'
import { module7Topics, module7QuestionCount } from './practice7.js'

const lectures = [
  ['7.1', 'Linear Search', 'Unsorted data ko sequentially scan karo'],
  ['7.2', 'Binary Search', 'Sorted array ka half discard karo'],
  ['7.3.1', 'Exponential Search (Theory)', '1, 2, 4… se range locate'],
  ['7.3.2', 'Exponential Search (Code)', 'Bounded binary search'],
  ['7.4', 'DS Context', 'Data structure ke hisaab se search choose']
]

const chapter = (no, label, title, text) => `<div class="chapter-head"><div class="chapter-no"><span>${no}</span><small>${label}</small></div><div><h2>${title}</h2><p>${text}</p></div></div>`
const diagram = (values, note) => `<div class="search-array"><div class="search-array-row">${values.map((value, i) => `<span class="${i === Math.floor(values.length / 2) ? 'mid-node' : ''}"><i>[${i}]</i><b>${value}</b></span>`).join('<em>→</em>')}</div><p>${note}</p></div>`
const topicOptions = module7Topics.map(topic => `<option value="${topic.id}">${topic.label} (${topic.questions.length})</option>`).join('')
const tracker = lectures.map(([number, title, note]) => `<label><input type="checkbox" data-lecture="${number}"><span><b>${number}</b><i>${title}</i><small>${note}</small></span></label>`).join('')

const pyqs = [
  ['2024', 'Q40', 'Binary-search recurrence', 'Let F(n) be the maximum comparisons made by binary search on a sorted array of size n. Which recurrence is correct?', ['A. F(n)=F(⌊n/2⌋)+1', 'B. F(n)=F(⌊n/2⌋)+F(⌈n/2⌉)', 'C. F(n)=F(⌊n/2⌋)', 'D. F(n)=F(n−1)+1'], 'Option A', 'One middle comparison hota hai, then only one half remains. Binary search dono halves explore nahi karti.'],
  ['2025', 'Q27', 'Binary search prerequisites', 'Worst case mein binary search O(log n) kis input par correctly apply hota hai?', ['A. Unsorted integer array', 'B. Unsorted linked list', 'C. Increasing-order integer array', 'D. Increasing-order linked list'], 'Option C', 'Sorted order plus O(1) array middle access. Sorted linked list mein midpoint tak travel cost linear ho sakta hai.'],
  ['2026', 'Q31', 'Exact comparison count', '1000 distinct integers ki sorted array mein absent key ke liye recursive binary search. Maximum middle comparisons?', ['NAT'], '10', '2⁹=512 < 1000 ≤ 2¹⁰=1024. Longest unsuccessful path 10 middle checks leta hai.']
]
const pyqMarkup = pyqs.map(item => `<details class="pyq-card searchable" open><summary><span class="year">${item[0]}<small>${item[1]}</small></span><span><b>${item[2]}</b><small>DIRECT SEARCH PYQ</small></span><i>＋</i></summary><div class="pyq-body"><div class="answer"><span>Verified answer</span><strong>${item[5]}</strong></div><div class="pyq-question"><h4>Question</h4><p>${item[3]}</p><ul>${item[4].map(option => `<li>${option}</li>`).join('')}</ul></div><aside class="transfer"><strong>How to solve</strong><p>${item[6]}</p></aside></div></details>`).join('')

document.querySelector('#app').innerHTML = `
<div class="read-progress"><span></span></div>
<header class="topbar"><a class="brand" href="#top"><b>DA</b><span><strong>Python + DSA</strong><small>GATE 2027 Notebook</small></span></a><nav><button class="tab active" data-view="notes">Detailed Notes</button><button class="tab" data-view="pyq">PYQ Evidence <i>3</i></button><button class="tab" data-view="practice">Practice <i>${module7QuestionCount}</i></button><button class="tab" data-view="revision">Revision</button></nav><div class="actions"><button id="searchButton" aria-label="Search">⌕</button><button id="themeButton" aria-label="Theme">◐</button></div></header>
<div class="searchbox"><input id="search" type="search" placeholder="Search: low, high, mid, sorted, exponential…"><span>Search current view</span></div>
<div class="layout" id="top"><aside class="sidebar"><p class="overline">Module 07</p><h2>Searching</h2><div class="module-switch"><a href="./index.html">M01</a><a href="./module2.html">M02</a><a href="./module3.html">M03</a><a href="./module4.html">M04</a><a href="./module5.html">M05</a><a href="./module6.html">M06</a><a class="active" href="./module7.html">M07</a><a href="./module8.html">M08</a></div><div class="completion"><span><b>Lecture progress</b><i id="count">0/${lectures.length}</i></span><div><i id="bar"></i></div></div><nav id="toc"></nav><p class="source"><b>Sources</b>CampusX Searching lecture flow · supplied GATE DA syllabus · supplied 2024–2026 DA papers</p></aside><main>
<div class="view active" data-panel="notes">
<section class="hero searchable" data-title="Overview"><p class="eyebrow"><i></i> Module 07 · eliminate candidates correctly</p><h1>Search mein main question hai: <em>kaunse candidates safely discard</em> kar sakte ho?</h1><p>Unsorted data: linear scan. Sorted array: binary search. Unknown sorted range: exponential search pehle range locate karti hai, phir binary search chalati hai.</p><div class="metrics"><span><b>${lectures.length}</b>lecture sessions</span><span><b>${module7QuestionCount}</b>lecture-wise drills</span><span><b>3</b>direct PYQs</span></div><div class="syllabus"><b>GATE DA syllabus map</b>Search algorithms · linear search · binary search · Python lists · complexity analysis</div></section>
<section class="lecture-track searchable" id="lecture-track" data-title="Module 7 lecture tracker"><div class="track-head"><div><p class="eyebrow"><i></i> Exact lecture sequence</p><h2>Module 7 · Lecture Tracker</h2><p>Binary/exponential trace mein har round ke baad low, high aur mid likho. Pehle verify karo: data sorted hai ya nahi.</p></div><strong id="lecturePercent">0%</strong></div><div class="lecture-list">${tracker}</div></section>
<section class="beginner-start searchable" id="zero-start" data-title="Search mental model"><div class="zero-title"><span>ZERO START</span><h2>Search ka answer sirf “mil gaya” nahi hota.</h2><p>GATE mein comparisons, loop termination, sorted prerequisite aur data structure access cost bhi poochi ja sakti hai.</p></div><div class="three-grid"><article><span>UNSORTED</span><h3>Linear search</h3><p>Har value one-by-one check.</p></article><article><span>SORTED ARRAY</span><h3>Binary search</h3><p>Middle compare; one half discard.</p></article><article><span>UNKNOWN RANGE</span><h3>Exponential search</h3><p>1,2,4… bracket; then binary.</p></article></div></section>

<section class="chapter searchable" id="linear" data-title="7.1 · Linear Search">${chapter('7.1', 'LINEAR SEARCH', 'Har element ko sequence mein dekho', 'Unsorted data par bhi correct—because it ordering assume nahi karta.')}<div class="zero-title"><span>QUESTION</span><h2><code>[18, 7, 31, 9, 25]</code> mein 9 ka index find karo.</h2><p>18, 7, 31 match nahi. 9 index 3 par match, hence return 3.</p></div>${diagram(['18','7','31','9','25'], 'Left-to-right checked sequence: 18 → 7 → 31 → 9. Key 9 milte hi stop.') }<div class="table-wrap"><table><thead><tr><th>Iteration</th><th>index</th><th>value</th><th>value == 9?</th><th>Action</th></tr></thead><tbody><tr><td>1</td><td>0</td><td>18</td><td>No</td><td>index++</td></tr><tr><td>2</td><td>1</td><td>7</td><td>No</td><td>index++</td></tr><tr><td>3</td><td>2</td><td>31</td><td>No</td><td>index++</td></tr><tr><td>4</td><td>3</td><td>9</td><td>Yes</td><td>return 3</td></tr></tbody></table></div><div class="codebox green"><div><span>Python · first occurrence</span><button>Copy</button></div><pre><code>def linear_search(arr, key):
    for index, value in enumerate(arr):
        if value == key:
            return index
    return -1</code></pre></div><div class="two-grid"><article><h3>Best case</h3><p>Key first item: O(1).</p></article><article><h3>Worst case</h3><p>Key absent/last: n comparisons → O(n).</p></article></div><div class="danger"><b>GATE trap</b><p>Duplicate key par yeh code first occurrence return karta hai. Last occurrence ke liye scan continue karna hoga.</p></div></section>

<section class="chapter searchable" id="binary" data-title="7.2 · Binary Search">${chapter('7.2', 'BINARY SEARCH', 'Sorted array ka half safely discard karo', 'low/high candidate indices hain; mid par comparison direction choose karta hai.')}<div class="callout"><b>Non-negotiable condition</b><p>Array sorted hona chahiye. Ascending array mein <code>arr[mid] &lt; key</code> means mid aur uske left ke values key nahi ho sakte.</p></div>${diagram(['10','20','30','40','50','60','70'], 'Start key=60: low=0, high=6, mid=3, arr[mid]=40. 40 < 60, so only right half survives.') }<div class="table-wrap"><table><thead><tr><th>Round</th><th>low</th><th>high</th><th>mid</th><th>arr[mid]</th><th>Decision</th></tr></thead><tbody><tr><td>1</td><td>0</td><td>6</td><td>3</td><td>40</td><td>low = 4</td></tr><tr><td>2</td><td>4</td><td>6</td><td>5</td><td>60</td><td>return 5</td></tr></tbody></table></div><div class="codebox green"><div><span>Python · iterative binary search</span><button>Copy</button></div><pre><code>def binary_search(arr, key):
    low, high = 0, len(arr) - 1
    while low <= high:
        mid = low + (high - low) // 2
        if arr[mid] == key:
            return mid
        if arr[mid] < key:
            low = mid + 1
        else:
            high = mid - 1
    return -1</code></pre></div><div class="steps"><article><b>1</b><h3><code>low &lt;= high</code></h3><p>Candidate interval exists. low > high means key absent.</p></article><article><b>2</b><h3>Exclude mid</h3><p>Equality fail hui, so <code>mid + 1</code> or <code>mid - 1</code>. Otherwise loop stuck ho sakta hai.</p></article><article><b>3</b><h3>Complexity</h3><p>Candidate interval half hota hai: O(log n) time, O(1) iterative auxiliary space.</p></article></div><div class="danger"><b>GATE trap</b><p>Sorted linked list par standard O(log n) claim wrong ho sakta hai—middle access linear traversal leta hai.</p></div></section>

<section class="chapter searchable" id="exponential-theory" data-title="7.3.1 · Exponential Search Theory">${chapter('7.3.1', 'EXPONENTIAL SEARCH · THEORY', 'Pehle target ki possible range banao', 'Sorted unbounded/unknown-size range mein 1,2,4,8… boundaries double karte hain.')}<div class="zero-title"><span>MENTAL MODEL</span><h2>Target ko directly find nahi kar rahe; pehle usko bracket kar rahe hain.</h2><p>Agar arr[4] &lt; key aur arr[8] ≥ key, then target (if present) indices 4…8 mein hi hoga.</p></div><div class="steps"><article><b>1</b><h3>1, 2, 4, 8…</h3><p>Boundary double karo jab tak value key se smaller ho.</p></article><article><b>2</b><h3>Stop boundary</h3><p>First value ≥ key ya array end par stop.</p></article><article><b>3</b><h3>Bounded binary search</h3><p>Previous aur current boundary ke beech exact index search karo.</p></article></div>${diagram(['3','6','9','12','15','18','21','24','27'], 'key=23: arr[4]=15 < 23, arr[8]=27 ≥ 23. Now binary search only range 4…8.') }<div class="equation"><span>Target index i</span><b>doubling O(log i) + bounded binary O(log i) = O(log i)</b></div><div class="danger"><b>Condition</b><p>Exponential search bhi sorted order require karti hai. Final phase binary search hi hai.</p></div></section>

<section class="chapter searchable" id="exponential-code" data-title="7.3.2 · Exponential Search Code">${chapter('7.3.2', 'EXPONENTIAL SEARCH · CODE', 'Doubling ke baad bounded binary search', 'Empty list, first item aur last valid index guards important hain.')}<div class="codebox green"><div><span>Python · exponential search</span><button>Copy</button></div><pre><code>def binary_search_range(arr, key, low, high):
    while low <= high:
        mid = low + (high - low) // 2
        if arr[mid] == key:
            return mid
        if arr[mid] < key:
            low = mid + 1
        else:
            high = mid - 1
    return -1

def exponential_search(arr, key):
    n = len(arr)
    if n == 0:
        return -1
    if arr[0] == key:
        return 0

    i = 1
    while i < n and arr[i] < key:
        i *= 2

    return binary_search_range(arr, key, i // 2, min(i, n - 1))</code></pre></div><div class="table-wrap"><table><thead><tr><th>arr=[3,6,9,12,15,18,21,24,27], key=23</th><th>i</th><th>Reason</th></tr></thead><tbody><tr><td>Start</td><td>1</td><td>6 < 23, double</td></tr><tr><td>Next</td><td>2</td><td>9 < 23, double</td></tr><tr><td>Next</td><td>4</td><td>15 < 23, double</td></tr><tr><td>Stop</td><td>8</td><td>27 is not < 23</td></tr><tr><td>Binary phase</td><td>4…8</td><td>23 absent, return -1</td></tr></tbody></table></div><div class="callout"><b>Why <code>min(i, n-1)</code>?</b><p>Last doubling array ke end cross kar sakti hai. high must always be a valid index.</p></div></section>

<section class="chapter searchable" id="context" data-title="7.4 · DS Context">${chapter('7.4', 'DS CONTEXT', 'Data structure ke bina search complexity incomplete hai', 'Same values, different representation: different access cost.')}<div class="table-wrap"><table><thead><tr><th>Situation</th><th>Natural method</th><th>Why</th><th>Trap</th></tr></thead><tbody><tr><td>Unsorted list</td><td>Linear</td><td>No order to exploit</td><td>Binary invalid</td></tr><tr><td>Sorted array</td><td>Binary</td><td>Order + O(1) indexing</td><td>Bounds must progress</td></tr><tr><td>Sorted linked list</td><td>Usually linear</td><td>Middle access sequential</td><td>Sorted ≠ log time</td></tr><tr><td>Unknown sorted range</td><td>Exponential + binary</td><td>Doubling finds window</td><td>Bound high safely</td></tr><tr><td>Hash membership</td><td>Hash lookup</td><td>Average O(1)</td><td>Different from binary</td></tr></tbody></table></div><div class="callout"><b>Terminology trap</b><p>BFS “search” queue use karta hai. Binary search ordered-array candidate elimination hai. Same word, different algorithm family.</p></div><div class="final"><h3>Module 7 mastery target</h3><p>Trace low/high/mid without guessing, justify sorted prerequisite, and distinguish array from linked-list search cost.</p><button data-jump="practice">Lecture-wise practice kholo →</button></div></section>
</div>
<div class="view" data-panel="pyq"><section class="page-hero searchable" data-title="Searching PYQ Evidence"><p class="eyebrow"><i></i> Supplied paper evidence</p><h1>Searching PYQ Lab</h1><p>Verified 2024–2026 questions, with answer and reasoning visible by default.</p><div class="practice-summary"><span><b>3</b>direct PYQs</span><span><b>2024–26</b>coverage</span><span><b>visible</b>solutions</span></div></section><section class="pyq-list">${pyqMarkup}</section></div>
<div class="view" data-panel="practice"><section class="page-hero practice-head searchable" data-title="Practice Lab"><p class="eyebrow"><i></i> Lecture-wise GATE drills</p><h1>Module 7 Practice</h1><p>${module7QuestionCount} questions · five exact lecture sets · 50 questions in every set.</p><div class="practice-summary"><span><b>5</b>lecture sets</span><span><b>50</b>each</span><span><b>saved</b>attempt progress</span></div></section><section class="practice-controls searchable"><div><label for="practiceTopic">Lecture topic</label><select id="practiceTopic">${topicOptions}</select></div><div><label for="practiceDifficulty">Difficulty</label><select id="practiceDifficulty"><option value="all">All levels</option><option>Foundation</option><option>Core</option><option>Practice</option></select></div><div class="practice-score"><span>Attempted</span><b id="practiceScore">0/0</b></div></section><section class="practice-context" id="practiceContext"></section><section class="question-list" id="questionList"></section></div>
<div class="view" data-panel="revision"><section class="page-hero revision-head searchable"><p class="eyebrow"><i></i> Last-day recall</p><h1>Module 7 Revision</h1><button id="print">Print sheet</button></section><section class="revision-grid"><article class="rev"><span>01</span><h2>Linear</h2><ul><li>Unsorted okay</li><li>O(1) best</li><li>O(n) worst</li></ul></article><article class="rev"><span>02</span><h2>Binary</h2><ul><li>Sorted array</li><li>low/high/mid</li><li>O(log n)</li></ul></article><article class="rev"><span>03</span><h2>Bounds</h2><ul><li>low ≤ high</li><li>mid + 1</li><li>mid − 1</li></ul></article><article class="rev"><span>04</span><h2>Exponential</h2><ul><li>1,2,4…</li><li>then binary</li><li>O(log i)</li></ul></article><article class="rev warning"><span>05</span><h2>Traps</h2><ul><li>sorted linked list</li><li>exact comparisons</li><li>array limits</li></ul></article></section></div>
</main></div><button class="menu" id="menu">☰</button><div class="toast">Copied</div>`

const tabs = [...document.querySelectorAll('.tab')]
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
  const topic = module7Topics.find(item => item.id === practiceTopic.value)
  const questions = topic.questions.filter(item => practiceDifficulty.value === 'all' || item.difficulty === practiceDifficulty.value)
  const saved = JSON.parse(localStorage.getItem('da-m7-practice') || '{}')
  const key = index => `${topic.id}-${index}`
  document.querySelector('#practiceScore').textContent = `${questions.filter((_, i) => saved[key(i)]).length}/${questions.length}`
  document.querySelector('#practiceContext').innerHTML = `<div><span>LECTURE TOPIC</span><h2>${topic.label}</h2><p>Option choose karo. Explanation tabhi use karo jab apna trace complete ho.</p></div><strong>${questions.length} shown</strong>`
  document.querySelector('#questionList').innerHTML = questions.map((item, i) => `<article class="question-card"><div><span>${String(i + 1).padStart(2, '0')}</span><small>${item.difficulty}${item.pattern ? ' · ' + item.pattern : ''}</small></div><h3>${item.prompt}</h3><div class="options">${item.options.map(option => `<button data-answer="${option}" data-correct="${item.answer}">${option}</button>`).join('')}</div><p class="explanation" hidden><b>Why:</b> ${item.explanation}</p></article>`).join('')
  document.querySelectorAll('.options button').forEach(button => button.onclick = () => {
    const card = button.closest('.question-card')
    const index = [...document.querySelectorAll('.question-card')].indexOf(card)
    card.querySelectorAll('button').forEach(option => option.disabled = true)
    button.classList.add(button.dataset.answer === button.dataset.correct ? 'correct' : 'wrong')
    if (button.dataset.answer !== button.dataset.correct) [...card.querySelectorAll('button')].find(option => option.dataset.answer === button.dataset.correct)?.classList.add('correct')
    card.querySelector('.explanation').hidden = false
    saved[key(index)] = true
    localStorage.setItem('da-m7-practice', JSON.stringify(saved))
    document.querySelector('#practiceScore').textContent = `${questions.filter((_, i) => saved[key(i)]).length}/${questions.length}`
  })
}
practiceTopic.onchange = renderPractice
practiceDifficulty.onchange = renderPractice
renderPractice()

const toc = document.querySelector('#toc')
toc.innerHTML = [...document.querySelectorAll('[data-panel="notes"] .searchable')].map((section, i) => `<a href="#${section.id || 'top'}"><span>${String(i + 1).padStart(2, '0')}</span>${section.dataset.title}</a>`).join('')
toc.querySelectorAll('a').forEach(link => link.onclick = event => { event.preventDefault(); document.querySelector(link.getAttribute('href'))?.scrollIntoView({ behavior: 'smooth', block: 'start' }) })

const checks = [...document.querySelectorAll('[data-lecture]')]
const savedLectures = JSON.parse(localStorage.getItem('da-m7-lectures') || '[]')
function updateProgress() { const complete = checks.filter(check => check.checked).map(check => check.dataset.lecture); const percent = Math.round(100 * complete.length / checks.length); localStorage.setItem('da-m7-lectures', JSON.stringify(complete)); document.querySelector('#count').textContent = `${complete.length}/${checks.length}`; document.querySelector('#bar').style.width = `${percent}%`; document.querySelector('#lecturePercent').textContent = `${percent}%` }
checks.forEach(check => { check.checked = savedLectures.includes(check.dataset.lecture); check.onchange = updateProgress })
updateProgress()
document.querySelectorAll('.topic-practice').forEach(() => {})
Object.entries({ linear: 'linear', binary: 'binary', 'exponential-theory': 'exponential-theory', 'exponential-code': 'exponential-code', context: 'context' }).forEach(([sectionId, topicId]) => { const section = document.querySelector('#' + sectionId); const topic = module7Topics.find(item => item.id === topicId); section.insertAdjacentHTML('beforeend', `<button class="topic-practice" data-practice-topic="${topicId}">Is topic ke ${topic.questions.length} questions solve karo →</button>`) })
document.querySelectorAll('[data-practice-topic]').forEach(button => button.onclick = () => { practiceTopic.value = button.dataset.practiceTopic; practiceDifficulty.value = 'all'; renderPractice(); setView('practice') })
document.querySelectorAll('.codebox button').forEach(button => button.onclick = () => { navigator.clipboard.writeText(button.closest('.codebox').querySelector('code').textContent); document.querySelector('.toast').classList.add('show'); setTimeout(() => document.querySelector('.toast').classList.remove('show'), 1200) })
document.querySelector('#searchButton').onclick = () => searchInput.focus()
searchInput.oninput = () => { const term = searchInput.value.toLowerCase(); document.querySelector('.view.active').querySelectorAll('.searchable').forEach(section => section.hidden = term && !section.textContent.toLowerCase().includes(term)) }
document.querySelector('#themeButton').onclick = () => { document.documentElement.classList.toggle('dark'); localStorage.setItem('da-theme', document.documentElement.classList.contains('dark') ? 'dark' : 'light') }
if (localStorage.getItem('da-theme') !== 'light') document.documentElement.classList.add('dark')
document.querySelector('#menu').onclick = () => document.querySelector('.sidebar').classList.toggle('open')
document.querySelector('[data-jump="practice"]').onclick = () => setView('practice')
document.querySelector('#print').onclick = () => window.print()
const read = document.querySelector('.read-progress span')
window.addEventListener('scroll', () => { const h = document.documentElement.scrollHeight - window.innerHeight; read.style.width = `${h ? window.scrollY / h * 100 : 0}%` })

function visualizerMarkup(type) {
  const title = type === 'binary' ? 'Binary Search · step visualizer' : 'Exponential Search · step visualizer'
  const description = type === 'binary'
    ? 'Sorted values aur key do. Start se har click exact comparison, discarded half aur updated low/high/mid dikhayega.'
    : 'Pehle 1, 2, 4, 8… range checks dekho. Range milne ke baad exactly wahi bounded binary-search steps dikhengi.'
  return `<div class="search-lab" data-search-lab="${type}"><div class="search-lab-head"><span>TRY IT YOURSELF</span><h3>${title}</h3><p>${description}</p></div><div class="search-lab-controls"><label>Sorted values (comma separated)<input data-values value="${type === 'binary' ? '10,20,30,40,50,60,70' : '3,6,9,12,15,18,21,24,27'}"></label><label>Key<input data-key value="${type === 'binary' ? '60' : '23'}"></label><button data-start>Start dry run</button><button data-next disabled>Next step →</button></div><p class="search-lab-warning" data-warning></p><div class="search-lab-state" data-state><p>Values aur key set karke <strong>Start dry run</strong> dabao.</p></div></div>`
}

document.querySelector('#binary').insertAdjacentHTML('beforeend', visualizerMarkup('binary'))
document.querySelector('#exponential-code').insertAdjacentHTML('beforeend', visualizerMarkup('exponential'))

function mountSearchLab(lab) {
  const type = lab.dataset.searchLab
  const valuesInput = lab.querySelector('[data-values]')
  const keyInput = lab.querySelector('[data-key]')
  const startButton = lab.querySelector('[data-start]')
  const nextButton = lab.querySelector('[data-next]')
  const warning = lab.querySelector('[data-warning]')
  const output = lab.querySelector('[data-state]')
  let arr = []
  let key = 0
  let state = null

  const parse = () => valuesInput.value.split(',').map(value => Number(value.trim())).filter(value => !Number.isNaN(value))
  const isSorted = values => values.every((value, index) => index === 0 || values[index - 1] <= value)
  const visual = (low, high, mid) => `<div class="lab-array">${arr.map((value, index) => `<span class="${index < low || index > high ? 'discarded' : ''} ${index === mid ? 'lab-mid' : ''}"><i>${index}</i><b>${value}</b></span>`).join('')}</div>`
  const write = (message, detail) => {
    const { low, high, mid, phase, done } = state
    output.innerHTML = `<div class="lab-status"><span>${phase === 'range' ? 'RANGE FINDING' : done ? 'FINISHED' : 'BINARY SEARCH'}</span><b>low=${low ?? '—'} · high=${high ?? '—'} · mid=${mid ?? '—'}</b></div>${visual(low ?? 0, high ?? arr.length - 1, mid)}<h4>${message}</h4><p>${detail}</p>`
    nextButton.disabled = Boolean(done)
  }

  const binaryStep = () => {
    if (state.low > state.high) {
      state.done = true
      state.mid = null
      write('Key not found → return -1', 'low high se bada ho gaya. Candidate interval empty hai; sorted array mein ab koi unchecked possible position nahi bachi.')
      return
    }
    state.mid = state.low + Math.floor((state.high - state.low) / 2)
    const value = arr[state.mid]
    if (value === key) {
      state.done = true
      write(`Match: arr[${state.mid}] = ${key} → return ${state.mid}`, `mid currently index ${state.mid} ko point kar raha tha. Value key ke equal hai, so search complete. Koi aur half check nahi hota.`)
    } else if (value < key) {
      const oldLow = state.low
      state.low = state.mid + 1
      write(`arr[${state.mid}] = ${value} is smaller than key ${key}`, `Sorted ascending array mein indices ${oldLow} through ${state.mid} ki values bhi ${key} se chhoti hain. Isliye unhe discard karke low = mid + 1 = ${state.low}.`)
    } else {
      const oldHigh = state.high
      state.high = state.mid - 1
      write(`arr[${state.mid}] = ${value} is greater than key ${key}`, `Sorted ascending array mein indices ${state.mid} through ${oldHigh} ki values bhi ${key} se badi hain. Isliye unhe discard karke high = mid - 1 = ${state.high}.`)
    }
  }

  const exponentialStep = () => {
    if (state.phase === 'range') {
      if (state.i < arr.length && arr[state.i] < key) {
        const previous = state.i
        state.i *= 2
        state.low = previous
        state.high = Math.min(state.i, arr.length - 1)
        state.mid = null
        write(`Range check: arr[${previous}] = ${arr[previous]} < ${key}; double boundary`, `Target ${key} index ${previous} par nahi aur uske left mein bhi nahi ho sakta. Next boundary i = ${previous} × 2 = ${state.i}. Ab next check arr[${state.high}] par hoga.`)
        return
      }
      state.phase = 'binary'
      state.low = Math.floor(state.i / 2)
      state.high = Math.min(state.i, arr.length - 1)
      state.mid = null
      write(`Bracket ready: search only indices ${state.low}…${state.high}`, `Doubling stop hui because ${state.i >= arr.length ? 'array end aa gaya' : 'arr[' + state.i + '] = ' + arr[state.i] + ' is not smaller than key'}. Ab full array nahi, sirf yeh bounded interval binary search karega.`)
      return
    }
    binaryStep()
  }

  startButton.onclick = () => {
    arr = parse()
    key = Number(keyInput.value)
    warning.textContent = ''
    if (!arr.length || Number.isNaN(key)) {
      warning.textContent = 'Comma-separated numeric values aur numeric key dono do.'
      nextButton.disabled = true
      return
    }
    if (!isSorted(arr)) {
      warning.textContent = 'Input sorted ascending nahi hai. Binary aur exponential search ke liye values sort karna zaroori hai.'
      nextButton.disabled = true
      return
    }
    if (type === 'binary') {
      state = { phase: 'binary', low: 0, high: arr.length - 1, mid: null, done: false }
      write('Start state ready', `Candidate interval poora array hai: indices 0…${arr.length - 1}. Next step par mid calculate hoga.`)
    } else if (arr[0] === key) {
      state = { phase: 'range', low: 0, high: 0, mid: 0, done: true }
      write('First element match → return 0', 'Exponential search ka special guard arr[0] pehle check karta hai. Doubling aur binary phase ki zarurat nahi.')
    } else {
      state = { phase: 'range', i: 1, low: 0, high: Math.min(1, arr.length - 1), mid: null, done: false }
      write('Start exponential range finding', 'Index 0 checked (not match). First doubling boundary i=1 hai. Next step arr[1] compare karega.')
    }
    nextButton.disabled = state.done
  }
  nextButton.onclick = () => type === 'binary' ? binaryStep() : exponentialStep()
}
document.querySelectorAll('[data-search-lab]').forEach(mountSearchLab)
