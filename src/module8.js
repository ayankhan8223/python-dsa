import './style.css'
import { module8Topics, module8QuestionCount } from './practice8.js'
import { quickSortLabMarkup, mountQuickSortLab, quickSortUserCode } from './quickSortLab.js'

const lectures = [
  ['8.1', 'Introduction', 'Order, stable aur in-place language'],
  ['8.2.1', 'Bubble Sort (theory)', 'Adjacent swap aur pass invariant'],
  ['8.2.2', 'Bubble Sort (code)', 'Nested loops aur early stop'],
  ['8.3.1', 'Selection Sort (theory)', 'Minimum scan aur one swap'],
  ['8.3.2', 'Selection Sort (code)', 'min_index ka trace'],
  ['8.4.1', 'Insertion Sort (theory)', 'Sorted prefix aur shifts'],
  ['8.4.2', 'Insertion Sort (code)', 'key, j aur insertion slot'],
  ['8.5.1', 'Merge Sort (theory)', 'Divide, conquer, merge'],
  ['8.5.2', 'Merge Sort (code)', 'Two sorted halves merge'],
  ['8.6.1', 'Quick Sort (theory)', 'Pivot aur partition'],
  ['8.6.2', 'Quick Sort (code)', 'First pivot with p/q partition'],
  ['8.7.1', 'Counting Sort (theory)', 'Value range frequency'],
  ['8.7.2', 'Counting Sort (code)', 'Count frequencies, then extend output'],
  ['8.8', 'Complexity Analysis', 'Time, space, stable, in-place'],
  ['8.9', 'DS Context', 'Input ke hisaab se sort choose']
]

const chapter = (no, label, title, note) => `<div class="chapter-head"><div class="chapter-no"><span>${no}</span><small>${label}</small></div><div><h2>${title}</h2><p>${note}</p></div></div>`
const codebox = (label, code) => `<div class="codebox green"><div><span>${label}</span><button>Copy</button></div><pre><code>${code}</code></pre></div>`
const topicOptions = module8Topics.map(topic => `<option value="${topic.id}">${topic.label} (${topic.questions.length})</option>`).join('')
const tracker = lectures.map(([no, title, note]) => `<label><input type="checkbox" data-lecture="${no}"><span><b>${no}</b><i>${title}</i><small>${note}</small></span></label>`).join('')
const sortRow = (values, labels = {}) => `<div class="sort-row">${values.map((value, index) => `<span class="${labels.active?.includes(index) ? 'sort-active' : ''} ${labels.fixed?.includes(index) ? 'sort-fixed' : ''} ${labels.key === index ? 'sort-key' : ''}"><i>${index}</i><b>${value}</b><small>${labels.key === index ? 'KEY' : labels.fixed?.includes(index) ? 'FIXED' : labels.active?.includes(index) ? 'COMPARE' : ''}</small></span>`).join('')}</div>`
const state = (before, operation, after, beforeLabels = {}, afterLabels = {}) => `<div class="state-flow sort-state-flow"><article><span>BEFORE</span>${sortRow(before, beforeLabels)}</article><div class="state-operation"><code>${operation}</code><b>→</b></div><article><span>AFTER</span>${sortRow(after, afterLabels)}</article></div>`
const bubbleCard = (number, before, j, after, swap, fixed = false) => `<article class="bubble-comparison-card"><header><span>COMPARISON ${number} · j = ${j}</span><b>${before[j]} ${swap ? '>' : '≤'} ${before[j + 1]} → ${swap ? 'SWAP' : 'NO SWAP'}</b></header><div class="bubble-pair-labels"><span>arr[j] → index ${j}</span><span>arr[j + 1] → index ${j + 1}</span></div><div><small>BEFORE this comparison</small>${sortRow(before, { active: [j, j + 1] })}</div><div class="bubble-card-arrow">${swap ? 'swap these two only' : 'already ascending; nothing moves'} ↓</div><div><small>AFTER this comparison</small>${sortRow(after, { active: [j, j + 1], fixed: fixed ? [4] : [] })}</div><p>${fixed ? `This is the last inner-loop comparison of pass 1. 8 has reached index 4, so index 4 is now fixed; pass 2 stops before it.` : swap ? `Only values at index ${j} and ${j + 1} exchange. Next comparison uses the updated array, so ${after[j + 1]} now becomes the left item for j=${j + 1}.` : `Left value is already smaller-or-equal, so the pair is in ascending order. No element moves; the next comparison advances j to ${j + 1}.`}</p></article>`
const bubbleComparisonCards = `<div class="bubble-comparison-flow"><h3>Pass 1 ko four separate comparisons mein dekho</h3><p>Yeh code ascending sort karta hai: left value right se larger ho toh swap. Har card updated array se next pair leta hai.</p>${bubbleCard(1, ['5','1','4','2','8'], 0, ['1','5','4','2','8'], true)}${bubbleCard(2, ['1','5','4','2','8'], 1, ['1','4','5','2','8'], true)}${bubbleCard(3, ['1','4','5','2','8'], 2, ['1','4','2','5','8'], true)}${bubbleCard(4, ['1','4','2','5','8'], 3, ['1','4','2','5','8'], false, true)}</div>`
const bubbleTraceTable = `<div class="table-wrap"><table><thead><tr><th>j</th><th>Actual compared pair</th><th>Why this pair?</th><th>Swap?</th><th>Array after this one comparison</th></tr></thead><tbody><tr><td>0</td><td><strong>5, 1</strong></td><td>Start: arr[0], arr[1]. 5 &gt; 1, so ascending order ke liye swap.</td><td>Yes</td><td>[1,5,4,2,8]</td></tr><tr><td>1</td><td><strong>5, 4</strong></td><td>Previous comparison ke baad index 1 par 5 hai, so arr[1], arr[2].</td><td>Yes</td><td>[1,4,5,2,8]</td></tr><tr><td>2</td><td><strong>5, 2</strong></td><td>j moves to 2, so arr[2], arr[3].</td><td>Yes</td><td>[1,4,2,5,8]</td></tr><tr><td>3</td><td><strong>5, 8</strong></td><td>Updated 5 is at index 3, so arr[3], arr[4].</td><td>No</td><td>[1,4,2,5,8] · 8 fixed</td></tr></tbody></table></div>`
const bubbleLabMarkup = `<div class="bubble-lab" id="bubbleLab"><div class="bubble-lab-head"><span>TRY IT · ONE COMPARISON AT A TIME</span><h3>Bubble Sort Visualizer</h3><p>Step dabane par ek hi comparison hota hai: <code>arr[j]</code> aur <code>arr[j+1]</code> compare; swap only when needed; then j moves.</p></div><div class="bubble-lab-controls"><div class="bubble-control-group primary"><span>TRACE</span><div><button data-bubble="step">Step</button><button data-bubble="play">Play</button><button data-bubble="restart">Restart</button></div></div><div class="bubble-control-group secondary"><span>NAVIGATE / ARRAY</span><div><button data-bubble="previous" disabled>← Previous</button><button data-bubble="shuffle">Shuffle</button></div></div><div class="bubble-control-group settings"><span>SETTINGS</span><div><label>Speed <input data-bubble-speed type="range" min="250" max="1500" step="50" value="800"></label><label>Size <input data-bubble-size type="range" min="3" max="8" step="1" value="5"></label></div></div></div><div class="bubble-presets"><span>Preset arrays</span><button data-preset="random">Random</button><button data-preset="nearly">Nearly sorted</button><button data-preset="reversed">Reversed</button><button data-preset="few">Few swaps</button></div><div class="bubble-lab-layout"><div class="bubble-bars" data-bubble-bars aria-label="Bubble sort array bars"></div><aside class="bubble-current-state" data-bubble-state></aside></div><div class="bubble-code-panel"><span>CODE EXECUTION · YOUR CODE</span><pre><code data-bubble-code></code></pre></div><div class="bubble-complexity"><div><span>Best</span><b>O(n)</b></div><div><span>Average / Worst</span><b>O(n²)</b></div><div><span>Auxiliary space</span><b>O(1)</b></div><p><code>swapped</code> har pass mein check karta hai. Agar ek complete pass mein koi swap nahi hua, array already ascending-sorted hai; <code>break</code> remaining passes rok deta hai.</p></div></div>`
const selectionLabMarkup = `<div class="bubble-lab selection-lab" id="selectionLab"><div class="bubble-lab-head"><span>TRY IT · MINIMUM CANDIDATE KO FOLLOW KARO</span><h3>Selection Sort Visualizer</h3><p>Har pass mein array ko continuously swap nahi karte. Pehle unsorted part ka smallest value locate hota hai; phir pass ke end par at most one swap hota hai.</p></div><div class="bubble-lab-controls"><div class="bubble-control-group primary"><span>TRACE</span><div><button data-selection="step">Step</button><button data-selection="play">Play</button><button data-selection="restart">Restart</button></div></div><div class="bubble-control-group secondary"><span>NAVIGATE / ARRAY</span><div><button data-selection="previous" disabled>← Previous</button><button data-selection="shuffle">Shuffle</button></div></div></div><div class="bubble-lab-layout"><div class="bubble-bars" data-selection-bars aria-label="Selection sort array bars"></div><aside class="bubble-current-state" data-selection-state></aside></div><div class="bubble-code-panel"><span>CODE EXECUTION · MINIMUM TRACKER</span><pre><code data-selection-code></code></pre></div><div class="bubble-complexity"><div><span>Best / Average / Worst</span><b>O(n²)</b></div><div><span>Maximum swaps</span><b>O(n)</b></div><div><span>Auxiliary space</span><b>O(1)</b></div><p>Already sorted input mein bhi har unsorted region scan hota hai. Isliye best case bhi O(n²), but each pass has at most one final swap.</p></div></div>`

