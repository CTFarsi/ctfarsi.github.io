'use client';

import { useRegisteredTeams } from '@/lib/github';
import { toFaDigits } from '@/lib/format';

export function ParticipantsList() {
  const { status, teams } = useRegisteredTeams();

  return (
    <div className="card">
      <div className="roster-head">
        <h2 className="form-title" style={{ marginBottom: 0 }}>
          تیم‌های تأییدشده
        </h2>
        <span className="roster-count">
          {status === 'loading' && 'در حال دریافت…'}
          {status === 'ready' && `${toFaDigits(teams.length)} تیم`}
        </span>
      </div>

      <div className="roster-list">
        {status === 'loading' && <p className="roster-empty">در حال دریافت فهرست تیم‌ها از گیت‌هاب…</p>}
        {status === 'error' && <p className="roster-empty">فهرست تیم‌ها از گیت‌هاب دریافت نشد. کمی بعد دوباره امتحان کنید.</p>}
        {status === 'ready' && teams.length === 0 && (
          <p className="roster-empty">هنوز تیمی ثبت‌نام نکرده است. اولین نفر باشید!</p>
        )}
        {teams.map((team) => (
          <div key={team.number} className="participant-item">
            <div className="participant-info">
              <img className="participant-avatar" src={team.avatar} alt="" loading="lazy" />
              <div style={{ minWidth: 0 }}>
                <a className="participant-name" href={team.url} target="_blank" rel="noopener">
                  {team.title}
                </a>
                <span className="participant-meta mono">
                  @{team.login} &bull; #{team.number}
                </span>
              </div>
            </div>
            <span className="participant-tag mono">VERIFIED</span>
          </div>
        ))}
      </div>
    </div>
  );
}
