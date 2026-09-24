'use client';

import { useRef } from 'react';
import { useRegisteredTeams } from '@/lib/github';
import { toFaDigits } from '@/lib/format';
import { MOTION_OK, gsap, useGSAP } from '@/lib/gsap';

/** Live number of registered teams, read from public GitHub issues. Counts up on first view. */
export function TeamCount({ suffix = '' }: { suffix?: string }) {
  const { status, teams } = useRegisteredTeams();
  const numRef = useRef<HTMLSpanElement>(null);
  const total = teams.length;

  useGSAP(
    () => {
      const node = numRef.current?.firstChild;
      if (status !== 'ready' || !node || total === 0) return;
      if (!window.matchMedia(MOTION_OK).matches) return;

      // Write to React's own text node so reconciliation still owns the element.
      const counter = { n: 0 };
      node.nodeValue = toFaDigits(0);
      gsap.to(counter, {
        n: total,
        duration: Math.min(1.8, 0.6 + total * 0.05),
        ease: 'power2.out',
        snap: { n: 1 },
        onUpdate: () => {
          node.nodeValue = toFaDigits(counter.n);
        },
        scrollTrigger: { trigger: numRef.current, start: 'top 95%', once: true },
      });
    },
    { dependencies: [status, total] },
  );

  if (status === 'loading') return <span className="status-muted">در حال دریافت…</span>;
  if (status === 'error') return <span>در دسترس نیست</span>;
  return (
    <span>
      <span ref={numRef} className="count-num">
        {toFaDigits(total)}
      </span>
      {suffix}
    </span>
  );
}
