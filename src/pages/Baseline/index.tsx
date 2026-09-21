import { useState } from 'react'
import { Link } from 'react-router-dom'
import { PageRoot } from '../../components/PageRoot'
import { SandboxShell } from '../../components/SandboxShell'
import { OptionsList, WizardModal } from '../../components/WizardModal'
import './styles.css'

/** The default baseline, following FOX patterns: one question in a wizard
 *  modal, with the progress bar and footer a multi-step flow would need. Only
 *  one step was ever written, so Back and Continue have nowhere to go — kept
 *  because the shape of the pattern is the point of the comparison. */

type Step = {
  heading: { question: string; muted: string }
  field: string
  options: { id: string; title: string; description?: string }[]
  progress: number
}

const STEPS: Step[] = [
  {
    heading: {
      question: 'Where should Stripe manage payments for you?',
      muted: "We'll increase your revenue while managing tax, fraud, and disputes for you.",
    },
    field: 'paymentScope',
    options: [
      {
        id: 'cross_border',
        title: 'Cross-border payments only',
        description:
          'Hand off the complexity of global selling and grow your cross-border revenue by x%.',
      },
      {
        id: 'all',
        title: 'All of my payments',
        description: 'Hand off operational burdens and maximize revenue at home and globally.',
      },
      { id: 'decide_later', title: "Customize this later / I'll decide later" },
    ],
    progress: 5,
  },
]

export default function Baseline() {
  const [stepIndex, setStepIndex] = useState(0)
  const [selections, setSelections] = useState<Record<string, string>>({})

  const step = STEPS[stepIndex]
  const selected = selections[step.field]

  return (
    <PageRoot slug="baseline">
      <Link className="nav-back" to="/gallery">
        ← Home
      </Link>

      <SandboxShell productCatalog />

      <WizardModal
        progress={step.progress}
        backDisabled={stepIndex === 0}
        continueDisabled={!selected}
        onBack={() => setStepIndex((i) => Math.max(0, i - 1))}
        onContinue={() => setStepIndex((i) => Math.min(STEPS.length - 1, i + 1))}
      >
        <div className="question-heading">
          {step.heading.question} <span className="muted">{step.heading.muted}</span>
        </div>
        <OptionsList
          options={step.options}
          selected={selected}
          onSelect={(id) => setSelections((current) => ({ ...current, [step.field]: id }))}
        />
      </WizardModal>
    </PageRoot>
  )
}
