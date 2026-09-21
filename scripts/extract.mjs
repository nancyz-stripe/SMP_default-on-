// One-shot porting aid. Splits each legacy .html prototype into three parts:
//
//   .css   the <style> block, verbatim — the port keeps every class name
//   .jsx   the <body> markup, mechanically rewritten into JSX
//   .js    the <script> blocks, untouched, to be hand-ported into hooks
//
// Only the .css lands in src/. The other two go to a scratch dir, because
// turning imperative DOM scripts into React state is a judgement call this
// script has no business making.

import { readFileSync, writeFileSync, mkdirSync, readdirSync } from 'node:fs'
import { join, basename } from 'node:path'
import { scopeCss } from './scope-css.mjs'

const ROOT = new URL('..', import.meta.url).pathname
const SCRATCH = join(ROOT, '.port')
const PAGES = join(ROOT, 'src', 'pages')

// Attributes whose JSX spelling differs from HTML's. SVG presentation
// attributes are the long tail here: every hyphenated one camel-cases.
const ATTR_MAP = {
  class: 'className',
  for: 'htmlFor',
  tabindex: 'tabIndex',
  colspan: 'colSpan',
  rowspan: 'rowSpan',
  maxlength: 'maxLength',
  minlength: 'minLength',
  readonly: 'readOnly',
  autocomplete: 'autoComplete',
  autofocus: 'autoFocus',
  contenteditable: 'contentEditable',
  spellcheck: 'spellCheck',
  srcset: 'srcSet',
  crossorigin: 'crossOrigin',
  datetime: 'dateTime',
  enctype: 'encType',
  novalidate: 'noValidate',
  usemap: 'useMap',
  accesskey: 'accessKey',
  inputmode: 'inputMode',
  frameborder: 'frameBorder',
  allowfullscreen: 'allowFullScreen',
  playsinline: 'playsInline',
}

const VOID_TAGS = new Set([
  'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link',
  'meta', 'param', 'source', 'track', 'wbr',
])

// data-* and aria-* keep their hyphens in JSX; everything else hyphenated
// (stroke-width, clip-rule, xmlns:xlink, …) camel-cases.
function jsxAttrName(name) {
  const lower = name.toLowerCase()
  if (ATTR_MAP[lower]) return ATTR_MAP[lower]
  if (lower.startsWith('data-') || lower.startsWith('aria-')) return lower
  if (lower === 'xmlns:xlink') return 'xmlnsXlink'
  if (lower === 'xlink:href') return 'xlinkHref'
  if (lower.includes(':')) return lower.replace(/:(.)/g, (_, c) => c.toUpperCase())
  if (lower.includes('-')) return lower.replace(/-(.)/g, (_, c) => c.toUpperCase())
  return name
}

// `style="fill:none;width:8px"` → `style={{ fill: 'none', width: '8px' }}`
function jsxStyle(value) {
  const props = value
    .split(';')
    .map((d) => d.trim())
    .filter(Boolean)
    .map((decl) => {
      const i = decl.indexOf(':')
      if (i === -1) return null
      const prop = decl.slice(0, i).trim()
      const val = decl.slice(i + 1).trim()
      // Custom properties must stay quoted strings keyed verbatim.
      const key = prop.startsWith('--')
        ? `'${prop}'`
        : prop.replace(/-(.)/g, (_, c) => c.toUpperCase())
      return `${key}: ${JSON.stringify(val)}`
    })
    .filter(Boolean)
  return `style={{ ${props.join(', ')} }}`
}

