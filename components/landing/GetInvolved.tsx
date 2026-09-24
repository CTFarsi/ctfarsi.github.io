import Link from 'next/link';
import { SectionHead } from './SectionHead';

const AUDIENCES = [
  {
    role: 'شرکت‌کننده',
    title: 'در مسابقه بازی کنید',
    body: 'اگر به امنیت علاقه دارید، از تازه‌کار تا حرفه‌ای، جایی برای شما هست. تنها یا با تیم حداکثر چهار نفره شرکت کنید.',
    cta: 'ثبت‌نام تیم',
    href: '/register',
    color: 'var(--primary-soft)',
  },
  {
    role: 'طراح چالش',
    title: 'چالش طراحی کنید',
    body: 'اگر ایده‌ای برای یک چالش خلاقانه دارید، به کارگروه طراحان بپیوندید. هر چالش باید داکرایز شده باشد و اسکریپت حل داشته باشد.',
    cta: 'پیوستن به طراحان',
    href: '/authors',
    color: 'var(--saffron)',
  },
  {
    role: 'حامی',
    title: 'از رویداد حمایت کنید',
    body: 'شرکت‌ها می‌توانند چالشی روی محصول خود طراحی کنند، جایزه اهدا کنند و با حل‌کنندگان برتر برای استخدام در ارتباط باشند.',
    cta: 'اطلاعات حمایت',
    href: '/sponsors',
    color: 'var(--turquoise)',
  },
];

export function GetInvolved() {
  return (
    <section className="section section-alt">
      <div className="site-container">
        <SectionHead
          eyebrow="مشارکت"
          title="شما هم سهمی داشته باشید"
          lead="CTFarsi را جامعه می‌سازد. سه راه برای همراهی وجود دارد."
        />

        <div className="grid-3">
          {AUDIENCES.map((a) => (
            <div
              key={a.role}
              className="card audience"
              style={{ '--audience-color': a.color } as React.CSSProperties}
            >
              <div className="audience-role">{a.role}</div>
              <h3>{a.title}</h3>
              <p className="card-body">{a.body}</p>
              <Link href={a.href} className="btn btn-secondary btn-sm">
                {a.cta}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
