import { Modal } from '../../../components/ui';
import type { DomainEntity } from '../../../services/api';

interface DomainSyncModalProps {
  domain: DomainEntity | null;
  onClose: () => void;
  onConfirm: () => void;
}

export default function DomainSyncModal({ domain, onClose, onConfirm }: DomainSyncModalProps) {
  return (
    <Modal open={!!domain} onClose={onClose} width="440px">
      <div className="px-[22px] pt-[22px] pb-1.5">
        <div className="text-[15px] font-bold mb-1.5">Đồng bộ nhân công ngay?</div>
        <div className="text-[13px] text-[var(--color-text-secondary)] leading-[1.55]">
          Hệ thống sẽ kéo dữ liệu mới từ <b className="text-[var(--color-text-dark)]">{domain?.name}</b> vào CSDL. Tài liệu mới nạp sẽ được chunk theo cấu hình dữ liệu hiện tại.
        </div>
      </div>
      <div className="flex justify-end gap-2 px-5 py-[18px]">
        <button
          onClick={onClose}
          className="px-3.5 py-2 rounded-lg border border-[var(--color-border-light)] bg-white text-[13px] font-semibold cursor-pointer hover:bg-[#F4F4F5] transition-colors"
        >
          Hủy
        </button>
        <button
          onClick={onConfirm}
          className="px-4 py-2 rounded-lg bg-[var(--color-primary)] border border-[var(--color-primary)] text-white text-[13px] font-bold cursor-pointer hover:bg-[var(--color-primary-hover)] transition-colors"
        >
          Đồng bộ ngay
        </button>
      </div>
    </Modal>
  );
}
