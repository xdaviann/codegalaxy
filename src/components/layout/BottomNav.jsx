// src/components/layout/BottomNav.jsx
import { useNavigate, useLocation } from 'react-router-dom';
import { BookOpen, User, Trophy } from 'lucide-react';

const navItems = [
  { id: 'learn', label: 'Aprender', icon: BookOpen, path: '/learn' },
  { id: 'leaderboard', label: 'Ranking', icon: Trophy, path: '/leaderboard' },
  { id: 'profile', label: 'Perfil', icon: User, path: '/profile' },
];

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-bg-primary border-t border-border-subtle safe-bottom">
      <div className="flex items-center justify-around py-2 max-w-lg mx-auto">
        {navItems.map(({ id, label, icon: Icon, path }) => {
          const isActive = location.pathname === path;
          return (
            <button
              key={id}
              id={`nav-${id}`}
              onClick={() => navigate(path)}
              className={`flex flex-col items-center gap-1 py-2 px-6 rounded-xl transition-all duration-200 ${
                isActive
                  ? 'text-accent-cyan'
                  : 'text-text-muted hover:text-text-secondary'
              }`}
            >
              <Icon
                size={24}
                strokeWidth={isActive ? 2.5 : 1.8}
                className={isActive ? 'stroke-accent-cyan' : ''}
              />
              <span className={`text-xs font-semibold ${isActive ? 'text-accent-cyan' : 'text-text-muted'}`}>
                {label}
              </span>
              {isActive && (
                <div className="absolute bottom-0 w-8 h-0.5 bg-accent-cyan rounded-full" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
