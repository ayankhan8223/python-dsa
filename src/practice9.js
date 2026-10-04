const factorial = n => n <= 1 ? 1 : n * factorial(n - 1)
const fibonacci = n => n <= 1 ? n : fibonacci(n - 1) + fibonacci(n - 2)
const fibCalls = n => n <= 1 ? 1 : 1 + fibCalls(n - 1) + fibCalls(n - 2)
const sum = n => n * (n + 1) / 2

const makeQuestion = (prompt, answer, wrong, explanation, difficulty, index) => {
  const correct = String(answer)
  const options = [correct, ...wrong.map(String)]
  if (new Set(options).size !== 4) throw new Error(`Duplicate options: ${prompt}`)
  const shift = index % 4
  return { id: index + 1, prompt, answer: correct, options: [...options.slice(shift), ...options.slice(0, shift)], explanation, difficulty }
}
const numberQuestion = (prompt, answer, explanation, index, difficulty = 'Core') =>
  makeQuestion(prompt, answer, [answer + 1, answer - 1, answer + 2], explanation, difficulty, index)
const textQuestion = (prompt, answer, wrong, explanation, index, difficulty = 'Core') =>
  makeQuestion(prompt, answer, wrong, explanation, difficulty, index)

const build = generator => Array.from({ length: 50 }, (_, index) => generator(2 + Math.floor(index / 5), index % 5, index))

const introduction = build((n, mode, index) => {
  if (mode === 0) return numberQuestion(`f(x): if x==0 return 0; else return f(x-1). f(${n}) mein total calls, base call included?`, n + 1, `Inputs ${n}, ${n-1}, …, 0: total ${n+1} calls.`, index)
  if (mode === 1) return numberQuestion(`f(x): if x==0 return 0; else return f(x-1). f(${n}) se base case ko kaunsa x milta hai?`, 0, 'Har recursive call x ko 1 ghataata hai, so stop x=0 par.', index, 'Foundation')
  if (mode === 2) return numberQuestion(`f(x): if x==0 return 0; else return 1+f(x-1). f(${n}) kya return karta hai?`, n, 'Base 0 se return hota hai; har previous frame 1 add karta hai.', index)
  if (mode === 3) return numberQuestion(`f(x): if x==0 return 0; else return f(x-1). f(${n}) par maximum simultaneously active frames?`, n + 1, 'Base case tak caller frames wait karte hain; n se 0 tak sab stack par hain.', index)
  return textQuestion(`f(x) sirf f(x) ko hi call kare, x=${n} aur koi base/progress na ho. Python mein kya hoga?`, 'RecursionError', ['Normal return', 'IndexError', 'Automatically stops at zero'], 'Input change hi nahi hota; repeated calls recursion limit tak jaati hain.', index, 'Practice')
})

const internal = build((n, mode, index) => {
  if (mode === 0) return numberQuestion(`f(x) x se 0 tak f(x-1) call karta hai. f(${n}) ka peak call-stack depth?`, n + 1, `Frames f(${n}) … f(0) tak ek saath active hain.`, index)
  if (mode === 1) return numberQuestion(`f(x) x se 0 tak f(x-1) call karta hai. f(${n}) mein total return events?`, n + 1, 'Har invoked frame exactly ek baar return karta hai, base frame bhi.', index)
  if (mode === 2) return numberQuestion(`f(${n}) se ${Math.floor(n / 2)} child calls descend ho chuki hain. Active frames kitne?`, Math.floor(n / 2) + 1, 'Initial frame + har child call ka ek frame.', index)
  if (mode === 3) return textQuestion(`f(${n}) → f(${n-1}) → … → f(0). Sabse pehle kaunsa frame finish hoga?`, 'f(0)', [`f(${n})`, `f(${n-1})`, 'All simultaneously'], 'Base frame f(0) pehle return karta hai; parents uske baad unwind hote hain.', index)
  return textQuestion(`f(${n}) mein print(x) recursive call ke BAAD hai. Output order?`, `1 → … → ${n}`, [`${n} → … → 1`, `0 → … → ${n}`, 'No output'], 'Calls descend silently; print statements return/unwind phase mein chalti hain.', index, 'Practice')
})

