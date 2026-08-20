# SEO-AEO-GEO.md

**A build gate, not a reference.** Every item marked `MUST` blocks a page
from shipping. Items marked `CI` should fail the build automatically.
Items marked `SHOULD` are real wins that can wait a phase.

Self-contained: no other file is required. Works for any website. Adapted
from a 194-feature specification and reconciled against 2026 evidence —
where the two disagree, §2 explains why.

---

## §0 · The four readers

Every page you ship is read by four different things. They want different
things and reward different work.

| Lane | What it is | What it wants | What it gives |
|---|---|---|---|
| **SEO** | The crawler — Googlebot, Bingbot | Crawlability, relevance, authority, speed | A blue link |
| **AEO** | The extractor — snippets, PAA, voice, AI Overviews | One liftable passage that answers completely, alone | The answer box |
| **GEO** | The recommender — ChatGPT, Perplexity, Gemini, Claude, Copilot | Corroboration across many sources, mostly other people's | A mention |
| **LOCAL** | The nearby buyer — map pack, profile, reviews | Proximity, completeness, consistency, reviews | The map pack |

Two structural facts to internalise before reading further.

**GEO is mostly not on your website.** Roughly 85% of brand mentions in AI
answers originate from third-party pages, and sources appearing on four or
more third-party platforms are about 2.8x more likely to be cited. Sections
01–07 make a site *citable*. Only §08 makes it *cited*. Skipping §08 is the
most common reason a technically perfect site never gets named.

**LOCAL is measured on a grid, not as one number.** You will rank first at
your own address and nowhere three kilometres away. A single position
reading tells you almost nothing. If your business has no service area,
skip §09 entirely — but keep 8.04, entity resolution, which is often
misfiled as local and is not.

---

## §1 · What the evidence actually supports

Ranked by strength of evidence. This is the list to work from when time is
short.

| Lever | Effect | Source |
|---|---|---|
| Lists, tables, step blocks vs paragraph-only | 2.5x citation probability | GetCite, 10,000 pages |
| FAQ / Q&A format | 81% citation probability — highest of any format | GetCite |
| Named author with bio vs anonymous | 2.3x more citations; 76.4% of cited content is attributed | Onely |
| Adding citations and quotations | +41% AI visibility | Princeton GEO study, KDD 2024 |
| Adding statistics | +40% AI visibility | Princeton GEO study |
| Table rows vs plain narrative | 2.7x pull | MaxAEO, 3,200 cited passages |
| Content updated within 30 days | 3.2x more citations | Apiserpent |
| Strict heading hierarchy | 68.7% of cited pages vs ~40% of uncited | Seer / BrightEdge |
| Answer in first 30% of the page | 44% of LLM citations come from there | SparkToro |
| **Not** refreshing quarterly | 3x more likely to lose citations entirely | Kevin Indig, State of AI Search 2026 |

Read the top three together. Structured formats, question-and-answer
blocks, and a named human being are the three cheapest interventions
available and the three best evidenced. Most sites do none of them.

---

## §2 · Four corrections to common advice

Standard SEO guidance is wrong or outdated on four points. Each is a
deliberate decision here, not an omission.

**C1 — `llms.txt`: ship it, expect nothing.**
Google's May 2026 generative AI search guide lists llms.txt in its
mythbusting section as unnecessary. The format remains a proposal and no
major provider has confirmed it as a signal. It costs an hour and has no
downside — but it is not a lever, and nothing should depend on it.

**C2 — Structured data is not the AI-citation lever it is sold as.**
Google states plainly that structured data is not required for AI Overviews
or AI Mode. A May 2026 study found adding JSON-LD did not measurably
increase AI citations for pages already appearing in AI Overviews. Trakkr's
analysis of 28,000+ citation appearances across 950 domains found that while
68% of AI-cited pages carry structured data, schema *type* does not predict
citation volume.
**Do it anyway** — it still drives classic rich results and entity linking,
and it is cheap. Just don't prioritise it above content structure, and don't
report it as GEO work.

**C3 — FAQ rich results are dead; FAQ content is not.**
Google deprecated FAQ rich results on 7 May 2026. FAQPage schema no longer
produces visible search results. But Q&A remains the single
highest-citation content format at 81%.
**Keep the blocks. Keep the schema. Expect zero SERP display from it.**

**C4 — Never fake `Review` or `AggregateRating` markup.**
Many specs weight review markup heavily. It is worth real SERP real estate —
but only on genuine, attributable reviews you actually collected. Marking up
your own editorial scoring as a rating is fabrication and a manual-action
risk. If you don't collect reviews, this row is `N/A`, permanently.

---

## §3 · Crawlability and indexation

Nothing below this line matters if the page cannot be fetched, rendered and
stored. This section is also where AEO is most often lost silently.

