const esc = value => String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')
export const codebox = (label, code) => `<div class="codebox green"><div><span>${label}</span><button type="button">Copy</button></div><pre><code>${esc(code)}</code></pre></div>`
const section = (no, id, label, title, note, body) => `<section class="chapter searchable" id="${id}" data-title="${no} · ${label}"><div class="chapter-head"><div class="chapter-no"><span>${no}</span><small>${label.toUpperCase()}</small></div><div><h2>${title}</h2><p>${note}</p></div></div>${body}</section>`
const table = (heads, rows) => `<div class="table-wrap"><table><thead><tr>${heads.map(x => `<th>${x}</th>`).join('')}</tr></thead><tbody>${rows.map(row => `<tr>${row.map(x => `<td>${x}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`
const diagram = (label, art, activeValue = null) => {
  const lines = art.split('\n')
  const nodeRows = []
  const connectorRows = []
  lines.forEach((line, lineIndex) => {
    if (/^[\s/\\|]+$/.test(line) && /[/\\|]/.test(line)) {
      connectorRows.push({ lineIndex, connectors: [...line.matchAll(/[/\\|]/g)].map(match => ({ type: match[0], x: match.index })) })
    } else {
      const nodes = [...line.matchAll(/\S+/g)].map((match, index) => ({
        id: `${nodeRows.length}-${index}`,
        value: match[0],
        x: match.index + match[0].length / 2,
        level: nodeRows.length
      }))
      if (nodes.length) nodeRows.push({ lineIndex, nodes })
    }
  })
  const nodes = nodeRows.flatMap(row => row.nodes)
  const edges = []
  for (let level = 0; level < nodeRows.length - 1; level++) {
    const between = connectorRows.find(row => row.lineIndex > nodeRows[level].lineIndex && row.lineIndex < nodeRows[level + 1].lineIndex)
    if (!between) break
    for (const connector of between.connectors) {
      const parentCandidates = nodeRows[level].nodes.filter(node => connector.type === '/' ? node.x >= connector.x - 1 : connector.type === '\\' ? node.x <= connector.x + 1 : true)
      const childCandidates = nodeRows[level + 1].nodes.filter(node => connector.type === '/' ? node.x <= connector.x + 1 : connector.type === '\\' ? node.x >= connector.x - 1 : true)
      const closest = list => list.reduce((best, node) => !best || Math.abs(node.x - connector.x) < Math.abs(best.x - connector.x) ? node : best, null)
      const parent = closest(parentCandidates)
      const child = closest(childCandidates)
      if (parent && child) edges.push([parent, child])
    }
  }
  if (!nodes.length || edges.length !== nodes.length - 1 || new Set(edges.map(([, child]) => child.id)).size !== nodes.length - 1) {
    return `<div class="tree-ascii"><span>${esc(label)}</span><pre>${esc(art)}</pre></div>`
  }
  const minX = Math.min(...nodes.map(node => node.x))
  const span = (Math.max(...nodes.map(node => node.x)) - minX) * 28
  const width = Math.max(440, Math.ceil(span + 140))
  const height = nodeRows.length * 104 + 34
  const point = node => ({ x: Math.round((width - span) / 2 + (node.x - minX) * 28), y: node.level * 104 + 56 })
  const linesSvg = edges.map(([parent, child]) => {
    const from = point(parent)
    const to = point(child)
    return `<line x1="${from.x}" y1="${from.y + 25}" x2="${to.x}" y2="${to.y - 25}"/>`
  }).join('')
  let activeMatches = 0
  const nodesSvg = nodes.map(node => {
    const { x, y } = point(node)
    const kind = node.level === 0 ? 'root' : edges.some(([parent]) => parent.id === node.id) ? 'internal' : 'leaf'
    const targetValue = typeof activeValue === 'object' && activeValue !== null ? activeValue.value : activeValue
    const matches = targetValue !== null && String(targetValue) === node.value
    const active = matches && (typeof activeValue !== 'object' || activeMatches === activeValue.occurrence)
    if (matches) activeMatches++
    return `<g class="tree-diagram-node ${kind}${active ? ' is-active' : ''}"><circle cx="${x}" cy="${y}" r="25"/><text x="${x}" y="${y}" dominant-baseline="central" text-anchor="middle">${esc(node.value)}</text></g>`
  }).join('')
  const levelsSvg = nodeRows.map((_, index) => `<text class="tree-diagram-level" x="12" y="${index * 104 + 60}">L${index + 1}</text>`).join('')
  return `<figure class="tree-diagram${nodes.length > 7 ? ' is-wide' : ''}"><figcaption>${esc(label)}</figcaption><div class="tree-diagram-scroll"><svg viewBox="0 0 ${width} ${height}" role="img" aria-label="${esc(label)}: ${esc(nodes.map(node => node.value).join(', '))}"><g class="tree-diagram-edges">${linesSvg}</g>${levelsSvg}${nodesSvg}</svg></div></figure>`
}
const idea = (label, title, body) => `<div class="hash-foundation"><span>${label}</span><h3>${title}</h3><p>${body}</p></div>`
const steps = (...items) => `<div class="hash-step-list">${items.map(x => `<p>${x}</p>`).join('')}</div>`
const trap = body => `<div class="danger"><b>GATE trap</b><p>${body}</p></div>`
const checkpoint = (...items) => `<div class="bst-checkpoints"><strong>Quick checks · practice, not official PYQ</strong>${items.map(([question, answer]) => `<details><summary>${esc(question)}</summary><p>${answer}</p></details>`).join('')}</div>`
const heightDepthLab = () => {
  const nodes = [{value:10,label:'A',x:350,y:55},{value:20,label:'B',x:210,y:145},{value:30,label:'C',x:495,y:145},{value:40,label:'D',x:125,y:235},{value:50,label:'E',x:300,y:235},{value:60,label:'F',x:370,y:325}]
  const edges = [[10,20],[10,30],[20,40],[20,50],[50,60]]
  const position = Object.fromEntries(nodes.map(node => [node.value,node]))
  return `<div class="depth-lab" data-depth-lab data-mode="depth">
    <div class="depth-lab-heading"><div><span>INTERACTIVE · SAME TREE, TWO DIRECTIONS</span><h3>Node choose karo; path follow karo</h3></div><div class="depth-lab-modes" role="group" aria-label="Path to highlight"><button type="button" data-depth-mode="depth" aria-pressed="true">Depth path</button><button type="button" data-depth-mode="height" aria-pressed="false">Height path</button><button type="button" data-depth-mode="tree" aria-pressed="false">Tree height</button></div></div>
    <div class="depth-lab-nodes" role="group" aria-label="Choose tree node">${nodes.map(node => `<button type="button" data-depth-node="${node.value}" aria-pressed="${node.value === 50}">${node.value} · ${node.label}</button>`).join('')}</div>
    <div class="depth-lab-figure"><svg viewBox="0 0 700 390" role="img" aria-label="Tree rooted at 10: 20 and 30 are children; 40 and 50 are children of 20; 60 is right child of 50"><g class="depth-lab-edges">${edges.map(([from,to]) => `<line data-depth-edge="${from}-${to}" x1="${position[from].x}" y1="${position[from].y+24}" x2="${position[to].x}" y2="${position[to].y-24}"/>`).join('')}</g>${nodes.map(node => `<g class="depth-lab-node" data-depth-svg-node="${node.value}"><circle cx="${node.x}" cy="${node.y}" r="26"/><text x="${node.x}" y="${node.y}" text-anchor="middle" dominant-baseline="central">${node.value}</text><text class="depth-lab-alias" x="${node.x}" y="${node.y+43}" text-anchor="middle">${node.label}</text></g>`).join('')}</svg><p data-depth-lab-caption>Depth of 50: 10 → 20 → 50 · 3 nodes / 2 edges.</p></div>
    <div class="depth-lab-facts"><div><small>Selected node depth · root → node</small><strong data-depth-value>3 nodes · 2 edges</strong><span data-depth-route>10 → 20 → 50</span></div><div><small>Selected node height · node → deepest leaf</small><strong data-height-value>2 nodes · 1 edge</strong><span data-height-route>50 → 60</span></div></div>
  </div>`
}
const bstTrace = (name, frames) => `<div class="bst-trace" data-bst-trace><div class="bst-trace-head"><div><span>STEP-BY-STEP EXECUTION</span><h3>${esc(name)}</h3></div><div class="bst-trace-controls"><button type="button" data-trace-prev>← Previous</button><span data-trace-count aria-live="polite">1 / ${frames.length}</span><button type="button" data-trace-next>Next →</button></div></div>${frames.map((frame, index) => `<div class="bst-trace-frame" data-trace-frame ${index ? 'hidden' : ''}><div class="bst-trace-facts"><p><b>Call / local root</b><span>${esc(frame.call)}</span></p><p><b>Active line</b><span><code>${esc(frame.line)}</code></span></p><p><b>Parent waiting for</b><span>${esc(frame.waiting)}</span></p><p><b>Return / connection</b><span>${esc(frame.result)}</span></p></div>${diagram(frame.caption, frame.art, frame.active)}<p class="bst-trace-note">${frame.note}</p></div>`).join('')}</div>`
const referenceChain = (title, ...parts) => `<div class="bst-reference-row"><b>${title}</b><div>${parts.map(part => `<span>${part}</span>`).join('<i>→</i>')}</div></div>`
const traversalPlate = (name, order) => {
  const positions = { A: [350, 69], B: [205, 163], C: [495, 163], D: [115, 265], E: [295, 265], F: [435, 265] }
  const edges = [['A','B'], ['A','C'], ['B','D'], ['B','E'], ['C','F']]
  const rank = Object.fromEntries(order.map((node, index) => [node, index + 1]))
  const plateX = index => 100 + index * 100
  const edgeSvg = edges.map(([from, to]) => `<line class="tree-edge" x1="${positions[from][0]}" y1="${positions[from][1] + 24}" x2="${positions[to][0]}" y2="${positions[to][1] - 24}"/>`).join('')
  const dropSvg = order.map((node, index) => {
    const [x, y] = positions[node]
    const route = node === 'A' && index === 0
      ? 'M 326 69 C 65 75 50 215 100 340'
      : node === 'A' && index === 5
        ? 'M 374 69 C 635 75 650 215 600 340'
        : `M ${x} ${y + 25} Q ${x} 318 ${plateX(index)} 340`
    return `<path class="drop-path${index === 0 ? ' is-active' : ''}" data-plate-step="${index + 1}" d="${route}" marker-end="url(#drop-arrow-${name.toLowerCase()})"/>`
  }).join('')
  const nodeSvg = Object.entries(positions).map(([node, [x, y]]) => `<g class="tree-node${rank[node] === 1 ? ' is-active' : ''}" data-plate-step="${rank[node]}"><circle cx="${x}" cy="${y}" r="24"/><text x="${x}" y="${y + 1}" text-anchor="middle" dominant-baseline="central">${node}</text><circle class="order-badge" cx="${x + 26}" cy="${y - 23}" r="13"/><text class="order-number" x="${x + 26}" y="${y - 22}" text-anchor="middle" dominant-baseline="central">${rank[node]}</text></g>`).join('')
  const slotSvg = order.map((node, index) => {
    const x = plateX(index)
    return `<g class="plate-slot${index === 0 ? ' is-active' : ''}" data-plate-step="${index + 1}"><rect x="${x - 32}" y="357" width="64" height="54" rx="10"/><text class="slot-rank" x="${x}" y="371" text-anchor="middle">${index + 1}</text><text class="slot-letter" x="${x}" y="397" text-anchor="middle">${node}</text></g>`
  }).join('')
  const controls = order.map((node, index) => `<button type="button" data-plate-step="${index + 1}" aria-pressed="${index === 0}">${index + 1} · ${node}</button>`).join('')
  return `<figure class="traversal-plate"><figcaption>${esc(name)}: tree ke nodes kis order mein plate par aate hain?</figcaption><p>Step select karo → us node ka lecture-style arrow plate ke slot tak dekho. Ek waqt par ek arrow, isliye lines cross nahi karti.</p><div class="traversal-plate-controls" role="group" aria-label="${esc(name)} visit step">${controls}</div><div class="traversal-plate-scroll"><svg viewBox="0 0 700 430" role="img" aria-label="${esc(name)} traversal: ${esc(order.join(' '))}"><defs><marker id="drop-arrow-${name.toLowerCase()}" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path class="drop-arrow-head" d="M0 0L10 5L0 10z"/></marker></defs><text class="plate-hint" x="350" y="28" text-anchor="middle">Orange badge = visit number</text><rect class="plate-base" x="47" y="345" width="606" height="75" rx="16"/>${edgeSvg}${dropSvg}${nodeSvg}${slotSvg}</svg></div><p><strong>Output: ${esc(order.join(' → '))}</strong></p></figure>`
}

export const lectureData = [
  ['12.1','Introduction','Tree vs list, root and children','intro'],
  ['12.2','Trees Terminology','Root, parent, child, leaf, depth, height and level','terminology'],
  ['12.3','Properties of a Tree','One root, parent links, no cycles, connected, N−1 edges','properties'],
  ['12.4','Tree Traversals','Visit every node in a defined order','traversals'],
  ['12.4.0','Creating a Tree','TreeNode and reference links','create-tree'],
  ['12.4.1','Preorder Traversal (theory)','Root, left, right','preorder-theory'],
  ['12.4.2','Preorder Traversal (code)','Recursive Python trace','preorder-code'],
  ['12.4.3','Inorder Traversal','Left, root, right','inorder'],
  ['12.4.4','Postorder Traversal','Left, right, root','postorder'],
  ['12.4.5','Level Order Traversal','Queue-based level-by-level visit','level-order'],
  ['12.4.6','Choice of Traversal','Pick order from dependency','choice'],
  ['12.5','BST','Ordering invariant','bst'],
  ['12.5.1','BST Initial Setup','Build the lecture tree','bst-setup'],
  ['12.5.2','Insertion in BST','Compare and descend','bst-insert'],
  ['12.5.3','Searching in BST','One path, not full scan','bst-search'],
  ['12.5.4','Deletion in BST','Zero, one or two children','bst-delete'],
  ['12.6','N-ary Tree','A node may have many children','nary'],
  ['12.6.1','Initial Setup for N-ary Tree','children list','nary-setup'],
  ['12.6.2','Preorder on N-ary Tree','Node, then children','nary-pre'],
  ['12.6.3','Postorder on N-ary Tree','Children, then node','nary-post'],
  ['12.6.4','Level Order on N-ary Tree','Queue all children','nary-level'],
  ['12.7','DP on Trees','Child answers combine at parent','tree-dp'],
  ['12.8.1','Calculate Depth of a Tree','Recursive maximum depth','max-depth'],
  ['12.8.2','Count Nodes in a Tree','1 + left + right','count-nodes'],
  ['12.8.3','Sum of Nodes in Tree','value + left + right','sum-nodes'],
  ['12.8.4','Validate BST','Ancestor bounds','validate-bst'],
  ['12.8.5','Lowest Common Ancestor','BST split point','lca'],
  ['12.8.6','Kth Smallest in BST','Inorder rank','kth'],
  ['12.8.7','Maximum Value in N-ary Tree','Compare child maxima','nary-max'],
  ['12.8.8','Height of N-ary Tree','Max child height','nary-height'],
  ['12.8.9','Maximum Path Sum','Two gains vs one return','max-path'],
  ['12.8.10','Sum of Left Leaf Nodes','Left AND leaf','left-leaves'],
  ['12.9','DS Context','Which tree tool fits?','context']
]

const binaryArt = `        A
       / \\
      B   C
     / \\  /
    D   E F`
const bstArt = `        40
       /  \\
     30    50
    /  \\  /  \\
  25   35 45  60`
const naryArt = `          10
       /   |   \\
     20    30   40
   / | \\   |   / \\
 50 60 70  80 90 100`

const binarySetup = `class TreeNode:
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
C.left = F`
const preorder = `def preorder_traversal(node):
    if not node:
        return

    print(node.val, end=' ')
    preorder_traversal(node.left)
    preorder_traversal(node.right)

preorder_traversal(A)  # A B D E C F`
const inorder = `def inorder_traversal(node):
    if not node:
        return

    inorder_traversal(node.left)
    print(node.val, end=' ')
    inorder_traversal(node.right)

inorder_traversal(A)  # D B E A F C`
const postorder = `def postorder_traversal(node):
    if not node:
        return

    postorder_traversal(node.left)
    postorder_traversal(node.right)
    print(node.val, end=' ')

postorder_traversal(A)  # D E B F C A`
const level = `from collections import deque

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

level_order_traversal(A)  # A B C D E F`

const intro = section('12.1','intro','Introduction','Tree: one root se branches','Linked list ek chain thi; tree mein ek node se multiple branches nikal sakti hain.',`
  ${idea('ZERO START','Node kya hai?','Node ek object hai jisme data aur child references hote hain. Binary tree node ke <code>left</code> aur <code>right</code> references hain. <code>None</code> ka matlab us direction mein child nahi. Root ko point karne wala variable poore reachable tree ka entry point hai.')}
  ${diagram('Pehle isi six-node example ko pakdo',binaryArt)}
  ${steps('<b>Reference reading:</b> <code>A.left</code> B node ko point karta hai; <code>B.right</code> E node ko. <code>F.left is None</code> because F ka left child nahi.','<b>Unique path:</b> A se E tak path A → B → E hai. Tree mein root se kisi node tak exactly one parent-child path hota hai; cycle nahi hoti.')}
  ${trap('Picture ka left/right screen placement aur actual <code>node.left</code>/<code>node.right</code> references same hone chahiye. Node labels sorted hon zaroori nahi—sirf BST mein ordering rule aata hai.')}
`)
const terminology = section('12.2','terminology','Trees Terminology','Har word ko A–F par point karke samjho','Lecture ke root, parent, child, leaf, depth, height, level aur subtree—plus useful related terms.',`
  ${diagram('Reference tree',binaryArt)}
  ${table(['Term','Lecture meaning','A–F example'],[['Root','Topmost node; is tree ke andar parent nahi','A'],['Parent','Immediate predecessor: ek edge upar wala node','B is parent of D and E'],['Child','Immediate successor: ek edge neeche wala node','D and E are children of B'],['Leaf','Node with no children','D, E, F'],['Depth','Root se node tak distance, edges count','A: 0; B/C: 1; D/E/F: 2'],['Height','Node se deepest leaf tak longest path, edges count','D/E/F: 0; B/C: 1; A: 2'],['Level','Depth + 1 (lecture convention)','A: 1; B/C: 2; D/E/F: 3'],['Subtree','Kisi node se bana tree: node + all descendants','B subtree: B,D,E'],['Siblings','Same parent','D and E'],['Internal node','At least one child','A, B, C'],['Ancestor / descendant','Parent chain upar / child chain neeche','A and B are ancestors of E; E is their descendant']])}
  ${steps('<b>Depth vs level:</b> A root ki edge-depth 0 but level 1. E tak A→B→E mein 2 edges hain, so E ki edge-depth 2 aur level 3.','<b>Height:</b> E leaf ki edge-height 0; B se deepest leaf tak 1 edge; A se deepest leaf tak 2 edges. Section 12.8.1 ka <code>height_in_nodes(A)</code> 3 nodes return karega; edge-height = 3−1 = 2.')}
  ${trap('Depth aur height alag directions mein count karte hain. Question “height in edges” vs “height in nodes/levels” specify kare toh wahi convention use karo.')}
`)
const properties = section('12.3','properties','Properties of a Tree','Pehle tree ki structure pakdo, phir formulas','Lecture ke five core rules: one root, parent–child relationship, no cycles, connectedness, aur N−1 edges.',`
  ${diagram('Har rule isi six-node rooted tree par dekho',binaryArt)}
  ${table(['Lecture property','Exactly kya matlab?','A–F example'],[['Exactly one root','Starting node A ka parent nahi; tree ke sab nodes A se reachable hain','A only'],['Parent–child relationship','Root ko chhodkar har node ka exactly one parent. Ek node ke zero ya more children ho sakte hain','B ka parent A; B ke children D,E; D ke zero children'],['No cycles','Child links follow karte hue kisi already visited ancestor par wapas nahi pahunch sakte','A→B→D ke baad D→A edge nahi ho sakti'],['Connected structure','Root se har node tak path available hai','A→C→F se F reachable hai'],['Edges count rule','N nodes wale nonempty tree mein exactly N−1 edges','6 nodes; A–B, A–C, B–D, B–E, C–F = 5 edges']])}
  ${steps('<b>Why N−1 edges?</b> A root ko parent edge nahi chahiye. Baaki 5 nodes B,C,D,E,F mein har ek ko exactly one incoming parent edge chahiye: 0+5=5. General case 0+(N−1)=N−1.','<b>Disconnected test:</b> Agar G ek alag node hai aur A se G tak koi path nahi, then A–F plus G ek tree nahi, forest hai.','<b>Cycle test:</b> Agar D ko A se connect back kar do, A→B→D→A loop banega; structure tree nahi rahega.')}
  ${trap('“Tree mein cycle nahi hoti” ka matlab graphs mein hamesha cycle hoti hai nahi: tree khud ek connected, acyclic graph hai. Sirf N−1 edges dekhkar tree declare mat karo—connectedness bhi check karo.')}
`)
const traversals = section('12.4','traversals','Tree Traversals','Har node visit karo—par kis order mein?','Tree non-linear hai: array ya linked list jaisa ek natural left-to-right order nahi. Traversal problem ke hisaab se systematic visit order choose karta hai.',`
  ${idea('LECTURE START','Tree traversal kya hai?','Tree ke <b>har node ko exactly once process</b> karna. Do questions pucho: (1) sab nodes tak kaise pahunchenge? (2) unhe kis order mein process/print karenge? Isi se traversal strategy choose hoti hai.')}
  ${diagram('Har traversal isi tree par',binaryArt)}
  ${steps('<b>First question:</b> A ko kab print karna hai—B/C se pehle, beech mein, ya dono ke baad? Isse preorder, inorder, postorder ka difference samajh aayega.','<b>Another option:</b> Branch ke bajaye same level ke nodes saath visit karo: A, phir B/C, phir D/E/F. Isse level order milta hai.')}
  ${table(['Order','Simple rule','A–F output'],[['Preorder','Node → left → right','A B D E C F'],['Inorder','Left → node → right','D B E A F C'],['Postorder','Left → right → node','D E B F C A'],['Level order','Level-by-level, left-to-right','A B C D E F']])}
  ${idea('TRY IT','Traversal Explorer','Neeche algorithm choose karke Step dabao. Highlighted node abhi visit hua hai; visited prefix aur remaining nodes separately dekho. Rule ko har subtree par dobara apply karo—sirf top root par nahi.')}
  <div class="tree-lab" id="treeLab"><div class="tree-lab-controls"><label>Order <select id="treeOrder"><option value="pre">Preorder · N L R</option><option value="in">Inorder · L N R</option><option value="post">Postorder · L R N</option><option value="level">Level order · queue</option></select></label><button type="button" id="treePrev">← Previous</button><button type="button" id="treeNext">Step →</button><button type="button" id="treeReset">Restart</button></div><div id="treeStage"></div><p id="treeStepText" aria-live="polite"></p></div>
  ${trap('Pre/In/Post mein “visit” print/process line ki position se decide hota hai. Level order mein same depth wale nodes pehle aate hain.')}
`)
const createTree = section('12.4.0','create-tree','Creating a Tree','Object banao, phir references jodo','Lecture notebook ka exact A–F shape.',`
  ${codebox('Lecture setup · binary TreeNode',binarySetup)}
  ${diagram('After assignments',binaryArt)}
  ${steps('<b>Before edges:</b> six separate objects hain; sabke <code>left/right=None</code>.','<b><code>A.left = B</code>:</b> A se B ka reference connect hua. B copy nahi hua.','<b><code>C.left = F</code>:</b> F A → C → F path se reachable hua. <code>A</code> root variable hai; A se saare six nodes mil sakte hain.')}
  ${trap('Missing child <code>None</code> hai. String label <code>"A"</code> aur variable <code>A</code> alag cheezein hain.')}
`)
const preTheory = section('12.4.1','preorder-theory','Preorder Traversal (theory)','Node ko children se PEHLE visit karo','N-L-R: current node, complete left subtree, complete right subtree.',`
  ${idea('ROOT → LEFT → RIGHT','Preorder mein kab likhna hai?','Node par <b>pahunchte hi</b> uska letter output line par likho. Uske baad poora left subtree, phir poora right subtree. Ye rule A par hi nahi, B aur C par bhi dobara lagta hai.')}
  ${traversalPlate('Preorder',['A','B','D','E','C','F'])}
  ${steps('<b>Visual trace:</b> A aur B turant plate par; D/E se B branch complete; uske baad C/F. <code>A B D E C F</code>.')}
  ${trap('Preorder ka “root first” har recursive subtree ke root par apply hota hai. A ke baad C nahi aata; A ka left subtree pehle complete hota hai.')}
`)
const preCode = section('12.4.2','preorder-code','Preorder Traversal (code)','Print line recurse se pehle hai','Code ka order hi output order hai.',`
  ${codebox('Lecture Python · preorder',preorder)}
  ${table(['Execution','node points to','Action'],[['preorder(A)','A','Print A; call left B'],['preorder(B)','B','Print B; call left D'],['preorder(D)','D','Print D; None children return'],['resume B','B','Call right E; print E'],['resume A','A','Call right C; print C'],['preorder(F)','F','C.left prints F; finish']])}
  ${steps('<b><code>if not node</code>:</b> None child mila toh return; no print.','<b>Time:</b> each n node once → O(n). <b>Auxiliary space:</b> recursive call stack O(h) where h is height in nodes; balanced O(log n), skewed O(n).')}
`)
const inOrder = section('12.4.3','inorder','Inorder Traversal','Left subtree, THEN node, THEN right','L-N-R. BST mein sorted order milta hai; arbitrary binary tree mein nahi.',`
  ${idea('LEFT → ROOT → RIGHT','Inorder mein kab likhna hai?','Node par pahunchkar <b>abhi mat likho</b>. Pehle uska poora left subtree likho, phir node ko output line par likho, phir right subtree. Har chhote subtree par bhi yahi rule.')}
  ${traversalPlate('Inorder',['D','B','E','A','F','C'])}
  ${steps('<b>Visual trace:</b> A/B ko hold karo → D, B, E plate par; ab A; phir F, C. <code>D B E A F C</code>.')}
  ${codebox('Lecture Python · inorder',inorder)}
  ${trap('Inorder output D B E A F C alphabetical/sorted nahi hai because A–F example BST nahi. Sorted guarantee only when BST ordering invariant holds.')}
`)
const postOrder = section('12.4.4','postorder','Postorder Traversal','Children ke answers pehle; parent last','L-R-N: subtree cleanup / bottom-up computation ka natural order.',`
  ${idea('LEFT → RIGHT → ROOT','Postorder mein kab likhna hai?','Node par pahunchkar <b>abhi mat likho</b>. Left aur right dono subtrees complete hone do; wapas aate waqt parent ko output line par likho.')}
  ${traversalPlate('Postorder',['D','E','B','F','C','A'])}
  ${steps('<b>Visual trace:</b> D/E plate par girte hain, phir B; F ke baad C; poore tree ke baad A last. <code>D E B F C A</code>.')}
  ${codebox('Lecture Python · postorder',postorder)}
  ${trap('Postorder mein root A last hoga. Max-depth/tree-sum jaise functions pehle child return values compute karke parent answer banate hain.')}
`)
const levelOrder = section('12.4.5','level-order','Level Order Traversal','Queue front se nikalo, children rear par add karo','FIFO gives increasing depth order.',`
  ${codebox('Lecture Python · typo-corrected function name',level)}
  ${table(['Before pop: queue','Pop/print','Append children','After: queue'],[['[A]','A','B,C','[B,C]'],['[B,C]','B','D,E','[C,D,E]'],['[C,D,E]','C','F','[D,E,F]'],['[D,E,F]','D','—','[E,F]'],['[E,F]','E','—','[F]'],['[F]','F','—','[]']])}
  ${steps('<b><code>deque([node])</code>:</b> initially root queue mein. <code>popleft()</code> front node deta hai. Children left then right rear par lagte hain.','<b>Time:</b> O(n). <b>Auxiliary:</b> O(w), w = maximum queue width; worst O(n). Lecture notebook function name <code>level_order_traversa</code> tha; yahan spelling <code>traversal</code> kiya hai.')}
`)
const choice = section('12.4.6','choice','Choice of Traversal','Question ke dependency se traversal choose karo','Order memorise nahi; “parent kab process hoga?” pucho.',`
  ${table(['Goal','Choose','Why'],[['Parent ko children se pehle process','Preorder','Root first'],['BST values ascending','Inorder','Left < root < right'],['Child results se parent answer','Postorder','Children return first'],['Distance/levels from root','Level order','FIFO queue'],['Delete/free subtrees before parent','Postorder','Child cleanup first']])}
  ${idea('NOW GROUP THEM','DFS aur BFS ka connection','Ab four visit orders dekh liye: preorder, inorder aur postorder ek branch/subtree complete karte hain, so ye <b>Depth First Search (DFS)</b> ke forms hain. Level order ek level complete karke next level par jaata hai, so ye <b>Breadth First Search (BFS)</b> hai.')}
  ${table(['Category','Movement','Mechanism','Traversals'],[['DFS','Ek branch/subtree poori, phir sibling branch','Recursion ya stack','Preorder, Inorder, Postorder'],['BFS','Root se level-by-level, left-to-right','Queue (FIFO)','Level order']])}
  ${table(['Code mein process/print line kahan?','Recognize'],[['Left aur right recursive calls se PEHLE','Preorder · N-L-R'],['Left call ke BAAD, right call se PEHLE','Inorder · L-N-R'],['Dono calls ke BAAD','Postorder · L-R-N'],['Queue se pop, children enqueue','Level order · BFS']])}
  ${steps('<b>Recursive vs iterative DFS:</b> Recursion ka call stack current root-to-leaf path yaad rakhta hai. Iterative version explicit stack se wahi pending nodes track karta hai; traversal output order print/push timing se decide hota hai.','<b>Cost:</b> All four orders O(n) time. Recursive DFS O(h) auxiliary stack; level-order BFS O(w) queue, where w maximum width (worst O(n)).')}
  ${idea('RECONSTRUCTION','Which traversals identify a tree?','Distinct labels ke ordinary binary tree mein preorder + inorder, ya postorder + inorder uniquely reconstruct karte hain. Preorder + postorder generally enough nahi. <strong>Full binary tree</strong> (every internal node has two children) mein distinct labels ke saath preorder + postorder bhi enough ho sakte hain—2024 DA Q28 ka twist.')}
  ${trap('Inorder alone unique tree nahi banata. Full-tree assumption ko ignore karke preorder + postorder ko always insufficient bolna Q28 mein galat hoga.')}
`)

const bstSetup = `class TreeNode:
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
# 35 is inserted in the next lecture`
const bstInsert = `def insert(root, key):
    if root is None:
        return TreeNode(key)

    if key < root.val:
        root.left = insert(root.left, key)
    elif key > root.val:
        root.right = insert(root.right, key)

    return root

root = insert(root, 35)`
const bstSearch = `def search(node, key):
    if node is None:
        return None

    if node.val == key:
        return node

    if key < node.val:
        return search(node.left, key)
    return search(node.right, key)

found = search(root, 35)
print(found.val if found else None)  # 35`
const bstDelete = `def delete(node, key):
    if node is None:
        return None

    if key < node.val:
        node.left = delete(node.left, key)
    elif key > node.val:
        node.right = delete(node.right, key)
    else:
        # Case 1: leaf
        if node.left is None and node.right is None:
            return None

        # Case 2: one child
        if node.left is None:
            return node.right
        if node.right is None:
            return node.left

        # Case 3: two children
        succ = node.right
        while succ.left is not None:
            succ = succ.left

        node.val = succ.val
        node.right = delete(node.right, succ.val)

    return node

root = delete(root, 40)  # assign returned root`
const narySetup = `class Node:
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
node_40.children = [Node(90), Node(100)]`
const naryPre = `def preorder_traversal(node):
    if not node:
        return
    print(node.val, end=' ')
    for child in node.children:
        preorder_traversal(child)

preorder_traversal(root)
# 10 20 50 60 70 30 80 40 90 100`
const naryPost = `def postorder_traversal(node):
    if not node:
        return
    for child in node.children:
        postorder_traversal(child)
    print(node.val, end=' ')

postorder_traversal(root)
# 50 60 70 20 80 30 90 100 40 10`
const naryLevel = `from collections import deque

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
# 10 20 30 40 50 60 70 80 90 100`

const bst = section('12.5','bst','BST','Har node par LEFT smaller, RIGHT larger','Binary tree shape + global ordering invariant.',`
  ${diagram('Lecture tree after 35 insertion',bstArt)}
  ${steps('<b>Root 40:</b> left subtree ke all values 40 se smaller; right subtree ke all values 40 se larger. Sirf direct child comparison enough nahi.','<b>Node 30:</b> 25 left, 35 right. <b>Node 50:</b> 45 left, 60 right.','<b>Inorder:</b> 25, 30, 35, 40, 45, 50, 60 ascending because strict BST invariant holds.')}
  ${table(['Shape','Height in edges','Search/insert/delete'],[['Balanced-ish','O(log n)','O(log n)'],['Skewed chain','O(n)','O(n)']])}
  ${trap('BST automatically balanced nahi hota. Sorted insertion 10,20,30,40 ek right-skew chain bana sakta hai. Is notebook ka insert duplicate key ignore karta hai; question mein alag duplicate policy ho toh wahi follow karo.')}
`)
const insertBeforeArt = `        40
       /  \\
     30    50
    /     /  \\
  25     45  60`
const leafBeforeArt = `       40
      /
     30
    /
   20`
const leafAfterArt = `       40
      /
     30`
const oneChildBeforeArt = `       40
      /
     30
    /
   25`
const oneChildAfterArt = `       40
      /
     25`
const twoChildBeforeArt = `        60
       /
      30
     /  \\
    20   50
         /
        35
       /
      32`
const twoChildDuplicateArt = `        60
       /
      32
     /  \\
    20   50
         /
        35
       /
      32`
const twoChildAfterArt = `        60
       /
      32
     /  \\
    20   50
         /
        35`
const predecessorAfterArt = `        60
       /
      20
        \\
         50
         /
        35
       /
      32`
const bstInitial = section('12.5.1','bst-setup','BST Initial Setup','Lecture tree pehle manually create hota hai','35 abhi commented hai; insertion lecture mein add hoga.',`
  ${codebox('Lecture setup · 35 intentionally absent',bstSetup)}
  ${diagram('Before insert(35)',insertBeforeArt)}
  ${steps('<b>Node identity:</b> explanation mein A = 40 root, B = 30, C = 50, D = 25, aur insert ke baad E = 35 kahenge. Ye labels Python variables hona zaroori nahi; bas same objects ko trace karne ke names hain.','<b><code>root.left.left</code>:</b> A → B → D. <code>root.left.right</code> abhi None hai; 35 wahin aayega.','<b>Inorder before insertion:</b> 25, 30, 40, 45, 50, 60.')}
`)
const insert = section('12.5.2','bst-insert','Insertion in BST','Naya node return hota hai; parent uska reference save karta hai','Same lecture tree mein 35 ko 30 ke right par insert karenge. Duplicate values is code mein ignore hoti hain.',`
  ${codebox('Teaching Python · insert(35), duplicates ignored',bstInsert)}
  ${idea('THE KEY LINE','Assignment kyun?','<code>root.left = insert(root.left, key)</code> ko do statements samjho: <code>updated_subtree = insert(root.left, key)</code>; phir <code>root.left = updated_subtree</code>. Recursive call updated subtree ka <b>root object reference</b> deta hai; parent woh link save karta hai. Sirf <code>insert(root.left, key)</code> likhne se new child ko parent se connect karne wala returned reference use nahi hoga.')}
  ${bstTrace('Insert 35 · forward calls, then return flow',[
    {call:'insert(A, 35) · root = A(40)',line:'A.left = insert(B, 35)',waiting:'A waits for B subtree root',result:'Not returned yet',caption:'Before insertion · A(40) active',art:insertBeforeArt,active:40,note:'35 &lt; 40, so A ka LEFT subtree choose hua. A object abhi change nahi hua.'},
    {call:'insert(B, 35) · root = B(30)',line:'B.right = insert(None, 35)',waiting:'B waits for new right subtree root; A still waits for B',result:'Not returned yet',caption:'At B(30) · right link is empty',art:insertBeforeArt,active:30,note:'35 &gt; 30, so B ke RIGHT None par recursive call jaati hai. Har call ka apna local <code>root</code> hai.'},
    {call:'insert(None, 35) · root = None',line:'return TreeNode(35)',waiting:'B.right assignment pending; then A.left',result:'New E(35) object reference returned',caption:'E created, but B.right assignment abhi pending',art:insertBeforeArt,active:null,note:'E memory mein ban gaya, par tree diagram mein abhi nahi: parent ka link abhi E par point nahi kar raha.'},
    {call:'resume insert(B, 35) · root = B(30)',line:'B.right = E; return B',waiting:'A.left assignment pending',result:'B reference returned',caption:'B.right now points to E(35)',art:bstArt,active:35,note:'<code>return root</code> yahan B deta hai, kyunki is call ka local root B tha.'},
    {call:'resume insert(A, 35) · root = A(40)',line:'A.left = B; return A',waiting:'Caller waits for overall root',result:'A reference returned; caller stores root = A',caption:'Final BST · A still root',art:bstArt,active:40,note:'A.left already B ko refer karta tha; assignment updated B subtree reference ko preserve karti hai. Root object A hi rehta hai.'}
  ])}
  ${idea('PYTHON REFERENCES','B copy nahi hota','<code>A.left = B</code> mein B object ka reference store hota hai, uski duplicate copy nahi. Isliye <code>B.right = E</code> change, A se <code>A.left.right</code> follow karne par bhi visible hai. <code>return root</code> second call mein B, outer call mein A deta hai—local root alag hai.')}
  ${steps('<b>Agar <code>return root</code> omit karo:</b> non-base call implicitly <code>None</code> return karegi. Then <code>A.left = insert(B,35)</code> effectively <code>A.left = None</code> ho jayega; existing B subtree root se disconnect. New E banana alone enough nahi.','<b>Empty tree:</b> <code>root = insert(None,35)</code> returns E; caller must save it as new root. <b>Duplicate 35:</b> neither <code>&lt;</code> nor <code>&gt;</code> branch runs; same root returns, no new node.','<b>Complexity:</b> path height h → O(h) time and O(h) recursive stack. Balanced O(log n); skewed O(n).')}
  ${checkpoint(['Why is return root needed?','Parent ko updated subtree root reference mile; warna implicit None parent link hata sakta hai.'],['B call aur A call kya return karte hain?','B call B object, A call A object return karta hai.'],['Empty BST mein first insert ka result?','New node hi root banta hai—caller <code>root = insert(root, value)</code> save kare.'])}
`)
const search = section('12.5.3','bst-search','Searching in BST','Comparison se ek entire subtree reject karo','BST ordering guaranteed ho tabhi one-path search valid hai.',`
  ${codebox('Teaching Python · search',bstSearch)}
  ${diagram('Search 35 · A=40, B=30, E=35',bstArt,35)}
  ${table(['Forward call','Local node','Comparison','Next'],[['search(A,35)','A → 40','35 < 40','return search(B,35); right subtree ≥40 discarded'],['search(B,35)','B → 30','35 > 30','return search(E,35); left subtree ≤30 discarded'],['search(E,35)','E → 35','equal','return E object']])}
  ${table(['Return unwinding','What returns?'],[['search(E,35)','E reference'],['waiting search(B,35)','receives E, returns E unchanged'],['waiting search(A,35)','receives E, returns E unchanged'],['caller','found points to E; <code>found.val</code> is 35']])}
  ${steps('<b>Missing 37:</b> 40 → 30 → 35 → right None. <code>search(None,37)</code> returns None; each waiting <code>return search(...)</code> passes None back to caller. <code>None.val</code> access karoge toh <code>AttributeError</code>; pehle <code>if found is not None</code> check karo.','<b>BST vs ordinary binary tree:</b> 35 &lt; 40 proves 40 ke entire RIGHT subtree mein 35 nahi ho sakta. Ordinary binary tree mein order guarantee nahi hoti; both sides dekhni pad sakti hain.','<b>Cost:</b> visited nodes = path height h: O(h) time, recursive stack O(h). Balanced-ish tree ~log n levels; skewed chain n levels → O(n).')}
  ${table(['Shape','Example path','Search cost'],[['Balanced-ish','40 → 30 → 35 (3 nodes)','O(log n) if height logarithmic'],['Right-skewed','10 → 20 → 30 → 40 (4-node chain)','O(n) when height is n']])}
  ${checkpoint(['Why can one subtree be discarded?','BST invariant: left ke all values smaller, right ke all values larger.'],['Missing value ka return kya hoga?','Eventually node None par base case runs; None reference caller tak unwind hota hai.'])}
`)
const deletion = section('12.5.4','bst-delete','Deletion in BST','Target milne ke baad kya return hoga?','Node ki value modify karna aur parent-child connection change karna alag actions hain.',`
  ${table(['Target case','Return to waiting parent','Link effect'],[['Leaf (0 child)','None','Parent child link becomes None'],['Only one child','That child reference','Parent bypasses deleted node'],['Two children','Same node after value replacement','Original successor is separately removed']])}
  ${codebox('Teaching Python · delete with explicit three cases',bstDelete)}
  ${idea('CASE 1 · LEAF','Delete 20: return None','A(40).left = B(30), B.left = D(20). <code>delete(D,20)</code> returns None because D has no children. Waiting B call saves <code>B.left = None</code>, returns B; waiting A call saves <code>A.left = B</code>, returns A.')}
  <div class="bst-before-after">${diagram('Before · D(20) is B.left',leafBeforeArt,20)}${diagram('After · B.left is None',leafAfterArt,30)}</div>
  ${idea('CASE 2 · ONE CHILD','Delete 30: child bypasses B','A(40).left = B(30), B.left = D(25). <code>delete(B,30)</code> returns D, not B. Waiting A call does <code>A.left = D</code>; now root se B unreachable, but D stays in tree.')}
  <div class="bst-before-after">${diagram('Before · B has only left child D',oneChildBeforeArt,30)}${diagram('After · A.left points directly to D',oneChildAfterArt,25)}</div>
  ${steps('<b>Only RIGHT child?</b> Agar B(30).right = E(35) ho, <code>delete(B,30)</code> returns E; A saves <code>A.left = E</code>. Same bypass, bas right child returned.','<b>Missing key?</b> Search None tak jaati hai; <code>delete(None,key)</code> returns None. Existing empty child link stays None; waiting calls apne original node references return karte hain. Root unchanged.')}
  <div class="bst-reference"><strong>Python objects vs logical BST</strong>${referenceChain('Before', 'A(40)', 'left: B(30)', 'left: D(25)')}${referenceChain('After from A', 'A(40)', 'left: D(25)')}${referenceChain('Separate variable B still exists', 'B(30)', 'left: D(25)')}</div>
  ${codebox('Reference check · deleting from tree ≠ deleting Python object',`A = TreeNode(40)
B = TreeNode(30)
D = TreeNode(25)
A.left = B
B.left = D

A = delete(A, 30)
print(A.left.val)  # 25: A reaches D directly
print(B.val)       # 30: variable B still references old object
print(B.left.val)  # 25: B still references D`)}
  ${steps('B Python memory mein visible reh sakta hai because separate <code>B</code> variable us object ko reference karta hai. A se traverse karne par B nahi milta. D object ko A.left aur B.left dono references point kar sakte hain; copy nahi bani. Logical BST hamesha root A se inspect karo.')}
  ${idea('CASE 3 · TWO CHILDREN','Value copy + old node removal, dono required','Detailed example mein outer A = 60 liya hai. Agar A = 40 rakhte aur 50 ko B = 30 ke right subtree mein rakhte, 50 root 40 ke LEFT subtree mein hota—invalid BST. A=60 se all nodes valid BST order maintain karte hain.')}
  ${bstTrace('Delete B(30) · successor 50 → 35 → 32',[
    {call:'delete(A,30) → delete(B,30) · local root B(30)',line:'B has two children',waiting:'A.left = delete(B,30)',result:'Need replacement value first',caption:'Original valid BST · B(30) active',art:twoChildBeforeArt,active:30,note:'B.left = 20 and B.right = 50. Leaf/one-child return rules yahan apply nahi hote.'},
    {call:'still delete(B,30) · successor variable moves',line:'succ=B.right (50); succ=35; succ=32',waiting:'A.left = delete(B,30)',result:'F(32) is minimum in B.right subtree',caption:'Leftmost successor F(32)',art:twoChildBeforeArt,active:32,note:'Right subtree ka leftmost node inorder mein 30 ke immediately baad aata hai.'},
    {call:'still delete(B,30) · local root is same B object',line:'B.val = F.val  # 32',waiting:'A.left = delete(B,30)',result:'B value now 32; original F(32) still present',caption:'Temporary duplicate 32 · B object did not move',art:twoChildDuplicateArt,active:{value:32,occurrence:0},note:'Sirf B object ki value badli. Original F node abhi bhi D→E→F path par hai.'},
    {call:'delete(D,32) · local root D(50)',line:'B.right = delete(B.right, 32)',waiting:'B.right awaits D; A.left awaits B',result:'D call descends left to E',caption:'Original successor ko right subtree mein search',art:twoChildDuplicateArt,active:50,note:'Line ka RIGHT side pehle execute hota hai: <code>delete(B.right,32)</code>. LEFT side <code>B.right = ...</code> return ke baad chalega.'},
    {call:'delete(E,32) → delete(F,32) · local roots 35, then 32',line:'E.left = delete(F,32); F returns None',waiting:'E.left awaits None; D.left awaits E; B.right awaits D',result:'Original F removed from tree path',caption:'F(32) is the old occurrence to remove',art:twoChildDuplicateArt,active:{value:32,occurrence:1},note:'F leaf hai, so None return. Abhi E.left assignment pending hai.'},
    {call:'resume delete(E,32) · local root E(35)',line:'E.left = None; return E',waiting:'D.left awaits E; B.right awaits D; A.left awaits B',result:'E subtree root reference returned',caption:'Old F link removed',art:twoChildAfterArt,active:35,note:'E object same hai; sirf uska left child link None hua.'},
    {call:'resume delete(D,32) · local root D(50)',line:'D.left = E; return D',waiting:'B.right awaits D; A.left awaits B',result:'D subtree root reference returned',caption:'D remains root of updated right subtree',art:twoChildAfterArt,active:50,note:'<code>return root</code> is call mein D return karta hai.'},
    {call:'resume delete(B,30), then delete(A,30)',line:'B.right = D; return B; A.left = B; return A',waiting:'Caller stores A = delete(A,30)',result:'Final tree root A(60), B object now holds 32',caption:'Final BST · one 32 remains',art:twoChildAfterArt,active:32,note:'B.right assignment updated D subtree ko reconnect karti hai. A.left assignment B reference preserve karti hai.'}
  ])}
  ${idea('READ THE TWO SIDES','root.right = delete(root.right, successor)','Right-hand <code>root.right</code> means <b>old right-child reference passed as argument</b>. Recursive call returns the updated subtree root. Left-hand <code>root.right = ...</code> means <b>save that returned reference back in current node</b>. Value copy alone old successor object ko remove nahi karti.')}
  ${codebox('Same statement · three smaller steps',`right_subtree = root.right
updated_right_subtree = delete(right_subtree, successor.val)
root.right = updated_right_subtree`)}
  ${steps('<b>Successor may have a right child:</b> agar original F(32).right = G(33), F leftmost hai but leaf nahi. <code>delete(F,32)</code> returns G; waiting E call assigns <code>E.left = G</code>. 33 remains correctly between copied 32 and 35.','<b>Predecessor alternative:</b> left subtree ka maximum lo (<code>pred = root.left; while pred.right: pred = pred.right</code>), uski value B mein copy karo, phir <code>B.left = delete(B.left, pred.val)</code>. Successor right-min; predecessor left-max—dono ordering preserve karte hain.')}
  <div class="bst-before-after">${diagram('Successor choice · B becomes 32',twoChildAfterArt,32)}${diagram('Predecessor choice · B becomes 20',predecessorAfterArt,20)}</div>
  ${idea('BACK TO THE LECTURE TREE','Original root 40 delete karo','12.5.1 wale original tree mein 40 ke two children hain. Right subtree 50 → left 45, so inorder successor 45. Original root object ki value 40 se 45 hoti hai; phir <code>root.right = delete(root.right, 45)</code> old 45 node remove karta hai. Final inorder: 25, 30, 35, 45, 50, 60.')}
  ${steps('Final shapes alag ho sakte hain, lekin dono ka inorder same remaining values deta hai: <b>20, 32, 35, 50, 60</b>. <b>Root delete:</b> always <code>root = delete(root, key)</code> use karo; if root leaf ho toh new root None, one child ho toh child, two children ho toh usually same object with replaced value.','<b>Cost:</b> search path plus successor/predecessor descent O(h) time; recursive stack O(h). Balanced O(log n), skewed O(n). Deletion se height same ya kam ho sakti hai; automatic balancing nahi hoti.')}
  ${checkpoint(['Leaf delete ka parent link kya banta hai?','Returned None parent ke matching child field mein save hota hai.'],['One-child node kaise bypass hota hai?','Delete child reference return karta hai; parent apna link seedha us child par set karta hai.'],['Predecessor bhi valid kyun hai?','Left subtree ka maximum replacement ban sakta hai; original predecessor ko left subtree se remove karna hota hai.'],['Value copy ke baad old successor kyun delete karein?','Warna same value ki do occurrences tree mein reh jayengi.'],['Deleted node B Python visualizer mein kyun dikh sakta hai?','Separate variable B old object ko still reference karta hai; root A se woh unreachable hai.'],['Delete ke baad height aur cost?','Height same ya kam ho sakti hai; O(h) time and O(h) recursion stack, balanced O(log n), skewed O(n).'])}
  ${trap('Inorder successor = RIGHT subtree ka minimum; predecessor = LEFT subtree ka maximum. Dono valid hain, par copied value ki original node ko corresponding subtree se delete karke returned link assign karna zaroori hai.')}
`)
const nary = section('12.6','nary','N-ary Tree','Left/right fixed fields ke bajay children list','One node can have 0, 1, 2, 3… children.',`
  ${diagram('Lecture N-ary tree',naryArt)}
  ${steps('<b>Root 10:</b> children list [20,30,40]. <b>20:</b> children [50,60,70].','<b>Binary vs N-ary:</b> Binary TreeNode has <code>left</code>/<code>right</code>; N-ary Node has <code>children</code> list. Children order is list order and traversal follows it.','<b>Leaves:</b> 50,60,70,80,90,100 have empty children lists.')}
  ${trap('N-ary tree par BST left-smaller/right-larger invariant automatically nahi hota. N-ary preorder/postorder iterate ALL children, not just first two.')}
`)
const naryInitial = section('12.6.1','nary-setup','Initial Setup for N-ary Tree','Children list references store karti hai','Course notebook ke exact values and assignments.',`
  ${codebox('Lecture Python · N-ary setup',narySetup)}
  ${diagram('After assigning children lists',naryArt)}
  ${steps('<b><code>node_20</code>:</b> separate variable root ke first child object ko reference karta hai. <code>root.children[0] is node_20</code> True.','<b><code>Node(50)</code>:</b> fresh leaf object; its <code>children=[]</code>. Root ke three children aur their children alag levels hain.')}
`)
const naryPreSection = section('12.6.2','nary-pre','Preorder on N-ary Tree','Node first, then each child subtree left-to-right','Binary preorder ka generalization.',`
  ${codebox('Lecture Python · N-ary preorder',naryPre)}
  ${table(['Current call','Print now','Next recursive children'],[['10','10','20, then 30, then 40'],['20','20','50, then 60, then 70'],['30','30','80'],['40','40','90, then 100']])}
  ${steps('<b>Full output:</b> 10,20,50,60,70,30,80,40,90,100. Child 20 subtree finishes before child 30 starts.','<b>Cost:</b> O(n) time, O(h) recursive stack.')}
`)
const naryPostSection = section('12.6.3','nary-post','Postorder on N-ary Tree','All children pehle; parent last','Children loop completes before print.',`
  ${codebox('Lecture Python · N-ary postorder',naryPost)}
  ${table(['Subtree','Children printed first','Then parent'],[['20','50,60,70','20'],['30','80','30'],['40','90,100','40'],['10','All three child-subtree outputs','10']])}
  ${steps('<b>Full output:</b> 50,60,70,20,80,30,90,100,40,10.','<b>Cost:</b> O(n) time, O(h) stack. Root 10 last always, for any nonempty tree.')}
`)
const naryLevelSection = section('12.6.4','nary-level','Level Order on N-ary Tree','Queue mein ALL children append karo','Binary level order ka same FIFO idea.',`
  ${codebox('Lecture Python · N-ary level order',naryLevel)}
  ${table(['Popped','New children enqueued','Queue after step'],[['10','20,30,40','[20,30,40]'],['20','50,60,70','[30,40,50,60,70]'],['30','80','[40,50,60,70,80]'],['40','90,100','[50,60,70,80,90,100]']])}
  ${steps('<b>Output:</b> 10,20,30,40,50,60,70,80,90,100.','<b>Cost:</b> O(n) time and O(w) queue space, w = maximum queued width; worst O(n).')}
`)

const dpCountCode = `def dfs(node):
    if not node:
        return 0

    child_results = []

    for child in node.children:
        child_results.append(dfs(child))

    result = 1 + sum(child_results)

    return result

# Run after the N-ary setup in 12.6.1
print(dfs(root))  # 10`
const dp = section('12.7','tree-dp','DP on Trees','Parent answer child answers se banta hai','Lecture heading ko recursion results ka mental model banao.',`
  ${diagram('Same N-ary tree from 12.6.1 · count every node',naryArt)}
  ${codebox('Your Python code · child results combine at parent',dpCountCode)}
  ${steps('<b><code>dfs(node)</code> ka meaning:</b> is node ke poore subtree mein kitne nodes hain. <code>dfs(None)</code> returns 0.','<b>Leaf:</b> <code>node.children</code> empty list hai, so loop nahi chalta; <code>child_results=[]</code>, <code>sum([])=0</code>, and leaf returns <code>1</code>.','<b>Parent:</b> har child ka recursive result list mein save hota hai. <code>1</code> current node ke liye, <code>sum(child_results)</code> uske saare child subtrees ke liye. Parent ka result children ke baad banta hai—postorder-style computation.')}
  ${table(['Current call','Children return in order','child_results','result returned'],[['dfs(50), dfs(60), dfs(70), dfs(80), dfs(90), dfs(100)','No children','[] for each leaf','1 each'],['dfs(20)','50→1, 60→1, 70→1','[1, 1, 1]','1 + 3 = 4'],['dfs(30)','80→1','[1]','1 + 1 = 2'],['dfs(40)','90→1, 100→1','[1, 1]','1 + 2 = 3'],['dfs(10)','20→4, 30→2, 40→3','[4, 2, 3]','1 + 9 = 10']])}
  ${steps('<b>Exact call flow:</b> <code>dfs(10)</code> waits for <code>dfs(20)</code> first. After 20 returns 4, it calls 30 (returns 2), then 40 (returns 3). Only then root computes <code>1 + sum([4,2,3]) = 10</code>.','<b>Is this memoization?</b> Nahi. Har node once visit hota hai and result parent ko return hota hai. Time O(n); recursive stack O(h), where h is tree height. <code>child_results</code> lists together can use up to O(n) extra space. Binary-tree version mein children fixed left/right hote hain; wahi concept 12.8.2 mein hai.')}
  ${table(['Problem','Child results','Combine at parent'],[['Subtree node count','Each child returns its count','1 + sum(child_results)'],['Subtree sum','Each child returns its value sum','node.val + sum(child_results)'],['Height in nodes','Each child returns its height','1 + max(child_results, default=0)']])}
  ${trap('“DP on trees” heading ka matlab har function memoized nahi. Pure tree mein one DFS visit per node O(n) hai; repeated overlapping subproblems tabhi memoization chahiye.')}
`)
const heightDepthCode = `class TreeNode:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None


def height_in_nodes(node):
    if node is None:
        return 0

    left = height_in_nodes(node.left)
    right = height_in_nodes(node.right)

    return 1 + max(left, right)


def depth_in_nodes(node, target):
    if node is None:
        return 0

    if node.value == target:
        return 1

    left = depth_in_nodes(node.left, target)

    if left != 0:
        return 1 + left

    right = depth_in_nodes(node.right, target)

    if right != 0:
        return 1 + right

    return 0


A = TreeNode(10)
B = TreeNode(20)
C = TreeNode(30)
D = TreeNode(40)
E = TreeNode(50)
F = TreeNode(60)

A.left = B
A.right = C
B.left = D
B.right = E
E.right = F

root = A

print(height_in_nodes(root))       # 4
print(height_in_nodes(B))          # 3
print(depth_in_nodes(root, 10))    # 1
print(depth_in_nodes(root, 20))    # 2
print(depth_in_nodes(root, 50))    # 3
print(depth_in_nodes(root, 60))    # 4`
const countCode = `def count_nodes(node):
    if node is None:
        return 0

    left = count_nodes(node.left)
    right = count_nodes(node.right)

    return 1 + left + right`
const sumCode = `def tree_sum(node):
    if not node:
        return 0

    left_sum = tree_sum(node.left)
    right_sum = tree_sum(node.right)
    return node.val + left_sum + right_sum

print(tree_sum(root))  # 285 for 25,30,35,40,45,50,60`
const validateCode = `class TreeNode:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None


def validate_bst(node, minimum, maximum):

    if node is None:
        return True

    if node.value <= minimum or node.value >= maximum:
        return False

    left = validate_bst(node.left, minimum, node.value)
    right = validate_bst(node.right, node.value, maximum)

    return left and right


# CREATE BINARY TREE
A = TreeNode(40)
B = TreeNode(30)
C = TreeNode(50)
D = TreeNode(20)
E = TreeNode(35)

A.left = B
A.right = C

B.left = D
B.right = E

# VALIDATE BST
result = validate_bst(A, float('-inf'), float('inf'))

print(result)  # True`
const lcaCode = `def lowest_common_ancestor(root, p, q):
    while root:
        if p.val < root.val and q.val < root.val:
            root = root.left
        elif p.val > root.val and q.val > root.val:
            root = root.right
        else:
            return root

# On lecture tree rooted at 6:
# LCA(2, 4) = 2; LCA(2, 8) = 6`
const kthCode = `class Node:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None


def kth_smallest(root, k):
    values = []

    def inorder(node):
        if node is None:
            return

        inorder(node.left)
        values.append(node.value)
        inorder(node.right)

    inorder(root)

    return values[k - 1]


root = Node(40)
root.left = Node(20)
root.right = Node(60)

root.left.left = Node(10)
root.left.right = Node(30)

root.right.left = Node(50)
root.right.right = Node(70)

print(kth_smallest(root, 3))`
const naryMaxCode = `class Node:
    def __init__(self, value):
        self.value = value
        self.children = []


root = Node(40)

a = Node(20)
b = Node(60)
c = Node(30)

root.children = [a, b, c]

a.children = [Node(10), Node(90)]
c.children = [Node(50), Node(70)]


def find_max(root):
    arr = []

    def traverse(root):
        if root is None:
            return None

        arr.append(root.value)

        for child in root.children:
            traverse(child)

    traverse(root)

    return max(arr)


print("Maximum:", find_max(root))`
const naryHeightCode = `class Node:
    def __init__(self, value):
        self.value = value
        self.children = []


# Create N-ary tree
root = Node(40)

a = Node(20)
b = Node(60)
c = Node(30)

root.children = [a, b, c]

a.children = [Node(10), Node(90)]
c.children = [Node(50), Node(70)]

a.children[1].children = [Node(95)]


# Find height
def find_height(root):
    if root is None:
        return 0

    max_height = 0

    for child in root.children:
        child_height = find_height(child)
        max_height = max(max_height, child_height)

    return max_height + 1


# Subtract 1 to get height in edges
print("Height:", find_height(root) - 1)`
const maxPathCode = `import math

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

# On -10 / 9,20 / 15,7 tree -> 42`
const leftLeavesCode = `def sum_left_leaves(root):
    if not root:
        return 0

    total = 0
    if root.left and not root.left.left and not root.left.right:
        total += root.left.val

    total += sum_left_leaves(root.left)
    total += sum_left_leaves(root.right)
    return total

# On 3 / 9,20 / 15,7 tree -> 9 + 15 = 24`

const depth = section('12.8.1','max-depth','Calculate Depth of a Tree','Dono functions path ke nodes count karte hain','Edges chahiye? Found non-empty path ke nodes se 1 subtract karo.',`
  ${idea('PEHLE DIRECTION SAMJHO','Root se neeche vs node se neeche','<b>Depth in nodes:</b> root se target tak path par kitne nodes hain, dono endpoints included. <b>Height in nodes:</b> given node se deepest descendant leaf tak longest path par kitne nodes hain. <b>Whole-tree height</b> = root ki height = maximum root-to-leaf depth. Root ki own depth <b>1 node</b> hai; poore tree ki maximum depth <b>4 nodes</b> hai. Dono alag questions hain.')}
  ${heightDepthLab()}
  ${table(['Node / label','Root → node','Depth · nodes','Deepest leaf path','Height · nodes'],[['10 / A','10','1','10→20→50→60','4'],['20 / B','10→20','2','20→50→60','3'],['30 / C','10→30','2','30','1'],['40 / D','10→20→40','3','40','1'],['50 / E','10→20→50','3','50→60','2'],['60 / F','10→20→50→60','4','60','1']])}
  ${steps('<b>Depth of 50:</b> starting point root 10; target 50. Path 10→20→50 has <b>3 nodes / 2 edges</b>. 50 ke neeche ka 60 depth(50) mein nahi aata.','<b>Height of 20:</b> starting point 20; deepest leaf 60. Path 20→50→60 has <b>3 nodes / 2 edges</b>. Root→20 edge is calculation mein nahi aata.','<b>Whole tree:</b> root 10→20→50→leaf 60 has <b>4 nodes / 3 edges</b>. Isliye whole-tree height aur maximum root-to-leaf depth dono 4 nodes hain; root node ki own depth sirf 1 node hai.')}
  ${table(['Property','Depth of a node','Height of a node'],[['Start','Tree root','Given node'],['End','Target node','Deepest descendant leaf'],['Path','Root → target','Longest node → leaf'],['Root answer','1 node / 0 edges','Tree height'],['Leaf answer','Root se position par depend','1 node / 0 edges'],['Recursion','Found target se ancestors tak +1','Child returns combine with 1+max']])}
  ${idea('NODES ↔ EDGES CONVENTION','Code nodes count karta hai; GATE question ka unit check karo','<b>Non-empty path:</b> edges = nodes − 1. Conventional GATE wording aksar edges use karti hai, lekin question ki exact definition dekho. Humare functions nodes return karte hain; edge answer nikalte waqt sirf found, non-empty path par 1 subtract karo.')}
  ${table(['Question','Nodes','Edges'],[['Depth of root 10','1','0'],['Depth of node 20','2','1'],['Depth of node 50','3','2'],['Height of node 20','3','2'],['Height of leaf 60','1','0'],['Height of entire tree','4','3'],['Maximum root-to-leaf depth','4','3']])}
  ${steps('<b>Empty or missing:</b> <code>height_in_nodes(None)=0</code> because there are no nodes. <code>depth_in_nodes(None, target)=0</code> means target not found. Missing-target sentinel <code>0</code> par <code>nodes−1</code> apply mat karo. Empty tree ki edge-height convention books/questions mein differ kar sakti hai.')}
  ${codebox('Runnable Python · height and depth both count nodes',heightDepthCode)}
  ${steps('Yeh single code block PyVisualizer mein direct run hota hai. Har node mein <code>.value</code>, <code>.left</code>, <code>.right</code> same naming use hui hai. 10–60 values BST order mein nahi hain; depth search general binary tree par dono branches explore kar sakti hai.')}
  ${idea('HEIGHT · BOTTOM-UP','Children answer dete hain, parent longest choose karta hai','<code>None → 0</code> nodes. Leaf ke dono children None dete hain, so leaf <code>1+max(0,0)=1</code> returns. Parent pehle left/right heights leta hai, phir <code>1+max(left,right)</code>: <code>1</code> khud ke liye, <code>max</code> one longest branch ke liye. <code>sum</code> dono branches gin lega, height nahi.')}
  ${table(['Return order','Call','Left','Right','Returned height · nodes'],[['1','height_in_nodes(40)','0','0','1'],['2','height_in_nodes(60)','0','0','1'],['3','height_in_nodes(50)','0','1','2'],['4','height_in_nodes(20)','1','2','3'],['5','height_in_nodes(30)','0','0','1'],['6','height_in_nodes(10)','3','1','4']])}
  ${steps('<b>Node 20 par:</b> downward calls pehle 40 aur 50 ko visit karti hain. Wapas aate waqt left=1, right=2; <code>1+max(1,2)=3</code> nodes. Isi path par <b>2 edges</b> hain. Root tak 3 aur 1 child answers aate hain; root <code>1+max(3,1)=4</code> return karta hai.')}
  ${idea('DEPTH · SUCCESSFUL RETURN PATH','Target milta hai, tab ancestors count hote hain','<code>depth_in_nodes(node, target)</code> target subtree mein absent ho toh <code>0</code> deta hai. Match par <code>1</code> target node ke liye. Left result nonzero ho toh parent <code>1+left</code> karke right skip karta hai; warna right search karta hai. Right bhi 0 ho toh target absent. Isliye root se target tak ke har parent ka +1 answer mein judta hai.')}
  ${table(['Forward call for target 50','Action'],[['depth_in_nodes(10,50)','10 not target → search left 20'],['depth_in_nodes(20,50)','20 not target → search left 40'],['depth_in_nodes(40,50)','40 not target; both None → 0'],['depth_in_nodes(50,50)','Target found → 1']])}
  ${table(['Backward return','Calculation','Meaning'],[['40 → 20','0','40 branch mein target nahi'],['50 → 20','1','Target 50 khud count hua'],['20 → 10','1+1=2','20 aur 50 counted; 20.right return mil gaya'],['10 → caller','1+2=3','10→20→50 has 3 nodes; 2 edges']])}
  ${steps('<b>Why no right-side 30 call?</b> 20 ka left subtree 40 se 0 aaya, but right subtree 50 se nonzero 1 mila. 20 returns 2; phir 10 ko left result 2 mila, so root.right 30 explore karne ki zaroorat nahi.','<b>Absent target:</b> dono sides se 0 aayega, final answer 0 (not found). Duplicate values ho toh yeh DFS pehli left-first match count karta hai; unique values assume karo ya node reference compare karo.')}
  ${idea('GATE BOUNDS · BINARY TREE ONLY','Height ka unit formula mein bhi matter karta hai','Non-empty binary tree ka <b>edge-height h</b>: minimum nodes <code>h+1</code> (chain), maximum <code>2^(h+1)−1</code> (all levels filled). Equivalent <b>node-height H</b>: minimum <code>H</code>, maximum <code>2^H−1</code>. Here H=4, h=3: <b>4 ≤ N ≤ 15</b>; our N=6 fits. General N-ary tree par binary upper bound apply mat karo.')}
  ${steps('<b>Balanced vs skewed:</b> Balanced binary tree ki height roughly O(log N), skewed chain ki O(N). Height calculation still every node visits: <b>O(N)</b> time. General binary-tree target-depth search worst <b>O(N)</b> time. Dono recursive call stacks <b>O(h)</b> space use karte hain, where h tree height; balanced O(log N), skewed O(N).')}
  ${trap('Root depth <b>1 node = 0 edges</b>; whole tree maximum depth <b>4 nodes = 3 edges</b>. Dono ko same mat samjho. Missing target ka 0 count nahi, sentinel hai—us se 1 subtract mat karo. General binary tree search mein BST comparison se branch skip nahi kar sakte.')}
  ${checkpoint(['Root 10 ki depth in nodes?','<b>1.</b> Path mein root khud included hai; edges 0.'],['Node 50 ki depth in nodes?','<b>3:</b> 10→20→50. Edge depth 2.'],['Leaf 60 ki height in nodes?','<b>1.</b> Leaf khud ek node; edge-height 0.'],['Node 20 ki height in nodes?','<b>3:</b> 20→50→60.'],['Whole tree ki height aur max depth?','Dono <b>4 nodes</b> (3 edges) because longest root→leaf path 10→20→50→60.'],['height_in_nodes(None) kya deta hai?','<b>0:</b> empty subtree mein nodes nahi.'],['depth_in_nodes(root, 99) kya deta hai?','<b>0:</b> target not found; yeh valid non-empty depth nahi.'],['Why max, not sum?','Height <b>one longest path</b> hai; sum both branches count karega.'],['Left height 3 nodes, right 5 nodes: parent?','<b>6 nodes</b> = 1+max(3,5).'],['Node-height H=4 binary tree max nodes?','<b>15</b> = 2^4−1. Minimum 4 nodes.'])}
`)
const count = section('12.8.2','count-nodes','Count Nodes in a Tree','Current node 1 + left count + right count','No BST ordering needed.',`
  ${codebox('Lecture Python · count_nodes',countCode)}
  ${table(['Subtree root','Calculation','Result'],[['25,35,45,60','1+0+0 each','1 each'],['30','1+1+1','3'],['50','1+1+1','3'],['40','1+3+3','7']])}
  ${steps('<b>Base None → 0:</b> Missing child count zero; it is not an extra node.','<b>Return flow:</b> Pehle <code>left</code> aur <code>right</code> subtree counts return karte hain; phir current node ka <code>1</code> add hota hai.','<b>Cost:</b> O(n) time, O(h) call stack. A single call <code>count_nodes(root)</code> visits each node once.')}
`)
const sum = section('12.8.3','sum-nodes','Sum of Nodes in Tree','Count jaisa, but 1 ki jagah node.val','Child sums return hone ke baad parent add karta hai.',`
  ${codebox('Lecture Python · tree_sum',sumCode)}
  ${table(['Subtree','Calculation','Return'],[['30 subtree','25+30+35','90'],['50 subtree','45+50+60','155'],['root 40','40+90+155','285']])}
  ${steps('<b>Base:</b> <code>tree_sum(None)=0</code>; missing child contributes zero.','<b>Cost:</b> O(n) time, O(h) auxiliary recursion stack. Numeric values sum ho sakte hain; labels A–F wale tree par this numeric function directly meaningful nahi.')}
`)
const validate = section('12.8.4','validate-bst','Validate BST','Sirf parent se compare karna enough nahi','Ancestor-derived low/high range every node par apply hota hai.',`
  ${codebox('Your Python · runnable validate_bst example',validateCode)}
  ${diagram('Valid example in code · result True',`        40\n       /  \\\n     30    50\n    /  \\\n   20  35`)}
  ${table(['Visited node','Allowed range','Why valid?'],[['40','(-∞,+∞)','40 lies inside'],['30','(-∞,40)','30 &lt; 40'],['20','(-∞,30)','20 &lt; 30'],['35','(30,40)','30 &lt; 35 &lt; 40'],['50','(40,+∞)','50 &gt; 40']])}
  ${steps('<b>How bounds move:</b> Left child ko current value as new <code>maximum</code> milti hai; right child ko current value as new <code>minimum</code>. Isliye ancestor restrictions bhi child tak pahunchti hain.','<b>Return:</b> <code>None</code> valid empty subtree hai, so <code>True</code>. Har real node range pass kare aur dono children <code>True</code> return karein tabhi final result <code>True</code>.')}
  ${diagram('Counterexample · 45 is inside root 40 LEFT subtree',`        40\n       /  \\\n     30    50\n       \\\n        45`)}
  ${table(['Visit','Allowed range','Check'],[['40','(-∞,+∞)','valid'],['30','(-∞,40)','valid'],['45 as 30.right','(30,40)','45 ≥ 40 → False']])}
  ${steps('<b>Why local test fails:</b> 45 &gt; parent 30 looks okay, but 45 is in ancestor 40 ka left subtree. Uska allowed range (30,40) hai, so <code>validate_bst</code> False dega.','<b>Strict bounds:</b> <code>minimum &lt; node.value &lt; maximum</code>; duplicate equal value bhi invalid. Time O(n), recursive stack O(h).')}
  ${trap('Is notebook ka insert duplicate ignore karta hai aur validator strict inequality use karta hai—dono consistent hain. Question alag duplicate policy de toh uske hisaab se insertion aur validation dono adjust karo.')}
`)
const lca = section('12.8.5','lca','Lowest Common Ancestor','Pehla split point answer hai','Lecture method BST comparison use karta hai, arbitrary binary tree ke liye nahi.',`
  ${diagram('Lecture LCA BST',`        6\n       / \\\n      2   8\n     / \\ / \\\n    0  4 7  9\n      / \\\n     3   5`)}
  ${codebox('Lecture Python · LCA in BST',lcaCode)}
  ${table(['Query','At root 6','Result'],[['LCA(2,8)','2 left, 8 right → split','6'],['LCA(2,4)','both <6 → go 2; 2 equals p','2'],['LCA(3,7)','3 left, 7 right → split','6']])}
  ${steps('<b>Pointer:</b> <code>root</code> variable currently visited candidate node; each loop moves it to left or right child.','<b>Cost:</b> O(h) time, O(1) auxiliary space for iterative code. Assumes p and q belong to the BST.')}
`)
const kth = section('12.8.6','kth','Kth Smallest Element in BST','Inorder se sorted values banao, phir k-th element lo','Your recursive inorder + values list.',`
  ${codebox('Your Python · runnable kth_smallest example',kthCode)}
  ${diagram('Code wala BST · inorder ascending',`        40\n       /  \\\n     20    60\n    /  \\  /  \\\n   10  30 50  70`)}
  ${table(['Inorder visit','Node value','values list after append'],[['1','10','[10]'],['2','20','[10, 20]'],['3','30','[10, 20, 30]'],['4','40','[10, 20, 30, 40]'],['5','50','[10, 20, 30, 40, 50]'],['6','60','[10, 20, 30, 40, 50, 60]'],['7','70','[10, 20, 30, 40, 50, 60, 70]']])}
  ${steps('<b>Recursive order:</b> <code>inorder(node.left)</code> se left subtree complete; phir <code>node.value</code> append; phir right subtree. BST property ki wajah se list ascending banti hai.','<b>k=3:</b> Third smallest 30 hai. Python index zero se start hota hai, so <code>values[k - 1] = values[2] = 30</code>; print output <code>30</code>.','<b>Cost:</b> All n nodes visit hote hain: O(n) time. List O(n) aur recursion stack O(h) auxiliary space, total O(n).','<b>Input condition:</b> Code assumes <code>1 ≤ k ≤ n</code>. <code>k=0</code> Python negative index se galat result dega; <code>k&gt;n</code> par IndexError aayega. Is exact function mein validation add nahi ki gayi.')}
`)
const naryMax = section('12.8.7','nary-max','Maximum Value in N-ary Tree','Saare node values collect karo, phir max lo','Your children-based DFS example; BST ordering ki zaroorat nahi.',`
  ${codebox('Your Python · runnable N-ary find_max example',naryMaxCode)}
  ${diagram('Code wala N-ary tree',`       40\n    /  |  \\\n   20  60  30\n  / \\     / \\\n 10 90   50 70`)}
  ${table(['Visit #','Node','arr after append'],[['1','40','[40]'],['2','20','[40, 20]'],['3','10','[40, 20, 10]'],['4','90','[40, 20, 10, 90]'],['5','60','[40, 20, 10, 90, 60]'],['6','30','[40, 20, 10, 90, 60, 30]'],['7','50','[40, 20, 10, 90, 60, 30, 50]'],['8','70','[40, 20, 10, 90, 60, 30, 50, 70]']])}
  ${steps('<b>Traversal order:</b> Pehle current node ki <code>value</code> list mein append hoti hai, phir <code>children</code> list ke har child ka subtree recursively visit hota hai. Yahan 20 ka poora subtree, phir 60, phir 30 ka subtree.','<b>Answer:</b> Complete list par <code>max(arr)</code> = 90, so output <code>Maximum: 90</code>. N-ary tree mein kisi node ke 0, 1, 2 ya zyada children ho sakte hain.','<b>Cost:</b> n nodes once visit hote hain: O(n) time. <code>arr</code> O(n) space leti hai; recursion stack O(h), total O(n) auxiliary space.','<b>Empty-tree caveat:</b> <code>find_max(None)</code> mein <code>arr</code> empty rahegi, aur <code>max([])</code> ValueError dega. Aapka example non-empty tree use karta hai.')}
`)
const naryHeight = section('12.8.8','nary-height','Height of N-ary Tree','Har child ki height se longest path choose karo','Your function returns node-count; print mein −1 karke edge-count dikhaya hai.',`
  ${codebox('Your Python · runnable N-ary find_height example',naryHeightCode)}
  ${diagram('Code wala N-ary tree · deepest leaf 95',`         40\n      /  |  \\\n     20  60  30\n    / \\     / \\\n   10 90   50 70\n       |\n       95`)}
  ${table(['Node / subtree','Child heights in nodes','find_height returns'],[['Leaves 10, 95, 60, 50, 70','No children; max_height stays 0','1 each'],['90','95 returns 1','2'],['20','10 returns 1; 90 returns 2','3'],['30','50 returns 1; 70 returns 1','2'],['40','20 returns 3; 60 returns 1; 30 returns 2','4']])}
  ${steps('<b>Bottom-up flow:</b> Function pehle har child par recurse karta hai. Parent largest <code>child_height</code> choose karke apne liye <code>+ 1</code> karta hai. Isliye node 20 ki height 3 aur root 40 ki 4 nodes banti hai.','<b>Longest path:</b> 40 → 20 → 90 → 95 mein 4 nodes aur 3 edges hain. <code>find_height(root)</code> returns 4; final <code>- 1</code> se printed output <code>Height: 3</code> hai.','<b>Base cases:</b> <code>find_height(None) = 0</code>; leaf ke children nahi, so <code>max_height = 0</code> aur return 1. Empty tree par direct printed expression <code>find_height(None) - 1</code> = −1 edge-height dega.','<b>Cost:</b> Every node once visit hota hai: O(n) time; recursive call stack O(h), where h longest root-to-leaf path ki node-count height hai.')}
`)
const maxPath = section('12.8.9','max-path','Maximum Path Sum of Binary Tree','Global path two sides le sakta hai; parent ko ek side return','Is lesson ka sabse important two-value distinction.',`
  ${diagram('Lecture example',`      -10\n      /  \\\n     9    20\n         /  \\\n        15   7`)}
  ${codebox('Lecture Python · max_path_sum',maxPathCode)}
  ${table(['At node','left gain','right gain','Global candidate','Return to parent'],[['15','0','0','15','15'],['7','0','0','7','7'],['20','15','7','20+15+7=42','20+max(15,7)=35'],['-10','9','35','-10+9+35=34','-10+max(9,35)=25']])}
  ${steps('<b>Answer 42:</b> 15→20→7 path. Root −10 include karna mandatory nahi.','<b>Why return only one side?</b> Parent ke through path cannot branch twice at child 20; upward extend karne ke liye 20→15 <em>or</em> 20→7 choose karo. Global answer at 20 can connect both.','<b><code>max(gain,0)</code>:</b> Negative child branch path ko worse banayegi, so skip. <code>max_sum=-inf</code> all-negative trees correctly handle karta hai. Time O(n), stack O(h).')}
  ${trap('Returning 42 to parent would incorrectly allow a path to branch at node 20 and again at its parent. Global candidate and return gain are different quantities.')}
`)
const leftLeaves = section('12.8.10','left-leaves','Sum of Left Leaf Nodes','Node must be BOTH left child and leaf','Right leaf 7 count nahi hoga.',`
  ${diagram('Lecture example',`       3\n      / \\\n     9  20\n       /  \\\n      15   7`)}
  ${codebox('Lecture Python · sum_left_leaves',leftLeavesCode)}
  ${table(['Node','Left child?','Leaf?','Add?'],[['9','Yes, of 3','Yes','9'],['15','Yes, of 20','Yes','15'],['7','No, right of 20','Yes','No'],['20','No, right of 3','No','No']])}
  ${steps('<b>Answer:</b> 9+15=24. Root itself is not a left child even if it is the only node.','<b>Code:</b> parent checks <code>root.left</code> is leaf, then recurses. Leaf re-visit adds 0. O(n) time, O(h) stack.')}
`)
const context = section('12.9','context','DS Context','GATE DA mein tree question ko classify karo','First decide tree shape, then order, then complexity.',`
  ${table(['Question clue','Use this tool','First check'],[['Parent / leaf / depth / height','Terminology + edges/nodes convention','Root depth 0? leaf height 0?'],['Traversal output / reconstruction','Pre/in/post/level rules','Full tree? labels distinct?'],['Sorted key search or kth-smallest','BST invariant + inorder','Balanced guaranteed?'],['Shortest levels / nearest depth','Queue level order','Enqueue child order'],['Child answers combine','Postorder recursion / tree DP','Base on None'],['Delete BST node','0/1/2 child cases','Reassign returned root']])}
  ${idea('SCOPE','Course vs syllabus','Supplied GATE DA Section 4 explicitly includes trees. Lecture sequence also has N-ary and advanced coding problems. They strengthen recursion/traversal intuition, but direct paper evidence should be labelled separately from original GATE-style practice.')}
  ${trap('Tree, binary tree, full binary tree, perfect binary tree aur BST interchangeable nahi. Formula ya algorithm apply karne se pehle exact assumption underline karo.')}
`)

const binaryTypes = section('GATE A','binary-types','Types of Binary Trees','Shape dekhkar type pehchano','Ye lecture 12.3 ke general tree rules ke baad binary-only extension hai.',`
  ${idea('FIRST RULE','Binary tree ≠ BST','Binary tree mein har node ke at most 2 children hote hain. Values sorted hona zaroori nahi. Full, complete, perfect, balanced, skewed shape ke labels hain; BST alag ordering rule hai. Ek tree ek se zyada shape labels satisfy kar sakta hai.')}
  <div class="bst-before-after">${diagram('Full · each internal node has exactly 2 children',`      A\n     / \\\n    B   C\n   / \\\n  D   E`)}${diagram('Complete · last level left to right filled',`      A\n     / \\\n    B   C\n   / \\ /\n  D  E F`)}</div>
  <div class="bst-before-after">${diagram('Perfect · every level completely filled',`      A\n     / \\\n    B   C\n   / \\ / \\\n  D  E F  G`)}${diagram('Right-skewed · one child per node',`  A\n   \\\n    B\n     \\\n      C\n       \\\n        D`)}</div>
  <div class="bst-before-after">${diagram('Balanced but not complete · no left-packed last row',`        A\n       / \\\n      B   C\n       \\   \\\n        D   E`)}${diagram('Left-skewed · right-skew mirror',`        A\n       /\n      B\n     /\n    C\n   /\n  D`)}</div>
  ${table(['Type','Exact identification rule','Small countercheck'],[['Full','Every internal node has exactly 2 children; leaves 0','One-child node → not full'],['Complete','Levels before last full; last level filled from LEFT with no gaps','Last row mein gap then later node → not complete'],['Perfect','Every internal node has 2 children AND all leaves same depth','One missing final-level node → not perfect'],['Balanced','Here: at each node, left/right subtree heights differ by at most 1','Root alone balanced dikhna enough nahi; each subtree check'],['Left / right skewed','Each non-leaf has only left / only right child','Chain; height n−1 edges']])}
  ${steps('<b>Full but not complete:</b> A ke two children B,C; B ke two children D,E; C leaf. Every internal node has 2 children, par last level ke C-side slots empty hain, so complete nahi.','<b>Complete but not full:</b> A→B,C and B→D,E, C→F. F left-packed hai, so complete; C ke only one child se full nahi.','<b>Balanced but not complete:</b> A ke children B,C; B ka sirf RIGHT child D, C ka sirf RIGHT child E. Every node par height difference ≤1, lekin last level left-packed nahi.','<b>Left-skew:</b> A→left B→left C→left D. Right-skew diagram ka mirror. Dono mein n=4, edge-height=3, BST search worst O(n).')}
  ${trap('Perfect ⇒ full, complete, balanced. Reverse implication generally false. “Full” ka matlab every level filled nahi—woh perfect hai. “Balanced” bhi automatic BST property nahi.')}
  ${checkpoint(['A has B,C; B has D,E; C has no child. Full? Complete?','<b>Full yes, complete no.</b> C-side final positions empty hain.'],['A has B,C; B has D,E; C has only LEFT F. Full? Complete?','<b>Complete yes, full no.</b> C has one child.'],['One long right-child chain is which type?','<b>Right-skewed.</b> Height n−1 edges; BST can take O(n) search.'])}
`)

const binaryProperties = section('GATE B','binary-properties','Binary Tree Properties','Formula se pehle convention aur condition likho','Only nonempty binary trees unless a row states otherwise; root depth 0, root level 1.',`
  ${idea('SYMBOLS','N, h, H, d, ℓ, I, L','N = total nodes; h = whole-tree height in <b>edges</b>; H = height in <b>nodes</b> = h+1; d = depth in edges; ℓ = level = d+1; I = internal nodes (at least one child); L = leaves (zero children). Leaf edge-height 0, node-height 1.')}
  ${diagram('Example · N=6, h=2 edges, H=3 nodes',binaryArt)}
  ${table(['Formula + applicability','Meaning and solved example','Trap'],[
    ['At depth d: ≤ 2^d; at level ℓ: ≤ 2^(ℓ−1) · binary tree','d=2 / ℓ=3 → at most 4 nodes; A–F has D,E,F = 3','Root depth 0 but level 1; never use 2^ℓ here'],
    ['N ≤ 2^(h+1)−1 = 2^H−1 · binary tree','h=2 / H=3 → max N=7 (perfect three levels)','Use edge h+1, not 2^h−1'],
    ['N ≥ h+1 = H · nonempty tree','h=3 → at least 4 nodes in a root-to-leaf chain','Height h edges needs h+1 nodes'],
    ['h ≥ ceil(log₂(N+1))−1; h ≤ N−1 · binary tree','N=7 → minimum h=2, maximum h=6','These are bounds, not every tree’s exact height'],
    ['N = I + L · every nonempty rooted tree','A–F: I=3 (A,B,C), L=3 (D,E,F), N=6','Root can be a leaf when N=1'],
    ['L ≤ I+1 · binary tree','A–F: 3≤3+1; a 4-node chain: L=1, I=3','Equality not guaranteed for arbitrary binary tree'],
    ['L=I+1; N=2I+1=2L−1 · full binary tree','Full 5-node A,B,C,D,E: I=2, L=3, N=5','One-child node invalidates equality'],
    ['L=2^h; I=2^h−1; N=2^(h+1)−1 · perfect binary tree','h=2 → L=4, I=3, N=7','Do not apply to merely full or complete tree']
  ])}
  ${steps('<b>Why max 2^d?</b> Each node has at most two children; each new level can at most double: 1,2,4,… . Add levels 0…h to get max N.','<b>Why full-tree L=I+1?</b> Every internal node contributes exactly 2 child edges, so edges=2I. General tree edges=N−1=I+L−1. Equate → L=I+1.','<b>Why L≤I+1 generally?</b> Binary internal nodes contribute at most 2 edges: N−1≤2I → L≤I+1.','<b>Numerical drill:</b> Perfect tree has 15 nodes → 15=2^(h+1)−1, so h=3 edges, H=4 nodes, leaves=8. A merely full tree with 15 nodes still has 8 leaves, but need not have h=3.')}
  ${trap('2024 DA Q52 uses edge-height H and asks always-true binary-tree bounds. Here lowercase h is edges and uppercase H is nodes—translate symbols from the question before plugging in. “Full” and “perfect” formulas ko arbitrary tree par mat lagao.')}
  ${checkpoint(['Edge-height 4 binary tree mein min/max N?','<b>5 to 31.</b> Min chain h+1=5; max 2^(h+1)−1=31.'],['Full binary tree I=6. Leaves and total nodes?','<b>L=7, N=13.</b> L=I+1; N=I+L.'],['Perfect tree N=31. Edge-height and leaves?','<b>h=4, L=16.</b> 31=2^5−1.'])}
`)

const reconstructionCode = `class Node:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None


def build_pre_in(pre, ino):
    if not pre:
        return None

    root_value = pre[0]
    split = ino.index(root_value)
    root = Node(root_value)
    root.left = build_pre_in(pre[1:1 + split], ino[:split])
    root.right = build_pre_in(pre[1 + split:], ino[split + 1:])
    return root


def build_post_in(post, ino):
    if not post:
        return None

    root_value = post[-1]
    split = ino.index(root_value)
    root = Node(root_value)
    root.left = build_post_in(post[:split], ino[:split])
    root.right = build_post_in(post[split:-1], ino[split + 1:])
    return root


pre = ['A', 'B', 'D', 'E', 'C', 'F']
ino = ['D', 'B', 'E', 'A', 'F', 'C']
post = ['D', 'E', 'B', 'F', 'C', 'A']
from_pre = build_pre_in(pre, ino)
from_post = build_post_in(post, ino)
print(from_pre.value, from_pre.left.value, from_pre.right.value)
print(from_post.value, from_post.left.value, from_post.right.value)`

const reconstruction = section('GATE C','reconstruction','Tree Reconstruction','Root pakdo → inorder split karo → recurse','Existing 12.4.6 only names valid traversal pairs; here actual construction trace hai.',`
  ${diagram('Target A–F tree · distinct labels',binaryArt)}
  ${table(['Traversal','Order','Root clue'],[['Preorder','A B D E C F','First A'],['Inorder','D B E A F C','A ke left D B E; right F C'],['Postorder','D E B F C A','Last A']])}
  ${idea('PRE + IN','Preorder root first kyun?','Root → left → right rule mein first item current subtree ka root hota hai. Inorder mein us root ka position left/right subtree ke node counts fix karta hai. Preorder ke next <code>left_count</code> items left subtree ko jaate hain; rest right ko.')}
  ${table(['Recursive call · pre / inorder','Root + split','Return / link'],[['A B D E C F / D B E A F C','A; left D B E, right F C','Build A.left from B D E; A.right from C F'],['B D E / D B E','B; left D, right E','Build B.left=D and B.right=E'],['D / D ; E / E','D and E are leaves','Return D and E to B'],['C F / F C','C; left F, right empty','Build C.left=F'],['F / F ; empty / empty','F leaf; empty → None','Return C to A']])}
  ${idea('POST + IN','Postorder root last kyun?','Left → right → root mein last item subtree ka root hai. Inorder split se left_count pata chalta hai; postorder ke first left_count items left subtree ke, next items right subtree ke. Root ko end se remove karo.')}
  ${codebox('Beginner Python · both reconstruction methods',reconstructionCode)}
  ${steps('<b>Unique kab?</b> Distinct labels + preorder/inorder or postorder/inorder se ordinary binary tree uniquely banta hai. Duplicate labels mein <code>index()</code> ka split ambiguous ho sakta hai.','<b>Preorder + postorder alone:</b> A→left B aur A→right B dono ka pre A B aur post B A hota hai. Arbitrary tree mein unique nahi. Full binary tree (every internal node has two children) assumption ho, distinct labels ke saath unique ho sakta hai—2024 DA Q28 ka point.','<b>Code cost:</b> Ye simple slicing + <code>ino.index()</code> implementation worst O(n²) time, O(n²) temporary slice space on a skewed tree, plus O(h) call stack. More advanced index-map/range implementation O(n) time/space achieve kar sakti hai; yahan clarity ke liye simple version use hua.')}
  ${trap('Inorder ke bina left/right sizes usually unknown hote hain. Ek child ko left se right move karo: preorder aur postorder same reh sakte hain. Traversal values distinct honi chahiye for this construction code.')}
  ${checkpoint(['Pre A B C, In B A C: root aur children?','<b>A root, B left, C right.</b> Inorder A ke left/right split deta hai.'],['Post B C A, In B A C: root?','<b>A.</b> Postorder last item root hota hai.'],['Pre A B, Post B A: unique ordinary binary tree?','<b>No.</b> B left ya right child dono possible.'])}
`)

const bstExtremesCode = `def find_min(root):
    if root is None:
        return None

    current = root
    while current.left is not None:
        current = current.left
    return current.val


def find_max(root):
    if root is None:
        return None

    current = root
    while current.right is not None:
        current = current.right
    return current.val


# With the BST from section 12.5:
print(find_min(root))  # 25
print(find_max(root))  # 60`

const complexity = section('GATE D','tree-complexity','Tree Time & Space Complexity','Traversal sab nodes; BST ek path','Height h ko exam question ke convention se map karo.',`
  ${idea('CONVENTION','n = nodes; h = path height','Neeche h = <b>number of nodes on longest root-to-leaf path</b> (empty tree h=0). Thus balanced h=Θ(log n), skewed h=Θ(n). Agar question height edges mein de, nonempty tree ke liye node-height = edge-height + 1; asymptotic O(h) same hota hai.')}
  ${table(['Operation','Time · best / typical / worst','Auxiliary space · implementation in notes','Why'],[
    ['Preorder / Inorder / Postorder','Θ(n) / Θ(n) / Θ(n)','O(h) recursive stack','Every node printed once'],
    ['Level order (BFS)','Θ(n) / Θ(n) / Θ(n)','O(w), worst O(n) queue','All n nodes; w = maximum level width'],
    ['BST search','O(1) root hit / O(h) / O(n) skewed','O(h) recursive; O(1) iterative','Only one comparison path'],
    ['BST insert','O(1) empty tree / O(h) / O(n) skewed','O(h) recursive; O(1) iterative','Descend until a missing child'],
    ['BST delete','O(1) root leaf / O(h) / O(n) skewed','O(h) recursive in these notes','Find target; successor also stays within height'],
    ['BST min / max','O(1) root is extreme / O(h) / O(n) skewed','O(1) iterative; O(h) recursive','Follow left / right pointers only']
  ])}
  ${codebox('BST minimum / maximum · one-direction loops',bstExtremesCode)}
  <div class="bst-before-after">${diagram('Balanced-ish BST · n=7, h=3 nodes',bstArt)}${diagram('Right-skewed BST · n=4, h=4 nodes',`  10\n    \\\n     20\n       \\\n        30\n          \\\n           40`)}</div>
  ${steps('<b>Same operation, two shapes:</b> Search 40 in balanced-ish example hits root immediately O(1); a target on deepest level takes up to h≈log n comparisons. Insert sorted 10,20,30,40 into plain BST → right-skew chain, search 40 needs 4 checks; n keys → Θ(n).','<b>Typical is conditional:</b> O(log n) average claim random-ish insertion or balancing assumption par hota hai; an arbitrary BST has no guaranteed balance. Guaranteed worst for plain BST is O(n).','<b>Delete 2-child:</b> Target tak one path, successor tak right-subtree ka left path, phir unlink; total O(h), not O(n²).','<b>Recursion vs iteration:</b> DFS traversal recursive stack O(h); level order queue O(w). Recursive BST code in 12.5 uses O(h) stack. Iterative BST search/min/max may use O(1) auxiliary space.')}
  ${trap('Traversal O(n) even on balanced tree, because output all nodes. BST O(log n) sirf balanced-height assumption mein. “O(1) best” means lucky root/empty case, not a guarantee for arbitrary input.')}
`)

export const lessonMarkup = [intro,terminology,properties,binaryTypes,binaryProperties,traversals,createTree,preTheory,preCode,inOrder,postOrder,levelOrder,choice,reconstruction,bst,bstInitial,insert,search,deletion,complexity,nary,naryInitial,naryPreSection,naryPostSection,naryLevelSection,dp,depth,count,sum,validate,lca,kth,naryMax,naryHeight,maxPath,leftLeaves,context].join('\n')

export const treePyqRevision = section('PYQ REVISION','pyq-revision','Tree PYQ Revision','Question ki hidden assumption pehle underline karo','2024 DA Q28/Q52 upar verified PYQs hain; neeche ke questions original GATE-style practice hain, official PYQs nahi.',`
  ${table(['Pattern','Exam mein pehla check','Use lesson'],[['Binary tree bound','Height edges ya nodes? Full/perfect assumption?','GATE B · properties'],['Traversal output','Process line before/between/after child calls?','12.4 · traversals'],['BST insert/delete/validity','Ordering global? Delete has 0/1/2 children?','12.5 + 12.8.4'],['Reconstruction','Distinct labels? Inorder available? Full tree?','GATE C · reconstruction'],['Time / space','All nodes visited or only one path? Balanced guaranteed?','GATE D · complexity']])}
  ${checkpoint(
    ['GATE-style · edge-height 3 binary tree: maximum N? Options 7 / 8 / 15 / 16','<b>15.</b> Max N=2^(3+1)−1=15. Edge-height 3 means four levels.'],
    ['GATE-style · full binary tree has 9 nodes. Leaves? Options 4 / 5 / 6 / 8','<b>5.</b> N=2L−1 → L=(9+1)/2=5. Do not use perfect-tree formula.'],
    ['GATE-style · Pre A B D E C; In D B E A C. Root B ke right child kaun? Options A / C / D / E','<b>E.</b> Root A; left inorder D B E; B splits it into D left, E right.'],
    ['GATE-style · BST mein 40 delete; right subtree root 60 with left child 50. Inorder successor? Options 40 / 50 / 60 / none','<b>50.</b> Right subtree ka leftmost node 50 hai; copy 50, then old 50 remove.'],
    ['GATE-style · 10,20,30,40 sorted order mein plain BST insert. Search 40 worst cost? O(1) / O(log n) / O(n) / O(n log n)','<b>O(n).</b> Right-skew chain banegi; no automatic balancing.'],
    ['GATE-style · root 40, left 20, right 60, but 20.right=50. Valid strict BST? Yes / No','<b>No.</b> 50 left subtree of 40 mein hai; ancestor upper bound 40 violate karta hai.']
  )}
`)

export const treeRevisionMarkup = `
  ${section('01','revision-formulas','Formula quick sheet','h edges; H=h+1 nodes; root level 1','Use only under listed assumptions.',`
    ${table(['Formula','Condition','One-number recall'],[['H=h+1; ℓ=d+1','Nonempty path; nodes vs edges','h=3 → H=4'],['At depth d ≤2^d; level ℓ ≤2^(ℓ−1)','Binary tree','d=3 → ≤8'],['h+1 ≤ N ≤ 2^(h+1)−1','Nonempty binary tree, h edges','h=3 → 4…15'],['ceil(log₂(N+1))−1 ≤ h ≤ N−1','Nonempty binary tree','N=7 → h from 2 to 6'],['N=I+L; L≤I+1','Binary tree','I=4 → L≤5'],['L=I+1; N=2I+1=2L−1','Full binary tree','I=4 → L=5, N=9'],['L=2^h; I=2^h−1; N=2^(h+1)−1','Perfect binary tree','h=3 → L=8, I=7, N=15']])}
  `)}
  ${section('02','revision-types','Tree type comparison','Shape label ka exact test','Perfect ⇒ full + complete + balanced; reverse not guaranteed.',`
    ${table(['Type','Spot it','Must NOT assume'],[['Full','0 or 2 children per node','All levels filled'],['Complete','Last level left-packed','Every internal has 2 children'],['Perfect','All levels filled','Same as arbitrary full tree'],['Balanced','Subtree heights differ at most 1 at each node (here)','Last level left-packed'],['Skewed','Only left or only right links','Logarithmic BST height']])}
  `)}
  ${section('03','revision-traversals','Traversal comparison','Process line decides order','Each traversal visits n nodes once.',`
    ${table(['Traversal','Rule','Use','Time','Extra space'],[['Preorder','N-L-R','Parent before children','O(n)','O(h) DFS stack'],['Inorder','L-N-R','BST sorted values','O(n)','O(h) DFS stack'],['Postorder','L-R-N','Child results before parent','O(n)','O(h) DFS stack'],['Level order','Queue / BFS','Levels, shortest depth in tree','O(n)','O(w) queue; worst O(n)']])}
  `)}
  ${section('04','revision-bst-cost','BST operation complexity','One path ≠ always logarithmic','Plain BST needs balanced-height assumption for O(log n).',`
    ${table(['Operation','Balanced height','Skewed height','Extra space in notes'],[['Search / insert / delete','O(log n)','O(n)','O(h) recursive'],['Find min / max (one path)','O(log n)','O(n)','O(1) iterative'],['Full traversal','O(n)','O(n)','O(h) recursive']])}
  `)}
  ${section('05','revision-traps','Common mistakes & exam traps','Assumption change → formula/complexity change','Quick pre-submit scan.',`
    ${table(['Trap','Correct check'],[['h edges vs H nodes','H=h+1 for nonempty tree; root depth 0 but level 1'],['Full vs perfect','Full means 0/2 children; perfect also fills every level'],['L=I+1 on arbitrary binary tree','Only full tree equality; general binary bound L≤I+1'],['Inorder always sorted','Only BST, not arbitrary binary tree'],['Pre+post always unique','Not arbitrary tree; full-tree condition matters'],['BST operations always O(log n)','Plain skewed BST has O(n) height'],['Traversal on balanced tree O(log n)','To output all n nodes, still O(n) time']])}
  `)}
  ${section('06','revision-practice','GATE-style practice with solutions','Original drills, not official PYQs','Try before opening each solution; official Q28/Q52 remain separate in PYQ tab.',`
    ${checkpoint(
      ['1 · A tree has 6 nodes. How many edges? Options 5 / 6 / 7 / 12','<b>5.</b> Connected acyclic tree always has N−1 edges = 6−1.'],
      ['2 · Complete tree has root A; children B,C; last level D,E,F left-packed. Is it full?','<b>No.</b> C has only left child F; complete does not imply full.'],
      ['3 · Perfect binary tree edge-height h=3. Nodes and leaves?','<b>N=15, L=8.</b> N=2^(h+1)−1 and L=2^h.'],
      ['4 · Pre A B D E C F; In D B E A F C. Right subtree root?','<b>C.</b> Pre first A root; inorder right partition F C; pre right segment C F starts at C.'],
      ['5 · BST root 40 has left 20 and right 60; 20.right=50. Valid BST?','<b>No.</b> 50 is a left descendant of 40 but exceeds 40.'],
      ['6 · Plain BST inserted in sorted order, n keys. Search worst time and recursive extra space?','<b>O(n) time, O(n) stack.</b> Right-skew chain gives h=n; iterative search could use O(1) extra space.']
    )}
  `)}
  ${section('07','revision-checklist','Final GATE DA Trees checklist','Har item bina notes dekhe explain kar sako','Core syllabus first; recommended add-ons clearly labelled.',`
    ${steps('<b>Core:</b> tree/node/parent/leaf; N−1 edges; root depth 0 vs level 1; edge-height vs node-height.','<b>Core:</b> pre/in/post/level order trace; DFS stack vs BFS queue; traversal time and space.','<b>Core:</b> BST global invariant; insert/search/delete 0/1/2-child cases; validate bounds; balanced vs skewed O(h).','<b>Core exam numericals:</b> binary max/min nodes, level capacity, I/L relationships; full/perfect condition identify.','<b>Recommended extension:</b> traversal-pair reconstruction (2024 DA Q28 directly tests it), shape labels, and simple reconstruction code.','<b>Already in lecture notes, beyond this add-on:</b> N-ary traversal and recursive tree problems; no AVL/red-black/heaps/advanced graph algorithms added.')}
    ${trap('Final scan: question ka tree type aur height convention likhe bina formula use mat karo. Official 2024 DA Q28/Q52 ko GATE-style generated questions se separate rakho.')}
  `)}
`
