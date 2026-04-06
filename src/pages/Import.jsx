import { useEffect, useState } from 'react';
import FileUpload from '../components/FileUpload/FileUpload';
import Table from '../components/Table/Table';
import { downloadTemplate, importRecords, listImportLogs } from '../api/records';
import { useToast } from '../context/ToastContext';

export default function ImportPage() {
  const toast = useToast();
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    listImportLogs({ page: 1, limit: 5 }).then((response) => setLogs(response.data));
  }, []);

  const submit = async () => {
    if (!file) return;
    const extension = file.name.split('.').pop()?.toLowerCase();
    if (!['csv', 'xlsx', 'xls'].includes(extension)) {
      toast.error('Unsupported file type');
      return;
    }
    const data = await importRecords(file);
    setResult(data);
    toast.success('Import completed');
    const response = await listImportLogs({ page: 1, limit: 5 });
    setLogs(response.data);
  };

  const download = async (format) => {
    const response = await downloadTemplate(format);
    const blob = new Blob([response.data]);
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `records_template.${format === 'excel' ? 'xlsx' : 'csv'}`;
    link.click();
    window.URL.revokeObjectURL(url);
  };

  const logColumns = [
    { key: 'filename', label: 'Filename' },
    { key: 'imported_at', label: 'Imported At' },
    { key: 'total_rows', label: 'Total' },
    { key: 'success_rows', label: 'Success' },
    { key: 'failed_rows', label: 'Failed' }
  ];

  return (
    <div className="page-stack">
      <div className="panel">
        <FileUpload onFileSelected={setFile} />
        {file ? <div className="file-preview">{file.name} · {Math.round(file.size / 1024)} KB · {file.name.split('.').pop()?.toUpperCase()}</div> : null}
        <div className="inline-actions">
          <button className="primary-button" type="button" onClick={submit}>Import</button>
          <button type="button" onClick={() => download('csv')}>Download CSV Template</button>
          <button type="button" onClick={() => download('excel')}>Download Excel Template</button>
        </div>
        {result ? <div className="result-box">Inserted {result.inserted} of {result.total} rows, {result.failed} failed.</div> : null}
      </div>
      <Table columns={logColumns} rows={logs.map((row) => (
        <tr key={row.id}><td>{row.filename}</td><td>{row.imported_at}</td><td>{row.total_rows}</td><td>{row.success_rows}</td><td>{row.failed_rows}</td></tr>
      ))} page={1} totalPages={1} onPageChange={() => {}} sortBy="" sortOrder="asc" onSort={() => {}} />
    </div>
  );
}