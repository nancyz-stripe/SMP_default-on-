# SMP Onboarding — Design Treatments

Companion to `SMP_ONBOARDING_NARRATIVE.md`. That doc sets the brief; this one explores how to build it.

**Sequencing is settled.** This doc no longer proposes alternative flows — it explores design and content treatments for the agreed sequence, and how the narrative carries across it.

---

## The agreed sequence

1. **Get started**
2. **Recurring or non-recurring payments**
3. **"Next, tell us what you sell."** — types of goods. *AI services gets added to the digital goods description.*
4. **"Great, you sell digital goods. Do you expect to have international payments?"** — the qualifying gate.
5. **"Since you plan to have international payments, we recommend Managed Payments."** — the recommendation, plus a side-by-side of SMP vs. not-SMP with pricing on both. Not-SMP is labelled **"Manage myself."**
6. **"Great, you want to use Managed Payments. It can also take on all your domestic complexity. Want to extend it across all your payments?"** — the scope decision.

How this maps to the leadership feedback:

| Feedback | Where it lands |
|---|---|
| Ask about international relevance before presenting SMP | Step 4 |
| Compare SMP vs. not-SMP, including pricing of each | Step 5 |
| SMP for everything vs. cross-border only, including pricing | Step 6 |
| Don't pack #2 and #3 into one step | Steps 5 and 6 are separate |

Two notes on the sequence as written:

- **Step 5's "you can choose it for a subset of your volume" should stay reassurance, not a control.** If a scope picker appears on step 5, the two decisions re-merge and we've undone the split. Say it as a promise ("you don't have to apply it to everything") and let step 6 be where they act on it.
- **Step 6 is framed as an extension, which presumes step 5 said yes.** That's correct — but it means the "Manage myself" branch exits the SMP narrative at step 5 and needs its own destination. See §5.

### The copy as given, with flags

The direction in the source copy is right. Three specific tensions worth resolving before it ships:

- **"The easy button"** is punchy but sits badly next to the transparency and education principles. It's the language of not-explaining, on the one screen where we've committed to explaining. It also reads as marketing at exactly the moment we're asking for money. Alternatives in §4.
- **"0 tax liability"** is a strong absolute. The accurate version is mechanical: Stripe becomes the merchant of record, so the tax liability is Stripe's. Say the mechanism and the outcome follows — and it's more credible.
- **"for 3.5%"** needs its "on top of standard processing fees" adjacent, not in a tooltip only. A bare 3.5% next to a list of benefits reads as the total price, and users who discover otherwise later will feel misled.
- **"Manage myself" is resonating — lock it.** It's neutral, active, and dignified. It's also the single best asset the escape-hatch principle has.

---

## Part I — Shared building blocks

### 1. Progressive disclosure patterns

The brief says "don't simplify at the expense of clarity" and "take the space we need." Those pull against overload. Disclosure is how we hold both: everything is available, not everything is loud. This matters most on step 5, which carries the heaviest load in the flow.

| Pattern | Mechanic | Best for | Failure mode |
|---|---|---|---|
| **Term-level inline glossary** | Dotted-underline terms (MOR, local acquiring, tax liability) expand to 1–2 sentences in place; the row grows, nothing navigates away | The zero-baseline requirement, without bloating primary copy | Users never click. Mitigate: expand the single most important term (MOR) by default |
| **Layered detail (summary → detail)** | Each claim has a headline, an expandable "how this works," and — only outside the flow — a docs link | Pricing and revenue claims that need to survive scrutiny | Three layers is one too many for a decision screen; cap at two in-flow |
| **Sequential reveal within a step** | Content enters in beats as the user scrolls or advances a sub-step; the step is long but never dense | Step 5's problem framing | Feels like a gate on impatient users. Always allow scroll-ahead |
| **Comparison scaffolding** | The comparison table builds row by row rather than appearing complete | Step 5 | Animating a table users want to read now is antagonistic. Build fast (≤600ms total) or not at all |
| **Deferred detail** | Some detail moves *out* of onboarding to a post-setup surface, with a promise | Per-market configuration, à la carte setup on the Manage-myself branch | Becomes a dumping ground. Only defer what isn't decision-relevant |
| **Answer-gated content** | Step content adapts to steps 2–4's answers; users only see what applies | Keeping step 5 from becoming a wall | Users can't see what they're missing, which can read as hiding |

**Overload budget per screen** — a working constraint, and the discipline that keeps step 5 buildable:

