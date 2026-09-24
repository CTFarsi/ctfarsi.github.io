import { FAQ } from '@/lib/content';
import { FaqList } from './FaqList';
import { SectionHead } from './SectionHead';

export function Faq() {
  return (
    <section className="section section-alt">
      <div className="site-container">
        <SectionHead eyebrow="پرسش‌های رایج" title="سؤالی دارید؟" center />
        <FaqList items={FAQ} />
      </div>
    </section>
  );
}
