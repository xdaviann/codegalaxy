import { useState } from 'react';
import { MousePointer2 } from 'lucide-react';

export default function CodeHighlightExercise({ exercise, onAnswer }) {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  // Parse code: "border: [[2px]] [[solid]] [[red]];"
  // into parts: [{text: "border: ", isToken: false}, {text: "2px", isToken: true, index: 0}, ...]
  const parts = [];
  let currentStr = exercise.code;
  let tokenIdx = 0;
  
  while (currentStr.length > 0) {
    const startMatch = currentStr.indexOf('[[');
    if (startMatch === -1) {
      parts.push({ text: currentStr, isToken: false });
      break;
    }
    
    // Add text before token
    if (startMatch > 0) {
      parts.push({ text: currentStr.slice(0, startMatch), isToken: false });
    }
    
    const endMatch = currentStr.indexOf(']]', startMatch);
    if (endMatch === -1) {
      // Malformed, just dump the rest
      parts.push({ text: currentStr.slice(startMatch), isToken: false });
      break;
    }
    
    const tokenText = currentStr.slice(startMatch + 2, endMatch);
    parts.push({ text: tokenText, isToken: true, index: tokenIdx++ });
    
    currentStr = currentStr.slice(endMatch + 2);
  }

  // Find linked pairs (e.g. <body> and </body>, or { and })
  const pairs = {};
  if (exercise.linkPairs !== false) {
    const stack = [];
    for (const p of parts) {
      if (!p.isToken) continue;
      
      const text = p.text.trim();
      const openMatch = text.match(/^<([a-zA-Z0-9]+)([^>]*)>$/);
      const closeMatch = text.match(/^<\/([a-zA-Z0-9]+)>$/);
      
      if (openMatch && !text.endsWith('/>')) {
        stack.push({ tag: openMatch[1].toLowerCase(), index: p.index });
      } else if (closeMatch) {
        const tag = closeMatch[1].toLowerCase();
        for (let i = stack.length - 1; i >= 0; i--) {
          if (stack[i].tag === tag) {
            pairs[stack[i].index] = p.index;
            pairs[p.index] = stack[i].index;
            stack.splice(i, 1);
            break;
          }
        }
      } else if (text === '{') {
        stack.push({ tag: 'curly', index: p.index });
      } else if (text === '}') {
        for (let i = stack.length - 1; i >= 0; i--) {
          if (stack[i].tag === 'curly') {
            pairs[stack[i].index] = p.index;
            pairs[p.index] = stack[i].index;
            stack.splice(i, 1);
            break;
          }
        }
      }
    }
  }

  const handleTap = (idx) => {
    if (submitted) return;
    if (idx === selectedIndex || idx === pairs[selectedIndex]) {
      setSelectedIndex(null);
    } else {
      setSelectedIndex(idx);
    }
  };

  const handleCheck = () => {
    if (selectedIndex === null || submitted) return;
    setSubmitted(true);
    
    const correctIndices = Array.isArray(exercise.correctIndex) ? exercise.correctIndex : [exercise.correctIndex];
    const isCorrect = 
      correctIndices.includes(selectedIndex) || 
      correctIndices.includes(pairs[selectedIndex]);
    
    setTimeout(() => {
      onAnswer({
        isCorrect,
        explanation: isCorrect 
          ? '¡Excelente! Has identificado la parte correcta.' 
          : 'Esa no es la parte correcta del código. Fíjate bien en lo que se pide.'
      });
      if (!isCorrect) {
        setTimeout(() => {
          setSubmitted(false);
          setSelectedIndex(null);
        }, 1000);
      }
    }, 1500);
  };

  return (
    <div className="flex flex-col gap-5 animate-fade-in-up pt-2">
      <div className="card p-4 shadow-card-md flex items-start gap-3 border border-border">
        <div className="w-9 h-9 rounded-xl bg-accent-light flex items-center justify-center flex-shrink-0">
          <MousePointer2 size={18} className="text-accent" />
        </div>
        <p className="text-text-primary font-semibold text-sm pt-1">
          {exercise.instruction || 'Toca la parte correcta del código.'}
        </p>
      </div>

      <div className="rounded-2xl overflow-hidden border border-border shadow-card bg-[#1e1e2e] p-5 relative">
        {/* Terminal dots */}
        <div className="flex gap-1.5 mb-4 opacity-50">
          <div className="w-2.5 h-2.5 rounded-full bg-accent-red" />
          <div className="w-2.5 h-2.5 rounded-full bg-accent-orange" />
          <div className="w-2.5 h-2.5 rounded-full bg-accent-green" />
        </div>
        
        <div className="font-mono text-[13px] leading-loose whitespace-pre-wrap text-[#c0caf5]">
          {parts.map((p, i) => {
            if (!p.isToken) {
              return <span key={i}>{p.text}</span>;
            }
            
            const correctIndices = Array.isArray(exercise.correctIndex) ? exercise.correctIndex : [exercise.correctIndex];
            const isSelected = selectedIndex === p.index || pairs[selectedIndex] === p.index;
            const isCorrectAnswer = correctIndices.includes(p.index) || correctIndices.some(ci => pairs[ci] === p.index);
            const showRight = submitted && isSelected && isCorrectAnswer;
            const showWrong = submitted && isSelected && !isCorrectAnswer;
            
            return (
              <button
                key={i}
                onClick={() => handleTap(p.index)}
                disabled={submitted}
                className={`inline-block px-1.5 py-0.5 -my-0.5 rounded transition-all duration-200 border-b-2 active:scale-95 ${
                  showRight ? 'bg-[#22c55e] text-[#1a1e2e] border-[#16a34a] font-bold shadow-[0_0_15px_rgba(34,197,94,0.4)]' :
                  showWrong ? 'bg-[#ef4444] text-[#1a1e2e] border-[#dc2626] font-bold animate-shake' :
                  isSelected ? 'bg-[#00d4ff] text-[#1a1e2e] border-[#009bbf] font-bold shadow-[0_0_10px_rgba(0,212,255,0.3)] transform -translate-y-0.5' :
                  'bg-[#2e3347] text-[#e2e8f0] border-[#3e445b] hover:bg-[#3e445b]'
                }`}
              >
                {p.text}
              </button>
            );
          })}
        </div>
      </div>

      <button
        onClick={handleCheck}
        disabled={selectedIndex === null || submitted}
        className={`w-full py-4 rounded-2xl font-bold text-sm transition-all duration-200 mt-2 ${
          selectedIndex !== null && !submitted
            ? 'btn-primary'
            : 'bg-bg-tertiary text-text-muted cursor-not-allowed'
        }`}
      >
        {submitted ? 'Comprobando...' : 'Comprobar'}
      </button>
    </div>
  );
}
