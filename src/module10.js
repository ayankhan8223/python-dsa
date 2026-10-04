import './style.css'
import { module10Topics, module10QuestionCount } from './practice10.js'
import { lectureData, lessonMarkup, mentalModelMarkup, codebox } from './module10Lessons.js'
const esc = value => String(value).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;')
const tracker = lectureData.map(([no,title,note]) => `<label><input type="checkbox" data-lecture="${no}"><span><b>${no}</b><i>${title}</i><small>${note}</small></span></label>`).join('')
const topicOptions = module10Topics.map(topic => `<option value="${topic.id}">${topic.label} (${topic.questions.length})</option>`).join('')
const pyqs = [
  {
    year:'2024',number:'Q21',kind:'DIRECT HASHING PYQ',title:'Load factor and insertion probes',
    question:'Uniform hashing, open addressing, α=n/m&lt;1. Given unsuccessful search expected probes are at most 1/(1−α). Insertion needs at most how many probes on average?',
    options:['A · ln(1/(1−α))','B · 1/(1−α)','C · 1+α/2','D · 1/(1+α)'],
    answer:'B · 1/(1−α)',
    why:'Insert pehla free slot dhoondta hai. Yeh unsuccessful search ka same probe sequence hai. Paper ne uska bound 1/(1−α) diya hai, so insertion par bhi wahi upper bound apply hota hai. Ye average/expected guarantee hai, har single insertion ka hard bound nahi.'
  },
  {
    year:'2025',number:'Q18',kind:'DIRECT LINEAR PROBING PYQ',title:'Two colliding keys ka final slot',
    question:'Size 10, h(x)=3x mod 10, linear probing. Initially empty. Insert 1,4,5,6,14,15. Keys 14 and 15 kis indices par stored honge?',
    options:['A · 2 and 5','B · 2 and 6','C · 4 and 5','D · 4 and 6'],
    answer:'D · 4 and 6',
    why:'1→3, 4→2, 5→5, 6→8. 14 ka home 2 occupied, 3 occupied, 4 free → slot 4. 15 ka home 5 occupied, 6 free → slot 6.',
    trace:'<div class="table-wrap"><table><thead><tr><th>Insert</th><th>h(x)</th><th>Probe path</th><th>Final</th></tr></thead><tbody><tr><td>1</td><td>3</td><td>3 free</td><td>3</td></tr><tr><td>4</td><td>2</td><td>2 free</td><td>2</td></tr><tr><td>5</td><td>5</td><td>5 free</td><td>5</td></tr><tr><td>6</td><td>8</td><td>8 free</td><td>8</td></tr><tr><td>14</td><td>2</td><td>2 full → 3 full → 4 free</td><td>4</td></tr><tr><td>15</td><td>5</td><td>5 full → 6 free</td><td>6</td></tr></tbody></table></div>'
  },
  {
    year:'2024',number:'Q16',kind:'CROSS-TOPIC · DS MATCHING',title:'Lookup operation matches hash tables',
    question:'FIFO, Lookup Operation, LIFO ko Queues, Hash Tables, Stacks se match karna tha. Lookup kis structure ka signature hai?',
    options:['A · Hash Tables','B · Queues','C · Stacks','D · Binary heaps'],
    answer:'A · Hash Tables',
    why:'FIFO → queue; LIFO → stack; fast key-based lookup → hash table. Original paper mein full matching ka option A hai; yahan lookup part focus hai.'
  }
]
const pyqMarkup = pyqs.map(item => `<details class="pyq-card searchable"><summary><span class="year">${item.year}<small>${item.number}</small></span><span><b>${item.title}</b><small>${item.kind}</small></span><i>＋</i></summary><div class="pyq-body"><div class="answer"><span>Verified answer</span><strong>${item.answer}</strong></div><div class="pyq-question"><h4>Paper question · concise transcript</h4><p>${item.question}</p><div class="hash-pyq-options">${item.options.map(option=>`<span>${option}</span>`).join('')}</div>${item.trace||''}</div><aside class="transfer"><strong>Why?</strong><p>${item.why}</p></aside></div></details>`).join('')
const revision = `<section class="revision-grid searchable" data-title="Hashing Quick Revision"><article><span>01 · ROUTE</span><h3>Hash vs index</h3><p>Raw hash may be large. <code>% m</code> gives candidate slot 0…m−1; equality confirms key.</p></article><article><span>02 · COLLISION</span><h3>Different key, same slot</h3><p>Chaining stores a list; probing searches alternative slots.</p></article><article><span>03 · PROBES</span><h3>Linear / quadratic</h3><p>Linear: (h+i)%m. Quadratic: (h+i²)%m. Start with i=0.</p></article><article><span>04 · LOAD</span><h3>α=n/m</h3><p>Open addressing α&lt;1 before insert; chaining can have α&gt;1.</p></article><article><span>05 · COMPLEXITY</span><h3>Expected vs worst</h3><p>Expected O(1) under good hashing; worst O(n). Long key hash can cost O(L).</p></article><article><span>06 · PYTHON</span><h3>dict / set</h3><p>dict key→value; set distinct keys. Set order is not sorted/insertion order.</p></article></section>
`

