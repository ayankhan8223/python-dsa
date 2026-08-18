const q=(prompt,options,answer,explanation,difficulty='Core',pattern='Concept')=>({prompt,options,answer,explanation,difficulty,pattern})
const topic=(id,number,label,count,make)=>({id,number,label,questions:Array.from({length:count},(_,i)=>({id:`m3-${id}-${i+1}`,number:i+1,...make(i%10,Math.floor(i/10)+1)}))})

const foundations=topic('intro','3.1','String foundations',50,(m,r)=>[
  q('Python string ki best definition?',['Mutable characters list','Immutable ordered Unicode sequence','Unordered bytes','Numeric array'],'Immutable ordered Unicode sequence','Characters ordered hain, indexing possible hai, lekin same string object edit nahi hota.','Foundation','Definition'),
  q(`s='gate${r}'; len(s)?`,[`${4+r}`,`${5}`,`${4+String(r).length}`,`${5+String(r).length}`],`${4+String(r).length}`,'g,a,t,e plus r ke decimal digits count honge.','Foundation','Length'),
  q('Single, double aur triple quotes ka common result type?',['list','str','tuple','bytes'],'str','Quote style literal delimit karta hai; produced object string hota hai.','Foundation','Literal'),
  q('Triple-quoted string ka main use?',['Only numbers','Multi-line literal/docstring','Mutable string','Sorting'],'Multi-line literal/docstring','Newlines literal ke andar preserve kiye ja sakte hain.','Foundation','Creation'),
  q('String iterable hone ka meaning?',['Characters par loop','Characters mutate','Hash table only','Index absent'],'Characters par loop','for ch in s sequential Unicode characters yield karta hai.','Foundation','Iteration'),
  q('Empty string bool value?',['True','False','None','Error'],'False','Empty built-in sequences falsy hoti hain.','Foundation','Truthiness'),
  q("type('7'[0])?",['int','str','float','bytes'],'str','String indexing one-character string deta hai, integer digit nahi.','Core','Character type'),
  q('Strings ordered hone ka effect?',['No indices','Position and lexicographic comparison matter','Duplicates forbidden','Always sorted'],'Position and lexicographic comparison matter','Character sequence ka order preserved hota hai.','Foundation','Order'),
  q(`'ab' * ${r+1} ka length?`,[`${r+1}`,`${2*(r+1)}`,`${2+r}`,`${r}`],`${2*(r+1)}`,'Length repetition factor se multiply hoti hai.','Foundation','Repetition'),
  q('Text data ko process karne ka DS/ML example?',['Tokenization','Matrix inversion only','B-tree split','Pointer arithmetic'],'Tokenization','NLP pipeline text ko tokens/features mein convert karti hai.','Foundation','Use case')
][m])

const immutability=topic('properties','3.2','Immutability, indexing and slicing',60,(m,r)=>[
  q("s='hello'; s[0]='H' ka result?",['Hello','TypeError','hello','None'],'TypeError','String item assignment supported nahi; naya string construct karna hoga.','Core','Immutability'),
  q("s='hi'; t=s+'!'; s?",['hi!','hi','!','Error'],'hi','Concatenation new string t banati hai; s unchanged.','Core','New object'),
  q("s='python'; s[-1]?",['p','n','o','Error'],'n','-1 last character select karta hai.','Foundation','Negative index'),
  q("'abcdef'[1:5:2]?",['bdf','bd','ace','bcde'],'bd','Indices 1,3 included; stop 5 excluded.','Core','Slicing'),
  q("'gate'[::-1]?",['gate','etag','g','Error'],'etag','Negative step reverse-order copy deta hai.','Foundation','Reverse slice'),
  q('Length n string ka full slice/copy time and output space?',['O(1)/O(1)','O(n)/O(n)','O(log n)/O(1)','O(n²)/O(n)'],'O(n)/O(n)','Characters new string mein copy/materialize hote hain.','Core','Slice cost'),
  q('Loop mein result = result + ch repeatedly, n chars: worst total cost?',['O(1)','O(n)','O(n²)','O(log n)'],'O(n²)','Immutable strings ke growing prefixes repeatedly copy ho sakte hain; list + join prefer.','Core','Concatenation trap'),
  q("s[:100] when len(s)=5?",['IndexError','Whole string','Empty','None'],'Whole string','Slice bounds clamp hote hain; direct s[100] IndexError deta.','Core','Boundary'),
  q(`s='abc'; s[${r+3}]?`,['Empty string','IndexError','c','None'],'IndexError','Direct index outside valid range error deta hai.','Foundation','Boundary'),
  q('String immutable hone se hash key suitability?',['Generally hashable','Never hashable','Only empty','Only digits'],'Generally hashable','Stable value/hash ki wajah se strings dict keys/set elements ban sakti hain.','Core','Hashability')
][m])

