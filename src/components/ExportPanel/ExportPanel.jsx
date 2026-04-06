export default function ExportPanel({ format, setFormat, onExport, count }) {
  return (
    <div className="panel export-panel">
      <div className="panel-grid">
        <label>
          Format
          <select value={format} onChange={(event) => setFormat(event.target.value)}>
            <option value="csv">CSV</option>
            <option value="excel">Excel</option>
          </select>
        </label>
        <div className="count-chip">{count} matching records</div>
      </div>
      <button type="button" className="primary-button" onClick={onExport}>Export</button>
    </div>
  );
}