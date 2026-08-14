import { useState, useEffect, useMemo } from 'react';
import UserFilters, { type RoleFilter } from './components/UserFilters';
import UsersTable from './components/UsersTable';
import UserFormModal from './components/UserFormModal';
import DeleteUserModal from './components/DeleteUserModal';
import { fetchUsers, saveUser, removeUser, type User } from '../../services/api';

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [query, setQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<RoleFilter>('all');
  
  // Modals state
  const [addModal, setAddModal] = useState(false);
  const [editUser, setEditUser] = useState<User | null>(null);
  const [deleteUser, setDeleteUser] = useState<User | null>(null);

  const loadData = async () => {
    const data = await fetchUsers();
    setUsers(data);
  };

  useEffect(() => {
    loadData();
  }, []);

  const filtered = useMemo(() => {
    let result = users;
    if (roleFilter !== 'all') {
      result = result.filter(u => u.role === roleFilter);
    }
    const q = query.trim().toLowerCase();
    if (q) {
      result = result.filter(
        u => u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q)
      );
    }
    return result;
  }, [users, query, roleFilter]);

  const handleSave = async (userData: Partial<User>) => {
    await saveUser(userData);
    setAddModal(false);
    setEditUser(null);
    loadData();
  };

  const handleDelete = async () => {
    if (deleteUser) {
      await removeUser(deleteUser.id);
      setDeleteUser(null);
      loadData();
    }
  };

  return (
    <div>
      <h2 className="m-0 mb-4 text-[19px] font-bold tracking-[-0.3px]">Quản lý người dùng</h2>
      
      <UserFilters 
        onAdd={() => setAddModal(true)}
        searchQuery={query}
        onSearchChange={setQuery}
        roleFilter={roleFilter}
        onRoleFilterChange={setRoleFilter}
      />
      
      <UsersTable 
        users={filtered}
        onEdit={setEditUser}
        onDelete={setDeleteUser}
      />

      <UserFormModal 
        open={addModal}
        onClose={() => setAddModal(false)}
        onSave={handleSave}
      />

      <UserFormModal 
        user={editUser}
        open={!!editUser}
        onClose={() => setEditUser(null)}
        onSave={handleSave}
      />

      <DeleteUserModal 
        user={deleteUser}
        onClose={() => setDeleteUser(null)}
        onConfirm={handleDelete}
      />
    </div>
  );
}
