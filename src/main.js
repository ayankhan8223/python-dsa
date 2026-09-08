import './style.css'
import { practiceTopics, totalPracticeQuestions } from './practice.js'

const pyqs = [
  ['2024','Q38','Recursion + dictionary','9','Har call current node ko 1 count karta hai. Node 1 = 1+3 leaves = 4, node 2 = 4, root = 1+4+4 = 9.','Dictionary keys ke saath implicit leaf nodes bhi count honge.'],
  ['2024','Q39','Loop state tracing','[1, 1, 2, 1, 2]','Comparisons: 6≤3 false → 1; 3≤5 true → 2; 5≤4 false → 1; 4≤10 true → 2.','Pseudocode ki 1-based indexing ko Python indexing se mix mat karo.'],
  ['2024','Q40','Binary-search recurrence','F(n)=F(⌊n/2⌋)+1','Ek middle comparison ke baad sirf ek half search hoti hai. Solution Θ(log n).','Divide-and-conquer automatically 2T(n/2) nahi hota.'],
  ['2024','Q41','Recursive list reversal','Option C','First-last swap, boundaries inward, base s1≥s2. Original list mutate hoti hai.','Function None return kar sakta hai, phir bhi side effect complete hota hai.'],
  ['2025','Q23','append vs extend','A.extend(B)','extend iterable ke elements add karta hai; append poori B ko ek nested element banata.','Mutating list methods generally None return karte hain.'],
  ['2025','Q27','Binary search prerequisites','Sorted array only','Sorted data + O(1) middle access required. Sorted linked list ka middle access O(n) hai.','Complexity underlying data structure par bhi depend karti hai.'],
  ['2025','Q47','Sets + simultaneous assignment','Only B','RHS together evaluate karke states trace karo: final A={other}, B={this}, C={that}.','Tuple assignment ko sequential assignment jaise trace mat karo.'],
  ['2025','Q63','Recursive output','160','15→7→3→1→0: four odd branches each ×2; base returns 10, so 2⁴×10=160.','Return value, call count aur stack depth alag quantities hain.'],
  ['2026','Q15','Expected quicksort recurrence','Option D','Random first pivot ka rank uniform hai: (1/n)Σ[T(k)+T(n-k-1)] + O(n).','T(1)+T(n-1) worst split hai, expected recurrence nahi.'],
  ['2026','Q16','Mutable default argument','[1], [1,2], [3]','Default [] definition time par once banti hai; first two calls same list reuse karte hain. Explicit [] fresh hai.','Safe default None rakho aur function ke andar list banao.'],
  ['2026','Q31','Exact binary-search comparisons','10','2⁹ < 1000 ≤ 2¹⁰, so longest unsuccessful path has 10 middle checks.','NAT exact integer poochta hai; O(log n) answer nahi.'],
  ['2026','Q39','Total recursive activations','15','C(n)=1+C(n-1)+C(n-2); C(-1)=C(0)=1, then 3,5,9,15.','Current call ka +1 miss mat karo.'],
  ['2026','Q50','Closures','Options B and D','Har outer() call separate captured list banata hai. f1 → [10,20,40], f2 → [30].','Same function code ka matlab same enclosed state nahi.'],
  ['2026','Q58','Recursive bubble passes','8','Total adjacent swaps initial inversion count ke equal: 5 contributes 4, 3 contributes 2, 4 contributes 2.','Brute trace ke peeche invariant identify karo.']
]

const pyqDetails = {
  '2024-Q38': {
    question: `Given <code>count(child_dict, i)</code>: agar <code>i</code> key nahi hai toh 1 return; warna <code>ans=1</code> se start karke har child par recursively count add hota hai. Dictionary: <code>0:[1,2]</code>, <code>1:[3,4,5]</code>, <code>2:[6,7,8]</code>. <code>count(child_dict,0)</code> ka output?`,
    options: ['A. 6','B. 1','C. 8','D. 9'],
    method: 'Recursion tree draw karo. Har function activation exactly ek node count karta hai—including dictionary mein absent leaf keys 3…8. Leaves=6, internal nodes=3, total=9.',
    transfer: 'Tree-recursion mein “keys ki count” aur “visited nodes/calls ki count” different ho sakti hain.'
  },
  '2024-Q39': {
    question: `<code>computeS(X)</code> mein <code>S[1]=1</code>. Har <code>i=2…length(X)</code> par pehle <code>S[i]=1</code>; agar <code>X[i-1] ≤ X[i]</code>, toh <code>S[i] += S[i-1]</code>. <code>X=[6,3,5,4,10]</code> ke liye returned S?`,
    options: ['A. [1,1,2,3,4]','B. [1,1,2,3,3]','C. [1,1,2,1,2]','D. [1,1,2,1,5]'],
    method: 'Table banao: first S=1. 6≤3 false→1; 3≤5 true→1+1=2; 5≤4 false→1; 4≤10 true→1+1=2.',
    transfer: 'State-reset line ko miss mat karo: har iteration S[i] dobara 1 hota hai.'
  },
  '2024-Q40': {
    question: '<code>F(n)</code> sorted size-n array mein binary search ke maximum comparisons hai. Kaunsi recurrence true hai?',
    options: ['A. F(n)=F(⌊n/2⌋)+1','B. F(n)=F(⌊n/2⌋)+F(⌈n/2⌉)','C. F(n)=F(⌊n/2⌋)','D. F(n)=F(n−1)+1'],
    method: 'Current middle par one comparison group hota hai, phir maximum case mein sirf larger remaining half continue hota hai. Isliye one recursive subproblem + current work.',
    transfer: 'Divide-and-conquer dekh kar branches count karo; binary search explores one half, merge sort both halves.'
  },
  '2024-Q41': {
    question: `<pre>def fun(D, s1, s2):
    if s1 &lt; s2:
        D[s1], D[s2] = D[s2], D[s1]
        fun(D, s1+1, s2-1)</pre>Function kya karti hai?`,
    options: ['A. Minimum find','B. In-place merge sort','C. D[s1…s2] reverse','D. Sirf endpoint swap'],
    method: 'First-last swap ke baad boundaries inward jaati hain. Process tab tak repeat hota hai jab boundaries meet/cross hon—poora inclusive segment reverse.',
    transfer: 'Return statement na hona mutation ko cancel nahi karta; list caller ke saamne change hoti hai.'
  },
  '2025-Q23': {
    question: `<code>A=[1,2,3]</code>, <code>B=[4,5,6]</code>. Kaunsa statement A ko <code>[1,2,3,4,5,6]</code> banata hai?`,
    options: ['A. A.extend(B)','B. A.append(B)','C. A.update(B)','D. A.insert(B)'],
    method: '<code>extend</code> B ko iterate karke uske elements A mein add karta hai. <code>append</code> B ko one nested list banata; list mein update method nahi; insert ko index chahiye.',
    transfer: 'Result ke shape se operation identify karo: one item add = append; iterable unpack-like add = extend.'
  },
  '2025-Q27': {
    question: 'Worst case mein binary search O(log n) kis input par chalega?',
    options: ['A. Unsorted integer array','B. Unsorted linked list','C. Increasing-order integer array','D. Increasing-order linked list'],
    method: 'Binary search ko ordering plus fast middle access dono chahiye. Sorted array indexing O(1); linked list mein middle tak pahunchna linear ho sakta hai.',
    transfer: 'Algorithm complexity ko data-structure operations ke cost ke saath combine karo.'
  },
  '2025-Q47': {
    question: `<pre>A={"this","that"}; B={"that","other"}; C={"other","this"}
while "other" in C:
    if "this" in A: A,B,C=A-B,B-C,C-A
    if "that" in B: A,B,C=C|A,A|B,B|C</pre>End mein kaunsa set <code>"this"</code> contain karta hai?`,
    options: ['A. Only A','B. Only B','C. Only C','D. A and C'],
    method: 'Har tuple assignment ke poore RHS ko old A,B,C se evaluate karo. First update: A={this}, B={that}, C={other}. Second condition true: A={this,other}, B={this,that}, C={that,other}. Next loop first update gives A={other}, B={this}, C={other}; loop ends.',
    transfer: 'Simultaneous assignment mein left-to-right mutated intermediate values use nahi hote.'
  },
  '2025-Q63': {
    question: `<pre>def f(a,b):
    if a==0: return b
    if a%2==1: return 2*f((a-1)/2,b)
    return b+f(a-1,b)
print(f(15,10))</pre>Printed integer kya hai?`,
    options: [],
    method: '15, 7, 3, 1 sab odd hain: har level result ×2. Phir a=0 par 10. So 2⁴×10=160. Python / float deta hai, par 7.0%2 etc. comparisons still work here.',
    transfer: 'Input path pehle trace karo; har defined branch analyze karna zaroori nahi jab actual path fixed ho.'
  },
  '2026-Q15': {
    question: 'n distinct randomly ordered elements par quicksort; har call mein current subarray ka first element pivot hai, partition time linear. Expected time T(n) ki recurrence?',
    options: ['A. T(1)+T(n−1)+O(n)','B. T(n/4)+T(3n/4)+O(n)','C. 2T(n/2)+O(n)','D. (1/n)Σₖ₌₀ⁿ⁻¹[T(k)+T(n−k−1)]+O(n)'],
    method: 'Random order ki wajah se first element ka rank 1…n uniformly distributed hai. Rank k+1 par left k aur right n-k-1; sab ranks ka average 1/n factor deta hai.',
    transfer: 'Pivot selection deterministic ho sakta hai, lekin random input uski rank ko random bana deta hai.'
  },
  '2026-Q16': {
    question: `<pre>def append_to_lst(val, lst=[]):
    lst.append(val)
    return lst
print(append_to_lst(1))
print(append_to_lst(2))
print(append_to_lst(3, []))</pre>Correct output?`,
    options: ['A. [1], [2], [3]','B. [1], [1,2], [3]','C. [1], [2], [1,2,3]','D. [1], [1,2], [1,3]'],
    method: 'Default list function definition par once create hoti hai. Calls 1 and 2 same object mutate karte hain. Third call explicit fresh [] pass karta hai.',
    transfer: 'Safe pattern: <code>lst=None</code>, then inside <code>if lst is None: lst=[]</code>.'
  },
  '2026-Q31': {
    question: '1000 distinct integers ki sorted array A par recursive binary search se absent y find kiya. Har recursive step middle ko y se compare karta hai. Maximum comparisons?',
    options: [],
    method: 'Unsuccessful path height chahiye. 2⁹=512 aur 2¹⁰=1024; 1000 elements ko empty interval tak eliminate karne ki longest path 10 middle checks leti hai.',
    transfer: 'NAT mein Θ(log n) nahi—floor/ceiling aur exact tree height calculate karo.'
  },
  '2026-Q39': {
    question: `<pre>def mystery(n):
    if n &lt;= 0: return 1
    return mystery(n-1) + mystery(n-2)
mystery(4)</pre>Total function calls/stack activations including initial call?`,
    options: ['A. 5','B. 9','C. 15','D. 17'],
    method: 'C(n)=1+C(n−1)+C(n−2), bases C(0)=C(−1)=1. Then C(1)=3, C(2)=5, C(3)=9, C(4)=15.',
    transfer: 'Total activations ≠ maximum simultaneous stack depth. Yahan calls 15, depth Θ(n).' 
  },
  '2026-Q50': {
    question: `<pre>def outer():
    x=[]
    def inner(val): x.append(val); return x
    return inner
f1=outer(); f2=outer()
print(f1(10)); print(f1(20)); print(f2(30)); print(f1(40))</pre>Kaunse options correct?`,
    options: ['A. f1/f2 same x share','B. Line Q = [10,20]','C. Line R = [10,20,30]','D. Line S = [10,20,40]'],
    method: 'outer() ki har invocation fresh x banati hai. f1 ka captured x: []→[10]→[10,20]→[10,20,40]. f2 ka separate x: []→[30]. Hence B,D.',
    transfer: 'Closure state function code se nahi, specific enclosing invocation se belong karta hai.'
  },
  '2026-Q58': {
    question: `<code>fun(L)</code> left-to-right adjacent pair compare karke inversion mile toh swap aur 1 add karta hai; main loop list length times fun call karta hai. <code>data=[5,3,4,1,2]</code>. Final count?`,
    options: [],
    method: 'Each adjacent swap exactly one inversion remove karta hai; enough passes list sort kar dete hain. Initial inversions: 5 with 3,4,1,2 =4; 3 with 1,2 =2; 4 with 1,2 =2; total 8.',
    transfer: 'Repeated bubble-style passes ke swaps ko simulate karne se faster invariant: swap count = inversion count.'
  }
}

