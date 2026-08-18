import type { DomainEntity } from '../../../services/api';

interface DomainTableProps {
  domains: DomainEntity[];
  onEdit: (d: DomainEntity) => void;
  onSync: (d: DomainEntity) => void;
  // pagination controls
  page: number;
  perPage: number;
  totalDomains: number;
  onPageChange: (page: number) => void;
  onPerPageChange: (per: number) => void;
}

const SCHED_LABELS: Record<string, string> = {
  '1h': 'Mỗi giờ',
  '6h': 'Mỗi 6 giờ',
  '24h': 'Mỗi ngày lúc 02:00',
  '7d': 'Mỗi tuần (CN 02:00)',
};

export default function DomainTable({
  domains, onEdit, onSync, page, perPage, totalDomains, onPageChange, onPerPageChange
}: DomainTableProps) {
  const totalPages = Math.max(1, Math.ceil(totalDomains / perPage));

  return (
    <div className="bg-white border border-[var(--color-border)] rounded-[14px] shadow-[0_1px_2px_rgba(0,0,0,0.04)] overflow-hidden">
      <div className="grid grid-cols-[1.35fr_1fr_152px_150px_176px] gap-3.5 items-center px-5 py-[11px] bg-[#FAFAFA] border-b border-[var(--color-border)] text-[11.5px] font-bold text-[var(--color-text-muted)] uppercase tracking-[0.4px]">
        <div>Domain</div>
        <div>Chế độ đồng bộ</div>
        <div>Đồng bộ gần nhất</div>
        <div>Trạng thái</div>
        <div className="text-right">Thao tác</div>
      </div>
      
      {domains.map(d => {
        const isAuto = d.mode === 'auto';
        const stBg = d.status === 'Hoạt động' ? 'var(--color-success-light)' : 'var(--color-warning-light)';
        const stFg = d.status === 'Hoạt động' ? 'var(--color-success)' : 'var(--color-warning)';
        
        return (
          <div key={d.id} className="grid grid-cols-[1.35fr_1fr_152px_150px_176px] gap-3.5 items-center px-5 py-3.5 border-t border-[#F1F1F2] hover:bg-[#FAFAFA] transition-colors">
            <div className="min-w-0">
              <div className="text-[13.5px] font-semibold">{d.name}</div>
              <div className="text-[11.5px] text-[var(--color-text-muted)] mt-0.5 overflow-hidden text-ellipsis whitespace-nowrap">{d.host}</div>
            </div>
            
            <div>
              <div className="text-[13px]">{isAuto ? 'Tự động theo chu kỳ' : 'Bằng nhân công'}</div>
              <div className="text-[11.5px] text-[var(--color-text-secondary)] mt-0.5">
                {isAuto ? SCHED_LABELS[d.sched] : 'Chạy khi admin yêu cầu'}
                {isAuto && d.syncFrom && d.syncTo && (
                  <span className="block mt-[3px]">Từ {d.syncFrom} đến {d.syncTo}</span>
                )}
              </div>
            </div>
            
            <div className="text-[12.5px] text-[#52525B] tabular-nums">
              {d.last}
            </div>
            
            <div>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-[3px] rounded-full text-[11.5px] font-semibold whitespace-nowrap" style={{ background: stBg, color: stFg }}>
                {d.status}
              </span>
            </div>
            
            <div className="flex justify-end gap-[7px]">
              <div 
                onClick={() => onSync(d)}
                className="px-[11px] py-1.5 rounded-[7px] border border-[var(--color-border-light)] bg-white text-[12.5px] font-semibold cursor-pointer whitespace-nowrap hover:bg-[#F4F4F5] transition-colors"
              >
                Đồng bộ ngay
              </div>
              <div 
                onClick={() => onEdit(d)}
                className="px-[11px] py-1.5 rounded-[7px] border border-[var(--color-border-light)] bg-white text-[12.5px] font-semibold cursor-pointer hover:bg-[#F4F4F5] transition-colors"
              >
                Sửa
              </div>
            </div>
          </div>
        );
      })}

      <div className="flex items-center gap-3.5 px-5 py-3 border-t border-[var(--color-border)] bg-[#FAFAFA] text-[12.5px] text-[var(--color-text-secondary)]">
        <div>Tổng <b className="text-[var(--color-text-dark)]">{totalDomains}</b> domain liên thông</div>
        <select 
          value={perPage} 
          onChange={e => onPerPageChange(Number(e.target.value))}
          className="px-2 py-1.5 border border-[var(--color-border-light)] rounded-[7px] bg-white text-[12.5px] font-[inherit] text-[var(--color-text-dark)] cursor-pointer outline-none"
        >
          <option value={5}>5 dòng/trang</option>
          <option value={10}>10 dòng/trang</option>
          <option value={20}>20 dòng/trang</option>
        </select>
        <div className="flex-1"></div>
        <div className="flex items-center gap-1.5">
          <div 
            onClick={() => page > 1 && onPageChange(page - 1)}
            className="w-7 h-7 flex items-center justify-center border border-[var(--color-border-light)] rounded-[7px] bg-white text-[13px] transition-colors"
            style={{ 
              color: page > 1 ? 'var(--color-text-dark)' : '#C7CBD1', 
              cursor: page > 1 ? 'pointer' : 'not-allowed' 
            }}
          >
            ‹
          </div>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => {
            const active = n === page;
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
            onClick={() => page < totalPages && onPageChange(page + 1)}
            className="w-7 h-7 flex items-center justify-center border border-[var(--color-border-light)] rounded-[7px] bg-white text-[13px] transition-colors"
            style={{ 
              color: page < totalPages ? 'var(--color-text-dark)' : '#C7CBD1', 
              cursor: page < totalPages ? 'pointer' : 'not-allowed' 
            }}
          >
            ›
          </div>
        </div>
      </div>
    </div>
  );
}
