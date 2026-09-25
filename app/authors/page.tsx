import type { Metadata } from 'next';
import { PageIntro } from '@/components/PageIntro';
import { LINKS } from '@/lib/site';

export const metadata: Metadata = {
  title: 'طراحان چالش',
  description: 'کارگروه طراحان سناریو و معماران چالش‌های رویداد CTFarsi.',
};

const ACTIVE_AUTHORS = [
  {
    name: 'Matin',
    handle: '@m4tinbeigi-official',
    href: 'https://github.com/m4tinbeigi-official',
    avatar: 'https://github.com/m4tinbeigi-official.png',
    role: 'طراح ارشد سناریو و معمار چالش‌های Anti-AI',
    track: 'Web Exploitation, Logic Flaws & Binary Reversing',
  },
  {
    name: 'Erwin',
    handle: '@Erwinamm',
    href: 'https://x.com/Erwinamm',
    avatar: '/images/authors/erwinamm.png',
    role: 'طراح چالش و اعتبارسنجی سناریوها',
    track: 'Web, Infra & Challenge Validation',
  },
];

const PRINCIPLES = [
  {
    title: 'ایزولاسیون کامل کانتینر (Docker Isolation)',
    body: 'هر چالش شبکه یا وب باید در داکر ایزوله با کاربر غیر روت، سقف ۲۵۶ مگابایت رم، بدون دسترسی به اینترنت بیرونی و با Healthcheck بسته‌بندی شود.',
  },
  {
    title: 'لایه ضد هوش مصنوعی (Anti-AI Rigidity)',
    body: 'سناریو نباید با ارسال خام متن یا سورس‌کد به مدل‌های زبانی مانند ChatGPT حل شود. منطق چندلایه، ترنسپوزیشن و بایت‌های متغیر الزامی است.',
  },
  {
    title: 'اسکریپت حل (PoC Solver)',
    body: 'هیچ چالشی بدون اسکریپت پایتون تأییدشده‌ای که پرچم را در کمتر از ۱۰ ثانیه استخراج کند، در مخزن مرجع ادغام نمی‌شود.',
  },
  {
    title: 'پیوند با مسائل واقعی اکوسیستم ایران',
    body: 'اولویت با چالش‌هایی است که از ساختار واقعی وب، حمل‌ونقل، فین‌تک، مخابرات و سامانه‌های زیرساختی کشور الهام گرفته‌اند.',
  },
];

export default function AuthorsPage() {
  return (
    <div className="site-container page">
      <PageIntro eyebrow="طراحان چالش" title="کارگروه طراحان سناریو و معماران چالش‌ها">
        چالش‌های CTFarsi باید اصیل، عمیق و مقاوم در برابر حل تصادفی یا استفاده خام از ابزارهای هوش مصنوعی
        باشند. طراحان برگزیده برای بررسی سناریوها به گروه اختصاصی دعوت می‌شوند.
      </PageIntro>

      <div className="community-banner community-banner-saffron">
        <div className="community-content">
          <div className="community-kicker">گروه خصوصی • نیازمند تأیید ادمین</div>
          <h2>گروه محرمانه طراحان چالش‌های CTFarsi</h2>
          <p>
            عضویت فقط با تأیید مستقیم ادمین‌ها انجام می‌شود تا طرح‌ها، آسیب‌پذیری‌ها و اکسپلویت‌ها تا لحظه
            شروع مسابقه محرمانه بمانند.
          </p>
        </div>
        <div className="hero-cta-group">
          <a href={LINKS.authorsGroup} target="_blank" rel="noopener" className="btn btn-primary">
            درخواست عضویت در گروه طراحان
          </a>
          <a href={LINKS.authorIssueTemplate} target="_blank" rel="noopener" className="btn btn-secondary">
            ارسال پیشنهاد چالش در گیت‌هاب
          </a>
        </div>
      </div>

      <section className="subsection">
        <h2 className="subsection-title">طراحان فعال</h2>
        <p className="subsection-desc">متخصصانی که در حال طراحی و اعتبارسنجی چالش‌ها در مخزن خصوصی هستند.</p>
        <div className="grid-3">
          {ACTIVE_AUTHORS.map((author) => (
            <div key={author.handle} className="author-member-card">
              <img
                className="author-member-avatar"
                src={author.avatar}
                alt=""
                loading="lazy"
              />
              <div style={{ minWidth: 0 }}>
                <a
                  className="author-member-handle mono"
                  href={author.href}
                  target="_blank"
                  rel="noopener"
                >
                  {author.handle}
                </a>
                <div className="author-member-role">{author.role}</div>
                <div className="author-member-track">{author.track}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="subsection">
        <h2 className="subsection-title">اصول الزامی طراحی سؤال</h2>
        <p className="subsection-desc">
          هر چالش ارسالی باید این چهار اصل را رعایت کند. جزئیات کامل در راهنمای فنی طراحی چالش‌ها آمده است.
        </p>
        <div className="grid-2">
          {PRINCIPLES.map((p, i) => (
            <div key={p.title} className="card">
              <div className="card-num">PRINCIPLE // {String(i + 1).padStart(2, '0')}</div>
              <h3 className="card-title">{p.title}</h3>
              <p className="card-body">{p.body}</p>
            </div>
          ))}
        </div>
        <div className="section-foot">
          <a
            href={`${LINKS.repo}/blob/main/CHALLENGE_GUIDELINES.md`}
            target="_blank"
            rel="noopener"
            className="text-link"
          >
            راهنمای فنی طراحی چالش‌ها در گیت‌هاب
          </a>
        </div>
      </section>
    </div>
  );
}
