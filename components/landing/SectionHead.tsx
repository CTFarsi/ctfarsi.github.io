export function SectionHead({
  eyebrow,
  title,
  lead,
  center = false,
}: {
  eyebrow: string;
  title: string;
  lead?: React.ReactNode;
  center?: boolean;
}) {
  return (
    <div className={`section-head${center ? ' section-head-center' : ''}`}>
      <span className="eyebrow">{eyebrow}</span>
      <h2 className="section-title">{title}</h2>
      {lead && <p className="section-lead">{lead}</p>}
    </div>
  );
}