const unicodeCompare=topic('unicode-compare','3.2A','Unicode and string comparison',60,(m,r)=>[
  q("ord('A') aur ord('a') relation?",['Equal','ord(A)<ord(a)','ord(A)>ord(a)','Undefined'],'ord(A)<ord(a)','Unicode code points A=65, a=97.','Foundation','Code points'),
  q("chr(65)?",['65','A','a','Error'],'A','chr code point ko one-character string mein convert karta hai.','Foundation','chr/ord'),
  q("'Zoo' < 'apple'?",['True','False','Error','Length only'],'True','First differing Z(90) < a(97); comparison case-sensitive.','Core','Lexicographic'),
  q("'ball' < 'balls'?",['True','False','Error','Equal'],'True','Common prefix equal; shorter string smaller.','Core','Prefix rule'),
  q("'10' < '2'?",['True','False','Numeric compare','Error'],'True','Strings character-wise: first 1 < 2; numeric values parse nahi hote.','Core','Numeric-string trap'),
  q('Lexicographic comparison ka first decision point?',['Last char always','First differing character','Length first always','Vowel count'],'First differing character','Left-to-right compare; first mismatch decide karta hai.','Foundation','Comparison'),
  q("sorted('abcABC')[0]?",['a','A','c','Error'],'A','Uppercase code points lowercase se pehle aate hain in this ASCII subset.','Core','Sorting'),
  q('Case-insensitive comparison ke liye robust basic step?',['Compare raw','Normalize with casefold/lower','Use len only','Reverse'],'Normalize with casefold/lower','Both strings ko same case normalization do; casefold broader Unicode cases handle karta hai.','Core','Normalization'),
  q("ord('&') returns?",['One-character string','Integer code point','Boolean','bytes'],'Integer code point','ord Unicode character ka integer code point deta hai.','Foundation','ord'),
  q('Python internally “UTF-8 string object” kehna fully accurate?',['Yes always fixed bytes','No; str Unicode code points abstraction hai, encoding bytes par hoti hai','Only Windows','Only ASCII'],'No; str Unicode code points abstraction hai, encoding bytes par hoti hai','UTF-8 ek encoding hai; <code>s.encode()</code> bytes banata hai.','Core','Encoding correction')
][m])