const factorialTopic = build((n, mode, index) => {
  if (mode === 0) return numberQuestion(`Lecture code factorial(${n}) ka output?`, factorial(n), `${n}! = ${n} × ${n-1} × … × 1.`, index)
  if (mode === 1) return numberQuestion(`factorial(${n}) mein base n==1 tak total calls?`, n, `Inputs ${n} down to 1: ${n} frames.`, index)
  if (mode === 2) return numberQuestion(`factorial(${n}) ke recursion mein actual n * factorial(n-1) multiplications kitni?`, n - 1, 'n=1 base case multiply nahi karta; n se 2 tak n−1 multiplications.', index)
  if (mode === 3) return numberQuestion(`factorial(${n}) par maximum active frames, base frame included?`, n, 'n,n−1,…,1 stack par ek saath active hote hain.', index)
  return numberQuestion(`factorial(${n}) // factorial(${n-1}) ka value?`, n, 'n! = n × (n−1)!, so ratio n.', index, 'Practice')
})

const fibonacciTopic = build((n, mode, index) => {
  if (mode === 0) return numberQuestion(`Lecture code fibonacci(${n}) ka output? (F(0)=0, F(1)=1)`, fibonacci(n), `F(${n})=F(${n-1})+F(${n-2}).`, index)
  if (mode === 1) return numberQuestion(`Naive fibonacci(${n}) mein total function calls, initial call included?`, fibCalls(n), `C(0)=C(1)=1; C(${n})=1+C(${n-1})+C(${n-2}).`, index, 'Practice')
  if (mode === 2) return numberQuestion(`Naive fibonacci(${n}) ki maximum active stack frames?`, n, `Longest path ${n} → ${n-1} → … → 1 has ${n} frames.`, index)
  if (mode === 3) return numberQuestion(`F(${n+1}) − F(${n}) ka value?`, fibonacci(n - 1), `F(${n+1})=F(${n})+F(${n-1}).`, index)
  return numberQuestion(`Naive fibonacci(${n}) ke top call mein right child fibonacci(n-2) ka return value?`, fibonacci(n - 2), `Right child F(${n-2}) calculate karta hai; duplicate subproblems bhi ho sakte hain.`, index, 'Practice')
})

const mistakes = build((n, mode, index) => {
  if (mode === 0) return textQuestion(`f(${n}): base par return 0; recursive branch mein sirf f(n-1) likha, return nahi. Outer f(${n}) ka result?`, 'None', ['0', String(n), 'RecursionError always'], 'Recursive call chalti hai, lekin outer frame explicit return na kare to Python None deta hai.', index)
  if (mode === 1) return textQuestion(`f(${n}) mein recursive step f(n) hi hai. Problem?`, 'No progress → RecursionError', ['Valid base reached', 'O(1) time', 'Returns n'], 'Argument n same hai; base case tak kabhi nahi pahunchega.', index)
  if (mode === 2) return textQuestion(`Base sirf n==1 hai; f(-${n}) har baar f(n-1) call kare. Kya risk?`, 'Negative values par unbounded recursion', ['f(0)=1', 'No recursive calls', 'Only one frame'], 'Negative input aur ghatega; n==1 kabhi true nahi hoga.', index)
  if (mode === 3) return numberQuestion(`count_digits(${10 ** n}) eventually count_digits(0) call karega. Lecture base case zero par kya return karta hai?`, 0, 'Code zero return karta hai, although decimal 0 ko mathematically one digit maana jaata hai.', index, 'Practice')
  return textQuestion(`get_power(${n}, -${n}) sirf k==0 base aur k-1 step use kare. Kya hoga?`, 'RecursionError', ['1', `1/${n}`, 'ZeroDivisionError'], 'Negative k aur negative hota jayega; zero base tak nahi pahunchega.', index, 'Practice')
})

