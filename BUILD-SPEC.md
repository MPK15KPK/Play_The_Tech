# BUILD-SPEC.md

What to build. Six routes, two tables, one login.

---

## 1 · File layout

```
app/
  layout.js
  globals.css
  page.js                    /            list of published posts
  compare/[slug]/page.js     /compare/x   one comparison
  request/page.js            /request     public request form
  admin/
    login/page.js            /admin/login
    page.js                  /admin       posts + requests
    new/page.js              /admin/new   add / edit
  api/
    login/route.js
    logout/route.js
    posts/route.js
    requests/route.js
  robots.js
  sitemap.js
lib/
  db.js                      pg pool + query helper
  auth.js                    cookie signing + verify
middleware.js                protects /admin/*
schema.sql
```

---

## 2 · Database access

Connection uses `DATABASE_URL` with SSL — Azure Postgres requires it.
Pool max 5 connections; App Service will otherwise exhaust the server's
limit on restarts.

**Every query must quote the table name**, because it was created with mixed
case:

```
"playtheTechCompariosinPosts"
"playtheTechComparisonRequests"
```

Define both as constants in `lib/db.js` so this is written once.

Use parameterised queries throughout (`$1`, `$2`). Never build SQL by string
concatenation, including in the admin — the admin form is still user input.

---

## 3 · Auth

No user table. One set of credentials, in env.

**Login flow**
1. `POST /api/login` with email + password
2. Compare against `ADMIN_EMAIL` / `ADMIN_PASSWORD`
3. On match, set an httpOnly cookie containing a signed token
4. Redirect to `/admin`

**The token** is `base64(payload).base64(hmac)` where payload holds the
email and an expiry timestamp. Sign with `SESSION_SECRET` using HMAC-SHA256
via Web Crypto (`crypto.subtle`), not Node's `crypto` module — the same code
has to run in middleware, which is edge runtime.

**Cookie:** `httpOnly: true`, `secure: true` in production, `sameSite: lax`,
`path: /`, 12-hour expiry.

**Verification** checks the signature first, then the expiry. A wrong
signature and an expired token both fail the same way.

**`middleware.js`** matches `/admin/:path*`, lets `/admin/login` through
unauthenticated, verifies the cookie on everything else, and redirects to
the login page on failure.

**Logout** clears the cookie and redirects to `/`.

### Rules

- Never render an `/admin` link in any public layout, nav, or footer
- `/admin/*` returns `noindex` and is excluded from `sitemap.js` and
  `robots.js`
- Rate-limit `/api/login` — a few attempts per minute per IP. Without it the
  password is brute-forceable and there is nothing else guarding the door.
- On failure return one generic message. Never say whether it was the email
  or the password that was wrong.

---

## 4 · Public pages

### `/` — home

Server component. Query published posts, newest first:

```sql
SELECT slug, title, tool_1, tool_2, summary, updated_at
FROM "playtheTechCompariosinPosts"
WHERE published = TRUE
ORDER BY updated_at DESC
```

Render as a list: title, the two tools, summary line, last-updated date.
No hero, no gradient, no feature cards.

### `/compare/[slug]` — the post

Query one row by slug, published only. 404 for anything else — a real 404
status, not a 200 with an error message on it.

**Section order — do not rearrange:**

```
Breadcrumb: Home › Comparisons › {title}

H1 — {title}
Last updated: {updated_at}   ← directly under the H1, visible
By {author}

{summary}                    ← 40–60 words, answers the question outright

H2 — How do {tool_1} and {tool_2} compare?
{the comparison table}

{content, rendered from Markdown}

H2 — Which should you choose?
{verdict — inside content}

H2 — Frequently asked questions
{inside content}

Sources: {link_1}, {link_2}
```

**The table must be a real `<table>`** with `<thead>`, `<tbody>`, and
`<th scope="col">`. Rendered on the server, present in the raw HTML.

That last point is the one that matters most on this whole page. Most AI
crawlers do not execute JavaScript. If the table is built client-side, it
does not exist as far as they are concerned, and tables are among the most
citable content formats there are. Do not fetch table data in `useEffect`.
Do not mark the page `'use client'`.

