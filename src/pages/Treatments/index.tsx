import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { BackHome } from '../../components/BackHome'
import { DashboardShell } from '../../components/DashboardShell'
import { PageRoot } from '../../components/PageRoot'
import { StripeWordmark } from '../../components/StripeWordmark'
import { Globe } from '../../globe/Globe'
import type { GlobeHandle, Route } from '../../globe/createGlobe'
import {
  BEATED,
  GRADIENTS,
  ORDER,
  SHARES,
  TREATMENTS,
  type GradientId,
  type TreatmentId,
} from './catalogue'
import { HOME, HOME_2, MARKETS, REGION_COORDS, type Choice, type Scope } from './state'
import './styles.css'

/** Eleven treatments for the last two steps of the flow, switchable from a
 *  control panel so a review can read them against each other.
 *
 *  Steps 3 and 4 have already happened — the user sells AI services and named
 *  three markets — and every treatment reads that carry-over from shared state
 *  rather than hardcoding it. */

const PURPLE = 0x533afd
const BLUE = 0x0d8eff
const GREY = 0x8792a2

export default function Treatments() {
  const [params, setParams] = useSearchParams()
  const navigate = useNavigate()
  const globe = useRef<GlobeHandle>(null)

  const preview = params.get('preview') === '1'

  const [treatmentId, setTreatmentId] = useState<TreatmentId>(() => {
    const t = params.get('t')
    return t && ORDER.includes(t as TreatmentId) ? (t as TreatmentId) : '5A'
  })
  const [gradient, setGradient] = useState<GradientId>(() => {
    const g = params.get('grad')
    return GRADIENTS.some((x) => x.id === g) ? (g as GradientId) : 'spotlight'
  })
  const [share, setShare] = useState(() => {
    const s = params.get('share')
    return SHARES.some((x) => x.id === s) ? Number.parseFloat(s!) : 0.25
  })
  // Beats are deep-linkable so a single beat can be shared or reviewed directly.
  const [beat, setBeat] = useState(() => {
    const b = params.get('beat')
    return b === '0' || b === '1' || b === '2' ? Number.parseInt(b, 10) : 0
  })

  const [choice, setChoice] = useState<Choice>('smp')
  const [scope, setScope] = useState<Scope>('intl')

  const treatment = TREATMENTS[treatmentId]
  const beated = BEATED.includes(treatmentId)

  const resolve = <T,>(value: T | ((beat: number) => T)): T =>
    typeof value === 'function' ? (value as (beat: number) => T)(beat) : value

  const wide = resolve(treatment.wide ?? false)
  const right = resolve(treatment.right ?? null)

  // The URL carries the whole configuration, so a treatment can be linked to.
  useEffect(() => {
    const next = new URLSearchParams(params)
    next.set('t', treatmentId)
    next.set('grad', gradient)
    next.set('share', String(share))
    if (beated) next.set('beat', String(beat))
    else next.delete('beat')
    setParams(next, { replace: true })
    // `params` is deliberately not a dependency: it's the thing being written.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [treatmentId, gradient, share, beat, beated])

  /** The globe's arcs are state, not decoration: they run from the home market to
   *  whichever regions the user named, and the domestic one appears only once
   *  Managed Payments covers domestic volume. */
  const routes = useMemo<Route[]>(() => {
    const list: Route[] = MARKETS.flatMap((market, i) => {
      const to = REGION_COORDS[market]
      return to ? [{ from: HOME, to, colorFrom: PURPLE, colorTo: BLUE, delay: i * 220 }] : []
    })
    if (scope === 'all') {
      list.push({
        from: HOME,
        to: HOME_2,
        colorFrom: GREY,
        colorTo: GREY,
        delay: MARKETS.length * 220,
      })
    }
    return list
  }, [scope])

  useEffect(() => {
    globe.current?.setRoutes(routes)
  }, [routes])

  /** Continue walks the beats first, then the treatment list. */
  const step = (dir: number) => {
    if (beated) {
      const next = beat + dir
      if (next >= 0 && next <= 2) {
        setBeat(next)
        return
      }
    }
    const i = ORDER.indexOf(treatmentId) + dir
    if (i < 0 || i >= ORDER.length) return
    selectTreatment(ORDER[i])
  }

  const selectTreatment = (id: TreatmentId) => {
    setTreatmentId(id)
    if (BEATED.includes(id)) setBeat(0)
  }

  // Step 5 sits at 70%; the beats creep forward inside it so the sub-steps don't
  // feel like standing still.
  const progress = (treatment.step === 5 ? 70 : 85) + (beated ? beat * 3 : 0)

  const props = {
    choice,
    share,
    onPick: setChoice,
    beat,
    onSetBeat: setBeat,
    scope,
    onSetScope: setScope,
    onToggleDomestic: () => setScope((s) => (s === 'all' ? 'intl' : 'all')),
  }

  const picker = <T extends string>(
    options: readonly { id: T; label: string }[],
    active: T,
    onChange: (value: T) => void,
  ) => (
    <>
      {options.map((option) => (
        <button
          key={option.id}
          className={`opt${active === option.id ? ' on' : ''}`}
          onClick={() => onChange(option.id)}
        >
          {option.label}
        </button>
      ))}
    </>
  )

  const byStep = (n: 5 | 6) =>
    ORDER.filter((id) => TREATMENTS[id].step === n).map((id) => ({
      id,
      label: TREATMENTS[id].label,
    }))

  return (
    <PageRoot slug="treatments">
      {!preview && <BackHome id="backHome" />}

      {!preview && (
        <ControlPanel>
          <div className="control-group">
            <span className="control-label caps">Step 5 — recommendation + comparison</span>
            <div className="control-rows">{picker(byStep(5), treatmentId, selectTreatment)}</div>
          </div>
          <div className="control-group">
            <span className="control-label caps">Step 6 — extend to all payments</span>
            <div className="control-rows">{picker(byStep(6), treatmentId, selectTreatment)}</div>
          </div>
          <div className="control-group">
            <span className="control-label">Gradient</span>
            <div className="control-rows side-by-side">
              {picker(GRADIENTS, gradient, setGradient)}
            </div>
          </div>
          <div className="control-group">
            <span className="control-label">International share of volume</span>
            <div className="control-rows side-by-side">
              {picker(SHARES, String(share) as '0.1' | '0.25' | '0.7', (v) =>
                setShare(Number.parseFloat(v)),
              )}
            </div>
          </div>
          <div className="panel-note">{treatment.note}</div>
          <div className="panel-note">
            <b>Rates are placeholders.</b> 2.9% domestic / 3.4% international / +3.5% SMP. The
            all-payments vs. international-only price is still unresolved &mdash; every figure here
            assumes the same +3.5% on covered volume.
          </div>
        </ControlPanel>
      )}

      <DashboardShell />

      <div
        className="modal-backdrop"
        onClick={(e) => {
          if (e.target === e.currentTarget) navigate('/gallery')
        }}
      >
        <div className="modal">
          <div className="modal-gradient" data-grad={gradient}></div>
          <div className="modal-header">
            <div className="stripe-logo">
              <StripeWordmark label="" />
            </div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${progress}%` }}></div>
            </div>
          </div>

          <div className={`modal-split${wide ? ' wide' : ''}`} data-t={treatmentId}>
            <div className="modal-left">{treatment.render(props)}</div>
            <div className="modal-right-wrapper">
              <div className="modal-right">
                {/* The globe is mounted once and hidden when a treatment doesn't
                    want it — rebuilding the scene on every switch would restart
                    its arcs and cost a re-sample of the dot field. */}
                <Globe
                  id="globeHost"
                  className={right === 'globe' ? undefined : 'hidden'}
                  handleRef={globe}
                  options={{ scale: 0.7225, arcs: 'routes', routes }}
                >
                  <div className="globe-glow-circle" id="globe-glow-circle"></div>
                </Globe>
                <div id="rightPane">{right === 'pane' && treatment.renderRight?.()}</div>
              </div>
            </div>
          </div>

          <div className="modal-footer">
            <button className="back-link" onClick={() => step(-1)}>
              ← Back{' '}
            </button>
            <button className="btn-continue" onClick={() => step(1)}>
              Continue
            </button>
          </div>
        </div>
      </div>
    </PageRoot>
  )
}

/** Collapsed by default: the screen is the point, the panel is the aside. */
function ControlPanel({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false)
  return (
    <div className={`control-panel${collapsed ? ' collapsed' : ''}`}>
      <div className="control-panel-head" onClick={() => setCollapsed((c) => !c)}>
        <span className="control-panel-title">Treatments</span>
        <svg
          className="control-panel-caret"
          viewBox="0 0 12 12"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M2.5 4.5L6 8l3.5-3.5" />
        </svg>
      </div>
      <div className="control-panel-body">{children}</div>
    </div>
  )
}
