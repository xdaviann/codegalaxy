// src/components/layout/BottomNav.jsx
import { useNavigate, useLocation } from 'react-router-dom';
import { BookOpen, User, Trophy } from 'lucide-react';

const navItems = [
  { id: 'learn',        label: 'Aprender', icon: BookOpen, path: '/learn' },
  { id: 'leaderboard', label: 'Ranking',   icon: Trophy,   path: '/leaderboard' },
  { id: 'profile',     label: 'Perfil',    icon: User,     path: '/profile' },
];

export default function BottomNav() {
  const navigate  = useNavigate();
  const location  = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-border safe-bottom shadow-[0_-1px_0_#e5e7eb]">
      <div className="flex items-center justify-around py-1 max-w-lg mx-auto">
        {navItems.map(({ id, label, icon: Icon, path }) => {
          const isActive = location.pathname === path;
          return (
            <button
              key={id}
              id={`nav-${id}`}
              onClick={() => navigate(path)}
              className="relative flex flex-col items-center gap-0.5 py-2 px-6 rounded-xl transition-all duration-200 group"
            >
              {/* Active pill indicator */}
              {isActive && (
                <span className="absolute top-1 left-1/2 -translate-x-1/2 w-8 h-1 rounded-full bg-accent animate-pop" />
              )}
              <Icon
                size={22}
                strokeWidth={isActive ? 2.5 : 1.8}
                className={`transition-all duration-200 ${
                  isActive ? 'text-accent' : 'text-text-muted group-hover:text-text-secondary'
                }`}
              />
              <span className={`text-[11px] font-semibold transition-colors duration-200 ${
                isActive ? 'text-accent' : 'text-text-muted group-hover:text-text-secondary'
              }`}>
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
