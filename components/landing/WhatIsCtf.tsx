import Link from 'next/link';
import { IconArrow } from '@/components/Icons';
import { CTF_STEPS } from '@/lib/content';
import { toFaDigits } from '@/lib/format';
import { SectionHead } from './SectionHead';

export function WhatIsCtf() {
  return (
    <section id="what-is-ctf" className="section section-alt">
      <div className="site-container">
        <SectionHead
          eyebrow="آشنایی"
          title="CTF چیست؟"
          lead="در مسابقه فتح پرچم باید یک ضعف امنیتی را پیدا کنید و از آن استفاده کنید تا به یک رشته متنی مخفی به نام «پرچم» برسید. هر چالش یک معماست و هر پرچم امتیاز دارد."
        />

        <ol className="steps">
          {CTF_STEPS.map((step, i) => (
            <li key={step.title} className="step">
              <span className="step-num">{toFaDigits(i + 1)}</span>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </li>
          ))}
        </ol>

        <div className="section-foot">
          <Link href="/article-what-is-ctf" className="text-link">
            راهنمای کامل CTF را بخوانید
            <IconArrow />
          </Link>
        </div>
      </div>
    </section>
  );
}
