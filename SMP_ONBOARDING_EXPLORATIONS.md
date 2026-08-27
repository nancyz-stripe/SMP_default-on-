# SMP Onboarding — Explorations (v2, from scratch)

Restarted Aug 27, 2026, against the revised `SMP_ONBOARDING_NARRATIVE.md`.

The v1 treatments (`archive/SMP_ONBOARDING_EXPLORATIONS-v1.md`) were built against a qualify-first sequence that Round 2 reversed. The sequence changed, so the treatments restart rather than get patched. Individual patterns from v1 are still fair game to lift — the *structure* isn't.

---

## The frame everything is built against

> These are the things you'll need as your business grows. Stripe will manage them for you as they come up (e.g. disputes, hitting tax thresholds). It only costs you when you start having global sales, so don't worry about it now if you're not there yet or don't know where your customers will come from.

This is the agreed copy, verbatim. Treat the four moves in it as fixed:

1. **No gating question.** International is assumed. We recommend; we don't ask.
2. **Managed as it happens.** Stripe handles obligations when they arise — a service, not a purchase.
3. **Conditional cost.** The fee is triggered by growth, not incurred today.
4. **Uncertainty is allowed.** "…or don't know where your customers will come from" — the merchant who can't predict their geography is explicitly fine. Don't cut this clause; it's what keeps the assumed-global default from cornering people.

Plus the standing trade: **opinionated only works if it's transparent.** Both prices visible on every comparison, always.

**The obligation the copy creates.** "Don't worry about it now" asks users to defer attention. That's an accepted risk (see `SMP_ONBOARDING_NARRATIVE.md` §3), and it raises the bar on the builds rather than lowering it:

- The step 2 comparison must be **encountered, not sought.** If reaching the price takes an extra click, "don't worry" has effectively hidden it.
- **Step 3 must volunteer the domestic rate change.** Unprompted, before the user commits.
- **Treatment 2E measures the risk.** It's an instrument, not a candidate.

---

## The four steps

| Step | Screen | The design problem |
|---|---|---|
| 1 | Framing | Convey real complexity without building a wall |
| 2 | Recommendation + comparison | Be opinionated and legible at the same time |
| 3 | Scope | Make cross-border-only vs. all-volume understandable at a glance |
| 4 | Confirm | Close honestly on either branch |

Step 2 is the screen the flow exists to deliver. Weight the exploration effort there.

---

## Step 1 — Framing

**Job:** establish that global selling brings obligations, that Stripe absorbs them as they arise, and that nothing is due right now.

**Failure modes:** a compliance wall that intimidates (the current problem); or so light a touch that step 2's fee has nothing to justify it. The frame's own weakness — it explains what Stripe does, not what the merchant would otherwise do — bites hardest here.

### The headline carries the assumption

Since there's no qualifying question, **the step 1 headline is the only place the assumption gets justified.** It has three jobs, and dropping any one of them breaks something:

1. **Peer evidence** — *why* we assumed it. "Businesses selling digital goods sell internationally as they grow."
2. **The assumption, named out loud** — "we've assumed you will too." This is the part that keeps assumed-global from reading as presumptuous. If we act on the assumption silently, a domestic-only merchant feels railroaded and starts hunting for an opt-out. If we state it, they can disagree with a premise instead — which is a much better experience and a much better signal for us.
3. **The promise** — "we'll handle the complexities for you."

| | Copy | Notes |
|---|---|---|
| **H1** | "X% of businesses selling digital goods sell internationally as they grow. We've assumed you will too, and we'll handle the complexities for you." | Strongest form of "companies like yours." Peer evidence → assumption → promise. **Entirely dependent on a real number.** |
| **H2** | "We've set you up to sell internationally. Businesses selling digital goods almost always do as they grow, so we'll handle the complexities that come with it." | Assumption first, evidence as the reason. The stat becomes support rather than premise, so this survives without a sourced figure. |
| **H3** | "Businesses like yours usually end up selling internationally. So we've set you up for it, and we'll handle the complexities as they come." | Control: does the peer claim need a number, or does "businesses like yours" carry it? **The only variant that can ship today.** |

