# VA Website

A TanStack Start portfolio site for voice acting work.

## Local Development

```bash
npm install
npm run dev        # http://localhost:3000
```

## Useful Commands

```bash
npm run generate-routes   # Regenerate route tree after adding/removing route files
npm run build             # Production build (node-server preset)
npm run preview           # Preview the production build locally
npm run test              # Run tests
```

## Project Structure

```
src/
  routes/         File-based routes (__root, index, demos, contact)
  components/     Header, Footer, ThemeToggle
  styles.css      Tailwind + design tokens
public/
  demos/          MP3 recordings served statically
  photos/         Headshot and other images
  logos/          Brand assets / favicon
```

## Pushing to GitHub

The repo is initialised locally on `main` with no commits yet. Run:

```bash
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/<your-username>/<your-repo>.git
git push -u origin main
```

## Deploying to Vercel (free tier)

1. Push the repo to GitHub (above).
2. Go to [vercel.com](https://vercel.com) → **Add New Project** → import the repo.
3. Vercel will auto-detect Vite. Leave the build command as `npm run build`.
4. Under **Environment Variables**, add:

   | Name            | Value    |
   |-----------------|----------|
   | `NITRO_PRESET`  | `vercel` |

5. Click **Deploy**. Vercel handles the rest.

Subsequent pushes to `main` will redeploy automatically.

## Notes

- The Web3Forms access key in `src/routes/contact.tsx` is a public submission key — safe to commit.
- The hCaptcha sitekey in the same file is also public — safe to commit.
- No `.env` file is required for the base site.