- One decision per screen. Never two.
- At most one number the user must compare, plus its counterpart.
- At most three claims per column. Four reads as a feature list and stops being an argument.
- Body copy under ~90 words before an expandable.
- If a screen needs a scrollbar to show its primary action, it's two screens.

### 2. Carry-over patterns

Carry-over is what makes the flow feel like one conversation rather than six forms. The sequence already has a strong instinct for it — steps 4, 5, and 6 each open by restating the previous answer ("Great, you sell digital goods…", "Since you plan to have international payments…", "Great, you want to use Managed Payments…"). The treatments below extend that from copy into structure.

| Pattern | What it does | Where |
|---|---|---|
| **Answer echo** | Already in the copy. Each step names the prior answer before asking the next thing | Steps 4, 5, 6 |
| **Named-market substitution** | Generic copy becomes specific: "Selling into Germany means VAT registration once you cross €10,000." Requires step 4 to collect markets, not just yes/no | Step 5 |
| **Goods-type substitution** | "AI services sold into the EU" is more compelling than "digital goods sold internationally." Step 3's answer is a live asset | Steps 5, 6 |
| **Persistent rate readout** | A thin, always-visible line showing the current effective rate as choices are made | Steps 5, 6 |
| **Accumulating obligation list** | Obligations named on step 5 persist into step 6 and the confirmation, marked "Stripe handles this" or "you handle this" | Steps 5 → 6 → confirm |
| **Decision breadcrumb** | Step 6 restates the step 5 choice with an inline "change" affordance | Step 6 |

The strongest single carry-over move available: **make step 4's answer visibly do work on step 5.** If step 4 collects markets and those markets drive the obligations and the rate math on step 5, the flow earns credibility. If step 4 is a yes/no that only routes, it will feel like a toll gate.

### 3. Motion catalog

The existing prototype has real motion investment: a rotating globe, a particle burst, a keyline sweep on the fee badge, gradient settle (`fee-gradient-settle`, `fee-receive`). Some of it survives a transparency-first rewrite; some of it shouldn't.

**Motion that earns its place:**

| Move | Purpose | Spec sketch |
|---|---|---|
| **Globe as state, not decoration** | Lit regions reflect the user's actual markets, and change when scope changes | Step 6: international-only lights foreign markets, home dim; all-payments lights everything. 400ms crossfade on the lit set |
| **Obligation transfer** | Items move from a "you" column to a "Stripe" column when SMP is selected | Staggered 60ms, 240ms each, ease-out. The literal visualization of what they're buying |
| **Rate roll-up** | The effective rate counts up/down when the choice changes | 300ms numeric tween. Never animate the price's *appearance* — it's there from the start |
| **Coverage fill** | A volume bar fills to show what share of payments SMP covers | 400ms, tied to the step 6 toggle |
| **Comparison line-draw** | Rows arrive in sequence on first view only | ≤600ms total, skipped on revisit |

**Motion to retire or demote:**

- **The confetti burst.** Celebration on selecting a +3.5% product reads as *we won*. It rewards the outcome we want rather than the decision the user made, which is exactly the coercion the escape-hatch principle rules out. If we keep a success moment, fire it on completing onboarding — identically on both branches.
- **The keyline sweep / gradient settle on the fee badge.** Beautifying the price is a tell. A premium price stated plainly is more confident than a price with a shimmer on it.
- **Gradient fill on "more revenue."** Same issue: decoration on the upside with no matching weight on the cost. Asymmetric styling is a transparency leak.

**Rules of engagement:**

- Motion may *explain* (state, transfer, coverage) but may not *persuade* (celebration, sparkle on prices).
- Anything applied to a benefit needs an equal-weight counterpart on a cost, or neither gets it.
- Both branches get the same motion vocabulary. Manage-myself is not the grey option.
- Everything respects `prefers-reduced-motion`, with a static end state reachable instantly.

---

## Part II — Treatments for step 3: "Tell us what you sell"

Low-stakes screen, but it's where the SMP narrative's raw material gets collected, so the treatment matters more than it looks.

**The AI services change.** Three ways to land it:

| Treatment | Mechanic | Trade-off |
|---|---|---|
| **3A — In the description** | "Digital goods — software, subscriptions, media, AI services" | Cheapest, matches the given direction, invisible to anyone skimming titles |
| **3B — Named sub-option** | Digital goods expands to reveal checkboxes, AI services among them | Best carry-over: "AI services" can be named specifically on step 5, and AI businesses are disproportionately international from day one — which pre-loads step 4 |
| **3C — Example chips** | Tappable examples below the option; selecting one selects the parent | Reads as help rather than a question. Good middle ground if 3B is too much structure |

