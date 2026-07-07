import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log("Doing Login");
      const user= await login(email, password);
      console.log("user is", user);
      if(user?.role == "ADMIN"){
        navigate('/admin/dashboard');
      }
      else{
        navigate('/candidate/dashboard');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="auth-page">
      <form className="card" onSubmit={handleSubmit}>
        <h2>Login</h2>
        {error && <p className="error">{error}</p>}
        <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
        <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" />
        <button type="submit">Login</button>
        <p>
          No account? <Link to="/register">Register</Link>
        </p>
      </form>
    </div>
  );
};