const pyqMarkup = pyqs.map(([year,q,title,answer,solution,trap]) => {
  const detail = pyqDetails[`${year}-${q}`]
  return `
  <details class="pyq-card searchable" data-year="${year}">
    <summary><span class="year">${year}</span><span><b>${q} · ${title}</b><small>Click for full exam method</small></span><i>＋</i></summary>
    <div class="pyq-body">
      <div class="answer"><span>Correct answer</span><strong>${answer}</strong></div>
      <div class="pyq-question"><h4>Original question · clean transcript</h4><p>${detail.question}</p>${detail.options.length ? `<ul>${detail.options.map(option => `<li>${option}</li>`).join('')}</ul>` : '<small>NAT · answer in integer</small>'}</div>
      <div><h4>Step-by-step reasoning</h4><p>${solution}</p><p class="deep-method">${detail.method}</p></div>
      <aside><strong>GATE trap</strong><p>${trap}</p></aside>
      <aside class="transfer"><strong>Next variation mein use karo</strong><p>${detail.transfer}</p></aside>
    </div>
  </details>`
}).join('')

const practiceTopicOptions = practiceTopics.map(topic => `<option value="${topic.id}">${topic.number} · ${topic.label} (${topic.questions.length})</option>`).join('')

const chapterHead = (n, label, title, sub, id) => `
  <div class="chapter-head"><div class="chapter-no"><span>${n}</span><small>${label}</small></div><div><h2>${title}</h2><p>${sub}</p></div><label class="done"><input type="checkbox" data-progress="${id}"><span>Done</span></label></div>`

