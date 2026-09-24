'use client';

import { useRef } from 'react';
import { MOTION_OK, gsap, useGSAP } from '@/lib/gsap';

/** <ol class="timeline"> whose progress rail draws in step by step on scroll. */
export function TimelineTrack({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLOListElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // The rail is horizontal on desktop and vertical below 980px (see globals.css).
      mm.add({ wide: '(min-width: 981px)', ok: MOTION_OK }, (ctx) => {
        const { wide, ok } = ctx.conditions as { wide: boolean; ok: boolean };
        if (!ok) return;

        const items = gsap.utils.toArray<HTMLElement>('.timeline-item', ref.current);
        const axis = wide ? 'scaleX' : 'scaleY';
        gsap.set(items, { autoAlpha: 1 });

        const tl = gsap.timeline({
          scrollTrigger: { trigger: ref.current, start: 'top 80%', once: true },
        });

        items.forEach((item, i) => {
          const at = i * 0.4;
          tl.fromTo(
            item.querySelector('.timeline-dot'),
            { scale: 0, rotation: -90 },
            { scale: 1, rotation: 0, duration: 0.5, ease: 'back.out(2.4)' },
            at,
          )
            .fromTo(
              item.querySelectorAll('.timeline-state, h3, p'),
              { autoAlpha: 0, y: 14 },
              { autoAlpha: 1, y: 0, stagger: 0.07, duration: 0.55, ease: 'power2.out' },
              at + 0.1,
            )
            // Animates from 0 up to the fill level set in CSS (done = full, current = half).
            .from(item.querySelector('.timeline-fill'), { [axis]: 0, duration: 0.7, ease: 'power2.inOut' }, at + 0.25);
        });

        gsap.fromTo(
          ref.current!.querySelectorAll('.timeline-ping'),
          { scale: 1, autoAlpha: 0.7 },
          { scale: 2.6, autoAlpha: 0, duration: 1.6, ease: 'power2.out', repeat: -1, repeatDelay: 0.4 },
        );
      });

      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <ol className="timeline" ref={ref}>
      {children}
    </ol>
  );
}
