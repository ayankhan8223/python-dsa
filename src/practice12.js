import { lectureData } from './module12Lessons.js'

const choose = (prompt, answer, wrong, explanation, index, difficulty = 'Core') => {
  const values = [String(answer), ...wrong.map(String)].filter((value, position, all) => all.indexOf(value) === position)
  if (values.length < 4 && Number.isFinite(Number(answer))) {
    for (let offset = 3; values.length < 4; offset++) {
      const candidate = String(Number(answer) + offset)
      if (!values.includes(candidate)) values.push(candidate)
    }
  }
  if (values.length !== 4) throw new Error(`Need four distinct choices: ${prompt}`)
  const shift = index % 4
  const options = values.slice(shift).concat(values.slice(0, shift))
  return { id: index + 1, prompt, options, answer: String(answer), explanation, difficulty }
}
const q = (prompt, answer, wrong, why, i, difficulty) => choose(prompt, answer, wrong, why, i, difficulty)
const list = values => values.join(' → ')
const binary = n => ({
  root:`R${n}`, left:`L${n}`, right:`Q${n}`, ll:`A${n}`, lr:`B${n}`, rl:`C${n}`
})
const orders = t => ({
  pre:[t.root,t.left,t.ll,t.lr,t.right,t.rl],
  in:[t.ll,t.left,t.lr,t.root,t.rl,t.right],
  post:[t.ll,t.lr,t.left,t.rl,t.right,t.root],
  level:[t.root,t.left,t.right,t.ll,t.lr,t.rl]
})
const diagramText = t => `root ${t.root}; ${t.root}.left=${t.left}, .right=${t.right}; ${t.left}.left=${t.ll}, .right=${t.lr}; ${t.right}.left=${t.rl}`
const traversalType = { 'traversals':'pre','create-tree':'pre','preorder-theory':'pre','preorder-code':'pre','inorder':'in','postorder':'post','level-order':'level','choice':'post' }
function traversalQuestion(id, i) {
  const n = 11 + i
  const t = binary(n)
  const order = traversalType[id]
  const o = orders(t)
  const name = {pre:'preorder',in:'inorder',post:'postorder',level:'level order'}[order]
  const rule = {pre:'node-left-right',in:'left-node-right',post:'left-right-node',level:'FIFO level-by-level'}[order]
  const shape = diagramText(t)
  const mode = i % 5
  if (id === 'traversals') {
    if (mode === 0) return q(`${shape}. DFS category mein kaun se traversal types hain?`,'Preorder, Inorder, Postorder',['Only Level order','Preorder and Level order','Only Inorder'],`DFS branch/subtree complete karta hai; pre/in/post teen DFS orders hain.`,i,'Foundation')
    if (mode === 1) return q(`${shape}. Level-order BFS ke liye kaunsa structure?`,'Queue (FIFO)',['Stack (LIFO)','Min-heap','Recursion only'],`Queue se nodes level-by-level nikalte hain.`,i,'Foundation')
    if (mode === 2) return q(`${shape}. DFS ek branch poori explore karne ke liye kya use kar sakta hai?`,'Recursion or stack',['Queue only','Hash table only','Sorting only'],`Call stack ya explicit stack depth-first order maintain karta hai.`,i,'Foundation')
    if (mode === 3) return q(`${shape}. Tree traversal ka main purpose?`,'Har node ko systematic order mein visit karna',['Sirf root visit karna','Values ko hamesha sort karna','Har edge do baar print karna'],`Non-linear tree ko process karne ke liye visit order define karte hain.`,i,'Core')
    return q(`${shape}. BFS/level-order output?`,list(o.level),[list(o.pre),list(o.in),list(o.post)],`Queue pehle root, then same level ke children process karti hai: ${list(o.level)}.`,i,'Core')
  }
  if (mode === 0) return q(`${shape}. ${name} output?`,list(o[order]),Object.keys(o).filter(x=>x!==order).map(x=>list(o[x])),`${name} rule ${rule}; answer ${list(o[order])}.`,i,'Core')
  if (mode === 1) return q(`${shape}. ${name} mein third visited node kaun hai?`,o[order][2],o[order].filter((_,j)=>j!==2).slice(0,3),`Complete ${name} order ${list(o[order])}; third ${o[order][2]}.`,i,'Foundation')
  if (mode === 2) return q(`${shape}. ${name} mein last visited node?`,o[order].at(-1),o[order].slice(0,3),`${name}: ${list(o[order])}; last ${o[order].at(-1)}.`,i,'Core')
  if (mode === 3) return q(`${shape}. ${name} ke first two visits?`,list(o[order].slice(0,2)),[list([o[order][1],o[order][0]]),list([o[order][0],o[order][2]]),list([o[order][0],o[order][3]])],`Rule ${rule}; first two ${list(o[order].slice(0,2))}.`,i,'Core')
  const answer = order === 'level' ? 'Queue (FIFO)' : 'Recursive call stack / DFS'
  const wrong = order === 'level' ? ['Stack (LIFO)','Min-heap','Hash table'] : ['Queue (FIFO)','Min-heap','Hash table']
  return q(`${shape}. Lecture ka ${name} traversal kis mechanism se visit order maintain karta hai?`,answer,wrong,`Level order queue use karta hai; preorder/inorder/postorder depth-first recursive stack.`,i,'GATE')
}
function basicsQuestion(id, i) {
  const n = 3 + i
  const mode = i % 5
  if (id === 'properties') {
    const propertyMode = i % 10
    if (propertyMode === 0) return q(`N=${n} nodes wale rooted tree mein root ke kitne parents hote hain?`,'0',['1','2',String(n-1)],'Root ka koi parent nahi hota.',i,'Foundation')
    if (propertyMode === 1) return q(`N=${n} nodes wale rooted tree mein root ko chhodkar har node ke kitne parents?`,'1',['0','2',String(n-1)],'Every non-root node has exactly one immediate parent.',i,'Foundation')
    if (propertyMode === 2) return q(`N=${n} rooted nodes mein A→B→C child path hai. C se A child link add karein to kya banega?`,'Cycle',['Valid tree','Disconnected forest','New root'],'A→B→C→A cycle tree rule todta hai.',i,'Foundation')
    if (propertyMode === 3) return q(`Root A se ${n} nodes reachable hain, lekin G alag disconnected hai. Whole structure ek tree hai?`,'No, forest',['Yes, one tree','Yes, BST','Yes, full tree'],'Tree connected hota hai; G root A se reachable nahi.',i,'Core')
    if (propertyMode === 4) return q(`Rooted tree mein N=${n} nodes hain. Edges?`,n-1,[n,n+1,2*n],`Root ko parent edge nahi; remaining N−1 nodes ko one parent edge each.`,i,'Core')
    if (propertyMode === 5) return q(`N=${n} nodes wale rooted tree mein non-root nodes kitne?`,n-1,[n,n+1,1],`Exactly ek root hai; baaki N−1 nodes non-root hain.`,i,'Foundation')
    if (propertyMode === 6) return q(`N=${n} nodes wale connected tree mein parent–child links (edges) kitne?`,n-1,[n,n+1,n-2],`Root ko parent link nahi; each of the other N−1 nodes has one.`,i,'Core')
    if (propertyMode === 7) return q(`N=${n} nodes ke structure mein cycle milti hai. Kya yeh tree ho sakta hai?`,'Nahi',['Haan, kyunki connected hai','Haan, kyunki root hai','Haan, kyunki N nodes hain'],`Tree acyclic hota hai; cycle hone par tree rule fail.`,i,'Core')
    if (propertyMode === 8) return q(`N=${n} nodes mein ek node ka zero child hai. Use kya kahenge?`,'Leaf',['Root zaroor hoga','Cycle','Disconnected node'],`Jis node ke children nahi hote, woh leaf hai.`,i,'Foundation')
    return q(`N=${n} nodes ke graph mein N−1 edges hain, par woh disconnected hai. Kya ek tree hai?`,'Nahi',['Haan, N−1 enough hai','Haan, agar root label de dein','Haan, agar values sorted hain'],`N−1 edges akela sufficient nahi; tree connected bhi hona chahiye.`,i,'Core')
  }
  const t = binary(n)
  const shape = diagramText(t)
  if (mode === 0) return q(`${shape}. ${t.lr} ka parent?`,t.left,[t.root,t.right,t.ll],`${t.lr} direct ${t.left}.right child hai.`,i,'Foundation')
  if (mode === 1) return q(`${shape}. ${t.lr} aur ${t.ll} ka relation?`,'Siblings',['Parent-child','Ancestors','Unrelated'],`Same parent ${t.left} ke children siblings.`,i,'Foundation')
  if (mode === 2) {
    if (i % 2 === 0) return q(`${shape}. Root ${t.root} ki depth (edges)?`,'0',['1','2','3'],`Root se root tak zero edges.`,i,'Foundation')
    return q(`${shape}. Lecture convention mein ${t.lr} ka level?`,'3',['0','1','2'],`${t.lr} root se 2 edges door hai: depth 2, level = depth + 1 = 3.`,i,'Foundation')
  }
  if (mode === 3) return q(`${shape}. Leaf nodes kitne?`,'3',['2','4','5'],`${t.ll}, ${t.lr}, ${t.rl} have no children.`,i,'Core')
  return q(`${shape}. ${t.left} rooted subtree mein nodes kitne?`,'3',['2','4','6'],`${t.left} subtree = ${t.left}, ${t.ll}, ${t.lr}.`,i,'Core')
}
function bstQuestion(id, i) {
  const r = 100 + 2*i
  const vals = [r-15,r-10,r-5,r,r+5,r+10,r+15]
  const mode=i%5
  const concept=i%10
  const shape=`BST: root ${r}; children ${r-10},${r+10}; leaves ${r-15},${r-5},${r+5},${r+15}`
  if (id==='bst-delete') {
    if (concept===0) return q(`${shape}. Root ${r} delete karne par inorder successor?`,r+5,[r-5,r+10,r+15],`Right subtree ka minimum ${r+5}.`,i,'GATE')
    if (concept===1) return q(`${shape}. Leaf ${r-15} delete: parent ka kaunsa link None?`,`${r-10}.left`,[`${r-10}.right`,`${r}.left`,`${r+10}.left`],`Leaf ${r-15} parent ${r-10} ka left child hai.`,i)
    if (concept===2) return q(`${shape}. Two-child root deletion mein successor old location se?`,'Delete karna hoga',['Rakhna hoga','Root right ko None','Poora left subtree delete'],`Value copy ke baad duplicate successor old node remove karo.`,i,'GATE')
    if (concept===3) return q(`${shape}. delete(root, ${r}) ke returned root reference ko caller kya kare?`,'root = delete(root, key)',['Ignore return','Always set root=None','Append to queue'],`Root itself change ho sakta hai; returned reference preserve karo.`,i)
    if (concept===4) return q(`${shape}. BST deletion ka path length h ho toh time?`,'O(h)',['O(1)','O(h²)','O(2^h)'],`Node search + successor descent O(h) time.`,i,'GATE')
    if (concept===5) return q(`${shape}. Pehle right leaf ${r+15} remove karo; ab ${r+10} ka only left child ${r+5} hai. ${r+10} delete par root.right kya banega?`,r+5,[r+10,r+15,r-5],`One-child deletion returns ${r+5}; waiting root call root.right mein save karta hai.`,i,'Core')
    if (concept===6) return q(`${shape}. Leaf ${r-15} ka separate variable old_leaf ko refer karta hai. Tree se delete ke baad old_leaf memory mein dikh sakta hai?`,'Haan, variable abhi object ko reference karta hai',['Nahi, object turant destroy hota hai','Sirf BST invalid ho toh','Sirf root delete ho toh'],`Tree root se unreachable hona aur Python object ka existing reference alag hain.`,i,'Core')
    if (concept===7) return q(`${shape}. Root ${r} ka inorder predecessor?`,r-5,[r+5,r-10,r-15],`Left subtree ka maximum ${r-5}.`,i,'GATE')
    if (concept===8) return q(`BST root ${r}; successor node ${r+5} ke only right child ${r+7} hai. Successor ko old location se delete karne par parent link kisko point karega?`,r+7,[r+5,r+10,r],`Deleted successor ka right child return hota hai aur parent us link ko save karta hai.`,i,'GATE')
    return q(`${shape}. Missing key ${r+7} ko delete karne par returned root?`,'Same root reference',['None','New root object','Entire right subtree'],`None base case se unwind hoke existing links preserve hote hain; root unchanged.`,i,'Core')
  }
  if (id==='bst-insert') {
    const key=r-7
    if(concept===0)return q(`${shape}. Insert ${key}: final parent?`,r-5,[r-10,r,r-15],`${key}<${r}, >${r-10}, <${r-5}; ${r-5}.left.`,i)
    if(concept===1)return q(`${shape}. Insert ${key}: which child link is initially None?`,`${r-5}.left`,[`${r-5}.right`,`${r-10}.left`,`${r}.right`],`Trace ${r}→${r-10}→${r-5}→left None.`,i)
    if(concept===2)return q(`${shape}. Root ${r} par insert(${key}) ka first branch?`,'Left',['Right','Stay at root','Both'],`${key}<${r}, so left.`,i)
    if(concept===3)return q(`${shape}. Leaf parent ${r-5} ke left None mein ${key} insert hua. Is recursive call ka return root kaun sa object?`,r-5,[key,r,r-10],`New node caller ko return hota hai; waiting ${r-5} call updated link save karke apna root ${r-5} return karta hai.`,i,'Core')
    if(concept===4)return q(`Empty BST mein insert(None, ${key}) kya return karega?`,`New TreeNode(${key})`,['None','Old root','Only True'],`Base case naya node return karta hai; caller ko new root save karna hai.`,i,'Foundation')
    if(concept===5)return q(`${shape}. Existing key ${r-5} ko same value se insert karein; is notebook ki duplicate policy?`,'Ignore; same root return',['Right mein duplicate banao','Left mein duplicate banao','Root delete karo'],`Neither < nor > branch runs.`,i,'Core')
    if(concept===6)return q(`${shape}. Non-base insert call se return root hata dein; parent child = insert(...) ka result?`,'None (implicit return)',['Original child root','New leaf','True'],`Python function without explicit return gives None; parent link disconnect ho sakta hai.`,i,'GATE')
    if(concept===7)return q(`${shape}. ${r-5}.left = insert(None, ${key}) mein left-hand side ka role?`,'Returned new node reference save karna',['New object ki copy banana','Current root delete karna','Comparison karna'],`Right call new node deta hai; assignment parent link jodti hai.`,i,'Core')
    if(concept===8)return q(`${shape}. A.left = B statement mein B object ka kya store hota hai?`,'B ka reference',['B ki independent copy','Sirf B.val number','B ka memory erase'],`Python object link/reference store karta hai, node copy nahi.`,i,'Foundation')
    return q(`${shape}. Insert path height h ho toh time aur recursive stack?`,'O(h) time, O(h) stack',['O(1), O(1)','O(n²), O(1)','O(log h), O(n)'],`Har call one level descend karta hai; h calls.`,i,'GATE')
  }
  if(id==='bst-search') {
    const target=r+5
    if(concept===0)return q(`${shape}. Search ${target} path?`,`${r} → ${r+10} → ${target}`,[`${r} → ${r-10} → ${target}`,`${r} → ${target}`,`${r} → ${r+10} → ${r+15}`],`Compare ${target}>${r}; then ${target}<${r+10}.`,i)
    if(concept===1)return q(`${shape}. Search ${r-15}: root par kaunsi branch?`,'Left',['Right','Both','No branch'],`${r-15}<${r}.`,i)
    if(concept===2)return q(`${shape}. Search missing ${r+7}: ${r}→${r+10}→${r+5} ke baad?`,'Right None; return None',['Left leaf milta hai','Root return','Entire tree scan'],`${r+7}>${r+5}, right child None, so base case returns None.`,i,'Core')
    if(concept===3)return q(`${shape}. search(None, ${r+7}) ka return?`,'None',['True','New node','Current root'],`Base case None.val access se pehle return karta hai.`,i,'Foundation')
    if(concept===4)return q(`${shape}. Found node ${target} par search kya return karta hai?`,'Stored node object reference',['Only True','Only index','Node ki new copy'],`Code returns node itself, so caller .val read kar sakta hai.`,i,'Core')
    if(concept===5)return q(`${shape}. Agar same shape ordinary binary tree ho (BST rule absent), comparison se half discard kar sakte?`,'Nahi',['Haan, always','Sirf root par','Sirf leaf par'],`Without BST ordering, either subtree may contain target.`,i,'GATE')
    if(concept===6)return q(`${shape}. Recursive BST search path height h: time?`,'O(h)',['O(1)','O(h²)','O(2^h)'],`Only one root-to-leaf path followed.`,i,'GATE')
    if(concept===7)return q(`${shape}. Balanced BST of n nodes mein search height approximately?`,'O(log n)',['O(1)','O(n)','O(n²)'],`Balanced branching keeps logarithmic height.`,i,'GATE')
    if(concept===8)return q(`${shape}. Skewed BST of n nodes mein worst search?`,'O(n)',['O(1)','O(log n)','O(n log n)'],`Chain may visit n nodes.`,i,'GATE')
    return q(`${shape}. Search ${target} mein equal comparison ke baad next action?`,'Return that node',['Explore both subtrees','Return None','Create duplicate'],`Match found; current node reference unwinds to caller.`,i,'Foundation')
  }
  if(id==='bst-setup' && mode===0)return q(`${shape}. ${r+10}.left value?`,r+5,[r-5,r+15,r-15],`Right child ${r+10} ka left leaf ${r+5}.`,i)
  if(mode===0)return q(`${shape}. Inorder output?`,list(vals),[list([...vals].reverse()),`${r} → ${r-10} → ${r+10}`,`${r-15} → ${r} → ${r+15}`],`BST inorder sorted ascending: ${list(vals)}.`,i,'Core')
  if(mode===1)return q(`${shape}. Search ${r+5} par first comparison ${r+5} vs ${r}: next branch?`,'Right',['Left','Both','Stop'],`${r+5}>${r}.`,i)
  if(mode===2)return q(`${shape}. Third smallest value?`,vals[2],[vals[1],vals[3],vals[4]],`Inorder ${list(vals)}, third ${vals[2]}.`,i,'Core')
  if(mode===3)return q(`${shape}. Root ${r} ke right subtree ka minimum?`,r+5,[r+10,r+15,r-5],`Right subtree mein leftmost value ${r+5}.`,i,'GATE')
  return q(`${shape}. Agar BST skewed ho jaye toh search worst time?`,'O(n)',['O(1)','O(log n)','O(n log n)'],`Skewed BST ek n-length chain ban sakta hai.`,i,'GATE')
}