document.querySelector('#app').innerHTML = `
<div class="read-progress"><span></span></div>
<header class="topbar">
  <a class="brand" href="#top"><b>DA</b><span><strong>Python + DSA</strong><small>GATE 2027 Notebook</small></span></a>
  <nav><button class="tab active" data-view="notes">Detailed Notes</button><button class="tab" data-view="pyq">PYQ Lab <i>${pyqs.length}</i></button><button class="tab" data-view="practice">Practice <i>${totalPracticeQuestions}</i></button><button class="tab" data-view="revision">Revision</button></nav>
  <div class="actions"><button id="searchButton" aria-label="Search">⌕</button><button id="themeButton" aria-label="Theme">◐</button></div>
</header>
<div class="searchbox"><input id="search" type="search" placeholder="Search: recursion, O(log n), mutable, 2026…"><span id="searchResult">Search current view</span></div>

<div class="layout" id="top">
  <aside class="sidebar">
    <p class="overline">Module 01</p><h2>Introduction to DSA<br>& Python Basics</h2>
    <div class="module-switch"><a class="active" href="./index.html">M01</a><a href="./module2.html">M02</a><a href="./module3.html">M03</a><a href="./module4.html">M04</a><a href="./module5.html">M05</a><a href="./module6.html">M06</a></div>
    <div class="completion"><span><b>Mastery</b><i id="count">0/12</i></span><div><i id="bar"></i></div></div>
    <nav id="toc"></nav>
    <p class="source"><b>Sources</b>CampusX full PDF + Module 1 notebook + GATE DA 2024–2026 papers</p>
  </aside>

  <main>
    <div class="view active" data-panel="notes">
      <section class="hero searchable" data-title="Overview">
        <p class="eyebrow"><i></i> Simple Hinglish · Exam-first</p>
        <h1>Code ko run nahi—<em>reason</em> karna seekho.</h1>
        <p>Module 1 ka goal syntax ratna nahi. Goal hai unfamiliar Python code trace karna, time-space cost derive karna, aur GATE ke close options mein exact difference pakadna.</p>
        <div class="metrics"><span><b>3</b>papers analysed</span><span><b>${pyqs.length}</b>foundation PYQs</span><span><b>12</b>mastery blocks</span></div>
        <div class="syllabus"><b>2027 syllabus map</b>Programming in Python · foundations for every data structure and algorithm</div>
      </section>

      <section class="lecture-track searchable" id="lecture-track" data-title="Module 1 lecture tracker">
        <div class="track-head"><div><p class="eyebrow"><i></i> CampusX sequence</p><h2>Module 1 · Lecture Tracker</h2><p>Lecture complete karte hi tick karo. Progress browser mein automatically save rahega.</p></div><strong id="lecturePercent">0%</strong></div>
        <div class="lecture-list">
          <label><input type="checkbox" data-lecture="1"><span><b>1</b><i>Introduction to DSA</i><small>DSA, algorithm, program</small></span></label>
          <label><input type="checkbox" data-lecture="1.1"><span><b>1.1</b><i>Importance of DSA</i><small>Why it matters for DA/AI</small></span></label>
          <label><input type="checkbox" data-lecture="1.2"><span><b>1.2</b><i>Time & Space Complexity</i><small>Bounds, cases, loops, memory</small></span></label>
          <label><input type="checkbox" data-lecture="1.2.1"><span><b>1.2.1</b><i>Complexity Practice</i><small>Ten common code patterns</small></span></label>
          <label><input type="checkbox" data-lecture="1.3"><span><b>1.3</b><i>Python Refresher</i><small>Execution model overview</small></span></label>
          <label><input type="checkbox" data-lecture="1.3.1"><span><b>1.3.1</b><i>Built-in Data Types</i><small>Numbers and containers</small></span></label>
          <label><input type="checkbox" data-lecture="1.3.2"><span><b>1.3.2</b><i>Control Structures</i><small>Conditions and truthiness</small></span></label>
          <label><input type="checkbox" data-lecture="1.3.3"><span><b>1.3.3</b><i>Loops</i><small>for, while and tracing</small></span></label>
          <label><input type="checkbox" data-lecture="1.3.4"><span><b>1.3.4</b><i>Functions</i><small>Parameters, return, scope</small></span></label>
          <label><input type="checkbox" data-lecture="1.3.5"><span><b>1.3.5</b><i>Built-in Functions</i><small>min, max, sum, sorted…</small></span></label>
          <label><input type="checkbox" data-lecture="1.3.6"><span><b>1.3.6</b><i>List Comprehensions</i><small>Expression, loop, filter</small></span></label>
          <label><input type="checkbox" data-lecture="1.3.7"><span><b>1.3.7</b><i>Classes</i><small>Objects, attributes, methods</small></span></label>
          <label><input type="checkbox" data-lecture="1.3.8"><span><b>1.3.8</b><i>Reading Inputs</i><small>input, split and map</small></span></label>
        </div>
      </section>

      <section class="beginner-start searchable" id="zero-start" data-title="Before you begin · Zero prerequisites">
        <div class="zero-title"><span>ZERO START</span><h2>Agar aapne DSA kabhi nahi padha, yahan se start karo.</h2><p>Is notebook mein koi hidden prerequisite assume nahi ki gayi. Pehle ye seven words samajh lo—baaki module inhi building blocks par banega.</p></div>
        <div class="glossary-grid">
          <article><b>Data</b><p>Information ka raw value—jaise <code>25</code>, <code>'Ayan'</code>, ya marks ki list.</p></article>
          <article><b>Variable / Name</b><p>Python mein object ko refer karne wala naam: <code>age = 25</code>.</p></article>
          <article><b>Input</b><p>Problem ya program ko diya gaya data. Example: search karne ke liye list aur target.</p></article>
          <article><b>Output</b><p>Program ka expected result. Example: target mila toh uska index.</p></article>
          <article><b>Operation</b><p>Ek basic step—comparison, addition, assignment, list access.</p></article>
          <article><b>Memory</b><p>Program run hote waqt values aur call information store karne ki jagah.</p></article>
          <article><b>Problem size (n)</b><p>Input kitna bada hai. 100-element list ke liye usually <code>n = 100</code>.</p></article>
        </div>
        <div class="analogy-story">
          <div><span>Everyday analogy</span><h3>Books arrange karna = Data Structure + Algorithm</h3><p>Room mein 1,000 books scattered hain. <b>Books data hain.</b> Shelf, stack ya labelled cabinet unhe organize karne ke <b>data structures</b> hain. “Title ke alphabet ke according arrange karo, phir middle book se search start karo” ek <b>algorithm</b> hai.</p></div>
          <ol><li><b>Wrong organization:</b> Har search mein sab books dekhni padengi.</li><li><b>Better organization:</b> Sorted shelf par search space half kar sakte hain.</li><li><b>Main idea:</b> Same data + different organization/steps = very different performance.</li></ol>
        </div>
        <div class="reading-method"><h3>Har lesson ko kaise padhein</h3><div><span><b>① Intuition</b>Pehle “kyun” aur real-world picture.</span><span><b>② Mechanism</b>Exactly kaunse steps execute hote hain.</span><span><b>③ Dry run</b>Small input par state table.</span><span><b>④ Analysis</b>Time, space, cases and bounds.</span><span><b>⑤ GATE lens</b>Trap, PYQ pattern aur self-check.</span></div></div>
      </section>

      <section class="chapter searchable" id="exam-map" data-title="1 · Introduction to DSA">
        ${chapterHead('1','Introduction','Introduction to DSA','DSA kya hai, algorithm kaise sochte hain, aur GATE kya test karta hai.','exam-map')}
        <div class="lesson-flow">
          <span><b>Problem</b>“List mein target value find karo.”</span><i>→</i><span><b>Data structure</b>Values Python list mein stored.</span><i>→</i><span><b>Algorithm</b>Left-to-right compare, ya sorted ho toh binary search.</span><i>→</i><span><b>Program</b>Chosen steps ko Python code mein likho.</span>
        </div>
        <div class="explain-block"><h3>Data Structures and Algorithms ek saath kyun?</h3><p>Algorithm data par kaam karta hai, aur data structure decide karta hai operations available aur costly kaunse hain. Example: array/list mein index access fast hota hai, linked list mein middle element tak walk karna padta hai. Isi wajah se “binary search is O(log n)” statement tabhi complete hai jab structure random access support kare.</p></div>
        <div class="year-grid"><article><b>2024</b><h3>Trace the structure</h3><p>Recursion + dictionary, loop state, list mutation, binary-search recurrence.</p></article><article><b>2025</b><h3>Know operations</h3><p>List methods, set algebra, simultaneous assignment, recursive output.</p></article><article><b>2026</b><h3>Understand lifetime</h3><p>Mutable defaults, closures, exact call counts, mutation-heavy code.</p></article></div>
        <div class="insight"><b>2027 trend</b><p>References, scope, mutation, call stack aur exact counting high-priority hain.</p></div>
      </section>

      <section class="chapter searchable" id="foundation" data-title="1.1 · Importance of DSA">
        ${chapterHead('1.1','Lecture','Importance of DSA','Data ko sahi structure mein rakhna algorithm ko practical banata hai.','foundation')}
        <div class="three-grid"><article><span>Data structure</span><h3>Data organize karne ka tareeka</h3><p>List, stack, queue, tree, hash table. Choice access/insert/delete ki cost decide karti hai.</p></article><article><span>Algorithm</span><h3>Finite problem-solving steps</h3><p>Specified input, definite steps, correct output aur termination.</p></article><article><span>Program</span><h3>Language implementation</h3><p>Same algorithm Python, C++ ya pseudocode mein likha ja sakta hai.</p></article></div>
        <div class="explain-block"><h3>DSA important kyun hai?</h3><p>Suppose 10 records hain—toh almost koi bhi approach fast lagegi. Lekin 10 crore records par wrong data structure seconds ko hours mein badal sakta hai. DSA humein do decisions lena sikhata hai: <b>data ko kaise store karein</b> aur <b>us data par kaunse steps chalayein</b>.</p><div><span><b>Hash table</b>Fast average lookup, frequency counting, label mapping</span><span><b>Queue</b>Streaming pipeline, BFS, task scheduling</span><span><b>Tree</b>Hierarchical data, decision trees, indexing</span><span><b>Graph</b>Networks, recommendations, dependencies</span></div></div>
        <div class="pills"><span>Input</span><span>Output</span><span>Definiteness</span><span>Finiteness</span><span>Correctness</span><span>Efficiency</span></div>
        <div class="callout"><b>GATE lens</b><p>Pehle correctness, phir time aur space. Fast but incorrect procedure valid answer nahi.</p></div>
      </section>

      <section class="chapter searchable" id="analysis" data-title="1.2 · Time & Space Complexity">
        ${chapterHead('1.2','Lecture','Time & Space Complexity','Clock time nahi; input ke saath resource growth measure karo.','analysis')}
        <div class="concept-intro"><h3>Complexity ka simple meaning</h3><p><b>Time complexity</b> batati hai input size badhne par basic operations kitni tezi se badhenge. <b>Space complexity</b> batati hai algorithm ko kitni memory chahiye. Ye stopwatch seconds ya exact RAM bytes nahi—growth ka mathematical model hai, isliye machine aur programming language change hone par bhi comparison useful rehta hai.</p></div>
        <div class="two-grid"><div><h3>Input size n identify karo</h3><ul><li>List: number of elements</li><li>String: characters</li><li>Matrix: rows × columns</li><li>Graph: V vertices and E edges</li><li>Integer: kabhi value nahi, number of bits</li></ul></div><div class="recipe"><b>Analysis recipe</b><ol><li>Input size define</li><li>Basic operation choose</li><li>Execution count</li><li>Growth simplify</li><li>Case and bound name</li></ol></div></div>
        <div class="codebox"><div><span>Exact count → growth</span><button>Copy</button></div><pre><code>total = 0                 # 1
for i in range(n):       # n iterations
    total += i           # n times
return total             # 1

# T(n) = 2n + 2 → Θ(n)</code></pre></div>
        <p class="note"><b>Constants kab drop?</b> Asymptotic growth mein. Exact-count NAT question mein nahi.</p>
      </section>

      <section class="chapter searchable" id="bounds" data-title="1.2 · Bounds and cases">
        ${chapterHead('1.2 A','GATE depth','Big-O, Big-Omega, Big-Theta','Bounds ko cases ke saath confuse mat karo.','bounds')}
        <div class="bounds"><article><b>O(g(n))</b><h3>Upper bound</h3><p>T(n) eventually g(n) ke constant multiple se zyada grow nahi karta.</p></article><article><b>Ω(g(n))</b><h3>Lower bound</h3><p>T(n) eventually g(n) ke constant multiple se kam grow nahi karta.</p></article><article><b>Θ(g(n))</b><h3>Tight bound</h3><p>Upper aur lower growth same order ke hain.</p></article></div>
        <div class="explain-block"><h3>Inequality se formal meaning</h3><p><b>Big-O:</b> kuch positive constants <code>c,n₀</code> milne chahiye jinke liye <code>0 ≤ T(n) ≤ c·g(n)</code> har <code>n ≥ n₀</code> par true ho. <b>Big-Ω:</b> <code>0 ≤ c·g(n) ≤ T(n)</code>. <b>Big-Θ:</b> do constants <code>c₁,c₂</code> ke beech sandwich: <code>0 ≤ c₁g(n) ≤ T(n) ≤ c₂g(n)</code>.</p><p>Example <code>T(n)=3n²+5n+2</code>. <code>n≥1</code> par <code>3n² ≤ T(n) ≤ 10n²</code>, so T(n)=Θ(n²). Isi wajah se <code>n = O(n²)</code> true hai, lekin tight nahi; <code>n² = Ω(n)</code> bhi true but loose hai.</p></div>
        <div class="table-wrap"><table><thead><tr><th>Statement</th><th>True?</th><th>Reason</th></tr></thead><tbody><tr><td><code>n = O(n²)</code></td><td>Yes</td><td>n eventually n² se faster grow nahi karta; loose upper bound.</td></tr><tr><td><code>n² = Ω(n)</code></td><td>Yes</td><td>n² eventually n ka lower-bound multiple hai; loose lower bound.</td></tr><tr><td><code>n² = Θ(n³)</code></td><td>No</td><td>Same-order upper aur lower sandwich possible nahi.</td></tr><tr><td><code>3n²+5n+2 = Θ(n²)</code></td><td>Yes</td><td>Dominant degree 2; positive constants se sandwich hota hai.</td></tr></tbody></table></div>
        <div class="danger"><b>Lecture correction</b><p>“Ω = best, Θ = average, O = worst” formal definition nahi. Best/average/worst input cases hain; O/Ω/Θ bounds hain. Linear search ka worst case Θ(n) bhi hai.</p></div>
        <div class="table-wrap"><table><thead><tr><th>Linear search</th><th>Situation</th><th>Comparisons</th><th>Tight bound</th></tr></thead><tbody><tr><td>Best</td><td>First position</td><td>1</td><td>Θ(1)</td></tr><tr><td>Average</td><td>Random position</td><td>≈(n+1)/2</td><td>Θ(n)</td></tr><tr><td>Worst</td><td>Absent / last</td><td>n</td><td>Θ(n)</td></tr></tbody></table></div>
      </section>

      <section class="chapter searchable" id="growth" data-title="1.2 · Growth order">
        ${chapterHead('1.2 B','GATE depth','Complexity growth ladder','Large input par difference explosive hota hai.','growth')}
        <div class="ladder"><code>1</code><i>≺</i><code>log log n</code><i>≺</i><code>log n</code><i>≺</i><code>√n</code><i>≺</i><code>n</code><i>≺</i><code>n log n</code><i>≺</i><code>n²</code><i>≺</i><code>n³</code><i>≺</i><code>2ⁿ</code><i>≺</i><code>n!</code><i>≺</i><code>nⁿ</code><i>≺</i><code>2^(n²)</code></div>
        <div class="growth-visual"><span class="g1">O(1)</span><span class="gl">O(log n)</span><span class="gn">O(n)</span><span class="gnl">O(n log n)</span><span class="gn2">O(n²)</span><span class="g2n">O(2ⁿ)</span><i>input size n →</i></div>
        <div class="callout"><b>Log simplification rules</b><p>Asymptotically <code>log₂n</code> aur <code>log₁₀n</code> dono Θ(log n). <code>log(√n)=½log n</code> aur fixed k ke liye <code>log(nᵏ)=k log n</code>, so dono Θ(log n). Lekin <code>log log n</code> genuinely slower class hai. Exact comparison/NAT count mein base, floor, ceiling aur boundary matter kar sakti hai.</p></div>
      </section>

      <section class="chapter searchable" id="loops" data-title="1.2 · Loop analysis">
        ${chapterHead('1.2 C','GATE depth','Loop patterns ko derive karo','Memorize se better: iterations count karo.','loops')}
        <div class="table-wrap"><table><thead><tr><th>Pattern</th><th>Exact/derived count</th><th>Tight complexity</th><th>Recognition rule</th></tr></thead><tbody><tr><td><code>i += c</code>, <code>i -= c</code>, <code>range(0,n,c)</code></td><td>about n/c</td><td>Θ(n)</td><td>c input se independent constant hai.</td></tr><tr><td><code>i *= c</code> or <code>i //= c</code></td><td>about log<sub>c</sub>n</td><td>Θ(log n)</td><td>Har step remaining scale constant factor se badalta.</td></tr><tr><td><code>i = i*i</code>, start i&gt;1</td><td>about log₂log n</td><td>Θ(log log n)</td><td>Values 2,4,16,256…; exponent double hota hai.</td></tr><tr><td>Two separate blocks</td><td>T₁(n)+T₂(n)</td><td>Dominant term</td><td>Add: n²+n log n+n = Θ(n²).</td></tr><tr><td>Independent nested blocks</td><td>n×log n</td><td>Θ(n log n)</td><td>Outer ke har turn mein full inner work.</td></tr><tr><td>Inner <code>range(i)</code></td><td>Σᵢ₌₀ⁿ⁻¹ i=n(n−1)/2</td><td>Θ(n²)</td><td>Dependent loop ko blindly n×n nahi; sum likho.</td></tr><tr><td>Inner <code>range(0,i,2)</code></td><td>Σ⌈i/2⌉</td><td>Θ(n²)</td><td>Half constant factor order change nahi karta.</td></tr><tr><td>Three independent n loops nested</td><td>n³</td><td>Θ(n³)</td><td>n×n×n.</td></tr></tbody></table></div>
        <div class="code-grid"><div class="codebox"><div><span>Dependent loop</span><button>Copy</button></div><pre><code>for i in range(n):
    for j in range(i):
        work()
# n(n-1)/2 = Θ(n²)</code></pre></div><div class="codebox"><div><span>Halving loop</span><button>Copy</button></div><pre><code>while n > 1:
    n //= 2
# n/2ᵏ ≤ 1
# k = Θ(log n)</code></pre></div></div>
        <div class="danger"><b>Early exit</b><p><code>break</code> ya <code>return</code> se automatically O(1) nahi. Best case early ho sakta hai; worst case full loop.</p></div>
      </section>

      <section class="chapter searchable" id="tricky-loops" data-title="GATE Tricky Loop Pattern Recognition">
        ${chapterHead('1.2 E','GATE drill','GATE Tricky Loop Pattern Recognition','Har loop mein pehle variable ki value-sequence likho; phir iterations count karo.','tricky-loops')}
        <div class="practice-list">
          <article><b>01</b><div><code>for i in range(0,n,2)</code><h3>Constant step</h3><p>Values 0,2,4,…; about n/2 iterations. 2 constant hai, so Θ(n).</p><details><summary>2 practice questions</summary><p>(a) <code>range(3,n,7)</code> ka exact count aur Θ? (b) <code>i=n; while i&gt;0: i-=5</code>?</p></details></div><strong>Θ(n)</strong></article>
          <article><b>02</b><div><code>i=1; while i&lt;n: i*=2</code><h3>Multiplicative growth</h3><p>1,2,4,8,…,2ᵏ. Stop when 2ᵏ≥n, hence k=⌈log₂n⌉.</p><details><summary>2 practice questions</summary><p>(a) multiplier 3 ho toh? (b) <code>i=n; i//=3</code> sequence for n=81 trace karo.</p></details></div><strong>Θ(log n)</strong></article>
          <article><b>03</b><div><code>i=2; while i&lt;n: i=i*i</code><h3>Self-power growth</h3><p>2,4,16,256,… After k updates value <code>2^(2^k)</code>. Condition <code>2^(2^k)≥n</code> se k≈log₂log₂n.</p><details><summary>2 practice questions</summary><p>(a) n=65536 par updates count karo. (b) start i=1 kyun infinite loop banata hai?</p></details></div><strong>Θ(log log n)</strong></article>
          <article><b>04</b><div><code>for i in range(n): j=2; while j&lt;n: j*=j</code><h3>n × log log n</h3><p>Inner self-squaring loop har outer iteration mein Θ(log log n), so product Θ(n log log n).</p><details><summary>2 practice questions</summary><p>(a) outer <code>range(n*n)</code> ho toh? (b) inner start 4 ho toh order change hota hai?</p></details></div><strong>Θ(n log log n)</strong></article>
          <article><b>05</b><div><code>for i in range(n): for j in range(i)</code><h3>Dependent triangular loop</h3><p>Inner counts 0,1,2,…,n−1. Sum n(n−1)/2, therefore Θ(n²).</p><details><summary>2 practice questions</summary><p>(a) <code>range(0,i,2)</code>? (b) inner <code>range(n-i)</code> ka sum?</p></details></div><strong>Θ(n²)</strong></article>
          <article><b>06</b><div><code>block A: n log n; block B: n²; block C: n</code><h3>Sequential blocks add</h3><p>Total nlogn+n²+n; n² fastest dominant term, so Θ(n²). Sequential blocks multiply nahi hote.</p><details><summary>2 practice questions</summary><p>(a) log n+n? (b) n³+n²logn+2ⁿ mein dominant?</p></details></div><strong>Θ(n²)</strong></article>
        </div>
        <div class="callout"><b>Summation shortcut</b><p><code>Σ1=n</code>, <code>Σi=n(n+1)/2=Θ(n²)</code>, aur <code>Σlog i=log(n!)=Θ(n log n)</code>. Exact NAT mein formula rakho; asymptotic MCQ mein dominant order simplify karo.</p></div>
      </section>

      <section class="chapter searchable" id="space" data-title="1.2 · Space analysis">
        ${chapterHead('1.2 D','GATE depth','Space complexity without confusion','Input, auxiliary aur stack separately name karo.','space')}
        <div class="equation"><span>Total space</span><b>= input space + auxiliary space</b></div>
        <div class="three-grid"><article><span>Input</span><h3>Provided data</h3><p>Size-n list total memory O(n), but auxiliary analysis mein normally exclude.</p></article><article><span>Auxiliary</span><h3>Extra memory</h3><p>Variables, new containers, temporary buffers, recursion frames.</p></article><article><span>In-place</span><h3>Small extra storage</h3><p>Usually O(1) auxiliary; input object mutate ho sakta hai.</p></article></div>
        <div class="corrections"><article><code>print(arr[0])</code><b>Aux Θ(1)</b></article><article><code>[0] * n</code><b>Time Θ(n), space Θ(n)</b></article><article><code>fib(n-1)+fib(n-2)</code><b>Stack Θ(n)</b></article><article><code>arr.sort()</code><b>Python Timsort, not quicksort</b></article></div>
        <div class="callout"><b>Three quantities</b><p>Total calls (time), maximum active calls (stack), aur returned value ko mix mat karo.</p></div>
        <div class="explain-block"><h3>Maximum recursion depth kaise nikalein?</h3><p>Ek waqt par simultaneously active calls count karo, poore call tree ke total calls nahi. <code>f(n)→f(n−1)→…→f(0)</code> mein n+1 frames peak par active, so stack Θ(n). Naive Fibonacci ke total calls exponential ho sakte hain, lekin longest active path linear hota hai.</p><p><b>Best/average/worst</b> input situations hain. Har situation ka apna O, Ω aur Θ bound likha ja sakta hai. Example linear search worst-case time Θ(n); ye sirf “O(n)” kehne se stronger statement hai.</p></div>
      </section>

      <section class="chapter searchable" id="complexity-practice" data-title="1.2.1 · Complexity Practice">
        ${chapterHead('1.2.1','Practice','Time & Space Complexity Practice','Lecture ke examples ko correct auxiliary-space convention ke saath solve karo.','complexity-practice')}
        <div class="practice-list">
          <article><b>01</b><div><code>print(arr[0])</code><h3>Indexing</h3><p>Ek fixed index access hota hai. Input list already given hai.</p></div><strong>Time Θ(1)<br>Aux Θ(1)</strong></article>
          <article><b>02</b><div><code>for x in arr: print(x)</code><h3>Single traversal</h3><p>n elements exactly once visit hote hain. Loop variable constant extra memory.</p></div><strong>Time Θ(n)<br>Aux Θ(1)</strong></article>
          <article><b>03</b><div><code>for x in arr: for y in arr</code><h3>All ordered pairs</h3><p>Har outer element ke liye poori list traverse: n × n operations.</p></div><strong>Time Θ(n²)<br>Aux Θ(1)</strong></article>
          <article><b>04</b><div><code>while n &gt; 1: n //= 2</code><h3>Halving</h3><p>k steps ke baad n/2ᵏ ≤ 1, hence k ≈ log₂n.</p></div><strong>Time Θ(log n)<br>Aux Θ(1)</strong></article>
          <article><b>05</b><div><code>return [0] * n</code><h3>New list creation</h3><p>n references allocate aur initialize karne padte hain—single syntax operation O(1) nahi.</p></div><strong>Time Θ(n)<br>Space Θ(n)</strong></article>
          <article><b>06</b><div><code>fib(n-1) + fib(n-2)</code><h3>Naive recursion</h3><p>Call tree exponential grow karta; longest active chain n frames ki hai.</p></div><strong>Time O(2ⁿ)<br>Stack Θ(n)</strong></article>
        </div>
        <div class="danger"><b>Lecture-note correction</b><p>Input array ko total space mein count karoge toh O(n), lekin standard algorithm analysis mein <em>auxiliary</em> space report karte waqt input exclude hota hai. Answer mein convention explicitly likhna safest hai.</p></div>
      </section>

      <section class="chapter searchable" id="python-refresher" data-title="1.3 · Python Refresher">
        ${chapterHead('1.3','Lecture','Python Refresher','Syntax list nahi—Python execution model ka mental map.','python-refresher')}
        <div class="explain-block"><h3>GATE ke liye Python kaise padhein?</h3><p>GATE code run karne ko nahi deta. Isliye har line ke baad teen cheezein mentally update karo: <b>name kis object ko refer karta hai</b>, <b>object mutate hua ya name rebind hua</b>, aur <b>control next kis line par jayega</b>. 2026 ke mutable-default aur closure questions isi mental model ko test karte hain.</p></div>
        <div class="trace-flow"><span><b>1</b>Names & objects</span><i>→</i><span><b>2</b>Condition / branch</span><i>→</i><span><b>3</b>Mutation / return</span><i>→</i><span><b>4</b>Next state</span></div>
        <div class="callout"><b>Pass-by-object-reference</b><p>Function ko object ka reference milta hai. Mutable object function ke andar change ho sakta hai; parameter ko new object se rebind karna caller ka name rebind nahi karta.</p></div>
      </section>

      <section class="chapter searchable" id="objects" data-title="1.3 · GATE bridge: objects">
        ${chapterHead('1.3 G','GATE add-on','Python names, objects and mutability','Variable box nahi; object ka reference hai.','objects')}
        <div class="object"><span><code>a</code><code>b</code></span><i>both point to →</i><b>list object<br>[1, 2, 3]</b></div>
        <div class="codebox"><div><span>Aliasing vs copy</span><button>Copy</button></div><pre><code>a = [1, 2]
b = a          # same object
c = a.copy()   # new outer list
b.append(3)
print(a)       # [1, 2, 3]
print(c)       # [1, 2]
print(a is b)  # True</code></pre></div>
        <div class="two-grid"><article><h3>Immutable</h3><p><code>int float complex bool str tuple frozenset NoneType</code></p><small>Operation new object/rebinding kar sakta hai.</small></article><article><h3>Mutable</h3><p><code>list dict set</code> and most instances</p><small>Same object ki internal state change hoti hai.</small></article></div>
        <div class="danger"><b>== vs is</b><p><code>==</code> value equality; <code>is</code> identity. None ke liye <code>is None</code>.</p></div>
      </section>

      <section class="chapter searchable" id="containers" data-title="1.3.1 · Built-in Data Types">
        ${chapterHead('1.3.1','Lecture','Built-in Data Types & Structures','Type properties ke saath operation cost bhi jaano.','containers')}
        <div class="type-grid"><article><b>Numeric</b><p><code>int</code>, <code>float</code>, <code>complex</code></p><small>Immutable values; bool int ka subclass hai.</small></article><article><b>Sequence</b><p><code>str</code>, <code>list</code>, <code>tuple</code>, <code>range</code></p><small>Ordered; list mutable, baaki listed types immutable.</small></article><article><b>Set</b><p><code>set</code>, <code>frozenset</code></p><small>Unique hashable elements; set mutable.</small></article><article><b>Mapping</b><p><code>dict</code></p><small>Key-value pairs; Python 3.7+ insertion ordered.</small></article><article><b>Boolean</b><p><code>True</code>, <code>False</code></p><small>Conditions and truthiness.</small></article><article><b>None</b><p><code>NoneType</code></p><small>Absence of value; compare using <code>is None</code>.</small></article></div>
        <div class="table-wrap"><table><thead><tr><th>Operation</th><th>Typical time</th><th>Note</th></tr></thead><tbody><tr><td>List index</td><td>O(1)</td><td>Random access</td></tr><tr><td>List append</td><td>O(1) amortized</td><td>Resize occasionally O(n)</td></tr><tr><td>Front insert/delete</td><td>O(n)</td><td>Shift elements</td></tr><tr><td><code>x in list</code></td><td>O(n)</td><td>Linear scan</td></tr><tr><td>Slice k items</td><td>O(k)</td><td>New list</td></tr><tr><td>Dict/set lookup</td><td>O(1) average</td><td>Worst O(n)</td></tr><tr><td>len</td><td>O(1)</td><td>Stored length</td></tr><tr><td>min/max/sum</td><td>O(n)</td><td>Full scan</td></tr><tr><td>sorted</td><td>O(n log n)</td><td>New list</td></tr></tbody></table></div>
        <div class="method-grid"><article><code>append(B)</code><p>B one nested element.</p></article><article><code>extend(B)</code><p>B ke elements individually.</p></article><article><code>a.sort()</code><p>In-place; returns None.</p></article><article><code>sorted(a)</code><p>New list; original unchanged.</p></article></div>
        <p class="note"><b>Correction:</b> Python 3.7+ dict insertion order preserve karti hai. Ye average O(1) hashing se separate property hai.</p>
      </section>

      <section class="chapter searchable" id="control" data-title="1.3.2 · Control Structures">
        ${chapterHead('1.3.2','Lecture','Control Structures','if, elif, else aur truthiness execution ka path decide karte hain.','control')}
        <div class="concept-intro"><h3>Condition evaluate kaise hoti hai?</h3><p>Python pehle <code>if</code> expression ko truth value mein convert karta hai. True hua toh us block ke baad remaining <code>elif/else</code> skip. False hua toh next branch check. Ek chain mein maximum ek branch execute hoti hai.</p></div>
        <div class="two-grid"><div><h3>Falsy values</h3><div class="pills"><code>False</code><code>None</code><code>0</code><code>''</code><code>[]</code><code>{}</code><code>set()</code></div></div><div><h3>Short-circuit</h3><ul><li><code>A and B</code>: A falsy → B skipped.</li><li><code>A or B</code>: A truthy → B skipped.</li><li><code>and/or</code> operand value return karte hain.</li></ul></div></div>
        <div class="code-grid"><div class="codebox"><div><span>Simultaneous assignment</span><button>Copy</button></div><pre><code>a, b = 2, 5
a, b = b, a+b
# RHS (5,7) first
# then a=5, b=7</code></pre></div><div class="codebox"><div><span>Operator order</span></div><pre><code>() → ** → unary
→ * / // % → + -
→ comparisons → not
        → and → or</code></pre></div></div>
      </section>

      <section class="chapter searchable" id="python-loops" data-title="1.3.3 · Loops">
        ${chapterHead('1.3.3','Lecture','Loops in Python','for iterable par chalta hai; while condition true rehne tak.','python-loops')}
        <div class="two-grid"><article><h3><code>for</code> loop</h3><p>Jab iterable ya expected iterations known hon. <code>range(start, stop, step)</code> mein stop excluded hota hai.</p><pre class="mini-code"><code>for i in range(2, 8, 2):
    print(i)  # 2, 4, 6</code></pre></article><article><h3><code>while</code> loop</h3><p>Condition-driven repetition. Initialization, condition aur update tino verify karo, warna infinite loop.</p><pre class="mini-code"><code>x = 3
while x > 0:
    print(x)
    x -= 1</code></pre></article></div>
        <div class="explain-block"><h3>GATE dry-run table</h3><p>Har iteration ke liye <b>iteration number → condition → old values → executed statement → new values → printed output</b> likho. Nested loops mein inner loop har outer iteration par reset hota hai ya nahi, carefully dekho.</p></div>
        <div class="callout"><b>break / continue</b><p><code>break</code> nearest loop terminate karta hai; <code>continue</code> current iteration ke remaining statements skip karke next iteration par jata hai.</p></div>
      </section>

      <section class="chapter searchable" id="functions" data-title="1.3.4 · Functions">
        ${chapterHead('1.3.4','Lecture + GATE','Functions, parameters, scope, closures','Definition time vs call time ko separate rakho.','functions')}
        <div class="concept-intro"><h3>Parameter aur argument</h3><p>Function definition mein naam <b>parameter</b> hai; call ke waqt supplied value/object <b>argument</b>. Call par local frame banta hai, parameters objects se bind hote hain, body execute hoti hai, aur <code>return</code> caller ko value deta hai.</p></div>
        <div class="scope"><span>Local</span><i>→</i><span>Enclosing</span><i>→</i><span>Global</span><i>→</i><span>Built-in</span><b>LEGB</b></div>
        <div class="code-grid"><div class="codebox red"><div><span>Mutable default trap</span><button>Copy</button></div><pre><code>def add(x, box=[]):
    box.append(x)
    return box
add(1) # [1]
add(2) # [1,2]</code></pre></div><div class="codebox green"><div><span>Safe pattern</span><button>Copy</button></div><pre><code>def add(x, box=None):
    if box is None:
        box = []
    box.append(x)
    return box</code></pre></div></div>
        <div class="codebox"><div><span>Closure = function + environment</span><button>Copy</button></div><pre><code>def outer():
    values = []
    def inner(x):
        values.append(x)
        return values
    return inner
f1, f2 = outer(), outer() # separate lists</code></pre></div>
        <div class="danger"><b>Return rule</b><p>No explicit return → <code>None</code>. <code>print</code> display karta hai, value return nahi.</p></div>
      </section>

      <section class="chapter searchable" id="builtins" data-title="1.3.5 · Built-in Functions">
        ${chapterHead('1.3.5','Lecture','Built-in Functions','Output ke saath time complexity aur return type bhi samjho.','builtins')}
        <div class="builtin-grid"><article><code>min / max</code><p>Iterable scan karke smallest/largest. Empty iterable without default error.</p><b>Time Θ(n)</b></article><article><code>sum</code><p>Numeric items add karta hai; empty sequence result 0.</p><b>Time Θ(n)</b></article><article><code>len</code><p>Built-in containers stored length return karte hain.</p><b>Time Θ(1)</b></article><article><code>sorted</code><p>Kisi iterable se new sorted list; original unchanged.</p><b>O(n log n)</b></article><article><code>enumerate</code><p>Index-value pairs lazily deta hai; optional start.</p><b>Traversal Θ(n)</b></article><article><code>zip</code><p>Iterables ko pair karta; shortest iterable par stop.</p><b>Traversal Θ(min lengths)</b></article></div>
        <div class="codebox"><div><span>enumerate and zip</span><button>Copy</button></div><pre><code>names = ['A', 'B', 'C']
scores = [80, 90, 70]

for index, (name, score) in enumerate(zip(names, scores), start=1):
    print(index, name, score)</code></pre></div>
      </section>

      <section class="chapter searchable" id="comprehensions" data-title="1.3.6 · List Comprehensions">
        ${chapterHead('1.3.6','Lecture','List Comprehensions','Compact syntax, same underlying iteration cost.','comprehensions')}
        <div class="syntax-line"><span>[</span><b>expression</b><i>for item in iterable</i><em>if condition</em><span>]</span></div>
        <div class="code-grid"><div class="codebox"><div><span>Loop form</span><button>Copy</button></div><pre><code>result = []
for x in range(10):
    if x % 2 == 0:
        result.append(x*x)</code></pre></div><div class="codebox"><div><span>Equivalent comprehension</span><button>Copy</button></div><pre><code>result = [
    x*x
    for x in range(10)
    if x % 2 == 0
]</code></pre></div></div>
        <div class="callout"><b>Complexity</b><p>Comprehension shorter hai, magically faster order nahi. n items inspect kare toh time Θ(n); result mein k items store kare toh output space Θ(k).</p></div>
        <div class="danger"><b>Conditional placement</b><p>Filter end mein: <code>[x for x in a if condition]</code>. If-else expression beginning mein: <code>[yes if condition else no for x in a]</code>.</p></div>
      </section>

      <section class="chapter searchable" id="classes" data-title="1.3.7 · Classes">
        ${chapterHead('1.3.7','Lecture','Classes and Objects','Class blueprint hai; object us blueprint ka instance.','classes')}
        <div class="concept-intro"><h3>Object-oriented vocabulary</h3><p><b>Attribute</b> object ka stored data, <b>method</b> class ke andar defined function, <b>self</b> current instance ka reference, aur <b>__init__</b> object creation ke baad attributes initialize karta hai.</p></div>
        <div class="codebox"><div><span>Class anatomy</span><button>Copy</button></div><pre><code>class Rectangle:                 # PascalCase class name
    def __init__(self, length, breadth):
        self.length = length    # instance attributes
        self.breadth = breadth

    def area(self):             # instance method
        return self.length * self.breadth

r = Rectangle(5, 4)
print(r.area())                 # 20</code></pre></div>
        <div class="danger"><b>Correction</b><p>Python convention mein class names <b>CapWords/PascalCase</b> use karte hain, generic “camel-case” description precise nahi. Methods aur variables generally <code>snake_case</code>.</p></div>
      </section>

      <section class="chapter searchable" id="inputs" data-title="1.3.8 · Reading Inputs">
        ${chapterHead('1.3.8','Lecture','Reading Inputs','input always string deta hai; required type conversion explicitly karo.','inputs')}
        <div class="input-pipeline"><span><code>input()</code><small>one string</small></span><i>→</i><span><code>.split()</code><small>string tokens</small></span><i>→</i><span><code>map(int, ...)</code><small>lazy converted values</small></span><i>→</i><span><code>list(...)</code><small>stored list</small></span></div>
        <div class="code-grid"><div class="codebox"><div><span>Single value</span><button>Copy</button></div><pre><code>n = int(input())</code></pre></div><div class="codebox"><div><span>One line list</span><button>Copy</button></div><pre><code>arr = list(map(int, input().split()))</code></pre></div></div>
        <div class="explain-block"><h3>Example trace</h3><p>User enters <code>10 20 30</code>. <code>input()</code> returns <code>'10 20 30'</code>; <code>split()</code> gives <code>['10','20','30']</code>; <code>map(int,...)</code> converts items; <code>list</code> stores <code>[10,20,30]</code>.</p></div>
      </section>

      <section class="chapter searchable" id="recursion" data-title="GATE Bridge · Recursion trace">
        ${chapterHead('GATE','PYQ add-on','Recursion and universal trace framework','Module 9 se pehle PYQ-solving foundation.','recursion')}
        <div class="steps"><article><b>1</b><h3>Quantity</h3><p>Output, calls, comparisons, mutation ya complexity?</p></article><article><b>2</b><h3>Objects</h3><p>Aliases aur captured state draw karo.</p></article><article><b>3</b><h3>Base</h3><p>Smallest calls first solve karo.</p></article><article><b>4</b><h3>Table</h3><p>Condition, old/new state, output.</p></article><article><b>5</b><h3>Count</h3><p>Exact result, then asymptotic.</p></article></div>
        <div class="codebox"><div><span>Same function, three analyses</span><button>Copy</button></div><pre><code>return mystery(n-1) + mystery(n-2)

# value: R(n)=R(n-1)+R(n-2)
# calls: C(n)=1+C(n-1)+C(n-2)
# max stack depth: Θ(n)
# time: exponential</code></pre></div>
        <div class="final"><h3>Module mastery check</h3><p>Bina run kiye mutable defaults, closure state, set updates, loop count, recursion calls aur auxiliary space explain kar sako.</p><button data-jump="pyq">Test yourself in PYQ Lab →</button></div>
      </section>
    </div>

    <div class="view" data-panel="pyq">
      <section class="page-hero searchable" data-title="PYQ Lab"><p class="eyebrow"><i></i> 2024–2026 evidence</p><h1>PYQ Lab</h1><p>Answer ke saath reusable exam pattern aur common trap.</p><div class="paper-grid"><span><b>2024</b>trace + recursion</span><span><b>2025</b>containers + state</span><span><b>2026</b>semantics + counts</span></div></section>
      <section class="trend searchable" data-title="Trend analysis"><h2>What the papers are telling us</h2><div><p><span>Code tracing</span><i style="--w:100%"></i><b>Every year</b></p><p><span>Functions / recursion</span><i style="--w:92%"></i><b>Very high</b></p><p><span>Containers</span><i style="--w:82%"></i><b>High</b></p><p><span>Exact counting</span><i style="--w:78%"></i><b>Rising</b></p><p><span>Object semantics</span><i style="--w:70%"></i><b>2026 signal</b></p></div><small>Search/sort/tree/hash/graph ke remaining PYQs respective modules mein full depth se aayenge.</small></section>
      <div class="filters"><button class="filter active" data-year="all">All</button><button class="filter" data-year="2024">2024</button><button class="filter" data-year="2025">2025</button><button class="filter" data-year="2026">2026</button><button id="expand">Expand all</button></div>
      <section class="pyqs">${pyqMarkup}</section>
    </div>

    <div class="view" data-panel="practice">
      <section class="page-hero practice-head searchable" data-title="Practice Lab"><p class="eyebrow"><i></i> Topic-wise · saved progress</p><h1>Practice Lab</h1><p>${totalPracticeQuestions} questions. Har lecture ke immediately baad usi topic ka set solve karo.</p><div class="practice-summary"><span><b>${practiceTopics.length}</b>lecture topics</span><span><b>distinct</b>concept-first questions</span><span><b>3 levels</b>foundation · core · practice</span></div></section>
      <section class="practice-controls searchable" data-title="Choose lecture topic"><div><label for="practiceTopic">Lecture topic</label><select id="practiceTopic">${practiceTopicOptions}</select></div><div><label for="practiceDifficulty">Difficulty</label><select id="practiceDifficulty"><option value="all">All levels</option><option>Foundation</option><option>Core</option><option>Practice</option></select></div><div class="practice-score"><span>Attempted</span><b id="practiceScore">0/50</b></div></section>
      <section class="practice-context" id="practiceContext"></section>
      <section class="question-list" id="questionList"></section>
    </div>

    <div class="view" data-panel="revision">
      <section class="page-hero revision-head searchable" data-title="Revision sheet"><p class="eyebrow"><i></i> Last-day recall</p><h1>Rapid Revision Sheet</h1><p>First-time learning nahi—fast retrieval ke liye.</p><button id="print">Print sheet</button></section>
      <section class="revision-grid">
        <article class="rev searchable"><span>01</span><h2>Bounds</h2><ul><li>O upper</li><li>Ω lower</li><li>Θ tight</li><li>Cases ≠ bounds</li></ul></article>
        <article class="rev searchable"><span>02</span><h2>Growth</h2><p>1 ≺ log log n ≺ log n ≺ √n ≺ n ≺ n log n ≺ n² ≺ n³ ≺ 2ⁿ ≺ n! ≺ nⁿ ≺ 2^(n²)</p><ul><li>Consecutive add</li><li>Nested multiply only if independent</li><li>Doubling → log n; self-square → log log n</li></ul></article>
        <article class="rev searchable"><span>03</span><h2>Space</h2><ul><li>Total = input + auxiliary</li><li>Stack depth ≠ total calls</li><li>[0]*n time & space Θ(n)</li><li>In-place usually O(1) aux</li></ul></article>
        <article class="rev searchable"><span>04</span><h2>Objects</h2><ul><li>Assignment binds name</li><li>list/dict/set mutable</li><li>tuple/string immutable</li><li>== value, is identity</li></ul></article>
        <article class="rev searchable"><span>05</span><h2>Containers</h2><ul><li>List index O(1)</li><li>Membership O(n)</li><li>append O(1) amortized</li><li>dict/set O(1) average</li><li>slice O(k)</li></ul></article>
        <article class="rev searchable"><span>06</span><h2>Functions</h2><ul><li>Defaults evaluated once</li><li>Missing return → None</li><li>LEGB lookup</li><li>Closure remembers state</li></ul></article>
        <article class="rev searchable"><span>07</span><h2>Trace protocol</h2><ol><li>Quantity underline</li><li>Aliases draw</li><li>RHS first</li><li>State table</li><li>Side effects</li><li>Exact then asymptotic</li></ol></article>
        <article class="rev warning searchable"><span>08</span><h2>Never write</h2><ul><li>Omega always best</li><li>Theta means average</li><li>Two loops always n²</li><li>Recursive fib space O(1)</li><li>list.sort is quicksort</li></ul></article>
      </section>
      <section class="self-test searchable"><h2>60-second self test</h2><details><summary>Two consecutive O(n) loops?</summary><p>O(n+n)=Θ(n), not n².</p></details><details><summary>Default list data retain kyun?</summary><p>Default object definition time par once create aur reuse hota hai.</p></details><details><summary>100 total calls means space O(100)?</summary><p>Not necessarily. Space maximum simultaneously active frames se aata hai.</p></details><details><summary>Sorted linked list binary search O(log n)?</summary><p>No guarantee: middle access O(n) hai.</p></details></section>
    </div>
  </main>
</div>
<button class="menu" id="menu">☰</button><div class="toast">Copied</div>`

