import { useEffect, useState } from 'react';

const initialState = { amount: '', type: 'INCOME', category: '', date: '', time: '', notes: '' };

export default function RecordForm({ initialValue = initialState, onSubmit, onCancel }) {
  const [form, setForm] = useState(initialState);

  useEffect(() => {
    setForm({ ...initialState, ...initialValue });
  }, [initialValue]);

  const setField = (field, value) => setForm((current) => ({ ...current, [field]: value }));

  return (
    <form className="form-grid" onSubmit={(event) => { event.preventDefault(); onSubmit(form); }}>
      <label>Amount<input type="number" value={form.amount} onChange={(event) => setField('amount', event.target.value)} /></label>
      <label>Type<select value={form.type} onChange={(event) => setField('type', event.target.value)}><option value="INCOME">Income</option><option value="EXPENSE">Expense</option></select></label>
      <label>Category<input value={form.category} onChange={(event) => setField('category', event.target.value)} /></label>
      <label>Date<input type="date" value={form.date} onChange={(event) => setField('date', event.target.value)} /></label>
      <label>Time<input type="time" value={String(form.time || '').slice(0, 5)} onChange={(event) => setField('time', `${event.target.value}:00`)} /></label>
      <label className="full-width">Notes<textarea value={form.notes || ''} onChange={(event) => setField('notes', event.target.value)} /></label>
      <div className="form-actions"><button type="button" onClick={onCancel}>Cancel</button><button className="primary-button" type="submit">Save</button></div>
    </form>
  );
}