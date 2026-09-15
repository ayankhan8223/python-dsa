import './style.css'
import { module5Topics, module5QuestionCount } from './practice5.js'

const lectures = [
  ['5.1', 'Introduction to Stacks', 'LIFO, TOP aur restricted access'],
  ['5.2', 'Common Operations in Stacks', 'push, pop, peek, size, empty'],
  ['5.3', 'Implementation of Stacks in Python', 'Same ADT, three implementations'],
  ['5.3.1', 'Stack using Lists', 'Lecture ka complete MyStack class'],
  ['5.3.2', 'Stack using Collections module', 'deque operations ka exact flow'],
  ['5.3.3', 'Stack using Linked Lists', 'TOP reference aur next links'],
  ['5.4', 'Complexity Analysis of Stack', 'Operation-wise reason'],
  ['5.5', 'Applications of Stack', 'LIFO ko problem se connect karo'],
  ['5.6', 'Pros & Cons with Stack', 'Kab choose karein, kab nahi'],
  ['5.7.1', 'Reverse a String using Stack', 'Lecture code aur complete trace'],
  ['5.7.2', 'Check Balanced Parentheses', 'Opening-closing matching'],
  ['5.7.3', 'Undo Operation Simulation', 'Command history trace'],
  ['5.8', 'DS context', 'Stack, queue aur implementation map']
]

const chapterHead = (number, label, title, subtitle) => `
  <div class="chapter-head">
    <div class="chapter-no"><span>${number}</span><small>${label}</small></div>
    <div><h2>${title}</h2><p>${subtitle}</p></div>
  </div>`

const stackDiagram = (items, label = 'TOP ↓', note = 'Top se hi push aur pop hota hai') => `
  <div class="stack-visual">
    <div class="stack-top-label">${label}</div><div class="stack-arrow">↓</div>
    ${items.length ? items.map((item, index) => `<div class="stack-item ${index === 0 ? 'top-item' : ''} ${index === items.length - 1 ? 'bottom-item' : ''}"><b>${item}</b><span>${index === 0 ? 'TOP · next pop' : index === items.length - 1 ? 'BOTTOM' : 'TOP ke neeche'}</span></div>`).join('') : '<div class="empty-stack">EMPTY STACK · koi TOP item nahi</div>'}
    <div class="stack-rule">${note}</div>
  </div>`

const miniStack = (items, label = 'TOP ↓') => `<div class="stack-visual stack-mini"><div class="stack-top-label">${label}</div><div class="stack-arrow">↓</div>${items.length ? items.map((item, index) => `<div class="stack-item ${index === 0 ? 'top-item' : ''} ${index === items.length - 1 ? 'bottom-item' : ''}"><b>${item}</b><span>${index === 0 ? 'TOP' : index === items.length - 1 ? 'BOTTOM' : 'below'}</span></div>`).join('') : '<div class="empty-stack">EMPTY</div>'}</div>`

const lectureTracker = lectures.map(([number, title, note]) => `<label><input type="checkbox" data-lecture="${number}"><span><b>${number}</b><i>${title}</i><small>${note}</small></span></label>`).join('')
const topicOptions = module5Topics.map(topic => `<option value="${topic.id}">${topic.label} (${topic.questions.length})</option>`).join('')

const pyqs = [
  {year: '2024', number: 'Q16', kind: 'DIRECT STACK PYQ', title: 'ADT-property matching', question: 'FIFO, fast key lookup aur LIFO ko respectively queue, hash table aur stack se match karna tha.', answer: 'Correct mapping: FIFO → Queue, lookup → Hash Table, LIFO → Stack (Option A).', why: 'Yeh direct stack-definition test hai. Stack ko pehchanne ka decisive word LIFO hai.'},
  {year: '2025', number: 'Q64', kind: 'DIRECT STACK PYQ', title: 'Push/pop program trace', question: 'Given pseudocode empty stack par values push/pop karta hai aur popped values ka sum poochta hai.', answer: 'Final sum = 24.', why: 'Trace: 8 pop karke sum 8; phir odd 7 ke saath extra 6 remove, sum 15; similarly 5/4, 3/2, 1/0 se final 24. Har pop ke baad exact TOP redraw karna key hai.'},
  {year: '2026', number: 'Q39', kind: 'RELATED · RUNTIME CALL STACK', title: 'Recursive activation count', question: 'mystery(4) ke execution mein total function activations count karni thi.', answer: '15 activations (Option C).', why: 'C(n)=1+C(n−1)+C(n−2), base activation bhi count hota hai. C(4)=15. Yeh explicit stack ADT nahi, lekin runtime call-stack trace directly use karta hai.'}
]
const pyqMarkup = pyqs.map(item => `<details class="pyq-card searchable"><summary><span class="year">${item.year}<small>${item.number}</small></span><span><b>${item.title}</b><small>${item.kind}</small></span><i>＋</i></summary><div class="pyq-body"><div class="answer"><span>Verified answer</span><strong>${item.answer}</strong></div><div class="pyq-question"><h4>Paper mein kya test hua?</h4><p>${item.question}</p></div><aside class="transfer"><strong>Why it matters</strong><p>${item.why}</p></aside></div></details>`).join('')