const numQ = (prompt, answer, why, i, difficulty = 'Core') => q(prompt, answer, [answer+1,answer+2,answer-1], why, i, difficulty)
function naryQuestion(id, i) {
  const r=100+10*i
  const [a,b,c,x,y,z,w]=[r+10,r+20,r+30,r+40,r+50,r+60,r+70]
  const pre=[r,a,x,y,b,z,c,w]
  const post=[x,y,a,z,b,w,c,r]
  const level=[r,a,b,c,x,y,z,w]
  const shape=`N-ary root ${r}; children [${a},${b},${c}]; ${a} children [${x},${y}]; ${b} child [${z}]; ${c} child [${w}]`
  const order=id==='nary-post'?'post':id==='nary-level'?'level':'pre'
  const all={pre,post,level}
  const mode=i%5
  if(id==='nary-max') {
    if(mode===0)return numQ(`${shape}. Maximum value?`,w,`All nodes compare; ${w} largest.`,i)
    if(mode===1)return numQ(`${shape}. ${a} subtree max?`,y,`Children ${x},${y}; largest ${y}.`,i)
  }
  if(id==='nary-height') {
    if(mode===0)return numQ(`${shape}. Height in NODES/levels?`,3,'Root → child → leaf has three nodes.',i)
    if(mode===1)return numQ(`${shape}. Height in EDGES?`,2,'Same longest path has two edges.',i)
  }
  if(mode===0)return q(`${shape}. ${order} order?`,list(all[order]),[...Object.keys(all).filter(x=>x!==order).map(x=>list(all[x])),list([...all[order]].reverse())],`Each child list scanned in order; ${order} = ${list(all[order])}.`,i,'Core')
  if(mode===1)return q(`${shape}. ${order} third visited value?`,all[order][2],all[order].filter((_,j)=>j!==2).slice(0,3),`${order}: ${list(all[order])}.`,i)
  if(mode===2)return numQ(`${shape}. Root ke direct children kitne?`,3,'Root children list has three entries; grandchildren do not count.',i,'Foundation')
  if(mode===3)return numQ(`${shape}. Total leaf nodes?`,4,`${x},${y},${z},${w} have no children.`,i)
  return q(`${shape}. ${order==='level'?'Level order':'Recursive '+order} traversal time for N nodes?`,'O(N)',['O(1)','O(log N)','O(N²)'],'Each node is visited once.',i,'GATE')
}
function problemQuestion(id, i) {
  const n=10+i
  const mode=i%5
  if(id==='tree-dp') {
    if(mode===0)return q(`Node ${n} has left subtree count ${n+1} and right count ${n+2}. count(node)?`,2*n+4,[2*n+3,2*n+5,2*n+2],'1 + left + right.',i)
    if(mode===1)return q(`Parent ${n} ka sum: left ${n+1}, right ${n+2}. Formula?`,`${n} + ${n+1} + ${n+2}`,[`${n+1} + ${n+2}`,`${n} + max(${n+1}, ${n+2})`,`${n} - ${n+1} - ${n+2}`],'Node value plus both child sums.',i)
    if(mode===2)return q(`Node ${n} ka depth in nodes: child depths ${n+1}, ${n+2}. Return?`,n+3,[n+2,n+4,2*n+4],'1+max(child depths).',i)
    if(mode===3)return q(`N=${n} nodes wale tree mein child answers parent mein combine karne wala DFS order?`,'Postorder',['Preorder','Level order','Only inorder'],'Children must return first.',i)
    return q(`Tree mein each node once DFS, N=${n} nodes. Time?`,'O(N)',['O(1)','O(log N)','O(N²)'],'One visit per node.',i,'GATE')
  }
  if(id==='max-depth') {
    const h=2+Math.floor(i/10)
    const concept=i%10
    if(concept===0)return numQ(`Longest root→leaf path has ${h} edges. height_in_nodes(root) return?`,h+1,'Nonempty path mein nodes = edges + 1.',i)
    if(concept===1)return numQ(`height_in_nodes(root) returns ${h+1} nodes. Tree edge-height?`,h,'Nonempty tree: edges = nodes − 1.',i)
    if(concept===2)return q('Root ki depth_in_nodes(root, root.value) kya hogi?','1',['0','−1','Tree height'],'Node-counting convention mein root khud path ka one node hai; 0 edges.',i,'Foundation')
    if(concept===3)return q('Path root 10 → 20 → target 50 hai. depth_in_nodes(root, 50) kya return karega?','3',['2','1','0'],'Target 50 returns 1; 20 adds 1; 10 adds 1 = 3 nodes.',i,'Foundation')
    if(concept===4)return q('Leaf 60 ki height_in_nodes(leaf) kya return karegi?','1',['0','2','−1'],'Leaf counts itself: 1 node, 0 edges.',i,'Foundation')
    if(concept===5)return numQ(`Left child height ${h} nodes, right child height ${h+2} nodes. Parent height in nodes?`,h+3,'1 + max(left, right), not sum.',i)
    if(concept===6)return q('depth_in_nodes(root, missing_target) ka result agar target absent hai?','0',['−1','1','Tree height'],'Both subtree calls return 0; 0 is not-found sentinel, not a valid found depth.',i)
    if(concept===7){const nodeHeight=2+i%5;return numQ(`Binary tree node-height H=${nodeHeight}: maximum possible nodes?`,2**nodeHeight-1,'All levels filled: 2^H−1.',i,'GATE')}
    if(concept===8)return numQ(`Binary tree node-height H=${h}: minimum possible nodes?`,h,'One chain with H nodes reaches that height.',i,'GATE')
    return q(`General binary tree mein absent target depth search karne par N=${n} nodes ke liye worst time?`,'O(N)',['O(1)','O(log N)','O(N²)'],'No BST ordering; worst case every node inspect karna padta hai.',i,'GATE')
  }
  if(id==='count-nodes') {
    if(mode===0)return numQ(`Node ${n} ke left subtree ${n+1} nodes, right ${n+2}. Total?`,2*n+4,'Current 1 + left + right.',i)
    if(mode===1)return numQ(`Root ${n} with two leaf children. count_nodes(root)?`,3,'Root plus two leaves.',i)
    if(mode===2)return numQ(`N=${n} nodes wale tree ke missing child par count_nodes(None)?`,0,'No node at None.',i)
    if(mode===3)return numQ(`Full binary tree internal I=${n}: total nodes?`,2*n+1,'Full tree N=2I+1.',i,'GATE')
    return q(`count_nodes on N=${n} arbitrary-tree nodes: time?`,'O(N)',['O(1)','O(log N)','O(N²)'],'Each node once.',i)
  }
  if(id==='sum-nodes') {
    if(mode===0)return numQ(`Node value ${n}; left sum ${n+1}; right sum ${n+2}. tree_sum(node)?`,3*n+3,'node.val + left_sum + right_sum.',i)
    if(mode===1)return numQ(`Tree root ${n}, two leaves ${n+1}, ${n+2}. Sum?`,3*n+3,'All three values added.',i)
    if(mode===2)return numQ(`Root value ${n} ke missing child par tree_sum(None)?`,0,'Empty subtree contributes zero.',i)
    if(mode===3)return numQ(`Leaf value ${n}. tree_sum(leaf)?`,n,'Leaf children both None return zero.',i)
    return q(`tree_sum on N=${n} nodes time?`,'O(N)',['O(1)','O(log N)','O(N²)'],'Each node contributes once.',i)
  }
  if(id==='validate-bst') {
    const root=n+20,left=n+10,invalid=n+25
    if(mode===0)return q(`Root ${root}; left ${left}; ${left}.right=${invalid}. Valid strict BST?`,'No',['Yes','Only if balanced','Only if full'],`${invalid} left subtree mein root ${root} se bada hai.`,i,'GATE')
    if(mode===1)return q(`Root ${root} ke left subtree mein node ka upper bound?`,root,[left,invalid,'+∞'],`Every left descendant must remain <${root}.`,i)
    if(mode===2)return q(`Strict BST mein duplicate value ${root} allowed?`,'No',['Yes, always','Only root par','Only leaf par'],'Strict low < value < high rejects equal.',i)
    if(mode===3)return q(`Root ${root} wale BST ko validate karne ke liye direct parent comparison alone enough?`,'No',['Yes','Only at leaves','Only for balanced trees'],'Ancestor bounds also apply.',i,'GATE')
    return q(`Range-check validator N=${n} nodes visit karta hai. Time?`,'O(N)',['O(1)','O(log N)','O(N²)'],'Worst all nodes checked.',i)
  }
  if(id==='lca') {
    const root=n+20,left=n+10,right=n+30
    if(mode===0)return numQ(`BST root ${root}, nodes p=${left} (left), q=${right} (right). LCA?`,root,'Paths split at root.',i)
    if(mode===1)return numQ(`BST: ${left} ancestor of ${left-2} and ${left+2}. LCA?`,left,'One queried node can itself be LCA.',i)
    if(mode===2)return q(`BST root ${root}; p=${left-3}, q=${left+3}. First direction?`,'Left',['Right','Both','Stop at root'],`Both values <${root}.`,i)
    if(mode===3)return q(`Root ${root} wale BST par iterative LCA code aux space?`,'O(1)',['O(h)','O(n)','O(n²)'],'Only pointer root moves.',i,'GATE')
    return q(`BST height h=${n}: LCA worst time?`,'O(h)',['O(1)','O(h²)','O(2^h)'],'One branch each step.',i)
  }
  if(id==='kth') {
    const vals=[n,n+3,n+6,n+9,n+12]
    if(mode===0)return numQ(`BST inorder values ${vals.join(', ')}. 3rd smallest?`,vals[2],'Inorder ascending, 1-based k=3.',i)
    if(mode===1)return numQ(`BST inorder values ${vals.join(', ')}. 5th smallest?`,vals[4],'Last of five ascending values.',i)
    if(mode===2)return q(`BST inorder values ${vals.join(', ')}. Recursive inorder pehle kis subtree mein jata hai?`,'Left subtree',['Right subtree','Only root','Level order'],'Code mein inorder(node.left) append se pehle call hota hai.',i)
    if(mode===3)return q(`Valid k ka range for N=${n} nodes?`,`1 ≤ k ≤ ${n}`,[`0 ≤ k < ${n}`,`k > ${n}`,`k = 0 only`],'Rank is 1-based.',i)
    return q(`Kth-smallest code ${n} nodes ki values list banata hai. List ki auxiliary space?`,'O(n)',['O(1)','O(log n)','O(n²)'],'Har node ki value list mein store hoti hai; recursion stack additionally O(h).',i,'GATE')
  }
  if(id==='max-path') {
    const right=n+20, left=n+5, leaf1=n+10, leaf2=n+8
    if(mode===0)return numQ(`Tree root -100, right child ${right} with leaf children ${leaf1},${leaf2}; left child ${left}. Max path sum?`,right+leaf1+leaf2,'Best path joins both positive grandchildren through right child.',i,'GATE')
    if(mode===1)return numQ(`Node ${right}, left_gain ${leaf1}, right_gain ${leaf2}. Global candidate?`,right+leaf1+leaf2,'Global path may use both sides.',i)
    if(mode===2)return numQ(`Node ${right}, left_gain ${leaf1}, right_gain ${leaf2}. Return upward?`,right+leaf1,'Upward path can take only stronger one side.',i,'GATE')
    if(mode===3)return numQ(`Negative child gain -${n} ko max(gain,0) ke baad value?`,0,'Negative branch skip.',i)
    return q(`Example all-negative values -${n}, -${n+1}, -${n+2}: max_sum initial value?`,'−∞',['0','1','root.val always'],'Zero would incorrectly beat all-negative path.',i)
  }
  if(id==='left-leaves') {
    const r=n,left=n+3,right=n+5,rightLeft=n+7,rightRight=n+9
    if(mode===0)return numQ(`Root ${r}; left leaf ${left}; right ${right} has left leaf ${rightLeft}, right leaf ${rightRight}. Sum of LEFT leaves?`,left+rightLeft,'Only left leaf children '+left+' and '+rightLeft+'.',i)
    if(mode===1)return numQ(`Single-node tree root=${r}. Sum of left leaves?`,0,'Root is not a left child.',i)
    if(mode===2)return numQ(`Right child ${right} is a leaf. Its left-leaf contribution?`,0,'Right leaf not counted.',i)
    if(mode===3)return q(`Value ${n} wala node left child hai but uska apna child hai. Count as left leaf?`,'No',['Yes','Only root','Only in BST'],'Must be both left and leaf.',i)
    return q(`sum_left_leaves on N=${n} nodes time?`,'O(N)',['O(1)','O(log N)','O(N²)'],'Every node checked.',i)
  }
  return naryQuestion('nary-max',i)
}

