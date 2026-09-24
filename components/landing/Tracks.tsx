import { TRACKS } from '@/lib/content';
import { SectionHead } from './SectionHead';

export function Tracks() {
  return (
    <section className="section section-alt">
      <div className="site-container">
        <SectionHead
          eyebrow="حوزه‌ها"
          title="در چه حوزه‌هایی رقابت می‌کنید؟"
          lead="چالش‌ها در شش دسته طراحی می‌شوند. لازم نیست در همه حرفه‌ای باشید؛ بیشتر تیم‌ها کار را بین اعضا تقسیم می‌کنند."
        />

        <div className="grid-3">
          {TRACKS.map((track, i) => (
            <div
              key={track.en}
              className="card track"
              style={{ '--track-color': track.color } as React.CSSProperties}
            >
              <div className="track-meta">
                <span className="track-en">{track.en}</span>
                <span className="track-index">{String(i + 1).padStart(2, '0')}</span>
              </div>
              <h3 className="card-title">{track.title}</h3>
              <p className="card-body">{track.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
