# SEO-PLAN.md

The end-to-end SEO / AEO / GEO plan for playthetech, mapped item by item onto
this repository.

`seoaeogeo.md` is the standard. This file is the **execution plan against that
standard for this codebase** — what is built, what is broken, what does not
exist, and the order to build it in. Where the two disagree, `seoaeogeo.md`
wins and this file is out of date.

Phase IDs here are the ones already cited elsewhere in the repo — `schema.sql`
(`P1.4`, `A2`, `B6`), `app/page.js` (`P1.6`), `scripts/smoke.mjs` (`D3`),
`.github/workflows/deploy.yml` (`Phase D`) and `README.md` (`Phase D` gates).
Do not renumber them.

---

## §1 · Scope — what this site is, and what does not apply

playthetech is a **publisher**, not a local business. It sells nothing, serves
no geography, and collects no reviews. Whole sections of the standard are
therefore permanently out of scope, and recording that here stops them being
re-litigated every quarter.

| Standard | Verdict | Why |
|---|---|---|
| §11 Local and map pack (9.01–9.18) | **N/A — permanent** | No service area. §0 of the standard says skip it outright. |
| 6.03, 6.04, 6.12 `LocalBusiness` / NAP / `Service` | **N/A** | Same reason. |
| 7.10 "near me" phrasing | **N/A** | Same reason. |
| 13.04, 13.09 click-to-call, post-job review request | **N/A** | No jobs, no calls. |
| 14.06 rank by city | **N/A** | National / global long-tail only. |
| 6.13 `Review` / `AggregateRating` | **N/A — permanent, enforced** | GUARDRAILS R6.3. We collect no reviews; marking up editorial scoring as a rating is fabrication. `scripts/smoke.mjs` asserts its absence. |
| 6.11 `Product` / `Offer` | **N/A** | We sell nothing. Vendor prices are reported facts, not our offers. |
| 2.10 hreflang | **N/A** | Single locale, `en-GB`. Half-built hreflang is worse than none. |
| 7.15, 8.13 video / YouTube | **Deferred** | No video. Revisit only if that changes. |

**8.04 entity resolution stays in scope.** The standard is explicit that it is
often misfiled as local work and is not. It is E1 below, and it is the most
under-rated item in this plan.

Two constraints from `GUARDRAILS.md` bind everything downstream:

- **R4.1–4.3** — "Playtech" is an unrelated FTSE 250 company. Branded search is
  unwinnable and must not be pursued. Every growth assumption rests on
  long-tail query and prompt coverage. The domain is a container, not an asset.
- **R8.1** — the four network sites must never cross-link. This overrides any
  internal-linking advice that would suggest otherwise.

---

## §2 · Where the site stands today

### 2.1 Built and correct

Done. Do not redo these; protect them with gates instead.

