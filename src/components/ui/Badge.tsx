interface BadgeProps {
  status: 'on' | 'off';
  label: string;
}

export default function Badge({ status, label }: BadgeProps) {
  const isOk = status === 'on';
  return (
    <span
      className="inline-flex whitespace-nowrap px-2.5 py-[3px] rounded-full text-[11.5px] font-semibold"
      style={{
        background: isOk ? '#E6FAF3' : '#F4F4F5',
        color: isOk ? '#00875A' : '#71717A',
      }}
    >
      {label}
    </span>
  );
}