document.querySelector('#app').innerHTML = `
<div class="read-progress"><span></span></div>
<header class="topbar"><a class="brand" href="#top"><b>DA</b><span><strong>Python + DSA</strong><small>GATE 2027 Notebook</small></span></a><nav><button class="tab active" data-view="notes">Detailed Notes</button><button class="tab" data-view="pyq">PYQ Evidence <i>2+1</i></button><button class="tab" data-view="practice">Practice <i>${module10QuestionCount}</i></button><button class="tab" data-view="revision">Revision</button></nav><div class="actions"><button id="searchButton" aria-label="Search">⌕</button><button id="themeButton" aria-label="Theme">◐</button></div></header>
<div class="searchbox"><input id="search" type="search" placeholder="Search: hash, probing, load factor, dict, two-sum…"><span>Search current view</span></div>
<div class="layout" id="top"><aside class="sidebar"><p class="overline">Module 10</p><h2>Hashing</h2><div class="module-switch"><a href="./index.html">M01</a><a href="./module2.html">M02</a><a href="./module3.html">M03</a><a href="./module4.html">M04</a><a href="./module5.html">M05</a><a href="./module6.html">M06</a><a href="./module7.html">M07</a><a href="./module8.html">M08</a><a href="./module9.html">M09</a><a class="active" href="./module10.html">M10</a></div><div class="completion"><span><b>Lecture progress</b><i id="count">0/${lectureData.length}</i></span><div><i id="bar"></i></div></div><nav id="toc"></nav><p class="source"><b>Sources</b>Supplied CampusX Hashing notebooks · supplied GATE DA syllabus & 2024–2026 papers · <a href="https://docs.python.org/3/library/stdtypes.html" target="_blank" rel="noopener">Python built-in types</a></p></aside><main>
<div class="view active" data-panel="notes">
<section class="hero searchable" data-title="Overview"><p class="eyebrow"><i></i> Module 10 · start with one key</p><h1>“bat” ko <em>sahi box</em> tak kaise pahunchayein?</h1><p>Pehle key aur numbered boxes samjhenge. Phir har letter ka number nikaal kar dekhenge ki key kis box mein jaati hai. Uske baad hi collisions aur unke solutions aayenge—koi pointer ya hash-table knowledge assume nahi kar rahe.</p><div class="metrics"><span><b>${lectureData.length}</b>lecture sessions</span><span><b>${module10QuestionCount}</b>lecture-wise drills</span><span><b>2</b>direct PYQs</span></div><div class="syllabus"><b>GATE DA syllabus map</b>Section 4 explicitly includes hash tables. Supplied 2024–2026 papers mein 2024 Q21 and 2025 Q18 direct hashing tests mile.</div></section>
<section class="lecture-track searchable" id="lecture-track" data-title="Module 10 lecture tracker"><div class="track-head"><div><p class="eyebrow"><i></i> Exact lecture sequence</p><h2>Module 10 · Lecture Tracker</h2><p>Screenshot ka 10.1–10.9 order. Har lecture ke baad 50 GATE-style practice variants.</p></div><strong id="lecturePercent">0%</strong></div><div class="lecture-list">${tracker}</div></section>
${mentalModelMarkup}
${lessonMarkup}
</div>
<div class="view" data-panel="pyq"><section class="page-hero searchable" data-title="Hashing PYQ Evidence"><p class="eyebrow"><i></i> Supplied paper evidence</p><h1>Hashing PYQ Lab</h1><p>2024 Q21 load factor/probes and 2025 Q18 linear probing are direct. 2024 Q16 is a broader DS-matching question; separately labelled cross-topic.</p><div class="practice-summary"><span><b>2</b>direct PYQs</span><span><b>1</b>cross-topic</span><span><b>2024–25</b>verified</span></div></section><section class="pyq-list">${pyqMarkup}</section></div>
<div class="view" data-panel="practice"><section class="page-hero practice-head searchable" data-title="Practice Lab"><p class="eyebrow"><i></i> Lecture-wise GATE drills</p><h1>Module 10 Practice</h1><p>${module10QuestionCount} original practice variants · ${lectureData.length} lecture sets · 50 questions per set. Ye PYQs nahi hain.</p><div class="practice-summary"><span><b>${lectureData.length}</b>lecture sets</span><span><b>50</b>each</span><span><b>saved</b>attempt progress</span></div></section><section class="practice-controls searchable"><div><label for="practiceTopic">Lecture topic</label><select id="practiceTopic">${topicOptions}</select></div><div><label for="practiceDifficulty">Difficulty</label><select id="practiceDifficulty"><option value="all">All levels</option><option>Foundation</option><option>Core</option><option>GATE</option></select></div><div class="practice-score"><span>Attempted</span><b id="practiceScore">0/0</b></div></section><section class="practice-context" id="practiceContext"></section><section class="question-list" id="questionList"></section></div>
<div class="view" data-panel="revision"><section class="page-hero revision-head searchable" data-title="Hashing revision"><p class="eyebrow"><i></i> GATE DA · quick recall</p><h1>Hashing Quick Revision</h1><p>Hash, bucket, collision, probing, load factor, complexity ek jagah.</p><button id="print">Print sheet</button></section>${revision}</div>
</main></div><button class="menu" id="menu">☰</button><div class="toast">Copied</div>`

