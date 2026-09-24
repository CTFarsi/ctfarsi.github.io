import type { Metadata } from 'next';
import { CallbackHandler } from './CallbackHandler';

export const metadata: Metadata = {
  title: 'تأیید هویت گیت‌هاب',
  robots: { index: false },
};

export default function CallbackPage() {
  return (
    <div className="site-container">
      <CallbackHandler />
    </div>
  );
}
