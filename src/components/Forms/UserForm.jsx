import { useEffect, useState } from 'react';

const initialState = { name: '', email: '', password: '', role: 'VIEWER', status: 'ACTIVE' };

export default function UserForm({ initialValue = initialState, onSubmit, onCancel, showPassword = true }) {
  const [form, setForm] = useState(initialState);

  useEffect(() => {
    setForm({ ...initialState, ...initialValue });
  }, [initialValue]);

  const setField = (field, value) => setForm((current) => ({ ...current, [field]: value }));

  const submit = (event) => {
    event.preventDefault();
    const payload = { ...form };
    if (!showPassword) delete payload.password;
    onSubmit(payload);
  };

  return (
    <form className="form-grid" onSubmit={submit}>
      <label>Name<input value={form.name} onChange={(event) => setField('name', event.target.value)} /></label>
      <label>Email<input value={form.email} onChange={(event) => setField('email', event.target.value)} /></label>
      {showPassword ? <label>Password<input type="password" value={form.password} onChange={(event) => setField('password', event.target.value)} /></label> : null}
      <label>Role<select value={form.role} onChange={(event) => setField('role', event.target.value)}><option value="VIEWER">User</option><option value="ADMIN">Admin</option></select></label>
      <label>Status<select value={form.status} onChange={(event) => setField('status', event.target.value)}><option value="ACTIVE">Active</option><option value="INACTIVE">Inactive</option></select></label>
      <div className="form-actions"><button type="button" onClick={onCancel}>Cancel</button><button className="primary-button" type="submit">Save</button></div>
    </form>
  );
}