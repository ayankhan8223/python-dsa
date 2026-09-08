import './style.css'
import { module6Topics, module6QuestionCount } from './practice6.js'

const lectures = [
  ['6.1', 'Introduction to Queues', 'FIFO, FRONT aur REAR'],
  ['6.2', 'Common Operations in Queues', 'enqueue, dequeue, front, size, empty'],
  ['6.3', 'Implementation of Queues', 'Same ADT, three storage choices'],
  ['6.3.1', 'Implementing Queue using List', 'Right append aur left pop ka cost'],
  ['6.3.2', 'Implementing Queue using Linked List', 'head FRONT, tail REAR'],
  ['6.3.3', 'Implementing Queue using Collections module', 'deque: append + popleft'],
  ['6.4', 'Queue Complexity Analysis', 'Operation-wise reasoning'],
  ['6.5.1', 'Queue using Stack', 'Two stacks se FIFO'],
  ['6.5.2', 'Reverse first K in a Queue', 'Stack-assisted trace'],
  ['6.5.3', 'Ticket Counter', 'Arrival-order simulation'],
  ['6.6', 'DS Context', 'Queue, deque, stack aur BFS map']
]

const chapterHead = (number, label, title, subtitle) => `<div class="chapter-head"><div class="chapter-no"><span>${number}</span><small>${label}</small></div><div><h2>${title}</h2><p>${subtitle}</p></div></div>`
const queueDiagram = (items, labels = {}) => `<div class="queue-visual"><div class="queue-direction"><span>FRONT · DEQUEUE ←</span><i>oldest item leaves</i><i>newest item enters</i><span>→ ENQUEUE · REAR</span></div><div class="queue-row">${items.length ? items.map((item, index) => `<div class="queue-node ${index === 0 ? 'front-node' : ''} ${index === items.length - 1 ? 'rear-node' : ''}"><b>${item}</b><small>${index === 0 ? labels.front || 'FRONT · next dequeue' : index === items.length - 1 ? labels.rear || 'REAR · newest' : 'waiting'}</small></div>`).join('<em>→</em>') : '<div class="empty-queue">EMPTY QUEUE · no FRONT and no REAR</div>'}</div><div class="queue-caption">${labels.note || 'FIFO: pehle aaya item FRONT se pehle nikalta hai.'}</div></div>`
const stackColumn = values => `<div class="queue-stack"><span>TOP ↓</span>${values.length ? values.map((value, index) => `<b class="${index === 0 ? 'queue-stack-top' : ''}">${value}</b>`).join('') : '<i>EMPTY</i>'}</div>`
const lectureTracker = lectures.map(([number, title, note]) => `<label><input type="checkbox" data-lecture="${number}"><span><b>${number}</b><i>${title}</i><small>${note}</small></span></label>`).join('')
const topicOptions = module6Topics.map(topic => `<option value="${topic.id}">${topic.label} (${topic.questions.length})</option>`).join('')

const pyqs = [
  {
    year: '2024', number: 'Q16', kind: 'DIRECT QUEUE PYQ', title: 'FIFO, lookup aur LIFO matching',
    question: 'Match Column 1 with Column 2:',
    prompt: '<table><tbody><tr><th>Column 1</th><th>Column 2</th></tr><tr><td>(p) First In First Out</td><td>(i) Stacks</td></tr><tr><td>(q) Lookup Operation</td><td>(ii) Queues</td></tr><tr><td>(r) Last In First Out</td><td>(iii) Hash Tables</td></tr></tbody></table><p>Which option is correct?</p><ul><li>A. (p)–(ii), (q)–(iii), (r)–(i)</li><li>B. (p)–(ii), (q)–(i), (r)–(iii)</li><li>C. (p)–(i), (q)–(ii), (r)–(iii)</li><li>D. (p)–(i), (q)–(iii), (r)–(ii)</li></ul>',
    answer: 'Option A', why: 'FIFO means queue; LIFO means stack; a hash table provides the lookup operation. Isliye (p)–(ii), (q)–(iii), (r)–(i).'
  },
  {
    year: '2024', number: 'Q32', kind: 'DIRECT DEQUE / QUEUE PYQ', title: 'Double-ended queue operation trace',
    question: 'An empty double-ended queue D supports <code>insertFirst(e)</code>, <code>insertLast(e)</code>, <code>removeFirst()</code> and <code>removeLast()</code>. The following operations occur:',
    prompt: '<pre>insertFirst(10)\ninsertLast(32)\na ← removeFirst()\ninsertLast(28)\ninsertLast(17)\na ← removeFirst()\na ← removeLast()</pre><p>The value of <code>a</code> is ______.</p>',
    answer: '17', why: 'State trace: [10] → [10,32] → a=10, D=[32] → [32,28] → [32,28,17] → a=32, D=[28,17] → a=17. Har new assignment old a overwrite karta hai.'
  }
]
const pyqMarkup = pyqs.map(item => `<details class="pyq-card searchable" open><summary><span class="year">${item.year}<small>${item.number}</small></span><span><b>${item.title}</b><small>${item.kind}</small></span><i>＋</i></summary><div class="pyq-body"><div class="answer"><span>Final answer</span><strong>${item.answer}</strong></div><div class="pyq-question"><h4>Original question · clean transcript</h4><p>${item.question}</p>${item.prompt}</div><aside class="transfer"><strong>Step-by-step answer</strong><p>${item.why}</p></aside></div></details>`).join('')
const pyqEvidenceNote = `<div class="callout"><b>2025–26 paper check</b><p>Supplied 2025 aur 2026 DA papers mein basic queue enqueue/dequeue, linked queue ya reverse-first-k ka direct PYQ nahi mila. Isliye page par sirf verified 2024 direct queue PYQs diye gaye hain; baaki GATE transfer practice section mein hai.</p></div>`

