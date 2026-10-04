const columns = [
  'Algorithm', 'Core idea', 'Best', 'Average', 'Worst', 'Auxiliary',
  'Stable?', 'In-place?', 'Adaptive?', 'Type', 'Best input', 'Worst input',
  'GATE trap', 'Memory trick'
]

const algorithms = [
  ['Bubble', 'Adjacent compare + swap', 'O(n)*', 'O(n²)', 'O(n²)', 'O(1)', '✓ Yes', '✓ Yes', '✓ With flag', 'Comparison', 'Already sorted', 'Reverse sorted', 'Each pass fixes largest remaining at right; full schedule = n(n−1)/2 comparisons', 'Big value bubbles right'],
  ['Selection', 'Find unsorted minimum; place at front', 'O(n²)', 'O(n²)', 'O(n²)', 'O(1)', '✕ No', '✓ Yes', '✕ No', 'Comparison', 'Already sorted: still scans', 'Any order: same comparisons', 'n(n−1)/2 comparisons; at most n−1 non-self swaps', 'Select min, then swap'],
  ['Insertion', 'Insert key into sorted left prefix', 'O(n)', 'O(n²)', 'O(n²)', 'O(1)', '✓ Yes', '✓ Yes', '✓ Yes', 'Comparison', 'Already/nearly sorted', 'Reverse sorted', 'Shift only values greater than key; few inversions = few shifts', 'Grow sorted prefix'],
  ['Merge', 'Split halves; merge sorted halves', 'O(n log n)', 'O(n log n)', 'O(n log n)', 'O(n)', '✓ Yes†', '✕ No', '✕ No', 'Comparison', 'Any input', 'Any input', 'O(log n) levels × O(n) merge work; choose left first on equal keys', 'Split, then merge'],
  ['Quick', 'Pivot partition; recurse left/right', 'O(n log n)', 'O(n log n)', 'O(n²)', 'O(log n) avg; O(n) worst stack', '✕ No', '✓ Yes‡', '✕ No', 'Comparison', 'Balanced pivots', 'Sorted + first pivot', 'Partition on m items costs O(m); bad pivot makes n−1 and 0 splits', 'Pivot finds final slot'],
  ['Counting', 'Count keys; reconstruct output', 'O(n+k)', 'O(n+k)', 'O(n+k)', 'O(n+k)', '✓ Stable variant§', '✕ No', '✕ No', 'Non-comparison', 'Small key range k', 'Huge sparse range k', 'k = key-range size; not bounded by comparison-sort lower bound', 'Count, then repeat']
]

const instantRules = [
  ['Already sorted', 'Optimized Bubble O(n), Insertion O(n), Selection O(n²)'],
  ['Nearly sorted', 'Insertion usually strong: only a few shifts'],
  ['Guaranteed O(n log n)', 'Merge Sort, regardless of input order'],
  ['Bad pivot', 'Quick Sort can become O(n²)'],
  ['Small integer range', 'Counting Sort: O(n+k)'],
  ['Fewest non-self swaps (simple quadratic sorts)', 'Selection: at most n−1'],
  ['Stable + in-place (simple sorts)', 'Bubble and Insertion'],
  ['Comparison lower bound', 'General comparison sorting: Ω(n log n) worst case'],
  ['Why Counting can beat it', 'Counts integer keys; it is not comparison-based']
]

const memoryRows = [
  ['Bubble', '✓', '✓'], ['Selection', '✕', '✓'], ['Insertion', '✓', '✓'],
  ['Merge', '✓', '✕'], ['Quick', '✕', '✓'], ['Counting§', '✓', '✕']
]

const growth = [
  ['O(1)', 'Constant', 'Direct array index'],
  ['O(log n)', 'Logarithmic', 'Binary search'],
  ['O(n)', 'Linear', 'Linear search'],
  ['O(n log n)', 'Linearithmic', 'Merge sort; balanced/average quick sort'],
  ['O(n²)', 'Quadratic', 'Bubble/selection/insertion average or worst'],
  ['O(n³)', 'Cubic', 'Three nested n-loops'],
  ['O(2ⁿ)', 'Exponential', 'Brute-force subsets'],
  ['O(n!)', 'Factorial', 'Brute-force permutations']
]

