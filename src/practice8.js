const q = (prompt, options, answer, explanation, difficulty = 'Core', pattern = '') => ({ prompt, options, answer, explanation, difficulty, pattern })

// Each lecture deliberately owns its own 50-question drill. The seed pool is cycled
// because the rendered questions are practice prompts, not a claim of 50 PYQs.
const fifty = seeds => Array.from({ length: 50 }, (_, index) => ({ ...seeds[index % seeds.length], id: index + 1 }))

const intro = fifty([
  q('Sorting ka main output kya hota hai?', ['Items in a chosen order', 'Only smallest item', 'A queue', 'A hash table'], 'Items in a chosen order', 'Ascending ya descending order ek defined comparison rule ke according banaya jata hai.', 'Foundation'),
  q('arr=[3,1,2] ascending sort ke baad?', ['[1,2,3]', '[3,2,1]', '[2,1,3]', '[1,3,2]'], '[1,2,3]', 'Ascending means small value pehle, then larger values.', 'Foundation'),
  q('In-place sorting ka matlab?', ['Input array itself rearrange hota hai', 'New n-size array compulsory', 'Array never changes', 'Only linked list use hoti hai'], 'Input array itself rearrange hota hai', 'Auxiliary memory O(1) ya small hoti hai; original storage mein values rearrange hoti hain.', 'Core'),
  q('Stable sort equal keys ke baare mein kya preserve karta hai?', ['Their original relative order', 'Only their values', 'Their memory address', 'Nothing'], 'Their original relative order', 'Example: (5,A) before (5,B) tha, stable sort ke baad bhi A before B rahega.', 'Core'),
  q('Comparison sort lower-bound discussion kis model mein hoti hai?', ['Only comparisons decide order', 'Hash lookup', 'Graph traversal', 'File I/O'], 'Only comparisons decide order', 'Comparison-based algorithms pairwise ordering information se decide karte hain.', 'Practice'),
  q('NAT: n distinct items ki sorted order check karne ke liye adjacent comparisons kitne?', ['NAT · integer'], 'n-1', 'Every adjacent pair a[i] <= a[i+1] verify hoti hai, so n-1 checks.', 'Practice')
])

const bubbleTheory = fifty([
  q('Bubble sort ek pass mein kya guarantee karta hai?', ['Largest unsorted item end par pahunchta hai', 'Smallest item start par', 'Whole array sorted', 'Middle item fixed'], 'Largest unsorted item end par pahunchta hai', 'Adjacent out-of-order pairs swap hote hote maximum right end tak bubble karta hai.', 'Foundation'),
  q('Bubble sort comparison kis pair par karta hai?', ['Adjacent elements', 'Random elements', 'Only first and last', 'Tree children'], 'Adjacent elements', 'a[j] aur a[j+1] compare hote hain.', 'Foundation'),
  q('Bubble sort stable kab rehta hai?', ['Swap only when left > right', 'Swap when left >= right', 'Always reverse', 'Never swap'], 'Swap only when left > right', 'Equal elements swap nahi honge, so their relative order preserve hota hai.', 'Core'),
  q('Bubble sort worst-case time?', ['O(n²)', 'O(log n)', 'O(n)', 'O(1)'], 'O(n²)', 'About n passes and each pass about n comparisons.', 'Core'),
  q('Optimised bubble sort already sorted array par?', ['O(n) with no-swap flag', 'O(n²) always', 'O(log n)', 'O(1)'], 'O(n) with no-swap flag', 'First pass mein no swap mile to array already sorted hai.', 'Practice'),
  q('arr=[4,3,2,1,5] bubble sort ke two passes baad sorted?', ['No', 'Yes', 'Only duplicates ke saath', 'Undefined'], 'No', 'Pass 1: [3,2,1,4,5]; pass 2: [2,1,3,4,5], still 2 and 1 wrong order.', 'Practice')
])

