import Pagination from '../Pagination/Pagination';

export default function Table({ columns, rows, page, totalPages, onPageChange, sortBy, sortOrder, onSort, emptyMessage = 'No records found.' }) {
  return (
    <div className="table-shell">
      <table className="data-table">
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.key} onClick={column.sortable ? () => onSort(column.key) : undefined} role={column.sortable ? 'button' : undefined}>
                <span>{column.label}</span>
                {column.sortable && sortBy === column.key ? <span>{sortOrder === 'asc' ? ' ▲' : ' ▼'}</span> : null}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length ? rows : (
            <tr>
              <td colSpan={columns.length}>
                <div className="empty-state">{emptyMessage}</div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <Pagination page={page} totalPages={totalPages} onPageChange={onPageChange} />
    </div>
  );
}