export const sortingComparisonTableMarkup = `<section class="revision-block revision-main-table searchable" data-title="Sorting comparison table">
    <div class="revision-section-head"><span>01 / SIX ALGORITHMS</span><h2>Sorting comparison at a glance</h2><p>Table ko sideways scroll karo; first column fixed rahega.</p></div>
    <div class="revision-table-scroll" role="region" aria-label="Sorting algorithms comparison table" tabindex="0">
      <table><thead><tr>${columns.map(column => `<th scope="col">${column}</th>`).join('')}</tr></thead>
      <tbody>${algorithms.map(row => `<tr>${row.map((cell, index) => index === 0 ? `<th scope="row">${cell}</th>` : `<td>${cell}</td>`).join('')}</tr>`).join('')}</tbody></table>
    </div>
    <p class="revision-footnote">*Optimized Bubble needs a no-swap flag. †Merge is stable when equal keys from left go first. ‡Quick is in-place apart from its recursion stack. §Stable Counting needs cumulative positions + output placement; your 8.7.2 frequency-rebuild code sorts plain integers but does not preserve record identity.</p>
  </section>`

export const sortingRevisionMarkup = `<div class="sorting-revision">
  ${sortingComparisonTableMarkup}

  <section class="revision-block searchable" data-title="GATE Instant Recognition">
    <div class="revision-section-head"><span>02 / SPOT THE CLUE</span><h2>GATE Instant Recognition</h2></div>
    <div class="revision-rule-grid">${instantRules.map(([clue, answer]) => `<div><b>${clue}</b><span>${answer}</span></div>`).join('')}</div>
  </section>

  <div class="revision-two-up">
    <section class="revision-block searchable" data-title="Stable In-place Memory Table">
      <div class="revision-section-head"><span>03 / PROPERTY CHECK</span><h2>Stable / In-place Memory Table</h2></div>
      <table class="revision-memory-table"><thead><tr><th>Algorithm</th><th>Stable</th><th>In-place</th></tr></thead><tbody>${memoryRows.map(([name, stable, inPlace]) => `<tr><th>${name}</th><td>${stable}</td><td>${inPlace}</td></tr>`).join('')}</tbody></table>
      <p class="revision-footnote">§Counting ka “✓ Stable” stable placement variant ke liye hai, 8.7.2 ke simple integer reconstruction ke liye nahi.</p>
    </section>
    <section class="revision-block searchable" data-title="Complexity Pattern Recognition">
      <div class="revision-section-head"><span>04 / READ THE RECURRENCE</span><h2>Complexity Pattern Recognition</h2></div>
      <ul class="revision-patterns">
        <li><code>1 + 2 + … + n</code><b>Θ(n²)</b></li>
        <li><code>n → n/2 → n/4 → … → 1</code><b>Θ(log n) levels</b></li>
        <li><code>n work × log n levels</code><b>Θ(n log n)</b></li>
        <li><code>n work × n levels</code><b>Θ(n²)</b></li>
        <li><code>O(n) + O(k) + O(n)</code><b>O(n+k)</b></li>
      </ul>
    </section>
  </div>

  <section class="revision-block revision-growth searchable" data-title="Time Complexity Growth Order">
    <div class="revision-section-head"><span>05 / ASYMPTOTIC ORDER</span><h2>Time Complexity Growth Order</h2><p>Left se right growth badhti hai; sufficiently large n par left wale generally better scale karte hain.</p></div>
    <p class="revision-growth-formula">O(1) &lt; O(log n) &lt; O(n) &lt; O(n log n) &lt; O(n²) &lt; O(n³) &lt; O(2ⁿ) &lt; O(n!)</p>
    <div class="revision-growth-chain" aria-label="Increasing time complexity">1 <span>&lt;</span> log n <span>&lt;</span> n <span>&lt;</span> n log n <span>&lt;</span> n² <span>&lt;</span> n³ <span>&lt;</span> 2ⁿ <span>&lt;</span> n!</div>
    <p class="revision-growth-words">Constant &lt; Logarithmic &lt; Linear &lt; Linearithmic &lt; Quadratic &lt; Cubic &lt; Exponential &lt; Factorial</p>
    <div class="revision-growth-examples">${growth.map(([complexity, label, example]) => `<div><b>${complexity}</b><span>${label}</span><small>${example}</small></div>`).join('')}</div>
    <p class="revision-growth-note">GATE trap: very small n plug karke Big-O order decide mat karo. Yeh asymptotic growth hai.</p>
  </section>
</div>`
