const esc = value => String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')
export const codebox = (label, code) => `<div class="codebox green"><div><span>${label}</span><button type="button">Copy</button></div><pre><code>${esc(code)}</code></pre></div>`
const section = (no, id, label, title, note, body) => `<section class="chapter searchable" id="${id}" data-title="${no} · ${label}"><div class="chapter-head"><div class="chapter-no"><span>${no}</span><small>${label.toUpperCase()}</small></div><div><h2>${title}</h2><p>${note}</p></div></div>${body}</section>`
const table = (headers, rows) => `<div class="table-wrap"><table><thead><tr>${headers.map(h => `<th>${h}</th>`).join('')}</tr></thead><tbody>${rows.map(row => `<tr>${row.map(cell => `<td>${cell}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`
const buckets = (values, active = -1) => `<div class="hash-buckets" role="img" aria-label="Hash table bucket state">${values.map((value, i) => `<div class="hash-bucket ${i === active ? 'active' : ''}"><span>${i}</span><strong>${value || 'empty'}</strong></div>`).join('')}</div>`
export const lectureData = [
  ['10.1', 'Introduction', 'Key, hash, bucket and lookup', 'intro'],
  ['10.2', 'Hashing Function', 'Deterministic mapping and modulo', 'function'],
  ['10.2.1', 'Implementing Common Hashing Functions', 'Simple, multiplicative, DJB2, built-in hash()', 'function-code'],
  ['10.3', 'Hashing Table', 'Slots and key placement', 'table'],
  ['10.4', 'Hash Collisions', 'Same bucket, different keys', 'collision'],
  ['10.4.1', 'Chained Hashing', 'Buckets hold multiple entries', 'chaining'],
  ['10.4.2', 'Linear Probing', 'Try next slot after a collision', 'linear'],
  ['10.4.3', 'Quadratic Probing', 'Try squared offsets', 'quadratic'],
  ['10.5', 'Load Factor', 'Occupancy and performance', 'load'],
  ['10.6', 'Common Operations', 'Insert, search, update, delete', 'operations'],
  ['10.6.1', 'Hashing Operations using Dictionaries', 'Key-value Python operations', 'dict'],
  ['10.6.2', 'Hashing Operations using Sets', 'Distinct-key Python operations', 'set'],
  ['10.7', 'Complexity Analysis', 'Average vs worst-case costs', 'complexity'],
  ['10.8.1', 'Character Count', 'Frequency dictionary', 'char-count'],
  ['10.8.2', 'First Non-Repeating Character', 'Two scans with counts', 'first-unique'],
  ['10.8.3', 'Two-Sum Problem', 'Store seen complements', 'two-sum'],
  ['10.9', 'DS Context', 'When hashing is the right tool', 'context']
]
export const lectureCodes = {
  simple: ['def simple_hash(key):','    total = 0','    for ch in key:','        total += ord(ch)','    return total'].join('\n'),
  multiplicative: ['def multiplicative_hash(key):','    h = 1','    for ch in key:','        h = (h * 31) + ord(ch)','    return h'].join('\n'),
  djb2: ['def djb2(text):','    h = 5381','    for ch in text:','        h = ((h << 5) + h) + ord(ch)  # 33*h + ord(ch)','    return h'].join('\n'),
  builtin: ['print(hash("python"))','print(hash("apple"))','','table_size = 5','bucket = hash("python") % table_size','print(bucket)  # an index from 0 to 4'].join('\n'),
  chaining: `class ChainingHashTable:
    def __init__(self, size=5):
        self.size = size
        self.table = []

        for index in range(size):
            self.table.append([])  # one empty list for each bucket

    def hash_fn(self, key):
        total = 0

        for character in key:
            total = total + ord(character)

        return total % self.size

    def insert(self, key, value):
        index = self.hash_fn(key)
        bucket = self.table[index]

        for position in range(len(bucket)):
            stored_key = bucket[position][0]

            if stored_key == key:
                bucket[position] = (key, value)
                return  # key already existed; update its value

        bucket.append((key, value))  # new key

    def search(self, key):
        index = self.hash_fn(key)
        bucket = self.table[index]

        for position in range(len(bucket)):
            stored_key = bucket[position][0]
            stored_value = bucket[position][1]

            if stored_key == key:
                return stored_value

        return None`,
  linear: `class LinearProbingHashing:
    def __init__(self, size=5):
        self.size = size
        self.table = []

        for position in range(size):
            self.table.append(None)  # None means empty slot

    def hash_fn(self, key):
        total = 0

        for character in key:
            total = total + ord(character)

        return total % self.size

    def insert(self, key):
        home_index = self.hash_fn(key)

        for step in range(self.size):
            index = (home_index + step) % self.size

            if self.table[index] is None:
                self.table[index] = key
                return index

        raise ValueError("Hash table is full")

    def search(self, key):
        home_index = self.hash_fn(key)

        for step in range(self.size):
            index = (home_index + step) % self.size

            if self.table[index] is None:
                return None

            if self.table[index] == key:
                return index

        return None`,
  quadratic: `class QuadraticProbingHashing:
    def __init__(self, size=7):
        self.size = size
        self.table = []

        for position in range(size):
            self.table.append(None)  # None means empty slot

    def hash_fn(self, key):
        total = 0

        for character in key:
            total = total + ord(character)

        return total % self.size

    def insert(self, key):
        home_index = self.hash_fn(key)

        for step in range(self.size):
            offset = step * step
            index = (home_index + offset) % self.size

            if self.table[index] is None:
                self.table[index] = key
                return index

        raise ValueError("No free slot in this probe sequence")`,
  charCount: ['def char_count(text):','    freq = dict()','    for ch in text:','        freq[ch] = freq.get(ch, 0) + 1','    return freq'].join('\n'),
  firstUnique: ['def first_non_repeating_char(text):','    freq = dict()','    for ch in text:','        freq[ch] = freq.get(ch, 0) + 1','    for k, v in freq.items():','        if v == 1:','            return k','    return None'].join('\n'),
  twoSum: ['def two_sum(lst, target):','    seen = set()','    for x in lst:','        if (target - x) in seen:','            return (x, target - x)','        seen.add(x)','    return None'].join('\n')
}

export const mentalModelMarkup = `<section class="beginner-start searchable" id="mental-model" data-title="Hashing mental model">
  <div class="zero-title"><span>ZERO START · NO ASSUMED TERMS</span><h2>“bat” ko table ke ek box tak kaise pahunchayein?</h2><p>Abhi collision, probing ya complexity ki chinta mat karo. Pehle sirf yeh samjho: humare paas ek key hai, kuch numbered boxes hain, aur ek rule hai jo batata hai kaunsa box dekhna hai.</p></div>
  <div class="hash-foundation"><span>01 · KEY</span><h3>Key woh cheez hai jise store ya search karna hai</h3><p>Example mein key <code>"bat"</code> hai. Agar uske saath value <code>30</code> store karni ho, toh entry <code>"bat" → 30</code> ho sakti hai. Pehle key ko number mein badalenge; value 30 ko hash nahi kar rahe.</p></div>
  <div class="hash-foundation"><span>02 · HASH TABLE AUR BUCKET</span><h3>Poora group = table; ek numbered box = bucket</h3><p>Hum sirf samjhane ke liye <code>m = 5</code> boxes ki table choose kar rahe hain. Isliye boxes ke indices <code>0, 1, 2, 3, 4</code> hain. Har ek box ko <em>bucket</em> ya <em>slot</em> kahenge. <strong>5 koi universal hashing rule nahi</strong>—table size badloge toh boxes aur final index dono badal sakte hain.</p></div>
  <p class="hash-diagram-caption">Empty table · five buckets; abhi kisi box mein key nahi hai:</p>
  ${buckets(['','','','',''])}
  <div class="hash-foundation"><span>03 · HASH FUNCTION</span><h3>Text ko number mein badalne ka ek rule</h3><p>Is example ka <em>simple hash function</em> key ke har character ka number add karta hai. Python mein <code>ord(character)</code> us character ka <strong>Unicode code point</strong> deta hai. English letters ke liye yahi familiar ASCII numbers hain: <code>ord('b')=98</code>, <code>ord('a')=97</code>, <code>ord('t')=116</code>. Yeh sirf teaching function hai—Python ka built-in <code>hash()</code> alag function hai.</p></div>
  ${table(['Character read','ord() ka number','Running sum'],[['b','98','98'],['a','97','98 + 97 = 195'],['t','116','195 + 116 = 311']])}
  <div class="hash-foundation"><span>04 · HASH VALUE</span><h3>Saare character numbers add karo</h3><p><code>98 + 97 + 116 = 311</code>. Yeh <strong>raw hash value</strong> hai. Lekin table mein sirf 0–4 numbered boxes hain; box 311 exist hi nahi karta. Isliye ek aur step chahiye.</p></div>
  <div class="hash-foundation"><span>05 · MODULO / REMAINDER</span><h3><code>% 5</code> kyun? Kyunki example table mein 5 boxes hain</h3><p><code>311 % 5</code> ka matlab 311 ko 5 se divide karne par <strong>remainder</strong> kya hai. <code>5 × 62 = 310</code>, aur <code>311 − 310 = 1</code>. So <code>311 % 5 = 1</code>. Remainder hamesha 0–4 mein hoga, jo valid bucket index hai.</p></div>
  <div class="hash-equation"><span>Ab complete route dekho · har term defined hai</span><b>key "bat"</b><i>→</i><b>ord numbers 98, 97, 116</b><i>→</i><b>raw hash 311</b><i>→</i><b>bucket 1</b></div>
  <p class="hash-diagram-caption">Ab key <code>"bat"</code> bucket 1 mein rakho; baaki boxes empty rahenge:</p>
  ${buckets(['','"bat"','','',''], 1)}
  <div class="callout"><b>Search mein kya hoga?</b><p>Baad mein <code>"bat"</code> dhoondhna ho toh <em>same rule</em> dobara lagao: 311, phir <code>311 % 5 = 1</code>. Bucket 1 kholo aur stored key ko <code>"bat"</code> se compare karo. Abhi yaad rakho: <strong>311 number hai; 1 box ka address hai; "bat" actual key hai.</strong> Do keys same box maangein toh kya karna hai, woh collision lesson mein aayega.</p></div>
</section>`

const intro = section('10.1', 'intro', 'Introduction', '"bat" bucket 1 tak kaise pahunchta hai?', 'Key ke characters se number banao; phir us number ko table ke valid index mein badlo.', `
  <div class="hash-story"><b>Problem</b><p>Maan lo <code>"bat" → 30</code> store karna hai. <code>"bat"</code> <strong>key</strong> hai—isi naam se entry ko baad mein dhoondhenge. <code>30</code> us key ki <strong>value</strong> hai. Is example mein hash <em>key</em> ka banega, 30 ka nahi.</p><b>Table ka setup</b><p>Sirf example ke liye humne <code>5</code> numbered boxes ki table banayi hai: <code>0, 1, 2, 3, 4</code>. Poora group <strong>hash table</strong> hai; ek numbered box <strong>bucket/slot</strong> hai. <code>5</code> koi fixed hashing number nahi—yahan table mein five boxes hain, isliye liya hai.</p></div>
  <p class="hash-diagram-caption">Store karne se pehle table: sabhi five boxes khaali hain.</p>
  ${buckets(['', '', '', '', ''])}
  <div class="hash-step-list"><p><b>Step 1 · Key ke letters padho:</b> <code>"bat"</code> mein pehle <code>b</code>, phir <code>a</code>, phir <code>t</code> hai. Computer characters ke numeric codes use kar sakta hai. Python ka <code>ord()</code> character ka Unicode code point deta hai; in English letters ke liye values <code>ord('b')=98</code>, <code>ord('a')=97</code>, <code>ord('t')=116</code> hain.</p><p><b>Step 2 · Example hash rule lagao:</b> abhi simple rule hai: teenon numbers add karo. <code>98 + 97 = 195</code>, phir <code>195 + 116 = 311</code>. Is rule ka output <strong>raw hash 311</strong> hai. Ye teaching example hai, Python ke built-in <code>hash()</code> ka result nahi.</p></div>
  ${table(['Read kiya','Character ka number','Ab tak total'],[['b','98','98'],['a','97','98 + 97 = 195'],['t','116','195 + 116 = 311']])}
  <div class="hash-step-list"><p><b>Step 3 · 311 ko box number mein badlo:</b> table ke boxes sirf <code>0…4</code> hain; box <code>311</code> hai hi nahi. Isliye <code>311 % 5</code> calculate karo. <code>%</code> division ka <strong>remainder</strong> deta hai: <code>5 × 62 = 310</code>, aur <code>311 − 310 = 1</code>. So <code>311 % 5 = 1</code>. Ab valid address <strong>bucket 1</strong> mila.</p><p><b>Step 4 · Entry rakho:</b> bucket 1 mein actual entry <code>"bat" → 30</code> store karo. Bucket number <code>1</code> hai, key <code>"bat"</code> hai, aur uski value <code>30</code> hai—ye teen alag cheezein hain.</p></div>
  <div class="hash-equation"><span>Complete insertion route · is example ke rule se</span><b>key "bat"</b><i>→</i><b>98 + 97 + 116 = 311</b><i>→</i><b>311 % 5 = 1</b><i>→</i><b>bucket 1: "bat" → 30</b></div>
  <p class="hash-diagram-caption">Store karne ke baad: sirf bucket 1 mein entry hai.</p>
  ${buckets(['', '"bat" → 30', '', '', ''], 1)}
  <div class="hash-story"><b>Ab search("bat") ko manually trace karo</b><p>Wahi letters aur <em>wahi rule</em> dobara use karo: <code>98 + 97 + 116 = 311</code>, phir <code>311 % 5 = 1</code>. Isliye seedha bucket 1 dekho. Wahan stored key <code>"bat"</code> ko requested key <code>"bat"</code> se compare karo: equal hain, toh stored value <code>30</code> return karo. Address calculation batati hai <em>kahan dekhna hai</em>; key comparison batata hai <em>sahi entry mili ya nahi</em>.</p></div>
  <div class="callout"><b>10.1 ka checkpoint</b><p><code>311</code> raw hash number hai, <code>1</code> table index hai, aur <code>30</code> stored value hai. <code>311 % 5 = 1</code> ke karan "bat" bucket 1 mein aaya—"bat" apne aap index 1 nahi hota. Agle lecture 10.2 mein isi simple hash rule ka Python code dekhenge.</p></div>
`)

const hashFunction = section('10.2', 'function', 'Hashing Function', 'Key ke characters se raw number kaise banta hai?', 'Is lecture mein sirf one key ka complete flow. Four function types next lecture 10.2.1 mein aayenge.', `
  <div class="hash-step-list"><p><b>Input:</b> key <code>"bat"</code>.</p><p><b>Rule:</b> har character ka <code>ord()</code> number add karo.</p><p><b>Output:</b> function ek integer return karega; table index ke liye baad mein <code>% table_size</code> karenge.</p></div>
  ${codebox('Lecture · simple character-sum hash', lectureCodes.simple)}
  <div class="hash-step-list"><p><b>Line 1:</b> <code>total = 0</code>—abhi koi character read nahi hua.</p><p><b>Line 2:</b> <code>for ch in key</code>—pehle <code>b</code>, phir <code>a</code>, phir <code>t</code> read hoga.</p><p><b>Line 3:</b> <code>total += ord(ch)</code>—current character ka Unicode number running total mein add hoga.</p><p><b>Last line:</b> <code>return total</code>—poore word ka raw hash number return hoga.</p></div>
  ${table(['Character','ord()','Running total'],[['b','98','98'],['a','97','195'],['t','116','311']])}
  <div class="hash-equation"><span>Only now convert raw hash to a table address</span><b>raw hash = 311</b><i>→</i><b>311 % 5 = 1</b><i>→</i><b>box 1</b></div>
  <div class="callout"><b>Flow ka checkpoint</b><p>Function <code>simple_hash("bat")</code> returns <strong>311</strong>, not 1. <code>5</code> sirf example table ka size hai. <code>% 5</code> alag step hai jo raw number ko valid box 0–4 mein badalta hai. Wahi key aur wahi rule dubara use karoge toh same raw number milega.</p></div>
`)

const hashLabMarkup = `<div class="hash-lab" id="hashLab"><span>TRY IT · FOUR LECTURE FUNCTIONS</span><h3>Hash Function Explorer</h3><p>Key aur table size do. Simple, multiplicative aur DJB2 ko character-by-character trace karo; built-in <code>hash()</code> choose karne par same input ka runnable Python code aur output ka meaning dekho.</p><div class="hash-lab-controls"><label>Key <input id="hashKey" maxlength="18" value="bat" autocomplete="off"></label><label>Table size m <input id="hashSize" type="number" min="2" max="31" value="5"></label><label>Method <select id="hashMethod"><option value="simple">1 · Simple hash</option><option value="polynomial">2 · Multiplicative hash (×31)</option><option value="djb2">3 · DJB2 (×33)</option><option value="builtin">4 · Python built-in hash()</option></select></label></div><div id="hashLabResult"></div></div>`

const functionCode = section('10.2.1', 'function-code', 'Implementing Common Hashing Functions', 'Lecture ke four hashing functions', 'Three custom functions khud likhte hain; fourth Python ka ready-made built-in hash() hai.', `
  ${table(['No.','Lecture function','How to call it','Key point'],[['1','Simple hash','simple_hash("bat")','Character codes add'],['2','Multiplicative hash','multiplicative_hash("bat")','31 × old hash + code'],['3','DJB2','djb2("bat")','33 × old hash + code'],['4','Built-in hash()','hash("bat")','Python computes the hash']])}
  <div class="hash-method"><span>01 · SIMPLE SUM</span><h3>Order ignore hota hai</h3><p><code>h = Σ ord(ch)</code>. "bat" aur "tab" both 311 because addition mein character order se result nahi badalta. Is consequence ko 10.4 mein revisit karenge.</p>${codebox('Course code · simple_hash', lectureCodes.simple)}</div>
  <div class="hash-method"><span>02 · MULTIPLICATIVE / POLYNOMIAL</span><h3>Character position matters</h3><p>Start h=1; each next character: <code>h = 31*h + ord(ch)</code>. "ab": start 1 → 31+97=128 → 31×128+98=4066. "ba" different value deta hai.</p>${codebox('Course code · multiplicative_hash', lectureCodes.multiplicative)}</div>
  <div class="hash-method"><span>03 · DJB2</span><h3>Multiply by 33, then add character</h3><p><code>h = ((h &lt;&lt; 5) + h) + ord(ch)</code> means <code>33*h + ord(ch)</code>; left shift 5 is ×32.</p>${codebox('Corrected working DJB2', lectureCodes.djb2)}<div class="danger"><b>Notebook typo, clearly corrected</b><p>Course notebook mein <code>(h &lt;&lt; 31) + ord(ch)</code> ka result <code>h</code> ko assign nahi hota, so function always 5381 returns. DJB2 uses shift 5 and assignment.</p></div></div>
  <div class="hash-method"><span>04 · BUILT-IN HASH FUNCTION</span><h3>Python ka ready-made <code>hash()</code></h3><p>Is fourth type ke liye <code>def</code> likhne ki zarurat nahi: directly <code>hash(key)</code> call karo. <code>hash("python")</code> ek integer deta hai; learning table mein <code>hash("python") % 5</code> se 0–4 ka candidate bucket bana sakte ho.</p>${codebox('Lecture · built-in hash() with bucket example', lectureCodes.builtin)}<div class="callout"><b>Exact output fixed mat yaad karo</b><p>Same running Python process mein same string ka hash repeatable hai, lekin new process mein string hash change ho sakta hai. <code>hash([1, 2])</code> invalid hai because list mutable/unhashable hai. Python dict/set ka actual internal table size/probing implementation-specific hai; exam mein supplied hash function diya ho toh wahi calculate karo.</p></div></div>
  ${hashLabMarkup}
  <div class="callout"><b>Large integers</b><p>These teaching implementations show mixing; production code typically bounds hash values and uses engineering-quality collision handling. Python integers grow as needed, so code's h may become very large.</p></div>
`)

const hashTable = section('10.3', 'table', 'Hashing Table', 'Hash table poora structure hai; bucket uska ek numbered place', 'Pehle table aur bucket ka meaning samjho. Collision tab dekhenge jab do keys same place maangein.', `
  <div class="hash-story"><b>Hash table kya hai?</b><p>Hash table ek data structure hai jo keys ko store/dhoondhne ke liye numbered storage positions use karta hai. Is basic model mein ise array ki tarah draw karte hain. Agar table size <code>m=5</code> hai, toh poori table mein five positions hain: <code>0, 1, 2, 3, 4</code>—not 1 to 5.</p><b>Bucket kya hai?</b><p>In numbered positions mein se <em>ek</em> position ko bucket bolte hain. Neeche poori row <strong>hash table</strong> hai; index <code>2</code> wala single box <strong>bucket 2</strong> hai. Bucket ka number value <code>2</code> store hone ka claim nahi karta—number sirf address hai.</p></div>
  <p><b>Empty hash table (m=5):</b> har bucket abhi khaali hai. Highlighted box bucket 2 hai.</p>
  ${buckets(['','','','',''], 2)}
  <div class="hash-equation"><span>Example rule · integer keys</span><b>h(key) = key % 5</b><i>→</i><b>index 0…4</b></div>
  ${table(['Action','Calculation','Which bucket?','What changes?'],[['insert(12)','12 % 5 = 2','Bucket 2','Store key 12 in box 2'],['insert(18)','18 % 5 = 3','Bucket 3','Store key 18 in box 3'],['insert(9)','9 % 5 = 4','Bucket 4','Store key 9 in box 4']])}
  <p><b>After three inserts:</b> same table; only buckets 2, 3 and 4 now contain keys.</p>
  ${buckets(['','','12','18','9'], 3)}
  <div class="hash-step-list"><p><b>Search 18 · step 1:</b> <code>18 % 5 = 3</code>, so candidate bucket 3.</p><p><b>Step 2:</b> Bucket 3 currently stores key <code>18</code>. Compare requested key 18 with stored key 18.</p><p><b>Step 3:</b> Keys match → found. Buckets 0, 1, 2 and 4 scan nahi karne pade.</p></div>
  <div class="callout"><b>Bucket mein exactly kya hota hai?</b><p>Conceptually bucket key ya key–value entry ko locate karne ki jagah hai. <em>Chaining</em> implementation mein bucket ke andar multiple entries ki list ho sakti hai. <em>Open addressing</em> mein ek occupied slot mein normally ek entry hoti hai aur collision par doosra slot try karte hain. Dono mein bucket/index ka basic meaning “table ki numbered position” hai.</p></div>
  <div class="danger"><b>Next: collision</b><p>Agar ab <code>insert(17)</code> karo, <code>17 % 5 = 2</code>. Bucket 2 par pehle se 12 hai. Isi conflict ko collision bolte hain; ise kaise handle karna hai, 10.4 mein dekhenge.</p></div>
`)

const collision = section('10.4', 'collision', 'Hash Collisions', 'Jab do alag keys ek hi home bucket maangein', 'Pehle conflict dekho; phir usse solve karne ke do families: chaining aur open addressing.', `
  <div class="hash-story"><b>Collision hota kya hai?</b><p>Example table mein <code>m=5</code> buckets hain: 0–4. Rule <code>h(k)=k % 5</code> hai. Is rule se key ko jo pehla index milta hai, use <strong>home bucket</strong> kahenge. <code>10 % 5 = 0</code> aur <code>15 % 5 = 0</code>. Keys <code>10</code> aur <code>15</code> alag hain, lekin dono bucket 0 maang rahe hain. <strong>Isi conflict ka naam collision hai.</strong> 15 ko 10 ke upar overwrite nahi kar sakte; dono entries searchable rehni chahiye.</p></div>
  ${table(['Insert order','Key','Home calculation','Ab kya dikhta hai?'],[['1','10','10 % 5 = 0','Bucket 0 empty → 10 rakho'],['2','15','15 % 5 = 0','Bucket 0 mein 10 hai → collision'],['3','20','20 % 5 = 0','Bucket 0 phir maanga → ek aur collision']])}
  <p class="hash-diagram-caption">15 ko insert karne se just pehle: bucket 0 mein 10 already stored hai.</p>
  ${buckets(['10','','','',''], 0)}
  <div class="hash-equation"><span>Same address, different keys</span><b>10 → bucket 0</b><i>+</i><b>15 → bucket 0</b><i>→</i><b>collision</b></div>
  <div class="hash-story"><b>Collision kyun possible hai?</b><p>Possible keys bahut zyada ho sakti hain, par example mein sirf five buckets hain. Modulo ke baad multiple numbers ka same remainder aa sakta hai: <code>10, 15, 20, 25</code> sabka remainder 0. Collision ka matlab hash function “broken” hona zaroori nahi; finite slots ke saath distinct keys ka same home index aana possible hai.</p><b>Resolution ka matlab</b><p>Conflict ke baad <code>15</code> ko kahan rakhna hai, aur future <code>search(15)</code> ko kaise wahi entry milni hai—yeh dono ek consistent rule se decide karna. Insert aur search ko <strong>same rule</strong> follow karna padega.</p></div>
  <div class="hash-foundation"><span>FAMILY 1 · SEPARATE CHAINING</span><h3>Home bucket ke andar entries ki list rakho</h3><p>Bucket 0 ek container/list hai. Pehle <code>10</code>, phir <code>15</code>, phir <code>20</code> usi bucket ki list mein rakho. Ye list Python list, linked list ya dynamic array se ban sakti hai. Base table ka bucket number <strong>0 hi rahega</strong>; ek bucket ke andar multiple entries hongi.</p></div>
  <div class="hash-chain-diagram"><span class="active">bucket 0 → [10] → [15] → [20]</span><span>bucket 1 → empty</span><span>bucket 2 → empty</span><span>bucket 3 → empty</span><span>bucket 4 → empty</span></div>
  <div class="hash-step-list"><p><b>Chaining se search(20):</b> <code>20 % 5 = 0</code>, so bucket 0 kholo. List mein 10 se compare: no. 15 se compare: no. 20 se compare: yes → found. <code>search(25)</code> mein bucket 0 ki poori list scan hogi; kisi key se match nahi → absent.</p><p><b>Important:</b> bucket number match hona aur actual key match hona alag baat hai. Comparison skip nahi kar sakte.</p></div>
  <div class="hash-foundation"><span>FAMILY 2 · OPEN ADDRESSING</span><h3>Occupied home slot ke baad table mein doosra slot try karo</h3><p>Is model mein table ka ek slot normally ek entry rakhta hai. <code>15</code> ka home slot 0 occupied hai, toh predetermined order mein next candidate slots check karte hain. Ek candidate slot check karne ko <strong>probe</strong> bolte hain. Chaining se difference: entry bucket 0 ki inner list mein nahi; <em>isi base table ke kisi aur slot</em> mein jayegi.</p></div>
  ${table(['Method','Candidate slots ka rule','10, 15, 20 ka final placement · m=5'],[['Linear probing','(h + i) % m; i=0,1,2,…','0→10, 1→15, 2→20'],['Quadratic probing','(h + i²) % m; i=0,1,2,…','0→10, 1→15, 4→20']])}
  <div class="hash-step-list"><p><b>Linear:</b> 20 ke liye slot 0 occupied (10), slot 1 occupied (15), slot 2 empty → 20 ko slot 2 mein rakho.</p><p><b>Quadratic:</b> 20 ke liye <code>i=0</code> par 0 occupied; <code>i=1</code> par <code>(0+1²)%5=1</code> occupied; <code>i=2</code> par <code>(0+2²)%5=4</code> empty → 20 ko slot 4 mein rakho. Linear aur quadratic ki final table alag hai.</p></div>
  <p class="hash-diagram-caption">Same three keys, but two different open-addressing rules:</p>
  <div class="hash-method"><span>LINEAR · NEXT NEXT SLOT</span>${buckets(['10','15','20','',''], 2)}</div>
  <div class="hash-method"><span>QUADRATIC · SQUARED OFFSETS</span>${buckets(['10','15','','','20'], 4)}</div>
  <div class="callout"><b>Insert/search ka shared rule</b><p>Agar 20 linear probing se slot 2 par rakha, toh search(20) ko 0 → 1 → 2 check karna hoga. Seedha home slot 0 dekhkar “20 nahi mila” kehna galat hai. Quadratic se insert kiya ho toh search bhi quadratic ka same probe sequence follow karega.</p></div>
  <div class="danger"><b>GATE traps</b><p><strong>Collision ≠ duplicate:</strong> 10 aur 15 alag keys hain. <strong>Home index ≠ final slot:</strong> open addressing mein collision ke baad key kahin aur ho sakti hai. <strong>Probe count:</strong> first home check <code>i=0</code> bhi probe hai. <strong>Modulo:</strong> har candidate par lagao, taaki index 0…m−1 mein rahe.</p></div>
`)

const chaining = section('10.4.1', 'chaining', 'Chained Hashing', 'Each bucket stores a small list of entries', 'Collision keys same bucket chain mein rahte hain; search bucket ke andar scan karti hai.', `
  <div class="hash-story"><b>List bucket ke andar hai, poori table nahi</b><p>Ab string keys ka example lo: <code>m=5</code> aur simple character-sum hash. <code>"ball"</code> ka sum <code>98+97+108+108=411</code>, so bucket <code>411%5=1</code>. <code>"bat"</code> ka sum 311, so bucket 1. <code>"tab"</code> ka sum bhi 311, so bucket 1. Teen <em>different</em> keys same bucket maangti hain; bucket 1 ki list teen entries sambhalti hai.</p></div>
  ${table(['Insertion','Hash → bucket','Bucket 1 after insertion'],[['("ball", 10)','411 % 5 = 1','[("ball", 10)]'],['("bat", 30)','311 % 5 = 1','[("ball", 10), ("bat", 30)]'],['("tab", 75)','311 % 5 = 1','[("ball", 10), ("bat", 30), ("tab", 75)]']])}
  <div class="hash-chain-diagram"><span>bucket 0 → empty</span><span class="active">bucket 1 → [("ball",10)] → [("bat",30)] → [("tab",75)]</span><span>bucket 2 → empty</span><span>bucket 3 → empty</span><span>bucket 4 → empty</span></div>
  <div class="hash-step-list"><p><b>Insert ka rule:</b> Pehle bucket index nikalo. Us bucket ki list mein <em>same key</em> mile toh uska value update karo; nahi mile toh nayi key–value entry append karo. Different key ka same bucket milna overwrite ka reason nahi.</p><p><b>Search ka rule:</b> Index nikaal kar <em>sirf us bucket</em> ki list scan karo. Har stored key se equality compare karo. Match par associated value return; list khatam par key absent.</p></div>
  ${table(['search("bat") ka step','Stored key being checked','Decision'],[['Bucket choose','311 % 5 = 1','Bucket 1 ki chain kholo'],['Comparison 1','"ball"','"bat" nahi hai → next entry'],['Comparison 2','"bat"','Equal → value 30 return']])}
  ${codebox('Working version aligned to course ChainingHashTable', lectureCodes.chaining)}
  <div class="hash-step-list"><p><b>Code ke variables:</b> <code>self.table</code> poori table hai. <code>index</code> us table ka bucket number hai. <code>bucket = self.table[index]</code> se us ek bucket ki list ka reference milta hai. <code>position</code> us list ke andar entry ka position hai—ye table ka bucket index nahi.</p><p><b>Entry ka structure:</b> har entry <code>(key, value)</code> pair hai. <code>bucket[position][0]</code> pair ki key read karta hai; <code>bucket[position][1]</code> uski value. <code>search</code> requested key se stored key compare karta hai, aur match par value return karta hai.</p></div>
  <div class="callout"><b>Code ko trace se jodo</b><p><code>__init__</code> ka loop five independent empty lists banata hai. <code>hash_fn("bat")</code> characters add karke bucket 1 deta hai. <code>insert</code> pehle bucket 1 mein same key dhundhta hai: existing key mile toh value replace karke <code>return</code>; nahi mile toh nayi entry <code>append</code>. <code>search</code> bhi sirf bucket 1 ki entries check karta hai.</p></div>
  <div class="danger"><b>Course code correction</b><p>Notebook ke <code>insert</code> mein existing key update ke baad bhi append hota hai. Yahan <code>return</code> add kiya hai, taki duplicate key na bane. <code>search</code> mein missing key aur stored <code>None</code> value dono <code>None</code> dete hain; membership alag check se distinguish karo.</p></div>
  <p><b>GATE cost:</b> Good distribution par chain chhoti rehti hai, expected search O(1). Agar saari <code>n</code> keys ek bucket mein aa jayein, last/missing key ke liye O(n) comparisons. Chaining mein ek bucket multiple entries rakh sakta hai, so load factor <code>n/m</code> 1 se bada bhi ho sakta hai.</p>
`)

const linear = section('10.4.2', 'linear', 'Linear Probing', 'Occupied? One slot right, then wrap', 'Probe sequence (h+i) % m, i=0,1,2,…', `
  <div class="hash-story"><b>Linear ka matlab next numbered slot</b><p><code>m=5</code> aur <code>h(k)=k%5</code>. Home <code>h</code> occupied ho toh <code>(h+1)%5</code>, phir <code>(h+2)%5</code> check karo. <code>%5</code> end se start par wrap karta hai: slot 4 ke baad slot 0. Yahan bucket ke andar list nahi hai; key table ke first free candidate slot mein store hoti hai.</p></div>
  ${table(['Insert key','Probe i','Candidate calculation','Slot ki state → action'],[['10','0','(0+0)%5 = 0','Empty → 10 at 0'],['15','0','(0+0)%5 = 0','10 present → keep probing'],['15','1','(0+1)%5 = 1','Empty → 15 at 1'],['20','0','(0+0)%5 = 0','10 present → continue'],['20','1','(0+1)%5 = 1','15 present → continue'],['20','2','(0+2)%5 = 2','Empty → 20 at 2']])}
  ${buckets(['10','15','20','',''], 2)}
  <div class="hash-step-list"><p><b>Search(20):</b> 20 ka home 0 hai. Slot 0 par 10 hai—20 nahi, lekin search stop nahi hoti. Slot 1 par 15 hai—phir bhi stop nahi. Slot 2 par 20 mila → found.</p><p><b>Search(25):</b> home 0; slots 0, 1, 2 occupied aur unequal; slot 3 empty → 25 absent. Bina deletion ke empty slot tak pahunchne ka matlab is probe path mein key insert nahi hui thi.</p></div>
  <div class="callout"><b>Example aur code ka key type</b><p>Upar numeric keys se probe movement dikhaya hai, with <code>h(k)=k%5</code>. Neeche Python code <em>string keys</em> leta hai: har character ka <code>ord()</code> total mein add karke home nikaalta hai. <code>insert(10)</code> us code mein directly mat chalana; same numeric trace run karni ho toh <code>hash_fn</code> ka return <code>key % self.size</code> karo. Collision ke baad probing movement dono mein same hai.</p></div>
  ${codebox('Course-style Python · linear probing', lectureCodes.linear)}
  <div class="hash-step-list"><p><b>Code ko kaise padhein:</b> <code>self.table</code> poori table hai; har <code>None</code> empty slot dikhata hai. <code>home_index</code> key ka first candidate hai. <code>step=0</code> par home check hota hai; <code>step=1</code> par next slot. <code>index = (home_index + step) % self.size</code> har probe ka actual table position deta hai.</p><p><b>Insert vs search:</b> insert first empty slot mein key rakhta hai. Search same positions check karta hai: key equal ho toh uska index return, empty slot mile toh <code>None</code> return.</p></div>
  <div class="callout"><b>Wrap-around mini example</b><p>Agar <code>m=5</code> aur home <code>h=4</code>, first probe slot 4, next <code>(4+1)%5=0</code>, phir <code>(4+2)%5=1</code>. Linear probing array ke end par rukti nahi.</p></div>
  <div class="danger"><b>Deletion trap</b><p>Slot 1 ko plain <code>None</code> banaya, then search 20 slot 1 par wrongly stop kar sakta hai. Open addressing mein deletion ko <em>tombstone</em> marker chahiye, or chain repair/rehash. Course code delete implement nahi karta.</p></div>
  <p><b>GATE traps:</b> <code>i=0</code> home check ko count karo. Insert aur search same probe order follow karte hain. Adjacent occupied run ko <em>primary clustering</em> kahte hain. Table full hone par insertion fail hoti hai; <code>α=1</code> par free slot nahi hai.</p>
`)

const quadratic = section('10.4.3', 'quadratic', 'Quadratic Probing', 'Offsets 0², 1², 2²,…', 'Probe sequence (h+i²) % m; collision path linear probing se different.', `
  <div class="hash-story"><b>Quadratic ka matlab home se offsets 0², 1², 2², 3²…</b><p>Is example mein <code>m=7</code>, <code>h(k)=k%7</code>. Keys 10, 17, 24 sabka home <code>3</code> hai. First candidate <code>i=0</code> par 3; occupied ho toh <code>i=1</code> par <code>(3+1²)%7=4</code>; phir <code>i=2</code> par <code>(3+2²)%7=0</code>. Ye “current slot se 1, phir 4 aage” nahi; <strong>har baar home h mein i² add</strong> hota hai.</p></div>
  ${table(['Insert key','Probe i','Candidate calculation','Slot ki state → action'],[['10','0','(3+0²)%7 = 3','Empty → 10 at 3'],['17','0','(3+0²)%7 = 3','10 present → continue'],['17','1','(3+1²)%7 = 4','Empty → 17 at 4'],['24','0','(3+0²)%7 = 3','10 present → continue'],['24','1','(3+1²)%7 = 4','17 present → continue'],['24','2','(3+2²)%7 = 0','Empty → 24 at 0']])}
  ${buckets(['24','','','10','17','',''], 0)}
  <div class="hash-step-list"><p><b>Search(24):</b> home 3 par 10—unequal; next probe 4 par 17—unequal; next probe 0 par 24—found. Agar search sirf 3 aur 4 dekhe, toh incorrect “not found” bolegi.</p><p><b>Linear se comparison:</b> same home 3 ke liye linear sequence <code>3, 4, 5, 6…</code> hoti; quadratic sequence <code>3, 4, 0, 5…</code> (modulo 7). Isi wajah se final placements alag ho sakte hain.</p></div>
  <div class="callout"><b>Example aur course code ka key type</b><p>Upar numeric keys ke liye <code>h(k)=k%7</code> use hua hai. Neeche Python code string key ka home character codes add karke nikaalta hai. Numeric 10, 17, 24 ka yahi trace run karna ho toh us code mein <code>hash_fn</code> ka return <code>key % self.size</code> karo; <code>(h+i*i)%m</code> probing rule same rahega.</p></div>
  ${codebox('Course-style Python · quadratic probing', lectureCodes.quadratic)}
  <div class="hash-step-list"><p><b>Code ko kaise padhein:</b> <code>home_index</code> pehla slot hai. <code>step</code> 0, 1, 2… hota hai. Har round mein <code>offset = step * step</code> nikalta hai; phir <code>index = (home_index + offset) % self.size</code>. Slot empty ho toh key wahin store hoti hai.</p><p><b>Example:</b> home 3 aur size 7 par step 0 → offset 0 → index 3; step 1 → offset 1 → index 4; step 2 → offset 4 → index 0. Code mein <code>search</code> method nahi hai; conceptual search ko bhi same candidate order follow karna hoga.</p></div>
  <div class="danger"><b>Important limitation</b><p>Quadratic probe sequence har slot visit kare, yeh guaranteed nahi. m=9, h=0 example: 0,1,4,0,7,7,…; free slot hone ke baad bhi this sequence stuck ho sakti hai. “Table full” kehna always accurate nahi.</p></div>
  <div class="callout"><b>GATE computation</b><p>Always <code>i=0</code> se start. Har probe par <code>(h+i*i)%m</code> evaluate karo, aur same occupied slot par dobara aa sakte ho—sequence ka full-table coverage assume mat karo. Is expression ko <code>((h+i)*i)%m</code> se confuse mat karo.</p></div>
`)

const load = section('10.5', 'load', 'Load Factor', 'Table kitni bhari hai? Pehle keys gino, phir buckets', 'Lecture ka formula aur 0, 0.5, 1, >1 ka meaning ek chhoti table se samjho.', `
  <div class="hash-story"><b>Load factor ka simple sawaal</b><p>Hash table mein kitni <strong>entries/keys store</strong> ho chuki hain, table ke <strong>total buckets</strong> ke comparison mein? Isi ratio ko load factor kehte hain. Symbol <code>α</code> (alpha) hai. Yeh hash function ka output ya kisi key ka index nahi hai; yeh <em>poori table</em> ki ek measurement hai.</p></div>
  <div class="hash-equation"><span>Lecture formula · do cheezein ginni hain</span><b>α = n / m</b><i>jahan</i><b>n = stored entries</b><i>aur</i><b>m = total buckets</b></div>
  <div class="hash-step-list"><p><b>n kaise ginoge?</b> Har stored key-value entry ko <code>1</code> gino. Khali bucket ko <code>0</code>. <b>m kaise ginoge?</b> Table ke numbered boxes gino—chahe khali hon ya bhare. Agar indices <code>0, 1, 2, 3, 4</code> hain, toh <code>m=5</code>; last index 4 hone ka matlab 4 buckets nahi.</p></div>
  <p class="hash-diagram-caption">Example: 5 buckets wali <strong>empty</strong> table. Abhi <code>n=0</code>, <code>m=5</code>, isliye <code>α=0/5=0</code>.</p>
  ${buckets(['', '', '', '', ''])}
  <div class="hash-story"><b>Ab step by step table bharo</b><p>Sirf visual samajhne ke liye maan lo four keys alag-alag slots mein aa gayi hain. Pehli 2 entries ke baad <code>n=2</code> aur <code>α=2/5=0.4</code>. Do aur entries daalne ke baad <code>n=4</code> aur <code>α=4/5=0.8</code>. <strong>Denominator 5 hi rahega</strong>, kyunki table ka size nahi badla.</p></div>
  ${table(['State','Stored entries n','Total buckets m','Load factor α = n/m'],[['Empty table','0','5','0/5 = 0'],['2 entries stored','2','5','2/5 = 0.4'],['4 entries stored','4','5','4/5 = 0.8'],['5 entries stored','5','5','5/5 = 1']])}
  <p class="hash-diagram-caption">Four entries ke baad: slots 0–3 mein entries hain; slot 4 abhi empty. <code>α=0.8</code> ka matlab is <em>open-addressing example</em> mein 5 mein se 4 slots occupied hain.</p>
  ${buckets(['key A', 'key B', 'key C', 'key D', ''], 4)}
  <div class="hash-foundation"><span>LECTURE INTERPRETATION</span><h3>0, 0.5, 1 aur 1 se zyada ka matlab</h3><p><code>α=0</code>: koi entry nahi—table empty. <code>α=0.5</code>: entries ki count buckets ki aadhi hai; open addressing mein aadhe slots occupied. <code>α=1</code>: entries aur buckets ki count equal; open addressing mein saare slots occupied. <code>α&gt;1</code>: open addressing mein impossible, kyunki ek slot mein ek hi entry rakhi jaati hai; chaining mein possible, kyunki ek bucket ki list mein multiple entries aa sakti hain.</p></div>
  <div class="hash-step-list"><p><b>Important nuance:</b> <code>α=1</code> ko <em>“completely full”</em> sirf open addressing mein bolo. Chaining mein <code>n=m</code> hone par bhi zaroori nahi ki har bucket mein ek entry ho—kuch buckets khali aur kuch mein 2+ entries ho sakti hain. Chaining ka load factor <strong>entries per bucket ka average</strong> hai, occupied buckets ka percentage nahi.</p></div>
  ${table(['Method','m=5, n=7 par α','Kya 7 entries store ho sakti hain?'],[['Open addressing','7/5 = 1.4','Nahi; 5 slots mein at most 5 entries (resize kiye bina).'],['Chaining','7/5 = 1.4','Haan; kuch bucket-lists multiple entries rakhengi.']])}
  <div class="hash-foundation"><span>WHY DO WE NEED LOAD FACTOR?</span><h3>Formula se humein kya decision milta hai?</h3><p>Load factor table ki <strong>crowding</strong> ka quick signal hai. 5 buckets mein 1 entry aur 5 buckets mein 4 entries ka search experience different ho sakta hai. Isi signal se hum collision risk, operation speed aur resize ka timing samajhte hain.</p></div>
  <div class="hash-step-list"><p><b>1 · Table kitni crowded hai?</b> <code>m=5, n=1</code> par <code>α=0.2</code>; keys ke liye kaafi jagah hai. <code>m=5, n=4</code> par <code>α=0.8</code>; open addressing mein bas ek slot khali bacha. α poori table ka ratio hai, kisi ek bucket ki position nahi.</p><p><b>2 · Collision ki possibility kyun badhti hai?</b> Same limited buckets ke liye zyada keys aati hain, toh do keys same <em>home index</em> maang sakti hain. Example <code>h(k)=k%5</code> par <code>10%5=0</code> aur <code>15%5=0</code>: dono bucket 0 chahte hain. α zyada hone se collisions generally more likely hote hain, lekin α alone exact collisions count ya probability nahi batata.</p><p><b>3 · Speed par kya asar?</b> Open addressing mein occupied slot ke baad next candidate probe karna padta hai. Chaining mein same bucket ki list mein keys compare karni pad sakti hain. Low load par <em>usually</em> kam extra work; high load par <em>usually</em> zyada. Specific search fast bhi ho sakta hai—ye guarantee nahi, average tendency hai.</p></div>
  <div class="hash-story"><b>4 · Resize kab aur kyun?</b><p>Jab implementation ka chosen load threshold cross hone lage, table ko bigger banaya ja sakta hai. Maan lo <code>n=4, m=5</code>, so <code>α=0.8</code>. Agar table ko <code>m=10</code> buckets ka bana dein, same 4 entries ke liye <code>α=4/10=0.4</code>. Nayi table mein more room milta hai. <strong>Resize ke baad old indices copy nahi karte:</strong> har stored key ka new index dobara calculate karke entry place karte hain; isse <em>rehash</em> kehte hain.</p></div>
  <div class="hash-equation"><span>Resize ka visual math</span><b>4 keys / 5 buckets = 0.8</b><i>→ resize →</i><b>4 keys / 10 buckets = 0.4</b></div>
  <div class="hash-step-list"><p><b>Index dobara kyun nikalna hai?</b> Agar example hash rule <code>h(k)=k%m</code> hai, key <code>7</code> ka old index <code>7%5=2</code> tha; resize ke baad new index <code>7%10=7</code> hoga. Sirf entry ko old slot 2 par copy kar diya toh later search new rule se slot 7 dekhega aur key miss ho sakti hai. <b>Threshold note:</b> har hash table ka ek universal resize number nahi hota; question ya implementation jo threshold de, wahi use karo.</p></div>
  <div class="callout"><b>Ek sentence mein four reasons</b><p>Load factor batata hai table kitni crowded hai → collisions/extra probes ka risk samajh aata hai → average operation speed ka estimate milta hai → zarurat par resize aur rehash kar sakte hain.</p></div>
  <div class="hash-story"><b>Exam trap: ratio ko exact outcome mat samjho</b><p><code>α=0.8</code> ka matlab <strong>har search exactly 5 probes</strong> nahi, aur <strong>80% collision probability</strong> bhi nahi. Exact probe count key, hash function, collision method aur existing placement par depend karta hai. Neeche ka GATE bound bhi extra assumption ke saath hi use hota hai.</p></div>
  <div class="hash-trace"><span>GATE extra · uniform hashing assumption + open addressing only</span><div><b>α=0.5</b><code>1/(1−0.5) = 2</code></div><div><b>α=0.8</b><code>1/(1−0.8) = 5</code></div><div><b>α→1</b><code>denominator → 0; bound grows</code></div></div>
  <div class="callout"><b>2024 DA Q21 connection</b><p>Question ki <em>uniform hashing</em> assumption ke under, open addressing mein unsuccessful search / empty slot dhoondhne wali insertion ke <strong>expected probes ka upper bound</strong> <code>1/(1−α)</code> hai (jab <code>α&lt;1</code>). Example: <code>α=0.8</code> par bound 5. Yeh kisi ek insertion ke liye guaranteed 5 probes nahi. Pehle basic <code>α=n/m</code> samjho; GATE formula uske baad apply karo.</p></div>
`)

export const firstHalfMarkup = [intro,hashFunction,functionCode,hashTable,collision,chaining,linear,quadratic,load].join('\n')

const operations = section('10.6', 'operations', 'Common Operations', 'Hashing locates candidate; equality verifies key', 'Insert, search, update, delete mein collision policy consistent rehni chahiye.', `
  ${table(['Operation','Exact idea','Average','Worst collision-heavy'],[['Insert','Hash → probe/chain → empty or same key','O(1)','O(n)'],['Search','Hash → probe/chain → key compare','O(1)','O(n)'],['Update','Same key found → replace value','O(1)','O(n)'],['Delete','Key locate → remove safely','O(1)','O(n)']])}
  <div class="hash-story"><b>One key, many operations</b><p>Dict-like table mein key "bat" ka index 1 hai. <code>insert("bat",30)</code> adds it; <code>search("bat")</code> returns 30; <code>insert("bat",40)</code> updates same key; <code>delete("bat")</code> removes it. Do not append duplicate key on update.</p></div>
  <div class="danger"><b>GATE trap</b><p>Hash function output same hone se keys equal nahi ho jaati. Final equality test decides match. Open addressing mein delete special care needs tombstone.</p></div>
`)

const dictLectureCode = `student = {
    'name': 'John',
    'age': 18,
    'gender': 'male'
}

# INSERT: a new key is added
student['nationality'] = 'Indian'
student.update({'age': 20})
student.update({'color': 'red'})
student.setdefault('religion', 'NA')

# SEARCH / READ: these do not change the dictionary
print(student['name'])             # John
print(student.get('country'))       # None, no KeyError
print(student.get('country', 'NA')) # NA

# UPDATE: existing key's value is replaced
student.update({'age': 21, 'state': 'Tamil Nadu'})
student['color'] = 'dark red'
print(student.setdefault('age', 99)) # 21; existing age stays 21

# DELETE
del student['religion']             # removes key and value
removed_state = student.pop('state') # returns 'Tamil Nadu'
last_pair = student.popitem()        # ('color', 'dark red')

# MEMBERSHIP: checks KEYS, not values
print('name' in student)   # True
print('fruit' in student)  # False

# ITERATION
for key in student:
    print(key)

for key in student:
    print(key, student[key])

for key, value in student.items():
    print(key, value)`

const dict = section('10.6.1', 'dict', 'Hashing Operations using Dictionaries', 'Lecture notebook ke saare dict operations, ek state trace mein', 'Pehle key-value state samjho; phir insert, search, update, delete, membership aur iteration dekho.', `
  <div class="hash-story"><b>Starting dictionary</b><p><code>student</code> mein initially teen entries hain: <code>'name': 'John'</code>, <code>'age': 18</code>, <code>'gender': 'male'</code>. <strong>Key</strong> left side ka naam hai, <strong>value</strong> right side ka data. Same key dobara assign karne se duplicate entry nahi banti; uski value replace hoti hai.</p></div>
  ${codebox('Lecture sequence · runnable Python', dictLectureCode)}
  <div class="hash-foundation"><span>INSERT + UPDATE</span><h3>Kaunsa method new key banata hai?</h3><p><code>student['nationality'] = 'Indian'</code> new key insert karta hai. <code>student.update({'age': 20})</code> existing age ko 18 se 20 karta hai; <code>student.update({'color': 'red'})</code> new key add karta hai. Baad mein <code>update({'age': 21, 'state': 'Tamil Nadu'})</code> age ko 20 se 21 karta hai aur new state add karta hai. Isliye <code>update()</code> sirf “existing value update” nahi—new keys bhi insert kar sakta hai.</p></div>
  <div class="hash-step-list"><p><b><code>setdefault(key, default)</code>:</b> key absent ho toh default store karke return karta hai. <code>setdefault('religion', 'NA')</code> religion add karega. Key already present ho toh existing value return karega aur change <em>nahi</em> karega: <code>setdefault('age', 99)</code> ka result 21 hai, age 99 nahi banta.</p><p><b>Direct assignment:</b> <code>student['color'] = 'dark red'</code> se pehle <code>color</code> ki value <code>'red'</code> thi; ab <code>'dark red'</code> ho gayi. Key count same rehta hai.</p></div>
  ${table(['Lecture step','Key par effect','Important state'],[["student['nationality'] = 'Indian'",'New key added','nationality → Indian'],["student.update({'age': 20})",'Existing value replaced','age: 18 → 20'],["student.update({'color': 'red'})",'New key added','color → red'],["student.setdefault('religion', 'NA')",'Absent key added','religion → NA'],["student.update({'age': 21, 'state': 'Tamil Nadu'})",'age replaced; state added','age: 20 → 21; state → Tamil Nadu'],["student['color'] = 'dark red'",'Existing value replaced','color → dark red'],["student.setdefault('age', 99)",'No change; returns 21','age stays 21']])}
  <div class="hash-foundation"><span>SEARCH / READ</span><h3>Key missing ho toh kya hota hai?</h3><p><code>student['name']</code> existing value <code>'John'</code> deta hai. Lecture mein <code>student['country']</code> commented out hai: agar run karoge aur key absent hai, <code>KeyError</code> aayega. <code>student.get('country')</code> safe read hai—<code>None</code> deta hai; <code>student.get('country', 'NA')</code> <code>'NA'</code> deta hai. <code>get()</code> missing key ko dictionary mein insert <em>nahi</em> karta.</p></div>
  <div class="hash-foundation"><span>DELETE</span><h3>del, pop aur popitem alag kaise hain?</h3><p><code>del student['religion']</code> named key hata deta hai, lekin removed value return nahi karta. <code>student.pop('state')</code> state hata kar uski old value <code>'Tamil Nadu'</code> return karta hai. <code>student.popitem()</code> last-inserted remaining key-value pair ko remove <em>aur return</em> karta hai: is exact sequence mein <code>('color', 'dark red')</code>. Existing key <code>color</code> ki value update hui thi, par uska insertion position nahi badla.</p></div>
  ${table(['Expression','Result / meaning','Missing-key case'],[["d[key]",'Value read','KeyError'],["d.get(key)",'Value, else None','No error'],["d.get(key, fallback)",'Value, else fallback','No error'],["d.update({...})",'Existing keys replace; new keys insert','N/A'],["d.setdefault(key, default)",'Existing value, or insert and return default','Inserts default'],["del d[key]",'Named entry removed; no returned value','KeyError'],["d.pop(key)",'Named entry removed and old value returned','KeyError without default'],["d.popitem()",'Last inserted pair removed and returned','KeyError if empty'],["key in d",'Checks whether key exists','False'],["d.items()",'View of (key, value) pairs','Empty view']])}
  <div class="hash-story"><b>Membership aur loops ko manually padho</b><p>Deletions ke baad keys <code>name, age, gender, nationality</code> bachi hain. <code>'name' in student</code> isliye <code>True</code> hai; <code>'fruit' in student</code> <code>False</code>. <code>for key in student</code> sirf keys deta hai. <code>student[key]</code> se us key ki value padh sakte ho. <code>for key, value in student.items()</code> dono ek saath deta hai.</p></div>
  <div class="callout"><b>Order note · Python vs abstract hash table</b><p>Modern Python dict insertion order preserve karta hai; isliye is exact code mein <code>popitem()</code> color pair remove karta hai aur loops remaining keys ko insertion order mein dikhate hain. GATE ke abstract hash-table question mein order assume mat karo jab tak question usse specify na kare.</p></div>
  <div class="danger"><b>Two common traps</b><p><code>'John' in student</code> values search nahi karta—<code>in</code> keys check karta hai. Dict key hashable honi chahiye; mutable list key nahi ban sakti, lekin value list bhi ho sakti hai.</p></div>
`)

const setLectureCode = `s = {'John', 21, 'country', 100, 22.5}

# INSERT
s.add('city')

# SEARCH / MEMBERSHIP
print('John' in s)  # True
print(55 in s)      # False

# DELETE A KNOWN ITEM: do this before arbitrary pop()
s.remove('country')

# pop() returns and removes ONE ARBITRARY remaining item
first_removed = s.pop()
second_removed = s.pop()
print(first_removed, second_removed)  # exact items may vary

# ITERATION: order is not guaranteed
for x in s:
    print(x)`

const set = section('10.6.2', 'set', 'Hashing Operations using Sets', 'Lecture ke add, membership, remove, pop aur iteration', 'Set mein unique items hote hain; dict ki tarah separate key → value pairs nahi.', `
  <div class="hash-story"><b>Starting set ko pehle dekho</b><p>Lecture ka <code>s = {'John', 21, 'country', 100, 22.5}</code> five <strong>distinct items</strong> rakhta hai. Strings, integers aur float ek set mein saath reh sakte hain, kyunki ye hashable hain. Set mein <code>'John': 21</code> jaisi key-value mapping nahi hoti: item hi membership key ki tarah kaam karta hai. Display order par bharosa mat karo.</p></div>
  ${codebox('Lecture operations · safe runnable order', setLectureCode)}
  <div class="hash-foundation"><span>INSERT</span><h3><code>add()</code> kya karta hai?</h3><p><code>s.add('city')</code> new item add karta hai. Count 5 se 6 ho jaati hai. Agar dobara <code>s.add('city')</code> karo toh duplicate nahi banega; count 6 hi rahegi. Set ka core rule hai <strong>unique items only</strong>.</p></div>
  <div class="hash-equation"><span>Duplicates collapse</span><b>{3, 3, 5}</b><i>→</i><b>{3, 5}</b></div>
  <div class="hash-foundation"><span>SEARCH / MEMBERSHIP</span><h3><code>in</code> ka answer Boolean hai</h3><p><code>'John' in s</code> → <code>True</code>, kyunki item present hai. <code>55 in s</code> → <code>False</code>, kyunki 55 present nahi. Ye test set ko change nahi karta. Dict ke <code>key in d</code> ki tarah, yahan membership fast lookup ke liye useful hai; set mein separate value retrieve nahi hoti.</p></div>
  <div class="hash-foundation"><span>DELETION</span><h3><code>remove(x)</code> aur <code>pop()</code> ko mix mat karo</h3><p><code>s.remove('country')</code> <em>exactly country</em> ko hataata hai. Agar item absent ho toh <code>KeyError</code>. <code>s.pop()</code> kisi <em>arbitrary</em> item ko remove karke wahi item return karta hai—ye <code>remove('country')</code> ka substitute nahi. Lecture mein <code>pop()</code> twice dikhaya gaya hai; first aur second removed item ka fixed answer assume mat karo.</p></div>
  ${table(['Step','Definitely kya pata hai?','Set size'],[['Starting set','5 distinct items','5'],["s.add('city')",'city present','6'],["'John' in s; 55 in s",'True; False—no change','6'],["s.remove('country')",'country absent','5'],['first pop()','One arbitrary item removed and returned','4'],['second pop()','Another arbitrary item removed and returned','3'],['for x in s','Remaining 3 items printed; order unspecified','3']])}
  <div class="danger"><b>Lecture order ka subtle bug</b><p>Notebook mein <code>s.pop()</code> do baar <em>pehle</em> aur <code>s.remove('country')</code> baad mein hai. Agar kisi <code>pop()</code> ne country hi hata diya, later <code>remove('country')</code> <code>KeyError</code> dega. Isliye runnable example mein known item ko pehle remove kiya hai. Agar uncertain ho, <code>if 'country' in s: s.remove('country')</code> check kar sakte ho.</p></div>
  <div class="hash-foundation"><span>ITERATION</span><h3><code>for x in s</code> ka meaning</h3><p>Har loop round mein <code>x</code> kisi remaining item ko reference karega; <code>print(x)</code> us item ko dikhayega. Kaun sa item pehle aayega, set guarantee nahi karta. Lecture ke <code>pop()</code> results aur printed order machine/run ke hisaab se different ho sakte hain.</p></div>
  ${table(['Operation','Exact meaning','Absent / empty case'],[['s.add(x)','Unique item x insert','N/A'],['x in s','Item present? True/False','False'],['s.remove(x)','Specified item x delete','KeyError'],['s.pop()','Arbitrary item remove + return','KeyError if empty'],['for x in s','Each remaining item visit','No iterations if empty'],['s.discard(x)','Optional safe delete; lecture code mein nahi','No error if absent']])}
  <div class="callout"><b>GATE trap</b><p><code>dict.popitem()</code> modern Python mein last inserted pair hataata hai, lekin <code>set.pop()</code> arbitrary item hataata hai. Dono ko LIFO/FIFO queue operation ki tarah trace mat karo. Set ko abstract exam question mein unordered hi treat karo unless order explicitly specified ho.</p></div>
`)

const complexity = section('10.7', 'complexity', 'Complexity Analysis', 'Ek complete table: operation, dict, set, average aur worst', 'n = stored items; average/expected O(1) ke liye good hashing aur controlled load factor maana hai.', `
  <div class="hash-foundation"><span>LECTURE · COMPLETE COMPARISON</span><h3>Ek row mein capability aur time dono dekho</h3><p><strong>Dict</strong> key → value store karta hai; <strong>set</strong> sirf unique items. Neeche O(1) <em>average/expected</em> hai, every input ki guarantee nahi. Worst column collision-heavy case ya costly resize ko dhyan mein rakhta hai.</p></div>
  ${table(['Operation','Dictionary','Set','Average time','Worst time'],[['Insert','✓ <code>d[k] = v</code>','✓ <code>s.add(x)</code>','O(1)','O(n)'],['Search','✓ <code>d.get(k)</code> se value','✓ <code>x in s</code> se presence','O(1)','O(n)'],['Delete','✓ <code>del d[k]</code> / <code>d.pop(k)</code>','✓ <code>s.remove(x)</code> / <code>s.discard(x)</code>','O(1)','O(n)'],['Update stored value','✓ <code>d[k] = new_value</code>','✕ Set mein separate mapped value nahi','O(1) · dict only','O(n) · dict only'],['Membership','✓ <code>k in d</code> checks keys','✓ <code>x in s</code> checks items','O(1)','O(n)'],['Iteration','✓ <code>for k in d</code> / <code>d.items()</code>','✓ <code>for x in s</code>','O(n)','O(n)']])}
  <div class="hash-step-list"><p><b>Update ✕ ka meaning:</b> set mein existing key ki <em>value</em> replace nahi hoti, kyunki set key → value pairs rakhta hi nahi. Python ka <code>s.update(iterable)</code> method phir bhi hota hai: woh multiple items <em>add</em> karta hai. Us bulk operation ka cost <code>r</code> input items ke liye expected O(r) hai.</p><p><b>Search aur membership alag kyun dikh rahe hain?</b> Lecture dono names use karta hai. Dict search stored <em>value</em> la sakta hai; membership sirf key present hai ya nahi batati hai. Set mein separate mapped value nahi, isliye uska search aur membership practically same <code>x in s</code> test hai.</p><p><b>Iteration O(n) kyun?</b> Sabhi n items visit karne hain. Python implementation sparse table mein empty slots bhi scan kar sakti hai; exam mein agar table capacity <code>m</code> explicitly di ho, iteration cost ke liye capacity ka effect bhi check karo.</p></div>
  <div class="hash-story"><b>Hash-table implementation ka link</b><p>Chaining, linear probing aur quadratic probing mein basic lookup/insert average O(1) ho sakta hai jab keys achchhe se distribute hon aur load controlled ho. Collisions par chain scan ya extra probes lagte hain; worst O(n) tak ja sakta hai. Quadratic probing ki probe sequence har empty slot tak pahunch hi jaaye, yeh separately guaranteed nahi.</p></div>
  <div class="hash-foundation"><span>HASHING METHODS · SIDE BY SIDE</span><h3>Collision aane par entry kahan jaati hai?</h3><p><code>h</code> key ka home index hai, <code>i=0,1,2…</code> probe number hai, aur <code>m</code> total buckets. Teenon rows mein same hash function use ho sakta hai; <strong>collision handle karne ka rule</strong> alag hai.</p></div>
  ${table(['Hashing type','Collision par kya karte hain?','Next location / formula','α &gt; 1?','Average / worst lookup','Table space','GATE trap'],[['Chaining','Home bucket ki list mein entry add; search mein us list ke keys compare','Home = h; same bucket ki chain scan','Possible','Expected O(1) / O(n)','O(m+n)','Same bucket ka matlab same key nahi'],['Linear probing','Occupied slot ke baad next slot check','(h+i) % m; i=0,1,2…','Impossible without resize','Expected O(1) at controlled α / O(n)','O(m)','i=0 se start; primary clustering possible'],['Quadratic probing','Occupied slot ke baad squared offset try','(h+i²) % m; i=0,1,2…','Impossible without resize','Expected O(1) when suitable conditions hold / O(n) or insertion failure','O(m)','Free slot hone par bhi probe sequence us tak na pahunche']])}
  <div class="callout"><b>Mini example · same home h=3, m=7</b><p>Linear probing candidates <code>3, 4, 5, 6…</code>; quadratic probing candidates <code>3, 4, 0, 5…</code>. Chaining mein next slot search nahi hota—entries bucket 3 ki list mein hi rehti hain. Dono probing methods mein <code>i=0</code> home slot check hai.</p></div>
  <div class="callout"><b>Cost of hashing a long string</b><p>Key length L ko characters se hash karna O(L). So complete lookup can be O(L) even when bucket access expected O(1). Unit-cost hash-table analysis usually treats hashing a key as O(1) or fixed-size key.</p></div>
  <div class="danger"><b>Do not mix</b><p>m=number of slots, n=number of stored keys, L=key length. α=n/m. Resizing/rehashing may make one insertion O(n), while amortized expected insertion remains O(1) under standard assumptions.</p></div>
`)

const charCount = section('10.8.1', 'char-count', 'Character Count', 'Frequency dictionary tracks each character', 'Course code: one pass over text; each frequency updated with get(default=0).', `
  ${codebox('Lecture code · char_count', lectureCodes.charCount)}
  ${table(['Read ch','freq before','Update','freq after'],[['m','{}','m=0+1','{m:1}'],['i','{m:1}','i=0+1','{m:1,i:1}'],['s','{m:1,i:1}','s=0+1','{m:1,i:1,s:1}'],['s','{m:1,i:1,s:1}','s=1+1','{m:1,i:1,s:2}']])}
  <div class="callout"><b>Input "Mississippi"</b><p>Uppercase "M" and lowercase "m" different keys honge. Space bhi character hai. Time O(n) expected; auxiliary O(u) for u distinct characters.</p></div>
`)

const firstUnique = section('10.8.2', 'first-unique', 'First Non-Repeating Character', 'First count; then original order mein frequency 1 dhoondo', 'Course code uses dict insertion order; modern Python keeps first insertion order.', `
  ${codebox('Lecture code · first_non_repeating_char', lectureCodes.firstUnique)}
  <div class="hash-trace"><span>Example "swiss"</span><div><b>Pass 1</b><code>{s:3, w:1, i:1}</code></div><div><b>Pass 2</b><code>s count 3 → skip; w count 1 → return "w"</code></div></div>
  <div class="callout"><b>Portable reasoning</b><p>Abstract unordered hash map question mein second pass original text par chalao: <code>for ch in text: if freq[ch] == 1: return ch</code>. Output order explicitly guaranteed hoga. Python dict ka insertion-order behavior alag language feature hai.</p></div>
  <div class="danger"><b>Missing case</b><p>Every character repeat hota hai toh returns <code>None</code>. n characters, u distinct: expected O(n) time, O(u) auxiliary space.</p></div>
`)

const twoSum = section('10.8.3', 'two-sum', 'Two-Sum Problem', 'Seen set mein complement dhoondo before current add', 'Course code values ka pair return karta hai, indices nahi.', `
  ${codebox('Lecture code · two_sum', lectureCodes.twoSum)}
  <p>Example: <code>target=9</code>, list starts <code>[3,4,6,…]</code>.</p>
  ${table(['Current x','Target−x','Seen before check','Decision'],[['3','6','{}','6 absent → add 3'],['4','5','{3}','5 absent → add 4'],['6','3','{3,4}','3 present → return (6,3)']])}
  <div class="callout"><b>Why check before add?</b><p>Target=6, list=[3] mein ek hi 3 do baar use nahi kar sakte. Check-before-add par first 3 ke time seen empty hai. Later second 3 aaye toh valid pair milta hai.</p></div>
  <div class="danger"><b>Prompt wording</b><p>Course code pair <code>(current, complement)</code> returns karta hai. GATE/other problem indices maange toh set ke badle value→index dictionary chahiye. Expected O(n) time, O(n) auxiliary.</p></div>
`)

const context = section('10.9', 'context', 'DS Context', 'Hashing answers “have I seen this key?” efficiently', 'Lookup, counting, duplicate detection and complement problems common transfer patterns hain.', `
  <div class="hash-use-cases"><article><span>01</span><h3>Frequency</h3><p>Character count, histogram, most common item.</p></article><article><span>02</span><h3>Membership</h3><p>Seen set, duplicate detection, cycle/visited.</p></article><article><span>03</span><h3>Pair search</h3><p>Two-sum: target−x lookup.</p></article><article><span>04</span><h3>Indexing</h3><p>Key→value access, cache or symbol lookup.</p></article></div>
  <div class="final"><h3>Module 10 mastery target</h3><p>Given hash h and table size m, insertion/probe sequence manually trace karo. Then α, average vs worst time, and Python dict/set order assumptions separately identify karo.</p><button data-jump="practice">Lecture-wise practice kholo →</button></div>
`)

export const lessonMarkup = [intro,hashFunction,functionCode,hashTable,collision,chaining,linear,quadratic,load,operations,dict,set,complexity,charCount,firstUnique,twoSum,context].join('\n')
