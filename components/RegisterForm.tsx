'use client';

import { useEffect, useState } from 'react';
import { useAuth } from './AuthProvider';
import { IconGitHub } from './Icons';
import { avatarOf, displayNameOf, readStoredTelegram, storeTelegram } from '@/lib/auth';
import { newIssueUrl } from '@/lib/github';

const DEFAULT_FOCUS = 'Full Spectrum & Anti-AI';

export function RegisterForm() {
  const { user, ready, login, logout } = useAuth();
  const [teamName, setTeamName] = useState('');
  const [handle, setHandle] = useState('');
  const [telegram, setTelegram] = useState('');
  const [focus, setFocus] = useState('');

  // Pre-fill from the GitHub session; never overwrite what the user already typed.
  useEffect(() => {
    if (!ready) return;
    if (user) {
      setHandle(user.login);
      setTeamName((v) => v || 'تیم ' + displayNameOf(user));
      setFocus((v) => v || DEFAULT_FOCUS);
      setTelegram((v) => v || readStoredTelegram());
    } else {
      setHandle('');
    }
  }, [ready, user]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const login = (user ? user.login : handle.trim().replace(/^@/, '')) || 'anonymous';
    const team = teamName.trim() || login;
    const tg = telegram.trim();
    if (tg) storeTelegram(tg);

    // Field labels must match what .github/scripts/process_registration.js parses.
    const body =
      '### فرم ثبت‌نام مسابقه CTFarsi\n\n' +
      '- **شناسه گیت‌هاب:** @' + login + '\n' +
      '- **نام تیم / مستعار:** ' + team + '\n' +
      '- **راه ارتباطی تلگرام:** ' + (tg || 'ثبت نشده') + '\n' +
      '- **تمرکز تخصصی:** ' + (focus.trim() || DEFAULT_FOCUS) + '\n\n' +
      '#### تعهدات فنی\n' +
      '- [x] تعهد به عدم اجرای حملات ترافیکی (DoS/DDoS) علیه زیرساخت مسابقه\n' +
      '- [x] تعهد به عدم انتشار یا خرید و فروش فلگ‌ها تا پایان رسمی رقابت';

    window.open(
      newIssueUrl('[REGISTRATION]: @' + login + ' (' + team + ')', body, 'registration,participant'),
      '_blank',
      'noopener',
    );
  }

  return (
    <div className="card">
      <h2 className="form-title">فرم ثبت تیم</h2>

      {ready && user ? (
        <div className="notice notice-success">
          <div className="auth-user">
            <img src={avatarOf(user)} alt="" />
            <div>
              <div className="auth-user-name">{displayNameOf(user)}</div>
              <div className="auth-user-meta">
                <span className="mono">@{user.login}</span> &bull; <b>تأییدشده با گیت‌هاب</b>
              </div>
            </div>
          </div>
          <button type="button" className="btn btn-secondary btn-sm" onClick={logout}>
            خروج
          </button>
        </div>
      ) : (
        <div className="notice notice-info">
          <span>با گیت‌هاب وارد شوید تا فرم خودکار پر شود.</span>
          <button type="button" className="btn btn-primary btn-sm" onClick={login}>
            <IconGitHub size={16} />
            ورود با گیت‌هاب
          </button>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label className="input-label" htmlFor="regTeamName">
            نام تیم یا نام مستعار
          </label>
          <input
            id="regTeamName"
            className="input-field"
            placeholder="مثال: Chapar Sec"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            maxLength={60}
            required
          />
        </div>

        <div className="input-group">
          <label className="input-label" htmlFor="regGithubHandle">
            شناسه گیت‌هاب کاپیتان
          </label>
          <input
            id="regGithubHandle"
            className="input-field"
            dir="ltr"
            placeholder="github-username"
            value={handle}
            onChange={(e) => setHandle(e.target.value)}
            readOnly={Boolean(user)}
            required
          />
          {!user && <span className="input-hint">اگر با گیت‌هاب وارد شوید، این فیلد خودکار پر می‌شود.</span>}
        </div>

        <div className="input-group">
          <label className="input-label" htmlFor="regTelegram">
            آیدی تلگرام کاپیتان
          </label>
          <input
            id="regTelegram"
            className="input-field"
            dir="ltr"
            placeholder="@your_telegram_id"
            value={telegram}
            onChange={(e) => setTelegram(e.target.value)}
            maxLength={40}
            required
          />
        </div>

        <div className="input-group">
          <label className="input-label" htmlFor="regFocus">
            حوزه تخصصی تیم
          </label>
          <input
            id="regFocus"
            className="input-field"
            placeholder="مثال: Web & Pwn، Crypto، همه حوزه‌ها"
            value={focus}
            onChange={(e) => setFocus(e.target.value)}
            maxLength={50}
          />
        </div>

        <button type="submit" className="btn btn-primary btn-block">
          ثبت نهایی در گیت‌هاب
        </button>
        <p className="form-note">
          با زدن این دکمه یک Issue از پیش پرشده در گیت‌هاب باز می‌شود. آن را ثبت کنید تا تیمتان خودکار تأیید شود.
        </p>
      </form>
    </div>
  );
}
