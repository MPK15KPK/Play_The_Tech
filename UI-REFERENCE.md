# UI-REFERENCE.md

Structure extracted from live competitor sites, August 2026. This is a
*shape* reference only — navigation, section order, URL patterns. Substance
and wording come from primary sources, never from these pages
(`GUARDRAILS.md` §2).

---

## SaaSFilter — saasfilter.com

**Stack: Astro v7.0.6.** Different from ours, but their page structure is
framework-independent and worth copying.

### Navigation (7 content types)

```
Comparisons | Best Tools | Reviews | Alternatives | Pricing | Guides | Categories | About
```

Note the split: `Comparisons` (head-to-head), `Best Tools` (roundups),
`Reviews` (single product), `Alternatives` (switching intent), `Pricing`
(cost intent), `Guides` (buyer education). Six distinct search intents,
each with its own URL namespace.

We launch with one of these — comparisons. Do not launch with six thinly
populated sections.

### URL patterns

```
/comparisons/{tool-a}-vs-{tool-b}
/best/best-{category}-for-{qualifier}
/reviews/{tool}-review
/alternatives/{tool}-alternatives
/guides/how-to-choose-{category}-software
/categories/{slug}
```

Ours is simpler:

```
/                        list of comparisons
/compare/{slug}          one comparison
```

### Homepage section order

1. Affiliate disclosure bar (above hero — worth noting, they put it high)
2. Hero: single sentence value prop + two CTAs
3. Popular Comparisons — 6 cards, each with a one-line "which wins for what"
4. Browse by Category — 20 categories, emoji + name + one-line description
5. Best Tools by Category — 6 cards, each labelled "N tools compared"
6. Featured Reviews — 6 cards
7. Buying Guides — 4 cards
8. Split CTA: Alternatives / Pricing Breakdowns
9. "Why SaaSFilter?" — 3 trust pillars (Data-Driven, Always Current, No Fluff)
10. Footer with full nav repeated + legal

### Comparison page section order (Format B reference)

This is the most useful artefact here. Their order:

```
1. Breadcrumb: Home › Comparisons › {A} vs {B}
2. H1: "{A} vs {B}"
3. "Last updated: YYYY-MM-DD"          ← immediately under H1, high visibility
4. Intro paragraph — positions both tools in 3–4 sentences
5. H2 "Feature Comparison" → the table
6. H2 "{A} Pros & Cons"  → H4 Pros (6 bullets), H4 Cons (5 bullets)
7. H2 "{B} Pros & Cons"  → same shape
8. H3 "Final Verdict"    → 2 sentences + bolded "Our pick:"
9. H2 "Frequently Asked Questions" → 3 Q&A, each a bolded question
10. "Ready to try?" → outbound CTAs to both vendors
11. "Related Content" → 9 links: both reviews, the parent roundup,
    both alternatives pages, 4 sibling comparisons
```

Section 11 is the internal linking engine. Nine contextual links from every
comparison page, all to sibling content. Copy this pattern.

### Their table structure

Row order observed (Semrush vs Ahrefs):

```
Price from        ← commercial rows first
Free trial
Best for          ← positioning row, third
Free plan
Starting price
{capability rows follow}
API access
Support           ← support/service rows last
```

Column headers carry a badge (`popular`, `best`) above the tool name.
That badge is the winner-highlight mechanism at column level; we add
per-row highlighting on top, which they do not have. **That is our
differentiator on the component itself.**

---

## AI Building Tools — aibuildingtools.com

The closest existing execution of our model: one vertical, AI tools,
directory + comparisons + guides.

### Navigation (5 items — much leaner)

```
Tools | Compare | Best AI For | Blog | Tool Finder
```

`Best AI For` is a smart URL namespace — role-based rather than
category-based (`architects`, `contractors`, `estimators`). Our industry
equivalent would be role-within-industry: `distributors`, `estimators`,
`plant managers`.

### URL patterns

