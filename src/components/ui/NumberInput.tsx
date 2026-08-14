interface NumberInputProps {
  value: number;
  onChange: (value: number) => void;
  placeholder?: string;
  unit: string;
  disabled?: boolean;
}

export default function NumberInput({ value, onChange, placeholder, unit, disabled = false }: NumberInputProps) {
  return (
    <>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value || '0', 10) || 0)}
        placeholder={placeholder}
        disabled={disabled}
        className="w-[84px] border border-[var(--color-border-light)] rounded-[7px] px-[9px] py-1.5 text-[13px] font-semibold text-[var(--color-text)] text-right outline-none focus:border-[var(--color-primary)] focus:shadow-[0_0_0_3px_rgba(27,75,143,0.12)] disabled:opacity-50 disabled:cursor-not-allowed"
      />
      <span className="text-[11.5px] text-[var(--color-text-muted)] w-[44px]">{unit}</span>
    </>
  );
}