| Item | Standard | Where |
|---|---|---|
| Server-rendered HTML throughout, no CSR on content | 1.11, 15.01 | all of `app/`; the comparison page is a pure server component |
| AI crawler allowlist, 11 agents | 1.06 | `app/robots.js` |
| `/admin`, `/api` disallowed + `X-Robots-Tag` header | 1.10 | `app/robots.js`, `next.config.mjs` |
| XML sitemap, canonical URLs only, real `lastmod` | 1.07 | `app/sitemap.js` |
| Self-referencing absolute canonicals | 1.09 | `app/compare/[slug]/page.js`, `lib/site.js` |
| Real 404 status on missing slugs | 1.13 | `notFound()` in the comparison page |
| Visible breadcrumb + `BreadcrumbList` | 2.06, 6.06 | `app/compare/[slug]/page.js` |
| Real `<a href>` server-rendered nav | 2.11 | `app/layout.js` |
| `<html lang="en">` | 2.09 | `app/layout.js` |
| Exactly one H1; markdown H1s demoted to H2 | 4.04 | `lib/markdown.js` → `renderHeading` |
| Visible last-updated matching `dateModified` | 4.15 | comparison page + `lib/format.js` |
| Table of contents on long posts | 4.14 | `.aside-card.toc` |
| Real `<table>` with `<caption>` and `<th scope>` | 4.08, 7.05 | `lib/markdown.js` → `renderTable` |
| Winner marked by glyph + screen-reader text, not colour | 7.05, §13 | `cellHtml` — `.vh` "Best in row" |
| "Not published" instead of blank or em-dash | R2.4 | `cellHtml` |
| Source superscripts into a source list | 5.03 | `sourceRefs`, `#source-N` |
| Every vendor named gets linked, not only the pre-linked ones | R1.3, R8.2 | `autolinkDomains`, `extractLinks` |
| Answer-first summary enforced at 20–80 words | 7.01 | `lib/validate.js` |
| Named author required at save time | 5.01, R5.3 | `lib/validate.js` |
| FAQ parsed from prose → `FAQPage` schema | 6.08, C3 | `renderContent().faq` |
| `Article` JSON-LD with `about` naming both tools | 6.07 | comparison page |
| No `Review` / `AggregateRating` anywhere | C4, 6.13, R6.3 | asserted in `scripts/smoke.mjs` |
| OG + Twitter card, generated 1200×630 images | 12.01–12.03 | `app/opengraph-image.js`, `lib/og.js` |
| `llms.txt` with sourcing and ownership statement | 7.14, C1 | `app/llms.txt/route.js` |
| RSS feed | discovery | `app/feed.xml/route.js` |
| Security headers, CSP report-only first | 15.09 | `next.config.mjs` |
| Skip link, landmarks, one `<main>` | 11.01, 11.05 | `app/layout.js` |
| Performance budget in CI, zero third-party scripts | 10.10, 10.13 | `.github/lighthouse-budget.json` |
| Post-deploy crawler smoke test from outside Azure | 1.06, 8.12 | `scripts/smoke.mjs`, `smoke` job |
| Ownership disclosure above the table | R1.1 | `mentionsSalezx()` |
| **P1.4** meta description column, separate from summary | 4.03 | `schema.sql` — migrated, unused |
| **P1.6** homepage off `force-dynamic`, `revalidate = 300` | 10.04 | `app/page.js` |
| **A2** authors table + `author_id` FK | 5.01 | `schema.sql` — migrated, unused |
| **B6** tools table | 15.06, 6.15 | `schema.sql` — migrated, unused |
| **D3** smoke agent list synced to `robots.js` | 1.06 | `scripts/smoke.mjs` |

### 2.2 Broken right now

**The build does not compile.** Five modules are imported and do not exist.
Nothing else proceeds until Phase 0 closes.

| Missing | Expected exports | Imported by |
|---|---|---|
| `lib/content.js` | `publishedPosts`, `allAuthors` | `app/page.js`, `app/admin/new/page.js` |
| `lib/schema.js` | `baseGraph`, `webPage`, `itemList`, `jsonLd` | `app/page.js`, `app/logo.png/route.js` |
| `lib/meta.js` | `pageMeta` | `app/page.js` |
| `lib/prices.js` | `buildPriceTable`, `summarise` | `app/page.js` |
| `lib/mark.js` | `markCard` | `app/apple-icon.js`, `app/logo.png/route.js` |

Three further breakages sit behind them:

- **`scripts/check.mjs` does not exist.** `package.json` declares
  `"check": "node scripts/check.mjs"`, `deploy.yml` runs `npm run check`, and
  `README.md` documents its behaviour in detail. The Phase D gates — the entire
  CI safety net — are absent.
- **`middleware.js` does not exist.** Only a stale compiled copy in `.next/`.
  Comments in `lib/session.js` and `app/api/posts/route.js` claim it guards
  `/admin/*`. Page-level `requireAdmin()` carries that load alone today.
- **`lib/publish.js` does not exist.** `app/page.js` sets `revalidate = 300`
  and comments that saving purges the path "immediately via lib/publish.js".
  Nothing calls `revalidatePath` anywhere. A published post is invisible for up
  to five minutes, and IndexNow (1.18) is never pinged.

