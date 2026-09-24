'use client';

import { useRef } from 'react';
import { MOTION_OK, gsap, useGSAP } from '@/lib/gsap';

/** Native <details> accordion with an animated height; plain toggling under reduced motion. */
export function FaqList({ items }: { items: readonly { q: string; a: string }[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const { contextSafe } = useGSAP({ scope: ref });

  const toggle = contextSafe((e: React.MouseEvent<HTMLElement>) => {
    if (!window.matchMedia(MOTION_OK).matches) return;
    e.preventDefault();

    const details = e.currentTarget.parentElement as HTMLDetailsElement;
    const panel = details.querySelector<HTMLElement>('.faq-panel')!;
    if (gsap.isTweening(panel)) return;

    if (details.open) {
      details.classList.add('is-closing');
      gsap.to(panel, {
        height: 0,
        autoAlpha: 0,
        duration: 0.3,
        ease: 'power2.inOut',
        onComplete: () => {
          details.open = false;
          details.classList.remove('is-closing');
          gsap.set(panel, { clearProps: 'height,opacity,visibility' });
        },
      });
    } else {
      details.open = true;
      gsap.fromTo(
        panel,
        { height: 0, autoAlpha: 0 },
        { height: 'auto', autoAlpha: 1, duration: 0.45, ease: 'power3.out', clearProps: 'height' },
      );
      gsap.fromTo(panel.firstElementChild, { y: -8 }, { y: 0, duration: 0.45, ease: 'power3.out' });
    }
  });

  return (
    <div className="faq" ref={ref}>
      {items.map((item, i) => (
        <details key={item.q} open={i === 0}>
          <summary onClick={toggle}>{item.q}</summary>
          <div className="faq-panel">
            <p className="faq-answer">{item.a}</p>
          </div>
        </details>
      ))}
    </div>
  );
}
