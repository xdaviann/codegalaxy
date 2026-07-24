import { useState, useEffect, useRef } from 'react';
import { X, CheckCircle2, Circle, Play, Trophy } from 'lucide-react';
import CodeEditor from '../ui/CodeEditor';
import { evaluateChallengeWithAI } from '../../services/aiService';

export default function ChallengeScreen({ lesson, onClose, onComplete }) {
  const [code, setCode] = useState(lesson.startingCode || '');
  const [results, setResults] = useState([]);
  const [success, setSuccess] = useState(false);
  const [evaluating, setEvaluating] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [shakingIdxs, setShakingIdxs] = useState([]);
  const textareaRef = useRef(null);

  const insertSymbol = (symbol) => {
    if (success || evaluating) return;
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
    setEvaluating(false);
    setFeedbackMessage('');
  }, [lesson]);

  const handleCheck = async () => {
    if (!lesson.validators || evaluating || success || code.trim() === '') return;
    setEvaluating(true);
    setFeedbackMessage('');

    let newResults = [];
    let allPassed = false;

    // Intentar evaluación inteligente con IA primero
    const aiRes = await evaluateChallengeWithAI({
      title: lesson.title,
      instruction: lesson.instruction,
      requirements: lesson.validators.map(v => v.description),
      userCode: code,
      language: lesson.language
    });

    if (aiRes && Array.isArray(aiRes.evaluations)) {
      newResults = lesson.validators.map((v, i) => {
        const ev = aiRes.evaluations.find(e => e.index === i);
        return {
          passed: ev ? Boolean(ev.passed) : Boolean(aiRes.allPassed),
          desc: v.description,
          reason: ev?.reason || ''
        };
      });
      allPassed = Boolean(aiRes.allPassed);
      if (aiRes.generalFeedback) {
        setFeedbackMessage(aiRes.generalFeedback);
      }
    } else {
      // Fallback a validadores locales si la IA no responde
      const parser = new DOMParser();
      const isCSS = lesson.language === 'CSS';
      let doc = isCSS 
        ? parser.parseFromString(`<html><head><style>${code}</style></head><body>${lesson.dummyHtml || ''}</body></html>`, 'text/html')
        : parser.parseFromString(code, 'text/html');

      newResults = lesson.validators.map(validator => {
        try {
          const passed = validator.test(doc, code);
          return { passed, desc: validator.description };
        } catch (err) {
          return { passed: false, desc: validator.description };
        }
      });
      allPassed = newResults.every(r => r.passed);
    }

    setResults(newResults);
    setEvaluating(false);

    import('../../utils/audio').then(({ playCorrectSound, playWrongSound }) => {
      if (allPassed) {
        setSuccess(true);
        playCorrectSound();
      } else {
        const failedIdxs = newResults.map((r, i) => r.passed ? null : i).filter(i => i !== null);
        setShakingIdxs(failedIdxs);
        setTimeout(() => setShakingIdxs([]), 800);
        playWrongSound();
      }
    });
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

          <div className="flex-1 flex flex-col min-h-[320px]">
            <CodeEditor
              value={code}
              onChange={setCode}
              language={lesson.language}
              disabled={success || evaluating}
              placeholder="Escribe tu código aquí..."
              minHeight="320px"
            />
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
                  <div key={i} className="flex flex-col gap-1">
                    <div
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
                    {res.reason && !res.passed && (
                      <span className="text-[11px] text-red-500 px-3 font-medium">
                        ↳ {res.reason}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {feedbackMessage && !success && (
            <div className="bg-amber-50 border border-amber-200 text-amber-900 p-4 rounded-xl text-xs font-medium leading-relaxed animate-fade-in">
              💡 <span className="font-bold">Sugerencia de Cody:</span> {feedbackMessage}
            </div>
          )}

          {!success ? (
            <button
              onClick={handleCheck}
              disabled={code.trim() === '' || evaluating}
              className={`mt-auto py-4 rounded-2xl font-bold text-sm tracking-wide bg-indigo-600 text-white hover:bg-indigo-500 active:scale-95 transition-all duration-200 shadow-[0_0_20px_rgba(99,102,241,0.4)] flex justify-center items-center gap-2 ${
                evaluating || code.trim() === '' ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              <Play size={18} className="fill-white" />
              {evaluating ? 'EVALUANDO CON IA...' : 'EJECUTAR CÓDIGO'}
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
