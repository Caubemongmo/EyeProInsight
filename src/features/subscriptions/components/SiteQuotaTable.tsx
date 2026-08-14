import { ProgressBar } from '../../../components/ui';
import type { SiteQuota } from '../../../services/api';

interface SiteQuotaTableProps {
  sites: SiteQuota[];
  onEditSiteCap: (site: SiteQuota) => void;
  // pagination controls
  page: number;
  perPage: number;
  totalSites: number;
  onPageChange: (page: number) => void;
  onPerPageChange: (per: number) => void;
}

export default function SiteQuotaTable({
  sites, onEditSiteCap, page, perPage, totalSites, onPageChange, onPerPageChange
}: SiteQuotaTableProps) {
  
  const totalPages = Math.max(1, Math.ceil(totalSites / perPage));

  return (
    <div className="px-[22px] pt-2.5 pb-[18px] flex flex-col gap-0.5">
      <div className="grid grid-cols-[1fr_150px_130px] gap-3.5 items-center py-2 text-[11.5px] font-bold text-[var(--color-text-muted)] uppercase tracking-[0.4px]">
        <div>Site khách hàng</div>
        <div className="text-right">Hạn mức / tháng</div>
        <div className="text-right pr-2">Đã dùng tháng này</div>
      </div>
      
      {sites.map(s => {
        const pct = s.cap > 0 ? (s.used / s.cap) : 0;
        const pctDisplay = s.cap > 0 ? Math.round(pct * 100) : 0;
        const isDanger = pctDisplay > 90;
        const textCol = isDanger ? 'var(--color-danger)' : 'var(--color-text-secondary)';

        return (
          <div key={s.id} className="grid grid-cols-[1fr_150px_130px] gap-3.5 items-center py-[9px] border-t border-[#F1F1F2]">
            <div className="text-[13.5px]">{s.name}</div>
            
            <div className="flex justify-end items-center gap-2.5">
              <span className="text-[13px] tabular-nums">
                {s.cap.toLocaleString('vi-VN')}
              </span>
              <div
                onClick={() => onEditSiteCap(s)}
                className="px-[11px] py-[5px] rounded-[7px] border border-[var(--color-border-light)] bg-white text-[12.5px] font-semibold cursor-pointer hover:bg-[#F4F4F5] transition-colors"
              >
                Sửa
              </div>
            </div>

            <div className="flex flex-col items-end text-[12.5px] tabular-nums" style={{ color: textCol }}>
              <div>{s.used.toLocaleString('vi-VN')} {s.cap > 0 ? `· ${pctDisplay}%` : ''}</div>
              <ProgressBar percent={pctDisplay} />
            </div>
          </div>
        );
      })}

      <div className="flex items-center gap-3 pt-3.5 pb-0.5 mt-1.5 border-t border-[#F1F1F2] text-[12.5px] text-[var(--color-text-secondary)]">
        <div>Tổng <b className="text-[var(--color-text-dark)]">{totalSites}</b> site</div>
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
