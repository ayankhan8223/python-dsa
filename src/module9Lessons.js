const esc = value => String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')

export const codebox = (label, code) => `<div class="codebox green"><div><span>${label}</span><button type="button">Copy</button></div><pre><code>${esc(code)}</code></pre></div>`
const section = (no, id, label, title, note, body) => `<section class="chapter searchable" id="${id}" data-title="${no} · ${label}"><div class="chapter-head"><div class="chapter-no"><span>${no}</span><small>${label.toUpperCase()}</small></div><div><h2>${title}</h2><p>${note}</p></div></div>${body}</section>`
const pair = (leftTitle, left, rightTitle, right) => `<div class="recursion-dual"><article><span>${leftTitle}</span><div class="recursion-chain">${left}</div></article><article><span>${rightTitle}</span><div class="recursion-chain">${right}</div></article></div>`
const arrows = (values, direction = '→') => values.map(value => `<b>${value}</b>`).join(`<i>${direction}</i>`)

export const lectureData = [
  ['9.1', 'Introduction', 'Base case, recursive case, progress', 'intro'],
  ['9.2', 'Internal Working', 'Call stack: descend and unwind', 'internal'],
  ['9.2.1', 'Understanding Recursion using Factorial Number', 'Factorial call and return trace', 'factorial'],
  ['9.2.2', 'Understanding Recursion using Fibonacci', 'Branching calls and repeated work', 'fibonacci'],
  ['9.3', 'Common Mistakes', 'Missing base, progress and return', 'mistakes'],
  ['9.4', 'Recursion vs Iteration', 'Same work, different auxiliary space', 'iteration'],
  ['9.5.1', 'Print N to 1', 'Print before recursive call', 'print-n'],
  ['9.5.2', 'Sum First N Natural numbers', 'Return values add on unwind', 'sum-n'],
  ['9.5.3', 'Count Digits', 'Integer division removes last digit', 'digits'],
  ['9.5.4', 'Power Function', 'Exponent decreases to zero', 'power'],
  ['9.6', 'DS Context', 'Trees, DFS, merge and quick sort', 'context']
]

export const lectureCodes = {
  factorial: [
    'def factorial(n):',
    '    if (n == 0) or (n == 1):',
    '        return 1',
    '    return n * factorial(n - 1)'
  ].join('\n'),
  fibonacci: [
    'def fibonacci(n):',
    '    if (n == 0) or (n == 1):',
    '        return n',
    '    return fibonacci(n - 1) + fibonacci(n - 2)'
  ].join('\n'),
  printN: [
    'def print_numbers(n):',
    '    # base condition',
    '    if n == 0:',
    '        return',
    '',
    "    print(n, end=' ')",
    '    print_numbers(n - 1)'
  ].join('\n'),
  sumN: [
    'def sum_first_natural_numbers(n):',
    '    # base condition',
    '    if n == 0:',
    '        return 0',
    '',
    '    return n + sum_first_natural_numbers(n - 1)'
  ].join('\n'),
  digits: [
    'def count_digits(n):',
    '    # base condition',
    '    if n == 0:',
    '        return 0',
    '',
    '    return 1 + count_digits(n // 10)'
  ].join('\n'),
  power: [
    'def get_power(n, k):',
    '    # base condition',
    '    if k == 0:',
    '        return 1',
    '',
    '    return n * get_power(n, k - 1)'
  ].join('\n')
}

const intro = section('9.1', 'intro', 'Introduction', 'Base case + smaller subproblem + return', 'Function khud ko call kare, lekin har call stopping condition ke closer jaye.', `
  <div class="recursion-three"><article><b>1 · Base case</b><p>Smallest problem ka direct answer. Example: sum(0)=0.</p></article><article><b>2 · Progress</b><p>Next call mein n−1 bhejo. Same n phir bhejoge toh recursion rukegi nahi.</p></article><article><b>3 · Combine</b><p>Child return kare tab pending work: n + sum(n−1).</p></article></div>
  ${codebox('Smallest example', lectureCodes.sumN)}
  <div class="callout"><b>Question · sum(3) mein sabse pehle kaun return karta hai?</b><p>sum(0). Parent sum(3) sabse pehle call hua tha, par sabse last mein return karega.</p></div>
`)