const pyqs = [
  {
    year: '2024', number: 'Q30', kind: 'DIRECT QUICKSORT PYQ', title: 'Already sorted input with last pivot',
    question: 'An in-place Quicksort uses the last element as pivot to sort <code>[60, 70, 80, 90, 100]</code> in ascending order. Minimum swaps performed is ______.',
    answer: '0', why: 'Array already sorted hai. Last pivot har partition mein apni final position par hi hai. Minimum useful swaps zero hain; self-swaps ko mandatory operation maan kar count nahi kiya gaya.'
  },
  {
    year: '2024', number: 'Q45', kind: 'DIRECT PASS-TRACE PYQ', title: 'Exactly two passes',
    question: 'Bubble, insertion and selection sort mein se kaunsa/kaunse algorithm <code>[4,3,2,1,5]</code> ko exactly two passes ke baad increasing order mein sort karte hain?',
    answer: 'Selection sort only', why: 'Selection pass 1: [1,3,2,4,5]. Pass 2: [1,2,3,4,5]. Bubble ke two passes ke baad [2,1,3,4,5] bachta hai; insertion bhi finish nahi hota.'
  },
  {
    year: '2025', number: 'Q29', kind: 'DIRECT INSERTION-SORT PYQ', title: 'Two swaps and unknown x',
    question: 'Insertion sort on <code>[1,3,5,7,9,11,x,15,13]</code> uses exactly two swaps. Possible values of x?',
    answer: '10, 12, 14', why: 'x=10/12/14 mein x ke saath one inversion (11 > x) plus 15 > 13, total two inversions/shifts. x=16 mein 16 > 15,13 plus 15 > 13, total three.'
  },
  {
    year: '2026', number: 'Q49', kind: 'DIRECT BUBBLE/INSERTION PYQ', title: 'Comparison and swap distinction',
    question: 'For P=[1,2,3,5,4], compare Bubble Sort and Insertion Sort. Which statements about comparisons, swaps and unnecessary comparisons are correct?',
    answer: 'N1 > N2; insertion performs one swap; both make an unnecessary comparison', why: 'Bubble performs its full comparison schedule (10 for n=5), whereas insertion needs one comparison for each inserted key here (4). Only 5/4 is inverted, so insertion performs one swap/shift. Both do compare already ordered items.'
  },
  {
    year: '2026', number: 'Q15', kind: 'DIRECT QUICKSORT RECURRENCE PYQ', title: 'Expected quicksort recurrence',
    question: 'Distinct randomly ordered elements; Quicksort always chooses the first current-subarray element as pivot. Partition is linear. Which recurrence represents expected time?',
    answer: 'Average over every possible pivot rank + O(n)', why: 'Random input means first element ka rank 0…n−1 equally likely hai. Expected recurrence therefore all split sizes ka average leti hai, not a fixed balanced or fixed worst split.'
  }
]
const pyqMarkup = pyqs.map(item => `<details class="pyq-card searchable" open><summary><span class="year">${item.year}<small>${item.number}</small></span><span><b>${item.title}</b><small>${item.kind}</small></span><i>＋</i></summary><div class="pyq-body"><div class="answer"><span>Verified answer</span><strong>${item.answer}</strong></div><div class="pyq-question"><h4>Question · clean transcript</h4><p>${item.question}</p></div><aside class="transfer"><strong>How to trace it</strong><p>${item.why}</p></aside></div></details>`).join('')

