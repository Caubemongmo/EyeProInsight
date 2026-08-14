import { Outlet } from 'react-router-dom';
import Topbar from '../components/layout/Topbar';
import Sidebar from '../components/layout/Sidebar';

export default function AdminLayout() {
  return (
    <div className="flex flex-col h-screen min-w-[1100px] overflow-hidden">
      <Topbar />
      <div className="flex flex-1 min-h-0">
        <Sidebar />
        <main className="flex-1 min-w-0 overflow-y-auto bg-[var(--color-bg)]">
          <div className="max-w-[1160px] mx-auto px-[30px] py-[26px] pb-16">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
