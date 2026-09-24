import Link from 'next/link';
import { IconArrow, IconGitHub, IconTelegram } from '@/components/Icons';
import { LINKS } from '@/lib/site';

export function Tribute() {
  return (
    <section className="section">
      <div className="site-container">
        <div className="rooted-tribute">
          <a href={LINKS.rootedInIran} target="_blank" rel="noopener">
            <img src="/images/rooted-in-iran-artwork.jpg" alt="اثر هنری پویش ریشه در خاک" />
          </a>
          <div className="rooted-tribute-info">
            <h3>هویت بصری ما از «ریشه در خاک» الهام گرفته است</h3>
            <p>
              رنگ‌ها، فونت پیدا و نمادهای معماری این رویداد با ادای احترام به پویش «ریشه در خاک»
              (Rooted in Iran) انتخاب شده‌اند؛ روایتی از ایستادگی و اصالت مهندسی ایران.
            </p>
            <a href={LINKS.rootedInIran} target="_blank" rel="noopener" className="text-link">
              <span dir="ltr">rootediniran.com</span>
              <IconArrow />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export function FinalCta() {
  return (
    <section className="section" style={{ paddingTop: 0 }}>
      <div className="site-container">
        <div className="cta-band">
          <h2>آماده‌اید؟</h2>
          <p>تیمتان را ثبت کنید و در کانال تلگرام عضو شوید تا اولین اطلاعیه‌ها را از دست ندهید.</p>
          <div className="hero-cta-group">
            <Link href="/register" className="btn btn-primary" data-magnetic>
              <IconGitHub size={18} />
              ثبت‌نام تیم
            </Link>
            <a href={LINKS.telegram} target="_blank" rel="noopener" className="btn btn-secondary">
              <IconTelegram size={18} />
              عضویت در کانال تلگرام
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
