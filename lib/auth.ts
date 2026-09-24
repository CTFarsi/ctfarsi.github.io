export type GitHubUser = {
  login: string;
  name?: string;
  avatar_url?: string;
  bio?: string;
  html_url?: string;
  public_repos?: number;
  followers?: number;
};

export const USER_KEY = 'ctfarsi_user';
export const TELEGRAM_KEY = 'ctfarsi_tg';

const OAUTH_CLIENT_ID = 'Ov23liedvvabvU51v0gW';
const OAUTH_REDIRECT_URI = 'https://ctfarsi.github.io/callback.html';

export function getOAuthUrl() {
  return (
    'https://github.com/login/oauth/authorize?client_id=' +
    OAUTH_CLIENT_ID +
    '&redirect_uri=' +
    encodeURIComponent(OAUTH_REDIRECT_URI) +
    '&scope=read:user'
  );
}

export function readStoredUser(): GitHubUser | null {
  try {
    const raw = localStorage.getItem(USER_KEY);
    if (!raw) return null;
    const user = JSON.parse(raw) as GitHubUser;
    if (!user || typeof user.login !== 'string') throw new Error('invalid user');
    return user;
  } catch {
    try {
      localStorage.removeItem(USER_KEY);
    } catch {}
    return null;
  }
}

export function storeUser(user: GitHubUser) {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function clearStoredUser() {
  try {
    localStorage.removeItem(USER_KEY);
  } catch {}
}

export function readStoredTelegram() {
  try {
    return localStorage.getItem(TELEGRAM_KEY) || '';
  } catch {
    return '';
  }
}

export function storeTelegram(value: string) {
  try {
    localStorage.setItem(TELEGRAM_KEY, value);
  } catch {}
}

export function displayNameOf(user: GitHubUser) {
  return user.name || user.login;
}

export function avatarOf(user: GitHubUser) {
  return user.avatar_url || `https://github.com/${user.login}.png`;
}