| # | Item | Lane | Status |
|---|---|---|---|
| 1.01 | HTTPS on every URL, valid cert, monitored expiry | SEO | MUST |
| 1.02 | Single 301 from plain HTTP — not a 302 | SEO | MUST |
| 1.03 | No mixed content; every asset over HTTPS | SEO | MUST |
| 1.04 | `robots.txt` valid, sitemap referenced, no blanket disallow | SEO AEO | CI |
| 1.05 | CSS and JS not blocked to crawlers | SEO | MUST |
| 1.06 | **AI crawlers explicitly allowed** | AEO GEO | CI |
| 1.07 | XML sitemap: canonical 200 URLs only, accurate `lastmod`, split above 50k | SEO | CI |
| 1.08 | No orphan pages — every sitemap URL internally linked, both directions checked | SEO | CI |
| 1.09 | Self-referencing absolute canonical, one per page | SEO | CI |
| 1.10 | No stray `noindex`/`nofollow` in head or HTTP headers; environment-driven | SEO | CI |
| 1.11 | **Server-rendered HTML** | SEO AEO GEO | CI |
| 1.12 | Redirects one hop, no chains or loops, 301 for permanent | SEO | MUST |
| 1.13 | Real 404s — never a soft-404 returning 200; 410 for removed | SEO | MUST |
| 1.14 | Zero broken links, internal and external tracked separately | SEO | CI |
| 1.15 | Crawl depth ≤ 3 clicks to any money page | SEO | MUST |
| 1.16 | Faceted navigation and URL parameters controlled before launch | SEO | MUST |
| 1.17 | Near-duplicate detection across templated pages | SEO | CI |
| 1.18 | IndexNow ping and sitemap resubmit on every publish | SEO | SHOULD |

### 1.06 — the allowlist

```
User-agent: GPTBot
User-agent: OAI-SearchBot
User-agent: ChatGPT-User
User-agent: ClaudeBot
User-agent: Claude-SearchBot
User-agent: PerplexityBot
User-agent: Google-Extended
User-agent: Applebot-Extended
User-agent: CCBot
User-agent: Googlebot
User-agent: Bingbot
Allow: /
```

**`robots.txt` is only half of it.** CDN and WAF defaults block these agents
on most stacks — Cloudflare bot-fight mode, Azure managed rule sets, AWS WAF
bot control. A managed rule filtering "unrecognised bots" does not
distinguish `PerplexityBot` from a scraper.

Blocked means never cited. It fails silently: traffic looks normal and the
citations simply never arrive.

Verify by request, not by config:

```bash
curl -A "ClaudeBot/1.0"     -o /dev/null -w "%{http_code}\n" https://example.com/
curl -A "GPTBot/1.0"        -o /dev/null -w "%{http_code}\n" https://example.com/
curl -A "PerplexityBot/1.0" -o /dev/null -w "%{http_code}\n" https://example.com/
```

Run from outside your own network. Re-run after every infrastructure change,
forever — someone enabling a security feature months from now, with no idea
it touches SEO, is the realistic failure path.

### 1.11 — the decision the other 193 items depend on

Content must exist in the raw HTML response. Google renders JavaScript
eventually; most AI crawlers do not execute it at all.

```bash
curl -s https://example.com/page | grep -c "<table\|<h2"
```

Test every template this way, once, and again after any framework change.
A client-side-rendered site is invisible to the answer engines regardless of
how good the content is.

### 1.17 — the specific risk

Templated pages are the classic duplicate offender — location pages,
comparison pages, "X vs Y" pairs. Two pages competing for one query means
neither wins. Canonicalise one direction and 301 the other.

---

## §4 · Architecture and URLs

Structure is a ranking signal and a comprehension signal at once. A machine
infers what you are an authority on from how your pages relate.

| # | Item | Lane | Status |
|---|---|---|---|
| 2.01 | Topic clusters: one pillar per theme, cluster pages linking back | SEO AEO | MUST |
| 2.02 | One page, one intent — mapped before writing | SEO AEO | MUST |
| 2.03 | Readable stable URLs: lowercase, hyphenated, no dates or IDs | SEO AEO | MUST |
| 2.04 | Shallow hierarchy, two levels maximum | SEO | MUST |
| 2.05 | Single canonical host — www or bare, one redirect rule | SEO | CI |
| 2.06 | Visible breadcrumbs plus `BreadcrumbList` JSON-LD | SEO AEO | MUST |
| 2.07 | Descriptive internal linking; anchor text names the destination | SEO | MUST |
| 2.08 | HTML sitemap and hub pages for large sites | SEO | SHOULD |
| 2.09 | `<html lang>` set on every page | SEO AEO | CI |
| 2.10 | hreflang, reciprocal, with `x-default` — only if genuinely localised | SEO | If applicable |
| 2.11 | Navigation as real `<a href>`, server-rendered | SEO AEO | CI |
| 2.12 | Crawlable pagination, each page self-canonical | SEO | MUST |

**2.02 is where most sites lose before writing a word.** Two pages chasing
one query cannibalise each other and split the links that would have ranked
one. Map every planned URL to a distinct intent at brief stage.

**2.10 warning:** half-built hreflang is worse than none.

---

## §5 · Research and planning

Done before the sitemap is drawn. Every page should exist because a real
query, a real prompt, or a real location justified it — and those numbers
must be measured, never estimated.

