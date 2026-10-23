import katex from 'katex'
import 'katex/dist/katex.min.css'

const esc = value => String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')
const formula = tex => `<div class="graph-formula">${katex.renderToString(tex, {displayMode:true, throwOnError:true})}</div>`
const inlineFormula = tex => katex.renderToString(tex, {throwOnError:true})
const section = (no, id, name, title, lead, body) => `<section class="chapter searchable" id="${id}" data-title="${no} · ${name}"><div class="chapter-head"><div class="chapter-no"><span>${no}</span><small>${name.toUpperCase()}</small></div><div><h2>${title}</h2><p>${lead}</p></div></div>${body}<button type="button" class="topic-practice" data-practice-topic="${id}">GATE-style practice for this lesson →</button></section>`
const table = (heads, rows) => `<div class="table-wrap"><table><thead><tr>${heads.map(x => `<th>${x}</th>`).join('')}</tr></thead><tbody>${rows.map(row => `<tr>${row.map(x => `<td>${x}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`
const pointers = items => `<ul class="note-pointers">${items.map(item => `<li>${item}</li>`).join('')}</ul>`
const code = (label, source) => `<div class="codebox green"><div><span>${label}</span><button type="button">Copy</button></div><pre><code>${esc(source)}</code></pre></div>`
const trap = text => `<div class="danger"><b>GATE trap</b><p>${text}</p></div>`
const check = (question, answer) => `<details class="graph-check"><summary>${question}</summary><p>${answer}</p></details>`
const positions = {A:[100,90],B:[260,45],C:[260,180],D:[430,90],E:[440,225]}
const edges = [['A','B'],['A','C'],['B','D'],['C','D'],['D','E']]
const figure = (caption, directed = false, labels = {}) => `<figure class="graph-figure"><figcaption>${caption}</figcaption><svg viewBox="0 0 580 275" role="img" aria-label="${caption}"><defs><marker id="m13arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L10 5L0 10z"/></marker></defs><g class="graph-edges">${edges.map(([a,b]) => { const [x1,y1]=positions[a], [x2,y2]=positions[b], dx=x2-x1, dy=y2-y1, n=Math.hypot(dx,dy), ux=dx/n, uy=dy/n; return `<line x1="${x1+ux*27}" y1="${y1+uy*27}" x2="${x2-ux*(directed?36:27)}" y2="${y2-uy*(directed?36:27)}" ${directed?'marker-end="url(#m13arrow)"':''}/>${labels[a+b]?`<text class="graph-weight" x="${(x1+x2)/2}" y="${(y1+y2)/2-12}">${labels[a+b]}</text>`:''}` }).join('')}</g>${Object.entries(positions).map(([v,[x,y]])=>`<g class="graph-node"><circle cx="${x}" cy="${y}" r="25"/><text x="${x}" y="${y+1}" text-anchor="middle" dominant-baseline="central">${v}</text></g>`).join('')}</svg></figure>`
const typeDiagram = (caption, nodes, links, directed = false) => {
  const markerId = `type-arrow-${caption.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`
  const paths = links.map(({from, to, weight, curve = 0}) => {
    const [x1,y1] = nodes[from]
    if (from === to) return `<path d="M ${x1-16} ${y1-20} C ${x1-65} ${y1-84}, ${x1+65} ${y1-84}, ${x1+16} ${y1-20}" ${directed?`marker-end="url(#${markerId})"`:''}/>`
    const [x2,y2] = nodes[to]
    const dx=x2-x1, dy=y2-y1, len=Math.hypot(dx,dy), ux=dx/len, uy=dy/len
    const startX=x1+ux*28, startY=y1+uy*28, endX=x2-ux*(directed?34:28), endY=y2-uy*(directed?34:28)
    const midX=(startX+endX)/2-uy*curve, midY=(startY+endY)/2+ux*curve
    return `<path d="M ${startX} ${startY} Q ${midX} ${midY} ${endX} ${endY}" ${directed?`marker-end="url(#${markerId})"`:''}/>${weight===undefined?'':`<text class="graph-weight" x="${midX-uy*15}" y="${midY+ux*15-5}" text-anchor="middle">${weight}</text>`}`
  }).join('')
  return `<figure class="graph-figure graph-type-figure"><figcaption>${caption}</figcaption><svg viewBox="0 0 420 210" role="img" aria-label="${caption}"><defs><marker id="${markerId}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L10 5L0 10z"/></marker></defs><g class="graph-edges">${paths}</g>${Object.entries(nodes).map(([name,[x,y]])=>`<g class="graph-node"><circle cx="${x}" cy="${y}" r="24"/><text x="${x}" y="${y+1}" text-anchor="middle" dominant-baseline="central">${name}</text></g>`).join('')}</svg></figure>`
}
const weightedFigure = () => {
  const nodes={S:[70,150],A:[225,65],B:[225,230],C:[405,150],T:[535,150]}
  const weightedEdges=[['S','A',4],['S','B',1],['B','A',2],['A','C',1],['B','C',5],['C','T',3]]
  return `<figure class="graph-figure"><figcaption>Dijkstra example · arrows show direction, numbers show cost</figcaption><svg viewBox="0 0 600 290" role="img" aria-label="Directed graph: S to A cost 4, S to B cost 1, B to A cost 2, A to C cost 1, B to C cost 5, C to T cost 3"><defs><marker id="weighted-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L10 5L0 10z"/></marker></defs><g class="graph-edges">${weightedEdges.map(([u,v,w])=>{const [x1,y1]=nodes[u], [x2,y2]=nodes[v], dx=x2-x1,dy=y2-y1,n=Math.hypot(dx,dy),ux=dx/n,uy=dy/n;return `<line x1="${x1+ux*28}" y1="${y1+uy*28}" x2="${x2-ux*36}" y2="${y2-uy*36}" marker-end="url(#weighted-arrow)"/><text class="graph-weight" x="${(x1+x2)/2+uy*18}" y="${(y1+y2)/2-ux*18}" text-anchor="middle">${w}</text>`}).join('')}</g>${Object.entries(nodes).map(([v,[x,y]])=>`<g class="graph-node"><circle cx="${x}" cy="${y}" r="25"/><text x="${x}" y="${y+1}" text-anchor="middle" dominant-baseline="central">${v}</text></g>`).join('')}</svg></figure>`
}
export const lectureData = [
 ['13.1','Introduction','Vertices, edges and paths','intro'],['13.2','Types of Graphs','Eight lecture graph types','types'],['13.3','Degree of a Graph','Undirected, in/out degree, sequence','degree'],['13.4','Connectivity','Connected vs disconnected','connectivity'],
 ['13.5','Graph Memory Representation','Matrix vs list','representation'],['13.5.1','Adjacency Matrix','Rows, columns, weights','matrix'],['13.5.2','Adjacency List','Neighbour collection','adj-list'],
 ['13.6','Graph Traversal','Visited, DFS and BFS','traversal'],['13.6.1','DFS Theory','Stack and discovery','dfs-theory'],['13.6.2','DFS Code','Runnable recursive DFS','dfs-code'],['13.6.3','BFS Theory','Queue and levels','bfs-theory'],['13.6.4','BFS Code','Runnable queue BFS','bfs-code'],['13.6.7','Choice of Traversal','Select by guarantee','choice'],
 ['13.7','Shortest Path Algorithms','Relaxation and selection','shortest'],['13.7.1','Dijkstra Theory','Non-negative weights','dijkstra-theory'],['13.7.2','Dijkstra Code','Simple Python trace','dijkstra-code'],['13.7.3','Bellman-Ford Theory','Negative edges and cycles','bellman-ford'],['13.7.5','Floyd-Warshall Theory','All-pairs matrix','floyd-warshall'],['13.10','DAG','Directed acyclic dependencies','dag'],['13.10.1',"Kahn's Algorithm Theory",'In-degree and topology','kahn']
]

const intro = section('13.1','intro','Introduction','Graph = connections ka model','MUST · G=(V,E), where V vertices and E edges.', `
 ${figure('Five vertices; undirected edges AB, AC, BD, CD, DE')}
 <p>City ko vertex aur road ko edge socho. Is graph mein <b>V={A,B,C,D,E}</b>, |V|=5, <b>E={AB,AC,BD,CD,DE}</b>, |E|=5. A aur B adjacent; A aur E direct adjacent nahi. A→B→D→E ek path of 3 edges hai.</p>
 ${table(['Word','Exact meaning','Example'],[['Walk','Edges/vertices repeat allowed','A-B-D-C-A-B'],['Trail','Edge repeat nahi','A-B-D-C-A'],['Path','Vertex repeat nahi','A-B-D-E'],['Cycle','Start/end same; other vertices distinct','A-B-D-C-A']])}
 <p>Tree graph ka special connected, acyclic case tha. General graph cyclic ya disconnected bhi ho sakta hai; layout rotate karne se connections change nahi hoti.</p>
 ${trap('Every graph ke liye E=V−1 nahi. Is example mein V=5 and E=5 because cycle exists.')}${check('A-B-D-C-A kya hai?','Four-edge cycle; start/end A same, other vertices distinct.')}`)

const types = section('13.2','types','Types of Graphs','Lecture ke 8 types · har ek ka graph','MUST · Har heading ek alag property batati hai; properties combine bhi ho sakti hain.', `
 ${pointers(['Ek graph <b>directed aur weighted</b> dono ho sakta hai—types mutually exclusive options nahi hain.','Har graph mein pehle arrow, phir weight, phir cycle aur adjacency dekho.'])}
 <h3>1 · Undirected graph</h3>
 ${typeDiagram('Undirected · 0–4 lecture example', {'1':[70,60],'0':[210,60],'3':[350,60],'2':[70,160],'4':[350,160]}, [{from:'1',to:'0'},{from:'1',to:'2'},{from:'2',to:'0'},{from:'0',to:'3'},{from:'3',to:'4'}])}
 ${pointers(['Edges par <b>arrows nahi</b> hote; connection dono taraf use kar sakte hain.','Line 1—0: 1 se 0 aur 0 se 1 ja sakte hain. Phir bhi ye <b>ek</b> undirected edge hai, two directed arrows nahi.','Edge ke endpoints <b>unordered pair</b> hain: {1,0} = {0,1}. Nodes khud unordered pairs nahi hain.','Direction fixed nahi, isliye graph apne aap 1 ko parent aur 0 ko child nahi banata. DFS/BFS ka traversal parent alag concept hai.','General undirected graph mein 0—0 jaisa <b>self-loop</b> ho sakta hai; simple graph mein loop allowed nahi.'])}
 <h3>2 · Directed graph</h3>
 ${typeDiagram('Directed · arrows follow karo', {'1':[70,60],'0':[210,60],'3':[350,60],'2':[70,160],'4':[350,160]}, [{from:'1',to:'0'},{from:'0',to:'3'},{from:'3',to:'4'},{from:'4',to:'0'},{from:'0',to:'2'},{from:'2',to:'1'}], true)}
 ${pointers(['Har edge ka <b>arrow</b> direction batata hai: 1→0 allowed; 0→1 tabhi jab separate reverse arrow ho.','Directed edge ordered pair hai: (1,0) aur (0,1) alag edges hain.','Path par har arrow follow karna zaroori hai; arrow ke against move nahi kar sakte.','Directed graph mein cycle possible hai: diagram ka <b>0→3→4→0</b> closed directed path hai.','Arrow ka start <b>source/tail</b> aur end <b>destination/head</b> hai.'])}
 <h3>3 · Weighted graph</h3>
 ${typeDiagram('Weighted · each edge has a number', {A:[70,65],B:[350,65],C:[210,160]}, [{from:'A',to:'B',weight:10},{from:'A',to:'C',weight:2},{from:'C',to:'B',weight:3}])}
 ${pointers(['Har edge ko <b>weight</b> assign hota hai; weight distance, time, cost ya kisi aur measure ko represent kar sakta hai.','A—B direct edge ka weight 10; A—C—B route ka total <b>2+3=5</b>. Do edges wali route yahan cheaper hai.','Diagram mein arrows nahi hain: ye <b>weighted + undirected</b> graph hai. Weighted graph directed bhi ho sakta hai.'])}
 <h3>4 · Unweighted graph</h3>
 ${typeDiagram('Unweighted · only connections, no given costs', {A:[70,65],B:[350,65],C:[210,160]}, [{from:'A',to:'B'},{from:'A',to:'C'},{from:'C',to:'B'}])}
 ${pointers(['Edges par <b>given weight/cost nahi</b> likha; line sirf connection ka presence batati hai.','Hop-count problem mein har edge ko 1 hop count karte hain: A—B = <b>1 hop</b>, A—C—B = <b>2 hops</b>.','Unweighted ka matlab edge missing nahi; bas different numeric costs specified nahi hain.'])}
 <h3>5 · Cyclic graph</h3>
 ${typeDiagram('Cyclic · A–B–C–A returns to A', {A:[70,65],B:[350,65],C:[210,160]}, [{from:'A',to:'B'},{from:'B',to:'C'},{from:'C',to:'A'}])}
 ${pointers(['Ek ya zyada <b>cycles / closed paths</b> present hote hain.','Diagram: A—B—C—A par start A aur end A hai; beech ke vertices repeat nahi hote.','Cyclic graph undirected ya directed ho sakta hai. Directed case mein poora cycle <b>arrow direction</b> follow karega.','Graph mein multiple cycles ho sakte hain; sirf ek cycle milna cyclic prove karne ke liye enough hai.'])}
 <h3>6 · Acyclic graph</h3>
 ${typeDiagram('Directed acyclic · arrows never form a closed path', {A:[70,55],B:[210,55],C:[140,145],E:[350,85],D:[300,165]}, [{from:'A',to:'C'},{from:'B',to:'C'},{from:'B',to:'E'},{from:'C',to:'D'},{from:'E',to:'D'}], true)}
 ${pointers(['<b>Koi cycle nahi</b>: kisi path ko follow karke starting node par wapas nahi aa sakte.','Diagram mein arrows follow karo: A→C→D par D se A ko return arrow nahi; B→E→D par D se B ko return arrow nahi.','Directed acyclic graph ko <b>DAG</b> kehte hain. Undirected connected acyclic graph <b>tree</b> hota hai.','Directed graph mein arrows ignore karke closed shape dikhna directed cycle ka proof nahi; valid arrow-following return path chahiye.'])}
 <h3>7 · Complete graph</h3>
 ${typeDiagram('Complete simple undirected K4 · all six pairs', {A:[90,55],B:[330,55],C:[90,160],D:[330,160]}, [{from:'A',to:'B'},{from:'A',to:'C'},{from:'A',to:'D'},{from:'B',to:'C'},{from:'B',to:'D'},{from:'C',to:'D'}])}
 ${pointers(['Har node <b>har doosre node ka neighbour</b> hai; har pair directly connected hai.','K₄ mein 4 vertices aur <b>6</b> edges hain: AB, AC, AD, BC, BD, CD.','Simple undirected complete graph Kₙ ke liye edge count = nC₂ = '+inlineFormula(String.raw`\frac{n(n-1)}{2}`)+'.','Reason: each of n vertices has n−1 neighbours; n(n−1) endpoint counts mein har edge twice aati hai, isliye 2 se divide.'])}
 <h3>8 · Incomplete graph</h3>
 ${typeDiagram('Incomplete · A and D are not adjacent', {A:[90,55],B:[330,55],C:[90,160],D:[330,160]}, [{from:'A',to:'B'},{from:'A',to:'C'},{from:'B',to:'C'},{from:'B',to:'D'},{from:'C',to:'D'}])}
 ${pointers(['<b>Kam se kam ek pair</b> directly connected nahi hai; har node har doosre node ka neighbour nahi.','Diagram mein A aur D ke beech line missing hai: <b>A aur D adjacent nahi</b>, isliye graph incomplete hai.','Incomplete ka matlab disconnected nahi. Yahan <b>A—B—D</b> path available hai, so A se D reachable hain—bas direct edge nahi.'])}
 ${trap('Kₙ ka n(n−1)/2 edge formula simple undirected complete graph par lagao. Incomplete ≠ disconnected; undirected edge ≠ two directed arrows.')}
 ${check('K₄ se A—D remove kar do: graph complete hai?','Nahi. A aur D directly adjacent nahi; graph incomplete hai, even though A se D tak indirect path mil sakta hai.')}
 ${check('A→B aur B→A same directed edge hain?','Nahi. Directed graph mein ye two distinct ordered pairs hain; ek arrow reverse ko imply nahi karta.')}`)

const degree = section('13.3','degree','Degree of a Graph','Har vertex se connected edges count karo','MUST · Degree, in/out-degree, degree sequence.', `
 ${pointers(['<b>Degree ek vertex ki property hai</b>—poore graph ka ek single degree nahi hota.','<b>Incident edge</b> = jo edge us vertex ko touch karti hai. Degree us vertex ki incident edges ki count hai.'])}
 <h3>1 · Undirected graph mein degree</h3>
 ${figure('Undirected example: D has degree 3')}
 ${pointers(['Arrow nahi hai, isliye edge ko bas ek baar us vertex par count karo.','D ko B—D, C—D aur D—E touch karti hain; isliye <b>deg(D)=3</b>.','A ko A—B aur A—C touch karti hain; isliye <b>deg(A)=2</b>.'])}
 ${table(['Vertex','Incident edges','Degree'],[['A','A—B, A—C','2'],['B','A—B, B—D','2'],['C','A—C, C—D','2'],['D','B—D, C—D, D—E','3'],['E','D—E','1']])}
 <h3>2 · Directed graph mein in-degree aur out-degree</h3>
 ${typeDiagram('Directed degree · A→B, C→B, B→D', {A:[70,50],B:[210,105],C:[70,160],D:[350,105]}, [{from:'A',to:'B'},{from:'C',to:'B'},{from:'B',to:'D'}], true)}
 ${pointers(['<b>In-degree</b> = vertex ke andar aane wale arrows ki count.','<b>Out-degree</b> = vertex se bahar jaane wale arrows ki count.','B par A→B aur C→B aate hain, so <b>in-degree(B)=2</b>. B→D bahar jaata hai, so <b>out-degree(B)=1</b>.','Directed vertex ka total degree chahiye to <b>in-degree + out-degree</b> karo; B ka total 3 hai.'])}
 ${table(['Vertex','Coming in','Going out','In-degree','Out-degree'],[['A','—','A→B','0','1'],['B','A→B, C→B','B→D','2','1'],['C','—','C→B','0','1'],['D','B→D','—','1','0']])}
 <h3>3 · Degree sequence</h3>
 ${pointers(['<b>Degree sequence</b> = graph ke sabhi vertices ki degrees ki list.','Usually list ko <b>descending order</b> mein likhte hain—largest degree pehle.','Upar undirected example: A, B, C, D, E ki degrees <b>[2, 2, 2, 3, 1]</b>; sorted degree sequence <b>[3, 2, 2, 2, 1]</b>.','Directed graph mein question clarify karega ki <b>in-degree sequence</b>, <b>out-degree sequence</b> ya <b>total-degree sequence</b> chahiye.'])}
 <h3>GATE check · degree totals</h3>
 ${pointers(['Formula mein <b>V</b> vertices ka set, <b>x</b> ek vertex, <b>deg(x)</b> us vertex ki degree, aur <b>|E|</b> edges ki count hai. Figure ka vertex E aur formula ka edge-set E alag hain.','Har undirected edge ke do ends hain, so sab degrees add karne par woh edge twice count hoti hai.'])}
 ${formula(String.raw`\sum_{x\in V}\deg(x)=2|E|`)}
 ${formula(String.raw`\underbrace{2+2+2+3+1}_{\text{A,B,C,D,E ki degrees}}=10=2\times\underbrace{5}_{\text{edges}}`)}
 ${pointers(['Sequence [3,2,2,2,1] ka sum bhi <b>10</b> hai—sorting se sum change nahi hota.','Odd-degree vertices D (3) aur E (1) hain: count 2, jo even hai. Undirected graph mein odd-degree vertices ki count hamesha even hoti hai.','Directed example mein har arrow ek out-degree aur ek in-degree add karta hai.'])}
 ${formula(String.raw`\sum_{x\in V}\operatorname{inDeg}(x)=\sum_{x\in V}\operatorname{outDeg}(x)=|E|`)}
 ${pointers(['Directed example mein in-degrees ka sum 0+2+0+1=3; out-degrees ka sum 1+1+1+0=3; arrows bhi 3 hain.','Self-loop directed vertex ke in-degree aur out-degree dono mein 1 add karta hai; undirected vertex ki degree mein 2 add karta hai.'])}
 ${trap('Degree sequence usually descending sorted hoti hai. Directed graph mein in-, out-, aur total-degree ko mix mat karo. Ek directed edge in-degree total mein 1 aur out-degree total mein 1 add karti hai.')}
 ${check('D ka degree 3 kyun hai?','B—D, C—D aur D—E: teen incident edges.')}
 ${check('Undirected degree sequence [3,2,2,2,1] ka sum 10 hai. Edges kitni?','10 ÷ 2 = 5 edges.')}`)

const connectivity = section('13.4','connectivity','Connectivity','Kya har vertex tak path milta hai?','MUST · Connected vs disconnected graphs.', `
 ${pointers(['<b>Connectivity</b> batati hai ki graph ke vertices paths se kaise linked hain.','Is lecture mein pehle <b>undirected</b> graphs dekho: edge par arrow nahi, dono directions mein travel allowed.','Do cases: <b>connected</b> aur <b>disconnected</b>.'])}
 <h3>1 · Connected graph</h3>
 ${typeDiagram('Connected · A, B, C, D, E all reachable', {A:[65,55],B:[205,55],C:[65,160],D:[205,160],E:[350,105]}, [{from:'A',to:'B'},{from:'A',to:'C'},{from:'C',to:'D'},{from:'B',to:'D'},{from:'B',to:'E'},{from:'D',to:'E'}])}
 ${pointers(['<b>Har pair</b> of vertices ke beech kam se kam ek path milta hai.','Path <b>direct</b> ho sakta hai: A—B ek edge.','Path <b>indirect</b> bhi ho sakta hai: A—B—E, so A se E reachable hai even though A—E direct edge nahi.','Graph ke saare vertices ek hi connected part mein hain.'])}
 <h3>2 · Disconnected graph</h3>
 ${typeDiagram('Disconnected · D is isolated', {A:[65,55],B:[205,55],C:[65,160],D:[205,160],E:[350,105]}, [{from:'A',to:'B'},{from:'A',to:'C'},{from:'B',to:'E'}])}
 ${pointers(['<b>Kam se kam ek pair</b> of vertices ke beech koi path nahi milta.','Diagram mein D se kisi aur vertex tak edge ya indirect path nahi: D <b>isolated</b> hai.','{A,B,C,E} ek connected part hai; {D} doosra part. In parts ko <b>connected components</b> kehte hain.','Disconnected hone ke liye isolated vertex zaroori nahi: do alag multi-vertex groups bhi ho sakte hain.'])}
 ${check('A se E direct edge nahi. Kya connected graph disconnected ho gaya?','Nahi. A—B—E indirect path milta hai, so graph connected reh sakta hai.')}
 <details class="graph-check"><summary>Extra · directed graph mein connectivity</summary>
 ${pointers(['Directed graph mein arrows follow karne hote hain; A se B reachable hone ka matlab B se A reachable hona nahi.','<b>Strongly connected:</b> every pair dono directions mein reachable.','<b>Weakly connected:</b> arrows ko ignore karke undirected graph connected dikhe. Strong aur weak ko basic undirected connected/disconnected se mix mat karo.','Edge reversal mein har u→v ko v→u banao. Reversed graph mein s→t path tabhi hota hai jab original mein t→s path ho.'])}
 ${table(['Original G','Reversed Gᴿ','Result'],[['A→B, B→C, D→B','B→A, C→B, B→D','G: A reaches C; Gᴿ: C reaches A and D']])}
 </details>
 ${trap('Connected ka matlab har pair ke beech direct edge nahi—indirect path enough hai. Directed case mein arrows ignore karna sirf weak connectivity check ke liye hai.')}
 ${check('Graph mein {A,B,C} aur {D,E} hain, beech mein edge nahi. Connected?','Nahi. A se D tak path nahi, so graph disconnected hai.')}`)

const representation = section('13.5','representation','Memory Representation','Same graph ko memory mein kaise rakhein?','MUST · Matrix aur list ke beech choice samjho.', `
 <h3>Graph representation ki zaroorat kyun?</h3>
 ${pointers(['Diagram mein circles aur lines dikhte hain; program ko vertices aur unke connections <b>memory mein store</b> karne hote hain.','Representation decide karti hai ki <b>kitni memory</b> lagegi, kisi vertex ke <b>neighbours kaise milenge</b>, aur graph algorithms kitni efficiently chalenge.','Ek hi graph ko alag structures mein store kar sakte hain; edges aur reachability nahi badalte—sirf storage aur access ka tareeqa badalta hai.'])}
 <h3>Choice kin cheezon par depend karti hai?</h3>
 ${pointers(['<b>V</b> = vertices ki count; <b>E</b> = edges ki count.','Graph <b>sparse</b> hai to possible pairs ke comparison mein edges kam hain; <b>dense</b> hai to kaafi pairs connected hain.','Task bhi matter karta hai: baar-baar “u aur v directly connected hain?” poochna hai, ya u ke saare neighbours traverse karne hain?','Isliye koi ek representation har graph aur har operation ke liye best nahi hoti.'])}
 <h3>Do common representations</h3>
 ${pointers(['<b>Adjacency matrix:</b> V×V grid; row u, column v batate hain ki u se v edge hai ya nahi.','<b>Adjacency list:</b> har vertex ke saath uske neighbours ki list store hoti hai.','A—B aur A—C example mein matrix ki A row mein B,C ke cells marked honge; list mein <code>A: [B, C]</code> hoga. Next two lessons mein dono step-by-step banenge.'])}
 ${figure('Same graph will become both a matrix and a list')}
 <h3>Quick comparison · details next lessons mein</h3>
 ${table(['Operation','Adjacency matrix','Adjacency list'],[['Space','O(V²)','O(V+E)'],['Check edge (u,v)','O(1)','O(deg(u)) for list neighbours'],['Enumerate neighbours of u','O(V)','O(deg(u))'],['DFS/BFS time','O(V²)','O(V+E)'],['Good for','Dense graph, fast edge test','Sparse graph, fast traversal']])}
 ${pointers(['Undirected edge u—v list mein u aur v dono ke neighbours mein aati hai; matrix mein [u][v] aur [v][u] mark hote hain.','Directed edge u→v sirf u ki outgoing list aur matrix ke [u][v] cell mein jaati hai.','List ka O(V+E) storage undirected edges ko twice likhne ke baad bhi same order hai: O(V+2E)=O(V+E).'])}`)

const matrix = section('13.5.1','matrix','Adjacency Matrix','Row se column tak edge hai?','MUST · Undirected aur directed dono fill karke dekho.', `
 ${pointers(['<b>V vertices</b> ke liye V×V grid banao. Yahan A, B, C, D hain, so <b>4×4 matrix</b>.','Row aur column dono par same vertex order A, B, C, D rakho.','Unweighted graph mein <b>1 = edge present</b>, <b>0 = edge absent</b>.','Cell <code>matrix[u][v]</code> dekho: row u se column v tak direct edge hai?'])}
 <h3>1 · Undirected graph → symmetric matrix</h3>
 ${typeDiagram('Undirected · AB, AD, BC, BD, CD', {A:[90,55],B:[330,55],C:[330,160],D:[90,160]}, [{from:'A',to:'B'},{from:'A',to:'D'},{from:'B',to:'C'},{from:'B',to:'D'},{from:'C',to:'D'}])}
 ${table(['From ↓ / To →','A','B','C','D'],[['A','0','1','0','1'],['B','1','0','1','1'],['C','0','1','0','1'],['D','1','1','1','0']])}
 ${pointers(['A—B hai, so <code>matrix[A][B]=1</code> aur <code>matrix[B][A]=1</code>.','A—C nahi hai, so <code>matrix[A][C]=0</code> aur <code>matrix[C][A]=0</code>.','Undirected edge dono directions mein use hoti hai, isliye matrix <b>main diagonal ke across symmetric</b> hoti hai.','Diagonal A→A, B→B etc. yahan 0 hai because self-loop nahi hai.'])}
 <h3>2 · Directed graph → arrow direction matters</h3>
 ${typeDiagram('Directed · B→A, B→D, C→B, D→A, D→C', {A:[90,55],B:[330,55],C:[330,160],D:[90,160]}, [{from:'B',to:'A'},{from:'B',to:'D'},{from:'C',to:'B'},{from:'D',to:'A'},{from:'D',to:'C'}], true)}
 ${table(['From ↓ / To →','A','B','C','D'],[['A','0','0','0','0'],['B','1','0','0','1'],['C','0','1','0','0'],['D','1','0','1','0']])}
 ${pointers(['Row <b>source/from</b>, column <b>destination/to</b>. B→A hai, so <code>matrix[B][A]=1</code>; A→B nahi, so <code>matrix[A][B]=0</code>.','B ki row mein A aur D par 1 hain: B se do outgoing arrows hain. A ki row all zero hai: A se koi outgoing arrow nahi.','Directed graph ki matrix generally <b>symmetric nahi</b> hoti; reverse arrow automatically add mat karo.'])}
 ${code('Python · undirected matrix', "vertices = ['A', 'B', 'C', 'D']\nedges = [('A','B'), ('A','D'), ('B','C'), ('B','D'), ('C','D')]\nindex = {'A':0, 'B':1, 'C':2, 'D':3}\nmatrix = []\nfor row in range(len(vertices)):\n    matrix.append([0] * len(vertices))\nfor u, v in edges:\n    matrix[index[u]][index[v]] = 1\n    matrix[index[v]][index[u]] = 1\nprint(matrix)")}
 ${code('Python · directed matrix', "vertices = ['A', 'B', 'C', 'D']\nedges = [('B','A'), ('B','D'), ('C','B'), ('D','A'), ('D','C')]\nindex = {'A':0, 'B':1, 'C':2, 'D':3}\nmatrix = []\nfor row in range(len(vertices)):\n    matrix.append([0] * len(vertices))\nfor source, destination in edges:\n    matrix[index[source]][index[destination]] = 1\nprint(matrix)  # reverse cell automatically set nahi hota")}
 ${pointers(['Weighted matrix mein present edge ke cell mein 1 ke badle <b>weight</b> rakh sakte hain. Missing edge ke liye ∞ jaisa sentinel use karo; 0 valid weight bhi ho sakta hai.'])}
 <h3>Advantages · matrix kab useful hai?</h3>
 ${pointers(['<b>Edge present?</b> <code>matrix[u][v]</code> ek cell read karo → O(1).','<b>Edge add/remove:</b> known u aur v ke cell ko 1/0 set karo → O(1); undirected case mein symmetric cell bhi set karo, still O(1).','<b>Dense graph:</b> edges bahut zyada hon to V×V grid ke kaafi cells useful hote hain; matrix ka fixed O(V²) space less wasteful lagta hai.','<b>Matrix operations:</b> numerical/vectorized libraries, aur suitable workloads mein GPUs, matrix-based calculations ko efficiently process kar sakte hain. Ye har graph algorithm ke liye automatic speedup nahi hai.'])}
 <h3>Disadvantages · matrix kab costly hai?</h3>
 ${pointers(['<b>Space O(V²)</b> har case mein: V=1,000 ho to 1,000,000 cells, chahe edges sirf kuch hi hon. Sparse graph mein mostly zeros store hote hain.','<b>Neighbours dhoondhna O(V):</b> u ki poori row scan karni padti hai, chahe u ka ek hi neighbour ho.','<b>Traversal O(V²):</b> DFS/BFS mein rows scan karne ki wajah se matrix representation par V vertices ke liye O(V²) time lag sakta hai; adjacency list sparse graph mein O(V+E) hoti hai.','<b>New vertex add karna</b> fixed-size matrix mein nayi row aur column maangta hai; resize/copy costly ho sakta hai.'])}
 ${trap('Directed matrix mein row/column reverse mat karo. B→A cell [B][A] hai; [A][B] tabhi 1 jab separate A→B arrow ho.')}
 ${check('Undirected A—D ke liye kaunse two cells 1 honge?','[A][D] aur [D][A], dono 1.')}`)

const adjList = section('13.5.2','adj-list','Adjacency List','Har vertex ke neighbours','MUST · Natural input for graph traversals.', `
 ${pointers(['Har vertex ke saamne uske <b>direct neighbours</b> ki list rakho. Screenshot ki row A → B → D → X mein arrows <b>list ke next links</b> hain, graph ke directed edges nahi.','Screenshot ka <b>X / Null</b> list ka end hai, koi extra vertex nahi. Python mein wahi idea <code>{"A": ["B", "D"]}</code> se likh sakte ho.'])}
 <h3>1 · Undirected graph: dono endpoints ki lists mein entry</h3>
 ${typeDiagram('Undirected · edges AB, AD, BD, BC, CD', {A:[90,55],B:[330,55],C:[330,160],D:[90,160]}, [{from:'A',to:'B'},{from:'A',to:'D'},{from:'B',to:'D'},{from:'B',to:'C'},{from:'C',to:'D'}])}
 ${table(['Vertex','Neighbour chain'],[['A','B → D → Null'],['B','A → C → D → Null'],['C','B → D → Null'],['D','A → B → C → Null']])}
 ${pointers(['A—B ek undirected edge hai, isliye <b>B, A ki list mein</b> aur <b>A, B ki list mein</b> dono aayenge.','Graph mein 5 edges hain; lists mein total <b>10 neighbour entries</b> hain, kyunki each edge twice store hoti hai.'])}
 ${code('Python · same undirected graph', "vertices = ['A', 'B', 'C', 'D']\nedges = [('A', 'B'), ('A', 'D'), ('B', 'C'), ('B', 'D'), ('C', 'D')]\ngraph = {vertex: [] for vertex in vertices}\n\nfor u, v in edges:\n    graph[u].append(v)\n    graph[v].append(u)\n\nprint(graph)\n# {'A': ['B', 'D'], 'B': ['A', 'C', 'D'],\n#  'C': ['B', 'D'], 'D': ['A', 'B', 'C']}")}
 <h3>2 · Directed graph: sirf outgoing neighbours</h3>
 ${typeDiagram('Directed · arrows BA, BD, CB, DA, DC', {A:[90,55],B:[330,55],C:[330,160],D:[90,160]}, [{from:'B',to:'A'},{from:'B',to:'D'},{from:'C',to:'B'},{from:'D',to:'A'},{from:'D',to:'C'}], true)}
 ${table(['Vertex','Outgoing neighbour chain'],[['A','Null · no outgoing edge'],['B','A → D → Null'],['C','B → Null'],['D','A → C → Null']])}
 ${pointers(['B→A arrow ka matlab <b>A, B ki list mein</b>; B, A ki list mein nahi.','A ki list empty hai, although B→A aur D→A arrows A par aa rahe hain: incoming edges A ki outgoing list mein nahi likhte.'])}
 ${code('Python · same directed graph', "vertices = ['A', 'B', 'C', 'D']\nedges = [('B', 'A'), ('B', 'D'), ('C', 'B'), ('D', 'A'), ('D', 'C')]\ngraph = {vertex: [] for vertex in vertices}\n\nfor u, v in edges:\n    graph[u].append(v)  # only outgoing edge u -> v\n\nprint(graph)\n# {'A': [], 'B': ['A', 'D'], 'C': ['B'], 'D': ['A', 'C']}")}
 ${pointers(['<b>Space O(V+E):</b> V vertex lists plus E directed entries (undirected mein 2E entries; still O(V+E)).','<b>All neighbours of u:</b> O(deg(u)) time; Python list mein specific edge u→v dhoondhna O(deg(u)).','Weighted graph mein entry neighbour aur weight ka pair ho sakti hai, e.g. <code>graph["S"] = [("A", 4), ("B", 1)]</code>. Neighbour order badalne se DFS/BFS visit order badal sakta hai.'])}
 ${trap('Undirected edge ko sirf ek endpoint ki list mein mat likho. Directed B→A ko A ki outgoing list mein mat likho.')}
 ${check('Directed screenshot mein A ki list Null kyun hai, jab B→A aur D→A dikh rahe hain?','Adjacency list yahan outgoing neighbours store karti hai. A par edges aa rahi hain, lekin A se koi arrow bahar nahi ja raha.')}`)

const traversal = section('13.6','traversal','Graph Traversal','Reachable vertices ko once visit karo','MUST · Visited protects cycles and duplicate work.', `
 ${figure('Fixed graph for both traces: A:[B,C], B:[A,D], C:[A,D], D:[B,C,E], E:[D]')}
 <p>DFS goes deep using a recursion stack; BFS goes level by level using FIFO queue. Both A se all five nodes visit karte hain. Graph mein A–B–D–C–A cycle hai, so visited set required. Source only its reachable component covers; entire disconnected graph ke liye every unvisited vertex se new traversal start karo.</p>
 <div class="graph-lab" data-graph-lab><div class="graph-lab-head"><div><span>INTERACTIVE · ONE OPERATION AT A TIME</span><h3>DFS stack vs BFS queue</h3></div><label>Algorithm <select id="graphMode"><option value="dfs">DFS · recursive</option><option value="bfs">BFS · queue</option></select></label></div><p>Step press karo; current, visited aur live stack/queue ek saath dekho. Neighbour order alphabetic fixed hai.</p><div class="graph-lab-controls"><button type="button" id="graphPrev">← Previous</button><button type="button" id="graphNext">Next →</button><button type="button" id="graphReset">Restart</button><span id="graphStepCount" aria-live="polite"></span></div><div id="graphStage" class="graph-lab-stage"></div><div id="graphStatus" class="graph-lab-status" aria-live="polite"></div></div>
 ${trap('Unweighted shortest path ke liye BFS. DFS first path shortest hone ki guarantee nahi.')}`)

const dfsTheory = section('13.6.1','dfs-theory','DFS Theory','Ek branch poori, phir return','MUST · Recursion stack visualise karo.', `
 ${pointers(['<b>Backtrack kab?</b> Current node ki neighbour list ko left-to-right check karo. Koi unvisited neighbour mile to pehle uska <code>dfs()</code> complete karo. <b>Saare neighbours check ho chuke hon</b> tabhi current call return/backtrack karega.','Visited neighbour ko <b>skip</b> karo; us par dobara <code>dfs()</code> call nahi hota. Child return ke baad parent ka paused loop agle neighbour se continue karta hai.','Is fixed graph ki neighbour order: <code>A:[B,C], B:[A,D], C:[A,D], D:[B,C,E], E:[D]</code>. Order badloge to DFS order bhi badal sakta hai.'])}
 <div class="graph-lab dfs-flow" id="dfsFlow">
   <div class="graph-lab-head"><div><span>INTERACTIVE · 13.6.1 DFS THEORY</span><h3>Call → pause → return ka flow</h3></div></div>
   <div class="graph-lab-controls"><button type="button" id="dfsFlowPrev">← Previous</button><button type="button" id="dfsFlowPlay">▶ Play</button><button type="button" id="dfsFlowNext">Next →</button><span id="dfsFlowCount" aria-live="polite"></span></div>
   <div class="dfs-flow-stage"><div id="dfsFlowGraph"></div><div><strong>Call stack · top first</strong><div id="dfsFlowStack" class="dfs-flow-stack"></div><strong id="dfsFlowNeighbourTitle">Current node ke neighbours</strong><div id="dfsFlowNeighbours" class="dfs-flow-neighbours"></div><strong>Visited order</strong><div id="dfsFlowVisited" class="dfs-flow-values"></div><strong>Returned / finished</strong><div id="dfsFlowFinished" class="dfs-flow-values"></div></div></div>
   <p id="dfsFlowStatus" class="graph-lab-status" aria-live="polite"></p>
 </div>
 ${pointers(['Diagram mein <b>orange</b> current call hai. Stack ka top wahi call hai jo abhi execute ho raha hai; neeche wale calls paused hain. Neighbour list mein <b>checking / done / next</b> dekhte raho.','Discovery order <b>A → B → D → C → E</b>, lekin return/finish order <b>C → E → D → B → A</b>.'])}
 ${table(['Action','Live call stack','Visited discovery order','Why'],[['Enter A','A','A','First neighbour B'],['Enter B','A → B','A,B','Unvisited D'],['Enter D','A → B → D','A,B,D','Unvisited C'],['Enter C','A → B → D → C','A,B,D,C','A,D visited; return C'],['Enter E from D','A → B → D → E','A,B,D,C,E','D resumes loop, finds E'],['Return E,D,B,A','Stack unwinds to empty','A,B,D,C,E','No unvisited neighbour remains']])}
 ${pointers(['<b>Discovery</b> = node par pehli baar enter/mark. <b>Finish</b> = uske saare neighbours process karke call return.','A→B→D→C tak jaane ke baad C return karta hai. Iska matlab DFS restart nahi hota—<b>D ka paused loop resume</b> hota hai aur phir E milta hai.'])}
 <details class="graph-check"><summary>GATE extension · DFS edge types (abhi optional)</summary><p>DFS tree edges is example mein AB, BD, DC, DE hain. Directed DFS mein active ancestor ko back edge, finished descendant ko forward edge, aur doosri finished branch ko cross edge kehte hain. In categories ke liye unseen/active/finished state chahiye; visited boolean alone enough nahi. Undirected DFS mein parent reverse edge ignore karo; baaki non-tree edges ancestors tak jaati hain.</p></details>
 ${trap('DFS order adjacency-list ke neighbour order par depend karta hai. Visited set ke bina A–B–D–C–A cycle par recursion repeat hoti rahegi.')}${check('D→C call returns; which call resumes?','D call resumes its for-loop, then explores E. B and A still wait on stack.')}`)

const dfsCode = section('13.6.2','dfs-code','DFS Code','Mark, append, recurse, return','MUST · Copy and run in Python visualizer.', `
 ${code('Python · beginner recursive DFS', "graph = {\n    'A': ['B', 'C'],\n    'B': ['A', 'D'],\n    'C': ['A', 'D'],\n    'D': ['B', 'C', 'E'],\n    'E': ['D']\n}\nvisited = set()\norder = []\n\ndef dfs(node):\n    visited.add(node)\n    order.append(node)\n    for neighbour in graph[node]:\n        if neighbour not in visited:\n            dfs(neighbour)\n\ndfs('A')\nprint(order)  # ['A', 'B', 'D', 'C', 'E']")}
 ${table(['Line','What exactly happens'],[['visited.add(node)','Mark on entry so cycle cannot re-enter it'],['order.append(node)','Discovery output, not finish order'],['for neighbour','Inspect adjacency entries in given order'],['if neighbour not in visited','Skip back/duplicate path'],['dfs(neighbour)','Parent call pauses; child returns to this line']])}
 <p>Time <b>O(V+E)</b>: each vertex enters once, each adjacency entry inspected once (undirected edge twice). Extra visited O(V), recursion stack up to O(V). Python deep chain may hit recursion limit, but asymptotic model remains.</p>`)

const bfsTheory = section('13.6.3','bfs-theory','BFS Theory','Wavefront: near nodes pehle','MUST · Unweighted shortest path by edge count.', `
 <p>Source A distance 0; neighbours B,C distance 1; D distance 2; E distance 3. FIFO queue purani layer ko next layer se pehle process karti hai. <b>Visited enqueue karte hi mark</b> karo so D C ke through duplicate enqueue na ho.</p>
 ${table(['Pop','Queue after operation','Visited','New information'],[['Start','[A]','{A}','dist[A]=0'],['A','[B,C]','{A,B,C}','dist[B]=dist[C]=1'],['B','[C,D]','{A,B,C,D}','dist[D]=2, parent[D]=B'],['C','[D]','same','D already seen; no duplicate'],['D','[E]','{A,B,C,D,E}','dist[E]=3, parent[E]=D'],['E','[]','same','Done; pop order A,B,C,D,E']])}
 <p>E shortest path via parent links E←D←B←A, reverse = A→B→D→E, 3 edges. A→C→D→E also 3 edges; parent may change with neighbour order, shortest distance does not.</p>
 ${trap('BFS minimum number of edges gives minimum cost only when all weights equal. Weighted costs require another algorithm.')}`)

const bfsCode = section('13.6.4','bfs-code','BFS Code','Enqueue par mark; pop par process','MUST · deque avoids slow list pop(0).', `
 ${code('Python · BFS order, distance, parent', "from collections import deque\n\ngraph = {\n    'A': ['B', 'C'],\n    'B': ['A', 'D'],\n    'C': ['A', 'D'],\n    'D': ['B', 'C', 'E'],\n    'E': ['D']\n}\nqueue = deque(['A'])\nvisited = {'A'}\ndistance = {'A': 0}\nparent = {'A': None}\norder = []\n\nwhile queue:\n    node = queue.popleft()\n    order.append(node)\n    for neighbour in graph[node]:\n        if neighbour not in visited:\n            visited.add(neighbour)\n            distance[neighbour] = distance[node] + 1\n            parent[neighbour] = node\n            queue.append(neighbour)\n\nprint(order)        # ['A', 'B', 'C', 'D', 'E']\nprint(distance['E']) # 3")}
 <p><code>deque.popleft()</code> O(1); <code>list.pop(0)</code> O(queue length) and can spoil traversal complexity. Every vertex enqueued once and every adjacency entry inspected once ⇒ O(V+E) time; queue/visited/parent/distance O(V) auxiliary.</p>`)

const choice = section('13.6.7','choice','Choice of Traversal','Pick algorithm by guarantee','MUST · Reachability ≠ shortest path.', `
 ${table(['Question','Choose','Reason'],[['Can s reach t?','DFS or BFS','Both cover reachable set'],['Fewest unweighted edges?','BFS','Layers give distance'],['Branch exploration / directed back edge?','DFS','Active recursion ancestry'],['Undirected connected components?','Either + outer loop','Start new search for each unvisited'],['Topological order?','Kahn or DFS finish order','Only for DAG']])}
 <p>For disconnected graph: <code>for vertex in graph: if vertex not in visited: dfs(vertex)</code>. Each start gives a new component/traversal tree. Directed cycle iff DFS encounters edge to active gray vertex; edge to any visited black vertex alone is not sufficient.</p>${check('Reverse edges and test reachability—new traversal method needed?','No. Build reversed adjacency and run same DFS/BFS; Gᴿ s→t iff G t→s.')}`)

const shortest = section('13.7','shortest','Shortest Path Algorithms','Pehle weights ki condition dekho','MUST · Distances and relaxation.', `
 <p>Shortest path = source to target minimum <b>sum of edge weights</b>. Unweighted graph mein each edge weight 1, so distance = hops. A tentative distance improve karne ko <b>relaxation</b> kehte hain: if <code>dist[u]+w(u,v) &lt; dist[v]</code>, set new distance and parent.</p>
 ${table(['Need','Algorithm','Restriction','Time'],[['Unweighted single-source','BFS','Equal edge costs','O(V+E)'],['Non-negative weighted single-source','Dijkstra','No negative edge','Simple O(V²+E); heap O((V+E)log V)'],['Negative edges single-source','Bellman-Ford','No reachable negative cycle for finite answers','O(VE)'],['All-pairs','Floyd-Warshall','Small/moderate V; no negative-cycle finite answer','O(V³)']])}
 <p>Unreachable vertex distance ∞. Reachable negative cycle repeat karke path cost indefinitely decrease ho sakta hai, so affected destination ka finite shortest path undefined.</p>${trap('No negative cycle does not make Dijkstra safe. Dijkstra needs every edge weight ≥0.')}`)

const dijkstraTheory = section('13.7.1','dijkstra-theory','Dijkstra Theory','Minimum tentative vertex finalize karo','MUST · All edges non-negative.', `
 ${weightedFigure()}
 <p>Directed edges: S→A(4), S→B(1), B→A(2), A→C(1), B→C(5), C→T(3). Start dist[S]=0; others ∞. Each iteration smallest unvisited distance vertex select, then outgoing edges relax.</p>
 ${table(['Finalize','S','A','B','C','T','Update'],[['Start','0','∞','∞','∞','∞','—'],['S','0','4','1','∞','∞','S outgoing'],['B (1)','0','3','1','6','∞','A 4→3; C=6'],['A (3)','0','3','1','4','∞','C 6→4'],['C (4)','0','3','1','4','7','T=7'],['T (7)','0','3','1','4','7','Done']])}
 <p>Shortest S→B→A→C→T cost 1+2+1+3=<b>7</b>. Why finalize safe? Any later alternative route adds only non-negative weight to an already ≥ current tentative cost. Negative edge breaks this proof.</p>${check('After S, why choose B not A?','B tentative 1 is smaller than A tentative 4.')}`)

const dijkstraCode = section('13.7.2','dijkstra-code','Dijkstra Code','Simple scan version first','MUST · Runnable Python; no heap abstraction.', `
 ${code('Python · Dijkstra O(V²+E)', "graph = {\n    'S': [('A',4), ('B',1)],\n    'A': [('C',1)],\n    'B': [('A',2), ('C',5)],\n    'C': [('T',3)],\n    'T': []\n}\ndistance = {}\nparent = {}\nvisited = set()\nfor vertex in graph:\n    distance[vertex] = float('inf')\n    parent[vertex] = None\ndistance['S'] = 0\n\nfor step in range(len(graph)):\n    current = None\n    for vertex in graph:\n        if vertex not in visited:\n            if current is None or distance[vertex] < distance[current]:\n                current = vertex\n    if current is None or distance[current] == float('inf'):\n        break\n    visited.add(current)\n    for neighbour, weight in graph[current]:\n        if weight < 0:\n            raise ValueError('Needs non-negative weights')\n        candidate = distance[current] + weight\n        if candidate < distance[neighbour]:\n            distance[neighbour] = candidate\n            parent[neighbour] = current\n\nprint(distance['T'])  # 7\nprint(parent)")}
 <p>V rounds × scan V = O(V²), plus inspecting edges O(E). Auxiliary distance/parent/visited O(V); input graph O(V+E). Heap variant improves selection but relaxation logic same hai.</p>`)

const bellman = section('13.7.3','bellman-ford','Bellman-Ford Theory','Repeat every edge relaxation','MUST · Negative edges okay; reachable negative cycles detect.', `
 <p>Start dist[S]=0, others ∞. Up to <b>V−1 full edge-list passes</b>: any simple shortest path has at most V−1 edges. A pass without update means early stop. One extra pass still improves a reachable distance ⇒ reachable negative cycle.</p>
 ${table(['Edges in order: S→A(4), S→B(5), A→B(−2), B→T(3)','A','B','T'],[['Initial','∞','∞','∞'],['After S edges','4','5','∞'],['After A→B','4','2','∞'],['After B→T','4','2','5'],['Pass 2','4','2','5 · no change']])}
 <p>Path S→A→B→T cost 4−2+3=5, better than S→B→T cost 8. If T→A(−5) added, cycle A→B→T→A weight −4; looping reduces path cost indefinitely.</p>
 ${code('Bellman-Ford pseudocode · theory', "dist[source] = 0; all other distances = infinity\nrepeat V - 1 times:\n    for each edge (u, v, weight):\n        if dist[u] is finite and dist[u] + weight < dist[v]:\n            dist[v] = dist[u] + weight\nfor each edge (u, v, weight):\n    if dist[u] is finite and dist[u] + weight < dist[v]:\n        report reachable negative cycle")}
 <p>Time O(VE), extra distances O(V). Unreachable negative cycle is not detected by single-source run, because its dist[u] stays ∞.</p>`)

const floyd = section('13.7.5','floyd-warshall','Floyd-Warshall Theory','All-pairs: k as intermediate','MUST · Matrix update ka exact arithmetic.', `
 <p><code>dist[i][j]</code>: i→j best known cost. Direct edge weight, diagonal 0, absent ∞. For each allowed intermediate k: <code>dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j])</code>.</p>
 <p>A→B=3, B→C=2, A→C=10. When k=B, A→B→C cost 3+2=5 improves direct A→C=10.</p>
 ${table(['Stage','A row (A,B,C)','B row (A,B,C)','C row (A,B,C)'],[['Initial','0, 3, 10','∞, 0, 2','∞, ∞, 0'],['After k=A','0, 3, 10','∞, 0, 2','∞, ∞, 0'],['After k=B','0, 3, <b>5</b>','∞, 0, 2','∞, ∞, 0'],['After k=C','0, 3, 5','∞, 0, 2','∞, ∞, 0']])}
 ${code('Floyd-Warshall pseudocode · k outermost', "for k in vertices:\n    for i in vertices:\n        for j in vertices:\n            candidate = dist[i][k] + dist[k][j]\n            if candidate < dist[i][j]:\n                dist[i][j] = candidate")}
 <p>O(V³) time, O(V²) matrix. Negative edges okay without negative cycle; final dist[v][v]&lt;0 detects one. k outermost is essential for standard dynamic-programming invariant.</p>${trap('BFS shortest path result and Floyd-Warshall matrix value are not same kind of output: BFS one source, Floyd all pairs.')}`)

const dag = section('13.10','dag','DAG','Directed dependencies without a cycle','RECOMMENDED · Topological ordering is possible iff DAG.', `
 ${figure('DAG: A→B, A→C, B→D, C→D, D→E',true)}
 <p>A before B/C, both B/C before D, D before E. A <b>topological order</b> places u before v for every edge u→v. Valid A,B,C,D,E and A,C,B,D,E. Invalid B,A,C,D,E (A→B violated). Multiple valid orders may exist.</p>
 <p>Directed cycle A→B→C→A makes topological ordering impossible. An undirected acyclic graph is not called DAG; direction matters.</p>${check('A,C,B,D,E valid?','Yes. B and C have no order constraint between them.')}`)

const kahn = section('13.10.1','kahn','Kahn’s Algorithm Theory','Zero in-degree queue','RECOMMENDED · Output all V or detect directed cycle.', `
 ${table(['Step','Queue before pop','Output after pop','Change'],[['Start','[A]','[]','In-degree A0 B1 C1 D2 E1'],['A','[A]','[A]','B,C become 0; enqueue'],['B','[B,C]','[A,B]','D 2→1'],['C','[C]','[A,B,C]','D 1→0; enqueue'],['D','[D]','[A,B,C,D]','E 1→0; enqueue'],['E','[E]','[A,B,C,D,E]','All processed']])}
 <p>Compute in-degrees. Enqueue all zero vertices. Pop front, output it, decrement each outgoing neighbour's in-degree, enqueue new zeros. If queue empty but output length &lt; V, cycle exists. O(V+E) time and O(V) auxiliary.</p>
 ${code('Python · Kahn topological order', "from collections import deque\n\ngraph = {'A':['B','C'], 'B':['D'], 'C':['D'], 'D':['E'], 'E':[]}\nindegree = {}\nfor vertex in graph:\n    indegree[vertex] = 0\nfor vertex in graph:\n    for neighbour in graph[vertex]:\n        indegree[neighbour] += 1\nqueue = deque()\nfor vertex in graph:\n    if indegree[vertex] == 0:\n        queue.append(vertex)\norder = []\nwhile queue:\n    node = queue.popleft()\n    order.append(node)\n    for neighbour in graph[node]:\n        indegree[neighbour] -= 1\n        if indegree[neighbour] == 0:\n            queue.append(neighbour)\nprint(order if len(order) == len(graph) else 'cycle')")}
 ${trap('B/C queue order can change valid output. If process fewer than V, it indicates cycle—not mere disconnectedness.')}`)

export const lessonMarkup = [intro,types,degree,connectivity,representation,matrix,adjList,traversal,dfsTheory,dfsCode,bfsTheory,bfsCode,choice,shortest,dijkstraTheory,dijkstraCode,bellman,floyd,dag,kahn].join('\n')
export const revisionMarkup = `<section class="revision-grid searchable" data-title="Graphs Quick Revision"><article><span>01 · GRAPH</span><h3>G=(V,E)</h3><p>Undirected: ${inlineFormula(String.raw`\sum_{x\in V}\deg(x)=2|E|`)}. Directed: total in-degree = total out-degree = edge count.</p></article><article><span>02 · STORAGE</span><h3>List vs matrix</h3><p>List O(V+E), matrix O(V²); edge lookup matrix O(1).</p></article><article><span>03 · TRAVERSAL</span><h3>DFS stack · BFS queue</h3><p>Mark on discovery/enqueue; adjacency order affects output.</p></article><article><span>04 · SHORTEST</span><h3>Weights first</h3><p>Unweighted BFS, nonnegative Dijkstra, negative edge Bellman-Ford, all pairs Floyd-Warshall.</p></article><article><span>05 · DAG</span><h3>Kahn zero in-degree</h3><p>All V output or cycle; multiple topological orders possible.</p></article><article><span>06 · REVERSE</span><h3>Reachability reverses</h3><p>Gᴿ s→t iff G t→s.</p></article></section>`