**Recommendation: 3B**, specifically because of what it buys downstream. If step 3 knows they sell AI services, step 4's question can be framed as a near-certainty rather than an open question, and step 5 can say "AI services" out loud.

---

## Part III — Treatments for step 4: the international question

This is the gate leadership asked for. It has one job — establish relevance — and one opportunity: collect enough to make step 5 specific.

| Treatment | Mechanic | Copy sketch | Trade-off |
|---|---|---|---|
| **4A — Binary** | Yes / No | "Do you expect to have international payments?" | Fastest. Gives step 5 nothing to work with beyond routing |
| **4B — Binary + markets** | Yes reveals a market picker (regions, not 200 countries) | "Yes — mainly in…" | **Unlocks named-market substitution on step 5.** One extra interaction for a large narrative gain |
| **4C — Three-way** | Yes / Not yet, but planning to / No | Adds the planning case, which is most of self-serve signup | Honest about intent, and "not yet" is a real state we currently force into a wrong answer |
| **4D — Inferred + confirm** | We assert, they correct | "Businesses selling AI services usually see demand from outside their home country. We'll assume that's you." | Fewest questions, and demonstrates we're paying attention. Risks presuming, and a wrong assumption feeds a wrong recommendation |

**Recommendation: 4B + 4C combined** — Yes / Not yet / No, with region selection on the first two. It's one screen, it captures the planning case, and it's the difference between step 5 saying "internationally" and step 5 saying "into the EU and Japan."

**Worth testing separately:** whether to ask the volume-mix question here ("roughly how much of your volume will be international?"). It's the question that actually determines whether step 6's answer should be yes, and nothing in the flow asks it today. Cost is one more screen before any value is shown.

---

## Part IV — Treatments for step 5: recommendation + comparison

The heaviest screen in the flow. It has to deliver a recommendation, teach what SMP is from a zero baseline, present a fair two-sided comparison, show two prices, and take a decision. Six treatments, roughly ordered from most explanatory to most compressed.

### 5A — Responsibility ledger

Two columns, **Manage myself** and **Managed Payments**, with rows for each responsibility: tax registration and filing, local processing, disputes, fraud, payment support. Every row says who does it. Price sits at the top of each column.

- **Why it works:** it's the most legible statement of the actual trade, and it makes the escape hatch dignified — "you do it" is a real answer rather than a failure. Rows are also the natural home for obligation-transfer motion.
- **Copy spine:** Frame C (§6). "Two ways to do this. The difference is who does the work."
- **Risk:** five rows plus two prices is close to the overload ceiling. Cap the rows at five and put detail behind row-level expansion.
- **Motion:** obligation transfer on selection.

### 5B — Cost stack

A visual comparison of total cost, not just fee cost. Manage-myself stacks processing fees + the à la carte products needed to discharge the obligations (tax, fraud tooling, dispute handling) + a named-but-unpriced block for the work. SMP stacks processing fees + 3.5%.

- **Why it works:** it's the only treatment that makes a premium price look like arithmetic rather than a surcharge, and it satisfies "including pricing of each option" more literally than a two-price comparison does.
- **Risk:** the most manipulable treatment in the set. If we choose which à la carte products to stack, we're choosing the answer. Only defensible if the stack is derived from the obligations *they* actually have, and if the unpriced labor block stays visibly unpriced rather than being assigned a convenient number.
- **Motion:** segments build bottom-up, both sides simultaneously.

### 5C — Advisory card + equal alternative

Leads with the recommendation and its reasoning, as the source copy does. SMP is the recommended card with a visible "why we're recommending this, based on what you told us" line. Manage myself sits beside it at equal weight — same size, same price prominence, same claim count — just without the recommended tag.

- **Why it works:** closest to the copy as written. The reasoning line is the transparency mechanism: a recommendation with visible logic is arguable, and arguable is trustworthy.
- **Risk:** "recommended" plus a 3.5% fee invites "of course you recommend that." The reasoning must be genuinely falsifiable, which means we need cases where we recommend Manage myself — and if we can't produce those, this treatment is an upsell with a badge on it.
- **Motion:** reasoning lines assemble as the recommendation resolves (~400ms).

### 5D — Diff view: what changes for you

Left column is today (self-managed, standard pricing, obligations on them). Right column is with SMP. Changed rows are marked. Nothing else moves.

- **Why it works:** answers the question users actually have — "what's different if I say yes?" — and it makes "nothing changes about your product, prices, or customer relationship" a *visible* row rather than a reassurance we hope lands.
- **Risk:** frames SMP as a modification to a status quo the user doesn't have yet. They're new; there is no "today." Stronger for existing users than at signup.
- **Motion:** changed rows highlight in sequence on first view.

