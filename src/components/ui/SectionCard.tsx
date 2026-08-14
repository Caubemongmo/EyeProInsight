interface SectionCardProps {
  title: string;
  description: string;
  children: React.ReactNode;
  className?: string;
}

export default function SectionCard({ title, description, children, className = '' }: SectionCardProps) {
  return (
    <div className={`bg-white border border-[var(--color-border)] rounded-xl shadow-[0_1px_2px_rgba(0,0,0,0.04)] ${className}`}>
      <div className="flex items-start gap-3.5 px-[22px] pt-[14px] pb-[13px]">
        <div className="flex-1 min-w-0">
          <div className="text-sm font-bold">{title}</div>
          <div className="text-xs text-[var(--color-text-secondary)] mt-0.5">{description}</div>
        </div>
      </div>
      {children}
    </div>
  );
}
