import type { Metadata, Viewport } from 'next';
import { AuthProvider } from '@/components/AuthProvider';
import { ConsoleEasterEgg } from '@/components/ConsoleEasterEgg';
import { MotionMain } from '@/components/motion/MotionMain';
import { SiteFooter } from '@/components/SiteFooter';
import { SiteHeader } from '@/components/SiteHeader';
import { SITE_URL } from '@/lib/site';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'CTFarsi • مسابقه فتح پرچم جامعه امنیت فارسی‌زبان',
    template: '%s • CTFarsi',
  },
  description:
    'CTFarsi مسابقه فتح پرچم (CTF) مستقل و جامعه‌محور برای علاقه‌مندان امنیت سایبری فارسی‌زبان است؛ با چالش‌های مقاوم در برابر هوش مصنوعی، زیرساخت پایدار و ثبت‌نام شفاف با گیت‌هاب.',
  icons: { icon: '/images/logo.svg' },
  openGraph: {
    type: 'website',
    locale: 'fa_IR',
    siteName: 'CTFarsi',
    images: ['/images/logo.png'],
  },
};

export const viewport: Viewport = {
  themeColor: '#0d0f12',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa" dir="rtl">
      <body>
        <AuthProvider>
          <a href="#main" className="skip-link">
            رفتن به محتوای اصلی
          </a>
          <SiteHeader />
          <MotionMain>{children}</MotionMain>
          <SiteFooter />
          <ConsoleEasterEgg />
        </AuthProvider>
      </body>
    </html>
  );
}
