const q = (prompt, options, answer, explanation, difficulty, pattern) => ({ prompt, options, answer, explanation, difficulty, pattern })

const topic = (id, number, label, count, generator) => ({
  id, number, label,
  questions: Array.from({ length: count }, (_, i) => ({ id: `m2-${id}-${i + 1}`, number: i + 1, ...generator(i % 10, Math.floor(i / 10) + 1) }))
})

const foundations = topic('array-model','2.1','Array foundations',50,(m,r)=>{
  const set = [
    q('Classical array elements memory mein kaise stored hote hain?',['Random locations','Contiguous locations','Linked nodes','Hash buckets'],'Contiguous locations','Same-width elements ek ke baad ek stored hote hain, isliye address arithmetic possible hoti hai.','Foundation','Memory model'),
    q(`Zero-based array A mein ${r+2}th logical position ka index?`,[`${r+2}`,`${r+1}`,`${r}`,'Depends'],`${r+1}`,'Position counting 1 se, index counting 0 se start hoti hai.','Foundation','Indexing'),
    q('Agar base address B aur element width w ho, A[i] ka address?',['B+i+w','B+i×w','B×i+w','B+w/i'],'B+i×w','i elements skip; har element w bytes ka hai.','Core','Address formula'),
    q('Homogeneous array ka meaning?',['All values identical','Same data type','Sorted values','No duplicates'],'Same data type','Values different ho sakti hain; representation/type same hota hai.','Foundation','Definition'),
    q('Direct A[i] access ka standard time?',['Θ(1)','Θ(log n)','Θ(n)','Θ(n²)'],'Θ(1)','Address formula fixed number of arithmetic operations use karti hai.','Core','Random access'),
    q('Array ki length n ho toh valid non-negative index range?',['1…n','0…n','0…n−1','−1…n'],'0…n−1','Last valid index length se one less hota hai.','Foundation','Boundary'),
    q('Cache-friendly traversal ka main reason?',['Recursion','Nearby memory locations','Hashing','Sortedness'],'Nearby memory locations','Sequential contiguous locations spatial locality improve karti hain.','Core','Locality'),
    q('Fixed-size array ki limitation?',['Indexing impossible','Creation ke baad capacity fixed','Duplicates forbidden','Traversal quadratic'],'Creation ke baad capacity fixed','New capacity ke liye generally new storage allocate/copy karna padta hai.','Foundation','Fixed size'),
    q(`Length ${5+r} array mein A[-1] Python mein kya select karta hai?`,['First item','Last item','Error always','Middle item'],'Last item','Python negative index end se count karta hai. Classical pseudocode mein ye guarantee assume mat karo.','Core','Python edge'),
    q('Array aur algorithm mein n normally kya represent karta hai?',['First value','Number of elements','Memory address','Data type'],'Number of elements','Complexity input size ko element count ke function ke roop mein express karti hai.','Foundation','Input size')
  ]; return set[m]
})

