import './style.css'
import { applyNotePointers } from './notePointers.js'
import { lectureData, lessonMarkup, revisionMarkup } from './module13Lessons.js'
import { module13Topics, module13QuestionCount } from './practice13.js'
import { bellmanCode, bellmanGraph, buildBellmanFrames } from './bellmanFordDemo.js'
import { dijkstraCode, dijkstraGraph, buildDijkstraFrames } from './dijkstraDemo.js'

const esc = value => String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;')
const route = number => number === 1 ? './index.html' : `./module${number}.html`
const moduleLinks = [...Array.from({length: 10},(_,i)=>i+1),12,13].map(n=>`<a href="${route(n)}" class="${n===13?'active':''}">M${String(n).padStart(2,'0')}</a>`).join('')
const tracker = lectureData.map(([no,title,note,id])=>`<label><input type="checkbox" data-lecture="${no}"><span><b>${no}</b><i><a href="#${id}">${title}</a></i><small>${note}</small></span></label>`).join('')
const topicOptions = module13Topics.map(topic=>`<option value="${topic.id}">${esc(topic.label)} (${topic.questions.length})</option>`).join('')
const pyqMap = [
  {year:'2024',number:'Q14',title:'DFS edge classification',question:'Undirected graph par DFS; edge (u,v) first u→v direction mein explore hota hai and shortest-source distances satisfy d[u] < d[v]. Edge type choose karo.',solution:'Official key A (tree). Exam wording mein first DFS exploration u se v ki discovery/traversal hai. Tree edge new vertex discover karta hai. DFS edge categories ko directed/undirected assumptions ke saath read karo; gray/black labels ko answer options ke saath mix mat karo.',id:'dfs-theory'},
  {year:'2024',number:'Q51',title:'Topological ordering',question:'Given DAG ke four proposed vertex orders mein every arrow u→v ke liye u before v check karo.',solution:'Official key B and D. Har option par all edges check karo; ek violated precedence enough to reject. Multiple valid orders allowed because unrelated vertices can swap. Paper ki graph figure aur options official PDF mein dekho.',id:'kahn'},
  {year:'2025',number:'Q58',title:'Shortest-path constraints',question:'Given three length-3 shortest paths, which proposed extra edges cannot exist without creating a shorter route?',solution:'Method: hypothesize each candidate edge and construct shortcut. (b,d) makes a→d length 2, (b,h) makes a→h length 2, (e,g) makes e→h length 2: these contradict given shortest length 3. (b,g) permits routes of length 3, so does not contradict. Figure and wording official PDF mein verify karo.',id:'bfs-theory'},
  {year:'2025',number:'Q65',title:'DFS discovery order',question:'Vertices 0…100; outgoing neighbours i+2 then i+1. DFS starts 0. How many vertices are discovered after vertex 50?',solution:'DFS first follows evens 0,2,…,100. Vertex 50 is the 26th discovered (0 through 50 inclusive). Total 101 vertices, so 101−26=75 discovered afterwards: 25 later evens plus 50 odds. Decreasing adjacency order is the key trap.',id:'dfs-theory'},
  {year:'2026',number:'Q40',title:'Reachability after edge reversal',question:'Every directed edge reversed to form Gᴿ. Which statement about BFS/DFS reachable sets must hold?',solution:'Official key D. If u reachable from v in G, reverse that path: v reachable from u in Gᴿ. BFS vs DFS affect order, not reachable set within the same graph. G and Gᴿ generally have different reachability from the same start.',id:'connectivity'}
]
const sourceLinks = `<a href="https://gate2024.iisc.ac.in/wp-content/uploads/2024/DA24S1.pdf" target="_blank" rel="noopener">2024 official paper ↗</a> · <a href="https://gate2026.iitg.ac.in/doc/download/2025/DA2025.pdf" target="_blank" rel="noopener">2025 official paper ↗</a> · <a href="https://gate2026.iitg.ac.in/doc/download/2026/QPs/DA.pdf" target="_blank" rel="noopener">2026 official paper ↗</a>`
const pyqMarkup = pyqMap.map(item=>`<article class="question-card"><div class="question-card-meta"><span>${item.year} · ${item.number}</span><small>VERIFIED TOPIC · PARAPHRASED</small></div><h3>${item.title}</h3><p>${item.question}</p><div class="graph-pyq-solution"><b>Exam method &amp; solution</b><p>${item.solution}</p></div><a href="#${item.id}" class="graph-pyq-link" data-open-notes>Open related lesson →</a></article>`).join('')

document.querySelector('#app').innerHTML = `
<div class="read-progress"><span></span></div>
<header class="topbar"><a class="brand" href="#top"><b>DA</b><span><strong>Python + DSA</strong><small>GATE 2027 Notebook</small></span></a><nav><button class="tab active" data-view="notes">Detailed Notes</button><button class="tab" data-view="pyq">PYQ Map <i>5</i></button><button class="tab" data-view="practice">Practice <i>${module13QuestionCount}</i></button><button class="tab" data-view="revision">Revision</button></nav><div class="actions"><button id="searchButton" aria-label="Search">⌕</button><button id="themeButton" aria-label="Theme">◐</button></div></header>
<div class="searchbox"><input id="search" type="search" placeholder="Search: DFS, queue, Dijkstra, DAG…"><span>Search current view</span></div>
<div class="layout" id="top"><aside class="sidebar"><p class="overline">Module 13</p><h2>Graph Theory</h2><div class="module-switch">${moduleLinks}</div><div class="completion"><span><b>Lecture progress</b><i id="count">0/${lectureData.length}</i></span><div><i id="bar"></i></div></div><nav id="toc"></nav><p class="source"><b>Sources</b>GATE DA graph syllabus · ${sourceLinks}</p></aside><main>
<div class="view active" data-panel="notes"><section class="hero searchable" data-title="Overview"><p class="eyebrow"><i></i> Module 13 · vertices to paths</p><h1>Graph ko <em>step by step</em> trace karo.</h1><p>Same small graph par DFS ka call stack aur BFS ki queue dekho; phir weights se shortest-path algorithm choose karo. Har lesson simple Hinglish mein, Python code aur GATE traps ke saath.</p><div class="metrics"><span><b>${lectureData.length}</b>lecture sessions</span><span><b>${module13QuestionCount}</b>original practice</span><span><b>5</b>PYQ concept maps</span></div><div class="syllabus"><b>GATE DA Section 4 map</b>Introduction to graph theory; basic graph algorithms: traversals and shortest path. DAG/Kahn and edge classification exam-oriented recommended extensions. MST/DSU and advanced graph algorithms intentionally outside this path.</div></section><section class="lecture-track searchable" id="lecture-track" data-title="Module 13 lecture tracker"><div class="track-head"><div><p class="eyebrow"><i></i> Lecture order</p><h2>Module 13 · Lecture Tracker</h2><p>Lecture click karo; complete hone par tick karo. Progress locally saved rahega.</p></div><strong id="lecturePercent">0%</strong></div><div class="lecture-list">${tracker}</div></section>${lessonMarkup}</div>
<div class="view" data-panel="pyq"><section class="page-hero searchable" data-title="Graph PYQ Map"><p class="eyebrow"><i></i> Official papers checked · paraphrased methods</p><h1>2024–2026 Graph PYQ Map</h1><p>Question numbers and concepts official DA papers se verify kiye. Neeche statements paraphrased hain, original wording nahi. 2024 and 2026 answer keys checked; 2025 numerical/constraint solutions worked from official question statement.</p><p>${sourceLinks} · <a href="https://gate2024.iisc.ac.in/wp-content/uploads/2024/DAFinalAnswerKey.pdf" target="_blank" rel="noopener">2024 key ↗</a> · <a href="https://gate2026.iitg.ac.in/doc/download/2026/Keys/DA_Keys.pdf" target="_blank" rel="noopener">2026 key ↗</a></p></section><section class="pyq-list">${pyqMarkup}</section></div>
<div class="view" data-panel="practice"><section class="page-hero searchable" data-title="Graph practice"><p class="eyebrow"><i></i> Original GATE-style drills</p><h1>Module 13 Practice</h1><p>20 lecture-aligned questions with immediate correctness and short reasoning. These are not actual PYQs.</p></section><section class="practice-controls"><div><label for="practiceTopic">Lecture topic</label><select id="practiceTopic">${topicOptions}</select></div><div class="practice-score"><span>Attempted</span><b id="practiceScore">0/1</b></div></section><section id="questionList" class="question-list"></section></div>
<div class="view" data-panel="revision"><section class="page-hero searchable" data-title="Graph revision"><p class="eyebrow"><i></i> GATE DA · quick recall</p><h1>Graphs Quick Revision</h1><p>Storage, traversal, shortest paths and DAG conditions in one place.</p><button id="print">Print sheet</button></section>${revisionMarkup}</div>
</main></div><button class="menu" id="menu">☰</button><div class="toast">Copied</div>`