const tabs=[...document.querySelectorAll('.tab')]
const panels=[...document.querySelectorAll('.view')]
const practiceTopic=document.querySelector('#practiceTopic')
const practiceDifficulty=document.querySelector('#practiceDifficulty')
const searchInput=document.querySelector('#search')
function setView(view){tabs.forEach(tab=>tab.classList.toggle('active',tab.dataset.view===view));panels.forEach(panel=>panel.classList.toggle('active',panel.dataset.panel===view));window.scrollTo({top:0,behavior:'smooth'})}
tabs.forEach(tab=>tab.onclick=()=>setView(tab.dataset.view))
function renderPractice(){
  const topic=module10Topics.find(item=>item.id===practiceTopic.value)
  const questions=topic.questions.filter(item=>practiceDifficulty.value==='all'||item.difficulty===practiceDifficulty.value)
  const saved=JSON.parse(localStorage.getItem('da-m10-practice')||'{}')
  const key=item=>`${topic.id}-${item.id}`
  const updateScore=()=>{
    const attempted=questions.filter(item=>saved[key(item)]).length
    const correct=questions.filter(item=>saved[key(item)]?.correct).length
    document.querySelector('#practiceScore').textContent=`${attempted}/${questions.length} · ${correct} correct`
  }
  updateScore()
  document.querySelector('#practiceContext').innerHTML=`<div><span>LECTURE TOPIC</span><h2>${esc(topic.label)}</h2><p>GATE-style option choose karo; sahi/galat aur short explanation immediately dikhegi.</p></div><strong>${questions.length} shown</strong>`
  document.querySelector('#questionList').innerHTML=questions.map((item,i)=>{
    const choice=saved[key(item)]?.selection
    const answered=typeof choice==='string'
    const correct=choice===item.answer
    return `<article class="question-card ${answered?correct?'answered-correct':'answered-wrong':''}" data-question-index="${i}"><div class="question-card-meta"><span>Q${String(i+1).padStart(2,'0')}</span><small>${esc(item.difficulty)}</small></div><h3>${esc(item.prompt)}</h3><div class="options" role="group" aria-label="Question ${i+1} options">${item.options.map((option,index)=>`<button type="button" data-option-index="${index}" class="${answered&&option===item.answer?'correct':''} ${answered&&option===choice&&!correct?'wrong':''}" ${answered?'disabled':''}><b>${String.fromCharCode(65+index)}</b><span>${esc(option)}</span></button>`).join('')}</div><div class="question-feedback ${answered?correct?'is-correct':'is-wrong':''}" role="status" ${answered?'':'hidden'}><strong>${answered?correct?'✓ Sahi jawab':'✗ Galat jawab':''}</strong><p><b>Correct option:</b> ${esc(item.answer)}</p><p>${esc(item.explanation)}</p></div></article>`
  }).join('')
  document.querySelectorAll('.question-card .options button').forEach(button=>button.onclick=()=>{
    const card=button.closest('.question-card')
    const item=questions[Number(card.dataset.questionIndex)]
    const selection=item.options[Number(button.dataset.optionIndex)]
    if(saved[key(item)]?.selection)return
    const correct=selection===item.answer
    saved[key(item)]={selection,correct}
    localStorage.setItem('da-m10-practice',JSON.stringify(saved))
    card.classList.add(correct?'answered-correct':'answered-wrong')
    card.querySelectorAll('.options button').forEach(optionButton=>{
      const value=item.options[Number(optionButton.dataset.optionIndex)]
      optionButton.disabled=true
      optionButton.classList.toggle('correct',value===item.answer)
      optionButton.classList.toggle('wrong',value===selection&&!correct)
    })
    const feedback=card.querySelector('.question-feedback')
    feedback.hidden=false
    feedback.classList.add(correct?'is-correct':'is-wrong')
    feedback.querySelector('strong').textContent=correct?'✓ Sahi jawab':'✗ Galat jawab'
    updateScore()
  })
}
practiceTopic.onchange=renderPractice
practiceDifficulty.onchange=renderPractice
renderPractice()

