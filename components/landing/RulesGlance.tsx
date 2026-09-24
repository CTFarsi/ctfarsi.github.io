import Link from 'next/link';
import { IconArrow } from '@/components/Icons';
import { RULES } from '@/lib/content';
import { toFaDigits } from '@/lib/format';
import { SectionHead } from './SectionHead';

export function RulesGlance() {
  return (
    <section className="section">
      <div className="site-container">
        <SectionHead
          eyebrow="قوانین"
          title="قوانین در یک نگاه"
          lead="چهار قانونی که باید پیش از شروع بدانید. متن کامل در صفحه قوانین آمده است."
        />

        <div className="grid-2">
          {RULES.map((rule, i) => (
            <div key={rule.title} className="card rule">
              <span className="rule-num">{toFaDigits(i + 1)}</span>
              <div>
                <h3>{rule.title}</h3>
                <p>{rule.body}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="section-foot">
          <Link href="/rules" className="text-link">
            متن کامل قوانین
            <IconArrow />
          </Link>
        </div>
      </div>
    </section>
  );
}