const common=topic('common','3.4','Common string functions',60,(m,r)=>[
  q("'Data'.lower()?",['DATA','data','Data','None'],'data','lower new lowercase string return karta hai.','Foundation','Case conversion'),
  q("s='Data'; x=s.upper(); s?",['DATA','Data','None','Error'],'Data','Strings immutable; upper returned new string x.','Core','Return vs mutation'),
  q("'  hi  '.strip()?",['  hi','hi  ','hi','  hi  '],'hi','Default strip leading/trailing whitespace remove karta hai.','Foundation','strip'),
  q("'banana'.replace('a','o',2)?",['bonona','bonano','banana','Error'],'bonona','Only first two occurrences replace hote hain.','Core','replace count'),
  q("'a-b-c'.split('-')?",["['a','b','c']","['a-b-c']",'abc','Error'],"['a','b','c']",'Explicit separator tokens list deta hai.','Foundation','split'),
  q("'-'.join(['a','b','c'])?",['a-b-c',"['a-b-c']",'abc-','Error'],'a-b-c','Separator object par join call hota hai.','Foundation','join'),
  q("'abc'.find('x')?",['-1','ValueError','None','0'],'-1','find absent substring par sentinel -1 return karta hai.','Core','find'),
  q("'abc'.index('x')?",['-1','ValueError','None','0'],'ValueError','index absence par exception raise karta hai.','Core','index'),
  q("'banana'.count('ana')?",['1','2','3','0'],'1','str.count non-overlapping occurrences count karta hai; ana occurrences overlap.','Core','Non-overlap'),
  q(`len('x' * ${r+2})?`,[`${r+1}`,`${r+2}`,`${2*r}`,'1'],`${r+2}`,'Repetition exactly r+2 characters banati hai.','Foundation','len')
][m])

const caseWhitespace=topic('case-space','3.5A','Case and whitespace handling',50,(m,r)=>[
  q("'data science'.title()?",['Data science','Data Science','DATA SCIENCE','data Science'],'Data Science','Each word-like component ka initial cased character uppercase.','Foundation','title'),
  q("'hELLO'.capitalize()?",['Hello','HELLO','hello','hELLO'],'Hello','First char upper, remaining lower.','Foundation','capitalize'),
  q("'Ab1'.swapcase()?",['aB1','AB1','ab1','Error'],'aB1','Cased characters flip; digit unchanged.','Foundation','swapcase'),
  q("'  x  '.lstrip()?",['x','x  ','  x','  x  '],'x  ','Only left leading whitespace removed.','Foundation','lstrip'),
  q("'  x  '.rstrip()?",['x','x  ','  x','  x  '],'  x','Only right trailing whitespace removed.','Foundation','rstrip'),
  q("'www.example.com'.strip('w.')?",['example.com','example.co','www.example.com','Error'],'example.com','strip argument exact prefix nahi; ends se any listed characters repeatedly removes.','Core','strip charset trap'),
  q('Whitespace normalize internal multiple spaces with strip only?',['Yes','No; split/join useful','Only upper','Automatic'],'No; split/join useful','strip ends clean karta hai, internal runs nahi.','Core','Normalization'),
  q("'ß'.casefold() comparison context mein lower se?",['Always identical','casefold more aggressive Unicode normalization','Invalid','Returns bytes'],'casefold more aggressive Unicode normalization','Caseless matching ke liye casefold broader transformations karta hai.','Core','Unicode case'),
  q("''.upper()?",['Error','Empty string','None','Space'],'Empty string','Empty input valid; new/result value also empty.','Foundation','Empty edge'),
  q('Case conversion original string mutate karti hai?',['Yes','No','Only lowercase','Only ASCII'],'No','All string methods return values; string immutable.','Foundation','Immutability')
][m])

const searchValidate=topic('search-validate','3.5B','Searching and validation',60,(m,r)=>[
  q("'data science'.startswith('data')?",['True','False','0','Error'],'True','Prefix exact and case-sensitive match hota hai.','Foundation','startswith'),
  q("'file.py'.endswith(('.py','.ipynb'))?",['True','False','Tuple invalid','None'],'True','startswith/endswith tuple of alternatives accept karte hain.','Core','Multiple suffixes'),
  q("'123'.isdigit()?",['True','False','123','Error'],'True','All characters digit and string non-empty.','Foundation','isdigit'),
  q("''.isalpha()?",['True','False','Error','None'],'False','Validation methods normally at least one character require karte hain.','Core','Empty edge'),
  q("'abc123'.isalnum()?",['True','False','Error','Only letters'],'True','All chars letters/digits; no spaces/punctuation.','Foundation','isalnum'),
  q("'   '.isspace()?",['True','False','Empty','Error'],'True','Non-empty and every char whitespace.','Foundation','isspace'),
  q("'abc'.islower()?",['True','False','Only first','Error'],'True','At least one cased char and all cased chars lowercase.','Core','Case validation'),
  q("'123'.islower()?",['True','False','Error','None'],'False','No cased character, so islower false.','Core','No-cased edge'),
  q('Naive substring search text length n, pattern m worst time?',['O(1)','O(n+m)','O(nm)','O(log n)'],'O(nm)','Up to m comparisons at many candidate starts.','Core','Substring complexity'),
  q('find result ko if condition mein directly use karne ka trap?',['-1 truthy and index 0 falsy','All indices false','find raises','No trap'],'-1 truthy and index 0 falsy','Correct check <code>!= -1</code> or use <code>sub in s</code>.','Core','Sentinel truthiness')
][m])

