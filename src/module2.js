import './style.css'
import { module2Topics, module2QuestionCount } from './practice2.js'

const pyqs = [
  {year:'2024',q:'Q39',title:'Sequential state in an array',answer:'Option C',question:'computeS(X) sets S[1]=1. For i=2…length(X), it resets S[i]=1 and, if X[i−1]≤X[i], adds S[i−1]. Find S for X=[6,3,5,4,10].',options:['A. [1,1,2,3,4]','B. [1,1,2,3,3]','C. [1,1,2,1,2]','D. [1,1,2,1,5]'],steps:'State table: 6≤3 false→1; 3≤5 true→2; 5≤4 false→1; 4≤10 true→2.',trap:'S[i]=1 har iteration reset hota hai. Previous run ka count blindly carry nahi hota.',pattern:'Adjacent comparison + DP-like state tracing.'},
  {year:'2024',q:'Q41',title:'Recursive segment reversal',answer:'Option C',question:'fun(D,s1,s2) swaps D[s1],D[s2], then recursively calls fun(D,s1+1,s2−1) while s1<s2. What does it do?',options:['A. Find minimum','B. Merge sort','C. Reverse D[s1…s2]','D. Swap only endpoints'],steps:'Endpoints swap, boundaries one step inward, repeat until meet/cross. Entire inclusive segment reverses in-place.',trap:'Explicit return nahi hai, lekin mutation complete hoti hai.',pattern:'Two pointers + recursion + side effect.'},
  {year:'2025',q:'Q23',title:'append vs extend',answer:'Option A',question:'A=[1,2,3], B=[4,5,6]. Which statement makes A=[1,2,3,4,5,6]?',options:['A. A.extend(B)','B. A.append(B)','C. A.update(B)','D. A.insert(B)'],steps:'extend iterable ke elements individually adds. append(B) nested list banata: [1,2,3,[4,5,6]].',trap:'Method ka naam nahi, final list shape dekho.',pattern:'Mutation method semantics.'},
  {year:'2025',q:'Q27',title:'Binary search input structure',answer:'Option C',question:'Worst case O(log n) binary search kis input par chalega?',options:['A. Unsorted array','B. Unsorted linked list','C. Increasing-order array','D. Increasing-order linked list'],steps:'Ordering half eliminate karne deti hai; array O(1) middle access deti hai. Linked list middle reach O(n) ho sakta hai.',trap:'Sorted hona necessary hai but chosen structure ka access cost bhi include karo.',pattern:'Algorithm + data-structure operation cost.'},
  {year:'2025',q:'Q29',title:'Insertion-sort swaps',answer:'Options A and C',question:'Insertion sort on [1,3,5,7,9,11,x,15,13] takes exactly two swaps. Possible x?',options:['A. 10','B. 12','C. 14','D. 16'],steps:'Swap count = inversion count. Existing inversion (15,13)=1. x=10 adds (11,10)=1; x=14 adds (14,13)=1. Both total 2.',trap:'Full sorting simulate karne ke bajay inversions count karo.',pattern:'Array order + inversion invariant.'},
  {year:'2026',q:'Q16',title:'Mutable default list',answer:'Option B',question:'append_to_lst(val,lst=[]) appends and returns lst. Calls are (1), (2), then (3,[]). Output?',options:['A. [1], [2], [3]','B. [1], [1,2], [3]','C. [1], [2], [1,2,3]','D. [1], [1,2], [1,3]'],steps:'Default [] definition time par once banti hai; first two calls same list share. Explicit [] third call ko fresh list deti hai.',trap:'Default expression har call par evaluate nahi hoti.',pattern:'List identity + mutation across calls.'},
  {year:'2026',q:'Q31',title:'Exact binary-search comparisons',answer:'10',question:'Sorted array A has 1000 distinct integers. Recursive binary search looks for absent y. Maximum middle comparisons?',options:[],steps:'2⁹=512 < 1000 ≤ 1024=2¹⁰. Longest unsuccessful path needs 10 middle checks before interval empty.',trap:'NAT exact count poochta hai; O(log n) incomplete answer hai.',pattern:'Decision-tree height + boundary powers.'},
  {year:'2026',q:'Q58',title:'Adjacent swaps and inversions',answer:'8',question:'A recursive pass swaps adjacent out-of-order elements and returns number of swaps. It is called len(data) times for data=[5,3,4,1,2]. Printed total?',options:[],steps:'Adjacent swap removes exactly one inversion. Inversions: 5 contributes 4; 3 contributes 2; 4 contributes 2; total 8.',trap:'Long trace avoid karne ke liye invariant identify karo.',pattern:'Array pair counting + bubble invariant.'}
]

