import { useState } from "react";
import { RotateCcw, Delete, Play } from "lucide-react";

export default function SequenceExercise({ exercise, onAnswer }) {
  const items = exercise.items || [];
  const correctOrder = exercise.correctOrder || [];

  const [picked, setPicked] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);

  const handlePick = (itemIdx) => {
    if (submitted) return;
    if (picked.includes(itemIdx)) return;
    setPicked((prev) => [...prev, itemIdx]);
  };

  const handleReset = () => {
    setPicked([]);
    setSubmitted(false);
    setIsCorrect(null);
  };

  const handleDelete = () => {
    if (submitted || picked.length === 0) return;
    setPicked((prev) => prev.slice(0, -1));
  };

  const handleSubmit = () => {
    if (picked.length !== items.length) return;

    const selectedOrder = picked.map((idx) => items[idx]);
    const correct = selectedOrder.every((item, i) => item === correctOrder[i]);

    setIsCorrect(correct);
    setSubmitted(true);

    const explanation = correct
      ? exercise.explanationCorrect ||
        "Buen trabajo. El orden que armaste coincide con la secuencia correcta."
      : exercise.explanationIncorrect ||
        `Orden correcto: ${correctOrder.join(" -> ")}.`;

    setTimeout(() => {
      onAnswer({ isCorrect: correct, explanation });
      if (!correct) {
        setTimeout(() => {
          handleReset();
        }, 1000);
      }
    }, 1400);
  };

  const selectedLabels = picked.map((idx) => items[idx]);

  return (
    <div className="flex flex-col gap-4 px-4 animate-fade-in">
      <div className="bg-bg-secondary rounded-2xl p-5 border border-border-subtle">
        <p className="text-text-primary text-base font-medium leading-relaxed font-mono">
          {exercise.prompt ||
            exercise.instruction ||
            "Ordena la secuencia correctamente"}
        </p>
      </div>

      <div className="bg-bg-secondary rounded-2xl p-4 border border-border-subtle">
        <p className="text-text-muted text-xs font-mono uppercase tracking-wider mb-3">
          Tu orden
        </p>
        <div className="flex flex-wrap gap-2 min-h-[40px]">
          {selectedLabels.map((label, i) => (
            <span
              key={`${label}-${i}`}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl border border-accent-cyan/40 bg-accent-cyan/10 text-accent-cyan text-sm font-semibold"
            >
              <span className="text-[11px] font-mono opacity-80">{i + 1}.</span>
              {label}
            </span>
          ))}

          {selectedLabels.length === 0 && (
            <span className="text-text-muted text-sm font-mono">
              Toca las opciones para construir la secuencia.
            </span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {items.map((item, idx) => {
          const used = picked.includes(idx);
          return (
            <button
              key={`${item}-${idx}`}
              type="button"
              onClick={() => handlePick(idx)}
              disabled={used || submitted}
              className={`w-full py-3.5 px-4 rounded-2xl border-2 text-left text-sm font-semibold transition-all duration-200
                ${
                  used
                    ? "bg-bg-tertiary border-border-subtle text-text-muted"
                    : "bg-bg-card border-border-subtle hover:border-accent-cyan hover:bg-bg-tertiary text-text-primary"
                }`}
            >
              {item}
            </button>
          );
        })}
      </div>

      <div className="flex items-center gap-2 pt-1">
        <button
          type="button"
          onClick={handleReset}
          className="p-2.5 rounded-xl border-2 bg-gray-100 border-gray-300 text-gray-600 hover:bg-gray-200 hover:border-gray-400 hover:text-gray-800 active:scale-95 transition-all duration-200"
        >
          <RotateCcw size={18} />
        </button>

        <button
          type="button"
          onClick={handleDelete}
          className="p-2.5 rounded-xl border-2 bg-gray-100 border-gray-300 text-gray-600 hover:bg-red-50 hover:border-red-300 hover:text-red-500 active:scale-95 transition-all duration-200"
        >
          <Delete size={18} />
        </button>

        <div className="flex-1" />

        <button
          type="button"
          onClick={handleSubmit}
          disabled={picked.length !== items.length || submitted}
          className={`p-2.5 rounded-xl border-2 transition-all duration-200
            ${
              picked.length === items.length && !submitted
                ? 'bg-indigo-600 border-indigo-500 text-white shadow-[0_0_16px_rgba(99,102,241,0.35)] active:scale-95 hover:bg-indigo-500'
                : 'bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed'
            }`}
        >
          <Play
            size={20}
            className={
              picked.length === items.length && !submitted
                ? 'fill-white'
                : ''
            }
          />
        </button>
      </div>

      {submitted && isCorrect !== null && (
        <div
          className={`rounded-2xl border p-4 ${
            isCorrect
              ? "bg-accent-green/10 border-accent-green/50"
              : "bg-accent-red/10 border-accent-red/50"
          }`}
        >
          <p className="text-text-primary text-sm font-mono">
            {isCorrect ? "Secuencia correcta." : "Secuencia incorrecta."}
          </p>
        </div>
      )}
    </div>
  );
}
