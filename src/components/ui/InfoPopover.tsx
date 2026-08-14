import { useState, useRef, useEffect } from 'react';

interface InfoPopoverProps {
  content: React.ReactNode;
  defaultNote?: string;
}

export default function InfoPopover({ content, defaultNote }: InfoPopoverProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  return (
    <div className="relative inline-flex" ref={ref}>
      <span
        onClick={(e) => {
          e.stopPropagation();
          setOpen(!open);
        }}
        className="w-[15px] h-[15px] rounded-full border border-[#D4D4D8] text-[var(--color-text-muted)] text-[10px] font-bold inline-flex items-center justify-center cursor-pointer flex-none hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors"
      >
        i
      </span>
      {open && (
        <div className="absolute left-0 top-6 z-30 w-[370px] bg-white border border-[var(--color-border)] rounded-[10px] shadow-[0_10px_28px_rgba(0,0,0,0.14)] p-3">
          <div className="text-[12.5px] text-[var(--color-text-dark)] leading-[1.55]">
            {content}
          </div>
          {defaultNote && (
            <div className="text-[11.5px] text-[var(--color-text-muted)] mt-2 pt-2 border-t border-[#F4F4F5]">
              {defaultNote}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
