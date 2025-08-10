# Building Bridges — Full Mock-up

A desktop-first clickable **full mock-up** for the Building Bridges MVP with:
- Participant dashboard + session flow
- Create new session
- Export transcript (Markdown)
- Admin dashboard (view sessions)
- Admin config (switch mock LLM provider)

No backend — all data is in-memory via `src/mockApi.ts`.

## Run locally

```bash
npm install
npm run dev
# open the printed URL (http://localhost:5173)
```

## Deploy on Replit

Set the run command to:
```sh
npm run dev
```
(Or for a built preview: `npm run build && npm run start`)

## Import to CodeSandbox

- Import from GitHub, or upload the ZIP.
- If styles don’t load, run `npm install` once.

## Update from your existing repo

If you already have the participant mock:
1. Replace the files with this version (or copy new files: `src/components/TopNav.tsx`, `src/pages/admin/*`, `src/utils/download.ts`).
2. Ensure devDependency `@vitejs/plugin-react` exists.
3. Commit & push.

## Notes

- Admin config changes only influence the **mock mediator** prefix.
- All state resets on page refresh (intended for mock).