document.querySelector('#app').innerHTML = `
<div class="read-progress"><span></span></div>
<header class="topbar"><a class="brand" href="#top"><b>DA</b><span><strong>Python + DSA</strong><small>GATE 2027 Notebook</small></span></a><nav><button class="tab active" data-view="notes">Detailed Notes</button><button class="tab" data-view="pyq">PYQ Evidence <i>2+1</i></button><button class="tab" data-view="practice">Practice <i>${module5QuestionCount}</i></button><button class="tab" data-view="revision">Revision</button></nav><div class="actions"><button id="searchButton" aria-label="Search">⌕</button><button id="themeButton" aria-label="Theme">◐</button></div></header>
<div class="searchbox"><input id="search" type="search" placeholder="Search: LIFO, push, pop, deque, parentheses…"><span>Search current view</span></div>
<div class="layout" id="top"><aside class="sidebar"><p class="overline">Module 05</p><h2>Stacks</h2><div class="module-switch"><a href="./index.html">M01</a><a href="./module2.html">M02</a><a href="./module3.html">M03</a><a href="./module4.html">M04</a><a class="active" href="./module5.html">M05</a><a href="./module6.html">M06</a></div><div class="completion"><span><b>Lecture progress</b><i id="count">0/${lectures.length}</i></span><div><i id="bar"></i></div></div><nav id="toc"></nav><p class="source"><b>Sources</b>CampusX Stack notebooks + supplied GATE DA syllabus and papers</p></aside><main>
<div class="view active" data-panel="notes">

<section class="hero searchable" data-title="Overview"><p class="eyebrow"><i></i> Module 05 · last in, first out</p><h1>Stack ko code se pehle <em>TOP ki movement</em> se samjho.</h1><p>Har question mein pehle TOP mark karo. Push mein naya item TOP banta hai; pop mein current TOP nikalta hai aur uske neeche wala item new TOP banta hai.</p><div class="metrics"><span><b>13</b>lecture sessions</span><span><b>${module5QuestionCount}</b>distinct drills</span><span><b>2+1</b>direct + related PYQs</span></div><div class="syllabus"><b>GATE DA syllabus map</b>Basic data structures · stacks · Python implementation · complexity · applications</div></section>

<section class="lecture-track searchable" id="lecture-track" data-title="Module 5 lecture tracker"><div class="track-head"><div><p class="eyebrow"><i></i> Exact lecture sequence</p><h2>Module 5 · Lecture Tracker</h2><p>Har lecture complete hone ke baad tick karo. Code ke saath stack state manually draw karo.</p></div><strong id="lecturePercent">0%</strong></div><div class="lecture-list">${lectureTracker}</div></section>

<section class="beginner-start searchable" id="zero-start" data-title="Zero-start mental model"><div class="zero-title"><span>ZERO START</span><h2>Stack ek vertical pile hai—sirf upar wale item tak direct access.</h2><p>10 pehle aaya, phir 20, phir 30. Isliye 30 sabse recent item hai aur TOP par hai.</p></div><div class="glossary-grid"><article><b>Stack</b><p>Restricted-access linear data structure.</p></article><article><b>TOP</b><p>Jis end se insertion aur deletion hoti hai.</p></article><article><b>LIFO</b><p>Last In, First Out.</p></article><article><b>Push</b><p>New item ko TOP par add karna.</p></article><article><b>Pop</b><p>TOP item remove aur return karna.</p></article><article><b>Peek</b><p>TOP value dekhna, remove nahi karna.</p></article></div>${stackDiagram(['30', '20', '10'], 'TOP ↓', '30 last enter hua tha, isliye sabse pehle niklega')}<div class="reading-method"><h3>Stack question solve karne ka protocol</h3><div><span><b>1</b>TOP mark karo</span><span><b>2</b>Current state likho</span><span><b>3</b>Ek operation chalao</span><span><b>4</b>New state redraw karo</span></div></div></section>

<section class="chapter searchable" id="intro" data-title="5.1 · Introduction to Stacks">${chapterHead('5.1', 'INTRODUCTION TO STACKS', 'Stack kya hai?', 'LIFO ko insertion order aur removal order se connect karo.')}<div class="two-grid"><article><h3>Insertion order</h3><p>Agar pehle 10, phir 20 aur phir 30 push karte hain, toh 30 sabse baad mein enter hua. 30 current TOP hai.</p></article><article><h3>Removal order</h3><p>Pop order 30, phir 20, phir 10 hoga. Isi reverse removal order ko <strong>Last In, First Out</strong> kehte hain.</p></article></div><div class="state-flow"><article><span>BEFORE PUSH(30)</span>${miniStack(['20', '10'])}<p>TOP value 20 hai.</p></article><div class="state-operation"><code>push(30)</code><b>→</b></div><article><span>AFTER PUSH(30)</span>${miniStack(['30', '20', '10'])}<p>30 new TOP ban gaya.</p></article></div><div class="callout"><b>“Restricted access” ka simple meaning</b><p>Stack middle item ko directly remove karne ka operation nahi deta. 20 remove karna hai toh pehle uske upar ka 30 pop karna padega.</p></div><div class="danger"><b>GATE trap</b><p>Diagram horizontal ya vertical ho sakta hai. Jis end ko TOP label kiya hai wahi active end hai.</p></div></section>

<section class="chapter searchable" id="operations" data-title="5.2 · Common Operations in Stacks">${chapterHead('5.2', 'COMMON OPERATIONS', 'Push, pop, peek, size aur empty', 'Har operation ke baad exact stack state trace karo.')}<div class="table-wrap"><table><thead><tr><th>Operation</th><th>Exactly kya karta hai?</th><th>[10, 20] par result</th><th>State change?</th></tr></thead><tbody><tr><td><code>push(30)</code></td><td>30 ko TOP par add</td><td>[10, 20, 30]</td><td>Yes</td></tr><tr><td><code>pop()</code></td><td>TOP 20 remove + return</td><td>returns 20; [10]</td><td>Yes</td></tr><tr><td><code>peek()</code></td><td>TOP 20 read</td><td>20; [10, 20]</td><td>No</td></tr><tr><td><code>get_size()</code></td><td>Items count</td><td>2</td><td>No</td></tr><tr><td><code>is_empty()</code></td><td>Size zero hai?</td><td>False</td><td>No</td></tr><tr><td><code>display()</code></td><td>TOP se BOTTOM print</td><td>20 then 10</td><td>No</td></tr></tbody></table></div><div class="zero-title"><span>COMPLETE TRACE</span><h2>Ek operation ke baad hi next operation run karo.</h2></div><div class="table-wrap"><table><thead><tr><th>Step</th><th>Operation</th><th>Returned</th><th>New TOP</th><th>Stack bottom → top</th></tr></thead><tbody><tr><td>0</td><td>Start</td><td>—</td><td>None</td><td>[]</td></tr><tr><td>1</td><td>push(10)</td><td>—</td><td>10</td><td>[10]</td></tr><tr><td>2</td><td>push(20)</td><td>—</td><td>20</td><td>[10, 20]</td></tr><tr><td>3</td><td>push(30)</td><td>—</td><td>30</td><td>[10, 20, 30]</td></tr><tr><td>4</td><td>pop()</td><td>30</td><td>20</td><td>[10, 20]</td></tr><tr><td>5</td><td>peek()</td><td>20</td><td>20</td><td>[10, 20] unchanged</td></tr></tbody></table></div><div class="two-grid"><article><h3>Overflow</h3><p>Fixed-capacity stack full ho aur new push aaye. Python list/deque dynamically grow karte hain, lekin memory finite hai.</p></article><article><h3>Underflow</h3><p>Empty stack par pop ya peek attempt. Lecture implementations pehle <code>is_empty()</code> check karti hain.</p></article></div></section>

<section class="chapter searchable" id="implementation" data-title="5.3 · Implementation of Stacks in Python">${chapterHead('5.3', 'IMPLEMENTATION', 'Rule same, storage alag', 'Stack ADT ko Python list, deque ya linked list implement kar sakte hain.')}<div class="callout"><b>ADT vs implementation</b><p><strong>Stack</strong> behavior define karta hai: push/pop/peek TOP par. <strong>List, deque aur linked list</strong> us behavior ko store karne ke alag tareeke hain.</p></div><div class="three-grid"><article><span>5.3.1</span><h3>Python list</h3><p>Right end TOP. <code>append()</code> push aur <code>pop()</code> pop.</p></article><article><span>5.3.2</span><h3>collections.deque</h3><p>Right end consistently use: <code>append()</code>, <code>pop()</code>, <code>[-1]</code>.</p></article><article><span>5.3.3</span><h3>Linked list</h3><p><code>self.top</code> first node ko reference karta hai.</p></article></div><div class="equation"><span>Same logical stack</span><b>TOP 30 ↓ 20 ↓ 10 · storage representation alag ho sakti hai</b></div></section>

<section class="chapter searchable" id="list" data-title="5.3.1 · Stack using Lists">${chapterHead('5.3.1', 'STACK USING LISTS', 'Lecture ka complete MyStack class', 'Pehle methods ka meaning, phir exact lecture code.')}<div class="zero-title"><span>LIST REPRESENTATION</span><h2>List ka last index TOP hai.</h2><p><code>[20, 30, 25]</code> mein 20 bottom aur 25 TOP hai.</p></div><div class="state-flow"><article><span>PYTHON LIST VIEW</span><div class="array-stack"><i>index 0<br><b>20</b><small>BOTTOM</small></i><i>index 1<br><b>30</b></i><i>index 2<br><b>25</b><small>TOP</small></i></div></article><div class="state-operation"><code>display()</code><b>→</b></div><article><span>LECTURE DISPLAY VIEW</span>${miniStack(['25', '30', '20'])}</article></div><div class="steps"><article><b>1</b><h3><code>get_size</code></h3><p><code>len(self.stack)</code> current items count return karta hai.</p></article><article><b>2</b><h3><code>is_empty</code></h3><p>Size zero ho toh True.</p></article><article><b>3</b><h3><code>display</code></h3><p><code>self.stack[::-1]</code> reverse order deta hai, so TOP first print.</p></article><article><b>4</b><h3><code>push</code></h3><p><code>append(data)</code> right end par new TOP add karta hai.</p></article><article><b>5</b><h3><code>pop</code></h3><p>Empty check ke baad last/TOP item remove aur <code>popped</code> mein save.</p></article><article><b>6</b><h3><code>peek</code></h3><p><code>self.stack[-1]</code> TOP read karta hai; stack unchanged.</p></article></div><div class="codebox green"><div><span>Exact lecture code · Stack using List</span><button>Copy</button></div><pre><code>class MyStack:
    def __init__(self):
        self.stack = []

    def get_size(self):
        return len(self.stack)

    def is_empty(self):
        return self.get_size() == 0

    def display(self):
        if self.is_empty():
            print('Empty stack')
            return
        for ele in self.stack[::-1]:
            print(ele)
        print()

    def push(self, data):
        self.stack.append(data)
        self.display()
        print(f'Pushed element: {data}\\n')

    def pop(self):
        if self.is_empty():
            print('Empty stack')
            return None
        popped = self.stack.pop()
        self.display()
        print(f'Popped element: {popped}\\n')

    def peek(self):
        if self.is_empty():
            print('Empty stack')
            return None
        print(f'Peek element: {self.stack[-1]}\\n')</code></pre></div><div class="zero-title"><span>LECTURE EXECUTION</span><h2>Push sequence ko list aur vertical stack dono form mein dekho.</h2></div><div class="table-wrap"><table><thead><tr><th>Call</th><th><code>self.stack</code> after call</th><th>TOP</th><th>Display order</th></tr></thead><tbody><tr><td>push(20)</td><td>[20]</td><td>20</td><td>20</td></tr><tr><td>push(30)</td><td>[20, 30]</td><td>30</td><td>30, 20</td></tr><tr><td>push(25)</td><td>[20, 30, 25]</td><td>25</td><td>25, 30, 20</td></tr><tr><td>push(45)</td><td>[20, 30, 25, 45]</td><td>45</td><td>45, 25, 30, 20</td></tr><tr><td>push(15)</td><td>[20, 30, 25, 45, 15]</td><td>15</td><td>15, 45, 25, 30, 20</td></tr><tr><td>pop()</td><td>[20, 30, 25, 45]</td><td>45</td><td>popped 15</td></tr></tbody></table></div><div class="danger"><b>Beginning ko TOP kyun nahi?</b><p><code>insert(0, data)</code> aur <code>pop(0)</code> remaining elements shift karte hain, so O(n). Right-end <code>append</code> amortized O(1) aur <code>pop()</code> O(1).</p></div></section>

<section class="chapter searchable" id="collections" data-title="5.3.2 · Stack using Collections module">${chapterHead('5.3.2', 'COLLECTIONS MODULE', 'deque ko stack ki tarah use karna', 'Lecture mein class nahi; direct deque operations run kiye gaye hain.')}<div class="callout"><b>Lecture ka core point</b><p><code>deque</code> Python ke built-in <code>collections</code> module ki high-performance data structure hai. Iske dono ends par insertion aur deletion O(1) hoti hai; isliye stack ke liye ek end ko consistently TOP bana sakte hain.</p></div><div class="two-grid"><article><h3>Lecture mental model</h3><p>Lecture isse <strong>doubly-linked-list jaisa</strong> samjhata hai: dono ends directly reachable hote hain, isliye front/rear par items add/remove fast hote hain.</p></article><article><h3>Python technical note</h3><p>CPython ka <code>deque</code> literal one-node-per-element DLL nahi hai; internally linked fixed-size blocks use karta hai. Exam intuition same hai: endpoints par O(1), arbitrary middle indexing primary use-case nahi.</p></article></div><div class="equation"><span>Stack mapping</span><b>Right end = TOP · <code>append(x)</code> push · <code>pop()</code> pop · <code>stack[-1]</code> peek</b></div><div class="codebox green"><div><span>Exact lecture sequence</span><button>Copy</button></div><pre><code>from collections import deque

stack = deque()

len(stack)
len(stack) == 0
print(stack)

stack.append(20)
stack.append(15)
stack.append(35)
stack.append(10)

stack.pop()
popped = stack.pop()
stack[-1]</code></pre></div><div class="zero-title"><span>STEP-BY-STEP STATE</span><h2>Right end ko TOP maan rahe hain.</h2></div><div class="table-wrap"><table><thead><tr><th>Statement</th><th>Reference/action</th><th>Deque bottom → top</th><th>Result</th></tr></thead><tbody><tr><td><code>stack = deque()</code></td><td><code>stack</code> empty deque object ko reference karta hai</td><td>[]</td><td>Empty</td></tr><tr><td><code>append(20)</code></td><td>20 right end/TOP par</td><td>[20]</td><td>TOP 20</td></tr><tr><td><code>append(15)</code></td><td>15 new TOP</td><td>[20, 15]</td><td>TOP 15</td></tr><tr><td><code>append(35)</code></td><td>35 new TOP</td><td>[20, 15, 35]</td><td>TOP 35</td></tr><tr><td><code>append(10)</code></td><td>10 new TOP</td><td>[20, 15, 35, 10]</td><td>TOP 10</td></tr><tr><td><code>stack.pop()</code></td><td>Right-end TOP remove</td><td>[20, 15, 35]</td><td>returns 10</td></tr><tr><td><code>popped = stack.pop()</code></td><td>35 remove; return <code>popped</code> mein</td><td>[20, 15]</td><td>popped = 35</td></tr><tr><td><code>stack[-1]</code></td><td>Current TOP read</td><td>[20, 15]</td><td>15</td></tr></tbody></table></div><div class="callout"><b>Consistency rule</b><p>Lecture right end use karta hai: push = <code>append</code>, pop = <code>pop</code>, peek = <code>stack[-1]</code>.</p></div></section>

<section class="chapter searchable" id="linked" data-title="5.3.3 · Stack using Linked Lists">${chapterHead('5.3.3', 'STACK USING LINKED LISTS', 'TOP ek node reference hai', 'Har push/pop mein exactly kis node ka reference badalta hai, woh trace karo.')}<div class="zero-title"><span>REFERENCE MODEL</span><h2><code>self.top</code> current first node ka reference rakhta hai.</h2><p>Linked-list stack mein lecture ne beginning-side node ko TOP banaya hai, so push/pop O(1).</p></div><div class="linked-chain"><span><b>TOP → 30</b><i>next → 20</i></span><em>→</em><span><b>20</b><i>next → 10</i></span><em>→</em><span><b>10</b><i>next → None</i></span></div><div class="codebox green"><div><span>Exact lecture code</span><button>Copy</button></div><pre><code>class Node:
    def __init__(self, data):
        self.data = data
        self.next = None


class StackUsingLinkedList:
    def __init__(self):
        self.top = None

    def is_empty(self):
        return self.top is None

    def display(self):
        if self.is_empty():
            print('Empty stack.. cannot DISPLAY')
            return
        curr = self.top
        while curr:
            print(curr.data)
            curr = curr.next
        print()

    def push(self, data):
        node = Node(data)
        node.next = self.top
        self.top = node
        print(f'Pushed element: {data}')
        self.display()

    def pop(self):
        if self.is_empty():
            print('Empty stack.. cannot POP')
            return None
        popped = self.top.data
        self.top = self.top.next
        print(f'Popped element: {popped}')
        self.display()

    def peek(self):
        if self.is_empty():
            print('Empty stack.. cannot PEEK')
            return None
        print(f'Peek element: {self.top.data}')</code></pre></div><div class="zero-title"><span>PUSH(30) TRACE</span><h2>Old TOP ka reference save karke TOP shift hota hai.</h2></div><div class="linked-chain"><span><b>BEFORE · TOP → 20</b><i>next → 10</i></span><em>→</em><span><b>10</b><i>next → None</i></span></div><div class="steps"><article><b>1</b><h3><code>node = Node(30)</code></h3><p>30 wala node banta hai. Abhi <code>node.next = None</code>; stack se connected nahi.</p></article><article><b>2</b><h3><code>node.next = self.top</code></h3><p><code>self.top</code> node 20 ko reference karta hai. Wahi reference <code>node.next</code> mein copy, so 30.next → 20.</p></article><article><b>3</b><h3><code>self.top = node</code></h3><p>TOP reference 20 se 30 par shift. Old chain 20 → 10 new node ke through safe.</p></article></div><div class="linked-chain success-chain"><span><b>AFTER · TOP → 30</b><i>next → 20</i></span><em>→</em><span><b>20</b><i>next → 10</i></span><em>→</em><span><b>10</b><i>next → None</i></span></div><div class="zero-title"><span>POP TRACE</span><h2>TOP value save karo, phir TOP ko next node par shift karo.</h2></div><div class="steps"><article><b>1</b><h3><code>popped = self.top.data</code></h3><p>TOP node 30 hai, so value 30 <code>popped</code> mein.</p></article><article><b>2</b><h3><code>self.top = self.top.next</code></h3><p>Old TOP 30 ka next node 20 hai. TOP ab 20 ko reference karta hai.</p></article><article><b>3</b><h3>Result</h3><p>30 logical stack se remove. TOP → 20 → 10 → None.</p></article></div><div class="linked-chain"><span><b>AFTER POP · TOP → 20</b><i>next → 10</i></span><em>→</em><span><b>10</b><i>next → None</i></span></div><div class="danger"><b>Pointer-order trap</b><p>Push mein pehle <code>node.next = self.top</code>. TOP ko pehle new node par shift kiya toh old chain ka reference lose ya self-loop ho sakta hai.</p></div></section>

<section class="chapter searchable" id="complexity" data-title="5.4 · Complexity Analysis of Stack">${chapterHead('5.4', 'COMPLEXITY ANALYSIS OF STACK', 'O(1) bolne se pehle implementation dekho', 'Movement, shifting aur resize se reason justify karo.')}<div class="table-wrap"><table><thead><tr><th>Implementation</th><th>Push</th><th>Pop</th><th>Peek</th><th>Reason</th></tr></thead><tbody><tr><td>List · right end TOP</td><td>O(1) amortized</td><td>O(1)</td><td>O(1)</td><td>Last index known; occasional resize</td></tr><tr><td>deque · right end TOP</td><td>O(1)</td><td>O(1)</td><td>O(1)</td><td>Endpoint operations supported</td></tr><tr><td>Linked list · head TOP</td><td>O(1)</td><td>O(1)</td><td>O(1)</td><td>TOP reference directly available</td></tr><tr><td>List · index 0 TOP</td><td>O(n)</td><td>O(n)</td><td>O(1)</td><td>Remaining items shift</td></tr></tbody></table></div><div class="steps"><article><b>1</b><h3>List push amortized O(1)</h3><p>Most append constant time. Kabhi capacity full ho toh larger storage allocate/copy, so one append O(n), long sequence average O(1).</p></article><article><b>2</b><h3>Linked push O(1)</h3><p>Node create, next reference set, TOP shift—constant statements; traversal nahi.</p></article><article><b>3</b><h3>Peek O(1)</h3><p>List/deque last endpoint ya linked TOP already known.</p></article><article><b>4</b><h3>Stored space O(n)</h3><p>n values ke liye O(n) memory. Linked version mein har node ka extra next reference/object overhead.</p></article></div><div class="callout"><b>Auxiliary space ko stored stack se mix mat karo</b><p>Container n items store karta hai, so O(n). Push/pop method ke temporary variables O(1) auxiliary references use karte hain.</p></div><div class="danger"><b>GATE trap</b><p>“Stack push always O(1)” blindly mat likho. Python list right end par amortized O(1); index 0 par O(n).</p></div></section>

<section class="chapter searchable" id="applications" data-title="5.5 · Applications of Stack">${chapterHead('5.5', 'APPLICATIONS OF STACK', 'Latest unfinished kaam pehle', 'Application ko LIFO property se justify karo.')}<div class="practice-list"><article><span>01</span><div><b>Function calls / recursion</b><p>Latest called function pehle return; return address aur local state call stack mein.</p></div><strong>LIFO frames</strong></article><article><span>02</span><div><b>DFS and backtracking</b><p>Latest chosen path ko continue ya undo karna.</p></div><strong>Search frontier</strong></article><article><span>03</span><div><b>Balanced parentheses</b><p>Closing bracket latest unmatched opening se match.</p></div><strong>Nested matching</strong></article><article><span>04</span><div><b>Undo</b><p>Latest successful action history ke TOP par.</p></div><strong>Recent history</strong></article><article><span>05</span><div><b>Expression evaluation</b><p>Operators/operands controlled order mein temporarily store.</p></div><strong>Parsing</strong></article></div><div class="equation"><span>Application test</span><b>Sabse recent pending item pehle process? → Stack consider karo</b></div></section>

<section class="chapter searchable" id="tradeoffs" data-title="5.6 · Pros & Cons with Stack">${chapterHead('5.6', 'PROS & CONS WITH STACK', 'Restriction advantage bhi hai, limitation bhi', 'Lecture ke exact pros/cons ko LIFO rule se samjho.')}<div class="two-grid"><article><h3>Advantages</h3><ul><li><strong>Efficient memory management:</strong> data sirf TOP end se add/remove hota hai, so normal push/pop fast hote hain.</li><li><strong>Useful in backtracking:</strong> latest choice ko pop karke previous state par return kar sakte hain.</li><li><strong>Prevents data inconsistency:</strong> restricted TOP-only access operations ko controlled order mein rakhta hai.</li><li><strong>Ideal for reversing data:</strong> original order push, reverse order pop.</li><li><strong>Expression evaluation & syntax parsing:</strong> compilers/operators precedence aur parentheses matching ke liye stack use karte hain.</li></ul></article><article><h3>Disadvantages</h3><ul><li><strong>Limited access:</strong> middle ya bottom item directly reach nahi; upar ke items pehle pop karne padenge.</li><li><strong>Limited usability:</strong> random access aur sorting ke liye natural structure nahi.</li><li><strong>Difficult to traverse/search:</strong> standard stack interface mein sirf TOP readily accessible hota hai; search ke liye items pop/temporary storage karna pad sakta hai.</li><li><strong>Underflow risk:</strong> empty stack se pop/peek safe guard ke bina error de sakta hai.</li></ul></article></div><div class="table-wrap"><table><thead><tr><th>Lecture point</th><th>LIFO se connection</th><th>Simple example</th></tr></thead><tbody><tr><td>Backtracking</td><td>Latest choice first undo</td><td>Maze ka latest path step wapas lena</td></tr><tr><td>Reverse data</td><td>Last pushed value first pop</td><td>GATE → ETAG</td></tr><tr><td>Expression parsing</td><td>Latest unmatched operator/opening bracket TOP par</td><td><code>({[]})</code> matching</td></tr><tr><td>Limited access</td><td>Only TOP direct available</td><td>20 reach karne ke liye pehle 30 pop</td></tr></tbody></table></div><div class="callout"><b>Decision example</b><p>Printer jobs arrival order mein process: FIFO queue. Browser Back/Undo mein latest page/action pehle: stack.</p></div><div class="danger"><b>GATE wording trap</b><p>“Efficient” ka matlab har operation O(1) nahi. Stack ADT ka TOP operation efficient hota hai; underlying list front par use ki ho toh shifting ke kaaran O(n) ho sakta hai.</p></div></section>

<section class="chapter searchable" id="reverse" data-title="5.7.1 · Reverse a String using Stack">${chapterHead('5.7.1', 'REVERSE A STRING USING STACK', 'Push original order, pop reverse order', 'Lecture code ko GATE example se trace karo.')}<div class="codebox green"><div><span>Exact lecture solution</span><button>Copy</button></div><pre><code>from collections import deque

def reverse_string_using_stack(string):
    stack = deque()
    result = ''

    # push characters into the stack
    for ch in string:
        stack.append(ch)

    # pop each element from the stack
    while stack:
        result += stack.pop()

    return result</code></pre></div><div class="zero-title"><span>QUESTION</span><h2>Stack use karke <code>GATE</code> reverse karo.</h2><p>Answer <strong>ETAG</strong>. Pehle saare characters push; phir pop phase.</p></div><div class="table-wrap"><table><thead><tr><th>Step</th><th>Action</th><th>Stack bottom → top</th><th><code>result</code></th><th>Exactly kya badla?</th></tr></thead><tbody><tr><td>0</td><td>Initialize</td><td>[]</td><td>''</td><td>Empty stack/result</td></tr><tr><td>1</td><td>push G</td><td>[G]</td><td>''</td><td>G TOP</td></tr><tr><td>2</td><td>push A</td><td>[G, A]</td><td>''</td><td>A TOP</td></tr><tr><td>3</td><td>push T</td><td>[G, A, T]</td><td>''</td><td>T TOP</td></tr><tr><td>4</td><td>push E</td><td>[G, A, T, E]</td><td>''</td><td>E TOP</td></tr><tr><td>5</td><td>pop E</td><td>[G, A, T]</td><td>'E'</td><td>E append</td></tr><tr><td>6</td><td>pop T</td><td>[G, A]</td><td>'ET'</td><td>T append</td></tr><tr><td>7</td><td>pop A</td><td>[G]</td><td>'ETA'</td><td>A append</td></tr><tr><td>8</td><td>pop G</td><td>[]</td><td>'ETAG'</td><td>Loop stops</td></tr></tbody></table></div><div class="state-flow"><article><span>AFTER PUSH PHASE</span>${miniStack(['E', 'T', 'A', 'G'])}</article><div class="state-operation"><code>pop until empty</code><b>→</b></div><article><span>OUTPUT ORDER</span><div class="output-string">E → T → A → G</div><p>Final: <strong>ETAG</strong></p></article></div><div class="equation"><span>Complexity</span><b>n pushes + n pops = O(n) time · O(n) auxiliary stack</b></div></section>

<section class="chapter searchable" id="parentheses" data-title="5.7.2 · Check Balanced Parentheses">${chapterHead('5.7.2', 'CHECK BALANCED PARENTHESES', 'Latest opening bracket se match karo', 'Type, order aur leftover—teeno correct hone chahiye.')}<div class="codebox green"><div><span>Exact lecture solution</span><button>Copy</button></div><pre><code>def is_balanced_parantheses(expression) -> bool:
    stack = deque()
    pairs = {
        ')': '(',
        ']': '[',
        '}': '{'
    }

    for ch in expression:
        if ch in '({[':
            stack.append(ch)
        elif ch in ')}]':
            pair = pairs[ch]
            if (not stack) or pair != stack.pop():
                return False

    return len(stack) == 0</code></pre></div><div class="zero-title"><span>QUESTION</span><h2>Kya <code>({[]})</code> balanced hai?</h2><p>Har closing ko current TOP opening se compare karo.</p></div><div class="table-wrap"><table><thead><tr><th>Iteration</th><th><code>ch</code></th><th>Before bottom → top</th><th>Action</th><th>After</th></tr></thead><tbody><tr><td>1</td><td>(</td><td>[]</td><td>push (</td><td>[(]</td></tr><tr><td>2</td><td>{</td><td>[(]</td><td>push {</td><td>[(, {]</td></tr><tr><td>3</td><td>[</td><td>[(, {]</td><td>push [</td><td>[(, {, []</td></tr><tr><td>4</td><td>]</td><td>[(, {, []</td><td>Expected [; pop [; match</td><td>[(, {]</td></tr><tr><td>5</td><td>}</td><td>[(, {]</td><td>Expected {; pop {; match</td><td>[(]</td></tr><tr><td>6</td><td>)</td><td>[(]</td><td>Expected (; pop (; match</td><td>[]</td></tr></tbody></table></div><div class="steps"><article><b>1</b><h3><code>not stack</code></h3><p>Closing mila, stack empty: opening absent, immediately invalid.</p></article><article><b>2</b><h3><code>pair != stack.pop()</code></h3><p>Expected opening type ko latest actual opening se compare.</p></article><article><b>3</b><h3><code>len(stack) == 0</code></h3><p>Loop end par leftover openings, jaise <code>((</code>, invalid.</p></article></div><div class="danger"><b>Short-circuit safety</b><p><code>(not stack) or ...</code> mein stack empty ho toh left True hote hi right side run nahi. Empty deque par pop call nahi hota.</p></div><div class="equation"><span>Complexity</span><b>O(n) time · O(n) auxiliary space worst case</b></div></section>

<section class="chapter searchable" id="undo" data-title="5.7.3 · Undo Operation Simulation">${chapterHead('5.7.3', 'UNDO OPERATION SIMULATION', 'Latest typed character pehle undo', 'Lecture command list ka complete trace.')}<div class="codebox green"><div><span>Exact lecture solution</span><button>Copy</button></div><pre><code>def simulate_undo_operation(commands):
    stack = deque()

    for command in commands:
        if command == 'undo':
            if stack:
                stack.pop()
            else:
                print('Empty stack.. cannot perform UNDO')
                return
        else:
            stack.append(command[-1])

    return ''.join(stack)</code></pre></div><div class="zero-title"><span>LECTURE INPUT</span><h2>Commands ek-ek karke process karo.</h2><div class="command-strip"><code>type A</code><code>type B</code><code>undo</code><code>type C</code><code>type C</code><code>type F</code></div></div><div class="table-wrap"><table><thead><tr><th>Iteration</th><th>Command</th><th>Before</th><th>Exact action</th><th>After</th></tr></thead><tbody><tr><td>1</td><td>type A</td><td>[]</td><td><code>command[-1]</code> A; push</td><td>[A]</td></tr><tr><td>2</td><td>type B</td><td>[A]</td><td>push B</td><td>[A, B]</td></tr><tr><td>3</td><td>undo</td><td>[A, B]</td><td>TOP B pop</td><td>[A]</td></tr><tr><td>4</td><td>type C</td><td>[A]</td><td>push C</td><td>[A, C]</td></tr><tr><td>5</td><td>type C</td><td>[A, C]</td><td>push C</td><td>[A, C, C]</td></tr><tr><td>6</td><td>type F</td><td>[A, C, C]</td><td>push F</td><td>[A, C, C, F]</td></tr></tbody></table></div><div class="final"><h3>Final result: ACCF</h3><p><code>''.join(stack)</code> remaining characters ko bottom-to-top join karta hai.</p></div><div class="danger"><b>Empty undo edge case</b><p>Empty stack par undo aaye toh pop nahi kar sakte. Lecture code message print karke return karta hai.</p></div><div class="equation"><span>Complexity</span><b>m commands: O(m) time · O(m) stored history</b></div></section>

<section class="chapter searchable" id="context" data-title="5.8 · DS context">${chapterHead('5.8', 'DS CONTEXT', 'Stack ko DSA map mein rakho', 'Required removal order pehle identify karo.')}<div class="table-wrap"><table><thead><tr><th>Structure</th><th>Removal rule</th><th>Active ends</th><th>Natural example</th></tr></thead><tbody><tr><td>Stack</td><td>LIFO</td><td>TOP only</td><td>Undo, recursion, DFS</td></tr><tr><td>Queue</td><td>FIFO</td><td>Rear insert, front delete</td><td>Scheduling, BFS</td></tr><tr><td>Python list</td><td>General sequence</td><td>Indexes/endpoints</td><td>Indexed data</td></tr><tr><td>Linked list</td><td>Link-defined</td><td>References</td><td>Stack/queue implementation</td></tr></tbody></table></div><div class="reading-method"><h3>GATE stack trace checklist</h3><div><span><b>1</b>TOP identify</span><span><b>2</b>Initial state copy</span><span><b>3</b>Returned values note</span><span><b>4</b>Underflow/leftover audit</span></div></div><div class="final"><h3>Module 5 mastery target</h3><p>List, deque aur linked-list implementation mein same logical stack draw karo; operation sequence, complexity aur three lecture applications manually trace karo.</p><button data-jump="practice">Lecture-wise practice kholo →</button></div></section>

<section class="chapter searchable" id="pop-sequences" data-title="GATE add-on · Valid pop sequences">${chapterHead('GATE', 'VALID POP SEQUENCES', 'Kya given output stack se possible hai?', 'Input order fixed ho toh har desired output ke liye push/pop ko exactly simulate karo.')}<div class="zero-title"><span>QUESTION</span><h2>1, 2, 3, 4 isi order mein push ho sakte hain. Kya pop order 2, 1, 4, 3 valid hai?</h2><p>Future item ko skip karke pop nahi kar sakte. Desired item TOP par lane tak input push karo.</p></div><div class="table-wrap"><table><thead><tr><th>Desired output</th><th>Exact operation</th><th>Stack bottom → top</th><th>Decision</th></tr></thead><tbody><tr><td>2</td><td>push 1, push 2, pop 2</td><td>[1]</td><td>2 mil gaya</td></tr><tr><td>1</td><td>pop 1</td><td>[]</td><td>1 mil gaya</td></tr><tr><td>4</td><td>push 3, push 4, pop 4</td><td>[3]</td><td>4 mil gaya</td></tr><tr><td>3</td><td>pop 3</td><td>[]</td><td>Valid sequence</td></tr></tbody></table></div><div class="state-flow"><article><span>2 NIKALNE SE PEHLE</span>${miniStack(['2', '1'])}<p>2 current TOP hai, so pop allowed.</p></article><div class="state-operation"><code>pop 2, pop 1</code><b>→</b></div><article><span>PHIR 4 KE LIYE</span>${miniStack(['4', '3'])}<p>4 current TOP hai; 4 ke baad 3 niklega.</p></article></div><div class="danger"><b>Common GATE trap</b><p>Sirf permutation dekhkar answer mat do. Agar desired value stack ke andar hai lekin uske upar koi aur value hai, desired value abhi pop nahi ho sakti. Example 3, 1, 2 input 1,2,3 ke liye impossible: 3 pop ke baad stack TOP 2 hai, 1 nahi.</p></div></section>

<section class="chapter searchable" id="expressions" data-title="GATE add-on · Postfix and notation">${chapterHead('GATE', 'EXPRESSION STACK', 'Postfix ko left se right evaluate karo', 'Operand push hota hai; operator do operands pop karke result push karta hai.')}<div class="zero-title"><span>QUESTION</span><h2>Postfix expression <code>2 3 + 4 *</code> ka value find karo.</h2><p>Operator par pehla pop <strong>right operand</strong> aur doosra pop <strong>left operand</strong> hota hai.</p></div><div class="table-wrap"><table><thead><tr><th>Token</th><th>Before stack</th><th>Exactly kya hua?</th><th>After stack</th></tr></thead><tbody><tr><td>2</td><td>[]</td><td>Operand 2 push</td><td>[2]</td></tr><tr><td>3</td><td>[2]</td><td>Operand 3 push</td><td>[2, 3]</td></tr><tr><td>+</td><td>[2, 3]</td><td>right=3, left=2; 2+3=5 push</td><td>[5]</td></tr><tr><td>4</td><td>[5]</td><td>Operand 4 push</td><td>[5, 4]</td></tr><tr><td>*</td><td>[5, 4]</td><td>right=4, left=5; 5×4=20 push</td><td>[20]</td></tr></tbody></table></div>${stackDiagram(['20'], 'FINAL TOP ↓', 'All tokens processed aur ek hi value bachi: answer 20')}<div class="two-grid"><article><h3>Notation quick map</h3><p>Infix: <code>A + B</code><br>Prefix: <code>+ A B</code><br>Postfix: <code>A B +</code></p></article><article><h3>Operand-order trap</h3><p><code>8 2 -</code> mein pop order 2 then 8 hai, lekin calculation <code>8 - 2</code>. Pehla popped value left operand nahi hota.</p></article></div></section>

<section class="chapter searchable" id="call-stack" data-title="GATE add-on · Recursion call stack">${chapterHead('GATE', 'RUNTIME CALL STACK', 'Har active function call ka separate frame', 'Call hote hi frame push; function finish hote hi wahi latest frame pop.')}<div class="codebox green"><div><span>Small recursive trace</span><button>Copy</button></div><pre><code>def show(n):
    if n == 0:
        return
    print(n)
    show(n - 1)
    print(n)

show(3)</code></pre></div><div class="zero-title"><span>BEFORE FIRST RETURN</span><h2><code>show(0)</code> base case tak calls build hoti hain.</h2><p>Har frame ka apna <code>n</code> aur pending last <code>print(n)</code> hai.</p></div><div class="table-wrap"><table><thead><tr><th>Event</th><th>Printed</th><th>Active frames bottom → top</th><th>Exactly kya pending hai?</th></tr></thead><tbody><tr><td>show(3) enters</td><td>3</td><td>[show(3)]</td><td>show(2), then print 3</td></tr><tr><td>show(2) enters</td><td>2</td><td>[show(3), show(2)]</td><td>show(1), then print 2</td></tr><tr><td>show(1) enters</td><td>1</td><td>[show(3), show(2), show(1)]</td><td>show(0), then print 1</td></tr><tr><td>show(0) returns</td><td>—</td><td>[show(3), show(2), show(1)]</td><td>Latest show(1) resumes</td></tr><tr><td>show(1) finishes</td><td>1</td><td>[show(3), show(2)]</td><td>show(2) resumes</td></tr><tr><td>show(2) finishes</td><td>2</td><td>[show(3)]</td><td>show(3) resumes</td></tr><tr><td>show(3) finishes</td><td>3</td><td>[]</td><td>Program done</td></tr></tbody></table></div><div class="state-flow"><article><span>DEEPEST POINT</span>${miniStack(['show(1)', 'show(2)', 'show(3)'], 'CALL-STACK TOP ↓')}<p><code>show(1)</code> latest unfinished call hai.</p></article><div class="state-operation"><code>returns</code><b>→</b></div><article><span>UNWIND ORDER</span><div class="output-string">show(1) → show(2) → show(3)</div><p>Final output: <strong>3 2 1 1 2 3</strong></p></article></div><div class="equation"><span>Complexity</span><b>n decreases by 1: O(n) time · maximum depth n, so O(n) auxiliary call-stack</b></div><div class="danger"><b>GATE activation-count trap</b><p>Base-case call bhi function activation hai. Tree recursion mein maximum depth aur total activations different quantities hain: auxiliary space maximum simultaneously active frames se aata hai, total calls se nahi.</p></div></section>

<section class="chapter searchable" id="mixed-gate" data-title="Mixed GATE Practice · Modules 1–5">${chapterHead('MIXED', 'GATE PRACTICE', 'Topic label ke bina concept identify karo', 'Real paper mein “ye stack question hai” likha nahi hota; code, order aur complexity se pattern pehchano.')}<div class="two-grid"><article><h3>24 distinct mixed questions</h3><p>Complexity, Python semantics, arrays, strings, linked-list pointers aur stacks ek hi set mein. MCQ, MSQ aur NAT formats included.</p></article><article><h3>Attempt protocol</h3><p>Paper par state table banao, option elimination se pehle exact output nikalo, phir answer reveal kholo.</p></article></div><button class="topic-practice" data-practice-topic="mixed">Mixed GATE set ke 24 questions solve karo →</button></section>

<section class="chapter searchable" id="readiness" data-title="Modules 1–5 · GATE readiness audit">${chapterHead('AUDIT', 'FINAL READINESS', 'Lecture alignment + GATE depth', 'Syllabus, supplied papers, notes aur question banks ko cross-check karke current status.')}<div class="table-wrap"><table><thead><tr><th>Module</th><th>Lecture coverage</th><th>GATE depth</th><th>Current verdict</th></tr></thead><tbody><tr><td>M1 · Python + Complexity</td><td>Core Python and analysis</td><td>Bounds, tricky loops, recursion depth</td><td><strong>Fully ready</strong></td></tr><tr><td>M2 · Arrays/Lists</td><td>Operations + Python semantics</td><td>Alias, slice, mutation, 2D trap</td><td><strong>Fully ready</strong></td></tr><tr><td>M3 · Strings</td><td>Compact Python sequence coverage</td><td>Tracing prioritized; windows lower priority</td><td><strong>Fully ready</strong></td></tr><tr><td>M4 · Linked Lists</td><td>SLL, CSLL, DLL, CDLL</td><td>Pointer traces, edge cases, fast/slow/gap/reverse</td><td><strong>Fully ready</strong></td></tr><tr><td>M5 · Stacks</td><td>All 13 lecture sessions</td><td>Pop sequences, postfix, recursion, exact PYQs</td><td><strong>Fully ready after this pass</strong></td></tr></tbody></table></div><div class="callout"><b>Practice-quality rule</b><p>Large repeated banks ko distinct concept sets se replace kiya gaya hai. Goal number inflate karna nahi; har question se naya trace, edge case ya GATE trap test karna hai.</p></div><div class="reading-method"><h3>Exam-ready checklist</h3><div><span><b>✓</b>Lecture order preserved</span><span><b>✓</b>Python 3 semantics</span><span><b>✓</b>Answers collapsed</span><span><b>✓</b>Direct vs related PYQ labels</span></div></div></section>

</div>
<div class="view" data-panel="pyq"><section class="page-hero searchable" data-title="PYQ evidence summary"><p class="eyebrow"><i></i> 2024–2026 supplied-paper audit</p><h1>Stack PYQ Evidence</h1><p>Do direct stack questions aur ek closely related runtime call-stack question mile. Har card ko exact category ke saath label kiya hai—practice question ko PYQ nahi bola gaya.</p><div class="paper-grid"><span><b>2</b>direct stack PYQs</span><span><b>1</b>related call-stack PYQ</span><span><b>3/3</b>papers checked</span></div></section><section class="pyqs">${pyqMarkup}</section></div>
<div class="view" data-panel="practice"><section class="page-hero practice-head searchable" data-title="Practice Lab"><p class="eyebrow"><i></i> Lecture-wise + mixed GATE drills</p><h1>Module 5 Practice</h1><p>${module5QuestionCount} genuinely distinct questions · 13 exact lecture sets + 1 mixed Modules 1–5 set.</p><div class="practice-summary"><span><b>13</b>lecture sets</span><span><b>24</b>mixed GATE</span><span><b>saved</b>attempt progress</span></div></section><section class="practice-controls searchable" data-title="Choose topic"><div><label for="practiceTopic">Lecture topic</label><select id="practiceTopic">${topicOptions}</select></div><div><label for="practiceDifficulty">Difficulty</label><select id="practiceDifficulty"><option value="all">All levels</option><option>Foundation</option><option>Core</option><option>Practice</option></select></div><div class="practice-score"><span>Attempted</span><b id="practiceScore">0/0</b></div></section><section class="practice-context" id="practiceContext"></section><section class="question-list" id="questionList"></section></div>
<div class="view" data-panel="revision"><section class="page-hero revision-head searchable" data-title="Revision sheet"><p class="eyebrow"><i></i> Last-day recall</p><h1>Module 5 Revision</h1><p>LIFO, implementations, complexity aur applications.</p><button id="print">Print sheet</button></section><section class="revision-grid"><article class="rev"><span>01</span><h2>Core</h2><ul><li>Insertion/deletion at TOP</li><li>LIFO</li><li>peek state unchanged</li><li>empty pop underflow</li></ul></article><article class="rev"><span>02</span><h2>Python list</h2><ul><li>right end TOP</li><li>append push</li><li>pop pop</li><li>[-1] peek</li></ul></article><article class="rev"><span>03</span><h2>deque</h2><ul><li>one endpoint consistently</li><li>append/pop O(1)</li><li>empty check</li></ul></article><article class="rev"><span>04</span><h2>Linked stack</h2><ul><li>self.top first node</li><li>new.next = old top</li><li>top = top.next on pop</li></ul></article><article class="rev"><span>05</span><h2>Applications</h2><ul><li>reverse string</li><li>parentheses</li><li>undo</li><li>recursion/DFS</li></ul></article><article class="rev warning"><span>06</span><h2>Traps</h2><ul><li>peek ≠ pop</li><li>TOP endpoint</li><li>list front O(n)</li><li>leftover openings invalid</li></ul></article></section></div>
</main></div><button class="menu" id="menu">☰</button><div class="toast">Copied</div>`

