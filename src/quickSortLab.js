const example = [40, 55, 20, 30, 80, 25, 90, 50]

export const quickSortUserCode = `def partition(arr, low, high):
    pivot = arr[low]
    p = low + 1
    q = high

    while True:
        # p moves right until it finds element > pivot
        while p <= high and arr[p] <= pivot:
            p += 1

        # q moves left until it finds element <= pivot
        while q >= low + 1 and arr[q] > pivot:
            q -= 1

        # If pointers have not crossed
        if p < q:
            arr[p], arr[q] = arr[q], arr[p]

        # Pointers crossed
        else:
            break

    # Put pivot at its final position
    arr[low], arr[q] = arr[q], arr[low]

    return q

def quick_sort(arr, low, high):
    if low < high:
        pivot_index = partition(arr, low, high)

        # Sort left
        quick_sort(arr, low, pivot_index - 1)

        # Sort right
        quick_sort(arr, pivot_index + 1, high)

arr = [40, 55, 20, 30, 80, 25, 90, 50]
quick_sort(arr, 0, len(arr) - 1)
print(arr)`

const escapedQuickCode = quickSortUserCode.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')

export const quickSortLabMarkup = `<div class="quick-lab" id="quickLab">
  <div class="quick-lab-heading"><span>8.6 · FIRST ELEMENT PIVOT</span><h3>Quick Sort: p aur q ka live trace</h3><p>Image wala example. Har Step ek pointer decision, swap, pivot placement ya recursive call dikhata hai.</p></div>
  <div class="quick-lab-controls"><div class="quick-lab-buttons"><button data-quick="previous">← Previous</button><button data-quick="step">Step →</button><button data-quick="play">Play</button><button data-quick="restart">Restart</button></div><label>Speed <input data-quick-speed type="range" min="350" max="1500" step="50" value="850"></label></div>
  <div class="quick-lab-progress"><span data-quick-progress>Step 0</span><div><i data-quick-fill></i></div></div>
  <div class="quick-lab-key"><span><i class="pivot"></i>pivot</span><span><i class="p"></i>p: first &gt; pivot</span><span><i class="q"></i>q: first ≤ pivot from right</span><span><i class="fixed"></i>final position</span></div>
  <div class="quick-array-frame"><div class="quick-array" data-quick-array aria-label="Quick Sort array trace"></div><div class="quick-range" data-quick-range></div></div>
  <div class="quick-lab-detail"><div class="quick-step-story" data-quick-story aria-live="polite"></div><div class="quick-call-stack"><span>ACTIVE RECURSIVE CALL</span><div data-quick-stack></div></div></div>
  <details class="quick-code"><summary>Is animation ka matching Python code</summary><pre><code>${escapedQuickCode}</code></pre></details>
  <p class="quick-lab-footnote">Swap ke turant baad p aur q ko manually move nahi karte. Tumhare code ke next inner scans swapped values ko dekhkar pointers aage badhate hain.</p>
</div>`

export function traceQuickSort(input) {
  const arr = [...input]
  const frames = []
  const fixed = new Set()
  const add = (kind, low, high, pivotIndex, p, q, title, detail, depth) => {
    frames.push({ kind, values: [...arr], low, high, pivotIndex, p, q, title, detail, depth, fixed: [...fixed] })
  }

  const visit = (low, high, depth) => {
    if (low > high) return
    if (low === high) {
      fixed.add(low)
      add('base', low, high, low, null, null, `Single value ${arr[low]}`, `Index ${low} par sirf ek element hai. Yeh already sorted hai; recursion yahan return karti hai.`, depth)
      return
    }

    const pivot = arr[low]
    let p = low + 1
    let q = high
    add('enter', low, high, low, p, q, `quick_sort([${arr.slice(low, high + 1).join(', ')}])`, `First element ${pivot} pivot hai. p index ${p} se right scan karega; q index ${q} se left scan karega.`, depth)

    while (true) {
      while (p <= high && arr[p] <= pivot) {
        add('scan-p', low, high, low, p, q, `p: ${arr[p]} ≤ ${pivot}`, `p index ${p} par value ${arr[p]} dekh raha hai. Yeh pivot se chhoti ya equal hai, isliye p ek step right jayega.`, depth)
        p++
      }
      add('stop-p', low, high, low, p, q, p <= high ? `p stops at ${arr[p]}` : 'p reached the end', p <= high ? `p index ${p} par value ${arr[p]} ko reference karta hai. ${arr[p]} > ${pivot}, isliye p yahan rukta hai.` : `p index ${p} tak aa gaya, jo active subarray ke bahar hai. Ab q ki position check hogi.`, depth)

      while (q >= low + 1 && arr[q] > pivot) {
        add('scan-q', low, high, low, p, q, `q: ${arr[q]} > ${pivot}`, `q index ${q} par value ${arr[q]} dekh raha hai. Yeh pivot se badi hai, isliye q ek step left jayega.`, depth)
        q--
      }
      add('stop-q', low, high, low, p, q, `q stops at ${arr[q]}`, `q index ${q} par value ${arr[q]} ko reference karta hai. ${arr[q]} ≤ ${pivot}, isliye q yahan rukta hai.`, depth)

      if (p >= q) {
        add('cross', low, high, low, p, q, 'p aur q cross ho gaye', `p=${p}, q=${q}. Ab p < q nahi hai. Scanning khatam; pivot ${pivot} ko q ki value ${arr[q]} ke saath swap karenge.`, depth)
        break
      }
      const leftValue = arr[p]
      const rightValue = arr[q]
      ;[arr[p], arr[q]] = [arr[q], arr[p]]
      add('swap', low, high, low, p, q, `Swap ${leftValue} ↔ ${rightValue}`, `p index ${p} ki badi value ${leftValue} aur q index ${q} ki chhoti value ${rightValue} exchange hui. Pivot ${pivot} abhi index ${low} par hi hai.`, depth)
    }

    const displaced = arr[q]
    ;[arr[low], arr[q]] = [arr[q], arr[low]]
    fixed.add(q)
    add('pivot', low, high, q, p, q, `Pivot ${pivot} final index ${q} par`, `Pivot ${pivot} aur ${displaced} swap hue. Index ${q} final hai: left side ≤ ${pivot}, right side > ${pivot}.`, depth)
    if (low < q - 1) add('left', low, q - 1, null, null, null, 'Ab left subarray sort karo', `Indices ${low}…${q - 1}: [${arr.slice(low, q).join(', ')}]. Is recursive call ke return hone ke baad right call chalegi.`, depth + 1)
    visit(low, q - 1, depth + 1)
    if (q + 1 < high) add('right', q + 1, high, null, null, null, 'Ab right subarray sort karo', `Indices ${q + 1}…${high}: [${arr.slice(q + 1, high + 1).join(', ')}]. Pivot ${pivot} final position par already hai.`, depth + 1)
    visit(q + 1, high, depth + 1)
  }

  add('ready', 0, arr.length - 1, 0, 1, arr.length - 1, 'Start: first element pivot', `Array [${arr.join(', ')}]. Step dabao: pivot ${arr[0]}, p index 1, q last index ${arr.length - 1}.`, 0)
  visit(0, arr.length - 1, 0)
  add('done', 0, arr.length - 1, null, null, null, 'Array sorted', `Final result: [${arr.join(', ')}]. Har pivot apni final position par ja chuka hai.`, 0)
  return frames
}

