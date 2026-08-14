import { Button } from '../../../components/ui';

export type RoleFilter = 'all' | 'super' | 'admin' | 'dev';

interface UserFiltersProps {
  onAdd: () => void;
  searchQuery: string;
  onSearchChange: (val: string) => void;
  roleFilter: RoleFilter;
  onRoleFilterChange: (val: RoleFilter) => void;
}

const ROLE_FILTERS: { value: RoleFilter; label: string }[] = [
  { value: 'all', label: 'Tất cả' },
  { value: 'super', label: 'Super Admin' },
  { value: 'admin', label: 'Quản trị viên trường' },
  { value: 'dev', label: 'Developer' },
];

export default function UserFilters({
  onAdd,
  searchQuery,
  onSearchChange,
  roleFilter,
  onRoleFilterChange,
}: UserFiltersProps) {
  return (
    <>
      <div className="flex items-center gap-2 mb-3.5">
        <Button variant="primary" onClick={onAdd} className="py-2 px-3.5 text-[13px]">
          + Thêm người dùng
        </Button>
        <input
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Tìm theo tên / email…"
          className="flex-1 max-w-[280px] ml-auto border border-[var(--color-border-light)] rounded-lg px-3 py-2 text-[13px] text-[var(--color-text)] bg-white outline-none focus:border-[var(--color-primary)] focus:shadow-[0_0_0_3px_rgba(27,75,143,0.12)]"
        />
      </div>
      <div className="flex items-center gap-1.5 mb-3.5 flex-wrap">
        <span className="text-xs font-semibold text-[var(--color-text-secondary)] mr-0.5">
          Vai trò:
        </span>
        {ROLE_FILTERS.map((rf) => {
          const active = roleFilter === rf.value;
          return (
            <div
              key={rf.value}
              onClick={() => onRoleFilterChange(rf.value)}
              className="whitespace-nowrap px-3 py-1 rounded-full text-xs font-semibold cursor-pointer border transition-colors"
              style={{
                background: active ? '#1B4B8F' : '#FFFFFF',
                color: active ? '#FFFFFF' : '#3F3F46',
                borderColor: active ? '#1B4B8F' : '#D9D9DA',
              }}
            >
              {rf.label}
            </div>
          );
        })}
      </div>
    </>
  );
}