| # | Item | Lane | Status |
|---|---|---|---|
| 3.01 | Seed expansion into the full related set, clustered by subtopic | SEO | MUST |
| 3.02 | Real search volume, CPC and 12-month trend, scoped to target geography | SEO LOCAL | MUST |
| 3.03 | Keyword difficulty 0–100 based on what currently ranks | SEO | MUST |
| 3.04 | Intent labelled per keyword | SEO AEO | MUST |
| 3.05 | Buyer-intent separation: ready-to-buy vs just-looking | SEO | MUST |
| 3.06 | Priority score combining volume, difficulty, intent, current position | SEO | MUST |
| 3.07 | Competitor content gap against 2–3 named competitors | SEO | MUST |
| 3.08 | **Prompt research for AI engines** | GEO | MUST |
| 3.09 | Question mining — PAA and support tickets pre-launch, Search Console after | AEO | MUST |
| 3.10 | Content brief per page from what the top ten cover and miss | SEO AEO | CI |
| 3.11 | Service × location matrix decided deliberately, not generated | LOCAL | If applicable |
| 3.12 | **Baseline measurement before launch** | ALL | MUST |

**3.03 is the constraint that shapes the first two quarters.** A new domain
targeting only high-difficulty terms shows nothing for a year. Filter to
KD < 25 initially. There is no shortcut and attempting one costs six months.

**3.08 — prompt research, the item almost nobody does.** The questions
people put to ChatGPT and Perplexity are longer, more conversational and
more comparative than search keywords. Collect 20–30 per topic across four
shapes:

- **Discovery** — "what do companies like mine use for X?"
- **Comparison** — "is A or B better for a mid-size B2B firm?"
- **Evaluation** — "is X worth it at our size?"
- **Implementation** — "how long does X take to set up?"

These drive §7 and §8, and they are also your measurement set for 8.09.

**3.12 — record starting rank, AI share of voice and citation presence
before publishing anything.** Without a baseline you can never prove
anything worked. Allow four to six weeks before drawing conclusions.

---

## §6 · On-page structure

The elements a parser reads first. Get these right and both a ranking
algorithm and an extraction model can tell what the page is for within a few
hundred bytes.

| # | Item | Lane | Status |
|---|---|---|---|
| 4.01 | Unique title, 50–60 chars, phrase near the front | SEO | CI |
| 4.02 | Target keyword present in the title, naturally | SEO | CI |
| 4.03 | Meta description 120–160 chars, written as ad copy | SEO | CI |
| 4.04 | Exactly one H1 | SEO AEO | CI |
| 4.05 | No title / H1 mismatch | SEO | MUST |
| 4.06 | Sequential heading order, no skipped levels | SEO AEO | CI |
| 4.07 | **Question-shaped subheadings** | AEO | MUST |
| 4.08 | Semantic HTML — `main`, `article`, real `<table>` and `<ul>` | SEO AEO | CI |
| 4.09 | Alt text on every meaningful image; `alt=""` on decorative | SEO AEO | CI |
| 4.10 | Descriptive filenames and captions | SEO | MUST |
| 4.11 | Explicit width and height on every image, video and embed | SEO | CI |
| 4.12 | Readability grade 7–9 | AEO | MUST |
| 4.13 | No thin pages | SEO | CI |
| 4.14 | Table of contents with anchor links on long pages | SEO AEO | MUST |
| 4.15 | **Visible last-updated date** matching `dateModified` | SEO AEO | CI |

**4.06 is load-bearing and cheap.** 68.7% of AI-cited pages use strict
heading hierarchy against roughly 40% of uncited pages. It is also the
easiest thing to break with a template change, which is why it belongs in
CI.

**4.07 — convert topical headings to questions.**

| Topical | Question-shaped |
|---|---|
| Feature comparison | How do A and B compare? |
| Pricing | What does it cost? |
| Methodology | How did we evaluate these? |
| Conclusion | Which should you choose? |

Keep the H1 topical. Convert the H2s.

**4.15 — non-negotiable.** Answer engines weight recency heavily and will
pick a fresher competitor over an undated page. Perplexity has the strongest
recency bias; content past 90 days enters a decay window on fast-moving
queries. Never bump the date without changing the content — it is detectable
and counterproductive.

---

## §7 · Content depth and E-E-A-T

Experience, Expertise, Authoritativeness, Trust. These decide whether a
machine treats your page as a source worth quoting or filler worth skipping.

| # | Item | Lane | Status |
|---|---|---|---|
| 5.01 | **Named authors with real, verifiable credentials** | SEO AEO | MUST |
| 5.02 | **Original data and information gain** | GEO | MUST |
| 5.03 | Citations to primary sources — studies, standards bodies, official docs | GEO | CI |
| 5.04 | Named-expert quotes, attributed with a title | GEO | SHOULD |
| 5.05 | Depth matched to intent — completeness, not word count | SEO | MUST |
| 5.06 | A real About page: founding, team, credentials, address | SEO AEO | MUST |
| 5.07 | Contact details as HTML text, never inside an image | SEO LOCAL | MUST |
| 5.08 | Editorial refresh cadence driven by decay, not calendar | SEO AEO | CI |
| 5.09 | Policy and legal pages — privacy, terms, refunds, cookies | SEO | MUST |
| 5.10 | **One canonical brand fact sheet, repeated identically everywhere** | AEO GEO LOCAL | MUST |
| 5.11 | No unsupported claims; every superlative traceable | GEO | CI |

### 5.01 — the highest-value cheap win

Pages with a named author, a title and a linked bio earn roughly 60% more AI
citations. 76.4% of AI-cited content has an attributed author, and authored
content earns 2.3x more citations than anonymous. The effect concentrates
where the name resolves to a real LinkedIn or credentialed external profile.

