// src/components/layout/Sidebar.jsx
import { useNavigate, useLocation } from 'react-router-dom';
import { BookOpen, User, Trophy, LogOut, ShoppingBag } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

const navItems = [
  { id: 'learn',       label: 'Aprender', icon: BookOpen, path: '/learn' },
  { id: 'leaderboard', label: 'Ranking',  icon: Trophy,   path: '/leaderboard' },
  { id: 'shop',        label: 'Tienda',   icon: ShoppingBag, path: '/shop' },
  { id: 'profile',     label: 'Perfil',   icon: User,     path: '/profile' },
];

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <aside className="hidden md:flex flex-col w-[256px] border-r border-border bg-bg-primary h-dvh sticky top-0 shrink-0">
      <div className="p-6 pb-8">
        {/* Logo */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/learn')}>
          <div className="w-10 h-10 rounded-xl bg-gradient-accent flex items-center justify-center shadow-accent-sm">
            <span className="text-white font-extrabold text-lg">C</span>
          </div>
          <span className="font-extrabold text-text-primary text-2xl tracking-tight">Cody</span>
        </div>
      </div>

      <nav className="flex-1 px-4 flex flex-col gap-2">
        {navItems.map(({ id, label, icon: Icon, path }) => {
          const isActive = location.pathname === path;
          return (
            <button
              key={id}
              onClick={() => navigate(path)}
              className={`flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-200 group ${
                isActive 
                  ? 'bg-accent/10 text-accent font-bold border border-accent/20' 
                  : 'text-text-secondary hover:bg-bg-tertiary font-semibold border border-transparent'
              }`}
            >
              <Icon
                size={24}
                strokeWidth={isActive ? 2.5 : 2}
                className={isActive ? 'text-accent' : 'text-text-muted group-hover:text-text-secondary'}
              />
              <span className="text-[15px] uppercase tracking-wide">
                {label}
              </span>
            </button>
          );
        })}
      </nav>

      <div className="p-4">
        <button
          onClick={handleLogout}
          className="flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-200 group text-text-secondary hover:bg-red-50 hover:text-accent-red font-semibold border border-transparent w-full"
        >
          <LogOut size={24} className="text-text-muted group-hover:text-accent-red" />
          <span className="text-[15px] uppercase tracking-wide">Salir</span>
        </button>
      </div>
    </aside>
  );
}