const tabs = [...document.querySelectorAll('.tab')]
const panels = [...document.querySelectorAll('[data-panel]')]
const toc = document.querySelector('#toc')
const sidebar = document.querySelector('.sidebar')
const practiceTopic = document.querySelector('#practiceTopic')
const practiceDifficulty = document.querySelector('#practiceDifficulty')
const attempted = new Set(JSON.parse(localStorage.getItem('da-m5-attempted') || '[]'))

function buildToc(viewName) {
  const panel = document.querySelector(`[data-panel="${viewName}"]`)
  const sections = panel ? [...panel.querySelectorAll('[data-title]')] : []
  toc.innerHTML = sections.map((section, index) => `<a href="#${section.id || ''}"><i>${String(index + 1).padStart(2, '0')}</i>${section.dataset.title}</a>`).join('')
}

function setView(viewName) {
  tabs.forEach(tab => tab.classList.toggle('active', tab.dataset.view === viewName))
  panels.forEach(panel => panel.classList.toggle('active', panel.dataset.panel === viewName))
  buildToc(viewName)
  window.scrollTo({top: 0, behavior: 'smooth'})
  document.querySelector('#search').value = ''
}

function renderPractice() {
  const topic = module5Topics.find(item => item.id === practiceTopic.value) || module5Topics[0]
  const level = practiceDifficulty.value
  const questions = level === 'all' ? topic.questions : topic.questions.filter(item => item.difficulty === level)
  const done = topic.questions.filter(item => attempted.has(item.id)).length
  document.querySelector('#practiceScore').textContent = `${done}/${topic.questions.length}`
  document.querySelector('#practiceContext').innerHTML = `<div><span>${topic.label}</span><h2>${topic.label}</h2><p>Pehle TOP aur current stack state draw karo. Answer apna trace complete karne ke baad kholo.</p></div><aside><b>${questions.length} shown</b><small>${topic.questions.length} total</small><p>Lecture ke operation, edge case aur complexity patterns.</p></aside>`
  document.querySelector('#questionList').innerHTML = questions.map(item => `<article class="practice-question searchable ${attempted.has(item.id) ? 'attempted' : ''}"><div class="question-meta"><span>Q${String(item.number).padStart(2, '0')}</span><i>${item.difficulty}</i><b>${item.pattern}</b></div><h3>${item.prompt}</h3><ol class="question-options" type="A">${item.options.map(option => `<li>${option}</li>`).join('')}</ol><details class="answer-reveal"><summary>Answer + explanation dekho</summary><div><strong>Correct: ${item.answer}</strong><p>${item.explanation}</p></div></details><label class="attempt-check"><input type="checkbox" data-question="${item.id}" ${attempted.has(item.id) ? 'checked' : ''}> Maine manually solve kiya</label></article>`).join('')
  document.querySelectorAll('[data-question]').forEach(input => input.onchange = () => {
    if (input.checked) attempted.add(input.dataset.question)
    else attempted.delete(input.dataset.question)
    localStorage.setItem('da-m5-attempted', JSON.stringify([...attempted]))
    renderPractice()
  })
}