Requirements: real name, stated relevant experience, author page marked up
as `Person`, `sameAs` to a real profile, byline on every article linking to
it.

Publishing anonymously forfeits a documented multiplier on exactly the
metric most sites are trying to move.

### 5.02 — the only durable moat

Answer engines quote sources of facts, not restatements of them. This is the
most direct lever on being named at all, and almost nobody does it because
it requires actual work.

What counts: your own survey data, test results, benchmark numbers, price
tracking over time, project outcomes, case results, anything measured rather
than repeated. What does not count: a rewrite of the top five search
results, however well written.

Practical version — publish something with a number in it that no
competitor can copy without doing the same work.

### 5.10 — the fact sheet

Founding year, headcount, service areas, certifications, pricing model,
hours. Written once, repeated **identically** on the site, in schema, on the
business profile and in every directory.

Contradictions across sources make an engine hedge, or cite someone
clearer. This one item does more for entity confidence than most schema
work.

---

## §8 · Structured data

JSON-LD is the only place you get to state facts in a form no parser can
misread. Implement it — but read C2 first and don't expect AI citations
from it.

| # | Item | Lane | Status |
|---|---|---|---|
| 6.01 | JSON-LD in the head, validated before ship — not Microdata or RDFa | SEO AEO | CI |
| 6.02 | `Organization` — name, url, logo, `sameAs`, foundingDate, contactPoint | SEO AEO | MUST |
| 6.03 | `LocalBusiness` or the most specific subtype that fits | LOCAL SEO | If applicable |
| 6.04 | Schema NAP identical to the business profile | LOCAL | If applicable |
| 6.05 | `WebSite` with `SearchAction` | SEO | SHOULD |
| 6.06 | `BreadcrumbList` mirroring the visible breadcrumb | SEO | MUST |
| 6.07 | `Article` / `BlogPosting` — headline, author, datePublished, dateModified | SEO AEO | CI |
| 6.08 | `FAQPage` — visible question/answer pairs only | AEO | MUST — see C3 |
| 6.09 | `HowTo` with real steps matching a visible step block | AEO | If genuine |
| 6.10 | `Speakable` — CSS selectors marking what a voice assistant reads | AEO | SHOULD |
| 6.11 | `Product` / `Offer` — price, availability, currency | SEO AEO | If selling |
| 6.12 | `Service` with `areaServed` for non-product businesses | LOCAL AEO | If applicable |
| 6.13 | `Review` / `AggregateRating` — **genuine reviews only** | AEO LOCAL | See C4 |
| 6.14 | Domain types: `Course`, `Event`, `JobPosting`, `Recipe`, `VideoObject`, `SoftwareApplication` | SEO AEO | If applicable |
| 6.15 | **Linked entity graph via stable `@id`** | GEO | MUST |
| 6.16 | Schema regression monitoring on every deploy | SEO | CI |

**6.15 is the one item here with real GEO value.** Give each node a stable
`@id` and cross-reference so `Article → Person → Organization` resolve to one
connected entity rather than three loose blobs. This feeds 8.04, and entity
resolution *is* a real lever — engines resolve names to entities before they
answer, and an unresolvable name is dropped from consideration.

**The rule that overrides everything in this section:** schema must describe
what is visibly on the page. Marking up FAQs that aren't rendered, or
ratings that don't exist, is a policy violation — and an engine that catches
you once discounts everything else you declare.

---

## §9 · Answer-ready content

On-page AEO. The unit of optimisation stops being the page and becomes the
passage, because that is what gets lifted into a snippet, spoken by an
assistant, or quoted by a model.

| # | Item | Lane | Status |
|---|---|---|---|
| 7.01 | **Answer-first paragraph, 40–60 words, under every question heading** | AEO | CI |
| 7.02 | **Self-contained passages** | AEO | MUST |
| 7.03 | Genuine FAQ block, 6–10 real questions from real data | AEO | CI |
| 7.04 | Definition sentences — "X is a…" phrasing, once, early | AEO | MUST |
| 7.05 | **Comparison tables in real `<table>` markup** | AEO GEO | CI |
| 7.06 | **Ranked lists with a justified criterion per entry** | AEO GEO | MUST |
| 7.07 | Step-by-step `<ol>` blocks, one action per step, eight or fewer | AEO | If procedural |
| 7.08 | Conversational long-tail coverage — the full spoken question | AEO | MUST |
| 7.09 | Spoken-length answers, ~30 words, for voice queries | AEO | SHOULD |
| 7.10 | "Near me" and city-qualified phrasing in plain sentences | LOCAL AEO | If applicable |
| 7.11 | Glossary hub, one page per term | AEO | SHOULD |
| 7.12 | **Statistics page — sourced, dated figures** | AEO GEO | MUST |
| 7.13 | **"Alternatives to" and "vs" pages naming competitors** | GEO | MUST |
| 7.14 | `llms.txt` at root | AEO GEO | SHOULD — see C1 |
| 7.15 | Video with on-page transcript plus `VideoObject` and chapters | AEO SEO | If video |
| 7.16 | Case studies with named outcomes: client, problem, approach, result | SEO GEO | SHOULD |

### 7.01 — the single highest-leverage content rule

Directly under every question heading, a 40–60 word paragraph answering it
completely **in the first sentence**, then elaborating. 44% of LLM citations
come from the first 30% of page content. An answer buried in the third
paragraph hands the citation to whoever led with theirs.

