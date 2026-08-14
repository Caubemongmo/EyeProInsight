import { useLocation, useNavigate } from 'react-router-dom';

interface NavItemData {
  key: string;
  label: string;
  icon: React.ReactNode;
  path: string;
}

interface NavGroup {
  title: string;
  items: NavItemData[];
}

function SvgIcon({ children }: { children: React.ReactNode }) {
  return (
    <svg
      width={17}
      height={17}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {children}
    </svg>
  );
}

const ICONS = {
  rec: (
    <SvgIcon>
      <path d="M12 3l8 9-8 9-8-9z" />
    </SvgIcon>
  ),
  data: (
    <SvgIcon>
      <rect x={4} y={4} width={16} height={6} rx={1.5} />
      <rect x={4} y={14} width={16} height={6} rx={1.5} />
    </SvgIcon>
  ),
  users: (
    <SvgIcon>
      <circle cx={12} cy={8} r={3.5} />
      <path d="M5 20c0-3.5 3-5.5 7-5.5s7 2 7 5.5" />
    </SvgIcon>
  ),
  perm: (
    <SvgIcon>
      <rect x={5} y={11} width={14} height={9} rx={2} />
      <path d="M8.5 11V7.5a3.5 3.5 0 017 0V11" />
    </SvgIcon>
  ),
  doc: (
    <SvgIcon>
      <rect x={5} y={3} width={14} height={18} rx={2} />
      <path d="M9 8h6M9 12h6M9 16h4" />
    </SvgIcon>
  ),
  graph: (
    <SvgIcon>
      <circle cx={6} cy={6} r={2.4} />
      <circle cx={18} cy={7} r={2.4} />
      <circle cx={12} cy={18} r={2.4} />
      <path d="M8 7.2l7.6-.7M7 8l4 8M17 9.2l-4 6.8" />
    </SvgIcon>
  ),
  search: (
    <SvgIcon>
      <circle cx={11} cy={11} r={6} />
      <path d="M15.5 15.5L20 20" />
    </SvgIcon>
  ),
  pencil: (
    <SvgIcon>
      <path d="M4 20l4.5-1L19 8.5 15.5 5 5 15.5z" />
    </SvgIcon>
  ),
  api: (
    <SvgIcon>
      <path d="M8 4L4 12l4 8M16 4l4 8-4 8" />
    </SvgIcon>
  ),
  sub: (
    <SvgIcon>
      <rect x={3} y={6} width={18} height={13} rx={2} />
      <path d="M3 10h18" />
    </SvgIcon>
  ),
  domain: (
    <SvgIcon>
      <circle cx={12} cy={12} r={8.5} />
      <path d="M3.5 12h17M12 3.5c-5 5-5 12 0 17M12 3.5c5 5 5 12 0 17" />
    </SvgIcon>
  ),
};

const NAV_GROUPS: NavGroup[] = [
  {
    title: 'Quản trị nghiệp vụ',
    items: [
      { key: 'rec', label: 'Cấu hình khuyến nghị', icon: ICONS.rec, path: '/' },
      { key: 'data', label: 'Cấu hình dữ liệu', icon: ICONS.data, path: '/data' },
      { key: 'users', label: 'Quản lý người dùng', icon: ICONS.users, path: '/users' },
      { key: 'perm', label: 'Phân quyền', icon: ICONS.perm, path: '/permissions' },
    ],
  },
  {
    title: 'Công cụ kỹ thuật',
    items: [
      { key: 'doc', label: 'Documents', icon: ICONS.doc, path: '/documents' },
      { key: 'graph', label: 'Knowledge Graph', icon: ICONS.graph, path: '/knowledge-graph' },
      { key: 'search', label: 'Retrieval', icon: ICONS.search, path: '/retrieval' },
      { key: 'pencil', label: 'Bài tập', icon: ICONS.pencil, path: '/exercises' },
      { key: 'api', label: 'API', icon: ICONS.api, path: '/api' },
    ],
  },
  {
    title: 'Quản trị hệ thống',
    items: [
      { key: 'sub', label: 'Quản lý thuê bao', icon: ICONS.sub, path: '/subscriptions' },
      { key: 'domain', label: 'Quản lý domain', icon: ICONS.domain, path: '/domains' },
    ],
  },
];

function NavItem({ item, active }: { item: NavItemData; active: boolean }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(item.path)}
      className={`flex items-center gap-2.5 px-[11px] py-[9px] rounded-lg text-[13.5px] font-semibold whitespace-nowrap cursor-pointer mb-0.5 transition-colors ${
        active
          ? 'bg-[var(--color-primary-light)] text-[var(--color-primary)]'
          : 'text-[var(--color-text-dark)] hover:bg-[#F0F0F1]'
      }`}
    >
      <span className="inline-flex w-[18px] justify-center">{item.icon}</span>
      {item.label}
    </div>
  );
}

export default function Sidebar() {
  const location = useLocation();

  return (
    <aside className="w-[var(--sidebar-width)] flex-none bg-[var(--color-sidebar)] border-r border-[var(--color-border)] px-3 py-4 overflow-y-auto">
      {NAV_GROUPS.map((group, gi) => (
        <div key={gi}>
          <div className={`text-[11px] font-bold uppercase tracking-[0.6px] text-[var(--color-text-muted)] mx-2.5 mb-2 ${gi > 0 ? 'mt-5' : 'mt-0.5'}`}>
            {group.title}
          </div>
          {group.items.map((item) => (
            <NavItem
              key={item.key}
              item={item}
              active={location.pathname === item.path}
            />
          ))}
        </div>
      ))}
    </aside>
  );
}
