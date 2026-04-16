// src/components/lesson/CodeFillExercise.jsx
import { useState } from 'react';
import { RotateCcw, Delete, Play, Globe } from 'lucide-react';

// Build flat renderable code from codeLines
function buildDisplay(codeLines, filledBlanks) {
  return codeLines.map((line, i) => {
    if (line.type === 'blank') {
      return { ...line, filled: filledBlanks[line.blankId] || null, lineIdx: i };
    }
    return { ...line, lineIdx: i };
  });
}

// Group into rows by detecting consecutive code/blank items
function groupIntoRows(displayLines) {
  // Each element is on its own visual line
  return displayLines;
}

export default function CodeFillExercise({ exercise, onAnswer }) {
  const totalBlanks = exercise.answers.length;
  const [filledBlanks, setFilledBlanks] = useState({});
  const [usedOptions, setUsedOptions] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);

  const filled = Object.keys(filledBlanks).length;

  const handleOptionClick = (option, optIdx) => {
    if (usedOptions.includes(optIdx)) return;
    const nextBlankId = Object.keys(filledBlanks).length;
    if (nextBlankId >= totalBlanks) return;

    setFilledBlanks((prev) => ({ ...prev, [nextBlankId]: option }));
    setUsedOptions((prev) => [...prev, optIdx]);
  };

  const handleReset = () => {
    setFilledBlanks({});
    setUsedOptions([]);
    setSubmitted(false);
    setIsCorrect(null);
  };

  const handleDelete = () => {
    const keys = Object.keys(filledBlanks).map(Number);
    if (keys.length === 0) return;
    const lastKey = Math.max(...keys);
    const removedVal = filledBlanks[lastKey];

    // Find the option index to un-use
    const optIdx = exercise.options.findIndex(
      (opt, i) => opt === removedVal && usedOptions.includes(i)
    );
    const lastUsedOptIdx = [...usedOptions].reverse().find(
      (i) => exercise.options[i] === removedVal
    );

    setFilledBlanks((prev) => {
      const next = { ...prev };
      delete next[lastKey];
      return next;
    });
    setUsedOptions((prev) => {
      const idx = prev.lastIndexOf(lastUsedOptIdx ?? optIdx);
      const next = [...prev];
      if (idx !== -1) next.splice(idx, 1);
      return next;
    });
  };

  const handleSubmit = () => {
    if (filled < totalBlanks) return;
    const correct = exercise.answers.every(
      (ans, i) => filledBlanks[i]?.trim() === ans.trim()
    );
    setIsCorrect(correct);
    setSubmitted(true);
    setTimeout(() => {
      onAnswer(correct);
      handleReset();
    }, 1200);
  };

  const displayLines = buildDisplay(exercise.codeLines, filledBlanks);

  // Helper: Syntax highlight colors
  const highlightCode = (text) => {
    const tagColor = '#f47067';
    const attrColor = '#e5c07b';
    const strColor = '#98c379';
    const comment = '#5c6370';
    const keyword = '#c678dd';

    return text
      .replace(/(&lt;|<)(\/?)(\w+)/g, (_, open, slash, tag) =>
        `<span style="color:${tagColor}">${open}${slash}${tag}</span>`)
      .replace(/([\w-]+)=/g, (_, attr) =>
        `<span style="color:${attrColor}">${attr}</span>=`)
      .replace(/"([^"]*)"/g, (_, v) =>
        `<span style="color:${strColor}">"${v}"</span>`)
      .replace(/\/>/g, `<span style="color:${tagColor}">\/></span>`);
  };

  return (
    <div className="flex flex-col h-full animate-fade-in">
      {/* Instruction */}
      <div className="px-4 pb-4">
        <p className="text-text-primary font-mono text-sm leading-relaxed">
          {exercise.instruction}
        </p>
      </div>

      {/* Code block */}
      <div className="mx-4 rounded-2xl overflow-hidden border border-border-subtle bg-bg-secondary flex-1">
        {/* File tab */}
        <div className="flex items-center gap-2 px-4 py-2 bg-bg-tertiary border-b border-border-subtle">
          <div className="w-5 h-5 rounded flex items-center justify-center">
            <Globe size={14} className="text-accent-orange" />
          </div>
          <span className="text-text-secondary text-xs font-mono">index.html</span>
        </div>

        {/* Code content */}
        <div className="p-4 font-mono text-sm overflow-x-auto">
          {displayLines.map((line, i) => (
            <div key={i} className="flex items-center min-h-[24px]">
              {line.type === 'code' && (
                <span
                  className="text-text-secondary whitespace-pre"
                  dangerouslySetInnerHTML={{ __html: highlightCode(line.text) }}
                />
              )}
              {line.type === 'blank' && (
                <>
                  {line.filled ? (
                    <span
                      className={`inline-block px-2 py-0.5 rounded-lg text-sm font-mono font-bold
                        ${submitted
                          ? isCorrect
                            ? 'bg-accent-green/30 text-accent-green border border-accent-green'
                            : 'bg-accent-red/30 text-accent-red border border-accent-red'
                          : 'bg-accent-cyan/20 text-accent-cyan border border-accent-cyan'
                        }`}
                    >
                      {line.filled}
                    </span>
                  ) : (
                    <span className="inline-block w-16 h-6 bg-text-muted/20 rounded border border-dashed border-text-muted" />
                  )}
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="px-4 py-3 flex items-center gap-3">
        <button
          id="reset-btn"
          onClick={handleReset}
          className="p-3 rounded-xl bg-bg-tertiary border border-border-subtle text-text-muted hover:text-text-primary transition-colors"
        >
          <RotateCcw size={18} />
        </button>
        <button
          id="delete-btn"
          onClick={handleDelete}
          className="p-3 rounded-xl bg-bg-tertiary border border-border-subtle text-text-muted hover:text-text-primary transition-colors"
        >
          <Delete size={18} />
        </button>
        <div className="flex-1" />
        <button
          id="submit-btn"
          onClick={handleSubmit}
          disabled={filled < totalBlanks || submitted}
          className={`p-3 rounded-xl transition-all duration-200
            ${filled >= totalBlanks && !submitted
              ? 'bg-accent-cyan text-bg-primary shadow-cyan-glow active:scale-95'
              : 'bg-bg-tertiary text-text-muted cursor-not-allowed'
            }`}
        >
          <Play size={20} className={filled >= totalBlanks && !submitted ? 'fill-bg-primary' : ''} />
        </button>
      </div>

      {/* Option chips */}
      <div className="px-4 pb-4">
        <div className="flex flex-wrap gap-2">
          {exercise.options.map((opt, idx) => {
            const used = usedOptions.includes(idx);
            return (
              <button
                key={idx}
                id={`code-option-${idx}`}
                onClick={() => handleOptionClick(opt, idx)}
                disabled={used || submitted}
                className={`
                  px-4 py-2.5 rounded-xl border-2 font-mono text-sm font-semibold
                  transition-all duration-200 active:scale-95
                  ${used
                    ? 'border-transparent bg-bg-tertiary text-transparent cursor-not-allowed'
                    : 'border-accent-cyan text-accent-cyan bg-accent-cyan/10 hover:bg-accent-cyan/20'
                  }
                `}
              >
                {opt}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
