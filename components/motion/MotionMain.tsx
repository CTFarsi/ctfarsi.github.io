'use client';

import { usePathname } from 'next/navigation';
import { useRef } from 'react';
import { FINE_POINTER, MOTION_OK, REVEAL_SELECTOR, ScrollTrigger, gsap, useGSAP } from '@/lib/gsap';

/**
 * Page-wide motion controller wrapped around <main>. Re-runs on every route change:
 * - scroll reveals for REVEAL_SELECTOR (batched so grid cards stagger together)
 * - cursor spotlight on cards (CSS vars read by globals.css)
 * - magnetic pull on [data-magnetic] buttons
 */
export function MotionMain({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLElement>(null);
  const pathname = usePathname();

  useGSAP(
    () => {
      const root = document.documentElement;
      const main = ref.current!;
      const mm = gsap.matchMedia();

      mm.add(MOTION_OK, () => {
        const targets = gsap.utils.toArray<HTMLElement>(REVEAL_SELECTOR, main);
        // Read positions before hiding anything: whatever is already on (or above)
        // the screen reveals right away, the rest waits for the scroll.
        const fold = window.innerHeight * 0.92;
        const visible = targets.filter((el) => el.getBoundingClientRect().top < fold);
        const below = targets.filter((el) => !visible.includes(el));

        gsap.set(targets, { autoAlpha: 0, y: 36 });
        root.classList.add('motion-ready');

        const reveal = (els: Element[], delay = 0) => {
          // After a long jump (anchor link, reload mid-page) everything skipped arrives in
          // one batch. Show what's already scrolled past instantly so it can't delay the
          // stagger of what's actually on screen, and cap the stagger's total length.
          const passed = els.filter((el) => el.getBoundingClientRect().bottom <= 0);
          const onScreen = els.filter((el) => !passed.includes(el));
          if (passed.length) gsap.set(passed, { autoAlpha: 1, clearProps: 'transform' });
          if (!onScreen.length) return;
          gsap.to(onScreen, {
            autoAlpha: 1,
            y: 0,
            duration: 0.9,
            delay,
            ease: 'power3.out',
            stagger: Math.min(0.08, 0.6 / onScreen.length),
            overwrite: true,
            clearProps: 'transform',
          });
        };

        reveal(visible, 0.15);
        ScrollTrigger.batch(below, {
          start: 'top 88%',
          once: true,
          onEnter: (batch) => reveal(batch),
        });
      });

      mm.add(`${MOTION_OK} and ${FINE_POINTER}`, () => {
        // Spotlight: one delegated listener, writes the cursor position into CSS vars.
        const onMove = (e: PointerEvent) => {
          const card = (e.target as Element).closest<HTMLElement>('.card, .step');
          if (!card) return;
          const r = card.getBoundingClientRect();
          card.style.setProperty('--mx', `${e.clientX - r.left}px`);
          card.style.setProperty('--my', `${e.clientY - r.top}px`);
        };
        main.addEventListener('pointermove', onMove);

        // Magnetic buttons: quickTo reuses one tween per axis instead of spawning new ones.
        const cleanups = gsap.utils.toArray<HTMLElement>('[data-magnetic]', main).map((el) => {
          const xTo = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'power3.out' });
          const yTo = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power3.out' });
          const move = (e: PointerEvent) => {
            const r = el.getBoundingClientRect();
            xTo((e.clientX - (r.left + r.width / 2)) * 0.22);
            yTo((e.clientY - (r.top + r.height / 2)) * 0.35);
          };
          const leave = () => {
            xTo(0);
            yTo(0);
          };
          el.addEventListener('pointermove', move);
          el.addEventListener('pointerleave', leave);
          return () => {
            el.removeEventListener('pointermove', move);
            el.removeEventListener('pointerleave', leave);
          };
        });

        return () => {
          main.removeEventListener('pointermove', onMove);
          cleanups.forEach((fn) => fn());
        };
      });

      // Page height changed with the route; web fonts shift layout once they land.
      ScrollTrigger.refresh();
      document.fonts?.ready.then(() => ScrollTrigger.refresh());

      return () => mm.revert();
    },
    { scope: ref, dependencies: [pathname], revertOnUpdate: true },
  );

  return (
    <main id="main" ref={ref}>
      {children}
    </main>
  );
}