const iteration = build((n, mode, index) => {
  if (mode === 0) return textQuestion(`factorial(${n}) recursive vs iterative: dono ka time?`, 'Both O(n)', ['Recursive O(1), iterative O(n)', 'Both O(n²)', 'Both O(log n)'], 'n multiplications/steps ke proportional work hota hai.', index)
  if (mode === 1) return textQuestion(`factorial(${n}) iterative loop ka auxiliary space?`, 'O(1)', ['O(n)', 'O(log n)', 'O(n²)'], 'Loop mein fixed number of variables hain; n call frames nahi.', index)
  if (mode === 2) return numberQuestion(`factorial(${n}) recursive, base n==1: maximum active frames?`, n, 'n se 1 tak n frames stack par hain.', index)
  if (mode === 3) return numberQuestion(`Iterative factorial: for i in range(1, ${n}+1). Multiplication operations?`, n, `Loop ${n} times runs, including multiply by 1.`, index)
  return textQuestion(`Recursive tree traversal for ${n} nodes ko iteration mein badalne ke liye often kya explicit chahiye?`, 'Stack', ['Only one index', 'Sorting first', 'Hash function'], 'Implicit function-call stack ko explicit stack se simulate kar sakte hain.', index, 'Practice')
})

const printN = build((n, mode, index) => {
  const down = Array.from({ length: n }, (_, i) => n - i).join(' ')
  const up = Array.from({ length: n }, (_, i) => i + 1).join(' ')
  if (mode === 0) return textQuestion(`Lecture print_numbers(${n}) kya print karega?`, down, [up, `0 ${down}`, 'No output'], 'print(n) recursive call se pehle hai, so descending order.', index)
  if (mode === 1) return numberQuestion(`print_numbers(${n}) kitne integers print karega?`, n, 'n down to 1 print hote hain; base n=0 prints nothing.', index)
  if (mode === 2) return numberQuestion(`print_numbers(${n}) mein n=0 base call included total calls?`, n + 1, 'n,n−1,…,1,0: n+1 calls.', index)
  if (mode === 3) return textQuestion(`print(n) ko print_numbers(n-1) ke BAAD rakho. print_numbers(${n}) output?`, up, [down, `0 ${up}`, 'No output'], 'Printing unwind phase mein hoti hai: 1,2,…,n.', index, 'Practice')
  return numberQuestion(`print_numbers(${n}) ka first printed number?`, n, 'Current n print hota hai, uske baad child call.', index, 'Foundation')
})

const sumNatural = build((n, mode, index) => {
  if (mode === 0) return numberQuestion(`sum_first_natural_numbers(${n}) ka result?`, sum(n), `Formula ${n}(${n}+1)/2.`, index)
  if (mode === 1) return numberQuestion(`sum_first_natural_numbers(${n}) mein base n=0 included total calls?`, n + 1, 'n se 0 tak n+1 calls.', index)
  if (mode === 2) return numberQuestion(`sum_first_natural_numbers(${n-1}) ka return value?`, sum(n - 1), `First ${n-1} natural numbers ka sum (${n-1})${n}/2 hai.`, index)
  if (mode === 3) return numberQuestion(`Agar sum(n) ka base n==0 galti se 1 return kare, sum(${n}) kya banega?`, sum(n) + 1, 'Har higher frame same additions karta hai; base extra 1 final answer mein rehta hai.', index, 'Practice')
  return numberQuestion(`sum(${n}) ke recursive formula n + sum(n-1) mein first n kya hai?`, n, `Current frame ${n} add karta hai, baaki sum child se aata hai.`, index, 'Foundation')
})

