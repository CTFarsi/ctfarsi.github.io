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

export type SponsorTier = 'gold' | 'silver' | 'infrastructure';

/** Confirmed sponsors shown on the site. More can join any tier. */
export const SPONSORS = [
  {
    name: 'BananaAI',
    nameFa: 'بنانا AI',
    href: 'https://bananaai.ir',
    logo: '/images/sponsors/bananaai.png',
    tier: 'gold' as const,
    blurb: 'پلتفرم ایرانی هوش مصنوعی برای تولید عکس، ویدیو و صدا.',
  },
] as const;

export const TIER_LABELS: Record<SponsorTier, { fa: string; en: string }> = {
  gold: { fa: 'حامی زرین', en: 'GOLD SPONSOR' },
  silver: { fa: 'حامی سیمین', en: 'SILVER SPONSOR' },
  infrastructure: { fa: 'حامی زیرساخت', en: 'CLOUD PARTNER' },
};

/** Site builders / organizers credited in the footer. */
export const BUILDERS = [
  {
    name: 'Matin',
    href: 'https://x.com/m4tinbeigi',
    handle: '@m4tinbeigi',
  },
  {
    name: 'Erwin',
    href: 'https://x.com/Erwinamm',
    handle: '@Erwinamm',
  },
] as const;

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
