<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Aqua 短片

A Next.js 16 site for watching open-licensed short films (Blender Studio) and public-domain NASA footage in a dark UI with a pink-to-coral accent. The interface is in Chinese.

## Commands
- `npm run dev` — dev server
- `npm run check` — lint + typecheck + build

## Layout
- `src/app/page.tsx` renders `AquaGlassApp` from `src/components/aqua/`.
- Films and homepage copy come from Supabase (`videos` and `site_settings` tables, see `supabase/schema.sql`) via `src/components/aqua/content.ts`, which uses the REST API with `SUPABASE_URL` / `SUPABASE_ANON_KEY` and revalidates every 60s.
- `src/components/aqua/videos.ts` is the built-in fallback list and the source for `supabase/seed.sql` (`npm run seed:sql`).
- `src/components/aqua/aqua-glass.css` is scoped to `.aq-root` and defines the design tokens (pink brand scale, surfaces, shadows, radii). Dark is the default theme; `[data-theme="dark"]` holds its overrides. Reuse those variables for new UI.
- Posters live in `public/posters/`; videos and stills stream from Wikimedia Commons.

## Rules
- Every film needs its credit fields filled (`studio`, `license`, `sourcePage`, `posterCredit`).
- Only the public anon key goes in the site's env; never the service_role key.
- Tailwind preflight is intentionally off (`src/app/globals.css`); the page styles its own elements.