```
/tools
/tools/{tool-slug}
/tools/category/{category-slug}
/compare
/best-ai-for
/blog/{article-slug}
/tool-finder                    ← interactive quiz
/tools/material-estimator       ← free calculator, lead magnet
/tools/submit
```

### Homepage section order

1. Sponsored partner block + commission disclosure
2. Hero: "Compare 100+ AI Construction Tools" + 2 CTAs
3. Trust strip: `50,000+ users` / `4.9/5` / `Free to use`
4. "Why Construction Teams Use AI Tools in 2026" — SEO prose block, heavily
   internally linked (5 inline links in 3 paragraphs)
5. "What You Can Do Here" — 6 bullets, every one a link
6. Browse by Category — 8 category cards
7. Popular Guides — 6 numbered cards (`1`–`6`)
8. Stats strip: `100+` / `50K+` / `95%` / `24/7`
9. Featured Tools — 3 tool cards with long descriptions
10. FAQ — 8 questions, several with inline links into blog content
11. Latest Guides — 3 recent article cards with tag chips
12. Newsletter block (`10,000+ subscribers`)
13. Closing CTA

### What to take

- The SEO prose block (§4) with dense internal linking — this is how they
  distribute authority to deep pages from the homepage
- 8-question FAQ on the homepage with links into articles
- Tag chips on article cards (`AI Tools`, `Contractors`)
- Role-based namespace alongside category-based

### What to skip

- Unverifiable trust metrics (`95% satisfaction`, `4.9/5` with no source).
  GUARDRAILS R2 applies to our own claims too.
- Sponsored block above the fold, above the hero
- `Submit a Tool` — that is a directory feature, out of scope (R7.2)

---

## compare-saas.com

Positioning to note, not structure. They lead with methodology: a consistent
evaluation framework applied across categories, explicitly contrasted against
generic "top 10" listicles. Their stated criteria include pricing and
licensing structure and security/compliance readiness.

**Takeaway:** publish the criteria set as its own page. A visible, stable
methodology is the credibility mechanism that survives having an owner with
a competing product. This matters more for us than for them.

---

## SoftwareInspect — softwareinspect.com

Early-stage peer, only CRM and email marketing so far. Their page contract:
every page states who the tool works best for *and who should skip it*.

**Takeaway:** "who should skip this" is the highest-trust sentence in a
comparison article and almost nobody writes it. Make it a required field in
every tool mini-verdict.

---

## Synthesis — what our pages must have

Combining all four:

| Element | Source | Priority |
|---|---|---|
| `Last updated` directly under H1 | SaaSFilter | Must |
| Verdict-first, "choose A if / choose B if" | SaaSFilter | Must |
| 9-link related-content block | SaaSFilter | Must |
| Commercial rows first in table | SaaSFilter | Must |
| Per-row winner highlight | Ours | Must — differentiator |
| Industry segment in URL | Ours | Must — differentiator |
| Published criteria/methodology page | compare-saas | Must |
| "Who should skip this" per tool | SoftwareInspect | Must |
| Dense internal linking from hub prose | aibuildingtools | Should |
| Role-based namespace | aibuildingtools | Should |
| Homepage FAQ with inline links | aibuildingtools | Should |
| Free calculator lead magnet | aibuildingtools | Later (CONTEXT Q3) |
| Unverifiable trust stats | — | Never |
| Sponsored block above hero | — | Never |

---

## Note on visual reference

No screenshots are included in this pack — these were extracted structurally
rather than visually. If you want pixel-level visual reference, capture it
yourself: open each site, use browser DevTools device toolbar for the mobile
view, and full-page screenshot. The pages worth capturing:

```
saasfilter.com/comparisons/semrush-vs-ahrefs     ← table + section order
saasfilter.com/best/best-crm-for-small-business  ← roundup layout
aibuildingtools.com                              ← hub page density
aibuildingtools.com/compare                      ← their table treatment
top10erp.org/erp-software-comparison             ← filterable matrix
```

Capture both desktop (1440px) and mobile (390px) for each. The mobile table
treatment is the one thing genuinely worth studying visually, since that is
the hardest part of the component to get right.
