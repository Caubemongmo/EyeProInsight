import { useState, useEffect } from 'react';
import { Modal } from '../../../components/ui';

interface CapModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  sub: string;
  unit: string;
  currentLabel: string;
  initialValue: string;
  onSave: (val: number) => void;
}

export default function CapModal({
  open, onClose, title, sub, unit, currentLabel, initialValue, onSave
}: CapModalProps) {
  const [val, setVal] = useState('');

  useEffect(() => {
    if (open) setVal(initialValue);
  }, [open, initialValue]);

  const numVal = parseInt(val, 10) || 0;
  const isValid = numVal > 0;

  return (
    <Modal open={open} onClose={onClose} width="460px">
      <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--color-border)]">
        <div className="text-[15px] font-bold">{title}</div>
        <div onClick={onClose} className="w-7 h-7 rounded-[7px] flex items-center justify-center text-[var(--color-text-secondary)] cursor-pointer text-[15px] hover:bg-[#F4F4F5] transition-colors">
          ✕
        </div>
      </div>
      <div className="p-5">
        <div className="text-[12.5px] text-[var(--color-text-secondary)] mb-3">{sub}</div>
        <div className="flex items-center gap-2.5">
          <input 
            value={val}
            onChange={e => setVal(e.target.value.replace(/[^0-9]/g, ''))}
            className="w-[140px] px-3 py-[9px] border border-[var(--color-border-light)] rounded-lg text-[14px] font-[inherit] text-right outline-none focus:border-[var(--color-primary)] focus:shadow-[0_0_0_3px_rgba(27,75,143,0.12)]"
          />
          <span className="text-[12.5px] text-[var(--color-text-secondary)]">{unit}</span>
        </div>
        <div className="text-xs text-[var(--color-text-secondary)] mt-3">
          Giá trị hiện tại: <b className="text-[var(--color-text-dark)]">{currentLabel}</b>
        </div>
      </div>
      <div className="flex justify-end gap-2 px-5 py-3.5 border-t border-[var(--color-border)] bg-[#FAFAFA]">
        <button onClick={onClose} className="px-3.5 py-2 rounded-lg border border-[var(--color-border-light)] bg-white text-[13px] font-semibold cursor-pointer hover:bg-[#F4F4F5] transition-colors">
          Hủy
        </button>
        <button 
          onClick={() => {
            if (isValid) {
              onSave(numVal);
              onClose();
            }
          }}
          disabled={!isValid}
          className="px-4 py-2 rounded-lg border text-[13px] font-bold transition-colors"
          style={{
            background: isValid ? 'var(--color-primary)' : '#C7CBD1',
            borderColor: isValid ? 'var(--color-primary)' : '#C7CBD1',
            color: 'white',
            cursor: isValid ? 'pointer' : 'not-allowed'
          }}
        >
          Lưu hạn mức
        </button>
      </div>
    </Modal>
  );
}