const arrayOps = topic('array-ops','2.1A','Array operations',60,(m,r)=>{
  const n=10*r
  const set=[
    q(`Length ${n} array ko fully traverse karne ka tight time?`,['Θ(1)','Θ(log n)','Θ(n)','Θ(n²)'],'Θ(n)','Har element once visit hota hai.','Core','Traversal'),
    q('Unsorted array mein absent target linear search comparisons?',['0','1','log n','n'],'n','Absent target prove karne ke liye sab elements check karne padte hain.','Core','Linear search'),
    q('Beginning par insertion ke baad existing n elements?',['Shift right','Shift left','Unchanged addresses','Sorted'],'Shift right','New gap banane ke liye n elements move ho sakte hain.','Core','Insertion'),
    q('Last element deletion in a logical fixed array, size tracker available?',['Θ(1)','Θ(log n)','Θ(n)','Θ(n²)'],'Θ(1)','Koi later element shift nahi; logical size decrement.','Core','Deletion'),
    q(`A[:${r+2}] Python slice ka output size k ho toh time/space?`,['Θ(1)/Θ(1)','Θ(k)/Θ(k)','Θ(n²)/Θ(k)','Θ(log n)/Θ(1)'],'Θ(k)/Θ(k)','Standard list/array slice new container with k references/elements banata hai.','Core','Slicing'),
    q('Arrays A length n aur B length m concatenate karke new array banane ka cost?',['Θ(1)','Θ(max(n,m))','Θ(n+m)','Θ(nm)'],'Θ(n+m)','Dono inputs ke elements new storage mein copy hote hain.','Core','Concatenation'),
    q('Sorted array mein binary search kab valid?',['Always','Order preserved ho','Duplicates absent only','Size even ho'],'Order preserved ho','Middle comparison se half discard karne ke liye monotonic ordering chahiye.','Foundation','Search prerequisite'),
    q('Index i par update A[i]=x ka standard cost?',['Θ(1)','Θ(i)','Θ(n)','Θ(log n)'],'Θ(1)','Direct index address aur overwrite; shifting nahi.','Core','Update'),
    q('Array ko two halves mein Python slicing se split karna auxiliary output space?',['Θ(1)','Θ(log n)','Θ(n)','Θ(n²)'],'Θ(n)','Both slices together n elements/references copy karte hain.','Core','Split'),
    q(`Index ${r} par insert karte waqt worst case order?`,['Θ(1)','Θ(log n)','Θ(n)','Θ(n log n)'],'Θ(n)','Position start ke near ho toh linearly many elements shift.','Practice','Worst case')
  ]; return set[m]
})

const numpy = topic('array-python','2.1B','array module and NumPy bridge',50,(m,r)=>{
  const set=[
    q("array.array('i',[1,2,3]) mein 'i' kya hai?",['Index','Integer type code','Iterator','Identity'],'Integer type code','array module homogeneous machine-value type code use karta hai.','Foundation','array module'),
    q('np.array([1,2,3]) + 10 ka result?',['[1,2,3,10]','[11,12,13]','Error','30'],'[11,12,13]','NumPy addition element-wise vectorized hota hai; Python list + 10 invalid hai.','Foundation','Vectorization'),
    q('[1,2]+[3,4] Python list result?',['[4,6]','[1,2,3,4]','[3,8]','Error'],'[1,2,3,4]','List + concatenation hai, numerical element-wise addition nahi.','Core','List vs NumPy'),
    q('np.insert(a,i,x) normally original a ko?',['In-place mutate','New array return','Delete','Sort'],'New array return','NumPy fixed-size storage semantics ke karan insert new ndarray return karta hai.','Core','NumPy mutation'),
    q('np.delete(a,i) ka return ignore kar diya toh a?',['Element removed','Usually unchanged','Empty','Invalid'],'Usually unchanged','Function new array deta hai; result capture karna hota hai.','Core','Return value'),
    q('NumPy arrays GATE DA Section 4 mein explicitly named hain?',['Yes as mandatory library','No; Python programming is named','Only pandas','Only C'],'No; Python programming is named','Lecture relevance hai, par exam priority core Python semantics/algorithms ko do.','Foundation','Syllabus boundary'),
    q('np.concatenate((a,b)) output length?',['len(a)','len(b)','len(a)+len(b)','Product'],'len(a)+len(b)','Axis-compatible arrays ko join karta hai.','Foundation','Concatenate'),
    q('NumPy vectorization ka conceptual benefit?',['No operations','Explicit Python loop avoid','Always O(1)','No memory'],'Explicit Python loop avoid','Work still elements par hota hai, but optimized compiled loops use hote hain.','Core','Vectorization'),
    q(`np.array_split(a,${r+1}) kya allow karta hai?`,['Only equal division','Unequal chunk sizes','Only two chunks','No empty input'],'Unequal chunk sizes','array_split non-divisible length ko near-equal pieces mein split kar sakta hai.','Core','Splitting'),
    q('Python array module ka strongest property vs list?',['Heterogeneous','Typed homogeneous storage','Nested objects only','Hash lookup'],'Typed homogeneous storage','List object references store karti hai; array module compact typed values.','Foundation','Representation')
  ]; return set[m]
})

