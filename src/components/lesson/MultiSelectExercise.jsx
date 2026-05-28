import { useMemo, useState } from "react";
import { CheckCircle, XCircle } from "lucide-react";

export default function MultiSelectExercise({ exercise, onAnswer }) {
  const [selected, setSelected] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  const correctAnswers = useMemo(() => {
    if (Array.isArray(exercise.correctAnswers)) return exercise.correctAnswers;
    return [];
  }, [exercise.correctAnswers]);

  const isSelected = (idx) => selected.includes(idx);

  const toggleOption = (idx) => {
    if (submitted) return;
    setSelected((prev) =>
      prev.includes(idx) ? prev.filter((x) => x !== idx) : [...prev, idx],
    );
  };

  const buildExplanation = (isCorrect) => {
    if (isCorrect) {
      return (
        exercise.explanationCorrect ||
        exercise.explanation ||
        "Excelente. Identificaste correctamente todas las opciones validas."
      );
    }

    const correctLabels = correctAnswers
      .map((idx) => exercise.options?.[idx])
      .filter(Boolean)
      .join(", ");

    return (
      exercise.explanationIncorrect ||
      exercise.explanation ||
      `Las opciones correctas eran: ${correctLabels}.`
    );
  };

  const handleSubmit = () => {
    if (submitted || selected.length === 0) return;

    const sortedSelected = [...selected].sort((a, b) => a - b);
    const sortedCorrect = [...correctAnswers].sort((a, b) => a - b);

    const isCorrect =
      sortedSelected.length === sortedCorrect.length &&
      sortedSelected.every((value, index) => value === sortedCorrect[index]);

    const explanation = buildExplanation(isCorrect);

    setSubmitted(true);

    setTimeout(() => {
      onAnswer({ isCorrect, explanation });
      if (!isCorrect) {
        setTimeout(() => {
          setSelected([]);
          setSubmitted(false);
        }, 1000);
      }
    }, 1200);
  };

  const getOptionStyle = (idx) => {
    const chosen = isSelected(idx);

    if (!submitted) {
      return chosen
        ? "bg-accent-cyan/15 border-accent-cyan text-text-primary"
        : "bg-bg-tertiary border-border-subtle hover:border-accent-cyan hover:bg-bg-card text-text-primary";
    }

    const isCorrectOption = correctAnswers.includes(idx);

    if (isCorrectOption) {
      return "bg-accent-green/20 border-accent-green text-accent-green";
    }

    if (chosen && !isCorrectOption) {
      return "bg-accent-red/20 border-accent-red text-accent-red";
    }

    return "bg-bg-tertiary border-border-subtle text-text-muted";
  };

  return (
    <div className="flex flex-col gap-4 px-4 animate-fade-in">
      <div className="bg-bg-secondary rounded-2xl p-5 border border-border-subtle">
        <p className="text-text-primary text-base font-medium leading-relaxed font-mono">
          {exercise.prompt ||
            exercise.question ||
            "Selecciona todas las opciones correctas"}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {exercise.options.map((option, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => toggleOption(idx)}
            disabled={submitted}
            className={`w-full py-4 px-5 rounded-2xl border-2 text-left font-semibold text-sm transition-all duration-200 ${getOptionStyle(idx)}`}
          >
            <div className="flex items-center justify-between gap-3">
              <span>{option}</span>
              {submitted && correctAnswers.includes(idx) && (
                <CheckCircle size={18} className="text-accent-green" />
              )}
              {submitted &&
                isSelected(idx) &&
                !correctAnswers.includes(idx) && (
                  <XCircle size={18} className="text-accent-red" />
                )}
            </div>
          </button>
        ))}
      </div>

      <button
        type="button"
        onClick={handleSubmit}
        disabled={selected.length === 0 || submitted}
        className={`w-full py-3.5 rounded-2xl font-bold transition-all duration-200 ${
          selected.length > 0 && !submitted
            ? "bg-accent-cyan text-bg-primary shadow-cyan-glow active:scale-95"
            : "bg-bg-tertiary text-text-muted cursor-not-allowed"
        }`}
      >
        Comprobar
      </button>
    </div>
  );
}
