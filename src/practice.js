const mcq = (prompt, options, answer, explanation, difficulty = 'Foundation', pattern = 'Concept') => ({
  prompt, options, answer, explanation, difficulty, pattern
})

const buildTopic = (id, number, label, generator, count = 50) => ({
  id, number, label, questions: Array.from({ length: count }, (_, index) => ({
    id: `${id}-${index + 1}`,
    number: index + 1,
    ...generator(index, Math.floor(index / 5) + 1, index % 5)
  }))
})

const structures = [
  ['browser back history', 'Stack', 'Last action ko pehle undo karna hai: LIFO.'],
  ['printer jobs in arrival order', 'Queue', 'Jo job pehle aayi woh pehle process: FIFO.'],
  ['username se profile lookup', 'Hash table', 'Key-based average O(1) lookup.'],
  ['company reporting hierarchy', 'Tree', 'Parent-child hierarchical relation.'],
  ['cities and connecting roads', 'Graph', 'Entities vertices aur relationships edges.'],
  ['index se marks access', 'Array/List', 'Contiguous/dynamic array index access O(1).']
]

const intro = buildTopic('intro', '1', 'Introduction to DSA', (i, r, m) => {
  const [scenario, structure, why] = structures[i % structures.length]
  if (m === 0) return mcq(`“${scenario}” ko efficiently model karna hai. Best data structure?`, ['Stack','Queue','Hash table','Tree','Graph','Array/List'], structure, why, 'Foundation', 'Structure selection')
  if (m === 1) return mcq(`Algorithm ki kaunsi property ensure karti hai ki process infinite nahi chalega? (Set ${r})`, ['Definiteness','Finiteness','Input','Popularity'], 'Finiteness', 'Finiteness ka matlab algorithm finite steps ke baad terminate kare.', 'Foundation', 'Definition')
  if (m === 2) return mcq(`Step-by-step, language-independent solution procedure ko kya kahenge?`, ['Program','Algorithm','Variable','Compiler'], 'Algorithm', 'Algorithm logical procedure hai; program uska language-specific implementation.', 'Foundation', 'Terminology')
  if (m === 3) return mcq(`${10*r}-element list search problem mein natural input size n kya hai?`, [`${10*r}`,`${r}`,'Target value','Python version'], `${10*r}`, 'List problem mein n normally number of elements represent karta hai.', 'Foundation', 'Input size')
  return mcq(`Same binary-search algorithm Python aur C++ mein likha gaya. Kya same rahega?`, ['Exact runtime','Syntax','Logical steps','Memory address'], 'Logical steps', 'Implementation language badal sakti hai; algorithm ke logical steps same rehte hain.', 'Foundation', 'Algorithm vs program')
})

const importance = buildTopic('importance', '1.1', 'Importance of DSA', (i, r, m) => {
  const [scenario, structure, why] = structures[(i + r) % structures.length]
  if (m === 0) return mcq(`Dataset scale ${10**Math.min(r,6)} records hai aur task “${scenario}”. Suitable choice?`, structures.map(x=>x[1]), structure, why, 'Foundation', 'Use case')
  if (m === 1) return mcq(`DSA ka primary benefit kya hai jab input 10 se ${r} million records ho jaye?`, ['Better variable names','Predictable resource growth','Automatic correctness','No memory use'], 'Predictable resource growth', 'Complexity analysis batati hai scale par time/memory kaise grow honge.', 'Foundation', 'Scalability')
  if (m === 2) return mcq(`Agar frequent membership checks chahiye, list O(n) ke badle set ka expected benefit?`, ['O(n²)','O(log n)','O(1) average lookup','Zero space'], 'O(1) average lookup', 'Hash-based set membership average constant time hoti hai, additional memory trade-off ke saath.', 'Core', 'Trade-off')
  if (m === 3) return mcq(`Queue ka natural AI/data-pipeline use kaunsa?`, ['Undo history','First-arrived batch processing','Hierarchy','Key-value lookup'], 'First-arrived batch processing', 'Queue FIFO order preserve karti hai.', 'Foundation', 'Application')
  return mcq(`Efficient algorithm choose karne se pehle sabse important condition?`, ['Shortest code','Correctness','Fancy syntax','Recursion'], 'Correctness', 'Incorrect fast algorithm useful solution nahi; correctness first, optimization second.', 'Core', 'Correctness')
})

