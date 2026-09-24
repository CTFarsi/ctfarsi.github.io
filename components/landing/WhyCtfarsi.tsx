import {
  IconBrain,
  IconGitHub,
  IconLayers,
  IconMap,
  IconServer,
  IconTrophy,
} from '@/components/Icons';
import { FEATURES } from '@/lib/content';
import { SectionHead } from './SectionHead';

const ICONS = {
  brain: IconBrain,
  server: IconServer,
  trophy: IconTrophy,
  github: IconGitHub,
  layers: IconLayers,
  map: IconMap,
};

export function WhyCtfarsi() {
  return (
    <section className="section">
      <div className="site-container">
        <SectionHead
          eyebrow="تفاوت ما"
          title="چرا CTFarsi؟"
          lead="در بسیاری از مسابقه‌های CTF، سرورها زیر بار از دسترس خارج می‌شوند، داوری شفاف نیست و جوایز با تأخیر یا شرط و شروط پرداخت می‌شوند. CTFarsi از دل جامعه شکل گرفته تا این تجربه تکرار نشود."
        />

        <div className="grid-3">
          {FEATURES.map((feature) => {
            const Icon = ICONS[feature.icon];
            return (
              <div key={feature.title} className="card card-hover">
                <span className="feature-icon">
                  <Icon />
                </span>
                <h3 className="card-title">{feature.title}</h3>
                <p className="card-body">{feature.body}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
