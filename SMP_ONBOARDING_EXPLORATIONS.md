# SMP Onboarding — Explorations (v2, from scratch)

Restarted Aug 27, 2026, against the revised `SMP_ONBOARDING_NARRATIVE.md`.

The v1 treatments (`archive/SMP_ONBOARDING_EXPLORATIONS-v1.md`) were built against a qualify-first sequence that Round 2 reversed. The sequence changed, so the treatments restart rather than get patched. Individual patterns from v1 are still fair game to lift — the *structure* isn't.

---

## The frame everything is built against

> These are the things you'll need as your business grows — disputes, tax thresholds, local banking requirements. Stripe handles them as they come up, and you only pay when you start making global sales. **Nothing changes until then.**

Three properties every exploration has to preserve:

1. **No gating question.** International is assumed. We recommend; we don't ask.
2. **Conditional cost.** The fee is triggered by growth, not incurred today.
3. **Verifiable reassurance.** "Nothing changes until then" — never "don't worry about it."

Plus the standing trade: **opinionated only works if it's transparent.** Both prices visible on every comparison, always.

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

**Failure modes:** the recommendation reads as an upsell; or the comparison is so even-handed there's no recommendation left; or "nothing changes until then" gets users past the screen without reading the price.

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

This is the weakest screen in every prior version and the best home for the globe (§9 of the brief) — the concept is genuinely spatial.

### 3A — Diagrammatic globe
Volume split rendered on the globe: highlighted regions under SMP, home market distinct. Toggling scope re-renders it. Informational, not atmospheric.
- **Lift from:** `variations/v1-globe-crossborder.html`, `v2-globe-all-volume.html`.

### 3B — Volume bar
One horizontal bar, domestic and international segments, with SMP's coverage shaded. Less impressive than the globe, possibly clearer — a bar can show *proportion*, which a globe can't.

### 3C — Two priced cards
No visual. Two options, two prices, one line each on what happens to uncovered volume. The control condition.

**Build:** 3A and 3B, judged against 3C. If neither beats the plain cards on comprehension, the globe is decoration and belongs on step 1 or nowhere.

**Blocked:** all three need the real scope pricing numbers (§10 of the brief).

---

## Step 4 — Confirm

Two branches, equal fidelity.

- **SMP branch** — what they chose, what it costs, when the fee first applies (the payoff of "nothing changes until then"), what changes operationally.
- **Self-managed branch** — what they now own, the à la carte products covering it (Tax, Radar, disputes, support), what needs setting up, and that SMP stays available. Named neutrally throughout.

The self-managed confirmation is the honesty test for the whole flow. If it reads as a consolation prize, the recommendation upstream was coercive. Build it first, not last.

**Blocked:** needs the concrete à la carte list and setup requirements, or it ends in a shrug.

---

## Bundles to prototype

Each bundle is a coherent full flow, not a pick-and-mix.

| Bundle | Steps | Hypothesis |
|---|---|---|
| **B1 — Disclosed** | 1B → 2B → 3B → 4 | The likely ship candidate: progressive framing, recommended-with-real-alternative, proportional scope visual |
| **B2 — Restrained** | 1D → 2C → 3C → 4 | Minimal framing, with the workload diff carrying the whole argument at step 2 |
| **B3 — Quantified** | 1A → 2D → 3A → 4 | Growth-timeline framing into an arithmetic case, with the globe |

**Recommendation:** build B1 first as the baseline everything is measured against. B2 tests whether step 1 is doing real work or just occupying space. B3 tests whether numbers and visuals beat words — and is gated on the auth-rate figure and scope pricing.

---

## What each bundle answers

- **Is the framing step load-bearing?** B1 vs. B2.
- **Does an asymmetric comparison stay non-coercive?** B1 (2B) vs. the 2A check.
- **Does a visual beat plain cards on the scope decision?** B3/B1 vs. 3C.
- **Does reassurance suppress reading the price?** The 2E diagnostic.

---

## Open dependencies

Carried from `SMP_ONBOARDING_NARRATIVE.md` §10. Two block builds outright:

1. **Is "you only pay when you have global sales" literally true?** Gates all step 1 and step 2 copy.
2. **Scope pricing for cross-border-only vs. all-volume.** Gates step 3 entirely.
3. **Auth-rate lift from local acquiring** — a real number, or 2D and B3 don't get built.
4. **À la carte list + setup requirements** — gates the self-managed confirmation.

Steps 1 and 2 can proceed with placeholder copy flagged inline. Step 3 cannot proceed at all.