tabs.forEach(tab => tab.onclick = () => setView(tab.dataset.view))
buildToc('notes')
document.querySelector('#themeButton').onclick = () => { document.documentElement.classList.toggle('dark'); localStorage.setItem('da-theme', document.documentElement.classList.contains('dark') ? 'dark' : 'light') }
if (localStorage.getItem('da-theme') !== 'light') document.documentElement.classList.add('dark')
if (!document.querySelector('.module-switch a[href="./module7.html"]')) document.querySelector('.module-switch').insertAdjacentHTML('beforeend', '<a href="./module7.html">M07</a>')
if (!document.querySelector('.module-switch a[href="./module8.html"]')) document.querySelector('.module-switch').insertAdjacentHTML('beforeend', '<a href="./module8.html">M08</a>')
document.querySelector('#searchButton').onclick = () => { document.querySelector('.searchbox').classList.toggle('open'); document.querySelector('#search').focus() }
document.querySelector('#search').oninput = event => { const query = event.target.value.toLowerCase(); document.querySelectorAll('.view.active .searchable').forEach(item => item.classList.toggle('hidden', query && !item.textContent.toLowerCase().includes(query))) }

document.querySelectorAll('.codebox button').forEach(button => button.onclick = async () => {
  await navigator.clipboard.writeText(button.closest('.codebox').querySelector('code').innerText)
  const toast = document.querySelector('.toast'); toast.classList.add('show'); setTimeout(() => toast.classList.remove('show'), 900)
})

