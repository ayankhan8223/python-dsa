// Original GATE-style questions. These are not transcripts of official papers.
const bank = {
  intro: ['A-B-D-C-A sequence ka precise name?', ['Path','Cycle','Disconnected component','Topological order'], 1, 'Start and end A, inner B,D,C distinct: four-edge cycle. Path normally no repeated vertex.'],
  types: ['Simple undirected complete graph K₆ mein edges?', ['6','12','15','30'], 2, 'Each unordered pair once: 6×5/2=15. Directed complete graph count se confuse mat karo.'],
  degree: ['Undirected graph degrees 1,2,2,3,4 hain. Edges?', ['5','6','12','Impossible'], 1, 'Sum=12=2E; hence E=6. Odd-degree vertices 1 and 3—count even.'],
  connectivity: ['G has A→B→C. Gᴿ mein C se A?', ['No','Yes, C→B→A','Only if weakly connected','Only DFS can test'], 1, 'Every edge reverse: B→A and C→B. Reverse path exists.'],
  representation: ['Sparse graph V=1000, E=1200, repeated neighbour scans: prefer?', ['Adjacency matrix','Adjacency list','Same space','No representation'], 1, 'List O(V+E) storage and neighbour scan O(deg); matrix O(V²).'],
  matrix: ['Undirected A—C edge matrix mein kaunse cells 1?', ['Only [A][C]','Only [C][A]','Both','Neither'], 2, 'Undirected edge both directions store hota hai, so symmetric matrix.'],
  'adj-list': ['Plain list neighbours ke saath (u,v) edge check worst-case?', ['O(1)','O(log V)','O(deg(u))','O(V+E) always'], 2, 'u ke neighbour entries scan karne pad sakte hain.'],
  traversal: ['A se traversal ke baad 2 vertices unvisited: implication?', ['Graph cyclic','They are not reachable from A','BFS failed','DFS always reaches them'], 1, 'Source traversal only its reachable component. Outer loop needed to cover all.'],
  'dfs-theory': ['Directed DFS mein edge to active gray ancestor kya indicate karta hai?', ['Cross edge only','Back edge and cycle','Forward edge','No conclusion'], 1, 'Gray means ancestor currently on recursion stack; edge returns to it and closes directed cycle.'],
  'dfs-code': ['DFS function mein visited.add(node) entry par kyun?', ['To sort nodes','To prevent cycle re-entry','To calculate weight','To produce BFS order'], 1, 'Mark immediately, otherwise back edge same call stack mein recursively re-enter kar sakta hai.'],
  'bfs-theory': ['Unweighted graph mein BFS source se first reaches t at distance 3. What guarantee?', ['Min total arbitrary weight 3','Minimum edge count is 3','DFS same parent','All paths have 3 edges'], 1, 'FIFO layers guarantee 0,1,2 before 3 edges. Weighted cost guarantee nahi.'],
  'bfs-code': ['BFS enqueue par visited mark karne ka reason?', ['Queue sorted rahe','Duplicate enqueues avoid','Negative edges handle','Space O(1)'], 1, 'Two parents same neighbour ko dequeue se pehle enqueue kar sakte hain if marking delayed.'],
  choice: ['Graph unweighted; source-to-all minimum hops and parent tree chahiye. Pick?', ['DFS','BFS','Kahn','Floyd only'], 1, 'BFS distances and parent pointers one run mein O(V+E).'],
  shortest: ['Negative edges allowed, reachable negative cycle absent, single source distances: pick?', ['Dijkstra','BFS','Bellman-Ford','Kahn'], 2, 'Bellman-Ford relaxes edges V−1 rounds and works with negative weights.'],
  'dijkstra-theory': ['S→A=4, S→B=1, B→A=2. Shortest S→A?', ['4','3','2','1'], 1, 'Via B cost 1+2=3 improves direct 4 during relaxation.'],
  'dijkstra-code': ['Simple Dijkstra V rounds, each scans all V vertices; selection cost?', ['O(V)','O(E)','O(V²)','O(log V)'], 2, 'V scans × V comparisons = O(V²), plus edge relaxations O(E).'],
  'bellman-ford': ['V−1 passes ke baad reachable edge still relaxes. Meaning?', ['Unreachable vertex','Reachable negative cycle','DAG','All distances final'], 1, 'A simple path needs ≤V−1 edges. Further strict improvement points to a reachable negative cycle.'],
  'floyd-warshall': ['A→B=3, B→C=2, direct A→C=10. k=B ke baad A→C?', ['10','5','3','2'], 1, 'Via B candidate 3+2=5; min(10,5)=5.'],
  dag: ['Edges A→B,A→C,B→D,C→D. Which order valid?', ['B,A,C,D','A,D,B,C','A,C,B,D','D,C,B,A'], 2, 'A must precede B/C, both B/C precede D; B vs C flexible.'],
  kahn: ['Kahn queue empty but output only 4 of 6 vertices. Conclusion?', ['Graph simply disconnected','Directed cycle remains','BFS needed','Two isolated vertices'], 1, 'Every DAG, disconnected or not, has zero-indegree vertex; remaining unprocessed nodes imply cycle.']
}

export const module13Topics = Object.entries(bank).map(([id,[prompt,options,correct,explanation]]) => ({
  id,
  label: id.replaceAll('-', ' '),
  questions: [{ id: `${id}-1`, prompt, options, answer: options[correct], explanation, difficulty: 'Core' }]
}))
export const module13QuestionCount = module13Topics.reduce((sum, topic) => sum + topic.questions.length, 0)
