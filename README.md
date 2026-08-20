# playthetech

A comparison site for AI tools and SaaS products. Two tools per post, a
comparison table, a verdict.

Scope is deliberately small: publish a batch of comparisons each month.
Everything below is what's needed for that and nothing more.

## Stack

- **Next.js** (App Router) — server-rendered
- **Azure Postgres** — two tables, see `schema.sql`
- **Azure App Service** — custom domain

## Pages

| Route | Access | What it is |
|---|---|---|
| `/` | Public | List of published comparisons |
| `/compare/[slug]` | Public | A single comparison post |
| `/request` | Public | Form to request a comparison |
| `/admin/login` | Public | Email + password from env |
| `/admin` | Protected | List posts and incoming requests |
| `/admin/new` | Protected | Add or edit a comparison |

Nothing anywhere on the public site links to `/admin`. You reach it by
typing the URL.

## Setup

```bash
# 1. Create the tables
psql "$DATABASE_URL" -f schema.sql

# 2. Configure
cp .env.example .env    # then fill it in

# 3. Run
npm install
npm run dev
```

## Environment

```
DATABASE_URL=postgres://user:pass@server.postgres.database.azure.com:5432/playthetech?sslmode=require
ADMIN_EMAIL=you@example.com
ADMIN_PASSWORD=<long random string>
SESSION_SECRET=<long random string, signs the login cookie>
SITE_URL=https://playthetech.com
```

`ADMIN_EMAIL` and `ADMIN_PASSWORD` are the only credentials that exist.
There is no user table and no signup. Changing `SESSION_SECRET` logs you
out.

## Files

Read in this order.

| File | What it covers |
|---|---|
| `schema.sql` | The two tables — run this first |
| `BUILD-SPEC.md` | What to build: routes, auth, forms, page structure |
| `UI.md` | Locked design tokens, and what makes a site look AI-generated |
| `GUARDRAILS.md` | Editorial rules: sourcing, Salezx disclosure, the network |
| `CONTENT-GUIDE.md` | How to write a comparison that gets read and cited |
| `DEPLOYMENT.md` | Azure specifics — crawler blocking, footprint, headers |
| `LAUNCH-CHECKLIST.md` | Verify before and after going live |
| `UI-REFERENCE.md` | Competitor page structure, for reference only |
| `.env.example` | The five variables |

If you only read two: `BUILD-SPEC.md` to build it, `LAUNCH-CHECKLIST.md` §1
so it doesn't fail silently.

## Read this first

`LAUNCH-CHECKLIST.md` §1. Azure's WAF and bot protection block AI crawlers
by default, and if they're blocked, no amount of good content gets cited by
ChatGPT, Perplexity, or Google's AI answers. It fails silently — the site
looks fine and the citations simply never arrive. It's a five-minute fix and
the single highest-value thing on the list.

## Writing a comparison

The `content` field is Markdown and **must start with the comparison table** —
the page prints the "How do X and Y compare?" heading directly above whatever
comes first. Four conventions are read by `lib/markdown.js`:

| Written | Renders as |
|---|---|
| `▸ $29/mo` in a cell | winning cell — ochre wash, a `▸` glyph, and a "Best in row" label for screen readers |
| `§ Route planning` in the first cell | starts a new row group, with a heavier rule above it |
| `Not published` in a cell | the missing-figure style, in `--flag`. Never leave a cell blank |
| `[^1]` / `[^2]` anywhere | superscript source marks pointing at Link 1 and Link 2 |

Optional front matter at the very top feeds the verification stamp under the
table:

```
---
verified: 2026-08-12
method: documentation
criteria: ops-tools-v1
---
```

Leave `method` out unless the tool was actually used — the stamp omits what it
was not told rather than guessing (GUARDRAILS R2.5).

## Verifying a deploy

```bash
npm run smoke -- https://playthetech.com
```

Checks all eleven AI user-agents get a 200, that `<table>`, `<th scope>`, and
`<caption>` are in the raw HTML, that `/admin` redirects when signed out, that a
missing slug is a real 404, and that no `Review` schema or `/admin` link has
crept onto a public page. Runs automatically after every deploy, from GitHub's
runners — i.e. from outside Azure, which is the only place a WAF rule blocking
crawlers shows up.
