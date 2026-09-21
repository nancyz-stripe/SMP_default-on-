import { useState } from 'react'
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
import { CrossBorderBrief, DomesticCoverage, ManagedPayments } from './steps'
import './styles.css'

/** The onboarding flow with the cross-border stretch built into it, rather than
 *  handed to a separate screen: the brief, the managed-payments choice, and the
 *  domestic upsell that only follows it. The shared screens come from the archive
 *  flow unchanged. */
export default function Flow2step() {
  const [params] = useSearchParams()

  // Defaults mirror the pre-selected rows in the Figma.
  const [use, setUse] = useState<number[]>([1])
  const [sell, setSell] = useState<number[]>([0])
  const [managed, setManaged] = useState<number | null>(0)
  const [domestic, setDomestic] = useState(false)
  const [setup, setSetup] = useState(0)
  const [spotlightShown, setSpotlightShown] = useState(true)

  const steps: FlowStep[] = [
    { id: 'welcome', width: 'narrow', back: false, actions: ['continue'] },
    { id: 'about-business', width: 'narrow', actions: ['skip', 'continue'] },
    { id: 'how-to-start', actions: ['skip', 'continue'] },
    { id: 'types-of-goods', actions: ['continue'] },
    { id: 'cross-border-brief', actions: ['skip', 'continue'] },
    { id: 'managed-payments', actions: ['skip', 'continue'] },
    // The upsell doesn't follow "I'll handle this myself".
    { id: 'domestic-coverage', actions: ['skip', 'continue'], when: () => managed === 0 },
    { id: 'type-of-setup', actions: ['continue'] },
    { id: 'get-started', width: 'wide', actions: ['live', 'sandbox'] },
    { id: 'dashboard', dashboardStep: true },
  ]

  // ?s=2 is 1-based, to read the same way the screens are talked about.
  const startAt = Number.parseInt(params.get('s') ?? '', 10)
  const flow = useFlow(steps, {
    initialStep: startAt >= 1 && startAt <= steps.length ? startAt - 1 : 0,
    progressMode: 'path',
  })

  const toggle = (setter: React.Dispatch<React.SetStateAction<number[]>>) => (index: number) =>
    setter((current) =>
      current.includes(index) ? current.filter((i) => i !== index) : [...current, index],
    )

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
      case 'cross-border-brief':
        return <CrossBorderBrief />
      case 'managed-payments':
        return <ManagedPayments selected={managed} onSelect={setManaged} />
      case 'domestic-coverage':
        return <DomesticCoverage checked={domestic} onToggle={() => setDomestic((on) => !on)} />
      case 'type-of-setup':
        return <TypeOfSetup selected={setup} onSelect={setSetup} />
      case 'get-started':
        return <GetStarted />
      default:
        return null
    }
  }

  return (
    <PageRoot slug="flow-2step">
      <BackHome />

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
        hidden={!!step.dashboardStep}
        onNext={flow.goNext}
        onBack={flow.goBack}
        onHome={flow.goHome}
      >
        {content()}
      </FlowModal>
    </PageRoot>
  )
}
