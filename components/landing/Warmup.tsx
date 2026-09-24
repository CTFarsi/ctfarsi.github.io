import { TerminalDemo } from '@/components/motion/TerminalDemo';
import { SectionHead } from './SectionHead';

export function Warmup() {
  return (
    <section className="section">
      <div className="site-container warmup">
        <div>
          <SectionHead
            eyebrow="چالش گرم‌کردن"
            title="اولین پرچم در همین سایت است"
            lead="یک چالش ساده در همین صفحه پنهان شده. کنسول مرورگر را باز کنید، سرنخ را پیدا کنید و پرچم را با دستور ctfarsi.flag() ثبت کنید."
          />
          <p className="warmup-keys">
            باز کردن کنسول: <span className="mono">F12</span> یا{' '}
            <span className="mono">Ctrl+Shift+J</span>؛ در مک{' '}
            <span className="mono">Cmd+Option+J</span>
          </p>
        </div>

        <TerminalDemo />
      </div>
    </section>
  );
}