**The X% is not filled in.** It renders as a flagged placeholder in the prototype rather than a plausible invented figure. It's a factual claim about the merchant's own peer group and the most quotable line on the screen — a made-up number here is the fastest way to lose them, and the hardest thing to walk back. Sourcing it is a new dependency (below).

If it can't be sourced, H2 and H3 both work; H1 doesn't. That's the real decision the toggle is there to inform.

### 1A — Timeline / "as you grow"
Obligations laid along a growth axis: first international sale → first dispute → first tax threshold → local banking requirement. Each is a marker; Stripe's handling is the through-line. Nothing is present-tense.
- **Tests:** does sequencing complexity in *time* defuse it better than listing it?
- **Risk:** timelines imply a schedule we can't actually predict.

### 1B — Trigger list, collapsed
Four or five obligations as one-line claims, each expandable to detail. Headline reads in five seconds; the depth is there for whoever wants it.
- **Tests:** the progressive-disclosure principle in its most literal form.
- **Risk:** collapsed rows read as fine print — the exact demotion §3 of the brief warns about.

### 1C — Two columns: what comes up / who handles it
Left, the obligation. Right, "Stripe." Repeated down the screen. The visual rhythm *is* the argument.
- **Tests:** whether making the handler explicit early sets up step 2's comparison better than prose.
- **Risk:** closest to a feature table; least emotionally engaging.

### 1D — Single claim, radical restraint
One sentence and one visual. All detail deferred to step 2 and to help content.
- **Tests:** the floor. How little framing can step 2 survive on?
- **Value:** even if we don't ship it, it tells us which framing beats are load-bearing — which is the pare-back question.

**Build:** 1B and 1D first. They're the two ends of the disclosure spectrum and bracket the answer.

---

## Step 2 — Recommendation + comparison

**Job:** state the recommendation plainly, show both options with both prices, keep the opt-out real.

**Failure modes:** the recommendation reads as an upsell; or the comparison is so even-handed there's no recommendation left; or step 1's "don't worry about it now" carries users past this screen without reading the price.

### 2A — Recommendation banner over a neutral side-by-side
Stripe's recommendation stated above two visually equal columns. Opinion lives in the copy; the comparison stays symmetrical.
- **Tests:** can the opinion sit outside the comparison rather than inside it?
- **Strength:** hardest version to accuse of stacking the deck.

### 2B — Asymmetric columns: recommended + alternative
SMP column visually primary; self-managed present, complete, correctly priced, secondary.
- **Tests:** the honest version of "recommended default." Most likely to ship.
- **Watch:** the opt-out has to remain a real choice at a glance, not a formality.

### 2C — "What you'd handle yourself" diff
Anchor on the merchant's own workload rather than on features. Self-managed lists what lands on them; SMP lists what doesn't.
- **Tests:** directly patches the frame's known weakness — step 2 is where "what you'd be doing instead" has to appear.
- **Risk:** tips into fear framing. The line between informative and coercive is thinnest here.

### 2D — Cost of the default, quantified
Both prices, plus the authorization-rate delta from local acquiring. Makes the fee arithmetic rather than assertion.
- **Tests:** whether the revenue argument makes +3.5% defensible instead of merely disclosed.
- **Blocker:** needs a real, defensible auth-rate number. Hand-waving here is worse than omitting it.

### 2E — Recommendation, then comparison on demand
Recommendation alone on the screen; the side-by-side opens as a panel or sub-step.
- **Tests:** the sharpest form of the open question "does reassurance demote the comparison?" If most users never open it, we have our answer — and it's a bad one.
- **Note:** run this as a diagnostic, not a candidate.

**Build:** 2B as the leading candidate, 2A as the check on whether it's coercive, 2C as the content patch. 2E only as an instrument.

---

## Step 3 — Scope

**Job:** cross-border-only vs. all-volume, each priced, with the boundary made concrete.

**No globe** (§9 of the brief). The globe shows reach; this screen turns on *proportion* — how much of their business the fee touches. A bar can show that; a globe can't.

**This screen also carries a load the others don't.** Steps 1–2 tell the user "you only pay when you have global sales." That is true — until they extend to all volume, which puts +3.5% on domestic. Step 3 is where the claim gets retired, explicitly and in the user's favor. Every treatment here has to state that the domestic rate changes. A step 3 that soft-pedals it makes the earlier framing retroactively dishonest.