const complexity = buildTopic('complexity', '1.2', 'Time & Space Complexity', (i, r, m) => {
  const n = 8 * r
  if (m === 0) return mcq(`T(n) = ${r+2}n² + ${3*r}n + 9 ka tight bound?`, ['Θ(1)','Θ(n)','Θ(n log n)','Θ(n²)'], 'Θ(n²)', 'Highest-degree n² term large n par dominate karta; constants/lower terms drop.', 'Core', 'Simplification')
  if (m === 1) return mcq(`Loop n=${n} se start karke har iteration n//=2 karta hai. Order?`, ['Θ(1)','Θ(log n)','Θ(n)','Θ(n²)'], 'Θ(log n)', 'Har step search/value size half; roughly log₂n iterations.', 'Core', 'Halving')
  if (m === 2) return mcq(`Worst-case linear search ka correct tight bound?`, ['O(1) only','Ω(1) only','Θ(n)','Θ(log n)'], 'Θ(n)', 'Absent/last target par exactly n comparisons order mein.', 'Core', 'Cases vs bounds')
  if (m === 3) return mcq(`Function input list ke sirf arr[0] ko print karta hai. Standard auxiliary space?`, ['Θ(1)','Θ(n)','Θ(log n)','Input-dependent'], 'Θ(1)', 'Input storage exclude karke koi size-dependent extra container nahi.', 'Core', 'Auxiliary space')
  return mcq(`Do consecutive loops: first ${r}n operations, second ${r+1}n. Total order?`, ['Θ(n)','Θ(n²)','Θ(2ⁿ)','Θ(log n)'], 'Θ(n)', `(${r}n+${r+1}n)=${2*r+1}n, constant factor drop hota hai.`, 'Core', 'Consecutive loops')
}, 60)

const complexityPractice = buildTopic('complexity-practice', '1.2.1', 'Complexity Practice', (i, r, m) => {
  const k = r + 1
  if (m === 0) return mcq(`for i in range(0, n, ${k}): O(1) work. Tight time?`, ['Θ(1)','Θ(log n)','Θ(n)','Θ(n²)'], 'Θ(n)', `Iterations ≈ n/${k}; ${k} constant hai, so Θ(n).`, 'Practice', 'Constant step')
  if (m === 1) return mcq(`for i in range(n): for j in range(i): work(). Tight time?`, ['Θ(n)','Θ(n log n)','Θ(n²)','Θ(2ⁿ)'], 'Θ(n²)', 'Total 0+1+…+(n−1)=n(n−1)/2.', 'Practice', 'Dependent loop')
  if (m === 2) return mcq(`return [${r}] * n ka time aur output space?`, ['Θ(1),Θ(1)','Θ(n),Θ(n)','Θ(n²),Θ(n)','Θ(log n),Θ(n)'], 'Θ(n),Θ(n)', 'n references create/store hote hain.', 'Practice', 'Construction')
  if (m === 3) return mcq(`Outer loop n times aur inner loop fixed ${10*r} times. Tight time?`, ['Θ(n)','Θ(n²)','Θ(log n)','Θ(1)'], 'Θ(n)', `${10*r}n operations; fixed multiplier asymptotically constant.`, 'Practice', 'Fixed inner loop')
  return mcq(`Naive fib(n-1)+fib(n-2) ki maximum recursion-stack depth?`, ['Θ(1)','Θ(log n)','Θ(n)','Θ(2ⁿ)'], 'Θ(n)', 'Longest active chain n→n−1→…→base has linear frames; total calls exponential.', 'Practice', 'Recursion space')
}, 60)

