import { Modal } from '../../../components/ui';
import type { User } from '../../../services/api';

interface DeleteUserModalProps {
  user: User | null;
  onClose: () => void;
  onConfirm: () => void;
}

export default function DeleteUserModal({ user, onClose, onConfirm }: DeleteUserModalProps) {
  return (
    <Modal open={!!user} onClose={onClose} width="420px">
      <div className="px-[22px] pt-[22px] pb-2">
        <div className="text-[15px] font-bold mb-1.5">Xóa người dùng này?</div>
        <div className="text-[13px] text-[var(--color-text-secondary)] leading-[1.55]">
          Toàn bộ dữ liệu của <strong className="text-[var(--color-text)]">{user?.name}</strong> sẽ bị xóa và không thể khôi phục.
        </div>
      </div>
      <div className="flex justify-end gap-2 px-5 py-4">
        <button
          onClick={onClose}
          className="px-3.5 py-2 rounded-lg border border-[var(--color-border-light)] bg-white text-[13px] font-semibold cursor-pointer hover:bg-[var(--color-bg)] transition-colors"
        >
          Hủy
        </button>
        <button
          onClick={onConfirm}
          className="px-4 py-2 rounded-lg bg-[var(--color-danger)] border border-[var(--color-danger)] text-white text-[13px] font-bold cursor-pointer hover:bg-[var(--color-danger-dark)] transition-colors"
        >
          Xóa
        </button>
      </div>
    </Modal>
  );
}