applyNotePointers()
const tabs = [...document.querySelectorAll('.tab')]
const panels = [...document.querySelectorAll('.view')]
function setView(view, scroll = true) {
  tabs.forEach(tab=>tab.classList.toggle('active',tab.dataset.view===view))
  panels.forEach(panel=>panel.classList.toggle('active',panel.dataset.panel===view))
  if(scroll) window.scrollTo({top:0,behavior:'smooth'})
}
tabs.forEach(tab=>tab.addEventListener('click',()=>setView(tab.dataset.view)))
document.querySelectorAll('[data-open-notes]').forEach(link=>link.addEventListener('click',()=>setView('notes',false)))
document.querySelector('#toc').innerHTML = [...document.querySelectorAll('[data-panel="notes"] .searchable')].map((el,i)=>`<a href="#${el.id||'top'}"><span>${String(i+1).padStart(2,'0')}</span>${esc(el.dataset.title)}</a>`).join('')
const lessonSections = [...document.querySelectorAll('[data-panel="notes"] .chapter')]
lessonSections.forEach((el,i)=>{
  const previous = lessonSections[i-1]
  const next = lessonSections[i+1]
  el.insertAdjacentHTML('beforeend',`<nav class="graph-lesson-nav" aria-label="Lesson navigation">${previous?`<a href="#${previous.id}">← ${esc(previous.dataset.title)}</a>`:'<span></span>'}${next?`<a href="#${next.id}">${esc(next.dataset.title)} →</a>`:'<span>End of Module 13 ✓</span>'}</nav>`)
})
const savedLectures = JSON.parse(localStorage.getItem('da-m13-lectures')||'{}')
const checks = [...document.querySelectorAll('[data-lecture]')]
function progress() { const done=checks.filter(x=>x.checked).length; document.querySelector('#count').textContent=`${done}/${checks.length}`; document.querySelector('#bar').style.width=`${100*done/checks.length}%`; document.querySelector('#lecturePercent').textContent=`${Math.round(100*done/checks.length)}%` }
checks.forEach(box=>{box.checked=Boolean(savedLectures[box.dataset.lecture]);box.addEventListener('change',()=>{savedLectures[box.dataset.lecture]=box.checked;localStorage.setItem('da-m13-lectures',JSON.stringify(savedLectures));progress()})})
progress()

const topicSelect = document.querySelector('#practiceTopic')
function renderPractice() {
  const topic=module13Topics.find(x=>x.id===topicSelect.value)
  const item=topic.questions[0]
  const saved=JSON.parse(localStorage.getItem('da-m13-practice')||'{}')
  const selected=saved[topic.id]
  document.querySelector('#practiceScore').textContent=`${selected?1:0}/1${selected?` · ${selected===item.answer?'correct':'review'}`:''}`
  document.querySelector('#questionList').innerHTML=`<article class="question-card ${selected?selected===item.answer?'answered-correct':'answered-wrong':''}"><div class="question-card-meta"><span>${esc(topic.label)}</span><small>CORE · ORIGINAL</small></div><h3>${esc(item.prompt)}</h3><div class="options" role="group" aria-label="Answer options">${item.options.map((option,i)=>`<button type="button" data-answer="${i}" class="${selected&&option===item.answer?'correct':''} ${selected===option&&selected!==item.answer?'wrong':''}" ${selected?'disabled':''}><b>${String.fromCharCode(65+i)}</b><span>${esc(option)}</span></button>`).join('')}</div><div class="question-feedback ${selected===item.answer?'is-correct':'is-wrong'}" role="status" ${selected?'':'hidden'}><strong>${selected===item.answer?'✓ Sahi':'✗ Galat · revisit concept'}</strong><p><b>Answer:</b> ${esc(item.answer)}. ${esc(item.explanation)}</p></div></article>`
  document.querySelectorAll('#questionList [data-answer]').forEach(button=>button.addEventListener('click',()=>{saved[topic.id]=item.options[Number(button.dataset.answer)];localStorage.setItem('da-m13-practice',JSON.stringify(saved));renderPractice()}))
}
topicSelect.addEventListener('change',renderPractice)
renderPractice()
document.querySelectorAll('[data-practice-topic]').forEach(button=>button.addEventListener('click',()=>{topicSelect.value=button.dataset.practiceTopic;renderPractice();setView('practice')}))

