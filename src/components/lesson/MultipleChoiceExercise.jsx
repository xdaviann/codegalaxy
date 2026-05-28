// src/components/lesson/MultipleChoiceExercise.jsx
import { useState } from 'react';
import { CheckCircle, XCircle } from 'lucide-react';

export default function MultipleChoiceExercise({ exercise, onAnswer }) {
  const [selected, setSelected] = useState(null);
  const [answered, setAnswered] = useState(false);

  const buildExplanation = (isCorrect) => {
    if (isCorrect) {
      return exercise.explanationCorrect || exercise.explanation || 'Correcto. Esta respuesta coincide con lo explicado en la teoría.';
    }
    const correctOption = exercise.options?.[exercise.correct];
    return exercise.explanationIncorrect || exercise.explanation || `La respuesta correcta era: ${correctOption}.`;
  };

  const handleSelect = (idx) => { if (!answered) setSelected(idx); };

  const handleCheck = () => {
    if (selected === null || answered) return;
    setAnswered(true);
    const isCorrect = selected === exercise.correct;
    setTimeout(() => {
      onAnswer({ isCorrect, explanation: buildExplanation(isCorrect) });
      if (!isCorrect) {
        setTimeout(() => {
          setSelected(null);
          setAnswered(false);
        }, 1000);
      }
    }, 1400);
  };

  const getOptionStyle = (idx) => {
    if (!answered) {
      if (selected === idx) return 'bg-accent-light border-accent text-accent shadow-accent-sm';
      return 'bg-white border-border hover:border-accent/40 hover:bg-bg-tertiary text-text-primary';
    }
    if (idx === exercise.correct) return 'bg-accent-green-light border-accent-green text-accent-green';
    if (selected === idx) return 'bg-accent-red-light border-accent-red text-accent-red animate-shake';
    return 'bg-bg-tertiary border-border opacity-50 text-text-muted';
  };

  return (
    <div className="flex flex-col gap-4 animate-fade-in-up pt-2">
      {/* Question */}
      <div className="card p-5 shadow-card-md">
        <p className="text-text-primary text-base font-semibold leading-relaxed">
          {exercise.question}
        </p>
      </div>

      {/* Options */}
      <div className="flex flex-col gap-2.5">
        {exercise.options.map((option, idx) => (
          <button
            key={idx}
            id={`option-${idx}`}
            onClick={() => handleSelect(idx)}
            disabled={answered}
            className={`w-full py-4 px-5 rounded-2xl border-2 text-left font-semibold text-sm transition-all duration-200 active:scale-[0.98] ${getOptionStyle(idx)}`}
          >
            <div className="flex items-center justify-between gap-3">
              <span className="leading-snug">{option}</span>
              {answered && selected === idx && (
                idx === exercise.correct
                  ? <CheckCircle size={18} className="text-accent-green flex-shrink-0" />
                  : <XCircle size={18} className="text-accent-red flex-shrink-0" />
              )}
              {answered && idx === exercise.correct && selected !== idx && (
                <CheckCircle size={18} className="text-accent-green flex-shrink-0" />
              )}
            </div>
          </button>
        ))}
      </div>

      {/* Check button */}
      <button
        onClick={handleCheck}
        disabled={selected === null || answered}
        className={`w-full py-4 rounded-2xl font-bold text-sm tracking-wide transition-all duration-200 ${
          selected !== null && !answered
            ? 'btn-primary'
            : 'bg-bg-tertiary text-text-muted cursor-not-allowed'
        }`}
      >
        {answered ? 'Comprobando...' : 'Comprobar'}
      </button>
    </div>
  );
}
