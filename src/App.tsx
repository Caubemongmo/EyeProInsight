import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AdminLayout from './layouts/AdminLayout';
import DataConfigPage from './features/data-config/DataConfigPage';
import RecommendationsPage from './features/recommendations/RecommendationsPage';
import PermissionsPage from './features/permissions/PermissionsPage';
import UsersPage from './features/users/UsersPage';
import SubscriptionsPage from './features/subscriptions/SubscriptionsPage';
import DomainsPage from './features/domains/DomainsPage';
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
          <Route path="/users" element={<UsersPage />} />
          <Route path="/permissions" element={<PermissionsPage />} />
          <Route path="/documents" element={<PlaceholderPage title="Documents" />} />
          <Route path="/knowledge-graph" element={<PlaceholderPage title="Knowledge Graph" />} />
          <Route path="/retrieval" element={<PlaceholderPage title="Retrieval" />} />
          <Route path="/exercises" element={<PlaceholderPage title="Bài tập" />} />
          <Route path="/api" element={<PlaceholderPage title="API" />} />
          <Route path="/subscriptions" element={<SubscriptionsPage />} />
          <Route path="/domains" element={<DomainsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
