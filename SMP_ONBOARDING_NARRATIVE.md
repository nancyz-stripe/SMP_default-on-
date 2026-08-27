# SMP in Onboarding — Narrative Brief

The brief the next round of prototypes should be built against.

Synthesis of two rounds of leadership feedback:
- **Round 1** — feedback on `variations/smp.html`, `variations/flow.html`. Established that SMP is premium and deserves space.
- **Round 2 (Aug 26, 2026)** — review with Dan, Ahmed, Abhi, Janie, Courtney. Reversed the qualifying-question approach and set the recommendation-first direction.

Where the two rounds conflict, Round 2 wins. §2.1 records the reversal explicitly so we don't re-litigate it.

---

## 1. The overarching shift

**SMP is a premium, important product. Onboarding should treat it that way.**

Earlier versions optimized for compression — fit the SMP decision into as few onboarding steps as possible. The direction reverses that trade:

> Take the space we need to explain it. Don't simplify at the expense of clarity. Release ourselves from onboarding restrictions to do that.

Practical implication: **design the long version first.** Play out the full flow that actually teaches the product, then pare back once we know which beats are load-bearing. Do not start from a step budget.

### Goal statement

> Explain the value well enough that a user with zero prior understanding of Stripe or Managed Payments will knowingly opt into an expensive solution — and transparently share what it costs, with no hiding and no intentional vagueness.

---

## 2. The Round 2 reversal: recommend, don't ask

The single biggest change. **Stop asking users whether they plan to sell internationally. Assume it, and recommend accordingly.**

The reasoning from the review:

- Most digital goods businesses expect to sell internationally. It isn't a conscious choice they're making at onboarding — it's an assumption they already hold.
- Asking first **forfeits Stripe's ability to be opinionated.** Once we've asked, we're responding to their answer instead of telling them what's right for their business.
- Dan's framing: adopt a **playbook approach** — proactively suggest the appropriate products based on business type. Customers want Stripe to tell them what's best.
- The journey is "Stripe helps you go global," not "would you like to go global?"

### 2.1 What this supersedes

| Round 1 said | Round 2 says |
|---|---|
| Add a qualifying step upstream; don't pitch SMP to someone we haven't established sells internationally | **Assume international.** No gating question. Lead with the recommendation for digital goods businesses |
| Establish relevance, *then* educate, *then* recommend | Education and questions get **unbundled**. Recommendation is a paused moment in the flow, not the payoff of a questionnaire |

The Round 1 instinct was to earn the right to pitch. Round 2's answer is that for a digital goods business, the right is already earned by the business type — and asking reads as uncertainty on our part.

### 2.2 The unresolved tension inside this

Ahmed's concern stands and is not yet designed for: **are we forcing digital goods businesses to consider international selling when some of them don't need it?** Assuming global for everyone has a failure mode — the domestic-only merchant who now has to read past a recommendation that doesn't apply to them.

The framing in §3 is our current answer to this. It needs to be tested, not assumed to work.

---

## 3. The anchoring framing

The frame all explorations should be built against:

> These are the things you'll need as your business grows — disputes, tax thresholds, local banking requirements. Stripe handles them as they come up, and you only pay when you start making global sales. **Nothing changes until then.**

### Why this frame

- **"As they come up" reframes SMP from a purchase to a service.** It's not a bundle you're buying at onboarding; it's what Stripe absorbs on your behalf, when it happens. That's what makes it a recommendation rather than an upsell.
- **"You only pay when you have global sales" is genuinely disarming.** It converts the compliance content from a threat ("you'll owe tax in 40 jurisdictions") into a conditional that hasn't triggered yet.
- **It answers Ahmed's concern (§2.2) directly.** A domestic-only business isn't being forced to decide anything, because nothing costs them. The recommendation can stand without demanding a reaction.
- **It fixes the pacing problem.** The current single page is overwhelming largely because everything reads as a decision due *right now*. This defers the weight without deferring the information.

### The one thing we deliberately changed

An earlier phrasing ended with *"so don't worry about it now if you're not there yet."* We're not using that, because:

- It undercuts the transparency commitment that is the *precondition* for being opinionated (§4). If we say "don't worry," users won't read the comparison — and the price surfaces later as a surprise. That is exactly the dynamic that makes an opinionated default feel like a trap.
- In a flow where we've already decided to recommend SMP, "don't worry about it" reads as evasive: accept the default, don't examine it.

**"Nothing changes until then"** does the same reassurance work, but as a *factual claim the user can verify against the comparison* rather than an instruction to disengage. Defer urgency, not attention.