const pyqMarkup = pyqs.map(item=>`<details class="pyq-card searchable" data-year="${item.year}"><summary><span class="year">${item.year}</span><span><b>${item.q} · ${item.title}</b><small>Full question + reusable method</small></span><i>＋</i></summary><div class="pyq-body"><div class="answer"><span>Correct answer</span><strong>${item.answer}</strong></div><div class="pyq-question"><h4>Original question · clean transcript</h4><p>${item.question}</p>${item.options.length?`<ul>${item.options.map(x=>`<li>${x}</li>`).join('')}</ul>`:'<small>NAT · answer in integer</small>'}</div><div><h4>Step-by-step reasoning</h4><p>${item.steps}</p></div><aside><strong>GATE trap</strong><p>${item.trap}</p></aside><aside class="transfer"><strong>Reusable pattern</strong><p>${item.pattern}</p></aside></div></details>`).join('')
const topicOptions = module2Topics.map(t=>`<option value="${t.id}">${t.number} · ${t.label} (${t.questions.length})</option>`).join('')
const chapterHead=(n,label,title,sub)=>`<div class="chapter-head"><div class="chapter-no"><span>${n}</span><small>${label}</small></div><div><h2>${title}</h2><p>${sub}</p></div></div>`

document.querySelector('#app').innerHTML=`
<div class="read-progress"><span></span></div>
<header class="topbar"><a class="brand" href="#top"><b>DA</b><span><strong>Python + DSA</strong><small>GATE 2027 Notebook</small></span></a><nav><button class="tab active" data-view="notes">Detailed Notes</button><button class="tab" data-view="pyq">PYQ Lab <i>${pyqs.length}</i></button><button class="tab" data-view="practice">Practice <i>${module2QuestionCount}</i></button><button class="tab" data-view="revision">Revision</button></nav><div class="actions"><button id="searchButton" aria-label="Search">⌕</button><button id="themeButton" aria-label="Theme">◐</button></div></header>
<div class="searchbox"><input id="search" type="search" placeholder="Search: slicing, append, matrix, prefix sum…"><span id="searchResult">Search current view</span></div>
<div class="layout" id="top">
  <aside class="sidebar"><p class="overline">Module 02</p><h2>Arrays & Lists</h2><div class="module-switch"><a href="./index.html">M01</a><a class="active" href="./module2.html">M02</a><a href="./module3.html">M03</a><a href="./module4.html">M04</a><a href="./module5.html">M05</a><a href="./module6.html">M06</a></div><div class="completion"><span><b>Lecture progress</b><i id="count">0/11</i></span><div><i id="bar"></i></div></div><nav id="toc"></nav><p class="source"><b>Sources</b>CampusX full PDF + arrays/lists/practice notebooks + GATE DA 2024–2026 papers</p></aside>
  <main>
    <div class="view active" data-panel="notes">
      <section class="hero module2-hero searchable" data-title="Overview"><p class="eyebrow"><i></i> Module 02 · zero to GATE</p><h1>Index se element tak—<em>memory</em> ka map samjho.</h1><p>Array/list questions syntax se zyada representation, mutation aur operation cost test karte hain. Har line ko object-state aur complexity dono angles se padhenge.</p><div class="metrics"><span><b>3</b>papers analysed</span><span><b>${pyqs.length}</b>relevant PYQs</span><span><b>${module2QuestionCount}</b>practice drills</span></div><div class="syllabus"><b>2027 syllabus map</b>Programming in Python · foundation for searching, sorting and every linear data structure</div></section>

      <section class="lecture-track searchable" id="lecture-track" data-title="Module 2 lecture tracker"><div class="track-head"><div><p class="eyebrow"><i></i> CampusX + GATE bridge</p><h2>Module 2 · Lecture Tracker</h2><p>Lecture ke saath tick karo; orange GATE bridges lecture ke missing exam concepts hain.</p></div><strong id="lecturePercent">0%</strong></div><div class="lecture-list">
        <label><input type="checkbox" data-lecture="2"><span><b>2</b><i>Arrays & Lists overview</i><small>Module map</small></span></label>
        <label><input type="checkbox" data-lecture="2.1"><span><b>2.1</b><i>Arrays</i><small>Model and operations</small></span></label>
        <label><input type="checkbox" data-lecture="2.1A"><span><b>2.1A</b><i>array module</i><small>Typed Python array</small></span></label>
        <label><input type="checkbox" data-lecture="2.1B"><span><b>2.1B</b><i>NumPy bridge</i><small>Lecture continuity</small></span></label>
        <label><input type="checkbox" data-lecture="2.2"><span><b>2.2</b><i>Lists · 1D</i><small>Methods and mutation</small></span></label>
        <label><input type="checkbox" data-lecture="2.2B"><span><b>2.2B</b><i>Copies & slicing</i><small>GATE edge cases</small></span></label>
        <label><input type="checkbox" data-lecture="2.2C"><span><b>2.2C</b><i>Lists · 2D</i><small>Matrices and alias trap</small></span></label>
        <label><input type="checkbox" data-lecture="2.3"><span><b>2.3</b><i>Arrays vs Lists</i><small>Representation choice</small></span></label>
        <label><input type="checkbox" data-lecture="2.4"><span><b>2.4</b><i>Complexity Analysis</i><small>Exact operation costs</small></span></label>
        <label><input type="checkbox" data-lecture="2.5"><span><b>2.5</b><i>Coding Problems</i><small>Largest, count, dedupe, reverse</small></span></label>
        <label><input type="checkbox" data-lecture="2.6"><span><b>2.6</b><i>DS context + patterns</i><small>Prefix sum and window</small></span></label>
      </div></section>

      <section class="beginner-start searchable" id="zero-start" data-title="Zero-start mental model"><div class="zero-title"><span>ZERO START</span><h2>Array ek labelled shelf hai; list us shelf ka flexible Python version.</h2><p>Index position ka label hai, value us position par referenced object. Index aur value ko kabhi mix mat karo.</p></div><div class="glossary-grid"><article><b>Element</b><p>Container ke andar ek stored/referenced value.</p></article><article><b>Index</b><p>Zero-based position: first 0, last n−1.</p></article><article><b>Length</b><p>Total elements; Python mein <code>len(L)</code>.</p></article><article><b>Traversal</b><p>Har element ko systematically visit karna.</p></article><article><b>Mutation</b><p>Same list object ke contents change karna.</p></article><article><b>Contiguous</b><p>Equal-width slots memory mein adjacent.</p></article></div><div class="reading-method"><h3>Har question ka four-lens method</h3><div><span><b>1</b>Shape</span><span><b>2</b>Index</span><span><b>3</b>Mutation/alias</span><span><b>4</b>Time + space</span></div></div></section>

      <section class="chapter searchable" id="array-model" data-title="2.1 · Array foundations">${chapterHead('2.1','ARRAYS','Array kya hota hai?','Contiguous same-type storage aur constant-time indexing ka intuition.')}
        <div class="two-grid"><article><h3>Classical array</h3><ul><li>Homogeneous, equal-width elements</li><li>Contiguous memory locations</li><li>Fixed capacity in classical model</li><li>Index access Θ(1)</li></ul></article><article><h3>Python reality</h3><ul><li><code>array.array</code>: typed values</li><li><code>numpy.ndarray</code>: homogeneous numeric array</li><li><code>list</code>: dynamic array of object references</li><li>“Array” word ka model context se identify karo</li></ul></article></div>
        <div class="equation"><span>GATE bridge · address</span><b>LOC(A[i]) = base + i × element_width</b></div><div class="callout"><b>Why Θ(1)?</b><p>i kitna bhi bada ho, address calculate karne ke arithmetic steps fixed rehte hain. Array scan nahi hota.</p></div><div class="danger"><b>Boundary trap</b><p>Length n ke valid indices 0…n−1. <code>A[n]</code> out of range hai. Python negative indexing extra language feature hai, universal pseudocode rule nahi.</p></div>
      </section>

      <section class="chapter searchable" id="array-ops" data-title="2.1 · Array operations">${chapterHead('2.1A','OPERATIONS','Access easy, insertion costly kyun?','Movement ko count karoge toh complexity khud niklegi.')}
        <div class="table-wrap"><table><thead><tr><th>Operation</th><th>Time</th><th>Reason</th></tr></thead><tbody><tr><td>Index access/update</td><td>Θ(1)</td><td>Address arithmetic</td></tr><tr><td>Traversal</td><td>Θ(n)</td><td>n visits</td></tr><tr><td>Linear search</td><td>O(n)</td><td>Sequential comparisons</td></tr><tr><td>Binary search</td><td>O(log n)</td><td>Only when sorted + fast middle access</td></tr><tr><td>Insert/delete beginning</td><td>Θ(n)</td><td>Elements shift</td></tr><tr><td>Update A[i]</td><td>Θ(1)</td><td>No shift</td></tr><tr><td>Slice k items</td><td>Θ(k) time/space</td><td>New container</td></tr><tr><td>Merge lengths n,m</td><td>Θ(n+m)</td><td>Both copied</td></tr></tbody></table></div>
        <div class="codebox"><div><span>Insert at index 3</span><button>Copy</button></div><pre><code># before: [10, 20, 30, 40, 50]
# shift suffix right, then place 35
# after:  [10, 20, 30, 35, 40, 50]
# moved elements depend on position → worst Θ(n)</code></pre></div>
      </section>

      <section class="chapter searchable" id="array-python" data-title="2.1 · array module and NumPy">${chapterHead('2.1B','LECTURE','Python array module and NumPy','Course implementation samjho; exam-priority boundary bhi clear rakho.')}
        <div class="code-grid"><div class="codebox green"><div><span>array module</span><button>Copy</button></div><pre><code>from array import array
a = array('i', [10, 20, 30])
a.insert(1, 15)
a.remove(30)
a[0] = 99</code></pre></div><div class="codebox"><div><span>NumPy</span><button>Copy</button></div><pre><code>import numpy as np
a = np.array([10, 20, 30])
b = a + 10       # [20, 30, 40]
c = np.insert(a, 1, 15)  # new array</code></pre></div></div>
        <div class="danger"><b>Very important correction</b><p><code>np.insert</code>, <code>np.delete</code> aur <code>np.sort</code> functions usually new arrays return karte hain; original ko automatically rebind nahi karte. Python list methods ka behavior alag ho sakta hai.</p></div><div class="note"><b>Syllabus priority:</b> NumPy lecture/DA context ke liye useful hai, par official Section 4 “Programming in Python” bolta hai—core list semantics aur algorithm reasoning first priority.</div>
      </section>

      <section class="chapter searchable" id="list-basics" data-title="2.2 · Python list foundations">${chapterHead('2.2','LISTS','Python list: dynamic array of references','Ordered, mutable, duplicate-friendly aur heterogeneous.')}
        <div class="object"><span><code>p(1)</code><code>p('A')</code><code>p(True)</code></span><i>references point to</i><b>different Python objects</b></div><div class="three-grid"><article><span>Ordered</span><h3>Position matters</h3><p>Insertion order preserved; index access available.</p></article><article><span>Mutable</span><h3>Same object changes</h3><p>append, assignment, remove aliases ko visible.</p></article><article><span>Dynamic</span><h3>Capacity grows</h3><p>Spare capacity frequent append efficient banati hai.</p></article></div>
        <div class="codebox"><div><span>Aliasing</span><button>Copy</button></div><pre><code>a = [10, 20]
b = a
b.append(30)
print(a)       # [10, 20, 30]
print(a is b)  # True</code></pre></div>
      </section>

      <section class="chapter searchable" id="list-methods" data-title="2.2 · List methods">${chapterHead('2.2A','1D METHODS','Method ka final shape predict karo','append/extend aur sort/sorted GATE ke favourite semantic contrasts hain.')}
        <div class="table-wrap"><table><thead><tr><th>Expression</th><th>Effect</th><th>Return</th></tr></thead><tbody><tr><td><code>L.append(x)</code></td><td>x as one element</td><td>None</td></tr><tr><td><code>L.extend(it)</code></td><td>each iterable item</td><td>None</td></tr><tr><td><code>L.insert(i,x)</code></td><td>x before i</td><td>None</td></tr><tr><td><code>L.remove(x)</code></td><td>first equal x</td><td>None</td></tr><tr><td><code>L.pop(i)</code></td><td>remove at i</td><td>removed value</td></tr><tr><td><code>L.clear()</code></td><td>same object empty</td><td>None</td></tr><tr><td><code>L.sort()</code></td><td>in-place sort</td><td>None</td></tr><tr><td><code>sorted(L)</code></td><td>new sorted list</td><td>new list</td></tr></tbody></table></div>
        <div class="two-grid"><div><h3>append vs extend</h3><p><code>[1,2].append([3,4]) → [1,2,[3,4]]</code></p><p><code>[1,2].extend([3,4]) → [1,2,3,4]</code></p></div><div><h3>Errors to know</h3><p><code>remove</code> absent value → ValueError</p><p><code>pop</code> empty/invalid index → IndexError</p></div></div>
      </section>

      <section class="chapter searchable" id="slicing-copy" data-title="2.2 · Slicing and copying">${chapterHead('2.2B','GATE BRIDGE','Slice nayi outer list banati hai—objects nahi','Half-open boundaries, negative step aur shallow-copy aliasing.')}
        <div class="equation"><span>slice grammar</span><b>L[start : stop : step] · stop excluded</b></div><div class="code-grid"><div class="codebox"><div><span>Shallow copy</span><button>Copy</button></div><pre><code>a = [[1], [2]]
b = a.copy()
b[0].append(9)
print(a)  # [[1, 9], [2]]</code></pre></div><div class="codebox red"><div><span>Why?</span><button>Copy</button></div><pre><code># a and b: different outer lists
# a[0] and b[0]: same inner list
print(a is b)       # False
print(a[0] is b[0]) # True</code></pre></div></div><div class="callout"><b>Complexity</b><p>k-element slice/copy Θ(k) time aur Θ(k) new outer space. <code>a=b</code> Θ(1) binding hai, copy nahi.</p></div>
      </section>

      <section class="chapter searchable" id="lists-2d" data-title="2.2 · 2D lists">${chapterHead('2.2C','2D LISTS','Matrix = list of row lists','Rows independent hain ya aliased—ye check sabse pehle.')}
        <div class="code-grid"><div class="codebox red"><div><span>Wrong</span><button>Copy</button></div><pre><code>M = [[0] * 3] * 2
M[0][0] = 7
print(M)
# [[7,0,0], [7,0,0]]</code></pre></div><div class="codebox green"><div><span>Correct</span><button>Copy</button></div><pre><code>M = [[0] * 3 for _ in range(2)]
M[0][0] = 7
print(M)
# [[7,0,0], [0,0,0]]</code></pre></div></div>
        <div class="two-grid"><article><h3>Indexing</h3><p><code>M[i][j]</code>: row i, then column j. Rectangular matrix r×c traversal Θ(rc).</p></article><article><h3>Jagged edge</h3><p>Python rows different lengths ki ho sakti hain. <code>len(M[0])</code> ko universal width mat assume karo.</p></article></div>
      </section>

      <section class="chapter searchable" id="compare" data-title="2.3 · Arrays vs Lists">${chapterHead('2.3','COMPARISON','Right representation choose karo','“Array faster” absolute statement nahi—workload specify karo.')}
        <div class="table-wrap"><table><thead><tr><th>Property</th><th>Typed/NumPy array</th><th>Python list</th></tr></thead><tbody><tr><td>Elements</td><td>Homogeneous</td><td>Heterogeneous references</td></tr><tr><td>Size</td><td>Fixed storage shape</td><td>Dynamic capacity</td></tr><tr><td>Numeric math</td><td>Vectorized</td><td>Explicit loop usually</td></tr><tr><td>Index access</td><td>O(1)</td><td>O(1)</td></tr><tr><td>Memory</td><td>Compact typed values</td><td>Reference/object overhead</td></tr><tr><td>Best fit</td><td>Tensors, features, images</td><td>Mixed/growing collections</td></tr></tbody></table></div><div class="danger"><b>Correction</b><p>Python list linked list nahi hai. Ye resizable array of references hai; isi liye indexing O(1), middle insertion O(n), append amortized O(1).</p></div>
      </section>

      <section class="chapter searchable" id="complexity" data-title="2.4 · Complexity analysis">${chapterHead('2.4','HIGH PRIORITY','Operation cost ka master table','Worst-case aur amortized ko separate rakho.')}
        <div class="table-wrap"><table><thead><tr><th>List operation</th><th>Time</th><th>Exam note</th></tr></thead><tbody><tr><td><code>len, L[i], L[i]=x</code></td><td>O(1)</td><td>metadata/direct slot</td></tr><tr><td><code>append</code></td><td>O(1) amortized</td><td>single resize O(n)</td></tr><tr><td><code>pop()</code></td><td>O(1)</td><td>end only</td></tr><tr><td><code>insert(i,x), pop(i), del L[i]</code></td><td>O(n)</td><td>shifting</td></tr><tr><td><code>x in L, count, index</code></td><td>O(n)</td><td>scan</td></tr><tr><td><code>copy, reverse</code></td><td>O(n)</td><td>all slots visit</td></tr><tr><td><code>sort</code></td><td>O(n log n) worst</td><td>Timsort</td></tr><tr><td><code>L1+L2</code></td><td>O(n+m)</td><td>new list</td></tr></tbody></table></div>
        <div class="callout"><b>Amortized intuition</b><p>Capacity full hone par expensive resize hota hai, par every append par nahi. n appends ka total O(n), hence average/amortized O(1) per append.</p></div>
      </section>

      <section class="chapter searchable" id="coding" data-title="2.5 · Coding problems">${chapterHead('2.5','LECTURE PRACTICE','Four problems, hidden edge cases','Correctness + time + auxiliary space ek saath derive karo.')}
        <div class="practice-list"><article><span>01</span><div><b>Largest element</b><p>Initialize first element; empty input contract handle. max=0 all-negative list par wrong.</p></div><strong>O(n) · O(1)</strong></article><article><span>02</span><div><b>Count target</b><p>One pass, equality true ho toh counter increment.</p></div><strong>O(n) · O(1)</strong></article><article><span>03</span><div><b>Remove duplicates</b><p>Result-list membership version order preserve but O(n²); seen-set version average O(n).</p></div><strong>Choose structure</strong></article><article><span>04</span><div><b>Reverse</b><p>New reversed list O(n) space; two-pointer in-place O(1) auxiliary.</p></div><strong>Requirement check</strong></article></div>
        <div class="codebox"><div><span>Order-preserving dedupe</span><button>Copy</button></div><pre><code>def unique_in_order(values):
    seen = set()
    out = []
    for x in values:
        if x not in seen:
            seen.add(x)
            out.append(x)
    return out
# average time O(n), extra space O(n)</code></pre></div>
      </section>

      <section class="chapter searchable" id="prefix-window" data-title="2.6 · Prefix sums and sliding window">${chapterHead('2.6','GATE ADD-ON','Repeated range work ko reuse karo','Course outline ke array patterns jo lecture notebook mein missing the.')}
        <div class="danger"><b>Priority label</b><p><b>Useful problem-solving pattern, lower priority for official GATE DA DSA syllabus.</b> Core array/list operations, Python state tracing aur complexity pehle master karo.</p></div>
        <div class="two-grid"><article><h3>Prefix sum</h3><p><code>P[0]=0</code>, <code>P[i+1]=P[i]+A[i]</code>. Inclusive [l,r] sum = <code>P[r+1]-P[l]</code>. Build O(n), query O(1).</p></article><article><h3>Fixed sliding window</h3><p>First k sum banao. Har step outgoing subtract, incoming add. All windows O(n), naive O(nk).</p></article></div>
        <div class="code-grid"><div class="codebox"><div><span>Prefix</span><button>Copy</button></div><pre><code>P = [0]
for x in A:
    P.append(P[-1] + x)
range_sum = P[r + 1] - P[l]</code></pre></div><div class="codebox"><div><span>Fixed window maximum</span><button>Copy</button></div><pre><code>window = sum(A[:k])
best = window
for right in range(k, len(A)):
    window += A[right] - A[right-k]
    best = max(best, window)</code></pre></div></div><div class="danger"><b>Variable-window caveat</b><p>Negative values hon toh “sum bada → left shrink” monotonic logic fail ho sakti hai. Pattern ki prerequisite check karo.</p></div>
      </section>

      <section class="chapter searchable" id="gate-protocol" data-title="GATE solving protocol">${chapterHead('GATE','FINAL CHECK','Array/list question ka six-step protocol','Paper par code run karne ka disciplined method.')}
        <div class="steps"><article><b>1</b><h3>Draw slots</h3><p>Indices aur values.</p></article><article><b>2</b><h3>Mark aliases</h3><p>Same outer/inner object?</p></article><article><b>3</b><h3>RHS first</h3><p>Simultaneous assignment.</p></article><article><b>4</b><h3>Track shape</h3><p>Nested vs extended.</p></article><article><b>5</b><h3>Count moves</h3><p>Access, comparisons, shifts.</p></article></div><div class="final"><h3>Module 2 mastery</h3><p>Bina Python run kiye list state, shallow copy, 2D alias, exact output aur operation complexity explain kar sako.</p><button data-jump="pyq">PYQ Lab open karo →</button></div>
      </section>
    </div>

    <div class="view" data-panel="pyq"><section class="page-hero searchable" data-title="PYQ Lab"><p class="eyebrow"><i></i> 2024–2026 evidence</p><h1>Arrays & Lists PYQ Lab</h1><p>Full question, exact state trace aur next variation ka reusable rule.</p><div class="paper-grid"><span><b>2024</b>state + reversal</span><span><b>2025</b>methods + ordering</span><span><b>2026</b>identity + exact counts</span></div></section><section class="trend searchable" data-title="Pattern observation"><h2>GATE ka recurring signal</h2><div><p><span>Mutation / state</span><i style="--w:100%"></i><b>Every year</b></p><p><span>Exact counting</span><i style="--w:88%"></i><b>High</b></p><p><span>Method semantics</span><i style="--w:80%"></i><b>High</b></p><p><span>Array ordering</span><i style="--w:75%"></i><b>Reusable</b></p></div><small>Sorting/searching ke full PYQs dedicated modules mein repeat nahi, deeper context ke saath aayenge.</small></section><div class="filters"><button class="filter active" data-year="all">All</button><button class="filter" data-year="2024">2024</button><button class="filter" data-year="2025">2025</button><button class="filter" data-year="2026">2026</button><button id="expand">Expand all</button></div><section class="pyqs">${pyqMarkup}</section></div>

    <div class="view" data-panel="practice"><section class="page-hero practice-head searchable" data-title="Practice Lab"><p class="eyebrow"><i></i> Topic-wise · saved progress</p><h1>Module 2 Practice</h1><p>${module2QuestionCount} distinct drills; har lecture ke immediately baad matching set solve karo.</p><div class="practice-summary"><span><b>${module2Topics.length}</b>topic sets</span><span><b>no filler</b>concept variations</span><span><b>saved</b>attempt progress</span></div></section><section class="practice-controls searchable" data-title="Choose topic"><div><label for="practiceTopic">Lecture topic</label><select id="practiceTopic">${topicOptions}</select></div><div><label for="practiceDifficulty">Difficulty</label><select id="practiceDifficulty"><option value="all">All levels</option><option>Foundation</option><option>Core</option><option>Practice</option></select></div><div class="practice-score"><span>Attempted</span><b id="practiceScore">0/0</b></div></section><section class="practice-context" id="practiceContext"></section><section class="question-list" id="questionList"></section></div>

    <div class="view" data-panel="revision"><section class="page-hero revision-head searchable" data-title="Revision sheet"><p class="eyebrow"><i></i> Last-day recall</p><h1>Module 2 Revision</h1><p>Operation, trap aur formula ek compact sheet mein.</p><button id="print">Print sheet</button></section><section class="revision-grid">
      <article class="rev"><span>01</span><h2>Array model</h2><ul><li>0…n−1 valid indices</li><li>address = base+i×w</li><li>access/update O(1)</li><li>insert/delete may shift O(n)</li></ul></article>
      <article class="rev"><span>02</span><h2>List identity</h2><ul><li>assignment aliases</li><li>copy is shallow</li><li>nested objects can remain shared</li><li>list is dynamic array, not linked list</li></ul></article>
      <article class="rev"><span>03</span><h2>Methods</h2><ul><li>append one item</li><li>extend iterable items</li><li>remove first matching value</li><li>pop removes + returns</li><li>sort/reverse return None</li></ul></article>
      <article class="rev"><span>04</span><h2>Complexity</h2><ul><li>append O(1) amortized</li><li>pop end O(1), pop(0) O(n)</li><li>membership/count O(n)</li><li>slice k → O(k)</li><li>concat → O(n+m)</li></ul></article>
      <article class="rev"><span>05</span><h2>2D trap</h2><ul><li>[[0]*c]*r aliases rows</li><li>use comprehension</li><li>M[i][j] row then column</li><li>traversal O(rc)</li></ul></article>
      <article class="rev"><span>06</span><h2>Patterns</h2><ul><li>prefix range = P[r+1]-P[l]</li><li>window: remove outgoing, add incoming</li><li>seen set for average O(n) dedupe</li><li>two-pointer reverse O(1) aux</li></ul></article>
      <article class="rev warning"><span>07</span><h2>Never assume</h2><ul><li>array and list identical</li><li>slice O(1)</li><li>append always worst O(1)</li><li>copy means deep copy</li><li>sorted linked list binary search O(log n)</li></ul></article>
      <article class="rev"><span>08</span><h2>PYQ lens</h2><ol><li>Draw indices</li><li>Mark aliases</li><li>Evaluate RHS</li><li>Apply mutation</li><li>Count exact operations</li></ol></article>
    </section></div>
  </main>
</div><button class="menu" id="menu">☰</button><div class="toast">Copied</div>`

