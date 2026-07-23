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
        "Excelente. Identificaste correctamente todas las opciones válidas."
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

    const userChoiceStr = selected.map((i) => exercise.options?.[i]).filter(Boolean).join(', ');
    const correctChoiceStr = correctAnswers.map((i) => exercise.options?.[i]).filter(Boolean).join(', ');

    setTimeout(() => {
      onAnswer({
        isCorrect,
        explanation,
        userAnswer: userChoiceStr,
        correctAnswer: correctChoiceStr
      });
    }, 400);
  };

  const getOptionStyle = (idx) => {
    const chosen = isSelected(idx);

    if (!submitted) {
      return chosen
        ? "bg-accent-light border-accent text-accent shadow-accent-sm"
        : "bg-white border-border hover:border-accent/40 hover:bg-bg-tertiary text-text-primary";
    }

    const isCorrectOption = correctAnswers.includes(idx);

    if (isCorrectOption) {
      return "bg-accent-green-light border-accent-green text-accent-green";
    }

    if (chosen && !isCorrectOption) {
      return "bg-accent-red-light border-accent-red text-accent-red animate-shake";
    }

    return "bg-bg-tertiary border-border opacity-50 text-text-muted";
  };

  return (
    <div className="flex flex-col gap-4 animate-fade-in-up pt-2">
      <div className="card p-5 shadow-card-md">
        <p className="text-text-primary text-base font-semibold leading-relaxed">
          {exercise.prompt ||
            exercise.question ||
            "Selecciona todas las opciones correctas"}
        </p>
      </div>

      <div className="flex flex-col gap-2.5">
        {exercise.options.map((option, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => toggleOption(idx)}
            disabled={submitted}
            className={`w-full py-4 px-5 rounded-2xl border-2 text-left font-semibold text-sm transition-all duration-200 active:scale-[0.98] ${getOptionStyle(idx)}`}
          >
            <div className="flex items-center justify-between gap-3">
              <span className="leading-snug">{option}</span>
              {submitted && correctAnswers.includes(idx) && (
                <CheckCircle size={18} className="text-accent-green flex-shrink-0" />
              )}
              {submitted &&
                isSelected(idx) &&
                !correctAnswers.includes(idx) && (
                  <XCircle size={18} className="text-accent-red flex-shrink-0" />
                )}
            </div>
          </button>
        ))}
      </div>

      <button
        type="button"
        onClick={handleSubmit}
        disabled={selected.length === 0 || submitted}
        className={`w-full py-4 rounded-2xl font-bold text-sm tracking-wide transition-all duration-200 ${
          selected.length > 0 && !submitted
            ? "btn-primary"
            : "bg-bg-tertiary text-text-muted cursor-not-allowed"
        }`}
      >
        {submitted ? 'Comprobando...' : 'Comprobar'}
      </button>
    </div>
  );
}
