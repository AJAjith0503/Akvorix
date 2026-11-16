# React Hero Section (with Custom Hooks)

Here is a complete, working React snippet for your Hero Section that perfectly integrates both of your custom hooks (`useTypewriter` and `useVideoScrubber`). I have also included the source code for both hooks below so you have a complete, self-contained reference.

## 1. HeroSection.tsx

This setup provides an interactive background video that scrubs when the user moves their mouse horizontally, and a typing effect for the main headline.

```tsx
import React, { useRef, useState } from 'react';
import { useTypewriter } from './hooks/useTypewriter';
import { useVideoScrubber } from './hooks/useVideoScrubber';

export default function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [progress, setProgress] = useState(0);

  // 1. Initialize the Typewriter effect for the main headline
  const { displayed: headingText } = useTypewriter({
    text: "Experience the Future",
    speed: 60,
    startDelay: 300,
    active: true
  });

  // 2. Initialize the Video Scrubber for background cursor interaction
  useVideoScrubber(videoRef, {
    onProgressChange: (p) => setProgress(p)
  });

  return (
    <section className="relative w-full h-screen overflow-hidden flex items-center justify-center bg-black text-white">
      
      {/* Interactive Background Video (Controlled by cursor via useVideoScrubber) */}
      <video
        ref={videoRef}
        src="/assets/your-background-video.mp4" /* TODO: Replace with your actual video path */
        className="absolute inset-0 w-full h-full object-cover opacity-50"
        muted
        playsInline
        preload="auto"
      />
      
      {/* Glassmorphism Content Card */}
      <div className="relative z-10 flex flex-col items-center justify-center p-10 bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl max-w-4xl text-center">
        
        {/* Typewriter Heading */}
        <h1 className="text-5xl md:text-7xl font-extrabold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-6 min-h-[1.2em]">
          {headingText}
          <span className="text-white animate-pulse">|</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-300 mb-10 leading-relaxed">
          Move your cursor horizontally to scrub through time. <br/>
          This hero section tracks your interactions in real-time.
        </p>
        
        <button className="px-8 py-4 bg-white text-black text-lg font-semibold rounded-full hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(255,255,255,0.2)] transition-all duration-300">
          Discover More
        </button>

        {/* Subtle Video Progress Bar at the bottom of the card */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-white/10 rounded-b-3xl overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-75 ease-linear"
            style={{ width: `${progress * 100}%` }} 
          />
        </div>

      </div>
    </section>
  );
}
```

---

## 2. hooks/useTypewriter.ts

```typescript
import { useState, useEffect, useRef } from 'react'

interface UseTypewriterOptions {
  text: string
  speed?: number
  startDelay?: number
  active?: boolean
}

export function useTypewriter({
  text,
  speed = 38,
  startDelay = 200,
  active = true,
}: UseTypewriterOptions) {
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)
  const indexRef = useRef(0)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (!active) {
      setDisplayed('')
      setDone(false)
      indexRef.current = 0
      return
    }

    setDisplayed('')
    setDone(false)
    indexRef.current = 0

    const delayTimer = setTimeout(() => {
      const typeNext = () => {
        if (indexRef.current < text.length) {
          indexRef.current++
          setDisplayed(text.slice(0, indexRef.current))
          timerRef.current = setTimeout(typeNext, speed)
        } else {
          setDone(true)
        }
      }
      typeNext()
    }, startDelay)

    return () => {
      clearTimeout(delayTimer)
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [text, speed, startDelay, active])

  return { displayed, done }
}
```

---

## 3. hooks/useVideoScrubber.ts

```typescript
import { useEffect, useRef, useCallback } from 'react'

const SENSITIVITY = 1.8      // Raised: full-screen sweep = ~1.8× video duration delta
const LERP_FACTOR = 0.18     // Smooth but responsive

interface UseVideoScrubberOptions {
  onProgressChange: (progress: number) => void
}

export function useVideoScrubber(
  videoRef: React.RefObject<HTMLVideoElement | null>,
  { onProgressChange }: UseVideoScrubberOptions
) {
  // targetTime always holds the latest desired position
  const targetTimeRef = useRef(0)
  const prevXRef = useRef<number | null>(null)
  const rafRef = useRef<number | null>(null)
  const isRunningRef = useRef(false)
  // Tracks whether we have a pending seek attempt queued after seeking finishes
  const pendingSeekRef = useRef(false)

  const lerp = (a: number, b: number, t: number) => a + (b - a) * t

  const applySeek = useCallback((video: HTMLVideoElement, time: number) => {
    if (video.seeking) {
      // Mark that we have a pending seek; the seeked listener will retry
      pendingSeekRef.current = true
      return
    }
    try {
      if ('fastSeek' in video && typeof video.fastSeek === 'function') {
        video.fastSeek(time)
      } else {
        video.currentTime = time
      }
    } catch {
      // ignore
    }
  }, [])

  const tick = useCallback(() => {
    const video = videoRef.current
    if (!video || !isRunningRef.current) return

    const duration = video.duration || 1
    const currentTime = video.currentTime
    const target = targetTimeRef.current
    const diff = Math.abs(target - currentTime)

    if (diff > 0.005) {
      const next = lerp(currentTime, target, LERP_FACTOR)
      applySeek(video, next)
    }

    const safeTime = Math.max(0, Math.min(video.currentTime, duration))
    onProgressChange(safeTime / duration)

    rafRef.current = requestAnimationFrame(tick)
  }, [videoRef, onProgressChange, applySeek])

  // When a seek finishes, immediately apply the latest targetTime
  // if there was a pending update dropped during the last seek
  const handleSeeked = useCallback(() => {
    const video = videoRef.current
    if (!video || !pendingSeekRef.current) return
    pendingSeekRef.current = false
    const target = targetTimeRef.current
    if (Math.abs(video.currentTime - target) > 0.005) {
      applySeek(video, lerp(video.currentTime, target, LERP_FACTOR))
    }
  }, [videoRef, applySeek])

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const video = videoRef.current
    if (!video || !video.duration) return

    const currentX = e.clientX

    if (prevXRef.current !== null) {
      const deltaX = currentX - prevXRef.current
      const timeOffset = (deltaX / window.innerWidth) * SENSITIVITY * video.duration
      targetTimeRef.current = Math.max(
        0,
        Math.min(video.duration, targetTimeRef.current + timeOffset)
      )
    }
    prevXRef.current = currentX
  }, [videoRef])

  useEffect(() => {
    isRunningRef.current = true
    rafRef.current = requestAnimationFrame(tick)

    const video = videoRef.current
    if (video) {
      video.addEventListener('seeked', handleSeeked)
    }
    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      isRunningRef.current = false
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
      if (video) video.removeEventListener('seeked', handleSeeked)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [tick, handleMouseMove, handleSeeked, videoRef])
}
```
