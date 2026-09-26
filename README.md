# CTFarsi

Independent, community-run CTF for Persian-speaking security enthusiasts.

**Live site:** [https://ctfarsi.github.io](https://ctfarsi.github.io)  
**Telegram:** [@CTFarsiIR](https://t.me/CTFarsiIR) · **Bot:** [@CTFarsiBot](https://t.me/CTFarsiBot)

CTFarsi focuses on stable infrastructure, Anti-AI challenge design, transparent GitHub-based registration, and sponsorship that funds prizes (not empty banner ads).

Built by [Rick](https://x.com/m4tinbeigi) and [Erwin](https://x.com/Erwinamm). Visual identity inspired by [Rooted in Iran](https://rootediniran.com/).

---

## Stack

| Piece | Detail |
| --- | --- |
| Framework | Next.js (App Router) with static export |
| UI | React 19, custom CSS, GSAP motion |
| Hosting | GitHub Pages (`out/` artifact via Actions) |
| Registration | GitHub OAuth + Issues workflows |

There is no Node server in production. `next build` writes a static site to `out/`, which GitHub Pages serves.

---

## Quick start

```bash
npm ci
npm run dev        # http://localhost:3000
```

Other scripts:

```bash
npm run build      # static export → out/
npm start          # preview out/ locally (serve)
npm run typecheck
```

Requires **Node 22+**.

---

## Deploy (GitHub Pages)

Push to `main` runs [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml):

1. `npm ci` + `npm run build`
2. Upload `out/` as a Pages artifact
3. Deploy with `actions/deploy-pages`

### One-time Pages setting

Repo → **Settings → Pages → Build and deployment → Source: GitHub Actions**

Do **not** use “Deploy from a branch”. That publishes the Next.js source tree (no `index.html` at the repo root) and the live site 404s.

`public/.nojekyll` is required so Pages does not ignore the `_next/` asset folder.

---

## Project layout

```
app/                 # routes (home, register, authors, sponsors, …)
components/          # UI, landing sections, motion, forms
lib/                 # site config, content, auth, GitHub helpers
public/              # static assets (fonts, images, .nojekyll)
data/                # team registration data
.github/workflows/   # Pages deploy + registration automation
```

Site-wide links, nav, sponsors, and builder credits live in [`lib/site.ts`](lib/site.ts).  
Copy for timeline, FAQ, tracks, and features lives in [`lib/content.ts`](lib/content.ts).

---

## Editing common content

| What | Where |
| --- | --- |
| Sponsors | `lib/site.ts` → `SPONSORS` (+ logos under `public/images/sponsors/`) |
| Builders (footer) | `lib/site.ts` → `BUILDERS` |
| Active challenge authors | `app/authors/page.tsx` |
| Landing / FAQ / rules blurbs | `lib/content.ts` |
| Nav + external links | `lib/site.ts` → `NAV_ITEMS`, `LINKS` |

Flag format: `CTFarsi{...}` · Max team size: **4**.

---

## Related docs

- [Challenge authoring guidelines](CHALLENGE_GUIDELINES.md) (Persian)
- [Sponsorship packages](SPONSORSHIP.md) (Persian)
- Issue templates under [`.github/ISSUE_TEMPLATE/`](.github/ISSUE_TEMPLATE/) for registration and challenge proposals

---

## Contributing

1. Open a PR against `main`, or use Issues for registration / sponsorship / challenge ideas.
2. Keep the site static-export friendly (no server-only APIs in the Pages build).
3. After merge, confirm the **Deploy site to GitHub Pages** workflow succeeded.

Questions and announcements: Telegram [@CTFarsiIR](https://t.me/CTFarsiIR).