### 7.02 — write for chunked retrieval

Every section must survive being pulled out of the page with no surrounding
context. Retrieval systems chunk content; a chunk full of "as mentioned
above" and unresolved pronouns is unusable.

- Name the subject in each section rather than "it" or "the former"
- Restate the context rather than "this approach"
- Never open a section with "However," or "That said,"
- Give every table a caption identifying what it compares

**Counter-guidance worth respecting:** Google explicitly warns against
artificially chunking content into fragments to target queries. Write
coherent pieces whose sections happen to stand alone. Those are different
things.

### 7.05 and 7.06 — the two formats that pay

Table rows get 2.7x the pull of plain narrative. Lists, tables and step
blocks together earn 2.5x the citation probability of paragraph-only
content. Ranked lists match the shape of list-shaped queries.

If you do nothing else in this section, put a real HTML table on every page
where a comparison exists.

### 7.12 — build this earlier than feels natural

Sourced, dated figures are link magnets and among the most-quoted formats in
AI answers. Adding a statistic with a named source every 150–200 words
raises citation probability across the board. Combined with 5.02, this is
where original data becomes citable.

---

## §10 · Generative engine optimisation

The uncomfortable section. Most of what determines whether an engine
recommends you is not on your website — engines synthesise from other
people's pages about you, so those pages are the deliverable.

| # | Item | Lane | Status |
|---|---|---|---|
| 8.01 | Presence in third-party listicles and round-ups | AEO GEO | MUST |
| 8.02 | Complete profiles on the aggregators that dominate your vertical | GEO LOCAL | MUST |
| 8.03 | **Genuine community presence — Reddit, Quora, industry forums** | GEO | MUST |
| 8.04 | **A resolvable knowledge-graph entity** | GEO | MUST |
| 8.05 | Digital PR and placed research | GEO | SHOULD |
| 8.06 | Backlinks from topically relevant authorities — relevance beats DR | SEO GEO | MUST |
| 8.07 | Toxic-link monitoring and disavow, quarterly | SEO | SHOULD |
| 8.08 | **Per-engine visibility tracking, separately** | GEO | MUST |
| 8.09 | Share of voice against named competitors | GEO | MUST |
| 8.10 | Mention quality, not just count | GEO | SHOULD |
| 8.11 | Hallucination and correction loop | GEO | MUST |
| 8.12 | **Content reachable — no paywall, login, or bot mitigation** | GEO | CI |
| 8.13 | YouTube presence with full descriptions, chapters, corrected captions | GEO | SHOULD |
| 8.14 | Brand-mention monitoring, including unlinked mentions | GEO | SHOULD |

### 8.01 — where recommendations actually come from

When asked for a recommendation, engines overwhelmingly synthesise from
third-party round-ups rather than vendor sites. "Top 10 X in [city]"
articles on other people's domains are the deliverable, and your own
beautifully optimised homepage is not a substitute.

### 8.03 — community, done honestly

Community forums appear in a growing share of AI answers, visibly so in
Perplexity's citation lists, because people ask their real unfiltered
questions there in the same words they use with ChatGPT.

Two legitimate uses: a research source for 3.08 prompt collection, and a
visibility lever through genuinely answering questions where you have
something useful. Manufactured mentions are detected, and the reputational
cost dwarfs the gain.

### 8.04 — do this in week one

Engines resolve names to entities before they answer. An unresolvable name
is dropped from consideration entirely. Required: a Wikidata entry, a
LinkedIn company page, a Crunchbase entry, consistent `sameAs` links across
all of them and in `Organization` schema, and author profiles that resolve.

Cheap, one-time, blocks nothing — which is exactly why it gets forgotten.

### 8.08 — probe each engine separately

Only about 11% of domains are cited by both ChatGPT and Perplexity. Even
Google's own AI Overviews and AI Mode share just 13.7% of cited URLs. A
single average hides precisely where you are absent.

Method: take the 20–30 prompts from 3.08. Run each in a fresh session,
weekly, across ChatGPT, Perplexity, Gemini, Claude, Copilot and AI
Overviews. Log whether you are cited, whether a competitor is cited instead,
and how prominently. Share of voice = appearances ÷ total prompts × 100.
Archive the full answer text, dated, per engine — without the archive you
can see visibility move but never why.

Start in a spreadsheet. Tooling can come later; the discipline cannot.

### 8.11 — engines will state wrong facts about you

Wrong prices, wrong hours, wrong services. Diff every captured answer
against the 5.10 fact sheet quarterly, then fix the upstream source that
caused it — usually a stale directory listing rather than anything on your
own site.

### 8.12 — verify in logs

CDN AI-bot toggles and WAF rules block engines by default on many stacks.
Check them explicitly, then confirm in server logs. See 1.06.

---

## §11 · Local and map pack

Skip entirely if you have no service area. For anything with one, this
outranks most content work.

