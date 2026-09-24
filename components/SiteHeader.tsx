'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { useAuth } from './AuthProvider';
import { IconClose, IconGitHub, IconMenu } from './Icons';
import { LINKS, NAV_ITEMS } from '@/lib/site';
import { avatarOf, displayNameOf } from '@/lib/auth';
import { MOTION_OK, ScrollTrigger, gsap, useGSAP } from '@/lib/gsap';

function isActive(pathname: string, href: string) {
  const path = pathname.replace(/\.html$/, '').replace(/\/$/, '') || '/';
  if (href === '/') return path === '/';
  if (href === '/articles') return path === '/articles' || path.startsWith('/article-');
  return path === href;
}

export function SiteHeader() {
  const pathname = usePathname() || '/';
  const { user, ready, login, logout } = useAuth();
  const [open, setOpen] = useState(false);

  const headerRef = useRef<HTMLElement>(null);
  const openRef = useRef(open);
  openRef.current = open;

  // Close the mobile menu on navigation.
  useEffect(() => setOpen(false), [pathname]);

  // ...and on Escape.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  // Reading-progress bar, elevated "scrolled" state, and hide-on-scroll-down.
  useGSAP(
    () => {
      const header = headerRef.current!;
      const setProgress = gsap.quickSetter(header.querySelector('.scroll-progress'), 'scaleX');
      const canHide = window.matchMedia(MOTION_OK).matches;
      let hidden = false;

      const show = (visible: boolean) => {
        if (hidden !== visible) return;
        hidden = !visible;
        gsap.to(header, { yPercent: visible ? 0 : -100, duration: 0.35, ease: 'power2.out', overwrite: true });
      };

      ScrollTrigger.create({
        start: 0,
        end: 'max',
        onRefresh: (self) => setProgress(self.progress),
        onUpdate: (self) => {
          const y = self.scroll();
          setProgress(self.progress);
          header.classList.toggle('is-scrolled', y > 8);
          if (!canHide) return;
          show(openRef.current || y < 160 || self.direction === -1);
        },
      });
    },
    { scope: headerRef, dependencies: [pathname], revertOnUpdate: true },
  );

  // Mobile menu: panel wipes down, links cascade in.
  useGSAP(
    () => {
      if (!open || !window.matchMedia(`(max-width: 1140px) and ${MOTION_OK}`).matches) return;
      gsap.fromTo(
        '.nav',
        { clipPath: 'inset(0 0 100% 0)' },
        { clipPath: 'inset(0 0 0% 0)', duration: 0.45, ease: 'power3.out' },
      );
      gsap.fromTo(
        '.nav a',
        { autoAlpha: 0, x: 16 },
        { autoAlpha: 1, x: 0, stagger: 0.04, duration: 0.4, delay: 0.1, ease: 'power2.out' },
      );
    },
    { scope: headerRef, dependencies: [open], revertOnUpdate: true },
  );

  return (
    <header className="header" ref={headerRef}>
      <div className="site-container header-inner">
        <Link href="/" className="brand" aria-label="CTFarsi، صفحه اصلی">
          <img src="/images/logo.svg" alt="" className="brand-logo" width={40} height={40} />
          <span className="brand-text">
            <span className="brand-title">CTFarsi</span>
            <span className="brand-sub">ROOTED IN IRAN</span>
          </span>
        </Link>

        <nav className={`nav${open ? ' nav-open' : ''}`} id="site-nav" aria-label="منوی اصلی">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={isActive(pathname, item.href) ? 'active' : undefined}
              aria-current={isActive(pathname, item.href) ? 'page' : undefined}
            >
              {item.label}
            </Link>
          ))}
          <a href={LINKS.telegram} target="_blank" rel="noopener" className="nav-telegram-mobile">
            کانال تلگرام {LINKS.telegramHandle}
          </a>
        </nav>

        <div className="header-actions">
          <a href={LINKS.telegram} target="_blank" rel="noopener" className="tg-badge">
            <span className="tg-badge-dot" />
            <span dir="ltr">{LINKS.telegramHandle}</span>
          </a>

          {ready && user ? (
            <div className="user-header-badge">
              <img src={avatarOf(user)} alt="" className="user-header-avatar" />
              <span className="user-header-name">{displayNameOf(user)}</span>
              <button type="button" onClick={logout} className="user-logout-btn" title="خروج از حساب">
                خروج
              </button>
            </div>
          ) : (
            <button type="button" className="btn btn-primary btn-sm" onClick={login}>
              <IconGitHub size={16} />
              ورود با گیت‌هاب
            </button>
          )}

          <button
            type="button"
            className="menu-toggle"
            aria-expanded={open}
            aria-controls="site-nav"
            aria-label={open ? 'بستن منو' : 'باز کردن منو'}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <IconClose /> : <IconMenu />}
          </button>
        </div>
      </div>
      <span className="scroll-progress" aria-hidden="true" />
    </header>
  );
}
