interface ChipProps {
  role: 'super' | 'admin' | 'dev';
  label: string;
}

const ROLE_STYLES = {
  super: { bg: '#27272A', fg: '#FFFFFF' },
  admin: { bg: '#EEF2FF', fg: '#4338CA' },
  dev: { bg: '#FFF7ED', fg: '#C2410C' },
};

export default function Chip({ role, label }: ChipProps) {
  const s = ROLE_STYLES[role] || { bg: '#F4F4F5', fg: '#71717A' };
  return (
    <span
      className="inline-flex whitespace-nowrap px-2.5 py-[3px] rounded-full text-[11.5px] font-semibold"
      style={{ background: s.bg, color: s.fg }}
    >
      {label}
    </span>
  );
}