const bubbleCode = fifty([
  q('Bubble sort inner loop end har pass mein kyun reduce hota hai?', ['Largest suffix already fixed hai', 'Array smaller ho jata hai', 'Python requires it', 'To remove duplicates'], 'Largest suffix already fixed hai', 'Pass ke end par largest remaining element final position par hota hai.', 'Core'),
  q('Bubble code mein swapped flag false rahe to?', ['Break early', 'Reverse array', 'Double n', 'Raise error'], 'Break early', 'No adjacent inversion means array sorted hai.', 'Core'),
  q('Bubble comparison guard ascending code mein?', ['if arr[j] > arr[j+1]', 'if arr[j] < arr[j+1]', 'if j == 0', 'if arr is None'], 'if arr[j] > arr[j+1]', 'Wrong order only when left item right item se bada hai.', 'Foundation'),
  q('NAT: [3,1,2] first bubble pass after j=0 and j=1?', ['NAT · array'], '[1,2,3]', '3 swaps with 1, then 3 swaps with 2.', 'Practice'),
  q('Bubble sort auxiliary space iterative in-place?', ['O(1)', 'O(n)', 'O(log n)', 'O(n²)'], 'O(1)', 'Temporary swap variable fixed count ka hota hai.', 'Core'),
  q('Bubble sort equal values ko preserve karne wala operator?', ['>', '>=', '<=', '!='], '>', 'Equal pair swap nahi hoga.', 'Practice')
])

const selectionTheory = fifty([
  q('Selection sort har pass mein kya select karta hai?', ['Smallest unsorted item', 'Largest item only', 'Random pivot', 'Middle key'], 'Smallest unsorted item', 'Unsorted region scan karke minimum ko its final front position par le jaate hain.', 'Foundation'),
  q('Selection sort first pass ka invariant?', ['Index 0 contains global minimum', 'Last value maximum', 'All sorted', 'No comparison done'], 'Index 0 contains global minimum', 'Minimum find karke a[0] se swap hota hai.', 'Core'),
  q('Selection sort comparisons best/worst case?', ['Both O(n²)', 'O(n), O(n²)', 'Both O(log n)', 'Both O(n)'], 'Both O(n²)', 'Input already sorted ho tab bhi minimum find karne ke liye unsorted region scan hota hai.', 'Core'),
  q('Selection sort swaps maximum approximately?', ['O(n)', 'O(n²)', 'O(log n)', '0'], 'O(n)', 'Har outer pass mein at most one swap.', 'Core'),
  q('Standard selection sort stable?', ['No, generally not', 'Yes always', 'Only empty list', 'It is not a sort'], 'No, generally not', 'A long-distance swap equal-key item ka relative order change kar sakta hai.', 'Practice'),
  q('arr=[4,3,2,1,5] two selection passes ke baad sorted?', ['Yes', 'No', 'Only descending', 'Undefined'], 'Yes', 'Pass 1 puts 1 at index 0: [1,3,2,4,5]; pass 2 puts 2 at index 1: sorted.', 'Practice')
])

const selectionCode = fifty([
  q('Selection sort code mein min_index initially?', ['i', '0 always', 'n-1', 'None'], 'i', 'Current unsorted part starts at i, so initially it is current minimum candidate.', 'Core'),
  q('arr[j] < arr[min_index] mile to?', ['min_index = j', 'swap immediately always', 'break', 'j = 0'], 'min_index = j', 'Scan complete karke only one final swap karna selection sort ka structure hai.', 'Core'),
  q('Selection sort outer loop i range?', ['0 to n-2', '0 to n', '1 to n', 'n to 0'], '0 to n-2', 'Last remaining element automatically correct position par hota hai.', 'Foundation'),
  q('NAT: [29,10,14,37,13] first selection pass result?', ['NAT · array'], '[10,29,14,37,13]', 'Minimum 10 index 1 par tha; it swaps with 29.', 'Practice'),
  q('Selection sort in-place?', ['Yes', 'No, always n array', 'Only recursion', 'Only linked list'], 'Yes', 'Minimum index aur temporary swap variable enough hote hain.', 'Core'),
  q('Selection code equal values par < use kare to first minimum?', ['First encountered minimum', 'Last encountered minimum', 'Random', 'No minimum'], 'First encountered minimum', 'Strict < equal value par min_index update nahi karta.', 'Practice')
])