const internal = section('9.2', 'internal', 'Internal Working', 'Each call gets a separate stack frame', 'Frame mein current n, local variables aur child ke baad resume point rehta hai.', `
  <div class="recursion-stack-visual"><span>TOP · NEWEST FRAME</span><div><b>sum(0)</b><small>base → returns 0</small></div><div><b>sum(1)</b><small>waiting: 1 + sum(0)</small></div><div><b>sum(2)</b><small>waiting: 2 + sum(1)</small></div><div><b>sum(3)</b><small>waiting: 3 + sum(2)</small></div><span>BOTTOM · OLDEST FRAME</span></div>
  ${pair('CALLS DOWN ↓', arrows(['sum(3)','sum(2)','sum(1)','sum(0)']), 'RETURNS IN TIME ORDER ↑', arrows(['0','1','3','6']))}
  <div class="table-wrap"><table><thead><tr><th>Moment</th><th>Exactly kya hua?</th></tr></thead><tbody><tr><td>Push</td><td>sum(3) waits; sum(2), sum(1), sum(0) ke new frames bante hain.</td></tr><tr><td>Base</td><td>sum(0) child call nahi karta; 0 return karta hai.</td></tr><tr><td>Pop</td><td>sum(1)=1, sum(2)=3, sum(3)=6. Last called returns first.</td></tr></tbody></table></div>
  <div class="danger"><b>Total calls ≠ peak stack depth</b><p>Branching recursion mein bahut calls ho sakti hain, par ek time par ek root-to-leaf path active hota hai.</p></div>
`)

const factorial = section('9.2.1', 'factorial', 'Factorial Number', 'factorial(4): calls down, multiplication up', 'Course notebook ka code: n==0 ya n==1 par 1 return.', `
  ${codebox('Lecture code · factorial', lectureCodes.factorial)}
  ${pair('CALL ORDER ↓', arrows(['fact(4)','fact(3)','fact(2)','fact(1)']), 'RETURN ORDER ↑', arrows(['1','2','6','24']))}
  <div class="table-wrap"><table><thead><tr><th>Frame</th><th>Pending expression</th><th>After child returns</th></tr></thead><tbody><tr><td>fact(4)</td><td>4 × fact(3)</td><td>4 × 6 = 24</td></tr><tr><td>fact(3)</td><td>3 × fact(2)</td><td>3 × 2 = 6</td></tr><tr><td>fact(2)</td><td>2 × fact(1)</td><td>2 × 1 = 2</td></tr><tr><td>fact(1)</td><td>base</td><td>1</td></tr></tbody></table></div>
  <div class="callout"><b>GATE count</b><p>fact(4): 4 calls, peak 4 active frames, O(n) time and O(n) auxiliary stack. Negative n is outside this code's valid domain.</p></div>
`)

const fibonacci = section('9.2.2', 'fibonacci', 'Fibonacci', 'One call makes two branches', 'F(0)=0, F(1)=1; F(n)=F(n−1)+F(n−2). Repeated branches count again.', `
  ${codebox('Lecture code · Fibonacci', lectureCodes.fibonacci)}
  <div class="recursion-tree"><span>CALL TREE · F(4)=3</span><pre>F(4)
├── F(3)
│   ├── F(2)
│   │   ├── F(1) → 1
│   │   └── F(0) → 0
│   └── F(1) → 1
└── F(2)  ← computed again
    ├── F(1) → 1
    └── F(0) → 0</pre></div>
  <div class="table-wrap"><table><thead><tr><th>n</th><th>F(n) value</th><th>Total calls C(n)</th></tr></thead><tbody><tr><td>0</td><td>0</td><td>1</td></tr><tr><td>1</td><td>1</td><td>1</td></tr><tr><td>2</td><td>1</td><td>3</td></tr><tr><td>3</td><td>2</td><td>5</td></tr><tr><td>4</td><td>3</td><td>9</td></tr></tbody></table></div>
  <div class="danger"><b>Value vs call count</b><p>F(4)=3, but 9 function calls. Naive time exponential (O(2ⁿ) upper bound); peak stack O(n). Memoization ho tab repeated work avoid hota hai.</p></div>
`)