const transform=topic('split-join','3.5C','Split, join, replace and formatting',60,(m,r)=>[
  q("'a  b'.split()?",["['a','b']","['a','','b']","['a  b']",'Error'],"['a','b']",'Default whitespace split runs collapse karta aur ends ignore karta hai.','Core','Default split'),
  q("'a  b'.split(' ')?",["['a','b']","['a','','b']","['a  b']",'Error'],"['a','','b']",'Explicit separator adjacent separators ke beech empty token preserve karta hai.','Core','Explicit split'),
  q("'a,b,c'.split(',',1)?",["['a','b,c']","['a','b','c']",'a,b,c','Error'],"['a','b,c']",'maxsplit=1 only first separator split karta hai.','Core','maxsplit'),
  q("','.join('abc')?",['a,b,c','abc',"['a','b','c']",'Error'],'a,b,c','String itself iterable of characters hai.','Core','join iterable'),
  q("'-'.join([1,2])?",['1-2','TypeError','[1,2]','None'],'TypeError','join ko string elements chahiye; map(str, values) use kar sakte hain.','Core','Type edge'),
  q("'aaa'.replace('a','bb') length?",['3','4','6','Error'],'6','Three non-overlapping a each bb se replace.','Core','Replace growth'),
  q('f"{value:.2f}" ka purpose?',['Two characters','Float formatting to 2 decimals','String slice','Binary'],'Float formatting to 2 decimals','Format spec precision control karta hai.','Foundation','f-string'),
  q('Many pieces efficiently assemble?',['Repeated + always','List collect then join','Nested replace','ord'],'List collect then join','join final output once allocate/copy karne ke close behavior deta hai.','Core','Efficient construction'),
  q('split returns and join returns?', ['str,str','list,str','list,list','tuple,str'],'list,str','split token list; join combined string.','Foundation','Type flow'),
  q('replace original mutate?',['Yes','No, returns new string','Only first','Depends length'],'No, returns new string','String immutable. Returned value capture karo.','Foundation','Return value')
][m])

const frequency=topic('frequency','3.7A','Vowels and character frequency',60,(m,r)=>[
  q('Vowels/consonants count se pehle ch.isalpha() kyun?',['Sort','Digits/spaces/punctuation exclude','Uppercase remove','Length'],'Digits/spaces/punctuation exclude','Only alphabetic chars vowel/consonant classification mein aate hain.','Foundation','Filtering'),
  q("'AE'.lower() then vowel test count?",['0','1','2','Error'],'2','Case normalize karne ke baad both a,e vowel set mein.','Foundation','Normalization'),
  q('Frequency dictionary update idiom?',["d[ch]=d.get(ch,0)+1",'d[ch]+=0 only','d.get=1','append(ch)'],"d[ch]=d.get(ch,0)+1",'Missing key ka default 0, then increment.','Core','Frequency map'),
  q("Counter('banana')['a']?",['1','2','3','0'],'3','Counter character multiplicities store karta hai.','Foundation','Counter'),
  q('Alphabet size fixed 26 lowercase ho toh frequency array extra space?',['O(n)','O(1) relative to n','O(log n)','O(n²)'],'O(1) relative to n','26 constant slots; general Unicode alphabet par assumption invalid.','Core','Alphabet assumption'),
  q('Character frequency build time for length n?',['O(1)','O(n)','O(n log n)','O(n²)'],'O(n)','Every character once process.','Core','Complexity'),
  q('Most frequent char tie case?',['Ignore','Tie-breaking rule specification needed','Always first alphabetically','Always last'],'Tie-breaking rule specification needed','Problem may ask first occurring/smallest/any; implementation accordingly.','Core','Tie edge'),
  q("String '__a1!' mein alphabetic count?",['1','2','3','4'],'1','Only a is alphabetic.','Foundation','Validation'),
  q('Notebook buggy pattern `if ch in dict: dict[ch]+=1` on empty dict?', ['Counts all','Counts none','KeyError','Sorts'],'Counts none','No key initially present; else initialization or get required.','Core','Lecture correction'),
  q('Case-sensitive frequency of A and a?', ['Same key','Different keys','Error','Only A'],'Different keys','Normalize only if problem says case-insensitive.','Core','Specification')
][m])