const insertionTheory = fifty([
  q('Insertion sort sorted prefix ko kaise grow karta hai?', ['Next key ko correct prefix position par insert karke', 'Largest suffix delete karke', 'Pivot select karke', 'Queue use karke'], 'Next key ko correct prefix position par insert karke', 'Left side har iteration ke baad sorted prefix hota hai.', 'Foundation'),
  q('Insertion sort nearly sorted array par kyun good hai?', ['Few shifts needed', 'No comparisons', 'Always O(1)', 'It uses hashing'], 'Few shifts needed', 'Key apni correct jagah ke close hoti hai.', 'Core'),
  q('Insertion sort stable guard?', ['Shift while arr[j] > key', 'Shift while arr[j] >= key', 'Always swap equals', 'Use pivot'], 'Shift while arr[j] > key', 'Equal item ko cross nahi karte, relative order remains.', 'Core'),
  q('Insertion sort worst case?', ['Reverse sorted array', 'Already sorted array', 'Single item only', 'All equal only'], 'Reverse sorted array', 'Har new key ko prefix ke start tak shift hona pad sakta hai.', 'Core'),
  q('Insertion sort best case time?', ['O(n)', 'O(n²)', 'O(log n)', 'O(1)'], 'O(n)', 'Already sorted input mein inner while har key ke liye immediately stop hota hai.', 'Practice'),
  q('GATE 2025 array [1,3,5,7,9,11,x,15,13] exactly two swaps: possible x?', ['10, 12, 14', '16 only', '10 only', 'All options'], '10, 12, 14', 'For x=10/12/14 there is one inversion involving x and one involving 15,13; x=16 gives three inversions.', 'Practice', 'PYQ transfer')
])

const insertionCode = fifty([
  q('Insertion code mein key kya hold karta hai?', ['Current value before shifts', 'Array length', 'Minimum index', 'Pivot'], 'Current value before shifts', 'Shifts overwrite locations, so original current value key mein save hoti hai.', 'Core'),
  q('Insertion code j = i - 1 kyun?', ['Sorted prefix ka last index', 'First index always', 'Array end', 'No reason'], 'Sorted prefix ka last index', 'Current key ke left ka prefix already sorted hota hai.', 'Core'),
  q('while j >= 0 and arr[j] > key ke baad?', ['arr[j+1] = key', 'arr[j] = key', 'return j', 'delete key'], 'arr[j+1] = key', 'j last greater item ke just left par aata hai, so insertion slot j+1 hai.', 'Foundation'),
  q('NAT: [5,2,4] i=1 iteration ke baad?', ['NAT · array'], '[2,5,4]', 'key=2; 5 right shift; then key index 0 par insert.', 'Practice'),
  q('Insertion sort auxiliary space?', ['O(1)', 'O(n)', 'O(log n)', 'O(n²)'], 'O(1)', 'key aur j fixed extra variables hain.', 'Core'),
  q('Insertion sort inversions ke relation mein shifts?', ['One shift per inversion', 'Always n shifts', 'No shifts', 'Only one total'], 'One shift per inversion', 'Each out-of-order earlier element key ke right shift hota hai.', 'Practice')
])

const mergeTheory = fifty([
  q('Merge sort main strategy?', ['Divide and conquer', 'Greedy minimum scan', 'Stack-only', 'Hashing'], 'Divide and conquer', 'Array halves mein break hoti hai, recursively sort hoti hai, then merge.', 'Foundation'),
  q('Merge sort merge phase input?', ['Two sorted subarrays', 'Two random subarrays', 'A stack and queue', 'Only one value'], 'Two sorted subarrays', 'Two sorted lists ke front values compare karke linear merge hota hai.', 'Core'),
  q('Merge sort worst-case time?', ['O(n log n)', 'O(n²)', 'O(log n)', 'O(1)'], 'O(n log n)', 'log n levels, har level par total n merging work.', 'Core'),
  q('Standard array merge sort auxiliary space?', ['O(n)', 'O(1)', 'O(log n) only', 'O(n²)'], 'O(n)', 'Merge ke liye temporary arrays/buffer use hota hai.', 'Core'),
  q('Merge sort stable merge rule?', ['Take left when equal', 'Take right when equal always', 'Swap equal values', 'Discard equal'], 'Take left when equal', 'Left subarray ka original element before right equal element remains.', 'Practice'),
  q('Merge sort recursion depth?', ['O(log n)', 'O(n)', 'O(n²)', 'O(1)'], 'O(log n)', 'Har recursive call subproblem half karta hai.', 'Practice')
])