const listBasics = topic('list-basics','2.2','Python list foundations',50,(m,r)=>{
  const set=[
    q('Python list ki correct description?',['Fixed homogeneous','Ordered mutable dynamic sequence','Unordered immutable','Key-value only'],'Ordered mutable dynamic sequence','List order preserve, change allow aur grow/shrink kar sakti hai.','Foundation','Definition'),
    q(`L=[10,20,30]; L[${r%3}] ka type kis par depend?`,['List length only','Stored object','Index parity','Always int'],'Stored object','List heterogeneous objects refer kar sakti hai. Is example mein int hai.','Foundation','Object references'),
    q('List duplicates allow karti hai?',['No','Yes','Only strings','Only sorted list'],'Yes','Same/equal value multiple positions par ho sakta hai.','Foundation','Duplicates'),
    q('a=[1,2]; b=a; b.append(3); a?', ['[1,2]','[1,2,3]','[3]','Error'],'[1,2,3]','a aur b same mutable list object ke aliases hain.','Core','Aliasing'),
    q('List variable actual elements ke bajay conceptually kya slots store karti hai?',['Only bytes inline','Object references','Tree edges','Hash buckets'],'Object references','CPython list dynamic array of references jaisi behave karti hai.','Core','Memory model'),
    q('len([]) kya hai?',['None','1','0','Error'],'0','Empty list contains zero elements.','Foundation','Length'),
    q('mixed=[1,"x",True] valid kyun?',['All same type','List heterogeneous references allow karti hai','Implicit sort','Tuple hai'],'List heterogeneous references allow karti hai','Referenced objects ke types different ho sakte hain.','Foundation','Heterogeneity'),
    q('List mutable hone ka meaning?',['Variable rename only','Same list object ke contents change','Hashable always','Length fixed'],'Same list object ke contents change','append, assignment, remove object state change karte hain.','Foundation','Mutability'),
    q('List membership x in L ka average generic cost without extra assumptions?',['O(1)','O(log n)','O(n)','O(n²)'],'O(n)','Equality checks sequentially ho sakte hain.','Core','Membership'),
    q('Empty list condition mein truth value?',['True','False','None','Error'],'False','Empty built-in containers falsy hain.','Foundation','Truthiness')
  ]; return set[m]
})

const methods = topic('list-methods','2.2A','List methods',60,(m,r)=>{
  const set=[
    q('L.append([3,4]) kya add karta hai?',['3 and 4 separately','One nested list','Nothing','Error'],'One nested list','append argument ko single element ke roop mein add karta hai.','Foundation','append'),
    q('L.extend([3,4]) kya add karta hai?',['One nested list','3 and 4 separately','Only 3','Error'],'3 and 4 separately','extend iterable ke each element ko list mein append karta hai.','Foundation','extend'),
    q(`L.insert(${r},x) mein first argument?`,['Value count','Target index','Capacity','Type'],'Target index','Element specified position se before insert hota hai.','Foundation','insert'),
    q('L.remove(x) duplicate x ke case mein?',['All occurrences','First equal occurrence','Last only','Index x'],'First equal occurrence','remove value-based hai aur first match delete karta hai.','Core','remove'),
    q('L.pop() kya karta/return karta hai?',['First item','Last item remove and return','New list','None always'],'Last item remove and return','Default index -1 hota hai. Empty list par IndexError.','Foundation','pop'),
    q('del L[i] aur L.pop(i) main difference?',['del invalid','pop removed value return karta','del sorts','No difference at all'],'pop removed value return karta','del statement return value nahi deta.','Core','Deletion'),
    q('L.clear() ke baad aliases kya dekhte hain?',['Old contents','Same empty list','New list only one name','Error'],'Same empty list','clear existing object mutate karta hai, rebind nahi.','Core','clear'),
    q('L.sort() ka return?',['Sorted list','None','Tuple','Boolean'],'None','sort in-place mutation method hai; sorted(L) new list return karta hai.','Core','sort vs sorted'),
    q('L.reverse() ka effect?',['New iterator only','In-place order reverse','Sort descending','No mutation'],'In-place order reverse','reverse current list mutate karta aur None return karta hai.','Foundation','reverse'),
    q('L.count(x) ka worst-case time?',['Θ(1)','Θ(log n)','Θ(n)','Θ(n²)'],'Θ(n)','All positions check karne pad sakte hain.','Core','count')
  ]; return set[m]
})

