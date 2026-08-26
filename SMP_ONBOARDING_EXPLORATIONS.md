# SMP Onboarding — Sequencing & Design Explorations

Companion to `SMP_ONBOARDING_NARRATIVE.md`. That doc sets the brief; this one plays out concrete ways to build it. Five sequencing approaches, four messaging frames that can be swapped into any of them, and shared pattern catalogs for progressive disclosure, carry-over, and motion.

Nothing here is a recommendation until §9. The point is to have real, buildable options on the table.

**Current onboarding context** (from `variations/flow.html`): welcome → get started → how to start → about your business → types of goods → type of setup → **SMP step** → dashboard. There is no international-selling question anywhere in the flow today, which is why the qualifying gate is net-new rather than a rewording.

---

## Part I — Shared building blocks

### 1. Progressive disclosure patterns

The brief says "don't simplify at the expense of clarity" and "take the space we need." Those pull against overload. Disclosure is how we hold both: everything is available, not everything is loud.

| Pattern | Mechanic | Best for | Failure mode |
|---|---|---|---|
| **Term-level inline glossary** | Dotted-underline terms (MOR, local acquiring, tax liability) expand to 1–2 sentences in place; the row grows, nothing navigates away | The zero-baseline requirement, without bloating primary copy | Users never click. Mitigate: expand the single most important term (MOR) by default |
| **Layered detail (summary → detail → source)** | Each claim has a headline number, an expandable "how this works," and a link to docs | Pricing and revenue claims that need to survive scrutiny | Three layers is one too many for a decision screen; cap at two in-flow |
| **Sequential reveal within a step** | Content enters in beats as the user scrolls or advances a sub-step; the step is long but never dense | Steps 3–5 (problem, cost, what SMP is) | Feels like a gate on impatient users. Always allow scroll-ahead |
| **Comparison scaffolding** | The comparison table builds row by row rather than appearing complete | Step 6, where a full matrix is intimidating | Animating a table users want to read now is antagonistic. Build fast (≤600ms total) or not at all |
| **Deferred detail** | Some detail is explicitly moved *out* of onboarding to a post-setup surface, with a promise | Configuration-level control, à la carte setup | Becomes a dumping ground. Only defer what genuinely isn't decision-relevant |
| **Answer-gated content** | Step content adapts to the qualifying answers; users only see what applies | Keeping the long flow from feeling long | Users can't see what they're missing, which reads as hiding |

**Overload budget per screen** — a working constraint to design against:

- One decision per screen. Never two.
- At most one number the user must compare, plus its counterpart.
- At most three claims in a value column. Four reads as a feature list and stops being an argument.
- Body copy under ~90 words before an expandable.
- If a screen needs a scrollbar to show its primary action, it's two screens.

### 2. Carry-over patterns

Carry-over is what makes a long flow feel like one conversation instead of eight forms. It's also our best defense against the qualifying gate feeling like a throwaway question.

| Pattern | What it does | Where |
|---|---|---|
| **Answer echo** | Later steps restate what the user told us: "You said you sell to customers in the UK, Germany, and Japan." | Steps 3–7 headers |
| **Named-market substitution** | Generic copy becomes specific: "Selling into Germany means VAT registration once you cross €10,000." | Problem framing, coverage |
| **Persistent cost strip** | A thin, always-visible strip showing current effective rate as choices are made | Steps 6–7 |
| **Accumulating obligation list** | Items named in the problem steps persist as a checklist that later gets marked "Stripe handles this" or "you handle this" | Steps 3 → 6 → 8 |
| **Decision breadcrumb** | Step 7 restates the step 6 choice with an inline "change" affordance | Step 7 |
| **Pre-filled recommendation** | The qualifying answers produce a recommended scope, shown as a suggestion with reasoning, not a locked default | Step 7 |

The strongest single carry-over move: **make the qualifying answer visibly do work.** If a user names three countries in step 1 and then sees those three countries drive the tax obligations in step 3 and the coverage math in step 7, the flow earns credibility. If step 1's answer only routes them, they'll feel interrogated.

### 3. Motion catalog