const toc=document.querySelector('#toc')
toc.innerHTML=[...document.querySelectorAll('[data-panel="notes"] .searchable')].map((section,i)=>`<a href="#${section.id||'top'}"><span>${String(i+1).padStart(2,'0')}</span>${section.dataset.title}</a>`).join('')
const stored=JSON.parse(localStorage.getItem('da-m10-lectures')||'{}')
const checks=[...document.querySelectorAll('[data-lecture]')]
function refreshProgress(){
  const done=checks.filter(check=>check.checked).length
  document.querySelector('#count').textContent=`${done}/${lectureData.length}`
  document.querySelector('#bar').style.width=`${done/lectureData.length*100}%`
  document.querySelector('#lecturePercent').textContent=`${Math.round(done/lectureData.length*100)}%`
}
checks.forEach(check=>{check.checked=Boolean(stored[check.dataset.lecture]);check.onchange=()=>{stored[check.dataset.lecture]=check.checked;localStorage.setItem('da-m10-lectures',JSON.stringify(stored));refreshProgress()}})
refreshProgress()
module10Topics.forEach(topic=>{document.getElementById(topic.id).insertAdjacentHTML('beforeend',`<button class="topic-practice" data-practice-topic="${topic.id}">Is topic ke ${topic.questions.length} questions solve karo →</button>`)})
document.querySelectorAll('[data-practice-topic]').forEach(button=>button.onclick=()=>{practiceTopic.value=button.dataset.practiceTopic;practiceDifficulty.value='all';renderPractice();setView('practice')})
document.querySelectorAll('.codebox button').forEach(button=>button.onclick=async()=>{await navigator.clipboard.writeText(button.closest('.codebox').querySelector('code').textContent);const toast=document.querySelector('.toast');toast.classList.add('show');setTimeout(()=>toast.classList.remove('show'),1200)})
document.querySelector('#searchButton').onclick=()=>{document.querySelector('.searchbox').classList.toggle('open');searchInput.focus()}
searchInput.oninput=()=>{const term=searchInput.value.toLowerCase();document.querySelector('.view.active').querySelectorAll('.searchable').forEach(section=>section.hidden=Boolean(term)&&!section.textContent.toLowerCase().includes(term))}
document.querySelector('#themeButton').onclick=()=>{document.documentElement.classList.toggle('dark');localStorage.setItem('da-theme',document.documentElement.classList.contains('dark')?'dark':'light')}
if(localStorage.getItem('da-theme')!=='light')document.documentElement.classList.add('dark')
document.querySelector('#menu').onclick=()=>document.querySelector('.sidebar').classList.toggle('open')
document.querySelector('[data-jump="practice"]').onclick=()=>setView('practice')
document.querySelector('#print').onclick=()=>window.print()
const read=document.querySelector('.read-progress span')
window.addEventListener('scroll',()=>{const h=document.documentElement.scrollHeight-window.innerHeight;read.style.width=`${h?window.scrollY/h*100:0}%`})