document.querySelector('#app').innerHTML = `
<div class="read-progress"><span></span></div>
<header class="topbar"><a class="brand" href="#top"><b>DA</b><span><strong>Python + DSA</strong><small>GATE 2027 Notebook</small></span></a><nav><button class="tab active" data-view="notes">Detailed Notes</button><button class="tab" data-view="pyq">PYQ Evidence <i>${pyqs.length}</i></button><button class="tab" data-view="practice">Practice <i>${module8QuestionCount}</i></button><button class="tab" data-view="revision">Revision</button></nav><div class="actions"><button id="searchButton" aria-label="Search">⌕</button><button id="themeButton" aria-label="Theme">◐</button></div></header>
<div class="searchbox"><input id="search" type="search" placeholder="Search: pass, stable, pivot, merge, inversion…"><span>Search current view</span></div>
<div class="layout" id="top"><aside class="sidebar"><p class="overline">Module 08</p><h2>Sorting</h2><div class="module-switch"><a href="./index.html">M01</a><a href="./module2.html">M02</a><a href="./module3.html">M03</a><a href="./module4.html">M04</a><a href="./module5.html">M05</a><a href="./module6.html">M06</a><a href="./module7.html">M07</a><a class="active" href="./module8.html">M08</a></div><div class="completion"><span><b>Lecture progress</b><i id="count">0/${lectures.length}</i></span><div><i id="bar"></i></div></div><nav id="toc"></nav><p class="source"><b>Sources</b>CampusX Sorting lecture flow · supplied GATE DA syllabus · supplied 2024–2026 DA papers</p></aside><main>
<div class="view active" data-panel="notes">
<section class="hero searchable" data-title="Overview"><p class="eyebrow"><i></i> Module 08 · order creates structure</p><h1>Sorting mein answer sirf final array nahi: <em>har pass ke baad kya fixed hua?</em></h1><p>GATE trace ke liye har algorithm ka one invariant yaad rakho: bubble ka largest suffix, selection ka smallest prefix, insertion ka sorted prefix, merge ki sorted halves, aur quicksort ka pivot position.</p><div class="metrics"><span><b>${lectures.length}</b>lecture sessions</span><span><b>${module8QuestionCount}</b>lecture-wise drills</span><span><b>${pyqs.length}</b>direct PYQs</span></div><div class="syllabus"><b>GATE DA syllabus map</b>Selection · bubble · insertion · divide and conquer: mergesort, quicksort · Python arrays · complexity</div></section>

<section class="lecture-track searchable" id="lecture-track" data-title="Module 8 lecture tracker"><div class="track-head"><div><p class="eyebrow"><i></i> Exact lecture sequence</p><h2>Module 8 · Lecture Tracker</h2><p>Pass ko outer-loop iteration samjho. Har pass ke baad array redraw karo, then fixed region mark karo—GATE trace mistakes wahin catch hoti hain.</p></div><strong id="lecturePercent">0%</strong></div><div class="lecture-list">${tracker}</div></section>

<section class="beginner-start searchable" id="zero-start" data-title="Sorting mental model"><div class="zero-title"><span>ZERO START</span><h2>Sorting ka matlab values ko comparison rule ke according arrange karna.</h2><p>Ascending sort mein left se right values non-decreasing hoti hain: <code>a[0] ≤ a[1] ≤ ...</code>. Algorithm ko final result se nahi, uske “already safe” part se pehchano.</p></div>${sortRow(['4','2','5','1','3'])}<div class="glossary-grid"><article><b>Pass</b><p>Outer-loop ka ek round.</p></article><article><b>Comparison</b><p>Do keys ka order check.</p></article><article><b>Swap</b><p>Do locations ke values exchange.</p></article><article><b>Shift</b><p>Insertion mein element right move.</p></article><article><b>Stable</b><p>Equal keys ka order preserve.</p></article><article><b>In-place</b><p>Same array rearrange.</p></article><article><b>Adaptive</b><p>Nearly sorted data se benefit.</p></article><article><b>Invariant</b><p>Har pass ke baad guaranteed fact.</p></article></div><div class="reading-method"><h3>Har sorting question solve karne ka protocol</h3><div><span><b>1</b>Algorithm ka invariant likho</span><span><b>2</b>Pass number mark karo</span><span><b>3</b>Comparison / swap alag count karo</span><span><b>4</b>Fixed region shade karo</span><span><b>5</b>Stable & space claim verify karo</span></div></div></section>

<section class="chapter searchable" id="intro" data-title="8.1 · Introduction">${chapter('8.1', 'INTRODUCTION', 'Sorting vocabulary pehle clear karo', 'Same final array, different algorithm behavior: comparisons, writes, stability and extra memory differ karte hain.')}<div class="two-grid"><article><h3>Question</h3><p><code>[(4,A), (2,X), (4,B)]</code> ko key ke according sort karo. Stable output mein equal key 4 ke labels kis order mein rahenge?</p><strong>(2,X), (4,A), (4,B)</strong></article><article><h3>Why it matters</h3><p>Equal marks wale students ko roll number order mein preserve karna ho toh stability meaningful hai. Sirf values dekhne se stable/non-stable difference visible nahi hota.</p></article></div>${state(['4A','2X','4B'], 'stable sort by key', ['2X','4A','4B'])}<div class="table-wrap"><table><thead><tr><th>Property</th><th>Question ka meaning</th><th>Example</th></tr></thead><tbody><tr><td>Stable</td><td>Equal keys ka prior order stays</td><td>4A remains before 4B</td></tr><tr><td>In-place</td><td>Input storage itself changes</td><td>Bubble / insertion typical</td></tr><tr><td>Adaptive</td><td>Nearly sorted input par faster</td><td>Insertion sort</td></tr><tr><td>Comparison count</td><td><code>&lt;</code>/<code>&gt;</code> checks</td><td>PYQ may ask exact count</td></tr></tbody></table></div><div class="danger"><b>GATE trap</b><p>“Pass”, “comparison”, “swap” aur “shift” same metric nahi hain. Question ka exact wording underline karo before trace.</p></div></section>

<section class="chapter searchable" id="bubble-theory" data-title="8.2.1 · Bubble Sort theory">${chapter('8.2.1', 'BUBBLE SORT · THEORY', 'Adjacent inversion ko repeatedly fix karo', 'One complete pass ke baad largest currently-unsorted value last unsorted position par guaranteed hoti hai.')}<div class="zero-title"><span>QUESTION</span><h2><code>[5, 1, 4, 2, 8]</code> par first bubble pass ke har comparison ka trace.</h2><p>Only adjacent pair compare hota hai. Agar left > right, swap. Biggest value “bubble” hoke right edge tak jaata hai.</p></div><div class="table-wrap"><table><thead><tr><th>j</th><th>Compared pair</th><th>Swap?</th><th>Array after step</th><th>What is safe?</th></tr></thead><tbody><tr><td>0</td><td>5, 1</td><td>Yes</td><td>[1,5,4,2,8]</td><td>—</td></tr><tr><td>1</td><td>5, 4</td><td>Yes</td><td>[1,4,5,2,8]</td><td>—</td></tr><tr><td>2</td><td>5, 2</td><td>Yes</td><td>[1,4,2,5,8]</td><td>—</td></tr><tr><td>3</td><td>5, 8</td><td>No</td><td>[1,4,2,5,8]</td><td>8 was already greater; global max at end</td></tr></tbody></table></div>${state(['5','1','4','2','8'], 'pass 1', ['1','4','2','5','8'], { active:[0,1] }, { fixed:[4] })}<div class="two-grid"><article><h3>Why end value fixed?</h3><p>Har adjacent comparison mein larger of pair right jaata hai. Maximum kisi bhi left neighbour ke saath compare hote hue right cross karta rahega.</p></article><article><h3>Pass count</h3><p>n items: maximum n−1 passes. Pass p ke baad last p positions fixed / sorted suffix mein hoti hain.</p></article></div><div class="danger"><b>GATE trap</b><p>Bubble “one pass” ka meaning inner loop ke all adjacent comparisons. One swap ko one pass mat bolo.</p></div></section>

<section class="chapter searchable" id="bubble-code" data-title="8.2.2 · Bubble Sort code">${chapter('8.2.2', 'BUBBLE SORT · CODE', 'Outer pass aur inner adjacent scan', 'swapped flag already-sorted input par unnecessary remaining passes stop karta hai.')} ${codebox('Python · stable optimised bubble sort', `def bubble_sort(arr):\n    n = len(arr)\n    for end in range(n - 1, 0, -1):\n        swapped = False\n        for j in range(end):\n            if arr[j] > arr[j + 1]:\n                arr[j], arr[j + 1] = arr[j + 1], arr[j]\n                swapped = True\n        if not swapped:\n            break\n    return arr`)}<div class="steps"><article><b>1</b><h3><code>end</code></h3><p>Current unsorted region ka right boundary. End se right values previous passes mein fixed hain.</p></article><article><b>2</b><h3><code>j</code></h3><p><code>j</code> aur <code>j+1</code> adjacent pair hain. Strict <code>&gt;</code> equals ko swap nahi karta, hence stability.</p></article><article><b>3</b><h3><code>swapped</code></h3><p>Full pass mein no swap means no adjacent inversion; ascending array already sorted.</p></article></div><div class="callout"><b>Dry run: sorted [1,2,3]</b><p>First pass: 1>2 false, 2>3 false. <code>swapped=False</code>, break. Time O(n), not O(n²), only optimised version mein.</p></div></section>

<section class="chapter searchable" id="selection-theory" data-title="8.3.1 · Selection Sort theory">${chapter('8.3.1', 'SELECTION SORT · THEORY', 'Unsorted part scan, minimum ko final slot mein rakho', 'Pass i ke baad prefix indices 0…i sorted and final-position items hote hain.')}<div class="zero-title"><span>QUESTION</span><h2><code>[29,10,14,37,13]</code> first pass: kya compare aur kya swap?</h2><p>Minimum candidate 29 se start. Scan after: 10 is smallest. Only end mein 29 ↔ 10 swap.</p></div>${state(['29','10','14','37','13'], 'minimum 10 selected; swap index 0 ↔ 1', ['10','29','14','37','13'], { active:[0,1] }, { fixed:[0] })}<div class="table-wrap"><table><thead><tr><th>Scan item</th><th>Current minimum</th><th>Minimum index</th><th>Swap now?</th></tr></thead><tbody><tr><td>29</td><td>29</td><td>0</td><td>No</td></tr><tr><td>10</td><td>10</td><td>1</td><td>No—scan continues</td></tr><tr><td>14, 37, 13</td><td>10</td><td>1</td><td>No</td></tr><tr><td>Scan complete</td><td>10</td><td>1</td><td>Yes, one final swap</td></tr></tbody></table></div><div class="two-grid"><article><h3>Comparison behavior</h3><p>Already sorted array par bhi minimum find karne ke liye full unsorted region scan hota hai. Best and worst both O(n²).</p></article><article><h3>Write behavior</h3><p>At most one swap per pass → O(n) swaps. Isko bubble ke many swaps se compare karna common GATE point hai.</p></article></div></section>

<section class="chapter searchable" id="selection-code" data-title="8.3.2 · Selection Sort code">${chapter('8.3.2', 'SELECTION SORT · CODE', 'min_index reference ko trace karo', 'Scan ke during array change nahi hota; min_index changes. Scan complete hone par exactly one swap possible hai.')} ${codebox('Python · selection sort', `def selection_sort(arr):\n    n = len(arr)\n    for i in range(n - 1):\n        min_index = i\n        for j in range(i + 1, n):\n            if arr[j] < arr[min_index]:\n                min_index = j\n        arr[i], arr[min_index] = arr[min_index], arr[i]\n    return arr`)}<div class="table-wrap"><table><thead><tr><th>Line idea</th><th>For first pass on [29,10,14,37,13]</th></tr></thead><tbody><tr><td><code>i=0, min_index=i</code></td><td>min_index → 29 at index 0</td></tr><tr><td><code>j=1</code></td><td>10 &lt; 29, so min_index → 1</td></tr><tr><td><code>j=2..4</code></td><td>14, 37, 13 none smaller than 10</td></tr><tr><td>final swap</td><td>arr[0] ↔ arr[1] → [10,29,14,37,13]</td></tr></tbody></table></div><div class="danger"><b>Stability trap</b><p>Standard selection sort generally stable nahi: long-distance swap equal-key element ke across jump karwa sakta hai.</p></div></section>

<section class="chapter searchable" id="insertion-theory" data-title="8.4.1 · Insertion Sort theory">${chapter('8.4.1', 'INSERTION SORT · THEORY', 'Next key ko sorted prefix mein insert karo', 'Iteration i se pehle left prefix <code>arr[0…i−1]</code> sorted hai. Current item key hai.')}<div class="zero-title"><span>QUESTION</span><h2><code>[5,2,4,6,1,3]</code>, i=1: key=2 ko sorted prefix [5] mein insert karo.</h2><p>5 > 2, so 5 right shift. Empty slot index 0 par key 2 insert. Prefix [2,5] now sorted.</p></div>${state(['5','2','4','6','1','3'], 'save key=2 → shift 5 right → insert key', ['2','5','4','6','1','3'], { key:1 }, { fixed:[0,1] })}<div class="two-grid"><article><h3>Why “shift”, not repeated swap?</h3><p>Key variable safe rehta hai. Greater prefix values right move karte hain until key ka correct slot milta hai.</p></article><article><h3>Why nearly sorted fast?</h3><p>Har key ko few positions move karna padta hai. Number of shifts inversions ke proportional hota hai.</p></article></div><div class="callout"><b>GATE insight</b><p>Insertion sort ka best case O(n), worst O(n²). “Exactly k swaps/shifts” question essentially inversion counting trace test kar sakta hai.</p></div></section>

<section class="chapter searchable" id="insertion-code" data-title="8.4.2 · Insertion Sort code">${chapter('8.4.2', 'INSERTION SORT · CODE', 'key ko save, larger values shift, key insert', 'Order important hai: key save nahi karoge toh shift ke time current value lose ho sakti hai.')} ${codebox('Python · stable insertion sort', `def insertion_sort(arr):\n    for i in range(1, len(arr)):\n        key = arr[i]\n        j = i - 1\n        while j >= 0 and arr[j] > key:\n            arr[j + 1] = arr[j]\n            j -= 1\n        arr[j + 1] = key\n    return arr`)}<div class="table-wrap"><table><thead><tr><th>Step for [5,2,4], i=1</th><th>Reference / value</th><th>Array</th></tr></thead><tbody><tr><td>save</td><td>key=2, j=0</td><td>[5,2,4]</td></tr><tr><td>condition</td><td>arr[0]=5 > key=2</td><td>—</td></tr><tr><td>shift</td><td>arr[1]=arr[0]; j=-1</td><td>[5,5,4]</td></tr><tr><td>insert</td><td>arr[j+1]=key → arr[0]=2</td><td>[2,5,4]</td></tr></tbody></table></div><div class="danger"><b>Off-by-one trap</b><p><code>j</code> loop ke baad last value smaller-or-equal key ke index par hota hai. Key must go at <code>j+1</code>, not <code>j</code>.</p></div></section>

<section class="chapter searchable" id="merge-theory" data-title="8.5.1 · Merge Sort theory">${chapter('8.5.1', 'MERGE SORT · THEORY', 'Break until trivial, then sorted halves merge', 'Divide phase order decide nahi karti; merge phase two sorted streams ko combine karta hai.')}<div class="sort-recursion"><div><b>[38,27,43,3]</b><span>split</span></div><div><b>[38,27]</b><b>[43,3]</b><span>split</span></div><div><b>[38]</b><b>[27]</b><b>[43]</b><b>[3]</b><span>merge</span></div><div><b>[27,38]</b><b>[3,43]</b><span>merge</span></div><div><b>[3,27,38,43]</b></div></div><div class="two-grid"><article><h3>Why O(n log n)?</h3><p>Array log n levels tak halves mein split hoti hai. Ek level ke all merges total n items process karte hain.</p></article><article><h3>Why extra O(n)?</h3><p>Standard array merge temporary left/right/output buffer use karta hai. It is not normally in-place.</p></article></div><div class="callout"><b>Stable merge rule</b><p>When <code>left[i] == right[j]</code>, left choose karo (use <code>&lt;=</code>). Left item input mein pehle tha, so stability remains.</p></div></section>

<section class="chapter searchable" id="merge-code" data-title="8.5.2 · Merge Sort code">${chapter('8.5.2', 'MERGE SORT · CODE', 'Two sorted halves ke front candidates compare karo', 'One half exhaust ho to second half ke remaining elements already sorted hain—direct append.')} ${codebox('Python · merge sort', `def merge_sort(arr):\n    if len(arr) <= 1:\n        return arr\n    mid = len(arr) // 2\n    left = merge_sort(arr[:mid])\n    right = merge_sort(arr[mid:])\n    result = []\n    i = j = 0\n    while i < len(left) and j < len(right):\n        if left[i] <= right[j]:\n            result.append(left[i]); i += 1\n        else:\n            result.append(right[j]); j += 1\n    return result + left[i:] + right[j:]`)}<div class="table-wrap"><table><thead><tr><th>Merge [1,4,7] + [2,3,8]</th><th>Compare</th><th>Output now</th><th>Pointer move</th></tr></thead><tbody><tr><td>1</td><td>1 vs 2 → take 1</td><td>[1]</td><td>i → 1</td></tr><tr><td>2</td><td>4 vs 2 → take 2</td><td>[1,2]</td><td>j → 1</td></tr><tr><td>3</td><td>4 vs 3 → take 3</td><td>[1,2,3]</td><td>j → 2</td></tr><tr><td>4</td><td>4 vs 8 → take 4</td><td>[1,2,3,4]</td><td>i → 2</td></tr><tr><td>5</td><td>7 vs 8 → take 7; append 8</td><td>[1,2,3,4,7,8]</td><td>done</td></tr></tbody></table></div></section>

