# Building Bridges — Participant Mock-up

A desktop-first clickable mock-up for the participant side of the Building Bridges mediation MVP.  
Built with **Vite + React + TypeScript + Tailwind**. No backend — uses a local mock API.

## Quick Start (Local)

```bash
# 1) Install deps
npm install

# 2) Run the dev server
npm run dev

# 3) Open the printed URL (usually http://localhost:5173)
```

## Import From GitHub to CodeSandbox

1. Push this folder to a new GitHub repo (e.g., `building-bridges-mockup`).
2. Open https://codesandbox.io/ and choose **Import from GitHub**.
3. Paste your repository URL.
4. It will auto-install and run. If styles are missing, open the terminal and run:
   ```bash
   npm install
   ```

## Deploy (Optional)

- **Vercel:** Import the GitHub repo in Vercel, select the framework preset **Vite**.
- **Netlify:** New site from Git, build command `npm run build`, publish directory `dist/`.

## Project Structure

```
src/
  components/StatusBadge.tsx
  pages/Dashboard.tsx
  pages/SessionView.tsx
  mockApi.ts
  types.ts
  App.tsx
  main.tsx
index.html
tailwind.config.js
postcss.config.js
tsconfig.json
tsconfig.node.json
vite.config.ts
```

## Notes

- Mediator responses are mocked with a small delay to simulate round-trips.
- This is **participant-only**. Admin console and real LLM backends come later.