const slicing = topic('slicing-copy','2.2B','Indexing, slicing and copying',60,(m,r)=>{
  const set=[
    q('L[a:b] mein index b?',['Included','Excluded','Only if negative','Repeated'],'Excluded','Slice half-open interval [a,b) follow karti hai.','Foundation','Slice boundary'),
    q('L[::-1] kya deta hai?',['Same object','Reversed shallow copy','Sort','Iterator only'],'Reversed shallow copy','Step -1 order reverse karta aur new list banata hai.','Core','Reverse slice'),
    q('a=[1,2]; b=a[:] ke baad b.append(3); a?', ['[1,2,3]','[1,2]','[3]','Error'],'[1,2]','Outer list copy independent hai; append b ke outer structure ko change karta hai.','Core','Shallow copy'),
    q('a=[[0],[1]]; b=a.copy(); b[0].append(9); a[0]?', ['[0]','[0,9]','[9]','Error'],'[0,9]','Shallow copy outer list new, inner list references shared.','Core','Nested alias'),
    q(`L[::${r+1}] ka meaning?`,['Every element','Every step-th element','Delete step','Only last'],'Every step-th element','Third slice component stride/step hai.','Foundation','Stride'),
    q('L[-2] kya select karta hai?',['Second item','Second-last item','Error always','Last two list'],'Second-last item','Negative indexing end se offset use karti hai.','Foundation','Negative index'),
    q('Length n list ka full copy L[:] cost?',['Θ(1)','Θ(log n)','Θ(n)','Θ(n²)'],'Θ(n)','n references new outer list mein copy hoti hain.','Core','Copy cost'),
    q('a=b vs a=b.copy()?', ['Both aliases','First alias; second shallow copy','Both deep copy','First deep copy'],'First alias; second shallow copy','Assignment new container nahi banata.','Core','Assignment vs copy'),
    q('Slice indices range ke bahar hon toh Python usually?',['Always IndexError','Clamp boundaries','Wrap infinitely','Delete list'],'Clamp boundaries','Slicing forgiving hai; direct invalid index access IndexError deta hai.','Core','Slice edge'),
    q('Deeply nested independent copy ke liye?',['Assignment','list.copy only','copy.deepcopy when appropriate','append'],'copy.deepcopy when appropriate','Deepcopy nested mutable objects recursively duplicate kar sakta hai.','Core','Deep copy')
  ]; return set[m]
})

