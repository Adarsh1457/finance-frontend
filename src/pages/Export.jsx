import { useEffect, useState } from 'react';
import ExportPanel from '../components/ExportPanel/ExportPanel';
import Filters from '../components/Filters/Filters';
import { countRecords, exportRecords } from '../api/records';

export default function ExportPage() {
  const [filters, setFilters] = useState({});
  const [format, setFormat] = useState('csv');
  const [count, setCount] = useState(0);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    countRecords(filters).then(({ count: matching }) => setCount(matching));
  }, [filters]);

  const handleExport = async () => {
    const response = await exportRecords({ ...filters, format });
    const blob = new Blob([response.data], { type: response.headers['content-type'] });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `records_export_${new Date().toISOString().replace(/[:.]/g, '-')}.${format === 'excel' ? 'xlsx' : 'csv'}`;
    link.click();
    window.URL.revokeObjectURL(url);
    setHistory((current) => [{ format, timestamp: new Date().toISOString(), count }, ...current].slice(0, 5));
  };

  return (
    <div className="page-stack">
      <Filters filters={filters} onChange={(field, value) => setFilters((current) => ({ ...current, [field]: value }))} />
      <ExportPanel format={format} setFormat={setFormat} onExport={handleExport} count={count} />
      <div className="panel"><h3>Session Export History</h3>{history.map((item) => <div key={item.timestamp} className="history-row">{item.timestamp} · {item.format.toUpperCase()} · {item.count}</div>)}</div>
    </div>
  );
}