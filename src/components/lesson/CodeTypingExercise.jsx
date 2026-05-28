import { useState, useEffect } from 'react';

export default function CodeTypingExercise({ exercise, onAnswer }) {
  const [code, setCode] = useState(exercise.startingCode || '');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    setCode(exercise.startingCode || '');
    setSubmitted(false);
  }, [exercise]);

  const validateCode = (userCode) => {
    if (exercise.validationRegex) {
      return new RegExp(exercise.validationRegex, 'i').test(userCode);
    }
    
    if (exercise.expectedAnswers) {
      const normalize = (str) => str.trim().replace(/\s+/g, ' ').toLowerCase();
      const normUser = normalize(userCode);
      return exercise.expectedAnswers.some((ans) => normalize(ans) === normUser);
    }
    
    return false;
  };

  const handleCheck = () => {
    if (code.trim() === '' || submitted) return;
    setSubmitted(true);
    
    const isCorrect = validateCode(code);
    
    const explanation = isCorrect
      ? (exercise.explanationCorrect || exercise.explanation || '¡Excelente! Escribiste el código correctamente.')
      : (exercise.explanationIncorrect || exercise.explanation || 'El código no es exactamente lo que se pedía. Revisa la sintaxis y los caracteres.');

    setTimeout(() => {
      onAnswer({ isCorrect, explanation });
      if (!isCorrect) {
        setTimeout(() => {
          setSubmitted(false);
        }, 1000);
      }
    }, 1200);
  };

  return (
    <div className="flex flex-col gap-4 animate-fade-in-up pt-2 h-full">
      {/* Instruction */}
      <div className="card p-5 shadow-card-md">
        <p className="text-text-primary text-base font-semibold leading-relaxed">
          {exercise.instruction || exercise.question}
        </p>
      </div>

      {/* Code Editor Area */}
      <div className="flex-1 flex flex-col rounded-2xl overflow-hidden border-2 border-border-subtle bg-[#1e1e2e] shadow-inner relative">
        <div className="bg-[#181825] px-4 py-2 border-b border-white/5 flex items-center justify-between">
          <span className="text-xs font-mono text-white/50 uppercase tracking-widest">
            {exercise.language || 'Editor de código'}
          </span>
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-accent-red/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-accent-yellow/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-accent-green/80" />
          </div>
        </div>
        
        <textarea
          value={code}
          onChange={(e) => {
            // Some mobile keyboards insert a literal "\n" string instead of a newline character
            let val = e.target.value;
            if (val.includes('\\n')) {
              val = val.replace(/\\n/g, '\n');
            }
            setCode(val);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              const start = e.target.selectionStart;
              const end = e.target.selectionEnd;
              setCode(code.substring(0, start) + '\n' + code.substring(end));
              setTimeout(() => {
                e.target.selectionStart = e.target.selectionEnd = start + 1;
              }, 0);
            }
          }}
          disabled={submitted}
          placeholder="Escribe tu código aquí..."
          spellCheck="false"
          autoCapitalize="none"
          autoComplete="off"
          autoCorrect="off"
          className="flex-1 w-full p-4 bg-transparent text-[#c0caf5] font-mono text-sm leading-relaxed resize-none focus:outline-none focus:ring-0 placeholder:text-white/20 disabled:opacity-70 transition-opacity"
        />
      </div>

      {/* Check button */}
      <div className="mt-auto">
        <button
          onClick={handleCheck}
          disabled={code.trim() === '' || submitted}
          className={`w-full py-4 rounded-2xl font-bold text-sm tracking-wide transition-all duration-200 ${
            code.trim() !== '' && !submitted
              ? 'btn-primary'
              : 'bg-bg-tertiary text-text-muted cursor-not-allowed'
          }`}
        >
          {submitted ? 'Comprobando...' : 'Comprobar'}
        </button>
      </div>
    </div>
  );
}