The existing prototype has real motion investment: a rotating globe, a particle burst, a keyline sweep on the fee badge, gradient settle (`fee-gradient-settle`, `fee-receive`). Worth being deliberate about which of that survives a transparency-first rewrite.

**Motion that earns its place:**

| Move | Purpose | Spec sketch |
|---|---|---|
| **Globe as state, not decoration** | The globe's lit regions reflect the user's actual markets and change when scope changes | Cross-border only: home market dim, named markets lit. All volume: everything lit. 400ms crossfade on lit set |
| **Obligation transfer** | Items move from a "you" column to a "Stripe" column when SMP is selected | Staggered 60ms, 240ms each, ease-out. The literal visualization of what they're buying |
| **Rate roll-up** | The effective rate counts up/down when scope changes | 300ms numeric tween. Never animate the *price*'s appearance — it should be there from the start |
| **Coverage fill** | A volume bar fills to show what share of their payments SMP covers | 400ms, tied to the scope toggle |
| **Progressive line-draw on the comparison** | Rows arrive in sequence on first view only | ≤600ms total, skipped on revisit |

**Motion to retire or demote:**

- **The confetti burst.** Celebration on selecting a +3.5% product reads as *we won*. It rewards the outcome we want rather than the decision the user made, which is exactly the coercion the escape-hatch principle rules out. If we keep a success moment, it should fire on *completing onboarding* — on both branches, identically.
- **The keyline sweep / gradient settle on the fee badge.** Beautifying the price is a tell. A premium price stated plainly is more confident than a price with a shimmer on it.
- **Gradient fill on "more revenue."** Same issue: emphasis by decoration on the upside, with no matching emphasis on the cost. Asymmetric styling is a transparency leak.

**Rules of engagement:**

- Motion may *explain* (state, transfer, coverage) but may not *persuade* (celebration, sparkle on prices).
- Anything applied to a benefit must have an equal-weight counterpart on a cost, or neither gets it.
- Both branches get the same motion vocabulary. Self-managed is not the grey option.
- Everything respects `prefers-reduced-motion`; every animated reveal has a static end state reachable instantly.

---

## Part II — Messaging frames

Four ways to say the same true things. These are swappable into any sequence in Part III, and they're the cheapest thing to A/B.

### Frame A — Liability-forward: "what you'd be taking on"

Leads with the obligations that transfer. Most honest about why the product exists; risks reading as fear-selling.

> **Selling internationally makes you responsible for a lot more than payments.**
>
> The moment you take money from a customer in another country, you take on that country's rules. Tax registration and filing where you cross local thresholds. A legal basis to process payments locally. Disputes under local consumer protection law. Refunds, fraud, and support in the customer's language and timezone.
>
> You can take all of that on. Plenty of businesses do. It's worth knowing what it is before you decide.

**Where it wins:** step 3–4. Establishes stakes without a single claim about Stripe.
**Guardrail:** every obligation named must be real and specific to the markets they entered. Generic doom is both less persuasive and less honest.

### Frame B — Revenue-forward: "what it's costing you not to"

Leads with authorization rates and local payment methods. Makes the fee arithmetic rather than insurance.

> **Cards issued in Germany get approved more often when the payment is processed in Germany.**
>
> When a payment crosses a border, the customer's bank sees a foreign transaction and declines more of them. Processing locally in each market removes that signal. Offering the payment methods people there actually use removes another barrier.
>
> For most businesses selling internationally, this is worth more than the fee costs.

**Where it wins:** as the counterweight to Frame A, and as the honest answer to "why is this 3.5%?"
**Guardrail:** "worth more than the fee" is a claim we must be able to support, ideally with a stated range and a link. If we can't quantify it, soften to a mechanism explanation and drop the comparative — a vague revenue promise is worse than none.

### Frame C — Labor-forward: "who does the work"

Sidesteps both fear and finance. Frames the choice as a staffing question, which is often how it actually lands for a small team.