const tabs=[...document.querySelectorAll('.tab')],panels=[...document.querySelectorAll('[data-panel]')],toc=document.querySelector('#toc'),sidebar=document.querySelector('.sidebar')
function buildToc(view){const sections=[...document.querySelector(`[data-panel="${view}"]`).querySelectorAll('[data-title]')];toc.innerHTML=sections.map((s,i)=>{if(!s.id)s.id=`${view}-${i}`;return `<a href="#${s.id}"><i>${String(i+1).padStart(2,'0')}</i>${s.dataset.title}</a>`}).join('')}
function clearSearch(){document.querySelector('#search').value='';document.querySelectorAll('.searchable,.pyq-card').forEach(x=>x.classList.remove('hidden'));document.querySelector('#searchResult').textContent='Search current view'}
function setView(view){tabs.forEach(t=>t.classList.toggle('active',t.dataset.view===view));panels.forEach(p=>p.classList.toggle('active',p.dataset.panel===view));buildToc(view);window.scrollTo({top:0,behavior:'smooth'});clearSearch()}
tabs.forEach(t=>t.onclick=()=>setView(t.dataset.view));document.querySelectorAll('[data-jump]').forEach(b=>b.onclick=()=>setView(b.dataset.jump));buildToc('notes')

document.querySelector('#themeButton').onclick=()=>{document.documentElement.classList.toggle('dark');localStorage.setItem('da-theme',document.documentElement.classList.contains('dark')?'dark':'light')}
if(localStorage.getItem('da-theme')!=='light')document.documentElement.classList.add('dark')
if(!document.querySelector('.module-switch a[href="./module7.html"]'))document.querySelector('.module-switch').insertAdjacentHTML('beforeend','<a href="./module7.html">M07</a>')
if(!document.querySelector('.module-switch a[href="./module8.html"]'))document.querySelector('.module-switch').insertAdjacentHTML('beforeend','<a href="./module8.html">M08</a>')
document.querySelector('#searchButton').onclick=()=>{document.querySelector('.searchbox').classList.toggle('open');document.querySelector('#search').focus()}
document.querySelector('#search').oninput=e=>{const term=e.target.value.toLowerCase().trim(),items=[...document.querySelector('.view.active').querySelectorAll('.searchable,.pyq-card')];let n=0;items.forEach(x=>{const hit=!term||x.textContent.toLowerCase().includes(term);x.classList.toggle('hidden',!hit);if(hit)n++});document.querySelector('#searchResult').textContent=term?`${n} matching blocks`:'Search current view'}
document.querySelectorAll('.codebox button').forEach(b=>b.onclick=async()=>{await navigator.clipboard.writeText(b.closest('.codebox').querySelector('code').innerText);const t=document.querySelector('.toast');t.classList.add('show');setTimeout(()=>t.classList.remove('show'),1000)})
document.querySelectorAll('.filter').forEach(b=>b.onclick=()=>{document.querySelectorAll('.filter').forEach(x=>x.classList.remove('active'));b.classList.add('active');document.querySelectorAll('.pyq-card').forEach(x=>x.classList.toggle('filtered',b.dataset.year!=='all'&&x.dataset.year!==b.dataset.year))})
let open=false;document.querySelector('#expand').onclick=e=>{open=!open;document.querySelectorAll('.pyq-card:not(.filtered)').forEach(x=>x.open=open);e.target.textContent=open?'Collapse all':'Expand all'}

