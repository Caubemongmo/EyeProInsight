import { Button } from '../../../components/ui';

interface MatrixLegendProps {
  onSave: () => void;
  isSaving: boolean;
  hasChanges: boolean;
}

export default function MatrixLegend({ onSave, isSaving, hasChanges }: MatrixLegendProps) {
  return (
    <div className="flex items-center gap-[18px] flex-wrap mx-[2px] mt-4 text-xs text-[var(--color-text-secondary)]">
      <span className="inline-flex items-center gap-1.5">
        <i className="w-[18px] h-[18px] rounded-[5px] bg-[var(--color-success-light)] text-[var(--color-success)] inline-flex items-center justify-center text-[11px] font-bold not-italic">
          ✓
        </i>
        Được truy cập màn
      </span>
      <span className="inline-flex items-center gap-1.5">
        <i className="w-[18px] h-[18px] rounded-[5px] bg-white border border-[var(--color-border)] text-[var(--color-text-muted)] inline-flex items-center justify-center text-[11px] font-bold not-italic">
          —
        </i>
        Không truy cập
      </span>
      
      <span className="ml-auto">
        Thay đổi được áp dụng khi bấm <b className="text-[var(--color-text)]">Lưu thay đổi</b>
      </span>
      
      <Button
        variant="primary"
        onClick={onSave}
        disabled={isSaving || !hasChanges}
      >
        {isSaving ? 'Đang lưu...' : 'Lưu thay đổi'}
      </Button>
    </div>
  );
}
