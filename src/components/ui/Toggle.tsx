import { useCallback } from 'react';

interface ToggleProps {
  value: boolean;
  onChange: (value: boolean) => void;
  disabled?: boolean;
}

export default function Toggle({ value, onChange, disabled = false }: ToggleProps) {
  const handleClick = useCallback(() => {
    if (!disabled) onChange(!value);
  }, [value, onChange, disabled]);

  return (
    <div className="flex items-center gap-[9px]">
      <div
        onClick={handleClick}
        className="w-9 h-5 rounded-full relative flex-none transition-colors"
        style={{
          background: disabled
            ? '#B4B4BB'
            : value
              ? 'var(--color-primary)'
              : '#D9D9DA',
          cursor: disabled ? 'not-allowed' : 'pointer',
        }}
      >
        <div
          className="absolute top-[2px] w-4 h-4 rounded-full bg-white transition-[left] duration-200"
          style={{
            left: value ? '19px' : '2px',
            boxShadow: '0 1px 2px rgba(0,0,0,.2)',
          }}
        />
      </div>
      <span
        className="text-xs font-semibold w-[22px]"
        style={{
          color: disabled
            ? '#8A8A93'
            : value
              ? 'var(--color-primary)'
              : 'var(--color-text-secondary)',
        }}
      >
        {value ? 'Bật' : 'Tắt'}
      </span>
    </div>
  );
}
