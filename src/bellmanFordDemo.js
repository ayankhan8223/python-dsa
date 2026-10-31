// One graph drives the Python snippet and every simulator state.
export const bellmanGraph = {
  A: [['B', 4], ['C', 5]],
  B: [['C', -2]],
  C: [['D', 3]],
  D: []
}

const graphLiteral = Object.entries(bellmanGraph).map(([node, edges]) =>
  `    "${node}": [${edges.map(([neighbor, weight]) => `("${neighbor}", ${weight})`).join(', ')}]`
).join(',\n')

export const bellmanCode = `graph = {
${graphLiteral}
}

def bellman_ford(start):

    dist = {}

    for node in graph:
        dist[node] = float("inf")

    dist[start] = 0

    for i in range(len(graph) - 1):

        for current in graph:

            for neighbor, weight in graph[current]:

                if dist[current] != float("inf"):

                    new_dist = dist[current] + weight

                    if new_dist < dist[neighbor]:
                        dist[neighbor] = new_dist

    for current in graph:
        for neighbor, weight in graph[current]:

            if dist[current] != float("inf"):

                new_dist = dist[current] + weight

                if new_dist < dist[neighbor]:
                    print("Negative cycle detected")
                    return None

    return dist


result = bellman_ford("A")
print(result)`

const lines = bellmanCode.split('\n')
const lineOf = (text, occurrence = 0) => {
  const matches = lines.flatMap((line, index) => line.trim() === text ? [index + 1] : [])
  if (matches[occurrence] === undefined) throw new Error(`Bellman-Ford code line missing: ${text}`)
  return matches[occurrence]
}

const codeLine = {
  initDict: lineOf('dist = {}'),
  initLoop: lineOf('for node in graph:'),
  initInf: lineOf('dist[node] = float("inf")'),
  source: lineOf('dist[start] = 0'),
  outer: lineOf('for i in range(len(graph) - 1):'),
  node: lineOf('for current in graph:'),
  edge: lineOf('for neighbor, weight in graph[current]:'),
  reachable: lineOf('if dist[current] != float("inf"):'),
  candidate: lineOf('new_dist = dist[current] + weight'),
  compare: lineOf('if new_dist < dist[neighbor]:'),
  update: lineOf('dist[neighbor] = new_dist'),
  cycleNode: lineOf('for current in graph:', 1),
  cycleEdge: lineOf('for neighbor, weight in graph[current]:', 1),
  cycleReachable: lineOf('if dist[current] != float("inf"):', 1),
  cycleCandidate: lineOf('new_dist = dist[current] + weight', 1),
  cycleCompare: lineOf('if new_dist < dist[neighbor]:', 1),
  cycleWarn: lineOf('print("Negative cycle detected")'),
  cycleReturn: lineOf('return None'),
  returnDist: lineOf('return dist')
}