| # | Item | Status |
|---|---|---|
| 9.01 | Business profile fully complete — categories, services, attributes, hours, real photos | MUST |
| 9.02 | Profile posts weekly — offers, events, updates | MUST |
| 9.03 | Profile Q&A seeded and answered — gets scraped into local AI answers | MUST |
| 9.04 | Bing Places and Apple Business Connect — feed Copilot and Siri | SHOULD |
| 9.05 | **NAP identical everywhere** — site, schema, every profile, every directory | CI |
| 9.06 | Citation coverage across general and vertical directories for your category | MUST |
| 9.07 | **Geo-grid rank measurement** — dozens of points across the city | MUST |
| 9.08 | **Review generation workflow** — systematic request after every job | MUST |
| 9.09 | A reply to every review, good and bad | MUST |
| 9.10 | Reviews beyond Google — Trustpilot, Yelp, and the aggregators your customers use | SHOULD |
| 9.11 | Genuinely distinct location pages — local projects, staff, landmarks, pricing | CI |
| 9.12 | Embedded map plus the address in HTML text alongside it | MUST |
| 9.13 | Local backlinks — chambers, local news, sponsorships | SHOULD |
| 9.14 | Special hours set in advance across profile, site and directories | MUST |
| 9.15 | Photo and video freshness — ongoing, not a one-time batch | SHOULD |
| 9.16 | Service-area handling: hide address, define radius, build area pages | If no storefront |
| 9.17 | Multi-location architecture decided before URLs are fixed | If multi-site |
| 9.18 | Seasonal and local content hooks | SHOULD |

**9.08 is the single biggest local lever.** Volume, velocity and rating
drive the map pack directly.

**9.11 is the biggest local risk.** Templated pages with the city swapped
out are doorway pages and get filtered. The duplicate detector in 1.17
catches them first.

---

## §12 · Performance and Core Web Vitals

| # | Item | Target | Status |
|---|---|---|---|
| 10.01 | LCP — preload the hero, `fetchpriority="high"`, never lazy-load it | < 2.5s | CI |
| 10.02 | INP — break up long JS tasks, cut third-party scripts | < 200ms | CI |
| 10.03 | CLS — reserve space for every image, ad, embed and injected banner | < 0.1 | CI |
| 10.04 | TTFB — caps every other metric | < 800ms | MUST |
| 10.05 | Field data, not just lab scores | — | SHOULD |
| 10.06 | AVIF or WebP, responsive `srcset`, `loading="lazy"` below the fold only | — | MUST |
| 10.07 | Self-hosted subset WOFF2 fonts, preloaded, two families maximum | — | MUST |
| 10.08 | Critical CSS inline, the rest deferred | — | MUST |
| 10.09 | Minimal JavaScript, code-split per route | — | MUST |
| 10.10 | Third-party script budget with a named owner per tag | — | MUST |
| 10.11 | CDN, Brotli, HTTP/2 or /3, long `max-age` on hashed assets | — | MUST |
| 10.12 | Mobile-first: correct viewport, 44px tap targets, no horizontal scroll | — | CI |
| 10.13 | Performance budget enforced in CI | — | MUST |

**10.10 is the usual INP culprit.** Chat widgets, heatmaps and pixels
accumulate silently. Without 10.13, performance decays back to baseline
within a quarter.

---

## §13 · Accessibility

The accessibility tree and the parse tree are close cousins. Building for a
screen reader is, in practice, building for an extraction model — and it is
a legal requirement in most markets besides.

| # | Item | Status |
|---|---|---|
| 11.01 | Landmark regions — `header`, `nav`, `main`, `aside`, `footer`, one `main` | CI |
| 11.02 | WCAG AA contrast — 4.5:1 body, 3:1 large text and UI boundaries | CI |
| 11.03 | Full keyboard operability, logical order, visible focus, no traps | MUST |
| 11.04 | Real `<label>` per input; errors linked programmatically | MUST |
| 11.05 | Skip-to-content link as the first focusable element | MUST |
| 11.06 | Captions and transcripts on media | If media |
| 11.07 | ARIA only where native HTML falls short | MUST |
| 11.08 | Respect `prefers-reduced-motion` and `prefers-color-scheme` | MUST |

**Tables are the usual failure.** `<th scope="col">` and
`<th scope="row">` on every header, a `<caption>`, and any highlighted state
conveyed by something other than colour alone. A highlight carried only by
background colour is invisible to a screen reader *and* to a text-extracting
model.

---

## §14 · Social and brand presentation

How the page looks when something else renders it — a chat app, a feed, a
search result, an AI answer card.

| # | Item | Status |
|---|---|---|
| 12.01 | Complete Open Graph: title, description, image, url, type, site_name | CI |
| 12.02 | OG image 1200×630, **absolute URL**, under 1MB, readable at thumbnail size | CI |
| 12.03 | Twitter card, `summary_large_image` | CI |
| 12.04 | Full favicon set, app icons, web manifest, `theme-color` | MUST |
| 12.05 | Square high-resolution logo in `Organization` schema | MUST |
| 12.06 | Every official social profile in `sameAs` and linked in the footer | MUST |

**12.02:** relative URLs are the most common reason previews silently fail.
**12.05 and 12.06** are GEO items wearing social clothing — they feed 8.04.

---

## §15 · Conversion

Visibility that does not convert is a vanity metric. AI-sourced visitors
arrive further along the decision — they have already been handed a
shortlist, so they act faster and tolerate less friction.