const checks = [...document.querySelectorAll('[data-lecture]')]
const savedLectures = JSON.parse(localStorage.getItem('da-m5-lectures') || '[]')
function updateProgress() {
  const completed = checks.filter(item => item.checked).map(item => item.dataset.lecture)
  const percent = Math.round(100 * completed.length / checks.length)
  localStorage.setItem('da-m5-lectures', JSON.stringify(completed))
  document.querySelector('#count').textContent = `${completed.length}/${checks.length}`
  document.querySelector('#bar').style.width = `${percent}%`
  document.querySelector('#lecturePercent').textContent = `${percent}%`
}
checks.forEach(item => { item.checked = savedLectures.includes(item.dataset.lecture); item.onchange = updateProgress })
updateProgress()

practiceTopic.onchange = renderPractice
practiceDifficulty.onchange = renderPractice
renderPractice()

const sectionMap = {intro: 'intro', operations: 'operations', implementation: 'implementation', list: 'list', collections: 'collections', linked: 'linked', complexity: 'complexity', applications: 'applications', tradeoffs: 'tradeoffs', reverse: 'reverse', parentheses: 'parentheses', undo: 'undo', context: 'context', 'pop-sequences': 'mixed', expressions: 'mixed', 'call-stack': 'mixed'}
Object.entries(sectionMap).forEach(([sectionId, topicId]) => {
  const section = document.querySelector(`#${sectionId}`)
  const topic = module5Topics.find(item => item.id === topicId)
  if (section && topic) section.insertAdjacentHTML('beforeend', `<button class="topic-practice" data-practice-topic="${topicId}">Is topic ke ${topic.questions.length} questions solve karo →</button>`)
})
document.querySelectorAll('[data-practice-topic]').forEach(button => button.onclick = () => {
  practiceTopic.value = button.dataset.practiceTopic
  practiceDifficulty.value = 'all'
  renderPractice()
  setView('practice')
})

document.querySelector('[data-jump="practice"]').onclick = () => setView('practice')
document.querySelector('#print').onclick = () => window.print()
document.querySelector('#menu').onclick = () => sidebar.classList.toggle('open')
toc.onclick = () => sidebar.classList.remove('open')
window.onscroll = () => { const max = document.documentElement.scrollHeight - innerHeight; document.querySelector('.read-progress span').style.width = `${max ? 100 * scrollY / max : 0}%` }
