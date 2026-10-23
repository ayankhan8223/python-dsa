import './style.css'
import { applyNotePointers } from './notePointers.js'
import { lectureData, lessonMarkup, treePyqRevision, treeRevisionMarkup } from './module12Lessons.js'
import { module12Topics, module12QuestionCount } from './practice12.js'

const esc = value => String(value).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;')
const tracker = lectureData.map(([no,title,note]) => `<label><input type="checkbox" data-lecture="${no}"><span><b>${no}</b><i>${title}</i><small>${note}</small></span></label>`).join('')
const topicOptions = module12Topics.map(topic => `<option value="${topic.id}">${esc(topic.label)} (${topic.questions.length})</option>`).join('')
const links = Array.from({length:10},(_,i)=>`<a href="${i?'./module'+(i+1)+'.html':'./index.html'}">M${String(i+1).padStart(2,'0')}</a>`).join('')
const paperUrl = 'https://gate2024.iisc.ac.in/wp-content/uploads/2024/DA24S1.pdf'
const keyUrl = 'https://gate2024.iisc.ac.in/wp-content/uploads/2024/DAFinalAnswerKey.pdf'
const pyqs = [
  {number:'Q28',title:'Full binary tree reconstruction',prompt:'Full binary tree ke traversal choices: (A) preorder + inorder, (B) inorder + postorder, (C) preorder + postorder, (D) inorder only. Distinct node labels maan kar kaun se pairs tree ko uniquely reconstruct karte hain?',options:['A','B','C','D'],correct:['A','B','C'],why:'Answer A, B, C. Step 1: preorder first ya postorder last se root milta hai. Step 2: inorder root ke left/right subtree ko split karta hai, so A/B sufficient. Step 3: full tree mein every internal node ke two children fixed hain; pre+post ka one-child ambiguity nahi bachta, so C bhi sufficient. D mein root/shape unknown hai. Concept: traversal-pair uniqueness under full-tree assumption.'},
  {number:'Q52',title:'Binary tree height, leaves and nodes',prompt:'Rooted binary tree: H=edge-height, I=internal nodes, L=leaves, N=total nodes. Always true? (A) L≤I+1; (B) H+1≤N≤2^(H+1)−1; (C) H≤I≤2^H−1; (D) H≤L≤2^(H−1).',options:['A','B','C','D'],correct:['A','B','C'],why:'Answer A, B, C. A: N−1 edges ≤2I because each internal node has at most two children; N=I+L gives L≤I+1. B: one height-H path needs H+1 nodes; filling all levels yields 2^(H+1)−1. C: the path needs H internal nodes; levels above deepest have at most 1+2+…+2^(H−1)=2^H−1. D fails for a long chain (H=2, L=1). Concept: bounds depend on binary shape and edge-height convention.'}
]
const pyqMarkup = pyqs.map(item => `<article class="question-card tree-pyq" data-pyq="${item.number}"><div class="question-card-meta"><span>2024 DA ${item.number}</span><small>VERIFIED PYQ · PARAPHRASED MSQ</small></div><h3>${item.title}</h3><p>${item.prompt}</p><div class="tree-pyq-options">${item.options.map(option=>`<label><input type="checkbox" value="${option}"><b>${option}</b></label>`).join('')}</div><button type="button" class="tree-pyq-check">Check answer</button><div class="question-feedback" hidden role="status"></div><p class="tree-source-links"><a href="${paperUrl}" target="_blank" rel="noopener">Official question paper ↗</a> · <a href="${keyUrl}" target="_blank" rel="noopener">Final answer key ↗</a></p></article>`).join('')
const revision = `<section class="revision-grid searchable" data-title="Trees Quick Revision"><article><span>01 · HEIGHT</span><h3>Nodes first, edges second</h3><p>10-root example: depth_in_nodes(root,10)=1; height_in_nodes(root)=4. Nonempty path ke edges = nodes−1, so root edge-depth 0 aur tree edge-height 3. Missing-target 0 par subtract mat karo.</p></article><article><span>02 · DFS</span><h3>N-L-R / L-N-R / L-R-N</h3><p>Print position decides preorder, inorder, postorder. BST inorder gives ascending values.</p></article><article><span>03 · BFS</span><h3>FIFO queue</h3><p>Pop front; append every child at rear. O(n) time and up to O(n) width space.</p></article><article><span>04 · BST</span><h3>Global invariant</h3><p>All left descendants smaller; all right descendants larger. Search/insert/delete O(h), not always O(log n).</p></article><article><span>05 · DELETE</span><h3>Three cases</h3><p>0 child → None. 1 child → child. 2 children → successor from right subtree, then remove old successor.</p></article><article><span>06 · TREE DP</span><h3>Children → parent</h3><p>Base case on None; postorder child results combine. Max-path global candidate may use both gains; returned gain only one.</p></article></section>`

