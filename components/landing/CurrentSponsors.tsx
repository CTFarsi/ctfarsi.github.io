import { IconArrow } from '@/components/Icons';
import { SPONSORS, TIER_LABELS } from '@/lib/site';
import { SectionHead } from './SectionHead';

/** Landing strip for confirmed sponsors. Inclusive copy so every tier feels welcome. */
export function CurrentSponsors() {
  const sponsors = [...SPONSORS];
  if (sponsors.length === 0) return null;

  return (
    <section className="section">
      <div className="site-container">
        <SectionHead
          eyebrow="حمایت"
          title="حامیان رویداد"
          lead="CTFarsi با همراهی برندهایی پیش می‌رود که روی جامعه امنیت فارسی سرمایه‌گذاری می‌کنند. جای خالی برای حامیان بیشتر باز است."
        />
        <div className="sponsor-grid">
          {sponsors.map((s) => (
            <a
              key={s.href}
              href={s.href}
              target="_blank"
              rel="noopener"
              className={`sponsor-card sponsor-card-${s.tier}`}
            >
              <img
                className="sponsor-card-logo"
                src={s.logo}
                alt=""
                width={56}
                height={56}
              />
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
      </div>
    </section>
  );
}
