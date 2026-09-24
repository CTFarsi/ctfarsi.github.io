'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { storeUser } from '@/lib/auth';

type State =
  | { kind: 'loading' }
  | { kind: 'ok'; login: string }
  | { kind: 'error'; message: string };

export function CallbackHandler() {
  const [state, setState] = useState<State>({ kind: 'loading' });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    // NOTE: ported as-is from the original callback.html. The OAuth `code` is not
    // exchanged (no backend), so this falls back to a fixed account.
    const targetUser = params.get('user') || params.get('login') || 'm4tinbeigi-official';

    fetch('https://api.github.com/users/' + encodeURIComponent(targetUser))
      .then((res) => {
        if (!res.ok) throw new Error('خطا در دریافت پروفایل از گیت‌هاب');
        return res.json();
      })
      .then((data) => {
        if (!data.login) throw new Error('حساب کاربری یافت نشد');
        storeUser({
          login: data.login,
          name: data.name || data.login,
          avatar_url: data.avatar_url || `https://github.com/${data.login}.png`,
          bio: data.bio || '',
          html_url: data.html_url || `https://github.com/${data.login}`,
          public_repos: data.public_repos || 0,
          followers: data.followers || 0,
        });
        setState({ kind: 'ok', login: data.login });
        setTimeout(() => {
          window.location.href = '/register';
        }, 800);
      })
      .catch((err: Error) => {
        setState({ kind: 'error', message: err.message || 'پاسخی از سرورهای گیت‌هاب دریافت نشد.' });
      });
  }, []);

  return (
    <div className="card callback-card">
      <img src="/images/logo.svg" alt="" width={54} height={54} style={{ marginBottom: 20 }} />
      {state.kind === 'loading' && (
        <>
          <div className="callback-status">CONNECTING TO GITHUB...</div>
          <h1 className="card-title">در حال تأیید هویت گیت‌هاب</h1>
          <p className="card-body">در حال دریافت اطلاعات حساب از گیت‌هاب…</p>
        </>
      )}
      {state.kind === 'ok' && (
        <>
          <div className="callback-status ok">AUTHENTICATED</div>
          <h1 className="card-title">
            خوش آمدید، <span dir="ltr">@{state.login}</span>
          </h1>
          <p className="card-body">هویت شما از گیت‌هاب تأیید شد. در حال انتقال به صفحه ثبت‌نام…</p>
        </>
      )}
      {state.kind === 'error' && (
        <>
          <div className="callback-status err">ERROR</div>
          <h1 className="card-title">خطا در ارتباط با گیت‌هاب</h1>
          <p className="card-body" style={{ marginBottom: 24 }}>
            {state.message}
          </p>
          <Link href="/register" className="btn btn-primary">
            تلاش دوباره
          </Link>
        </>
      )}
    </div>
  );
}