const tabs = [...document.querySelectorAll('.tab')]
const panels = [...document.querySelectorAll('[data-panel]')]
const toc = document.querySelector('#toc')
const sidebar = document.querySelector('.sidebar')

function buildToc(view) {
  const sections = [...document.querySelector(`[data-panel="${view}"]`).querySelectorAll('[data-title]')]
  toc.innerHTML = sections.map((s,i) => { if (!s.id) s.id=`${view}-${i}`; return `<a href="#${s.id}"><i>${String(i+1).padStart(2,'0')}</i>${s.dataset.title}</a>` }).join('')
}
function setView(view) {
  tabs.forEach(t=>t.classList.toggle('active',t.dataset.view===view))
  panels.forEach(p=>p.classList.toggle('active',p.dataset.panel===view))
  buildToc(view); window.scrollTo({top:0,behavior:'smooth'}); clearSearch()
}
tabs.forEach(t=>t.onclick=()=>setView(t.dataset.view))
document.querySelectorAll('[data-jump]').forEach(b=>b.onclick=()=>setView(b.dataset.jump))
buildToc('notes')

const sectionPracticeMap = {
  'exam-map':'intro', foundation:'importance', analysis:'complexity', bounds:'complexity', growth:'complexity', loops:'complexity', 'tricky-loops':'complexity-practice', space:'complexity',
  'complexity-practice':'complexity-practice', 'python-refresher':'refresher', objects:'refresher', containers:'types', control:'control',
  'python-loops':'loops', functions:'functions', builtins:'builtins', comprehensions:'comprehensions', classes:'classes', inputs:'inputs'
}
Object.entries(sectionPracticeMap).forEach(([sectionId, topicId]) => {
  const section = document.querySelector(`#${sectionId}`)
  if (!section) return
  const topic = practiceTopics.find(item => item.id === topicId)
  section.insertAdjacentHTML('beforeend', `<button class="topic-practice" data-practice-topic="${topicId}">Is topic ke ${topic.questions.length} questions solve karo →</button>`)
})
document.querySelectorAll('[data-practice-topic]').forEach(button => button.onclick = () => {
  practiceTopic.value = button.dataset.practiceTopic
  practiceDifficulty.value = 'all'
  renderPractice()
  setView('practice')
})

