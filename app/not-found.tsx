import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="site-container page">
      <div className="card callback-card">
        <div className="callback-status err">404 // FLAG NOT FOUND</div>
        <h1 className="card-title">این صفحه پیدا نشد</h1>
        <p className="card-body" style={{ marginBottom: 24 }}>
          آدرس را بررسی کنید یا به صفحه اصلی برگردید.
        </p>
        <Link href="/" className="btn btn-primary">
          بازگشت به صفحه اصلی
        </Link>
      </div>
    </div>
  );
}
