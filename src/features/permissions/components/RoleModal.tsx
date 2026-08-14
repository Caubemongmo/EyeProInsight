import { useState, useEffect } from 'react';
import { Modal } from '../../../components/ui';
import { SCREENS } from '../../../services/api';

type ModalMode = 'newRole' | 'editRole' | null;

interface RoleModalProps {
  mode: ModalMode;
  onClose: () => void;
  onSave: () => void;
}

export default function RoleModal({ mode, onClose, onSave }: RoleModalProps) {
  // Mock state for local selections inside modal
  const [permSel, setPermSel] = useState<Record<string, number>>({});
  
  useEffect(() => {
    if (mode === 'newRole') {
      setPermSel({ rec: 1, data: 1, users: 1, perm: 1, doc: 1, kg: 1, ret: 1, ex: 1, api: 1, sub: 1, dom: 1 });
    } else if (mode === 'editRole') {
      setPermSel({ rec: 0, data: 0, users: 0, perm: 0, doc: 1, kg: 1, ret: 1, ex: 1, api: 1, sub: 1, dom: 1 });
    }
  }, [mode]);

  if (!mode) return null;

  const title = mode === 'newRole' ? 'Tạo vai trò mới' : 'Sửa định nghĩa vai';
  const cta = mode === 'newRole' ? 'Tạo vai trò' : 'Lưu thay đổi';
  const isNew = mode === 'newRole';
  const isEdit = mode === 'editRole';

  const rows = SCREENS.filter(sc => sc.k).map(sc => {
    const onVal = permSel[sc.k!] || 0;
    return {
      k: sc.k!,
      label: sc.label,
      onVal
    };
  });

  return (
    <Modal open={!!mode} onClose={onClose} width="560px">
      <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--color-border)]">
        <div className="text-[15px] font-bold">{title}</div>
        <div
          onClick={onClose}
          className="w-7 h-7 rounded-[7px] flex items-center justify-center text-[var(--color-text-secondary)] cursor-pointer text-[15px] hover:bg-[var(--color-bg)] transition-colors"
        >
          ✕
        </div>
      </div>
      
      <div className="p-5 flex flex-col gap-4 max-h-[62vh] overflow-y-auto">
        {isEdit && (
          <label className="flex flex-col gap-1.5 text-xs font-bold text-[var(--color-text-dark)]">
            Vai trò
            <select className="border border-[var(--color-border-light)] rounded-lg px-3 py-2 text-[13px] font-normal text-[var(--color-text)] bg-white outline-none">
              <option>Quản trị viên trường</option>
              <option>Developer</option>
            </select>
          </label>
        )}
        
        {isNew && (
          <label className="flex flex-col gap-1.5 text-xs font-bold text-[var(--color-text-dark)]">
            Tên vai trò
            <input 
              placeholder="VD: Thủ thư" 
              className="border border-[var(--color-border-light)] rounded-lg px-3 py-2 text-[13px] font-normal text-[var(--color-text)] outline-none"
            />
          </label>
        )}

        <div className="flex flex-col gap-2">
          <div className="text-xs font-bold text-[var(--color-text-dark)]">Màn hình được truy cập</div>
          
          {rows.map(r => (
            <div key={r.k} className="flex items-center justify-between gap-3 py-[9px] border-b border-[#F4F4F5]">
              <div className="text-[13px] font-semibold">{r.label}</div>
              <div className="flex gap-[5px]">
                {['Xem', 'Không'].map((optLabel, idx) => {
                  const isActive = r.onVal === idx;
                  const theme = isActive 
                    ? (idx === 0 ? { bg: 'var(--color-success-light)', fg: 'var(--color-success)', bd: 'var(--color-success)' } : { bg: '#F4F4F5', fg: '#71717A', bd: '#71717A' })
                    : { bg: '#FFFFFF', fg: '#A1A1AA', bd: 'var(--color-border)' };
                    
                  return (
                    <div
                      key={idx}
                      onClick={() => setPermSel(prev => ({ ...prev, [r.k]: idx }))}
                      className="whitespace-nowrap px-[11px] py-[5px] rounded-full text-xs font-semibold cursor-pointer border transition-colors"
                      style={{
                        background: theme.bg,
                        color: theme.fg,
                        borderColor: theme.bd
                      }}
                    >
                      {optLabel}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end gap-2 px-5 py-3.5 border-t border-[var(--color-border)] bg-[#FAFAFA]">
        <button
          onClick={onClose}
          className="px-3.5 py-2 rounded-lg border border-[var(--color-border-light)] bg-white text-[13px] font-semibold cursor-pointer hover:bg-[var(--color-bg)] transition-colors"
        >
          Hủy
        </button>
        <button
          onClick={() => {
            onSave();
            onClose();
          }}
          className="px-4 py-2 rounded-lg bg-[var(--color-primary)] border border-[var(--color-primary)] text-white text-[13px] font-bold cursor-pointer hover:bg-[var(--color-primary-hover)] transition-colors"
        >
          {cta}
        </button>
      </div>
    </Modal>
  );
}
