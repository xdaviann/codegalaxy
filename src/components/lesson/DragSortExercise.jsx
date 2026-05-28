// src/components/lesson/DragSortExercise.jsx
// Touch-friendly: tap item to SELECT it (blue glow), tap another to SWAP positions
import { useState } from 'react';
import { GripVertical, CheckCircle2 } from 'lucide-react';

export default function DragSortExercise({ exercise, onAnswer }) {
  const [items,     setItems]     = useState(() => [...exercise.items]);
  const [selected,  setSelected]  = useState(null); // index currently picked
  const [submitted, setSubmitted] = useState(false);
  const [result,    setResult]    = useState(null);  // null | true | false

  const handleTap = (idx) => {
    if (submitted) return;

    if (selected === null) {
      // Pick up this item
      setSelected(idx);
    } else if (selected === idx) {
      // Tap same → deselect
      setSelected(null);
    } else {
      // Swap selected ↔ tapped
      const newItems = [...items];
      [newItems[selected], newItems[idx]] = [newItems[idx], newItems[selected]];
      setItems(newItems);
      setSelected(null);
    }
  };

  const handleCheck = () => {
    if (submitted) return;
    setSubmitted(true);
    const isCorrect = items.every((item, i) => item === exercise.correctOrder[i]);
    setResult(isCorrect);
    setTimeout(() => {
      onAnswer({
        isCorrect,
        explanation: isCorrect
          ? (exercise.explanationCorrect || exercise.explanation || '¡Orden perfecto!')
          : (exercise.explanationIncorrect || exercise.explanation || `El orden correcto era: ${exercise.correctOrder.join(' → ')}`),
      });
      if (!isCorrect) {
        setTimeout(() => {
          setItems([...exercise.items]);
          setSelected(null);
          setSubmitted(false);
          setResult(null);
        }, 1000);
      }
    }, 1600);
  };

  const getItemStyle = (idx) => {
    if (submitted) {
      const isCorrect = items[idx] === exercise.correctOrder[idx];
      return isCorrect
        ? 'bg-accent-green-light border-accent-green text-accent-green'
        : 'bg-accent-red-light border-accent-red text-accent-red';
    }
    if (selected === idx) return 'bg-accent-light border-accent text-accent shadow-accent-sm scale-[1.02]';
    return 'bg-white border-border text-text-primary hover:border-accent/40 hover:bg-bg-tertiary';
  };

  return (
    <div className="flex flex-col gap-4 animate-fade-in-up pt-2">
      {/* Prompt */}
      <div className="card p-4 shadow-card-md">
        <p className="text-text-primary font-semibold text-sm">{exercise.prompt}</p>
        <p className="text-text-muted text-xs mt-1">
          {selected !== null
            ? 'Ahora toca dónde quieres colocar el elemento'
            : 'Toca un elemento para seleccionarlo, luego toca otro para intercambiar'}
        </p>
      </div>

      {/* Items */}
      <div className="flex flex-col gap-2">
        {items.map((item, idx) => (
          <button
            key={`${item}-${idx}`}
            onClick={() => handleTap(idx)}
            disabled={submitted}
            className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl border-2 text-left font-semibold text-sm transition-all duration-200 active:scale-[0.98] ${getItemStyle(idx)}`}
          >
            {/* Position number */}
            <span className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0 ${
              selected === idx ? 'bg-accent text-white' : 'bg-bg-tertiary text-text-muted'
            }`}>
              {idx + 1}
            </span>

            {/* Content */}
            <span className="flex-1 font-mono text-xs leading-relaxed">{item}</span>

            {/* Right side */}
            {submitted && items[idx] === exercise.correctOrder[idx] && (
              <CheckCircle2 size={16} className="flex-shrink-0 text-accent-green" />
            )}
            {!submitted && (
              <GripVertical size={16} className={`flex-shrink-0 ${selected === idx ? 'text-accent' : 'text-text-muted'}`} />
            )}
          </button>
        ))}
      </div>

      {/* Selected hint */}
      {selected !== null && (
        <div className="text-center animate-fade-in">
          <span className="inline-block bg-accent-light text-accent text-xs font-bold px-3 py-1.5 rounded-full">
            ✦ Seleccionado: <span className="font-mono">{items[selected]}</span>
          </span>
        </div>
      )}

      {/* Result summary after submit */}
      {submitted && result !== null && (
        <div className={`rounded-2xl px-4 py-3 animate-fade-in text-sm font-medium ${
          result ? 'bg-accent-green-light text-accent-green' : 'bg-accent-red-light text-accent-red'
        }`}>
          {result
            ? '¡Orden correcto! 🎉'
            : `Orden correcto: ${exercise.correctOrder.join(' → ')}`}
        </div>
      )}

      {/* Check button */}
      <button
        onClick={handleCheck}
        disabled={submitted}
        className="w-full py-4 rounded-2xl font-bold text-sm transition-all duration-200 btn-primary disabled:opacity-40 disabled:cursor-not-allowed"
      >
        {submitted ? 'Comprobando...' : 'Comprobar orden'}
      </button>
    </div>
  );
}