function mountHashLab(){
  const keyInput=document.querySelector('#hashKey')
  const sizeInput=document.querySelector('#hashSize')
  const methodInput=document.querySelector('#hashMethod')
  const output=document.querySelector('#hashLabResult')
  const render=()=>{
    const key=keyInput.value
    const size=Math.max(2,Math.min(31,Number(sizeInput.value)||5))
    if(!key){output.innerHTML='<p class="hash-lab-empty">At least one character enter karo.</p>';return}
    if(methodInput.value==='builtin'){
      const pythonCode=`key = ${JSON.stringify(key)}\ntable_size = ${size}\nraw_hash = hash(key)\nbucket = raw_hash % table_size\nprint(raw_hash, bucket)`
      output.innerHTML=`<div class="hash-formula"><span>PYTHON BUILT-IN · AVAILABLE FORMULA</span><code>raw_hash = hash(key)</code><code>bucket = raw_hash % ${size}</code><p>Yahan <code>hash()</code> ke andar ka character-by-character rule Python runtime implement karta hai; isliye custom methods jaisi numeric trace banana honest nahi hoga.</p></div><div class="hash-lab-result"><div><span>RAW HASH</span><b>Python runtime computes it</b></div><div><span>MODULO ${size}</span><b>bucket 0…${size-1}</b></div></div><div class="hash-builtin-example"><span>RUN THIS IN PYTHON · CURRENT KEY AND TABLE SIZE</span><pre><code>${esc(pythonCode)}</code></pre></div><div class="hash-buckets" role="img" aria-label="Python hash will choose one of ${size} candidate buckets">${Array.from({length:size},(_,i)=>`<div class="hash-bucket"><span>${i}</span><strong>?</strong></div>`).join('')}</div><p class="hash-lab-note"><b>Why no highlighted bucket?</b> Browser ka JavaScript Python ke built-in string <code>hash()</code> ka exact result nahi nikal sakta. Python mein code run karne par <code>raw_hash</code> aur us run ka actual bucket print honge. Same process mein same key ka hash repeatable hai; new process mein string hash change ho sakta hai. Exam mein hash function specified ho toh wahi use karo.</p>`
      return
    }
    const method=methodInput.value
    const start=method==='simple'?0n:method==='polynomial'?1n:5381n
    const rule=method==='simple'?'h = h + ord(ch)':method==='polynomial'?'h = 31 × h + ord(ch)':'h = 33 × h + ord(ch)'
    const reason=method==='simple'?'Purane total mein current character ka code add karo.':method==='polynomial'?'Purane h ko 31 se multiply karo, phir current character ka code add karo.':'Purane h ko 33 se multiply karo, phir current character ka code add karo. Code mein (h << 5) + h ka matlab 32h + h = 33h hai.'
    let h=start
    const rows=[]
    for(const ch of key){
      const before=h
      const code=BigInt(ch.codePointAt(0))
      h=method==='simple'?h+code:method==='polynomial'?h*31n+code:h*33n+code
      const calculation=method==='simple'?`${before} + ${code} = ${h}`:`${before} × ${method==='polynomial'?31:33} + ${code} = ${h}`
      rows.push(`<tr><td>${esc(ch)}</td><td>${code}</td><td>${before}</td><td><code>${calculation}</code></td><td><strong>${h}</strong></td></tr>`)
    }
    const index=Number(h%BigInt(size))
    output.innerHTML=`<div class="hash-formula"><span>HAR CHARACTER PAR YEH RULE LAGEGA</span><code>${rule}</code><p>Start: <code>h = ${start}</code>. ${reason} <strong>h before</strong> = current character padhne se pehle wala h; <strong>h after</strong> = calculation ke baad naya h.</p></div><div class="table-wrap hash-calculation-table"><table><thead><tr><th>Character</th><th>ord()</th><th>h before</th><th>Is step ki calculation</th><th>h after</th></tr></thead><tbody>${rows.join('')}</tbody></table></div><div class="hash-lab-result"><div><span>RAW HASH · LAST h AFTER</span><b>${h}</b></div><div><span>TABLE INDEX · REMAINDER</span><b>${h} % ${size} = ${index} → bucket ${index}</b></div></div><div class="hash-buckets" role="img" aria-label="Candidate bucket ${index}">${Array.from({length:size},(_,i)=>`<div class="hash-bucket ${i===index?'active':''}"><span>${i}</span><strong>${i===index?'← key maps here':'·'}</strong></div>`).join('')}</div><p class="hash-lab-note">${esc(key)} maps to bucket ${index}. Koi aur key same bucket mein aaye toh equality check aur collision policy still needed.</p>`
  }
  ;[keyInput,sizeInput,methodInput].forEach(input=>input.addEventListener('input',render))
  render()
}
mountHashLab()
