import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export default function Login() {
  const auth = useAuth();
  const toast = useToast();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});

  const submit = async (event) => {
    event.preventDefault();
    setErrors({});
    try {
      await auth.login(form);
      toast.success('Logged in successfully');
      navigate('/');
    } catch (error) {
      const message = error.response?.data?.message || 'Login failed';
      toast.error(message);
      setErrors({ form: message });
    }
  };

  return (
    <div className="auth-screen">
      <form className="auth-card" onSubmit={submit}>
        <h1>Finance App</h1>
        <p>Sign in to continue.</p>
        <label>Email<input value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} /></label>
        <label>Password<input type="password" value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} /></label>
        {errors.form ? <div className="form-error">{errors.form}</div> : null}
        <button className="primary-button" type="submit">Login</button>
        <button type="button" className="link-button" onClick={() => navigate('/register')}>Need an account?</button>
      </form>
    </div>
  );
}