### Where this frame is weak

It carries step 1 of the three-step narrative (§5) well, and step 2 poorly. "We'll handle it" doesn't tell the user **what they'd be handling themselves instead** — and that contrast is where SMP's value actually lands. The side-by-side has to carry that load. Watch that the reassuring frame doesn't demote the comparison to fine print.

**Blocker:** is *"you only pay when you have global sales"* literally true of the pricing model, or a simplification? If there is any fixed or minimum component, this is the sentence users will quote back at us when they're upset. Needs confirmation before it ships in copy. See §10.

---

## 4. Opinionated *and* transparent — the trade the room made

The room accepted a recommendation-first, opinionated flow **on the condition** that it comes with real pricing transparency and a legible feature comparison.

These two are a package. Being opinionated without transparency is a trap; being transparent without an opinion is the overwhelming page we already have.

- Customers want Stripe to tell them what's best → **be opinionated.**
- Customers need to see the math → **show both prices, always.**
- Recommended ≠ only option → **the opt-out stays real and unpenalized.**

**SMP is the recommended default for digital goods businesses, not one option in a menu.** Frame it as "here's what we recommend for a digital goods business going global," with a clear, non-punitive path to self-managed.

---

## 5. The three-step narrative

The review identified three things the flow must walk the user through, in order:

1. **International payments for digital goods** — what selling globally actually involves.
2. **Managed vs. self-managed** — the choice, with pricing for both.
3. **Transition to full domestic capabilities** — extending SMP beyond cross-border.

This maps onto the step structure in §8: framing → decide whether → decide scope.

---

## 6. What the user must understand to decide

Ordered as dependencies. Each is a prerequisite for the next decision.

1. **Standard Stripe pricing** — the baseline they're comparing against (today: 2.9% domestic, 3.4% international).
2. **What SMP is, including what an MOR is** — explained from a zero baseline, in plain language.
3. **What they take on *without* SMP if they sell internationally** — the cost of the default, currently invisible. Global tax liability, local entity/processing requirements, disputes, fraud, customer support.
4. **What's included in SMP vs. the à la carte route** — what they'd otherwise assemble themselves, product by product.
5. **International vs. domestic coverage** — which volume SMP applies to, and what changes at the boundary.
6. **That there's an escape hatch** — self-managed is legitimate and fully supported, and not a dead end.
7. **What it costs** — SMP's fee (+3.5% per transaction, on top of standard processing), stated plainly and early.

If a step doesn't advance one of these seven, it's a candidate for cutting during the pare-back.

---

## 7. Principles to anchor to

- **Be opinionated.** Recommend. Don't ask users to self-diagnose what they need. (Round 2)
- **Transparency is the price of being opinionated.** Every option in a comparison shows its price. The two travel together or neither works. (Round 2)
- **Unbundle education from questions.** Don't stack teaching, asking, and recommending on one screen. Create a paused moment for the recommendation, then resume the flow. (Round 2)
- **Defer urgency, not attention.** Reassure with verifiable facts ("nothing changes until then"), never with "don't worry about it." (§3)
- **Progressive disclosure over a wall.** Compliance detail is what justifies SMP's value *and* what makes the flow intimidating. It earns its place incrementally, not all at once. (Round 2)
- **Education** — define the terms. What is an MOR? How does this increase their revenue? Answer both explicitly.
- **Clarity over vagueness** — don't omit terminology because it's complex. Explain it simply. Vagueness reads as something to hide, which is fatal for a premium product.
- **Assume zero baseline** — no assumed knowledge of Stripe, payments infrastructure, or Managed Payments.
- **Earn the decision, don't nudge it** — the goal is an *informed* opt-in. A default-on pattern the user didn't understand is a worse outcome than an opt-out.
- **Always leave an escape hatch** — self-managed is a real, supported choice, presented without penalty framing. If the only way to feel good about the flow is to choose SMP, the flow is coercive, not transparent.

---

## 8. Proposed flow

Round 2's structural ask: **break the current single page into 2–3 pages.** No gating question at the front (§2.1).

