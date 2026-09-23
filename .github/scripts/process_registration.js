const fs = require('fs');

module.exports = async ({ github, context }) => {
  const issue = context.payload.issue;
  const user = issue.user;
  const body = issue.body || '';

  const lines = body.split(/\r?\n/);
  let teamName = 'تیم @' + user.login;
  let tg = 'ثبت نشده';
  let focus = 'Full Spectrum & Anti-AI';

  for (const line of lines) {
    if (line.includes('نام تیم')) {
      const parts = line.split('**');
      if (parts.length > 2 && parts[2].trim()) {
        teamName = parts[2].trim();
      }
    }
    if (line.includes('راه ارتباطی تلگرام')) {
      const parts = line.split('**');
      if (parts.length > 2 && parts[2].trim()) {
        tg = parts[2].trim();
      }
    }
    if (line.includes('تمرکز تخصصی')) {
      const parts = line.split('**');
      if (parts.length > 2 && parts[2].trim()) {
        focus = parts[2].trim();
      }
    }
  }

  const dataPath = 'data/teams.json';
  let teams = [];
  if (fs.existsSync(dataPath)) {
    try {
      teams = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
    } catch (e) {
      teams = [];
    }
  }

  const existingIndex = teams.findIndex(t => t.captain.toLowerCase() === user.login.toLowerCase());
  const newEntry = {
    team_name: teamName,
    captain: user.login,
    avatar_url: user.avatar_url,
    focus: focus,
    telegram: tg,
    registered_at: new Date().toISOString(),
    verified: true
  };

  if (existingIndex >= 0) {
    teams[existingIndex] = newEntry;
  } else {
    teams.push(newEntry);
  }

  fs.writeFileSync(dataPath, JSON.stringify(teams, null, 2), 'utf8');

  await github.rest.issues.createComment({
    owner: context.repo.owner,
    repo: context.repo.repo,
    issue_number: issue.number,
    body: 'تایید ثبت نام رسمی تیم در مسابقه CTFarsi: هویت کاربر @' + user.login + ' با موفقیت توسط گیت هاب تایید و تیم به جدول رسمی شرکت کنندگان اضافه شد.'
  });

  await github.rest.issues.addLabels({
    owner: context.repo.owner,
    repo: context.repo.repo,
    issue_number: issue.number,
    labels: ['registered', 'verified']
  });

  await github.rest.issues.update({
    owner: context.repo.owner,
    repo: context.repo.repo,
    issue_number: issue.number,
    state: 'closed'
  });
};