### 5E — Progressive two-panel

Two panels, symmetrical, each with a headline, a price, and three claims. Each expands into as much depth as anyone wants: full obligation list, the MOR explanation, pricing detail, the à la carte inventory on the Manage-myself side.

- **Why it works:** lowest overload, and everything the long version would say is present. Best treatment for the expert who already knows all this.
- **Risk:** depth behind a disclosure is depth most users won't open. "We put it in an accordion" is a weak answer to "explain it well," and leadership explicitly asked us to take the space.
- **Motion:** panel height expansion, 240ms. Nothing else.

### 5F — Sub-stepped step 5

Step 5 becomes three beats inside one step, with the same progress position: (i) here's what selling into your markets involves, (ii) here's what Managed Payments does about it, including what an MOR is, (iii) here are your two options, priced. Decision only on the third beat.

- **Why it works:** the most direct reading of "take the space we need to explain it." It's the only treatment that fully separates teaching from deciding, which is the actual overload problem — not the number of options, but that we're teaching and asking simultaneously.
- **Risk:** functionally three screens wearing one step's clothing. If we believe that, we should say so and count them honestly rather than hiding the length in a progress bar.
- **Motion:** sequential reveal across beats; comparison line-draw on beat iii.

### Step 5 treatment comparison

| | 5A Ledger | 5B Cost stack | 5C Advisory | 5D Diff | 5E Two-panel | 5F Sub-stepped |
|---|---|---|---|---|---|---|
| Teaches from zero baseline | Medium | Low | Medium | Medium | Low | **Strongest** |
| Pricing transparency | Strong | **Strongest** | Strong | Medium | Strong | Strong |
| Escape-hatch parity | **Strongest** | Medium | Good | Good | **Strongest** | Good |
| Overload risk | Medium-high | Medium | Medium | Medium | **Lowest** | Low per beat |
| Matches the given copy | Medium | Low | **Highest** | Low | Medium | Medium |
| Manipulation risk | Low | **Highest** | Medium-high | Low | Low | Low |
| Reuses existing components | Strong | Little | **Strongest** | Medium | Strong | Medium |

---

## Part V — Treatments for step 6: extend to all payments

Lower stakes than step 5 — they've already said yes — but it's where the pricing transparency commitment gets tested, because this is where a second fee applies to volume that didn't need it.

| Treatment | Mechanic | Trade-off |
|---|---|---|
| **6A — Checkbox upgrade** | The existing V3.1 pattern: international coverage is the given, a checkbox extends to domestic, the rate badge updates | Already built. But the current version pairs it with a "Save 30%" badge and a confetti burst, which turns a pricing decision into a reward moment. Keep the mechanic, drop the celebration |
| **6B — Two explicit cards** | "International payments only" vs. "All my payments," each priced | Most symmetrical and most honest. Loses the momentum of an extension framing, which is what the given copy leans on |
| **6C — Coverage meter** | A volume bar showing covered vs. uncovered share, with the effective blended rate reading out live | The best explanation of what the choice actually means, and the only one that makes the domestic decision feel proportionate to how much domestic volume they have. Needs the volume-mix answer to be real, not assumed |
| **6D — Defer it** | Accept international now; offer domestic extension post-onboarding, once they have volume to look at | Lightest onboarding, and arguably the most honest — they have no data yet on which to make this call. But it drops a decision leadership explicitly asked to be in the flow |

**Recommendation: 6C, with 6A's extension framing.** Keep the copy's "it can also take on all your domestic complexity" energy, but let the control be a coverage meter with a live blended rate rather than a checkbox with a discount badge. The user sees exactly what share of their payments they're buying coverage for and what it costs them all-in.

**On the "Save 30%" incentive:** if it's a real, time-bound offer, state it as one with its terms. If it's promotional framing on a rate we'd give anyway, it undercuts the transparency principle on the exact screen where transparency is hardest. This needs a decision, not a design.

---

## Part VI — Voice options for step 5

Four ways to say the same true things. Cheapest thing to test, and swappable into any treatment above.

### Frame A — Liability-forward: "what you'd be taking on"

> **Selling internationally makes you responsible for a lot more than payments.**
>
> The moment you take money from a customer in another country, you take on that country's rules. Tax registration and filing where you cross local thresholds. A legal basis to process payments locally. Disputes under local consumer protection law. Refunds, fraud, and support in the customer's language and timezone.
>
> You can take all of that on. Plenty of businesses do. It's worth knowing what it is before you decide.

