import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { BackHome } from '../../components/BackHome'
import { DashboardShell } from '../../components/DashboardShell'
import { PageRoot } from '../../components/PageRoot'
import { FlowModal } from '../../flow/FlowModal'
import { SandboxDashboard } from '../../flow/SandboxDashboard'
import { SetupGuide } from '../../flow/SetupGuide'
import {
  AboutBusiness,
  GetStarted,
  HowToStart,
  TypeOfSetup,
  TypesOfGoods,
  Welcome,
} from '../../flow/sharedSteps'
import { useFlow, type FlowStep } from '../../flow/useFlow'
import { SmpScreen } from '../Smp/Screen'
import { configFromParams, type SmpConfig } from '../Smp/config'
import './styles.css'

/** The onboarding flow, end to end. Step 5 is the merged SMP screen; every other
 *  step is shared with the two-step flow.
 *
 *  The original loaded that screen in an iframe and talked to it over
 *  postMessage — it had to, since each prototype was its own document. Composed
 *  as a component, its config is just state here and its navigation is a
 *  callback. */

/** Which variant this run of the flow is threading through. The variant only
 *  governs step 5, and the three named frameworks are presets over one merged
 *  screen rather than separate builds. */
const VARIANTS = {
  v1: { label: 'V1', title: 'Choose your scope', framework: 'scope' },
  v2: { label: 'V2', title: 'Auto-pilot vs Self-managed', framework: 'autopilot' },
  v3: { label: 'V3', title: 'Expand coverage', framework: 'expand' },
} as const

const BY_FRAMEWORK: Record<string, keyof typeof VARIANTS> = Object.fromEntries(
  Object.entries(VARIANTS).map(([key, v]) => [v.framework, key as keyof typeof VARIANTS]),
)

const STEPS: FlowStep[] = [
  { id: 'welcome', width: 'narrow', back: false, actions: ['continue'] },
  { id: 'about-business', width: 'narrow', actions: ['skip', 'continue'] },
  { id: 'how-to-start', actions: ['skip', 'continue'] },
  { id: 'types-of-goods', actions: ['continue'] },
  // The variant screen itself, which owns its own modal.
  { id: 'smp-variant', variantStep: true },
  { id: 'type-of-setup', actions: ['continue'] },
  { id: 'get-started', width: 'wide', actions: ['live', 'sandbox'] },
  { id: 'dashboard', dashboardStep: true },
]

export default function Flow() {
  const [params, setParams] = useSearchParams()

  // Either ?variant=v2 or ?framework=autopilot is a valid entry point.
  const variantParam = params.get('variant')
  const variantKey =
    variantParam && variantParam in VARIANTS
      ? (variantParam as keyof typeof VARIANTS)
      : (BY_FRAMEWORK[params.get('framework') ?? ''] ?? 'v1')
  const variant = VARIANTS[variantKey]

  // Presentational overrides pass straight through to the SMP step, so a flow
  // URL can pin an exact combination.
  const [smpConfig, setSmpConfig] = useState<SmpConfig>(() => ({
    ...configFromParams(params),
    framework: variant.framework,
  }))

  // Defaults mirror the pre-selected rows in the Figma. `use` and `sell` are
  // checkbox groups, so they hold arrays; `setup` is a single choice.
  const [use, setUse] = useState<number[]>([1])
  const [sell, setSell] = useState<number[]>([0])
  const [setup, setSetup] = useState(0)

  const flow = useFlow(STEPS)
  const [spotlightShown, setSpotlightShown] = useState(true)

  useEffect(() => {
    document.title = `SMP onboarding flow — ${variant.label} ${variant.title}`
  }, [variant])

  const toggle = (setter: React.Dispatch<React.SetStateAction<number[]>>) => (index: number) =>
    setter((current) =>
      current.includes(index) ? current.filter((i) => i !== index) : [...current, index],
    )

  const onSmpConfigChange = (key: keyof SmpConfig, value: string) => {
    setSmpConfig((current) => ({ ...current, [key]: value }))
    // Keep the combination in the flow's own URL, so stepping away and back —
    // or sharing the link — preserves it.
    const next = new URLSearchParams(params)
    next.delete('variant')
    next.set(key, value)
    setParams(next, { replace: true })
  }

  const step = flow.current

  const content = () => {
    switch (step.id) {
      case 'welcome':
        return <Welcome />
      case 'about-business':
        return <AboutBusiness />
      case 'how-to-start':
        return <HowToStart selected={use} onToggle={toggle(setUse)} />
      case 'types-of-goods':
        return <TypesOfGoods selected={sell} onToggle={toggle(setSell)} />
      case 'type-of-setup':
        return <TypeOfSetup selected={setup} onSelect={setSetup} />
      case 'get-started':
        return <GetStarted />
      default:
        return null
    }
  }

  return (
    <>
      <PageRoot slug="flow">
        <BackHome />

        {/* The greyed-out shell behind the modal, until the built-out dashboard
            takes over on the last step. */}
        <DashboardShell />

        <div id="dash-layer" className={step.dashboardStep ? 'active guided' : undefined}>
          <SandboxDashboard />
          {step.dashboardStep && (
            <SetupGuide
              spotlightShown={spotlightShown}
              onDismissSpotlight={() => setSpotlightShown(false)}
            />
          )}
        </div>

        <FlowModal
          step={step}
          progress={flow.progress}
          hidden={!!step.variantStep || !!step.dashboardStep}
          onNext={flow.goNext}
          onBack={flow.goBack}
          onHome={flow.goHome}
        >
          {content()}
        </FlowModal>
      </PageRoot>

      {/* Step 5, as a sibling rather than a child: both pages' stylesheets
          declare `.modal` and `.modal-backdrop`, so nesting one root inside the
          other would let this flow's rules reach into the SMP screen.

          It takes the flow's progress so the bar stays continuous across the
          seam, and hands Back and Continue back up. */}
      {step.variantStep && (
        <SmpScreen
          inFlow
          config={smpConfig}
          onConfigChange={onSmpConfigChange}
          progress={flow.progressFor(flow.index)}
          onNav={(dir) => (dir === 'next' ? flow.goNext() : flow.goBack())}
          onHome={flow.goHome}
        />
      )}
    </>
  )
}
