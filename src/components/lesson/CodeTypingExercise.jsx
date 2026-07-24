import { useState, useEffect } from 'react';
import CodeEditor from '../ui/CodeEditor';
import { evaluateCodeWithAI } from '../../services/aiService';

export default function CodeTypingExercise({ exercise, onAnswer }) {
  const [code, setCode] = useState(exercise.startingCode || '');
  const [submitted, setSubmitted] = useState(false);
  const [evaluating, setEvaluating] = useState(false);

  useEffect(() => {
    setCode(exercise.startingCode || '');
    setSubmitted(false);
    setEvaluating(false);
  }, [exercise]);

  const validateCode = (userCode) => {
    // Normalizar entrada del usuario para tolerar comillas simples, espacios extra y saltos de línea
    const normalize = (str) =>
      str
        .trim()
        .replace(/'/g, '"')               // comillas simples -> dobles
        .replace(/\s*=\s*/g, '=')          // eliminar espacios alrededor del signo igual (alt = 'foto' -> alt="foto")
        .replace(/\s+/g, ' ');             // múltiples espacios a uno solo

    const cleanUser = normalize(userCode);

    if (exercise.validationRegex) {
      const regex = new RegExp(exercise.validationRegex, 'i');
      if (regex.test(cleanUser) || regex.test(userCode.trim())) {
        return true;
      }
    }
    
    if (exercise.expectedAnswers) {
      const normUser = cleanUser.toLowerCase();
      return exercise.expectedAnswers.some((ans) => normalize(ans).toLowerCase() === normUser);
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

      {/* VS Code-style Smart Code Editor */}
      <div className="flex-1 flex flex-col">
        <CodeEditor
          value={code}
          onChange={setCode}
          language={exercise.language || 'HTML'}
          disabled={submitted || evaluating}
          placeholder="Escribe tu código aquí..."
          minHeight="220px"
        />
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
