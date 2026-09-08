const q = (prompt, options, answer, explanation, difficulty = 'Core', pattern = 'MCQ') => ({ prompt, options, answer, explanation, difficulty, pattern })
const make = (id, label, items) => ({ id, label, number: id, questions: items.map((item, index) => ({ id: `m6-${id}-${index + 1}`, number: index + 1, ...item })) })

const repeat = (base, variants) => variants.map((variant, index) => q(
  variant.prompt || `${base} (${index + 1})`,
  variant.options,
  variant.answer,
  variant.explanation,
  variant.difficulty || 'Core',
  variant.pattern || 'MCQ · queue trace'
))

const intro = repeat('Queue basics', [
  { prompt: 'Queue ka removal rule kya hai?', options: ['LIFO', 'FIFO', 'Random', 'Smallest first'], answer: 'FIFO', explanation: 'Jo element sabse pehle enter hua tha, wahi front se pehle nikalta hai.', difficulty: 'Foundation' },
  { prompt: '10, 20, 30 isi order mein enqueue hue. Dequeue kya return karega?', options: ['10', '20', '30', 'None'], answer: '10', explanation: '10 oldest item hai aur FRONT par hai.', difficulty: 'Foundation' },
  { prompt: 'Queue mein insertion kis end par hoti hai?', options: ['Front', 'Rear', 'Middle', 'Dono ends same time'], answer: 'Rear', explanation: 'Standard queue mein enqueue REAR par hota hai.', difficulty: 'Foundation' },
  { prompt: 'Queue mein deletion kis end se hoti hai?', options: ['Front', 'Rear', 'Middle', 'Random'], answer: 'Front', explanation: 'Standard dequeue current FRONT ko remove karta hai.', difficulty: 'Foundation' },
  { prompt: 'First In First Out ka best example?', options: ['Undo history', 'Printer jobs arrival order', 'Function return', 'Balanced brackets'], answer: 'Printer jobs arrival order', explanation: 'Jo job pehle aayi use pehle service milti hai.', difficulty: 'Core' },
  { prompt: 'MSQ: Queue ke baare mein correct statements?', options: ['Oldest item FRONT par hota hai', 'Newest item REAR par hota hai', 'dequeue REAR se hota hai', 'enqueue REAR par hota hai'], answer: 'Oldest item FRONT par hota hai; Newest item REAR par hota hai; enqueue REAR par hota hai', explanation: 'Standard queue FIFO hoti hai: insert rear, delete front.', difficulty: 'Practice', pattern: 'MSQ · properties' },
  { prompt: 'Empty queue par dequeue attempt ko kya kehte hain?', options: ['Overflow', 'Underflow', 'Collision', 'Traversal'], answer: 'Underflow', explanation: 'Remove karne ke liye queue mein koi item hi nahi hai.', difficulty: 'Foundation' },
  { prompt: 'Stack aur queue removal rule pair?', options: ['LIFO, FIFO', 'FIFO, LIFO', 'FIFO, FIFO', 'LIFO, LIFO'], answer: 'LIFO, FIFO', explanation: 'Stack latest item nikalta hai; queue oldest.', difficulty: 'Core' }
])

