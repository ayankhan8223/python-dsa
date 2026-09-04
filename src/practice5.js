const q=(prompt,options,answer,explanation,difficulty='Core',pattern='MCQ')=>({prompt,options,answer,explanation,difficulty,pattern})
const make=(id,label,items)=>({id,label,number:id,questions:items.map((item,index)=>({id:`m5-${id}-${index+1}`,number:index+1,...item}))})

const intro=[
q('Stack ka removal rule?',['FIFO','LIFO','Smallest first','Random'],'LIFO','Last pushed item current TOP hota hai aur pehle pop hota hai.','Foundation','MCQ · definition'),
q('10,20,30 isi order mein push hue. Pehla pop?',['10','20','30','None'],'30','30 last enter hua aur TOP par hai.','Foundation','MCQ · order'),
q('“Restricted access” ka exact meaning?',['No data','Standard insert/delete sirf TOP se','Only integers','Always fixed size'],'Standard insert/delete sirf TOP se','Middle item standard stack operation se directly remove nahi hota.','Core','MCQ · ADT'),
q('Capacity 3 stack [1,2,3] par push(4)?',['Underflow','Overflow','Peek','Rebinding'],'Overflow','Full fixed-capacity stack par extra push overflow hai.','Foundation','MCQ · overflow'),
q('Empty stack par pop attempt?',['Overflow','Underflow','Traversal','Collision'],'Underflow','Remove karne ke liye TOP item exist nahi.','Foundation','MCQ · underflow'),
q('MSQ: True statements?',['Push TOP badal sakta','Peek removes','Pop TOP return kar sakta','LIFO removal'],'Push TOP badal sakta; Pop TOP return kar sakta; LIFO removal','Peek state change nahi karta.','Practice','MSQ · properties')]

const operations=[
q('Empty se push(1),push(2),pop(),push(3),push(4),pop(). Final bottom→top?',['[1,2]','[1,3]','[3,4]','[1]'],'[1,3]','2 aur 4 pop hue; 1,3 remain.','Core','MCQ · exact trace'),
q('Upar wale trace ke pop values kis order mein?',['2,4','4,2','1,3','3,1'],'2,4','Har pop us waqt ka TOP remove karta hai.','Core','MCQ · returns'),
q('[5,8,11] par peek(),pop(),peek() outputs?',['11,11,8','11,8,8','5,11,8','11,11,11'],'11,11,8','Peek no removal; pop 11; new TOP 8.','Core','MCQ · state'),
q('NAT: push(7),push(9),peek(),pop(),push(2) ke baad size?',['NAT · integer'],'2','Final stack [7,2].','Foundation','NAT · size'),
q('is_empty() kab True?',['TOP exists','Size zero','Full','One item'],'Size zero','Empty state mein TOP element nahi.','Foundation','MCQ · empty'),
q('MSQ: Contents unchanged?',['peek','size','is_empty','pop'],'peek; size; is_empty','Queries observe; pop removes.','Core','MSQ · mutation')]

const implementation=[
q('Stack ADT vs implementation?',['Behavior vs storage technique','Same code','ADT only list','Only theory'],'Behavior vs storage technique','LIFO rule ADT; list/deque/links storage choices.','Core','MCQ · abstraction'),
q('Python list stack ka efficient TOP?',['Index 0','Right end','Middle','Sorted position'],'Right end','append/pop shifting avoid karte hain.','Foundation','MCQ · endpoint'),
q('deque right-end stack ke push/pop?',['appendleft/popleft','append/pop','insert/remove','extend/sort'],'append/pop','Same endpoint LIFO preserve karta hai.','Foundation','MCQ · deque'),
q('Linked stack O(1) push/pop ke liye TOP?',['Tail without prev','Head','Middle','Unknown'],'Head','Head reference directly available.','Core','MCQ · links'),
q('MSQ: Same logical stack ka storage?',['list','deque','TOP→linked nodes','sorted set'],'list; deque; TOP→linked nodes','Representation different, LIFO same.','Core','MSQ · representation'),
q('Implementation choice ka main criterion?',['Variable names','Endpoint costs + required operations','IDE','Even values'],'Endpoint costs + required operations','Storage operation cost decide karta hai.','Practice','MCQ · selection')]