const mistakes = section('9.3', 'mistakes', 'Common Mistakes', 'Base, progress, return—three checks', 'Valid syntax bhi wrong output ya unbounded recursion de sakti hai.', `
  <div class="recursion-mistakes"><article><b>No base</b><p>f(n−1) forever → RecursionError.</p></article><article><b>No progress</b><p>f(n) calls f(n); input same rehta hai.</p></article><article><b>Missing return</b><p>f(n−1) call hua, lekin return nahi kiya → outer frame None de sakta hai.</p></article><article><b>Wrong base value</b><p>sum(0)=1 likho toh sab positive answers 1 extra.</p></article><article><b>Wrong domain</b><p>Negative exponent ya negative n base tak nahi pahunch sakte.</p></article><article><b>Wrong print position</b><p>Print before child: N→1. Print after child: 1→N.</p></article></div>
`)

const iteration = section('9.4', 'iteration', 'Recursion vs Iteration', 'Factorial: same O(n) time, different stack cost', 'Loop fixed variables use karta hai; recursive version n frames rakhta hai.', `
  <div class="two-grid"><article>${codebox('Recursive · lecture', lectureCodes.factorial)}</article><article>${codebox('Iterative equivalent', ['def factorial_iterative(n):','    result = 1','    for value in range(2, n + 1):','        result *= value','    return result'].join('\n'))}</article></div>
  <div class="table-wrap"><table><thead><tr><th>Factorial(n)</th><th>Recursive</th><th>Iterative</th></tr></thead><tbody><tr><td>Time</td><td>O(n)</td><td>O(n)</td></tr><tr><td>Auxiliary space</td><td>O(n) call stack</td><td>O(1) variables</td></tr><tr><td>Trace</td><td>Descend then unwind</td><td>Loop updates result</td></tr></tbody></table></div>
  <div class="callout"><b>GATE rule</b><p>Recursion automatically slower asymptotically nahi. Work aur maximum active frames separately count karo.</p></div>
`)

const printN = section('9.5.1', 'print-n', 'Print N to 1', 'Print before recursive call → descending output', 'n==0 par return; output n, n−1, …, 1.', `
  ${codebox('Lecture code · print_numbers', lectureCodes.printN)}
  ${pair('PRINT WHILE DESCENDING', arrows(['5','4','3','2','1']), 'BASE THEN RETURN', '<b>print_numbers(0) prints nothing</b>')}
  <div class="danger"><b>Order trap</b><p>print(n) ko child call ke baad rakho toh output 1 2 3 4 5 hoga. Same calls, different print timing.</p></div>
`)

const sumN = section('9.5.2', 'sum-n', 'Sum First N Natural numbers', 'Pending additions return phase mein complete hoti hain', 'Base S(0)=0; current frame n + child answer return karta hai.', `
  ${codebox('Lecture code · sum_first_natural_numbers', lectureCodes.sumN)}
  ${pair('CALLS DOWN ↓', arrows(['S(5)','S(4)','S(3)','S(2)','S(1)','S(0)']), 'RETURNS IN TIME ORDER ↑', arrows(['0','1','3','6','10','15']))}
  <div class="callout"><b>Exactly when is 5 added?</b><p>S(5) waits for S(4)=10. Only then 5+10=15 return hota hai. Time O(n), stack O(n).</p></div>
`)