document.querySelector('#app').innerHTML = `
<div class="read-progress"><span></span></div>
<header class="topbar"><a class="brand" href="#top"><b>DA</b><span><strong>Python + DSA</strong><small>GATE 2027 Notebook</small></span></a><nav><button class="tab active" data-view="notes">Detailed Notes</button><button class="tab" data-view="pyq">PYQ Evidence <i>2</i></button><button class="tab" data-view="practice">Practice <i>${module12QuestionCount}</i></button><button class="tab" data-view="revision">Revision</button></nav><div class="actions"><button id="searchButton" aria-label="Search">⌕</button><button id="themeButton" aria-label="Theme">◐</button></div></header>
<div class="searchbox"><input id="search" type="search" placeholder="Search: preorder, BST, height, LCA…"><span>Search current view</span></div>
<div class="layout" id="top"><aside class="sidebar"><p class="overline">Module 12</p><h2>Trees</h2><div class="module-switch">${links}<a class="active" href="./module12.html">M12</a><a href="./module13.html">M13</a></div><div class="completion"><span><b>Lecture progress</b><i id="count">0/${lectureData.length}</i></span><div><i id="bar"></i></div></div><nav id="toc"></nav><p class="source"><b>Sources</b>Supplied CampusX Trees notebooks · supplied GATE DA Section 4 syllabus · <a href="${paperUrl}" target="_blank" rel="noopener">GATE 2024 DA paper</a> and <a href="${keyUrl}" target="_blank" rel="noopener">final key</a></p></aside><main>
<div class="view active" data-panel="notes">
<section class="hero searchable" data-title="Overview"><p class="eyebrow"><i></i> Module 12 · start at the root</p><h1>Tree ko <em>branch by branch</em> trace karo.</h1><p>Ek hi example A–F se terms, traversals aur recursion samjhenge; phir BST aur N-ary tree par har link, comparison aur return value manually follow karenge.</p><div class="metrics"><span><b>${lectureData.length}</b>lecture sessions</span><span><b>${module12QuestionCount}</b>generated drills</span><span><b>2</b>direct 2024 PYQs</span></div><div class="syllabus"><b>GATE DA syllabus map</b>Section 4 explicitly includes trees. Lecture flow exactly 12.1–12.9 follows supplied screenshots; advanced coding-problem topics reinforce recursion and tree traversal.</div></section>
<section class="lecture-track searchable" id="lecture-track" data-title="Module 12 lecture tracker"><div class="track-head"><div><p class="eyebrow"><i></i> Course lecture order</p><h2>Module 12 · Lecture Tracker</h2><p>Each lecture ke end par same-topic practice link hai. Progress locally saved rahega.</p></div><strong id="lecturePercent">0%</strong></div><div class="lecture-list">${tracker}</div></section>
${lessonMarkup}
</div>
<div class="view" data-panel="pyq"><section class="page-hero searchable" data-title="Trees PYQ Evidence"><p class="eyebrow"><i></i> Official 2024 DA paper + labelled practice</p><h1>Tree PYQ Revision</h1><p>Verified 2024 DA Q28 reconstruction aur Q52 properties ke paraphrased MSQs. Options select karke answer check karo; official key dono mein A, B, C hai. Neeche ka GATE-style practice original hai, PYQ nahi.</p><div class="practice-summary"><span><b>2</b>verified PYQs</span><span><b>MSQ</b>multiple correct</span><span><b>2024</b>official key</span></div></section><section class="pyq-list">${pyqMarkup}</section>${treePyqRevision}</div>
<div class="view" data-panel="practice"><section class="page-hero practice-head searchable" data-title="Practice Lab"><p class="eyebrow"><i></i> Lecture-wise GATE-style drills</p><h1>Module 12 Practice</h1><p>${module12QuestionCount} generated practice variants · ${lectureData.length} lecture sets · 50 per lecture. Ye PYQs nahi hain.</p><div class="practice-summary"><span><b>${lectureData.length}</b>lecture sets</span><span><b>50</b>each</span><span><b>saved</b>attempt progress</span></div></section><section class="practice-controls searchable"><div><label for="practiceTopic">Lecture topic</label><select id="practiceTopic">${topicOptions}</select></div><div><label for="practiceDifficulty">Difficulty</label><select id="practiceDifficulty"><option value="all">All levels</option><option>Foundation</option><option>Core</option><option>GATE</option></select></div><div class="practice-score"><span>Attempted</span><b id="practiceScore">0/0</b></div></section><section class="practice-context" id="practiceContext"></section><section class="question-list" id="questionList"></section></div>
<div class="view" data-panel="revision"><section class="page-hero revision-head searchable" data-title="Trees revision"><p class="eyebrow"><i></i> GATE DA · quick recall</p><h1>Trees Quick Revision</h1><p>Height convention, tree types, formulas, traversal, BST cost aur final checklist ek jagah.</p><button id="print">Print sheet</button></section>${revision}${treeRevisionMarkup}</div>
</main></div><button class="menu" id="menu">☰</button><div class="toast">Copied</div>`