const palindrome=topic('palindrome','3.7B','Palindrome patterns',50,(m,r)=>[
  q("'malayalam' palindrome?",['True','False','Only numeric','Error'],'True','String reverse ke equal hai.','Foundation','Definition'),
  q('s==s[::-1] time/extra output space?',['O(1)/O(1)','O(n)/O(n)','O(n²)/O(1)','O(log n)/O(n)'],'O(n)/O(n)','Reverse slice new length-n string banata hai.','Core','Slice method'),
  q('Two-pointer palindrome check auxiliary space?',['O(n)','O(1)','O(log n)','O(n²)'],'O(1)','Left/right indices only; comparisons O(n).','Core','Two pointers'),
  q('Empty string palindrome convention?',['Usually yes','Always error','No by definition','Length 1'],'Usually yes','It reads same forward/backward; problem convention verify karo.','Core','Empty edge'),
  q('Case-insensitive phrase palindrome first step?',['No change','Normalize case and filter allowed chars','Sort','Count length only'],'Normalize case and filter allowed chars','Spaces/punctuation/case rules specification dependent.','Core','Normalization'),
  q('At first mismatch two-pointer algorithm?', ['Continue mandatory','Return false early','Sort rest','Change char'],'Return false early','One unequal symmetric pair proves not palindrome.','Foundation','Early exit'),
  q('Palindrome requires same character frequencies only?', ['Sufficient','Necessary but not sufficient for a fixed order','Not necessary','Only digits'],'Necessary but not sufficient for a fixed order','ab and ba same counts but neither may be palindrome. Order matters.','Core','Necessary vs sufficient'),
  q('Length 1 string palindrome?', ['Yes','No','Error','Only letter'],'Yes','Single character reverse same.','Foundation','Base case'),
  q('Recursive palindrome maximum stack depth?',['O(1)','O(log n)','O(n)','O(2ⁿ)'],'O(n)','Each call boundaries inward by one pair; about n/2 frames = O(n).','Core','Recursion space'),
  q('Two-pointer comparisons worst case length n?', ['1','n','floor(n/2)','n²'],'floor(n/2)','Each symmetric pair once until center.','Core','Exact count')
][m])

