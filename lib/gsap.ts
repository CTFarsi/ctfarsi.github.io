'use client';

import gsap from 'gsap';
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { TextPlugin } from 'gsap/TextPlugin';
import { useGSAP } from '@gsap/react';

// Register once, client-side only. Every motion component imports from here.
if (typeof window !== 'undefined') {
  gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText, ScrambleTextPlugin, TextPlugin);
}

/** Motion only runs for visitors who haven't asked the OS to reduce it. */
export const MOTION_OK = '(prefers-reduced-motion: no-preference)';

/** Pointer devices that can hover precisely (spotlight + magnetic effects). */
export const FINE_POINTER = '(hover: hover) and (pointer: fine)';

/**
 * Elements that fade/slide in as they enter the viewport. Keep in sync with the
 * pre-hydration hide rule in globals.css ("Motion bootstrap").
 */
export const REVEAL_SELECTOR = [
  '.section-head > *',
  '.page-intro > *',
  '.subsection-title',
  '.subsection-desc',
  '.card',
  '.step',
  '.join-item',
  '.faq details',
  '.rooted-tribute',
  '.cta-band',
  '.terminal',
  '.warmup-keys',
  '.community-banner',
  '.sponsor-card',
  '.author-member-card',
  '.section-foot',
  '.article-meta',
  '.article-title',
  '.article-lead',
  '.article-content > *',
  '.article-footer-nav',
].join(', ');

export { gsap, ScrollTrigger, SplitText, useGSAP };
