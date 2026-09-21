import { useNavigate, useSearchParams } from 'react-router-dom'
import { SmpScreen } from './Screen'
import { configFromParams, type SmpConfig } from './config'

/** The SMP screen as a page of its own. It owns its config, and keeps it in the
 *  URL so a particular combination can be linked to or shared. */
export default function Smp() {
  const [params, setParams] = useSearchParams()
  const navigate = useNavigate()

  const config = configFromParams(params)

  return (
    <SmpScreen
      config={config}
      preview={params.get('preview') === '1'}
      onHome={() => navigate('/gallery')}
      onConfigChange={(key: keyof SmpConfig, value) => {
        if (config[key] === value) return
        const next = new URLSearchParams(params)
        next.set(key, value)
        // Replace rather than push: flipping a control is adjusting the view, not
        // a step worth a Back button of its own.
        setParams(next, { replace: true })
      }}
    />
  )
}
