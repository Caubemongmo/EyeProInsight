type AlertVariant = 'warning' | 'error';

interface AlertBannerProps {
  variant: AlertVariant;
  children: React.ReactNode;
  className?: string;
}

const VARIANTS: Record<AlertVariant, { bg: string; border: string; accent: string; icon: string; text: string }> = {
  warning: {
    bg: 'bg-[#FFFBEB]',
    border: 'border-[#FDE68A]',
    accent: 'border-l-[#D97706]',
    icon: '⚠',
    text: 'text-[#92400E]',
  },
  error: {
    bg: 'bg-[#FEF2F2]',
    border: 'border-[#FECACA]',
    accent: 'border-l-[#DC2626]',
    icon: '✕',
    text: 'text-[#991B1B]',
  },
};

export default function AlertBanner({ variant, children, className = '' }: AlertBannerProps) {
  const v = VARIANTS[variant];
  return (
    <div
      className={`flex items-start gap-2 ${v.bg} border ${v.border} border-l-[3px] ${v.accent} rounded-[7px] px-[11px] py-2 mt-[9px] max-w-[520px] ${className}`}
    >
      <span className="flex-none text-xs">{v.icon}</span>
      <div className={`text-[11.5px] ${v.text}`}>{children}</div>
    </div>
  );
}
