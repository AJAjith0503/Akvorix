# Web Projects Section Documentation

This document outlines the data, effects, and animations used to create the **Web Projects** section. It focuses on the specific projects showcased (IDs 4, 6, 9, and 10) and the GSAP/Framer Motion animations that bring them to life.

## 1. Project Data

The Web Projects section uses a specific subset of the portfolio data. Below is the structured data for the projects that are rendered in this section:

```javascript
export const WEB_PROJECTS = [
  {
    id: 4,
    image: '/project_images/Futuristic fitness UI design.png',
    alt: 'FiTusion',
    titleTop: 'FITUSION',
    titleBottom: 'WEB APP',
    labelLeft: 'FRONTEND',
    descLeft: 'A high-performance, hyper-interactive fitness web application engineered with a cyberpunk dark/neon-green aesthetic.',
    labelRight: 'BIOMETRICS',
    descRight: 'Built with React 18, Vite, and hardware-accelerated animations for custom BMR/BMI calculations.',
    github: 'https://github.com/AJAjith0503/gym',
    liveDemo: 'https://gym-seven-chi-61.vercel.app/',
    caseStudy: {
      challenge: 'Designing high-fidelity biometrics calculators, pixel-perfect responsive layouts that preserve absolute overlays without viewport overflows, and optimized scroll reveal animations.',
      solution: 'Created a fluid responsive stacking engine and an IntersectionObserver scroll synchronization hook. Implemented dual-unit calculators with Mifflin-St Jeor gauges and custom preloading.',
      results: 'Achieved a continuous 60FPS scroll performance with zero layout shifting and full layout responsiveness across all device viewports.',
      techStack: ['React 18', 'Vite', 'Vanilla CSS3', 'Glassmorphism', 'CSS Grid', 'Lucide React'],
    },
  },
  {
    id: 6,
    image: '/project_images/Elite Mart ecommerce.png',
    alt: 'Elite Mart – Online Shopping',
    titleTop: 'ELITE MART',
    titleBottom: 'SHOPPING',
    labelLeft: 'E-COMMERCE',
    descLeft: 'Modern, responsive e-commerce storefront with high-performance frontend components.',
    labelRight: 'INTERACTIVE',
    descRight: 'Features sidebar navigation, optimized product grids, Firebase database sync, and smooth animations.',
    github: 'https://github.com/AJAjith0503/ecommerce-project',
    liveDemo: 'https://kaleidoscopic-mooncake-c210e2.netlify.app/',
    caseStudy: {
      challenge: 'Structuring a fast-loading, dynamic storefront that stays responsive across devices while managing real-time cart state and checkout updates.',
      solution: 'Crafted a fully semantic layout using HTML5 and CSS Grid, implementing client-side routing, modular components, and real-time synchronization with Firebase database.',
      results: 'Reduced page loading latency, achieved near-instant database writes, and maintained 100% responsive reflows down to 320px screens.',
      techStack: ['HTML5', 'CSS Grid', 'JavaScript', 'Firebase', 'Responsive Design', 'Web Storage API'],
    },
  },
  {
    id: 9,
    image: '/project_images/Sri Vishnu Park restaurant.png',
    alt: 'Sri Vishnu Park',
    titleTop: 'SRI VISHNU',
    titleBottom: 'PARK',
    labelLeft: 'WEB APP',
    descLeft: 'Premium animated React web application for a heritage vegetarian restaurant in Bengaluru.',
    labelRight: 'IMMERSE',
    descRight: 'Features a fully functional shopping cart, magnetic cursor, and custom preloader animations.',
    github: 'https://github.com/AJAjith0503/restaurant.git',
    liveDemo: 'https://restaurant-seven-jade.vercel.app/',
    caseStudy: {
      challenge: 'Creating a digital dining experience that blends traditional heritage with state-of-the-art web animations and a fast online ordering checkout flow.',
      solution: 'Designed an espresso-and-gold themed web interface using Framer Motion reveals, local state-managed cart, and a custom error boundary component.',
      results: 'Delivered a 100% mobile-responsive layout and highly interactive cart experience that load instantly with zero layout shifts.',
      techStack: ['React.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Vite', 'State Management'],
    },
  },
  {
    id: 10,
    image: '/project_images/Furnexa luxury furniture.png',
    alt: 'Furnexa',
    titleTop: 'FURNEXA',
    titleBottom: 'STORE',
    labelLeft: 'E-COMMERCE',
    descLeft: 'High-fidelity luxury furniture storefront developed as a responsive Single-Page React app.',
    labelRight: 'PERFORMANCE',
    descRight: 'Built with zero Cumulative Layout Shift and 0ms SPA routing transition latency.',
    github: 'https://github.com/AJAjith0503/ecommercefurniture',
    liveDemo: 'https://ecommercefurniture-steel.vercel.app/',
    caseStudy: {
      challenge: 'Maintaining luxury brand immersion in a Single-Page App while preventing Cumulative Layout Shift (CLS) from heavy product images.',
      solution: 'Implemented strict aspect-ratio container skeletons, client-side route scroll preservation, and custom Flex/Grid reflow containers without external styling frameworks.',
      results: 'Achieved 0ms transition latency between store categories, zero Cumulative Layout Shift, and a production compilation time of under 400ms.',
      techStack: ['React 19', 'TypeScript', 'React Router', 'Vanilla CSS3', 'Framer Motion', 'Vite'],
    },
  },
  {
    id: 11,
    image: '/project_images/Akvorix.png',
    alt: 'AKVORIX',
    titleTop: 'AKVORIX',
    titleBottom: 'PORTFOLIO',
    labelLeft: 'NEXT.JS',
    descLeft: 'Advanced portfolio and web application built with Next.js 14 and GSAP animations.',
    labelRight: 'ANIMATION',
    descRight: 'Features Framer Motion, GSAP ScrollTrigger, and custom WebGL effects.',
    github: 'https://github.com/AJAjith0503/Akvorix',
    liveDemo: '#',
    caseStudy: {
      challenge: 'Creating a highly interactive, performance-optimized portfolio with complex scroll animations and dynamic routing.',
      solution: 'Leveraged Next.js 14 App Router, GSAP for scroll-linked animations, and Framer Motion for page transitions.',
      results: 'A seamless, visually stunning portfolio that showcases advanced front-end capabilities with fast load times.',
      techStack: ['Next.js 14', 'TypeScript', 'Tailwind CSS', 'GSAP', 'Framer Motion', 'React'],
    },
  }
];
```