document.querySelectorAll('.codebox button').forEach(button=>button.addEventListener('click',async()=>{await navigator.clipboard.writeText(button.closest('.codebox').querySelector('code').textContent);const toast=document.querySelector('.toast');toast.classList.add('show');setTimeout(()=>toast.classList.remove('show'),1200)}))
const searchInput=document.querySelector('#search')
document.querySelector('#searchButton').addEventListener('click',()=>{document.querySelector('.searchbox').classList.toggle('open');searchInput.focus()})
searchInput.addEventListener('input',()=>{const term=searchInput.value.toLowerCase();document.querySelector('.view.active').querySelectorAll('.searchable').forEach(el=>el.hidden=Boolean(term)&&!el.textContent.toLowerCase().includes(term))})
document.querySelector('#themeButton').addEventListener('click',()=>{document.documentElement.classList.toggle('dark');localStorage.setItem('da-theme',document.documentElement.classList.contains('dark')?'dark':'light')})
if(localStorage.getItem('da-theme')!=='light')document.documentElement.classList.add('dark')
document.querySelector('#menu').addEventListener('click',()=>document.querySelector('.sidebar').classList.toggle('open'))
document.querySelector('#print').addEventListener('click',()=>window.print())
window.addEventListener('scroll',()=>{const h=document.documentElement.scrollHeight-window.innerHeight;document.querySelector('.read-progress span').style.width=`${h?window.scrollY/h*100:0}%`})

const pos={A:[100,90],B:[260,45],C:[260,180],D:[430,90],E:[440,225]}
const lines=[['A','B'],['A','C'],['B','D'],['C','D'],['D','E']]
const dfsFrames=[
  {current:null,visited:[],live:[],event:'Ready: DFS(A). First call enters A.'},
  {current:'A',visited:['A'],live:['A'],event:'Enter A; mark A. A first unvisited neighbour is B.'},
  {current:'B',visited:['A','B'],live:['A','B'],event:'A pauses. Enter B; mark B. Next unvisited neighbour D.'},
  {current:'D',visited:['A','B','D'],live:['A','B','D'],event:'B pauses. Enter D; mark D. B already visited; next C.'},
  {current:'C',visited:['A','B','D','C'],live:['A','B','D','C'],event:'Enter C; A and D visited. No child call; return C.'},
  {current:'D',visited:['A','B','D','C'],live:['A','B','D'],event:'C popped. D resumes its for-loop; next E.'},
  {current:'E',visited:['A','B','D','C','E'],live:['A','B','D','E'],event:'Enter E; D visited. Return E.'},
  {current:'D',visited:['A','B','D','C','E'],live:['A','B','D'],event:'E popped; D has no further neighbour. Return D.'},
  {current:'B',visited:['A','B','D','C','E'],live:['A','B'],event:'D popped; B finishes and returns.'},
  {current:'A',visited:['A','B','D','C','E'],live:['A'],event:'A checks C, already visited; A returns.'},
  {current:null,visited:['A','B','D','C','E'],live:[],event:'Done. Discovery A→B→D→C→E; finish C→E→D→B→A.'}
]
const bfsFrames=[
  {current:null,visited:['A'],live:['A'],event:'Start: enqueue A, mark visited, dist[A]=0.'},
  {current:'A',visited:['A','B','C'],live:['B','C'],event:'Pop A; enqueue B,C. Their distance is 1.'},
  {current:'B',visited:['A','B','C','D'],live:['C','D'],event:'Pop B; enqueue D, parent[D]=B, dist[D]=2.'},
  {current:'C',visited:['A','B','C','D'],live:['D'],event:'Pop C; D already visited, do not enqueue twice.'},
  {current:'D',visited:['A','B','C','D','E'],live:['E'],event:'Pop D; enqueue E, parent[E]=D, dist[E]=3.'},
  {current:'E',visited:['A','B','C','D','E'],live:[],event:'Pop E; queue empty. Pop order A→B→C→D→E.'}
]
let graphMode='dfs', frameIndex=0
function renderLab() {
  const frames=graphMode==='dfs'?dfsFrames:bfsFrames, frame=frames[frameIndex]
  const edgeMarkup=lines.map(([a,b])=>{const [x1,y1]=pos[a], [x2,y2]=pos[b],dx=x2-x1,dy=y2-y1,n=Math.hypot(dx,dy);return `<line x1="${x1+dx/n*27}" y1="${y1+dy/n*27}" x2="${x2-dx/n*27}" y2="${y2-dy/n*27}"/>`}).join('')
  const nodeMarkup=Object.entries(pos).map(([v,[x,y]])=>`<g class="graph-node ${v===frame.current?'is-current':frame.visited.includes(v)?'is-visited':''}"><circle cx="${x}" cy="${y}" r="25"/><text x="${x}" y="${y+1}" text-anchor="middle" dominant-baseline="central">${v}</text></g>`).join('')
  document.querySelector('#graphStage').innerHTML=`<svg viewBox="0 0 580 275" role="img" aria-label="${graphMode.toUpperCase()} step ${frameIndex}: ${frame.event}"><g class="graph-edges">${edgeMarkup}</g>${nodeMarkup}</svg><div class="graph-lab-facts"><p><b>Current</b><span>${frame.current||'—'}</span></p><p><b>Visited / discovered</b><span>${frame.visited.join(' → ')||'—'}</span></p><p><b>${graphMode==='dfs'?'Call stack · bottom to top':'Queue · front to rear'}</b><span>${frame.live.join(' → ')||'empty'}</span></p></div>`
  document.querySelector('#graphStatus').textContent=frame.event
  document.querySelector('#graphStepCount').textContent=`${frameIndex+1} / ${frames.length}`
  document.querySelector('#graphPrev').disabled=frameIndex===0
  document.querySelector('#graphNext').disabled=frameIndex===frames.length-1
}
document.querySelector('#graphMode').addEventListener('change',event=>{graphMode=event.target.value;frameIndex=0;renderLab()})
document.querySelector('#graphPrev').addEventListener('click',()=>{frameIndex--;renderLab()})
document.querySelector('#graphNext').addEventListener('click',()=>{frameIndex++;renderLab()})
document.querySelector('#graphReset').addEventListener('click',()=>{frameIndex=0;renderLab()})
renderLab()

