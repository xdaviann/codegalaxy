// src/components/ui/CodeEditor.jsx
import { useState, useRef, useEffect } from 'react';
import QuickSymbolKeyboard from '../lesson/QuickSymbolKeyboard';

const SELF_CLOSING_TAGS = new Set(['img', 'input', 'br', 'hr', 'source', 'meta', 'link', 'area', 'base', 'col', 'embed', 'param', 'track', 'wbr']);

export default function CodeEditor({
  value,
  onChange,
  language = 'HTML',
  filename,
  disabled = false,
  placeholder = 'Escribe tu código aquí...',
  minHeight = '240px'
}) {
  const textareaRef = useRef(null);
  const lineNumbersRef = useRef(null);

  const lines = value.split('\n');
  const displayFilename = filename || (language === 'CSS' ? 'style.css' : 'index.html');

  // Sincronizar scroll entre el textarea y los números de línea
  const handleScroll = () => {
    if (textareaRef.current && lineNumbersRef.current) {
      lineNumbersRef.current.scrollTop = textareaRef.current.scrollTop;
    }
  };

  const handleKeyDown = (e) => {
    if (disabled) return;
    const textarea = textareaRef.current;
    if (!textarea) return;

    const { selectionStart, selectionEnd } = textarea;
    const val = value;

    // 1. Manejo de Tecla TAB (Indentación)
    if (e.key === 'Tab') {
      e.preventDefault();
      if (e.shiftKey) {
        // Des-identar (Shift + Tab)
        const lineStart = val.lastIndexOf('\n', selectionStart - 1) + 1;
        const currentLine = val.substring(lineStart, selectionStart);
        if (currentLine.startsWith('  ')) {
          const newValue = val.substring(0, lineStart) + val.substring(lineStart + 2);
          onChange(newValue);
          setTimeout(() => {
            textarea.selectionStart = Math.max(lineStart, selectionStart - 2);
            textarea.selectionEnd = Math.max(lineStart, selectionEnd - 2);
          }, 0);
        }
      } else {
        // Identar 2 espacios (Tab)
        const newValue = val.substring(0, selectionStart) + '  ' + val.substring(selectionEnd);
        onChange(newValue);
        setTimeout(() => {
          textarea.selectionStart = textarea.selectionEnd = selectionStart + 2;
        }, 0);
      }
      return;
    }

    // 2. Manejo de Tecla ENTER (Indentación inteligente estilo VS Code)
    if (e.key === 'Enter') {
      e.preventDefault();
      const lineStart = val.lastIndexOf('\n', selectionStart - 1) + 1;
      const currentLine = val.substring(lineStart, selectionStart);
      
      const indentMatch = currentLine.match(/^(\s*)/);
      const indent = indentMatch ? indentMatch[1] : '';

      const charBefore = val.charAt(selectionStart - 1);
      const textAfter = val.substring(selectionStart);

      // Si está exactamente entre etiqueta de apertura y cierre (ej: <div>|</div>) o entre llaves ({|}, [|], (|), [|])
      const isBetweenTags = charBefore === '>' && textAfter.startsWith('</');
      const isBetweenBrackets =
        (charBefore === '{' && textAfter.startsWith('}')) ||
        (charBefore === '(' && textAfter.startsWith(')')) ||
        (charBefore === '[' && textAfter.startsWith(']'));

      if (isBetweenTags || isBetweenBrackets) {
        const innerIndent = indent + '  ';
        const insertion = '\n' + innerIndent + '\n' + indent;
        const newValue = val.substring(0, selectionStart) + insertion + val.substring(selectionEnd);
        onChange(newValue);

        setTimeout(() => {
          textarea.selectionStart = textarea.selectionEnd = selectionStart + 1 + innerIndent.length;
        }, 0);
        return;
      }

      // Helper para determinar si se debe agregar indentación extra (+2 espacios)
      const shouldAddExtraIndent = (line) => {
        const trimmed = line.trimEnd();
        if (!trimmed) return false;

        const lastChar = trimmed.slice(-1);

        // CSS / JS llaves, paréntesis o corchetes abiertos ({, (, [)
        if (['{', '(', '['].includes(lastChar)) {
          return true;
        }

        // En HTML si la línea termina en '>'
        if (lastChar === '>') {
          // Si termina en '/>' (auto-cerrada) -> no agregar extra indent
          if (trimmed.endsWith('/>')) return false;

          // Si termina en una etiqueta de cierre '</...>' -> no agregar extra indent
          if (/<\/[a-zA-Z1-6]+>\s*$/.test(trimmed)) return false;

          // Si es una etiqueta completa de una sola línea (ej: <h1>Texto</h1>) -> no agregar extra indent
          const hasOpening = /<[a-zA-Z1-6]+(?:\s+[^>]*)?>/.test(trimmed);
          const hasClosing = /<\/[a-zA-Z1-6]+>/.test(trimmed);
          if (hasOpening && hasClosing) return false;

          // Si es una etiqueta huérfana sin cierre (ej: <img ...>, <br>, <hr>) -> no agregar extra indent
          const tagMatch = trimmed.match(/<([a-zA-Z1-6]+)(?:\s+[^>]*)?>\s*$/);
          if (tagMatch && SELF_CLOSING_TAGS.has(tagMatch[1].toLowerCase())) {
            return false;
          }

          // De lo contrario, es una etiqueta de apertura sola (ej: <div>, <main>) -> sí agregar extra indent
          return true;
        }

        return false;
      };

      // Salto de línea estándar conservando la indentación adecuada
      const extraIndent = shouldAddExtraIndent(currentLine) ? '  ' : '';

      const insertion = '\n' + indent + extraIndent;
      const newValue = val.substring(0, selectionStart) + insertion + val.substring(selectionEnd);
      onChange(newValue);

      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = selectionStart + insertion.length;
      }, 0);
      return;
    }

    // 3. Manejo de Tecla BACKSPACE (Borrado inteligente de pares e indentación)
    if (e.key === 'Backspace' && selectionStart === selectionEnd) {
      const charBefore = val.charAt(selectionStart - 1);
      const charAfter = val.charAt(selectionStart);

      // Eliminar el par completo si está vacío (ej: "|" -> |)
      const isMatchingPair =
        (charBefore === '"' && charAfter === '"') ||
        (charBefore === "'" && charAfter === "'") ||
        (charBefore === '(' && charAfter === ')') ||
        (charBefore === '[' && charAfter === ']') ||
        (charBefore === '{' && charAfter === '}');

      if (isMatchingPair) {
        e.preventDefault();
        const newValue = val.substring(0, selectionStart - 1) + val.substring(selectionStart + 1);
        onChange(newValue);
        setTimeout(() => {
          textarea.selectionStart = textarea.selectionEnd = selectionStart - 1;
        }, 0);
        return;
      }

      // Eliminar bloque de 2 espacios de sangría al presionar Backspace
      const lineStart = val.lastIndexOf('\n', selectionStart - 1) + 1;
      const textBeforeCursor = val.substring(lineStart, selectionStart);
      if (textBeforeCursor.length > 0 && textBeforeCursor.trim() === '' && textBeforeCursor.length % 2 === 0) {
        e.preventDefault();
        const newValue = val.substring(0, selectionStart - 2) + val.substring(selectionStart);
        onChange(newValue);
        setTimeout(() => {
          textarea.selectionStart = textarea.selectionEnd = selectionStart - 2;
        }, 0);
        return;
      }
    }

    // 3. Autocompletado de comillas y llaves/corchetes/paréntesis
    const pairs = {
      '"': '"',
      "'": "'",
      '(': ')',
      '[': ']',
      '{': '}',
    };

    if (pairs[e.key]) {
      const openChar = e.key;
      const closeChar = pairs[openChar];

      // Si hay texto seleccionado, envolver el texto en el par
      if (selectionStart !== selectionEnd) {
        e.preventDefault();
        const selectedText = val.substring(selectionStart, selectionEnd);
        const newValue = val.substring(0, selectionStart) + openChar + selectedText + closeChar + val.substring(selectionEnd);
        onChange(newValue);
        setTimeout(() => {
          textarea.selectionStart = selectionStart + 1;
          textarea.selectionEnd = selectionEnd + 1;
        }, 0);
        return;
      }

      // Si se presiona una comilla sobre la misma comilla ya cerrada, solo saltarla
      const nextChar = val.charAt(selectionStart);
      if (openChar === nextChar && (openChar === '"' || openChar === "'")) {
        e.preventDefault();
        setTimeout(() => {
          textarea.selectionStart = textarea.selectionEnd = selectionStart + 1;
        }, 0);
        return;
      }

      // Insertar par autocompletado
      e.preventDefault();
      const newValue = val.substring(0, selectionStart) + openChar + closeChar + val.substring(selectionEnd);
      onChange(newValue);
      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = selectionStart + 1;
      }, 0);
      return;
    }

    // 4. Autocompletado de etiquetas de cierre HTML en '>'
    if (e.key === '>' && language === 'HTML') {
      const textBefore = val.substring(0, selectionStart);
      const tagMatch = textBefore.match(/<([a-zA-Z1-6]+)(?:\s+[^>]*)?$/);

      if (tagMatch) {
        const tagName = tagMatch[1].toLowerCase();
        if (!SELF_CLOSING_TAGS.has(tagName) && !textBefore.endsWith('/')) {
          e.preventDefault();
          const closingTag = `></${tagName}>`;
          const newValue = val.substring(0, selectionStart) + closingTag + val.substring(selectionEnd);
          onChange(newValue);
          setTimeout(() => {
            textarea.selectionStart = textarea.selectionEnd = selectionStart + 1;
          }, 0);
          return;
        }
      }
    }
  };

  const insertSymbol = (symbol) => {
    if (disabled) return;
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;

    const newValue = value.substring(0, start) + symbol + value.substring(end);
    onChange(newValue);

    setTimeout(() => {
      textarea.focus();
      textarea.selectionStart = textarea.selectionEnd = start + symbol.length;
    }, 0);
  };

  return (
    <div className="flex flex-col rounded-2xl overflow-hidden border-2 border-border-subtle bg-[#1e1e2e] shadow-xl relative w-full">
      {/* VS Code Tab Header */}
      <div className="bg-[#181825] px-4 py-2 border-b border-white/10 flex items-center justify-between select-none">
        <div className="flex items-center gap-2 bg-[#1e1e2e] px-3 py-1 rounded-t-lg border-t-2 border-accent text-xs font-mono text-white/90">
          <span className="w-2 h-2 rounded-full bg-blue-400" />
          {displayFilename}
        </div>
        <div className="flex items-center gap-1.5 opacity-60">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
        </div>
      </div>

      {/* Editor Body with Line Numbers */}
      <div className="flex flex-1 relative font-mono text-sm leading-relaxed overflow-hidden" style={{ minHeight }}>
        {/* Line Numbers Sidebar */}
        <div
          ref={lineNumbersRef}
          className="py-4 pl-3 pr-2 bg-[#181825] text-white/30 text-right select-none font-mono text-xs border-r border-white/5 overflow-hidden min-w-[40px]"
        >
          {lines.map((_, index) => (
            <div key={index} className="h-6">
              {index + 1}
            </div>
          ))}
        </div>

        {/* Textarea Code Input */}
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => {
            let val = e.target.value;
            if (val.includes('\\n')) {
              val = val.replace(/\\n/g, '\n');
            }
            onChange(val);
          }}
          onKeyDown={handleKeyDown}
          onScroll={handleScroll}
          disabled={disabled}
          placeholder={placeholder}
          spellCheck="false"
          autoCapitalize="none"
          autoComplete="off"
          autoCorrect="off"
          className="flex-1 w-full p-4 bg-transparent text-[#c0caf5] font-mono text-sm leading-relaxed resize-none focus:outline-none focus:ring-0 placeholder:text-white/20 disabled:opacity-70 transition-opacity overflow-y-auto"
        />
      </div>

      {/* Quick Symbol Keyboard below for Mobile */}
      {!disabled && (
        <QuickSymbolKeyboard language={language} onInsert={insertSymbol} />
      )}
    </div>
  );
}
