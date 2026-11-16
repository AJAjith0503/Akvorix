# 🎬 Leeshark Portfolio — Complete Animation & Effects Reference

> **Stack:** React + Vite + Tailwind CSS + Framer Motion + AOS  
> **Color Palette:** `#ff2a2a` (red), `#0a0a0a` (near-black), `#ffffff` (white)

---

## 📦 Dependencies

```bash
npm install framer-motion aos
```

---

## 📋 Animation Summary Table

| Component | Animation Type | Library |
|-----------|---------------|---------|
| `Preloader` | Slide-up exit + clip-path water fill | Framer Motion |
| `Navbar` | Scroll-aware style + CSS slide-down menu + underline hover | Vanilla CSS + React state |
| `Hero` | AOS fade-up text + bounce scroll indicator + video toggle | AOS + Tailwind |
| `About` | Drop-bounce badge + badge tilt hover + pulse stars + torn SVG divider | AOS Custom + Tailwind |
| `Services` | Scroll-driven SVG path draw + card red activation | Framer Motion |
| `Contact` | Parallax scrollY huge text + hover arrow slide | Framer Motion |
| `Footer` | Giant display text (static) | Tailwind CSS |

---

## 1. 🔴 Preloader — `Preloader.jsx`

**Effects:** Full-screen red splash → water-fill logo → shutter slides up

```jsx
import { motion, AnimatePresence } from 'framer-motion';

// AnimatePresence enables exit animations when isLoading becomes false
<AnimatePresence>
  {isLoading && (
    // 🚪 Whole screen slides UP on exit (like a stage curtain rising)
    <motion.div
      key="preloader"
      initial={{ y: 0 }}
      exit={{ y: "-100%" }}
      transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}   // cubic easing
      className="fixed inset-0 w-full h-screen bg-[#ff2a2a] z-[100000] ..."
    >
      {/* Logo fades/shrinks slightly on exit */}
      <motion.div
        exit={{ opacity: 0, scale: 0.95, y: -20 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        {/* 💧 Water fill effect — clip-path grows from bottom to top */}
        <motion.div
          className="absolute top-0 left-0 text-white overflow-hidden whitespace-nowrap"
          initial={{ clipPath: 'inset(100% 0 0 0)' }}   // fully clipped (hidden)
          animate={{ clipPath: 'inset(0% 0 0 0)' }}      // fully revealed
          transition={{ duration: 1.6, ease: "easeInOut", delay: 0.2 }}
        >
          Leeshark<span className="text-black">.</span>
        </motion.div>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>
```

### How the Water Fill Works
```
clipPath: inset(100% 0 0 0)  →  clips from top, hides everything
clipPath: inset(0%  0 0 0)   →  no clip, fully visible
Animating this over 1.6s = text appears to "fill up" like water rising
```

---

## 2. 🔵 Navbar — `Navbar.jsx`

**Effects:** Scroll-aware bg change + CSS slide-down mobile menu + animated underline

```jsx
// Scroll detection
const [isScrolled, setIsScrolled] = useState(false);
useEffect(() => {
  const handleScroll = () => setIsScrolled(window.scrollY > 50);
  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, []);

// Nav classes change based on scroll + menu state
className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
  isOpen
    ? 'bg-[#ff2a2a] py-4'          // menu open → solid red
    : isScrolled
      ? 'bg-transparent py-4'       // scrolled → slightly compact
      : 'bg-transparent py-6'       // top → tall + fully transparent
}`}
```

### Animated Underline on Nav Links
```jsx
// Each link has an expanding underline on hover (CSS only via Tailwind)
<a className="relative group ...">
  {link}
  <span className="
    absolute -bottom-1 left-0
    w-0 h-0.5 bg-red-500
    transition-all duration-300
    group-hover:w-full            // ← expands from 0 to full width
  "></span>