const operations = repeat('Queue operations', [
  { prompt: 'Empty se enqueue(10), enqueue(20), dequeue(), enqueue(30). Final FRONT → REAR?', options: ['10 → 20', '20 → 30', '10 → 30', '30 → 20'], answer: '20 → 30', explanation: '10 dequeue hua; 20 oldest remaining FRONT hai.', difficulty: 'Core' },
  { prompt: '[10,20,30] FRONT → REAR par front/peek ka result?', options: ['10', '20', '30', 'None'], answer: '10', explanation: 'front/peek queue ko change kiye bina oldest item read karta hai.', difficulty: 'Foundation' },
  { prompt: '[10,20,30] par dequeue ke baad FRONT?', options: ['10', '20', '30', 'None'], answer: '20', explanation: '10 remove hua, isliye 20 new FRONT.', difficulty: 'Core' },
  { prompt: 'enqueue operation state ko change karta hai?', options: ['Haan, REAR par item add', 'Nahi', 'Sirf FRONT change', 'Sirf size read'], answer: 'Haan, REAR par item add', explanation: 'Naya item newest hota hai, isliye REAR ban jaata hai.', difficulty: 'Foundation' },
  { prompt: 'front() state ko change karta hai?', options: ['Haan, item remove', 'Nahi, sirf read', 'Queue reverse', 'Rear clear'], answer: 'Nahi, sirf read', explanation: 'front/peek aur dequeue ko mix mat karo.', difficulty: 'Foundation' },
  { prompt: 'NAT: enqueue 1,2,3; dequeue twice; enqueue 4. Final size?', options: ['NAT · integer'], answer: '2', explanation: '1 and 2 remove; [3,4] bachta hai.', difficulty: 'Core', pattern: 'NAT · trace' },
  { prompt: 'Fixed capacity 3 queue [1,2,3] par enqueue(4)?', options: ['Underflow', 'Overflow', 'Peek', 'No effect'], answer: 'Overflow', explanation: 'Fixed queue full hai.', difficulty: 'Foundation' },
  { prompt: 'MSQ: Queue contents unchanged after?', options: ['front()', 'is_empty()', 'size()', 'dequeue()'], answer: 'front(); is_empty(); size()', explanation: 'Ye observe operations hain; dequeue state change karta hai.', difficulty: 'Practice', pattern: 'MSQ · mutation' }
])