const matrix = topic('lists-2d','2.2C','2D and nested lists',60,(m,r)=>{
  const set=[
    q('matrix[i][j] mein i aur j generally?',['column,row','row,column','value,index','size,size'],'row,column','First access row list, second us row ka column.','Foundation','2D indexing'),
    q('r×c rectangular matrix full traversal time?',['Θ(r+c)','Θ(rc)','Θ(r²+c²)','Θ(1)'],'Θ(rc)','Har row ke har column element once visit.','Core','Traversal'),
    q('M=[[0]*3]*2; M[0][0]=7 ke baad M?', ['[[7,0,0],[0,0,0]]','[[7,0,0],[7,0,0]]','Error','[[0,0,0],[0,0,0]]'],'[[7,0,0],[7,0,0]]','Outer multiplication same inner row reference repeat karta hai.','Core','Row alias trap'),
    q('Independent zero rows ka safe construction?',['[[0]*c]*r','[[0]*c for _ in range(r)]','[0]*r*c only','set rows'],'[[0]*c for _ in range(r)]','Comprehension each iteration fresh inner list banati hai.','Core','Matrix creation'),
    q('Jagged list kya hai?',['All rows equal','Rows different lengths','Immutable matrix','Sorted rows'],'Rows different lengths','Python nested lists rectangular hona compulsory nahi.','Foundation','Jagged arrays'),
    q('Empty matrix par len(M[0]) directly?',['0 always','IndexError','None','1'],'IndexError','M[0] absent hai; empty case separately handle karo.','Core','Empty edge'),
    q(`M[${r%2}].append(9) kya change karta hai?`,['Every row','Selected row only if independent','Number of rows','Tuple'],'Selected row only if independent','Selected inner list mutate hoti hai; alias rows hon toh effect multiple rows mein dikhega.','Core','Nested mutation'),
    q('Rectangular matrix with r rows c columns storage?',['Θ(r+c)','Θ(rc)','Θ(log rc)','Θ(1)'],'Θ(rc)','Total element/reference slots r×c.','Core','Space'),
    q('Transpose conceptual output dimensions for r×c?',['r×c always','c×r','r+c','rc×1'],'c×r','Rows columns exchange hote hain.','Foundation','Dimensions'),
    q('for row in M: for x in row works for jagged M?',['No','Yes','Only square','Only NumPy'],'Yes','Har row ki actual length traverse hoti hai. Total cost total elements.','Core','Jagged traversal')
  ]; return set[m]
})

const comparison = topic('compare','2.3','Arrays vs Lists',50,(m,r)=>{
  const set=[
    q('Numeric homogeneous bulk computation ke liye typical choice?',['Python list','NumPy ndarray','dict','set'],'NumPy ndarray','Compact typed storage aur vectorized operations useful hain.','Foundation','Selection'),
    q('Mixed objects aur frequent growth ke liye?',['Fixed typed array','Python list','Only matrix','Scalar'],'Python list','Dynamic heterogeneous sequence suitable hai.','Foundation','Selection'),
    q('Python list memory mein values necessarily contiguous raw ints hain?',['Yes','No, references contiguous-like slots mein','Only strings','Always linked list'],'No, references contiguous-like slots mein','List object references store karti hai; referred objects elsewhere ho sakte hain.','Core','Representation'),
    q('Classical array vs Python list: random access?', ['Both typically O(1)','Array O(n), list O(1)','Both O(n)','Impossible'],'Both typically O(1)','Dono indexable contiguous slot structures hain.','Core','Commonality'),
    q('Python list ko linked list samajhna?',['Correct','Incorrect; dynamic array of references','Only empty list','Depends on values'],'Incorrect; dynamic array of references','Middle insertion shifting cost isi model se explain hota hai.','Core','Mental model'),
    q('NumPy a+ b and Python lists a+b same semantics?',['Always','No: elementwise vs concatenation','Only length 2','Both errors'],'No: elementwise vs concatenation','Container operation meaning type par depend karta hai.','Core','Operator semantics'),
    q('Typed array usually memory-efficient kyun?',['No indices','Compact same-width values','No elements','Recursion'],'Compact same-width values','Per-element Python object/reference overhead reduce ho sakta hai.','Foundation','Memory'),
    q('Dynamic list growth har append par exact-size reallocation karti hai?',['Yes','No, spare capacity/over-allocation','Only strings','Never allocates'],'No, spare capacity/over-allocation','Occasional resize ke beech many O(1) appends possible hote hain.','Core','Dynamic array'),
    q('Scientific image tensor ke liye lecture recommendation?',['set','NumPy array/tensor','linked list','dict only'],'NumPy array/tensor','Rectangular homogeneous numeric data naturally fit hota hai.','Foundation','Use case'),
    q('Arrays vs lists comparison mein choice kis par depend?',['Name length','Data type, operations, growth','IDE theme','Function count'],'Data type, operations, growth','Representation workload ke according choose hoti hai.','Foundation','Trade-off')
  ]; return set[m]
})

