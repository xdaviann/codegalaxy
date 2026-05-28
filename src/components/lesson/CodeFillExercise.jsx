// src/components/lesson/CodeFillExercise.jsx
import { useState } from "react";
import { RotateCcw, Delete, Play, Globe, Code2 } from "lucide-react";

// Build flat renderable code from codeLines
function buildDisplay(codeLines, filledBlanks) {
  return codeLines.map((line, i) => {
    if (line.type === "blank") {
      return {
        ...line,
        filled: filledBlanks[line.blankId] || null,
        lineIdx: i,
      };
    }
    return { ...line, lineIdx: i };
  });
}

// Group into rows by detecting consecutive code/blank items
function groupIntoRows(displayLines) {
  // Each element is on its own visual line
  return displayLines;
}

export default function CodeFillExercise({
  exercise,
  onAnswer,
  moduleLanguage,
}) {
  const totalBlanks = exercise.answers.length;
  const [filledBlanks, setFilledBlanks] = useState({});
  const [usedOptions, setUsedOptions] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);
  const [showPreview, setShowPreview] = useState(false);

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
      (opt, i) => opt === removedVal && usedOptions.includes(i),
    );
    const lastUsedOptIdx = [...usedOptions]
      .reverse()
      .find((i) => exercise.options[i] === removedVal);

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
      (ans, i) => filledBlanks[i]?.trim() === ans.trim(),
    );
    setIsCorrect(correct);
    setSubmitted(true);
    setTimeout(() => {
      onAnswer(correct);
      if (!correct) {
        setTimeout(() => {
          handleReset();
        }, 1000);
      }
    }, 1200);
  };

  const displayLines = buildDisplay(exercise.codeLines, filledBlanks);

  const isHtmlSnippet = (code) => /<\/?[a-z][\w-]*[^>]*>/i.test(code || "");
  const isJavaScriptSnippet = (code) =>
    /\b(const|let|var|function|console\.|if\s*\(|for\s*\(|while\s*\(|switch\s*\(|return\b|=>)\b/.test(
      code || "",
    );

  const buildPreviewDoc = (code) => {
    if (!code?.trim()) return "";
    if (/<!doctype html>|<html[\s>]/i.test(code)) return code;

    return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <style>
      body {
        margin: 0;
        padding: 16px;
        font-family: system-ui, sans-serif;
      }
    </style>
  </head>
  <body>
    ${code}
  </body>
</html>`;
  };

  const buildJsConsoleDoc = (code) => {
    const safeCode = JSON.stringify(code || "");

    return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <style>
      body {
        margin: 0;
        background: #0f172a;
        color: #e2e8f0;
        font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
      }
      #out {
        min-height: 180px;
        max-height: 240px;
        overflow: auto;
        padding: 12px;
      }
      .line { white-space: pre-wrap; line-height: 1.45; margin: 0 0 6px; }
      .log { color: #e2e8f0; }
      .info { color: #93c5fd; }
      .warn { color: #facc15; }
      .error { color: #f87171; }
      .return { color: #86efac; }
      .empty { color: #94a3b8; }
    </style>
  </head>
  <body>
    <div id="out"></div>
    <script>
      const out = document.getElementById("out");

      function toText(value) {
        if (typeof value === "string") return value;
        try {
          return JSON.stringify(value, null, 2);
        } catch {
          return String(value);
        }
      }

      function write(type, args) {
        const row = document.createElement("div");
        row.className = "line " + type;
        row.textContent = args.map(toText).join(" ");
        out.appendChild(row);
      }

      ["log", "info", "warn", "error"].forEach((method) => {
        const original = console[method];
        console[method] = (...args) => {
          write(method, args);
          original(...args);
        };
      });

      window.onerror = (message, _source, line, col) => {
        write("error", [String(message) + " (line " + line + ", col " + col + ")"]);
        return true;
      };

      try {
        const userCode = ${safeCode};
        const run = new Function(userCode);
        const result = run();
        if (result !== undefined) {
          write("return", ["return:", result]);
        }
      } catch (err) {
        write("error", [err && err.stack ? err.stack : String(err)]);
      }

      if (!out.children.length) {
        write("empty", ["(Sin salida en consola)"]);
      }
    <\/script>
  </body>
</html>`;
  };

  const currentCode = exercise.codeLines
    .map((line) => {
      const prefix = line.type === "blank" ? (line.text || "") : "";
      if (line.type === "code") return line.text;
      return prefix + (filledBlanks[line.blankId] || "");
    })
    .join("");

  const canHtmlPreview = filled >= totalBlanks && isHtmlSnippet(currentCode);
  const canJsPreview =
    filled >= totalBlanks &&
    moduleLanguage === "JS" &&
    isJavaScriptSnippet(currentCode);
  const canPreview = canHtmlPreview || canJsPreview;
  const previewMode = canHtmlPreview ? "html" : canJsPreview ? "js" : null;
  const previewDoc =
    previewMode === "js"
      ? buildJsConsoleDoc(currentCode)
      : buildPreviewDoc(currentCode);

  const escapeHtml = (value) =>
    value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

  // Helper: Syntax highlight colors
  const highlightCode = (text) => {
    const tagColor = "#f47067";
    const attrColor = "#e5c07b";
    const strColor = "#98c379";
    const tokenRegex = /(&lt;|<)\/?\w[\w-]*|\/>|[\w-]+(?==)|"[^"]*"/g;

    let result = "";
    let lastIndex = 0;
    let match;

    while ((match = tokenRegex.exec(text)) !== null) {
      const token = match[0];
      const start = match.index;

      result += escapeHtml(text.slice(lastIndex, start));

      let color = attrColor;
      if (/^"[^"]*"$/.test(token)) {
        color = strColor;
      } else if (/^(&lt;|<)\/?\w[\w-]*$/.test(token) || token === "/>") {
        color = tagColor;
      }

      result += `<span style="color:${color}">${escapeHtml(token)}</span>`;
      lastIndex = start + token.length;
    }

    result += escapeHtml(text.slice(lastIndex));

    return result;
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
      <div className="mx-4 rounded-2xl overflow-hidden border border-[#2e3347] bg-[#1e1e2e] flex-1 shadow-card-sm">
        {/* File tab */}
        <div className="flex items-center gap-2 px-4 py-2 bg-[#1a1e2e] border-b border-[#2e3347]">
          <div className="w-5 h-5 rounded flex items-center justify-center">
            {moduleLanguage === "JS" ? (
              <Code2 size={14} className="text-[#f59e0b]" />
            ) : (
              <Globe size={14} className="text-[#3b82f6]" />
            )}
          </div>
          <span className="text-[#c0caf5] text-xs font-mono font-semibold">
            {moduleLanguage === "JS" ? "app.js" : "index.html"}
          </span>
        </div>

        {/* Code content */}
        <div className="p-4 font-mono text-sm whitespace-pre-wrap leading-loose overflow-x-auto text-[#c0caf5]">
          {displayLines.map((line, i) => {
            if (line.type === "code") {
              return (
                <span
                  key={i}
                  dangerouslySetInnerHTML={{ __html: highlightCode(line.text) }}
                />
              );
            }
            if (line.type === "blank") {
              return (
                <span key={i}>
                  {line.text && (
                    <span
                      dangerouslySetInnerHTML={{
                        __html: highlightCode(line.text),
                      }}
                    />
                  )}
                  {line.filled ? (
                    <span
                      className={`inline-block mx-1 px-2 py-0.5 rounded-md text-sm font-mono font-bold align-middle leading-none
                        ${
                          submitted
                            ? isCorrect
                              ? "bg-accent-green/30 text-accent-green border border-accent-green"
                              : "bg-accent-red/30 text-accent-red border border-accent-red"
                            : "bg-accent-cyan/20 text-accent-cyan border border-accent-cyan"
                        }`}
                    >
                      {line.filled}
                    </span>
                  ) : (
                    <span className="inline-block mx-1 w-16 h-[22px] bg-text-muted/20 rounded border border-dashed border-text-muted align-middle" />
                  )}
                </span>
              );
            }
            return null;
          })}
        </div>
      </div>

      {/* Controls */}
      <div className="px-4 py-3 flex items-center gap-2 bg-white border-t border-gray-100">
        <button
          id="reset-btn"
          onClick={handleReset}
          disabled={submitted}
          className={`p-2.5 rounded-xl border-2 transition-all duration-200 ${
            submitted
              ? 'bg-gray-100 text-gray-300 border-gray-200 cursor-not-allowed'
              : 'bg-gray-100 border-gray-300 text-gray-600 hover:bg-gray-200 hover:border-gray-400 hover:text-gray-800 active:scale-95'
          }`}
        >
          <RotateCcw size={18} />
        </button>
        <button
          id="delete-btn"
          onClick={handleDelete}
          disabled={submitted}
          className={`p-2.5 rounded-xl border-2 transition-all duration-200 ${
            submitted
              ? 'bg-gray-100 text-gray-300 border-gray-200 cursor-not-allowed'
              : 'bg-gray-100 border-gray-300 text-gray-600 hover:bg-red-50 hover:border-red-300 hover:text-red-500 active:scale-95'
          }`}
        >
          <Delete size={18} />
        </button>
        <div className="flex-1" />
        <button
          id="preview-btn"
          onClick={() => canPreview && setShowPreview((v) => !v)}
          disabled={!canPreview}
          className={`px-4 py-2.5 rounded-xl border-2 font-mono text-xs font-bold transition-all duration-200 ${
            canPreview
              ? 'border-indigo-400 text-indigo-600 bg-indigo-50 hover:bg-indigo-100 hover:border-indigo-500 active:scale-95'
              : 'border-gray-200 text-gray-400 bg-gray-100 cursor-not-allowed'
          }`}
        >
          {showPreview
            ? 'Ocultar resultado'
            : previewMode === 'js'
              ? 'Abrir consola'
              : 'Ejecutar codigo'}
        </button>

        <button
          id="submit-btn"
          onClick={handleSubmit}
          disabled={filled < totalBlanks || submitted}
          className={`p-2.5 rounded-xl border-2 transition-all duration-200 ${
            filled >= totalBlanks && !submitted
              ? 'bg-indigo-600 border-indigo-500 text-white shadow-[0_0_16px_rgba(99,102,241,0.35)] active:scale-95 hover:bg-indigo-500'
              : 'bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          <Play
            size={20}
            className={filled >= totalBlanks && !submitted ? 'fill-white' : ''}
          />
        </button>
      </div>

      {showPreview && canPreview && (
        <div className="mx-4 mb-3 rounded-2xl overflow-hidden border border-border-subtle bg-white">
          <div className="px-3 py-2 bg-bg-secondary border-b border-border-subtle text-text-secondary text-xs font-mono">
            {previewMode === "js"
              ? "Consola JavaScript"
              : "Vista previa del codigo"}
          </div>
          <iframe
            title="Vista previa del ejercicio"
            srcDoc={previewDoc}
            sandbox={previewMode === "js" ? "allow-scripts" : ""}
            className="w-full h-56 bg-white"
          />
        </div>
      )}

      {!canPreview && (
        <p className="px-4 pb-1 text-[11px] text-text-muted font-mono">
          Completa todos los espacios para habilitar la vista previa o consola.
        </p>
      )}

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
                  ${
                    used
                      ? "border-transparent bg-bg-tertiary text-transparent cursor-not-allowed"
                      : "border-accent-cyan text-accent-cyan bg-accent-cyan/10 hover:bg-accent-cyan/20"
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
