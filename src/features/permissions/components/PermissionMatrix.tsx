import { SCREENS, type PermissionMatrix, type RoleKey } from '../../../services/api';

interface PermissionMatrixProps {
  matrix: PermissionMatrix;
  onChange: (role: RoleKey, screenKey: string, val: 1 | 0) => void;
}

export default function PermissionMatrixView({ matrix, onChange }: PermissionMatrixProps) {
  return (
    <div className="bg-white border border-[var(--color-border)] rounded-xl overflow-hidden shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
      <table className="w-full border-collapse text-[13px]">
        <thead>
          <tr>
            <th className="text-left text-xs text-[var(--color-text-secondary)] font-semibold px-4 py-[11px] border-b border-[var(--color-border)] bg-[#FAFAFA] w-[34%]">
              Màn hình
            </th>
            <th className="text-center text-xs text-[var(--color-text-secondary)] font-semibold px-3 py-[11px] border-b border-[var(--color-border)] bg-[#FAFAFA] whitespace-nowrap">
              Super Admin
            </th>
            <th className="text-center text-xs text-[var(--color-text-secondary)] font-semibold px-3 py-[11px] border-b border-[var(--color-border)] bg-[#FAFAFA] whitespace-nowrap">
              Quản trị viên trường
            </th>
            <th className="text-center text-xs text-[var(--color-text-secondary)] font-semibold px-3 py-[11px] border-b border-[var(--color-border)] bg-[#FAFAFA] whitespace-nowrap">
              Developer
            </th>
          </tr>
        </thead>
        <tbody>
          {SCREENS.map((sc, i) => {
            if (sc.group) {
              return (
                <tr key={`g-${i}`}>
                  <td
                    colSpan={4}
                    className="px-4 pt-2.5 pb-1.5 border-b border-[#F4F4F5] text-[11px] font-bold uppercase tracking-[0.6px] text-[var(--color-text-muted)] bg-[#FAFAFA]"
                  >
                    {sc.group}
                  </td>
                </tr>
              );
            }

            if (sc.k) {
              const k = sc.k;
              const adminOn = !!matrix.admin[k];
              const devOn = !!matrix.dev[k];

              return (
                <tr key={`r-${k}`} className="hover:bg-[#FAFAFA] transition-colors">
                  <td className="px-4 py-2.5 border-b border-[#F4F4F5] font-semibold whitespace-nowrap">
                    {sc.label}
                  </td>
                  
                  {/* Super Admin - always full access */}
                  <td className="px-3 py-2.5 border-b border-[#F4F4F5] text-center">
                    <span
                      title="Super Admin luôn có toàn quyền"
                      className="inline-flex w-[26px] h-[26px] rounded-[7px] items-center justify-center text-[13px] font-bold bg-[var(--color-success-light)] text-[var(--color-success)] opacity-55 cursor-not-allowed"
                    >
                      ✓
                    </span>
                  </td>

                  {/* Quản trị viên trường */}
                  <td className="px-3 py-2.5 border-b border-[#F4F4F5] text-center">
                    <span
                      onClick={() => onChange('admin', k, adminOn ? 0 : 1)}
                      className="inline-flex w-[26px] h-[26px] rounded-[7px] items-center justify-center text-[13px] font-bold cursor-pointer border transition-colors hover:border-[var(--color-primary)]"
                      style={{
                        background: adminOn ? 'var(--color-success-light)' : '#FFFFFF',
                        color: adminOn ? 'var(--color-success)' : 'var(--color-text-muted)',
                        borderColor: adminOn ? 'var(--color-success-light)' : 'var(--color-border)',
                      }}
                    >
                      {adminOn ? '✓' : '—'}
                    </span>
                  </td>

                  {/* Developer */}
                  <td className="px-3 py-2.5 border-b border-[#F4F4F5] text-center">
                    <span
                      onClick={() => onChange('dev', k, devOn ? 0 : 1)}
                      className="inline-flex w-[26px] h-[26px] rounded-[7px] items-center justify-center text-[13px] font-bold cursor-pointer border transition-colors hover:border-[var(--color-primary)]"
                      style={{
                        background: devOn ? 'var(--color-success-light)' : '#FFFFFF',
                        color: devOn ? 'var(--color-success)' : 'var(--color-text-muted)',
                        borderColor: devOn ? 'var(--color-success-light)' : 'var(--color-border)',
                      }}
                    >
                      {devOn ? '✓' : '—'}
                    </span>
                  </td>
                </tr>
              );
            }
            return null;
          })}
        </tbody>
      </table>
    </div>
  );
}