document.querySelectorAll('.tree-diagram.is-wide .tree-diagram-scroll').forEach(scroll => {
  scroll.scrollLeft = (scroll.scrollWidth - scroll.clientWidth) / 2
})

document.querySelectorAll('.traversal-plate').forEach(plate => {
  const buttons = [...plate.querySelectorAll('.traversal-plate-controls button')]
  buttons.forEach(button => button.addEventListener('click', () => {
    const step = button.dataset.plateStep
    buttons.forEach(item => item.setAttribute('aria-pressed', String(item === button)))
    plate.querySelectorAll('svg [data-plate-step]').forEach(item => {
      item.classList.toggle('is-active', item.dataset.plateStep === step)
    })
  }))
})

document.querySelectorAll('[data-bst-trace]').forEach(trace => {
  const frames = [...trace.querySelectorAll('[data-trace-frame]')]
  const previous = trace.querySelector('[data-trace-prev]')
  const next = trace.querySelector('[data-trace-next]')
  const count = trace.querySelector('[data-trace-count]')
  let index = 0
  const render = () => {
    frames.forEach((frame, frameIndex) => { frame.hidden = frameIndex !== index })
    previous.disabled = index === 0
    next.disabled = index === frames.length - 1
    count.textContent = `${index + 1} / ${frames.length}`
    const scroll = frames[index].querySelector('.tree-diagram-scroll')
    scroll.scrollLeft = (scroll.scrollWidth - scroll.clientWidth) / 2
  }
  previous.addEventListener('click', () => { index--; render() })
  next.addEventListener('click', () => { index++; render() })
  render()
})

