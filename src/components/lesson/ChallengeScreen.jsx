import { useState, useEffect, useRef } from 'react';
import { X, CheckCircle2, Circle, Play, Trophy } from 'lucide-react';
import QuickSymbolKeyboard from './QuickSymbolKeyboard';
import { evaluateCodeWithAI } from '../../services/aiService';

export default function ChallengeScreen({ lesson, onClose, onComplete }) {
  const [code, setCode] = useState(lesson.startingCode || '');
  const [results, setResults] = useState([]);
  const [success, setSuccess] = useState(false);
  const [shakingIdxs, setShakingIdxs] = useState([]);
  const [evaluating, setEvaluating] = useState(false);
  const [aiFeedback, setAiFeedback] = useState(null);
  const textareaRef = useRef(null);

  const insertSymbol = (symbol) => {
    if (success) return;
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
  
  // Initialize results state based on validators
  useEffect(() => {
    if (lesson.validators) {
      setResults(lesson.validators.map(v => ({ passed: false, desc: v.description })));
    }
    setSuccess(false);
    setAiFeedback(null);
  }, [lesson]);

  const handleCheck = async () => {
    if (!lesson.validators || evaluating) return;
    setEvaluating(true);
    setAiFeedback(null);

    // Use DOMParser as our "Smart Compiler"
    const parser = new DOMParser();
    
    const isCSS = lesson.language === 'CSS';
    
    let doc;
    if (isCSS) {
      doc = parser.parseFromString(`<html><head><style>${code}</style></head><body>${lesson.dummyHtml || ''}</body></html>`, 'text/html');
    } else {
      doc = parser.parseFromString(code, 'text/html');
    }

    const newResults = lesson.validators.map(validator => {
      try {
        const passed = validator.test(doc, code);
        return { passed, desc: validator.description };
      } catch (err) {
        return { passed: false, desc: validator.description };
      }
    });

    setResults(newResults);
    
    const allPassed = newResults.every(r => r.passed);
    
    if (!allPassed) {
      setEvaluating(false);
      const failedIdxs = newResults.map((r, i) => r.passed ? null : i).filter(i => i !== null);
      setShakingIdxs(failedIdxs);
      setTimeout(() => setShakingIdxs([]), 800);
      import('../../utils/audio').then(({ playWrongSound }) => playWrongSound());
      return;
    }

    // All structural validators passed. Let's do a semantic check with AI.
    try {
      const aiEval = await evaluateCodeWithAI({
        instruction: lesson.instruction,
        expectedAnswers: null,
        validationRegex: "El estudiante debe haber escrito texto real dentro de las etiquetas, no etiquetas vacías.",
        userCode: code,
        language: lesson.language
      });

      if (aiEval && !aiEval.isCorrect) {
        setAiFeedback(aiEval.feedback);
        setEvaluating(false);
        import('../../utils/audio').then(({ playWrongSound }) => playWrongSound());
        return;
      }
    } catch (err) {
      console.error(err);
    }

    setEvaluating(false);
    setSuccess(true);
    import('../../utils/audio').then(({ playCorrectSound }) => playCorrectSound());
  };

  const handleFinish = () => {
    onComplete({
      xpEarned: lesson.xpReward || 150,
      coinsEarned: lesson.coins || 20
    });
  };

  return (
    <div className="min-h-dvh bg-bg-primary flex flex-col font-sans relative">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4 md:px-8 border-b border-border bg-white shadow-sm">
        <button onClick={onClose} className="p-2 -ml-2 text-gray-500 hover:text-gray-800 transition-colors">
          <X size={24} />
        </button>
        <div className="flex items-center gap-2 font-extrabold uppercase tracking-widest text-sm">
          <Trophy size={18} className="text-amber-500" />
          <span className="text-gray-800">Desafío</span>
        </div>
        <div className="w-8" /> {/* Spacer for centering */}
      </div>

      <div className="flex-1 flex flex-col lg:flex-row overflow-y-auto max-w-[1400px] mx-auto w-full p-4 lg:p-6 gap-6">
        
        {/* Left Column: Editor & Instructions */}
        <div className="flex-1 flex flex-col gap-4">
          <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-2">{lesson.title}</h2>
            <p className="text-gray-600 leading-relaxed">{lesson.instruction}</p>
          </div>

          <div className="flex-1 flex flex-col rounded-2xl overflow-hidden border-2 border-border-subtle bg-[#1e1e2e] shadow-inner relative min-h-[300px]">
            <div className="bg-[#181825] px-4 py-3 border-b border-white/5 flex items-center justify-between">
              <span className="text-xs font-mono text-white/50 uppercase tracking-widest">
                index.{lesson.language === 'CSS' ? 'css' : 'html'}
              </span>
            </div>
            <textarea
              ref={textareaRef}
              value={code}
              onChange={(e) => {
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
              disabled={success}
              placeholder="Escribe tu código aquí..."
              spellCheck="false"
              autoCapitalize="none"
              autoComplete="off"
              autoCorrect="off"
              className="flex-1 w-full p-5 bg-transparent text-[#c0caf5] font-mono text-base leading-relaxed resize-none focus:outline-none focus:ring-0 placeholder:text-white/20 disabled:opacity-70 transition-opacity"
            />
            {!success && (
              <QuickSymbolKeyboard language={lesson.language} onInsert={insertSymbol} />
            )}
          </div>
        </div>

        {/* Right Column: Validators & Preview */}
        <div className="w-full lg:w-[450px] flex flex-col gap-4 lg:sticky lg:top-4 shrink-0">
          <div className="bg-bg-secondary border border-border-subtle rounded-2xl p-5">
            <h3 className="text-sm font-bold uppercase tracking-wider text-text-muted mb-4">Requisitos</h3>
            <div className="flex flex-col gap-3">
              {results.map((res, i) => {
                const isShaking = shakingIdxs.includes(i);
                return (
                  <div
                    key={i}
                    className={`flex items-start gap-3 p-3 rounded-xl border transition-all duration-300 ${
                      res.passed
                        ? 'bg-accent-green/10 border-accent-green/30'
                        : isShaking
                          ? 'bg-red-100 border-red-400 animate-shake'
                          : 'bg-bg-tertiary border-transparent'
                    }`}
                  >
                    {res.passed ? (
                      <CheckCircle2 size={20} className="text-accent-green flex-shrink-0 mt-0.5" />
                    ) : (
                      <Circle size={20} className={`flex-shrink-0 mt-0.5 ${isShaking ? 'text-red-500' : 'text-text-muted'}`} />
                    )}
                    <span className={`text-sm leading-tight ${
                      res.passed
                        ? 'text-accent-green font-medium'
                        : isShaking
                          ? 'text-red-600 font-semibold'
                          : 'text-text-secondary'
                    }`}>
                      {res.desc}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {aiFeedback && (
            <div className="rounded-xl border border-accent-red/40 bg-accent-red/10 px-4 py-3 animate-fade-in-up">
              <p className="text-accent-red text-sm font-semibold">🤖 {aiFeedback}</p>
            </div>
          )}

          {!success ? (
            <button
              onClick={handleCheck}
              disabled={evaluating}
              className="mt-auto py-4 rounded-2xl font-bold text-sm tracking-wide bg-indigo-600 text-white hover:bg-indigo-500 active:scale-95 transition-all duration-200 shadow-[0_0_20px_rgba(99,102,241,0.4)] flex justify-center items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              <Play size={18} className="fill-white" />
              {evaluating ? 'EVALUANDO...' : 'EJECUTAR CÓDIGO'}
            </button>
          ) : (
            <div className="mt-auto animate-fade-in-up">
              <div className="bg-accent-green/20 border border-accent-green/50 text-accent-green px-4 py-3 rounded-xl text-sm font-bold text-center mb-4">
                ¡Desafío superado! Eres increíble.
              </div>
              <button
                onClick={handleFinish}
                className="w-full py-4 rounded-2xl font-bold text-sm tracking-wide bg-accent-green text-white hover:bg-green-500 active:scale-95 transition-all duration-200 shadow-[0_0_20px_rgba(16,185,129,0.4)]"
              >
                CONTINUAR
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
