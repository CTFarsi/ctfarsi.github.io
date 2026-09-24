'use client';

import { useEffect, useState } from 'react';
import { REPO } from './site';

export type RegisteredTeam = {
  number: number;
  title: string;
  url: string;
  login: string;
  avatar: string;
};

type TeamsState =
  | { status: 'loading'; teams: RegisteredTeam[] }
  | { status: 'ready'; teams: RegisteredTeam[] }
  | { status: 'error'; teams: RegisteredTeam[] };

type IssueResponse = {
  number: number;
  title: string;
  html_url: string;
  pull_request?: unknown;
  user: { login: string; avatar_url: string };
};

// Registrations are public GitHub issues labelled "registration".
// Shared across components on the same page so we only hit the API once.
let cached: Promise<RegisteredTeam[]> | null = null;

function fetchTeams() {
  if (!cached) {
    cached = fetch(
      `https://api.github.com/repos/${REPO}/issues?labels=registration&state=all&per_page=100`,
    )
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch from GitHub API');
        return res.json() as Promise<IssueResponse[]>;
      })
      .then((issues) =>
        issues
          .filter((issue) => !issue.pull_request)
          .map((issue) => ({
            number: issue.number,
            title: issue.title.replace(/^\[REGISTRATION\]:\s*/i, ''),
            url: issue.html_url,
            login: issue.user.login,
            avatar: issue.user.avatar_url,
          })),
      )
      .catch((err) => {
        cached = null;
        throw err;
      });
  }
  return cached;
}

export function useRegisteredTeams(): TeamsState {
  const [state, setState] = useState<TeamsState>({ status: 'loading', teams: [] });

  useEffect(() => {
    let active = true;
    fetchTeams()
      .then((teams) => active && setState({ status: 'ready', teams }))
      .catch(() => active && setState({ status: 'error', teams: [] }));
    return () => {
      active = false;
    };
  }, []);

  return state;
}

export function newIssueUrl(title: string, body: string, labels: string) {
  return (
    `https://github.com/${REPO}/issues/new?title=` +
    encodeURIComponent(title) +
    '&body=' +
    encodeURIComponent(body) +
    '&labels=' +
    labels
  );
}