document.querySelector('#app').innerHTML = `
<div class="read-progress"><span></span></div>
<header class="topbar"><a class="brand" href="#top"><b>DA</b><span><strong>Python + DSA</strong><small>GATE 2027 Notebook</small></span></a><nav><button class="tab active" data-view="notes">Detailed Notes</button><button class="tab" data-view="pyq">PYQ Evidence <i>2</i></button><button class="tab" data-view="practice">Practice <i>${module6QuestionCount}</i></button><button class="tab" data-view="revision">Revision</button></nav><div class="actions"><button id="searchButton" aria-label="Search">⌕</button><button id="themeButton" aria-label="Theme">◐</button></div></header>
<div class="searchbox"><input id="search" type="search" placeholder="Search: FIFO, rear, dequeue, deque, two stacks…"><span>Search current view</span></div>
<div class="layout" id="top"><aside class="sidebar"><p class="overline">Module 06</p><h2>Queues</h2><div class="module-switch"><a href="./index.html">M01</a><a href="./module2.html">M02</a><a href="./module3.html">M03</a><a href="./module4.html">M04</a><a href="./module5.html">M05</a><a class="active" href="./module6.html">M06</a></div><div class="completion"><span><b>Lecture progress</b><i id="count">0/${lectures.length}</i></span><div><i id="bar"></i></div></div><nav id="toc"></nav><p class="source"><b>Sources</b>CampusX Queue lecture flow · supplied GATE DA syllabus · supplied 2024–2026 DA papers</p></aside><main>
<div class="view active" data-panel="notes">
<section class="hero searchable" data-title="Overview"><p class="eyebrow"><i></i> Module 06 · first in, first out</p><h1>Queue ko code se pehle <em>FRONT aur REAR</em> ki movement se samjho.</h1><p>Har trace mein do labels lagao: FRONT = next item jo niklega; REAR = newest item jo enter hua. Enqueue REAR par hota hai, dequeue FRONT se.</p><div class="metrics"><span><b>${lectures.length}</b>lecture sessions</span><span><b>${module6QuestionCount}</b>distinct drills</span><span><b>2</b>direct queue PYQs</span></div><div class="syllabus"><b>GATE DA syllabus map</b>Basic data structures · queues · Python implementation · complexity · graph traversal transfer</div></section>

<section class="lecture-track searchable" id="lecture-track" data-title="Module 6 lecture tracker"><div class="track-head"><div><p class="eyebrow"><i></i> Exact lecture sequence</p><h2>Module 6 · Lecture Tracker</h2><p>Har lecture ke baad checkbox tick karo. Har queue operation ke baad FRONT aur REAR redraw karna habit banao.</p></div><strong id="lecturePercent">0%</strong></div><div class="lecture-list">${lectureTracker}</div></section>

<section class="beginner-start searchable" id="zero-start" data-title="Zero-start mental model"><div class="zero-title"><span>ZERO START</span><h2>Queue ek waiting line hai—jo pehle aaya, woh pehle service lega.</h2><p>10 pehle aaya, then 20, then 30. Isliye 10 FRONT par hai aur next dequeue 10 hi return karega. 30 newest hai, so REAR par hai.</p></div>${queueDiagram(['10', '20', '30'])}<div class="glossary-grid"><article><b>Queue</b><p>FIFO linear data structure.</p></article><article><b>FRONT</b><p>Oldest item; next dequeue.</p></article><article><b>REAR</b><p>Newest item; next enqueue ke paas.</p></article><article><b>Enqueue</b><p>REAR par add karna.</p></article><article><b>Dequeue</b><p>FRONT item remove + return.</p></article><article><b>Front/Peek</b><p>FRONT read, remove nahi.</p></article></div><div class="reading-method"><h3>Queue question solve karne ka protocol</h3><div><span><b>1</b>FRONT mark karo</span><span><b>2</b>REAR mark karo</span><span><b>3</b>Ek operation chalao</span><span><b>4</b>Dono labels redraw karo</span></div></div></section>

<section class="chapter searchable" id="intro" data-title="6.1 · Introduction to Queues">${chapterHead('6.1', 'INTRODUCTION TO QUEUES', 'Queue kya hai?', 'FIFO ko arrival order aur service order se connect karo.')}<div class="two-grid"><article><h3>Arrival order</h3><p>10, then 20, then 30 enqueue hue. 10 oldest hai; uski position FRONT par hai.</p></article><article><h3>Service order</h3><p>Dequeue order 10, then 20, then 30 hoga. Isi rule ko <strong>First In, First Out</strong> kehte hain.</p></article></div><div class="state-flow"><article><span>BEFORE ENQUEUE(30)</span>${queueDiagram(['10', '20'])}</article><div class="state-operation"><code>enqueue(30)</code><b>→</b></div><article><span>AFTER ENQUEUE(30)</span>${queueDiagram(['10', '20', '30'])}</article></div><div class="callout"><b>Line analogy</b><p>Ticket counter par late aane wala person (REAR) pehle service nahi le sakta. FRONT wala person pehle nikalta hai.</p></div><div class="danger"><b>GATE trap</b><p>Diagram horizontal ya vertical ho sakta hai. Direction values se nahi, explicit FRONT/REAR labels se decide karo.</p></div></section>

<section class="chapter searchable" id="operations" data-title="6.2 · Common Operations in Queues">${chapterHead('6.2', 'COMMON OPERATIONS', 'Enqueue, dequeue, front/rear peek, size aur empty', 'Return value aur state change ko separately note karo.')}<div class="table-wrap"><table><thead><tr><th>Operation</th><th>Exactly kya karta hai?</th><th>[10,20] FRONT → REAR par</th><th>State change?</th></tr></thead><tbody><tr><td><code>enqueue(30)</code></td><td>30 REAR par add</td><td>[10,20,30]</td><td>Yes</td></tr><tr><td><code>dequeue()</code></td><td>FRONT 10 remove + return</td><td>returns 10; [20]</td><td>Yes</td></tr><tr><td><code>front_peek()</code></td><td>FRONT 10 read; remove nahi</td><td>10; [10,20]</td><td>No</td></tr><tr><td><code>rear_peek()</code></td><td>REAR 20 read; remove nahi</td><td>20; [10,20]</td><td>No</td></tr><tr><td><code>get_size()</code></td><td>Items count</td><td>2</td><td>No</td></tr><tr><td><code>is_empty()</code></td><td>Queue empty hai?</td><td>False</td><td>No</td></tr></tbody></table></div><div class="callout"><b>Peek ka meaning</b><p><code>front_peek()</code> next item jo dequeue hoga woh dikhata hai. <code>rear_peek()</code> sabse recently enqueued item dikhata hai. Dono queue ko mutate nahi karte.</p></div><div class="zero-title"><span>COMPLETE TRACE</span><h2>Har operation ke baad queue state update hoti hai.</h2></div><div class="table-wrap"><table><thead><tr><th>Step</th><th>Operation</th><th>Returned</th><th>FRONT</th><th>REAR</th><th>Queue</th></tr></thead><tbody><tr><td>0</td><td>Start</td><td>—</td><td>None</td><td>None</td><td>[]</td></tr><tr><td>1</td><td>enqueue(10)</td><td>—</td><td>10</td><td>10</td><td>[10]</td></tr><tr><td>2</td><td>enqueue(20)</td><td>—</td><td>10</td><td>20</td><td>[10,20]</td></tr><tr><td>3</td><td>enqueue(30)</td><td>—</td><td>10</td><td>30</td><td>[10,20,30]</td></tr><tr><td>4</td><td><code>front_peek()</code></td><td>10</td><td>10</td><td>30</td><td>[10,20,30] unchanged</td></tr><tr><td>5</td><td><code>rear_peek()</code></td><td>30</td><td>10</td><td>30</td><td>[10,20,30] unchanged</td></tr><tr><td>6</td><td>dequeue()</td><td>10</td><td>20</td><td>30</td><td>[20,30]</td></tr></tbody></table></div><div class="two-grid"><article><h3>Underflow</h3><p>Empty queue par dequeue ya kisi bhi peek attempt. Safe implementation pehle empty check karti hai.</p></article><article><h3>Overflow</h3><p>Fixed-capacity queue full ho aur enqueue aaye. Python dynamic containers memory limit tak grow karte hain.</p></article></div></section>

<section class="chapter searchable" id="implementation" data-title="6.3 · Implementation of Queues">${chapterHead('6.3', 'IMPLEMENTATION', 'Python mein queue implement karne ke multiple ways', 'Lecture ka complete map: basic DSA implementations aur specialised Python modules ko alag samjho.')}<div class="callout"><b>ADT vs implementation</b><p><strong>Queue</strong> behavior define karti hai: enqueue at REAR, dequeue at FRONT. Python mein us behavior ko multiple tools se implement kar sakte hain—use-case ke hisaab se tool select hota hai.</p></div><div class="three-grid"><article><span>6.3.1</span><h3>Python list</h3><p><code>append</code> REAR; <code>pop(0)</code> FRONT. Simple hai, lekin frequent dequeue costly O(n).</p></article><article><span>6.3.2</span><h3>Linked list</h3><p><code>head</code> FRONT aur <code>tail</code> REAR. Both references rakho toh endpoint operations O(1).</p></article><article><span>6.3.3</span><h3><code>collections.deque</code></h3><p><code>append</code> REAR, <code>popleft</code> FRONT. Normal Python DSA/CP queue ke liye best default.</p></article></div><div class="two-grid"><article><h3><code>heapq</code> · Priority Queue</h3><p>Normal FIFO queue nahi. Smallest-priority element pehle nikalta hai. GATE graph algorithms—especially Dijkstra/A* type frontier—mein priority queue ka role aata hai.</p></article><article><h3><code>queue</code> module · Thread-safe queue</h3><p>Locking aur blocking support karta hai; producer-consumer aur cross-thread communication ke liye suitable. Basic DSA/competitive-programming queue implementation ke liye usually use nahi karte.</p></article><article><h3><code>asyncio</code> · Async queue</h3><p><code>async/await</code> programs mein producer-consumer coordination ke liye. Iska use concurrent async tasks ke context mein hota hai, normal GATE queue trace mein nahi.</p></article><article><h3>GATE/DSA selection rule</h3><p>FIFO trace/implementation: <code>deque</code> ya linked queue. Priority-based removal: <code>heapq</code>. Threading/asynchronous API details ko basic queue ADT se mix mat karo.</p></article></div><div class="note"><b>Lecture note:</b> <code>queue</code> aur <code>asyncio</code> implementations Python systems programming ke liye useful hain, but DSA/competitive-programming queue questions mein unka detailed API normally primary focus nahi hota.</div><div class="equation"><span>Same logical queue</span><b>FRONT 10 → 20 → 30 REAR · storage representation alag ho sakti hai</b></div></section>

<section class="chapter searchable" id="list" data-title="6.3.1 · Queue using List">${chapterHead('6.3.1', 'QUEUE USING LIST', 'Simple code, but dequeue cost samjho', 'List mein index 0 FRONT aur last index REAR hai.')}<div class="zero-title"><span>LIST REPRESENTATION</span><h2><code>queue[0]</code> current FRONT hai.</h2><p><code>[20,30,25]</code> mein 20 FRONT aur 25 REAR hai.</p></div>${queueDiagram(['20','30','25'], { note: 'List index 0 = FRONT; last index = REAR.' })}<div class="codebox green"><div><span>Clean Python queue using list</span><button>Copy</button></div><pre><code>class QueueUsingList:
    def __init__(self):
        self.queue = []

    def is_empty(self):
        return len(self.queue) == 0

    def enqueue(self, data):
        self.queue.append(data)       # REAR

    def dequeue(self):
        if self.is_empty():
            return None
        return self.queue.pop(0)      # FRONT

    def front_peek(self):
        if self.is_empty():
            return None
        return self.queue[0]          # current FRONT

    def rear_peek(self):
        if self.is_empty():
            return None
        return self.queue[-1]         # current REAR</code></pre></div><div class="table-wrap"><table><thead><tr><th>Call</th><th><code>self.queue</code> after call</th><th>FRONT</th><th>REAR</th><th>Why</th></tr></thead><tbody><tr><td>enqueue(20)</td><td>[20]</td><td>20</td><td>20</td><td>Single item is both ends</td></tr><tr><td>enqueue(30)</td><td>[20,30]</td><td>20</td><td>30</td><td>append right end</td></tr><tr><td>enqueue(25)</td><td>[20,30,25]</td><td>20</td><td>25</td><td>25 newest</td></tr><tr><td>front_peek()</td><td>[20,30,25]</td><td>20</td><td>25</td><td>returns 20; queue unchanged</td></tr><tr><td>rear_peek()</td><td>[20,30,25]</td><td>20</td><td>25</td><td>returns 25; queue unchanged</td></tr><tr><td>dequeue()</td><td>[30,25]</td><td>30</td><td>25</td><td>20 removed; remaining items shift left</td></tr></tbody></table></div><div class="danger"><b>Why list queue is not ideal</b><p><code>pop(0)</code> ke baad 30 ko index 0 aur 25 ko index 1 banana hota hai. n remaining references shift, so dequeue O(n).</p></div></section>

<section class="chapter searchable" id="linked" data-title="6.3.2 · Queue using Linked List">${chapterHead('6.3.2', 'QUEUE USING LINKED LIST', 'Head FRONT, tail REAR', 'Do references rakho toh enqueue aur dequeue dono O(1).')}<div class="zero-title"><span>REFERENCE MODEL</span><h2><code>self.head</code> FRONT aur <code>self.tail</code> REAR ko reference karta hai.</h2><p>Head se oldest node remove hota hai; tail ke baad newest node attach hota hai.</p></div><div class="linked-chain with-head with-tail"><span class="head-node"><b class="head-ref" data-head-label="FRONT">10</b><i>next → 20</i></span><em>→</em><span><b>20</b><i>next → 30</i></span><em>→</em><span class="tail-node"><b class="tail-ref" data-tail-label="REAR">30</b><i>next → None</i></span></div><div class="codebox green"><div><span>Clean linked-list queue</span><button>Copy</button></div><pre><code>class Node:
    def __init__(self, data):
        self.data = data
        self.next = None

class QueueUsingLinkedList:
    def __init__(self):
        self.head = None      # FRONT
        self.tail = None      # REAR

    def enqueue(self, data):
        new_node = Node(data)
        if self.tail is None:
            self.head = self.tail = new_node
            return
        self.tail.next = new_node
        self.tail = new_node

    def dequeue(self):
        if self.head is None:
            return None
        value = self.head.data
        self.head = self.head.next
        if self.head is None:
            self.tail = None
        return value</code></pre></div><div class="steps"><article><b>1</b><h3>Empty enqueue(10)</h3><p>New node 10 banta hai. Queue empty thi, so <code>head</code> aur <code>tail</code> dono same node 10 ko reference karte hain.</p></article><article><b>2</b><h3>enqueue(20)</h3><p><code>tail</code> currently 10 ko reference karta hai. <code>tail.next = new_node</code> se 10.next → 20. Then tail reference 20 par shift.</p></article><article><b>3</b><h3>dequeue()</h3><p><code>head</code> 10 ko reference karta hai. Value 10 save, then <code>head = head.next</code>; new FRONT 20.</p></article></div><div class="danger"><b>Single-node edge case</b><p>Last node dequeue karne ke baad <code>head</code> None hota hai. Usi moment <code>tail = None</code> bhi zaroori hai; stale REAR reference bug ban sakta hai.</p></div></section>

<section class="chapter searchable" id="collections" data-title="6.3.3 · Queue using Collections">${chapterHead('6.3.3', 'COLLECTIONS MODULE', 'deque ko queue ki tarah use karna', 'Python mein frequent queue operations ke liye <code>deque</code> best default choice hai.')}<div class="callout"><b>Core idea</b><p><code>deque</code> ke dono endpoints efficient hote hain. Queue mapping consistently rakho: right = REAR, left = FRONT. So <code>append</code> enqueue aur <code>popleft</code> dequeue.</p></div><div class="codebox green"><div><span>Queue using deque</span><button>Copy</button></div><pre><code>from collections import deque

queue = deque()

queue.append(20)      # enqueue
queue.append(15)
queue.append(35)

front = queue[0]      # front_peek → 20, no removal
rear = queue[-1]      # rear_peek → 35, no removal
served = queue.popleft()  # 20 removed</code></pre></div>${queueDiagram(['20','15','35'], { note: 'deque([20,15,35]) mein queue[0] = 20 FRONT; queue[-1] = 35 REAR.' })}<div class="table-wrap"><table><thead><tr><th>Statement</th><th>Queue FRONT → REAR</th><th>Result</th></tr></thead><tbody><tr><td><code>queue = deque()</code></td><td>[]</td><td>Empty</td></tr><tr><td><code>append(20)</code></td><td>[20]</td><td>FRONT=REAR=20</td></tr><tr><td><code>append(15)</code></td><td>[20,15]</td><td>REAR=15</td></tr><tr><td><code>append(35)</code></td><td>[20,15,35]</td><td>REAR=35</td></tr><tr><td><code>queue[0]</code></td><td>[20,15,35]</td><td>20; unchanged</td></tr><tr><td><code>popleft()</code></td><td>[15,35]</td><td>returns 20; FRONT=15</td></tr></tbody></table></div><div class="callout"><b>Technical note</b><p>Lecture mental model endpoint-friendly linked structure jaisa hai. CPython internally block-linked implementation use karta hai; exam conclusion same: endpoint insert/delete O(1), arbitrary middle access primary use-case nahi.</p></div></section>

<section class="chapter searchable" id="complexity" data-title="6.4 · Queue Complexity Analysis">${chapterHead('6.4', 'QUEUE COMPLEXITY', 'O(1) bolne se pehle implementation dekho', 'FRONT deletion ka storage-level cost decide karta hai.')}<div class="table-wrap"><table><thead><tr><th>Implementation</th><th>Enqueue</th><th>Dequeue</th><th>Front</th><th>Reason</th></tr></thead><tbody><tr><td>List: append + pop(0)</td><td>O(1) amortized</td><td>O(n)</td><td>O(1)</td><td>Front removal shifts</td></tr><tr><td>deque: append + popleft</td><td>O(1)</td><td>O(1)</td><td>O(1)</td><td>Endpoint operations supported</td></tr><tr><td>Linked list: head + tail</td><td>O(1)</td><td>O(1)</td><td>O(1)</td><td>Both endpoint references direct</td></tr><tr><td>Linked list: tail absent</td><td>O(n)</td><td>O(1)</td><td>O(1)</td><td>New REAR find karne traversal</td></tr></tbody></table></div><div class="steps"><article><b>1</b><h3>List dequeue O(n)</h3><p><code>pop(0)</code> ke baad every remaining value ka index one left shift hota hai.</p></article><article><b>2</b><h3>deque endpoint O(1)</h3><p>FRONT and REAR operations ke liye designed endpoint methods use hote hain.</p></article><article><b>3</b><h3>Linked queue O(1)</h3><p>Tail append ke liye aur head remove ke liye traversal nahi; only a few pointer updates.</p></article><article><b>4</b><h3>Storage vs auxiliary</h3><p>n waiting items ko store karna O(n) space. Ek enqueue/dequeue method fixed variables use karti hai, so O(1) auxiliary.</p></article></div><div class="danger"><b>GATE trap</b><p>“Queue operations are O(1)” incomplete statement hai. It is true for deque or linked queue with both head/tail—but not Python list <code>pop(0)</code>.</p></div></section>

<section class="chapter searchable" id="two-stacks" data-title="6.5.1 · Queue using Stack">${chapterHead('6.5.1', 'QUEUE USING STACK', 'Do LIFO stacks se FIFO queue', 'Transfer reverse order create karta hai; isi reversal se oldest item accessible banta hai.')}<div class="zero-title"><span>QUESTION</span><h2>Do stacks use karke queue ka dequeue kaise FIFO rahega?</h2><p><code>in_stack</code> arrivals collect karta hai. <code>out_stack</code> oldest item ko TOP par laata hai.</p></div><div class="two-stack-flow"><article><span>IN_STACK · newest TOP</span>${stackColumn(['30','20','10'])}</article><div class="state-operation"><code>move all</code><b>→</b></div><article><span>OUT_STACK · oldest TOP</span>${stackColumn(['10','20','30'])}</article></div><div class="steps"><article><b>1</b><h3><code>enqueue(x)</code></h3><p>Every new x ko <code>in_stack</code> par push karo. FIFO order abhi visible nahi, but arrival history safe hai.</p></article><article><b>2</b><h3><code>dequeue()</code> when out empty</h3><p><code>in_stack</code> se each pop ko <code>out_stack</code> par push. Two reversals? In this single transfer, original oldest 10 out_stack ka TOP ban jata hai.</p></article><article><b>3</b><h3>Pop <code>out_stack</code></h3><p>TOP 10 is now oldest queued value, so returned value FIFO correct hai.</p></article></div><div class="codebox green"><div><span>Amortized O(1) two-stack queue</span><button>Copy</button></div><pre><code>class QueueUsingStacks:
    def __init__(self):
        self.in_stack = []
        self.out_stack = []

    def enqueue(self, data):
        self.in_stack.append(data)

    def dequeue(self):
        if not self.out_stack:
            while self.in_stack:
                self.out_stack.append(self.in_stack.pop())
        if not self.out_stack:
            return None
        return self.out_stack.pop()</code></pre></div><div class="callout"><b>Why amortized O(1)?</b><p>Ek item <code>in_stack</code> mein once push, at most once transfer, then <code>out_stack</code> se once pop. Ek dequeue O(n) transfer kar sakta hai, but long sequence ka total work O(n).</p></div></section>

<section class="chapter searchable" id="reverse-k" data-title="6.5.2 · Reverse first K">${chapterHead('6.5.2', 'REVERSE FIRST K', 'Queue ka first block stack se reverse', 'First k elements reverse karo; remaining n-k elements ka order unchanged rehna chahiye.')}<div class="zero-title"><span>QUESTION</span><h2><code>[10,20,30,40,50]</code> mein first <code>k=3</code> reverse karo.</h2><p>Required answer: <strong>[30,20,10,40,50]</strong>. Only first three reverse; 40 then 50 same order mein.</p></div><div class="table-wrap"><table><thead><tr><th>Step</th><th>Queue FRONT → REAR</th><th>Stack TOP → bottom</th><th>Exactly kya hua?</th></tr></thead><tbody><tr><td>Start</td><td>[10,20,30,40,50]</td><td>[]</td><td>First 3 reverse karne hain</td></tr><tr><td>1</td><td>[20,30,40,50]</td><td>[10]</td><td>10 dequeue, stack push</td></tr><tr><td>2</td><td>[30,40,50]</td><td>[20,10]</td><td>20 dequeue, stack push</td></tr><tr><td>3</td><td>[40,50]</td><td>[30,20,10]</td><td>30 dequeue, stack push</td></tr><tr><td>4</td><td>[40,50,30,20,10]</td><td>[]</td><td>Stack pop values REAR par append</td></tr><tr><td>5</td><td>[30,20,10,40,50]</td><td>[]</td><td>40, then 50 rotate to REAR</td></tr></tbody></table></div><div class="codebox green"><div><span>Clean Python solution</span><button>Copy</button></div><pre><code>from collections import deque

def reverse_first_k(queue, k):
    if k &lt; 0 or k &gt; len(queue):
        return None

    stack = []
    for _ in range(k):
        stack.append(queue.popleft())

    while stack:
        queue.append(stack.pop())

    for _ in range(len(queue) - k):
        queue.append(queue.popleft())

    return queue</code></pre></div><div class="danger"><b>Important detail</b><p>Stack pops ke baad reversed block REAR par hota hai. Isi liye original remaining <code>n-k</code> elements ko dequeue+enqueue karke us block ke peeche rotate karna padta hai.</p></div><div class="equation"><span>Complexity</span><b>O(n) time · O(k) auxiliary stack space</b></div></section>

<section class="chapter searchable" id="ticket-counter" data-title="6.5.3 · Ticket Counter">${chapterHead('6.5.3', 'TICKET COUNTER', 'Arrival order ka queue simulation', 'Customer arrival enqueue; service complete dequeue.')}<div class="zero-title"><span>SCENARIO</span><h2>A, B, C line mein aaye; A served hua; phir D aaya.</h2><p>Next served customer <strong>B</strong> hoga, not D. D newest arrival hai, so REAR par wait karega.</p></div><div class="table-wrap"><table><thead><tr><th>Event</th><th>Queue FRONT → REAR</th><th>Who is next?</th><th>Why</th></tr></thead><tbody><tr><td>A arrives</td><td>[A]</td><td>A</td><td>Only customer</td></tr><tr><td>B arrives</td><td>[A,B]</td><td>A</td><td>B goes REAR</td></tr><tr><td>C arrives</td><td>[A,B,C]</td><td>A</td><td>FIFO preserved</td></tr><tr><td>A served</td><td>[B,C]</td><td>B</td><td>dequeue FRONT</td></tr><tr><td>D arrives</td><td>[B,C,D]</td><td>B</td><td>D cannot overtake</td></tr></tbody></table></div>${queueDiagram(['B','C','D'], { note: 'B oldest remaining = next service. D newest = REAR.' })}<div class="zero-title"><span>RUNNABLE PYTHON</span><h2>Arrival ko <code>enqueue</code>; service complete ko <code>dequeue</code> likho.</h2><p>Yahan <code>deque</code> use hua hai, taaki REAR par arrival aur FRONT se service dono O(1) rahein.</p></div><div class="codebox green"><div><span>Ticket counter FIFO simulation</span><button>Copy</button></div><pre><code>from collections import deque

class TicketCounter:
    def __init__(self):
        self.waiting = deque()

    def arrive(self, customer):
        self.waiting.append(customer)       # enqueue at REAR
        print("{} arrived: {}".format(customer, list(self.waiting)))

    def serve_next(self):
        if not self.waiting:
            print("No customer waiting")
            return None

        customer = self.waiting.popleft()  # dequeue from FRONT
        print("Serving {}: {}".format(customer, list(self.waiting)))
        return customer

    def front_peek(self):
        return self.waiting[0] if self.waiting else None


counter = TicketCounter()
counter.arrive("A")
counter.arrive("B")
counter.arrive("C")
counter.serve_next()       # A leaves
counter.arrive("D")

print(counter.front_peek())  # B: next customer
counter.serve_next()         # B leaves</code></pre></div><div class="table-wrap"><table><thead><tr><th>Code line / event</th><th>Exactly kya hua?</th><th>Waiting queue after event</th><th>Return</th></tr></thead><tbody><tr><td><code>arrive("A")</code></td><td>A REAR par enqueue</td><td>[A]</td><td>—</td></tr><tr><td><code>arrive("B")</code></td><td>B A ke baad REAR par</td><td>[A,B]</td><td>—</td></tr><tr><td><code>arrive("C")</code></td><td>C newest hai</td><td>[A,B,C]</td><td>—</td></tr><tr><td><code>serve_next()</code></td><td>FRONT A dequeue</td><td>[B,C]</td><td>A</td></tr><tr><td><code>arrive("D")</code></td><td>D REAR par add</td><td>[B,C,D]</td><td>—</td></tr><tr><td><code>front_peek()</code></td><td>FRONT ko read; remove nahi</td><td>[B,C,D] unchanged</td><td>B</td></tr><tr><td><code>serve_next()</code></td><td>FRONT B dequeue</td><td>[C,D]</td><td>B</td></tr></tbody></table></div><div class="callout"><b>GATE modelling cue</b><p>Words like “arrival order”, “waiting line”, “first customer served” strongly signal FIFO queue. “Highest priority first” appears, then it is priority queue—not plain queue.</p></div><div class="danger"><b>Trap</b><p><code>front_peek()</code> B ko sirf dikhata hai; B line se tabhi niklega jab <code>serve_next()</code> / dequeue chalega.</p></div></section>

<section class="chapter searchable" id="context" data-title="6.6 · DS Context">${chapterHead('6.6', 'DS CONTEXT', 'Removal rule pehle identify karo', 'Same data values, different removal rule means different structure.')}<div class="table-wrap"><table><thead><tr><th>Structure</th><th>Removal rule</th><th>Active ends</th><th>Natural example</th></tr></thead><tbody><tr><td>Queue</td><td>FIFO</td><td>REAR insert, FRONT delete</td><td>Ticket counter, BFS</td></tr><tr><td>Stack</td><td>LIFO</td><td>TOP only</td><td>Undo, DFS, recursion</td></tr><tr><td>Deque</td><td>Both-end operations</td><td>Both ends</td><td>Sliding window, 2024 deque PYQ</td></tr><tr><td>Priority queue</td><td>Priority-based</td><td>Priority rule</td><td>A*, Dijkstra</td></tr></tbody></table></div><div class="reading-method"><h3>GATE queue trace checklist</h3><div><span><b>1</b>FRONT/REAR mark</span><span><b>2</b>Return values write</span><span><b>3</b>Empty/full check</span><span><b>4</b>Implementation cost audit</span></div></div><div class="final"><h3>Module 6 mastery target</h3><p>FIFO trace without guessing, list/deque/linked queue complexities explain, two-stack queue amortization justify, and first-k reversal manually derive.</p><button data-jump="practice">Lecture-wise practice kholo →</button></div></section>
</div>
<div class="view" data-panel="pyq"><section class="page-hero searchable" data-title="Queue PYQ Evidence"><p class="eyebrow"><i></i> Supplied paper evidence</p><h1>Queue PYQ Lab</h1><p>Full question, options, final answer aur trace neeche default visible hain. Pehle khud FRONT/REAR trace karne ki koshish karo.</p><div class="practice-summary"><span><b>2</b>direct 2024 PYQs</span><span><b>full</b>question + options</span><span><b>visible</b>answer + trace</span></div></section><section class="pyq-list">${pyqMarkup}${pyqEvidenceNote}</section></div>
<div class="view" data-panel="practice"><section class="page-hero practice-head searchable" data-title="Practice Lab"><p class="eyebrow"><i></i> Lecture-wise GATE drills</p><h1>Module 6 Practice</h1><p>${module6QuestionCount} distinct questions · 11 exact lecture sets + 1 mixed queue set.</p><div class="practice-summary"><span><b>11</b>lecture sets</span><span><b>2</b>direct PYQ drills</span><span><b>saved</b>attempt progress</span></div></section><section class="practice-controls searchable" data-title="Choose topic"><div><label for="practiceTopic">Lecture topic</label><select id="practiceTopic">${topicOptions}</select></div><div><label for="practiceDifficulty">Difficulty</label><select id="practiceDifficulty"><option value="all">All levels</option><option>Foundation</option><option>Core</option><option>Practice</option></select></div><div class="practice-score"><span>Attempted</span><b id="practiceScore">0/0</b></div></section><section class="practice-context" id="practiceContext"></section><section class="question-list" id="questionList"></section></div>
<div class="view" data-panel="revision"><section class="page-hero revision-head searchable" data-title="Revision sheet"><p class="eyebrow"><i></i> Last-day recall</p><h1>Module 6 Revision</h1><p>FIFO, implementations, complexity and queue applications.</p><button id="print">Print sheet</button></section><section class="revision-grid"><article class="rev"><span>01</span><h2>Core</h2><ul><li>FIFO</li><li>enqueue at REAR</li><li>dequeue at FRONT</li><li>front does not remove</li></ul></article><article class="rev"><span>02</span><h2>List</h2><ul><li>append rear</li><li>pop(0) front</li><li>dequeue O(n)</li><li>front [0]</li></ul></article><article class="rev"><span>03</span><h2>deque</h2><ul><li>append rear</li><li>popleft front</li><li>endpoint O(1)</li><li>guard empty</li></ul></article><article class="rev"><span>04</span><h2>Linked queue</h2><ul><li>head = FRONT</li><li>tail = REAR</li><li>empty: both None</li><li>both ops O(1)</li></ul></article><article class="rev"><span>05</span><h2>Applications</h2><ul><li>BFS</li><li>ticket counter</li><li>two stacks</li><li>reverse first k</li></ul></article><article class="rev warning"><span>06</span><h2>Traps</h2><ul><li>front ≠ dequeue</li><li>FIFO ≠ priority</li><li>list pop(0) O(n)</li><li>last dequeue resets tail</li></ul></article></section></div>
</main></div><button class="menu" id="menu">☰</button><div class="toast">Copied</div>`