export function buildBellmanFrames(graph = bellmanGraph, start = 'A') {
  const vertices = Object.keys(graph)
  if (!vertices.includes(start)) throw new Error('Bellman-Ford start vertex missing')
  const dist = {}
  const frames = []
  let i = null, current = null, neighbor = null, weight = null, newDist = null
  const capture = (kind, line, message, extra = {}) => frames.push({
    kind, line, message, i, current, neighbor, weight, newDist,
    edge: current && neighbor ? [current, neighbor] : null,
    previous: {...dist}, dist: {...dist}, updated: null, ...extra
  })

  capture('init', codeLine.initDict, 'dist = {}: abhi dictionary empty hai.')
  for (const node of vertices) {
    capture('init', codeLine.initLoop, `Initialization loop: node = ${node}.`)
    dist[node] = Infinity
    capture('init', codeLine.initInf, `dist[${node}] = ∞`)
  }
  dist[start] = 0
  capture('source', codeLine.source, `Source ${start} ka distance 0 set hua. Baaki ∞ hain.`, {updated: start})

  for (i = 0; i < vertices.length - 1; i++) {
    let passUpdates = 0
    current = neighbor = weight = newDist = null
    capture('pass', codeLine.outer, `Pass ${i + 1}/${vertices.length - 1} start: har node aur uski outgoing edges order mein check hongi.`)
    for (current of vertices) {
      neighbor = weight = newDist = null
      capture('node', codeLine.node, `current = ${current}. Ye minimum-distance choice nahi; graph ka next node hai.`)
      for (const [next, edgeWeight] of graph[current]) {
        neighbor = next; weight = edgeWeight; newDist = null
        capture('edge', codeLine.edge, `${current}→${neighbor} edge check; given weight = ${weight}.`)
        capture('guard', codeLine.reachable, dist[current] === Infinity ? `${current} abhi unreachable hai; is edge ko skip karo.` : `dist[${current}] finite hai, candidate calculate karo.`)
        if (dist[current] === Infinity) continue
        newDist = dist[current] + weight
        capture('candidate', codeLine.candidate, `new_dist = dist[${current}] + weight = ${dist[current]} + (${weight}) = ${newDist}.`)
        const old = dist[neighbor]
        const smaller = newDist < old
        capture('compare', codeLine.compare, `${newDist} ${smaller ? '<' : '≥'} ${old === Infinity ? '∞' : old}: ${smaller ? 'update hoga' : 'no update'}.`)
        if (smaller) {
          const previous = {...dist}
          dist[neighbor] = newDist
          passUpdates++
          capture('update', codeLine.update, `dist[${neighbor}]: ${old === Infinity ? '∞' : old} → ${newDist}.`, {previous, updated: neighbor})
        }
      }
    }
    current = neighbor = weight = newDist = null
    capture('passEnd', codeLine.outer, `Pass ${i + 1} done: ${passUpdates} update${passUpdates === 1 ? '' : 's'}. ${passUpdates === 0 ? 'Early-stop variant yahan ruk sakta tha; given code next pass bhi chalata hai.' : 'Next pass mein edges phir check hongi.'}`, {passUpdates})
  }

  i = null; current = neighbor = weight = newDist = null
  capture('cycleStart', codeLine.cycleNode, 'Extra pass: reachable negative cycle check karo. Koi distance ghatna nahi chahiye.')
  for (current of vertices) {
    neighbor = weight = newDist = null
    capture('cycleNode', codeLine.cycleNode, `Cycle check: current = ${current}.`)
    for (const [next, edgeWeight] of graph[current]) {
      neighbor = next; weight = edgeWeight; newDist = null
      capture('cycleEdge', codeLine.cycleEdge, `Cycle check edge ${current}→${neighbor} (weight ${weight}).`)
      capture('cycleGuard', codeLine.cycleReachable, dist[current] === Infinity ? `${current} unreachable hai; skip.` : `${current} reachable hai; candidate calculate karo.`)
      if (dist[current] === Infinity) continue
      newDist = dist[current] + weight
      capture('cycleCandidate', codeLine.cycleCandidate, `${dist[current]} + (${weight}) = ${newDist}.`)
      const smaller = newDist < dist[neighbor]
      capture('cycleCompare', codeLine.cycleCompare, `${newDist} ${smaller ? '<' : '≥'} ${dist[neighbor] === Infinity ? '∞' : dist[neighbor]}: ${smaller ? 'reachable negative cycle detected' : 'no decrease'}.`)
      if (smaller) {
        capture('cycleWarning', codeLine.cycleWarn, 'Reachable negative cycle: extra pass mein bhi distance decrease ho sakta hai.')
        capture('cycleReturn', codeLine.cycleReturn, 'Function None return karta hai; finite shortest distances valid nahi.')
        return frames
      }
    }
  }
  current = neighbor = weight = newDist = null
  capture('complete', codeLine.returnDist, 'Extra pass mein koi decrease nahi. Final shortest distances return karo.')
  return frames
}