// Generate the micro-steps from the same ordered adjacency list as the Python
// lesson: every neighbour inspection and every return has its own visible frame.
const dfsNeighbours={A:['B','C'],B:['A','D'],C:['A','D'],D:['B','C','E'],E:['D']}
const dfsFlowFrames=(()=>{
  const frames=[],stack=[],visited=[],finished=[],progress={},outcomes={}
  const capture=(kind,message,edge=null,checking=null)=>frames.push({kind,message,edge,checking,stack:[...stack],visited:[...visited],finished:[...finished],progress:{...progress},outcomes:Object.fromEntries(Object.entries(outcomes).map(([v,checks])=>[v,[...checks]])),current:stack.at(-1)||null})
  capture('ready','Ready: dfs(A) start karo. Backtrack rule: current node ke saare neighbours check hone par hi return.')
  const visit=node=>{
    stack.push(node)
    visited.push(node)
    progress[node]=-1
    outcomes[node]=Array(dfsNeighbours[node].length).fill('next')
    capture('enter',`dfs(${node}) enter: ${node} ko visited mark kiya. Ab ${node} ki neighbour list left-to-right check hogi.`)
    dfsNeighbours[node].forEach((neighbour,index)=>{
      progress[node]=index
      const edge=node+neighbour
      if(visited.includes(neighbour)){
        outcomes[node][index]='skipped'
        capture('skip',`${node} ka neighbour ${neighbour} check: ${neighbour} already visited hai. Is par dfs() dobara call nahi; next neighbour dekho.`,edge,index)
      }else{
        outcomes[node][index]='exploring'
        capture('call',`${node} ka neighbour ${neighbour} check: unvisited hai. dfs(${neighbour}) call karo; dfs(${node}) ka loop ab pause hoga.`,edge,index)
        visit(neighbour)
        outcomes[node][index]='explored'
      }
    })
    progress[node]=dfsNeighbours[node].length
    capture('backtrack',`${node} ki list ke saare ${dfsNeighbours[node].length} neighbours check ho gaye. Koi unvisited neighbour baaki nahi—ab dfs(${node}) return/backtrack karega.`)
    stack.pop()
    finished.push(node)
    const parent=stack.at(-1)
    if(parent)outcomes[parent][progress[parent]]='explored'
    capture('returned',parent?`${node} stack se nikla. dfs(${parent}) resume: jis neighbour ${node} par pause tha, uske baad wala neighbour check hoga.`:`${node} return hua. Stack empty; DFS complete.`,parent?parent+node:null)
  }
  visit('A')
  return frames
})()
const dfsFlowRoot=document.querySelector('#dfsFlow')
if(dfsFlowRoot){
  let step=0, timer=null
  const stop=()=>{if(timer){clearInterval(timer);timer=null}document.querySelector('#dfsFlowPlay').textContent='▶ Play'}
  const draw=()=>{
    const frame=dfsFlowFrames[step]
    const edgeMarkup=lines.map(([a,b])=>{const [x1,y1]=pos[a], [x2,y2]=pos[b],dx=x2-x1,dy=y2-y1,n=Math.hypot(dx,dy);return `<line class="${frame.edge===a+b||frame.edge===b+a?'is-active':''}" x1="${x1+dx/n*27}" y1="${y1+dy/n*27}" x2="${x2-dx/n*27}" y2="${y2-dy/n*27}"/>`}).join('')
    const nodeMarkup=Object.entries(pos).map(([v,[x,y]])=>`<g class="graph-node ${v===frame.current?'is-current':frame.finished.includes(v)?'is-finished':frame.visited.includes(v)?'is-visited':''}"><circle cx="${x}" cy="${y}" r="25"/><text x="${x}" y="${y+1}" text-anchor="middle" dominant-baseline="central">${v}</text></g>`).join('')
    document.querySelector('#dfsFlowGraph').innerHTML=`<svg viewBox="0 0 580 275" role="img" aria-label="DFS step ${step+1}: ${frame.message}"><g class="graph-edges">${edgeMarkup}</g>${nodeMarkup}</svg>`
    document.querySelector('#dfsFlowStack').innerHTML=frame.stack.length?frame.stack.slice().reverse().map((v,i)=>`<div class="dfs-flow-call ${i===0?'is-running':''}"><code>dfs(${v})</code><span>${i===0?'running':'paused'}</span></div>`).join(''):'<span>empty</span>'
    const current=frame.current
    document.querySelector('#dfsFlowNeighbourTitle').textContent=current?`dfs(${current}) · neighbour checks`:'Current node ke neighbours'
    document.querySelector('#dfsFlowNeighbours').innerHTML=current?dfsNeighbours[current].map((v,i)=>{
      const active=frame.checking===i
      const outcome=frame.outcomes[current][i]
      const label=active?(frame.kind==='skip'?'visited → skip':'unvisited → call'):outcome==='skipped'?'skip ✓':outcome==='explored'?'dfs done ✓':outcome==='exploring'?'dfs paused':'next'
      return `<div class="dfs-flow-neighbour ${active?'is-checking':''}"><code>${v}</code><span>${label}</span></div>`
    }).join(''):'<span>—</span>'
    document.querySelector('#dfsFlowVisited').textContent=frame.visited.join(' → ')||'—'
    document.querySelector('#dfsFlowFinished').textContent=frame.finished.join(' → ')||'—'
    document.querySelector('#dfsFlowStatus').textContent=frame.message
    document.querySelector('#dfsFlowCount').textContent=`Step ${step+1} / ${dfsFlowFrames.length}`
    document.querySelector('#dfsFlowPrev').disabled=step===0
    document.querySelector('#dfsFlowNext').disabled=step===dfsFlowFrames.length-1
  }
  document.querySelector('#dfsFlowPrev').addEventListener('click',()=>{stop();step=Math.max(0,step-1);draw()})
  document.querySelector('#dfsFlowNext').addEventListener('click',()=>{stop();step=Math.min(dfsFlowFrames.length-1,step+1);draw()})
  document.querySelector('#dfsFlowPlay').addEventListener('click',()=>{
    if(timer){stop();return}
    if(step===dfsFlowFrames.length-1)step=0
    draw()
    document.querySelector('#dfsFlowPlay').textContent='Ⅱ Pause'
    timer=setInterval(()=>{step++;draw();if(step===dfsFlowFrames.length-1)stop()},2000)
  })
  document.addEventListener('visibilitychange',()=>{if(document.hidden)stop()})
  draw()
}