const tabs = [...document.querySelectorAll('.tab')]
const panels = [...document.querySelectorAll('[data-panel]')]
const toc = document.querySelector('#toc')
const sidebar = document.querySelector('.sidebar')
const practiceTopic = document.querySelector('#practiceTopic')
const practiceDifficulty = document.querySelector('#practiceDifficulty')
const attempted = new Set(JSON.parse(localStorage.getItem('da-m6-attempted') || '[]'))

function buildToc(viewName) {
  const panel = document.querySelector(`[data-panel="${viewName}"]`)
  const sections = panel ? [...panel.querySelectorAll('[data-title]')] : []
  toc.innerHTML = sections.map((section, index) => `<a href="#${section.id || ''}"><i>${String(index + 1).padStart(2, '0')}</i>${section.dataset.title}</a>`).join('')
}
function setView(viewName) {
  tabs.forEach(tab => tab.classList.toggle('active', tab.dataset.view === viewName))
  panels.forEach(panel => panel.classList.toggle('active', panel.dataset.panel === viewName))
  buildToc(viewName); window.scrollTo({ top: 0, behavior: 'smooth' }); document.querySelector('#search').value = ''
}
function renderPractice() {
  const topic = module6Topics.find(item => item.id === practiceTopic.value) || module6Topics[0]
  const level = practiceDifficulty.value
  const questions = level === 'all' ? topic.questions : topic.questions.filter(item => item.difficulty === level)
  const done = topic.questions.filter(item => attempted.has(item.id)).length
  document.querySelector('#practiceScore').textContent = `${done}/${topic.questions.length}`
  document.querySelector('#practiceContext').innerHTML = `<div><span>${topic.label}</span><h2>${topic.label}</h2><p>Pehle FRONT aur REAR mark karo. Operation trace complete karne ke baad answer kholo.</p></div><aside><b>${questions.length} shown</b><small>${topic.questions.length} total</small><p>FIFO, edge cases, implementation cost aur GATE transfer.</p></aside>`
  document.querySelector('#questionList').innerHTML = questions.map(item => `<article class="practice-question searchable ${attempted.has(item.id) ? 'attempted' : ''}"><div class="question-meta"><span>Q${String(item.number).padStart(2, '0')}</span><i>${item.difficulty}</i><b>${item.pattern}</b></div><h3>${item.prompt}</h3><ol class="question-options" type="A">${item.options.map(option => `<li>${option}</li>`).join('')}</ol><details class="answer-reveal"><summary>Answer + explanation dekho</summary><div><strong>Correct: ${item.answer}</strong><p>${item.explanation}</p></div></details><label class="attempt-check"><input type="checkbox" data-question="${item.id}" ${attempted.has(item.id) ? 'checked' : ''}> Maine manually solve kiya</label></article>`).join('')
  document.querySelectorAll('[data-question]').forEach(input => input.onchange = () => { input.checked ? attempted.add(input.dataset.question) : attempted.delete(input.dataset.question); localStorage.setItem('da-m6-attempted', JSON.stringify([...attempted])); renderPractice() })
}