## 2. Animation & Effects Architecture

To achieve the premium, dynamic feel of the Web Projects section, a combination of **GSAP** and **Framer Motion** is utilized. Here is the breakdown of the effects:

### A. Horizontal Scroll Parallax (GSAP ScrollTrigger)
The section uses GSAP to translate vertical scrolling into horizontal movement across the projects:
- **Scroll Mapping:** `x: -getScrollWidth()` is mapped to the vertical scroll progress of the component.
- **Image Parallax:** As the user scrolls horizontally, individual project images shift slightly on the X-axis (clamped between -1 and 1, with a `maxShift` of 10) relative to the viewport center.

**Implementation Code:**
```javascript
const getScrollWidth = () => {
  return Math.max(0, scrollContent.scrollWidth - scrollWrapperRef.current.offsetWidth);
};

function applyParallax() {
  const vw = window.innerWidth;
  const viewportCenter = vw * 0.5;
  const galleryImages = scrollContent.querySelectorAll('.projects-image-container img');

  galleryImages.forEach((image) => {
    const parent = image.parentElement;
    if (!parent) return;

    const rect = parent.getBoundingClientRect();
    const elementCenter = rect.left + rect.width * 0.5;

    const t = gsap.utils.clamp(-1, 1, (elementCenter - viewportCenter) / viewportCenter);
    const maxShift = 10;
    const shift = -t * maxShift;

    gsap.set(image, { xPercent: shift, force3D: true });
  });
}

// GSAP ScrollTrigger configuration
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
    }
  },
});
```

### B. Text Scrambling & Split Text Reveals
- **SplitType:** The project titles (`titleTop` and `titleBottom`) are split into individual characters using `SplitType`. 
- **Staggered Reveal:** GSAP animates the characters upward (`yPercent: 0` from `100`) with a stagger effect (`stagger: 0.05`), revealing the title smoothly as it enters the viewport.
- **Scramble Effect:** A custom `<ScrambleText />` component is used to animate text descriptions in a hacker-like/cyberpunk deciphering effect upon hover or reveal.

### C. Case Study Expansion (GSAP Flip & Framer Motion)
When a project is clicked, it expands into a full-screen case study view:
- **GSAP Flip:** Smoothly transitions the project's hero image from its thumbnail position in the horizontal list to a full-screen hero image.
- **Framer Motion (`AnimatePresence`):** Handles the mounting and unmounting of the Case Study overlay, sliding in text elements (Challenge, Solution, Results) with opacity and Y-axis transitions.
- **Body Overflow:** When the case study is active, `document.body.style.overflow = 'hidden'` is applied to prevent background scrolling.

### D. Custom Cursor Tracker
A custom cursor (`cursorRef`) follows the mouse position over the Web Projects section. GSAP's `quickTo` is used for ultra-smooth, hardware-accelerated cursor following:
```javascript
const xTo = gsap.quickTo(cursorRef.current, "x", { duration: 0.4, ease: "power3" });
const yTo = gsap.quickTo(cursorRef.current, "y", { duration: 0.4, ease: "power3" });
```
When hovering over a project, the cursor expands and displays a "VIEW" or "OPEN" text label.
