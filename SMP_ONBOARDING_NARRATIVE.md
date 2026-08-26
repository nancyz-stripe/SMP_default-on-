# SMP in Onboarding — Narrative Brief

Synthesis of leadership feedback on the latest prototype (`variations/smp.html`, `variations/flow.html`), plus the narrative shaping that follows from it. This is the brief the next round of prototypes should be built against.

---

## 1. The overarching shift

**SMP is a premium, important product. Onboarding should treat it that way.**

The previous versions optimized for compression — fit the SMP decision into as few onboarding steps as possible. Leadership's direction reverses that trade:

> Take the space we need to explain it. Don't simplify at the expense of clarity. Release ourselves from onboarding restrictions to do that.

Practical implication: **design the long version first.** Play out the full, generous flow that actually teaches the product, then pare back to fewer steps once we know which beats are load-bearing. Do not start from a step budget.

### Goal statement

> Explain the value well enough that a user with zero prior understanding of Stripe or Managed Payments will knowingly opt into an expensive solution — and transparently share what it costs, with no hiding and no intentional vagueness.

---

## 2. Specific feedback → required changes

| # | Feedback | Change required |
|---|---|---|
| 1 | SMP is premium; take the space | Longer flow, more explanation, released from onboarding step constraints |
| 2 | Ask about relevance of international selling **before** presenting SMP | Add a qualifying step upstream. Don't pitch SMP to someone we haven't established is selling (or planning to sell) internationally |
| 3 | Compare SMP vs. not-SMP, **including pricing of each** | A real side-by-side with both price tags visible, not a single upsell card |
| 4 | If SMP: SMP for everything vs. SMP for cross-border only, **including pricing of each** | A distinct scope decision, with its own comparison and its own pricing |
| 5 | #3 and #4 in the same step is packing too much in | **Split them into separate steps.** Decide *whether*, then decide *how much* |

Item 5 is the structural fix. The current prototype collapses "should I use SMP?" and "what should SMP cover?" into one screen, which forces the user to evaluate two independent decisions against four price points simultaneously.

---

## 3. What the user must understand to decide

Ordered as dependencies — each one is a prerequisite for the next decision.

1. **Standard Stripe pricing** — the baseline they're comparing against (today: 2.9% domestic, 3.4% international).
2. **What SMP is, including what an MOR is** — explained from a zero baseline, in plain language.
3. **What they take on *without* SMP if they sell internationally** — this is the cost of the default, and it's currently invisible. Global tax liability, local entity/processing requirements, disputes, fraud, and customer support all land on them.
4. **What's included in SMP vs. the à la carte route** — what they'd otherwise assemble themselves, product by product.
5. **International vs. domestic coverage** — which volume SMP applies to, and what changes at the boundary.
6. **Levels and types of control** — what they keep, what they hand over, and where they can still intervene.
7. **What it costs** — SMP's fee (+3.5% per transaction, on top of standard processing fees), stated plainly and early, not revealed at the end.

If a step in the flow doesn't advance one of these seven, it's a candidate for cutting during the pare-back.

---

## 4. How we frame the solution

**SMP removes the complexity that is specific to selling globally.** That specificity matters — it's the difference between an upsell and an answer to a problem the user already has.

Two framing pillars:

- **Regulatory and financial complexity of global selling** — global tax liability, local processing and local acquiring, entity requirements, currency, compliance. These are the things a merchant genuinely cannot do alone without significant investment.
- **Operational burden** — disputes, fraud, and customer support at international scale. This is the ongoing, unglamorous cost that merchants systematically underestimate.

And one quantified upside: **lost revenue without local processing.** Local acquiring materially improves authorization rates; without it, they leave money on the table. This is the argument that makes the fee defensible rather than merely explained — it should be concrete, not hand-waved.

---

## 5. Problem setup — the "before" of the narrative

Before we introduce SMP at all, the flow needs to establish:

1. **Global selling is complex, hard, and risky** — not as a scare tactic, but with specific, recognizable obligations.
2. **Operations (fraud, risk, disputes, support) is a lot to handle** — and it doesn't stop after launch.
3. **Without local processing, they lose revenue they'd otherwise capture.**

Only then does "here's a product that absorbs all of that, for 3.5%" read as a proposition rather than a price increase.

