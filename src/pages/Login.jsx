// src/pages/Login.jsx
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginWithEmail, loginWithGoogle } from '../firebase/auth';
import { Eye, EyeOff, Code2 } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();
  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error,    setError]    = useState('');
  const [loading,  setLoading]  = useState(false);

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) { setError('Completa todos los campos'); return; }
    setLoading(true); setError('');
    try {
      await loginWithEmail(email, password);
      navigate('/learn');
    } catch (err) {
      setError(getFriendlyError(err.code));
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setLoading(true); setError('');
    try {
      await loginWithGoogle();
      navigate('/learn');
    } catch {
      setError('Error al iniciar con Google');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-dvh bg-bg-primary flex flex-col items-center justify-center px-6 py-10">
      <div className="w-full max-w-sm flex flex-col gap-7 animate-slide-up">

        {/* ── Brand ───────────────────────────────────────────────── */}
        <div className="flex flex-col items-center gap-3">
          <div className="w-16 h-16 rounded-3xl bg-gradient-accent flex items-center justify-center shadow-accent-md animate-float">
            <Code2 size={30} className="text-white" strokeWidth={2} />
          </div>
          <div className="text-center">
            <h1 className="text-3xl font-extrabold text-text-primary tracking-tight">Cody</h1>
            <p className="text-text-muted text-sm mt-0.5">Aprende a programar, lección a lección</p>
          </div>
        </div>

        {/* ── Card ────────────────────────────────────────────────── */}
        <div className="card p-6 shadow-card-md">
          <h2 className="text-xl font-bold text-text-primary mb-5">¡Bienvenido de vuelta! 👋</h2>

          <form onSubmit={handleEmailLogin} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-text-secondary font-semibold text-sm" htmlFor="login-email">Email</label>
              <input
                id="login-email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="tu@email.com"
                className="input-field"
                autoComplete="email"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-text-secondary font-semibold text-sm" htmlFor="login-password">Contraseña</label>
              <div className="relative">
                <input
                  id="login-password"
                  type={showPass ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Tu contraseña"
                  className="input-field pr-12"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-secondary transition-colors"
                >
                  {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-accent-red-light border border-accent-red/20 rounded-xl px-4 py-3 animate-fade-in">
                <p className="text-accent-red text-sm font-semibold">{error}</p>
              </div>
            )}

            <button id="login-btn" type="submit" disabled={loading} className="btn-primary mt-1">
              {loading ? 'Iniciando...' : 'Iniciar Sesión'}
            </button>
          </form>

          <div className="flex items-center gap-3 my-4">
            <div className="flex-1 h-px bg-border" />
            <span className="text-text-muted text-xs font-medium">o continúa con</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          <button id="google-login-btn" onClick={handleGoogle} disabled={loading} className="btn-google">
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Google
          </button>
        </div>

        <p className="text-text-muted text-sm text-center">
          ¿No tienes cuenta?{' '}
          <Link to="/register" className="text-accent font-bold hover:underline">
            Regístrate gratis
          </Link>
        </p>
      </div>
    </div>
  );
}

function getFriendlyError(code) {
  const map = {
    'auth/user-not-found':    'No existe una cuenta con ese email',
    'auth/wrong-password':    'Contraseña incorrecta',
    'auth/invalid-email':     'Email inválido',
    'auth/too-many-requests': 'Demasiados intentos. Intenta más tarde',
    'auth/invalid-credential':'Email o contraseña incorrectos',
  };
  return map[code] || 'Error al iniciar sesión';
}