</a>
```

### Mobile Menu Slide-Down (CSS max-height trick)
```jsx
// No framer-motion here — uses CSS max-height transition for smooth slide
<div className={`transition-all duration-300 overflow-hidden ${
  isOpen
    ? 'max-h-96 py-4 opacity-100'   // expanded
    : 'max-h-0   opacity-0'          // collapsed (hidden)
}`}>
```

---

## 3. 🎬 Hero — `Hero.jsx`

**Effects:** AOS text entrance + bounce scroll arrow + video play/pause toggle

```jsx
// AOS initialized once on mount
useEffect(() => {
  AOS.init({ duration: 1000, once: true, easing: 'ease-out' });
}, []);
```

### AOS Staggered Text Entrance
```jsx
<h1 data-aos="fade-up">                     // fires immediately
<p  data-aos="fade-up" data-aos-delay="200"> // 200ms later
<div data-aos="fade-up" data-aos-delay="400"> // buttons: 400ms later
<div data-aos="zoom-in" data-aos-delay="600"> // play btn: 600ms later
<div data-aos="fade-up" data-aos-delay="800"> // scroll indicator: 800ms later
```

### Scroll Bounce Indicator (Tailwind animate-bounce)
```jsx
<div className="animate-bounce">
  <svg>
    <path d="M19 14l-7 7m0 0l-7-7m7 7V3" /> {/* down arrow */}
  </svg>
</div>
```

### Video Toggle Button (Play/Pause with glow)
```jsx
// Button: glass circle that turns red with glow on hover
className="... group-hover:bg-[#ff2a2a]
  group-hover:shadow-[0_0_40px_rgba(255,42,42,0.6)]
  transition-all duration-500"

// Icon swaps between ▶ and ⏸ based on isPlaying state
{!isPlaying ? <PlayIcon /> : <PauseIcon />}
```

---

## 4. 🪪 About — `About.jsx`

**Effects:** Drop-bounce badge entry + badge tilt/untilt on hover + pulse stars + torn SVG wave

### Custom AOS Animation — `drop-bounce`
Defined in `index.css`:
```css
/* Initial hidden state */
[data-aos="drop-bounce"] {
  opacity: 0;
}

/* Fired when element enters viewport */
[data-aos="drop-bounce"].aos-animate {
  animation: dropBounce 1.2s cubic-bezier(0.28, 0.84, 0.42, 1) forwards;
}

@keyframes dropBounce {
  0%   { transform: translateY(-300px); opacity: 0; }   /* drops in from above */
  50%  { transform: translateY(0);      opacity: 1; }   /* hits ground */
  65%  { transform: translateY(-40px);  opacity: 1; }   /* bounces up */
  80%  { transform: translateY(0);      opacity: 1; }   /* lands again */
  90%  { transform: translateY(-15px);  opacity: 1; }   /* small bounce */
  100% { transform: translateY(0);      opacity: 1; }   /* settles */
}
```

Usage on badge:
```jsx
<div data-aos="drop-bounce" className="relative flex justify-center w-full">
  {/* Badge card */}
</div>
```

### Badge Tilt + Untilt on Hover
```jsx
// Card starts slightly tilted (-3deg), straightens on hover
className="transform -rotate-3 hover:rotate-0 transition-transform duration-500"
```

### Pulsing Decorative Stars
```jsx
// Two star SVGs that pulse at different delays
<div className="animate-pulse">          {/* star 1 — default delay */}
<div className="animate-pulse"
     style={{ animationDelay: '1s' }}>  {/* star 2 — 1s offset */}
```

### Torn Paper SVG Divider (Bottom of About)
```jsx
// SVG wavy path that creates a torn-paper illusion between sections
<svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="fill-white">
  <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,
    82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83
    c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8
    C59.71,118.08,130.83,119.62,189.5,99.8,242.79,81.82,282.88,63.6,321.39,56.44Z">
  </path>
</svg>
```

---

## 5. ⚙️ How We Work (Services) — `Services.jsx`

**Effects:** Scroll-driven SVG line drawing + scroll-activated red card state

### Scroll-Driven Line Drawing Setup
```jsx
const containerRef = useRef(null);

// 1. Track scroll position within section (0 → 1)
const { scrollYProgress } = useScroll({
  target: containerRef,
  offset: ["start center", "end center"]
});

