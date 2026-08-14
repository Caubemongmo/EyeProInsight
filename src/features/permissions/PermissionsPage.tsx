import { useState, useEffect } from 'react';
import { Button } from '../../components/ui';
import PermissionMatrixView from './components/PermissionMatrix';
import MatrixLegend from './components/MatrixLegend';
import RoleModal from './components/RoleModal';
import { 
  fetchPermissions, 
  updatePermissions,
  type PermissionMatrix,
  type RoleKey 
} from '../../services/api';

type ModalMode = 'newRole' | 'editRole' | null;

export default function PermissionsPage() {
  const [matrix, setMatrix] = useState<PermissionMatrix | null>(null);
  const [initialMatrix, setInitialMatrix] = useState<PermissionMatrix | null>(null);
  const [modalMode, setModalMode] = useState<ModalMode>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchPermissions().then(data => {
      setMatrix(data);
      setInitialMatrix(JSON.parse(JSON.stringify(data)));
    });
  }, []);

  const handleChange = (role: RoleKey, screenKey: string, val: 1 | 0) => {
    if (!matrix) return;
    setMatrix(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        [role]: {
          ...prev[role],
          [screenKey]: val
        }
      };
    });
  };

  const hasChanges = JSON.stringify(matrix) !== JSON.stringify(initialMatrix);

  const handleSaveMatrix = async () => {
    if (!matrix) return;
    setIsSaving(true);
    await updatePermissions(matrix);
    setInitialMatrix(JSON.parse(JSON.stringify(matrix)));
    setIsSaving(false);
  };

  // Prevent render before data loads
  if (!matrix) return null;

  return (
    <div>
      <h2 className="m-0 mb-4 text-[19px] font-bold tracking-[-0.3px]">Phân quyền</h2>
      
      <div className="flex gap-2 items-center mb-3.5">
        <Button
          variant="primary"
          onClick={() => setModalMode('newRole')}
          className="py-2 px-3.5 text-[13px]"
        >
          + Tạo vai trò mới
        </Button>
        <Button
          variant="secondary"
          onClick={() => setModalMode('editRole')}
          className="py-2 px-3.5 text-[13px] font-semibold"
        >
          Sửa định nghĩa vai
        </Button>
      </div>

      <PermissionMatrixView matrix={matrix} onChange={handleChange} />
      
      <MatrixLegend 
        onSave={handleSaveMatrix} 
        isSaving={isSaving} 
        hasChanges={hasChanges} 
      />

      <RoleModal 
        mode={modalMode} 
        onClose={() => setModalMode(null)} 
        onSave={() => {
          // Just a mock save action
        }}
      />
    </div>
  );
}
