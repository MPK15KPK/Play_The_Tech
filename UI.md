# UI.md

**Locked design tokens. Not suggestions.** Derive every colour, type, and
spacing decision from this file. If a choice isn't here, ask before
inventing one — inventing is exactly how the generic defaults creep back in.

Companion to `UI-REFERENCE.md`, which covers competitor *structure*. This
file covers our *appearance*, and what must never appear.

---

## Why this file exists

Two separate failure modes. Both matter; the second matters more.

**1. Looking AI-generated.** LLMs are pattern matchers that default to the
safest average of their training data, which is why AI-built sites share a
recognisable fingerprint. Readers spot it in seconds. For a comparison site
this is not a taste problem — the entire product is being believed, and a
page that looks mass-produced undermines every sourced figure on it. A
generic-looking site also competes on content alone, having thrown away
every other signal.

**2. Being classified as scaled content abuse.** This is the one that ends
the project, and it is a content risk wearing a design costume. See §8.

---

## 1 · The direction: trade catalog

Named, locked, and grounded in the subject rather than in web-design fashion.

Our reader is an operations manager at a lumber distributor or a machinery
dealer. They are not a startup founder and they do not read SaaS landing
pages. The artifacts of their working life are printed price lists, spec
sheets, parts catalogs, and product data sheets. The most trusted reference
site in their world is McMaster-Carr — dense, fast, utterly unfashionable,
and believed without question.

**That is the lineage. Not SaaS marketing, not editorial magazine, not
developer-tool dark mode.** A spec sheet, rendered for the web.

This direction is chosen partly because it is genuinely right for the
audience and partly because it sits nowhere near any of the AI defaults
listed in §3. Both reasons are real.

### What the direction commits us to

| Principle | Consequence |
|---|---|
| Data before decoration | The table is the page. Everything else is annotation. |
| Density is respect | Trade buyers scan. Do not pad rows to make the page feel calm. |
| Rules carry meaning | Line weight encodes hierarchy, not style. |
| Every figure is sourced | Superscript references, visible, like a real spec sheet. |
| Nothing moves without reason | Motion is state feedback only. |

---

## 2 · Tokens

Locked. Do not add values; do not substitute "close enough."

### Colour

```css
--paper:        #FFFFFF;  /* page surface — white, not cream */
--paper-sunk:   #F5F6F7;  /* table zebra, inset blocks — cool, not warm */
--ink:          #14181B;  /* body text */
--ink-muted:    #5A6570;  /* captions, metadata, secondary cells */
--rule:         #D5D9DD;  /* hairline separators */
--rule-strong:  #14181B;  /* section boundaries, table header underline */
--mark:         #A85B00;  /* winner highlight, verification stamp */
--mark-wash:    #FBF3E7;  /* winning-cell background */
--flag:         #8A2B18;  /* staleness warnings, "not published" */
--link:         #1A4C7A;  /* links — deep, functional, never bright */
```

Eleven values. That is the whole palette.

`--mark` is burnt ochre: a highlighter pass on a printed spec sheet. It is
deliberately not terracotta (#D97757 and its neighbours are an AI-interface
tell), not purple, not cyan, not neon.

**No gradients anywhere.** Not in the hero, not on buttons, not behind
anything, not in text. If a gradient appears in a diff, it is a bug.

### Type

One superfamily, three roles. Self-hosted WOFF2, subset, preloaded.

```css
--font-display: "IBM Plex Sans Condensed", sans-serif;  /* 600, 700 */
--font-body:    "IBM Plex Sans", sans-serif;            /* 400, 500 */
--font-data:    "IBM Plex Mono", monospace;             /* 400, 500 */
```

**Inter is forbidden.** It is a fine typeface and it is the default in
nearly every AI design tool and component library. Inter plus a system
fallback and no other typographic decision is the single clearest signal
that a design was never intentionally styled.

Plex earns its place on lineage — it was drawn for a technical,
industrial context — and Plex Mono carries every price, date, and figure in
a table. Condensed display faces are what catalog section headers have
always used.

```css
--step--1: 0.8125rem;   /* captions, table metadata */
--step-0:  1rem;        /* body */
--step-1:  1.1875rem;   /* lead paragraph */
--step-2:  1.5rem;      /* H3 */
--step-3:  2rem;        /* H2 */
--step-4:  2.75rem;     /* H1 */
```

A 1.22 ratio — tight, catalog-like. Not the 1.5 "everything is huge" scale
that AI layouts default to.

**All numerals in tables use `font-variant-numeric: tabular-nums`.** Prices
that don't align in columns is the single most amateur thing a comparison
table can do.

### Space, rule, radius

```css
--space-1: 4px;  --space-2: 8px;   --space-3: 12px;
--space-4: 20px; --space-5: 32px;  --space-6: 52px;
```

Not a uniform 8px multiple. Uniform padding on every element is a listed AI
tell; a slightly irregular scale reads as considered because it is.

```css
--rule-hair:   1px;   /* row separators */
--rule-mid:    2px;   /* subsection boundaries */
--rule-heavy:  3px;   /* under table headers, above footers */

--radius: 2px;   /* the only radius on the site */
```