const refresher = buildTopic('refresher', '1.3', 'Python Refresher', (i, r, m) => {
  if (m === 0) return mcq(`a=[${r}]; b=a; b.append(${r+1}). a kya hai?`, [`[${r}]`,`[${r+1}]`,`[${r}, ${r+1}]`,'Error'], `[${r}, ${r+1}]`, 'a aur b same mutable list ko refer karte hain.', 'Core', 'Aliasing')
  if (m === 1) return mcq(`x=${r}; y=x; x=x+1. y kya rahega?`, [`${r}`,`${r+1}`,'None','Error'], `${r}`, 'Integers immutable; x new integer se rebind hua, y old object ko refer karta.', 'Foundation', 'Rebinding')
  if (m === 2) return mcq(`Equal content wali do separately-created lists ke liye reliable statement?`, ['a is b','a == b','Both always true','Both always false'], 'a == b', '== values compare karta hai; is identity compare karta hai.', 'Core', 'Identity')
  if (m === 3) return mcq(`Function sirf print(${r}) karta hai, explicit return nahi. Returned value?`, [`${r}`,'True','None','Empty string'], 'None', 'Print display side effect hai; missing return implicitly None.', 'Core', 'Return')
  return mcq(`Python function ko mutable list argument milti hai aur append karta hai. Caller list?`, ['Unchanged','Mutated','Automatically copied','Invalid'], 'Mutated', 'Parameter same object se bind hota; append object mutate karta hai.', 'Core', 'Object passing')
})

const types = buildTopic('types', '1.3.1', 'Built-in Data Types', (i, r, m) => {
  const literals = [[`(${r},)`,'tuple'],[`{${r},${r+1}}`,'set'],[`{'a':${r}}`,'dict'],[`range(${r})`,'range'],[`complex(${r},1)`,'complex']]
  const [literal,type] = literals[m]
  if (m === 0) return mcq(`type(${literal}).__name__ kya hai?`, ['int','tuple','list','float'], type, 'Single-element tuple ke liye trailing comma required.', 'Foundation', 'Literal type')
  if (m === 1) return mcq(`${literal} ka type?`, ['list','set','dict','tuple'], type, 'Braces without key:value set banate; duplicates removed.', 'Foundation', 'Literal type')
  if (m === 2) return mcq(`Dictionary key ke liye kaunsa valid?`, ['[1,2]','{1,2}',`(${r},${r+1})`,'{"x":1}'], `(${r},${r+1})`, 'Keys hashable hone chahiye; immutable tuple of ints hashable hai.', 'Core', 'Hashability')
  if (m === 3) return mcq(`Python 3.7+ dict ke baare mein correct?`, ['Sorted by key','Insertion order preserved','Duplicate keys stored','All keys mutable'], 'Insertion order preserved', 'Modern dict insertion order guarantee karti hai; hash lookup property separate hai.', 'Core', 'Dictionary')
  return mcq(`Kaunsa immutable built-in collection hai?`, ['list','set','dict','frozenset'], 'frozenset', 'frozenset immutable set variant hai.', 'Foundation', 'Mutability')
}, 60)

const control = buildTopic('control', '1.3.2', 'Control Structures', (i, r, m) => {
  if (m === 0) return mcq(`bool(${r-r}) ka result?`, ['True','False','None','Error'], 'False', 'Numeric zero falsy hota hai.', 'Foundation', 'Truthiness')
  if (m === 1) return mcq(`x=${r}; if x>${r}: A elif x==${r}: B else: C. Output branch?`, ['A','B','C','None'], 'B', 'First false; elif equality true; exactly B executes.', 'Foundation', 'if-elif')
  if (m === 2) return mcq(`False and (1/0) evaluate karne par?`, ['ZeroDivisionError','False','True','None'], 'False', 'and short-circuit: left falsy, RHS evaluate nahi hota.', 'Core', 'Short-circuit')
  if (m === 3) return mcq(`not True or True and False ka result?`, ['True','False','Error','None'], 'False', 'Order: not → and → or. False or (True and False)=False.', 'Core', 'Precedence')
  return mcq(`Empty ${r%2?'list':'dict'} condition mein?`, ['Truthy','Falsy','Syntax error','Depends on length variable'], 'Falsy', 'Empty built-in containers falsy hote hain.', 'Foundation', 'Truthiness')
})

