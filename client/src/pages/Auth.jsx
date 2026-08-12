import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
export default function Auth({ mode }) {
 const isRegister = mode === 'register'; const navigate = useNavigate(); const { authenticate } = useAuth(); const [error, setError] = useState(''); const [loading, setLoading] = useState(false);
 async function submit(e) { e.preventDefault(); setLoading(true); setError(''); const values = Object.fromEntries(new FormData(e.currentTarget)); try { await authenticate(mode, values); navigate('/'); } catch (err) { setError(err.message); } finally { setLoading(false); } }
 return <section className="auth"><form onSubmit={submit}><h1>{isRegister ? 'Crear cuenta' : 'Bienvenido de nuevo'}</h1>{isRegister && <label>Nombre<input required name="name" autoComplete="name" /></label>}<label>Correo<input required type="email" name="email" autoComplete="email" /></label><label>Contraseña<input required minLength="8" type="password" name="password" autoComplete={isRegister ? 'new-password' : 'current-password'} /></label>{error && <p className="error">{error}</p>}<button disabled={loading}>{loading ? 'Procesando...' : isRegister ? 'Registrarme' : 'Iniciar sesión'}</button><p>{isRegister ? '¿Ya tienes cuenta?' : '¿No tienes cuenta?'} <Link to={isRegister ? '/login' : '/register'}>{isRegister ? 'Inicia sesión' : 'Regístrate'}</Link></p></form></section>;
}
