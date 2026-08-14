import { useState, useEffect } from 'react';
import { Modal } from '../../../components/ui';
import { type User, type RoleKey, resetPassword } from '../../../services/api';

interface UserFormModalProps {
  user?: User | null;
  open: boolean;
  onClose: () => void;
  onSave: (user: Partial<User>) => void;
}

const ROLE_OPTS: { val: RoleKey; label: string }[] = [
  { val: 'super', label: 'Super Admin' },
  { val: 'admin', label: 'Quản trị viên trường' },
  { val: 'dev', label: 'Developer' },
];

const ROLE_HINTS = {
  super: 'Toàn quyền trên mọi trường và mọi chức năng.',
  admin: 'Quản lý người dùng, dữ liệu và khuyến nghị trong phạm vi trường.',
  dev: 'Truy cập công cụ kỹ thuật và cấu hình dữ liệu.',
};

export default function UserFormModal({ user, open, onClose, onSave }: UserFormModalProps) {
  const isEdit = !!user;
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<RoleKey>('admin');
  const [active, setActive] = useState(true);
  const [pw, setPw] = useState('');
  const [resetSent, setResetSent] = useState(false);

  useEffect(() => {
    if (open) {
      setName(user?.name || '');
      setEmail(user?.email || '');
      setRole(user?.role || 'admin');
      setActive(user?.status === 'on');
      setPw('');
      setResetSent(false);
    }
  }, [open, user]);

  const handleSave = () => {
    onSave({
      id: user?.id,
      name,
      email,
      role,
      status: active ? 'on' : 'off',
      // For mock, auto-generate initials
      ini: name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() || 'U',
      school: role === 'admin' ? 'TH Nguyễn Tri Phương' : 'Toàn hệ thống',
      activity: user?.activity || 'Chưa đăng nhập',
    });
  };

  const doReset = async () => {
    if (user) {
      await resetPassword(user.id);
      setResetSent(true);
    }
  };

  const isDevOrSuper = role === 'dev' || role === 'super';

  return (
    <Modal open={open} onClose={onClose} width="560px">
      <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--color-border)]">
        <div className="text-[15px] font-bold">{isEdit ? 'Sửa người dùng' : 'Thêm người dùng'}</div>
        <div onClick={onClose} className="w-7 h-7 rounded-[7px] flex items-center justify-center text-[var(--color-text-secondary)] cursor-pointer text-[15px] hover:bg-[var(--color-bg)] transition-colors">
          ✕
        </div>
      </div>
      
      <div className="p-5 flex flex-col gap-3.5">
        <div className="grid grid-cols-2 gap-3">
          <label className="flex flex-col gap-1.5 text-xs font-bold text-[var(--color-text-dark)]">
            Họ và tên
            <input value={name} onChange={e => setName(e.target.value)} placeholder="VD: Nguyễn Văn A" className="border border-[var(--color-border-light)] rounded-lg px-3 py-2 text-[13px] font-normal text-[var(--color-text)] outline-none focus:border-[var(--color-primary)] focus:shadow-[0_0_0_3px_rgba(27,75,143,0.12)]" />
          </label>
          <label className="flex flex-col gap-1.5 text-xs font-bold text-[var(--color-text-dark)]">
            Email
            <input value={email} onChange={e => setEmail(e.target.value)} placeholder="ten@truong.edu.vn" className="border border-[var(--color-border-light)] rounded-lg px-3 py-2 text-[13px] font-normal text-[var(--color-text)] outline-none focus:border-[var(--color-primary)] focus:shadow-[0_0_0_3px_rgba(27,75,143,0.12)]" />
          </label>
        </div>

        <label className="flex flex-col gap-1.5 text-xs font-bold text-[var(--color-text-dark)]">
          Phạm vi
          {isDevOrSuper ? (
            <div className="border border-[var(--color-border)] rounded-lg px-3 py-2 text-[13px] font-normal text-[var(--color-text-secondary)] bg-[#FAFAFA]">
              Toàn hệ thống (VDSmart)
            </div>
          ) : (
            <select className="border border-[var(--color-border-light)] rounded-lg px-3 py-2 text-[13px] font-normal text-[var(--color-text)] bg-white outline-none focus:border-[var(--color-primary)]">
              <option>TH Nguyễn Tri Phương</option>
              <option>TH Phan Chu Trinh</option>
              <option>TH Lê Quý Đôn</option>
            </select>
          )}
        </label>

        <div className="flex flex-col gap-1.5">
          <div className="text-xs font-bold text-[var(--color-text-dark)]">Vai trò</div>
          <div className="flex gap-1.5 flex-wrap">
            {ROLE_OPTS.map(rp => {
              const on = role === rp.val;
              return (
                <div
                  key={rp.val}
                  onClick={() => setRole(rp.val)}
                  className="whitespace-nowrap px-3 py-1.5 rounded-full text-[12.5px] font-semibold cursor-pointer border transition-colors"
                  style={{
                    background: on ? 'var(--color-primary-light)' : '#FFFFFF',
                    color: on ? 'var(--color-primary)' : 'var(--color-text-secondary)',
                    borderColor: on ? 'var(--color-primary)' : 'var(--color-border-light)',
                  }}
                >
                  {rp.label}
                </div>
              );
            })}
          </div>
          <div className="text-xs text-[var(--color-text-secondary)] mt-1">{ROLE_HINTS[role]}</div>
        </div>

        {!isEdit ? (
          <label className="flex flex-col gap-1.5 text-xs font-bold text-[var(--color-text-dark)]">
            Mật khẩu
            <input type="password" value={pw} onChange={e => setPw(e.target.value)} placeholder="Tối thiểu 8 ký tự" className="border border-[var(--color-border-light)] rounded-lg px-3 py-2 text-[13px] font-normal text-[var(--color-text)] outline-none focus:border-[var(--color-primary)] focus:shadow-[0_0_0_3px_rgba(27,75,143,0.12)]" />
            <span className="text-xs font-normal text-[var(--color-text-secondary)]">Người dùng sẽ được yêu cầu đổi mật khẩu ở lần đăng nhập đầu tiên.</span>
          </label>
        ) : (
          <div className="flex items-center justify-between gap-3 border border-[var(--color-border)] rounded-[10px] px-3.5 py-3">
            <div>
              <div className="text-[13px] font-bold">Mật khẩu</div>
              <div className="text-xs text-[var(--color-text-secondary)]">
                {resetSent ? 'Đã đặt lại — mật khẩu mới gửi tới người dùng ✓' : 'Đổi lần cuối 12/1/2026'}
              </div>
            </div>
            <div onClick={doReset} className="whitespace-nowrap px-3 py-2 rounded-lg border border-[var(--color-border-light)] bg-white text-[12.5px] font-semibold cursor-pointer shrink-0 hover:bg-[#F4F4F5] transition-colors">
              Đặt lại mật khẩu
            </div>
          </div>
        )}

        <label className="flex items-center gap-[9px] text-[13px] font-semibold text-[var(--color-text)] cursor-pointer mt-1">
          <div
            onClick={() => setActive(!active)}
            className="w-[34px] h-5 rounded-full relative transition-colors shrink-0"
            style={{ background: active ? 'var(--color-primary)' : 'var(--color-border-light)' }}
          >
            <div
              className="absolute top-[2px] w-4 h-4 rounded-full bg-white shadow-[0_1px_2px_rgba(0,0,0,.2)] transition-[left] duration-150"
              style={{ left: active ? '16px' : '2px' }}
            />
          </div>
          Kích hoạt tài khoản ngay
        </label>
      </div>
      
      <div className="flex justify-end gap-2 px-5 py-3.5 border-t border-[var(--color-border)] bg-[#FAFAFA]">
        <button onClick={onClose} className="px-3.5 py-2 rounded-lg border border-[var(--color-border-light)] bg-white text-[13px] font-semibold cursor-pointer hover:bg-[var(--color-bg)] transition-colors">
          Hủy
        </button>
        <button onClick={handleSave} className="px-4 py-2 rounded-lg bg-[var(--color-primary)] border border-[var(--color-primary)] text-white text-[13px] font-bold cursor-pointer hover:bg-[var(--color-primary-hover)] transition-colors">
          {isEdit ? 'Lưu thay đổi' : 'Tạo tài khoản'}
        </button>
      </div>
    </Modal>
  );
}