const listImpl=[
q('List stack push code?',['stack.append(x)','stack.insert(0,x) only','stack.extend(x)','stack.sort()'],'stack.append(x)','Right end new TOP.','Foundation','MCQ · push'),
q('TOP read without removal?',['stack[0]','stack[-1]','stack.pop(0)','len(stack)'],'stack[-1]','-1 last item select karta hai.','Foundation','MCQ · peek'),
q('List append complexity?',['Always O(1)','Amortized O(1), resize O(n)','O(log n)','O(n²)'],'Amortized O(1), resize O(n)','Occasional capacity growth copies references.','Core','MCQ · amortized'),
q('Index 0 TOP banane ka push/pop worst cost?',['O(1)','O(log n)','O(n)','O(n log n)'],'O(n)','Remaining references shift karte hain.','Core','MCQ · shift'),
q('Empty list pop() result?',['None','IndexError','False','0'],'IndexError','Guard absent ho toh Python raises IndexError.','Core','MCQ · edge'),
q('NAT: s=[2,4];s.append(6);x=s.pop(); print(x+s[-1])',['NAT · integer'],'10','x=6, new TOP 4.','Practice','NAT · Python')]

const dequeImpl=[
q('deque import?',['from collections import deque','from math import deque','import stack','from list import deque'],'from collections import deque','deque collections module mein hai.','Foundation','MCQ · import'),
q('deque([1,2]); append(3); pop(). Final?',['deque([1,2])','deque([2,3])','deque([1])','empty'],'deque([1,2])','3 push then pop.','Foundation','MCQ · trace'),
q('Same-end deque append/pop time?',['O(1)','O(n)','O(log n)','O(n²)'],'O(1)','Endpoint operations constant time.','Core','MCQ · complexity'),
q('Right TOP deque peek?',['d[-1]','d[0] only','d.pop()','d.clear()'],'d[-1]','Last value read, no removal.','Foundation','MCQ · peek'),
q('appendleft+popleft consistently stack bana sakte?',['Yes','No','Only sorted','One item'],'Yes','Same left endpoint LIFO preserve karta hai.','Core','MCQ · endpoint'),
q('MSQ: deque advantages?',['Efficient endpoints','Efficient index-0 ops','Best arbitrary middle indexing','Clear LIFO endpoint API'],'Efficient endpoints; Efficient index-0 ops; Clear LIFO endpoint API','Middle indexing deque ka main purpose nahi.','Practice','MSQ · choice')]

const linkedImpl=[
q('TOP→20→10 par push(30) ki first link assignment?',['self.top=node first','node.next=self.top','20.next=30','10.next=30'],'node.next=self.top','Old TOP reference pehle save.','Core','MCQ · order'),
q('Phir self.top=node ka effect?',['20 deleted','TOP→30','30.next=None','Cycle'],'TOP→30','Chain 30→20→10 safe.','Core','MCQ · shift'),
q('TOP→30→20 par pop ke baad TOP?',['30','20','None','10'],'20','self.top=self.top.next.','Foundation','MCQ · pop'),
q('self.top=node pehle; node.next=self.top baad mein?',['Correct','Node self-loop','Old top restored','Syntax error'],'Node self-loop','self.top already node; old chain lose.','Practice','MCQ · pointer trap'),
q('Linked stack node overhead?',['None','One next reference/object overhead','n indexes','Matrix'],'One next reference/object overhead','Data ke saath successor reference store hota hai.','Core','MCQ · space'),
q('MSQ: Linked push O(1) reasons?',['TOP known','No traversal','Constant link assignments','Sortedness'],'TOP known; No traversal; Constant link assignments','Sortedness irrelevant.','Core','MSQ · complexity')]

const complexity=[
q('n pushes + n pops on deque total?',['O(1)','O(log n)','O(n)','O(n²)'],'O(n)','2n constant endpoint operations.','Core','MCQ · aggregate'),
q('n stored values ka stack storage?',['O(1)','O(log n)','O(n)','O(n²)'],'O(n)','Har item memory leta hai.','Foundation','MCQ · storage'),
q('One push ke temporary references auxiliary space?',['O(1)','O(n)','O(log n)','O(2ⁿ)'],'O(1)','Fixed local names.','Core','MCQ · auxiliary'),
q('f(n)→f(n−1) max call-stack depth?',['1','log n','About n+1','2ⁿ'],'About n+1','Base call included.','Core','MCQ · recursion'),
q('Naive Fibonacci: total calls exponential, active depth?',['Exponential','Linear','Constant','Factorial'],'Linear','Tree size time; longest path space.','Practice','MCQ · time/space'),
q('MSQ: Correct?',['list append amortized O(1)','deque pop O(1)','linked TOP pop O(1)','list pop(0) O(1)'],'list append amortized O(1); deque pop O(1); linked TOP pop O(1)','pop(0) shifts: O(n).','Practice','MSQ · costs')]

