import { useState, useEffect } from 'react';
import { Modal } from '../../../components/ui';
import type { DomainEntity } from '../../../services/api';

interface DomainModalProps {
  domain?: DomainEntity | null;
  open: boolean;
  onClose: () => void;
  onSave: (domain: Partial<DomainEntity>) => void;
}

export default function DomainModal({ domain, open, onClose, onSave }: DomainModalProps) {
  const isEdit = !!domain;
  
  const [name, setName] = useState('');
  const [host, setHost] = useState('');
  const [mode, setMode] = useState<'auto' | 'manual'>('auto');
  const [sched, setSched] = useState<'1h' | '6h' | '24h' | '7d'>('24h');

  useEffect(() => {
    if (open) {
      setName(domain?.name || '');
      setHost(domain?.host || '');
      setMode(domain?.mode || 'auto');
      setSched(domain?.sched || '24h');
    }
  }, [open, domain]);

  const isValid = name.trim().length > 0 && host.trim().length > 0;
  const isAuto = mode === 'auto';

  return (
    <Modal open={open} onClose={onClose} width="520px">
      <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--color-border)]">
        <div className="text-[15px] font-bold">{isEdit ? `Cấu hình đồng bộ · ${domain?.name}` : 'Thêm domain E.Cloud'}</div>
        <div onClick={onClose} className="w-7 h-7 rounded-[7px] flex items-center justify-center text-[var(--color-text-secondary)] cursor-pointer text-[15px] hover:bg-[#F4F4F5] transition-colors">
          ✕
        </div>
      </div>
      <div className="p-5 flex flex-col gap-4">
        
        <div className="flex gap-3">
          <div className="flex-[1.1] min-w-0">
            <div className="text-[12.5px] font-semibold text-[#52525B] mb-1.5">Tên domain</div>
            <input 
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="VD: EyePro Smartlib" 
              className="w-full px-[11px] py-[9px] border border-[var(--color-border-light)] rounded-lg text-[13.5px] font-[inherit] outline-none focus:border-[var(--color-primary)] focus:shadow-[0_0_0_3px_rgba(27,75,143,0.12)]"
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-[12.5px] font-semibold text-[#52525B] mb-1.5">Địa chỉ (host)</div>
            <input 
              value={host}
              onChange={e => setHost(e.target.value)}
              placeholder="smartlib.eyepro.vn" 
              className="w-full px-[11px] py-[9px] border border-[var(--color-border-light)] rounded-lg text-[13.5px] font-[inherit] outline-none focus:border-[var(--color-primary)] focus:shadow-[0_0_0_3px_rgba(27,75,143,0.12)]"
            />
          </div>
        </div>

        <div>
          <div className="text-[12.5px] font-semibold text-[#52525B] mb-1.5">Chế độ đồng bộ</div>
          <div className="flex gap-2">
            <div 
              onClick={() => setMode('auto')}
              className="flex-1 p-[11px_13px] rounded-[9px] border cursor-pointer transition-colors"
              style={{
                borderColor: isAuto ? 'var(--color-primary)' : 'var(--color-border-light)',
                background: isAuto ? 'var(--color-primary-light)' : 'white'
              }}
            >
              <div className="text-[13px] font-bold">Tự động theo chu kỳ</div>
              <div className="text-[11.5px] text-[var(--color-text-secondary)] mt-0.5">Hệ thống tự kéo dữ liệu mới</div>
            </div>
            <div 
              onClick={() => setMode('manual')}
              className="flex-1 p-[11px_13px] rounded-[9px] border cursor-pointer transition-colors"
              style={{
                borderColor: !isAuto ? 'var(--color-primary)' : 'var(--color-border-light)',
                background: !isAuto ? 'var(--color-primary-light)' : 'white'
              }}
            >
              <div className="text-[13px] font-bold">Bằng nhân công</div>
              <div className="text-[11.5px] text-[var(--color-text-secondary)] mt-0.5">Chỉ chạy khi admin bấm đồng bộ</div>
            </div>
          </div>
        </div>

        <div>
          <div className="text-[12.5px] font-semibold mb-1.5" style={{ color: isAuto ? '#27272A' : '#A1A1AA' }}>Chu kỳ</div>
          <select 
            value={sched}
            onChange={e => setSched(e.target.value as any)}
            disabled={!isAuto}
            className="w-full px-[11px] py-[9px] border border-[var(--color-border-light)] rounded-lg text-[13.5px] font-[inherit] outline-none"
            style={{
              background: isAuto ? 'white' : '#F4F4F5',
              color: isAuto ? '#27272A' : '#A1A1AA'
            }}
          >
            <option value="1h">Mỗi giờ</option>
            <option value="6h">Mỗi 6 giờ</option>
            <option value="24h">Mỗi ngày lúc 02:00</option>
            <option value="7d">Mỗi tuần (Chủ nhật 02:00)</option>
          </select>
          <div className="text-[11.5px] text-[var(--color-text-muted)] mt-1.5">
            {isAuto ? 'Chu kỳ chạy theo giờ UTC+7.' : 'Không dùng ở chế độ nhân công.'}
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
              onSave({ id: domain?.id, name, host, mode, sched });
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
          {isEdit ? 'Lưu cấu hình' : 'Thêm domain'}
        </button>
      </div>
    </Modal>
  );
}
