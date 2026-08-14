interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const canPrev = currentPage > 1;
  const canNext = currentPage < totalPages;

  return (
    <div className="flex items-center gap-1.5">
      <div
        onClick={() => canPrev && onPageChange(currentPage - 1)}
        className="w-7 h-7 flex items-center justify-center border border-[var(--color-border-light)] rounded-[7px] bg-white text-[13px] transition-colors"
        style={{
          color: canPrev ? 'var(--color-text-dark)' : '#C7CBD1',
          cursor: canPrev ? 'pointer' : 'not-allowed',
        }}
      >
        ‹
      </div>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => {
        const active = n === currentPage;
        return (
          <div
            key={n}
            onClick={() => onPageChange(n)}
            className="min-w-7 h-7 px-[7px] flex items-center justify-center border rounded-[7px] text-[12.5px] font-semibold cursor-pointer transition-colors"
            style={{
              borderColor: active ? 'var(--color-primary)' : 'var(--color-border-light)',
              background: active ? 'var(--color-primary)' : 'white',
              color: active ? 'white' : 'var(--color-text-dark)',
            }}
          >
            {n}
          </div>
        );
      })}
      <div
        onClick={() => canNext && onPageChange(currentPage + 1)}
        className="w-7 h-7 flex items-center justify-center border border-[var(--color-border-light)] rounded-[7px] bg-white text-[13px] transition-colors"
        style={{
          color: canNext ? 'var(--color-text-dark)' : '#C7CBD1',
          cursor: canNext ? 'pointer' : 'not-allowed',
        }}
      >
        ›
      </div>
    </div>
  );
}
