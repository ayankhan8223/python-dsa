const make = (prompt, answer, wrong, explanation, index, difficulty = 'Core') => {
  const correct = String(answer)
  const options = [correct, ...wrong.map(String)]
  if (new Set(options).size !== 4) throw new Error('Duplicate choices: ' + prompt)
  const shift = index % 4
  return { id: index + 1, prompt, answer: correct, options: [...options.slice(shift), ...options.slice(0, shift)], explanation, difficulty }
}
const num = (prompt, answer, explanation, index, difficulty = 'Core') => make(prompt, answer, [answer + 1, answer - 1, answer + 2], explanation, index, difficulty)
const text = (prompt, answer, wrong, explanation, index, difficulty = 'Core') => make(prompt, answer, wrong, explanation, index, difficulty)
const build = generator => Array.from({ length: 50 }, (_, index) => generator(2 + Math.floor(index / 5), index % 5, index))
const intro = build((n, mode, i) => {
  if (mode === 0) return num(`m=${n+5}; key=${n+12}; h(k)=k%m. Candidate bucket index?`, (n+12)%(n+5), 'Table index h(k) modulo m se banta hai.', i, 'Foundation')
  if (mode === 1) return text(`${n} keys mein lookup ka final equality check kyun chahiye?`, 'Different keys same bucket mein aa sakti hain', ['Hash values must all be unique','Modulo returns original key','Every lookup scans full table'], 'Bucket only candidate deta hai; key compare karke actual match confirm hota hai.', i)
  if (mode === 2) return text(`${n} buckets waali hash table par average lookup ka standard target time?`, 'Expected O(1)', ['Guaranteed O(1) worst','Always O(n²)','O(log n) always'], 'Good distribution and load control ke under expected constant time.', i)
  if (mode === 3) return text(`${n} keys ek hi bucket mein collide ho jayein; chaining search worst time?`, 'O(n)', ['O(1) guaranteed','O(log n)','O(n²)'], 'Worst chain ko sequentially scan karna pad sakta hai.', i, 'GATE')
  return text(`Hashing route key→hash→index for table size ${n+5}: index kis range mein?`, `0 to ${n+4}`, [`1 to ${n+5}`,'Any integer, unbounded','Only prime indices'], 'Modulo m gives indices 0 to m−1.', i, 'Foundation')
})
const hashFunction = build((n, mode, i) => {
  const m=n+4
  if (mode === 0) return num(`simple_hash key = 'a' repeated ${n} times; ord('a')=97. Raw hash?`, 97*n, 'Simple sum adds each character code; no modulo yet.', i)
  if (mode === 1) return num(`Raw hash ${97*n} and table size ${m}: final bucket?`, (97*n)%m, 'Final index raw_hash % table_size.', i)
  if (mode === 2) return num(`Simple sum: '${'a'.repeat(n)}b', ord('a')=97 aur ord('b')=98. Raw hash?`, 97*n+98, 'Har a ka 97 aur last b ka 98 add karo; abhi modulo nahi.', i)
  if (mode === 3) return text(`For fixed key K${n}, repeated same custom simple_hash call kya deta hai?`, 'Same integer', ['Random integer every time','Different length','Always zero'], 'Deterministic teaching hash same input par same output deta hai.', i, 'Foundation')
  return text(`Key ka raw hash ${97*n} aur table size ${m} hai. Correct flow?`, `Raw hash ${97*n}; bucket ${(97*n)%m}`, [`Raw hash ${(97*n)%m}; bucket ${97*n}`,'Raw hash and bucket must match','Bucket index cannot be computed'], 'Pehle function raw hash deta hai, phir modulo m valid table index deta hai.', i, 'GATE')
})
const functionCode = build((n, mode, i) => {
  const ascii=97+n
  if (mode === 0) return num(`Course multiplicative_hash single character with ord=${ascii}, initial h=1: result?`, 31+ascii, 'h=1×31+ord(char).', i)
  if (mode === 1) return num(`Correct DJB2 single character ord=${ascii}, initial h=5381: result?`, 5381*33+ascii, 'DJB2 multiplies old hash by 33 then adds ord.', i)
  if (mode === 2) return text(`Notebook DJB2 line without assignment, input length ${n}: returned h?`, '5381', ['Depends on characters','0','33'], 'Expression computed but never stored back in h.', i, 'GATE')
  if (mode === 3) return text(`multiplicative_hash with 31 mixing: string of ${n} chars mein order effect?`, 'Order generally changes hash', ['Order never matters','Only length matters','Always zero'], 'Each step multiplies previous state, so positions influence result.', i)
  return text(`hash('word${n}') ka exact number alag Python process mein?`, 'Not safe to assume identical', ['Always fixed by language','Always equals simple ASCII sum','Always within 0..9'], 'Python string hashes are salted across processes; paper-supplied function use karo.', i, 'GATE')
})
const hashTable = build((n, mode, i) => {
  const m=n+5,k=n+12
  if (mode === 0) return num(`Table size ${m}, h(k)=k%m, key ${k} ka initial slot?`, k%m, 'Modulo m gives initial bucket.', i)
  if (mode === 1) return num(`Table size ${m} mein valid indices kitne?`, m, '0 through m−1 gives m slots.', i, 'Foundation')
  if (mode === 2) return num(`Key ${n} and ${n+m} for h(k)=k%${m}: dono ka same bucket index?`, n%m, 'Difference exactly m hai, so same remainder.', i)
  if (mode === 3) return text(`m=${m} wali hash table aur bucket mein difference?`, 'Table is whole structure; bucket is one indexed position', ['Bucket is whole structure; table is one key','Both mean the raw hash number','Bucket is always the stored value'], 'Table mein m indexed positions hain; unmein se ek position bucket hai.', i, 'Foundation')
  return text(`Hash table with ${m} slots: raw hash can be larger than m?`, 'Yes', ['No','Only for strings','Only if collision'], 'Modulo raw hash ko valid index mein map karta hai.', i, 'Foundation')
})
const collision = build((n, mode, i) => {
  const m=n+3
  if (mode === 0) return num(`h(k)=k%${m}: keys ${n} and ${n+m} collide at which index?`, n%m, 'Keys differ by m so same remainder.', i)
  if (mode === 1) return text(`${n+3} slots aur infinitely many possible keys: collisions?`, 'Unavoidable', ['Impossible','Only with bad code','Only after table full'], 'Pigeonhole principle: more keys than slots can map into same slot.', i)
  if (mode === 2) return text(`Keys ${n} and ${n+m} collide. Are they duplicates?`, 'No, different keys', ['Yes, same key','Cannot tell hash index','Both erased'], 'Collision means same candidate bucket, not equal keys.', i)
  if (mode === 3) return text(`Collision resolution storing entries in same bucket list is called? Example m=${m}.`, 'Chaining', ['Linear probing','Quadratic probing','Binary search'], 'Separate chaining keeps a list per bucket.', i)
  return text(`m=${m}; home bucket occupied hai. Open addressing mein colliding key ko kahan rakhte hain?`, 'Same base table ke probe sequence mein free slot par', ['Home bucket ki inner list mein','Existing key ke upar overwrite','Hamesha last index par'], 'Linear aur quadratic probing same table ke candidate slots check karte hain; chaining bucket ki inner list use karti hai.', i, 'GATE')
})
const chaining = build((n, mode, i) => {
  if (mode === 0) return num(`One chain has ${n} unequal keys; unsuccessful search may compare how many?`, n, 'Entire chain scanned before absence known.', i, 'GATE')
  if (mode === 1) return text(`Chaining insert existing key K${n} with new value: correct effect?`, 'Update same entry, no duplicate key', ['Append duplicate key too','Delete whole bucket','Move every key'], 'Dict semantics keep one entry per key; return after update.', i)
  if (mode === 2) return text(`Chaining with ${n} keys and fewer buckets: α can exceed 1?`, 'Yes', ['No','Only if key negative','Only for quadratic probing'], 'Multiple keys can live in one bucket list.', i)
  if (mode === 3) return num(`Bucket chain [A,B,C,…] length ${n}; key at position 1 (first) needs how many key comparisons?`, 1, 'First item matching needs one equality test.', i, 'Foundation')
  return num(`All ${n} keys same bucket; successful search for last key needs how many comparisons?`, n, 'Search visits all previous keys then last.', i, 'GATE')
})
const linear = build((n, mode, i) => {
  const m=n+4,h=n+3
  if (mode === 0) return num(`Linear probing: m=${m}, home h=${h} (last index), home occupied. First retry index?`, 0, 'h+1 wraps modulo m to 0.', i)
  if (mode === 1) return num(`Linear probing: m=${m}, home h=${h}; home and next slot occupied. Third probe index?`, 1, 'Probe h,h+1,h+2 modulo m; last index wraps to 0 then 1.', i)
  if (mode === 2) return num(`Home index ${n} in m=${m}; i=2 linear probe index (h+i)%m?`, (n+2)%m, 'Add offset i=2 then modulo.', i)
  if (mode === 3) return text(`Linear probing table size ${m}; deleting occupied slot as None can break later search?`, 'Yes, tombstone needed', ['No, always safe','Only chain affected','Hash function changes'], 'Search may stop too early at deleted slot.', i, 'GATE')
  return text(`Linear probing adjacent occupied run in m=${m} table is known as?`, 'Primary clustering', ['Stable hashing','Memoization','Sorted prefix'], 'Consecutive probes create and extend clusters.', i)
})
const quadratic = build((n, mode, i) => {
  const m=11,h=n%11
  if (mode === 0) return num(`Quadratic probing m=11, home h=${h}, i=2: index?`, (h+4)%11, 'Use (h+i²)%m; 2²=4.', i)
  if (mode === 1) return num(`Quadratic probing m=11, home h=${h}, i=1: index?`, (h+1)%11, 'First retry uses offset 1².', i)
  if (mode === 2) return num(`Quadratic probing m=11, home h=${h}, i=0: first index?`, h, '0²=0 so start at home.', i, 'Foundation')
  if (mode === 3) return text(`Quadratic sequence with m=9, home 0; can fail despite free slots? (context ${n})`, 'Yes', ['No, always visits every slot','Only chaining can fail','Modulo is unused'], 'Squared offsets need not cover all slots.', i, 'GATE')
  return text(`Offset sequence 0,1,4,9,… for home h=${h}: method?`, 'Quadratic probing', ['Linear probing','Chaining','Binary search'], 'i² offsets define this probe sequence.', i)
})
const load = build((n, mode, i) => {
  const m=2*n
  if (mode === 0) return text(`n=${n} keys, m=${m} slots: α?`, '0.5', ['2','1','0.25'], 'α=n/m = 1/2.', i, 'Foundation')
  if (mode === 1) return num(`Uniform hashing open address α=${n}/${n+1}. Bound 1/(1−α)=?`, n+1, '1−n/(n+1)=1/(n+1), reciprocal n+1.', i, 'GATE')
  if (mode === 2) return num(`m=${m} slots and α=0.5: n stored elements?`, n, 'n=αm.', i)
  if (mode === 3) return text(`Open-address table with m=${m}: α≥1 possible while successful insert?`, 'No', ['Yes, arbitrarily large','Only with prime m','Only if no collisions'], 'One element per slot; n cannot exceed m.', i)
  return text(`Chaining m=${n} buckets, n=${n+2} keys: α>1 possible?`, 'Yes', ['No','Only if all keys equal','Only if probe sequence wraps'], 'Bucket lists can store multiple entries.', i)
})
const operations = build((n, mode, i) => {
  if (mode === 0) return text(`Key K${n} already present; dict-like insert(K,new) expected?`, 'Value updated', ['Duplicate key added','Entire table cleared','Lookup impossible'], 'Same key replace old value.', i)
  if (mode === 1) return text(`Search key K${n}: matching home slot but different stored key means?`, 'Continue collision search', ['Found','Key must equal','Return value immediately'], 'Bucket match alone insufficient; compare key.', i)
  if (mode === 2) return text(`Open addressing delete K${n}: safe marker so probe chain stays searchable?`, 'Tombstone', ['None empty slot','Zero index','Always resize to one'], 'Tombstone preserves path for later keys.', i, 'GATE')
  if (mode === 3) return text(`${n} keys all collide in chain: worst search complexity?`, 'O(n)', ['O(1) guaranteed','O(log n)','O(n²)'], 'Potential full chain scan.', i)
  return text(`Hash-map lookup for fixed-size key K${n} under good distribution: average?`, 'O(1)', ['O(n)','O(n log n)','O(log n)'], 'Expected constant bucket/probe work under assumptions.', i, 'Foundation')
})
const dict = build((n, mode, i) => {
  if (mode === 0) return num(`d={'x':${n}}; d['x']=${n+1}; d['x'] kya?`, n+1, 'Assignment existing key value replace karta hai.', i, 'Foundation')
  if (mode === 1) return num(`d={'x':${n}}; d.get('y',${n+2}) kya?`, n+2, 'Missing key par provided default return.', i)
  if (mode === 2) return text(`d={'x':${n}}; 'x' in d kya check karta hai?`, 'Key membership', ['Value membership','Index','Only type'], 'in dict keys par test hota hai.', i)
  if (mode === 3) return text(`d={'x':${n}}; d['y'] read karna?`, 'KeyError', ['None','0','False'], 'Direct indexing missing key par KeyError.', i, 'GATE')
  return num(`d={'x':${n}}; d.setdefault('x',${n+3}) returns?`, n, 'Existing key unchanged; existing value return.', i)
})
const setTopic = build((n, mode, i) => {
  if (mode === 0) return num(`set([${n},${n},${n+1}]) ka size?`, 2, 'Duplicates collapse; two distinct values.', i, 'Foundation')
  if (mode === 1) return text(`s={${n}}; s.remove(${n+1}) kya karega?`, 'KeyError', ['Silently ignore','Return False','Add element'], 'remove missing element raises KeyError.', i)
  if (mode === 2) return text(`s={${n}}; s.discard(${n+1}) kya karega?`, 'No error; unchanged set', ['KeyError','Adds element','Returns missing element'], 'discard absent element silently ignores.', i)
  if (mode === 3) return text(`Set s={${n},${n+1}}; s.pop() ka element precisely predict?`, 'No order guarantee', [String(n),String(n+1),'Always smallest'], 'Set pop arbitrary element removes; do not assume FIFO/LIFO.', i, 'GATE')
  return text(`${n} repeated equal values set mein insert: final distinct copies?`, 'One', ['Zero',String(n),'Two'], 'Set contains unique elements only.', i)
})
const complexity = build((n, mode, i) => {
  if (mode === 0) return text(`Good hash distribution with ${n} fixed-size keys: expected lookup?`, 'O(1)', ['O(n)','O(n²)','O(log n)'], 'Unit-cost key hashing, controlled α assumptions.', i)
  if (mode === 1) return text(`All ${n} keys same chained bucket: worst lookup?`, 'O(n)', ['O(1)','O(log n)','O(n²)'], 'Can scan full chain.', i, 'GATE')
  if (mode === 2) return text(`String key length ${n} scanned to compute polynomial hash: hash cost?`, 'O(L)', ['O(1) irrespective of length','O(L²)','O(log L)'], 'Each character contributes once; L key length.', i)
  if (mode === 3) return text(`Chaining with ${n} keys, m buckets: storage order?`, 'O(m+n)', ['O(1)','O(log n)','O(n²)'], 'm bucket headers plus n entries.', i)
  return text(`One resize/rehash of ${n} entries can cost?`, 'O(n)', ['O(1) guaranteed','O(log n)','O(n²) required'], 'Existing entries must be reinserted or relocated.', i, 'GATE')
})
const charCount = build((n, mode, i) => {
  const str='a'.repeat(n)+'bb'
  if (mode === 0) return num(`char_count('${str}') mein 'a' count?`, n, 'a appears n times.', i, 'Foundation')
  if (mode === 1) return num(`char_count('${str}') mein distinct keys?`, 2, 'Only a and b.', i)
  if (mode === 2) return num(`char_count('${str}') mein 'b' count?`, 2, 'Two b characters.', i)
  if (mode === 3) return text(`char_count('a'*${n} + ' ') mein space frequency?`, '1', ['0',String(n),'Absent'], 'Space is also a character.', i)
  return text(`char_count('A' + 'a'*${n}): 'A' and 'a' same key?`, 'No, case-sensitive', ['Yes','Only if n even','Only after sorting'], 'Different Unicode code points and strings.', i)
})
const firstUnique = build((n, mode, i) => {
  const str='a'.repeat(n)+'b'+'c'.repeat(n)
  if (mode === 0) return text(`first_non_repeating_char('${str}')?`, 'b', ['a','c','None'], 'a,c repeated n>=2; b once.', i)
  if (mode === 1) return text(`first_non_repeating_char('a'*${n})?`, 'None', ['a','0','KeyError'], 'Every a repeats; no count==1.', i)
  if (mode === 2) return text(`first unique problem '${str}': counts ke baad kis order mein check?`, 'Original first-seen order', ['Alphabetical always','Hash bucket numeric order','Highest frequency first'], 'First means input order, not bucket order.', i, 'GATE')
  if (mode === 3) return text(`String 'x' + 'a'*${n} + 'y': first non-repeating?`, 'x', ['y','a','None'], 'x appears once before y.', i)
  return text(`First non-repeating char of 'a'*${n} + 'Z'?`, 'Z', ['a','None','z'], 'All a repeated; Z once.', i)
})
const twoSum = build((n, mode, i) => {
  const target=n+100
  if (mode === 0) return num(`Two-sum target=${target}; current x=${n}; needed complement?`, 100, 'Target−x = 100.', i, 'Foundation')
  if (mode === 1) return text(`two_sum([${n},100], target=${target}) returns which value pair?`, '(100, '+n+')', ['('+n+', 100)','None','(0, '+target+')'], 'Course code current x first, complement second.', i)
  if (mode === 2) return text(`target=${2*n}, list=[${n}] only. Can same item pair itself?`, 'No', ['Yes','Always returns two indices','Only if even'], 'Seen is checked before adding current value.', i, 'GATE')
  if (mode === 3) return text(`target=${2*n}, list=[${n},${n}]. Does two_sum find pair?`, 'Yes, two occurrences', ['No, duplicates forbidden','Only if sorted','Only with a dict'], 'Second occurrence sees first one in set.', i)
  return text(`two_sum on ${n} inputs, fixed-size keys: expected time?`, 'O(n)', ['O(1) total','O(n²)','O(log n)'], 'One pass; each set lookup expected O(1).', i)
})
const context = build((n, mode, i) => {
  if (mode === 0) return text(`${n} values ke frequency count ke liye?`, 'Dictionary', ['Queue','Binary heap','Plain stack'], 'Map value→count.', i)
  if (mode === 1) return text(`${n} values mein seen-before membership ke liye?`, 'Set', ['Stack','Priority queue','Linked list only'], 'Set stores distinct seen values.', i)
  if (mode === 2) return text(`If sorted traversal required for ${n} keys, plain hash table enough?`, 'No, sort or ordered structure needed', ['Yes, keys automatically sorted','Only with quadratic probing','Only if α=1'], 'Hash table does not imply sorted key order.', i, 'GATE')
  if (mode === 3) return text(`Graph DFS ${n} nodes with cycles: visited container?`, 'Set', ['Only queue','Only recursion stack','No extra state'], 'Visited set prevents repeat/cycle.', i)
  return text(`For ${n} items and two-sum, key check before adding current prevents?`, 'Reusing same occurrence', ['Collisions entirely','Need for target','All duplicates'], 'A number cannot pair with itself unless a second occurrence exists.', i)
})
export const module10Topics = [
  {id:'intro',label:'10.1 · Introduction',questions:intro},
  {id:'function',label:'10.2 · Hashing Function',questions:hashFunction},
  {id:'function-code',label:'10.2.1 · Common Hashing Functions',questions:functionCode},
  {id:'table',label:'10.3 · Hashing Table',questions:hashTable},
  {id:'collision',label:'10.4 · Hash Collisions',questions:collision},
  {id:'chaining',label:'10.4.1 · Chained Hashing',questions:chaining},
  {id:'linear',label:'10.4.2 · Linear Probing',questions:linear},
  {id:'quadratic',label:'10.4.3 · Quadratic Probing',questions:quadratic},
  {id:'load',label:'10.5 · Load Factor',questions:load},
  {id:'operations',label:'10.6 · Common Operations',questions:operations},
  {id:'dict',label:'10.6.1 · Operations using Dictionaries',questions:dict},
  {id:'set',label:'10.6.2 · Operations using Sets',questions:setTopic},
  {id:'complexity',label:'10.7 · Complexity Analysis',questions:complexity},
  {id:'char-count',label:'10.8.1 · Character Count',questions:charCount},
  {id:'first-unique',label:'10.8.2 · First Non-Repeating Character',questions:firstUnique},
  {id:'two-sum',label:'10.8.3 · Two-Sum Problem',questions:twoSum},
  {id:'context',label:'10.9 · DS Context',questions:context}
]
export const module10QuestionCount = module10Topics.reduce((total,topic)=>total+topic.questions.length,0)
