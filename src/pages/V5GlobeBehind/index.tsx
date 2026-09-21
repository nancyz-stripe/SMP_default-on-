import { useState } from 'react'
import { PageRoot } from '../../components/PageRoot'
import { BackHome } from '../../components/BackHome'
import { SandboxShell } from '../../components/SandboxShell'
import { OptionsList, WizardModal } from '../../components/WizardModal'
import { Globe } from '../../globe/Globe'
import './styles.css'

/** Rotating globe behind the options: the baseline's wizard modal, with the
 *  globe and its ring painted inside the dialog rather than beside it. */

const OPTIONS = [
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
]

export default function V5GlobeBehind() {
  const [selected, setSelected] = useState<string>()

  return (
    <PageRoot slug="v5-globe-behind">
      <BackHome />

      <SandboxShell />

      <WizardModal
        progress={5}
        backDisabled
        continueDisabled={!selected}
        behind={
          <>
            <div className="globe-ring"></div>
            <Globe id="globe-container" options={{ palette: 'flat' }} />
          </>
        }
      >
        <div className="question-heading">
          Where should Stripe manage payments for you?{' '}
          <span className="muted">
            We'll increase your revenue while managing tax, fraud, and disputes for you.{' '}
          </span>
        </div>
        <OptionsList options={OPTIONS} selected={selected} onSelect={setSelected} />
        <button className="link-later">I'll decide this later</button>
      </WizardModal>
    </PageRoot>
  )
}
