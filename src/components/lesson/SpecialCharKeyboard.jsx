// src/components/lesson/SpecialCharKeyboard.jsx
import { Text } from "lucide-react";

export default function SpecialCharKeyboard({ onInsertChar }) {
  const charGroups = [
    {
      label: "Paréntesis",
      chars: ["(", ")", "{", "}", "[", "]"],
    },
    {
      label: "Operadores",
      chars: ["=", "==", "===", "+", "-", "*", "/", "%", "!", "&&", "||"],
    },
    {
      label: "Símbolos",
      chars: [";", ":", ".", ",", "<", ">", "?", "@", "#", "&", "|"],
    },
    {
      label: "Comillas",
      chars: ['"', "'", "`"],
    },
  ];

  const handleCharClick = (char) => {
    onInsertChar(char);
  };

  return (
    <div className="mt-3 p-3 bg-bg-tertiary rounded-xl border border-border-subtle">
      <div className="flex items-center gap-2 mb-2">
        <Text size={14} className="text-text-muted" />
        <p className="text-text-muted text-xs font-mono uppercase tracking-widest">
          Caracteres especiales
        </p>
      </div>

      <div className="space-y-2">
        {charGroups.map((group, groupIdx) => (
          <div key={groupIdx}>
            <p className="text-[10px] text-text-muted/70 font-mono mb-1">
              {group.label}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {group.chars.map((char) => (
                <button
                  key={char}
                  type="button"
                  onClick={() => handleCharClick(char)}
                  title={`Insertar ${char}`}
                  className="px-2 py-1.5 rounded-lg bg-bg-secondary border border-border-subtle text-text-secondary hover:text-text-primary font-mono text-xs font-semibold transition-all hover:bg-accent-cyan/20 hover:border-accent-cyan/60 active:scale-95"
                >
                  {char}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
