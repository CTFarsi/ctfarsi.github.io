import Link from 'next/link';
import status from '@/public/status.json';
import { IconGitHub, IconTelegram } from '@/components/Icons';
import { FLAG_FORMAT, LINKS } from '@/lib/site';
import { toFaDigits, toJalaliDate } from '@/lib/format';
import { HeroMotion } from '@/components/motion/HeroMotion';
import { TeamCount } from './TeamCount';

export function Hero() {
  return (
    <HeroMotion>
      <div className="site-container hero-grid">
        <div>
          <div className="hero-badges">
            <span className="hero-pill">
              <img src="/images/iran-cat-map.png" alt="" />
              ریشه در خاک، استوار در کد
            </span>
          </div>

          <h1 className="hero-title">
            مسابقه فتح پرچم (CTF)
            <span>برای جامعه امنیت فارسی‌زبان</span>
          </h1>

          <p className="hero-lead">
            CTFarsi رویدادی مستقل و جامعه‌محور است. شرکت‌کننده‌ها تنها یا در قالب تیم چالش‌های
            امنیتی را حل می‌کنند و با پیدا کردن هر «پرچم» امتیاز می‌گیرند. ثبت‌نام با حساب گیت‌هاب
            انجام می‌شود و فهرست تیم‌ها برای همه قابل مشاهده است.
          </p>

          <div className="hero-cta-group">
            <Link href="/register" className="btn btn-primary" data-magnetic>
              <IconGitHub size={18} />
              ثبت‌نام تیم با گیت‌هاب
            </Link>
            <a href={LINKS.telegram} target="_blank" rel="noopener" className="btn btn-secondary">
              <IconTelegram size={18} />
              عضویت در کانال تلگرام
            </a>
          </div>

          <p className="hero-note">
            با CTF آشنا نیستید؟{' '}
            <a href="#what-is-ctf" className="text-link">
              در سه قدم با آن آشنا شوید
            </a>
          </p>
        </div>

        <aside className="status-panel" aria-labelledby="status-title">
          <span className="status-brick is-start" aria-hidden="true" />
          <span className="status-brick is-end" aria-hidden="true" />
          <span className="status-scan-track" aria-hidden="true">
            <span className="status-scan" />
          </span>
          <div className="status-panel-head">
            <h2 id="status-title" className="status-panel-title">
              وضعیت رویداد
            </h2>
            <span className="status-live">
              <span className="live-dot" />
              LIVE
            </span>
          </div>
          <dl className="status-list">
            <div className="status-row">
              <dt>مرحله فعلی</dt>
              <dd>طراحی چالش‌ها و جذب حامیان</dd>
            </div>
            <div className="status-row">
              <dt>ثبت‌نام</dt>
              <dd className="status-accent">باز است</dd>
            </div>
            <div className="status-row">
              <dt>تیم‌های ثبت‌شده</dt>
              <dd>
                <TeamCount suffix=" تیم" />
              </dd>
            </div>
            <div className="status-row">
              <dt>اندازه تیم</dt>
              <dd>{toFaDigits(1)} تا {toFaDigits(4)} نفر</dd>
            </div>
            <div className="status-row">
              <dt>قالب پرچم</dt>
              <dd>
                <span className="mono" data-scramble>
                  {FLAG_FORMAT}
                </span>
              </dd>
            </div>
            <div className="status-row">
              <dt>زمان برگزاری</dt>
              <dd>به‌زودی در کانال تلگرام</dd>
            </div>
          </dl>
          <div className="status-panel-foot">آخرین به‌روزرسانی: {toJalaliDate(status.updated_at)}</div>
        </aside>
      </div>
    </HeroMotion>
  );
}
