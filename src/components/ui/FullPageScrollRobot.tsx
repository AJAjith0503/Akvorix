"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";

interface Point {
  x: number;
  y: number;
}

/**
 * Helper to append a cubic bezier between point A and point B with vertical tangents.
 */
function appendVerticalBezier(p1: Point, p2: Point): string {
  const dy = p2.y - p1.y;
  const cp1x = p1.x;
  const cp1y = p1.y + dy * 0.5;
  const cp2x = p2.x;
  const cp2y = p2.y - dy * 0.5;
  return ` C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)}, ${cp2x.toFixed(1)} ${cp2y.toFixed(1)}, ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`;
}

/**
 * Helper to append exact cubic bezier curve.
 */
function appendExactBezier(cp1: Point, cp2: Point, end: Point): string {
  return ` C ${cp1.x.toFixed(1)} ${cp1.y.toFixed(1)}, ${cp2.x.toFixed(1)} ${cp2.y.toFixed(1)}, ${end.x.toFixed(1)} ${end.y.toFixed(1)}`;
}

/**
 * Fast binary search on SVG path to find the exact point and arc-distance
 * matching a target Y coordinate.
 */
function getPointAtY(
  pathEl: SVGPathElement,
  targetY: number,
  totalLength: number
): { pt: DOMPoint; dist: number } {
  let low = 0;
  let high = totalLength;
  let bestDist = 0;
  let bestPt = pathEl.getPointAtLength(0);

  for (let i = 0; i < 20; i++) {
    const mid = (low + high) * 0.5;
    const pt = pathEl.getPointAtLength(mid);
    bestDist = mid;
    bestPt = pt;
    if (Math.abs(pt.y - targetY) < 1) break;
    if (pt.y < targetY) {
      low = mid;
    } else {
      high = mid;
    }
  }
  return { pt: bestPt, dist: bestDist };
}

