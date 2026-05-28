// src/components/learn/ModuleAccordion.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { ChevronDown, CheckCircle, Lock, PlayCircle, RotateCcw } from 'lucide-react';

export default function ModuleAccordion({ module, defaultOpen = false }) {
  const { progress, userData } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(defaultOpen);
  const noHearts = (userData?.hearts ?? 5) <= 0;

  // Lesson statuses
  let foundCurrent = false;
  const statuses = module.lessons.map(lesson => {
    if (progress[lesson.id]?.completed) return 'completed';
    if (!foundCurrent) { foundCurrent = true; return 'current'; }
    return 'locked';
  });

  const completedCount = statuses.filter(s => s === 'completed').length;
  const pct = Math.round((completedCount / module.lessons.length) * 100);

  const handleLessonClick = (lesson, status) => {
    if (status === 'locked') return;
    if (status === 'current' && noHearts) return;
    navigate(`/lesson/${lesson.id}`);
  };

  return (
    <div className={`rounded-3xl border overflow-hidden transition-all duration-300 ${
      open ? 'border-accent/25 shadow-card-md' : 'border-border shadow-card'
    } bg-white`}>

      {/* Header — always visible */}
      <button
        onClick={() => setOpen(v => !v)}
        className="w-full flex items-center gap-3 p-4 text-left transition-colors hover:bg-bg-tertiary/50"
      >
        {/* Module color dot */}
        <div
          className="w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0 transition-transform duration-200"
          style={{ backgroundColor: `${module.color}18` }}
        >
          <span className="font-bold text-sm" style={{ color: module.color }}>
            {module.language}
          </span>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <h3 className="font-bold text-text-primary text-sm truncate">{module.title}</h3>
            <span className="text-xs font-semibold ml-2 flex-shrink-0" style={{ color: module.color }}>
              {pct}%
            </span>
          </div>
          {/* Progress bar */}
          <div className="w-full h-2 bg-bg-tertiary rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-700 animate-progress-fill"
              style={{ width: `${pct}%`, backgroundColor: module.color }}
            />
          </div>
          <p className="text-text-muted text-xs mt-1">
            {completedCount} de {module.lessons.length} lecciones completadas
          </p>
        </div>

        <ChevronDown
          size={18}
          className={`text-text-muted flex-shrink-0 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Lesson list — animated expand */}
      <div
        className="overflow-hidden transition-all duration-350 ease-in-out"
        style={{ maxHeight: open ? `${module.lessons.length * 80 + 16}px` : '0px' }}
      >
        <div className="px-3 pb-3 flex flex-col gap-1.5">
          {module.lessons.map((lesson, i) => {
            const status = statuses[i];
            const roundsDone = progress[lesson.id]?.roundsCompleted ?? 0;
            const totalRounds = lesson.totalRounds ?? 3;

            return (
              <button
                key={lesson.id}
                onClick={() => handleLessonClick(lesson, status)}
                disabled={status === 'locked'}
                className={`w-full flex items-center gap-3 px-3 py-3 rounded-2xl text-left transition-all duration-200 animate-fade-in-up ${
                  status === 'completed'
                    ? 'bg-accent-green-light/60 hover:bg-accent-green-light active:scale-[0.98]'
                    : status === 'current'
                    ? 'bg-accent-light border border-accent/25 hover:bg-accent/10 active:scale-[0.98] shadow-accent-sm'
                    : 'bg-bg-tertiary/60 opacity-60 cursor-not-allowed'
                }`}
                style={{ animationDelay: `${i * 40}ms`, animationFillMode: 'both' }}
              >
                {/* Status icon */}
                <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{
                  backgroundColor: status === 'completed'
                    ? '#dcfce7'
                    : status === 'current'
                    ? `${module.color}18`
                    : '#f0f2f8',
                }}>
                  {status === 'completed' && <CheckCircle size={18} className="text-accent-green" />}
                  {status === 'current' && !noHearts && <PlayCircle size={18} style={{ color: module.color }} />}
                  {status === 'current' && noHearts && <Heart size={18} className="text-accent-red" />}
                  {status === 'locked' && <Lock size={16} className="text-text-muted" />}
                </div>

                {/* Lesson info */}
                <div className="flex-1 min-w-0">
                  <p className={`font-semibold text-sm truncate ${
                    status === 'locked' ? 'text-text-muted' : 'text-text-primary'
                  }`}>
                    {lesson.title}
                  </p>
                  {/* Round dots progress */}
                  {status !== 'locked' && lesson.type !== 'challenge' && (
                    <div className="flex items-center gap-1 mt-1">
                      {Array.from({ length: totalRounds }).map((_, ri) => (
                        <div
                          key={ri}
                          className="rounded-full transition-all duration-300"
                          style={{
                            width: ri < roundsDone ? 12 : 6,
                            height: 6,
                            backgroundColor: ri < roundsDone ? module.color : '#e5e7eb',
                          }}
                        />
                      ))}
                      {roundsDone > 0 && roundsDone < totalRounds && (
                        <span className="text-[10px] text-text-muted font-semibold ml-1">
                          Ronda {roundsDone + 1}
                        </span>
                      )}
                    </div>
                  )}
                </div>

                {/* Right label */}
                {status === 'current' && (
                  <span className="text-xs font-bold px-2 py-1 rounded-lg flex-shrink-0"
                    style={{ color: module.color, backgroundColor: `${module.color}15` }}>
                    {roundsDone > 0 && lesson.type !== 'challenge' ? 'Continuar' : '¡Empezar!'}
                  </span>
                )}
                {status === 'completed' && (
                  <RotateCcw size={14} className="text-accent-green flex-shrink-0 opacity-60" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
