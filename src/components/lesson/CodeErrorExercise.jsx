// src/components/lesson/CodeErrorExercise.jsx
// User reads code and taps the line that contains the error
import { useState } from 'react';
import { Bug, CheckCircle2, XCircle, ChevronRight } from 'lucide-react';

export default function CodeErrorExercise({ exercise, onAnswer }) {
  const [selectedLine, setSelectedLine] = useState(null);
  const [submitted,    setSubmitted]    = useState(false);

  const handleLineClick = (idx) => {
    if (submitted) return;
    setSelectedLine(idx);
  };

  const handleCheck = () => {
    if (selectedLine === null || submitted) return;
    setSubmitted(true);
    const isCorrect = selectedLine === exercise.errorLineIndex;
    const userLineText = exercise.lines?.[selectedLine] || `Línea ${selectedLine + 1}`;
    const correctLineText = exercise.lines?.[exercise.errorLineIndex] || `Línea ${exercise.errorLineIndex + 1}`;

    setTimeout(() => {
      onAnswer({
        isCorrect,
        explanation: exercise.explanation || (isCorrect
          ? '¡Encontraste el error!'
          : `Elegiste la línea ${selectedLine + 1}: "${userLineText}". El error real estaba en la línea ${exercise.errorLineIndex + 1}: "${correctLineText}".`),
        userAnswer: `Línea ${selectedLine + 1}: "${userLineText}"`,
        correctAnswer: `Línea ${exercise.errorLineIndex + 1}: "${correctLineText}"`
      });
    }, 400);
  };

  const getLineStyle = (idx) => {
    if (!submitted) {
      if (selectedLine === idx) return 'bg-accent-light border-l-4 border-accent text-text-primary';
      return 'hover:bg-bg-tertiary text-text-secondary cursor-pointer border-l-4 border-transparent';
    }
    if (idx === exercise.errorLineIndex) return 'bg-accent-green-light border-l-4 border-accent-green text-accent-green';
    if (selectedLine === idx && idx !== exercise.errorLineIndex) return 'bg-accent-red-light border-l-4 border-accent-red text-accent-red animate-shake';
    return 'text-text-muted opacity-50 border-l-4 border-transparent';
  };

  return (
    <div className="flex flex-col gap-4 animate-fade-in-up pt-2">
      {/* Instruction */}
      <div className="card p-4 shadow-card-md flex items-start gap-3">
        <div className="w-9 h-9 rounded-xl bg-accent-red-light flex items-center justify-center flex-shrink-0">
          <Bug size={18} className="text-accent-red" />
        </div>
        <div>
          <p className="text-text-primary font-semibold text-sm">{exercise.instruction || '¿En qué línea está el error?'}</p>
          <p className="text-text-muted text-xs mt-0.5">Toca la línea que tiene el fallo</p>
        </div>
      </div>

      {/* Code block */}
      <div className="rounded-2xl overflow-hidden border border-border shadow-card bg-[#1e1e2e]">
        {/* Title bar */}
        <div className="flex items-center gap-1.5 px-4 py-2.5 bg-[#16161e] border-b border-white/10">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
          <span className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
          <span className="text-white/40 text-xs font-mono ml-2">{exercise.filename || 'index.html'}</span>
        </div>

        {/* Lines */}
        <div className="font-mono text-sm">
          {exercise.lines.map((line, idx) => (
            <button
              key={idx}
              onClick={() => handleLineClick(idx)}
              disabled={submitted}
              className={`w-full flex items-center gap-0 text-left transition-all duration-200 ${getLineStyle(idx)}`}
            >
              {/* Line number */}
              <span className="w-9 text-center text-white/20 text-xs py-2 flex-shrink-0 select-none">
                {idx + 1}
              </span>
              {/* Code */}
              <span className="flex-1 px-3 py-2 whitespace-pre font-mono text-xs">
                <span className={submitted && idx === exercise.errorLineIndex ? 'text-accent-green' : submitted && idx === selectedLine ? 'text-accent-red' : 'text-[#c0caf5]'}>
                  {line}
                </span>
              </span>
              {/* Indicator */}
              {submitted && idx === exercise.errorLineIndex && (
                <CheckCircle2 size={15} className="text-accent-green mr-3 flex-shrink-0" />
              )}
              {submitted && idx === selectedLine && idx !== exercise.errorLineIndex && (
                <XCircle size={15} className="text-accent-red mr-3 flex-shrink-0" />
              )}
              {!submitted && selectedLine === idx && (
                <ChevronRight size={15} className="text-accent mr-3 flex-shrink-0" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Explanation after submit */}
      {submitted && (
        <div className={`rounded-2xl px-4 py-3 animate-fade-in text-sm font-medium ${
          selectedLine === exercise.errorLineIndex
            ? 'bg-accent-green-light text-accent-green'
            : 'bg-accent-red-light text-accent-red'
        }`}>
          {exercise.explanation}
        </div>
      )}

      {/* Check button */}
      {!submitted && (
        <button
          onClick={handleCheck}
          disabled={selectedLine === null}
          className={`w-full py-4 rounded-2xl font-bold text-sm transition-all duration-200 ${
            selectedLine !== null ? 'btn-primary' : 'bg-bg-tertiary text-text-muted cursor-not-allowed'
          }`}
        >
          Comprobar
        </button>
      )}
    </div>
  );
}
