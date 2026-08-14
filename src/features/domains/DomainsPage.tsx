import { useState, useEffect, useMemo } from 'react';
import { Button } from '../../components/ui';
import DomainTable from './components/DomainTable';
import DomainModal from './components/DomainModal';
import DomainSyncModal from './components/DomainSyncModal';
import { 
  fetchDomains, 
  saveDomain, 
  syncDomain,
  type DomainEntity 
} from '../../services/api';

export default function DomainsPage() {
  const [domains, setDomains] = useState<DomainEntity[]>([]);
  const [perPage, setPerPage] = useState(5);
  const [page, setPage] = useState(1);
  
  // Modals state
  const [addModal, setAddModal] = useState(false);
  const [editDomain, setEditDomain] = useState<DomainEntity | null>(null);
  const [syncItem, setSyncItem] = useState<DomainEntity | null>(null);

  const loadData = async () => {
    const data = await fetchDomains();
    setDomains(data);
  };

  useEffect(() => {
    loadData();
  }, []);

  const pageRows = useMemo(() => {
    const totalPages = Math.max(1, Math.ceil(domains.length / perPage));
    const safePage = Math.min(page, totalPages);
    return domains.slice((safePage - 1) * perPage, safePage * perPage);
  }, [domains, page, perPage]);

  const handleSaveDomain = async (domData: Partial<DomainEntity>) => {
    await saveDomain(domData);
    setAddModal(false);
    setEditDomain(null);
    const updated = await fetchDomains();
    setDomains(updated);
    if (!domData.id) {
      setPage(Math.max(1, Math.ceil(updated.length / perPage)));
    }
  };

  const handleSyncConfirm = async () => {
    if (syncItem) {
      await syncDomain(syncItem.id);
      setSyncItem(null);
      await loadData();
    }
  };

  return (
    <div data-screen-label="Quản lý domain">
      <div className="max-w-[1060px]">
        <h2 className="m-0 mb-1 text-[19px] font-bold tracking-[-0.3px]">
          Quản lý domain E.Cloud liên thông
        </h2>
        
        <div className="flex justify-end mb-3.5">
          <Button 
            variant="primary" 
            onClick={() => setAddModal(true)}
            className="py-2.5 px-4 text-[13px]"
          >
            + Thêm domain
          </Button>
        </div>

        <DomainTable 
          domains={pageRows}
          totalDomains={domains.length}
          onEdit={setEditDomain}
          onSync={setSyncItem}
          page={page}
          perPage={perPage}
          onPageChange={setPage}
          onPerPageChange={(val) => { setPerPage(val); setPage(1); }}
        />
      </div>

      <DomainModal 
        open={addModal}
        onClose={() => setAddModal(false)}
        onSave={handleSaveDomain}
      />

      <DomainModal 
        domain={editDomain}
        open={!!editDomain}
        onClose={() => setEditDomain(null)}
        onSave={handleSaveDomain}
      />

      <DomainSyncModal 
        domain={syncItem}
        onClose={() => setSyncItem(null)}
        onConfirm={handleSyncConfirm}
      />
    </div>
  );
}