| # | Item | Status |
|---|---|---|
| 13.01 | Specific value proposition above the fold, in text not an image | MUST |
| 13.02 | One primary CTA per page, phrased as the outcome | MUST |
| 13.03 | Short forms, inline validation, single column, correct input types | MUST |
| 13.04 | Instant contact channels — click-to-call, WhatsApp, self-serve booking | If applicable |
| 13.05 | **Trust signals near every CTA** | MUST |
| 13.06 | Lead magnets on informational pages, matched to intent | SHOULD |
| 13.07 | Tracked thank-you pages, one per conversion type, `noindex` | MUST |
| 13.08 | On-site answer assistant grounded strictly in your own content | SHOULD |
| 13.09 | Post-conversion review request wired in at build time | If local |

**13.05 does double duty** — trust signals near a CTA are also the
credibility evidence an AI answer needs to justify naming you.

**13.08 doubles as an audit:** the questions it cannot answer are exactly
the pages you have not written.

---

## §16 · Measurement and governance

Instrument before launch. AI referral traffic is invisible unless you
deliberately set out to catch it.

| # | Item | Status |
|---|---|---|
| 14.01 | Search Console **and Bing Webmaster** verified, sitemaps submitted | MUST |
| 14.02 | Analytics with events defined against business outcomes, consent mode | MUST |
| 14.03 | **AI referral channel group** | MUST |
| 14.04 | AI conversion rate tracked separately | MUST |
| 14.05 | Rank tracking including SERP features and AI Overview presence | MUST |
| 14.06 | Rank by city and device, not a national average | If local |
| 14.07 | **Prompt and answer archive, dated, per engine** | MUST |
| 14.08 | Server log analysis by bot and status code | MUST if logs exist |
| 14.09 | Call and form attribution into the CRM | MUST |
| 14.10 | Algorithm-volatility context | SHOULD |
| 14.11 | Scheduled technical re-audits | MUST |
| 14.12 | Uptime, 5xx and certificate-expiry alerting | MUST |
| 14.13 | Staging password-protected, not merely `noindex` | MUST |

**14.01 — Bing is not optional.** Bing's index feeds Copilot and ChatGPT
search. Skipping it removes visibility into two of the five engines that
matter.

**14.03 — the referrer list:**

```
chatgpt.com, chat.openai.com, perplexity.ai, gemini.google.com,
copilot.microsoft.com, claude.ai, you.com, phind.com
```

Without this channel group it all lands in Direct and you conclude, wrongly,
that none of §9 or §10 did anything. AI research also frequently leaves no
referrer at all — watch branded search trends and unexplained direct traffic
as proxies.

**14.05 — position 3 is not what it was.** Where AI Overviews appear, CTR for
the top organic result drops substantially. Rank without AI-Overview context
is a misleading number.

**14.08 — the only definitive proof.** Logs are the only way to know that
search and AI crawlers actually reach your content, and the direct
verification for 1.06 and 8.12. If your host provides no logs, accept the
gap and lean harder on the curl tests.

---

## §17 · Stack and build decisions

Made in the first week, expensive to reverse in the sixth.

| # | Item | Status |
|---|---|---|
| 15.01 | **SSR or SSG, never client-side only** | CI |
| 15.02 | Per-page metadata editable by a non-developer — title, description, canonical, robots, OG, schema | MUST |
| 15.03 | A publishing path the team can reach without a deploy | MUST |
| 15.04 | **Schema generated from content fields, not pasted** | MUST |
| 15.05 | A redirect manager in the admin | MUST |
| 15.06 | **Content model built around entities**, not free-text blobs | MUST |
| 15.07 | Automatic sitemap and robots generation with the AI allowlist as a template default | CI |
| 15.08 | **Build-time gates** | CI |
| 15.09 | Security headers — HSTS, `X-Content-Type-Options`, `Referrer-Policy`, CSP | MUST |
| 15.10 | **Bot mitigation tuned, not defaulted** | CI |
| 15.11 | Migration redirect map shipped *with* launch, not after | If replacing a site |
| 15.12 | Shared component library across sites — one FAQ block, one table, one schema builder | If multi-site |
| 15.13 | Analytics and Search Console connected at build | MUST |

**15.01 restates 1.11 because it is the decision the other 193 depend on.**

**15.04 and 15.06 together** mean markup and visible content cannot drift
apart, and a data change never requires editing every page that references
it.

**15.09 caution:** a CSP mistake can block your own analytics or schema.
Ship it in report-only mode first.

---

## §18 · Build-time gates

`npm run check` (or equivalent) should fail on any of these.

**Structure**
1. Missing or duplicate title
2. Zero or multiple H1
3. Skipped heading level
4. Meta description outside 120–160 chars
5. Missing canonical, or non-self-referential without an explicit override
6. `noindex` outside a designated allowlist
7. Missing or invalid `lang`
8. Image without alt, or without width and height

**Content**
9. Page without a visible last-updated date
10. Page without a named author
11. Comparison content without a real `<table>`
12. Question heading not followed by an answer paragraph ≤ 60 words
13. Word count below the thin-page threshold
14. A statistic or claim with no source

**Technical**
15. Broken internal link
16. Orphan page — in sitemap, not internally linked
17. Invalid JSON-LD
18. `Review` or `AggregateRating` markup without genuine underlying reviews
19. Missing OG tag, or a relative OG image URL
20. Lighthouse performance or accessibility below 95
21. `robots.txt` missing an AI crawler allow
22. Near-duplicate page detected against an existing URL

---