const loops = buildTopic('loops', '1.3.3', 'Loops', (i, r, m) => {
  if (m === 0) return mcq(`list(range(${r}, ${r+6}, 2)) kya hai?`, [`[${r},${r+2},${r+4}]`,`[${r},${r+2},${r+4},${r+6}]`,`[${r+2},${r+4}]`,'Error'], `[${r},${r+2},${r+4}]`, 'range stop excluded hota hai.', 'Foundation', 'range')
  if (m === 1) return mcq(`sum=0; for i in range(${r}): sum+=i. Result?`, [`${r*(r-1)/2}`,`${r*(r+1)/2}`,`${r}`,'0'], `${r*(r-1)/2}`, `0 se ${r-1} sum = r(r−1)/2.`, 'Practice', 'Accumulation')
  if (m === 2) return mcq(`x=${2**r}; while x>1: x//=2. Iterations?`, [`${r-1}`,`${r}`,`${r+1}`,`${2**r}`], `${r}`, `2^${r} ko 1 tak halve karne mein ${r} updates.`, 'Core', 'While count')
  if (m === 3) return mcq(`for i in range(${r+3}): if i%2==0: continue; print(i). Kya print?`, ['Even values','Odd values','All values','Nothing'], 'Odd values', 'Even i par continue print skip karta; odd values print hote.', 'Foundation', 'continue')
  return mcq(`n outer iterations aur ${r} fixed inner iterations. Total inner executions?`, [`n+${r}`,`${r}n`,'n²',`${r}`], `${r}n`, 'Har outer iteration par inner exactly fixed r times.', 'Practice', 'Nested count')
}, 60)

const functions = buildTopic('functions', '1.3.4', 'Functions', (i, r, m) => {
  if (m === 0) return mcq(`def f(x, box=[]): box.append(x); return box. f(${r}), then f(${r+1})?`, [`[${r+1}]`,`[${r},${r+1}]`,'Error','None'], `[${r},${r+1}]`, 'Default list once create aur reuse hoti hai.', 'Core', 'Mutable default')
  if (m === 1) return mcq(`def f(x): print(x). y=f(${r}). y?`, [`${r}`,'None','True','0'], 'None', 'No explicit return, so None.', 'Foundation', 'Return')
  if (m === 2) return mcq(`Global x=${r}; function mein local x=${r+1}. Function ke baad global x?`, [`${r}`,`${r+1}`,'None','Error'], `${r}`, 'Local assignment separate local binding banata unless global declared.', 'Core', 'Scope')
  if (m === 3) return mcq(`outer() each call local list banakar inner return karta hai. Two outer calls ka state?`, ['Shared','Independent','Always empty','Invalid'], 'Independent', 'Har outer invocation ka separate enclosing environment/closure.', 'Core', 'Closure')
  return mcq(`Definition mein name x ko kya kahenge; call f(${r}) mein ${r} ko?`, ['argument, parameter','parameter, argument','variable, class','object, method'], 'parameter, argument', 'Definition name parameter; supplied call value argument.', 'Foundation', 'Terminology')
}, 60)

const builtins = buildTopic('builtins', '1.3.5', 'Built-in Functions', (i, r, m) => {
  const arr=[r+3,r,r+2,r+1]
  if (m === 0) return mcq(`min(${JSON.stringify(arr)})?`, [`${r}`,`${r+1}`,`${r+3}`,'None'], `${r}`, 'min full iterable scan karke smallest value deta.', 'Foundation', 'min')
  if (m === 1) return mcq(`sum(range(${r+1}))?`, [`${r*(r+1)/2}`,`${(r+1)*(r+2)/2}`,`${r+1}`,'0'], `${r*(r+1)/2}`, `range gives 0…${r}; sum r(r+1)/2.`, 'Practice', 'sum')
  if (m === 2) return mcq(`a=${JSON.stringify(arr)}; b=sorted(a). a ka kya hoga?`, ['Sorted','Unchanged','None','Empty'], 'Unchanged', 'sorted new list return karta, original mutate nahi.', 'Core', 'sorted')
  if (m === 3) return mcq(`enumerate(['a','b'], start=${r}) first pair?`, [`(${r}, 'a')`,`(0, 'a')`,`(${r+1}, 'a')`,'a'], `(${r}, 'a')`, 'start first generated index set karta.', 'Foundation', 'enumerate')
  return mcq(`zip([1,2,3], ['a']): produced pairs count?`, ['1','2','3','Error'], '1', 'zip shortest iterable exhausted hote hi stop.', 'Core', 'zip')
})