function convertTag(tag) {
  // <!-- … --> is not a JSX comment.
  if (tag.startsWith('<!--')) {
    return `{/* ${tag.slice(4, -3).trim().replace(/\*\//g, '* /')} */}`
  }
  if (tag.startsWith('</')) return tag

  const m = /^<([a-zA-Z][\w:-]*)([\s\S]*?)(\/?)>$/.exec(tag)
  if (!m) return tag
  const [, name, rawAttrs, selfClose] = m

  const attrs = []
  const re = /([\w:.-]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'>]+)))?/g
  let a
  while ((a = re.exec(rawAttrs))) {
    const attr = a[1]
    const value = a[2] ?? a[3] ?? a[4]
    if (value === undefined) {
      // Bare boolean attribute: `disabled` → `disabled={true}`.
      attrs.push(`${jsxAttrName(attr)}={true}`)
      continue
    }
    if (attr.toLowerCase() === 'style') {
      attrs.push(jsxStyle(value))
      continue
    }
    attrs.push(`${jsxAttrName(attr)}=${JSON.stringify(value)}`)
  }

  const open = attrs.length ? `<${name} ${attrs.join(' ')}` : `<${name}`
  if (selfClose || VOID_TAGS.has(name.toLowerCase())) return `${open} />`
  return `${open}>`
}

function toJsx(html) {
  let out = ''
  let i = 0
  while (i < html.length) {
    const lt = html.indexOf('<', i)
    if (lt === -1) {
      out += escapeText(html.slice(i))
      break
    }
    out += escapeText(html.slice(i, lt))
    let end
    if (html.startsWith('<!--', lt)) {
      end = html.indexOf('-->', lt)
      end = end === -1 ? html.length : end + 3
    } else {
      // Skip over quoted attribute values so a `>` inside a data URI or
      // inline style doesn't terminate the tag early.
      end = lt + 1
      let quote = null
      while (end < html.length) {
        const c = html[end]
        if (quote) {
          if (c === quote) quote = null
        } else if (c === '"' || c === "'") {
          quote = c
        } else if (c === '>') {
          end++
          break
        }
        end++
      }
    }
    out += convertTag(html.slice(lt, end))
    i = end
  }
  return out
}

// `{` and `}` in text are JSX expression delimiters; nothing else in these
// prototypes' text needs escaping.
function escapeText(text) {
  return text.replace(/[{}]/g, (c) => `{'${c}'}`)
}

function pascal(name) {
  return name
    .replace(/\.html$/, '')
    .split(/[^a-zA-Z0-9]+/)
    .filter(Boolean)
    .map((p) => p[0].toUpperCase() + p.slice(1))
    .join('')
}

const files = [
  join(ROOT, 'index.html'),
  ...readdirSync(join(ROOT, 'variations'))
    .filter((f) => f.endsWith('.html'))
    .map((f) => join(ROOT, 'variations', f)),
]

mkdirSync(SCRATCH, { recursive: true })

for (const file of files) {
  const html = readFileSync(file, 'utf8')
  const slug = basename(file, '.html')
  const label = file.endsWith('variations/index.html') ? 'gallery' : slug
  const name = pascal(label)

  const styles = [...html.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/g)]
    .map((m) => m[1])
    .join('\n')
  const scripts = [...html.matchAll(/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/g)]
    .map((m) => m[1])
    .join('\n\n/* ---- next <script> ---- */\n\n')

  let body = /<body[^>]*>([\s\S]*)<\/body>/.exec(html)?.[1] ?? ''
  body = body
    .replace(/<script(?![^>]*\bsrc=)[^>]*>[\s\S]*?<\/script>/g, '')
    .replace(/<style[^>]*>[\s\S]*?<\/style>/g, '')

  mkdirSync(join(PAGES, name), { recursive: true })
  writeFileSync(join(PAGES, name, 'styles.css'), scopeCss(styles, label))

  writeFileSync(join(SCRATCH, `${label}.script.js`), scripts.trim() + '\n')
  // Assets moved from variations/assets to public/assets, and routes nest
  // (`/onboarding/welcome`), so the references have to be root-absolute now.
  const jsx = toJsx(body).replace(/="assets\//g, '="/assets/')
  writeFileSync(join(SCRATCH, `${label}.jsx`), jsx.trim() + '\n')
  console.log(`${label} → ${name}`)
}
