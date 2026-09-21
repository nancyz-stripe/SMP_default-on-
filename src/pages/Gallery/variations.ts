/** The gallery's catalogue. Carried over from the original index.html, with
 *  each entry's `.html?query` target replaced by the route that now serves it —
 *  the query strings the prototypes read (framework, step, stage) are part of
 *  those routes' search params. */

export type Variation = {
  id: string
  title: string
  description?: string
  /** Where the card navigates. */
  to: string
  /** What the card previews, if that differs from where it navigates. */
  preview?: string
  /** A designed thumbnail wins over a live preview: when it's set, no iframe
   *  is built for the card at all. */
  thumb?: string
  framework?: string
  gradient?: string
  globe?: string
  valueCards?: boolean
  /** Flow cards get a "Start flow" affordance instead of a description. */
  flow?: boolean
}

export const latestVariations: Variation[] = [
  {
    id: 'v3-latest',
    title: 'v3.1',
    description: 'Xborder as default + expand to cover domestic',
    to: '/v/v3-latest',
    framework: 'Expand coverage',
    gradient: 'Spotlight gradient',
    globe: 'Medium',
    valueCards: true,
  },
  {
    // Duplicated from v3.1, to take the upgrade moment in another direction.
    id: 'v3-2-latest',
    title: 'v3.2',
    description: 'Xborder as default + expand to cover domestic',
    to: '/v/v3-2-latest',
    framework: 'Expand coverage',
    gradient: 'Spotlight gradient',
    globe: 'Medium',
    valueCards: true,
  },
  // Moved out of the Onboarding flow section; both are still the e2e flow, so
  // they keep the flow card's "Start flow" affordance.
  {
    id: 'flow-v1',
    title: 'V1 - Choose your scope',
    flow: true,
    to: '/flow?framework=scope',
    preview: '/smp?framework=scope&preview=1',
  },
  {
    id: 'flow-v2',
    title: 'V2 - Auto-pilot vs Self-managed',
    flow: true,
    to: '/flow?framework=autopilot',
    preview: '/smp?framework=autopilot&preview=1',
  },
]

/** Onboarding flow. The card is a preset that sets the framework, and the
 *  control panel on the SMP step can take it anywhere from there. */
export const flowVariations: Variation[] = [
  {
    id: 'flow-v3',
    title: 'SMP - Upgrade',
    to: '/flow?framework=expand',
    preview: '/smp?framework=expand&preview=1',
  },
]

/** Explorations: the full onboarding flow, with the cross-border stretch under
 *  review sitting inside it. Previews open on the screen each variant is
 *  about. */
export const exploreVariations: Variation[] = [
  {
    // The stripe.com pages, on their own. One card for both: the landing page
    // opens, and its nav reaches the pricing page in place — Pricing off the
    // landing nav, Overview back off the pricing nav.
    id: 'website',
    title: 'Website',
    to: '/website',
    thumb: '/assets/thumbs/website.png',
  },
  {
    // The flow, on the spotlight gradient, with the globe on the opt-in step.
    id: 'flow-globe',
    title: 'Onboarding',
    to: '/onboarding',
    preview: '/onboarding/managed-payments',
    thumb: '/assets/thumbs/onboarding.png',
  },
  {
    // The activation flow the setup guide opens: the card deep-links straight
    // to it, which is what clicking "Verify your account" on the dashboard
    // does.
    id: 'account-app',
    title: 'Account app',
    to: '/account-app',
    preview: '/account-app',
  },
  {
    // Not part of the flow: the post-signup surface, where the counterfactual
    // is the whole point.
    id: 'smp-home',
    title: 'SMP Home',
    to: '/smp-home',
    preview: '/smp-home',
    thumb: '/assets/thumbs/smp-home.png',
  },
  {
    // One screen, after the flow: what lands in the inbox on the first charge.
    id: 'email-first-payment',
    title: 'Email - First payment',
    to: '/email/first-payment',
    thumb: '/assets/thumbs/email-first-payment.png',
  },
  {
    // The other side of it: the nudge when a market's tax threshold is close.
    id: 'email-tax-threshold',
    title: 'Email - Approaching tax threshold',
    to: '/email/tax-threshold',
    thumb: '/assets/thumbs/email-tax-threshold.png',
  },
]

/** UXR: what goes in front of participants.
 *
 *  A fork of the onboarding flow rather than a link to it, so what research is
 *  testing can change without disturbing the build the team is iterating on. The
 *  two are identical today. */
export const uxrVariations: Variation[] = [
  {
    id: 'uxr-onboarding',
    title: 'Onboarding',
    description: 'The onboarding flow, end to end.',
    to: '/uxr',
    preview: '/uxr/managed-payments',
    thumb: '/assets/thumbs/onboarding.png',
  },
]

export const pastVariations: Variation[] = [
  {
    // Duplicated from v2, to gain the domestic expand toggle on top of the
    // autopilot framing.
    id: 'v6-latest',
    title: 'V6',
    description: 'Auto-pilot vs Self-managed + expand toggle',
    to: '/v/v6-latest',
    framework: 'Autopilot vs Self-managed',
    gradient: 'Spotlight gradient',
    globe: 'Medium',
    valueCards: false,
  },
  {
    // Duplicated from v3, to be simplified: bundling the headline with the
    // cross-border callout so there's less to parse before the domestic
    // toggle.
    id: 'v5-latest',
    title: 'V5',
    description: '[Simplified] Xboders as default + expand to cover domestic',
    to: '/v/v5-latest',
    framework: 'Expand coverage',
    gradient: 'Full gradient background',
    globe: 'Large',
    valueCards: true,
  },
  {
    id: 'v4-latest',
    title: 'v4',
    description: 'Auto-pilot vs Self-managed, with globe adapting to the choice',
    to: '/v/v4-latest',
    framework: 'Autopilot vs Self-managed',
    gradient: 'Spotlight gradient',
    globe: 'Medium',
    valueCards: false,
  },
  {
    id: 'v2-latest',
    title: 'v2',
    description: 'Auto-pilot vs Self-managed',
    to: '/v/v2-latest',
    framework: 'Autopilot vs Self-managed',
    gradient: 'Spotlight gradient',
    globe: 'Medium',
    valueCards: false,
  },
  {
    id: 'v8-latest',
    title: 'v1',
    description: '3 choices (xborder, all payments, manage myself)',
    to: '/v/v8-latest',
    framework: 'Choose your scope',
    gradient: 'Full gradient background',
    globe: 'Large',
    valueCards: true,
  },
  {
    id: 'baseline',
    title: 'Baseline',
    description: 'Default baseline following FOX patterns.',
    to: '/v/baseline',
  },
  {
    id: 'v5-globe-behind',
    title: 'Rotating globe',
    description: 'Animated rotating globe behind the options.',
    to: '/v/v5-globe-behind',
  },
  {
    id: 'v1-globe-crossborder',
    title: 'Automatic vs Manual',
    description: 'Split modal with globe. Automatic vs Manual payment management.',
    to: '/v/v1-globe-crossborder',
  },
  {
    id: 'v7-mode-no-gradient',
    title: 'Nested choices + value cards',
    description: 'Nested options under "Automatic" and animated value prop cards on the globe.',
    to: '/v/v7-mode-no-gradient',
  },
  {
    id: 'v6-fullscreen-gradient',
    title: 'Default-on & expand',
    description: 'Cross-border is the default + ability to expand domestic coverage.',
    to: '/v/v6-fullscreen-gradient',
  },
]
