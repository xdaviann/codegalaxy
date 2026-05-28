// src/components/lesson/WordBankExercise.jsx
// Renders a CODE BLOCK with blank slots — user fills them from a word bank
import { useState } from 'react';
import { RotateCcw, Terminal } from 'lucide-react';

export default function WordBankExercise({ exercise, onAnswer }) {
  const blankCount = exercise.answers.length;
  const [filled,    setFilled]    = useState(Array(blankCount).fill(null));
  const [usedIdxs,  setUsedIdxs]  = useState([]);
  const [submitted, setSubmitted] = useState(false);

  // Index of next unfilled blank (left to right)
  const nextEmpty = filled.findIndex(f => f === null);

  const handleWordClick = (word, bankIdx) => {
    if (submitted || usedIdxs.includes(bankIdx) || nextEmpty === -1) return;
    const newFilled = [...filled];
    newFilled[nextEmpty] = word;
    setFilled(newFilled);
    setUsedIdxs(prev => [...prev, bankIdx]);
  };

  const handleRemoveLast = () => {
    if (submitted) return;
    // find last filled blank
    let lastFilled = -1;
    for (let i = filled.length - 1; i >= 0; i--) {
      if (filled[i] !== null) { lastFilled = i; break; }
    }
    if (lastFilled === -1) return;
    const word = filled[lastFilled];
    const newFilled = [...filled];
    newFilled[lastFilled] = null;
    setFilled(newFilled);
    // Remove the last bank word used that matches
    setUsedIdxs(prev => {
      const copy = [...prev];
      const ri = copy.map(i => exercise.words[i]).lastIndexOf(word);
      if (ri !== -1) copy.splice(ri, 1);
      return copy;
    });
  };

  const handleCheck = () => {
    if (filled.includes(null) || submitted) return;
    setSubmitted(true);
    const isCorrect = filled.every((w, i) => w?.trim() === exercise.answers[i]?.trim());
    setTimeout(() => {
      onAnswer({
        isCorrect,
        explanation: isCorrect
          ? (exercise.explanationCorrect || exercise.explanation || '¡Código correcto!')
          : (exercise.explanationIncorrect || exercise.explanation || `Respuesta correcta: ${exercise.answers.join(', ')}`),
      });
      if (!isCorrect) {
        setTimeout(() => {
          setFilled(Array(blankCount).fill(null));
          setUsedIdxs([]);
          setSubmitted(false);
        }, 1000);
      }
    }, 1600);
  };

  // ── Render code parts with inline blank slots ─────────────────────
  let blankIdx = 0;
  const renderCodeParts = () => {
    return exercise.parts.map((part, i) => {
      if (part === '___') {
        const bi = blankIdx++;
        const word = filled[bi];
        const isCorrectSlot = submitted && word === exercise.answers[bi];
        const isWrongSlot   = submitted && word !== exercise.answers[bi];
        const isNext        = !submitted && bi === nextEmpty;

        return (
          <button
            key={`blank-${bi}`}
            onClick={() => {
              if (!submitted && word !== null) handleRemoveLast();
            }}
            className={`inline-flex items-center justify-center mx-0.5 px-2 py-0.5 rounded-md min-w-[52px] font-mono text-xs font-bold transition-all duration-200 border-2 ${
              word
                ? submitted
                  ? isCorrectSlot
                    ? 'bg-accent-green text-white border-accent-green'
                    : 'bg-accent-red text-white border-accent-red animate-shake'
                  : 'bg-accent text-white border-accent/0 shadow-accent-sm cursor-pointer active:scale-95'
                : isNext
                ? 'border-dashed border-accent/60 bg-accent/10 text-accent/70 animate-pulse-soft'
                : 'border-dashed border-white/25 bg-white/5 text-white/30'
            }`}
          >
            {word ?? '\u00a0\u00a0\u00a0\u00a0'}
          </button>
        );
      }

      // Regular code — preserve line breaks
      const lines = part.split('\n');
      return lines.map((line, li) => (
        <span key={`part-${i}-${li}`}>
          {li > 0 && <br />}
          <span className="text-[#c0caf5]">{line}</span>
        </span>
      ));
    });
  };

  return (
    <div className="flex flex-col gap-4 animate-fade-in-up pt-2">
      {/* Instruction */}
      <div className="card p-4 shadow-card-md flex items-start gap-3">
        <div className="w-9 h-9 rounded-xl bg-accent-light flex items-center justify-center flex-shrink-0">
          <Terminal size={18} className="text-accent" />
        </div>
        <p className="text-text-primary font-semibold text-sm pt-1">
          {exercise.instruction || 'Completa el código con las palabras del banco'}
        </p>
      </div>

      {/* Code block with inline blanks */}
      <div className="rounded-2xl overflow-hidden border border-border shadow-card bg-[#1e1e2e]">
        {/* Title bar */}
        <div className="flex items-center gap-1.5 px-4 py-2.5 bg-[#16161e] border-b border-white/10">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
          <span className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
          <span className="text-white/40 text-xs font-mono ml-2">
            {exercise.filename || 'index.html'}
          </span>
          {/* Reset button */}
          <button
            onClick={handleRemoveLast}
            disabled={submitted || filled.every(f => f === null)}
            className="ml-auto text-white/30 hover:text-white/60 transition-colors disabled:opacity-0"
          >
            <RotateCcw size={12} />
          </button>
        </div>

        {/* Code content */}
        <div className="px-4 py-4 font-mono text-xs leading-relaxed overflow-x-auto">
          <code className="inline">
            {renderCodeParts()}
          </code>
        </div>
      </div>

      {/* Word bank */}
      <div>
        <p className="text-text-muted text-xs font-semibold uppercase tracking-wide mb-2 flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-accent inline-block" />
          Banco de código
        </p>
        <div className="flex flex-wrap gap-2">
          {exercise.words.map((word, idx) => {
            const used = usedIdxs.includes(idx);
            return (
              <button
                key={idx}
                onClick={() => handleWordClick(word, idx)}
                disabled={used || submitted}
                className={`px-3 py-1.5 rounded-xl font-mono text-xs font-semibold transition-all duration-200 active:scale-95 border-2 ${
                  used
                    ? 'border-transparent bg-bg-tertiary text-transparent cursor-not-allowed select-none'
                    : 'border-accent/30 bg-accent-light text-accent hover:bg-accent/15 hover:border-accent hover:shadow-accent-sm'
                }`}
              >
                {word}
              </button>
            );
          })}
        </div>
      </div>

      {/* Check button */}
      <button
        onClick={handleCheck}
        disabled={filled.includes(null) || submitted}
        className={`w-full py-4 rounded-2xl font-bold text-sm transition-all duration-200 ${
          !filled.includes(null) && !submitted
            ? 'btn-primary'
            : 'bg-gray-100 text-gray-400 border-2 border-gray-200 cursor-not-allowed'
        }`}
      >
        {submitted ? 'Comprobando...' : 'Comprobar'}
      </button>
    </div>
  );
}
