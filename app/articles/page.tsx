import type { Metadata } from 'next';
import Link from 'next/link';
import { PageIntro } from '@/components/PageIntro';

export const metadata: Metadata = {
  title: 'مقالات و پایگاه دانش',
  description:
    'مقالات تخصصی، تحلیل‌های امنیتی، راهنماهای فتح پرچم و روش‌های طراحی چالش‌های پیشرفته سایبری.',
};

const UPCOMING = [
  {
    num: 'PAPER // 02',
    title: 'طراحی چالش‌های ضد هوش مصنوعی (Anti-AI Rigidity)',
    body: 'چطور با ترنسپوزیشن متغیر، ابهام‌زدایی در زمان اجرا و ایزولاسیون منطقی جلوی حل تصادفی چالش‌ها با مدل‌های زبانی بزرگ را بگیریم.',
    tag: 'METHODOLOGY // SOON',
  },
  {
    num: 'PAPER // 03',
    title: 'مهار شرایط رقابتی (Race Conditions) در ریزسرویس‌های مالی',
    body: 'تحلیل رخنه‌های همزمانی تراکنش در پایگاه‌داده‌های توزیع‌شده، روش‌های قفل‌گذاری بهینه و درس‌هایی برای پایداری نئوبانک‌ها.',
    tag: 'FINTECH DEFENSE // SOON',
  },
  {
    num: 'PAPER // 04',
    title: 'نشت متادیتا و جعل درخواست (SSRF) در زیرساخت ابری',
    body: 'روش‌های نفوذ به متادیتای زیرساخت‌های ابری و کوبرنتیز با دور زدن نرمال‌سازی آدرس IP و راهکارهای مقاوم‌سازی.',
    tag: 'CLOUD SECURITY // SOON',
  },
];

export default function ArticlesPage() {
  return (
    <div className="site-container page">
      <PageIntro eyebrow="مقالات" title="پایگاه مقالات و دانش‌نامه امنیت">
        تحلیل‌های فنی، راهنماهای آموزشی و کالبدشکافی رخنه‌های امنیتی که طراحان و اعضای جامعه CTFarsi
        آماده کرده‌اند.
      </PageIntro>

      <article className="card featured-article">
        <div className="featured-meta">
          <strong>راهنمای ویژه</strong>
          <span>&bull;</span>
          <span>۱۲ دقیقه مطالعه</span>
        </div>
        <h2>
          <Link href="/article-what-is-ctf">
            مسابقات فتح پرچم (CTF) چیست؟ کالبدشکافی میدان نبرد سایبری و هنر نفوذ اخلاقی
          </Link>
        </h2>
        <p>
          تاریخچه مسابقات از DEF CON 1996 تا امروز، تفاوت قالب‌های Jeopardy و Attack-Defense، معرفی دسته‌های
          وب، باینری، مهندسی معکوس و رمزنگاری، و دلیل نیاز اکوسیستم فناوری ایران به آزمون‌های واقعی.
        </p>
        <div>
          <Link href="/article-what-is-ctf" className="btn btn-primary btn-sm">
            خواندن مقاله
          </Link>
        </div>
      </article>

      <h2 className="subsection-title" style={{ marginBottom: 20 }}>
        به‌زودی
      </h2>
      <div className="grid-3">
        {UPCOMING.map((a) => (
          <div key={a.num} className="card">
            <div className="card-num">{a.num}</div>
            <h3 className="card-title">{a.title}</h3>
            <p className="card-body">{a.body}</p>
            <span className="card-tag">{a.tag}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
