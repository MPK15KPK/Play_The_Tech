# LAUNCH-CHECKLIST.md

---

## 1 · Azure will block AI crawlers — fix this first

The highest-value item here, and the one that fails silently.

Azure Front Door WAF, Azure-managed bot-protection rule sets, and default
rate limiting all block AI crawlers. A managed rule that filters
"unrecognised bots" does not distinguish `PerplexityBot` from a scraper.

Blocked means never cited. The site looks fine, traffic looks normal, and
citations from ChatGPT, Perplexity, and Google's AI answers simply never
arrive — with nothing in your analytics to indicate why.

**Do:**

- [ ] Don't enable Azure-managed bot protection without allowlisting first
- [ ] If using Front Door or a WAF, add a custom **allow** rule **above** the
      managed rules, matching these user agents:
      ```
      GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, Claude-SearchBot,
      PerplexityBot, Google-Extended, Applebot-Extended, CCBot,
      Googlebot, Bingbot
      ```
- [ ] Check rate limiting — a crawler fetching 200 pages a minute looks like
      abuse to a default rule. Exempt these agents.
- [ ] Verify in **server logs**, not in config. Config that looks right and
      logs full of 403s is a common combination.
- [ ] Re-verify after every infrastructure change, forever

**Test it:**

```bash
curl -A "ClaudeBot/1.0" -o /dev/null -w "%{http_code}\n" https://playthetech.com/
curl -A "GPTBot/1.0"    -o /dev/null -w "%{http_code}\n" https://playthetech.com/
```

Both must return 200, run from outside Azure.

---

## 2 · The table must be in the raw HTML

```bash
curl -s https://playthetech.com/compare/some-post | grep "<table"
```

If that returns nothing, the page is invisible to most AI crawlers — they do
not execute JavaScript. Server-render the table. No `'use client'` on post
pages, no fetching table data in `useEffect`.

- [ ] Table present in `curl` output
- [ ] Full post content present with JavaScript disabled in the browser

---

## 3 · Before launch

**Database**
- [ ] `schema.sql` run; both tables exist
- [ ] `DATABASE_URL` has `sslmode=require`
- [ ] Connection pool capped (max 5)

**Auth**
- [ ] `ADMIN_PASSWORD` is long and random, not a memorable phrase
- [ ] `SESSION_SECRET` set and different from the password
- [ ] `/admin` redirects to login when logged out
- [ ] `/api/login` is rate-limited
- [ ] Login failures return one generic message
- [ ] **No link to `/admin` anywhere** — check the footer especially

**Pages**
- [ ] Unique title and meta description per post
- [ ] One H1 per page
- [ ] "Last updated" visible under the H1
- [ ] Author name on every post
- [ ] Canonical tag, absolute URL
- [ ] Open Graph tags with an absolute image URL
- [ ] Real 404 status on missing slugs, not a 200
- [ ] `/admin`, `/api`, `/request` are `noindex`

**Infrastructure**
- [ ] Custom domain bound, managed certificate issued
- [ ] HTTP → HTTPS 301
- [ ] www or apex picked, the other 301s to it
- [ ] `robots.txt` reachable, sitemap referenced
- [ ] Diagnostic logs → Log Analytics

---

## 4 · Launch day

- [ ] Google Search Console verified, sitemap submitted
- [ ] **Bing Webmaster Tools verified** — Bing feeds Copilot and ChatGPT
      search, so skipping it costs you visibility into two engines
- [ ] Analytics installed
- [ ] Run the §1 curl tests against production
- [ ] Confirm 3–5 posts are actually published, not drafts

---

## 5 · Monthly

- [ ] Publish 4–6 posts
- [ ] Re-run the crawler curl test
- [ ] Check the requests table and clear anything actionable
- [ ] Spot-check: ask ChatGPT and Perplexity a question one of your posts
      answers, and see whether you're cited

That last one is the only real measure of whether any of this is working.

---

## 6 · Quarterly

- [ ] Re-verify prices on published posts and update them
- [ ] Check certificate expiry and log retention
- [ ] Re-verify the WAF allowlist survived any infrastructure changes