const anagram=topic('anagram','3.7C','Anagram patterns',60,(m,r)=>[
  q('Anagram definition?',['Same order only','Same multiset of characters','Same length only','Both palindrome'],'Same multiset of characters','Each character count equal; order may differ.','Foundation','Definition'),
  q('Different lengths strings anagrams?',['Possible','No','Always','Only Unicode'],'No','Same character multiset implies same total count/length.','Foundation','Early rejection'),
  q('Sort-and-compare anagram time?',['O(n)','O(n log n)','O(1)','O(n²)'],'O(n log n)','Sorting dominates; output lists extra space.','Core','Sorting method'),
  q('Frequency-map anagram expected time?',['O(n)','O(n log n)','O(n²)','O(2ⁿ)'],'O(n)','Two linear passes with hash updates.','Core','Hash method'),
  q('26-array method prerequisite?',['Any Unicode','Known lowercase a-z alphabet','Sorted input','No duplicates'],'Known lowercase a-z alphabet','ord(ch)-ord(a) mapping valid only constrained alphabet.','Core','Alphabet constraint'),
  q("'listen' and 'silent'?",['Anagrams','Not','Only palindrome','Error'],'Anagrams','Same six letters and counts.','Foundation','Example'),
  q('Case-insensitive anagram test?', ['Raw compare','Normalize both consistently','Reverse only','Length only'],'Normalize both consistently','Case rules problem statement se determine.','Core','Normalization'),
  q('all(count==0) after increment/decrement means?', ['Every char balanced','String sorted','Palindrome','Empty only'],'Every char balanced','First string increments, second decrements; zero vector equal multiplicities.','Core','Invariant'),
  q('Anagram and permutation relation?', ['Unrelated','One string is permutation of other characters','Same substring only','Numeric only'],'One string is permutation of other characters','Character multiset same, positions rearranged.','Foundation','Interpretation'),
  q('Spaces/punctuation include karne hain?', ['Always yes','Always no','Problem specification decides','Python removes'],'Problem specification decides','Normalization policy silently assume mat karo.','Core','Specification')
][m])

const substring=topic('substring-window','3.8','Substring and window bridge',60,(m,r)=>[
  q('Substring vs subsequence?',['Both contiguous','Substring contiguous; subsequence can skip','Subsequence contiguous only','Same always'],'Substring contiguous; subsequence can skip','Order both mein preserve, contiguity only substring.','Foundation','Terminology'),
  q('Length n string ke total non-empty substrings count?',['n','n²','n(n+1)/2','2ⁿ'],'n(n+1)/2','Each start-end pair; n+(n−1)+…+1.','Core','Counting'),
  q('All substrings materialize karne ka output size lower bound roughly?',['O(1)','O(n)','O(n²) substrings; characters can total O(n³)','O(log n)'],'O(n²) substrings; characters can total O(n³)','Objects count and copied-character volume separate quantities hain.','Practice','Output complexity'),
  q('Fixed length k substring frequencies maintain karne ka pattern?',['DFS','Sliding window','Heap only','Binary tree'],'Sliding window','Outgoing char decrement, incoming increment.','Core','Fixed window'),
  q('Longest substring without repeat common method?',['Sort','Variable sliding window + last seen/count','Recursion only','Prefix sum only'],'Variable sliding window + last seen/count','Duplicate aate hi left boundary appropriately advance.','Core','Unique window'),
  q('Naive pattern search alignments count roughly?',['1','n−m+1','nm strings','2ⁿ'],'n−m+1','Pattern length m ko text length n mein possible starts.','Core','Pattern matching'),
  q('Rolling hash collision implication?',['Hashes equal guarantees strings equal','Need verification/collision handling','No issue ever','Only numbers'],'Need verification/collision handling','Different substrings same hash possible.','Practice','Hash caveat'),
  q('Two strings concatenate in loop efficiently?', ['Repeated immutable +','Collect chunks and join','Always replace','ord every char'],'Collect chunks and join','Repeated prefix copying avoid hota hai.','Core','Construction'),
  q('Window frequency comparison alphabet fixed ho toh per-window compare?', ['Can be O(1) wrt n with fixed 26','Always O(n)','O(2ⁿ)','Impossible'],'Can be O(1) wrt n with fixed 26','26-slot comparison constant relative to input length.','Core','Alphabet constant'),
  q('String algorithms mein normalization kab apply?', ['Always blindly','Problem semantics demand kare tab','Never','After answer'],'Problem semantics demand kare tab','Raw code points vs cleaned text different problems solve karte hain.','Core','Specification')
][m])

export const module3Topics=[foundations,immutability,unicodeCompare,common,caseWhitespace,searchValidate,transform,frequency,palindrome,anagram,substring]
export const module3QuestionCount=module3Topics.reduce((sum,t)=>sum+t.questions.length,0)
