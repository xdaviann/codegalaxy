// src/components/learn/ModuleHeader.jsx
import { getModuleProgress } from '../../data/curriculum';
import { useAuth } from '../../hooks/useAuth';
import ModuleIcon from '../ui/ModuleIcon';

export default function ModuleHeader({ module }) {
  const { progress } = useAuth();
  const pct = getModuleProgress(module.id, progress);

  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (pct / 100) * circumference;

  return (
    <div className="mx-4 my-6">
      <div
        className="rounded-2xl p-4 flex items-center justify-between border"
        style={{
          background: `linear-gradient(135deg, ${module.color}22, ${module.color}11)`,
          borderColor: `${module.color}44`,
        }}
      >
        <div className="flex items-center gap-3">
          {/* Language icon */}
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: `${module.color}22` }}
          >
            <ModuleIcon
              language={module.language}
              size={24}
              color={module.color}
            />
          </div>
          <div>
            <p className="text-text-muted text-xs font-semibold uppercase tracking-wider mb-0.5">
              {module.language}
            </p>
            <h2 className="text-text-primary text-lg font-bold leading-tight">
              {module.title}
            </h2>
          </div>
        </div>

        {/* Circular Progress */}
        <div className="relative flex items-center justify-center w-14 h-14">
          <svg width="56" height="56" viewBox="0 0 56 56" className="-rotate-90">
            <circle
              cx="28"
              cy="28"
              r={radius}
              fill="none"
              stroke="#2e3347"
              strokeWidth="5"
            />
            <circle
              cx="28"
              cy="28"
              r={radius}
              fill="none"
              stroke={module.color}
              strokeWidth="5"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              style={{ transition: 'stroke-dashoffset 0.8s ease' }}
            />
          </svg>
          <span className="absolute text-text-primary text-xs font-bold">{pct}%</span>
        </div>
      </div>
    </div>
  );
}
