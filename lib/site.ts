export const SITE_URL = 'https://ctfarsi.github.io';

export const REPO = 'CTFarsi/ctfarsi.github.io';

export const LINKS = {
  telegram: 'https://t.me/CTFarsiIR',
  telegramHandle: '@CTFarsiIR',
  bot: 'https://t.me/CTFarsiBot',
  authorsGroup: 'https://t.me/+8LrqFDIBbORkYmI8',
  githubOrg: 'https://github.com/CTFarsi',
  repo: `https://github.com/${REPO}`,
  rootedInIran: 'https://rootediniran.com/',
  authorIssueTemplate: `https://github.com/${REPO}/issues/new?template=challenge_author.yml`,
};

export const NAV_ITEMS = [
  { href: '/', label: 'خانه' },
  { href: '/articles', label: 'مقالات' },
  { href: '/register', label: 'ثبت‌نام و تیم‌ها' },
  { href: '/rules', label: 'قوانین' },
  { href: '/authors', label: 'طراحان چالش' },
  { href: '/sponsors', label: 'حامیان' },
] as const;

export const FLAG_FORMAT = 'CTFarsi{...}';
export const MAX_TEAM_SIZE = 4;
