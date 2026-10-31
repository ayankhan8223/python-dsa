// The lesson's runnable Python program and the visual trace share this graph.
export const dijkstraGraph = {
  A: [['B', 4], ['C', 2]],
  B: [['A', 4], ['C', 1], ['D', 5]],
  C: [['A', 2], ['B', 1], ['D', 8]],
  D: [['B', 5], ['C', 8]]
}

const graphLiteral = Object.entries(dijkstraGraph).map(([node, edges]) =>
  `    "${node}": [${edges.map(([neighbor, weight]) => `("${neighbor}", ${weight})`).join(', ')}]`
).join(',\n')

export const dijkstraCode = `graph = {
${graphLiteral}
}

def dijkstra(start):
    dist = {}
    visited = []

    for node in graph:
        dist[node] = float("inf")

    dist[start] = 0

    for i in range(len(graph)):

        current = None

        # Find nearest unvisited node
        for node in graph:
            if node not in visited:
                if current == None:
                    current = node
                elif dist[node] < dist[current]:
                    current = node

        if current == None:
            break

        if dist[current] == float("inf"):
            break

        visited.append(current)

        # Update neighbour distances
        for neighbor, weight in graph[current]:
            new_dist = dist[current] + weight

            if new_dist < dist[neighbor]:
                dist[neighbor] = new_dist

    return dist


result = dijkstra("A")
print(result)`

const lines = dijkstraCode.split('\n')
const lineOf = (text, occurrence = 0) => {
  const matches = lines.flatMap((line, index) => line.trim() === text ? [index + 1] : [])
  if (matches[occurrence] === undefined) throw new Error(`Dijkstra code line missing: ${text}`)
  return matches[occurrence]
}
const codeLine = {
  dist: lineOf('dist = {}'),
  visited: lineOf('visited = []'),
  initLoop: lineOf('for node in graph:'),
  initInf: lineOf('dist[node] = float("inf")'),
  source: lineOf('dist[start] = 0'),
  outer: lineOf('for i in range(len(graph)):'),
  currentNone: lineOf('current = None'),
  scan: lineOf('for node in graph:', 1),
  unvisited: lineOf('if node not in visited:'),
  first: lineOf('if current == None:'),
  chooseFirst: lineOf('current = node'),
  compareMin: lineOf('elif dist[node] < dist[current]:'),
  noCurrent: lineOf('if current == None:', 1),
  unreachable: lineOf('if dist[current] == float("inf"):'),
  mark: lineOf('visited.append(current)'),
  edge: lineOf('for neighbor, weight in graph[current]:'),
  candidate: lineOf('new_dist = dist[current] + weight'),
  compare: lineOf('if new_dist < dist[neighbor]:'),
  update: lineOf('dist[neighbor] = new_dist'),
  result: lineOf('return dist')
}

export function buildDijkstraFrames(graph = dijkstraGraph, start = 'A') {
  const vertices = Object.keys(graph)
  if (!vertices.includes(start)) throw new Error('Dijkstra start vertex missing')
  const dist = {}, visited = [], frames = []
  let i = null, current = null, node = null, neighbor = null, weight = null, newDist = null
  const capture = (kind, line, message, extra = {}) => frames.push({
    kind, line, message, i, current, node, neighbor, weight, newDist,
    edge: current && neighbor ? [current, neighbor] : null,
    previous: {...dist}, dist: {...dist}, visited: [...visited], updated: null, ...extra
  })

  capture('init', codeLine.dist, 'dist = {}: abhi distance dictionary empty hai.')
  capture('init', codeLine.visited, 'visited = []: abhi koi node final nahi hai.')
  for (node of vertices) {
    capture('init', codeLine.initLoop, `Initialization: node = ${node}.`)
    dist[node] = Infinity
    capture('init', codeLine.initInf, `dist[${node}] = ∞.`)
  }
  node = null
  dist[start] = 0
  capture('source', codeLine.source, `Source ${start} ka distance 0.`, {updated: start})

  for (i = 0; i < vertices.length; i++) {
    current = node = neighbor = weight = newDist = null
    capture('round', codeLine.outer, `Round ${i + 1}/${vertices.length}: poore graph se minimum unvisited distance dhoondo.`)
    capture('resetCurrent', codeLine.currentNone, 'current = None: selection ab shuru hogi.')
    for (node of vertices) {
      capture('scan', codeLine.scan, `Scan node ${node}.`)
      const unseen = !visited.includes(node)
      capture('unvisited', codeLine.unvisited, `${node} ${unseen ? 'unvisited hai' : 'already visited/final hai; skip karo'}.`)
      if (!unseen) continue
      if (current === null) {
        capture('firstCheck', codeLine.first, 'current None hai, pehla unvisited node lo.')
        current = node
        capture('choose', codeLine.chooseFirst, `current = ${node}; abhi tak minimum candidate ${node} hai.`)
      } else {
        const smaller = dist[node] < dist[current]
        capture('compareMin', codeLine.compareMin, `dist[${node}]=${dist[node] === Infinity ? '∞' : dist[node]} ${smaller ? '<' : '≥'} dist[${current}]=${dist[current] === Infinity ? '∞' : dist[current]}; ${smaller ? 'current badlega' : 'current same rahega'}.`)
        if (smaller) {
          current = node
          capture('choose', codeLine.chooseFirst, `current = ${node}; ye ab tak ka minimum unvisited node hai.`)
        }
      }
    }
    node = null
    capture('noCurrent', codeLine.noCurrent, current === null ? 'Koi unvisited node nahi; stop.' : `current = ${current}; available hai.`)
    if (current === null) break
    capture('unreachable', codeLine.unreachable, dist[current] === Infinity ? `${current} unreachable hai; stop.` : `dist[${current}]=${dist[current]} finite hai; process karo.`)
    if (dist[current] === Infinity) break
    visited.push(current)
    capture('mark', codeLine.mark, `${current} visited/final hua; ab sirf iske neighbours check honge.`)
    for (const [next, edgeWeight] of graph[current]) {
      neighbor = next; weight = edgeWeight; newDist = null
      capture('edge', codeLine.edge, `${current}→${neighbor} edge check; weight ${weight}.`)
      newDist = dist[current] + weight
      capture('candidate', codeLine.candidate, `new_dist = dist[${current}] + ${weight} = ${newDist}.`)
      const old = dist[neighbor], smaller = newDist < old
      capture('compare', codeLine.compare, `${newDist} ${smaller ? '<' : '≥'} ${old === Infinity ? '∞' : old}: ${smaller ? 'update' : 'no update'}.`)
      if (smaller) {
        const previous = {...dist}
        dist[neighbor] = newDist
        capture('update', codeLine.update, `dist[${neighbor}]: ${old === Infinity ? '∞' : old} → ${newDist}.`, {previous, updated: neighbor})
      }
    }
    neighbor = weight = newDist = null
    capture('roundEnd', codeLine.outer, `${current} ke neighbours done. Next round mein minimum unvisited node phir dhoondho.`)
  }
  i = null; current = node = neighbor = weight = newDist = null
  capture('complete', codeLine.result, 'Sab reachable nodes final. Shortest distances return karo.')
  return frames
}
