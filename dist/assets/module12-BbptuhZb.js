import"./style-ZtoOge9A.js";var e=e=>String(e).replaceAll(`&`,`&amp;`).replaceAll(`<`,`&lt;`).replaceAll(`>`,`&gt;`),t=(t,n)=>`<div class="codebox green"><div><span>${t}</span><button type="button">Copy</button></div><pre><code>${e(n)}</code></pre></div>`,n=(e,t,n,r,i,a)=>`<section class="chapter searchable" id="${t}" data-title="${e} · ${n}"><div class="chapter-head"><div class="chapter-no"><span>${e}</span><small>${n.toUpperCase()}</small></div><div><h2>${r}</h2><p>${i}</p></div></div>${a}</section>`,r=(e,t)=>`<div class="table-wrap"><table><thead><tr>${e.map(e=>`<th>${e}</th>`).join(``)}</tr></thead><tbody>${t.map(e=>`<tr>${e.map(e=>`<td>${e}</td>`).join(``)}</tr>`).join(``)}</tbody></table></div>`,i=(t,n)=>{let r=n.split(`
`),i=[],a=[];r.forEach((e,t)=>{if(/^[\s/\\|]+$/.test(e)&&/[/\\|]/.test(e))a.push({lineIndex:t,connectors:[...e.matchAll(/[/\\|]/g)].map(e=>({type:e[0],x:e.index}))});else{let n=[...e.matchAll(/\S+/g)].map((e,t)=>({id:`${i.length}-${t}`,value:e[0],x:e.index+e[0].length/2,level:i.length}));n.length&&i.push({lineIndex:t,nodes:n})}});let o=i.flatMap(e=>e.nodes),s=[];for(let e=0;e<i.length-1;e++){let t=a.find(t=>t.lineIndex>i[e].lineIndex&&t.lineIndex<i[e+1].lineIndex);if(!t)break;for(let n of t.connectors){let t=i[e].nodes.filter(e=>n.type===`/`?e.x>=n.x-1:n.type!==`\\`||e.x<=n.x+1),r=i[e+1].nodes.filter(e=>n.type===`/`?e.x<=n.x+1:n.type!==`\\`||e.x>=n.x-1),a=e=>e.reduce((e,t)=>!e||Math.abs(t.x-n.x)<Math.abs(e.x-n.x)?t:e,null),o=a(t),c=a(r);o&&c&&s.push([o,c])}}if(!o.length||s.length!==o.length-1||new Set(s.map(([,e])=>e.id)).size!==o.length-1)return`<div class="tree-ascii"><span>${e(t)}</span><pre>${e(n)}</pre></div>`;let c=Math.min(...o.map(e=>e.x)),l=(Math.max(...o.map(e=>e.x))-c)*28,u=Math.max(440,Math.ceil(l+140)),d=i.length*104+34,f=e=>({x:Math.round((u-l)/2+(e.x-c)*28),y:e.level*104+56}),p=s.map(([e,t])=>{let n=f(e),r=f(t);return`<line x1="${n.x}" y1="${n.y+25}" x2="${r.x}" y2="${r.y-25}"/>`}).join(``),m=o.map(t=>{let{x:n,y:r}=f(t);return`<g class="tree-diagram-node ${t.level===0?`root`:s.some(([e])=>e.id===t.id)?`internal`:`leaf`}"><circle cx="${n}" cy="${r}" r="25"/><text x="${n}" y="${r}" dominant-baseline="central" text-anchor="middle">${e(t.value)}</text></g>`}).join(``),h=i.map((e,t)=>`<text class="tree-diagram-level" x="12" y="${t*104+60}">L${t+1}</text>`).join(``);return`<figure class="tree-diagram${o.length>7?` is-wide`:``}"><figcaption>${e(t)}</figcaption><div class="tree-diagram-scroll"><svg viewBox="0 0 ${u} ${d}" role="img" aria-label="${e(t)}: ${e(o.map(e=>e.value).join(`, `))}"><g class="tree-diagram-edges">${p}</g>${h}${m}</svg></div></figure>`},a=(e,t,n)=>`<div class="hash-foundation"><span>${e}</span><h3>${t}</h3><p>${n}</p></div>`,o=(...e)=>`<div class="hash-step-list">${e.map(e=>`<p>${e}</p>`).join(``)}</div>`,s=e=>`<div class="danger"><b>GATE trap</b><p>${e}</p></div>`,c=(t,n)=>{let r={A:[350,69],B:[205,163],C:[495,163],D:[115,265],E:[295,265],F:[435,265]},i=[[`A`,`B`],[`A`,`C`],[`B`,`D`],[`B`,`E`],[`C`,`F`]],a=Object.fromEntries(n.map((e,t)=>[e,t+1])),o=e=>100+e*100,s=i.map(([e,t])=>`<line class="tree-edge" x1="${r[e][0]}" y1="${r[e][1]+24}" x2="${r[t][0]}" y2="${r[t][1]-24}"/>`).join(``),c=n.map((e,n)=>{let[i,a]=r[e],s=e===`A`&&n===0?`M 326 69 C 65 75 50 215 100 340`:e===`A`&&n===5?`M 374 69 C 635 75 650 215 600 340`:`M ${i} ${a+25} Q ${i} 318 ${o(n)} 340`;return`<path class="drop-path${n===0?` is-active`:``}" data-plate-step="${n+1}" d="${s}" marker-end="url(#drop-arrow-${t.toLowerCase()})"/>`}).join(``),l=Object.entries(r).map(([e,[t,n]])=>`<g class="tree-node${a[e]===1?` is-active`:``}" data-plate-step="${a[e]}"><circle cx="${t}" cy="${n}" r="24"/><text x="${t}" y="${n+1}" text-anchor="middle" dominant-baseline="central">${e}</text><circle class="order-badge" cx="${t+26}" cy="${n-23}" r="13"/><text class="order-number" x="${t+26}" y="${n-22}" text-anchor="middle" dominant-baseline="central">${a[e]}</text></g>`).join(``),u=n.map((e,t)=>{let n=o(t);return`<g class="plate-slot${t===0?` is-active`:``}" data-plate-step="${t+1}"><rect x="${n-32}" y="357" width="64" height="54" rx="10"/><text class="slot-rank" x="${n}" y="371" text-anchor="middle">${t+1}</text><text class="slot-letter" x="${n}" y="397" text-anchor="middle">${e}</text></g>`}).join(``),d=n.map((e,t)=>`<button type="button" data-plate-step="${t+1}" aria-pressed="${t===0}">${t+1} · ${e}</button>`).join(``);return`<figure class="traversal-plate"><figcaption>${e(t)}: tree ke nodes kis order mein plate par aate hain?</figcaption><p>Step select karo → us node ka lecture-style arrow plate ke slot tak dekho. Ek waqt par ek arrow, isliye lines cross nahi karti.</p><div class="traversal-plate-controls" role="group" aria-label="${e(t)} visit step">${d}</div><div class="traversal-plate-scroll"><svg viewBox="0 0 700 430" role="img" aria-label="${e(t)} traversal: ${e(n.join(` `))}"><defs><marker id="drop-arrow-${t.toLowerCase()}" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path class="drop-arrow-head" d="M0 0L10 5L0 10z"/></marker></defs><text class="plate-hint" x="350" y="28" text-anchor="middle">Orange badge = visit number</text><rect class="plate-base" x="47" y="345" width="606" height="75" rx="16"/>${s}${c}${l}${u}</svg></div><p><strong>Output: ${e(n.join(` → `))}</strong></p></figure>`},l=[[`12.1`,`Introduction`,`Tree vs list, root and children`,`intro`],[`12.2`,`Trees Terminology`,`Root, parent, child, leaf, depth, height and level`,`terminology`],[`12.3`,`Properties of a Tree`,`One root, parent links, no cycles, connected, N−1 edges`,`properties`],[`12.4`,`Tree Traversals`,`Visit every node in a defined order`,`traversals`],[`12.4.0`,`Creating a Tree`,`TreeNode and reference links`,`create-tree`],[`12.4.1`,`Preorder Traversal (theory)`,`Root, left, right`,`preorder-theory`],[`12.4.2`,`Preorder Traversal (code)`,`Recursive Python trace`,`preorder-code`],[`12.4.3`,`Inorder Traversal`,`Left, root, right`,`inorder`],[`12.4.4`,`Postorder Traversal`,`Left, right, root`,`postorder`],[`12.4.5`,`Level Order Traversal`,`Queue-based level-by-level visit`,`level-order`],[`12.4.6`,`Choice of Traversal`,`Pick order from dependency`,`choice`],[`12.5`,`BST`,`Ordering invariant`,`bst`],[`12.5.1`,`BST Initial Setup`,`Build the lecture tree`,`bst-setup`],[`12.5.2`,`Insertion in BST`,`Compare and descend`,`bst-insert`],[`12.5.3`,`Searching in BST`,`One path, not full scan`,`bst-search`],[`12.5.4`,`Deletion in BST`,`Zero, one or two children`,`bst-delete`],[`12.6`,`N-ary Tree`,`A node may have many children`,`nary`],[`12.6.1`,`Initial Setup for N-ary Tree`,`children list`,`nary-setup`],[`12.6.2`,`Preorder on N-ary Tree`,`Node, then children`,`nary-pre`],[`12.6.3`,`Postorder on N-ary Tree`,`Children, then node`,`nary-post`],[`12.6.4`,`Level Order on N-ary Tree`,`Queue all children`,`nary-level`],[`12.7`,`DP on Trees`,`Child answers combine at parent`,`tree-dp`],[`12.8.1`,`Calculate Depth of a Tree`,`Recursive maximum depth`,`max-depth`],[`12.8.2`,`Count Nodes in a Tree`,`1 + left + right`,`count-nodes`],[`12.8.3`,`Sum of Nodes in Tree`,`value + left + right`,`sum-nodes`],[`12.8.4`,`Validate BST`,`Ancestor bounds`,`validate-bst`],[`12.8.5`,`Lowest Common Ancestor`,`BST split point`,`lca`],[`12.8.6`,`Kth Smallest in BST`,`Inorder rank`,`kth`],[`12.8.7`,`Maximum Value in N-ary Tree`,`Compare child maxima`,`nary-max`],[`12.8.8`,`Height of N-ary Tree`,`Max child height`,`nary-height`],[`12.8.9`,`Maximum Path Sum`,`Two gains vs one return`,`max-path`],[`12.8.10`,`Sum of Left Leaf Nodes`,`Left AND leaf`,`left-leaves`],[`12.9`,`DS Context`,`Which tree tool fits?`,`context`]],u=`        A
       / \\
      B   C
     / \\  /
    D   E F`,d=`        40
       /  \\
     30    50
    /  \\  /  \\
  25   35 45  60`,f=`          10
       /   |   \\
     20    30   40
   / | \\   |   / \\
 50 60 70  80 90 100`,p=[n(`12.1`,`intro`,`Introduction`,`Tree: one root se branches`,`Linked list ek chain thi; tree mein ek node se multiple branches nikal sakti hain.`,`
  ${a(`ZERO START`,`Node kya hai?`,`Node ek object hai jisme data aur child references hote hain. Binary tree node ke <code>left</code> aur <code>right</code> references hain. <code>None</code> ka matlab us direction mein child nahi. Root ko point karne wala variable poore reachable tree ka entry point hai.`)}
  ${i(`Pehle isi six-node example ko pakdo`,u)}
  ${o(`<b>Reference reading:</b> <code>A.left</code> B node ko point karta hai; <code>B.right</code> E node ko. <code>F.left is None</code> because F ka left child nahi.`,`<b>Unique path:</b> A se E tak path A → B → E hai. Tree mein root se kisi node tak exactly one parent-child path hota hai; cycle nahi hoti.`)}
  ${s(`Picture ka left/right screen placement aur actual <code>node.left</code>/<code>node.right</code> references same hone chahiye. Node labels sorted hon zaroori nahi—sirf BST mein ordering rule aata hai.`)}
`),n(`12.2`,`terminology`,`Trees Terminology`,`Har word ko A–F par point karke samjho`,`Lecture ke root, parent, child, leaf, depth, height, level aur subtree—plus useful related terms.`,`
  ${i(`Reference tree`,u)}
  ${r([`Term`,`Lecture meaning`,`A–F example`],[[`Root`,`Topmost node; is tree ke andar parent nahi`,`A`],[`Parent`,`Immediate predecessor: ek edge upar wala node`,`B is parent of D and E`],[`Child`,`Immediate successor: ek edge neeche wala node`,`D and E are children of B`],[`Leaf`,`Node with no children`,`D, E, F`],[`Depth`,`Root se node tak distance, edges count`,`A: 0; B/C: 1; D/E/F: 2`],[`Height`,`Node se deepest leaf tak longest path, edges count`,`D/E/F: 0; B/C: 1; A: 2`],[`Level`,`Depth + 1 (lecture convention)`,`A: 1; B/C: 2; D/E/F: 3`],[`Subtree`,`Kisi node se bana tree: node + all descendants`,`B subtree: B,D,E`],[`Siblings`,`Same parent`,`D and E`],[`Internal node`,`At least one child`,`A, B, C`],[`Ancestor / descendant`,`Parent chain upar / child chain neeche`,`A and B are ancestors of E; E is their descendant`]])}
  ${o(`<b>Depth vs level:</b> A root ki depth 0 but level 1. E tak A→B→E mein 2 edges hain, so E ki depth 2 aur level 3.`,`<b>Height:</b> E leaf ki height 0; B se deepest leaf tak 1 edge; A se deepest leaf tak 2 edges. Course code <code>max_depth</code> nodes count karta hai toh A ka result 3; edges wali height = 3−1 = 2.`)}
  ${s(`Depth aur height alag directions mein count karte hain. Question “height in edges” vs “height in nodes/levels” specify kare toh wahi convention use karo.`)}
`),n(`12.3`,`properties`,`Properties of a Tree`,`Pehle tree ki structure pakdo, phir formulas`,`Lecture ke five core rules: one root, parent–child relationship, no cycles, connectedness, aur N−1 edges.`,`
  ${i(`Har rule isi six-node rooted tree par dekho`,u)}
  ${r([`Lecture property`,`Exactly kya matlab?`,`A–F example`],[[`Exactly one root`,`Starting node A ka parent nahi; tree ke sab nodes A se reachable hain`,`A only`],[`Parent–child relationship`,`Root ko chhodkar har node ka exactly one parent. Ek node ke zero ya more children ho sakte hain`,`B ka parent A; B ke children D,E; D ke zero children`],[`No cycles`,`Child links follow karte hue kisi already visited ancestor par wapas nahi pahunch sakte`,`A→B→D ke baad D→A edge nahi ho sakti`],[`Connected structure`,`Root se har node tak path available hai`,`A→C→F se F reachable hai`],[`Edges count rule`,`N nodes wale nonempty tree mein exactly N−1 edges`,`6 nodes; A–B, A–C, B–D, B–E, C–F = 5 edges`]])}
  ${o(`<b>Why N−1 edges?</b> A root ko parent edge nahi chahiye. Baaki 5 nodes B,C,D,E,F mein har ek ko exactly one incoming parent edge chahiye: 0+5=5. General case 0+(N−1)=N−1.`,`<b>Disconnected test:</b> Agar G ek alag node hai aur A se G tak koi path nahi, then A–F plus G ek tree nahi, forest hai.`,`<b>Cycle test:</b> Agar D ko A se connect back kar do, A→B→D→A loop banega; structure tree nahi rahega.`)}
  ${s(`“Tree mein cycle nahi hoti” ka matlab graphs mein hamesha cycle hoti hai nahi: tree khud ek connected, acyclic graph hai. Sirf N−1 edges dekhkar tree declare mat karo—connectedness bhi check karo.`)}
`),n(`12.4`,`traversals`,`Tree Traversals`,`Har node visit karo—par kis order mein?`,`Tree non-linear hai: array ya linked list jaisa ek natural left-to-right order nahi. Traversal problem ke hisaab se systematic visit order choose karta hai.`,`
  ${a(`LECTURE START`,`Tree traversal kya hai?`,`Tree ke <b>har node ko exactly once process</b> karna. Do questions pucho: (1) sab nodes tak kaise pahunchenge? (2) unhe kis order mein process/print karenge? Isi se traversal strategy choose hoti hai.`)}
  ${i(`Har traversal isi tree par`,u)}
  ${o(`<b>First question:</b> A ko kab print karna hai—B/C se pehle, beech mein, ya dono ke baad? Isse preorder, inorder, postorder ka difference samajh aayega.`,`<b>Another option:</b> Branch ke bajaye same level ke nodes saath visit karo: A, phir B/C, phir D/E/F. Isse level order milta hai.`)}
  ${r([`Order`,`Simple rule`,`A–F output`],[[`Preorder`,`Node → left → right`,`A B D E C F`],[`Inorder`,`Left → node → right`,`D B E A F C`],[`Postorder`,`Left → right → node`,`D E B F C A`],[`Level order`,`Level-by-level, left-to-right`,`A B C D E F`]])}
  ${a(`TRY IT`,`Traversal Explorer`,`Neeche algorithm choose karke Step dabao. Highlighted node abhi visit hua hai; visited prefix aur remaining nodes separately dekho. Rule ko har subtree par dobara apply karo—sirf top root par nahi.`)}
  <div class="tree-lab" id="treeLab"><div class="tree-lab-controls"><label>Order <select id="treeOrder"><option value="pre">Preorder · N L R</option><option value="in">Inorder · L N R</option><option value="post">Postorder · L R N</option><option value="level">Level order · queue</option></select></label><button type="button" id="treePrev">← Previous</button><button type="button" id="treeNext">Step →</button><button type="button" id="treeReset">Restart</button></div><div id="treeStage"></div><p id="treeStepText" aria-live="polite"></p></div>
  ${s(`Pre/In/Post mein “visit” print/process line ki position se decide hota hai. Level order mein same depth wale nodes pehle aate hain.`)}
`),n(`12.4.0`,`create-tree`,`Creating a Tree`,`Object banao, phir references jodo`,`Lecture notebook ka exact A–F shape.`,`
  ${t(`Lecture setup · binary TreeNode`,`class TreeNode:
    def __init__(self, val):
        self.val = val
        self.left = None
        self.right = None

A = TreeNode('A')
B = TreeNode('B')
C = TreeNode('C')
D = TreeNode('D')
E = TreeNode('E')
F = TreeNode('F')

A.left = B
A.right = C
B.left = D
B.right = E
C.left = F`)}
  ${i(`After assignments`,u)}
  ${o(`<b>Before edges:</b> six separate objects hain; sabke <code>left/right=None</code>.`,`<b><code>A.left = B</code>:</b> A se B ka reference connect hua. B copy nahi hua.`,`<b><code>C.left = F</code>:</b> F A → C → F path se reachable hua. <code>A</code> root variable hai; A se saare six nodes mil sakte hain.`)}
  ${s(`Missing child <code>None</code> hai. String label <code>"A"</code> aur variable <code>A</code> alag cheezein hain.`)}
`),n(`12.4.1`,`preorder-theory`,`Preorder Traversal (theory)`,`Node ko children se PEHLE visit karo`,`N-L-R: current node, complete left subtree, complete right subtree.`,`
  ${a(`ROOT → LEFT → RIGHT`,`Preorder mein kab likhna hai?`,`Node par <b>pahunchte hi</b> uska letter output line par likho. Uske baad poora left subtree, phir poora right subtree. Ye rule A par hi nahi, B aur C par bhi dobara lagta hai.`)}
  ${c(`Preorder`,[`A`,`B`,`D`,`E`,`C`,`F`])}
  ${o(`<b>Visual trace:</b> A aur B turant plate par; D/E se B branch complete; uske baad C/F. <code>A B D E C F</code>.`)}
  ${s(`Preorder ka “root first” har recursive subtree ke root par apply hota hai. A ke baad C nahi aata; A ka left subtree pehle complete hota hai.`)}
`),n(`12.4.2`,`preorder-code`,`Preorder Traversal (code)`,`Print line recurse se pehle hai`,`Code ka order hi output order hai.`,`
  ${t(`Lecture Python · preorder`,`def preorder_traversal(node):
    if not node:
        return

    print(node.val, end=' ')
    preorder_traversal(node.left)
    preorder_traversal(node.right)

preorder_traversal(A)  # A B D E C F`)}
  ${r([`Execution`,`node points to`,`Action`],[[`preorder(A)`,`A`,`Print A; call left B`],[`preorder(B)`,`B`,`Print B; call left D`],[`preorder(D)`,`D`,`Print D; None children return`],[`resume B`,`B`,`Call right E; print E`],[`resume A`,`A`,`Call right C; print C`],[`preorder(F)`,`F`,`C.left prints F; finish`]])}
  ${o(`<b><code>if not node</code>:</b> None child mila toh return; no print.`,`<b>Time:</b> each n node once → O(n). <b>Auxiliary space:</b> recursive call stack O(h) where h is height in nodes; balanced O(log n), skewed O(n).`)}
`),n(`12.4.3`,`inorder`,`Inorder Traversal`,`Left subtree, THEN node, THEN right`,`L-N-R. BST mein sorted order milta hai; arbitrary binary tree mein nahi.`,`
  ${a(`LEFT → ROOT → RIGHT`,`Inorder mein kab likhna hai?`,`Node par pahunchkar <b>abhi mat likho</b>. Pehle uska poora left subtree likho, phir node ko output line par likho, phir right subtree. Har chhote subtree par bhi yahi rule.`)}
  ${c(`Inorder`,[`D`,`B`,`E`,`A`,`F`,`C`])}
  ${o(`<b>Visual trace:</b> A/B ko hold karo → D, B, E plate par; ab A; phir F, C. <code>D B E A F C</code>.`)}
  ${t(`Lecture Python · inorder`,`def inorder_traversal(node):
    if not node:
        return

    inorder_traversal(node.left)
    print(node.val, end=' ')
    inorder_traversal(node.right)

inorder_traversal(A)  # D B E A F C`)}
  ${s(`Inorder output D B E A F C alphabetical/sorted nahi hai because A–F example BST nahi. Sorted guarantee only when BST ordering invariant holds.`)}
`),n(`12.4.4`,`postorder`,`Postorder Traversal`,`Children ke answers pehle; parent last`,`L-R-N: subtree cleanup / bottom-up computation ka natural order.`,`
  ${a(`LEFT → RIGHT → ROOT`,`Postorder mein kab likhna hai?`,`Node par pahunchkar <b>abhi mat likho</b>. Left aur right dono subtrees complete hone do; wapas aate waqt parent ko output line par likho.`)}
  ${c(`Postorder`,[`D`,`E`,`B`,`F`,`C`,`A`])}
  ${o(`<b>Visual trace:</b> D/E plate par girte hain, phir B; F ke baad C; poore tree ke baad A last. <code>D E B F C A</code>.`)}
  ${t(`Lecture Python · postorder`,`def postorder_traversal(node):
    if not node:
        return

    postorder_traversal(node.left)
    postorder_traversal(node.right)
    print(node.val, end=' ')

postorder_traversal(A)  # D E B F C A`)}
  ${s(`Postorder mein root A last hoga. Max-depth/tree-sum jaise functions pehle child return values compute karke parent answer banate hain.`)}
`),n(`12.4.5`,`level-order`,`Level Order Traversal`,`Queue front se nikalo, children rear par add karo`,`FIFO gives increasing depth order.`,`
  ${t(`Lecture Python · typo-corrected function name`,`from collections import deque

def level_order_traversal(node):
    if not node:
        return

    q = deque([node])
    while q:
        curr = q.popleft()
        print(curr.val, end=' ')
        if curr.left:
            q.append(curr.left)
        if curr.right:
            q.append(curr.right)

level_order_traversal(A)  # A B C D E F`)}
  ${r([`Before pop: queue`,`Pop/print`,`Append children`,`After: queue`],[[`[A]`,`A`,`B,C`,`[B,C]`],[`[B,C]`,`B`,`D,E`,`[C,D,E]`],[`[C,D,E]`,`C`,`F`,`[D,E,F]`],[`[D,E,F]`,`D`,`—`,`[E,F]`],[`[E,F]`,`E`,`—`,`[F]`],[`[F]`,`F`,`—`,`[]`]])}
  ${o(`<b><code>deque([node])</code>:</b> initially root queue mein. <code>popleft()</code> front node deta hai. Children left then right rear par lagte hain.`,`<b>Time:</b> O(n). <b>Auxiliary:</b> O(w), w = maximum queue width; worst O(n). Lecture notebook function name <code>level_order_traversa</code> tha; yahan spelling <code>traversal</code> kiya hai.`)}
`),n(`12.4.6`,`choice`,`Choice of Traversal`,`Question ke dependency se traversal choose karo`,`Order memorise nahi; “parent kab process hoga?” pucho.`,`
  ${r([`Goal`,`Choose`,`Why`],[[`Parent ko children se pehle process`,`Preorder`,`Root first`],[`BST values ascending`,`Inorder`,`Left < root < right`],[`Child results se parent answer`,`Postorder`,`Children return first`],[`Distance/levels from root`,`Level order`,`FIFO queue`],[`Delete/free subtrees before parent`,`Postorder`,`Child cleanup first`]])}
  ${a(`NOW GROUP THEM`,`DFS aur BFS ka connection`,`Ab four visit orders dekh liye: preorder, inorder aur postorder ek branch/subtree complete karte hain, so ye <b>Depth First Search (DFS)</b> ke forms hain. Level order ek level complete karke next level par jaata hai, so ye <b>Breadth First Search (BFS)</b> hai.`)}
  ${r([`Category`,`Movement`,`Mechanism`,`Traversals`],[[`DFS`,`Ek branch/subtree poori, phir sibling branch`,`Recursion ya stack`,`Preorder, Inorder, Postorder`],[`BFS`,`Root se level-by-level, left-to-right`,`Queue (FIFO)`,`Level order`]])}
  ${a(`RECONSTRUCTION`,`Which traversals identify a tree?`,`Distinct labels ke ordinary binary tree mein preorder + inorder, ya postorder + inorder uniquely reconstruct karte hain. Preorder + postorder generally enough nahi. <strong>Full binary tree</strong> (every internal node has two children) mein distinct labels ke saath preorder + postorder bhi enough ho sakte hain—2024 DA Q28 ka twist.`)}
  ${s(`Inorder alone unique tree nahi banata. Full-tree assumption ko ignore karke preorder + postorder ko always insufficient bolna Q28 mein galat hoga.`)}
`),n(`12.5`,`bst`,`BST`,`Har node par LEFT smaller, RIGHT larger`,`Binary tree shape + global ordering invariant.`,`
  ${i(`Lecture tree after 35 insertion`,d)}
  ${o(`<b>Root 40:</b> left subtree ke all values 40 se smaller; right subtree ke all values 40 se larger. Sirf direct child comparison enough nahi.`,`<b>Node 30:</b> 25 left, 35 right. <b>Node 50:</b> 45 left, 60 right.`,`<b>Inorder:</b> 25, 30, 35, 40, 45, 50, 60 ascending because strict BST invariant holds.`)}
  ${r([`Shape`,`Height in edges`,`Search/insert/delete`],[[`Balanced-ish`,`O(log n)`,`O(log n)`],[`Skewed chain`,`O(n)`,`O(n)`]])}
  ${s(`BST automatically balanced nahi hota. Sorted insertion 10,20,30,40 ek right-skew chain bana sakta hai. Lecture insert code equal key ko right bhejta hai, par later strict validate-BST code duplicates reject karta hai; exam ke duplicate policy ko explicitly follow karo.`)}
`),n(`12.5.1`,`bst-setup`,`BST Initial Setup`,`Lecture tree pehle manually create hota hai`,`35 abhi commented hai; insertion lecture mein add hoga.`,`
  ${t(`Lecture setup · 35 intentionally absent`,`class TreeNode:
    def __init__(self, val):
        self.val = val
        self.left = None
        self.right = None

root = TreeNode(40)
root.left = TreeNode(30)
root.right = TreeNode(50)
root.left.left = TreeNode(25)
root.right.left = TreeNode(45)
root.right.right = TreeNode(60)
# 35 is inserted in the next lecture`)}
  ${i(`Before insert(35)`,`        40
       /  \\
     30    50
    /     /  \\
  25     45  60`)}
  ${o(`<b><code>root.left.left</code>:</b> root 40 → left 30 → left 25.`,`<b>Inorder before insertion:</b> 25, 30, 40, 45, 50, 60. Missing <code>root.left.right</code> is None; wahi 35 ka future position hai.`)}
`),n(`12.5.2`,`bst-insert`,`Insertion in BST`,`Ek comparison par ek branch choose karo`,`Lecture recursive code: smaller left, otherwise right.`,`
  ${t(`Lecture Python · insert(35)`,`def insert(root, key):
    if not root:
        return TreeNode(key)

    if key < root.val:
        root.left = insert(root.left, key)
    else:
        root.right = insert(root.right, key)

    return root

root = insert(root, 35)`)}
  ${r([`Current reference`,`Compare 35`,`Next reference`],[[`root → 40`,`35 < 40`,`40.left → 30`],[`node → 30`,`35 > 30`,`30.right → None`],[`None`,`Empty location`,`Create TreeNode(35); return it`],[`resume 30`,`Assign returned node`,`30.right → 35`],[`resume 40`,`Return root`,`root still 40`]])}
  ${i(`After insert(35)`,d)}
  ${o(`<b>Why <code>root.left = insert(...)</code>?</b> Recursive call may return a newly created subtree root; parent must save that reference.`,`<b>Complexity:</b> O(h) time and O(h) recursive stack, h path height in nodes; balanced O(log n), skewed O(n).`)}
`),n(`12.5.3`,`bst-search`,`Searching in BST`,`Wrong half safely discard karo`,`At each node key smaller? left. Larger? right.`,`
  ${t(`Lecture Python · search`,`def search(node, key):
    if not node or node.val == key:
        return node

    if key < node.val:
        return search(node.left, key)
    return search(node.right, key)

found = search(root, 35)
print(found.val if found else None)  # 35`)}
  ${r([`node.val`,`Search 35 decision`,`Next`],[[`40`,`35 < 40`,`left → 30`],[`30`,`35 > 30`,`right → 35`],[`35`,`equal`,`return node 35`]])}
  ${o(`<b>Missing key 34:</b> 40 → 30 → 35 → left None; return None. <code>found.val</code> directly access mat karo if found can be None.`,`<b>Why one path?</b> BST ordering proves discarded subtree cannot contain target. O(h) time; recursion O(h) stack.`)}
  ${s(`Binary tree without BST invariant mein smaller/larger branch discard nahi kar sakte; both subtrees scan karni pad sakti hain.`)}
`),n(`12.5.4`,`bst-delete`,`Deletion in BST`,`Case decide karo, phir parent link repair karo`,`Zero child, one child, two children—three different shapes.`,`
  ${r([`Deleted node`,`Action`,`Example`],[[`Leaf (0 child)`,`Parent link → None`,`Delete 25`],[`One child`,`Parent link → only child`,`Delete 30 when its only child is 25`],[`Two children`,`Replace with inorder successor; remove successor old node`,`Delete 40 in lecture BST`]])}
  ${i(`Before deleting 40`,d)}
  ${r([`Step`,`Reference / action`,`Tree meaning`],[[`1`,`node = 40`,`Two children exist`],[`2`,`succ = node.right → 50`,`Right subtree starts at 50`],[`3`,`while succ.left: 50 → 45`,`Smallest value in right subtree is 45`],[`4`,`node.val = 45`,`Root value replaced, but duplicate 45 temporarily exists`],[`5`,`node.right = delete(50,45)`,`Old 45 leaf removed; links repaired`]])}
  ${i(`After delete(40): root is same node, value 45`,`        45
       /  \\
     30    50
    /  \\     \\
  25   35     60`)}
  ${t(`Lecture Python · delete`,`def delete(node, key):
    if not node:
        return None

    if key < node.val:
        node.left = delete(node.left, key)
    elif key > node.val:
        node.right = delete(node.right, key)
    else:
        if not node.left:
            return node.right
        if not node.right:
            return node.left

        succ = node.right
        while succ.left:
            succ = succ.left

        node.val = succ.val
        node.right = delete(node.right, succ.val)

    return node

root = delete(root, 40)  # assign returned root`)}
  ${o(`<b>Why return child?</b> For 0/1 child, returned reference replaces deleted node in its parent. For root deletion, caller must do <code>root = delete(root, key)</code>.`,`<b>Time:</b> O(h), including finding successor; recursive stack O(h).`)}
  ${s(`Successor = minimum of RIGHT subtree, not maximum of right subtree. Replacing value alone is insufficient; old successor occurrence must also be removed.`)}
`),n(`12.6`,`nary`,`N-ary Tree`,`Left/right fixed fields ke bajay children list`,`One node can have 0, 1, 2, 3… children.`,`
  ${i(`Lecture N-ary tree`,f)}
  ${o(`<b>Root 10:</b> children list [20,30,40]. <b>20:</b> children [50,60,70].`,`<b>Binary vs N-ary:</b> Binary TreeNode has <code>left</code>/<code>right</code>; N-ary Node has <code>children</code> list. Children order is list order and traversal follows it.`,`<b>Leaves:</b> 50,60,70,80,90,100 have empty children lists.`)}
  ${s(`N-ary tree par BST left-smaller/right-larger invariant automatically nahi hota. N-ary preorder/postorder iterate ALL children, not just first two.`)}
`),n(`12.6.1`,`nary-setup`,`Initial Setup for N-ary Tree`,`Children list references store karti hai`,`Course notebook ke exact values and assignments.`,`
  ${t(`Lecture Python · N-ary setup`,`class Node:
    def __init__(self, val):
        self.val = val
        self.children = []

root = Node(10)
node_20 = Node(20)
node_30 = Node(30)
node_40 = Node(40)
root.children = [node_20, node_30, node_40]
node_20.children = [Node(50), Node(60), Node(70)]
node_30.children = [Node(80)]
node_40.children = [Node(90), Node(100)]`)}
  ${i(`After assigning children lists`,f)}
  ${o(`<b><code>node_20</code>:</b> separate variable root ke first child object ko reference karta hai. <code>root.children[0] is node_20</code> True.`,`<b><code>Node(50)</code>:</b> fresh leaf object; its <code>children=[]</code>. Root ke three children aur their children alag levels hain.`)}
`),n(`12.6.2`,`nary-pre`,`Preorder on N-ary Tree`,`Node first, then each child subtree left-to-right`,`Binary preorder ka generalization.`,`
  ${t(`Lecture Python · N-ary preorder`,`def preorder_traversal(node):
    if not node:
        return
    print(node.val, end=' ')
    for child in node.children:
        preorder_traversal(child)

preorder_traversal(root)
# 10 20 50 60 70 30 80 40 90 100`)}
  ${r([`Current call`,`Print now`,`Next recursive children`],[[`10`,`10`,`20, then 30, then 40`],[`20`,`20`,`50, then 60, then 70`],[`30`,`30`,`80`],[`40`,`40`,`90, then 100`]])}
  ${o(`<b>Full output:</b> 10,20,50,60,70,30,80,40,90,100. Child 20 subtree finishes before child 30 starts.`,`<b>Cost:</b> O(n) time, O(h) recursive stack.`)}
`),n(`12.6.3`,`nary-post`,`Postorder on N-ary Tree`,`All children pehle; parent last`,`Children loop completes before print.`,`
  ${t(`Lecture Python · N-ary postorder`,`def postorder_traversal(node):
    if not node:
        return
    for child in node.children:
        postorder_traversal(child)
    print(node.val, end=' ')

postorder_traversal(root)
# 50 60 70 20 80 30 90 100 40 10`)}
  ${r([`Subtree`,`Children printed first`,`Then parent`],[[`20`,`50,60,70`,`20`],[`30`,`80`,`30`],[`40`,`90,100`,`40`],[`10`,`All three child-subtree outputs`,`10`]])}
  ${o(`<b>Full output:</b> 50,60,70,20,80,30,90,100,40,10.`,`<b>Cost:</b> O(n) time, O(h) stack. Root 10 last always, for any nonempty tree.`)}
`),n(`12.6.4`,`nary-level`,`Level Order on N-ary Tree`,`Queue mein ALL children append karo`,`Binary level order ka same FIFO idea.`,`
  ${t(`Lecture Python · N-ary level order`,`from collections import deque

def level_order_traversal(node):
    if not node:
        return
    q = deque([node])
    while q:
        curr = q.popleft()
        print(curr.val, end=' ')
        for child in curr.children:
            q.append(child)

level_order_traversal(root)
# 10 20 30 40 50 60 70 80 90 100`)}
  ${r([`Popped`,`New children enqueued`,`Queue after step`],[[`10`,`20,30,40`,`[20,30,40]`],[`20`,`50,60,70`,`[30,40,50,60,70]`],[`30`,`80`,`[40,50,60,70,80]`],[`40`,`90,100`,`[50,60,70,80,90,100]`]])}
  ${o(`<b>Output:</b> 10,20,30,40,50,60,70,80,90,100.`,`<b>Cost:</b> O(n) time and O(w) queue space, w = maximum queued width; worst O(n).`)}
`),n(`12.7`,`tree-dp`,`DP on Trees`,`Parent answer child answers se banta hai`,`Lecture heading ko recursion results ka mental model banao.`,`
  ${i(`Example: count subtree nodes`,u)}
  ${o(`<b>Question define:</b> <code>count(node)</code> means is node ke subtree mein total nodes.`,`<b>Base:</b> <code>count(None)=0</code>.`,`<b>Combine:</b> <code>count(node)=1+count(left)+count(right)</code>. D/E leaves each return 1 → B returns 1+1+1=3; F returns 1 → C returns 2; A returns 1+3+2=6.`,`<b>Why postorder?</b> B ka answer tabhi final hoga jab D aur E ke answers return ho chuke hon.`)}
  ${r([`Problem`,`Subtree answer`,`Combine at parent`],[[`Depth`,`Max downward node count`,`1+max(left,right)`],[`Count`,`Number of nodes`,`1+left+right`],[`Sum`,`Sum of values`,`node.val+left+right`],[`Max path sum`,`Best one-side gain returned upward`,`Global answer may use both sides`]])}
  ${s(`“DP on trees” heading ka matlab har function memoized nahi. Pure tree mein one DFS visit per node O(n) hai; repeated overlapping subproblems tabhi memoization chahiye.`)}
`),n(`12.8.1`,`max-depth`,`Calculate Depth of a Tree`,`Code nodes/levels count karta hai; edges alag`,`Lecture output max_depth(root) − 1 uses edge convention.`,`
  ${t(`Lecture Python · maximum depth`,`def max_depth(node):
    if not node:
        return 0

    left = max_depth(node.left)
    right = max_depth(node.right)
    return 1 + max(left, right)

print(max_depth(root))      # 3 nodes/levels
print(max_depth(root) - 1)  # 2 edges for nonempty tree`)}
  ${i(`Seven-node lecture tree`,d)}
  ${r([`Node`,`left result`,`right result`,`return`],[[`25 / 35 / 45 / 60`,`0`,`0`,`1`],[`30`,`1`,`1`,`2`],[`50`,`1`,`1`,`2`],[`40`,`2`,`2`,`3`]])}
  ${o(`<b>Code return 3:</b> longest root-to-leaf path 40→30→25 has 3 nodes.`,`<b>Edges:</b> same path has 2 edges; lecture evaluates <code>max_depth(root)-1</code>. Empty tree par edges convention question-specific; avoid blindly returning −1 unless defined.`,`<b>Cost:</b> O(n) time, O(h) stack.`)}
`),n(`12.8.2`,`count-nodes`,`Count Nodes in a Tree`,`Current node 1 + left count + right count`,`No BST ordering needed.`,`
  ${t(`Lecture Python · count_nodes`,`def count_nodes(node):
    if not node:
        return 0
    return 1 + count_nodes(node.left) + count_nodes(node.right)

print(count_nodes(root))  # 7 for lecture 40-root tree`)}
  ${r([`Subtree root`,`Calculation`,`Result`],[[`25,35,45,60`,`1+0+0 each`,`1 each`],[`30`,`1+1+1`,`3`],[`50`,`1+1+1`,`3`],[`40`,`1+3+3`,`7`]])}
  ${o(`<b>Base None → 0:</b> Missing child count zero; it is not an extra node.`,`<b>Cost:</b> O(n) time, O(h) call stack. A single call <code>count_nodes(root)</code> visits each node once.`)}
`),n(`12.8.3`,`sum-nodes`,`Sum of Nodes in Tree`,`Count jaisa, but 1 ki jagah node.val`,`Child sums return hone ke baad parent add karta hai.`,`
  ${t(`Lecture Python · tree_sum`,`def tree_sum(node):
    if not node:
        return 0

    left_sum = tree_sum(node.left)
    right_sum = tree_sum(node.right)
    return node.val + left_sum + right_sum

print(tree_sum(root))  # 285 for 25,30,35,40,45,50,60`)}
  ${r([`Subtree`,`Calculation`,`Return`],[[`30 subtree`,`25+30+35`,`90`],[`50 subtree`,`45+50+60`,`155`],[`root 40`,`40+90+155`,`285`]])}
  ${o(`<b>Base:</b> <code>tree_sum(None)=0</code>; missing child contributes zero.`,`<b>Cost:</b> O(n) time, O(h) auxiliary recursion stack. Numeric values sum ho sakte hain; labels A–F wale tree par this numeric function directly meaningful nahi.`)}
`),n(`12.8.4`,`validate-bst`,`Validate BST`,`Sirf parent se compare karna enough nahi`,`Ancestor-derived low/high range every node par apply hota hai.`,`
  ${t(`Lecture Python · strict BST validation`,`import math

def is_valid_bst(root):
    def traverse(node, low, high):
        if not node:
            return True
        if not (low < node.val < high):
            return False
        return (traverse(node.left, low, node.val)
                and traverse(node.right, node.val, high))

    return traverse(root, -math.inf, math.inf)

print(is_valid_bst(root))  # True for lecture BST`)}
  ${i(`Invalid example: 45 is in root 40 LEFT subtree`,`        40
       /  \\
     30    50
       \\
        45`)}
  ${r([`Visit`,`Allowed range`,`Check`],[[`40`,`(-∞,+∞)`,`valid`],[`30`,`(-∞,40)`,`valid`],[`45 as 30.right`,`(30,40)`,`45 < 40 fails`]])}
  ${o(`<b>Why local test fails:</b> 45 > parent 30, so direct relation looks okay; but 45 is still left of ancestor 40 and violates global rule.`,`<b>Strict bounds:</b> <code>low &lt; node.val &lt; high</code>, so duplicate values invalid under this function. Time O(n), stack O(h).`)}
  ${s(`Lecture BST insertion sends duplicate right, while this validator uses strict inequality. Dono ko together use karte waqt duplicate policy decide karo; question ki definition wins.`)}
`),n(`12.8.5`,`lca`,`Lowest Common Ancestor`,`Pehla split point answer hai`,`Lecture method BST comparison use karta hai, arbitrary binary tree ke liye nahi.`,`
  ${i(`Lecture LCA BST`,`        6
       / \\
      2   8
     / \\ / \\
    0  4 7  9
      / \\
     3   5`)}
  ${t(`Lecture Python · LCA in BST`,`def lowest_common_ancestor(root, p, q):
    while root:
        if p.val < root.val and q.val < root.val:
            root = root.left
        elif p.val > root.val and q.val > root.val:
            root = root.right
        else:
            return root

# On lecture tree rooted at 6:
# LCA(2, 4) = 2; LCA(2, 8) = 6`)}
  ${r([`Query`,`At root 6`,`Result`],[[`LCA(2,8)`,`2 left, 8 right → split`,`6`],[`LCA(2,4)`,`both <6 → go 2; 2 equals p`,`2`],[`LCA(3,7)`,`3 left, 7 right → split`,`6`]])}
  ${o(`<b>Pointer:</b> <code>root</code> variable currently visited candidate node; each loop moves it to left or right child.`,`<b>Cost:</b> O(h) time, O(1) auxiliary space for iterative code. Assumes p and q belong to the BST.`)}
`),n(`12.8.6`,`kth`,`Kth Smallest Element in BST`,`Inorder ke k-th visited value ko return karo`,`Explicit stack mimics recursive inorder.`,`
  ${t(`Lecture Python · iterative inorder`,`def kth_smallest(node, k):
    stack = []

    while True:
        while node:
            stack.append(node)
            node = node.left

        node = stack.pop()
        k -= 1
        if k == 0:
            return node.val
        node = node.right

# Assumes 1 <= k <= number of nodes
# kth_smallest(root, 3) -> 35`)}
  ${i(`BST whose inorder is ascending`,d)}
  ${r([`Pop number`,`Popped value`,`k remaining if initial k=3`],[[`1`,`25`,`2`],[`2`,`30`,`1`],[`3`,`35`,`0 → return 35`]])}
  ${o(`<b>Inner while:</b> current node and all its left ancestors stack par push, so smallest remaining node top par.`,`<b>After pop:</b> <code>k -= 1</code>. If k=0, found; otherwise right subtree visit.`,`<b>Cost:</b> worst O(n) time, O(h) stack. Lecture code assumes 1≤k≤n; invalid k par empty stack pop error ho sakta hai.`)}
`),n(`12.8.7`,`nary-max`,`Maximum Value in N-ary Tree`,`Each child se maximum lao, current se compare karo`,`No BST ordering assumption.`,`
  ${t(`Lecture Python · N-ary max`,`import math

def find_max(node):
    if not node:
        return -math.inf

    res = node.val
    for child in node.children:
        res = max(res, find_max(child))
    return res

print(find_max(root))  # 100 for lecture N-ary tree`)}
  ${r([`Subtree`,`Child maxima`,`Return`],[[`20`,`50,60,70`,`70`],[`30`,`80`,`80`],[`40`,`90,100`,`100`],[`10`,`70,80,100`,`100`]])}
  ${o(`<b>Base:</b> <code>-math.inf</code> ensures None does not beat any numeric node, even all-negative tree.`,`<b>Cost:</b> O(n) time, O(h) recursive stack; each child visited once.`)}
`),n(`12.8.8`,`nary-height`,`Height of N-ary Tree`,`1 + maximum child height`,`Lecture function returns nodes/levels, not edges.`,`
  ${t(`Lecture Python · N-ary height`,`def height(node):
    if not node:
        return 0

    heights = []
    for child in node.children:
        heights.append(height(child))

    return 1 + max(heights, default=0)

print(height(root))  # 3 nodes/levels; 2 edges`)}
  ${r([`Node group`,`Child heights`,`Return`],[[`Leaf 50…100`,`none; max default 0`,`1`],[`20,30,40`,`all direct leaf children return 1`,`2`],[`Root 10`,`children return 2`,`3`]])}
  ${o(`<b><code>max(heights, default=0)</code>:</b> Leaf children list empty hai; normal <code>max([])</code> error deta, default 0 prevents it.`,`<b>Convention:</b> 10→20→50 path 3 nodes, 2 edges. Empty tree returns 0 node-height. Cost O(n) time, O(h) stack.`)}
`),n(`12.8.9`,`max-path`,`Maximum Path Sum of Binary Tree`,`Global path two sides le sakta hai; parent ko ek side return`,`Is lesson ka sabse important two-value distinction.`,`
  ${i(`Lecture example`,`      -10
      /  \\
     9    20
         /  \\
        15   7`)}
  ${t(`Lecture Python · max_path_sum`,`import math

def max_path_sum(root):
    max_sum = -math.inf

    def helper(node):
        nonlocal max_sum
        if not node:
            return 0

        left_gain = max(helper(node.left), 0)
        right_gain = max(helper(node.right), 0)
        current_path = node.val + left_gain + right_gain
        max_sum = max(max_sum, current_path)

        return node.val + max(left_gain, right_gain)

    helper(root)
    return max_sum

# On -10 / 9,20 / 15,7 tree -> 42`)}
  ${r([`At node`,`left gain`,`right gain`,`Global candidate`,`Return to parent`],[[`15`,`0`,`0`,`15`,`15`],[`7`,`0`,`0`,`7`,`7`],[`20`,`15`,`7`,`20+15+7=42`,`20+max(15,7)=35`],[`-10`,`9`,`35`,`-10+9+35=34`,`-10+max(9,35)=25`]])}
  ${o(`<b>Answer 42:</b> 15→20→7 path. Root −10 include karna mandatory nahi.`,`<b>Why return only one side?</b> Parent ke through path cannot branch twice at child 20; upward extend karne ke liye 20→15 <em>or</em> 20→7 choose karo. Global answer at 20 can connect both.`,`<b><code>max(gain,0)</code>:</b> Negative child branch path ko worse banayegi, so skip. <code>max_sum=-inf</code> all-negative trees correctly handle karta hai. Time O(n), stack O(h).`)}
  ${s(`Returning 42 to parent would incorrectly allow a path to branch at node 20 and again at its parent. Global candidate and return gain are different quantities.`)}
`),n(`12.8.10`,`left-leaves`,`Sum of Left Leaf Nodes`,`Node must be BOTH left child and leaf`,`Right leaf 7 count nahi hoga.`,`
  ${i(`Lecture example`,`       3
      / \\
     9  20
       /  \\
      15   7`)}
  ${t(`Lecture Python · sum_left_leaves`,`def sum_left_leaves(root):
    if not root:
        return 0

    total = 0
    if root.left and not root.left.left and not root.left.right:
        total += root.left.val

    total += sum_left_leaves(root.left)
    total += sum_left_leaves(root.right)
    return total

# On 3 / 9,20 / 15,7 tree -> 9 + 15 = 24`)}
  ${r([`Node`,`Left child?`,`Leaf?`,`Add?`],[[`9`,`Yes, of 3`,`Yes`,`9`],[`15`,`Yes, of 20`,`Yes`,`15`],[`7`,`No, right of 20`,`Yes`,`No`],[`20`,`No, right of 3`,`No`,`No`]])}
  ${o(`<b>Answer:</b> 9+15=24. Root itself is not a left child even if it is the only node.`,`<b>Code:</b> parent checks <code>root.left</code> is leaf, then recurses. Leaf re-visit adds 0. O(n) time, O(h) stack.`)}
`),n(`12.9`,`context`,`DS Context`,`GATE DA mein tree question ko classify karo`,`First decide tree shape, then order, then complexity.`,`
  ${r([`Question clue`,`Use this tool`,`First check`],[[`Parent / leaf / depth / height`,`Terminology + edges/nodes convention`,`Root depth 0? leaf height 0?`],[`Traversal output / reconstruction`,`Pre/in/post/level rules`,`Full tree? labels distinct?`],[`Sorted key search or kth-smallest`,`BST invariant + inorder`,`Balanced guaranteed?`],[`Shortest levels / nearest depth`,`Queue level order`,`Enqueue child order`],[`Child answers combine`,`Postorder recursion / tree DP`,`Base on None`],[`Delete BST node`,`0/1/2 child cases`,`Reassign returned root`]])}
  ${a(`SCOPE`,`Course vs syllabus`,`Supplied GATE DA Section 4 explicitly includes trees. Lecture sequence also has N-ary and advanced coding problems. They strengthen recursion/traversal intuition, but direct paper evidence should be labelled separately from original GATE-style practice.`)}
  ${s(`Tree, binary tree, full binary tree, perfect binary tree aur BST interchangeable nahi. Formula ya algorithm apply karne se pehle exact assumption underline karo.`)}
`)].join(`
`),m=(e,t,n,r,i,a=`Core`)=>{let o=[String(t),...n.map(String)].filter((e,t,n)=>n.indexOf(e)===t);if(o.length<4&&Number.isFinite(Number(t)))for(let e=3;o.length<4;e++){let n=String(Number(t)+e);o.includes(n)||o.push(n)}if(o.length!==4)throw Error(`Need four distinct choices: ${e}`);let s=i%4,c=o.slice(s).concat(o.slice(0,s));return{id:i+1,prompt:e,options:c,answer:String(t),explanation:r,difficulty:a}},h=(e,t,n,r,i,a)=>m(e,t,n,r,i,a),g=e=>e.join(` → `),_=e=>({root:`R${e}`,left:`L${e}`,right:`Q${e}`,ll:`A${e}`,lr:`B${e}`,rl:`C${e}`}),v=e=>({pre:[e.root,e.left,e.ll,e.lr,e.right,e.rl],in:[e.ll,e.left,e.lr,e.root,e.rl,e.right],post:[e.ll,e.lr,e.left,e.rl,e.right,e.root],level:[e.root,e.left,e.right,e.ll,e.lr,e.rl]}),y=e=>`root ${e.root}; ${e.root}.left=${e.left}, .right=${e.right}; ${e.left}.left=${e.ll}, .right=${e.lr}; ${e.right}.left=${e.rl}`,b={traversals:`pre`,"create-tree":`pre`,"preorder-theory":`pre`,"preorder-code":`pre`,inorder:`in`,postorder:`post`,"level-order":`level`,choice:`post`};function x(e,t){let n=_(11+t),r=b[e],i=v(n),a={pre:`preorder`,in:`inorder`,post:`postorder`,level:`level order`}[r],o={pre:`node-left-right`,in:`left-node-right`,post:`left-right-node`,level:`FIFO level-by-level`}[r],s=y(n),c=t%5;if(e===`traversals`)return c===0?h(`${s}. DFS category mein kaun se traversal types hain?`,`Preorder, Inorder, Postorder`,[`Only Level order`,`Preorder and Level order`,`Only Inorder`],`DFS branch/subtree complete karta hai; pre/in/post teen DFS orders hain.`,t,`Foundation`):c===1?h(`${s}. Level-order BFS ke liye kaunsa structure?`,`Queue (FIFO)`,[`Stack (LIFO)`,`Min-heap`,`Recursion only`],`Queue se nodes level-by-level nikalte hain.`,t,`Foundation`):c===2?h(`${s}. DFS ek branch poori explore karne ke liye kya use kar sakta hai?`,`Recursion or stack`,[`Queue only`,`Hash table only`,`Sorting only`],`Call stack ya explicit stack depth-first order maintain karta hai.`,t,`Foundation`):c===3?h(`${s}. Tree traversal ka main purpose?`,`Har node ko systematic order mein visit karna`,[`Sirf root visit karna`,`Values ko hamesha sort karna`,`Har edge do baar print karna`],`Non-linear tree ko process karne ke liye visit order define karte hain.`,t,`Core`):h(`${s}. BFS/level-order output?`,g(i.level),[g(i.pre),g(i.in),g(i.post)],`Queue pehle root, then same level ke children process karti hai: ${g(i.level)}.`,t,`Core`);if(c===0)return h(`${s}. ${a} output?`,g(i[r]),Object.keys(i).filter(e=>e!==r).map(e=>g(i[e])),`${a} rule ${o}; answer ${g(i[r])}.`,t,`Core`);if(c===1)return h(`${s}. ${a} mein third visited node kaun hai?`,i[r][2],i[r].filter((e,t)=>t!==2).slice(0,3),`Complete ${a} order ${g(i[r])}; third ${i[r][2]}.`,t,`Foundation`);if(c===2)return h(`${s}. ${a} mein last visited node?`,i[r].at(-1),i[r].slice(0,3),`${a}: ${g(i[r])}; last ${i[r].at(-1)}.`,t,`Core`);if(c===3)return h(`${s}. ${a} ke first two visits?`,g(i[r].slice(0,2)),[g([i[r][1],i[r][0]]),g([i[r][0],i[r][2]]),g([i[r][0],i[r][3]])],`Rule ${o}; first two ${g(i[r].slice(0,2))}.`,t,`Core`);let l=r===`level`?`Queue (FIFO)`:`Recursive call stack / DFS`,u=r===`level`?[`Stack (LIFO)`,`Min-heap`,`Hash table`]:[`Queue (FIFO)`,`Min-heap`,`Hash table`];return h(`${s}. Lecture ka ${a} traversal kis mechanism se visit order maintain karta hai?`,l,u,`Level order queue use karta hai; preorder/inorder/postorder depth-first recursive stack.`,t,`GATE`)}function S(e,t){let n=3+t,r=t%5;if(e===`properties`){let e=t%10;return e===0?h(`N=${n} nodes wale rooted tree mein root ke kitne parents hote hain?`,`0`,[`1`,`2`,String(n-1)],`Root ka koi parent nahi hota.`,t,`Foundation`):e===1?h(`N=${n} nodes wale rooted tree mein root ko chhodkar har node ke kitne parents?`,`1`,[`0`,`2`,String(n-1)],`Every non-root node has exactly one immediate parent.`,t,`Foundation`):e===2?h(`N=${n} rooted nodes mein A→B→C child path hai. C se A child link add karein to kya banega?`,`Cycle`,[`Valid tree`,`Disconnected forest`,`New root`],`A→B→C→A cycle tree rule todta hai.`,t,`Foundation`):e===3?h(`Root A se ${n} nodes reachable hain, lekin G alag disconnected hai. Whole structure ek tree hai?`,`No, forest`,[`Yes, one tree`,`Yes, BST`,`Yes, full tree`],`Tree connected hota hai; G root A se reachable nahi.`,t,`Core`):e===4?h(`Rooted tree mein N=${n} nodes hain. Edges?`,n-1,[n,n+1,2*n],`Root ko parent edge nahi; remaining N−1 nodes ko one parent edge each.`,t,`Core`):e===5?h(`N=${n} nodes wale rooted tree mein non-root nodes kitne?`,n-1,[n,n+1,1],`Exactly ek root hai; baaki N−1 nodes non-root hain.`,t,`Foundation`):e===6?h(`N=${n} nodes wale connected tree mein parent–child links (edges) kitne?`,n-1,[n,n+1,n-2],`Root ko parent link nahi; each of the other N−1 nodes has one.`,t,`Core`):e===7?h(`N=${n} nodes ke structure mein cycle milti hai. Kya yeh tree ho sakta hai?`,`Nahi`,[`Haan, kyunki connected hai`,`Haan, kyunki root hai`,`Haan, kyunki N nodes hain`],`Tree acyclic hota hai; cycle hone par tree rule fail.`,t,`Core`):e===8?h(`N=${n} nodes mein ek node ka zero child hai. Use kya kahenge?`,`Leaf`,[`Root zaroor hoga`,`Cycle`,`Disconnected node`],`Jis node ke children nahi hote, woh leaf hai.`,t,`Foundation`):h(`N=${n} nodes ke graph mein N−1 edges hain, par woh disconnected hai. Kya ek tree hai?`,`Nahi`,[`Haan, N−1 enough hai`,`Haan, agar root label de dein`,`Haan, agar values sorted hain`],`N−1 edges akela sufficient nahi; tree connected bhi hona chahiye.`,t,`Core`)}let i=_(n),a=y(i);return r===0?h(`${a}. ${i.lr} ka parent?`,i.left,[i.root,i.right,i.ll],`${i.lr} direct ${i.left}.right child hai.`,t,`Foundation`):r===1?h(`${a}. ${i.lr} aur ${i.ll} ka relation?`,`Siblings`,[`Parent-child`,`Ancestors`,`Unrelated`],`Same parent ${i.left} ke children siblings.`,t,`Foundation`):r===2?t%2==0?h(`${a}. Root ${i.root} ki depth (edges)?`,`0`,[`1`,`2`,`3`],`Root se root tak zero edges.`,t,`Foundation`):h(`${a}. Lecture convention mein ${i.lr} ka level?`,`3`,[`0`,`1`,`2`],`${i.lr} root se 2 edges door hai: depth 2, level = depth + 1 = 3.`,t,`Foundation`):r===3?h(`${a}. Leaf nodes kitne?`,`3`,[`2`,`4`,`5`],`${i.ll}, ${i.lr}, ${i.rl} have no children.`,t,`Core`):h(`${a}. ${i.left} rooted subtree mein nodes kitne?`,`3`,[`2`,`4`,`6`],`${i.left} subtree = ${i.left}, ${i.ll}, ${i.lr}.`,t,`Core`)}function C(e,t){let n=100+2*t,r=[n-15,n-10,n-5,n,n+5,n+10,n+15],i=t%5,a=`BST: root ${n}; children ${n-10},${n+10}; leaves ${n-15},${n-5},${n+5},${n+15}`;if(e===`bst-delete`)return i===0?h(`${a}. Root ${n} delete karne par inorder successor?`,n+5,[n-5,n+10,n+15],`Right subtree ka minimum ${n+5}.`,t,`GATE`):i===1?h(`${a}. Leaf ${n-15} delete: parent ka kaunsa link None?`,`${n-10}.left`,[`${n-10}.right`,`${n}.left`,`${n+10}.left`],`Leaf ${n-15} parent ${n-10} ka left child hai.`,t):i===2?h(`${a}. Two-child root deletion mein successor old location se?`,`Delete karna hoga`,[`Rakhna hoga`,`Root right ko None`,`Poora left subtree delete`],`Value copy ke baad duplicate successor old node remove karo.`,t,`GATE`):i===3?h(`${a}. delete(root, ${n}) ke returned root reference ko caller kya kare?`,`root = delete(root, key)`,[`Ignore return`,`Always set root=None`,`Append to queue`],`Root itself change ho sakta hai; returned reference preserve karo.`,t):h(`${a}. BST deletion ka path length h ho toh time?`,`O(h)`,[`O(1)`,`O(h²)`,`O(2^h)`],`Node search + successor descent one root-to-leaf path order.`,t,`GATE`);if(e===`bst-insert`){let e=n-7;if(i===0)return h(`${a}. Insert ${e}: final parent?`,n-5,[n-10,n,n-15],`${e}<${n}, >${n-10}, <${n-5}; ${n-5}.left.`,t);if(i===1)return h(`${a}. Insert ${e}: which child link is initially None?`,`${n-5}.left`,[`${n-5}.right`,`${n-10}.left`,`${n}.right`],`Trace ${n}→${n-10}→${n-5}→left None.`,t);if(i===2)return h(`${a}. Root ${n} par insert(${e}) ka first branch?`,`Left`,[`Right`,`Stay at root`,`Both`],`${e}<${n}, so left.`,t)}if(e===`bst-search`){let e=n+5;if(i===0)return h(`${a}. Search ${e} path?`,`${n} → ${n+10} → ${e}`,[`${n} → ${n-10} → ${e}`,`${n} → ${e}`,`${n} → ${n+10} → ${n+15}`],`Compare ${e}>${n}; then ${e}<${n+10}.`,t);if(i===1)return h(`${a}. Search ${n-15}: root par kaunsi branch?`,`Left`,[`Right`,`Both`,`No branch`],`${n-15}<${n}.`,t)}return e===`bst-setup`&&i===0?h(`${a}. ${n+10}.left value?`,n+5,[n-5,n+15,n-15],`Right child ${n+10} ka left leaf ${n+5}.`,t):i===0?h(`${a}. Inorder output?`,g(r),[g([...r].reverse()),`${n} → ${n-10} → ${n+10}`,`${n-15} → ${n} → ${n+15}`],`BST inorder sorted ascending: ${g(r)}.`,t,`Core`):i===1?h(`${a}. Search ${n+5} par first comparison ${n+5} vs ${n}: next branch?`,`Right`,[`Left`,`Both`,`Stop`],`${n+5}>${n}.`,t):i===2?h(`${a}. Third smallest value?`,r[2],[r[1],r[3],r[4]],`Inorder ${g(r)}, third ${r[2]}.`,t,`Core`):i===3?h(`${a}. Root ${n} ke right subtree ka minimum?`,n+5,[n+10,n+15,n-5],`Right subtree mein leftmost value ${n+5}.`,t,`GATE`):h(`${a}. Agar BST skewed ho jaye toh search worst time?`,`O(n)`,[`O(1)`,`O(log n)`,`O(n log n)`],`Skewed BST ek n-length chain ban sakta hai.`,t,`GATE`)}var w=(e,t,n,r,i=`Core`)=>h(e,t,[t+1,t+2,t-1],n,r,i);function T(e,t){let n=100+10*t,[r,i,a,o,s,c,l]=[n+10,n+20,n+30,n+40,n+50,n+60,n+70],u=[n,r,o,s,i,c,a,l],d=[o,s,r,c,i,l,a,n],f=[n,r,i,a,o,s,c,l],p=`N-ary root ${n}; children [${r},${i},${a}]; ${r} children [${o},${s}]; ${i} child [${c}]; ${a} child [${l}]`,m=e===`nary-post`?`post`:e===`nary-level`?`level`:`pre`,_={pre:u,post:d,level:f},v=t%5;if(e===`nary-max`){if(v===0)return w(`${p}. Maximum value?`,l,`All nodes compare; ${l} largest.`,t);if(v===1)return w(`${p}. ${r} subtree max?`,s,`Children ${o},${s}; largest ${s}.`,t)}if(e===`nary-height`){if(v===0)return w(`${p}. Height in NODES/levels?`,3,`Root → child → leaf has three nodes.`,t);if(v===1)return w(`${p}. Height in EDGES?`,2,`Same longest path has two edges.`,t)}return v===0?h(`${p}. ${m} order?`,g(_[m]),[...Object.keys(_).filter(e=>e!==m).map(e=>g(_[e])),g([..._[m]].reverse())],`Each child list scanned in order; ${m} = ${g(_[m])}.`,t,`Core`):v===1?h(`${p}. ${m} third visited value?`,_[m][2],_[m].filter((e,t)=>t!==2).slice(0,3),`${m}: ${g(_[m])}.`,t):v===2?w(`${p}. Root ke direct children kitne?`,3,`Root children list has three entries; grandchildren do not count.`,t,`Foundation`):v===3?w(`${p}. Total leaf nodes?`,4,`${o},${s},${c},${l} have no children.`,t):h(`${p}. ${m===`level`?`Level order`:`Recursive `+m} traversal time for N nodes?`,`O(N)`,[`O(1)`,`O(log N)`,`O(N²)`],`Each node is visited once.`,t,`GATE`)}function E(e,t){let n=10+t,r=t%5;if(e===`tree-dp`)return r===0?h(`Node ${n} has left subtree count ${n+1} and right count ${n+2}. count(node)?`,2*n+4,[2*n+3,2*n+5,2*n+2],`1 + left + right.`,t):r===1?h(`Parent ${n} ka sum: left ${n+1}, right ${n+2}. Formula?`,`${n} + ${n+1} + ${n+2}`,[`${n+1} + ${n+2}`,`${n} + max(${n+1}, ${n+2})`,`${n} - ${n+1} - ${n+2}`],`Node value plus both child sums.`,t):r===2?h(`Node ${n} ka depth in nodes: child depths ${n+1}, ${n+2}. Return?`,n+3,[n+2,n+4,2*n+4],`1+max(child depths).`,t):r===3?h(`N=${n} nodes wale tree mein child answers parent mein combine karne wala DFS order?`,`Postorder`,[`Preorder`,`Level order`,`Only inorder`],`Children must return first.`,t):h(`Tree mein each node once DFS, N=${n} nodes. Time?`,`O(N)`,[`O(1)`,`O(log N)`,`O(N²)`],`One visit per node.`,t,`GATE`);if(e===`max-depth`){let e=2+t;return r===0?w(`Longest root→leaf path has ${e} edges. max_depth code node-count return?`,e+1,`Nodes = edges + 1 for nonempty path.`,t):r===1?w(`max_depth(root) returns ${e+1} nodes. Edge-height?`,e,`Edges = node count − 1.`,t):r===2?w(`node has child node-depths ${e}, ${e-1}; node-depth return?`,e+1,`1+max(left,right).`,t):r===3?w(`N=${n} nodes ka tree trace karte waqt max_depth(None) returns?`,0,`Base case empty subtree has zero nodes.`,t):h(`Tree max_depth visiting N=${n} nodes: time?`,`O(N)`,[`O(1)`,`O(log N)`,`O(N²)`],`Each node once.`,t,`GATE`)}if(e===`count-nodes`)return r===0?w(`Node ${n} ke left subtree ${n+1} nodes, right ${n+2}. Total?`,2*n+4,`Current 1 + left + right.`,t):r===1?w(`Root ${n} with two leaf children. count_nodes(root)?`,3,`Root plus two leaves.`,t):r===2?w(`N=${n} nodes wale tree ke missing child par count_nodes(None)?`,0,`No node at None.`,t):r===3?w(`Full binary tree internal I=${n}: total nodes?`,2*n+1,`Full tree N=2I+1.`,t,`GATE`):h(`count_nodes on N=${n} arbitrary-tree nodes: time?`,`O(N)`,[`O(1)`,`O(log N)`,`O(N²)`],`Each node once.`,t);if(e===`sum-nodes`)return r===0?w(`Node value ${n}; left sum ${n+1}; right sum ${n+2}. tree_sum(node)?`,3*n+3,`node.val + left_sum + right_sum.`,t):r===1?w(`Tree root ${n}, two leaves ${n+1}, ${n+2}. Sum?`,3*n+3,`All three values added.`,t):r===2?w(`Root value ${n} ke missing child par tree_sum(None)?`,0,`Empty subtree contributes zero.`,t):r===3?w(`Leaf value ${n}. tree_sum(leaf)?`,n,`Leaf children both None return zero.`,t):h(`tree_sum on N=${n} nodes time?`,`O(N)`,[`O(1)`,`O(log N)`,`O(N²)`],`Each node contributes once.`,t);if(e===`validate-bst`){let e=n+20,i=n+10,a=n+25;return r===0?h(`Root ${e}; left ${i}; ${i}.right=${a}. Valid strict BST?`,`No`,[`Yes`,`Only if balanced`,`Only if full`],`${a} left subtree mein root ${e} se bada hai.`,t,`GATE`):r===1?h(`Root ${e} ke left subtree mein node ka upper bound?`,e,[i,a,`+∞`],`Every left descendant must remain <${e}.`,t):r===2?h(`Strict BST mein duplicate value ${e} allowed?`,`No`,[`Yes, always`,`Only root par`,`Only leaf par`],`Strict low < value < high rejects equal.`,t):r===3?h(`Root ${e} wale BST ko validate karne ke liye direct parent comparison alone enough?`,`No`,[`Yes`,`Only at leaves`,`Only for balanced trees`],`Ancestor bounds also apply.`,t,`GATE`):h(`Range-check validator N=${n} nodes visit karta hai. Time?`,`O(N)`,[`O(1)`,`O(log N)`,`O(N²)`],`Worst all nodes checked.`,t)}if(e===`lca`){let e=n+20,i=n+10,a=n+30;return r===0?w(`BST root ${e}, nodes p=${i} (left), q=${a} (right). LCA?`,e,`Paths split at root.`,t):r===1?w(`BST: ${i} ancestor of ${i-2} and ${i+2}. LCA?`,i,`One queried node can itself be LCA.`,t):r===2?h(`BST root ${e}; p=${i-3}, q=${i+3}. First direction?`,`Left`,[`Right`,`Both`,`Stop at root`],`Both values <${e}.`,t):r===3?h(`Root ${e} wale BST par iterative LCA code aux space?`,`O(1)`,[`O(h)`,`O(n)`,`O(n²)`],`Only pointer root moves.`,t,`GATE`):h(`BST height h=${n}: LCA worst time?`,`O(h)`,[`O(1)`,`O(h²)`,`O(2^h)`],`One branch each step.`,t)}if(e===`kth`){let e=[n,n+3,n+6,n+9,n+12];return r===0?w(`BST inorder values ${e.join(`, `)}. 3rd smallest?`,e[2],`Inorder ascending, 1-based k=3.`,t):r===1?w(`BST inorder values ${e.join(`, `)}. 5th smallest?`,e[4],`Last of five ascending values.`,t):r===2?h(`BST inorder values ${e.join(`, `)}. Kth-smallest code stack par sabse pehle kya descend karta hai?`,`Leftmost path`,[`Rightmost path`,`Only root`,`Level order`],`Smallest remaining value at leftmost node.`,t):r===3?h(`Valid k ka range for N=${n} nodes?`,`1 ≤ k ≤ ${n}`,[`0 ≤ k < ${n}`,`k > ${n}`,`k = 0 only`],`Rank is 1-based.`,t):h(`Kth-smallest iterative inorder auxiliary stack worst height h=${n}?`,`O(h)`,[`O(1)`,`O(h²)`,`O(2^h)`],`Stack stores root-to-leaf path.`,t,`GATE`)}if(e===`max-path`){let e=n+20,i=n+5,a=n+10,o=n+8;return r===0?w(`Tree root -100, right child ${e} with leaf children ${a},${o}; left child ${i}. Max path sum?`,e+a+o,`Best path joins both positive grandchildren through right child.`,t,`GATE`):r===1?w(`Node ${e}, left_gain ${a}, right_gain ${o}. Global candidate?`,e+a+o,`Global path may use both sides.`,t):r===2?w(`Node ${e}, left_gain ${a}, right_gain ${o}. Return upward?`,e+a,`Upward path can take only stronger one side.`,t,`GATE`):r===3?w(`Negative child gain -${n} ko max(gain,0) ke baad value?`,0,`Negative branch skip.`,t):h(`Example all-negative values -${n}, -${n+1}, -${n+2}: max_sum initial value?`,`−∞`,[`0`,`1`,`root.val always`],`Zero would incorrectly beat all-negative path.`,t)}if(e===`left-leaves`){let e=n,i=n+3,a=n+5,o=n+7,s=n+9;return r===0?w(`Root ${e}; left leaf ${i}; right ${a} has left leaf ${o}, right leaf ${s}. Sum of LEFT leaves?`,i+o,`Only left leaf children `+i+` and `+o+`.`,t):r===1?w(`Single-node tree root=${e}. Sum of left leaves?`,0,`Root is not a left child.`,t):r===2?w(`Right child ${a} is a leaf. Its left-leaf contribution?`,0,`Right leaf not counted.`,t):r===3?h(`Value ${n} wala node left child hai but uska apna child hai. Count as left leaf?`,`No`,[`Yes`,`Only root`,`Only in BST`],`Must be both left and leaf.`,t):h(`sum_left_leaves on N=${n} nodes time?`,`O(N)`,[`O(1)`,`O(log N)`,`O(N²)`],`Every node checked.`,t)}return T(`nary-max`,t)}var D=new Set([`bst`,`bst-setup`,`bst-insert`,`bst-search`,`bst-delete`]),ee=new Set([`nary`,`nary-setup`,`nary-pre`,`nary-post`,`nary-level`,`nary-max`,`nary-height`]),O=new Set([`tree-dp`,`max-depth`,`count-nodes`,`sum-nodes`,`validate-bst`,`lca`,`kth`,`max-path`,`left-leaves`]);function k(e,t){if(e in b)return x(e,t);if(D.has(e))return C(e,t);if(ee.has(e))return T(e,t);if(O.has(e))return E(e,t);if(e===`context`){let e=11+t,[n,r,i,a]=[[`BST ${e} values ascending chahiye. Traversal?`,`Inorder`,[`Preorder`,`Postorder`,`Level order`],`BST inorder sorted values deta hai.`],[`Tree ${e} nodes ke levels left-to-right dekhne hain. Data structure?`,`Queue`,[`Stack`,`Heap`,`Set`],`Level order uses FIFO queue.`],[`Tree ${e} nodes ke parent answer ke liye child answers pehle chahiye. Order?`,`Postorder`,[`Preorder`,`Level order`,`Only inorder`],`Children-first is postorder.`],[`BST ${e} nodes skewed ho. Search worst time?`,`O(n)`,[`O(1)`,`O(log n)`,`O(n log n)`],`Skewed tree is a chain.`],[`Tree ${e} nodes par edge-height vs node-height relation?`,`Nodes = edges + 1`,[`Nodes = edges`,`Edges = nodes + 1`,`Nodes = 2 × edges`],`For nonempty root-to-leaf path.`]][t%5];return h(n,r,i,a,t,`GATE`)}return S(e,t)}var A=l.map(([e,t,,n])=>({id:n,label:`${e} · ${t}`,questions:Array.from({length:50},(e,t)=>k(n,t))})),j=A.reduce((e,t)=>e+t.questions.length,0),M=e=>String(e).replaceAll(`&`,`&amp;`).replaceAll(`<`,`&lt;`).replaceAll(`>`,`&gt;`).replaceAll(`"`,`&quot;`),N=l.map(([e,t,n])=>`<label><input type="checkbox" data-lecture="${e}"><span><b>${e}</b><i>${t}</i><small>${n}</small></span></label>`).join(``),P=A.map(e=>`<option value="${e.id}">${M(e.label)} (${e.questions.length})</option>`).join(``),F=Array.from({length:10},(e,t)=>`<a href="${t?`./module`+(t+1)+`.html`:`./index.html`}">M${String(t+1).padStart(2,`0`)}</a>`).join(``),I=`https://gate2024.iisc.ac.in/wp-content/uploads/2024/DA24S1.pdf`,L=`https://gate2024.iisc.ac.in/wp-content/uploads/2024/DAFinalAnswerKey.pdf`,R=[{number:`Q28`,title:`Full binary tree reconstruction`,prompt:`Full binary tree ke traversal choices: (A) preorder + inorder, (B) inorder + postorder, (C) preorder + postorder, (D) inorder only. Distinct node labels maan kar kaun se pairs tree ko uniquely reconstruct karte hain?`,options:[`A`,`B`,`C`,`D`],correct:[`A`,`B`,`C`],why:`Inorder ke saath preorder ya postorder se root aur left/right split fix ho jata hai. Full binary tree mein har internal node ke exactly 2 children hain, so preorder + postorder bhi disambiguate karte hain. Inorder alone enough nahi.`},{number:`Q52`,title:`Binary tree height, leaves and nodes`,prompt:`Rooted binary tree: H=edge-height, I=internal nodes, L=leaves, N=total nodes. Always true? (A) L≤I+1; (B) H+1≤N≤2^(H+1)−1; (C) H≤I≤2^H−1; (D) H≤L≤2^(H−1).`,options:[`A`,`B`,`C`,`D`],correct:[`A`,`B`,`C`],why:`A: each internal node has at most two children. B: height-H path needs H+1 nodes; perfect shape reaches 2^(H+1)−1. C: path needs at least H internal nodes, and upper levels can contain at most 1+2+…+2^(H−1)=2^H−1 internal nodes. D fails for a long chain or fully filled tree.`}],te=R.map(e=>`<article class="question-card tree-pyq" data-pyq="${e.number}"><div class="question-card-meta"><span>2024 DA ${e.number}</span><small>DIRECT MSQ · select all correct</small></div><h3>${e.title}</h3><p>${e.prompt}</p><div class="tree-pyq-options">${e.options.map(e=>`<label><input type="checkbox" value="${e}"><b>${e}</b></label>`).join(``)}</div><button type="button" class="tree-pyq-check">Check answer</button><div class="question-feedback" hidden role="status"></div><p class="tree-source-links"><a href="${I}" target="_blank" rel="noopener">Official question paper ↗</a> · <a href="${L}" target="_blank" rel="noopener">Final answer key ↗</a></p></article>`).join(``),ne=`<section class="revision-grid searchable" data-title="Trees Quick Revision"><article><span>01 · HEIGHT</span><h3>Edges vs nodes</h3><p>Root depth 0. Leaf edge-height 0. Code returning 1+max(child) counts nodes/levels; edges = result−1 for nonempty tree.</p></article><article><span>02 · DFS</span><h3>N-L-R / L-N-R / L-R-N</h3><p>Print position decides preorder, inorder, postorder. BST inorder gives ascending values.</p></article><article><span>03 · BFS</span><h3>FIFO queue</h3><p>Pop front; append every child at rear. O(n) time and up to O(n) width space.</p></article><article><span>04 · BST</span><h3>Global invariant</h3><p>All left descendants smaller; all right descendants larger. Search/insert/delete O(h), not always O(log n).</p></article><article><span>05 · DELETE</span><h3>Three cases</h3><p>0 child → None. 1 child → child. 2 children → successor from right subtree, then remove old successor.</p></article><article><span>06 · TREE DP</span><h3>Children → parent</h3><p>Base case on None; postorder child results combine. Max-path global candidate may use both gains; returned gain only one.</p></article></section>`;document.querySelector(`#app`).innerHTML=`
<div class="read-progress"><span></span></div>
<header class="topbar"><a class="brand" href="#top"><b>DA</b><span><strong>Python + DSA</strong><small>GATE 2027 Notebook</small></span></a><nav><button class="tab active" data-view="notes">Detailed Notes</button><button class="tab" data-view="pyq">PYQ Evidence <i>2</i></button><button class="tab" data-view="practice">Practice <i>${j}</i></button><button class="tab" data-view="revision">Revision</button></nav><div class="actions"><button id="searchButton" aria-label="Search">⌕</button><button id="themeButton" aria-label="Theme">◐</button></div></header>
<div class="searchbox"><input id="search" type="search" placeholder="Search: preorder, BST, height, LCA…"><span>Search current view</span></div>
<div class="layout" id="top"><aside class="sidebar"><p class="overline">Module 12</p><h2>Trees</h2><div class="module-switch">${F}<a class="active" href="./module12.html">M12</a></div><div class="completion"><span><b>Lecture progress</b><i id="count">0/${l.length}</i></span><div><i id="bar"></i></div></div><nav id="toc"></nav><p class="source"><b>Sources</b>Supplied CampusX Trees notebooks · supplied GATE DA Section 4 syllabus · <a href="${I}" target="_blank" rel="noopener">GATE 2024 DA paper</a> and <a href="${L}" target="_blank" rel="noopener">final key</a></p></aside><main>
<div class="view active" data-panel="notes">
<section class="hero searchable" data-title="Overview"><p class="eyebrow"><i></i> Module 12 · start at the root</p><h1>Tree ko <em>branch by branch</em> trace karo.</h1><p>Ek hi example A–F se terms, traversals aur recursion samjhenge; phir BST aur N-ary tree par har link, comparison aur return value manually follow karenge.</p><div class="metrics"><span><b>${l.length}</b>lecture sessions</span><span><b>${j}</b>generated drills</span><span><b>2</b>direct 2024 PYQs</span></div><div class="syllabus"><b>GATE DA syllabus map</b>Section 4 explicitly includes trees. Lecture flow exactly 12.1–12.9 follows supplied screenshots; advanced coding-problem topics reinforce recursion and tree traversal.</div></section>
<section class="lecture-track searchable" id="lecture-track" data-title="Module 12 lecture tracker"><div class="track-head"><div><p class="eyebrow"><i></i> Course lecture order</p><h2>Module 12 · Lecture Tracker</h2><p>Each lecture ke end par same-topic practice link hai. Progress locally saved rahega.</p></div><strong id="lecturePercent">0%</strong></div><div class="lecture-list">${N}</div></section>
${p}
</div>
<div class="view" data-panel="pyq"><section class="page-hero searchable" data-title="Trees PYQ Evidence"><p class="eyebrow"><i></i> Official 2024 DA paper</p><h1>Tree PYQ Lab</h1><p>Do direct MSQs: Q28 traversal reconstruction, Q52 tree properties. Options select karke answer check karo. Final key dono ke liye A, B, C hai.</p><div class="practice-summary"><span><b>2</b>direct PYQs</span><span><b>MSQ</b>multiple correct</span><span><b>2024</b>official key</span></div></section><section class="pyq-list">${te}</section></div>
<div class="view" data-panel="practice"><section class="page-hero practice-head searchable" data-title="Practice Lab"><p class="eyebrow"><i></i> Lecture-wise GATE-style drills</p><h1>Module 12 Practice</h1><p>${j} generated practice variants · ${l.length} lecture sets · 50 per lecture. Ye PYQs nahi hain.</p><div class="practice-summary"><span><b>${l.length}</b>lecture sets</span><span><b>50</b>each</span><span><b>saved</b>attempt progress</span></div></section><section class="practice-controls searchable"><div><label for="practiceTopic">Lecture topic</label><select id="practiceTopic">${P}</select></div><div><label for="practiceDifficulty">Difficulty</label><select id="practiceDifficulty"><option value="all">All levels</option><option>Foundation</option><option>Core</option><option>GATE</option></select></div><div class="practice-score"><span>Attempted</span><b id="practiceScore">0/0</b></div></section><section class="practice-context" id="practiceContext"></section><section class="question-list" id="questionList"></section></div>
<div class="view" data-panel="revision"><section class="page-hero revision-head searchable" data-title="Trees revision"><p class="eyebrow"><i></i> GATE DA · quick recall</p><h1>Trees Quick Revision</h1><p>Height convention, traversal order, BST invariant aur child-to-parent recursion ek page par.</p><button id="print">Print sheet</button></section>${ne}</div>
</main></div><button class="menu" id="menu">☰</button><div class="toast">Copied</div>`,document.querySelectorAll(`.tree-diagram.is-wide .tree-diagram-scroll`).forEach(e=>{e.scrollLeft=(e.scrollWidth-e.clientWidth)/2}),document.querySelectorAll(`.traversal-plate`).forEach(e=>{let t=[...e.querySelectorAll(`.traversal-plate-controls button`)];t.forEach(n=>n.addEventListener(`click`,()=>{let r=n.dataset.plateStep;t.forEach(e=>e.setAttribute(`aria-pressed`,String(e===n))),e.querySelectorAll(`svg [data-plate-step]`).forEach(e=>{e.classList.toggle(`is-active`,e.dataset.plateStep===r)})}))});var z=[...document.querySelectorAll(`.tab`)],B=[...document.querySelectorAll(`.view`)],V=document.querySelector(`#practiceTopic`),H=document.querySelector(`#practiceDifficulty`),U=document.querySelector(`#search`);function W(e){z.forEach(t=>t.classList.toggle(`active`,t.dataset.view===e)),B.forEach(t=>t.classList.toggle(`active`,t.dataset.panel===e)),window.scrollTo({top:0,behavior:`smooth`})}z.forEach(e=>e.onclick=()=>W(e.dataset.view));function G(){let e=A.find(e=>e.id===V.value),t=e.questions.filter(e=>H.value===`all`||e.difficulty===H.value),n=JSON.parse(localStorage.getItem(`da-m12-practice`)||`{}`),r=t=>`${e.id}-${t.id}`,i=()=>{let e=t.filter(e=>n[r(e)]).length,i=t.filter(e=>n[r(e)]?.correct).length;document.querySelector(`#practiceScore`).textContent=`${e}/${t.length} · ${i} correct`};i(),document.querySelector(`#practiceContext`).innerHTML=`<div><span>LECTURE TOPIC</span><h2>${M(e.label)}</h2><p>Option choose karo; sahi/galat aur short reasoning immediately dikhegi.</p></div><strong>${t.length} shown</strong>`,document.querySelector(`#questionList`).innerHTML=t.map((e,t)=>{let i=n[r(e)]?.selection,a=typeof i==`string`,o=i===e.answer;return`<article class="question-card ${a?o?`answered-correct`:`answered-wrong`:``}" data-question-index="${t}"><div class="question-card-meta"><span>Q${String(t+1).padStart(2,`0`)}</span><small>${M(e.difficulty)}</small></div><h3>${M(e.prompt)}</h3><div class="options" role="group" aria-label="Question ${t+1} options">${e.options.map((t,n)=>`<button type="button" data-option-index="${n}" class="${a&&t===e.answer?`correct`:``} ${a&&t===i&&!o?`wrong`:``}" ${a?`disabled`:``}><b>${String.fromCharCode(65+n)}</b><span>${M(t)}</span></button>`).join(``)}</div><div class="question-feedback ${a?o?`is-correct`:`is-wrong`:``}" role="status" ${a?``:`hidden`}><strong>${a?o?`✓ Sahi jawab`:`✗ Galat jawab`:``}</strong><p><b>Correct option:</b> ${M(e.answer)}</p><p>${M(e.explanation)}</p></div></article>`}).join(``),document.querySelectorAll(`.question-card .options button`).forEach(e=>e.onclick=()=>{let a=e.closest(`.question-card`),o=t[Number(a.dataset.questionIndex)],s=o.options[Number(e.dataset.optionIndex)];if(n[r(o)]?.selection)return;let c=s===o.answer;n[r(o)]={selection:s,correct:c},localStorage.setItem(`da-m12-practice`,JSON.stringify(n)),a.classList.add(c?`answered-correct`:`answered-wrong`),a.querySelectorAll(`.options button`).forEach(e=>{let t=o.options[Number(e.dataset.optionIndex)];e.disabled=!0,e.classList.toggle(`correct`,t===o.answer),e.classList.toggle(`wrong`,t===s&&!c)});let l=a.querySelector(`.question-feedback`);l.hidden=!1,l.classList.add(c?`is-correct`:`is-wrong`),l.querySelector(`strong`).textContent=c?`✓ Sahi jawab`:`✗ Galat jawab`,i()})}V.onchange=G,H.onchange=G,G();var K=document.querySelector(`#toc`);K.innerHTML=[...document.querySelectorAll(`[data-panel="notes"] .searchable`)].map((e,t)=>`<a href="#${e.id||`top`}"><span>${String(t+1).padStart(2,`0`)}</span>${e.dataset.title}</a>`).join(``);var q=JSON.parse(localStorage.getItem(`da-m12-lectures`)||`{}`),J=[...document.querySelectorAll(`[data-lecture]`)];function Y(){let e=J.filter(e=>e.checked).length;document.querySelector(`#count`).textContent=`${e}/${l.length}`,document.querySelector(`#bar`).style.width=`${e/l.length*100}%`,document.querySelector(`#lecturePercent`).textContent=`${Math.round(e/l.length*100)}%`}J.forEach(e=>{e.checked=!!q[e.dataset.lecture],e.onchange=()=>{q[e.dataset.lecture]=e.checked,localStorage.setItem(`da-m12-lectures`,JSON.stringify(q)),Y()}}),Y(),A.forEach(e=>document.getElementById(e.id).insertAdjacentHTML(`beforeend`,`<button class="topic-practice" data-practice-topic="${e.id}">Is topic ke ${e.questions.length} questions solve karo →</button>`)),document.querySelectorAll(`[data-practice-topic]`).forEach(e=>e.onclick=()=>{V.value=e.dataset.practiceTopic,H.value=`all`,G(),W(`practice`)}),document.querySelectorAll(`.codebox button`).forEach(e=>e.onclick=async()=>{await navigator.clipboard.writeText(e.closest(`.codebox`).querySelector(`code`).textContent);let t=document.querySelector(`.toast`);t.classList.add(`show`),setTimeout(()=>t.classList.remove(`show`),1200)}),document.querySelector(`#searchButton`).onclick=()=>{document.querySelector(`.searchbox`).classList.toggle(`open`),U.focus()},U.oninput=()=>{let e=U.value.toLowerCase();document.querySelector(`.view.active`).querySelectorAll(`.searchable`).forEach(t=>t.hidden=!!e&&!t.textContent.toLowerCase().includes(e))},document.querySelector(`#themeButton`).onclick=()=>{document.documentElement.classList.toggle(`dark`),localStorage.setItem(`da-theme`,document.documentElement.classList.contains(`dark`)?`dark`:`light`)},localStorage.getItem(`da-theme`)!==`light`&&document.documentElement.classList.add(`dark`),document.querySelector(`#menu`).onclick=()=>document.querySelector(`.sidebar`).classList.toggle(`open`),document.querySelector(`#print`).onclick=()=>window.print();var X=document.querySelector(`.read-progress span`);window.addEventListener(`scroll`,()=>{let e=document.documentElement.scrollHeight-window.innerHeight;X.style.width=`${e?window.scrollY/e*100:0}%`}),document.querySelectorAll(`.tree-pyq`).forEach(e=>e.querySelector(`.tree-pyq-check`).onclick=()=>{let t=R.find(t=>t.number===e.dataset.pyq),n=[...e.querySelectorAll(`input:checked`)].map(e=>e.value).sort().join(`,`)===t.correct.join(`,`),r=e.querySelector(`.question-feedback`);r.hidden=!1,r.classList.toggle(`is-correct`,n),r.classList.toggle(`is-wrong`,!n),r.innerHTML=`<strong>${n?`✓ Sahi`:`✗ Try again · official key A, B, C`}</strong><p>${t.why}</p>`});var re={pre:[`A`,`B`,`D`,`E`,`C`,`F`],in:[`D`,`B`,`E`,`A`,`F`,`C`],post:[`D`,`E`,`B`,`F`,`C`,`A`],level:[`A`,`B`,`C`,`D`,`E`,`F`]},Z={A:[280,32],B:[155,110],C:[405,110],D:[90,190],E:[220,190],F:[350,190]},ie=[[`A`,`B`],[`A`,`C`],[`B`,`D`],[`B`,`E`],[`C`,`F`]],Q=0;function $(){let e=document.querySelector(`#treeOrder`).value,t=re[e],n=t.slice(0,Q),r=n.at(-1),i=ie.map(([e,t])=>`<line x1="${Z[e][0]}" y1="${Z[e][1]}" x2="${Z[t][0]}" y2="${Z[t][1]}" />`).join(``),a=Object.entries(Z).map(([e,[t,i]])=>`<g class="${r===e?`current`:n.includes(e)?`visited`:``}"><circle cx="${t}" cy="${i}" r="25"/><text x="${t}" y="${i+6}" text-anchor="middle">${e}</text></g>`).join(``);document.querySelector(`#treeStage`).innerHTML=`<svg viewBox="0 0 560 240" role="img" aria-label="A root; B and C children; D and E under B; F under C">${i}${a}</svg><div class="tree-lab-progress"><b>Visited (${Q}/6)</b><span>${n.length?n.join(` → `):`—`}</span><b>Remaining</b><span>${t.slice(Q).join(` → `)||`done`}</span></div>`,document.querySelector(`#treeStepText`).textContent=Q?`Step ${Q}: ${r} node visit hua. ${e===`level`?`Queue front se pop aur children rear par add.`:`Current subtree par traversal rule apply karo.`}`:`Ready: ${e} choose karo, phir Step dabao. Pehla visited node ${t[0]} hoga.`,document.querySelector(`#treePrev`).disabled=Q===0,document.querySelector(`#treeNext`).disabled=Q===t.length}document.querySelector(`#treeOrder`).onchange=()=>{Q=0,$()},document.querySelector(`#treePrev`).onclick=()=>{Q=Math.max(0,Q-1),$()},document.querySelector(`#treeNext`).onclick=()=>{Q=Math.min(6,Q+1),$()},document.querySelector(`#treeReset`).onclick=()=>{Q=0,$()},$();