# Portfolio

A portfolio site built with **Next.js**, **shadcn/ui**, and **React Bits** for the frontend.

## Stack

- **Next.js 15** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **shadcn/ui** – components in `src/components/ui/`
- **React Bits** – copy-paste animated components from [reactbits.dev](https://reactbits.dev)

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Adding React Bits components

[React Bits](https://reactbits.dev) components are used by copying code from the docs (no npm package):

1. **Pick a component** – Browse [reactbits.dev](https://reactbits.dev), open the **Code** tab.
2. **Install dependencies** – Many components use **GSAP**. From the Code tab, copy the install command (e.g. `npm install gsap`) and run it.
3. **Copy the code** – Paste the component into `src/components/` (e.g. `SplitText.tsx`).
4. **Use it** – Import and use in your pages. Example:

```tsx
import SplitText from "@/components/SplitText";

<SplitText
  text="Hello, you!"
  delay={100}
  duration={0.6}
/>
```

The hero uses a simple CSS-only staggered title; you can replace `HeroTitle` with a React Bits **Split Text** (or any component from the site) for richer animations.

## Adding more shadcn components

```bash
npx shadcn@latest add card
npx shadcn@latest add input
```

## Project structure

```
src/
  app/           # App Router pages & layout
  components/    # Header, Footer, HeroTitle, etc.
  components/ui/ # shadcn components
  lib/           # utils (e.g. cn)
```

## Deploy

Build and start:

```bash
npm run build
npm start
```

Or deploy to [Vercel](https://vercel.com) by connecting this repo.
