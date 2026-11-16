"use client";

import React, { useState, useEffect, useCallback } from "react";
import { WaterFillPreloader } from "@/components/ui/WaterFillPreloader";
import { preloaderState } from "@/lib/preloaderState";

export function Preloader() {
  const [complete, setComplete] = useState(false);
  const [mounted, setMounted] = useState(false);

  const handleComplete = useCallback(() => {
    preloaderState.markDone();
    setComplete(true);
    document.body.style.overflow = "";
  }, []);

  useEffect(() => {
    setMounted(true);
    if (preloaderState.isDone()) {
      setComplete(true);
    }

    // Safety fallback: ensure scroll is ALWAYS unlocked and preloader dismissed
    // even if animation or GSAP is throttled/stalled (e.g. background tab)
    const safetyTimer = setTimeout(() => {
      if (!preloaderState.isDone()) {
        handleComplete();
      }
    }, 5500);

    return () => clearTimeout(safetyTimer);
  }, [handleComplete]);

  // Lock scroll while preloader is active
  useEffect(() => {
    if (!complete && mounted) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [complete, mounted]);

  // If already completed in this session, do not render
  if (complete) return null;

  return (
    <WaterFillPreloader
      progress={100}
      isLoaded={true}
      onComplete={handleComplete}
    />
  );
}

