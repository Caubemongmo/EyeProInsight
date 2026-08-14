import { ProgressBar } from '../../../components/ui';
import type { SiteQuota } from '../../../services/api';

interface SiteQuotaTableProps {
  sites: SiteQuota[];
  onEditSiteCap: (site: SiteQuota) => void;
}

export default function SiteQuotaTable({
  sites, onEditSiteCap
}: SiteQuotaTableProps) {

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

    </div>
  );
}