const applications=[
q('Latest function call pehle return kyun?',['Queue','Call stack LIFO','Sorted','Hashing'],'Call stack LIFO','Latest frame pehle pop.','Core','MCQ · calls'),
q('Iterative DFS frontier?',['Stack','Queue','Heap','Set'],'Stack','Latest unfinished path first.','Foundation','MCQ · DFS'),
q('Balanced brackets stack kyun?',['Oldest opening','Latest unmatched opening','Sort','Index'],'Latest unmatched opening','Nesting nearest opening se match.','Core','MCQ · parsing'),
q('Undo first removes?',['Oldest','Latest action','Random','All'],'Latest action','Undo LIFO history.','Foundation','MCQ · undo'),
q('Postfix operands temporarily?',['Stack','Queue only','Set','Graph'],'Stack','Operator latest operands pop karta hai.','Core','MCQ · postfix'),
q('Printer jobs arrival order ke liye stack?',['Best','Queue better','Required','Same'],'Queue better','Arrival order FIFO hai.','Core','MCQ · choose')]

const tradeoffs=[
q('Stack advantage?',['Middle delete','Simple efficient TOP ops','Sorted','No memory'],'Simple efficient TOP ops','Restricted interface LIFO work model karta hai.','Foundation','MCQ · pro'),
q('Stack limitation?',['No duplicates','No standard direct middle access','No push','Fixed only'],'No standard direct middle access','Access intentionally restricted.','Foundation','MCQ · con'),
q('Deep recursion risk?',['Collision','Call-stack overflow','Sorting','Aliasing'],'Call-stack overflow','Too many active frames.','Core','MCQ · risk'),
q('Frequent random index queries: stack best?',['Yes','No','Always deque','Only linked'],'No','Stack arbitrary access ke liye nahi.','Core','MCQ · suitability'),
q('Dynamic Python stack mein overflow?',['Memory infinite','Logical capacity absent, physical memory finite','Capacity 10','Means empty'],'Logical capacity absent, physical memory finite','Abstract question explicit capacity de sakta hai.','Practice','MCQ · model'),
q('MSQ: Stack natural?',['Nested calls','Backtracking','Undo','First-arrived scheduling'],'Nested calls; Backtracking; Undo','First-arrived is queue.','Core','MSQ · use')]

const reverse=[
q('GATE reverse using stack?',['GATE','ETAG','EGAT','TEGA'],'ETAG','Pops E,T,A,G.','Foundation','MCQ · reverse'),
q('Length n reverse time?',['O(1)','O(log n)','O(n)','O(n²)'],'O(n)','n pushes+n pops.','Core','MCQ · time'),
q('Auxiliary space?',['O(1)','O(n)','O(log n)','O(n²)'],'O(n)','n characters stack mein.','Core','MCQ · space'),
q('Empty string reverse?',['Error','Empty string','None','Space'],'Empty string','Loops zero times.','Foundation','MCQ · edge'),
q('NAT: "DATA" reverse ka first char ord?',['NAT · integer'],'65','ATAD ka first A; ord(A)=65.','Practice','NAT · Python'),
q('MSQ: True?',['Push left-to-right','Pop reverse order','Input must mutate','deque works'],'Push left-to-right; Pop reverse order; deque works','String immutable; result new.','Core','MSQ · reasoning')]