| Step | Purpose | Content |
|---|---|---|
| **1. Framing** | Set up global selling, without a wall | What selling internationally involves — tax thresholds, local banking, disputes, fraud, support — framed as things that come up *as you grow*, handled by Stripe. Progressive disclosure: headline claim visible, detail expandable. |
| **2. Recommendation + comparison** | The paused moment, first decision | "For a digital goods business, we recommend Managed Payments." Side-by-side, both priced: self-managed on standard Stripe (2.9% / 3.4%) vs. SMP (+3.5%). Self-managed column is the escape hatch — a real choice, not a warning. |
| **3. Scope** | Second decision, only if SMP | SMP for cross-border only vs. all volume, each priced, with a clear statement of what happens to volume SMP doesn't cover. |
| **4. Confirm** | Close the loop | What they chose, what it costs, what changes operationally. On the self-managed path: what they now own, the à la carte products that cover it, and that SMP remains available later. |

Baseline pricing (formerly its own step) now lives inside step 2's comparison. "What SMP is / what an MOR is" lives as expandable explanation attached to the SMP column, per the progressive-disclosure principle — unless testing shows users don't find it there.

**Do not collapse steps 2 and 3.** That split is the structural substance of both rounds of feedback. Deciding *whether* and deciding *how much* are independent decisions against four price points; one screen forces them to be evaluated simultaneously, which is the original problem.

### The escape-hatch path

Declining SMP is a supported outcome, not an error state. The self-managed branch needs the same care as the SMP branch:

- Named neutrally and positively — self-managed, not "no thanks" or "skip."
- Priced in the comparison alongside SMP, so the choice is legible.
- Ends with a genuine handoff: the à la carte products covering tax, disputes, fraud, support, and what they set up themselves.
- Reversible. They can move to SMP later, and the flow should say so.

---

## 9. Visual direction

Round 2 asked for **visual representations to help users understand the options** — the globe was named specifically.

Existing globe work to draw on: `variations/v1-globe-crossborder.html`, `v2-globe-all-volume.html`, `v5-globe-behind.html`.

Two jobs a visual could do, and they are not the same:

- **Framing (step 1)** — convey reach and the complexity that comes with it. Emotional, atmospheric.
- **Scope (step 3)** — make cross-border-only vs. all-volume legible at a glance. Diagrammatic, informational. This is the higher-value use: it's the harder concept and the weaker screen.

Prefer earning the globe on step 3 before decorating step 1 with it.

---

## 10. Open questions

**Blocking:**

- **Is "you only pay when you have global sales" literally true?** If there's any fixed component, the §3 frame needs rewording before it goes into copy.
- **Scope pricing** — what exactly is the price difference between SMP-for-everything and SMP-for-cross-border-only? Step 3 can't be built without concrete numbers for both.

**Design-resolvable:**

- **The domestic-only merchant (§2.2)** — what does the graceful exit look like for a business the "assume global" default doesn't fit? This is the main risk the reversal introduces.
- **How much compliance detail earns its place** in the flow vs. gets deferred to progressive disclosure or post-onboarding.
- **Where is the opt-out on the recommendation screen, and how much friction does it carry?** Too little and the recommendation isn't a recommendation; too much and it's coercive.
- **Does the reassuring frame demote the comparison?** If "nothing changes until then" means users skip the side-by-side, we've traded transparency for comfort.
- **The 30% incentive** — where does it belong in a transparency-first narrative? If it's a real time-bound offer, state it as such; if it's promotional framing, it may undercut the transparency principle.
- **Re-entry into SMP** — if they decline, how and where do they opt in later? The brief assumes reversibility; that needs a surface.
- **Escape-hatch handoff** — the actual à la carte list (Tax, Radar, disputes tooling, support) and any required setup, or the branch ends in a shrug.

---

## 11. What to build next

Explorations restart from scratch against this brief — see `SMP_ONBOARDING_EXPLORATIONS.md`. Prior treatment work is archived at `archive/SMP_ONBOARDING_EXPLORATIONS-v1.md`; it was built against the superseded qualify-first sequence.

1. **Step 1 (framing)** — treatments for the §3 frame, varying how much complexity is shown up front vs. disclosed.
2. **Step 2 (recommendation + comparison)** — the paused moment. This is the screen the whole flow exists to deliver, and where the opinionated/transparent trade is won or lost.
3. **Step 3 (scope)** — including the diagrammatic globe.
4. **Self-managed branch** at the same fidelity as the SMP branch, confirmation screen included.
5. Resolve the two blocking questions in §10 in parallel — they gate copy and the second half of the flow.

### Owners (from Round 2)

- **Nancy** — iterate the flow designs: break into 2–3 pages, refine the side-by-side, explore the globe.
- **Janie + Nancy** — refine messaging and content: clarity, transparency, opinionated-with-choice.
- **Courtney** — schedule the review with all relevant parties, including Tanya.