> **Two ways to sell internationally. The difference is who does the work.**
>
> **You do it.** You register for tax where you owe it and file on time. You set up local processing. You answer disputes, review fraud, handle refunds and support across timezones.
>
> **Stripe does it.** Stripe becomes the merchant of record — the business the customer legally buys from. Stripe owns tax, disputes, fraud, and payment support. You own your product, your prices, and your customer relationship.

**Where it wins:** step 6, as the comparison's spine. It's the most legible framing of the actual trade and it makes the escape hatch dignified — "you do it" is a real answer, not a failure.
**Guardrail:** must be explicit about what the merchant *keeps*, or handing over the MOR role sounds like handing over the business.

### Frame D — Definitional / MOR-first: "here's the mechanism"

Leads with plain education, trusting that understanding produces the decision. The most aligned with "assume zero baseline" and "clarity over vagueness."

> **What "merchant of record" means**
>
> The merchant of record is the business the customer legally buys from. It's whose name is on the statement, who owes tax on the sale, who the bank comes to in a dispute.
>
> Today that's you, in every country you sell to. With Managed Payments, Stripe becomes the merchant of record. Stripe takes on the tax, the disputes, and the local processing that come with it. You keep your product, your pricing, your brand, and your customer relationship.
>
> That's the whole trade. Everything below is the detail.

**Where it wins:** step 5, and as the very first thing said about SMP anywhere.
**Guardrail:** it's the least emotionally motivating frame on its own. Pair with A or B for stakes.

### Frame notes

- **A + D + B, in that order**, is probably the strongest full-narrative combination: stakes → mechanism → upside. C is the best *comparison* frame regardless of which frames precede it.
- Tone across all four: declarative, second person, short sentences, no hedging, no exclamation. Numbers stated as numbers. No "seamless," "effortless," "just," or "simply."
- The word "upgrade" is worth reconsidering wholesale. It presumes the answer and makes the escape hatch a downgrade.

---

## Part III — Five sequencing approaches

Each approach lists its thesis, sequence, key copy, disclosure and carry-over mechanics, motion, and what it risks.

---

### Approach 1 — "The Ledger"

**Thesis:** the decision is fundamentally a cost-of-ownership comparison, so build that comparison openly, one line at a time, and let the user watch the two columns fill.

**Sequence (7 steps):**

1. **Where do you sell?** Qualifying gate. Country/region multi-select plus a "not yet, but planning to" option.
2. **Here's what selling there involves.** For each named market, the actual obligations. A ledger begins in the right rail: *Your responsibilities — 6 items.*
3. **Standard Stripe pricing.** 2.9% domestic, 3.4% international. The ledger gains a line: *Processing — 3.4% on international volume.* Nothing hidden, nothing yet compared.
4. **The two ways forward.** Frame C. Introduces the second ledger column.
5. **The comparison.** Both columns complete and priced, side by side. Self-managed: 3.4% + six responsibilities + the à la carte products needed to discharge them. SMP: 3.4% + 3.5% + zero responsibilities. **Decision.**
6. **Scope** (SMP only). All volume vs. cross-border only, each with its own effective blended rate given their actual mix.
7. **Your setup.** Final ledger, both what's handled and by whom.

**Disclosure:** the ledger *is* the disclosure mechanism — each line expands to explain itself. Primary copy stays under 60 words per step because the detail lives in the rail.

**Carry-over:** the ledger persists across every step and is the flow's spine. Nothing is introduced that doesn't land in it. This is the strongest carry-over of any approach here.

**Motion:** obligation transfer (items sliding from "you" to "Stripe" on selecting SMP) is the hero moment and it's genuinely explanatory. Rate roll-up on the scope toggle. No globe. No celebration.

**Content voice:** clinical, precise, unemotional. Reads like a term sheet, in a good way.

**Risks:** the ledger can feel like an invoice — a growing list of burdens has a nagging quality by step 4. It's also the least visually distinctive option, which for a "premium" product is a real objection. Six obligations in a rail may read as overload even though each one is short.

**Best if:** we believe the audience is skeptical, finance-literate, and allergic to being sold to.

---

### Approach 2 — "Follow the Payment"

**Thesis:** teach by walking a single real payment through the system, twice — once without SMP, once with. Mechanism-first education, made concrete.