### 2.3 Documented but never built

`README.md` §Pages lists these as live routes and `scripts/smoke.mjs`
→ `checkReferencePages()` asserts eight of them return 200. Seven directories
exist under `app/` with no `page.js` in them. **All of these fail the smoke
test today.**

| Route | Standard | Phase | Status |
|---|---|---|---|
| `/compare` | 2.01 pillar, 2.08 hub | B1 | directory absent |
| `/tools` · `/tools/[slug]` | 7.11, 7.13, 6.15 | B2 | empty directory |
| `/stats` | 7.12, 5.02 | B3 | empty directory |
| `/authors` · `/authors/[slug]` | 5.01, 8.04 | A3 | empty directory |
| `/about` | 5.06, 5.10 | B4 | empty directory |
| `/methodology` | 5.05, 4.07 | B4 | empty directory |
| `/privacy` · `/terms` | 5.09 | B5 | empty directory |
| `/admin/authors` | 5.01 | A1 | not built |
| `/admin/tools` | 15.06 | B6 | not built |

---

## §3 · Phase 0 — Unblock the build

**Blocks everything.** The five modules are not stubs; their contracts are
already fixed by their call sites. Write them to match.

### 0.1 · `lib/content.js`

One data-access layer for published content, so page files stop writing SQL
inline.

```
publishedPosts()      published posts, newest first, LEFT JOIN authors
postBySlug(slug)      one published post + its author row
allAuthors()          authors with a published-post count
authorBySlug(slug)    one author + their posts
allTools()            tools with the comparisons naming them
toolBySlug(slug)      one tool + its comparisons
```

Every function returns `[]` or `null` on a DB error and logs — matching the
defensive pattern already in `app/sitemap.js` and `app/feed.xml/route.js`. A
database blip must degrade a page, never 500 the site.

### 0.2 · `lib/schema.js` — the entity graph (6.15)

The highest-value module here, and the only structured-data item the standard
credits with real GEO value. One connected `@graph` per page with stable
`@id`s, not three loose blobs.

```
ORG_ID          = `${siteUrl()}/#organization`
SITE_ID         = `${siteUrl()}/#website`
personId(slug)  = `${siteUrl()}/authors/${slug}#person`
toolId(slug)    = `${siteUrl()}/tools/${slug}#software`
pageId(path)    = `${absolute(path)}#webpage`
articleId(path) = `${absolute(path)}#article`

organization()          name, url, logo (12.05), sameAs (12.06, 8.04),
                        foundingDate, contactPoint,
                        publishingPrinciples → /methodology
website()               WebSite + SearchAction (6.05), publisher → ORG_ID
webPage({...})          isPartOf → SITE_ID, about, dateModified
person(author)          Person + sameAs → LinkedIn and other_urls
article({...})          author → personId, publisher → ORG_ID,
                        mainEntityOfPage → pageId
itemList({...})         ItemList for catalogue pages
breadcrumb(trail)       BreadcrumbList
faqPage(faq)            FAQPage — visible pairs only (6.08, C3)
softwareApplication(t)  SoftwareApplication per tool
baseGraph(...nodes)     { '@context', '@graph': [org, site, ...nodes] }
jsonLd(obj)             stringify with < > & escaped for inline <script>
```

`jsonLd()` must escape `<`, `>` and `&` — it is injected via
`dangerouslySetInnerHTML`, and unescaped output is an XSS vector.

**Then migrate `app/compare/[slug]/page.js` onto it.** That page hand-rolls
three separate JSON-LD blocks and declares
`author: { '@type': 'Organization' }` — a byline resolving to an organisation
rather than a person. `scripts/smoke.mjs` already asserts against exactly this
(`author is a Person or a reference`) and would fail on the current markup.

### 0.3 · `lib/meta.js` (15.02, 4.01–4.03)

```
pageMeta({ title, description, path, type, image, robots })
```

Returns a Next.js metadata object with an **absolute** canonical, complete Open
Graph (12.01), a `summary_large_image` Twitter card (12.03), and an absolute OG
image URL (12.02 — relative URLs are the most common silent preview failure).
One helper means a new page cannot ship with half its tags.

It must read the `meta_description` column from **P1.4**, falling back to
`summary` only when that column is null. They are different jobs: `summary` is
a 20–80 word liftable passage (7.01); a meta description is 120–160 characters
of ad copy (4.03). They are sharing one field today, which is what P1.4 was
migrated to fix.

### 0.4 · `lib/prices.js` — the original-data moat (5.02)

The most strategically important module in Phase 0, and the easiest to
under-build.

```
buildPriceTable(posts)  parse the first table of every post; extract
                        { tool, plan, amount, currency, period,
                          verifiedOn, sourceUrl } from "Price from" rows