Best as step 5's framing beat. Establishes stakes without a single claim about Stripe. Guardrail: every obligation named must be real and specific to their markets — generic doom is both less persuasive and less honest.

### Frame B — Revenue-forward: "what it's costing you not to"

> **Cards issued in Germany get approved more often when the payment is processed in Germany.**
>
> When a payment crosses a border, the customer's bank sees a foreign transaction and declines more of them. Processing locally in each market removes that signal. Offering the payment methods people there actually use removes another barrier.

The honest answer to "why is this 3.5%?" Guardrail: any comparative claim ("worth more than the fee costs") needs a supportable range. Without one, explain the mechanism and drop the comparison — a vague revenue promise is worse than none.

### Frame C — Labor-forward: "who does the work"

> **Two ways to sell internationally. The difference is who does the work.**
>
> **Manage myself.** You register for tax where you owe it and file on time. You set up local processing. You answer disputes, review fraud, handle refunds and support across timezones.
>
> **Managed Payments.** Stripe becomes the merchant of record — the business the customer legally buys from. Stripe owns tax, disputes, fraud, and payment support. You own your product, your prices, and your customer relationship.

The best comparison spine, and it's already half-written by the "Manage myself" label. Guardrail: must be explicit about what the merchant keeps, or handing over the MOR role sounds like handing over the business.

### Frame D — Definitional: "here's the mechanism"

> **What "merchant of record" means**
>
> The merchant of record is the business the customer legally buys from. It's whose name is on the statement, who owes tax on the sale, who the bank comes to in a dispute.
>
> Today that's you, in every country you sell to. With Managed Payments, Stripe becomes the merchant of record, and takes on the tax, the disputes, and the local processing that come with it. You keep your product, your pricing, your brand, and your customer relationship.

The most aligned with "assume zero baseline" and "clarity over vagueness," and the accurate replacement for "0 tax liability." Weakest motivator alone — pair with A or B.

### Notes

- **A → D → C** is the strongest ordering inside step 5: stakes, then mechanism, then the priced choice.
- Tone: declarative, second person, short sentences. Numbers as numbers. No "seamless," "effortless," "just," or "simply" — and reconsider "easy button" on those grounds.
- Drop "upgrade" as a label. It presumes the answer and makes Manage myself a downgrade.

---

## Part VII — Bundles to prototype

Treatments compose. Four bundles worth building as distinct variants:

| Bundle | Step 3 | Step 4 | Step 5 | Step 6 |
|---|---|---|---|---|
| **1. Ledger** | 3B named sub-option | 4B+4C markets | 5A responsibility ledger | 6B two cards |
| **2. Advisory** | 3A description | 4A binary | 5C advisory + equal alternative | 6A checkbox, celebration removed |
| **3. Taught** | 3B | 4B+4C | 5F sub-stepped | 6C coverage meter |
| **4. Compressed** | 3A | 4A | 5E progressive two-panel | 6A |

Bundle 2 is closest to the copy as given — build it as the control. Bundle 3 is the fullest expression of "take the space." Bundle 4 is the pare-back target, useful for finding the floor.

### Recommendation

**Build Bundle 3 (Taught) as the primary, with 5A's responsibility ledger as the comparison on its final beat.** It's the only combination that separates teaching from deciding, which is the real overload problem on step 5 — and step 6's coverage meter is the clearest explanation of the scope choice we have. Build Bundle 2 alongside it as the control, since it's what the copy currently describes.

### What each bundle tests

| Bundle | The question it answers |
|---|---|
| Ledger | Does a fair, symmetrical comparison make the fee acceptable, or just visible? |
| Advisory | Will users trust a recommendation for an expensive product? |
| Taught | Does separating teaching from deciding produce informed opt-in from a zero baseline? |
| Compressed | Is depth-on-demand a real substitute for explanation, or a dodge? |

---

## Open dependencies

- **Step 6 pricing** — every treatment needs real numbers for all-payments vs. international-only. Still the hard blocker.
- **Auth-rate uplift range** — Frame B and treatment 5B both make a revenue argument. Without a defensible range, Frame B softens to mechanism-only and the fee justification weakens.
- **Real per-market obligations** — named-market substitution requires accurate tax thresholds and dispute windows, not illustrative ones.
- **Can we recommend Manage myself?** — gates treatment 5C's credibility entirely.
- **Is "Save 30%" a real offer?** — gates step 6's treatment.
- **À la carte inventory** — treatments 5B and 5E, and the Manage-myself confirmation, all need the actual list of products that cover the obligations.