**Sequence (6 steps, two of them long):**

1. **Where do you sell?** Qualifying gate.
2. **Let's follow one payment.** Pick the user's largest named market. "A customer in Germany buys a €50 subscription." Then five beats, revealed in sequence within one long step:
   - *Authorization* — a German card, a US acquirer, a foreign-transaction signal, a decline that didn't have to happen.
   - *Payment method* — they wanted to pay a way you don't offer.
   - *Tax* — German VAT on this sale. Who registers, who files.
   - *Dispute* — 60 days later, a chargeback under German consumer law. Who answers it.
   - *Support* — they email at 3am your time, in German.
3. **Same payment, with Managed Payments.** The identical five beats, re-run. Local authorization. Local method available. Stripe as MOR handles VAT. Stripe answers the dispute. Stripe handles the support contact. Frame D delivered inside the walkthrough rather than as a lecture.
4. **What that costs.** +3.5% per transaction on top of processing. Stated on its own screen, undecorated, with the arithmetic on the €50 example: standard €51.70 in fees vs. €53.45 — and the auth-rate upside beside it. Frame B, quantified on their own example.
5. **Choose.** Self-managed vs. SMP, both priced. **Decision.**
6. **Scope** (SMP only), then confirm.

**Disclosure:** sequential reveal is the core mechanic, and this is the one approach where a paced reveal is genuinely right — it's a story, and stories have order. Each beat expands for depth. Scroll-ahead always permitted.

**Carry-over:** the €50 payment and the named market carry the entire flow. The five beats become the comparison rows in step 5, so the comparison needs no explanation — the user already knows every row.

**Motion:** the payment travels — a small, restrained path animation from customer to bank to you, with the failure points marking themselves. Re-run in step 3 with the path rerouted locally. This is the most motion-justified approach of the five, because the motion carries the meaning. Globe optional as a backdrop for the path.

**Content voice:** narrative, concrete, second person, present tense. The most memorable of the five.

**Risks:** longest and slowest. Users who already understand cross-border payments will be impatient — needs a prominent "I know how this works, skip to the comparison." A five-beat story told twice is ten beats; if each beat is heavy it's a slog. And the specific example must be accurate, which means real VAT thresholds and real dispute windows, not illustrative ones.

**Best if:** we believe the core problem is genuine ignorance rather than skepticism — which is what "assume zero baseline" implies.

---

### Approach 3 — "The Map"

**Thesis:** the decision is spatial. Coverage is the organizing idea, geography is the interface, and the existing globe investment becomes functional instead of decorative.

**Sequence (6 steps):**

1. **Where do you sell?** The globe *is* the input. Select markets on a map; selected markets light. This makes the gate feel substantive rather than like a form field.
2. **What each of those markets asks of you.** The globe stays; pins carry the obligations per market. Tax threshold in Germany, dispute rules in the UK, local method expectations in Japan. Genuinely per-market, which no other approach delivers as naturally.
3. **What local processing changes.** Frame B, spatially: the map shows the payment route going the long way, then locally. Auth-rate mechanism explained geographically.
4. **Your options.** Self-managed vs. SMP, priced. Globe recedes to a supporting role — the comparison is text and numbers, not geography. **Decision.**
5. **Scope** (SMP only). This is where the map pays off most: cross-border-only lights the foreign markets and leaves home dim; all-volume lights everything including home. The abstract scope question becomes a picture. Effective rate shown per configuration.
6. **Confirm** — a map of what's covered.

**Disclosure:** per-market. Users see detail for the markets they chose and can click any pin for more. Naturally answer-gated, naturally proportional.

**Carry-over:** the selected market set is the carry-over object and it's visible on every screen. Very strong, though narrower than the Ledger's — it carries *where* but not *what it costs*.

**Motion:** globe as state throughout (lit-set crossfades), route re-drawing in step 3, coverage lighting in step 5. The existing rotating-globe work adapts directly. Idle rotation should stop once the globe becomes an input — a spinning control is a decorative control.