const bfsFlowFrames=(()=>{
  const frames=[],queue=['A'],visited=['A'],processed=[],distance={A:0},outcomes={}
  const capture=(kind,message,current=null,edge=null,checking=null)=>frames.push({kind,message,current,edge,checking,queue:[...queue],visited:[...visited],processed:[...processed],distance:{...distance},outcomes:Object.fromEntries(Object.entries(outcomes).map(([v,checks])=>[v,[...checks]]))})
  capture('ready','Start: A ko visited mark karke queue mein rakha. Distance A=0. Ab queue ke front se pop karenge.')
  while(queue.length){
    const node=queue.shift()
    outcomes[node]=Array(dfsNeighbours[node].length).fill('next')
    capture('dequeue',`${node} queue ke front se nikla. Ab ${node} ke neighbours order mein check karo. Queue mein bache nodes apni turn ka wait karenge.`,node)
    dfsNeighbours[node].forEach((neighbour,index)=>{
      const edge=node+neighbour
      if(visited.includes(neighbour)){
        outcomes[node][index]='skipped'
        capture('skip',`${node}→${neighbour} check: ${neighbour} pehle hi visited/enqueued hai. Skip karo; queue mein duplicate mat dalo.`,node,edge,index)
      }else{
        visited.push(neighbour)
        distance[neighbour]=distance[node]+1
        queue.push(neighbour)
        outcomes[node][index]='enqueued'
        capture('enqueue',`${node}→${neighbour} check: naya node mila. ${neighbour} ko abhi visited mark karo; distance ${distance[node]}+1=${distance[neighbour]} set karke queue ke rear mein add karo.`,node,edge,index)
      }
    })
    processed.push(node)
    capture('processed',`${node} ke saare ${dfsNeighbours[node].length} neighbours check ho gaye. ${node} done; ab queue ke front par ${queue[0]||'koi node nahi'} hai.`,node)
  }
  capture('complete','Queue empty hai. BFS complete: A, B, C, D, E process hue.')
  return frames
})()
const bfsFlowRoot=document.querySelector('#bfsFlow')
if(bfsFlowRoot){
  let step=0,timer=null
  const stop=()=>{if(timer){clearInterval(timer);timer=null}document.querySelector('#bfsFlowPlay').textContent='▶ Play'}
  const draw=()=>{
    const frame=bfsFlowFrames[step]
    const edgeMarkup=lines.map(([a,b])=>{const [x1,y1]=pos[a], [x2,y2]=pos[b],dx=x2-x1,dy=y2-y1,n=Math.hypot(dx,dy);return `<line class="${frame.edge===a+b||frame.edge===b+a?'is-active':''}" x1="${x1+dx/n*27}" y1="${y1+dy/n*27}" x2="${x2-dx/n*27}" y2="${y2-dy/n*27}"/>`}).join('')
    const nodeMarkup=Object.entries(pos).map(([v,[x,y]])=>`<g class="graph-node ${v===frame.current?'is-current':frame.processed.includes(v)?'is-finished':frame.visited.includes(v)?'is-visited':''}"><circle cx="${x}" cy="${y}" r="25"/><text x="${x}" y="${y+1}" text-anchor="middle" dominant-baseline="central">${v}</text></g>`).join('')
    document.querySelector('#bfsFlowGraph').innerHTML=`<svg viewBox="0 0 580 275" role="img" aria-label="BFS step ${step+1}: ${frame.message}"><g class="graph-edges">${edgeMarkup}</g>${nodeMarkup}</svg>`
    document.querySelector('#bfsFlowCurrent').textContent=frame.current||'—'
    document.querySelector('#bfsFlowQueue').innerHTML=frame.queue.length?frame.queue.map((v,i)=>`<span class="bfs-flow-item ${i===0?'is-front':''}"><b>${v}</b><small>level ${frame.distance[v]}</small></span>`).join(''):'<span>empty</span>'
    document.querySelector('#bfsFlowNeighbourTitle').textContent=frame.current?`${frame.current} · neighbour checks`:'Current node ke neighbours'
    document.querySelector('#bfsFlowNeighbours').innerHTML=frame.current?dfsNeighbours[frame.current].map((v,i)=>{
      const outcome=frame.outcomes[frame.current][i]
      const active=frame.checking===i
      const label=active?(frame.kind==='skip'?'visited → skip':'mark + enqueue'):outcome==='skipped'?'skip ✓':outcome==='enqueued'?'enqueued ✓':'next'
      return `<div class="dfs-flow-neighbour ${active?'is-checking':''}"><code>${v}</code><span>${label}</span></div>`
    }).join(''):'<span>—</span>'
    document.querySelector('#bfsFlowVisited').textContent=frame.visited.join(' → ')
    document.querySelector('#bfsFlowProcessed').textContent=frame.processed.join(' → ')||'—'
    document.querySelector('#bfsFlowDistance').textContent=Object.entries(frame.distance).map(([v,d])=>`${v}=${d}`).join(' · ')
    document.querySelector('#bfsFlowStatus').textContent=frame.message
    document.querySelector('#bfsFlowCount').textContent=`Step ${step+1} / ${bfsFlowFrames.length}`
    document.querySelector('#bfsFlowPrev').disabled=step===0
    document.querySelector('#bfsFlowNext').disabled=step===bfsFlowFrames.length-1
  }
  document.querySelector('#bfsFlowPrev').addEventListener('click',()=>{stop();step=Math.max(0,step-1);draw()})
  document.querySelector('#bfsFlowNext').addEventListener('click',()=>{stop();step=Math.min(bfsFlowFrames.length-1,step+1);draw()})
  document.querySelector('#bfsFlowPlay').addEventListener('click',()=>{
    if(timer){stop();return}
    if(step===bfsFlowFrames.length-1)step=0
    draw()
    document.querySelector('#bfsFlowPlay').textContent='Ⅱ Pause'
    timer=setInterval(()=>{step++;draw();if(step===bfsFlowFrames.length-1)stop()},2000)
  })
  document.addEventListener('visibilitychange',()=>{if(document.hidden)stop()})
  draw()
}

