"use client";

import React, { useEffect, useRef, useState, useMemo } from 'react';
import { createPortal } from 'react-dom';
import gsap from 'gsap';
import { Flip } from 'gsap/Flip';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';
import { motion, AnimatePresence } from 'framer-motion';
import { WEB_PROJECTS } from '../../data/webProjects';
import '../../styles/Projects.css';

gsap.registerPlugin(Flip, ScrollTrigger);

export default function WebProjectsSection() {
  const [mounted, setMounted] = useState(false);
  const displayProjects = useMemo(
    () => WEB_PROJECTS.filter(p => [4, 6, 9, 10, 11].includes(p.id)),
    []
  );

  const [activeCaseStudy, setActiveCaseStudy] = useState<any>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const scrollWrapperRef = useRef<HTMLDivElement>(null);
  const scrollContentRef = useRef<HTMLDivElement>(null);
  const detailSectionRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);

  const galleryWrapperRefs = useRef<(HTMLDivElement | null)[]>([]);
  const imageContainerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);
  const contentWrapperRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      const match = hash.match(/#\/webproject\/(\d+)/);
      if (match) {
        const id = parseInt(match[1], 10);
        const proj = displayProjects.find(p => p.id === id);
        if (proj) {
          setActiveCaseStudy(proj);
          return;
        }
      }
      setActiveCaseStudy(null);
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [displayProjects]);

  useEffect(() => {
    if (activeCaseStudy) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = '';
      };
    }
  }, [activeCaseStudy]);

  useEffect(() => {
    if (!scrollWrapperRef.current || !scrollContentRef.current) return;

    const scrollContent = scrollContentRef.current;
    let cleanupFn: (() => void) | null = null;

    const init = () => {
      const getScrollWidth = () => {
        return Math.max(0, scrollContent.scrollWidth - scrollWrapperRef.current!.offsetWidth);
      };

      function applyParallax() {
        const galleryImages = scrollContent.querySelectorAll('.projects-image-container img');
        galleryImages.forEach((image) => {
          gsap.set(image, { xPercent: 0, force3D: true });
        });
      }

      gsap.set(scrollContent, { x: 0 });
      applyParallax();

      const imgs = scrollContent.querySelectorAll('img');
      imgs.forEach(img => {
        if (img.complete) return;
        img.addEventListener('load', () => {
          ScrollTrigger.refresh();
          applyParallax();
        });
      });

      let st = ScrollTrigger.create({
        trigger: rootRef.current,
        start: 'top top',
        end: () => `+=${getScrollWidth()}`,
        pin: scrollWrapperRef.current,
        pinSpacing: true,
        anticipatePin: 1,
        scrub: 1,
        onUpdate: (self) => {
          if (currentOpenIndex === null) {
            gsap.set(scrollContent, { x: -self.progress * getScrollWidth() });
            applyParallax();

            // Fade out the section header as soon as user begins scrolling so cards never collide with it
            const headerEl = rootRef.current?.querySelector('.projects-section-header');
            if (headerEl) {
              const headerOpacity = gsap.utils.clamp(0, 1, 1 - (self.progress * 12));
              const headerY = -self.progress * 50;
              gsap.set(headerEl, { opacity: headerOpacity, y: headerY, force3D: true });
            }
          }
        },
      });

      let listOfSplits: any[] = [];
      let currentOpenIndex: number | null = null;
      let isAnimating = false;

      let cursorRafId: number | null = null;
      let cursorX = 0, cursorY = 0, targetX = 0, targetY = 0;

      function updateCursor() {
        cursorX += (targetX - cursorX) * 0.15;
        cursorY += (targetY - cursorY) * 0.15;
        if (cursorRef.current) {
          cursorRef.current.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0)`;
        }
        cursorRafId = requestAnimationFrame(updateCursor);
      }

      function handleMouseMove(e: MouseEvent) {
        const b = cursorRef.current?.getBoundingClientRect();
        if (!b) return;
        targetX = e.clientX - (b.width * 3) / 4;
        targetY = e.clientY - (b.height * 3) / 4;
        if (!cursorRafId) cursorRafId = requestAnimationFrame(updateCursor);
      }

      window.addEventListener('mousemove', handleMouseMove);

      function initSplits(contentEl: HTMLElement | null) {
        if (!contentEl) return null;

        const titleTopEls = contentEl.querySelectorAll('[data-text-top] div');
        const titleBottomEls = contentEl.querySelectorAll('[data-text-bottom] div');
        const textLeftEls = contentEl.querySelectorAll('[data-text-left] div');
        const textRightEls = contentEl.querySelectorAll('[data-text-right] div');

        const titleTopSplits = Array.from(titleTopEls, n => new SplitType(n as HTMLElement, { types: 'chars' }));
        const titleBottomSplits = Array.from(titleBottomEls, n => new SplitType(n as HTMLElement, { types: 'chars' }));

        titleTopSplits[0]?.chars?.forEach(char => {
          const wrap = document.createElement('div');
          wrap.classList.add('char-wrap');
          char.parentNode?.insertBefore(wrap, char);
          wrap.appendChild(char);
        });

        const textLeftSplits = Array.from(textLeftEls, n => new SplitType(n as HTMLElement, { types: 'lines' }));
        const textRightSplits = Array.from(textRightEls, n => new SplitType(n as HTMLElement, { types: 'lines' }));

        [textLeftSplits, textRightSplits].forEach(splits =>
          splits.forEach(split =>
            split.lines?.forEach(line => {
              const wrap = document.createElement('div');
              wrap.classList.add('line-wrap');
              line.parentNode?.insertBefore(wrap, line);
              wrap.appendChild(line);
            })
          )
        );

        return { titleTopSplits, titleBottomSplits, textLeftSplits, textRightSplits };
      }

      contentRefs.current.forEach((el, i) => {
        listOfSplits[i] = initSplits(el);
      });

      const openContent = (index: number) => {
        if (isAnimating) return;
        isAnimating = true;

        const content = contentRefs.current[index];
        const contentWrapper = contentWrapperRefs.current[index];
        const imageContainer = imageContainerRefs.current[index];
        const splits = listOfSplits[index];
        if (!content || !contentWrapper || !imageContainer) return;

        const img = imageContainer.querySelector('img');

        content.classList.add('is-visible');
        detailSectionRef.current?.classList.add('is-active');

        st.disable(false);

        const otherGalleries = galleryWrapperRefs.current.filter((_, i) => i !== index);
        gsap.set(otherGalleries, { clipPath: 'inset(-60px)' });

        const tl = gsap.timeline({
          onComplete: () => {
            currentOpenIndex = index;
            cursorRef.current?.classList.add('is-open');
            isAnimating = false;
          },
        });

        tl.addLabel('start', 0)
          .to(rootRef.current?.querySelector('.projects-section-header') || null, { opacity: 0, y: -20, duration: 0.5, ease: 'power3.inOut' }, 'start')
          .to(img, { xPercent: 0, duration: 1.25, ease: 'power4.inOut' }, 'start')
          .add(() => {
            const state = Flip.getState(imageContainer);
            contentWrapper.appendChild(imageContainer);
            Flip.from(state, { duration: 1.25, ease: 'power4.inOut' });
          }, 'start')
          .to(
            galleryWrapperRefs.current.filter((_, i) => i !== index),
            { clipPath: 'inset(100% 0 0 0)', duration: 0.75, ease: 'power3.inOut' },
            0
          )
          .fromTo(
            splits?.titleTopSplits[0]?.elements || [],
            { xPercent: 15 },
            { xPercent: 0, duration: 1, ease: 'power3.out' },
            'start+=1.25'
          )
          .fromTo(
            [
              ...(splits?.titleTopSplits[0]?.chars ?? []),
              ...(splits?.titleBottomSplits[0]?.chars ?? []),
            ],
            { clipPath: 'inset(0 100% 0 0)', xPercent: 10 },
            { clipPath: 'inset(0 0% 0 0)', xPercent: 0, duration: 0.75, ease: 'power3.out' },
            'start+=1.25'
          )
          .fromTo(
            [
              ...(splits?.textLeftSplits?.flatMap((s: any) => s.lines) ?? []),
              ...(splits?.textRightSplits?.flatMap((s: any) => s.lines) ?? []),
            ],
            { yPercent: 100, opacity: 0 },
            { yPercent: 0, opacity: 1, stagger: 0.025 },
            'start+=1.2'
          );
      };

      const closeContent = (index: number) => {
        if (isAnimating || currentOpenIndex === null) return;
        isAnimating = true;

        const content = contentRefs.current[index];
        const contentWrapper = contentWrapperRefs.current[index];
        const splits = listOfSplits[index];
        if (!content || !contentWrapper) return;
        
        const imgEl = contentWrapper.querySelector('.projects-image-container');
        const img = imgEl?.querySelector('img');

        const tl = gsap.timeline({
          onComplete: () => {
            isAnimating = false;
            currentOpenIndex = null;
            cursorRef.current?.classList.remove('is-open');
            detailSectionRef.current?.classList.remove('is-active');
            content.classList.remove('is-visible');
            st.enable();
            applyParallax();
          },
        });

        tl.addLabel('start', 0)
          .to(rootRef.current?.querySelector('.projects-section-header') || null, { opacity: 1, y: 0, duration: 0.75, ease: 'power3.out' }, 'start+=0.5')
          .to(img || null, { xPercent: 0, duration: 1.25, ease: 'power3.inOut' }, 'start+=0.25')
          .fromTo(
            [
              ...(splits?.titleTopSplits[0]?.elements ?? []),
              ...(splits?.titleBottomSplits[0]?.elements ?? []),
            ],
            { xPercent: 0 },
            { xPercent: 10, ease: 'power3.out', duration: 1 },
            'start'
          )
          .fromTo(
            [
              ...(splits?.titleTopSplits[0]?.chars ?? []),
              ...(splits?.titleBottomSplits[0]?.chars ?? []),
            ],
            { clipPath: 'inset(0 0% 0 0)', xPercent: 0 },
            { clipPath: 'inset(0 100% 0 0)', xPercent: 10, ease: 'power3.out', duration: 0.75 },
            'start'
          )
          .to(
            [
              ...(splits?.textLeftSplits?.flatMap((s: any) => s.lines) ?? []),
              ...(splits?.textRightSplits?.flatMap((s: any) => s.lines) ?? []),
            ],
            { yPercent: 100, stagger: 0.025, duration: 0.75 },
            'start'
          )
          .add(() => {
            if (!imgEl) return;
            const state = Flip.getState(imgEl);
            galleryWrapperRefs.current[index]?.appendChild(imgEl);
            Flip.from(state, { duration: 1.25, ease: 'power3.inOut' });
          }, 'start+=0.25')
          .to(
            galleryWrapperRefs.current.filter((_, i) => i !== index),
            { clipPath: 'inset(-60px)' }
          )
          .set(galleryWrapperRefs.current, { clipPath: 'none' });
      };

      galleryWrapperRefs.current.forEach((el, i) => {
        el?.addEventListener('click', () => { if (currentOpenIndex === null) openContent(i); });
        el?.addEventListener('mouseenter', () => cursorRef.current?.classList.add('is-visible'));
        el?.addEventListener('mouseleave', () => cursorRef.current?.classList.remove('is-visible'));
      });

      contentWrapperRefs.current.forEach((el, i) => {
        el?.addEventListener('click', () => { if (currentOpenIndex === i) closeContent(i); });
        el?.addEventListener('mouseenter', () => cursorRef.current?.classList.add('is-visible'));
        el?.addEventListener('mouseleave', () => cursorRef.current?.classList.remove('is-visible'));
      });

      cleanupFn = () => {
        st.kill();
        if (cursorRafId) cancelAnimationFrame(cursorRafId);
        window.removeEventListener('mousemove', handleMouseMove);
      };
    };

    const raf = requestAnimationFrame(init);
    return () => {
      cancelAnimationFrame(raf);
      if (cleanupFn) cleanupFn();
    };
  }, [displayProjects]);

  return (
    <div id="web_project" ref={rootRef} className="projects-root">
      <div ref={cursorRef} className="projects-cursor">
        <div className="projects-cross-btn" />
      </div>

      <div ref={scrollWrapperRef} className="projects-scroll-wrapper">
        <div className="projects-section-header animate-element section-header-container">
          <span className="projects-section-num section-header-num">[ 07 ]</span>
          <h2 className="projects-section-title section-header-title">
            Web <span className="gradient-text">Projects</span>
          </h2>
        </div>

        <div ref={scrollContentRef} className="projects-scroll-content">
          <div className="projects-gallery">
            {displayProjects.map((p, i) => (
              <div
                key={p.id}
                ref={el => {galleryWrapperRefs.current[i] = el}}
                className="projects-gallery-image"
              >
                <div className="projects-card-number">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <div
                  ref={el => {imageContainerRefs.current[i] = el}}
                  className="projects-image-container"
                >
                  <img src={p.image} alt={p.alt} />
                  <div className="projects-card-title-overlay">
                    <span className="projects-card-title-top">{p.titleTop}</span>
                    <span className="projects-card-title-bottom">{p.titleBottom}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div ref={detailSectionRef} className="projects-detail-section">
          {displayProjects.map((p, i) => (
            <div
              key={p.id}
              ref={el => {contentRefs.current[i] = el}}
              className="projects-content"
            >
              <div
                ref={el => {contentWrapperRefs.current[i] = el}}
                className="projects-content-wrapper"
              >
                <div className="projects-title-top" data-text-top>
                  <div className="projects-title-big">{p.titleTop}</div>
                </div>
                <div className="projects-title-bottom" data-text-bottom>
                  <div className="projects-title-big">{p.titleBottom}</div>
                </div>

                <div className="projects-text-left" data-text-left>
                  <div className="projects-title-small">{p.labelLeft}</div>
                  <div className="projects-paragraph">{p.descLeft}</div>
                </div>

                <div className="projects-text-right" data-text-right>
                  <div className="projects-title-small">{p.labelRight}</div>
                  <div className="projects-paragraph">{p.descRight}</div>
                  {p.caseStudy && (
                    <button
                      className="projects-case-study-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        window.location.hash = `#/webproject/${p.id}`;
                      }}
                      onMouseEnter={() => cursorRef.current?.classList.remove('is-visible')}
                      onMouseLeave={() => cursorRef.current?.classList.add('is-visible')}
                    >
                      <span>Case Study</span>
                      <svg className="btn-arrow" viewBox="0 0 24 24" width="18" height="18">
                        <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                      </svg>
                    </button>
                  )}
                </div>

                {p.caseStudy && (
                  <button
                    className="projects-case-study-btn mobile-only-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      window.location.hash = `#/webproject/${p.id}`;
                    }}
                    onMouseEnter={() => cursorRef.current?.classList.remove('is-visible')}
                    onMouseLeave={() => cursorRef.current?.classList.add('is-visible')}
                  >
                    <span>Case Study</span>
                    <svg className="btn-arrow" viewBox="0 0 24 24" width="18" height="18">
                      <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                    </svg>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {mounted && activeCaseStudy && (
          <CaseStudyPage
            project={activeCaseStudy}
            onClose={() => { window.location.hash = '#web_project'; }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function CaseStudyPage({ project, onClose }: { project: any, onClose: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = 0;
    }
  }, [project]);

  return createPortal(
    <motion.div
      ref={containerRef}
      className="case-study-page"
      data-lenis-prevent="true"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 30 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <header className="case-study-page-header">
        <button 
          className="case-study-back-btn" 
          onClick={onClose}
          aria-label="Back to Portfolio"
        >
          <svg className="btn-back-arrow" viewBox="0 0 24 24" width="18" height="18">
            <path d="M19 12H5M12 19l-7-7 7-7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          </svg>
          <span>Back to Portfolio</span>
        </button>
      </header>

      <div className="case-study-page-hero">
        <div className="case-study-page-hero-img-wrapper">
          <img src={project.image} alt={project.alt} className="case-study-page-hero-img" />
        </div>
        <div className="case-study-page-hero-overlay">
          <div className="case-study-page-container">
            <p className="case-study-page-hero-subtitle">
              {project.labelLeft} &bull; {project.labelRight}
            </p>
            <h1 className="case-study-page-hero-title">
              {project.titleTop} <br className="title-br" /> {project.titleBottom}
            </h1>
          </div>
        </div>
      </div>

      <div className="case-study-page-container case-study-page-content-wrapper">
        <div className="case-study-page-grid">
          <div className="case-study-page-left">
            <div className="case-study-page-section">
              <h2 className="case-study-page-section-title">The Challenge</h2>
              <p className="case-study-page-text">{project.caseStudy.challenge}</p>
            </div>

            <div className="case-study-page-section">
              <h2 className="case-study-page-section-title">The Solution</h2>
              <p className="case-study-page-text">{project.caseStudy.solution}</p>
            </div>
          </div>

          <div className="case-study-page-right">
            <div className="case-study-page-section">
              <h2 className="case-study-page-section-title">Key Results</h2>
              <p className="case-study-page-text">{project.caseStudy.results}</p>
            </div>

            <div className="case-study-page-section">
              <h2 className="case-study-page-section-title">Tech Stack</h2>
              <div className="case-study-page-tech-tags">
                {project.caseStudy.techStack.map((tech: string) => (
                  <span key={tech} className="tech-page-tag">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {(project.github || project.liveDemo) && (
              <div className="case-study-page-section">
                <h2 className="case-study-page-section-title">Project Links</h2>
                <div className="case-study-links-group">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="case-study-link-btn github"
                    >
                      <svg className="link-icon" viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                      </svg>
                      <span>GitHub</span>
                    </a>
                  )}
                  {project.liveDemo && (
                    <a
                      href={project.liveDemo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="case-study-link-btn live"
                    >
                      <svg className="link-icon" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" />
                      </svg>
                      <span>Live Demo</span>
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {project.screenshots && project.screenshots.length > 0 && (
          <div className="case-study-page-gallery-section">
            <h2 className="case-study-page-section-title gallery-title">Interface Showcase</h2>
            <div className="case-study-gallery-scroll">
              {project.screenshots.map((shot: any, idx: number) => (
                <div key={idx} className={`case-study-gallery-card ${shot.isLandscape ? 'landscape' : ''}`}>
                  <div className="gallery-img-wrapper">
                    <img src={shot.src} alt={shot.label} className="gallery-img" />
                  </div>
                  <span className="gallery-img-label">{shot.label}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>,
    document.body
  );
}