---

## 6. Principles to anchor to

- **Transparency** — pricing and benefits stated fully, up front. Every option in a comparison shows its price.
- **Education** — define the terms. What is an MOR? How would this increase their revenue? Answer both explicitly.
- **Clarity over vagueness** — do not omit terminology because it's complex. Explain it simply instead. Vagueness reads as something to hide, which is fatal for a premium product.
- **Assume zero baseline** — no assumed knowledge of Stripe, payments infrastructure, or Managed Payments.
- **Earn the decision, don't nudge it** — the goal is an *informed* opt-in. A default-on pattern that a user didn't understand is a worse outcome than an opt-out.

---

## 7. Proposed longer flow

Written deliberately long, per the direction. Steps 1–2 gate; 3–5 educate; 6–7 decide.

| Step | Purpose | Content |
|---|---|---|
| **1. Qualify** | Establish relevance before pitching | Ask whether they sell — or plan to sell — internationally, and roughly where. If no: skip the SMP narrative entirely and continue standard onboarding. |
| **2. Baseline** | Anchor on standard pricing | What they get and pay on standard Stripe: 2.9% domestic, 3.4% international. This is the comparison point everything else is measured against. |
| **3. The problem** | Set up the stakes | What selling internationally actually requires: tax liability, local entities and processing, disputes, fraud, support. Framed as obligations they'd own. |
| **4. The cost of doing nothing** | Make the default's price visible | What they take on without SMP — the operational load, and the revenue lost without local processing. |
| **5. What SMP is** | Educate | Plain-language explanation of Managed Payments and the MOR model. What Stripe becomes responsible for. What control they keep. |
| **6. Decide: SMP or not** | First decision | Side-by-side comparison, both options priced: standard Stripe vs. SMP (+3.5%). Includes what's in SMP vs. what they'd assemble à la carte. |
| **7. Decide: scope** | Second decision, only if SMP | SMP for all volume vs. SMP for cross-border only — each with its own pricing, and a clear statement of what happens to the volume SMP doesn't cover. |
| **8. Confirm** | Close the loop | Summary of what they chose, what it costs, and what changes operationally. |

Note that steps 6 and 7 are the split of the current single screen. Step 1 is the new gate. Steps 3–4 are the framing work that the current flow mostly skips.

---

## 8. Pare-back candidates

Once the long flow is built and tested, likely consolidations — in order of confidence:

- **Merge 3 + 4** (the problem and the cost of doing nothing) into one framing step. They're the same argument from two angles.
- **Merge 2 into 6** — show standard pricing inside the comparison rather than as a standalone step, provided the comparison doesn't get crowded.
- **Fold 5 into 6** as expandable explanation attached to the SMP column, if testing shows users read it there.
- **Keep 1, 6, and 7 separate no matter what.** The qualifying gate and the two-decision split are the substance of the feedback; collapsing them undoes the fix.

Floor: **4 steps** (qualify → framing → decide SMP → decide scope). Ceiling as designed: 8.

---

## 9. Open questions

- **Pricing detail for the scope choice** — what exactly is the price difference between SMP-for-everything and SMP-for-cross-border-only? The comparison in step 7 can't be built without concrete numbers for both.
- **The 30% incentive** — where does it belong in a transparency-first narrative? It currently appears as a badge in the upgrade moment. If it's a real, time-bound offer, it should be stated as such; if it's promotional framing, it may undercut the transparency principle.
- **Qualifying question design** — do we ask directly ("do you sell internationally?"), infer from earlier onboarding signals, or both? Self-reported intent at onboarding is unreliable.
- **What happens on "no"** — if a user says they don't sell internationally, do we surface SMP at all later, and where?
- **Control specifics** — item 6 in §3 ("levels/types of control") is the least defined. We need the actual list of what a merchant keeps and gives up before we can explain it simply.

---

## 10. What to build next

1. Prototype the **8-step long flow** as a new variation. Don't optimize for length.
2. Build **step 6** (SMP vs. not, both priced) and **step 7** (scope, both priced) as fully separate screens.
3. Get the **step 7 pricing numbers** resolved — it's the hard blocker on the flow's second half.
4. Then run the pare-back against the seven understanding requirements in §3.
