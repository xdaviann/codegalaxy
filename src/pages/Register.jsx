// src/pages/Register.jsx
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerWithEmail, loginWithGoogle } from '../firebase/auth';
import CodyMascot from '../components/ui/CodyMascot';
import { Eye, EyeOff } from 'lucide-react';

export default function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!name || !email || !password || !confirmPassword) {
      setError('Completa todos los campos'); return;
    }
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden'); return;
    }
    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres'); return;
    }
    if (!agreeTerms) {
      setError('Debes aceptar los términos y condiciones'); return;
    }
    setLoading(true); setError('');
    try {
      await registerWithEmail(email, password, name);
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
    } catch (err) {
      setError('Error al registrarse con Google');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-dvh bg-bg-primary flex flex-col items-center justify-center px-6 py-10">
      <div className="w-full max-w-sm flex flex-col items-center gap-6 animate-slide-up">
        {/* Logo */}
        <div className="flex flex-col items-center gap-2">
          <CodyMascot size={90} animate />
          <h1 className="text-4xl font-bold font-mono text-text-primary tracking-widest mt-1">
            C<span className="text-accent-cyan">O</span>DY
          </h1>
        </div>

        <h2 className="text-2xl font-bold text-text-primary text-center">
          ¡Empieza a aprender hoy!
        </h2>

        <form onSubmit={handleRegister} className="w-full flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-text-primary font-bold text-sm" htmlFor="reg-name">Nombre</label>
            <input
              id="reg-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Tu nombre"
              className="input-field"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-text-primary font-bold text-sm" htmlFor="reg-email">Email</label>
            <input
              id="reg-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Tu e-mail"
              className="input-field"
              autoComplete="email"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-text-primary font-bold text-sm" htmlFor="reg-password">Contraseña</label>
            <div className="relative">
              <input
                id="reg-password"
                type={showPass ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Tu contraseña"
                className="input-field pr-12"
                autoComplete="new-password"
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-secondary"
              >
                {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-text-primary font-bold text-sm" htmlFor="reg-confirm">Confirmar contraseña</label>
            <input
              id="reg-confirm"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Tu contraseña"
              className="input-field"
              autoComplete="new-password"
            />
          </div>

          {/* Terms */}
          <label className="flex items-start gap-3 cursor-pointer">
            <div className="relative mt-0.5">
              <input
                id="reg-terms"
                type="checkbox"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="sr-only"
              />
              <div className={`w-5 h-5 rounded flex items-center justify-center border-2 transition-all
                ${agreeTerms ? 'bg-accent-cyan border-accent-cyan' : 'bg-bg-tertiary border-border-subtle'}`}>
                {agreeTerms && (
                  <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                    <path d="M1 4L3.5 6.5L9 1" stroke="#1a1e2e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>
            </div>
            <span className="text-text-secondary text-sm">
              Acepto los{' '}
              <span className="text-accent-cyan font-semibold">términos y condiciones</span>
            </span>
          </label>

          {error && (
            <p className="text-accent-red text-sm font-semibold text-center animate-fade-in bg-accent-red/10 rounded-xl py-3 px-4">
              {error}
            </p>
          )}

          <button
            id="register-btn"
            type="submit"
            disabled={loading}
            className="btn-primary mt-2"
          >
            {loading ? 'Creando cuenta...' : 'Regístrate y aprende gratis'}
          </button>
        </form>

        {/* Divider */}
        <div className="w-full flex items-center gap-3">
          <div className="flex-1 h-px bg-border-subtle" />
          <span className="text-text-muted text-xs">o</span>
          <div className="flex-1 h-px bg-border-subtle" />
        </div>

        <button
          id="google-register-btn"
          onClick={handleGoogle}
          disabled={loading}
          className="btn-google w-full"
        >
          <svg width="20" height="20" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          Regístrate con Google
        </button>

        <p className="text-text-muted text-sm text-center">
          ¿Ya tienes cuenta?{' '}
          <Link to="/login" className="text-accent-cyan font-bold hover:underline">
            Iniciar sesión
          </Link>
        </p>
      </div>
    </div>
  );
}

function getFriendlyError(code) {
  const map = {
    'auth/email-already-in-use': 'Ya existe una cuenta con ese email',
    'auth/invalid-email': 'Email inválido',
    'auth/weak-password': 'Contraseña muy débil (mínimo 6 caracteres)',
  };
  return map[code] || 'Error al crear la cuenta';
}
