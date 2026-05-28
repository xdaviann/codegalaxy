import { useMemo } from 'react';

const HTML_SYMBOLS = ['<', '>', '/', '=', '"', '-', '!', '_'];
const CSS_SYMBOLS = ['{', '}', ':', ';', '#', '.', '%', '-'];
const JS_SYMBOLS = ['{', '}', '(', ')', '=', '=>', ';', '.'];

export default function QuickSymbolKeyboard({ language, onInsert }) {
  const symbols = useMemo(() => {
    const lang = language?.toUpperCase() || 'HTML';
    if (lang === 'CSS') return CSS_SYMBOLS;
    if (lang === 'JS' || lang === 'JAVASCRIPT') return JS_SYMBOLS;
    return HTML_SYMBOLS;
  }, [language]);

  return (
    <div className="flex gap-1.5 p-2 bg-[#181825] border-t border-white/5 overflow-x-auto no-scrollbar">
      {symbols.map((sym, i) => (
        <button
          key={`${sym}-${i}`}
          onClick={(e) => {
            e.preventDefault(); // Prevent blur
            onInsert(sym);
          }}
          type="button"
          className="flex-shrink-0 min-w-[36px] h-10 rounded-lg bg-white/5 hover:bg-white/15 text-white/90 font-mono text-base border border-white/10 active:scale-95 transition-all flex items-center justify-center"
        >
          {sym}
        </button>
      ))}
    </div>
  );
}
