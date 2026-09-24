import type { Metadata } from 'next';
import { PageIntro } from '@/components/PageIntro';
import { SponsorForm } from '@/components/SponsorForm';

export const metadata: Metadata = {
  title: 'حامیان',
  description:
    'دعوت از برندها و کسب‌وکارهای ایرانی برای حمایت مالی شفاف و اهدای جوایز به متخصصان امنیت سایبری.',
};

const TIERS = [
  {
    num: 'TIER // GOLD',
    title: 'حامی زرین (Gold Sponsor)',
    body: 'طراحی چالش اختصاصی روی معماری و محصول برند شما، درج لوگو در صدر رویداد، دسترسی مستقیم برای مصاحبه و جذب نفرات برتر، و اهدای جایزه اصلی به تیم‌های برنده.',
    tag: 'EXCLUSIVE CHALLENGE DESIGN',
  },
  {
    num: 'TIER // SILVER',
    title: 'حامی سیمین (Silver Sponsor)',
    body: 'درج نام تجاری در وب‌سایت و کانال تلگرام، تقدیر رسمی در اطلاعیه‌ها و معرفی فرصت‌های شغلی فنی شرکت.',
    tag: 'ECOSYSTEM BRANDING',
  },
  {
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
  return (
    <div className="site-container page">
      <PageIntro eyebrow="حمایت" title="روی متخصصان امنیت وب فارسی سرمایه‌گذاری کنید">
        CTFarsi بنر و لوگوی بی‌کاربرد نمی‌فروشد. برند و محصول حامیان در مرکز چالش‌ها قرار می‌گیرد و تمام
        مبلغ حمایت صرف جایزه برندگان می‌شود.
      </PageIntro>

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
        <p className="subsection-desc">سه سطح همکاری برای شرکت‌ها و تیم‌های فنی.</p>
        <div className="grid-3">
          {TIERS.map((t) => (
            <div key={t.num} className="card">
              <div className="card-num">{t.num}</div>
              <h3 className="card-title">{t.title}</h3>
              <p className="card-body">{t.body}</p>
              <span className="card-tag">{t.tag}</span>
            </div>
          ))}
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
