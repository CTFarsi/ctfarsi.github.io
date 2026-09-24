'use client';

import { Fragment, useRef } from 'react';
import { MOTION_OK, ScrollTrigger, gsap, useGSAP } from '@/lib/gsap';

// `breaks` newlines follow each segment as static text: TextPlugin drops "\n" it types.
type Segment = { text: string; kind: 'prompt' | 'input' | 'output' | 'comment'; breaks?: number };

const SEGMENTS: Segment[] = [
  { kind: 'prompt', text: '> ' },
  { kind: 'input', text: 'ctfarsi.help()', breaks: 1 },
  {
    kind: 'output',
    text: '[+] Commands: ctfarsi.flag(solution), ctfarsi.status(), ctfarsi.rules(), ctfarsi.telegram()',
    breaks: 2,
  },
  { kind: 'prompt', text: '> ' },
  { kind: 'input', text: "ctfarsi.flag('CTFarsi{...}')", breaks: 1 },
  { kind: 'comment', text: '// hint: the payload is already in your console' },
];

const CLASS: Record<Segment['kind'], string | undefined> = {
  prompt: 't-prompt',
  input: undefined,
  output: 't-out',
  comment: 't-dim',
};

/** Fake DevTools console that types its commands out once it scrolls into view. */
export function TerminalDemo() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const pre = ref.current!.querySelector('pre')!;
        const segs = gsap.utils.toArray<HTMLElement>('[data-seg]', ref.current);

        // Lock the height so the box doesn't collapse while it's empty.
        gsap.set(pre, { minHeight: pre.offsetHeight });
        gsap.set(segs, { text: '' });

        // The blinking caret (CSS ::after) follows whichever segment is being written.
        const moveCaret = (el: HTMLElement) => {
          segs.forEach((s) => s.classList.remove('is-active'));
          el.classList.add('is-active');
        };
        moveCaret(segs[0]);

        const tl = gsap.timeline({ paused: true, delay: 0.2 });
        SEGMENTS.forEach((seg, i) => {
          const el = segs[i];
          tl.call(moveCaret, [el]);
          if (seg.kind === 'input' || seg.kind === 'comment') {
            // Typed character by character; a short "thinking" pause before each command.
            tl.to(el, { text: seg.text, duration: seg.text.length * 0.045, ease: 'none' }, '+=0.35');
          } else {
            // Prompts and program output appear all at once, like a real console.
            tl.set(el, { text: seg.text }, seg.kind === 'output' ? '+=0.4' : '+=0.15');
          }
        });

        ScrollTrigger.create({
          trigger: ref.current,
          start: 'top 75%',
          once: true,
          onEnter: () => tl.play(),
        });
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <div className="terminal" ref={ref} role="figure" aria-label="نمونه کنسول مرورگر">
      <div className="terminal-bar">
        <span />
        <span />
        <span />
        <em>DevTools — Console</em>
      </div>
      <pre>
        {SEGMENTS.map((seg, i) => (
          <Fragment key={i}>
            <span
              data-seg
              className={[CLASS[seg.kind], i === SEGMENTS.length - 1 && 'is-active'].filter(Boolean).join(' ')}
            >
              {seg.text}
            </span>
            {seg.breaks ? '\n'.repeat(seg.breaks) : null}
          </Fragment>
        ))}
      </pre>
    </div>
  );
}
