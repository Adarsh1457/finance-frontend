export default function Pagination({ page, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);
  return (
    <div className="pagination">
      <button type="button" onClick={() => onPageChange(Math.max(1, page - 1))} disabled={page === 1}>Prev</button>
      {pages.slice(Math.max(0, page - 3), page + 2).map((value) => (
        <button key={value} type="button" className={value === page ? 'active' : ''} onClick={() => onPageChange(value)}>
          {value}
        </button>
      ))}
      <button type="button" onClick={() => onPageChange(Math.min(totalPages, page + 1))} disabled={page === totalPages}>Next</button>
    </div>
  );
}