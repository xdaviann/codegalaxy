// src/components/lesson/MultipleChoiceExercise.jsx
import { useState } from 'react';
import { CheckCircle, XCircle } from 'lucide-react';

export default function MultipleChoiceExercise({ exercise, onAnswer }) {
  const [selected, setSelected] = useState(null);
  const [answered, setAnswered] = useState(false);

  const handleSelect = (idx) => {
    if (answered) return;
    setSelected(idx);
    setAnswered(true);
    const isCorrect = idx === exercise.correct;
    setTimeout(() => {
      onAnswer(isCorrect);
      setSelected(null);
      setAnswered(false);
    }, 1000);
  };

  const getOptionStyle = (idx) => {
    if (!answered || selected !== idx) {
      return 'bg-bg-tertiary border-border-subtle hover:border-accent-cyan hover:bg-bg-card text-text-primary';
    }
    if (idx === exercise.correct) {
      return 'bg-accent-green/20 border-accent-green text-accent-green';
    }
    return 'bg-accent-red/20 border-accent-red text-accent-red animate-shake';
  };

  return (
    <div className="flex flex-col gap-4 px-4 animate-fade-in">
      {/* Question */}
      <div className="bg-bg-secondary rounded-2xl p-5 border border-border-subtle">
        <p className="text-text-primary text-base font-medium leading-relaxed font-mono">
          {exercise.question}
        </p>
      </div>

      {/* Options */}
      <div className="grid grid-cols-1 gap-3">
        {exercise.options.map((option, idx) => (
          <button
            key={idx}
            id={`option-${idx}`}
            onClick={() => handleSelect(idx)}
            disabled={answered}
            className={`
              w-full py-4 px-5 rounded-2xl border-2 text-left font-semibold text-sm
              transition-all duration-200 active:scale-98
              ${getOptionStyle(idx)}
            `}
          >
            <div className="flex items-center justify-between">
              <span>{option}</span>
              {answered && selected === idx && (
                idx === exercise.correct
                  ? <CheckCircle size={20} className="text-accent-green" />
                  : <XCircle size={20} className="text-accent-red" />
              )}
              {answered && idx === exercise.correct && selected !== idx && (
                <CheckCircle size={20} className="text-accent-green" />
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