Also on this page:
- `<link rel="canonical">` to the absolute URL
- Open Graph tags: title, description, url, type, site_name, image
- `Article` JSON-LD with headline, author, datePublished, dateModified

### `/request` — public request form

Fields: tool 1 (required), tool 2 (required), industry, note, email
(optional).

`POST /api/requests` inserts into `"playtheTechComparisonRequests"` with
`status = 'new'`. Show a plain confirmation on the same page.

Guard it: require all required fields server-side, cap field lengths, and
rate-limit by IP. A public form with no rate limit fills up with spam within
a week.

`/request` is `noindex` — it's a utility page, not content.

---

## 5 · Admin pages

### `/admin` — dashboard

Two lists, nothing else:

- **Posts** — title, published yes/no, updated date, edit link
- **Requests** — the two tools, note, date, and a control to set status

Order requests by `created_at DESC`, filtered to `status = 'new'` by
default.

### `/admin/new` — add or edit

`/admin/new` creates. `/admin/new?id=12` edits.

| Field | Type | Required | Note |
|---|---|---|---|
| Title | text | yes | |
| Slug | text | yes | auto-fill from title, stay editable |
| Type | select | yes | comparison / roundup |
| Tool 1 | text | yes | |
| Tool 2 | text | yes | |
| Website 1 | text | | domain only |
| Website 2 | text | | |
| Link 1 | url | yes | the vendor page you took the facts from |
| Link 2 | url | yes | |
| Summary | textarea | yes | 40–60 words |
| Content | textarea | yes | Markdown |
| Author | text | yes | a real name |
| Published | checkbox | | off by default |

`POST /api/posts` inserts or updates. Enforce on the server, not only in
the browser:

- Slug is unique, lowercase, hyphenated
- `link_1` and `link_2` are valid URLs
- Author is non-empty
- Summary is between 20 and 80 words

**Why those four are required rather than optional:** the links are what
make a price claim checkable, the author is worth roughly a 2x difference in
whether AI engines cite the page, and the summary is the passage most likely
to be lifted into an answer. They cost nothing to enforce now and are
tedious to backfill across 50 posts later.

Editing a post fires the `updated_at` trigger automatically.

---

## 6 · `robots.js`

Allow everything, and name the AI crawlers explicitly:

```
GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, Claude-SearchBot,
PerplexityBot, Google-Extended, Applebot-Extended, CCBot,
Googlebot, Bingbot
```

Disallow `/admin` and `/api`. Reference the sitemap.

Allowing them in `robots.txt` is only half the job — Azure blocks them at a
different layer. See `LAUNCH-CHECKLIST.md` §1.

## 7 · `sitemap.js`

Published posts plus `/`. Use `updated_at` as `lastmod`. Exclude `/admin`,
`/api`, and `/request`.

---

## 8 · Deployment

```
push to main
  → GitHub Actions: npm ci, npm run build
  → deploy to Azure App Service (Linux, Node 20)
  → smoke test against production:
      · curl as ClaudeBot   → expect 200
      · curl as GPTBot      → expect 200
      · curl a post, JS off → the table must be in the HTML
```

App Service needs `npm start` bound to `process.env.PORT`.

Run the smoke test after **every** infrastructure change, not just code
deploys. Someone enabling an Azure security feature months from now, with no
idea it touches SEO, is the realistic way this breaks.

---

## 9 · What is deliberately not built

Not oversights:

- User accounts, signup, roles — one admin, credentials in env
- Comments, ratings, user reviews
- Client-side search or table filtering — a filtered view that only exists
  after JavaScript runs is invisible to every engine this site is built for
- Image uploads — paste image URLs into Markdown for now
- Draft previews, scheduled publishing, revision history
- Separate tools table — tool names are text on the post

The last one is the trade-off worth knowing about: a price appears inside
`content`, so changing it means editing each post that mentions it. Fine at
50 posts. If you pass roughly 300, split tools into their own table then.