const complexity = topic('complexity','2.4','Operation complexity',60,(m,r)=>{
  const set=[
    q('Python list append ka standard amortized time?',['O(1)','O(log n)','O(n) every call','O(n²)'],'O(1)','Occasional O(n) resize ka total many appends par spread hota hai.','Core','Amortized append'),
    q('Single append ka worst case when resize occurs?',['O(1)','O(log n)','O(n)','O(n²)'],'O(n)','Old references new larger buffer mein copy ho sakti hain.','Core','Worst vs amortized'),
    q('pop() from end standard cost?',['O(1)','O(n)','O(log n)','O(n²)'],'O(1)','Later elements shift nahi.','Core','End operation'),
    q('pop(0) cost?',['O(1)','O(log n)','O(n)','O(n²)'],'O(n)','Remaining n−1 references left shift hoti hain.','Core','Front deletion'),
    q('x in list worst case?',['O(1)','O(log n)','O(n)','O(n log n)'],'O(n)','Last/absent match tak sequential scan.','Core','Membership'),
    q('list.sort() worst-case time in Python?',['O(n)','O(n log n)','O(n²) guaranteed','O(log n)'],'O(n log n)','Python uses Timsort with O(n log n) worst-case and adaptive behavior.','Core','Sorting'),
    q('reverse() of length n list?',['O(1)','O(log n)','O(n)','O(n²)'],'O(n)','About n/2 swaps, still linear.','Core','Reverse'),
    q('insert at middle cost?',['O(1) amortized','O(n)','O(log n)','O(n²)'],'O(n)','Suffix elements shift.','Core','Insertion'),
    q('len(L) in Python?',['O(1)','O(n)','O(log n)','Unknown'],'O(1)','Length metadata maintained hoti hai.','Core','Metadata'),
    q('L1+L2 lengths n,m creates new list cost?',['O(1)','O(n+m)','O(nm)','O(log n)'],'O(n+m)','Both lists ke references copy.','Core','Concatenation')
  ]; return set[m]
})

const patterns = topic('coding','2.5','Coding patterns',60,(m,r)=>{
  const set=[
    q('Largest element scan ka correct initialization general non-empty list ke liye?',['0 always','First element','∞','None without handling'],'First element','All-negative list mein 0 wrong ho sakta hai. Empty list separately handle karo.','Core','Maximum'),
    q('One target occurrences count in list?',['Single scan O(n)','Sort mandatory','O(1) always','Nested loops'],'Single scan O(n)','Each element target se compare karke counter increment.','Foundation','Frequency'),
    q('Order preserve karke duplicates remove with result list membership check ka worst time?',['O(n)','O(n log n)','O(n²)','O(1)'],'O(n²)','Growing list mein `x not in result` itself linear, repeated n times.','Core','Deduplication'),
    q('Hashable items ka order-preserving faster dedupe pattern?',['seen set + output list','Only sort','Recursion only','Matrix'],'seen set + output list','Set membership average O(1), output encounter order store karta hai.','Core','Dedupe optimization'),
    q('In-place list reverse two pointers ki time/aux space?',['O(n),O(1)','O(n),O(n)','O(1),O(n)','O(n²),O(1)'],'O(n),O(1)','Ends swap karke pointers inward; new list nahi.','Core','Two pointers'),
    q('Empty list ka largest element?',['0 by definition','Undefined; specification/error handling needed','−1','∞'],'Undefined; specification/error handling needed','No element exists; function contract decide kare.','Core','Edge case'),
    q('All-negative list maximum algorithm max=0 se start kare toh?',['Always correct','Wrong ho sakta hai','Faster','Only memory issue'],'Wrong ho sakta hai','0 input mein na hote hue result ban sakta hai.','Core','Initialization trap'),
    q('Reverse printing vs reversed list return?', ['Same side effect','Different requirement','Always same object','Both sort'],'Different requirement','Print output produces no reusable list; problem statement quantity identify karo.','Foundation','Specification'),
    q('Frequency of every value efficiently?', ['Nested loops only','Dictionary counting','Binary search unsorted','Stack'],'Dictionary counting','One traversal with hash map average O(n).','Core','Frequency map'),
    q('Brute-force pair check among n elements?',['O(n)','O(log n)','O(n²)','O(2ⁿ)'],'O(n²)','Number of unordered pairs n(n−1)/2.','Practice','Pair enumeration')
  ]; return set[m]
})