const mergeCode = fifty([
  q('Merge function mein i aur j kya track karte hain?', ['Left and right subarray current positions', 'Array length', 'Pivot values', 'Swap count'], 'Left and right subarray current positions', 'Dono sorted halves ka next unmerged candidate track hota hai.', 'Core'),
  q('left[i] <= right[j] par left choose karne se?', ['Stability preserve hoti hai', 'Array reverse hota hai', 'Time O(n²)', 'No result'], 'Stability preserve hoti hai', 'Equal values mein original left-half value first rehti hai.', 'Core'),
  q('Merge loop ke baad remaining left/right values?', ['Append all remaining values', 'Discard', 'Sort again', 'Set to zero'], 'Append all remaining values', 'Ek half exhaust ho jaye to doosra half already sorted hai.', 'Foundation'),
  q('NAT: merge [1,4,7] and [2,3,8] result?', ['NAT · array'], '[1,2,3,4,7,8]', 'Front candidates compare sequence 1,2,3,4,7, then 8.', 'Practice'),
  q('Merge sort source code termination base case?', ['len(arr) <= 1', 'len(arr) == n', 'arr[0] == 0', 'Always recurse'], 'len(arr) <= 1', 'Zero/one element already sorted hai.', 'Core'),
  q('Merge sort no input mutation version can return?', ['New sorted list', 'Only boolean', 'Queue', 'Pivot'], 'New sorted list', 'Python slicing/merge approach new lists construct kar sakti hai.', 'Practice')
])

const quickTheory = fifty([
  q('Quick sort ka partition result?', ['Pivot final position par, smaller one side and larger other side', 'Both halves fully sorted', 'Only minimum found', 'Array copied'], 'Pivot final position par, smaller one side and larger other side', 'Partition after pivot correctly placed; subarrays recursively sort hote hain.', 'Foundation'),
  q('Quick sort average time?', ['O(n log n)', 'O(n²)', 'O(1)', 'O(log n)'], 'O(n log n)', 'Random/balanced expected partitions average logarithmic depth dete hain.', 'Core'),
  q('Quick sort worst case?', ['O(n²)', 'O(n log n)', 'O(1)', 'O(log n)'], 'O(n²)', 'Highly unbalanced partition every call n-1 and 0 size recurse kar sakta hai.', 'Core'),
  q('Quick sort standard stable?', ['No, generally not', 'Yes always', 'Only duplicates', 'Not a sort'], 'No, generally not', 'In-place partition swaps equal keys ka order change kar sakti hai.', 'Core'),
  q('Quick sort extra space average recursion stack?', ['O(log n)', 'O(n²)', 'O(1) always', 'O(n) buffer'], 'O(log n)', 'Balanced calls ke saath recursive depth logarithmic hoti hai.', 'Practice'),
  q('GATE 2026 random distinct input, first pivot expected recurrence?', ['Average over all split positions + O(n)', 'T(1)+T(n-1)+O(n) only', '2T(n/2)+O(n) always', 'T(n-1)'], 'Average over all split positions + O(n)', 'Random order with first pivot means pivot rank equally possible; expected recurrence splits ka average leti hai.', 'Practice', 'PYQ transfer')
])

