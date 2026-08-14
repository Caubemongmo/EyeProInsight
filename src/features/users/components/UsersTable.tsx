import { Badge, Chip } from '../../../components/ui';
import type { User } from '../../../services/api';

interface UsersTableProps {
  users: User[];
  onEdit: (u: User) => void;
  onDelete: (u: User) => void;
}

const ROLE_LABELS = {
  super: 'Super Admin',
  admin: 'Quản trị viên trường',
  dev: 'Developer',
};

export default function UsersTable({ users, onEdit, onDelete }: UsersTableProps) {
  return (
    <div className="bg-white border border-[var(--color-border)] rounded-xl overflow-hidden shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
      <table className="w-full border-collapse text-[13px]">
        <thead>
          <tr>
            <th className="text-left text-xs text-[var(--color-text-secondary)] font-semibold px-4 py-[11px] border-b border-[var(--color-border)] bg-[#FAFAFA]">
              Người dùng
            </th>
            <th className="text-left text-xs text-[var(--color-text-secondary)] font-semibold px-4 py-[11px] border-b border-[var(--color-border)] bg-[#FAFAFA] whitespace-nowrap">
              Trường
            </th>
            <th className="text-left text-xs text-[var(--color-text-secondary)] font-semibold px-4 py-[11px] border-b border-[var(--color-border)] bg-[#FAFAFA] whitespace-nowrap">
              Vai trò
            </th>
            <th className="text-left text-xs text-[var(--color-text-secondary)] font-semibold px-4 py-[11px] border-b border-[var(--color-border)] bg-[#FAFAFA] whitespace-nowrap">
              Trạng thái
            </th>
            <th className="text-left text-xs text-[var(--color-text-secondary)] font-semibold px-4 py-[11px] border-b border-[var(--color-border)] bg-[#FAFAFA] whitespace-nowrap">
              Hoạt động gần nhất
            </th>
            <th className="border-b border-[var(--color-border)] bg-[#FAFAFA]"></th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr
              key={u.id}
              onClick={() => onEdit(u)}
              className="cursor-pointer hover:bg-[#FAFAFA] transition-colors"
            >
              <td className="px-4 py-2.5 border-b border-[#F4F4F5]">
                <div className="flex items-center gap-2.5">
                  <div className="w-[30px] h-[30px] rounded-full bg-[var(--color-primary-light)] text-[var(--color-primary)] flex items-center justify-center text-[11px] font-bold shrink-0">
                    {u.ini}
                  </div>
                  <div className="leading-[1.3]">
                    <div className="font-bold">{u.name}</div>
                    <div className="text-xs text-[var(--color-text-secondary)]">{u.email}</div>
                  </div>
                </div>
              </td>
              <td className="px-4 py-2.5 border-b border-[#F4F4F5] whitespace-nowrap">
                <span className="inline-flex whitespace-nowrap px-2.5 py-[3px] rounded-full text-[11.5px] font-semibold bg-[#F4F4F5] text-[var(--color-text-secondary)]">
                  {u.school}
                </span>
              </td>
              <td className="px-4 py-2.5 border-b border-[#F4F4F5] whitespace-nowrap">
                <Chip role={u.role} label={ROLE_LABELS[u.role]} />
              </td>
              <td className="px-4 py-2.5 border-b border-[#F4F4F5] whitespace-nowrap">
                <Badge status={u.status} label={u.status === 'on' ? 'Hoạt động' : 'Ngưng'} />
              </td>
              <td className="px-4 py-2.5 border-b border-[#F4F4F5] text-[var(--color-text-secondary)] whitespace-nowrap">
                {u.activity}
              </td>
              <td className="px-4 py-2.5 border-b border-[#F4F4F5] text-right whitespace-nowrap">
                <span
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(u);
                  }}
                  className="text-[13px] font-semibold text-[var(--color-danger-dark)] cursor-pointer px-2.5 py-1.5 rounded-[7px] hover:bg-[#FEF2F2] transition-colors"
                >
                  Xóa
                </span>
              </td>
            </tr>
          ))}
          {users.length === 0 && (
            <tr>
              <td colSpan={6} className="py-[38px] px-4 text-center text-[13px] text-[var(--color-text-muted)]">
                Không tìm thấy người dùng phù hợp.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