document.querySelector('#themeButton').onclick=()=>{ document.documentElement.classList.toggle('dark'); localStorage.setItem('da-theme',document.documentElement.classList.contains('dark')?'dark':'light') }
// Dark is the default for first-time visitors; an explicit light choice is remembered.
if(localStorage.getItem('da-theme')!=='light') document.documentElement.classList.add('dark')
if(!document.querySelector('.module-switch a[href="./module7.html"]')) document.querySelector('.module-switch').insertAdjacentHTML('beforeend','<a href="./module7.html">M07</a>')
document.querySelector('#searchButton').onclick=()=>{document.querySelector('.searchbox').classList.toggle('open');document.querySelector('#search').focus()}
function clearSearch(){document.querySelector('#search').value='';document.querySelectorAll('.searchable,.pyq-card').forEach(x=>x.classList.remove('hidden'));document.querySelector('#searchResult').textContent='Search current view'}
document.querySelector('#search').oninput=e=>{const term=e.target.value.toLowerCase().trim(),items=[...document.querySelector('.view.active').querySelectorAll('.searchable,.pyq-card')];let n=0;items.forEach(x=>{const hit=!term||x.textContent.toLowerCase().includes(term);x.classList.toggle('hidden',!hit);if(hit)n++});document.querySelector('#searchResult').textContent=term?`${n} matching blocks`:'Search current view'}