One radius value, and it is 2px. Not 0 — hairline-rules-and-zero-radius is
itself a recognisable generated look. Not 8px or 12px — that is the
component-library default. 2px is a deliberate, visible choice: the corner
of a printed card.

### Motion

```css
--ease: cubic-bezier(0.2, 0, 0.1, 1);
--dur:  120ms;
```

**Permitted:** hover state on links and rows, focus ring, sticky header
shadow appearing on scroll, `<details>` open/close.

**Forbidden:** scroll-triggered reveals, staggered fade-ins, page
transitions, parallax, counters that count up, anything ambient. The same
fade-in on every element is a listed tell, and on a reference site it
actively obstructs the reader who is scanning for a number.

`prefers-reduced-motion` disables even the permitted set.

---

## 3 · The forbidden list

Every item below is a documented AI-generated-design tell. None may appear.

### Colour and surface
- Purple-to-blue or violet gradients, anywhere — the most recognisable tell there is
- Purple or violet gradient orbs or blobs behind a hero
- Dark mode as the default reflex, especially neon-on-dark with glowing card borders
- Coloured `box-shadow` glows
- Glassmorphism / frosted-glass panels
- Gradient text on headings or figures — it also destroys scannability
- Warm cream page background (#F4F1EA and neighbours) with a serif display and clay accent — the "tasteful default" reflex
- Grey text on a coloured background

### Layout
- Hero → three feature cards with icons → testimonials → pricing → footer. This exact sequence is the AI-built site.
- A thin coloured accent bar down the left edge of a container
- One large rounded icon centred above a heading
- Uniform padding and identical border-radius on every element
- Card-based layout applied to content that is not a set of peers
- Centred everything

### Type
- Inter, or Inter with a system fallback and no other typographic decision
- Emoji as iconography
- Vague aspirational headlines — "Build the future", "Empower your workflow", "Unlock insights"

### Imagery
- Stock photography of any kind, especially a diverse team at a laptop
- AI-generated illustration — the too-smooth plastic look, glassy eyes, impossible hands
- Abstract 3D blobs, floating geometry, looping Lottie ambience
- Icon sets used decoratively rather than functionally
- **Using no images at all and filling the gap with gradients and shapes.** This is the other half of the same failure: avoiding the work of sourcing and placing real imagery.

### Interaction
- Hover states that do nothing
- Buttons that snap instead of easing
- A "Get Started" CTA that links nowhere or loops to the same page

### Fabricated social proof
- Testimonials with generic attributions — "Verified User", "Product Lead"
- Stock avatar placeholders
- Trust metrics we cannot substantiate: "4.9/5", "95% satisfaction", "50,000+ users". `UI-REFERENCE.md` flags a competitor doing exactly this. GUARDRAILS R2 applies to our own claims as much as to vendor claims.

**The general rule:** it is never one big mistake. It is a stack of small
decisions made by reflex instead of on purpose. Every token above exists so
the reflex has nothing to reach for.

---

## 4 · The signature element

Spend boldness in one place. Ours is the comparison table, which is correct
because it is also the product.

**The table should read as a spec sheet, not a web component.** Concretely,
five things nothing in `UI-REFERENCE.md` does:

1. **Superscript source references** on every sourced cell — `$499/mo`⁴ —
   resolving to a numbered source list beneath the table. Real spec sheets
   cite. This makes our sourcing *visible* rather than merely claimed, and
   it is the design expression of GUARDRAILS R2.

2. **A verification stamp block** at the table foot: verified date, method
   (`hands-on` / `documentation`), criteria set version. Set in
   `--font-data`, ruled off with `--rule-heavy`, styled like a QA stamp on a
   datasheet. This is the last-updated and answer-first rule made visual.

3. **Typographic winner marks, not colour alone.** The winning cell gets
   `--mark-wash` *and* a `▸` glyph in `--mark` *and* a visually-hidden
   "best in row" label. A highlight carried only by background colour is
   invisible to a screen reader and to a text-extracting model — which
   defeats the entire point of building per-row highlighting.

4. **Rule weights that encode meaning.** `--rule-heavy` under the header
   row, `--rule-mid` between commercial rows and capability rows,
   `--rule-hair` between rows. The reader learns the structure without being
   told.

5. **"Not published" set in `--flag`, never blank, never an em-dash.**
   Absence of data is information, and showing it plainly is a trust signal.

Everything else on the site stays quiet so this reads loudly.

---

## 5 · Page furniture

**Header.** Wordmark left, industry hubs inline, no dropdown. Real
`<a href>` elements, server-rendered. No sticky mega-menu.

**Hero — articles have none.** H1, the last-updated line, byline, then the
lead paragraph, then the table. The reader arrived from a specific query;
they want the answer, and 44% of citations come from the first 30% of the
page. A hero is a delay.

**Homepage opening.** The most characteristic thing in this subject's world
is a table, not a headline over a gradient. Open with the list of published
comparisons, or an excerpt from the newest one. It states what the site is
by being it.

**Screenshots.** Annotated by us, of the product in use GUARDRAILS. Every one
carries a caption naming the product and capture date, and alt text
describing what it shows. A 1px `--rule` border, no drop shadow, no browser
chrome mockup, no perspective tilt.

**Footer.** Ownership disclosure, contact, legal. Text, not icons. No
`/admin` link.

---

## 6 · Copy

Copy makes a design feel as templated as the design does.

- **Name things as the reader does.** Their vocabulary, not vendor
  marketing's.
- **Specific beats clever, always.** Not "powerful reporting" but "exports
  to Excel; no scheduled email delivery below $400/mo".
- **Active voice, sentence case.** No title case headings.
- **No filler openers.** Never "In today's fast-paced business
  environment". Never "It's worth noting that". Never "Let's dive in".
- **Sentence length varies.** Uniform 18-word sentences are an LLM
  fingerprint in prose exactly as uniform padding is in layout.
- **Never these constructions:** "isn't just X, it's Y", "the key takeaway
  is", "in conclusion", "when it comes to", a rule-of-three list where the
  third item adds nothing.
- **Empty and error states give direction, not mood.** "No tools in this
  category yet — the building materials roundups are here." Not "Oops!
  Nothing to see here."

---

## 7 · Accessibility is part of the aesthetic

Not a separate checklist. A spec sheet that a screen reader cannot parse is
a broken spec sheet, and the same structure that serves assistive tech
serves the extraction models we want citing us.

- `<th scope>` on every header cell, `<caption>` on every table
- Winner state carried by glyph and hidden label, not colour — see §4.3
- 4.5:1 body contrast, 3:1 for UI boundaries — the palette above already clears this
- Visible focus ring, `--mark`, 2px offset. Never `outline: none`.
- 44px tap targets
- Pinned first column on mobile must not trap keyboard focus

---

## 8 · The scaled-content risk

This is the part that matters more than any of the above, and it is why
this file sits next to the content docs rather than in a design folder.

**Google's scaled content abuse policy is method-agnostic.** It targets
producing many pages primarily to manipulate rankings rather than help
users — no matter how they were created. Human-written spam and AI-generated
spam face identical consequences. The policy names, specifically, using
generative AI to produce many pages without adding value, and stitching
together content from different pages without adding value.

The March 2026 core update enforced this aggressively. Reporting on the
update associated the largest losses with repetitive AI page sets, scraped
rewrites, and **location templates that lacked original information** —
sites publishing at volume with identical structure and no editorial review.

**Read our own plan against that description.** Many posts, one fixed
section order, one shared table component, two tool names swapped per post —
that is structurally the template pattern that got hit. This is not a reason
to abandon the format; templated structure remains fine when every post
answers a distinct question and carries real information beyond the name
substitution. It is a reason to be honest about which side of that line each
post sits on.

### What keeps us on the right side

| Risk | Our defence | Where enforced |
|---|---|---|
| Template substitution with no real difference | Industry-specific criteria set per vertical; a paragraph that would read identically in a generic comparison gets cut | `CONTENT-GUIDE.md` |
| Blending the top few results | Primary sources only — vendor docs and the product itself. Never other comparison sites. | `GUARDRAILS.md` §2 |
| No information gain | At least one fact per post that isn't on the pages you read | `CONTENT-GUIDE.md` |
| No editorial oversight | Human review before publish, never auto-publish | `GUARDRAILS.md` §5 |
| Anonymous authorship | Author field required server-side | `BUILD-SPEC.md` §5 |
| Two pages competing for one query | One page, one intent, mapped before writing |, |
| Thin posts published to hit a monthly number | Skip the post instead | `CONTENT-GUIDE.md` |

**The concrete rule:** if a post cannot name a genuine, specific difference
between the two tools, **that post should not exist.** Do not publish it to
hit a monthly count. A gap in coverage costs nothing; a run of thin posts is
a sitewide demotion.

Note also that a well-built site with genuine value is not penalised for
being AI-assisted. Google has said plainly that appropriate use of AI is
within its guidelines. The dividing line is human oversight and real value,
not tooling. Everything in §1–7 of this file is about not *looking* like the
penalised category; §8 is about not *being* it. Do not confuse the two, and
do not let passing the first substitute for the second.

---

## 9 · Review before shipping any page

- [ ] Zero gradients. Zero glassmorphism. Zero glow shadows.
- [ ] No colour outside the eleven tokens
- [ ] No font outside the three roles; Inter absent
- [ ] One radius value: 2px
- [ ] No stock imagery, no generated illustration, no decorative icon
- [ ] No unsubstantiated trust metric or fabricated testimonial
- [ ] No scroll-reveal, stagger, or ambient motion
- [ ] Tabular figures in every table
- [ ] Winner state legible with colour removed
- [ ] Screenshot captions name product and capture date
- [ ] No filler copy openers; sentence length varies
- [ ] **The post names a genuine difference between the two tools that
      would be false or irrelevant for any other pair**

The last box is the one that matters. The other eleven are cheap.