// 2. Smooth it with spring physics to prevent jitter
const pathLength = useSpring(scrollYProgress, {
  stiffness: 60,    // lower = slower response
  damping: 20,      // higher = less oscillation
  restDelta: 0.001
});
```

### SVG Mask Technique — Line Draws Itself
```jsx
<svg viewBox="0 0 1000 1350">

  {/* Layer 1: Ghost line (grey, always visible as guide) */}
  <path d="M 650,200 C 400,300 200,400 300,600 ..."
    stroke="#cbd5e1" strokeDasharray="8 10" />

  {/* Layer 2: Mask that grows with scroll */}
  <mask id="path-mask">
    <motion.path
      d="M 650,200 C 400,300 200,400 300,600 ..."
      stroke="white"
      strokeWidth="20"           // wide enough to cover the dashed line
      style={{ pathLength }}     // ← framer-motion scroll value (0→1)
    />
  </mask>

  {/* Layer 3: The actual dashed black line, clipped by mask */}
  <path d="M 650,200 C 400,300 200,400 300,600 ..."
    stroke="black" strokeDasharray="8 10"
    mask="url(#path-mask)" />     // ← only shows where mask is white

</svg>
```

### Card Activation via `useMotionValueEvent`
```jsx
// Runs on every scroll frame (no re-render cost until isActive changes)
useMotionValueEvent(pathLength, "change", (latest) => {
  const cardRect = ref.current.getBoundingClientRect();
  const containerRect = containerRef.current.getBoundingClientRect();

  const cardTopRelativeToContainer = cardRect.top - containerRect.top;
  const containerHeight = containerRect.height;

  const triggerY = cardTopRelativeToContainer + 50;  // 50px into card
  const lineTipY = latest * containerHeight;          // where the line tip is

  if (lineTipY >= triggerY) setIsActive(true);   // card → red
  else setIsActive(false);                         // card → white (scroll back up)
});
```

### Card Color Transition (White → Red)
```jsx
// Outer card background + shadow
isActive
  ? 'bg-[#ff2a2a] shadow-[0_20px_50px_rgba(255,42,42,0.4)]'
  : 'bg-white shadow-[0_15px_40px_rgba(0,0,0,0.06)]'

// Inner content panel
isActive ? 'bg-red-700/50' : 'bg-[#f4f4f4]'

// Number label
isActive ? 'text-red-200' : 'text-gray-400'

// Title
isActive ? 'text-white' : 'text-gray-900'

// Body text
isActive ? 'text-red-100' : 'text-gray-500'

// All transitions: duration-700 (smooth 700ms color change)
```

### Card Layout — Staggered Positions + Tilt
```
Card 01 (Define) → right side  →  rotate-6
Card 02 (Design) → left side   → -rotate-6
Card 03 (Build)  → right side  →  rotate-3
Card 04 (Launch) → left side   → -rotate-3
```

### SVG Path Coordinates (S-curve winding between cards)
```
M 650,200         Start: top-right (near card 01)
C 400,300         ↘ curve toward center
  200,400         ↙ swing to left
  300,600         Arrival: near card 02 (left side)
C 400,800         ↗ curve back right
  750,750         swing right
  700,950         Arrival: near card 03 (right side)
C 650,1150        ↙ curve back left
  400,1150
  300,1200        Arrival: near card 04 (bottom left)
```

### AOS Entrance Animations Per Card
| Card | AOS Type | Delay |
|------|----------|-------|
| Header | `fade-up` | 0ms |
| 01 Define | `fade-left` | 100ms |
| 02 Design | `fade-right` | 200ms |
| 03 Build | `fade-left` | 300ms |
| 04 Launch | `fade-right` | 400ms |
| End label | `fade-in` | 600ms |

---

## 6. 📬 Contact — `Contact.jsx`

**Effects:** Parallax scrollY on giant "Contact" text + hover arrow slide

### Parallax Background Text
```jsx
const ref = useRef(null);

// Scroll progress of the section (0→1 from entering to leaving viewport)
const { scrollYProgress } = useScroll({
  target: ref,
  offset: ["start end", "end start"]
});

// Map scroll 0→1 to a Y movement: -20% → 30%
// As you scroll down through section, the text drifts downward
const y = useTransform(scrollYProgress, [0, 1], ["-20%", "30%"]);