const quickCode = fifty([
  q('Lomuto partition last pivot version mein pivot?', ['arr[high]', 'arr[low]', 'arr[mid]', 'None'], 'arr[high]', 'Lecture condition says last element pivot.', 'Core'),
  q('Partition index i initially?', ['low - 1', 'low', 'high', '0 always'], 'low - 1', 'i last position ko track karta hai where value <= pivot placed hai.', 'Core'),
  q('arr[j] <= pivot ho to Lomuto partition?', ['i increment and swap arr[i], arr[j]', 'high decrement only', 'return', 'reverse'], 'i increment and swap arr[i], arr[j]', 'Small/equal value left partition mein grow hoti hai.', 'Core'),
  q('Partition return kya hota hai?', ['Pivot final index', 'Array length', 'Swap count', 'Minimum'], 'Pivot final index', 'Pivot swap after i; resulting i+1 its final sorted position hai.', 'Foundation'),
  q('GATE 2024 sorted [60,70,80,90,100], last-element-pivot quicksort minimum non-self swaps?', ['NAT · integer'], '0', 'Already sorted input mein every last pivot already correct position par hai; minimum useful swaps zero.', 'Practice', 'PYQ transfer'),
  q('Quick sort recursive calls partition index p ke around?', ['low..p-1 and p+1..high', 'low..p and p..high', '0..n always', 'No calls'], 'low..p-1 and p+1..high', 'Pivot p final position par hai, so it is excluded.', 'Core')
])

const countingTheory = fifty([
  q('Counting sort best suited for?', ['Small integer key range', 'Arbitrary huge objects', 'Linked pointers only', 'Graphs'], 'Small integer key range', 'Frequency count size depends on value range k.', 'Foundation'),
  q('Counting sort time complexity?', ['O(n + k)', 'O(n log n)', 'O(n²)', 'O(log n)'], 'O(n + k)', 'n input elements plus k range positions process hote hain.', 'Core'),
  q('Counting sort comparison-based hai?', ['No', 'Yes', 'Only stable version', 'Only Python'], 'No', 'Direct key frequency/count indexing use karta hai, element comparisons se ordering decide nahi.', 'Core'),
  q('Counting sort k kya hai?', ['Value range size', 'Number of swaps', 'Recursion depth', 'Pivot index'], 'Value range size', 'Usually maxValue - minValue + 1 after offset handling.', 'Core'),
  q('Counting sort large sparse range par problem?', ['Count array too large', 'No input access', 'Cannot count duplicates', 'It becomes stable'], 'Count array too large', 'n small but k huge ho to O(k) memory/time wasteful hota hai.', 'Practice'),
  q('Stable counting sort output placement uses?', ['Cumulative counts and right-to-left scan', 'Random swaps', 'Pivot', 'Only min scan'], 'Cumulative counts and right-to-left scan', 'Right-to-left preserves relative order of equal keys.', 'Practice')
])

const countingCode = fifty([
  q('count[arr[i]] += 1 kya store karta hai?', ['Value frequency', 'Sorted index directly', 'Pivot', 'Recursion depth'], 'Value frequency', 'Every key occurrence ka count bucket increment hota hai.', 'Core'),
  q('Negative values counting sort mein handle karne ke liye?', ['Offset by minimum value', 'Ignore negatives', 'Use binary search', 'Reverse array'], 'Offset by minimum value', 'Index nonnegative hona chahiye; arr[i]-min_value bucket index bana sakte hain.', 'Core'),
  q('Cumulative count c[v] kya bata sakta hai?', ['Values <= v ki total count', 'Only v frequency', 'Maximum value', 'Swap count'], 'Values <= v ki total count', 'It gives ending position boundary for v in sorted output.', 'Core'),
  q('NAT: [2,0,2,1,1,0] sorted counting output?', ['NAT · array'], '[0,0,1,1,2,2]', 'Frequencies 0:2, 1:2, 2:2.', 'Practice'),
  q('Counting sort output array stable version space?', ['O(n+k)', 'O(1)', 'O(log n)', 'O(n²)'], 'O(n+k)', 'Count array k plus output n use hote hain.', 'Core'),
  q('Counting sort with max=10^9, n=10 usually?', ['Poor choice', 'Best always', 'O(1)', 'Identical to merge'], 'Poor choice', 'Range k enormous hai compared to data count n.', 'Practice')
])

