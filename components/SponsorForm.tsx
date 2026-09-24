'use client';

import { useEffect, useState } from 'react';
import { useAuth } from './AuthProvider';
import { displayNameOf, readStoredTelegram } from '@/lib/auth';
import { newIssueUrl } from '@/lib/github';

export function SponsorForm() {
  const { user, ready } = useAuth();
  const [company, setCompany] = useState('');
  const [contact, setContact] = useState('');
  const [channel, setChannel] = useState('');
  const [desc, setDesc] = useState('');

  useEffect(() => {
    if (!ready || !user) return;
    setContact((v) => v || displayNameOf(user));
    setChannel((v) => v || readStoredTelegram());
  }, [ready, user]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const body =
      '### درخواست حمایت از رویداد CTFarsi\n\n' +
      '- **نام برند یا شرکت:** ' + company.trim() + '\n' +
      '- **نماینده و سمت:** ' + contact.trim() + '\n' +
      '- **راه ارتباطی:** ' + channel.trim() + '\n\n' +
      '#### نوع همکاری یا پیشنهاد جایزه\n' +
      (desc.trim() || 'در جلسه هماهنگی توضیح داده می‌شود.');

    window.open(
      newIssueUrl('[SPONSORSHIP]: ' + company.trim(), body, 'sponsorship'),
      '_blank',
      'noopener',
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="input-group">
        <label className="input-label" htmlFor="spCompany">
          نام برند یا شرکت
        </label>
        <input
          id="spCompany"
          className="input-field"
          placeholder="نام شرکت یا برند"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          required
        />
      </div>
      <div className="input-group">
        <label className="input-label" htmlFor="spContact">
          نام نماینده و سمت
        </label>
        <input
          id="spContact"
          className="input-field"
          placeholder="نام و عنوان شغلی"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          required
        />
      </div>
      <div className="input-group">
        <label className="input-label" htmlFor="spChannel">
          راه ارتباطی (آیدی تلگرام یا ایمیل کاری)
        </label>
        <input
          id="spChannel"
          className="input-field"
          dir="ltr"
          placeholder="@telegram_handle / info@company.ir"
          value={channel}
          onChange={(e) => setChannel(e.target.value)}
          required
        />
      </div>
      <div className="input-group">
        <label className="input-label" htmlFor="spDesc">
          نوع همکاری یا پیشنهاد جایزه
        </label>
        <textarea
          id="spDesc"
          className="input-field"
          rows={4}
          placeholder="توضیح کوتاه درباره نوع حمایت یا زمینه‌ای که برای طراحی چالش در نظر دارید"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
      </div>
      <button type="submit" className="btn btn-primary btn-block">
        ثبت درخواست همکاری در گیت‌هاب
      </button>
      <p className="form-note">
        یک Issue عمومی در مخزن رویداد باز می‌شود. اگر نمی‌خواهید اطلاعات عمومی شود، از طریق تلگرام پیام دهید.
      </p>
    </form>
  );
}