// Huge stretched text in background
<motion.div style={{ y }} className="absolute top-0 left-0 ... pointer-events-none z-0">
  <h1 className="text-[25vw] font-black uppercase scale-y-[1.6]">
    Contact
  </h1>
</motion.div>
```

### Submit Button — Arrow Slide on Hover
```jsx
<button className="group ...">
  Send
  <svg className="
    transform
    group-hover:translate-x-1    // ← arrow nudges right on hover
    transition-transform
  ">
    <path d="M14 5l7 7m0 0l-7 7m7-7H3" /> {/* → arrow */}
  </svg>
</button>
```

### Form Input Focus Animation (CSS)
```jsx
// Inputs are borderless except for a bottom border that intensifies on focus
className="border-b border-white/40 focus:border-white transition-colors"
// border goes from 40% white opacity → fully white on focus
```

---

## 7. 🔤 Footer — `Footer.jsx`

**Effect:** Giant viewport-width brand name as display type

```jsx
// Full-width brand name fills the footer center
<h2 className="
  text-[18vw] md:text-[16vw]     // scales with viewport width
  leading-none
  font-bold tracking-tighter lowercase
  text-[#f4f4f4]                 // slightly off-white, subtle contrast
  select-none                    // not selectable (decorative)
">
  leeshark
</h2>
```

---

## 🌐 Global CSS — `index.css`

```css
@import "tailwindcss";

@theme {
  /* Float animation token (available as animate-float utility) */
  --animate-float: float 6s ease-in-out infinite;

  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50%       { transform: translateY(-20px); }
  }
}

/* Smooth anchor scrolling */
html { scroll-behavior: smooth; }

body {
  margin: 0; padding: 0;
  background-color: #000;
  color: #fff;
}

/* ── Custom AOS Animation: Drop Bounce ── */
[data-aos="drop-bounce"] { opacity: 0; }

[data-aos="drop-bounce"].aos-animate {
  animation: dropBounce 1.2s cubic-bezier(0.28, 0.84, 0.42, 1) forwards;
}

@keyframes dropBounce {
  0%   { transform: translateY(-300px); opacity: 0; }
  50%  { transform: translateY(0);      opacity: 1; }
  65%  { transform: translateY(-40px);  opacity: 1; }
  80%  { transform: translateY(0);      opacity: 1; }
  90%  { transform: translateY(-15px);  opacity: 1; }
  100% { transform: translateY(0);      opacity: 1; }
}
```

---

## ⚙️ AOS Setup — `Hero.jsx`

AOS is initialized once inside `Hero.jsx`:
```jsx
import AOS from 'aos';
import 'aos/dist/aos.css';

useEffect(() => {
  AOS.init({
    duration: 1000,
    once: true,       // animations only play once (not on scroll back)
    easing: 'ease-out'
  });
}, []);
```

> ⚠️ **Note:** If you want `once: false` so cards re-animate on scroll back, change to `once: false` and re-init in a shared location like `App.jsx`.

---

## 🧠 Key Concepts Quick Reference

| Concept | How It's Done |
|---------|--------------|
| Water fill text | `clipPath: inset(100%→0%)` via framer-motion |
| Screen wipe exit | `motion.div` `exit={{ y: "-100%" }}` + `AnimatePresence` |
| Line draws on scroll | SVG `<mask>` with `motion.path style={{ pathLength }}` |
| Card scroll activation | `useMotionValueEvent` compares line tip Y vs card Y |
| Parallax text | `useTransform(scrollYProgress, [0,1], ["-20%","30%"])` |
| Underline hover | `w-0 group-hover:w-full transition-all` span |
| Mobile menu | `max-h-0 → max-h-96` CSS transition |
| Badge drop-in | Custom `data-aos="drop-bounce"` keyframe |
| Tilt card | `tailwind -rotate-3 hover:rotate-0 transition-transform` |
| Pulsing stars | `animate-pulse` with `animationDelay` offset |
| Scroll bounce arrow | `animate-bounce` tailwind utility |
| Glow on hover | `hover:shadow-[0_0_40px_rgba(255,42,42,0.6)]` |
