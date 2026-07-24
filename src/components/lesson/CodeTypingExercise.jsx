import { useState, useEffect, useRef } from 'react';
import QuickSymbolKeyboard from './QuickSymbolKeyboard';
import { evaluateCodeWithAI } from '../../services/aiService';

export default function CodeTypingExercise({ exercise, onAnswer }) {
  const [code, setCode] = useState(exercise.startingCode || '');
  const [submitted, setSubmitted] = useState(false);
  const [evaluating, setEvaluating] = useState(false);
  const textareaRef = useRef(null);

  const insertSymbol = (symbol) => {
    if (submitted || evaluating) return;
    const textarea = textareaRef.current;
    if (!textarea) return;
    
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    
    setCode(prev => prev.substring(0, start) + symbol + prev.substring(end));
    
    setTimeout(() => {
      textarea.focus();
      textarea.selectionStart = textarea.selectionEnd = start + symbol.length;
    }, 0);
  };

  useEffect(() => {
    setCode(exercise.startingCode || '');
    setSubmitted(false);
    setEvaluating(false);
  }, [exercise]);

  const validateCode = (userCode) => {
    const trimmed = userCode.trim();
    if (exercise.validationRegex) {
      return new RegExp(exercise.validationRegex, 'i').test(trimmed);
    }
    
    if (exercise.expectedAnswers) {
      const normalize = (str) => str.trim().replace(/\s+/g, ' ').toLowerCase();
      const normUser = normalize(trimmed);
      return exercise.expectedAnswers.some((ans) => normalize(ans) === normUser);
    }
    
    return false;
  };

  const handleCheck = async () => {
    if (code.trim() === '' || submitted || evaluating) return;
    setEvaluating(true);
    
    let isCorrect = validateCode(code);
    let explanation = isCorrect
      ? (exercise.explanationCorrect || exercise.explanation || '¡Excelente! Escribiste el código correctamente.')
      : (exercise.explanationIncorrect || exercise.explanation || 'El código no es exactamente lo que se pedía. Revisa la sintaxis y los caracteres.');

    if (!isCorrect) {
      const aiEval = await evaluateCodeWithAI({
        instruction: exercise.instruction || exercise.question,
        expectedAnswers: exercise.expectedAnswers,
        validationRegex: exercise.validationRegex,
        userCode: code,
        language: exercise.language || 'HTML'
      });

      if (aiEval) {
        isCorrect = aiEval.isCorrect;
        explanation = aiEval.feedback;
      }
    }

    setSubmitted(true);
    setEvaluating(false);
    
    setTimeout(() => {
      onAnswer({ isCorrect, explanation, userAnswer: code });
    }, 300);
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
          ref={textareaRef}
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
        {!submitted && (
          <QuickSymbolKeyboard language={exercise.language || 'HTML'} onInsert={insertSymbol} />
        )}
      </div>

      {/* Check button */}
      <div className="mt-auto">
        <button
          onClick={handleCheck}
          disabled={code.trim() === '' || submitted || evaluating}
          className={`w-full py-4 rounded-2xl font-bold text-sm tracking-wide transition-all duration-200 ${
            code.trim() !== '' && !submitted && !evaluating
              ? 'btn-primary'
              : 'bg-bg-tertiary text-text-muted cursor-not-allowed'
          }`}
        >
          {evaluating ? 'Evaluando con IA...' : submitted ? 'Comprobando...' : 'Comprobar'}
        </button>
      </div>
    </div>
  );
}