Pricing (prototype model, unchanged):

| Scope | International | Domestic |
|---|---|---|
| Cross-border only | 6.9% (3.4 + 3.5) | 2.9% — unchanged |
| All volume | 6.9% | 6.4% (2.9 + 3.5) |

### 3A — Volume bar
One horizontal bar, domestic and international segments, SMP's coverage shaded. Toggling scope extends the shading across the domestic segment and the rate readout updates. The change is visible as area, not just as a number.
- **Tests:** whether proportion makes the trade legible in a way a rate table doesn't.
- **Strength:** the domestic segment lighting up *is* the disclosure. Hard to miss, hard to accuse of hiding.

### 3B — Rate table, both scopes side by side
Four cells: domestic and international × both scopes. The 2.9% → 6.4% change is the visual event.
- **Tests:** the most transparent possible version. Nothing inferred.
- **Risk:** four numbers is exactly the simultaneous-evaluation problem that split steps 2 and 3 in the first place.

### 3C — Two priced cards
Two options, one line each on what happens to uncovered volume, effective rate per card. The control condition.
- **Tests:** the floor. If this is as clear as 3A, the visual isn't earning its space.

**Build:** 3A as the candidate, 3C as the control. 3B only if 3A tests as under-disclosing.

---

## Step 4 — Confirm

Two branches, equal fidelity.

- **SMP branch** — what they chose, what it costs, and **when the fee first applies.** This is where "it only costs you when you start having global sales" gets cashed: the confirmation should state plainly that they're paying nothing today.
- **Self-managed branch** — what they now own, the à la carte products covering it (Tax, Radar, disputes, support), what needs setting up, and that SMP stays available. Named neutrally throughout.

The self-managed confirmation is the honesty test for the whole flow. If it reads as a consolation prize, the recommendation upstream was coercive. Build it first, not last.

**Blocked:** needs the concrete à la carte list and setup requirements, or it ends in a shrug.

---

## Bundles to prototype

Each bundle is a coherent full flow, not a pick-and-mix.

| Bundle | Steps | Hypothesis |
|---|---|---|
| **B1 — Disclosed** | 1B → 2B → 3A → 4 | The likely ship candidate: progressive framing, recommended-with-real-alternative, proportional scope bar |
| **B2 — Restrained** | 1D → 2C → 3C → 4 | Minimal framing, with the workload diff carrying the whole argument at step 2 |
| **B3 — Quantified** | 1A → 2D → 3A → 4 | Growth-timeline framing into an arithmetic case |

**Recommendation:** build B1 first as the baseline everything is measured against. B2 tests whether step 1 is doing real work or just occupying space. B3 tests whether the revenue argument beats the liability argument — still gated on a real auth-rate figure.

---

## What each bundle answers

- **Is the framing step load-bearing?** B1 vs. B2.
- **Does an asymmetric comparison stay non-coercive?** B1 (2B) vs. the 2A check.
- **Does the proportional bar beat plain cards?** 3A vs. 3C.
- **Does reassurance suppress reading the price?** The 2E diagnostic.
- **Does step 3 successfully retire the "only on global sales" claim?** All bundles — this is a pass/fail on every one of them, not a comparison.

---

## Open dependencies

From `SMP_ONBOARDING_NARRATIVE.md` §10. **Nothing blocks starting.**

Resolved Aug 27:
- Pricing claim is literally true; bounded at step 3. Copy can proceed unqualified in steps 1–2.
- Scope pricing keeps the prototype model — 2.9 / 3.4 standard, +3.5 on covered volume.
- Globe is out of scope.

Still open, non-blocking:
1. **The peer stat for headline H1** — what share of digital goods businesses on Stripe end up selling internationally, and over what window? Needed to ship H1 at all; H2 and H3 don't depend on it. Likely answerable from Stripe's own data, which would make it far more defensible than an industry figure.
2. **Auth-rate lift from local acquiring** — a real, defensible number, or 2D and B3 don't get built. Everything else proceeds.
3. **À la carte list + setup requirements** — the self-managed confirmation can be built with placeholders flagged inline, but it won't be reviewable until this lands.
4. **The 30% incentive** — excluded from these builds pending a decision on whether it survives a transparency-first flow.