const lectureChecks=[...document.querySelectorAll('[data-lecture]')],savedLectures=JSON.parse(localStorage.getItem('da-m2-lectures')||'[]')
lectureChecks.forEach(c=>{c.checked=savedLectures.includes(c.dataset.lecture);c.onchange=lectureProgress})
function lectureProgress(){const done=lectureChecks.filter(c=>c.checked).map(c=>c.dataset.lecture),percent=Math.round(done.length/lectureChecks.length*100);localStorage.setItem('da-m2-lectures',JSON.stringify(done));document.querySelector('#count').textContent=`${done.length}/${lectureChecks.length}`;document.querySelector('#bar').style.width=`${percent}%`;document.querySelector('#lecturePercent').textContent=`${percent}%`}
lectureProgress()

const attempted=new Set(JSON.parse(localStorage.getItem('da-m2-practice')||'[]')),practiceTopic=document.querySelector('#practiceTopic'),practiceDifficulty=document.querySelector('#practiceDifficulty')
function renderPractice(){const topic=module2Topics.find(t=>t.id===practiceTopic.value)||module2Topics[0],level=practiceDifficulty.value,visible=level==='all'?topic.questions:topic.questions.filter(x=>x.difficulty===level),done=topic.questions.filter(x=>attempted.has(x.id)).length,patterns=[...new Set(topic.questions.map(x=>x.pattern))];document.querySelector('#practiceScore').textContent=`${done}/${topic.questions.length}`;document.querySelector('#practiceContext').innerHTML=`<div><span>Topic ${topic.number}</span><h2>${topic.label}</h2><p>Answer reveal karne se pehle paper par state/complexity derive karo. Attempted tab mark karo jab explanation apne words mein bol sako.</p></div><aside><b>${visible.length} shown</b><small>${patterns.length} patterns</small><p>${patterns.join(' · ')}</p></aside>`;document.querySelector('#questionList').innerHTML=visible.length?visible.map(x=>`<article class="practice-question searchable ${attempted.has(x.id)?'attempted':''}" data-title="${topic.label} question ${x.number}"><div class="question-meta"><span>Q${String(x.number).padStart(2,'0')}</span><i>${x.difficulty}</i><b>${x.pattern}</b></div><h3>${x.prompt}</h3><ol class="question-options" type="A">${x.options.map(o=>`<li>${o}</li>`).join('')}</ol><details class="answer-reveal"><summary>Answer + explanation dekho</summary><div><strong>Correct: ${x.answer}</strong><p>${x.explanation}</p><small>Rule ko ek new example par apply karke verify karo.</small></div></details><label class="attempt-check"><input type="checkbox" data-attempt="${x.id}" ${attempted.has(x.id)?'checked':''}><span>Attempted</span></label></article>`).join(''):'<article class="practice-question"><h3>Is level ke questions is topic mein nahi hain. “All levels” select karo.</h3></article>';document.querySelectorAll('[data-attempt]').forEach(box=>box.onchange=()=>{box.checked?attempted.add(box.dataset.attempt):attempted.delete(box.dataset.attempt);localStorage.setItem('da-m2-practice',JSON.stringify([...attempted]));box.closest('.practice-question').classList.toggle('attempted',box.checked);document.querySelector('#practiceScore').textContent=`${topic.questions.filter(x=>attempted.has(x.id)).length}/${topic.questions.length}`})}
practiceTopic.onchange=renderPractice;practiceDifficulty.onchange=renderPractice;renderPractice()

const sectionMap={'array-model':'array-model','array-ops':'array-ops','array-python':'array-python','list-basics':'list-basics','list-methods':'list-methods','slicing-copy':'slicing-copy','lists-2d':'lists-2d',compare:'compare',complexity:'complexity',coding:'coding','prefix-window':'prefix-window'}
Object.entries(sectionMap).forEach(([id,topicId])=>{const section=document.querySelector(`#${id}`),topic=module2Topics.find(t=>t.id===topicId);section.insertAdjacentHTML('beforeend',`<button class="topic-practice" data-practice-topic="${topicId}">Is topic ke ${topic.questions.length} questions solve karo →</button>`)})
document.querySelectorAll('[data-practice-topic]').forEach(b=>b.onclick=()=>{practiceTopic.value=b.dataset.practiceTopic;practiceDifficulty.value='all';renderPractice();setView('practice')})
document.querySelector('#print').onclick=()=>window.print();document.querySelector('#menu').onclick=()=>sidebar.classList.toggle('open');toc.onclick=()=>sidebar.classList.remove('open');window.onscroll=()=>{const max=document.documentElement.scrollHeight-innerHeight;document.querySelector('.read-progress span').style.width=`${max?100*scrollY/max:0}%`}
