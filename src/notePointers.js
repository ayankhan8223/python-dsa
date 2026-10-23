// Keep lesson explanations as scan-friendly pointers without changing
// interactive panels, code blocks, question feedback, or chapter subtitles.
export function applyNotePointers() {
  const chapters = document.querySelectorAll('[data-panel="notes"] .chapter')

  for (const chapter of chapters) {
    let list = null

    for (const child of [...chapter.children]) {
      if (child.tagName !== 'P' || child.className) {
        list = null
        continue
      }

      if (!list) {
        list = document.createElement('ul')
        list.className = 'note-pointers'
        chapter.insertBefore(list, child)
      }

      const item = document.createElement('li')
      while (child.firstChild) item.appendChild(child.firstChild)
      list.appendChild(item)
      child.remove()
    }
  }
}