const complexity = fifty([
  q('Bubble, selection, insertion worst time?', ['O(n²)', 'O(n log n)', 'O(n)', 'O(1)'], 'O(n²)', 'Quadratic nested-pass behavior.', 'Foundation'),
  q('Merge sort worst time?', ['O(n log n)', 'O(n²)', 'O(n)', 'O(1)'], 'O(n log n)', 'All levels combined n work, number of levels log n.', 'Foundation'),
  q('Quick sort expected vs worst?', ['O(n log n), O(n²)', 'O(n²), O(n log n)', 'O(n), O(n)', 'O(log n), O(n)'], 'O(n log n), O(n²)', 'Partition quality decides recursion depth.', 'Core'),
  q('Counting sort complexity statement?', ['O(n+k)', 'O(n log n) always', 'O(n²)', 'O(1)'], 'O(n+k)', 'It depends on keys range k.', 'Core'),
  q('Stable standard algorithms?', ['Bubble, insertion, merge', 'Selection, quick only', 'Counting never', 'All always'], 'Bubble, insertion, merge', 'With ordinary correct implementations, those preserve equals; selection/quick generally do not.', 'Practice'),
  q('In-place standard algorithms?', ['Bubble, selection, insertion, quick', 'Merge only', 'Counting stable only', 'None'], 'Bubble, selection, insertion, quick', 'Standard array merge/counting need extra buffers.', 'Practice')
])

const context = fifty([
  q('Nearly sorted data ke liye natural basic choice?', ['Insertion sort', 'Selection sort', 'Counting sort always', 'BFS'], 'Insertion sort', 'Few inversions mean few shifts.', 'Foundation'),
  q('Few writes/swaps important hon to basic sort?', ['Selection sort', 'Bubble sort', 'Merge sort', 'Counting sort'], 'Selection sort', 'At most one swap per pass, comparisons still O(n²).', 'Core'),
  q('Guaranteed O(n log n) and stable required?', ['Merge sort', 'Quick sort', 'Selection sort', 'Bubble sort'], 'Merge sort', 'Worst-case guarantee + stable merge, with O(n) extra space.', 'Core'),
  q('Average fast in-place but worst-case warning?', ['Quick sort', 'Merge sort', 'Counting sort', 'Insertion only'], 'Quick sort', 'Bad pivot choices can produce unbalanced O(n²) recursion.', 'Core'),
  q('Small bounded integer range?', ['Counting sort', 'Quick sort only', 'Binary search', 'Queue'], 'Counting sort', 'O(n+k) can beat comparison sorting when k manageable.', 'Practice'),
  q('GATE 2024 [4,3,2,1,5] exactly two passes?', ['Selection only', 'Bubble only', 'Insertion only', 'Bubble and insertion'], 'Selection only', 'Two selection passes make [1,2,3,4,5]; bubble/insertion do not finish in two.', 'Practice', 'PYQ transfer')
])

export const module8Topics = [
  ['intro', '8.1 · Introduction', intro],
  ['bubble-theory', '8.2.1 · Bubble Sort (theory)', bubbleTheory],
  ['bubble-code', '8.2.2 · Bubble Sort (code)', bubbleCode],
  ['selection-theory', '8.3.1 · Selection Sort (theory)', selectionTheory],
  ['selection-code', '8.3.2 · Selection Sort (code)', selectionCode],
  ['insertion-theory', '8.4.1 · Insertion Sort (theory)', insertionTheory],
  ['insertion-code', '8.4.2 · Insertion Sort (code)', insertionCode],
  ['merge-theory', '8.5.1 · Merge Sort (theory)', mergeTheory],
  ['merge-code', '8.5.2 · Merge Sort (code)', mergeCode],
  ['quick-theory', '8.6.1 · Quick Sort (theory)', quickTheory],
  ['quick-code', '8.6.2 · Quick Sort (code)', quickCode],
  ['counting-theory', '8.7.1 · Counting Sort (theory)', countingTheory],
  ['counting-code', '8.7.2 · Counting Sort (code)', countingCode],
  ['complexity', '8.8 · Complexity Analysis', complexity],
  ['context', '8.9 · DS Context', context]
].map(([id, label, questions]) => ({ id, label, questions }))

export const module8QuestionCount = module8Topics.reduce((sum, topic) => sum + topic.questions.length, 0)
