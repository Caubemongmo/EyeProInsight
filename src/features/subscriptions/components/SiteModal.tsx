import { useState, useEffect } from 'react';
import { Modal } from '../../../components/ui';

interface SiteModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (name: string, cap: number) => void;
}

export default function SiteModal({ open, onClose, onSave }: SiteModalProps) {
  const [name, setName] = useState('');
  const [cap, setCap] = useState('');

  useEffect(() => {
    if (open) {
      setName('');
      setCap('');
    }
  }, [open]);

  const numCap = parseInt(cap, 10) || 0;
  const isValid = name.trim().length > 0 && numCap > 0;

  return (
    <Modal open={open} onClose={onClose} width="460px">
      <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--color-border)]">
        <div className="text-[15px] font-bold">Thêm site khách hàng</div>
        <div onClick={onClose} className="w-7 h-7 rounded-[7px] flex items-center justify-center text-[var(--color-text-secondary)] cursor-pointer text-[15px] hover:bg-[#F4F4F5] transition-colors">
          ✕
        </div>
      </div>
      <div className="p-5 flex flex-col gap-4">
        <label className="flex flex-col gap-1.5 text-xs font-bold text-[var(--color-text-dark)]">
          Tên trường / site
          <input 
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="VD: TH Nguyễn Du"
            className="border border-[var(--color-border-light)] rounded-lg px-3 py-[9px] text-[13.5px] font-normal text-[var(--color-text)] outline-none focus:border-[var(--color-primary)] focus:shadow-[0_0_0_3px_rgba(27,75,143,0.12)]" 
          />
        </label>
        <div>
          <div className="text-[12.5px] font-semibold text-[var(--color-text-secondary)] mb-1.5">Hạn mức tin nhắn / tháng</div>
          <div className="flex items-center gap-2.5">
            <input 
              value={cap}
              onChange={e => setCap(e.target.value.replace(/[^0-9]/g, ''))}
              placeholder="60000" 
              className="w-[150px] px-3 py-[9px] border border-[var(--color-border-light)] rounded-lg text-[13.5px] font-[inherit] text-right outline-none focus:border-[var(--color-primary)] focus:shadow-[0_0_0_3px_rgba(27,75,143,0.12)]" 
            />
            <span className="text-[12.5px] text-[var(--color-text-secondary)]">tin/tháng</span>
          </div>
          <div className="text-[11.5px] text-[var(--color-text-muted)] mt-1.5">
            Khi site đạt hạn mức, trợ lý ngừng trả lời tới đầu tháng sau.
          </div>
        </div>
      </div>
      <div className="flex justify-end gap-2 px-5 py-3.5 border-t border-[var(--color-border)] bg-[#FAFAFA]">
        <button onClick={onClose} className="px-3.5 py-2 rounded-lg border border-[var(--color-border-light)] bg-white text-[13px] font-semibold cursor-pointer hover:bg-[#F4F4F5] transition-colors">
          Hủy
        </button>
        <button 
          onClick={() => {
            if (isValid) {
              onSave(name.trim(), numCap);
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
          Thêm site
        </button>
      </div>
    </Modal>
  );
}
