interface SettingRowProps {
  label: string;
  description: string;
  children: React.ReactNode;
  infoPopover?: React.ReactNode;
  indented?: boolean;
  dimmed?: boolean;
  muted?: boolean;
  className?: string;
}

export default function SettingRow({
  label,
  description,
  children,
  infoPopover,
  indented = false,
  dimmed = false,
  muted = false,
  className = '',
}: SettingRowProps) {
  return (
    <div
      className={`flex items-start gap-5 border-t border-[#F4F4F5] transition-opacity ${
        indented ? 'py-[13px] pr-[22px] pl-[44px]' : 'py-[13px] px-[22px]'
      } ${className}`}
      style={{
        opacity: dimmed ? 0.5 : 1,
        pointerEvents: dimmed ? 'none' : 'auto',
        background: indented ? '#FCFCFD' : undefined,
      }}
    >
      <div
        className={`flex-[1_1_56%] min-w-0 relative ${
          indented ? 'border-l-2 border-[#E4E4E7] pl-[13px] -ml-[13px]' : ''
        }`}
        style={{ color: muted ? '#8A8A93' : undefined }}
      >
        <div className="flex items-center gap-[7px] min-h-5">
          <span className="text-[13px] font-semibold">{label}</span>
          {infoPopover}
        </div>
        <div className="text-xs text-[var(--color-text-secondary)] mt-0.5">{description}</div>
      </div>
      <div className="flex-none flex items-center justify-end gap-[9px] min-h-[22px]">
        {children}
      </div>
    </div>
  );
}