const comprehensions = buildTopic('comprehensions', '1.3.6', 'List Comprehensions', (i, r, m) => {
  if (m === 0) return mcq(`[x*x for x in range(${r+3}) if x%2==0] mein kaun included?`, ['Odd squares','Even-input squares','All squares','No values'], 'Even-input squares', 'Filter x even select karta, expression selected x ka square.', 'Foundation', 'Filter')
  if (m === 1) return mcq(`[x for x in range(${r})] ka time/output space?`, ['Θ(1),Θ(1)','Θ(n),Θ(n)','Θ(n²),Θ(n)','Θ(log n),Θ(1)'], 'Θ(n),Θ(n)', 'r items inspect aur r-result list store.', 'Core', 'Complexity')
  if (m === 2) return mcq(`If-else expression ka valid form?`, ['[x if c else y for x in a]','[x for x in a if c else y]','[if c x else y]','[x else y for a]'], '[x if c else y for x in a]', 'Conditional expression output position par, loop clause baad mein.', 'Core', 'Syntax')
  if (m === 3) return mcq(`[(i,j) for i in range(${r}) for j in range(2)] ki length?`, [`${r}`,`${2*r}`,`${r+2}`,`${r*r}`], `${2*r}`, 'Har i ke liye 2 j values: r×2 pairs.', 'Practice', 'Nested comprehension')
  return mcq(`Comprehension ka main benefit?`, ['Changes Big-O automatically','Concise collection construction','No memory ever','Only tuples'], 'Concise collection construction', 'Readable compact expression; underlying work order usually same.', 'Foundation', 'Purpose')
})

const classes = buildTopic('classes', '1.3.7', 'Classes', (i, r, m) => {
  if (m === 0) return mcq(`class Box: def __init__(self,x): self.x=x. b=Box(${r}); b.x?`, [`${r}`,'self','None','Error'], `${r}`, '__init__ instance attribute x initialize karta.', 'Foundation', 'Attribute')
  if (m === 1) return mcq(`Instance method ka conventional first parameter?`, ['this','self','obj only','class'], 'self', 'self current instance reference receive karta.', 'Foundation', 'Method')
  if (m === 2) return mcq(`Python class naming convention?`, ['snake_case','PascalCase/CapWords','kebab-case','lower only'], 'PascalCase/CapWords', 'PEP 8 class names CapWords; methods/variables snake_case.', 'Foundation', 'Naming')
  if (m === 3) return mcq(`Two objects Box(${r}) and Box(${r+1}) ke instance attributes?`, ['Always shared','Normally independent','Class invalid','Both None'], 'Normally independent', 'self.x each instance dictionary/state mein stored hota hai.', 'Core', 'Instance state')
  return mcq(`__init__ ko most accurately kya kahenge?`, ['Object allocator only','Initializer method','Destructor','Static variable'], 'Initializer method', 'Object creation ke baad initial state set karta; allocation __new__ se related hai.', 'Core', 'Object lifecycle')
})

const inputs = buildTopic('inputs', '1.3.8', 'Reading Inputs', (i, r, m) => {
  if (m === 0) return mcq(`User ${r} enter karta hai. input() ka type?`, ['int','str','float','NoneType'], 'str', 'input always line ko string return karta.', 'Foundation', 'input')
  if (m === 1) return mcq(`'${r} ${r+1} ${r+2}'.split() result?`, [`['${r}','${r+1}','${r+2}']`,`[${r},${r+1},${r+2}]`,'One string','Error'], `['${r}','${r+1}','${r+2}']`, 'split whitespace par string tokens deta; integer conversion nahi.', 'Foundation', 'split')
  if (m === 2) return mcq(`list(map(int, '${r} ${r+1}'.split()))?`, [`[${r},${r+1}]`,`['${r}','${r+1}']`,'map','Error'], `[${r},${r+1}]`, 'split strings, map int conversion, list materialization.', 'Foundation', 'map')
  if (m === 3) return mcq(`a,b = map(int, input().split()) ke liye exactly kitne tokens?`, ['1','2','Any number','0'], '2', 'Unpacking do target names ko exactly do produced values chahiye.', 'Core', 'Unpacking')
  return mcq(`int('3.5') ka result?`, ['3','3.5','ValueError','None'], 'ValueError', 'Decimal string direct int parser ke valid integer format mein nahi.', 'Core', 'Conversion error')
})

export const practiceTopics = [intro, importance, complexity, complexityPractice, refresher, types, control, loops, functions, builtins, comprehensions, classes, inputs]
export const totalPracticeQuestions = practiceTopics.reduce((sum, topic) => sum + topic.questions.length, 0)