const choiceConfigs={
  shortest:{
    question:'A se T reachable? Minimum unweighted edges kitne?',algorithm:'Reachability: DFS/BFS · Minimum edges: BFS',directed:false,
    nodes:{A:[75,125],B:[185,55],C:[315,55],D:[185,205],T:[455,125]},edges:[['A','B'],['B','C'],['C','T'],['A','D'],['D','T']],
    frames:[
      {current:'A',active:['A'],seen:['A'],frontier:'DFS stack: A',answer:'Reachability search starts',message:'DFS pehle A→B branch lega. Abhi shortest path ka koi guarantee nahi.'},
      {current:'B',edge:'AB',active:['A','B'],seen:['A','B'],frontier:'DFS stack: A → B',answer:'T abhi nahi mila',message:'A ke neighbours mein B pehle hai; DFS B par gaya.'},
      {current:'C',edge:'BC',active:['A','B','C'],seen:['A','B','C'],frontier:'DFS stack: A → B → C',answer:'T abhi nahi mila',message:'DFS ek hi branch mein aur deep ja raha hai.'},
      {current:'T',edge:'CT',active:['A','B','C','T'],seen:['A','B','C','T'],frontier:'DFS stack: A → B → C → T',answer:'Reachable: YES · found path = 3 edges',message:'DFS ne T find kiya. “Reachable?” ka answer yes hai; 3 edges minimum hone ka proof nahi.'},
      {current:'A',active:[],seen:['A'],frontier:'BFS queue: [A]',answer:'BFS distance[A] = 0',message:'Ab minimum edges ke liye BFS reset karke A ko queue mein rakho.'},
      {current:'A',active:['B','D'],seen:['A','B','D'],frontier:'BFS queue: [B, D]',answer:'Level 1: B, D',message:'A pop hua; B aur D dono 1 edge door hain, dono enqueue hue.'},
      {current:'B',edge:'BC',active:['D','C'],seen:['A','B','D','C'],frontier:'BFS queue: [D, C]',answer:'C distance 2; T abhi unseen',message:'B pop hua; C ko level 2 par enqueue kiya. D pehle queue mein tha, so D next hai.'},
      {current:'D',edge:'DT',active:['C','T'],seen:['A','B','D','C','T'],frontier:'BFS queue: [C, T]',answer:'T distance 2 · path A → D → T',message:'D pop hua aur T first time level 2 par mila. Minimum = 2 edges, DFS ke first path se chhota.'}
    ]
  },
  components:{
    question:'Undirected graph mein kitne connected components?',algorithm:'DFS/BFS + all-vertices outer loop',directed:false,
    nodes:{A:[85,80],B:[205,80],C:[315,80],D:[435,80],E:[260,205]},edges:[['A','B'],['C','D']],
    frames:[
      {current:'A',active:['A'],seen:['A'],frontier:'Outer loop start: A',answer:'Component 1 started',message:'A unvisited tha. DFS(A) se first component start.'},
      {current:'B',edge:'AB',active:['A','B'],seen:['A','B'],frontier:'DFS stack: A → B',answer:'Component 1 = {A, B}',message:'B A ka neighbour hai. B ke baad aur unvisited neighbour nahi; search returns.'},
      {current:'C',active:['C'],seen:['A','B','C'],frontier:'Outer loop start: C',answer:'Component 2 started',message:'Outer loop B skip karta hai, C unvisited milta hai. New search start.'},
      {current:'D',edge:'CD',active:['C','D'],seen:['A','B','C','D'],frontier:'DFS stack: C → D',answer:'Component 2 = {C, D}',message:'C se D reach hota hai; A/B se C/D tak koi path nahi.'},
      {current:'E',active:['E'],seen:['A','B','C','D','E'],frontier:'Outer loop start: E',answer:'Component 3 = {E}',message:'E isolated hai, phir bhi vertex hai; apna single-node component banata hai.'},
      {current:null,active:[],seen:['A','B','C','D','E'],frontier:'All vertices checked',answer:'3 components: {A,B}, {C,D}, {E}',message:'Sirf DFS(A) se answer 1 nahi hota. Outer loop complete graph cover karta hai.'}
    ]
  },
  cycle:{
    question:'Directed graph mein cycle hai? Visited edge ka kya role?',algorithm:'DFS with active gray / finished black states',directed:true,
    nodes:{A:[85,125],B:[215,55],C:[215,205],D:[420,125]},edges:[['A','B'],['B','D'],['A','C'],['C','D'],['C','A']],
    frames:[
      {current:'A',active:['A'],seen:['A'],frontier:'Gray stack: A',answer:'No cycle found yet',message:'A gray: DFS call active hai. White nodes abhi unvisited hain.'},
      {current:'B',edge:'AB',active:['A','B'],seen:['A','B'],frontier:'Gray stack: A → B',answer:'No cycle found yet',message:'A→B tree edge; B gray ho gaya.'},
      {current:'D',edge:'BD',active:['A','B','D'],seen:['A','B','D'],frontier:'Gray stack: A → B → D',answer:'No cycle found yet',message:'B→D tree edge. D ka outgoing edge nahi.'},
      {current:'B',active:['A','B'],seen:['A','B','D'],finished:['D'],frontier:'Gray A,B · Black D',answer:'D finished; no cycle',message:'D black: uski call return ho gayi. B bhi finish hoga.'},
      {current:'C',edge:'AC',active:['A','C'],seen:['A','B','C','D'],finished:['B','D'],frontier:'Gray A,C · Black B,D',answer:'No cycle found yet',message:'A ka next neighbour C hai. B aur D black hain.'},
      {current:'C',edge:'CD',active:['A','C'],seen:['A','B','C','D'],finished:['B','D'],frontier:'Gray A,C · Black B,D',answer:'C→D points to BLACK; no cycle proof',message:'D visited hai, lekin finished black hai. C→D se cycle conclude mat karo.'},
      {current:'C',edge:'CA',active:['A','C'],seen:['A','B','C','D'],finished:['B','D'],frontier:'Gray A,C · Black B,D',answer:'C→A points to GRAY → directed cycle',message:'A abhi active ancestor hai. C→A back edge gives directed cycle A→C→A.'}
    ]
  },
  topo:{
    question:'Dependencies ko valid order mein kaise likhen?',algorithm:'Kahn indegree-zero queue (DAG only)',directed:true,
    nodes:{A:[85,125],B:[225,55],C:[225,205],D:[435,125]},edges:[['A','B'],['A','C'],['B','D'],['C','D']],
    frames:[
      {current:null,active:['A'],seen:[],frontier:'Zero-indegree queue: [A]',answer:'Indegree A=0, B=1, C=1, D=2',message:'Sirf A ka indegree 0 hai. A hi pehle output mein aa sakta hai.'},
      {current:'A',active:['B','C'],seen:['A'],frontier:'Queue: [B, C]',answer:'Output: A',message:'A pop; A→B aur A→C remove; B,C ka indegree 0. Dono queue mein.'},
      {current:'B',edge:'BD',active:['C'],seen:['A','B'],frontier:'Queue: [C]',answer:'Output: A, B · D indegree 1',message:'B pop; B→D remove. D ka ek incoming C→D abhi bacha hai.'},
      {current:'C',edge:'CD',active:['D'],seen:['A','B','C'],frontier:'Queue: [D]',answer:'Output: A, B, C · D indegree 0',message:'C pop; C→D remove. Ab D ko queue mein add karo.'},
      {current:'D',active:[],seen:['A','B','C','D'],frontier:'Queue: []',answer:'Valid topo order: A, B, C, D',message:'All 4 vertices output mein aaye: DAG. B aur C ka order swap bhi valid hai.'}
    ]
  }
}
const choiceFlowRoot=document.querySelector('#choiceFlow')
if(choiceFlowRoot){
  let mode='shortest',step=0,timer=null
  const stop=()=>{if(timer){clearInterval(timer);timer=null}document.querySelector('#choicePlay').textContent='▶ Play'}
  const draw=()=>{
    const config=choiceConfigs[mode],frame=config.frames[step]
    const markerId=`choiceArrow-${mode}`
    const edgeMarkup=config.edges.map(([a,b])=>{
      const [x1,y1]=config.nodes[a],[x2,y2]=config.nodes[b],dx=x2-x1,dy=y2-y1,n=Math.hypot(dx,dy),ux=dx/n,uy=dy/n
      return `<line class="${frame.edge===a+b?'is-active':''}" x1="${x1+ux*27}" y1="${y1+uy*27}" x2="${x2-ux*(config.directed?36:27)}" y2="${y2-uy*(config.directed?36:27)}" ${config.directed?`marker-end="url(#${markerId})"`:''}/>`
    }).join('')
    const nodes=Object.entries(config.nodes).map(([v,[x,y]])=>`<g class="graph-node ${v===frame.current?'is-current':frame.active.includes(v)?'is-active':(frame.finished||[]).includes(v)?'is-finished':frame.seen.includes(v)?'is-visited':''}"><circle cx="${x}" cy="${y}" r="25"/><text x="${x}" y="${y+1}" text-anchor="middle" dominant-baseline="central">${v}</text></g>`).join('')
    document.querySelector('#choiceGraph').innerHTML=`<svg viewBox="0 0 520 260" role="img" aria-label="${config.question} Step ${step+1}: ${frame.message}"><defs><marker id="${markerId}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L10 5L0 10z"/></marker></defs><g class="graph-edges">${edgeMarkup}</g>${nodes}</svg>`
    document.querySelector('#choiceQuestion').textContent=config.question
    document.querySelector('#choiceAlgorithm').textContent=config.algorithm
    document.querySelector('#choiceFrontier').textContent=frame.frontier
    document.querySelector('#choiceSeen').textContent=mode==='cycle'?`Gray: ${frame.active.join(', ')||'—'} · Black: ${(frame.finished||[]).join(', ')||'—'}`:frame.seen.join(' → ')||'—'
    document.querySelector('#choiceAnswer').textContent=frame.answer
    document.querySelector('#choiceStatus').textContent=frame.message
    document.querySelector('#choiceCount').textContent=`Step ${step+1} / ${config.frames.length}`
    document.querySelector('#choicePrev').disabled=step===0
    document.querySelector('#choiceNext').disabled=step===config.frames.length-1
  }
  document.querySelector('#choiceMode').addEventListener('change',event=>{stop();mode=event.target.value;step=0;draw()})
  document.querySelector('#choicePrev').addEventListener('click',()=>{stop();step=Math.max(0,step-1);draw()})
  document.querySelector('#choiceNext').addEventListener('click',()=>{stop();step=Math.min(choiceConfigs[mode].frames.length-1,step+1);draw()})
  document.querySelector('#choicePlay').addEventListener('click',()=>{
    if(timer){stop();return}
    if(step===choiceConfigs[mode].frames.length-1)step=0
    draw()
    document.querySelector('#choicePlay').textContent='Ⅱ Pause'
    timer=setInterval(()=>{step++;draw();if(step===choiceConfigs[mode].frames.length-1)stop()},2100)
  })
  document.addEventListener('visibilitychange',()=>{if(document.hidden)stop()})
  draw()
}

