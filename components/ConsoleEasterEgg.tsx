'use client';

import { useEffect } from 'react';

declare global {
  interface Window {
    ctfarsi?: Record<string, (arg?: string) => void>;
  }
}

let printed = false;

// DevTools warm-up challenge #0 (ported from the original js/app.js).
export function ConsoleEasterEgg() {
  useEffect(() => {
    if (printed) return;
    printed = true;

    console.log(
      '%c' +
        '   ____ _____ _____              _\n' +
        '  / ___|_   _|  ___|_ _ _ __ ___(_)\n' +
        " | |     | | | |_ / _` | '__/ __| |\n" +
        ' | |___  | | |  _| (_| | |  \\__ \\ |\n' +
        '  \\____| |_| |_|  \\__,_|_|  |___/_|\n\n' +
        'CTFarsi Core DevTools Console\n' +
        'Official Telegram Channel: https://t.me/CTFarsiIR\n' +
        'Official Telegram Bot: https://t.me/CTFarsiBot\n\n' +
        'Warmup Challenge #0: Decode the hidden payload below:\n' +
        'Payload: Q1RGYXJzaXtjMG1tdW4xdHlfZjFyc3Rfbm9fNTAyX25vX2Y0azNfcHIxejM1fQ==\n\n' +
        'Type `ctfarsi.help()` to interact.',
      'color: #10b981; font-family: monospace; font-weight: bold; font-size: 13px;',
    );

    window.ctfarsi = {
      help() {
        console.log('[+] Commands: ctfarsi.flag(solution), ctfarsi.status(), ctfarsi.rules(), ctfarsi.telegram()');
      },
      flag(val?: string) {
        if (!val) {
          console.warn("[!] Pass decoded flag: ctfarsi.flag('CTFarsi{...}')");
          return;
        }
        if (val === 'CTFarsi{c0mmun1ty_f1rst_n0_502_n0_f4k3_pr1z3s}') {
          console.log(
            '%c[SUCCESS] First Blood unlocked! Welcome to CTFarsi.',
            'color: #38bdf8; font-weight: bold; font-size: 14px;',
          );
        } else {
          console.error('[-] Incorrect flag. Decode the base64 payload properly.');
        }
      },
      status() {
        console.log('[+] Infrastructure: Healthy | Channel: @CTFarsiIR | Bot: @CTFarsiBot');
      },
      rules() {
        console.log('[+] Flag format: CTFarsi{...} | Max team: 4 | No DoS | Dynamic scoring');
      },
      telegram() {
        console.log('[+] Telegram Channel: https://t.me/CTFarsiIR | Bot: https://t.me/CTFarsiBot');
      },
    };
  }, []);

  return null;
}