document.querySelectorAll('.codebox button').forEach(b=>b.onclick=async()=>{await navigator.clipboard.writeText(b.closest('.codebox').querySelector('code').innerText);const t=document.querySelector('.toast');t.classList.add('show');setTimeout(()=>t.classList.remove('show'),1000)})
document.querySelectorAll('.filter').forEach(b=>b.onclick=()=>{document.querySelectorAll('.filter').forEach(x=>x.classList.remove('active'));b.classList.add('active');document.querySelectorAll('.pyq-card').forEach(x=>x.classList.toggle('filtered',b.dataset.year!=='all'&&x.dataset.year!==b.dataset.year))})
let open=false;document.querySelector('#expand').onclick=e=>{open=!open;document.querySelectorAll('.pyq-card:not(.filtered)').forEach(x=>x.open=open);e.target.textContent=open?'Collapse all':'Expand all'}

const checks=[...document.querySelectorAll('[data-lecture]')],saved=JSON.parse(localStorage.getItem('da-m1-lectures')||'[]')
checks.forEach(c=>{c.checked=saved.includes(c.dataset.lecture);c.onchange=progress})
function progress(){const done=checks.filter(c=>c.checked).map(c=>c.dataset.lecture),percent=Math.round(100*done.length/checks.length);localStorage.setItem('da-m1-lectures',JSON.stringify(done));document.querySelector('#count').textContent=`${done.length}/${checks.length}`;document.querySelector('#bar').style.width=`${percent}%`;document.querySelector('#lecturePercent').textContent=`${percent}%`}
progress()