<section class="chapter searchable" id="quick-theory" data-title="8.6.1 · Quick Sort theory">${chapter('8.6.1', 'QUICK SORT · THEORY', 'Pivot ke around partition, then recursive subproblems', 'Partition complete hone ke baad pivot final sorted position par hota hai. Left/right regions internally sorted abhi nahi hote.')}<div class="zero-title"><span>PARTITION INVARIANT</span><h2>Pivot p ke baad: left values ≤ pivot ≤ right values.</h2><p>Yeh only pivot placement guarantee hai. Left aur right regions ko recursively quicksort karna still baaki hai.</p></div>${state(['9','3','7','1','8','2','5'], 'pivot = 5; partition', ['3','1','2','5','8','7','9'], { key:6 }, { fixed:[3] })}<div class="two-grid"><article><h3>Average case</h3><p>Balanced-ish partitions → O(n log n). Many practical implementations random/median-like pivot strategy use karti hain to avoid predictable bad inputs.</p></article><article><h3>Worst case</h3><p>Every pivot extreme ho: subproblems n−1 and 0 → O(n²). Sorted input + first/last deterministic pivot common trap hai.</p></article></div><div class="danger"><b>GATE trap</b><p>“Expected” quicksort recurrence random pivot rank ki average leti hai. <code>2T(n/2)+O(n)</code> only perfectly balanced special case hai, expected recurrence itself nahi.</p></div></section>

