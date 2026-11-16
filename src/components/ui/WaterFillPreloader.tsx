"use client";

import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface WaterFillPreloaderProps {
  progress?: number;
  isLoaded?: boolean;
  onComplete?: () => void;
}

export function WaterFillPreloader({
  progress = 100,
  isLoaded = true,
  onComplete,
}: WaterFillPreloaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [displayProgress, setDisplayProgress] = useState(0);

  // Smoothly interpolate display progress so it takes ~3.5 to 4 seconds 
  // to fill up smoothly.
  useEffect(() => {
    let animationFrameId: number;
    let lastTime = performance.now();

    const updateProgress = (time: number) => {
      const delta = time - lastTime;
      lastTime = time;

      setDisplayProgress(current => {
        if (current >= progress) {
          return progress;
        }
        // 100% over ~3800ms = ~0.026% per ms
        const increment = delta * 0.026;
        return Math.min(current + increment, progress);
      });

      animationFrameId = requestAnimationFrame(updateProgress);
    };

    animationFrameId = requestAnimationFrame(updateProgress);

    return () => cancelAnimationFrame(animationFrameId);
  }, [progress]);

  const hasAnimatedRef = useRef(false);

  useGSAP(() => {
    // Only fade out when the visual progress hits 100 AND loaded
    if (isLoaded && displayProgress >= 100 && !hasAnimatedRef.current) {
      hasAnimatedRef.current = true;
      if (containerRef.current) {
        gsap.to(containerRef.current, {
          opacity: 0,
          duration: 0.8,
          ease: "power3.inOut",
          delay: 0.2, // Small delay for the 100% counter to be seen
          onStart: () => {
            if (containerRef.current) {
              containerRef.current.style.pointerEvents = "none";
            }
          },
          onComplete: () => {
            if (onComplete) onComplete();
          },
        });
      } else {
        if (onComplete) onComplete();
      }
    }
  }, [isLoaded, displayProgress, onComplete]);

  // The wave SVG sits above the red fill. If we set the wave height to 25% of the container,
  // we need the red fill to start at translateY(125%) so the peak of the wave is exactly at the bottom (0% visual fill).
  // At 100% progress, we want translateY(0%) so the red fill completely covers the container.
  const yOffset = 125 - (displayProgress / 100) * 125;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[99999] flex flex-col items-center justify-center w-full h-screen bg-black pointer-events-auto select-none"
    >
      <div className="relative w-full max-w-[800px] px-6 sm:px-12 flex flex-col items-center">
        
        {/* Custom Image Mask Container */}
        <div 
          className="relative w-full h-[100px] sm:h-[150px] md:h-[200px]"
          style={{
            maskImage: `url(/images/AKVORIX_black_text.png)`,
            WebkitMaskImage: `url(/images/AKVORIX_black_text.png)`,
            maskSize: 'contain',
            WebkitMaskSize: 'contain',
            maskPosition: 'center',
            WebkitMaskPosition: 'center',
            maskRepeat: 'no-repeat',
            WebkitMaskRepeat: 'no-repeat',
          }}
        >
          {/* Unfilled Base (Dark Grey) */}
          <div className="absolute inset-0 bg-[#111111]" />

          {/* Water Fill Layer */}
          <div
            className="absolute inset-0 bg-[#E8001D]"
            style={{
              transform: `translateY(${yOffset}%)`,
              // No CSS transition needed, rAF handles smoothness
            }}
          >
            {/* Wave at the top of the fill */}
            <svg 
              className="absolute bottom-full left-0 w-[400%] h-[25%] animate-wave-slide" 
              viewBox="0 0 1600 50" 
              preserveAspectRatio="none"
            >
              <path
                d="M-400,50 Q-300,0 -200,50 T0,50 T200,50 T400,50 T600,50 T800,50 T1000,50 T1200,50 T1400,50 T1600,50 V50 H-400 Z"
                fill="#E8001D"
              />
            </svg>
          </div>
        </div>

        {/* Counter */}
        <div
          className="absolute bottom-[-30px] sm:bottom-[-20px] text-[#FF3347] opacity-80"
          style={{ fontFamily: "var(--font-mono)", fontSize: "14px", fontWeight: "600", letterSpacing: "0.1em" }}
        >
          {Math.floor(displayProgress)}%
        </div>
      </div>
    </div>
  );
}