## §19 · Pre-launch checklist

Run in order. Do not launch with any unchecked.

**Crawlability**
- [ ] Fetch every template with JavaScript disabled; content present (1.11)
- [ ] `curl` as each AI user-agent from outside your network → 200 (1.06, 8.12)
- [ ] Confirm the WAF/CDN allow rule sits *above* any managed bot rules
- [ ] Rate limits exempt or accommodate allowlisted crawlers
- [ ] Sitemap contains only canonical 200 URLs with accurate `lastmod` (1.07)
- [ ] Zero orphans, zero broken links (1.08, 1.14)
- [ ] Every canonical self-referential (1.09)
- [ ] No staging `noindex` shipped to production (1.10, 14.13)

**Content and entity**
- [ ] All JSON-LD validated (6.01)
- [ ] No fabricated `Review`/`AggregateRating` (6.13, C4)
- [ ] Entity live and cross-linked: Wikidata, LinkedIn, Crunchbase (8.04)
- [ ] Author pages live with resolving `sameAs` (5.01)
- [ ] Fact sheet published and identical across every surface (5.10)
- [ ] `llms.txt` published (7.14)

**Measurement**
- [ ] Search Console **and Bing Webmaster** verified, sitemaps submitted (14.01)
- [ ] AI referral channel group configured (14.03)
- [ ] Baseline recorded: rank, AI share of voice, citation presence (3.12)
- [ ] Prompt set of 20–30 stored per topic (3.08)
- [ ] Server logs routed to a queryable store (14.08)

**Quality**
- [ ] Lighthouse ≥ 95 performance and accessibility on three templates
- [ ] Screen-reader pass on every table
- [ ] Security headers live; CSP in report-only first (15.09)
- [ ] Custom domain, certificate, and one canonical-host redirect (2.05)

**Local, if applicable**
- [ ] Business profile complete and verified (9.01)
- [ ] NAP identical everywhere (9.05)
- [ ] Profile Q&A seeded (9.03)
- [ ] First geo-grid reading taken (9.07)
- [ ] Review request workflow live (9.08)

---

## §20 · Ongoing cadence

| Frequency | Task |
|---|---|
| Every publish | IndexNow ping, sitemap resubmit (1.18) |
| Weekly | Per-engine visibility probe, 20–30 prompts, archived (8.08, 14.07) |
| Weekly | Business profile post, if local (9.02) |
| Weekly | Geo-grid reading, if local (9.07) |
| Monthly | Technical re-audit; backlink new/lost review (14.11, 8.06) |
| Monthly | Server log review by bot and status code (14.08) |
| Monthly | Re-run the AI crawler curl test |
| **Quarterly** | **Content refresh on decaying pages (5.08)** |
| Quarterly | Hallucination diff against the fact sheet (8.11) |
| Quarterly | Toxic-link check and disavow (8.07) |
| Annually | Retire dead content, re-rank, update years in titles |

**The quarterly refresh is the highest-return recurring task on this list
and the one most likely to lapse.** Pages not updated quarterly are roughly
3x more likely to lose their AI citations entirely. Make it a calendar
commitment with a named owner, not an intention.

---

## §21 · The order to build in

Genuinely sequential. Each phase is expensive to redo once the next is built
on top of it.

**Phase 0 — before a line of code**
All of §5 (keywords, intents, difficulty, prompts, gaps), plus the URL plan,
the entity content model, the brand fact sheet (5.10), the author decision
(5.01), and the stack decisions in §17. Everything downstream inherits from
this.

**Phase 1 — while building**
Server rendering, semantic markup, per-page metadata fields, schema
builders, performance budget, accessibility, and the reusable answer-first,
FAQ, table and location-page components. Cheap now, expensive later.

**Phase 2 — before launch**
Robots and sitemap with the AI allowlist verified, canonicals audited,
redirect map live, staging locked, analytics and Search Console connected,
schema validated, baseline measurements taken — and a JavaScript-disabled
fetch of every single template.

**Phase 3 — launch week**
Submit sitemaps, ping IndexNow, confirm indexation, claim every profile and
directory listing, seed profile Q&A, take the first geo-grid and AI
share-of-voice readings.

**Phase 4 — ongoing**
Content cadence against the priority list, review generation, off-site
citation building (§10), monthly technical re-audit, weekly per-engine
tracking, and refreshes driven by what the engines are citing instead of you.

---

## §22 · The three things no crawler can do for you

Automation covers most of this document. Three items need a human and are
the ones that get skipped:

1. **Performance budgets in CI** (10.13) — someone has to decide the
   threshold and defend it when a deadline presses
2. **Accessibility** (§13) — automated tools catch maybe a third of real
   issues; the rest needs a keyboard and a screen reader
3. **Conversion design** (§15) — no crawler can tell you whether your value
   proposition is convincing

And one judgement that overrides everything above: **is this page worth
publishing?** Google's scaled content abuse policy is method-agnostic — it
targets many pages produced primarily to manipulate rankings, no matter how
they were created, and human-written spam faces identical consequences to
AI-generated spam. The March 2026 core update enforced this hard against
templated page sets with no editorial oversight.

A page that cannot say something true and specific that its siblings cannot
should not exist. An incomplete site is a minor gap. A site of thin pages is
a sitewide demotion, and no amount of the other 193 items fixes it.