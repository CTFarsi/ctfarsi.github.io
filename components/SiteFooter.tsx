import Link from 'next/link';
import { LINKS, NAV_ITEMS } from '@/lib/site';

export function SiteFooter() {
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
      <div className="site-container footer-bottom">
        <span className="mono">CTFarsi &bull; Rooted in Iran &bull; 2026</span>
      </div>
    </footer>
  );
}
