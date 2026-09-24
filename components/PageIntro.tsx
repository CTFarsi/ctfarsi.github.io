export function PageIntro({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="page-intro">
      <span className="eyebrow">{eyebrow}</span>
      <h1 className="page-title">{title}</h1>
      {children && <p className="page-lead">{children}</p>}
    </div>
  );
}