**Content voice:** concrete and place-specific. "Selling into Japan" beats "selling internationally" every time.

**Risks:** geography flatters the international story and buries the pricing story, which cuts against the transparency principle — the map is the most beautiful and the least numerical of the five. Merchants who sell to 40 countries break the interface. And a globe is where the previous rounds already lived; reusing it may re-anchor reviewers on the version leadership just pushed back on.

**Best if:** the scope decision (step 7 in the brief) turns out to be the harder of the two decisions. Nothing explains scope better than a lit map.

---

### Approach 4 — "Two Doors"

**Thesis:** minimum steps, maximum depth on demand. Respects the user's time, puts the decision up front, and treats both doors as equal. The most direct read of the escape-hatch principle.

**Sequence (4 steps):**

1. **Do you sell internationally?** Qualifying gate, one question, plus markets. Fast.
2. **Two ways to do this.** Frame C. Two panels, symmetrical, both priced, both with three claims. Each panel expands into as much depth as anyone wants — the full liability list, the full mechanism, the full pricing detail, the à la carte inventory on the self-managed side. Everything from the long flow is *here*, layered rather than sequenced. **Decision.**
3. **Scope** (SMP only), priced.
4. **Confirm**, branch-specific.

**Disclosure:** does all the work. Two layers on the panels (summary → detail), inline glossary on every term, and a "learn more" third layer to docs. Nothing is removed relative to the long flows; it's reorganized from sequence into hierarchy.

**Carry-over:** thinnest of the five. Named markets echo in the panel copy and drive the scope recommendation, but there's no persistent object. This is the cost of brevity.

**Motion:** panel expansion (height animation, 240ms), obligation transfer within the SMP panel on hover/expand, rate roll-up on scope. No globe, no story, no celebration.

**Content voice:** confident and compressed. Every word load-bearing. This approach lives or dies on copy quality — there's nowhere to hide a weak sentence.

**Risks:** directly contradicts "take the space we need to explain it" in *feel*, even though it technically contains everything. Leadership asked for a longer flow; presenting this as the answer risks reading as not having heard them. Depth behind a disclosure is depth most users won't open, and "we put it in an accordion" is a weak response to "explain it well." Also lands both the framing and the decision on one screen, which is close to the overload leadership already flagged.

**Best if:** used as the **pare-back target**, not the first build. Build a long flow, learn which beats are load-bearing, then see whether Two Doors can hold them. This is the honest version of §8 in the brief.

---

### Approach 5 — "The Interview"

**Thesis:** ask enough to make a real recommendation, then explain the recommendation. Personalization does the compression work that disclosure does in Approach 4.

**Sequence (6 steps, 3 of them lightweight):**

1. **Where do you sell?** Markets.
2. **How much of your volume is international?** Rough bands — under 10%, 10–40%, most of it, not sure. This is the question that actually determines the scope answer, and no current version asks it.
3. **What are you set up for today?** Do they have tax registrations anywhere? A team handling disputes? Existing local entities? Three checkboxes that establish their real starting position.
4. **Here's what we'd recommend, and why.** A stated recommendation with visible reasoning: *"You sell mostly domestically with growing volume in the EU, and you're not registered for VAT anywhere. We'd suggest Managed Payments for your international volume only — 3.4% + 3.5% there, 2.9% on your domestic volume, which stays exactly as it is today."* Then the alternatives, priced, with why they'd be worse *for them*. Frames A and B both appear, but scoped to their situation.
5. **Choose** — the recommendation is pre-selected but visibly changeable, with both alternatives fully priced. **Decision (both whether and scope, resolved together because the recommendation already resolves both).**
6. **Confirm.**

**Disclosure:** answer-gated end to end. Someone who says they're already VAT-registered in the EU never reads the VAT explanation. This is the most efficient disclosure model and the most invisible.

**Carry-over:** the strongest *semantically* — every later screen is built from earlier answers, and the reasoning is shown. Users see their own words come back as a conclusion.

**Motion:** minimal and functional. Recommendation assembly (reasoning lines arriving as the recommendation resolves, ~400ms total), rate roll-up when they change the selection. Deliberately quiet — this approach's credibility comes from precision, and precision doesn't sparkle.

