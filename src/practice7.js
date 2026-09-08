const q = (prompt, options, answer, explanation, difficulty = 'Core', pattern = '') => ({ prompt, options, answer, explanation, difficulty, pattern })

const build = (label, seeds) => Array.from({ length: 50 }, (_, index) => {
  const source = seeds[index % seeds.length]
  const item = typeof source === 'function' ? source(index) : source
  return { ...item, prompt: item.prompt.replace('{n}', String(index + 1)) }
})

const linear = build('Linear search', [
  q('Linear search ka first comparison kis element se hota hai?', ['First element', 'Middle element', 'Last element', 'Random element'], 'First element', 'Linear search left se right, ek-ek item compare karta hai.', 'Foundation', 'start'),
  q('Unsorted list mein target find karne ke liye safe basic algorithm?', ['Linear search', 'Binary search', 'Merge sort only', 'Heap pop'], 'Linear search', 'Order required nahi hai, isliye unsorted data par linear search valid hai.', 'Foundation', 'unsorted'),
  q('n items mein target absent ho to linear search worst comparisons?', ['n', 'log₂n', '1', 'n²'], 'n', 'Absent target par har item check karna padta hai.', 'Core', 'worst case'),
  q('Target first item par ho to linear search time?', ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'], 'O(1)', 'First comparison mein target mil jata hai.', 'Core', 'best case'),
  q('arr=[8,3,9,3], key=3. First-match linear search ka returned index?', ['0', '1', '2', '3'], '1', 'Left-to-right scan mein index 1 par pehla 3 milta hai.', 'Core', 'duplicate'),
  q('Linear search iterative auxiliary space?', ['O(1)', 'O(n)', 'O(log n)', 'O(n²)'], 'O(1)', 'Sirf index/current aur key jaise fixed variables use hote hain.', 'Core', 'space'),
  q('Linear search mein har comparison ke baad not-found case mein kya zaroori hai?', ['Next position par advance', 'List sort', 'Middle jump', 'Rear delete'], 'Next position par advance', 'Index increment nahi hoga to same item repeat hoga.', 'Foundation', 'progress'),
  q('NAT: arr=[4,7,2,9,5], key=9. Linear search comparisons?', ['NAT · integer'], '4', '4, 7, 2, then 9: total four comparisons.', 'Practice', 'trace')
])

const binary = build('Binary search', [
  q('Binary search ka non-negotiable prerequisite?', ['Sorted data', 'Duplicate-free data', 'Linked list only', 'Queue'], 'Sorted data', 'Comparison se left/right half discard tabhi valid hai jab order known ho.', 'Foundation', 'sorted prerequisite'),
  q('Sorted Python list par midpoint index ka overflow-safe formula?', ['low + (high-low)//2', '(low+high)//2 only', 'high-low', 'low//high'], 'low + (high-low)//2', 'Python overflow issue nahi deta, but yeh portable standard formula hai.', 'Core', 'mid'),
  q('arr[mid] < key ho to ascending array mein next search interval?', ['low = mid + 1', 'high = mid - 1', 'low = 0', 'Stop always'], 'low = mid + 1', 'mid aur uske left values key se chhoti hain, so answer right half mein hoga.', 'Core', 'direction'),
  q('arr[mid] > key ho to ascending array mein next search interval?', ['high = mid - 1', 'low = mid + 1', 'high = n', 'Sort again'], 'high = mid - 1', 'mid aur right side values key se badi hain, so left half bachti hai.', 'Core', 'direction'),
  q('Binary search unsuccessful worst time?', ['O(log n)', 'O(1)', 'O(n)', 'O(n log n)'], 'O(log n)', 'Har comparison ke baad candidate interval roughly half hota hai.', 'Core', 'complexity'),
  q('Sorted singly linked list par ordinary binary search O(log n) kyun nahi?', ['Middle reach karna O(n) ho sakta hai', 'List unsorted hoti hai', 'Duplicates forbidden hain', 'Python slow hai'], 'Middle reach karna O(n) ho sakta hai', 'Binary search ko cheap random middle access chahiye; linked list mein woh direct nahi.', 'Practice', 'linked-list trap'),
  q('arr=[10,20,30,40,50], key=40, low=0 high=4. First mid index?', ['0', '1', '2', '3'], '2', '(0+4)//2 = 2, value 30. Phir low 3 hoga.', 'Core', 'trace'),
  q('NAT: 1000 sorted elements mein absent key ke maximum binary-search comparisons?', ['NAT · integer'], '10', '2⁹ < 1000 ≤ 2¹⁰, so longest unsuccessful path 10 checks leta hai.', 'Practice', 'exact PYQ transfer')
])

const exponentialTheory = build('Exponential search theory', [
  q('Exponential search sabse useful kab hoti hai?', ['Sorted unbounded/unknown-size search space', 'Unsorted list', 'Stack top', 'Hash lookup'], 'Sorted unbounded/unknown-size search space', 'Pehle range locate hoti hai, phir us range mein binary search.', 'Foundation', 'use case'),
  q('Exponential search ka phase 1 kya karta hai?', ['1,2,4,8… boundaries double karke range find', 'Har item linearly check', 'List reverse', 'Heapify'], '1,2,4,8… boundaries double karke range find', 'Target ki possible position ko quickly bracket karte hain.', 'Core', 'range doubling'),
  q('Range milne ke baad exponential search ka phase 2?', ['Us bounded range par binary search', 'Full list linear search', 'Queue dequeue', 'Only return'], 'Us bounded range par binary search', 'Doubling sirf bracket find karta hai; exact element binary search se milta hai.', 'Core', 'binary phase'),
  q('Target position i ho to exponential search time?', ['O(log i)', 'O(i)', 'O(n²)', 'O(1)'], 'O(log i)', 'Doubling aur small bounded binary search dono log i work lete hain.', 'Practice', 'complexity'),
  q('Target start ke near ho to exponential search ka benefit?', ['Small i par very few checks', 'Always n checks', 'Requires no sorting', 'Becomes stack'], 'Small i par very few checks', '1,2,4 boundary jaldi target ko cover kar leti hai.', 'Core', 'near start'),
  q('Exponential search ke liye data ordering?', ['Ascending/ordered required', 'Unordered fine', 'Circular only', 'Graph only'], 'Ascending/ordered required', 'Binary-search phase ke liye ordering compulsory hai.', 'Foundation', 'prerequisite'),
  q('arr[1], arr[2], arr[4] key se smaller, arr[8] key se greater. Binary search range?', ['[4, 8]', '[0, 8]', '[8, n-1]', '[1, 2]'], '[4, 8]', 'Last lower boundary 4 aur first upper boundary 8 ke beech answer ho sakta hai.', 'Core', 'bracket'),
  q('Exponential search worst case n elements mein?', ['O(log n)', 'O(n²)', 'O(n)', 'O(1)'], 'O(log n)', 'Target late/absent ho toh range n tak double hoti hai; still logarithmic checks.', 'Core', 'worst')
])

const exponentialCode = build('Exponential search code', [
  q('Exponential search empty array guard?', ['return -1', 'arr[0] read', 'return 0', 'Sort first'], 'return -1', 'Empty array mein index 0 valid nahi.', 'Foundation', 'empty'),
  q('arr[0] == key check kyun useful hai?', ['First item O(1) mein mil sakta hai', 'Sorting required', 'Index 0 invalid', 'Binary search forbidden'], 'First item O(1) mein mil sakta hai', 'Target first element ho toh doubling phase ki need nahi.', 'Core', 'first item'),
  q('Doubling loop boundary safety?', ['i < n and arr[i] <= key', 'i <= n only', 'arr[i] always', 'i = i - 1'], 'i < n and arr[i] <= key', 'Pehle i<n test karna index-out-of-range prevent karta hai.', 'Core', 'guard'),
  q('Python bounded binary search ka upper index kya hona chahiye?', ['min(i, n-1)', 'i always', 'n', '-1'], 'min(i, n-1)', 'Last doubled i array length cross kar sakta hai.', 'Core', 'boundary'),
  q('If key not found after bounded binary search, standard return?', ['-1', '0', 'None only', 'n'], '-1', 'Index-returning search convention mein -1 means absent.', 'Foundation', 'sentinel'),
  q('arr=[3,6,9,12,15,18], key=15. Doubling i values until bracket?', ['1,2,4', '0,1,2', '1,3,5', '2,4,8 only'], '1,2,4', 'arr[1]=6 and arr[2]=9 smaller; arr[4]=15 reaches key range.', 'Practice', 'trace'),
  q('NAT: arr=[2,4,6,8,10], key=7. Correct returned index?', ['NAT · integer'], '-1', '7 sorted array mein present nahi, bounded binary search bhi -1 return karega.', 'Core', 'absent'),
  q('Exponential function ka final binary-search interval correct kyun limited hona chahiye?', ['Unnecessary large range avoid aur bounds safe rahen', 'Binary search needs queue', 'To reverse result', 'Duplicates remove karne ke liye'], 'Unnecessary large range avoid aur bounds safe rahen', 'Doubling ne target ka possible window already identify kar diya.', 'Practice', 'design')
])

const context = build('Search DS context', [
  q('Unsorted array mein membership check ka default?', ['Linear search', 'Binary search', 'Exponential search', 'Priority queue'], 'Linear search', 'Order absent hai; binary/exponential ki discard logic invalid hai.', 'Foundation', 'selection'),
  q('Sorted array mein repeated lookups ke liye best basic choice?', ['Binary search', 'Linear search always', 'Stack', 'Queue'], 'Binary search', 'Array middle access O(1) aur order dono available hain.', 'Core', 'selection'),
  q('Hash table average membership lookup?', ['O(1) average', 'O(log n) always', 'O(n²)', 'Impossible'], 'O(1) average', 'Hashing direct bucket lookup target karti hai; collision assumptions matter karte hain.', 'Core', 'hash contrast'),
  q('BFS mein next vertex find karne ka core data structure?', ['Queue', 'Binary search', 'Stack only', 'Sort'], 'Queue', 'BFS frontier FIFO hota hai; search algorithm type ko DS search se mix mat karo.', 'Practice', 'terminology trap'),
  q('Sorted linked list par key search worst case?', ['O(n)', 'O(log n)', 'O(1)', 'O(n²)'], 'O(n)', 'Ordering early stop de sakti hai, but sequential traversal worst-case linear hai.', 'Core', 'linked'),
  q('GATE wording “array sorted hai, target absent hai” mostly kya test karti hai?', ['Binary search trace/bounds', 'Queue operation', 'Linked pointer', 'Hash collision'], 'Binary search trace/bounds', 'low, high, mid aur termination carefully trace karo.', 'Practice', 'GATE cue'),
  q('Linear search ka best case and worst case pair?', ['O(1), O(n)', 'O(log n), O(n)', 'O(n), O(n)', 'O(1), O(1)'], 'O(1), O(n)', 'First item vs absent/last item.', 'Core', 'cases'),
  q('Exponential search is NOT a replacement for binary search because?', ['Exact search phase binary search hi use karta hai', 'It needs unsorted data', 'It is a stack', 'It deletes values'], 'Exact search phase binary search hi use karta hai', 'Exponential part range find karta hai, exact location binary search deta hai.', 'Practice', 'relationship')
])

export const module7Topics = [
  { id: 'linear', label: '7.1 · Linear Search', questions: linear },
  { id: 'binary', label: '7.2 · Binary Search', questions: binary },
  { id: 'exponential-theory', label: '7.3.1 · Exponential Search (Theory)', questions: exponentialTheory },
  { id: 'exponential-code', label: '7.3.2 · Exponential Search (Code)', questions: exponentialCode },
  { id: 'context', label: '7.4 · DS Context', questions: context }
]

export const module7QuestionCount = module7Topics.reduce((sum, topic) => sum + topic.questions.length, 0)