const digits = build((n, mode, index) => {
  const power = 10 ** n
  if (mode === 0) return numberQuestion(`Lecture count_digits(${power}) kya return karega?`, n + 1, `10^${n} mein 1 ke baad ${n} zeros, total ${n+1} digits.`, index)
  if (mode === 1) return numberQuestion(`count_digits(${power - 1}) ka result?`, n, `10^${n}-1 mein ${n} digits hain.`, index)
  if (mode === 2) return numberQuestion(`n=${power + 7} par first recursive call ka n // 10 argument?`, Math.floor((power + 7) / 10), 'Integer division last digit remove karti hai.', index)
  if (mode === 3) return numberQuestion(`count_digits(${power}) mein n=0 base call included total calls?`, n + 2, `${n+1} nonzero-digit frames plus zero base frame.`, index, 'Practice')
  return numberQuestion(`Lecture code count_digits(0) kya return karta hai? (Start example ${power})`, 0, 'Exact lecture base case returns 0; zero ko one digit count karne ke liye separate guard chahiye.', index, 'Practice')
})

const powerTopic = build((n, mode, index) => {
  if (mode === 0) return numberQuestion(`Lecture get_power(${n}, 2) ka result?`, n ** 2, `n × n = ${n ** 2}.`, index)
  if (mode === 1) return numberQuestion(`get_power(${n}, 3) ka result?`, n ** 3, `${n} × ${n} × ${n} = ${n ** 3}.`, index)
  if (mode === 2) return numberQuestion(`get_power(${n}, ${n}) mein k=0 base included total calls?`, n + 1, 'Exponent har call mein 1 ghata hai: n,n−1,…,0.', index)
  if (mode === 3) return numberQuestion(`get_power(${n}, ${n}) mein multiplication operations kitni?`, n, 'k>0 wale har frame mein ek multiplication, total n.', index)
  return numberQuestion(`get_power(${n}, 0) ka result?`, 1, 'Any nonzero base ka zeroth power 1; code ka base case return 1 hai.', index, 'Foundation')
})

const dsContext = build((n, mode, index) => {
  if (mode === 0) return numberQuestion(`Merge sort ${2 ** n} items ko halves mein split kare. Root aur one-element leaf included max active recursive frames?`, n + 1, `2^${n} se 1 tak ${n} halvings, plus root frame.`, index)
  if (mode === 1) return numberQuestion(`First-pivot quicksort sorted ${n}-item array par non-empty subproblems ki longest chain?`, n, 'Extreme pivot har partition mein size n−1 deta hai, phir n−2…1.', index)
  if (mode === 2) return numberQuestion(`${n}-node chain graph ki recursive DFS mein maximum active DFS frames?`, n, 'Ek path par har child call parent ke return se pehle active hai.', index)
  if (mode === 3) return textQuestion(`Array size ${2 ** n} par T(m)=2T(m/2)+Θ(m). Total time pattern?`, 'Θ(m log m)', ['Θ(m²)', 'Θ(log m)', 'Θ(1)'], 'Har level Θ(m) work, total Θ(log m) levels.', index, 'Practice')
  return textQuestion(`${n}-node cycle graph ki recursive DFS mein visited set na ho. Main risk?`, 'Nodes repeatedly revisited; recursion may not terminate', ['Always O(1)', 'Automatically cycle breaks', 'Nodes sort ho jaate hain'], 'Cycle ke around calls repeat hoti rahengi without visited check.', index, 'Practice')
})

export const module9Topics = [
  { id: 'intro', label: '9.1 · Introduction', questions: introduction },
  { id: 'internal', label: '9.2 · Internal Working', questions: internal },
  { id: 'factorial', label: '9.2.1 · Factorial Number', questions: factorialTopic },
  { id: 'fibonacci', label: '9.2.2 · Fibonacci', questions: fibonacciTopic },
  { id: 'mistakes', label: '9.3 · Common Mistakes', questions: mistakes },
  { id: 'iteration', label: '9.4 · Recursion vs Iteration', questions: iteration },
  { id: 'print-n', label: '9.5.1 · Print N to 1', questions: printN },
  { id: 'sum-n', label: '9.5.2 · Sum First N Natural Numbers', questions: sumNatural },
  { id: 'digits', label: '9.5.3 · Count Digits', questions: digits },
  { id: 'power', label: '9.5.4 · Power Function', questions: powerTopic },
  { id: 'context', label: '9.6 · DS Context', questions: dsContext }
]

export const module9QuestionCount = module9Topics.reduce((total, topic) => total + topic.questions.length, 0)
