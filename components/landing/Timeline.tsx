import { TimelineTrack } from '@/components/motion/TimelineTrack';
import { TIMELINE, type TimelineState } from '@/lib/content';
import { SectionHead } from './SectionHead';

const STATE_LABEL: Record<TimelineState, string> = {
  done: 'انجام شد',
  current: 'اکنون',
  upcoming: 'در پیش',
};

export function Timeline() {
  return (
    <section className="section section-alt">
      <div className="site-container">
        <SectionHead
          eyebrow="مسیر رویداد"
          title="الان کجای کار هستیم؟"
          lead="CTFarsi در حال آماده شدن است. هر مرحله که جلو برود، اطلاعیه‌اش در کانال تلگرام منتشر می‌شود."
        />

        <TimelineTrack>
          {TIMELINE.map((item) => (
            <li key={item.title} className={`timeline-item is-${item.state}`}>
              <span className="timeline-rail" aria-hidden="true">
                <span className="timeline-fill" />
              </span>
              <span className="timeline-dot" aria-hidden="true">
                {item.state === 'current' && <span className="timeline-ping" />}
              </span>
              <span className="timeline-state">{STATE_LABEL[item.state]}</span>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </li>
          ))}
        </TimelineTrack>
      </div>
    </section>
  );
}
