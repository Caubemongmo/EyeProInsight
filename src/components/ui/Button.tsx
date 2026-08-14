type ButtonVariant = 'primary' | 'secondary';

interface ButtonProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

export default function Button({
  children,
  variant = 'primary',
  onClick,
  disabled = false,
  className = '',
}: ButtonProps) {
  const base = 'inline-flex items-center gap-[7px] rounded-[7px] font-semibold text-[12.5px] cursor-pointer transition-colors';

  const variants: Record<ButtonVariant, string> = {
    primary: `px-4 py-2 bg-[var(--color-primary)] border border-[var(--color-primary)] text-white font-bold hover:bg-[var(--color-primary-hover)] ${disabled ? 'opacity-75 cursor-not-allowed' : ''}`,
    secondary: `px-[13px] py-2 bg-white border border-[var(--color-border-light)] text-[var(--color-text-dark)] hover:bg-[var(--color-bg)] ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`,
  };

  return (
    <button
      onClick={disabled ? undefined : onClick}
      className={`${base} ${variants[variant]} ${className}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
