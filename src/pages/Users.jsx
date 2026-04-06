import { useEffect, useState } from 'react';
import { createUser, deactivateUser, listUsers, updateUser } from '../api/users';
import Table from '../components/Table/Table';
import Modal from '../components/Modal/Modal';
import UserForm from '../components/Forms/UserForm';
import Badge from '../components/Badge/Badge';
import { useToast } from '../context/ToastContext';

export default function UsersPage() {
  const toast = useToast();
  const [users, setUsers] = useState([]);
  const [meta, setMeta] = useState({ page: 1, totalPages: 1 });
  const [editing, setEditing] = useState(null);
  const [creating, setCreating] = useState(false);
  const [filters, setFilters] = useState({ role: '', status: '' });

  const refresh = async () => {
    const response = await listUsers({ page: 1, limit: 10, ...filters });
    setUsers(response.data);
    setMeta(response.meta);
  };

  useEffect(() => { refresh(); }, [filters]);

  const columns = [
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'role', label: 'Role' },
    { key: 'status', label: 'Status' },
    { key: 'created_at', label: 'Created' },
    { key: 'actions', label: 'Actions' }
  ];

  return (
    <div className="page-stack">
      <div className="filters-grid">
        <label>
          Role
          <select value={filters.role} onChange={(event) => setFilters((current) => ({ ...current, role: event.target.value }))}>
            <option value="">All</option>
            <option value="VIEWER">User</option>
            <option value="ADMIN">Admin</option>
          </select>
        </label>
        <label>
          Status
          <select value={filters.status} onChange={(event) => setFilters((current) => ({ ...current, status: event.target.value }))}>
            <option value="">All</option>
            <option value="ACTIVE">Active</option>
            <option value="INACTIVE">Inactive</option>
          </select>
        </label>
      </div>
      <button className="primary-button" type="button" onClick={() => setCreating(true)}>Create User</button>
      <Table columns={columns} rows={users.map((user) => (
        <tr key={user.id}>
          <td>{user.name}</td>
          <td>{user.email}</td>
          <td><Badge tone="neutral">{user.role}</Badge></td>
          <td><Badge tone={user.status === 'ACTIVE' ? 'income' : 'expense'}>{user.status}</Badge></td>
          <td>{user.created_at}</td>
          <td><button type="button" onClick={() => setEditing(user)}>Edit</button> <button type="button" onClick={async () => { await deactivateUser(user.id); toast.success('User deactivated'); refresh(); }}>Deactivate</button></td>
        </tr>
      ))} page={meta.page} totalPages={meta.totalPages} onPageChange={() => {}} sortBy="" sortOrder="asc" onSort={() => {}} />

      <Modal open={creating} title="Create User" onClose={() => setCreating(false)}>
        <UserForm onCancel={() => setCreating(false)} onSubmit={async (form) => { await createUser(form); toast.success('User created'); setCreating(false); refresh(); }} />
      </Modal>
      <Modal open={Boolean(editing)} title="Edit User" onClose={() => setEditing(null)}>
        {editing ? <UserForm initialValue={editing} showPassword={false} onCancel={() => setEditing(null)} onSubmit={async (form) => { await updateUser(editing.id, form); toast.success('User updated'); setEditing(null); refresh(); }} /> : null}
      </Modal>
    </div>
  );
}