const parentheses=[
q('({[]}) balanced?',['Yes','No','Only braces','Error'],'Yes','Every closing TOP opening se matches; end empty.','Foundation','MCQ · valid'),
q('(] balanced?',['Yes','No','Empty','Depends'],'No','Type mismatch.','Foundation','MCQ · mismatch'),
q('(( invalid kyun?',['Early closing','Leftover openings','Empty','Even'],'Leftover openings','End stack non-empty.','Core','MCQ · leftover'),
q('Expression starts with ]: failure?',['Overflow','Empty stack closing','Sort','Late match'],'Empty stack closing','Opening unavailable.','Core','MCQ · early close'),
q('(not stack) or pair!=stack.pop() short-circuit benefit?',['Both run','Empty pop avoided','Sort','Push'],'Empty pop avoided','Left True ho toh RHS skipped.','Practice','MCQ · short circuit'),
q('MSQ: Balanced requirements?',['Type match','Nesting order','End stack empty','Odd count'],'Type match; Nesting order; End stack empty','All invariants required.','Core','MSQ · invariant')]

const undo=[
q('type A,type B,undo,type C result?',['ABC','AC','BC','C'],'AC','B pop; C push.','Foundation','MCQ · trace'),
q('Empty history undo safe behavior?',['Blind pop','Guard per specification','Push undo','Oldest'],'Guard per specification','Empty pop invalid.','Core','MCQ · edge'),
q('Redo common model?',['Queue','Undo+redo stacks','Set','None'],'Undo+redo stacks','Popped action redo stack par.','Core','MCQ · two stacks'),
q('NAT: type A,B,C,undo,undo; remaining count?',['NAT · integer'],'1','C then B removed.','Foundation','NAT · trace'),
q('New action after undo commonly redo history?',['Keep','Clear','Duplicate','Sort'],'Clear','New history branch.','Practice','MCQ · model'),
q('MSQ: Undo stack may store?',['Characters','Commands','Previous states','Only ints'],'Characters; Commands; Previous states','Representation contract-dependent.','Core','MSQ · representation')]

const context=[
q('BFS,DFS frontier pair?',['Stack,stack','Queue,stack','Heap,set','List,string'],'Queue,stack','BFS FIFO; DFS LIFO.','Foundation','MCQ · comparison'),
q('Infix A+B ka postfix?',['+AB','AB+','A+B','BA+'],'AB+','Operator operands ke baad.','Foundation','MCQ · notation'),
q('Prefix of (A+B)*C?',['AB+C*','*+ABC','ABC+*','+*ABC'],'*+ABC','Outer * then +AB then C.','Core','MCQ · prefix'),
q('Postfix 2 3 + 4 * value?',['14','20','24','9'],'20','2+3=5; 5*4=20.','Core','MCQ · evaluate'),
q('Postfix 8 3 - operand order?',['3−8','8−3','Either','Sorted'],'8−3','First pop right operand 3.','Practice','MCQ · order'),
q('Valid pop sequence core rule?',['Any permutation','Only current TOP pop','Ascending','Descending'],'Only current TOP pop','Required output TOP hona chahiye.','Core','MCQ · permutation')]

