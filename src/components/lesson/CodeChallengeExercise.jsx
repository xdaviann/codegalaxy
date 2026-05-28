import { useMemo, useState, useRef } from "react";
import { Code2, Play } from "lucide-react";
import SpecialCharKeyboard from "./SpecialCharKeyboard";

function normalizeCode(value) {
  return (value || "").toLowerCase().replace(/\s+/g, " ").trim();
}

export default function CodeChallengeExercise({ exercise, onAnswer }) {
  const textareaRef = useRef(null);
  const [code, setCode] = useState(exercise.starterCode || "");
  const [localError, setLocalError] = useState("");

  const requiredSnippets = useMemo(
    () => exercise.requiredSnippets || [],
    [exercise.requiredSnippets],
  );
  const forbiddenSnippets = useMemo(
    () => exercise.forbiddenSnippets || [],
    [exercise.forbiddenSnippets],
  );

  const validateCode = () => {
    const normalizedUserCode = normalizeCode(code);

    if (!normalizedUserCode) {
      return {
        isCorrect: false,
        explanation:
          "Debes escribir codigo antes de enviar el desafio practico.",
      };
    }

    if (exercise.expectedCode) {
      const expected = normalizeCode(exercise.expectedCode);
      if (normalizedUserCode !== expected) {
        return {
          isCorrect: false,
          explanation:
            exercise.explanationIncorrect ||
            "Tu solucion aun no coincide con la estructura esperada.",
        };
      }
    }

    const missingSnippet = requiredSnippets.find(
      (snippet) => !normalizedUserCode.includes(normalizeCode(snippet)),
    );

    if (missingSnippet) {
      return {
        isCorrect: false,
        explanation:
          exercise.explanationIncorrect ||
          `Falta incluir una parte clave del codigo: ${missingSnippet}`,
      };
    }

    const hasForbiddenSnippet = forbiddenSnippets.find((snippet) =>
      normalizedUserCode.includes(normalizeCode(snippet)),
    );

    if (hasForbiddenSnippet) {
      return {
        isCorrect: false,
        explanation:
          exercise.explanationIncorrect ||
          `Tu codigo incluye algo no permitido para este desafio: ${hasForbiddenSnippet}`,
      };
    }

    return {
      isCorrect: true,
      explanation:
        exercise.explanationCorrect ||
        "Excelente. Superaste el desafio practico de este nivel.",
    };
  };

  const handleInsertChar = (char) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;

    const newCode =
      code.substring(0, start) + char + code.substring(end);
    setCode(newCode);

    // Move cursor after inserted char
    setTimeout(() => {
      textarea.selectionStart = textarea.selectionEnd = start + char.length;
      textarea.focus();
    }, 0);
  };

  const handleSubmit = () => {
    setLocalError("");

    const result = validateCode();

    if (!result.isCorrect) {
      setLocalError(result.explanation);
    }

    onAnswer({
      isCorrect: result.isCorrect,
      explanation: result.explanation,
      lockProgressOnWrong: true,
    });
  };

  return (
    <div className="flex flex-col gap-4 px-4 animate-fade-in">
      <div className="bg-bg-secondary rounded-2xl p-5 border border-border-subtle">
        <p className="text-text-primary text-base font-semibold font-mono mb-2">
          Desafio practico
        </p>
        <p className="text-text-secondary text-sm leading-relaxed font-mono">
          {exercise.instruction}
        </p>
      </div>

      <div className="bg-bg-secondary rounded-2xl border border-border-subtle overflow-hidden">
        <div className="flex items-center gap-2 px-4 py-2 bg-bg-tertiary border-b border-border-subtle">
          <Code2 size={14} className="text-accent-cyan" />
          <span className="text-text-secondary text-xs font-mono">
            desafio-practico
          </span>
        </div>

        <textarea
          ref={textareaRef}
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder={exercise.placeholder || "Escribe tu codigo aqui..."}
          className="w-full min-h-[220px] resize-y bg-bg-secondary text-text-primary font-mono text-sm p-4 outline-none"
          spellCheck={false}
        />

        <SpecialCharKeyboard onInsertChar={handleInsertChar} />
      </div>

      {localError && (
        <div className="rounded-xl border border-accent-red/40 bg-accent-red/10 px-3 py-2">
          <p className="text-accent-red text-sm font-mono">{localError}</p>
        </div>
      )}

      <button
        type="button"
        onClick={handleSubmit}
        className="w-full py-3.5 rounded-2xl bg-accent-cyan text-bg-primary font-bold flex items-center justify-center gap-2 active:scale-95 transition-transform"
      >
        <Play size={18} className="fill-bg-primary" />
        Validar desafio
      </button>
    </div>
  );
}
