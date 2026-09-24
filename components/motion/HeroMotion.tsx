'use client';

import { useRef } from 'react';
import { FINE_POINTER, MOTION_OK, SplitText, gsap, useGSAP } from '@/lib/gsap';

// Decorative "bricks" from the logo, scattered around the hero edges.
const BRICKS = [
  { top: '12%', left: '3%', size: 12, color: 'var(--primary)' },
  { top: '70%', left: '6%', size: 16, color: 'var(--turquoise)', outline: true },
  { top: '6%', left: '58%', size: 8, color: 'var(--saffron)' },
  { top: '90%', left: '44%', size: 12, color: 'var(--primary-soft)', outline: true },
  { top: '38%', left: '96%', size: 10, color: 'var(--saffron)', outline: true },
  { top: '88%', left: '93%', size: 9, color: 'var(--turquoise)' },
  { top: '28%', left: '40%', size: 6, color: 'var(--primary-soft)' },
];

/** Hero section wrapper: intro timeline, ambient bricks, cursor glow and scroll parallax. */
export function HeroMotion({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const hero = ref.current!;
      const q = gsap.utils.selector(hero);
      const mm = gsap.matchMedia();

      mm.add(MOTION_OK, () => {
        // Words, not chars: splitting Persian into letters would break cursive joining.
        const split = SplitText.create(q('.hero-title'), { type: 'words', wordsClass: 'hero-word' });

        const tl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 0.8 }, delay: 0.1 });
        tl.fromTo(q('.hero-badges'), { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.6 })
          .set(q('.hero-title'), { autoAlpha: 1 }, '<')
          .fromTo(
            split.words,
            { autoAlpha: 0, yPercent: 60, rotationX: -50, transformPerspective: 600 },
            { autoAlpha: 1, yPercent: 0, rotationX: 0, stagger: 0.06, duration: 0.9 },
            '-=0.35',
          )
          .fromTo(q('.hero-lead'), { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0 }, '-=0.6')
          .fromTo(
            q('.hero-cta-group > *'),
            { autoAlpha: 0, y: 18, scale: 0.96 },
            { autoAlpha: 1, y: 0, scale: 1, stagger: 0.1, duration: 0.6 },
            '-=0.55',
          )
          .set(q('.hero-cta-group'), { autoAlpha: 1 }, '<')
          .fromTo(q('.hero-note'), { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.6 }, '-=0.3')
          // Status panel builds in from the side like a dashboard booting up.
          .fromTo(
            q('.status-panel'),
            { autoAlpha: 0, x: -40, rotationY: 8, transformPerspective: 900 },
            { autoAlpha: 1, x: 0, rotationY: 0, duration: 1, clearProps: 'transform' },
            0.35,
          )
          .fromTo(
            q('.status-brick'),
            { scale: 0, rotation: 135 },
            { scale: 1, rotation: 0, stagger: 0.15, duration: 0.6, ease: 'back.out(2.2)' },
            '-=0.5',
          )
          .fromTo(
            q('.status-row'),
            { autoAlpha: 0, x: -16 },
            { autoAlpha: 1, x: 0, stagger: 0.07, duration: 0.5, ease: 'power2.out' },
            '-=0.6',
          )
          .to(
            q('[data-scramble]'),
            {
              duration: 1.2,
              scrambleText: { text: '{original}', chars: '01{}<>/_#$', speed: 0.6, revealDelay: 0.3 },
            },
            '-=0.4',
          )
          .fromTo(
            q('.hero-brick'),
            { autoAlpha: 0, scale: 0 },
            { autoAlpha: 1, scale: 1, stagger: 0.08, duration: 0.6, ease: 'back.out(2)' },
            0.4,
          );

        // A scan line sweeps the status panel every few seconds.
        const scanTrack = q('.status-scan-track')[0];
        gsap.fromTo(
          q('.status-scan'),
          { y: -18, autoAlpha: 0 },
          {
            y: () => scanTrack.offsetHeight,
            autoAlpha: 1,
            duration: 2.2,
            ease: 'none',
            repeat: -1,
            repeatDelay: 3.5,
            delay: 2.4,
          },
        );

        // Bricks drift independently; the backdrop layer carries the scroll parallax.
        q('.hero-brick').forEach((brick) => {
          gsap.to(brick, {
            x: gsap.utils.random(-14, 14),
            y: gsap.utils.random(-18, 18),
            rotation: gsap.utils.random(-45, 45),
            duration: gsap.utils.random(3, 6),
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
          });
        });

        gsap.to(q('.hero-backdrop-layer'), {
          y: 160,
          ease: 'none',
          scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true },
        });

        return () => split.revert();
      });

      mm.add(`${MOTION_OK} and ${FINE_POINTER}`, () => {
        const glow = q('.hero-glow')[0];
        const { width, height } = hero.getBoundingClientRect();
        gsap.set(glow, { left: 0, top: 0, xPercent: -50, yPercent: -50, x: width * 0.3, y: height * 0.35 });
        const xTo = gsap.quickTo(glow, 'x', { duration: 1.2, ease: 'power3.out' });
        const yTo = gsap.quickTo(glow, 'y', { duration: 1.2, ease: 'power3.out' });
        const onMove = (e: PointerEvent) => {
          const r = hero.getBoundingClientRect();
          xTo(e.clientX - r.left);
          yTo(e.clientY - r.top);
        };
        hero.addEventListener('pointermove', onMove);
        return () => hero.removeEventListener('pointermove', onMove);
      });

      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <section className="hero" ref={ref}>
      <div className="hero-backdrop" aria-hidden="true">
        <div className="hero-glow" />
        <div className="hero-backdrop-layer">
          {BRICKS.map((b, i) => (
            <span
              key={i}
              className={`hero-brick${b.outline ? ' is-outline' : ''}`}
              style={
                {
                  top: b.top,
                  left: b.left,
                  '--brick-size': `${b.size}px`,
                  '--brick-color': b.color,
                } as React.CSSProperties
              }
            />
          ))}
        </div>
      </div>
      {children}
    </section>
  );
}
