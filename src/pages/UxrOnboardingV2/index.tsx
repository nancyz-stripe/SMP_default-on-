import { useCallback, useEffect, useState } from 'react'
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { PageRoot } from '../../components/PageRoot'
import { StripeWordmark } from '../../components/StripeWordmark'
import { Activation, type ActPage } from './Activation'
import { Dashboard } from './Dashboard'
import { DashSearch } from './DashSearch'
import { Landing } from './Landing'
import { Pricing } from './Pricing'
import { SetupGuide } from './SetupGuide'
import { SharedGlobe } from './SharedGlobe'
import {
  AboutBusiness,
  DomesticCoverage,
  GetStarted,
  HowToStart,
  ManagedPayments,
  TypeOfSetup,
  TypesOfGoods,
  Welcome,
} from './steps'
import { useSharedGlobe } from './useSharedGlobe'
import './styles.css'

/** The onboarding flow as it goes in front of research participants.
 *
 *  Version 2: the variant tested against version 1, and identical to it but for one
 *  thing — the cross-border brief is gone, so the goods question leads straight to
 *  the Managed Payments offer. What the research measures is whether the offer needs
 *  that screen's framing to land.
 *
 *  The two UXR versions share nothing with each other or with /onboarding beyond
 *  the app's own machinery — the globe scene, PageRoot, the wordmark. Every screen,
 *  all the copy and the whole stylesheet can change in one without touching the
 *  others.
 *
 *  Every step is named by one path, /uxr/v2/<step>, with the Dashboard and the
 *  account app's pages named as steps like any other. */

type Action = 'continue' | 'skip' | 'later' | 'live' | 'sandbox'

const ACTION_LABELS: Record<Action, string> = {
  continue: 'Continue',
  skip: 'Skip',
  later: 'I’ll decide later',
  live: 'Get your account live now',
  sandbox: 'Go to sandbox',
}

const PRIMARY: Action[] = ['continue', 'sandbox']

type Step = {
  id: string
  /** The two stripe.com pages, which sit outside the modal and outside the
   *  progress bar. */
  siteStep?: boolean
  /** No background treatment on this screen, exactly as V1 has it. */
  plain?: boolean
  width?: 'narrow' | 'wide' | 'full'
  /** The step whose right half is the globe. */
  globe?: boolean
  back?: boolean
  actions?: Action[]
  dashboardStep?: boolean
}

const ALL_STEPS: Step[] = [
  // Where the merchant arrives: the Managed Payments product page.
  { id: 'landing', siteStep: true },
  // Before the account exists: the pricing page on stripe.com.
  { id: 'pricing', siteStep: true },
  { id: 'welcome', plain: true, width: 'narrow', back: false, actions: ['continue'] },
  { id: 'about-business', plain: true, width: 'narrow', actions: ['skip', 'continue'] },
  { id: 'how-to-start', plain: true, actions: ['skip', 'continue'] },
  { id: 'types-of-goods', plain: true, actions: ['later', 'continue'] },
  // No cross-border brief here: in this version the goods question leads straight
  // to the offer. V1 has the brief in between, and the difference is the test.
  { id: 'managed-payments', width: 'full', globe: true, actions: ['skip', 'continue'] },
  { id: 'domestic-coverage', actions: ['skip', 'continue'] },
  { id: 'type-of-setup', plain: true, actions: ['continue'] },
  { id: 'get-started', plain: true, width: 'wide', actions: ['live', 'sandbox'] },
  { id: 'dashboard', dashboardStep: true },
]

const SITE_SLUGS = ALL_STEPS.filter((s) => s.siteStep).map((s) => s.id)

/** The account app's pages carry their own slugs, prefixed with `activate`. */
const ACT_SLUGS: Record<string, ActPage> = {
  activate: 'act-page-type',
  'activate-managed-payments': 'act-page-extras',
  'activate-fraud-protection': 'act-page-radar',
}

/** Every step is named by one path, /uxr/<step>, so there's no mapping to keep in
 *  step with a list of routes. */
function slugFromRoute(step: string | undefined) {
  return step ?? ''
}