export function mountQuickSortLab() {
  const lab = document.querySelector('#quickLab')
  if (!lab) return
  const frames = traceQuickSort(example)
  const array = lab.querySelector('[data-quick-array]')
  const story = lab.querySelector('[data-quick-story]')
  const range = lab.querySelector('[data-quick-range]')
  const stack = lab.querySelector('[data-quick-stack]')
  const progress = lab.querySelector('[data-quick-progress]')
  const fill = lab.querySelector('[data-quick-fill]')
  const speed = lab.querySelector('[data-quick-speed]')
  const buttons = Object.fromEntries([...lab.querySelectorAll('[data-quick]')].map(button => [button.dataset.quick, button]))
  let current = 0
  let timer = null

  const stop = () => { if (timer) clearInterval(timer); timer = null; buttons.play.textContent = 'Play' }
  const render = () => {
    const frame = frames[current]
    array.innerHTML = frame.values.map((value, index) => {
      const markers = [index === frame.p ? 'p' : '', index === frame.q ? 'q' : ''].filter(Boolean).join(' + ')
      const classes = [index === frame.p && 'at-p', index === frame.q && 'at-q', index === frame.pivotIndex && 'is-pivot', frame.fixed.includes(index) && 'is-fixed', (index < frame.low || index > frame.high) && 'outside-range'].filter(Boolean).join(' ')
      return `<div class="quick-cell ${classes}"><span class="quick-marker">${markers || '&nbsp;'}</span><b>${value}</b><small>[${index}]</small></div>`
    }).join('')
    range.innerHTML = frame.kind === 'done' ? 'All recursive calls returned · final sorted array' : `Active indices ${frame.low}…${frame.high} · pivot ${frame.pivotIndex === null ? 'being chosen' : frame.values[frame.pivotIndex]} · depth ${frame.depth}`
    story.innerHTML = `<span>STEP ${current} / ${frames.length - 1} · ${frame.kind.toUpperCase().replace('-', ' ')}</span><h4>${frame.title}</h4><p>${frame.detail}</p>`
    stack.textContent = frame.kind === 'done' ? 'All calls complete' : `quick_sort(arr, ${frame.low}, ${frame.high})`
    progress.textContent = `Step ${current} of ${frames.length - 1}`
    fill.style.width = `${current / (frames.length - 1) * 100}%`
    buttons.previous.disabled = current === 0
    buttons.step.disabled = current === frames.length - 1
    if (current === frames.length - 1) stop()
  }
  buttons.step.onclick = () => { if (current < frames.length - 1) { current++; render() } }
  buttons.previous.onclick = () => { stop(); if (current > 0) { current--; render() } }
  buttons.restart.onclick = () => { stop(); current = 0; render() }
  buttons.play.onclick = () => {
    if (timer) { stop(); return }
    if (current === frames.length - 1) current = 0
    buttons.play.textContent = 'Pause'
    render()
    timer = setInterval(() => { if (current < frames.length - 1) { current++; render() } else stop() }, Number(speed.value))
  }
  speed.oninput = () => { if (timer) { stop(); buttons.play.click() } }
  render()
}