const dijkstraNodes={A:[70,145],B:[260,65],C:[260,225],D:[520,145]}
const dijkstraDisplayEdges=[['A','B',4],['A','C',2],['B','C',1],['B','D',5],['C','D',8]]
const dijkstraRoot=document.querySelector('#dijkstraFlow')
if(dijkstraRoot){
  const frames=buildDijkstraFrames(),vertices=Object.keys(dijkstraGraph)
  const codePanel=document.querySelector('#dijkstraCodeTrace')
  codePanel.innerHTML=dijkstraCode.split('\n').map((line,index)=>`<span class="bellman-code-line" data-line="${index+1}"><span class="bellman-line-number">${index+1}</span><code>${esc(line)||' '}</code></span>`).join('')
  let step=0,timer=null
  const show=value=>value===undefined?'—':value===Infinity?'∞':String(value)
  const pause=()=>{if(timer){clearInterval(timer);timer=null}document.querySelector('#dijkstraPlay').textContent='▶ Play'}
  const draw=()=>{
    const frame=frames[step],active=frame.edge?.join('')
    const edges=dijkstraDisplayEdges.map(([a,b,edgeWeight])=>{
      const selected=active===a+b||active===b+a,from=selected?frame.edge[0]:a,to=selected?frame.edge[1]:b
      const [x1,y1]=dijkstraNodes[from],[x2,y2]=dijkstraNodes[to],dx=x2-x1,dy=y2-y1,n=Math.hypot(dx,dy),ux=dx/n,uy=dy/n
      const [ax,ay]=dijkstraNodes[a],[bx,by]=dijkstraNodes[b],labelLength=Math.hypot(bx-ax,by-ay)
      return `<line class="${selected?'is-active':''}" x1="${x1+ux*28}" y1="${y1+uy*28}" x2="${x2-ux*(selected?36:28)}" y2="${y2-uy*(selected?36:28)}" ${selected?'marker-end="url(#dijkstraFlowArrow)"':''}/><text class="graph-weight" x="${(ax+bx)/2+(by-ay)/labelLength*18}" y="${(ay+by)/2-(bx-ax)/labelLength*18}" text-anchor="middle">${edgeWeight}</text>`
    }).join('')
    const nodes=Object.entries(dijkstraNodes).map(([vertex,[x,y]])=>`<g class="graph-node ${vertex===frame.updated?'is-updated':vertex===frame.current?'is-current':frame.visited.includes(vertex)?'is-settled':frame.dist[vertex]!==undefined&&frame.dist[vertex]!==Infinity?'is-visited':''}"><circle cx="${x}" cy="${y}" r="25"/><text x="${x}" y="${y+1}" text-anchor="middle" dominant-baseline="central">${vertex}</text></g>`).join('')
    document.querySelector('#dijkstraGraph').innerHTML=`<svg viewBox="0 0 600 290" role="img" aria-label="Dijkstra step ${step+1}: ${frame.message}"><defs><marker id="dijkstraFlowArrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L10 5L0 10z"/></marker></defs><g class="graph-edges">${edges}</g>${nodes}</svg>`
    document.querySelector('#dijkstraEdge').textContent=frame.edge?`Checking ${frame.edge[0]} → ${frame.edge[1]} · weight ${frame.weight}`:'No active edge'
    document.querySelector('#dijkstraRound').textContent=frame.i===null?'—':`i=${frame.i} · round ${frame.i+1}/${vertices.length}`
    document.querySelector('#dijkstraScan').textContent=frame.node||'—'
    document.querySelector('#dijkstraCurrent').textContent=frame.current||'—'
    document.querySelector('#dijkstraNeighbor').textContent=frame.neighbor||'—'
    document.querySelector('#dijkstraWeight').textContent=frame.weight===null?'—':String(frame.weight)
    document.querySelector('#dijkstraCandidate').textContent=frame.newDist===null?'—':String(frame.newDist)
    document.querySelector('#dijkstraDistances').innerHTML=vertices.map(vertex=>`<div class="${vertex===frame.updated?'is-updated':''}"><b>${vertex}</b><span>${show(frame.dist[vertex])}</span><small>${frame.visited.includes(vertex)?'FINAL':'tentative'}</small></div>`).join('')
    document.querySelector('#dijkstraSettled').textContent=frame.visited.join(' → ')||'none yet'
    const change=document.querySelector('#dijkstraCalculation')
    change.className=`bellman-update-status ${frame.updated?'is-success':''}`
    change.textContent=frame.updated?`dist[${frame.updated}]: ${show(frame.previous[frame.updated])} → ${show(frame.dist[frame.updated])}`:frame.kind==='compare'||frame.kind==='compareMin'?frame.message:'No distance update on this step'
    document.querySelector('#dijkstraStatus').textContent=frame.message
    document.querySelector('#dijkstraCount').textContent=`Step ${step+1} / ${frames.length}`
    document.querySelector('#dijkstraPrev').disabled=step===0
    document.querySelector('#dijkstraNext').disabled=step===frames.length-1
    codePanel.querySelectorAll('.bellman-code-line.is-active').forEach(line=>{line.classList.remove('is-active');line.removeAttribute('aria-current')})
    const line=codePanel.querySelector(`[data-line="${frame.line}"]`)
    if(line){line.classList.add('is-active');line.setAttribute('aria-current','step');codePanel.scrollTop=Math.max(0,line.offsetTop-codePanel.offsetTop-codePanel.clientHeight/2)}
  }
  const next=()=>{if(step<frames.length-1){step++;draw()}else pause()}
  const start=()=>{if(step===frames.length-1)step=0;draw();document.querySelector('#dijkstraPlay').textContent='Ⅱ Pause';timer=setInterval(next,Number(document.querySelector('#dijkstraSpeed').value))}
  document.querySelector('#dijkstraPrev').addEventListener('click',()=>{pause();step=Math.max(0,step-1);draw()})
  document.querySelector('#dijkstraNext').addEventListener('click',()=>{pause();next()})
  document.querySelector('#dijkstraRestart').addEventListener('click',()=>{pause();step=0;draw()})
  document.querySelector('#dijkstraPlay').addEventListener('click',()=>{if(timer)pause();else start()})
  document.querySelector('#dijkstraSpeed').addEventListener('change',()=>{if(timer){pause();start()}})
  document.addEventListener('visibilitychange',()=>{if(document.hidden)pause()})
  draw()
}

