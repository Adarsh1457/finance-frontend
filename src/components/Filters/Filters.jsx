export default function Filters({ filters, onChange, children }) {
  return (
    <div className="filters-bar">
      {children}
      <div className="filters-grid">
        <label>
          Start Date
          <input type="date" value={filters.startDate || ''} onChange={(event) => onChange('startDate', event.target.value)} />
        </label>
        <label>
          End Date
          <input type="date" value={filters.endDate || ''} onChange={(event) => onChange('endDate', event.target.value)} />
        </label>
        <label>
          Type
          <select value={filters.type || ''} onChange={(event) => onChange('type', event.target.value)}>
            <option value="">All</option>
            <option value="INCOME">Income</option>
            <option value="EXPENSE">Expense</option>
          </select>
        </label>
        <label>
          Category
          <input value={filters.category || ''} onChange={(event) => onChange('category', event.target.value)} placeholder="Category" />
        </label>
        <label>
          Source
          <select value={filters.source || ''} onChange={(event) => onChange('source', event.target.value)}>
            <option value="">All</option>
            <option value="MANUAL">Manual</option>
            <option value="CSV">CSV</option>
            <option value="EXCEL">Excel</option>
          </select>
        </label>
      </div>
    </div>
  );
}