<section class="chapter searchable" id="quick-code" data-title="8.6.2 · Quick Sort code">${chapter('8.6.2', 'QUICK SORT · CODE', 'Tumhara Quick Sort code: first pivot, p aur q', 'pivot=arr[low]. p first > pivot aur q first ≤ pivot find karta hai.')} ${codebox('Python · your first-pivot quicksort', quickSortUserCode.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;'))}<div class="table-wrap"></div></section>

<section class="chapter searchable" id="counting-theory" data-title="8.7.1 · Counting Sort theory">${chapter('8.7.1', 'COUNTING SORT · THEORY', 'Values compare nahi; frequency count hoti hai', 'Integer keys ka compact known range ho toh count array each value ka occurrence track karta hai.')}<div class="zero-title"><span>QUESTION</span><h2><code>[2,0,2,1,1,0]</code> ko count array se sort karo.</h2><p>Value range 0…2, so count=[2,2,2]. Output: 0,0,1,1,2,2.</p></div><div class="counting-visual"><div><span>VALUE</span><b>0</b><b>1</b><b>2</b></div><div><span>COUNT</span><b>2</b><b>2</b><b>2</b></div><div><span>OUTPUT</span><b>0,0</b><b>1,1</b><b>2,2</b></div></div><div class="two-grid"><article><h3>When it wins</h3><p>n large aur k (range size) reasonably small. Complexity O(n+k), comparison sorting lower bound is case par apply nahi hota.</p></article><article><h3>When it loses</h3><p>n=10 but range 0…10⁹ means count array absurdly large. Sparse large keys ke liye bad choice.</p></article></div></section>

<section class="chapter searchable" id="counting-code" data-title="8.7.2 · Counting Sort code">${chapter('8.7.2', 'COUNTING SORT · CODE', 'Tumhara code: count frequencies, phir result banao', 'Har index ek value hai; us index par stored number batata hai ki value kitni baar aayi.')} ${codebox('Python · your counting sort code', `def counting_sort(arr):\n    max_item=max(arr)\n    count_arr=[0] * (max_item +1)\n    for i in arr:\n        count_arr[i]= count_arr[i]+1\n\n    result=[]\n\n    for i in range(len(count_arr)):\n        result.extend([i] * count_arr[i])\n\n    return result\n\narr = [4, 2, 2, 1, 3, 4, 1]\n\nprint(counting_sort(arr))`)}<div class="steps"><article><b>1</b><h3>Count array</h3><p><code>max_item=4</code>, so indices 0…4 ke liye <code>[0,0,0,0,0]</code> banao.</p></article><article><b>2</b><h3>Frequency</h3><p>Input scan ke baad <code>count_arr=[0,2,2,1,2]</code>. Index 1 par 2 ka matlab value 1 do baar aayi.</p></article><article><b>3</b><h3>Result rebuild</h3><p><code>i</code> 0…4 values leta hai. <code>extend([i] * count_arr[i])</code> se output <code>[1,1,2,2,3,4,4]</code> banta hai.</p></article></div><div class="callout"><b>Why range, not direct count_arr loop?</b><p><code>for i in count_arr</code> frequencies (0,2,2,1,2) deta. Hume value/index (0,1,2,3,4) chahiye, isliye <code>range(len(count_arr))</code>.</p></div><div class="danger"><b>Is exact code ki boundaries</b><p><code>arr=[]</code> par <code>max(arr)</code> error dega. Negative values direct index se sahi handle nahi hoti. Yeh plain integer values rebuild karta hai; equal-key records ka original order preserve karna ho toh cumulative-count stable variant chahiye. Time O(n+k), auxiliary space O(n+k).</p></div></section>

<section class="chapter searchable" id="complexity" data-title="8.8 · Complexity Analysis">${chapter('8.8', 'COMPLEXITY ANALYSIS', 'Algorithm name se nahi, exact guarantee se compare karo', 'Time, auxiliary space, stability aur input-sensitivity ek table mein see karo.')}<div class="table-wrap"><table><thead><tr><th>Algorithm</th><th>Best</th><th>Average</th><th>Worst</th><th>Auxiliary</th><th>Stable?</th><th>In-place?</th></tr></thead><tbody><tr><td>Bubble (optimised)</td><td>O(n)</td><td>O(n²)</td><td>O(n²)</td><td>O(1)</td><td>Yes</td><td>Yes</td></tr><tr><td>Selection</td><td>O(n²)</td><td>O(n²)</td><td>O(n²)</td><td>O(1)</td><td>No*</td><td>Yes</td></tr><tr><td>Insertion</td><td>O(n)</td><td>O(n²)</td><td>O(n²)</td><td>O(1)</td><td>Yes</td><td>Yes</td></tr><tr><td>Merge</td><td>O(n log n)</td><td>O(n log n)</td><td>O(n log n)</td><td>O(n)</td><td>Yes</td><td>No (standard array)</td></tr><tr><td>Quick</td><td>O(n log n)</td><td>O(n log n)</td><td>O(n²)</td><td>O(log n) avg stack</td><td>No*</td><td>Yes</td></tr><tr><td>Counting</td><td>O(n+k)</td><td>O(n+k)</td><td>O(n+k)</td><td>O(n+k)</td><td>Yes†</td><td>No (standard)</td></tr></tbody></table></div><p class="table-note">*Standard implementation. †With cumulative counts, output array and right-to-left placement.</p><div class="callout"><b>Space language</b><p>Input array storage aur auxiliary space separate rakho. For merge, source array n is input; temporary merge buffers O(n) auxiliary are additional.</p></div></section>

<section class="chapter searchable" id="context" data-title="8.9 · DS Context">${chapter('8.9', 'DS CONTEXT', 'Input property se algorithm choose karo', 'GATE mein “best” bina condition ke answer nahi hota. Constraints identify karo.')}<div class="decision-grid"><article><span>Nearly sorted</span><b>Insertion sort</b><p>Few inversions → few shifts.</p></article><article><span>Few writes</span><b>Selection sort</b><p>At most one swap/pass.</p></article><article><span>Stable + worst O(n log n)</span><b>Merge sort</b><p>But O(n) extra buffer.</p></article><article><span>In-place average fast</span><b>Quick sort</b><p>Pivot worst-case risk remember.</p></article><article><span>Small integer range</span><b>Counting sort</b><p>O(n+k), not comparison sort.</p></article><article><span>Tiny / teaching trace</span><b>Bubble sort</b><p>Simple adjacent swaps; not general fastest.</p></article></div><div class="callout"><b>Python context</b><p>Real Python code mein <code>list.sort()</code> / <code>sorted()</code> stable Timsort use karta hai. But GATE question algorithm explicitly name kare, toh us named algorithm ka exact pass/pivot/complexity trace follow karo.</p></div><div class="final"><h3>Module 8 mastery target</h3><p>Any array ko 2 passes tak manually trace karo; then tell which region is fixed, whether equal keys remain ordered, and which complexity claim is actually guaranteed.</p><button data-jump="practice">Lecture-wise practice kholo →</button></div></section>
</div>
<div class="view" data-panel="pyq"><section class="page-hero searchable" data-title="Sorting PYQ Evidence"><p class="eyebrow"><i></i> Supplied paper evidence</p><h1>Sorting PYQ Lab</h1><p>Supplied GATE DA 2024–2026 papers ke direct sorting questions, clean transcript, verified answer aur trace ke saath.</p><div class="practice-summary"><span><b>${pyqs.length}</b>direct PYQs</span><span><b>2024–26</b>coverage</span><span><b>visible</b>solutions</span></div></section><section class="pyq-list">${pyqMarkup}</section></div>
<div class="view" data-panel="practice"><section class="page-hero practice-head searchable" data-title="Practice Lab"><p class="eyebrow"><i></i> Lecture-wise GATE drills</p><h1>Module 8 Practice</h1><p>${module8QuestionCount} questions · 15 exact lecture sets · 50 questions in every set.</p><div class="practice-summary"><span><b>15</b>lecture sets</span><span><b>50</b>each</span><span><b>saved</b>attempt progress</span></div></section><section class="practice-controls searchable"><div><label for="practiceTopic">Lecture topic</label><select id="practiceTopic">${topicOptions}</select></div><div><label for="practiceDifficulty">Difficulty</label><select id="practiceDifficulty"><option value="all">All levels</option><option>Foundation</option><option>Core</option><option>Practice</option></select></div><div class="practice-score"><span>Attempted</span><b id="practiceScore">0/0</b></div></section><section class="practice-context" id="practiceContext"></section><section class="question-list" id="questionList"></section></div>
<div class="view" data-panel="revision"><section class="page-hero revision-head searchable"><p class="eyebrow"><i></i> Last-day recall</p><h1>Module 8 Revision</h1><button id="print">Print sheet</button></section><section class="revision-grid"><article class="rev"><span>01</span><h2>Quadratic sorts</h2><ul><li>Bubble: largest suffix</li><li>Selection: smallest prefix</li><li>Insertion: sorted prefix</li></ul></article><article class="rev"><span>02</span><h2>Divide & conquer</h2><ul><li>Merge: O(n log n), stable</li><li>Quick: pivot final position</li><li>Quick worst O(n²)</li></ul></article><article class="rev"><span>03</span><h2>Counting</h2><ul><li>Integer range k</li><li>O(n+k)</li><li>Range too large = bad</li></ul></article><article class="rev"><span>04</span><h2>Language traps</h2><ul><li>Pass ≠ swap</li><li>Stable ≠ in-place</li><li>Input vs auxiliary space</li></ul></article><article class="rev warning"><span>05</span><h2>Decision rule</h2><ul><li>Nearly sorted → insertion</li><li>Guarantee → merge</li><li>Small range → counting</li></ul></article></section></div>
</main></div><button class="menu" id="menu">☰</button><div class="toast">Copied</div>`

const bubbleTheory = document.querySelector('#bubble-theory')
bubbleTheory.querySelector('.chapter-head h2').textContent = 'Adjacent pair ko ascending order mein fix karo'
bubbleTheory.querySelector('.chapter-head p').textContent = 'One complete pass ke baad largest currently-unsorted value last unsorted position par guaranteed hoti hai.'
bubbleTheory.querySelector('.zero-title h2').innerHTML = '<code>[5, 1, 4, 2, 8]</code> par ascending Bubble Sort ka first pass trace.'
bubbleTheory.querySelector('.zero-title p').textContent = 'Har comparison current, updated array par hota hai. Is code mein arr[j] > arr[j+1] ho to swap: j = 0, 1, 2, 3 par pairs (5,1), (5,4), (5,2), (5,8) hain.'
bubbleTheory.querySelector('.table-wrap').outerHTML = bubbleTraceTable
bubbleTheory.querySelector('.table-wrap').insertAdjacentHTML('afterend', bubbleComparisonCards + bubbleLabMarkup)
bubbleTheory.querySelector('.sort-state-flow').outerHTML = state(['5','1','4','2','8'], 'complete pass 1', ['1','4','2','5','8'], { active:[0,1] }, { fixed:[4] })
bubbleTheory.querySelector('.two-grid').innerHTML = `<article><h3>Why end value fixed?</h3><p>Har adjacent comparison mein larger pair value right jaati hai. Maximum kisi bhi left neighbour ke saath compare hote hue right cross karta rahega.</p></article><article><h3>Pass count</h3><p>n items: maximum n−1 useful passes. Pass p ke baad last p positions ascending-sorted suffix mein fixed hoti hain.</p></article>`
const lectureBubbleCode = `def bubble_sort(arr):\n    length = len(arr)\n    for i in range(length):\n        swapped = False\n\n        for j in range(length - i - 1):\n            if arr[j] > arr[j + 1]:\n                arr[j], arr[j + 1] = arr[j + 1], arr[j]\n                swapped = True\n\n        if swapped == False:\n            break\n\n    return arr`
document.querySelector('#bubble-code .chapter-head h2').textContent = 'Your optimised ascending Bubble Sort code'
document.querySelector('#bubble-code .chapter-head p').textContent = 'Exactly your code: larger left value ko right value se swap karo. No swap in a full pass means array already sorted, so break.'
document.querySelector('#bubble-code .codebox code').textContent = lectureBubbleCode
document.querySelector('#bubble-code .steps').innerHTML = `<article><b>1</b><h3><code>i</code></h3><p>Each pass ke baad current largest value right side ke sorted suffix mein settle hoti hai.</p></article><article><b>2</b><h3><code>j</code></h3><p><code>j</code> aur <code>j+1</code> adjacent pair hain. Strict <code>&gt;</code> means larger left value ko right push karo; equal values swap nahi hote.</p></article><article><b>3</b><h3><code>swapped</code></h3><p>Full pass mein ek bhi swap nahi hua means every adjacent pair ascending order mein tha. Isliye array sorted hai aur <code>break</code> safe hai.</p></article>`
document.querySelector('#bubble-code .callout').innerHTML = `<b>Quick check: [1,2,3]</b><p>First pass: 1 &gt; 2 false, then 2 &gt; 3 false. <code>swapped</code> False hi raha, so <code>break</code> hota hai. Best case O(n) hai.</p>`

const selectionTheory = document.querySelector('#selection-theory')
selectionTheory.querySelector('.table-wrap').insertAdjacentHTML('afterend', selectionLabMarkup)
const lectureSelectionCode = `def selection_sort(arr):\n    length = len(arr)\n\n    for i in range(length):\n        min_index = i\n\n        for j in range(i + 1, length):\n            if arr[j] < arr[min_index]:\n                min_index = j\n\n        arr[i], arr[min_index] = arr[min_index], arr[i]\n\n    return arr`
document.querySelector('#selection-code .chapter-head h2').textContent = 'Your Selection Sort code'
document.querySelector('#selection-code .chapter-head p').textContent = 'Exactly your code: pehle whole unsorted region scan karke minimum locate karo; phir pass end par arr[i] ke saath one swap.'
document.querySelector('#selection-code .codebox code').textContent = lectureSelectionCode

const mergeCallTree = `<div class="merge-call-tree"><div class="merge-tree-head"><span>CODE FLOW · RECURSION CALL TREE</span><p>Har recursive call complete return karta hai, tab parent call next statement par aati hai.</p></div><div class="merge-tree-code" role="img" aria-label="Merge sort recursion tree for 8, 3, 5, 4"><span class="merge-root">merge_sort([8,3,5,4])</span><span>│</span><span>├── sorted_left = merge_sort([8,3])</span><span>│   │</span><span>│   ├── merge_sort([8]) → [8] <em>base case</em></span><span>│   ├── merge_sort([3]) → [3] <em>base case</em></span><span>│   └── merge([8], [3]) → <strong>[3,8]</strong></span><span>│</span><span>├── sorted_left = [3,8] <b>✓ returned</b></span><span>│</span><span class="merge-focus">├── sorted_right = merge_sort([5,4]) <small>← RIGHT BRANCH: ab yahan execution hai</small></span><span class="merge-focus">│   │</span><span class="merge-focus">│   ├── merge_sort([5]) → [5] <em>base case</em></span><span class="merge-focus">│   ├── merge_sort([4]) → [4] <em>base case</em></span><span class="merge-focus">│   └── merge([5], [4]) → <strong>[4,5]</strong></span><span>│</span><span>├── sorted_right = [4,5] <b>✓ returned</b></span><span>│</span><span>└── merge([3,8], [4,5])</span><span class="merge-result">          ↓&nbsp;&nbsp; [3,4,5,8]</span></div><div class="merge-tree-note"><b>Important:</b> <code>merge([3,8], [4,5])</code> tabhi call hota hai jab left aur right dono fully sorted return ho chuke hote hain.</div></div>`
const lectureMergeCode = `def merge(left, right):\n    result = []\n    i = 0\n    j = 0\n\n    # Compare elements from both sorted lists\n    while i < len(left) and j < len(right):\n        if left[i] <= right[j]:\n            result.append(left[i])\n            i += 1\n        else:\n            result.append(right[j])\n            j += 1\n\n    # If some elements are still left in left list\n    while i < len(left):\n        result.append(left[i])\n        i += 1\n\n    # If some elements are still left in right list\n    while j < len(right):\n        result.append(right[j])\n        j += 1\n\n    return result\n\ndef merge_sort(arr):\n    # Base case: a single element is already sorted\n    if len(arr) <= 1:\n        return arr\n\n    mid = len(arr) // 2\n    left = arr[:mid]\n    right = arr[mid:]\n\n    sorted_left = merge_sort(left)\n    sorted_right = merge_sort(right)\n\n    return merge(sorted_left, sorted_right)\n\n# Main\narr = [8, 3, 5, 4]\nsorted_arr = merge_sort(arr)\nprint("Original:", arr)\nprint("Sorted:", sorted_arr)`
const mergeCodeSection = document.querySelector('#merge-code')
mergeCodeSection.querySelector('.chapter-head h2').textContent = 'Your Merge Sort code: separate merge helper'
mergeCodeSection.querySelector('.chapter-head p').textContent = 'Exactly tumhara flow: recursively left complete karo, recursively right complete karo, then only two sorted outputs ko merge karo.'
mergeCodeSection.querySelector('.codebox code').textContent = lectureMergeCode
mergeCodeSection.querySelector('.codebox').insertAdjacentHTML('afterend', mergeCallTree)
mergeCodeSection.querySelector('.table-wrap').innerHTML = `<table><thead><tr><th>merge([3,8], [4,5])</th><th>Comparison</th><th>result</th><th>Pointer change</th></tr></thead><tbody><tr><td>Start</td><td>i=0, j=0</td><td>[]</td><td>left[0]=3, right[0]=4</td></tr><tr><td>Round 1</td><td>3 ≤ 4 → append 3</td><td>[3]</td><td>i=1</td></tr><tr><td>Round 2</td><td>8 ≤ 4 false → append 4</td><td>[3,4]</td><td>j=1</td></tr><tr><td>Round 3</td><td>8 ≤ 5 false → append 5</td><td>[3,4,5]</td><td>j=2; right exhausted</td></tr><tr><td>Leftover loop</td><td>append left[1]=8</td><td>[3,4,5,8]</td><td>i=2; done</td></tr></tbody></table>`
mergeCodeSection.insertAdjacentHTML('beforeend', `<div class="callout"><b>GATE trace rule</b><p><code>merge()</code> sirf <em>sorted</em> left aur right lists receive karta hai. Merge ke andar unsorted original array ko compare mat karo; recursion already halves ko sort karke return kar chuki hoti hai.</p></div>`)

const quickTheory = document.querySelector('#quick-theory')
quickTheory.querySelector('.zero-title h2').textContent = 'Partition ke baad pivot apni final position par hota hai.'
quickTheory.querySelector('.sort-state-flow').outerHTML = state(['40','55','20','30','80','25','90','50'], 'first pivot 40 · p/q partition', ['30','25','20','40','80','55','90','50'], { key: 0 }, { fixed: [3] })
quickTheory.querySelector('.sort-state-flow').insertAdjacentHTML('afterend', quickSortLabMarkup)
const quickCodeSection = document.querySelector('#quick-code')
quickCodeSection.querySelector('.chapter-head h2').textContent = 'Tumhara Quick Sort code: first pivot, p aur q'
quickCodeSection.querySelector('.chapter-head p').textContent = 'pivot=arr[low]. p right se first > pivot, q left se first ≤ pivot dhundta hai. Swap ke baad inner scans hi pointers ko aage badhate hain.'
quickCodeSection.querySelector('.codebox > div span').textContent = 'Python · your first-pivot quicksort'
quickCodeSection.querySelector('.codebox code').textContent = quickSortUserCode
quickCodeSection.querySelector('.table-wrap').innerHTML = `<table><thead><tr><th>Step</th><th>p</th><th>q</th><th>Array / decision</th></tr></thead><tbody><tr><td>Start; pivot=40</td><td>1 → 55</td><td>7 → 50</td><td>[40,55,20,30,80,25,90,50]</td></tr><tr><td>First scans stop</td><td>1 → 55 &gt; 40</td><td>5 → 25 ≤ 40</td><td>q skips 50 and 90; p &lt; q, so swap 55 and 25</td></tr><tr><td>After swap</td><td>1 → 25</td><td>5 → 55</td><td>[40,25,20,30,80,55,90,50]. No explicit p++ or q--</td></tr><tr><td>Next scans stop</td><td>4 → 80 &gt; 40</td><td>3 → 30 ≤ 40</td><td>p=4, q=3: pointers crossed</td></tr><tr><td>Pivot placement</td><td>—</td><td>3</td><td>Swap 40 and 30 → [30,25,20,40,80,55,90,50]</td></tr></tbody></table>`

const tabs = [...document.querySelectorAll('.tab')]
const panels = [...document.querySelectorAll('.view')]
const practiceTopic = document.querySelector('#practiceTopic')
const practiceDifficulty = document.querySelector('#practiceDifficulty')
const searchInput = document.querySelector('#search')
function setView(view) { tabs.forEach(tab => tab.classList.toggle('active', tab.dataset.view === view)); panels.forEach(panel => panel.classList.toggle('active', panel.dataset.panel === view)); window.scrollTo({ top: 0, behavior: 'smooth' }) }
tabs.forEach(tab => tab.onclick = () => setView(tab.dataset.view))

function renderPractice() {
  const topic = module8Topics.find(item => item.id === practiceTopic.value)
  const questions = topic.questions.filter(item => practiceDifficulty.value === 'all' || item.difficulty === practiceDifficulty.value)
  const saved = JSON.parse(localStorage.getItem('da-m8-practice') || '{}')
  const key = item => `${topic.id}-${item.id}`
  const esc = value => String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;')
  const updateScore = () => {
    const attempted = questions.filter(item => saved[key(item)]).length
    const correct = questions.filter(item => saved[key(item)]?.correct).length
    document.querySelector('#practiceScore').textContent = `${attempted}/${questions.length} · ${correct} correct`
  }
  updateScore()
  document.querySelector('#practiceContext').innerHTML = `<div><span>LECTURE TOPIC</span><h2>${esc(topic.label)}</h2><p>Ek option choose karo. Phir turant sahi/galat aur chhoti explanation dikhegi.</p></div><strong>${questions.length} shown</strong>`
  document.querySelector('#questionList').innerHTML = questions.map((item, i) => {
    const choice = saved[key(item)]?.selection
    const answered = typeof choice === 'string'
    const isCorrect = choice === item.answer
    return `<article class="question-card ${answered ? isCorrect ? 'answered-correct' : 'answered-wrong' : ''}" data-question-index="${i}"><div class="question-card-meta"><span>Q${String(i + 1).padStart(2, '0')}</span><small>${esc(item.difficulty)}${item.pattern ? ' · ' + esc(item.pattern) : ''}</small></div><h3>${esc(item.prompt)}</h3><div class="options" role="group" aria-label="Question ${i + 1} options">${item.options.map((option, optionIndex) => `<button type="button" data-option-index="${optionIndex}" class="${answered && option === item.answer ? 'correct' : ''} ${answered && option === choice && !isCorrect ? 'wrong' : ''}" ${answered ? 'disabled' : ''}><b>${String.fromCharCode(65 + optionIndex)}</b><span>${esc(option)}</span></button>`).join('')}</div><div class="question-feedback ${answered ? isCorrect ? 'is-correct' : 'is-wrong' : ''}" role="status" ${answered ? '' : 'hidden'}><strong>${answered ? isCorrect ? '✓ Sahi jawab' : '✗ Galat jawab' : ''}</strong><p><b>Correct option:</b> ${esc(item.answer)}</p><p>${esc(item.explanation)}</p></div></article>`
  }).join('')
  document.querySelectorAll('.question-card .options button').forEach(button => button.onclick = () => {
    const card = button.closest('.question-card')
    const item = questions[Number(card.dataset.questionIndex)]
    const selection = item.options[Number(button.dataset.optionIndex)]
    if (saved[key(item)]?.selection) return
    const correct = selection === item.answer
    saved[key(item)] = { selection, correct }
    localStorage.setItem('da-m8-practice', JSON.stringify(saved))
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
practiceTopic.onchange = renderPractice; practiceDifficulty.onchange = renderPractice; renderPractice()

function mountBubbleLab() {
  const lab = document.querySelector('#bubbleLab')
  const bars = lab.querySelector('[data-bubble-bars]')
  const statePanel = lab.querySelector('[data-bubble-state]')
  const codePanel = lab.querySelector('[data-bubble-code]')
  const controls = Object.fromEntries([...lab.querySelectorAll('[data-bubble]')].map(button => [button.dataset.bubble, button]))
  const sizeInput = lab.querySelector('[data-bubble-size]')
  const speedInput = lab.querySelector('[data-bubble-speed]')
  let original = [5, 1, 4, 2, 8]
  let frames = []
  let cursor = -1
  let timer = null

  const randomArray = size => {
    const values = Array.from({ length: 9 }, (_, index) => index + 1)
    for (let index = values.length - 1; index > 0; index--) { const target = Math.floor(Math.random() * (index + 1)); [values[index], values[target]] = [values[target], values[index]] }
    return values.slice(0, size)
  }
  const buildFrames = input => {
    const arr = [...input]; const result = []; let comparisons = 0; let swaps = 0
    for (let i = 0; i < arr.length; i++) {
      let swapped = false
      for (let j = 0; j < arr.length - 1 - i; j++) {
        const before = [...arr]; const left = arr[j]; const right = arr[j + 1]; const shouldSwap = left > right
        comparisons += 1
        if (shouldSwap) { [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]; swaps += 1; swapped = true }
        const passComplete = j === arr.length - 2 - i
        result.push({ before, after: [...arr], i, j, left, right, shouldSwap, comparisons, swaps, passComplete, sortedFrom: passComplete ? arr.length - 1 - i : arr.length - i, early: false })
      }
      if (!swapped && result.length) {
        result[result.length - 1].early = true
        break
      }
    }
    return result
  }
  const stop = () => { if (timer) clearInterval(timer); timer = null; controls.play.textContent = 'Play' }
  const code = frame => {
    const active = frame ? (frame.shouldSwap ? 5 : 4) : 2
    const lines = [
      'length = len(arr)',
      'for i in range(length):',
      '    swapped = False',
      '    for j in range(length - i - 1):',
      '        if arr[j] > arr[j + 1]:',
      '            arr[j], arr[j + 1] = arr[j + 1], arr[j]',
      '            swapped = True',
      '    if swapped == False:',
      '        break',
      'return arr'
    ]
    codePanel.innerHTML = lines.map((line, index) => `<span class="${index + 1 === active ? 'code-active' : ''}">${line.replaceAll('<', '&lt;').replaceAll('>', '&gt;')}</span>`).join('')
  }
  const render = () => {
    const frame = frames[cursor]
    const values = frame ? frame.after : original
    const sortedFrom = frame ? frame.sortedFrom : values.length
    bars.innerHTML = values.map((value, index) => {
      const comparing = frame && (index === frame.j || index === frame.j + 1)
      const role = frame && index === frame.j ? 'arr[j]' : frame && index === frame.j + 1 ? 'arr[j + 1]' : ''
      return `<div class="bubble-bar-wrap ${comparing ? 'is-comparing' : ''} ${index >= sortedFrom ? 'is-sorted' : ''}"><span>${role}</span><div class="bubble-bar" style="height:${48 + value * 19}px"><b>${value}</b></div><i>[${index}]</i></div>`
    }).join('')
    if (!frame) {
      statePanel.innerHTML = `<span>CURRENT STATE</span><h4>Ready to start</h4><p>Step dabao. First operation: pass <b>i=0</b>, comparison <b>j=0</b>, so values ${original[0]} and ${original[1]} compare hongi for ascending order.</p><div class="bubble-counters"><b>Passes: 0</b><b>Comparisons: 0</b><b>Swaps: 0</b></div>`
    } else {
      const passNote = frame.passComplete ? `<div class="bubble-pass-note"><b>PASS ${frame.i + 1} COMPLETE</b><p>${frame.early ? 'No swaps occurred, so swapped stays False and break stops all remaining passes: array is ascending-sorted.' : `Largest remaining value ${frame.after[frame.after.length - 1 - frame.i]} is now fixed at index ${frame.after.length - 1 - frame.i}. Next pass has one fewer comparison.`}</p></div>` : ''
      statePanel.innerHTML = `<span>CURRENT STATE</span><h4>PASS / i: ${frame.i} · COMPARISON / j: ${frame.j}</h4><div class="bubble-compare-read"><p><b>arr[j]</b> = ${frame.left}</p><p><b>arr[j + 1]</b> = ${frame.right}</p><strong>${frame.left} ${frame.shouldSwap ? '>' : '≤'} ${frame.right} → ${frame.shouldSwap ? 'SWAP' : 'NO SWAP'}</strong></div><p>${frame.shouldSwap ? `Left value larger hai, so ascending order ke liye indices ${frame.j} and ${frame.j + 1} exchange. Updated array shown above; j will move to ${frame.j + 1}.` : `Left value already smaller-or-equal hai. Pair ascending order mein hai, so no value moves; j will move to ${frame.j + 1}.`}</p><div class="bubble-counters"><b>Passes: ${frame.i + 1}</b><b>Comparisons: ${frame.comparisons}</b><b>Swaps: ${frame.swaps}</b></div>${passNote}`
    }
    code(frame)
    controls.previous.disabled = cursor < 0
    controls.step.disabled = cursor >= frames.length - 1
    if (cursor >= frames.length - 1) stop()
  }
  const reset = () => { stop(); frames = buildFrames(original); cursor = -1; render() }
  controls.step.onclick = () => { if (cursor < frames.length - 1) { cursor += 1; render() } }
  controls.previous.onclick = () => { stop(); if (cursor >= 0) { cursor -= 1; render() } }
  controls.restart.onclick = reset
  controls.play.onclick = () => {
    if (timer) { stop(); return }
    if (cursor >= frames.length - 1) cursor = -1
    controls.play.textContent = 'Pause'
    timer = setInterval(() => { if (cursor < frames.length - 1) { cursor += 1; render() } else stop() }, Number(speedInput.value))
  }
  controls.shuffle.onclick = () => { original = randomArray(Number(sizeInput.value)); reset() }
  sizeInput.oninput = () => { original = randomArray(Number(sizeInput.value)); reset() }
  lab.querySelectorAll('[data-preset]').forEach(button => button.onclick = () => {
    const presets = { random: randomArray(Number(sizeInput.value)), nearly: [1, 2, 4, 3, 5], reversed: [5, 4, 3, 2, 1], few: [1, 3, 2, 4, 5] }
    original = presets[button.dataset.preset]; sizeInput.value = original.length; reset()
  })
  reset()
}
mountBubbleLab()

function mountSelectionLab() {
  const lab = document.querySelector('#selectionLab')
  const bars = lab.querySelector('[data-selection-bars]')
  const statePanel = lab.querySelector('[data-selection-state]')
  const codePanel = lab.querySelector('[data-selection-code]')
  const controls = Object.fromEntries([...lab.querySelectorAll('[data-selection]')].map(button => [button.dataset.selection, button]))
  let original = [29, 10, 14, 37, 13]
  let frames = []
  let cursor = -1
  let timer = null

  const randomArray = () => Array.from({ length: 5 }, () => Math.floor(Math.random() * 89) + 10)
  const buildFrames = input => {
    const arr = [...input]; const result = []; let comparisons = 0; let swaps = 0
    for (let i = 0; i < arr.length; i++) {
      let minIndex = i
      if (i === arr.length - 1) {
        result.push({ before: [...arr], after: [...arr], i, j: null, previousMin: i, minIndex: i, foundSmaller: false, passComplete: true, swapped: false, isLastNoop: true, comparisons, swaps })
        continue
      }
      for (let j = i + 1; j < arr.length; j++) {
        const before = [...arr]; const previousMin = minIndex; const foundSmaller = arr[j] < arr[minIndex]
        comparisons += 1
        if (foundSmaller) minIndex = j
        const passComplete = j === arr.length - 1
        let swapped = false
        if (passComplete && minIndex !== i) { [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]]; swaps += 1; swapped = true }
        result.push({ before, after: [...arr], i, j, previousMin, minIndex, foundSmaller, passComplete, swapped, comparisons, swaps })
      }
    }
    return result
  }
  const stop = () => { if (timer) clearInterval(timer); timer = null; controls.play.textContent = 'Play' }
  const code = frame => {
    const active = !frame ? 2 : frame.passComplete ? 7 : frame.foundSmaller ? 6 : 5
    const lines = ['length = len(arr)', 'for i in range(length):', '    min_index = i', '    for j in range(i + 1, length):', '        if arr[j] < arr[min_index]:', '            min_index = j', '    arr[i], arr[min_index] = arr[min_index], arr[i]', 'return arr']
    codePanel.innerHTML = lines.map((line, index) => `<span class="${index + 1 === active ? 'code-active' : ''}">${line.replaceAll('<', '&lt;')}</span>`).join('')
  }
  const render = () => {
    const frame = frames[cursor]
    const values = frame ? frame.after : original
    const maxValue = Math.max(...values)
    bars.innerHTML = values.map((value, index) => {
      const scanning = frame && index === frame.j
      const currentMin = frame && index === frame.minIndex
      const fixed = frame && index < frame.i + (frame.passComplete ? 1 : 0)
      const label = scanning ? 'arr[j]' : currentMin ? 'min_index' : fixed ? 'FIXED' : ''
      const height = 54 + Math.round((value / maxValue) * 142)
      return `<div class="bubble-bar-wrap ${scanning || currentMin ? 'is-comparing' : ''} ${fixed ? 'is-sorted' : ''}"><span>${label}</span><div class="bubble-bar" style="height:${height}px"><b>${value}</b></div><i>[${index}]</i></div>`
    }).join('')
    if (!frame) {
      statePanel.innerHTML = `<span>CURRENT STATE</span><h4>Ready to start</h4><p>Pass <b>i=0</b> starts: <code>min_index = 0</code>, which currently references value ${original[0]}. Step dabao; first scan item index 1 hoga.</p><div class="bubble-counters"><b>Passes: 0</b><b>Comparisons: 0</b><b>Swaps: 0</b></div>`
    } else {
      const change = frame.isLastNoop ? `Last index par inner loop empty hai: <code>range(i + 1, length)</code> has no value. <code>min_index</code> same index ${frame.i} par hai.` : frame.foundSmaller ? `Value ${frame.before[frame.j]} is smaller than current minimum ${frame.before[frame.previousMin]}, so <code>min_index</code> changes from ${frame.previousMin} to ${frame.minIndex}.` : `Value ${frame.before[frame.j]} is not smaller than current minimum ${frame.before[frame.previousMin]}, so <code>min_index</code> stays at ${frame.minIndex}.`
      const passNote = frame.passComplete ? `<div class="bubble-pass-note"><b>PASS ${frame.i + 1} COMPLETE</b><p>${frame.isLastNoop ? `Your exact <code>range(length)</code> code performs a final self-swap: arr[${frame.i}] ↔ arr[${frame.i}]. Array does not change.` : frame.swapped ? `Only now swap: index ${frame.i} and minimum index ${frame.minIndex}. Index ${frame.i} is fixed.` : `Minimum was already at index ${frame.i}; no swap required. Index ${frame.i} is fixed.`}</p></div>` : ''
      const scanTitle = frame.isLastNoop ? 'NO INNER-LOOP SCAN' : `SCAN / j: ${frame.j}`
      const compareBox = frame.isLastNoop ? `<div class="bubble-compare-read"><p><b>min_index</b> = ${frame.minIndex}</p><p><b>arr[i]</b> = ${frame.before[frame.i]}</p><strong>FINAL SELF-SWAP → NO ARRAY CHANGE</strong></div>` : `<div class="bubble-compare-read"><p><b>arr[j]</b> = ${frame.before[frame.j]}</p><p><b>current minimum</b> = ${frame.before[frame.previousMin]} at index ${frame.previousMin}</p><strong>${frame.before[frame.j]} ${frame.foundSmaller ? '<' : '≥'} ${frame.before[frame.previousMin]} → ${frame.foundSmaller ? 'NEW MINIMUM' : 'KEEP MINIMUM'}</strong></div>`
      statePanel.innerHTML = `<span>CURRENT STATE</span><h4>PASS / i: ${frame.i} · ${scanTitle}</h4>${compareBox}<p>${change}</p><div class="bubble-counters"><b>Passes: ${frame.i + 1}</b><b>Comparisons: ${frame.comparisons}</b><b>Swaps: ${frame.swaps}</b></div>${passNote}`
    }
    code(frame)
    controls.previous.disabled = cursor < 0
    controls.step.disabled = cursor >= frames.length - 1
    if (cursor >= frames.length - 1) stop()
  }
  const reset = () => { stop(); frames = buildFrames(original); cursor = -1; render() }
  controls.step.onclick = () => { if (cursor < frames.length - 1) { cursor += 1; render() } }
  controls.previous.onclick = () => { stop(); if (cursor >= 0) { cursor -= 1; render() } }
  controls.restart.onclick = reset
  controls.play.onclick = () => {
    if (timer) { stop(); return }
    if (cursor >= frames.length - 1) cursor = -1
    controls.play.textContent = 'Pause'
    timer = setInterval(() => { if (cursor < frames.length - 1) { cursor += 1; render() } else stop() }, 750)
  }
  controls.shuffle.onclick = () => { original = randomArray(); reset() }
  reset()
}
mountSelectionLab()
mountQuickSortLab()

const toc = document.querySelector('#toc')
toc.innerHTML = [...document.querySelectorAll('[data-panel="notes"] .searchable')].map((section, i) => `<a href="#${section.id || 'top'}"><span>${String(i + 1).padStart(2, '0')}</span>${section.dataset.title}</a>`).join('')
const stored = JSON.parse(localStorage.getItem('da-m8-lectures') || '{}')
const checks = [...document.querySelectorAll('[data-lecture]')]
function refreshProgress() { const done = checks.filter(check => check.checked).length; document.querySelector('#count').textContent = `${done}/${lectures.length}`; document.querySelector('#bar').style.width = `${done / lectures.length * 100}%`; document.querySelector('#lecturePercent').textContent = `${Math.round(done / lectures.length * 100)}%` }
checks.forEach(check => { check.checked = Boolean(stored[check.dataset.lecture]); check.onchange = () => { stored[check.dataset.lecture] = check.checked; localStorage.setItem('da-m8-lectures', JSON.stringify(stored)); refreshProgress() } }); refreshProgress()
Object.entries({ intro: 'intro', 'bubble-theory': 'bubble-theory', 'bubble-code': 'bubble-code', 'selection-theory': 'selection-theory', 'selection-code': 'selection-code', 'insertion-theory': 'insertion-theory', 'insertion-code': 'insertion-code', 'merge-theory': 'merge-theory', 'merge-code': 'merge-code', 'quick-theory': 'quick-theory', 'quick-code': 'quick-code', 'counting-theory': 'counting-theory', 'counting-code': 'counting-code', complexity: 'complexity', context: 'context' }).forEach(([sectionId, topicId]) => { const section = document.querySelector('#' + sectionId); const topic = module8Topics.find(item => item.id === topicId); section.insertAdjacentHTML('beforeend', `<button class="topic-practice" data-practice-topic="${topicId}">Is topic ke ${topic.questions.length} questions solve karo →</button>`) })
document.querySelectorAll('[data-practice-topic]').forEach(button => button.onclick = () => { practiceTopic.value = button.dataset.practiceTopic; practiceDifficulty.value = 'all'; renderPractice(); setView('practice') })
document.querySelectorAll('.codebox button').forEach(button => button.onclick = () => { navigator.clipboard.writeText(button.closest('.codebox').querySelector('code').textContent); document.querySelector('.toast').classList.add('show'); setTimeout(() => document.querySelector('.toast').classList.remove('show'), 1200) })
document.querySelector('#searchButton').onclick = () => searchInput.focus()
searchInput.oninput = () => { const term = searchInput.value.toLowerCase(); document.querySelector('.view.active').querySelectorAll('.searchable').forEach(section => section.hidden = term && !section.textContent.toLowerCase().includes(term)) }
document.querySelector('#themeButton').onclick = () => { document.documentElement.classList.toggle('dark'); localStorage.setItem('da-theme', document.documentElement.classList.contains('dark') ? 'dark' : 'light') }
if (localStorage.getItem('da-theme') !== 'light') document.documentElement.classList.add('dark')
document.querySelector('#menu').onclick = () => document.querySelector('.sidebar').classList.toggle('open')
document.querySelector('[data-jump="practice"]').onclick = () => setView('practice')
document.querySelector('#print').onclick = () => window.print()
const read = document.querySelector('.read-progress span'); window.addEventListener('scroll', () => { const h = document.documentElement.scrollHeight - window.innerHeight; read.style.width = `${h ? window.scrollY / h * 100 : 0}%` })