tabs.forEach(tab => tab.onclick = () => setView(tab.dataset.view))
buildToc('notes')
document.querySelector('#themeButton').onclick = () => { document.documentElement.classList.toggle('dark'); localStorage.setItem('da-theme', document.documentElement.classList.contains('dark') ? 'dark' : 'light') }
if (localStorage.getItem('da-theme') !== 'light') document.documentElement.classList.add('dark')
document.querySelector('#searchButton').onclick = () => { document.querySelector('.searchbox').classList.toggle('open'); document.querySelector('#search').focus() }
document.querySelector('#search').oninput = event => { const query = event.target.value.toLowerCase(); document.querySelectorAll('.view.active .searchable').forEach(item => item.classList.toggle('hidden', query && !item.textContent.toLowerCase().includes(query))) }
document.querySelectorAll('.codebox button').forEach(button => button.onclick = async () => { await navigator.clipboard.writeText(button.closest('.codebox').querySelector('code').innerText); const toast = document.querySelector('.toast'); toast.classList.add('show'); setTimeout(() => toast.classList.remove('show'), 900) })
const checks = [...document.querySelectorAll('[data-lecture]')]
const savedLectures = JSON.parse(localStorage.getItem('da-m6-lectures') || '[]')
function updateProgress() { const completed = checks.filter(item => item.checked).map(item => item.dataset.lecture); const percent = Math.round(100 * completed.length / checks.length); localStorage.setItem('da-m6-lectures', JSON.stringify(completed)); document.querySelector('#count').textContent = `${completed.length}/${checks.length}`; document.querySelector('#bar').style.width = `${percent}%`; document.querySelector('#lecturePercent').textContent = `${percent}%` }
checks.forEach(item => { item.checked = savedLectures.includes(item.dataset.lecture); item.onchange = updateProgress }); updateProgress()
practiceTopic.onchange = renderPractice; practiceDifficulty.onchange = renderPractice; renderPractice()
const sectionMap = { intro: 'intro', operations: 'operations', implementation: 'implementation', list: 'list', linked: 'linked', collections: 'collections', complexity: 'complexity', 'two-stacks': 'two-stacks', 'reverse-k': 'reverse-k', 'ticket-counter': 'ticket-counter', context: 'context' }
Object.entries(sectionMap).forEach(([sectionId, topicId]) => { const section = document.querySelector(`#${sectionId}`); const topic = module6Topics.find(item => item.id === topicId); if (section && topic) section.insertAdjacentHTML('beforeend', `<button class="topic-practice" data-practice-topic="${topicId}">Is topic ke ${topic.questions.length} questions solve karo →</button>`) })
document.querySelectorAll('[data-practice-topic]').forEach(button => button.onclick = () => { practiceTopic.value = button.dataset.practiceTopic; practiceDifficulty.value = 'all'; renderPractice(); setView('practice') })
document.querySelector('[data-jump="practice"]').onclick = () => setView('practice')
document.querySelector('#print').onclick = () => window.print()
document.querySelector('#menu').onclick = () => sidebar.classList.toggle('open')
toc.onclick = () => sidebar.classList.remove('open')
window.onscroll = () => { const max = document.documentElement.scrollHeight - innerHeight; document.querySelector('.read-progress span').style.width = `${max ? 100 * scrollY / max : 0}%` }
document.querySelector('.module-switch').insertAdjacentHTML('beforeend', '<a href="./module7.html">M07</a>')
