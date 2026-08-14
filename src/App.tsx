import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AdminLayout from './layouts/AdminLayout';
import DataConfigPage from './features/data-config/DataConfigPage';
import RecommendationsPage from './features/recommendations/RecommendationsPage';
import PermissionsPage from './features/permissions/PermissionsPage';
function PlaceholderPage({ title }: { title: string }) {
  return (
    <div>
      <h2 className="m-0 mb-1 text-[19px] font-bold tracking-[-0.3px]">{title}</h2>
      <p className="text-[13px] text-[var(--color-text-secondary)]">Nội dung trang sẽ được triển khai ở bước tiếp theo.</p>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AdminLayout />}>
          <Route index element={<RecommendationsPage />} />
          <Route path="/data" element={<DataConfigPage />} />
          <Route path="/users" element={<PlaceholderPage title="Quản lý người dùng" />} />
          <Route path="/permissions" element={<PermissionsPage />} />
          <Route path="/documents" element={<PlaceholderPage title="Documents" />} />
          <Route path="/knowledge-graph" element={<PlaceholderPage title="Knowledge Graph" />} />
          <Route path="/retrieval" element={<PlaceholderPage title="Retrieval" />} />
          <Route path="/exercises" element={<PlaceholderPage title="Bài tập" />} />
          <Route path="/api" element={<PlaceholderPage title="API" />} />
          <Route path="/subscriptions" element={<PlaceholderPage title="Quản lý thuê bao" />} />
          <Route path="/domains" element={<PlaceholderPage title="Quản lý domain" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
