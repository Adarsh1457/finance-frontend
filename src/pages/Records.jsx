import { useEffect, useMemo, useState } from 'react';
import { deleteRecord, listRecords, restoreRecord, updateRecord } from '../api/records';
import Filters from '../components/Filters/Filters';
import Table from '../components/Table/Table';
import Modal from '../components/Modal/Modal';
import RecordForm from '../components/Forms/RecordForm';
import Badge from '../components/Badge/Badge';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export default function Records() {
  const auth = useAuth();
  const toast = useToast();
  const [filters, setFilters] = useState({});
  const [records, setRecords] = useState([]);
  const [meta, setMeta] = useState({ page: 1, totalPages: 1 });
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');
  const [editing, setEditing] = useState(null);

  const fetchRecords = async (page = 1) => {
    const response = await listRecords({ ...filters, page, limit: 10, sortBy, sortOrder });
    setRecords(response.data);
    setMeta(response.meta);
  };

  useEffect(() => { fetchRecords(); }, [filters, sortBy, sortOrder]);

  const columns = useMemo(() => ([
    { key: 'date', label: 'Date', sortable: true },
    { key: 'time', label: 'Time' },
    { key: 'type', label: 'Type', sortable: true },
    { key: 'category', label: 'Category', sortable: true },
    { key: 'amount', label: 'Amount', sortable: true },
    { key: 'source', label: 'Source' },
    { key: 'notes', label: 'Notes' },
    ...(auth?.role === 'ADMIN' ? [{ key: 'actions', label: 'Actions' }] : [])
  ]), [auth]);

  const rows = records.map((record) => (
    <tr key={record.id}>
      <td>{record.date}</td>
      <td>{record.time}</td>
      <td><Badge tone={record.type === 'INCOME' ? 'income' : 'expense'}>{record.type}</Badge></td>
      <td>{record.category}</td>
      <td>{record.amount}</td>
      <td><Badge tone="neutral">{record.source}</Badge></td>
      <td>{record.notes}</td>
      {auth?.role === 'ADMIN' ? <td><button type="button" onClick={() => setEditing(record)}>Edit</button> <button type="button" onClick={async () => { if (!window.confirm('Delete this record?')) return; await deleteRecord(record.id); toast.success('Record deleted'); fetchRecords(meta.page); }}>Delete</button></td> : null}
    </tr>
  ));

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder((current) => (current === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
  };

  return (
    <div className="page-stack">
      <Filters filters={filters} onChange={(field, value) => setFilters((current) => ({ ...current, [field]: value }))} />
      <Table columns={columns} rows={rows} page={meta.page} totalPages={meta.totalPages} onPageChange={fetchRecords} sortBy={sortBy} sortOrder={sortOrder} onSort={handleSort} />
      <Modal open={Boolean(editing)} title="Edit Record" onClose={() => setEditing(null)}>
        {editing ? <RecordForm initialValue={editing} onCancel={() => setEditing(null)} onSubmit={async (form) => { await updateRecord(editing.id, form); toast.success('Record updated'); setEditing(null); fetchRecords(meta.page); }} /> : null}
      </Modal>
    </div>
  );
}