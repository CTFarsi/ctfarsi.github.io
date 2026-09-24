import type { Metadata } from 'next';
import { PageIntro } from '@/components/PageIntro';
import { ParticipantsList } from '@/components/ParticipantsList';
import { RegisterForm } from '@/components/RegisterForm';

export const metadata: Metadata = {
  title: 'ثبت‌نام و فهرست تیم‌ها',
  description: 'ثبت‌نام تیم‌ها با حساب گیت‌هاب و مشاهده فهرست عمومی شرکت‌کنندگان CTFarsi.',
};

export default function RegisterPage() {
  return (
    <div className="site-container page">
      <PageIntro eyebrow="ثبت‌نام" title="ثبت‌نام تیم‌ها و شرکت‌کنندگان">
        ثبت‌نام با حساب گیت‌هاب انجام می‌شود و مشخصات هر تیم به شکل یک رکورد عمومی در مخزن رویداد
        ثبت می‌شود. هر تیم حداکثر چهار عضو دارد و شرکت انفرادی هم مجاز است.
      </PageIntro>

      <div className="grid-2">
        <RegisterForm />
        <ParticipantsList />
      </div>
    </div>
  );
}
