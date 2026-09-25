import type { Metadata } from 'next';
import { PageIntro } from '@/components/PageIntro';
import { SponsorForm } from '@/components/SponsorForm';
import { IconArrow } from '@/components/Icons';
import { SPONSORS, TIER_LABELS, type SponsorTier } from '@/lib/site';

export const metadata: Metadata = {
  title: 'حامیان',
  description:
    'دعوت از برندها و کسب‌وکارهای ایرانی برای حمایت مالی شفاف و اهدای جوایز به متخصصان امنیت سایبری.',
};

const TIERS: {
  key: SponsorTier;
  num: string;
  title: string;
  body: string;
  tag: string;
}[] = [
  {
    key: 'gold',
    num: 'TIER // GOLD',
    title: 'حامی زرین (Gold Sponsor)',
    body: 'طراحی چالش اختصاصی روی معماری و محصول برند شما، درج لوگو در صدر رویداد، دسترسی مستقیم برای مصاحبه و جذب نفرات برتر، و اهدای جایزه اصلی به تیم‌های برنده.',
    tag: 'EXCLUSIVE CHALLENGE DESIGN',
  },
  {
    key: 'silver',
    num: 'TIER // SILVER',
    title: 'حامی سیمین (Silver Sponsor)',
    body: 'درج نام تجاری در وب‌سایت و کانال تلگرام، تقدیر رسمی در اطلاعیه‌ها و معرفی فرصت‌های شغلی فنی شرکت.',
    tag: 'ECOSYSTEM BRANDING',
  },
  {
    key: 'infrastructure',
    num: 'TIER // INFRASTRUCTURE',
    title: 'حامی زیرساخت ابری (Cloud Partner)',
    body: 'تأمین سرورها و پایداری کانتینرها در طول مسابقه، با دسترس‌پذیری کامل برای شرکت‌کنندگان سراسر کشور.',
    tag: 'HIGH AVAILABILITY SERVERS',
  },
];

const WHY = [
  {
    title: 'چالش روی محصول شما',
    body: 'چالش‌های وب، مهندسی معکوس و API مستقیماً روی بستر یا نمونه‌کد شما طراحی می‌شوند و متخصصان ساعت‌ها محصولتان را بررسی می‌کنند.',
  },
  {
    title: 'صد درصد مبلغ برای جوایز',
    body: 'تمام مبالغ حامیان به‌طور کامل و عمومی صرف جوایز نقدی و سخت‌افزاری برگزیدگان می‌شود.',
  },
  {
    title: 'مسیر مستقیم استخدام',
    body: 'به فهرست کسانی که چالش اختصاصی شما را با روش‌های خلاقانه یا زودتر از همه حل کرده‌اند دسترسی خواهید داشت.',
  },
];

export default function SponsorsPage() {
  const confirmed = SPONSORS;

  return (
    <div className="site-container page">
      <PageIntro eyebrow="حمایت" title="روی متخصصان امنیت وب فارسی سرمایه‌گذاری کنید">
        CTFarsi بنر و لوگوی بی‌کاربرد نمی‌فروشد. برند و محصول حامیان در مرکز چالش‌ها قرار می‌گیرد و تمام
        مبلغ حمایت صرف جایزه برندگان می‌شود.
      </PageIntro>

      {confirmed.length > 0 && (
        <section className="subsection">
          <h2 className="subsection-title">حامیان فعلی</h2>
          <p className="subsection-desc">
            برندهایی که تا امروز به رویداد پیوسته‌اند. جای خالی برای حامیان بیشتر باز است.
          </p>
          <div className="sponsor-grid">
            {confirmed.map((s) => (
              <a
                key={s.href}
                href={s.href}
                target="_blank"
                rel="noopener"
                className={`sponsor-card sponsor-card-${s.tier}`}
              >
                <img className="sponsor-card-logo" src={s.logo} alt="" width={56} height={56} />
                <div className="sponsor-card-body">
                  <div className="sponsor-card-kicker">{TIER_LABELS[s.tier].en}</div>
                  <h3>{s.nameFa}</h3>
                  <p>{s.blurb}</p>
                  <span className="text-link">
                    <span dir="ltr">{s.href.replace(/^https?:\/\//, '')}</span>
                    <IconArrow />
                  </span>
                </div>
              </a>
            ))}
          </div>
        </section>
      )}

      <section className="subsection">
        <h2 className="subsection-title">چرا حامی CTFarsi شوید؟</h2>
        <p className="subsection-desc">مدل حمایت ما بر پایه مشارکت واقعی در چالش‌هاست، نه تبلیغ.</p>
        <div className="grid-3">
          {WHY.map((w) => (
            <div key={w.title} className="card">
              <h3 className="card-title">{w.title}</h3>
              <p className="card-body">{w.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="subsection">
        <h2 className="subsection-title">بسته‌های حمایت</h2>
        <p className="subsection-desc">سه سطح همکاری برای شرکت‌ها و تیم‌های فنی. کنار هم رشد می‌کنیم.</p>
        <div className="grid-3">
          {TIERS.map((t) => {
            const inTier = confirmed.filter((s) => s.tier === t.key);
            return (
              <div key={t.num} className="card">
                <div className="card-num">{t.num}</div>
                <h3 className="card-title">{t.title}</h3>
                <p className="card-body">{t.body}</p>
                {inTier.length > 0 && (
                  <ul className="sponsor-tier-list">
                    {inTier.map((s) => (
                      <li key={s.href}>
                        <a href={s.href} target="_blank" rel="noopener">
                          <img src={s.logo} alt="" width={22} height={22} />
                          <span dir="ltr">{s.name}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
                <span className="card-tag">{t.tag}</span>
              </div>
            );
          })}
        </div>
      </section>

      <div className="card" style={{ maxWidth: 720, margin: '24px auto 0', padding: 36 }}>
        <h2 className="form-title" style={{ marginBottom: 10 }}>
          درخواست حمایت یا همکاری در طراحی چالش
        </h2>
        <p className="card-body" style={{ marginBottom: 24 }}>
          مدیران امنیت و روابط عمومی شرکت‌ها می‌توانند درخواست خود را اینجا ثبت کنند یا مستقیماً در تلگرام
          هماهنگ کنند.
        </p>
        <SponsorForm />
      </div>
    </div>
  );
}