summarise(rows)         { toolCount, priced, median, cheapest, dearest,
                          spread, lastChecked, unpublishedCount }
```

Parse against the authoring conventions in `README.md` §"Writing a comparison"
and `lib/markdown.js`: strip the `▸` winner glyph and the `§` group marker,
treat `Not published` as a recorded fact rather than a null to skip, and read
`verified:` from front matter with `updated_at` as fallback.

This is what the standard means by information gain. *"The median entry price
across 42 AI sales tools is $X, checked on DATE, with 11 vendors publishing no
price at all"* is a number no competitor has without doing the same work. It
feeds `/stats` (B3) and the homepage ledger, and per 7.12 it should exist
**earlier than feels natural**.

### 0.5 · `lib/mark.js`

`markCard({ size })` returns the shared logo element for `app/apple-icon.js`
and `app/logo.png/route.js`. Reuse the palette in `lib/og.js` — one mark, one
place (12.04, 12.05).

### 0.6 · `middleware.js`

Restore the `/admin/*` edge guard the code comments already assume. Redirect
unauthenticated requests to `/admin/login?next=<path>`, matching the `?next=`
contract `app/admin/login/LoginForm.js` reads. Keep the page-level
`requireAdmin()` calls — defence in depth, and `/api/*` is not covered by the
matcher.

### 0.7 · `lib/publish.js` (1.18)

```
onPublish(slug)   revalidatePath('/'), revalidatePath('/compare'),
                  revalidatePath(`/compare/${slug}`),
                  revalidatePath('/stats'), revalidatePath('/tools'),
                  then pingIndexNow(url)
```

Call it from `app/api/posts/route.js` after any successful write — this is the
purge `P1.6` assumed when it moved the homepage off `force-dynamic`. IndexNow
needs a key file at `/<key>.txt`; add `INDEXNOW_KEY` to `.env.example` and
no-op when unset.

**Exit:** `npm run build` succeeds; `npm run smoke -- <url>` runs to
completion. Reference-page failures are expected until Phases A and B land.

---

## §4 · Phase P1 — Priority fixes

Two of these are already applied. The rest complete the pass.

| ID | Item | Standard | Status |
|---|---|---|---|
| P1.4 | `meta_description` column separate from `summary` | 4.03 | schema done — surfaced in 0.3 and P1.7 |
| P1.6 | Homepage off `force-dynamic` | 10.04 | done |
| P1.7 | `meta_description` field in the admin form, live 120–160 counter, bounded in `validatePost` | 4.03, 15.02 | to build |
| P1.8 | Per-post canonical override, for when a comparison supersedes an older one | 1.09, 1.17 | to build |
| P1.9 | Comparison page moved off `force-dynamic` onto `revalidate` + purge | 10.04 | to build |
| P1.10 | Critical CSS inlined; `app/globals.css` is ~48KB and fully render-blocking | 10.08 | to build |

P1.9 matters more than it looks: `app/compare/[slug]/page.js` is still
`force-dynamic`, which puts an Azure Postgres round trip in front of every
crawler hit on the pages that matter most. P1.6 fixed this for the homepage
only. With 0.7 in place the same treatment is safe here.

---

## §5 · Phase A — Authors and authority (5.01, 8.04)

The `playtheTechAuthors` table and the `author_id` FK are migrated (**A2**) and
nothing uses them. A named author is worth roughly 2.3x in AI citations, and
76.4% of AI-cited content is attributed.

| ID | Item |
|---|---|
| A1 | `/admin/authors` CRUD — name, job title, bio, LinkedIn, other URLs |
| A2 | Authors schema + `author_id` FK — **done** |
| A3 | `/authors` index and `/authors/[slug]` bio pages |
| A4 | `author_id` selector on the post form; free-text `author` kept as fallback so no published post breaks mid-migration |
| A5 | `Person` node with real `sameAs`, linked from every byline via `personId()` |

**The effect concentrates where the name resolves to a real external profile.**
A `Person` node with an empty `sameAs` forfeits most of the value, so the
LinkedIn profile must exist before Phase A counts as done. This is also half of
E1 — author profiles that resolve are named there explicitly.

---

## §6 · Phase B — Entity hubs and the missing pages

Build in this order; each is linked from the one before, so crawl depth stays
≤ 3 (1.15) and nothing is orphaned (1.08).

### B1 · `/compare` — the pillar (2.01, 2.08)

The topic-cluster pillar the standard requires and the site does not have. The
full catalogue with verification dates, `ItemList` schema, linked from the
header nav. Every comparison links back via breadcrumb — which also makes the
existing breadcrumb honest, since it currently prints a non-clickable
"Comparisons" crumb pointing nowhere.

### B2 · `/tools` and `/tools/[slug]` (7.11, 7.13, 6.15)

Per tool: a definition sentence in "X is a…" form (7.04), the vendor link, and
every comparison naming it. These are the cluster pages linking back to the B1
pillar, and the `@id` targets that make `Article → SoftwareApplication` resolve
to one entity rather than a string.

This is also where **7.13** lands — "alternatives to X" intent is served by a
tool hub listing every comparison naming it, without generating a page per
permutation.

**The publish gate, already decided in `README.md`:** a hub renders only when
the tool has a definition and at least two published comparisons; otherwise a
real 404. A page per tool with the name swapped into a template is a doorway
page, and the Phase D near-duplicate gate would flag it anyway. R5.4 applies.

### B3 · `/stats` (7.12, 5.02)

The `lib/prices.js` output as a public, dated, sourced price tracker: median
entry price by category, spread, how many vendors publish nothing, movement
since last check. Every figure carries its check date and a link to the vendor
page.

This is the site's information-gain asset and its most linkable page. Per 7.12,
build it early. Already in the CI Lighthouse URL list.

### B4 · `/about` and `/methodology` (5.05, 5.06, 5.10, 4.07)

`/methodology` uses question-shaped H2s — *How did we choose these tools? Where
do the prices come from? What does "Not published" mean? How often is this
rechecked? Who pays for this?* — each with a 40–60 word answer-first paragraph
(7.01). It becomes `publishingPrinciples` in `Organization` schema and is the
page an answer engine reads to decide whether a figure is trustworthy.

`/about` carries the **canonical brand fact sheet** (5.10): founding year,
headcount, categories covered, publishing cadence, ownership — written once and
repeated *identically* in schema, in `llms.txt`, on LinkedIn and in every
directory. Contradictions across sources make an engine hedge, or cite someone
clearer. Contact as HTML text, never an image (5.07). Must carry the Salezx
ownership statement plainly, as shared ownership, not "affiliated with" (R1.2).

### B5 · `/privacy` and `/terms` (5.09)

Static, honest, short. Cover the localStorage view marker behind
`playtheTechPostViews` — it is not a cookie, and the privacy page should say
what it actually does.

### B6 · `/admin/tools` — tools as entities (15.06)

CRUD for `playtheTechTools`, showing per tool whether it passes the B2 publish
gate. The table is migrated; this is the UI that fills it.

**Exit:** `checkReferencePages()` passes all eight routes.

---

## §7 · Phase C — Answer-ready content

Mostly editorial, made binding by Phase D.

- **C1 · Question-shaped H2s (4.07).** Keep the H1 topical, convert the H2s.
  `CONTENT-GUIDE.md` already says this; the Phase D gate makes it enforceable.
- **C2 · Answer-first paragraph under every question heading (7.01).** 40–60
  words, complete in the first sentence. 44% of LLM citations come from the
  first 30% of the page.
- **C3 · Self-contained passages (7.02).** Name the subject in each section;
  never open with "However"; caption every table. Respect the standard's
  counter-guidance — write coherent pieces whose sections happen to stand
  alone, rather than fragmenting content to target queries.
- **C4 · FAQ block, 6–10 real questions (7.03).** The parser in
  `lib/markdown.js` already handles both `**bold**` and H3 question forms.
  Source the questions from `playtheTechComparisonRequests` — real demand,
  already being collected and currently unused for this.
- **C5 · Definition sentences (7.04).** One per tool hub, "X is a…", early.
  Feeds the `definition` column and the B2 publish gate.
- **C6 · Ranked lists with a justified criterion per entry (7.06).** The roundup
  format needs this; a rank with no stated reason is not liftable.
- **C7 · Quarterly refresh (5.08).** Add a staleness view to `/admin` ordering
  posts by `updated_at` ascending. Pages not refreshed quarterly are ~3x more
  likely to lose citations entirely. Never bump the date without changing the
  content — it is detectable and counterproductive.

---

## §8 · Phase D — Gates, verification, and launch infrastructure

### D1 · `scripts/check.mjs` — the build-time gates (§18, 15.08)

CI calls this, `README.md` documents it, and it does not exist. It crawls every
URL in the sitemap and fails the build on the 22 checks of §18.

**Structure** — missing or duplicate title · zero or multiple H1 · skipped
heading level · meta description outside 120–160 · missing or
non-self-referential canonical · `noindex` outside an allowlist · missing or
invalid `lang` · image without `alt`, `width`, `height`.

**Content** — no visible last-updated date · no named author · comparison
content without a real `<table>` · question heading not answered in ≤ 60 words
(7.01) · word count below the thin-page threshold · a statistic with no source.

**Technical** — broken internal link · orphan page (in sitemap, not linked) ·
invalid JSON-LD · any `Review`/`AggregateRating` markup · missing OG tag or
relative OG image · `robots.txt` missing an AI allow · near-duplicate against
an existing URL.

Lighthouse ≥ 95 is already covered by the CI action; do not duplicate it.

**Write D1 before Phase B ships**, so the new pages cannot regress. The
near-duplicate check in particular is what keeps B2's tool hubs honest.

### D2 · `npm run verify:data`

`DEPLOYMENT.md` §7 documents this in the pipeline and `package.json` has no
such script. Either build it — schema validity, every post has `link_1`/
`link_2`, staleness report — or amend `DEPLOYMENT.md`. A pipeline doc that
lists a step nobody runs is worse than one that does not.

### D3 · Crawler smoke test — **done**

`scripts/smoke.mjs` covers all 11 agents from GitHub's runners, outside Azure,
which is the only place a WAF block shows up. Keep the agent list in sync with
`app/robots.js`; it drifted to eight once already.

### D4 · Azure WAF allowlist — before launch day

**The single highest-value item in the entire plan**, and the one that fails
silently. `DEPLOYMENT.md` §1 and `LAUNCH-CHECKLIST.md` §1 both lead with it.

A custom **allow** rule matching all 11 user agents, sitting **above** the
Azure-managed bot rules. Rate limits exempted or raised — a crawler fetching
200 pages a minute looks like abuse to a default rule. Verified in server logs,
not in config; config that looks correct alongside logs full of 403s is the
common combination.

Blocked means never cited, with nothing in analytics to indicate why.

### D5 · Front Door / CDN, then re-verify D4 (10.04, 10.11)

App Service serves from one region. TTFB caps every other metric and must stay
under 800ms. Adding Front Door is also the most likely single moment to
accidentally block every AI crawler — so D4 is re-run immediately after, every
time.

### D6 · Server logs → Log Analytics (14.08, 8.12)

Promoted to MUST by `DEPLOYMENT.md` §2 — App Service has logs where the earlier
static host did not. The only definitive proof crawlers reach content. Monthly
query grouping requests by user-agent and status code.

### D7 · Canonical host, HSTS, CSP (2.05, 1.02, 1.12, 15.09)

Pick apex or www and enforce with **one** server redirect, no chains. HSTS only
after the redirect is confirmed — it is hard to undo. CSP stays report-only
until the reports are clean, then rename the header.

### D8 · Accessibility pass (§13)

Automated tools catch about a third of real issues. Keyboard and screen-reader
pass on every table specifically — `<th scope>`, `<caption>` and the
non-colour-only winner state are already correct in `lib/markdown.js`; verify
they survive real assistive technology.

---

## §9 · Phase E — Off-site GEO

**Roughly 85% of brand mentions in AI answers originate from third-party
pages.** Everything above makes this site *citable*. Only Phase E makes it
*cited*. Skipping it is the most common reason a technically perfect site is
never named.

### E1 · A resolvable entity — week one (8.04)

Engines resolve names to entities before they answer; an unresolvable name is
dropped from consideration entirely. Cheap, one-time, blocks nothing — which is
exactly why it gets forgotten.

Required: a Wikidata entry, a LinkedIn company page, a Crunchbase entry, author
LinkedIn profiles (Phase A), and consistent `sameAs` across all of them **and**
in `Organization` schema (12.06). Facts identical to the B4 fact sheet.

### E2 · Prompt research — before publishing (3.08)

20–30 prompts per topic across four shapes: discovery, comparison, evaluation,
implementation. AI prompts are longer and more comparative than keywords. This
set is also the measurement instrument for E5 — without it there is nothing to
measure against.

Mine `playtheTechComparisonRequests`: submitted pairs are real demand in the
requester's own words.

### E3 · Baseline before launch (3.12)

Record starting rank, AI share of voice and citation presence **before**
publishing anything. Without a baseline nothing can be proven to have worked.
Allow four to six weeks before drawing conclusions.

### E4 · Third-party presence (8.01, 8.02, 8.03, 8.06)

Round-ups and listicles on other people's domains are the deliverable. Sources
appearing on four or more third-party platforms are ~2.8x more likely to be
cited. Complete profiles on the aggregators that dominate software comparison.
Genuine Reddit and forum participation — manufactured mentions are detected and
the reputational cost dwarfs the gain.

**Constrained by R8.1**: none of this may involve the other three network
sites. No cross-links, no shared footer, no network page.

### E5 · Per-engine tracking, separately (8.08, 8.09, 14.07)

Only ~11% of domains are cited by both ChatGPT and Perplexity; even Google's AI
Overviews and AI Mode share just 13.7% of cited URLs. A single average hides
precisely where you are absent.

Run the E2 prompts weekly, in fresh sessions, across ChatGPT, Perplexity,
Gemini, Claude, Copilot and AI Overviews. Log cited / competitor-cited / not
present, and **archive the full answer text, dated, per engine** — without the
archive you can see visibility move but never why. A spreadsheet is fine; the
discipline is not optional.

### E6 · Hallucination correction loop (8.11)

Engines will state wrong prices and wrong facts. Diff every captured answer
against the B4 fact sheet quarterly, then fix the **upstream** source — usually
a stale third-party listing, rarely this site.

---

## §10 · Phase F — Measurement

| Item | Standard | Action |
|---|---|---|
| Search Console + **Bing Webmaster** | 14.01 | Both. Bing's index feeds Copilot and ChatGPT search; skipping it blinds you to two of five engines. |
| Analytics with consent mode | 14.02 | Must respect the zero third-party budget in `.github/lighthouse-budget.json` — pick something that fits, or raise the budget deliberately. |
| **AI referral channel group** | 14.03 | `chatgpt.com`, `chat.openai.com`, `perplexity.ai`, `gemini.google.com`, `copilot.microsoft.com`, `claude.ai`, `you.com`, `phind.com`. Without it, all of Phase E lands in Direct and reads as having done nothing. |
| AI conversion rate, tracked separately | 14.04 | AI-sourced visitors arrive further along the decision. |
| Rank tracking with AI Overview presence | 14.05 | Position 3 is not what it was where an AI Overview appears. |
| Prompt / answer archive | 14.07 | Same artefact as E5. |
| Uptime, 5xx, certificate-expiry alerting | 14.12 | Managed certs auto-renew; the binding can still break. |
| Staging password-protected | 14.13 | Not merely `noindex`. |

AI research frequently leaves no referrer at all — watch branded search trends
and unexplained direct traffic as proxies. Note R4.2: branded "playtech"
traffic is not ours and should not be counted as a win.

---

## §11 · Sequence

Genuinely sequential. Each phase is expensive to redo once the next sits on it.

```
Phase 0   build unblocked ....... 5 libs, check.mjs, middleware, publish.js
Phase P1  priority fixes ........ metadata fields, CSS, remaining dynamic routes
Phase A   authors ............... A2 schema is done; the pages and admin are not
Phase B   entity hubs + pages ... smoke.mjs goes green
Phase C   content discipline .... ongoing, enforced by D1
Phase D   gates + launch infra .. D1 before B ships; D4 before any public launch
Phase E   off-site GEO .......... E1–E3 start in parallel with Phase 0
Phase F   measurement ........... wired before launch, not after
```

Two orderings inside that are not obvious and matter:

- **D1 comes before Phase B ships.** The gates exist to keep the new pages from
  regressing; written afterwards they only document the damage.
- **E1, E2 and E3 do not depend on the build and should start now.** An entity
  takes weeks to propagate and a baseline is worthless if taken after launch.
  These are the long-lead items in the whole plan.

---

## §12 · Ongoing cadence

| Frequency | Task | Standard |
|---|---|---|
| Every publish | `revalidatePath` + IndexNow ping + sitemap resubmit | 1.18 |
| Weekly | Per-engine probe, 20–30 prompts, archived | 8.08, 14.07 |
| Monthly | 4–6 posts | `CONTENT-GUIDE.md` |
| Monthly | Re-run the crawler smoke test | 1.06 |
| Monthly | Server log review by bot and status code | 14.08 |
| Monthly | Technical re-audit; backlinks new and lost | 14.11, 8.06 |
| **Quarterly** | **Content refresh on decaying pages** | **5.08** |
| Quarterly | Re-verify prices on published posts | R2.1 |
| Quarterly | Hallucination diff against the fact sheet | 8.11 |
| Quarterly | Re-verify the WAF allowlist survived infra changes | 1.06 |
| Annually | Retire dead content, update years in titles | §20 |

The quarterly refresh is the highest-return recurring task here and the one
most likely to lapse. Named owner, calendar commitment, not an intention.

---

## §13 · The judgement no gate can make

Every automated check above can pass on a site that should not exist.

Google's scaled content abuse policy is method-agnostic — it targets pages
produced primarily to manipulate rankings regardless of how they were made, and
the March 2026 core update enforced it hard against templated page sets with no
editorial oversight.

`GUARDRAILS.md` R5.4 states the operative rule: if you cannot name a genuine
difference between two tools, skip the post. A gap in coverage costs nothing. A
run of thin posts is a sitewide demotion.

**A page that cannot say something true and specific that its siblings cannot
should not exist.** Fifty good comparisons beat five hundred thin ones — not as
encouragement, but as a description of how the ranking systems actually work.
