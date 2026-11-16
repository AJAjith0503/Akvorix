"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import {
  recordPageView,
  recordPageDuration,
  recordButtonClick,
  syncBehaviorWithServer,
} from "@/lib/visitorTracker";

export function VisitorBehaviorTracker() {
  const pathname = usePathname();
  const pageEntryTimeRef = useRef<number>(Date.now());
  const currentPathRef = useRef<string>(pathname);

  // 1. Track route changes & dwell time per page
  useEffect(() => {
    const prevPath = currentPathRef.current;
    const now = Date.now();

    // If navigated from a previous path, record duration on previous path
    if (prevPath) {
      const durationSeconds = Math.round((now - pageEntryTimeRef.current) / 1000);
      recordPageDuration(prevPath, durationSeconds);
    }

    // Update refs for new page
    currentPathRef.current = pathname;
    pageEntryTimeRef.current = now;

    // Record visit on new page
    recordPageView(pathname, typeof document !== "undefined" ? document.title : pathname);
  }, [pathname]);

  // 2. Track window beforeunload & visibilitychange (flushes duration and syncs)
  useEffect(() => {
    const handleLeave = () => {
      const durationSeconds = Math.round((Date.now() - pageEntryTimeRef.current) / 1000);
      if (currentPathRef.current) {
        recordPageDuration(currentPathRef.current, durationSeconds);
      }
      syncBehaviorWithServer();
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        handleLeave();
      } else {
        // Returned to tab, reset entry time
        pageEntryTimeRef.current = Date.now();
      }
    };

    window.addEventListener("beforeunload", handleLeave);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener("beforeunload", handleLeave);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  // 3. Track button, link, and interactive element clicks
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const clickable = target.closest("button, a, input[type='submit'], [role='button']");
      if (!clickable) return;

      const element = clickable as HTMLElement;
      const text = (element.innerText || element.getAttribute("aria-label") || (element as HTMLInputElement).value || "").trim().substring(0, 80);
      const targetUrl = element.getAttribute("href") || undefined;
      const elementId = element.id || undefined;
      const elementClass = element.className ? String(element.className).substring(0, 60) : undefined;

      // Filter out internal empty clicks
      if (!text && !targetUrl && !elementId) return;

      recordButtonClick({
        text: text || "Icon/Unnamed Action",
        elementId,
        elementClass,
        targetUrl,
        page: currentPathRef.current || window.location.pathname,
      });
    };

    window.addEventListener("click", handleClick, { capture: true });
    return () => {
      window.removeEventListener("click", handleClick, { capture: true });
    };
  }, []);

  return null; // Headless tracker component
}