const implementation = repeat('Queue implementation', [
  { prompt: 'Queue ADT kya define karta hai?', options: ['FIFO behavior', 'Only Python list syntax', 'Only linked nodes', 'Sorted order'], answer: 'FIFO behavior', explanation: 'ADT rule define karta hai; storage list/deque/linked list ho sakta hai.', difficulty: 'Core' },
  { prompt: 'Python list queue mein enqueue ka natural end?', options: ['Right end append', 'Index 0 only', 'Middle', 'Sorted insertion'], answer: 'Right end append', explanation: 'append right endpoint par amortized O(1) hota hai.', difficulty: 'Foundation' },
  { prompt: 'Python list queue mein dequeue ke liye pop(0) ka cost?', options: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'], answer: 'O(n)', explanation: 'Bache hue references left shift hote hain.', difficulty: 'Core' },
  { prompt: 'collections.deque queue mapping?', options: ['append + popleft', 'append + pop', 'appendleft + pop', 'sort + pop'], answer: 'append + popleft', explanation: 'Right par enqueue aur left/front se dequeue FIFO banata hai.', difficulty: 'Foundation' },
  { prompt: 'Linked-list queue O(1) operations ke liye kaunse references useful?', options: ['head and tail', 'Only middle', 'Only sorted key', 'No reference'], answer: 'head and tail', explanation: 'head=FRONT, tail=REAR direct available rehte hain.', difficulty: 'Core' },
  { prompt: 'MSQ: Same logical queue ko implement kar sakte hain?', options: ['list', 'deque', 'linked list with head/tail', 'stack without change'], answer: 'list; deque; linked list with head/tail', explanation: 'Storage alag ho sakta hai; FIFO contract same rehna chahiye.', difficulty: 'Practice', pattern: 'MSQ · abstraction' },
  { prompt: 'Implementation choose karte waqt primary check?', options: ['Endpoint operation costs', 'Variable name', 'Color theme', 'Values sorted hain'], answer: 'Endpoint operation costs', explanation: 'Queue ke active endpoints FRONT aur REAR hain.', difficulty: 'Core' },
  { prompt: 'List ka left endpoint costly kyun?', options: ['All remaining items shift', 'List never stores values', 'Python has no index 0', 'Front undefined'], answer: 'All remaining items shift', explanation: 'pop(0) ke baad index positions compact karni padti hain.', difficulty: 'Core' },
  { prompt: 'Python mein priority queue implement karne ke liye standard module?', options: ['heapq', 'asyncio', 'queue only', 'string'], answer: 'heapq', explanation: 'heapq smallest-priority item first deta hai; normal FIFO queue nahi.', difficulty: 'Core', pattern: 'MCQ · module selection' },
  { prompt: 'Cross-thread producer-consumer communication ke liye suitable module?', options: ['queue', 'heapq', 'collections.deque only', 'math'], answer: 'queue', explanation: 'queue module locking aur blocking support deta hai; basic DSA trace se iska use-case alag hai.', difficulty: 'Practice', pattern: 'MCQ · systems context' },
  { prompt: 'async/await tasks ke beech queued coordination ke liye?', options: ['asyncio.Queue', 'list.pop(0) only', 'stack', 'hash table'], answer: 'asyncio.Queue', explanation: 'asyncio asynchronous program context ke liye queue primitives provide karta hai.', difficulty: 'Practice', pattern: 'MCQ · async context' }
])

const listImpl = repeat('Queue using list', [
  { prompt: 'List queue mein enqueue(x) ka code?', options: ['queue.append(x)', 'queue.pop(0)', 'queue.appendleft(x)', 'queue[-1]'], answer: 'queue.append(x)', explanation: 'Right end par newest item add hota hai.', difficulty: 'Foundation' },
  { prompt: 'List queue mein dequeue ka code?', options: ['queue.pop(0)', 'queue.pop()', 'queue.append()', 'queue[-1]'], answer: 'queue.pop(0)', explanation: 'Index 0 ko FRONT maana hai.', difficulty: 'Foundation' },
  { prompt: 'q=[10,20]; q.append(30); q.pop(0). q?', options: ['[10,20]', '[20,30]', '[10,30]', '[30]'], answer: '[20,30]', explanation: '30 rear par add; 10 front se remove.', difficulty: 'Core' },
  { prompt: 'List queue mein front_peek() without removal kis item ko return karta hai?', options: ['FRONT: queue[0]', 'REAR: queue[-1]', 'queue.pop(0)', 'Queue ka size'], answer: 'FRONT: queue[0]', explanation: 'front_peek() sirf oldest / FRONT item read karta hai; queue change nahi hoti.', difficulty: 'Foundation' },
  { prompt: 'q=[10,20,30] mein rear_peek() return kare toh kya result aur state hogi?', options: ['30; q unchanged', '10; q unchanged', '30; q becomes [10,20]', '10; q becomes [20,30]'], answer: '30; q unchanged', explanation: 'REAR last item 30 hai. rear_peek() remove nahi karta.', difficulty: 'Foundation' },
  { prompt: 'q=[] par q.pop(0) without guard?', options: ['None', 'IndexError', 'False', '0'], answer: 'IndexError', explanation: 'Empty list ka index 0 exist nahi karta.', difficulty: 'Core' },
  { prompt: 'n dequeues using list pop(0) ka total worst time?', options: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'], answer: 'O(n²)', explanation: 'n + (n-1) + ... shifting cost aata hai.', difficulty: 'Practice' },
  { prompt: 'NAT: q=[4,7,9]; x=q.pop(0); q.append(x). New FRONT?', options: ['NAT · integer'], answer: '7', explanation: '4 rear par chala gaya; queue [7,9,4].', difficulty: 'Core', pattern: 'NAT · rotation' },
  { prompt: 'List queue practical for frequent huge dequeue workload?', options: ['deque better', 'Always list best', 'Only recursion', 'Impossible'], answer: 'deque better', explanation: 'deque.popleft O(1), list.pop(0) O(n).', difficulty: 'Practice' }
])

const linkedImpl = repeat('Queue using linked list', [
  { prompt: 'Linked queue mein FRONT normally kis reference par?', options: ['head', 'tail', 'middle', 'None'], answer: 'head', explanation: 'Oldest node head se direct remove hota hai.', difficulty: 'Foundation' },
  { prompt: 'Linked queue mein REAR normally kis reference par?', options: ['head', 'tail', 'previous only', 'data'], answer: 'tail', explanation: 'New node tail ke baad attach hota hai.', difficulty: 'Foundation' },
  { prompt: 'Empty linked queue enqueue(10) ke baad head aur tail?', options: ['Both new node', 'head None', 'tail None', 'Different nodes'], answer: 'Both new node', explanation: 'Single node simultaneously front aur rear hai.', difficulty: 'Core' },
  { prompt: 'head→10→20, tail→20. enqueue(30) ka correct order?', options: ['tail.next=new; tail=new', 'head=new only', 'new.next=head; head=new', 'tail=None'], answer: 'tail.next=new; tail=new', explanation: '30 old tail 20 ke baad link hota hai, phir REAR shift hota hai.', difficulty: 'Core' },
  { prompt: 'head→10→20 par dequeue ke baad head?', options: ['10', '20', 'None', 'tail'], answer: '20', explanation: 'head=head.next se old front 10 logical queue se remove.', difficulty: 'Foundation' },
  { prompt: 'Single-node linked queue dequeue ke baad tail ko None kyun?', options: ['Queue empty hai', 'Tail always old node', 'Cycle banana hai', 'Complexity O(n)'], answer: 'Queue empty hai', explanation: 'Head None hone par stale tail reference allowed nahi.', difficulty: 'Core' },
  { prompt: 'Linked queue enqueue/dequeue time with head+tail?', options: ['Both O(1)', 'Both O(n)', 'enqueue O(n), dequeue O(1)', 'enqueue O(1), dequeue O(n)'], answer: 'Both O(1)', explanation: 'Traversal nahi; references direct hain.', difficulty: 'Core' },
  { prompt: 'MSQ: Linked queue empty-state invariant?', options: ['head is None', 'tail is None', 'head and tail both None', 'tail.next points head'], answer: 'head is None; tail is None; head and tail both None', explanation: 'Non-circular simple queue mein empty state dono references None hai.', difficulty: 'Practice', pattern: 'MSQ · invariant' }
])

const dequeImpl = repeat('Queue using collections', [
  { prompt: 'deque import statement?', options: ['from collections import deque', 'from math import deque', 'import queue as deque', 'from list import deque'], answer: 'from collections import deque', explanation: 'deque collections module mein defined hai.', difficulty: 'Foundation' },
  { prompt: 'deque queue enqueue/dequeue pair?', options: ['append, popleft', 'append, pop', 'appendleft, pop', 'insert, remove'], answer: 'append, popleft', explanation: 'Same logical direction maintain karo: right=rear, left=front.', difficulty: 'Foundation' },
  { prompt: 'd=deque([10,20]); d.append(30); d.popleft(). Final?', options: ['deque([10,20])', 'deque([20,30])', 'deque([10,30])', 'deque([30])'], answer: 'deque([20,30])', explanation: '10 old FRONT remove hua.', difficulty: 'Core' },
  { prompt: 'deque queue front read without deletion?', options: ['d[0]', 'd[-1]', 'd.popleft()', 'd.pop()'], answer: 'd[0]', explanation: 'Left end ko FRONT maana hai.', difficulty: 'Foundation' },
  { prompt: 'appendleft + pop pair FIFO queue bana sakti hai?', options: ['Yes', 'No', 'Only one item', 'Only sorted data'], answer: 'Yes', explanation: 'New items left/rear side se add aur old items right/front side se remove honge; direction reverse hai but FIFO stays.', difficulty: 'Core' },
  { prompt: 'deque endpoint operations expected cost?', options: ['O(1)', 'O(n)', 'O(log n)', 'O(n²)'], answer: 'O(1)', explanation: 'deque endpoints ke liye designed hai.', difficulty: 'Core' },
  { prompt: 'deque arbitrary middle indexing primary use-case hai?', options: ['No', 'Yes, always O(1)', 'Only for queue', 'Required for BFS'], answer: 'No', explanation: 'Queue ko endpoints chahiye; middle random access ka benefit nahi.', difficulty: 'Practice' },
  { prompt: 'MSQ: Queue using deque ke safe guards?', options: ['if not d before popleft', 'front d[0] before empty check unsafe', 'append changes rear', 'popleft changes front'], answer: 'if not d before popleft; front d[0] before empty check unsafe; append changes rear; popleft changes front', explanation: 'Empty deque par indexing/popleft error ho sakta hai.', difficulty: 'Practice', pattern: 'MSQ · Python edge' }
])

const complexity = repeat('Queue complexity', [
  { prompt: 'deque append/popleft ka time?', options: ['O(1), O(1)', 'O(n), O(1)', 'O(1), O(n)', 'O(n), O(n)'], answer: 'O(1), O(1)', explanation: 'Endpoint operations constant time.', difficulty: 'Core' },
  { prompt: 'List append/pop(0) time pair?', options: ['amortized O(1), O(n)', 'O(n), O(1)', 'O(1), O(1)', 'O(log n), O(log n)'], answer: 'amortized O(1), O(n)', explanation: 'Front pop shifts remaining references.', difficulty: 'Core' },
  { prompt: 'Linked head/tail queue enqueue/dequeue?', options: ['O(1), O(1)', 'O(n), O(1)', 'O(1), O(n)', 'O(n²), O(n)'], answer: 'O(1), O(1)', explanation: 'Tail append aur head remove direct references se hote hain.', difficulty: 'Core' },
  { prompt: 'n queue items store karne ka space?', options: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'], answer: 'O(n)', explanation: 'Har queued item memory leta hai.', difficulty: 'Foundation' },
  { prompt: 'Ek dequeue method ka auxiliary space?', options: ['O(1)', 'O(n)', 'O(log n)', 'O(n²)'], answer: 'O(1)', explanation: 'Sirf fixed temporary variables/references.', difficulty: 'Core' },
  { prompt: 'NAT: n items list queue se pop(0) repeatedly: total shifts?', options: ['NAT · expression'], answer: 'n(n-1)/2', explanation: 'First removal n-1 shifts, last removal 0; sum arithmetic series.', difficulty: 'Practice', pattern: 'NAT · aggregate' },
  { prompt: 'Circular array queue full/empty ambiguity avoid karne ka common rule?', options: ['One slot empty rakhna', 'Always sort', 'Use stack', 'No front'], answer: 'One slot empty rakhna', explanation: 'front==rear empty aur full dono na lage; alternatively size counter use kar sakte hain.', difficulty: 'Practice' },
  { prompt: 'GATE trap: “Queue operation O(1)” statement kab incomplete hai?', options: ['Implementation unspecified ho', 'Queue has no elements', 'FIFO false ho', 'Only integers'], answer: 'Implementation unspecified ho', explanation: 'List pop(0) O(n), deque/linked-head-tail O(1).', difficulty: 'Practice' }
])

const queueUsingStack = repeat('Queue using stacks', [
  { prompt: 'Do stacks se queue banane ka aim?', options: ['FIFO simulate', 'LIFO double', 'Sort values', 'Remove rear only'], answer: 'FIFO simulate', explanation: 'Two LIFO structures ko combine karke oldest item nikalte hain.', difficulty: 'Foundation' },
  { prompt: 'Costly-dequeue method: enqueue kahan push?', options: ['s1', 's2 only', 'Both', 'Nowhere'], answer: 's1', explanation: 'New arrivals s1 mein collect hote hain.', difficulty: 'Core' },
  { prompt: 'Costly-dequeue method mein dequeue ke liye items kahan transfer?', options: ['s1 to s2', 's2 to s1 never', 'Queue to array', 'tail to head'], answer: 's1 to s2', explanation: 'Reversal ke baad oldest s2 TOP par aata hai.', difficulty: 'Core' },
  { prompt: 'Amortized two-stack queue mein dequeue before transfer kya check?', options: ['s2 empty?', 's1 sorted?', 'both full?', 'front None only'], answer: 's2 empty?', explanation: 's2 mein old items already correct dequeue order mein ho sakte hain.', difficulty: 'Core' },
  { prompt: 's1 bottom→top [10,20,30], s2 empty. Transfer ke baad s2 TOP?', options: ['10', '20', '30', 'None'], answer: '10', explanation: '30,20,10 pop/push ke baad 10 s2 TOP par hota hai.', difficulty: 'Core' },
  { prompt: 'Two-stack queue enqueue amortized cost?', options: ['O(1)', 'O(n) always', 'O(n²)', 'O(log n)'], answer: 'O(1)', explanation: 'Each item s1 mein once push aur at most once s1→s2 transfer hota hai.', difficulty: 'Practice' },
  { prompt: 'Two-stack queue dequeue worst-case cost?', options: ['O(1)', 'O(n)', 'O(log n)', 'O(n²)'], answer: 'O(n)', explanation: 'Agar s2 empty hai, many items transfer ho sakte hain.', difficulty: 'Practice' },
  { prompt: 'MSQ: Amortized proof ka key?', options: ['Each item transfers at most once', 'Every dequeue transfers all items', 's2 preserves old order', 'No item moves'], answer: 'Each item transfers at most once; s2 preserves old order', explanation: 'Total transfers across sequence linear hote hain.', difficulty: 'Practice', pattern: 'MSQ · amortized' }
])

const reverseK = repeat('Reverse first K', [
  { prompt: 'First k queue elements reverse karne ke liye main helper DS?', options: ['Stack', 'Hash table', 'Heap', 'Binary search'], answer: 'Stack', explanation: 'Stack first k elements ko reverse removal order mein deta hai.', difficulty: 'Foundation' },
  { prompt: 'Queue [10,20,30,40,50], k=3 ka result?', options: ['30,20,10,40,50', '10,20,30,50,40', '50,40,30,20,10', '20,10,30,40,50'], answer: '30,20,10,40,50', explanation: 'First 3 reverse; remaining order same.', difficulty: 'Core' },
  { prompt: 'First phase mein kitne elements dequeue karke stack mein push?', options: ['k', 'n', 'n-k', '0'], answer: 'k', explanation: 'Exactly first k elements reverse block hain.', difficulty: 'Foundation' },
  { prompt: 'Stack se pop karke queue mein append karne ka effect?', options: ['First k reverse ho jaate', 'Queue unchanged', 'All sort', 'Front lost'], answer: 'First k reverse ho jaate', explanation: 'LIFO pop order original first-k ka reverse hota hai.', difficulty: 'Core' },
  { prompt: 'Remaining n-k elements ko rotate kyun karte hain?', options: ['Reversed block ko front par laane ke liye', 'Delete ke liye', 'Sort ke liye', 'Capacity grow'], answer: 'Reversed block ko front par laane ke liye', explanation: 'Stack pops rear par append hue; remaining original elements temporarily front par aa gaye.', difficulty: 'Core' },
  { prompt: 'k=0 valid case mein expected queue?', options: ['Unchanged', 'Empty', 'Fully reverse', 'Error always'], answer: 'Unchanged', explanation: 'Zero elements reverse karne hain.', difficulty: 'Practice' },
  { prompt: 'k>n par correct handling?', options: ['Reject/guard invalid k', 'Silently reverse n always', 'Infinite loop', 'Dequeue empty'], answer: 'Reject/guard invalid k', explanation: 'Algorithm se pehle range validate karo.', difficulty: 'Practice' },
  { prompt: 'Time and auxiliary space for reverse first k?', options: ['O(n), O(k)', 'O(k), O(1)', 'O(n²), O(n)', 'O(1), O(k)'], answer: 'O(n), O(k)', explanation: 'k moves plus n-k rotations; stack stores k values.', difficulty: 'Core' }
])

const ticketCounter = repeat('Ticket counter', [
  { prompt: 'Ticket counter queue mein customer selection?', options: ['Arrival order', 'Latest arrival', 'Random', 'Highest ID'], answer: 'Arrival order', explanation: 'Normal counter FIFO service model hai.', difficulty: 'Foundation' },
  { prompt: 'A,B,C aaye; A serve; D arrives. Next serve?', options: ['B', 'D', 'C', 'A'], answer: 'B', explanation: 'Queue state B,C,D; B oldest remaining hai.', difficulty: 'Core' },
  { prompt: 'Customer service complete karna queue operation?', options: ['dequeue', 'enqueue', 'peek only', 'push'], answer: 'dequeue', explanation: 'FRONT customer queue se nikalta hai.', difficulty: 'Foundation' },
  { prompt: 'New customer arrival operation?', options: ['enqueue at rear', 'dequeue front', 'pop top', 'sort'], answer: 'enqueue at rear', explanation: 'Newest arrival REAR par jata hai.', difficulty: 'Foundation' },
  { prompt: 'Single server, each ticket takes 2 min. A,B,C line; A starts at t=0. C start time?', options: ['0', '2', '4', '6'], answer: '4', explanation: 'A 0–2, B 2–4, C starts 4.', difficulty: 'Core' },
  { prompt: 'Queue empty aur counter calls next customer?', options: ['Underflow / no customer', 'Overflow', 'Serve old customer', 'Rear increments'], answer: 'Underflow / no customer', explanation: 'No FRONT customer exists.', difficulty: 'Core' },
  { prompt: 'NAT: 4 customers, each 3 min, first starts t=0. Fourth starts?', options: ['NAT · integer'], answer: '9', explanation: 'First 0, second 3, third 6, fourth 9.', difficulty: 'Practice', pattern: 'NAT · schedule' },
  { prompt: 'Priority queue ticket counter ka behavior normal FIFO se kaise alag?', options: ['Priority may overtake arrival order', 'Always same', 'Uses LIFO', 'Cannot serve'], answer: 'Priority may overtake arrival order', explanation: 'Priority condition extra rule add karti hai.', difficulty: 'Practice' }
])

const context = repeat('DS context', [
  { prompt: 'BFS ka natural frontier DS?', options: ['Queue', 'Stack', 'Set only', 'Recursion only'], answer: 'Queue', explanation: 'FIFO se same-level nodes pehle expand hote hain.', difficulty: 'Foundation' },
  { prompt: 'DFS iterative ka natural frontier DS?', options: ['Stack', 'Queue', 'Heap only', 'String'], answer: 'Stack', explanation: 'Latest discovered path pehle explore hota hai.', difficulty: 'Foundation' },
  { prompt: 'Normal printer jobs ke liye?', options: ['Queue', 'Stack', 'Hash table', 'Linked list only'], answer: 'Queue', explanation: 'Arrival order service FIFO hai.', difficulty: 'Core' },
  { prompt: 'Undo history ke liye?', options: ['Stack', 'Queue', 'Priority queue', 'Binary tree'], answer: 'Stack', explanation: 'Latest action first undo hota hai.', difficulty: 'Core' },
  { prompt: 'Circular queue ka common benefit?', options: ['Freed array slots reuse', 'Middle indexing O(1)', 'LIFO', 'No front needed'], answer: 'Freed array slots reuse', explanation: 'Rear wrap-around karke earlier freed positions use kar sakta hai.', difficulty: 'Core' },
  { prompt: 'Deque normal queue se kya extra deta hai?', options: ['Both ends insert/remove', 'Only LIFO', 'No endpoints', 'Sorting'], answer: 'Both ends insert/remove', explanation: 'Double-ended queue mein front/rear dono active operations supported.', difficulty: 'Core' },
  { prompt: '2024 direct PYQ: FIFO kis DS se match hua?', options: ['Queue', 'Stack', 'Hash table', 'Tree'], answer: 'Queue', explanation: 'GATE DA 2024 Q16 mein FIFO → Queue mapping direct test hui.', difficulty: 'Practice', pattern: 'PYQ · 2024 Q16' },
  { prompt: '2024 direct PYQ deque trace final a?', options: ['10', '32', '17', '28'], answer: '17', explanation: 'insertFirst(10), insertLast(32), removeFirst→10, insertLast(28), insertLast(17), removeFirst→32, removeLast→17.', difficulty: 'Practice', pattern: 'PYQ · 2024 Q32' }
])

const mixed = repeat('Mixed queue drill', [
  { prompt: 'Queue [1,2,3], dequeue then enqueue(4), dequeue return?', options: ['1', '2', '3', '4'], answer: '2', explanation: 'First dequeue removes 1; queue [2,3,4].', difficulty: 'Core' },
  { prompt: 'Queue [5,6,7], three dequeues output?', options: ['5,6,7', '7,6,5', '6,5,7', '5,7,6'], answer: '5,6,7', explanation: 'FIFO preserves arrival order.', difficulty: 'Foundation' },
  { prompt: 'Two stack queue: s1 top 30, s2 top 10. Next dequeue?', options: ['10', '30', 'None', '20'], answer: '10', explanation: 's2 has existing oldest items; do not transfer s1 while s2 nonempty.', difficulty: 'Practice' },
  { prompt: 'Circular queue capacity 5, one-empty-slot design: max stored?', options: ['5', '4', '3', '6'], answer: '4', explanation: 'One slot is intentionally reserved to distinguish full from empty.', difficulty: 'Practice' },
  { prompt: 'List vs deque: frequent left removal?', options: ['deque', 'list pop(0)', 'tuple', 'set'], answer: 'deque', explanation: 'deque.popleft avoids O(n) shifting.', difficulty: 'Core' },
  { prompt: 'MSQ: Queue semantic invariants?', options: ['FRONT is next dequeue', 'REAR is last enqueue', 'New arrival overtakes front', 'dequeue order FIFO'], answer: 'FRONT is next dequeue; REAR is last enqueue; dequeue order FIFO', explanation: 'Arrival order preserves service order.', difficulty: 'Practice', pattern: 'MSQ · invariants' },
  { prompt: 'NAT: reverse first 2 of [1,2,3,4], then dequeue gives?', options: ['NAT · integer'], answer: '2', explanation: 'Result [2,1,3,4]; front is 2.', difficulty: 'Practice', pattern: 'NAT · application' },
  { prompt: 'A* frontier priority queue is normal FIFO queue?', options: ['No', 'Yes', 'Only one node', 'Always stack'], answer: 'No', explanation: 'Priority queue removes by priority, not plain arrival order.', difficulty: 'Core' }
])

export const module6Topics = [
  make('intro', '6.1 · Introduction to Queues', intro),
  make('operations', '6.2 · Common Operations in Queues', operations),
  make('implementation', '6.3 · Implementation of Queues', implementation),
  make('list', '6.3.1 · Implementing Queue using List', listImpl),
  make('linked', '6.3.2 · Implementing Queue using Linked List', linkedImpl),
  make('collections', '6.3.3 · Implementing Queue using Collections module', dequeImpl),
  make('complexity', '6.4 · Queue Complexity Analysis', complexity),
  make('two-stacks', '6.5.1 · Queue using Stack', queueUsingStack),
  make('reverse-k', '6.5.2 · Reverse first K in a Queue', reverseK),
  make('ticket-counter', '6.5.3 · Ticket Counter', ticketCounter),
  make('context', '6.6 · DS Context', context),
  make('mixed', 'Mixed GATE Practice · Queue', mixed)
]

export const module6QuestionCount = module6Topics.reduce((total, topic) => total + topic.questions.length, 0)