const mixed=[
q('a=[1,2];b=a;b.append(3). a?',['[1,2]','[1,2,3]','[3]','Error'],'[1,2,3]','Same mutable object.','Foundation','MCQ · alias'),
q('for i in range(n): for j in range(i): tight time?',['Θ(n)','Θ(nlogn)','Θ(n²)','Θ(n³)'],'Θ(n²)','Σi=n(n−1)/2.','Core','MCQ · loops'),
q('SLL head insertion time/aux?',['O(n)/O(n)','O(1)/O(1)','O(logn)/O(1)','O(1)/O(n)'],'O(1)/O(1)','Fixed reference updates.','Foundation','MCQ · linked'),
q('push1,push2,pop,push3 final TOP?',['1','2','3','None'],'3','2 popped; 3 pushed.','Foundation','MCQ · stack'),
q('s="gate";t=s.upper(); s?',['GATE','gate','None','Error'],'gate','String immutable.','Foundation','MCQ · string'),
q('NAT: range(0,10,3) iterations?',['NAT · integer'],'4','0,3,6,9.','Foundation','NAT · exact'),
q('MSQ true bounds?',['n=O(n²)','n²=Ω(n)','n²=Θ(n³)'],'n=O(n²); n²=Ω(n)','First two loose but true.','Core','MSQ · bounds'),
q('10→20→30→40→50, 1-based k=2 from end?',['30','40','50','20'],'40','50 first,40 second.','Core','MCQ · gap'),
q('List slice k items: time/new space?',['O(1)/O(1)','O(k)/O(k)','O(n²)/O(1)','O(logn)/O(k)'],'O(k)/O(k)','New list materialized.','Core','MCQ · slicing'),
q('f(n): f(n-1);print(n). f(3) output?',['3 2 1','1 2 3','0 1 2 3','3 1 2'],'1 2 3','Print during unwind.','Core','MCQ · recursion'),
q('Upar f(3), base f(0): max frames?',['3','4','6','8'],'4','Base included.','Core','NAT-style · depth'),
q('MSQ f(n) complexity?',['Time Θ(n)','Aux Θ(n)','Time Θ(2ⁿ)','Aux Θ(1)'],'Time Θ(n); Aux Θ(n)','One chain.','Core','MSQ · complexity'),
q('Push 1,2,3,4; pop 2,1,4,3 possible?',['Yes','No','Capacity issue','Depends'],'Yes','Push 1,2 pop; push 3,4 pop.','Practice','MCQ · valid sequence'),
q('Push 1,2,3; pop 3,1,2 possible?',['Yes','No','Capacity 2','Depends'],'No','After 3, TOP is 2, not 1.','Practice','MCQ · invalid sequence'),
q('Postfix 5 2 3 * + value?',['11','21','30','13'],'11','2*3 then +5.','Core','MCQ · postfix'),
q('Postfix 8 2 / 3 - value?',['1','-1','7','9'],'1','8/2−3.','Practice','MCQ · operands'),
q('i=2; while i<n: i=i*i iterations?',['Θ(n)','Θ(logn)','Θ(loglogn)','Θ(n²)'],'Θ(loglogn)','2,4,16,256.','Practice','MCQ · self power'),
q('MSQ current→20: true?',['current references 20','current.next references successor','data is next','head may also reference 20'],'current references 20; current.next references successor; head may also reference 20','Multiple names can reference same node.','Practice','MSQ · pointers'),
q('Reverse: current→10; nxt=current.next. nxt?',['None','20','10','30'],'20','Original successor saved.','Core','MCQ · reverse'),
q('M=[[0]*2]*2;M[0][0]=7. M?',['[[7,0],[0,0]]','[[7,0],[7,0]]','Error','zeros'],'[[7,0],[7,0]]','Rows alias.','Practice','MCQ · 2D list'),
q('Sequential Θ(nlogn)+Θ(n²) total?',['Θ(n³)','Θ(n²)','Θ(nlogn)','Θ(logn)'],'Θ(n²)','Add; dominant n².','Core','MCQ · dominant'),
q('Linked TOP=head: n pushes + peek total?',['Θ(1)','Θ(logn)','Θ(n)','Θ(n²)'],'Θ(n)','n constant pushes.','Practice','MCQ · aggregate'),
q('MSQ supplied direct signals?',['2024 LIFO match','2025 stack pseudocode','2026 stack activations','Every paper linked insertion'],'2024 LIFO match; 2025 stack pseudocode; 2026 stack activations','Claims evidence-based.','Practice','MSQ · PYQ'),
q('NAT: postfix 2 3 + 4 * arithmetic operators count?',['NAT · integer'],'2','+ and *.','Foundation','NAT · count')]

export const module5Topics=[make('intro','5.1 · Introduction to Stacks',intro),make('operations','5.2 · Common Operations in Stacks',operations),make('implementation','5.3 · Implementation of Stacks in Python',implementation),make('list','5.3.1 · Stack using Lists',listImpl),make('collections','5.3.2 · Stack using Collections module',dequeImpl),make('linked','5.3.3 · Stack using Linked Lists',linkedImpl),make('complexity','5.4 · Complexity Analysis of Stack',complexity),make('applications','5.5 · Applications of Stack',applications),make('tradeoffs','5.6 · Pros & Cons with Stack',tradeoffs),make('reverse','5.7.1 · Reverse a String using Stack',reverse),make('parentheses','5.7.2 · Check Balanced Parentheses',parentheses),make('undo','5.7.3 · Undo Operation Simulation',undo),make('context','5.8 · DS context',context),make('mixed','Mixed GATE Practice · Modules 1–5',mixed)]
export const module5QuestionCount=module5Topics.reduce((total,topic)=>total+topic.questions.length,0)