export default function FlowGlobe() {
  const routeParams = useParams()
  const [search] = useSearchParams()
  const navigate = useNavigate()

  const asked = slugFromRoute(routeParams.step)

  /** The stripe.com pages are their own variant, so they're opt-in: the gallery's
   *  Website card is what asks for them. Without that the flow is the Onboarding
   *  variant and starts where the account does, at Welcome — the two pages aren't
   *  skipped past, they're not in the run at all, so Back can't reach them. */
  const [steps] = useState<Step[]>(() =>
    search.get('site') === '1' || SITE_SLUGS.includes(asked)
      ? ALL_STEPS
      : ALL_STEPS.filter((s) => !s.siteStep),
  )

  // Both checkbox groups start empty so the merchant answers for themselves rather
  // than confirming a guess. `managed` is the single choice on the opt-in screen.
  const [use, setUse] = useState<number[]>([])
  const [sell, setSell] = useState<number[]>([])
  const [managed, setManaged] = useState(0)
  const [domestic, setDomestic] = useState(false)
  const [setup, setSetup] = useState(0)
  const [location, setLocation] = useState('United States')

  const [collapsed, setCollapsed] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [actOpen, setActOpen] = useState(false)
  const [actPage, setActPage] = useState<ActPage>('act-page-type')

  const globe = useSharedGlobe()

  /** A step with a `when` only applies to some paths through the cut — the domestic
   *  upsell doesn't follow "I'll handle this myself". */
  const applies = useCallback(
    (step: Step) => step.id !== 'domestic-coverage' || managed === 0,
    [managed],
  )

  const [index, setIndex] = useState(() => {
    const at = steps.findIndex((s) => s.id === asked)
    if (at !== -1) return at
    // The account app's slugs land on the dashboard with the overlay open.
    if (ACT_SLUGS[asked]) return steps.findIndex((s) => s.dashboardStep)
    // ?s=2 is the old numbered form, 1-based, kept so links already out there
    // still land.
    const numbered = Number.parseInt(search.get('s') ?? '', 10)
    return numbered >= 1 && numbered <= steps.length ? numbered - 1 : 0
  })

  // A slug naming one of the account app's pages opens it there.
  useEffect(() => {
    if (ACT_SLUGS[asked]) {
      setActOpen(true)
      setActPage(ACT_SLUGS[asked])
    } else if (search.get('activate') === '1') {
      setActOpen(true)
    }
    // Read once, from the entry URL.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const step = steps[index]

  /** The address bar follows the flow, so the link to hand someone is whatever is
   *  in it. Replaced rather than pushed: no history entry per step, which would
   *  otherwise fight the flow's own Back. */
  useEffect(() => {
    const slug = actOpen
      ? (Object.keys(ACT_SLUGS).find((k) => ACT_SLUGS[k] === actPage) ?? 'activate')
      : step.id
    navigate(`/uxr/v2/${slug}`, { replace: true })
  }, [step, actOpen, actPage, navigate])

  // Arriving on the dashboard always starts with the guide open and the overlay
  // and search shut.
  useEffect(() => {
    if (!step.dashboardStep) return
    setCollapsed(false)
    setSearchOpen(false)
  }, [step])

  const goHome = useCallback(() => navigate('/gallery'), [navigate])

  /** Continuing past the last screen on this path leaves the flow — the same exit
   *  backing out of the first screen takes. */
  const goNext = useCallback(() => {
    for (let i = index + 1; i < steps.length; i++) {
      if (applies(steps[i])) return setIndex(i)
    }
    goHome()
  }, [index, steps, applies, goHome])

  const goBack = useCallback(() => {
    for (let i = index - 1; i >= 0; i--) {
      if (applies(steps[i])) return setIndex(i)
    }
    goHome()
  }, [index, steps, applies, goHome])

  /** Jump straight to a named step. The website pages link to each other and skip
   *  into the flow, so they can't rely on next and back alone. */
  const goTo = (id: string) => {
    const at = steps.findIndex((s) => s.id === id)
    if (at !== -1) setIndex(at)
  }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      // Arrows step the flow, but not while they're moving a caret in a field.
      const tag = (e.target as HTMLElement)?.tagName
      if (tag === 'INPUT' || tag === 'TEXTAREA') return
      if (e.key === 'ArrowRight') goNext()
      if (e.key === 'ArrowLeft') goBack()
      if (e.key === 'Escape') setSearchOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [goNext, goBack])

  /** Clicking anywhere else on the dashboard puts the search away. */
  const searchWrap = useCallback((el: HTMLSpanElement | null) => {
    if (!el) return
    const onDown = (e: MouseEvent) => {
      if (!el.contains(e.target as Node)) setSearchOpen(false)
    }
    document.addEventListener('mousedown', onDown)
    return () => document.removeEventListener('mousedown', onDown)
  }, [])

  /** The bar fills evenly across the modal screens this path actually visits. The
   *  website pages come before the flow and the dashboard is the destination rather
   *  than a step, so none of them take a share of it. */
  const progress = () => {
    const path = steps.filter((s) => applies(s) && !s.dashboardStep && !s.siteStep)
    const at = path.indexOf(step)
    if (at === -1) return 100
    return Number((((at + 1) / path.length) * 100).toFixed(1))
  }

  const toggle = (setter: React.Dispatch<React.SetStateAction<number[]>>) => (i: number) =>
    setter((current) => (current.includes(i) ? current.filter((x) => x !== i) : [...current, i]))

  /** SMP Home opens on the stage the onboarding choice puts the account in, so the
   *  state that follows from that choice is the one that's waiting. */
  const smpHome = () => navigate(`/smp-home/${managed === 0 ? 'new-smp' : 'new-no-smp'}`)

  const content = () => {
    switch (step.id) {
      case 'welcome':
        return <Welcome location={location} onLocation={setLocation} />
      case 'about-business':
        return <AboutBusiness />
      case 'how-to-start':
        return <HowToStart selected={use} onToggle={toggle(setUse)} />
      case 'types-of-goods':
        return <TypesOfGoods selected={sell} onToggle={toggle(setSell)} />
      case 'managed-payments':
        return (
          <ManagedPayments selected={managed} onSelect={setManaged} globeHost={globe.hostRef} />
        )
      case 'domestic-coverage':
        return <DomesticCoverage checked={domestic} onToggle={() => setDomestic((d) => !d)} />
      case 'type-of-setup':
        return <TypeOfSetup selected={setup} onSelect={setSetup} />
      case 'get-started':
        return <GetStarted />
      default:
        return null
    }
  }

  const inModal = !step.siteStep && !step.dashboardStep

  return (
    <PageRoot slug="uxr-onboarding-v2">
      <Link to="/gallery" className="back-button">
        &larr; Home
      </Link>

      {step.id === 'landing' && (
        <div id="landing-step" className="active">
          <Landing
            onPricing={() => goTo('pricing')}
            onStart={() => goTo('welcome')}
            globeHost={globe.hostRef}
          />
        </div>
      )}

      {step.id === 'pricing' && (
        <div id="pricing-step" className="active">
          <Pricing onOverview={() => goTo('landing')} onStart={goNext} />
        </div>
      )}

      <div
        id="dash-layer"
        className={step.dashboardStep ? (collapsed ? 'active' : 'active guided') : undefined}
      >
        <Dashboard
          onSmpHome={smpHome}
          onOpenSearch={() => setSearchOpen(true)}
          searchOpen={searchOpen}
          searchWrap={searchWrap}
          search={searchOpen && <DashSearch onGoToSmpHome={smpHome} />}
        />

        {step.dashboardStep && (
          <div id="dashboard-step" className={collapsed ? 'active collapsed' : 'active'}>
            <SetupGuide
              onCollapse={() => setCollapsed(true)}
              onExpand={() => setCollapsed(false)}
              onVerify={() => {
                setActOpen(true)
                setActPage('act-page-type')
              }}
            />
            <Activation
              open={actOpen}
              page={actPage}
              onPage={setActPage}
              onClose={() => {
                setActOpen(false)
                setActPage('act-page-type')
              }}
            />
          </div>
        )}
      </div>

      <div
        className="modal-backdrop"
        style={inModal ? undefined : { display: 'none' }}
        // Clicking outside the modal leaves the flow. Guarded on the target so
        // clicks inside it don't bubble up into an exit.
        onClick={(e) => {
          if (e.target === e.currentTarget) goHome()
        }}
      >
        <div className="modal">
          <div className={`modal-gradient${step.plain ? ' hidden' : ''}`}></div>
          <div className="modal-header">
            <div className="stripe-logo">
              <StripeWordmark label="" />
            </div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${progress()}%` }}></div>
            </div>
          </div>

          <div className={`modal-body${step.globe ? ' flush' : ''}`}>
            <div className={`step ${step.width ?? ''}`}>{content()}</div>
          </div>

          <div className="modal-footer">
            <button
              className="back-link"
              style={step.back === false ? { visibility: 'hidden' } : undefined}
              onClick={goBack}
            >
              ← Back
            </button>
            <div className="footer-actions">
              {(step.actions ?? []).map((action) => (
                <button
                  key={action}
                  className={PRIMARY.includes(action) ? 'btn-continue' : 'btn-secondary'}
                  onClick={goNext}
                >
                  {ACTION_LABELS[action]}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <SharedGlobe element={globe.element} holder={globe.holder} diameter={globe.diameter} />
    </PageRoot>
  )
}
