import Link from 'next/link';
import { IconGitHub, IconTelegram } from '@/components/Icons';
import { JOIN_STEPS } from '@/lib/content';
import { toFaDigits } from '@/lib/format';
import { LINKS } from '@/lib/site';
import { SectionHead } from './SectionHead';
import { TeamCount } from './TeamCount';

export function HowToJoin() {
  return (
    <section id="join" className="section">
      <div className="site-container">
        <SectionHead
          eyebrow="شروع"
          title="چطور شرکت کنم؟"
          lead="ثبت‌نام چند دقیقه بیشتر طول نمی‌کشد. فقط به یک حساب گیت‌هاب نیاز دارید."
        />

        <div className="join-layout">
          <ol className="join-list">
            {JOIN_STEPS.map((step, i) => (
              <li key={step.title} className="join-item">
                <span className="join-num">{toFaDigits(i + 1)}</span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </div>
              </li>
            ))}
          </ol>

          <div className="card join-card">
            <h3>آماده ثبت‌نام هستید؟</h3>
            <p>با گیت‌هاب وارد شوید تا فرم به‌صورت خودکار پر شود. ثبت نهایی به شکل یک Issue عمومی در مخزن رویداد انجام می‌شود.</p>
            <Link href="/register" className="btn btn-primary btn-block">
              <IconGitHub size={18} />
              رفتن به فرم ثبت‌نام
            </Link>
            <a href={LINKS.telegram} target="_blank" rel="noopener" className="btn btn-secondary btn-block">
              <IconTelegram size={18} />
              کانال تلگرام <span dir="ltr">{LINKS.telegramHandle}</span>
            </a>
            <div className="join-count">
              <span className="live-dot" />
              <span>
                تا امروز <TeamCount suffix=" تیم" /> ثبت‌نام کرده‌اند.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
