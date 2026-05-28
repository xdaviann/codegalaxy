// src/components/learn/LessonPreviewPanel.jsx
import { X, BookOpen, Code2, Layers, CheckCircle, Lock } from 'lucide-react';

export default function LessonPreviewPanel({ lesson, module, status, onClose, onStart }) {
  const rounds = lesson.rounds || [];

  const roundLabels = [
    { label: 'Aprendiendo', color: '#00d4ff', icon: BookOpen, desc: 'Aprende los conceptos con tarjetas teóricas interactivas.' },
    { label: 'Practicando', color: '#f39c12', icon: Code2, desc: 'Pon en práctica lo aprendido con ejercicios de código.' },
    { label: 'Dominando', color: module.color, icon: Layers, desc: 'Demuestra que dominas el tema con preguntas avanzadas.' },
  ];

  const isLocked = status === 'locked';
  const isCompleted = status === 'completed';

  // Collect topics from theory titles across all rounds
  const topics = rounds.flatMap(r =>
    (r.theory || []).map(t => t.title).filter(Boolean)
  );

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 z-40 animate-fade-in"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="fixed bottom-0 left-0 right-0 z-50 max-w-lg mx-auto animate-slide-up">
        <div className="bg-bg-secondary border-t-2 border-border-subtle rounded-t-3xl overflow-hidden shadow-2xl">
          {/* Header */}
          <div
            className="px-5 pt-5 pb-4 relative"
            style={{ background: `linear-gradient(135deg, ${module.color}20, transparent)` }}
          >
            {/* Drag handle */}
            <div className="w-10 h-1 rounded-full bg-border-subtle mx-auto mb-4" />

            <button
              onClick={onClose}
              className="absolute top-5 right-5 p-1.5 rounded-xl bg-bg-tertiary text-text-muted hover:text-text-primary transition-colors"
            >
              <X size={18} />
            </button>

            <div className="flex items-center gap-3 mb-1">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm"
                style={{ backgroundColor: `${module.color}25`, color: module.color }}
              >
                {module.language}
              </div>
              <div>
                <p className="text-text-muted text-xs font-mono uppercase tracking-wider">{module.title}</p>
                <h2 className="text-text-primary font-bold text-lg leading-tight">{lesson.title}</h2>
              </div>
            </div>

            {/* Status badge */}
            {isCompleted && (
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full bg-accent-green/20 text-accent-green mt-1">
                <CheckCircle size={12} /> Completada
              </span>
            )}
            {isLocked && (
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full bg-text-muted/20 text-text-muted mt-1">
                <Lock size={12} /> Bloqueada
              </span>
            )}
          </div>

          {/* Topics covered */}
          {topics.length > 0 && (
            <div className="px-5 pb-3">
              <p className="text-text-muted text-xs font-mono uppercase tracking-wider mb-2">Temas de esta lección</p>
              <div className="flex flex-wrap gap-1.5">
                {topics.map((t, i) => (
                  <span
                    key={i}
                    className="text-xs px-2.5 py-1 rounded-lg border font-medium"
                    style={{ borderColor: `${module.color}40`, color: module.color, backgroundColor: `${module.color}10` }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Rounds breakdown */}
          <div className="px-5 pb-4">
            <p className="text-text-muted text-xs font-mono uppercase tracking-wider mb-2">Estructura · {lesson.totalRounds ?? 3} rondas</p>
            <div className="flex flex-col gap-2">
              {roundLabels.map((r, i) => {
                const Icon = r.icon;
                return (
                  <div key={i} className="flex items-center gap-3 bg-bg-tertiary rounded-xl px-3 py-2.5">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: `${r.color}20` }}
                    >
                      <Icon size={15} style={{ color: r.color }} />
                    </div>
                    <div>
                      <p className="text-text-primary text-xs font-bold">{r.label}</p>
                      <p className="text-text-muted text-xs">{r.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* CTA */}
          <div className="px-5 pb-6">
            {isLocked ? (
              <div className="w-full py-4 rounded-2xl bg-bg-tertiary text-text-muted text-sm font-bold text-center flex items-center justify-center gap-2 cursor-not-allowed">
                <Lock size={16} /> Completa la lección anterior primero
              </div>
            ) : (
              <button
                onClick={onStart}
                className="w-full py-4 rounded-2xl font-bold text-sm tracking-wide transition-all duration-200 hover:scale-[1.02] active:scale-95"
                style={{ backgroundColor: module.color, color: '#0a0e1a', boxShadow: `0 0 20px ${module.color}60` }}
              >
                {isCompleted ? '¡Volver a jugar!' : '¡Empezar!'}
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
