# 6-Panel Staggered Block Preloader

Here is the exact code and configuration for the cinematic grid-panel (blocks) preloader effect when the page loads, using **GSAP** and **React**.

---

## 1. The React Component Structure

Place this inside your component's `return` statement. It renders 6 full-height panels side-by-side that cover the screen, with a loading percentage text in the center.

```jsx
import React, { useState } from 'react';

// ... inside your component:
const [loadingProgress, setLoadingProgress] = useState(0);
const [isLoaded, setIsLoaded] = useState(false);
const [preloaderComplete, setPreloaderComplete] = useState(false);

return (
  <div className="relative min-h-screen bg-black">
    {/* 6-Panel Staggered Preloader Overlay */}
    {!preloaderComplete && (
      <div className="fixed inset-0 z-[200] flex w-full h-screen pointer-events-none">
        {/* Render 6 equal-width vertical panels */}
        {[...Array(6)].map((_, i) => (
          <div 
            key={i} 
            className="preloader-panel h-full bg-[#1a1a1a] border-r border-[#222]"
            style={{ width: '16.666667%' }}
          />
        ))}
        
        {/* Loading progress text centered on screen */}
        {!isLoaded && (
          <div className="absolute inset-0 flex items-center justify-center text-white z-[10] text-sm font-medium tracking-widest uppercase opacity-50">
            {loadingProgress}%
          </div>
        )}
      </div>
    )}

    {/* Hero Main Content */}
    <div className="hero-content">
      <h1 className="hero-title opacity-0">CREATIVE</h1>
      <p className="hero-subtitle opacity-0">BOLD IDEAS</p>
    </div>
  </div>
);
```

---

## 2. The GSAP Animation Logic

Ensure `gsap` and `@gsap/react` are installed, then set up the timeline within a `useGSAP` hook.

```javascript
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

// ... inside your component:
useGSAP(() => {
  // Lock body scroll while loader is active
  if (!preloaderComplete) {
    document.body.style.overflow = 'hidden';
  }

  // Trigger the animation timeline once assets have finished loading
  if (!isLoaded) return;
  
  const tl = gsap.timeline({
    onComplete: () => {
      setPreloaderComplete(true);
      document.body.style.overflow = ''; // Restore scroll
    }
  });

  // 1. Staggered slide down of the 6 panels
  tl.to('.preloader-panel', {
    yPercent: 100,
    duration: 1.8,
    stagger: 0.12,          // Staggers the animation of each panel by 0.12s
    ease: 'power4.inOut'    // Premium ease curve
  })
  
  // 2. Reveal your hero content elements smoothly as the panels slide away
  .fromTo('.hero-title', 
    { opacity: 0, y: 80 }, 
    { opacity: 1, y: 0, duration: 1, ease: 'power3.out' },
    '-=1' // Starts 1 second before the panel animation completes
  )
  .fromTo('.hero-subtitle', 
    { opacity: 0, y: 80 }, 
    { opacity: 1, y: 0, duration: 1, ease: 'power3.out' },
    '-=0.8'
  );
}, [isLoaded]); // Dependencies ensure this runs when assets load (isLoaded = true)
```

---

## 💡 How It Works

1. **Grid Layout**: The outer container is a fixed `flex` container spanning the entire screen. The 6 panels are sized precisely to `16.666667%` width (`100vw / 6`) so that they seamlessly cover the background.
2. **`yPercent: 100`**: Instead of manipulating height or pixels, GSAP shifts each panel's position vertically by `100%` of its own height. This keeps the animation performance optimal (using hardware-accelerated transforms).
3. **Stagger**: The `stagger: 0.12` parameter runs the translation animation for each subsequent `.preloader-panel` with a small delay, creating the staggered sweeping transition.
4. **Cleanup (`onComplete`)**: When the animation ends, the `setPreloaderComplete(true)` state unmounts the loader elements entirely from the DOM to free up memory and prevent layout blocking.
