import { useState, useEffect, useMemo } from 'react';
import { Button } from '../../components/ui';
import SiteQuotaTable from './components/SiteQuotaTable';
import CapModal from './components/CapModal';
import SiteModal from './components/SiteModal';
import { 
  fetchSubscriptionData, 
  updateUserCap, 
  addSite, 
  updateSiteCap,
  type SiteQuota 
} from '../../services/api';
import { useAppStore, SCHOOLS } from '../../stores/appStore';

type CapModalType = 'user' | { siteId: number } | null;

export default function SubscriptionsPage() {
  const [userCap, setUserCap] = useState(50);
  const [sites, setSites] = useState<SiteQuota[]>([]);
  const [perPage, setPerPage] = useState(5);
  const [page, setPage] = useState(1);
  
  const selectedSchoolId = useAppStore(state => state.selectedSchoolId);
  const selectedSchoolName = SCHOOLS.find(s => s.id === selectedSchoolId)?.name || '';
  
  // Modals state
  const [capModal, setCapModal] = useState<CapModalType>(null);

  const loadData = async () => {
    const data = await fetchSubscriptionData();
    setUserCap(data.userCap);
    setSites(data.sites);
  };

  useEffect(() => {
    loadData();
  }, []);

  const filteredSites = useMemo(() => {
    return sites.filter(s => s.name === selectedSchoolName);
  }, [sites, selectedSchoolName]);

  const pageRows = filteredSites;

  // Cap Modal Logic
  let capTitle = '';
  let capSub = '';
  let capUnit = '';
  let capCurrentLabel = '';
  let capInitVal = '';
  
  if (capModal === 'user') {
    capTitle = 'Sửa hạn mức mỗi người dùng';
    capSub = 'Áp dụng chung cho mọi site, reset vào 00:00 (UTC+7).';
    capUnit = 'tin/ngày';
    capCurrentLabel = `${userCap} tin/ngày`;
    capInitVal = String(userCap);
  } else if (capModal && typeof capModal === 'object') {
    capTitle = 'Sửa hạn mức tháng của site';
    capSub = 'Khi site đạt hạn mức, trợ lý ngừng trả lời tới đầu tháng sau.';
    capUnit = 'tin/tháng';
    const s = sites.find(x => x.id === capModal.siteId);
    if (s) {
      capCurrentLabel = `${s.cap.toLocaleString('vi-VN')} tin/tháng`;
      capInitVal = String(s.cap);
    }
  }

  const handleSaveCap = async (val: number) => {
    if (capModal === 'user') {
      await updateUserCap(val);
    } else if (capModal && typeof capModal === 'object') {
      await updateSiteCap(capModal.siteId, val);
    }
    await loadData();
  };

  const handleAddSite = async (name: string, cap: number) => {
    await addSite(name, cap);
    const data = await fetchSubscriptionData();
    setSites(data.sites);
    setPage(Math.max(1, Math.ceil(data.sites.length / perPage)));
  };

  return (
    <div>
      <h2 className="m-0 mb-4 text-[19px] font-bold tracking-[-0.3px]">Quản lý thuê bao</h2>
      
      <div className="max-w-[900px] bg-white border border-[var(--color-border)] rounded-[14px] shadow-[0_1px_2px_rgba(0,0,0,0.04)] overflow-hidden">
        {/* Header section */}
        <div className="px-[22px] py-4 border-b border-[var(--color-border)]">
          <div className="text-[14.5px] font-bold">Hạn mức tin nhắn</div>
          <div className="text-[12.5px] text-[var(--color-text-secondary)] mt-0.5">
            Chặn lạm dụng ở mức người dùng, và giữ chi phí LLM của từng site trong ngân sách tháng.
          </div>
        </div>

        {/* User Cap */}
        <div className="flex items-center gap-5 px-[22px] py-[15px] border-b border-[#F1F1F2]">
          <div className="flex-1 min-w-0">
            <div className="text-[13.5px] font-semibold">Tin nhắn tối đa của một người dùng / ngày</div>
            <div className="text-xs text-[var(--color-text-secondary)] mt-[3px]">
              Áp dụng chung cho mọi site. Reset vào 00:00 (UTC+7).
            </div>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <span className="text-[13.5px] font-semibold tabular-nums">
              {userCap} <span className="font-normal text-[var(--color-text-secondary)] text-[12.5px]">tin/ngày</span>
            </span>
            <div 
              onClick={() => setCapModal('user')}
              className="px-3 py-1.5 rounded-[7px] border border-[var(--color-border-light)] bg-white text-[12.5px] font-semibold cursor-pointer hover:bg-[#F4F4F5] transition-colors"
            >
              Sửa
            </div>
          </div>
        </div>

        <div className="flex items-end gap-3.5 px-[22px] pt-[15px] pb-1.5">
          <div className="flex-1 min-w-0">
            <div className="text-[13.5px] font-semibold">Tin nhắn tối đa của mỗi site khách hàng / tháng</div>
            <div className="text-xs text-[var(--color-text-secondary)] mt-[3px]">
              Khi site đạt hạn mức, trợ lý ngừng trả lời tới đầu tháng sau.
            </div>
          </div>
        </div>

        <SiteQuotaTable 
          sites={pageRows}
          onEditSiteCap={(s) => setCapModal({ siteId: s.id })}
        />
      </div>

      <CapModal 
        open={!!capModal}
        onClose={() => setCapModal(null)}
        title={capTitle}
        sub={capSub}
        unit={capUnit}
        currentLabel={capCurrentLabel}
        initialValue={capInitVal}
        onSave={handleSaveCap}
      />
    </div>
  );
}