const digits = section('9.5.3', 'digits', 'Count Digits', 'n // 10 removes one decimal digit', 'Positive n ke liye each nonzero call one digit count karta hai.', `
  ${codebox('Lecture code · count_digits', lectureCodes.digits)}
  <div class="table-wrap"><table><thead><tr><th>Call</th><th>Next n</th><th>Return</th></tr></thead><tbody><tr><td>count_digits(507)</td><td>50</td><td>1+2=3</td></tr><tr><td>count_digits(50)</td><td>5</td><td>1+1=2</td></tr><tr><td>count_digits(5)</td><td>0</td><td>1+0=1</td></tr><tr><td>count_digits(0)</td><td>—</td><td>0 · base</td></tr></tbody></table></div>
  <div class="danger"><b>Exact code boundary</b><p>count_digits(0) returns 0, while decimal 0 has one digit. Negative n can get stuck because −1 // 10 == −1. This lecture code assumes positive n.</p></div>
  <div class="callout"><b>Complexity</b><p>d decimal digits → O(d) time and O(d) stack, equivalently O(log n) for n&gt;0.</p></div>
`)

const power = section('9.5.4', 'power', 'Power Function', 'Exponent k decreases until zero', 'Course code: get_power(n,k)=n × get_power(n,k−1), k≥0.', `
  ${codebox('Lecture code · get_power', lectureCodes.power)}
  <div class="table-wrap"><table><thead><tr><th>Call</th><th>Pending</th><th>Return</th></tr></thead><tbody><tr><td>power(3,4)</td><td>3 × power(3,3)</td><td>81</td></tr><tr><td>power(3,3)</td><td>3 × power(3,2)</td><td>27</td></tr><tr><td>power(3,2)</td><td>3 × power(3,1)</td><td>9</td></tr><tr><td>power(3,1)</td><td>3 × power(3,0)</td><td>3</td></tr><tr><td>power(3,0)</td><td>base</td><td>1</td></tr></tbody></table></div>
  <div class="callout"><b>GATE extension</b><p>Lecture code O(k) time/stack. Exponentiation by squaring k half karta hai, giving O(log k) time/stack in a recursive version.</p></div>
  <div class="danger"><b>Negative k</b><p>Is exact code mein k−1 aur negative hota jayega; k==0 base nahi milega.</p></div>
`)

const context = section('9.6', 'context', 'DS Context', 'Recursion is the mechanism; call tree decides cost', 'Syllabus applications mein search, sorting, trees aur graph traversal ke stack traces aate hain.', `
  <div class="decision-grid"><article><span>Binary search</span><b>One branch</b><p>Range half; depth O(log n).</p></article><article><span>Merge sort</span><b>Two halves</b><p>O(log n) levels × O(n) work = O(n log n).</p></article><article><span>Quick sort</span><b>Pivot splits</b><p>Sorted + first pivot can yield O(n) depth, O(n²) time.</p></article><article><span>Tree DFS</span><b>One active path</b><p>Stack O(h), h = tree height.</p></article><article><span>Graph DFS</span><b>Visited needed</b><p>Cycle without visited set may recurse forever.</p></article><article><span>Naive Fibonacci</span><b>Repeated branches</b><p>Exponential calls, but O(n) max stack.</p></article></div>
  <div class="final"><h3>Mastery check</h3><p>Given code par call order, return order, total calls aur peak active frames alag-alag likh sakte ho? Yehi recursion trace ka core hai.</p><button data-jump="practice">Lecture-wise practice kholo →</button></div>
`)

export const mentalModelMarkup = `<section class="beginner-start searchable" id="mental-model" data-title="Recursion mental model"><div class="zero-title"><span>ZERO START</span><h2>Ek call, ek frame. Child finish hone tak parent waits.</h2><p>Fresh call ko fresh local n milta hai; old call ka pending work stack mein safe rehta hai.</p></div>${pair('CALLS GO DOWN ↓', arrows(['sum(3)','sum(2)','sum(1)','sum(0)']), 'RETURNS IN TIME ORDER ↑', arrows(['0','1','3','6']))}<div class="reading-method"><h3>Har trace ka 4-step protocol</h3><div><span><b>1</b>Base case mark karo</span><span><b>2</b>Next argument kya hoga?</span><span><b>3</b>Call order downward</span><span><b>4</b>Return order upward</span></div></div></section>`

export const lessonMarkup = [intro, internal, factorial, fibonacci, mistakes, iteration, printN, sumN, digits, power, context].join('\n')