const bellmanRoot=document.querySelector('#bellmanSimulator')
if(bellmanRoot){
  const frames=buildBellmanFrames(),vertices=Object.keys(bellmanGraph)
  const coords={A:[55,165],B:[175,55],C:[305,165],D:[425,55]}
  const codePanel=document.querySelector('#bellmanCodeTrace')
  codePanel.innerHTML=bellmanCode.split('\n').map((line,index)=>`<span class="bellman-code-line" data-line="${index+1}"><span class="bellman-line-number">${index+1}</span><code>${esc(line)||' '}</code></span>`).join('')
  let step=0,timer=null
  const show=value=>value===undefined?'—':value===Infinity?'∞':String(value)
  const pause=()=>{if(timer){clearInterval(timer);timer=null}document.querySelector('#bellmanPlay').textContent='▶ Play'}
  const draw=()=>{
    const frame=frames[step],active=frame.edge?.join('')
    const edges=Object.entries(bellmanGraph).flatMap(([from,neighbours])=>neighbours.map(([to,weight])=>{
      const [x1,y1]=coords[from],[x2,y2]=coords[to],dx=x2-x1,dy=y2-y1,length=Math.hypot(dx,dy),ux=dx/length,uy=dy/length
      const selected=active===from+to
      return `<line class="${selected?'is-active':''}" x1="${x1+ux*27}" y1="${y1+uy*27}" x2="${x2-ux*36}" y2="${y2-uy*36}" marker-end="url(#${selected?'bellmanArrowActive':'bellmanArrow'})"/><text class="graph-weight" x="${(x1+x2)/2+uy*16}" y="${(y1+y2)/2-ux*16}" text-anchor="middle">${weight}</text>`
    })).join('')
    const nodes=vertices.map(vertex=>{const [x,y]=coords[vertex];return `<g class="graph-node ${vertex===frame.updated?'is-updated':vertex===frame.current?'is-current':''}"><circle cx="${x}" cy="${y}" r="23"/><text x="${x}" y="${y+1}" text-anchor="middle" dominant-baseline="central">${vertex}</text></g>`}).join('')
    document.querySelector('#bellmanGraph').innerHTML=`<svg viewBox="0 0 480 225" role="img" aria-label="Bellman-Ford step ${step+1}: ${frame.message}"><defs><marker id="bellmanArrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L10 5L0 10z"/></marker><marker id="bellmanArrowActive" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L10 5L0 10z"/></marker></defs><g class="graph-edges">${edges}</g>${nodes}</svg>`
    document.querySelector('#bellmanEdge').textContent=frame.edge?`Checking ${frame.edge[0]} → ${frame.edge[1]} · weight ${frame.weight}`:'No active edge'
    document.querySelector('#bellmanPass').textContent=frame.kind.startsWith('cycle')?'extra cycle pass':frame.i===null?'—':`i=${frame.i} · pass ${frame.i+1}/${vertices.length-1}`
    document.querySelector('#bellmanCurrent').textContent=frame.current||'—'
    document.querySelector('#bellmanNeighbor').textContent=frame.neighbor||'—'
    document.querySelector('#bellmanWeight').textContent=frame.weight===null?'—':String(frame.weight)
    document.querySelector('#bellmanCandidate').textContent=frame.newDist===null?'—':String(frame.newDist)
    document.querySelector('#bellmanDistances').innerHTML=vertices.map(vertex=>`<div class="${vertex===frame.updated?'is-updated':''}"><b>${vertex}</b><span>${show(frame.dist[vertex])}</span></div>`).join('')
    const change=document.querySelector('#bellmanChange')
    change.className=`bellman-update-status ${frame.kind==='cycleWarning'?'is-warning':frame.updated?'is-success':''}`
    change.textContent=frame.kind==='cycleWarning'?'Reachable negative cycle detected':frame.updated?`dist[${frame.updated}]: ${show(frame.previous[frame.updated])} → ${show(frame.dist[frame.updated])}`:frame.kind==='compare'||frame.kind==='cycleCompare'?frame.message:'No distance update on this step'
    document.querySelector('#bellmanCaption').textContent=frame.message
    document.querySelector('#bellmanCount').textContent=`Step ${step+1} / ${frames.length}`
    document.querySelector('#bellmanPrev').disabled=step===0
    document.querySelector('#bellmanNext').disabled=step===frames.length-1
    codePanel.querySelectorAll('.bellman-code-line.is-active').forEach(line=>{line.classList.remove('is-active');line.removeAttribute('aria-current')})
    const line=codePanel.querySelector(`[data-line="${frame.line}"]`)
    if(line){line.classList.add('is-active');line.setAttribute('aria-current','step');codePanel.scrollTop=Math.max(0,line.offsetTop-codePanel.offsetTop-codePanel.clientHeight/2)}
  }
  const next=()=>{if(step<frames.length-1){step++;draw()}else pause()}
  const start=()=>{if(step===frames.length-1)step=0;draw();document.querySelector('#bellmanPlay').textContent='Ⅱ Pause';timer=setInterval(next,Number(document.querySelector('#bellmanSpeed').value))}
  document.querySelector('#bellmanPrev').addEventListener('click',()=>{pause();step=Math.max(0,step-1);draw()})
  document.querySelector('#bellmanNext').addEventListener('click',()=>{pause();next()})
  document.querySelector('#bellmanRestart').addEventListener('click',()=>{pause();step=0;draw()})
  document.querySelector('#bellmanPlay').addEventListener('click',()=>{if(timer)pause();else start()})
  document.querySelector('#bellmanSpeed').addEventListener('change',()=>{if(timer){pause();start()}})
  document.addEventListener('visibilitychange',()=>{if(document.hidden)pause()})
  draw()
}