const bstIds = new Set(['bst','bst-setup','bst-insert','bst-search','bst-delete'])
const naryIds = new Set(['nary','nary-setup','nary-pre','nary-post','nary-level','nary-max','nary-height'])
const problemIds = new Set(['tree-dp','max-depth','count-nodes','sum-nodes','validate-bst','lca','kth','max-path','left-leaves'])
function makeQuestion(id, i) {
  if (id in traversalType) return traversalQuestion(id,i)
  if (bstIds.has(id)) return bstQuestion(id,i)
  if (naryIds.has(id)) return naryQuestion(id,i)
  if (problemIds.has(id)) return problemQuestion(id,i)
  if (id==='context') {
    const n=11+i
    const topics=[
      [`BST ${n} values ascending chahiye. Traversal?`,'Inorder',['Preorder','Postorder','Level order'],'BST inorder sorted values deta hai.'],
      [`Tree ${n} nodes ke levels left-to-right dekhne hain. Data structure?`,'Queue',['Stack','Heap','Set'],'Level order uses FIFO queue.'],
      [`Tree ${n} nodes ke parent answer ke liye child answers pehle chahiye. Order?`,'Postorder',['Preorder','Level order','Only inorder'],'Children-first is postorder.'],
      [`BST ${n} nodes skewed ho. Search worst time?`,'O(n)',['O(1)','O(log n)','O(n log n)'],'Skewed tree is a chain.'],
      [`Tree ${n} nodes par edge-height vs node-height relation?`,'Nodes = edges + 1',['Nodes = edges','Edges = nodes + 1','Nodes = 2 × edges'],'For nonempty root-to-leaf path.']
    ]
    const [prompt,answer,wrong,why]=topics[i%5]
    return q(prompt,answer,wrong,why,i,'GATE')
  }
  return basicsQuestion(id,i)
}

export const module12Topics = lectureData.map(([number,title,,id]) => ({
  id,
  label:`${number} · ${title}`,
  questions:Array.from({length:50},(_,i)=>makeQuestion(id,i))
}))
export const module12QuestionCount = module12Topics.reduce((total,topic)=>total+topic.questions.length,0)
