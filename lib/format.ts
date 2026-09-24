const faDigits = '۰۱۲۳۴۵۶۷۸۹';

export function toFaDigits(value: number | string) {
  return String(value).replace(/\d/g, (d) => faDigits[Number(d)]);
}

export function toJalaliDate(iso: string) {
  try {
    return new Intl.DateTimeFormat('fa-IR-u-ca-persian', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}