**Content voice:** advisory. First-person plural for the recommendation ("we'd suggest"), second person for their situation. The only approach where Stripe speaks as an advisor rather than a narrator.

**Risks:** **it partially re-merges the two decisions leadership asked us to split** — steps 4–5 resolve whether-and-scope together. Defensible (the recommendation makes it one question, not two) but it must be argued explicitly, not slipped in. Self-reported volume bands at onboarding are unreliable, and a recommendation built on bad input is worse than no recommendation. Three qualifying questions before any value is shown is a real drop-off risk. And a recommendation for the expensive option invites "of course you recommend that" — the reasoning has to be genuinely falsifiable, including cases where we recommend *against* SMP.

**Best if:** we can recommend self-managed convincingly when it's right. A recommendation engine that always says SMP is an upsell with extra steps, and users will read it that way immediately.

---

## Part IV — Comparison

| | 1. Ledger | 2. Follow the Payment | 3. Map | 4. Two Doors | 5. Interview |
|---|---|---|---|---|---|
| Steps | 7 | 6 (long) | 6 | 4 | 6 (light) |
| Teaches from zero baseline | Medium | **Strongest** | Medium | Weakest | Strong (selectively) |
| Pricing transparency | **Strongest** | Strong | Weakest | Strong | Strong |
| Splits the two decisions | Yes | Yes | Yes | Yes | **Partially — flag** |
| Carry-over strength | **Strongest** | Strong | Strong (spatial) | Weakest | Strong (semantic) |
| Escape-hatch parity | Good | Good | Weak | **Strongest** | Depends on honesty |
| Overload risk | Medium-high | Medium | Low | **High** | Low |
| Motion justified by meaning | Good | **Strongest** | Good | Low | Low |
| Reuses existing prototype work | Little | Little | **Most** | Some | Little |
| Feels premium | Weakest | Strong | **Strongest** | Medium | Strong |
| Answers the feedback as given | Strong | **Strongest** | Medium | **Weakest in feel** | Medium |

---

## Part V — Recommendation

**Build Approach 2 (Follow the Payment) as the long flow, with Frame C as the comparison spine and Approach 3's lit-map treatment borrowed for the scope step.**

Reasoning: leadership asked for a longer flow that teaches from zero, and Approach 2 is the only one where length is a feature rather than a tax — a story that takes six screens is a story, while a form that takes six screens is bureaucracy. It's also the approach whose motion carries meaning, which is how we keep the premium feel after retiring the confetti and the fee-badge shimmer. The map's coverage lighting is the single best explanation of the scope decision, and it doesn't need the whole Map approach to borrow.

**Then pare back toward Approach 4** once we know which of the ten story beats are load-bearing. That's the §8 pare-back with a concrete target instead of an aspiration.

**Also worth building: Approach 5's steps 1–3.** The volume-mix question is missing from every current version and it's the question that actually determines the right scope. Even if we don't adopt the Interview wholesale, that question belongs in the gate.

### What each approach would test

| Approach | The question it answers |
|---|---|
| Ledger | Does full cost-of-ownership transparency make the fee acceptable, or just visible? |
| Follow the Payment | Does concrete mechanism education produce informed opt-in from a zero baseline? |
| Map | Does spatial framing make the scope decision legible? |
| Two Doors | Is depth-on-demand a real substitute for sequenced explanation, or a dodge? |
| Interview | Will users trust a recommendation for an expensive product? |

### Open dependencies

Unchanged from the brief, plus two this exploration adds:

- **Scope pricing** — every approach's scope step needs real numbers for all-volume vs. cross-border-only. Still the hard blocker.
- **Auth-rate uplift range** — Approaches 2, 3, and 5 all make a revenue argument. Without a defensible range, Frame B has to be softened to mechanism-only, which weakens the fee justification.
- **Real per-market obligations** — Approaches 1, 2, and 3 name specific tax thresholds and dispute windows. These must be accurate, not illustrative.
- **Can we recommend against SMP?** Gates Approach 5 entirely.