export function FullPageScrollRobot() {
  const containerRef = useRef<HTMLDivElement>(null);
  const measurePathRef = useRef<SVGPathElement>(null);
  const maskPathRef = useRef<SVGPathElement>(null);
  const robotRef = useRef<HTMLDivElement>(null);
  const rafIdRef = useRef<number | null>(null);

  // Smooth interpolation state for buttery 60fps/120fps motion
  const currentScrollYRef = useRef(0);
  const targetScrollYRef = useRef(0);
  const currentLeanRef = useRef(0);

  const [mounted, setMounted] = useState(false);
  const [docHeight, setDocHeight] = useState(0);
  const [docWidth, setDocWidth] = useState(0);
  const [pathD, setPathD] = useState("");
  const [milestones, setMilestones] = useState<Point[]>([]);
  const [totalPathLength, setTotalPathLength] = useState(0);
  const [visibleSections, setVisibleSections] = useState<{
    workflow: { top: number; height: number };
    process: { top: number; height: number };
  }>({
    workflow: { top: 0, height: 0 },
    process: { top: 0, height: 0 },
  });

  // Calculate continuous path across all sections, tailored specifically for Desktop vs Mobile
  const computeWaypoints = useCallback(() => {
    if (typeof window === "undefined") return;

    const vw = window.innerWidth;
    const vh = window.innerHeight;

    const isMobile = vw < 821;
    const midX = vw * 0.5; // EXACT HORIZONTAL MIDDLE OF THE PAGE

    // Helper to get element's absolute page center (X, Y)
    const getElPos = (selector: string) => {
      const el = document.querySelector(selector);
      if (!el) return null;
      const rect = el.getBoundingClientRect();
      // Ignore hidden/unrendered elements (width or height === 0)
      if (rect.width === 0 || rect.height === 0) return null;
      const scrollY = window.scrollY || window.pageYOffset || 0;
      return {
        x: rect.left + rect.width / 2,
        y: rect.top + scrollY + rect.height / 2,
        left: rect.left,
        top: rect.top + scrollY,
        bottom: rect.top + scrollY + rect.height,
        width: rect.width,
        height: rect.height,
      };
    };

    // 1. Hero start anchor: On mobile, explicitly anchor in the middle of the 4 boxes (#robot-scroll-start-mobile)
    const heroAnchor = isMobile
      ? getElPos("#robot-scroll-start-mobile") || getElPos("#robot-scroll-start")
      : getElPos("#robot-scroll-start") || getElPos("#robot-scroll-start-mobile");
    const startX = heroAnchor ? heroAnchor.x : isMobile ? midX : vw * 0.72;
    const startY = heroAnchor
      ? heroAnchor.y
      : isMobile
        ? Math.max(280, vh * 0.38)
        : Math.min(380, vh * 0.45);

    // Measure key landmark sections
    const problemSec = getElPos('section[aria-labelledby="problem-heading"]');
    const servicesSec = getElPos('section[aria-labelledby="services-heading"]');
    const workflowSec = getElPos('section[aria-labelledby="workflow-heading"]');
    const wfTimeline = getElPos("#workflow-timeline");
    const processSec = getElPos('section[aria-labelledby="process-heading"]');
    const prTimeline = getElPos("#process-timeline");
    const faqSec = getElPos('section[aria-labelledby="faq-heading"]');
    const ctaSec = getElPos('section[aria-labelledby="cta-heading"]');

    // Section vertical positions
    const pTop = problemSec?.top ?? vh * 1.05;
    const pH = problemSec?.height ?? vh * 0.8;
    const sTop = servicesSec?.top ?? pTop + pH;
    const sH = servicesSec?.height ?? vh * 1.0;
    const wTop = workflowSec?.top ?? sTop + sH;
    const wH = workflowSec?.height ?? vh * 2.0;
    const prTop = processSec?.top ?? wTop + wH;
    const prSecH = processSec?.height ?? vh * 1.4;
    const fTop = faqSec?.top ?? prTop + prSecH;
    const fH = faqSec?.height ?? vh * 0.7;
    const cTop = ctaSec?.top ?? fTop + fH;

    // 2. Footer logo end anchor
    const footerLogo = getElPos("#footer-logo-anchor");
    const footerSec = getElPos("footer");
    const footerTop = footerSec ? footerSec.top : cTop + 600;
    const endX = footerLogo ? footerLogo.x : isMobile ? vw * 0.35 : vw * 0.14;
    // Mobile: perched cleanly above the footer logo; Desktop: shift 80px up for visual balance
    const endY = footerLogo
      ? isMobile
        ? footerLogo.y - 52
        : footerLogo.y - 80
      : isMobile
        ? footerTop + 270
        : footerTop + 180;

    // Timeline anchors inside ProcessPreview (viewBox: 0 0 1000 1350)
    const prLeft = prTimeline ? prTimeline.left : (vw - Math.min(vw - 32, 1000)) / 2;
    const prTopPos = prTimeline ? prTimeline.top : prTop + 240;
    const prW = prTimeline ? prTimeline.width : Math.min(vw - 32, 1000);
    const prH = prTimeline ? prTimeline.height : 1350;

    const toPr = (x: number, y: number): Point => ({
      x: isMobile ? prLeft + 18 : prLeft + (x / 1000) * prW,
      y: prTopPos + (y / 1350) * prH,
    });

    let d = `M ${startX.toFixed(1)} ${startY.toFixed(1)}`;
    const milestonePoints: Point[] = [{ x: startX, y: startY }];

    if (isMobile) {
      // ══════════════════════════════════════════════════════════════════════════
      // MOBILE FLOW: Specific, playful weaving through mobile cards as drawn
      // ══════════════════════════════════════════════════════════════════════════
      const amp = Math.min(48, vw * 0.16);

      // 1. Hero transition into center
      const pHeroCenter = { x: midX, y: startY + 160 };

      // 2. Problem section: Active weave across stacked problem cards
      const pProb1 = { x: midX + amp * 0.9, y: Math.max(pHeroCenter.y + 80, pTop + pH * 0.25) };
      const pProb2 = { x: midX - amp * 0.9, y: Math.max(pProb1.y + 80, pTop + pH * 0.50) };
      const pProb3 = { x: midX + amp * 0.85, y: Math.max(pProb2.y + 80, pTop + pH * 0.75) };
      const pProb4 = { x: midX - amp * 0.6, y: Math.max(pProb3.y + 80, pTop + pH * 0.92) };

      // 3. Services section: Active weave across stacked service cards
      const pServ1 = { x: midX + amp * 0.95, y: Math.max(pProb4.y + 80, sTop + sH * 0.20) };
      const pServ2 = { x: midX - amp * 0.95, y: Math.max(pServ1.y + 80, sTop + sH * 0.40) };
      const pServ3 = { x: midX + amp * 0.9, y: Math.max(pServ2.y + 80, sTop + sH * 0.60) };
      const pServ4 = { x: midX - amp * 0.7, y: Math.max(pServ3.y + 80, sTop + sH * 0.82) };

      // 4. Workflow section: Top-right to bottom-left flow framing mobile video showcase
      // Keeps the video player center unobstructed so viewers can watch clearly without the robot covering the video
      const wfLeftPos = wfTimeline ? wfTimeline.left : 16;
      const wfW = wfTimeline ? wfTimeline.width : vw - 32;
      const wfRightPos = wfLeftPos + wfW;
      const wfTopPos = wfTimeline ? wfTimeline.top : wTop + 180;
      const wfH = wfTimeline ? wfTimeline.height : Math.min(wfW * 0.5625 + 64, 400);
      const wfBottomPos = wfTopPos + wfH;

      const clampMobileX = (val: number) => Math.max(28, Math.min(vw - 28, val));

      // Top-right corner of the mobile video
      const pWfTopRight = {
        x: clampMobileX(wfRightPos - 8),
        y: Math.max(pServ4.y + 70, wfTopPos + 24),
      };

      // Right flank of mobile video
      const pWfMidRight = {
        x: clampMobileX(wfRightPos - 6),
        y: Math.max(pWfTopRight.y + 80, wfTopPos + wfH * 0.52),
      };

      // Bottom-right of mobile video
      const pWfBottomRight = {
        x: clampMobileX(wfRightPos - 12),
        y: Math.max(pWfMidRight.y + 80, wfBottomPos - 10),
      };

      // Sweeping underneath to middle of mobile website
      const pWfBottomMiddle = {
        x: midX,
        y: Math.max(pWfBottomRight.y + 40, wfBottomPos + 30),
      };

      // 5. Approach curve directly into Process left rail (x = prLeft + 18)
      const prFirstIcon = getElPos("#process-step-icon-0");
      const prLastIcon = getElPos("#process-step-icon-3");
      const pPrApproach = {
        x: prLeft + 18,
        y: Math.max(pWfBottomMiddle.y + 60, prTopPos + 30),
      };
      const prStep1 = {
        x: prLeft + 18,
        y: prFirstIcon ? Math.max(pPrApproach.y + 40, prFirstIcon.y) : Math.max(pPrApproach.y + 60, prTopPos + (150 / 1350) * prH),
      };
      const prStep4 = {
        x: prLeft + 18,
        y: prLastIcon ? Math.max(prStep1.y + 200, prLastIcon.y) : Math.max(prStep1.y + 350, prTopPos + (1280 / 1350) * prH),
      };

      // 7. Exit Process into FAQ & CTA
      const pFaq1 = { x: midX + amp * 0.5, y: Math.max(prStep4.y + 120, fTop + fH * 0.45) };
      const pFaq2 = { x: midX - amp * 0.4, y: Math.max(pFaq1.y + 80, fTop + fH * 0.85) };
      const pCta = { x: midX, y: Math.min(endY - 60, Math.max(pFaq2.y + 80, cTop + 80)) };

      // 8. Footer logo destination
      const pFooter = { x: endX, y: endY };

      // Assemble mobile path
      d += appendVerticalBezier({ x: startX, y: startY }, pHeroCenter);
      d += appendVerticalBezier(pHeroCenter, pProb1);
      d += appendVerticalBezier(pProb1, pProb2);
      d += appendVerticalBezier(pProb2, pProb3);
      d += appendVerticalBezier(pProb3, pProb4);
      d += appendVerticalBezier(pProb4, pServ1);
      d += appendVerticalBezier(pServ1, pServ2);
      d += appendVerticalBezier(pServ2, pServ3);
      d += appendVerticalBezier(pServ3, pServ4);
      d += appendVerticalBezier(pServ4, pWfTopRight);
      d += appendVerticalBezier(pWfTopRight, pWfMidRight);
      d += appendVerticalBezier(pWfMidRight, pWfBottomRight);
      d += appendVerticalBezier(pWfBottomRight, pWfBottomMiddle);
      d += appendVerticalBezier(pWfBottomMiddle, pPrApproach);
      d += appendVerticalBezier(pPrApproach, prStep1);
      d += ` L ${prStep4.x.toFixed(1)} ${prStep4.y.toFixed(1)}`;
      d += appendVerticalBezier(prStep4, pFaq1);
      d += appendVerticalBezier(pFaq1, pFaq2);
      d += appendVerticalBezier(pFaq2, pCta);
      d += appendVerticalBezier(pCta, pFooter);

      milestonePoints.push(
        pProb1, pProb2, pProb3, pProb4,
        pServ1, pServ2, pServ3, pServ4,
        prStep1, prStep4,
        pFaq1, pFaq2, pCta, pFooter
      );

      setVisibleSections({
        workflow: {
          top: 0,
          height: 0,
        },
        process: {
          top: prStep1.y - 2,
          height: Math.max(0, prStep4.y - prStep1.y + 4),
        },
      });

    } else {
      // ══════════════════════════════════════════════════════════════════════════
      // LAPTOP / DESKTOP FLOW: The approved desktop flow (100% UNTOUCHED)
      // ══════════════════════════════════════════════════════════════════════════
      const amp = 44;

      // 1. Hero transition into the center spine of the page
      const pHeroCenter = { x: midX, y: startY + 220 };
      d += appendVerticalBezier({ x: startX, y: startY }, pHeroCenter);

      // 2. Problem section (gentle wave in center)
      const pProblem1 = { x: midX - amp * 0.75, y: pTop + pH * 0.35 };
      const pProblem2 = { x: midX + amp * 0.65, y: pTop + pH * 0.75 };
      d += appendVerticalBezier(pHeroCenter, pProblem1);
      d += appendVerticalBezier(pProblem1, pProblem2);
      milestonePoints.push(pProblem1, pProblem2);

      // 3. Services section (gentle wave in center)
      const pServices1 = { x: midX - amp * 0.7, y: sTop + sH * 0.3 };
      const pServices2 = { x: midX + amp * 0.45, y: sTop + sH * 0.65 };
      d += appendVerticalBezier(pProblem2, pServices1);
      d += appendVerticalBezier(pServices1, pServices2);
      milestonePoints.push(pServices1, pServices2);

      // 4. Workflow section: Dynamic path sweeping from TOP-RIGHT of video to BOTTOM-LEFT of video
      // Keeps the video player center completely unobstructed so people can clearly see the video without the robot in the middle
      const wfLeftPos = wfTimeline ? wfTimeline.left : (vw - Math.min(vw - 32, 1024)) / 2;
      const wfTopPos = wfTimeline ? wfTimeline.top : wTop + 220;
      const wfW = wfTimeline ? wfTimeline.width : Math.min(vw - 32, 1024);
      const wfH = wfTimeline ? wfTimeline.height : Math.min(wfW * 0.5625 + 64, 680);
      const wfRightPos = wfLeftPos + wfW;
      const wfBottomPos = wfTopPos + wfH;

      // Approach heading into the top-right of the video showcase
      const pWfApproach = {
        x: Math.min(vw - 52, wfRightPos + 26),
        y: Math.max(pServices2.y + 100, wfTopPos - 30),
      };

      // Top-right corner of video showcase
      const pWfTopRight = {
        x: Math.min(vw - 44, wfRightPos + 34),
        y: Math.max(pWfApproach.y + 60, wfTopPos + 40),
      };

      // Gliding down the right flank of the video (completely outside the video player)
      const pWfMidRight = {
        x: Math.min(vw - 40, wfRightPos + 38),
        y: Math.max(pWfTopRight.y + 120, wfTopPos + wfH * 0.52),
      };

      // Rounding the bottom-right corner of the video
      const pWfBottomRight = {
        x: Math.min(vw - 50, wfRightPos + 18),
        y: Math.max(pWfMidRight.y + 120, wfBottomPos - 10),
      };

      // Sweeping underneath the video showcase into the exact MIDDLE of the website
      const pWfBottomMiddle = {
        x: midX,
        y: Math.max(pWfBottomRight.y + 40, wfBottomPos + 36),
      };

      d += appendVerticalBezier(pServices2, pWfApproach);
      d += appendVerticalBezier(pWfApproach, pWfTopRight);
      d += appendVerticalBezier(pWfTopRight, pWfMidRight);
      d += appendVerticalBezier(pWfMidRight, pWfBottomRight);
      d += appendVerticalBezier(pWfBottomRight, pWfBottomMiddle);

      // 5. Smooth transition curve connecting directly to ProcessPreview Step 1 (cx=700, cy=150)
      const prStep1 = toPr(700, 150);
      const pPrApproach = {
        x: midX + (prStep1.x - midX) * 0.45,
        y: Math.max(pWfBottomMiddle.y + 80, (pWfBottomMiddle.y + prStep1.y) * 0.5),
      };
      d += appendVerticalBezier(pWfBottomMiddle, pPrApproach);
      d += appendVerticalBezier(pPrApproach, prStep1);

      // 8. Process Section Steps 1 through 4 (single continuous line)
      // Step 1 -> Step 2
      d += appendExactBezier(toPr(520, 280), toPr(300, 320), toPr(300, 500));
      // Step 2 -> Step 3
      d += appendExactBezier(toPr(300, 680), toPr(720, 710), toPr(700, 890));
      // Step 3 -> Step 4
      d += appendExactBezier(toPr(680, 1070), toPr(300, 1100), toPr(300, 1280));
      const prStep4 = toPr(300, 1280);

      // 9. Smooth exit curve from Step 4 into FAQ
      const pFaq1 = { x: midX + amp * 0.35, y: fTop + fH * 0.45 };
      const pFaq2 = { x: midX, y: fTop + fH * 0.85 };
      d += appendVerticalBezier(prStep4, pFaq1);
      d += appendVerticalBezier(pFaq1, pFaq2);
      milestonePoints.push(pFaq1, pFaq2);

      // 10. CTA section (middle)
      const pCta = { x: midX, y: Math.min(endY - 60, cTop + 100) };
      d += appendVerticalBezier(pFaq2, pCta);
      milestonePoints.push(pCta);

      // 11. Footer logo destination
      const pFooter = { x: endX, y: endY };
      d += appendVerticalBezier(pCta, pFooter);
      milestonePoints.push(pFooter);

      const prStart = toPr(700, 150);
      const prEnd = toPr(300, 1280);

      setVisibleSections({
        workflow: {
          top: 0,
          height: 0,
        },
        process: {
          top: prStart.y - 2,
          height: Math.max(0, prEnd.y - prStart.y + 4),
        },
      });
    }

    // Cap robot container height to the footer bottom so it never inflates scroll height.
    // We measure footer bottom BEFORE changing docHeight to avoid circular ResizeObserver loops.
    const footerEl = document.querySelector("footer");
    const footerBottom = footerEl
      ? footerEl.getBoundingClientRect().bottom + (window.scrollY || 0)
      : endY + 200;
    const maxRobotHeight = Math.min(Math.ceil(endY + 100), Math.ceil(footerBottom));
    setDocWidth(vw);
    setDocHeight(maxRobotHeight);

    setPathD(d);
    setMilestones(milestonePoints);
  }, []);

  // Update total path length when path changes
  useEffect(() => {
    if (measurePathRef.current) {
      setTotalPathLength(measurePathRef.current.getTotalLength());
    }
  }, [pathD]);

  // Set up listeners for resize and DOM updates
  useEffect(() => {
    setMounted(true);

    const initialScroll = window.scrollY || window.pageYOffset || 0;
    currentScrollYRef.current = initialScroll;
    targetScrollYRef.current = initialScroll;

    // Early timers: compute rough layout before preloader finishes
    const timer1 = setTimeout(computeWaypoints, 100);
    const timer2 = setTimeout(computeWaypoints, 600);
    const timer3 = setTimeout(computeWaypoints, 1700);

    // Post-preloader timers: recompute once scroll is unlocked and layout is stable.
    // The preloader takes ~4800ms (3800ms fill + 1000ms GSAP fade).
    // We fire at 5000ms and 6200ms as reliable fallbacks.
    const timer4 = setTimeout(computeWaypoints, 5000);
    const timer5 = setTimeout(computeWaypoints, 6200);

    // Preferred path: listen for the preloader-complete custom event which fires
    // exactly when the preloader fades out and body overflow is restored.
    const onPreloaderComplete = () => {
      // Small delay to let layout settle after overflow is re-enabled
      setTimeout(computeWaypoints, 80);
      setTimeout(computeWaypoints, 400);
    };
    window.addEventListener("preloader-complete", onPreloaderComplete);

    window.addEventListener("resize", computeWaypoints);

    // ResizeObserver with debounce guard: prevents infinite loop when the robot
    // container's own height change re-triggers a resize on document.body.
    let resizeTimer: ReturnType<typeof setTimeout> | null = null;
    let lastBodyScrollHeight = document.body.scrollHeight;
    const observer = new ResizeObserver(() => {
      // Only recompute if the page content height actually changed (not just robot div),
      // and debounce rapid fire calls to avoid looping.
      const newH = document.body.scrollHeight;
      if (Math.abs(newH - lastBodyScrollHeight) > 20) {
        lastBodyScrollHeight = newH;
        if (resizeTimer) clearTimeout(resizeTimer);
        resizeTimer = setTimeout(computeWaypoints, 150);
      }
    });
    observer.observe(document.body);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      clearTimeout(timer5);
      if (resizeTimer) clearTimeout(resizeTimer);
      window.removeEventListener("preloader-complete", onPreloaderComplete);
      window.removeEventListener("resize", computeWaypoints);
      observer.disconnect();
    };
  }, [computeWaypoints]);

  // Frame update function: renders robot and active line at smoothed scroll position
  const updateFrame = useCallback(
    (smoothedScrollY: number) => {
      const pathEl = measurePathRef.current;
      const maskEl = maskPathRef.current;
      const robotEl = robotRef.current;
      if (!pathEl || !robotEl) return;

      const totalLen = totalPathLength || pathEl.getTotalLength();
      if (totalLen <= 0) return;

      const startPt = pathEl.getPointAtLength(0);
      const endPt = pathEl.getPointAtLength(totalLen);
      const startY = startPt.y;
      const endY = endPt.y;

      const vh = window.innerHeight;

      // Smooth vertical centering:
      // When scrollY=0, robot is at hero anchor startY.
      // As user scrolls, robot smoothly transitions to exact vertical middle of viewport (vh * 0.5).
      const baseIdealY = smoothedScrollY + vh * 0.5;
      const topBlend = Math.min(1, Math.max(0, smoothedScrollY / Math.max(1, vh * 0.5)));
      const targetY = Math.max(startY, Math.min(endY, startY + (baseIdealY - startY) * topBlend));

      // Find the exact point and path distance matching targetY
      const { pt, dist } = getPointAtY(pathEl, targetY, totalLen);

      // Tangent angle for smooth tilting
      const delta = 8;
      const nextDist = Math.min(totalLen, dist + delta);
      const nextPt = pathEl.getPointAtLength(nextDist);
      const dx = nextPt.x - pt.x;
      const dy = nextPt.y - pt.y;

      // Responsive tilt limits: gentle on mobile, full expression on desktop
      const isMobile = window.innerWidth < 821;
      const maxLean = isMobile ? 8 : 13;
      const targetLean = Math.max(-maxLean, Math.min(maxLean, (dx / (Math.abs(dy) + 1)) * 16));
      currentLeanRef.current += (targetLean - currentLeanRef.current) * 0.12;

      // Responsive dynamic scale: hero size at top smoothly scales to compact companion size
      const curVw = window.innerWidth;
      const curIsMobile = curVw < 821;
      const isSmallPhone = curVw < 480;
      const baseW = isSmallPhone ? 44 : curIsMobile ? 56 : 88;
      const startW = isSmallPhone ? 110 : curIsMobile ? 140 : 210;
      const heroProgress = Math.min(1, Math.max(0, smoothedScrollY / 180));
      const currentW = startW + (baseW - startW) * heroProgress;

      // Robot is centered directly on the line at (pt.x, pt.y)
      robotEl.style.width = `${currentW}px`;
      robotEl.style.transform = `translate3d(${pt.x}px, ${pt.y}px, 0) rotate(${currentLeanRef.current.toFixed(2)}deg)`;

      // Broadcast robot's current page-Y so dots/cards can activate when robot touches them
      window.dispatchEvent(new CustomEvent("robot-y", { detail: { y: pt.y } }));

      // Mask reveals the active purple dotted line up to current robot position
      if (maskEl) {
        const offset = Math.max(0, totalLen - dist);
        maskEl.style.strokeDashoffset = `${offset}`;
      }
    },
    [totalPathLength]
  );

  // Buttery-smooth LERP animation engine running on RequestAnimationFrame
  useEffect(() => {
    if (!pathD || totalPathLength <= 0) return;

    let isRunning = true;

    const getScrollTop = () => {
      if (typeof window === "undefined") return 0;
      return (
        window.scrollY ||
        window.pageYOffset ||
        document.documentElement?.scrollTop ||
        document.body?.scrollTop ||
        0
      );
    };

    const onScroll = () => {
      targetScrollYRef.current = getScrollTop();
    };

    window.addEventListener("scroll", onScroll, { passive: true, capture: true });
    document.addEventListener("scroll", onScroll, { passive: true, capture: true });
    window.addEventListener("touchmove", onScroll, { passive: true, capture: true });
    // touchend captures momentum scroll direction changes on iOS Safari
    window.addEventListener("touchend", onScroll, { passive: true, capture: true });

    const loop = () => {
      if (!isRunning) return;

      // Always read live scroll on every frame — catches momentum / rubber-band / jump scrolls
      const liveScroll = getScrollTop();
      if (Math.abs(liveScroll - targetScrollYRef.current) > 0.5) {
        targetScrollYRef.current = liveScroll;
      }

      const diff = targetScrollYRef.current - currentScrollYRef.current;

      // Silky LERP — 0.12 on each frame gives ~400ms to settle (smooth on mobile touch and desktop wheel)
      if (Math.abs(diff) > 0.1) {
        currentScrollYRef.current += diff * 0.12;
      } else {
        currentScrollYRef.current = targetScrollYRef.current;
      }

      // Always call updateFrame on EVERY tick (even when settled at rest).
      // This guarantees robot-y events fire continuously so card/dot activations
      // correctly update in BOTH scroll directions and after any path recompute.
      updateFrame(currentScrollYRef.current);

      rafIdRef.current = requestAnimationFrame(loop);
    };

    // Initial render
    updateFrame(currentScrollYRef.current);
    rafIdRef.current = requestAnimationFrame(loop);

    return () => {
      isRunning = false;
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("scroll", onScroll);
      window.removeEventListener("touchmove", onScroll);
      window.removeEventListener("touchend", onScroll);
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
    };
  }, [pathD, totalPathLength, updateFrame]);

  if (!mounted || !pathD || docHeight <= 0) return null;

  return (
    <div
      ref={containerRef}
      className="absolute inset-x-0 top-0 pointer-events-none z-30 select-none overflow-hidden max-w-full"
      style={{ height: docHeight, contain: "layout size style" }}
      aria-hidden="true"
    >
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none max-w-full"
        width="100%"
        height={docHeight}
        viewBox={`0 0 ${docWidth || 1000} ${docHeight || 1000}`}
        fill="none"
      >
        <defs>
          {/* Mask that reveals the active dotted line up to current robot position */}
          <mask id="fullpage-robot-trail-mask">
            <path
              ref={maskPathRef}
              d={pathD}
              fill="none"
              stroke="white"
              strokeWidth="52"
              strokeLinecap="round"
              style={{
                strokeDasharray: totalPathLength || 10000,
                strokeDashoffset: totalPathLength || 10000,
              }}
            />
          </mask>

          {/* Dotted lines are visible ONLY in 'How We Work — Live Automation Demo' and 'How We Work' sections */}
          <clipPath id="visible-dotted-sections-clip">
            {visibleSections.workflow.height > 0 && (
              <rect
                x="0"
                y={visibleSections.workflow.top}
                width="100%"
                height={visibleSections.workflow.height}
              />
            )}
            {visibleSections.process.height > 0 && (
              <rect
                x="0"
                y={visibleSections.process.top}
                width="100%"
                height={visibleSections.process.height}
              />
            )}
          </clipPath>
        </defs>

        {/* ── Visible Dotted Lines & Milestones (strictly clipped to Workflow and Process sections) ── */}
        <g clipPath="url(#visible-dotted-sections-clip)">
          {/* 1. Ghost Dotted Guide */}
          <path
            d={pathD}
            fill="none"
            stroke="rgba(107, 63, 105, 0.22)"
            strokeWidth="2.5"
            strokeDasharray="8 10"
            strokeLinecap="round"
          />

          {/* 2. Active Revealed Dotted Line (Bright primary purple, drawn by scroll) */}
          <path
            d={pathD}
            fill="none"
            stroke="var(--primary)"
            strokeWidth="3"
            strokeDasharray="8 10"
            strokeLinecap="round"
            mask="url(#fullpage-robot-trail-mask)"
          />

          {/* 3. Milestone Anchor Dots along section transitions */}
          {milestones.map((m, idx) => (
            <g key={idx}>
              <circle
                cx={m.x}
                cy={m.y}
                r={4}
                fill="var(--background, #fff)"
                stroke="var(--primary)"
                strokeWidth="2"
              />
            </g>
          ))}
        </g>

        {/* ── 4. Hidden measurement path for getPointAtLength (Must be intact for robot positioning) ── */}
        <path
          ref={measurePathRef}
          d={pathD}
          fill="none"
          stroke="transparent"
          strokeWidth="0"
        />
      </svg>

      {/* ── 5. The Single Robot Agent centered directly in the middle of the line ── */}
      <div
        ref={robotRef}
        className="absolute top-0 left-0 pointer-events-none z-40 will-change-transform"
        style={{
          transformOrigin: "center center",
        }}
      >
        {/* Negative 50% translation centers the robot dead-center on the line */}
        <div className="relative -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
          {/* Ambient purple ground glow centered directly behind the robot */}
          <div
            className="absolute inset-0 rounded-full blur-xl scale-125 pointer-events-none animate-pulse"
            style={{ background: "rgba(107, 63, 105, 0.45)" }}
          />

          <div className="relative z-10 w-full flex items-center justify-center animate-float">
            <Image
              src="/robot1.png"
              alt="AKVORIX AI Robot Agent"
              width={240}
              height={280}
              className="w-full h-auto object-contain drop-shadow-2xl"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
}