const prefixWindow = topic('prefix-window','2.6','Prefix sums and sliding window',60,(m,r)=>{
  const set=[
    q('Prefix P[i+1]=P[i]+A[i] kyun useful?',['Range sum O(1)','Sorting O(1)','Delete O(1)','No memory'],'Range sum O(1)','Sum A[l:r+1]=P[r+1]−P[l].','Core','Prefix sum'),
    q('Length n prefix array build time/extra space?',['O(1)/O(1)','O(n)/O(n)','O(n²)/O(1)','O(log n)/O(n)'],'O(n)/O(n)','One pass aur n+1 stored cumulative values.','Core','Preprocessing'),
    q('Inclusive range [l,r] sum with P[0]=0?', ['P[r]−P[l]','P[r+1]−P[l]','P[r]−P[l−1] always','P[l]+P[r]'],'P[r+1]−P[l]','Half-open prefix convention off-by-one avoid karti hai.','Core','Range query'),
    q('Fixed window size k ka first sum kaise?', ['First k elements','First k+1','Only A[0]','Whole array'],'First k elements','Initial window separately compute, then slide.','Foundation','Window initialization'),
    q('Window one step right: sum update?', ['Add outgoing, remove incoming','Remove outgoing, add incoming','Recompute mandatory','Multiply'],'Remove outgoing, add incoming','Old left element leaves, new right element enters.','Core','Sliding update'),
    q('All length-k window sums optimized time?',['O(nk)','O(n)','O(kⁿ)','O(log n)'],'O(n)','Initial O(k), each of ~n windows O(1) update.','Core','Fixed window'),
    q('k>n fixed-window problem mein?',['One normal window','No valid full window','Always zero','Infinite'],'No valid full window','Problem contract should invalid k handle kare.','Core','Boundary'),
    q('k=0 ka behavior blindly assume karna?',['Safe','Specification check needed','Always max 0','Array sorted'],'Specification check needed','Empty-window definition problem dependent ho sakti hai.','Core','Boundary'),
    q('Negative numbers prefix sums mein allowed?',['No','Yes','Only sorted','Only one'],'Yes','Cumulative addition and difference negatives ke saath bhi correct.','Foundation','Generalization'),
    q('Variable-size sliding window kab straightforward hota hai?',['Every arbitrary condition','Monotonic condition, e.g. nonnegative sums','Only matrices','Never'],'Monotonic condition, e.g. nonnegative sums','Negative values monotonic shrink/expand reasoning break kar sakti hain.','Practice','Window prerequisite')
  ]; return set[m]
})

export const module2Topics = [foundations,arrayOps,numpy,listBasics,methods,slicing,matrix,comparison,complexity,patterns,prefixWindow]
export const module2QuestionCount = module2Topics.reduce((sum,item)=>sum+item.questions.length,0)