document.querySelectorAll('[data-depth-lab]').forEach(lab => {
  const depthPaths = { 10:[10], 20:[10,20], 30:[10,30], 40:[10,20,40], 50:[10,20,50], 60:[10,20,50,60] }
  const heightPaths = { 10:[10,20,50,60], 20:[20,50,60], 30:[30], 40:[40], 50:[50,60], 60:[60] }
  let selected = 50
  let mode = 'depth'
  const route = path => path.join(' → ')
  const render = () => {
    lab.dataset.mode = mode
    const path = mode === 'tree' ? heightPaths[10] : mode === 'height' ? heightPaths[selected] : depthPaths[selected]
    const activeEdges = new Set(path.slice(1).map((value, index) => `${path[index]}-${value}`))
    lab.querySelectorAll('[data-depth-node]').forEach(button => button.setAttribute('aria-pressed', String(Number(button.dataset.depthNode) === selected)))
    lab.querySelectorAll('[data-depth-mode]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.depthMode === mode)))
    lab.querySelectorAll('[data-depth-svg-node]').forEach(node => {
      const value = Number(node.dataset.depthSvgNode)
      node.classList.toggle('is-path', path.includes(value))
      node.classList.toggle('is-selected', value === selected)
    })
    lab.querySelectorAll('[data-depth-edge]').forEach(edge => edge.classList.toggle('is-path', activeEdges.has(edge.dataset.depthEdge)))
    const depthNodes = depthPaths[selected].length
    const heightNodes = heightPaths[selected].length
    const depthEdges = depthNodes - 1
    const heightEdges = heightNodes - 1
    lab.querySelector('[data-depth-value]').textContent = `${depthNodes} ${depthNodes === 1 ? 'node' : 'nodes'} · ${depthEdges} ${depthEdges === 1 ? 'edge' : 'edges'}`
    lab.querySelector('[data-depth-route]').textContent = route(depthPaths[selected])
    lab.querySelector('[data-height-value]').textContent = `${heightNodes} ${heightNodes === 1 ? 'node' : 'nodes'} · ${heightEdges} ${heightEdges === 1 ? 'edge' : 'edges'}`
    lab.querySelector('[data-height-route]').textContent = route(heightPaths[selected])
    lab.querySelector('[data-depth-lab-caption]').textContent = mode === 'tree'
      ? 'Whole tree: ' + route(path) + ' · 4 nodes / 3 edges.'
      : mode === 'height'
        ? `Height of ${selected}: ${route(path)} · ${heightNodes} ${heightNodes === 1 ? 'node' : 'nodes'} / ${heightEdges} ${heightEdges === 1 ? 'edge' : 'edges'} downward.`
        : `Depth of ${selected}: ${route(path)} · ${depthNodes} ${depthNodes === 1 ? 'node' : 'nodes'} / ${depthEdges} ${depthEdges === 1 ? 'edge' : 'edges'} from root.`
  }
  lab.querySelectorAll('[data-depth-node]').forEach(button => button.addEventListener('click', () => { selected = Number(button.dataset.depthNode); if (mode === 'tree') mode = 'depth'; render() }))
  lab.querySelectorAll('[data-depth-mode]').forEach(button => button.addEventListener('click', () => { mode = button.dataset.depthMode; if (mode === 'tree') selected = 10; render() }))
  render()
})

applyNotePointers()
const tabs=[...document.querySelectorAll('.tab')]
const panels=[...document.querySelectorAll('.view')]
const practiceTopic=document.querySelector('#practiceTopic')
const practiceDifficulty=document.querySelector('#practiceDifficulty')
const searchInput=document.querySelector('#search')
function setView(view){tabs.forEach(tab=>tab.classList.toggle('active',tab.dataset.view===view));panels.forEach(panel=>panel.classList.toggle('active',panel.dataset.panel===view));window.scrollTo({top:0,behavior:'smooth'})}
tabs.forEach(tab=>tab.onclick=()=>setView(tab.dataset.view))

function renderPractice(){
  const topic=module12Topics.find(item=>item.id===practiceTopic.value)
  const questions=topic.questions.filter(item=>practiceDifficulty.value==='all'||item.difficulty===practiceDifficulty.value)
  const saved=JSON.parse(localStorage.getItem('da-m12-practice')||'{}')
  const key=item=>`${topic.id}-${item.id}`
  const updateScore=()=>{const attempted=questions.filter(item=>saved[key(item)]).length;const correct=questions.filter(item=>saved[key(item)]?.correct).length;document.querySelector('#practiceScore').textContent=`${attempted}/${questions.length} · ${correct} correct`}
  updateScore()
  document.querySelector('#practiceContext').innerHTML=`<div><span>LECTURE TOPIC</span><h2>${esc(topic.label)}</h2><p>Option choose karo; sahi/galat aur short reasoning immediately dikhegi.</p></div><strong>${questions.length} shown</strong>`
  document.querySelector('#questionList').innerHTML=questions.map((item,i)=>{const choice=saved[key(item)]?.selection;const answered=typeof choice==='string';const correct=choice===item.answer;return `<article class="question-card ${answered?correct?'answered-correct':'answered-wrong':''}" data-question-index="${i}"><div class="question-card-meta"><span>Q${String(i+1).padStart(2,'0')}</span><small>${esc(item.difficulty)}</small></div><h3>${esc(item.prompt)}</h3><div class="options" role="group" aria-label="Question ${i+1} options">${item.options.map((option,index)=>`<button type="button" data-option-index="${index}" class="${answered&&option===item.answer?'correct':''} ${answered&&option===choice&&!correct?'wrong':''}" ${answered?'disabled':''}><b>${String.fromCharCode(65+index)}</b><span>${esc(option)}</span></button>`).join('')}</div><div class="question-feedback ${answered?correct?'is-correct':'is-wrong':''}" role="status" ${answered?'':'hidden'}><strong>${answered?correct?'✓ Sahi jawab':'✗ Galat jawab':''}</strong><p><b>Correct option:</b> ${esc(item.answer)}</p><p>${esc(item.explanation)}</p></div></article>`}).join('')
  document.querySelectorAll('.question-card .options button').forEach(button=>button.onclick=()=>{const card=button.closest('.question-card');const item=questions[Number(card.dataset.questionIndex)];const selection=item.options[Number(button.dataset.optionIndex)];if(saved[key(item)]?.selection)return;const correct=selection===item.answer;saved[key(item)]={selection,correct};localStorage.setItem('da-m12-practice',JSON.stringify(saved));card.classList.add(correct?'answered-correct':'answered-wrong');card.querySelectorAll('.options button').forEach(optionButton=>{const value=item.options[Number(optionButton.dataset.optionIndex)];optionButton.disabled=true;optionButton.classList.toggle('correct',value===item.answer);optionButton.classList.toggle('wrong',value===selection&&!correct)});const feedback=card.querySelector('.question-feedback');feedback.hidden=false;feedback.classList.add(correct?'is-correct':'is-wrong');feedback.querySelector('strong').textContent=correct?'✓ Sahi jawab':'✗ Galat jawab';updateScore()})
}
practiceTopic.onchange=renderPractice
practiceDifficulty.onchange=renderPractice
renderPractice()

const toc=document.querySelector('#toc')
toc.innerHTML=[...document.querySelectorAll('[data-panel="notes"] .searchable')].map((item,i)=>`<a href="#${item.id||'top'}"><span>${String(i+1).padStart(2,'0')}</span>${item.dataset.title}</a>`).join('')
const stored=JSON.parse(localStorage.getItem('da-m12-lectures')||'{}')
const checks=[...document.querySelectorAll('[data-lecture]')]
function refreshProgress(){const done=checks.filter(check=>check.checked).length;document.querySelector('#count').textContent=`${done}/${lectureData.length}`;document.querySelector('#bar').style.width=`${done/lectureData.length*100}%`;document.querySelector('#lecturePercent').textContent=`${Math.round(done/lectureData.length*100)}%`}
checks.forEach(check=>{check.checked=Boolean(stored[check.dataset.lecture]);check.onchange=()=>{stored[check.dataset.lecture]=check.checked;localStorage.setItem('da-m12-lectures',JSON.stringify(stored));refreshProgress()}})
refreshProgress()
module12Topics.forEach(topic=>document.getElementById(topic.id).insertAdjacentHTML('beforeend',`<button class="topic-practice" data-practice-topic="${topic.id}">Is topic ke ${topic.questions.length} questions solve karo →</button>`))
document.querySelectorAll('[data-practice-topic]').forEach(button=>button.onclick=()=>{practiceTopic.value=button.dataset.practiceTopic;practiceDifficulty.value='all';renderPractice();setView('practice')})
document.querySelectorAll('.codebox button').forEach(button=>button.onclick=async()=>{await navigator.clipboard.writeText(button.closest('.codebox').querySelector('code').textContent);const toast=document.querySelector('.toast');toast.classList.add('show');setTimeout(()=>toast.classList.remove('show'),1200)})
document.querySelector('#searchButton').onclick=()=>{document.querySelector('.searchbox').classList.toggle('open');searchInput.focus()}
searchInput.oninput=()=>{const term=searchInput.value.toLowerCase();document.querySelector('.view.active').querySelectorAll('.searchable').forEach(item=>item.hidden=Boolean(term)&&!item.textContent.toLowerCase().includes(term))}
document.querySelector('#themeButton').onclick=()=>{document.documentElement.classList.toggle('dark');localStorage.setItem('da-theme',document.documentElement.classList.contains('dark')?'dark':'light')}
if(localStorage.getItem('da-theme')!=='light')document.documentElement.classList.add('dark')
document.querySelector('#menu').onclick=()=>document.querySelector('.sidebar').classList.toggle('open')
document.querySelector('#print').onclick=()=>window.print()
const read=document.querySelector('.read-progress span')
window.addEventListener('scroll',()=>{const h=document.documentElement.scrollHeight-window.innerHeight;read.style.width=`${h?window.scrollY/h*100:0}%`})

document.querySelectorAll('.tree-pyq').forEach(card=>card.querySelector('.tree-pyq-check').onclick=()=>{
  const item=pyqs.find(q=>q.number===card.dataset.pyq)
  const selected=[...card.querySelectorAll('input:checked')].map(input=>input.value).sort()
  const correct=selected.join(',')===item.correct.join(',')
  const feedback=card.querySelector('.question-feedback')
  feedback.hidden=false
  feedback.classList.toggle('is-correct',correct)
  feedback.classList.toggle('is-wrong',!correct)
  feedback.innerHTML=`<strong>${correct?'✓ Sahi':'✗ Try again · official key A, B, C'}</strong><p>${item.why}</p>`
})

const treeOrders={pre:['A','B','D','E','C','F'],in:['D','B','E','A','F','C'],post:['D','E','B','F','C','A'],level:['A','B','C','D','E','F']}
const treePositions={A:[280,32],B:[155,110],C:[405,110],D:[90,190],E:[220,190],F:[350,190]}
const treeEdges=[['A','B'],['A','C'],['B','D'],['B','E'],['C','F']]
let treeStep=0
function renderTreeLab(){
  const order=document.querySelector('#treeOrder').value
  const sequence=treeOrders[order]
  const visited=sequence.slice(0,treeStep)
  const active=visited.at(-1)
  const edgeMarkup=treeEdges.map(([from,to])=>`<line x1="${treePositions[from][0]}" y1="${treePositions[from][1]}" x2="${treePositions[to][0]}" y2="${treePositions[to][1]}" />`).join('')
  const nodeMarkup=Object.entries(treePositions).map(([name,[x,y]])=>`<g class="${active===name?'current':visited.includes(name)?'visited':''}"><circle cx="${x}" cy="${y}" r="25"/><text x="${x}" y="${y+6}" text-anchor="middle">${name}</text></g>`).join('')
  document.querySelector('#treeStage').innerHTML=`<svg viewBox="0 0 560 240" role="img" aria-label="A root; B and C children; D and E under B; F under C">${edgeMarkup}${nodeMarkup}</svg><div class="tree-lab-progress"><b>Visited (${treeStep}/6)</b><span>${visited.length?visited.join(' → '):'—'}</span><b>Remaining</b><span>${sequence.slice(treeStep).join(' → ')||'done'}</span></div>`
  document.querySelector('#treeStepText').textContent=treeStep?`Step ${treeStep}: ${active} node visit hua. ${order==='level'?'Queue front se pop aur children rear par add.':'Current subtree par traversal rule apply karo.'}`:`Ready: ${order} choose karo, phir Step dabao. Pehla visited node ${sequence[0]} hoga.`
  document.querySelector('#treePrev').disabled=treeStep===0
  document.querySelector('#treeNext').disabled=treeStep===sequence.length
}
document.querySelector('#treeOrder').onchange=()=>{treeStep=0;renderTreeLab()}
document.querySelector('#treePrev').onclick=()=>{treeStep=Math.max(0,treeStep-1);renderTreeLab()}
document.querySelector('#treeNext').onclick=()=>{treeStep=Math.min(6,treeStep+1);renderTreeLab()}
document.querySelector('#treeReset').onclick=()=>{treeStep=0;renderTreeLab()}
renderTreeLab()
