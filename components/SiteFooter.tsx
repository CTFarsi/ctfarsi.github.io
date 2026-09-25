import Link from 'next/link';
import { BUILDERS, LINKS, NAV_ITEMS, SPONSORS, TIER_LABELS } from '@/lib/site';

export function SiteFooter() {
  const goldSponsors = SPONSORS.filter((s) => s.tier === 'gold');

  return (
    <footer className="footer">
      <div className="site-container footer-grid">
        <div className="footer-about">
          <div className="footer-brand">
            <img src="/images/logo.svg" alt="" width={32} height={32} />
            <span>CTFarsi</span>
          </div>
          <p>مسابقه فتح پرچم مستقل و جامعه‌محور برای علاقه‌مندان امنیت سایبری فارسی‌زبان.</p>
          <a href={LINKS.rootedInIran} target="_blank" rel="noopener" className="footer-rooted-badge">
            <img src="/images/rooted-in-iran-artwork.jpg" alt="" className="footer-rooted-thumb" />
            <span>هویت بصری با الهام از rootediniran.com</span>
          </a>
        </div>

        <div>
          <h2 className="footer-heading">صفحه‌ها</h2>
          <ul className="footer-list">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="footer-heading">در ارتباط باشید</h2>
          <ul className="footer-list">
            <li>
              <a href={LINKS.telegram} target="_blank" rel="noopener">
                کانال تلگرام
              </a>
            </li>
            <li>
              <a href={LINKS.bot} target="_blank" rel="noopener">
                ربات مسابقه
              </a>
            </li>
            <li>
              <a href={LINKS.githubOrg} target="_blank" rel="noopener">
                سازمان گیت‌هاب
              </a>
            </li>
          </ul>
        </div>
      </div>

      {(goldSponsors.length > 0 || BUILDERS.length > 0) && (
        <div className="site-container footer-credits">
          {goldSponsors.length > 0 && (
            <div className="footer-sponsors">
              {goldSponsors.map((s) => (
                <a
                  key={s.href}
                  href={s.href}
                  target="_blank"
                  rel="noopener"
                  className="footer-sponsor"
                >
                  <img src={s.logo} alt="" width={28} height={28} />
                  <span>
                    {TIER_LABELS.gold.fa}: <strong dir="ltr">{s.name}</strong>
                  </span>
                </a>
              ))}
            </div>
          )}
          <p className="footer-builders">
            ساخته‌شده توسط{' '}
            {BUILDERS.map((b, i) => (
              <span key={b.href}>
                {i > 0 && (i === BUILDERS.length - 1 ? ' و ' : '، ')}
                <a href={b.href} target="_blank" rel="noopener">
                  {b.name} <span dir="ltr" className="mono">{b.handle}</span>
                </a>
              </span>
            ))}
          </p>
        </div>
      )}

      <div className="site-container footer-bottom">
        <span className="mono">CTFarsi &bull; Rooted in Iran &bull; 2026</span>
      </div>
    </footer>
  );
}
