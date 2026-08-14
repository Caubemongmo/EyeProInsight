import { useState, useRef, useEffect } from 'react';

const SCHOOLS = [
  { id: 'ntp', name: 'TH Nguyễn Tri Phương' },
  { id: 'pct', name: 'TH Phan Chu Trinh' },
  { id: 'lqd', name: 'TH Lê Quý Đôn' },
];

function SchoolIcon() {
  return (
    <svg
      width={17}
      height={17}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x={4} y={8} width={16} height={12} rx={1.5} />
      <path d="M4 8l8-4.5L20 8M10 20v-5h4v5" />
    </svg>
  );
}

export default function Topbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedSchool, setSelectedSchool] = useState('ntp');
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    if (menuOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [menuOpen]);

  const currentSchool = SCHOOLS.find((s) => s.id === selectedSchool);

  return (
    <header className="flex items-center gap-3 h-[var(--topbar-height)] px-5 bg-white border-b border-[var(--color-border)] flex-none">
      {/* Logo */}
      <div className="flex items-center gap-2.5">
        <img src="/logo.png" alt="EyePro Insight Logo" className="h-[44px] object-contain" />
        <span className="text-[10px] font-bold text-[var(--color-text-secondary)] uppercase tracking-[0.5px] border border-[var(--color-border)] rounded px-1.5 py-[1px] self-center">
          Admin
        </span>
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* School Selector */}
      <div className="relative" ref={menuRef}>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex items-center gap-2 border border-[var(--color-border-light)] bg-white px-3 py-[7px] rounded-lg font-semibold text-[13px] cursor-pointer hover:border-[var(--color-primary)] transition-colors"
        >
          <span className="text-[var(--color-text-secondary)] inline-flex">
            <SchoolIcon />
          </span>
          {currentSchool?.name}
          <span className="text-[var(--color-text-muted)] text-[10px]">▾</span>
        </button>

        {menuOpen && (
          <div className="absolute top-[calc(100%+6px)] right-0 min-w-[240px] bg-white border border-[var(--color-border)] rounded-[10px] shadow-[0_8px_24px_rgba(0,0,0,0.10)] p-1.5 z-40">
            {SCHOOLS.map((s) => (
              <div
                key={s.id}
                onClick={() => {
                  setSelectedSchool(s.id);
                  setMenuOpen(false);
                }}
                className="flex items-center justify-between gap-2.5 px-[11px] py-2 rounded-[7px] text-[13px] font-semibold cursor-pointer hover:bg-[var(--color-bg)] transition-colors"
              >
                {s.name}
                <span
                  className="text-[var(--color-success)]"
                  style={{ opacity: s.id === selectedSchool ? 1 : 0 }}
                >
                  ✓
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Separator */}
      <div className="w-px h-6 bg-[var(--color-border)]" />

      {/* User Avatar */}
      <div className="flex items-center gap-[9px] pl-[5px] pr-3 py-1 border border-[var(--color-border)] rounded-full">
        <div className="w-7 h-7 rounded-full bg-[var(--color-primary-light)] text-[var(--color-primary)] flex items-center justify-center text-[11px] font-bold">
          VD
        </div>
        <div className="leading-[1.2]">
          <div className="text-[12.5px] font-bold">Vũ Đức</div>
          <div className="text-[11px] text-[var(--color-text-secondary)]">
            Super Admin · VDSmart
          </div>
        </div>
      </div>
    </header>
  );
}
