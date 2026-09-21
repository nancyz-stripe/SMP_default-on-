// Wraps a prototype's stylesheet in a `.page-<slug>` root so 28 of them can
// coexist in one bundle without fighting. Class names are left exactly as the
// originals wrote them — the isolation comes from the wrapper plus native CSS
// nesting, not from renaming anything.
//
// Two things can't live inside the wrapper, so they're hoisted and given a
// per-page prefix instead: @keyframes (nesting doesn't admit them, and names
// are global) and @font-face / @property / @import.

const HOIST = /^@(keyframes|font-face|property|import|charset|namespace)\b/i

// Walks the top level of a stylesheet, splitting it into nodes. Strings,
// comments and url() payloads are skipped over so a brace or semicolon inside
// a data URI doesn't look like structure.
function topLevelNodes(css) {
  const nodes = []
  let i = 0
  let start = 0
  let depth = 0

  while (i < css.length) {
    const c = css[i]

    if (c === '/' && css[i + 1] === '*') {
      const end = css.indexOf('*/', i + 2)
      i = end === -1 ? css.length : end + 2
      continue
    }
    if (c === '"' || c === "'") {
      i++
      while (i < css.length && css[i] !== c) i += css[i] === '\\' ? 2 : 1
      i++
      continue
    }
    if (c === '{') {
      depth++
      i++
      continue
    }
    if (c === '}') {
      depth--
      i++
      if (depth === 0) {
        nodes.push(css.slice(start, i).trim())
        start = i
      }
      continue
    }
    // A top-level statement with no block of its own, e.g. `@import url(…);`
    if (c === ';' && depth === 0) {
      i++
      const text = css.slice(start, i).trim()
      if (text) nodes.push(text)
      start = i
      continue
    }
    i++
  }

  const tail = css.slice(start).trim()
  if (tail) nodes.push(tail)
  return nodes
}

// `body`, `html`, `:root` and `*` all mean "the page" once the sheet is
// wrapped, so they become `&`. `*` additionally has to keep matching the
// wrapper itself, or a `* { margin: 0 }` reset would skip the root.
function rewriteSelector(selector) {
  return selector
    .split(',')
    .map((part) => {
      const s = part.trim()
      if (s === '*') return '&, & *'
      if (s === 'body' || s === 'html' || s === ':root' || s === 'html, body') return '&'
      // `body.foo`, `body:has(…) .bar`, `html[data-x] p`, …
      return s.replace(/^(?:html|body|:root)\b/, '&')
    })
    .join(', ')
}

// A node's text starts at the end of the previous one, so it carries any
// comment written above the rule. Those come along for the ride, but they must
// not be mistaken for part of the selector.
function splitLeadingComments(prelude) {
  const m = /^((?:\s*\/\*[\s\S]*?\*\/)*\s*)([\s\S]*)$/.exec(prelude)
  return [m[1], m[2]]
}

function rewriteBlockSelectors(node) {
  const open = node.indexOf('{')
  if (open === -1) return node
  const [comments, prelude] = splitLeadingComments(node.slice(0, open))
  const lead = comments.trim() ? comments.trim() + '\n' : ''
  const rest = node.slice(open)
  // At-rules (@media, @supports, …) keep their prelude; their inner rules are
  // rewritten by the recursive pass below.
  if (prelude.trim().startsWith('@')) {
    const inner = rest.slice(1, rest.lastIndexOf('}'))
    const rewritten = topLevelNodes(inner)
      .map((n) => (n.includes('{') ? rewriteBlockSelectors(n) : n))
      .join('\n')
    return `${lead}${prelude.trim()} {\n${indent(rewritten)}\n}`
  }
  return `${lead}${rewriteSelector(prelude)} ${rest}`
}

function indent(text, pad = '  ') {
  return text
    .split('\n')
    .map((line) => (line.trim() ? pad + line : line))
    .join('\n')
}

// The originals lived inside a <style> tag, so every line carries that
// indentation. Strip the common prefix before re-indenting under the wrapper.
function dedent(css) {
  const lines = css.replace(/\t/g, '    ').split('\n')
  const widths = lines
    .filter((l) => l.trim())
    .map((l) => l.match(/^ */)[0].length)
  const common = widths.length ? Math.min(...widths) : 0
  return lines.map((l) => l.slice(common)).join('\n').trim()
}

export function scopeCss(css, slug) {
  const prefix = `p${slug.replace(/[^a-zA-Z0-9]/g, '-')}`
  const nodes = topLevelNodes(dedent(css))

  const hoisted = []
  const scoped = []
  const keyframeNames = []

  for (const node of nodes) {
    if (HOIST.test(node)) {
      const kf = /^@(-webkit-)?keyframes\s+([\w-]+)/i.exec(node)
      if (kf) keyframeNames.push(kf[2])
      hoisted.push(node)
    } else if (node.includes('{')) {
      scoped.push(rewriteBlockSelectors(node))
    } else if (node.trim()) {
      hoisted.push(node)
    }
  }

  let out = ''
  if (hoisted.length) out += hoisted.join('\n\n') + '\n\n'
  out += `.page-${slug} {\n${indent(scoped.join('\n\n'))}\n}\n`

  // Keyframe names are global, so two prototypes with a `fadeIn` would
  // otherwise silently share one animation. Prefix the definitions and every
  // reference to them.
  for (const name of keyframeNames) {
    const re = new RegExp(`\\b${name}\\b`, 'g')
    out = out.replace(re, `${prefix}-${name}`)
  }

  return out
}