const attemptedQuestions = new Set(JSON.parse(localStorage.getItem('da-practice-attempted') || '[]'))
const practiceTopic = document.querySelector('#practiceTopic')
const practiceDifficulty = document.querySelector('#practiceDifficulty')

function renderPractice() {
  const topic = practiceTopics.find(item => item.id === practiceTopic.value) || practiceTopics[0]
  const level = practiceDifficulty.value
  const visible = level === 'all' ? topic.questions : topic.questions.filter(question => question.difficulty === level)
  const topicAttempted = topic.questions.filter(question => attemptedQuestions.has(question.id)).length
  const patterns = [...new Set(topic.questions.map(question => question.pattern))]

  document.querySelector('#practiceScore').textContent = `${topicAttempted}/${topic.questions.length}`
  document.querySelector('#practiceContext').innerHTML = `
    <div><span>Lecture ${topic.number}</span><h2>${topic.label}</h2><p>Pehle bina answer khole solve karo. Phir explanation ko apne words mein ek line mein bolo—tabhi concept genuinely clear hua.</p></div>
    <aside><b>${visible.length} shown</b><small>${patterns.length} recurring patterns</small><p>${patterns.join(' · ')}</p></aside>`
  document.querySelector('#questionList').innerHTML = visible.map(question => `
    <article class="practice-question searchable ${attemptedQuestions.has(question.id) ? 'attempted' : ''}" data-title="${topic.label} question ${question.number}">
      <div class="question-meta"><span>Q${String(question.number).padStart(2, '0')}</span><i>${question.difficulty}</i><b>${question.pattern}</b></div>
      <h3>${question.prompt}</h3>
      <ol class="question-options" type="A">${question.options.map(option => `<li>${option}</li>`).join('')}</ol>
      <details class="answer-reveal"><summary>Answer + explanation dekho</summary><div><strong>Correct: ${question.answer}</strong><p>${question.explanation}</p><small>Self-check: sirf option yaad mat karo—rule ko next variation par apply karke dekho.</small></div></details>
      <label class="attempt-check"><input type="checkbox" data-attempt="${question.id}" ${attemptedQuestions.has(question.id) ? 'checked' : ''}><span>Attempted</span></label>
    </article>`).join('')

  document.querySelectorAll('[data-attempt]').forEach(box => {
    box.onchange = () => {
      if (box.checked) attemptedQuestions.add(box.dataset.attempt)
      else attemptedQuestions.delete(box.dataset.attempt)
      localStorage.setItem('da-practice-attempted', JSON.stringify([...attemptedQuestions]))
      box.closest('.practice-question').classList.toggle('attempted', box.checked)
      const count = topic.questions.filter(question => attemptedQuestions.has(question.id)).length
      document.querySelector('#practiceScore').textContent = `${count}/${topic.questions.length}`
    }
  })
}

practiceTopic.onchange = renderPractice
practiceDifficulty.onchange = renderPractice
renderPractice()
document.querySelector('#print').onclick=()=>window.print()
document.querySelector('#menu').onclick=()=>sidebar.classList.toggle('open')
toc.onclick=()=>sidebar.classList.remove('open')
window.onscroll=()=>{const max=document.documentElement.scrollHeight-innerHeight;document.querySelector('.read-progress span').style.width=`${max?100*scrollY/max:0}%`}
