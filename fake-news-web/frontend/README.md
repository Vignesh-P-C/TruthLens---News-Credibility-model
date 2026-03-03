# TruthLens — AI News Credibility Detection Frontend

A high-end, animated, 3D interactive Next.js frontend for a Fake News Detection AI system.
Built with Next.js 15 (App Router), TypeScript, Tailwind CSS, Framer Motion, and Three.js.

---

## ✦ Features

- **Aurora Shader Background** — Custom GLSL fragment shader via Three.js, no external service needed
- **Glassmorphism UI** — Frosted glass cards with dynamic glow effects
- **Live API Integration** — Connects to FastAPI backend at `http://127.0.0.1:8000/predict`
- **Animated Results** — Green glow for REAL, red glow + shake for FAKE, animated confidence bar
- **Dropdown Examples** — Load pre-written real/fake news samples instantly
- **Dark/Light Mode** — Smooth animated theme toggle via `next-themes`
- **Fully Responsive** — Mobile-first layout with fluid typography
- **GlowingEffect** — Mouse-tracking radial glow on hover
- **Micro-interactions** — Framer Motion throughout: stagger reveals, float animations, shimmer

---

## ✦ Folder Structure

```
fake-news-detector/
├── app/
│   ├── globals.css          ← CSS variables, Tailwind base, fonts, utilities
│   ├── layout.tsx           ← Root layout with ThemeProvider
│   └── page.tsx             ← Main page composition
├── components/
│   ├── ui/                  ← Reusable shadcn-style primitives (Button, Card, Progress)
│   │   ├── button.tsx       
│   │   ├── card.tsx         
│   │   └── progress.tsx     
│   ├── AuroraBackground.tsx ← Three.js GLSL aurora shader, renders to <canvas>
│   ├── DetectorSection.tsx  ← Main analysis form: textarea, submit, result display
│   ├── DropdownMenu.tsx     ← Animated dropdown: clear / load real / load fake
│   ├── Footer.tsx
│   ├── GlowingEffect.tsx    ← Mouse-tracking radial glow wrapper
│   ├── HeroSection.tsx      ← Full-screen hero with aurora + animated copy
│   ├── LoadingSpinner.tsx   ← Orbital spinner during API call
│   ├── Navbar.tsx           ← Sticky nav with scroll-aware backdrop
│   ├── ResultCard.tsx       ← Animated result: label, confidence, progress bar
│   ├── ThemeProvider.tsx    ← next-themes wrapper
│   └── ThemeToggle.tsx      ← Sun/moon toggle with rotate animation
├── lib/
│   ├── api.ts               ← checkNews() fetch utility + example texts
│   └── utils.ts             ← cn() helper (clsx + tailwind-merge)
├── next.config.js
├── package.json
├── postcss.config.js
├── tailwind.config.ts
└── tsconfig.json
```

### Why `/components/ui`?
Centralizing reusable primitives in `/components/ui` provides:
- **Single source of truth** — style a Button once, use it everywhere
- **Consistency** — enforces design system adherence across all features
- **Easy swap** — replace any primitive without touching feature components
- **Scalability** — mirrors the shadcn/ui pattern used industry-wide

---

## ✦ Setup Instructions

### 1. Prerequisites

- **Node.js** ≥ 18.17  
- **npm** ≥ 9 (or pnpm/yarn)  
- **FastAPI backend** running at `http://127.0.0.1:8000`

### 2. Create the project (if starting fresh)

```bash
npx create-next-app@latest fake-news-detector \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --src-dir=false \
  --import-alias="@/*"
cd fake-news-detector
```

Then copy all files from this repo into the project directory, overwriting where prompted.

### 3. Install dependencies

```bash
npm install \
  framer-motion \
  three \
  @types/three \
  next-themes \
  lucide-react \
  clsx \
  tailwind-merge \
  class-variance-authority \
  @radix-ui/react-slot \
  @radix-ui/react-progress \
  @radix-ui/react-dropdown-menu \
  @splinetool/react-spline \
  @splinetool/runtime
```

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Start the FastAPI backend (separately)

Make sure your FastAPI server is running:

```bash
uvicorn main:app --host 127.0.0.1 --port 8000
```

The frontend will call `POST http://127.0.0.1:8000/predict` with:
```json
{ "text": "..." }
```

And expect:
```json
{ "label": "REAL" | "FAKE", "confidence": 0.94 }
```

---

## ✦ Environment Variables (optional)

To point at a different backend URL, add to `.env.local`:

```
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000
```

Then update `lib/api.ts`:
```ts
const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:8000";
```

---

## ✦ Build for Production

```bash
npm run build
npm run start
```

---

## ✦ Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS 3 |
| Animations | Framer Motion 11 |
| 3D / Shaders | Three.js r170 |
| Theme | next-themes |
| Icons | lucide-react |
| UI Primitives | Radix UI |
| API | FastAPI (Python) |

---

## ✦ CORS Note

If you get a CORS error in the browser, add this to your FastAPI backend:

```python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["POST"],
    allow_headers=["Content-Type"],
)
```
