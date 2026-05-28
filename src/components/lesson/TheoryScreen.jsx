// src/components/lesson/TheoryScreen.jsx
import { useMemo, useState } from "react";
import {
  ChevronRight,
  Globe,
  Tag,
  Layout,
  SplitSquareHorizontal,
  Type,
  AlignLeft,
  Link,
  Lightbulb,
  List,
  ListOrdered,
  ExternalLink,
  Image,
  FormInput,
  TextCursorInput,
  Brain,
  LayoutTemplate,
  Accessibility,
  Palette,
  Crosshair,
  Hash,
  PaintBucket,
  Square,
  BoxSelect,
  StretchHorizontal,
  AlignCenter,
  Rows,
  LayoutGrid,
  Columns,
  Wand2,
  Smartphone,
  Monitor,
  Ruler,
  CheckCircle,
  Code2,
  Play,
  X,
} from "lucide-react";

// ── Icon resolver ────────────────────────────────────────────────────────────
const ICONS = {
  Globe,
  Tag,
  Layout,
  SplitSquareHorizontal,
  Type,
  AlignLeft,
  Link,
  Lightbulb,
  List,
  ListOrdered,
  ExternalLink,
  Image,
  FormInput,
  TextCursorInput,
  Brain,
  LayoutTemplate,
  Accessibility,
  Palette,
  Crosshair,
  Hash,
  PaintBucket,
  Square,
  BoxSelect,
  StretchHorizontal,
  AlignCenter,
  Rows,
  LayoutGrid,
  Columns,
  Wand2,
  Smartphone,
  Monitor,
  Ruler,
  CheckCircle,
  Code2,
};

function TheoryIcon({ name, size = 48, color = "#00d4ff" }) {
  const Icon = ICONS[name] || Code2;
  return <Icon size={size} style={{ color }} strokeWidth={1.5} />;
}

// ── Syntax highlight (mini, client-side) ─────────────────────────────────────
function isHtmlSnippet(code) {
  return /<\/?[a-z][\w-]*[^>]*>/i.test(code || "");
}

function isJavaScriptSnippet(code) {
  return /\b(const|let|var|function|console\.|if\s*\(|for\s*\(|while\s*\(|switch\s*\(|return\b|=>)\b/.test(
    code || "",
  );
}

function buildHtmlPreview(code) {
  if (!code?.trim()) return "";
  if (/<!doctype html>|<html[\s>]/i.test(code)) {
    return code;
  }
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
        color: #111827;
        background: #ffffff;
      }
    </style>
  </head>
  <body>
    ${code}
  </body>
</html>`;
}

function buildJsConsolePreview(code) {
  const safeCode = JSON.stringify(code || "");

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <style>
      :root {
        color-scheme: dark;
      }
      body {
        margin: 0;
        font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
        background: #0f172a;
        color: #e2e8f0;
      }
      .console {
        min-height: 180px;
        max-height: 260px;
        overflow: auto;
        padding: 12px;
      }
      .line {
        white-space: pre-wrap;
        line-height: 1.45;
        margin: 0 0 6px;
      }
      .log { color: #e2e8f0; }
      .info { color: #93c5fd; }
      .warn { color: #facc15; }
      .error { color: #f87171; }
      .return { color: #86efac; }
      .empty { color: #94a3b8; }
    </style>
  </head>
  <body>
    <div id="console" class="console"></div>
    <script>
      const output = document.getElementById("console");

      function safeStringify(value) {
        if (typeof value === "string") return value;
        try {
          return JSON.stringify(value, null, 2);
        } catch {
          return String(value);
        }
      }

      function appendLine(type, values) {
        const row = document.createElement("div");
        row.className = "line " + type;
        row.textContent = values.map(safeStringify).join(" ");
        output.appendChild(row);
      }

      const originalConsole = {
        log: console.log,
        info: console.info,
        warn: console.warn,
        error: console.error,
      };

      ["log", "info", "warn", "error"].forEach((method) => {
        console[method] = (...args) => {
          appendLine(method, args);
          originalConsole[method](...args);
        };
      });

      window.onerror = (message, _source, line, col) => {
        appendLine("error", [String(message) + " (line " + line + ", col " + col + ")"]);
        return true;
      };

      try {
        const userCode = ${safeCode};
        const runner = new Function(userCode);
        const result = runner();
        if (result !== undefined) {
          appendLine("return", ["return:", result]);
        }
      } catch (err) {
        appendLine("error", [err && err.stack ? err.stack : String(err)]);
      }

      if (!output.children.length) {
        appendLine("empty", ["(Sin salida en consola)"]);
      }
    <\/script>
  </body>
</html>`;
}

function CodeBlock({ code, moduleLanguage }) {
  const [showPreview, setShowPreview] = useState(false);
  const canHtmlPreview = isHtmlSnippet(code);
  const canJsPreview = moduleLanguage === "JS" && isJavaScriptSnippet(code);
  const canPreview = canHtmlPreview || canJsPreview;
  const previewMode = canHtmlPreview ? "html" : canJsPreview ? "js" : null;

  const previewDoc = useMemo(() => {
    if (previewMode === "html") return buildHtmlPreview(code);
    if (previewMode === "js") return buildJsConsolePreview(code);
    return "";
  }, [code, previewMode]);

  const lines = code.split("\n");
  return (
    <div className="bg-[#1e1e2e] text-[#c0caf5] rounded-xl p-4 font-mono text-xs overflow-x-auto border border-border shadow-card-sm">
      <div className="flex items-center justify-end mb-3">
        <button
          type="button"
          onClick={() => canPreview && setShowPreview((v) => !v)}
          disabled={!canPreview}
          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-semibold border transition-colors
            ${
              canPreview
                ? "text-[#00d4ff] border-[#00d4ff]/50 bg-[#00d4ff]/10 hover:bg-[#00d4ff]/20"
                : "text-white/40 border-white/10 bg-white/5 cursor-not-allowed"
            }`}
        >
          <Play size={12} />
          {showPreview
            ? "Ocultar resultado"
            : previewMode === "js"
              ? "Abrir consola"
              : "Ejecutar código"}
        </button>
      </div>

      {lines.map((line, i) => (
        <div
          key={i}
          className="leading-relaxed whitespace-pre"
          dangerouslySetInnerHTML={{ __html: highlightLine(line) }}
        />
      ))}

      {showPreview && canPreview && (
        <div className="mt-4 rounded-lg overflow-hidden border border-border-subtle bg-white">
          <div className="px-3 py-1.5 bg-bg-secondary border-b border-border-subtle text-text-secondary text-[11px] font-mono">
            {previewMode === "js" ? "Consola JavaScript" : "Vista previa"}
          </div>
          <iframe
            title="Vista previa del codigo"
            srcDoc={previewDoc}
            sandbox={previewMode === "js" ? "allow-scripts" : ""}
            className="w-full h-56 bg-white"
          />
        </div>
      )}

      {!canPreview && (
        <p className="mt-3 text-[11px] text-text-muted font-mono">
          La vista previa esta disponible para fragmentos HTML y ejemplos de
          JavaScript.
        </p>
      )}
    </div>
  );
}

function escapeHtml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function highlightLine(line) {
  const colors = {
    tag: "#f47067",
    attr: "#e5c07b",
    str: "#98c379",
    comment: "#5c6370",
    keyword: "#c678dd",
  };

  const tokenRegex =
    /(\/\/|\/\*|#)[^\n]*|(&lt;|<)\/?\w[\w-]*|\/>|"[^"]*"|[\w-]+(?==)|\b(display|color|background|padding|margin|border|width|height|font-size|gap|grid-template-columns|grid|flex|flex-direction|justify-content|align-items)\b/g;

  let html = "";
  let lastIndex = 0;
  let match;

  while ((match = tokenRegex.exec(line)) !== null) {
    const token = match[0];
    const start = match.index;

    html += escapeHtml(line.slice(lastIndex, start));

    let color = colors.attr;
    if (/^(\/\/|\/\*|#)/.test(token)) {
      color = colors.comment;
    } else if (/^"[^"]*"$/.test(token)) {
      color = colors.str;
    } else if (/^(&lt;|<)\/?\w[\w-]*$/.test(token) || token === "/>") {
      color = colors.tag;
    } else if (
      /^(display|color|background|padding|margin|border|width|height|font-size|gap|grid-template-columns|grid|flex|flex-direction|justify-content|align-items)$/.test(
        token,
      )
    ) {
      color = colors.keyword;
    }

    html += `<span style="color:${color}">${escapeHtml(token)}</span>`;
    lastIndex = start + token.length;
  }

  html += escapeHtml(line.slice(lastIndex));
  return html;
}

// ── Slide types ───────────────────────────────────────────────────────────────

function WelcomeSlide({ slide }) {
  return (
    <div className="flex flex-col items-center text-center gap-6 py-4 animate-fade-in">
      {/* Hero icon with glow */}
      <div
        className="w-28 h-28 rounded-3xl flex items-center justify-center"
        style={{
          backgroundColor: `${slide.color}18`,
          boxShadow: `0 0 40px ${slide.color}30`,
        }}
      >
        <TheoryIcon name={slide.icon} size={56} color={slide.color} />
      </div>

      <div>
        <h2 className="text-3xl font-bold text-text-primary mb-1">
          {slide.title}
        </h2>
        {slide.subtitle && (
          <p className="text-sm font-mono" style={{ color: slide.color }}>
            {slide.subtitle}
          </p>
        )}
      </div>

      <p className="text-text-secondary text-base leading-relaxed max-w-xs">
        <FormattedText text={slide.body} />
      </p>
    </div>
  );
}

function ConceptSlide({ slide, moduleLanguage }) {
  return (
    <div className="flex flex-col gap-5 animate-fade-in">
      <div className="flex items-start gap-4">
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: `${slide.color}18` }}
        >
          <TheoryIcon name={slide.icon} size={28} color={slide.color} />
        </div>
        <div>
          <h3 className="text-text-primary text-xl font-bold mb-2">
            {slide.title}
          </h3>
          <p className="text-text-secondary text-sm leading-relaxed">
            <FormattedText text={slide.body} />
          </p>
        </div>
      </div>

      {slide.code && (
        <CodeBlock code={slide.code} moduleLanguage={moduleLanguage} />
      )}
      {slide.codeCaption && (
        <p className="text-text-muted text-xs font-mono text-center">
          {slide.codeCaption}
        </p>
      )}
    </div>
  );
}

function CodeSlide({ slide, moduleLanguage }) {
  return (
    <div className="flex flex-col gap-4 animate-fade-in">
      <div className="flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: `${slide.color}18` }}
        >
          <TheoryIcon name={slide.icon} size={22} color={slide.color} />
        </div>
        <h3 className="text-text-primary text-lg font-bold">{slide.title}</h3>
      </div>

      <p className="text-text-secondary text-sm leading-relaxed">
        <FormattedText text={slide.body} />
      </p>

      <CodeBlock code={slide.code} moduleLanguage={moduleLanguage} />

      {slide.codeCaption && (
        <p className="text-text-muted text-xs font-mono text-center italic">
          {slide.codeCaption}
        </p>
      )}
    </div>
  );
}

function CompareSlide({ slide }) {
  return (
    <div className="flex flex-col gap-4 animate-fade-in">
      <div className="flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: `${slide.color}18` }}
        >
          <TheoryIcon name={slide.icon} size={22} color={slide.color} />
        </div>
        <h3 className="text-text-primary text-lg font-bold">{slide.title}</h3>
      </div>

      <p className="text-text-secondary text-sm">
        <FormattedText text={slide.body} />
      </p>

      <div className="grid grid-cols-2 gap-3">
        {/* Left */}
        <div className="bg-bg-secondary rounded-2xl p-4 border border-border-subtle">
          <p
            className="font-mono text-xs font-bold mb-3"
            style={{ color: slide.color }}
          >
            {slide.leftLabel}
          </p>
          <ul className="flex flex-col gap-2">
            {slide.leftItems.map((item, i) => (
              <li
                key={i}
                className="text-text-secondary text-xs flex items-start gap-1.5"
              >
                <span
                  style={{ color: slide.color }}
                  className="mt-0.5 flex-shrink-0"
                >
                  ›
                </span>
                <span className="font-mono">{item}</span>
              </li>
            ))}
          </ul>
        </div>
        {/* Right */}
        <div className="bg-bg-secondary rounded-2xl p-4 border border-border-subtle">
          <p
            className="font-mono text-xs font-bold mb-3"
            style={{ color: slide.color }}
          >
            {slide.rightLabel}
          </p>
          <ul className="flex flex-col gap-2">
            {slide.rightItems.map((item, i) => (
              <li
                key={i}
                className="text-text-secondary text-xs flex items-start gap-1.5"
              >
                <span
                  style={{ color: slide.color }}
                  className="mt-0.5 flex-shrink-0"
                >
                  ›
                </span>
                <span className="font-mono">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function TipSlide({ slide, moduleLanguage }) {
  return (
    <div className="animate-fade-in">
      <div
        className="rounded-2xl p-5 border"
        style={{
          backgroundColor: `${slide.color}10`,
          borderColor: `${slide.color}40`,
        }}
      >
        <div className="flex items-center gap-3 mb-4">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: `${slide.color}20` }}
          >
            <TheoryIcon name={slide.icon} size={22} color={slide.color} />
          </div>
          <div>
            <p
              className="text-xs font-mono uppercase tracking-widest"
              style={{ color: slide.color }}
            >
              Dato clave
            </p>
            <h3 className="text-text-primary text-base font-bold">
              {slide.title}
            </h3>
          </div>
        </div>

        <p className="text-text-secondary text-sm leading-relaxed mb-4">
          <FormattedText text={slide.body} />
        </p>

        {slide.code && (
          <CodeBlock code={slide.code} moduleLanguage={moduleLanguage} />
        )}
      </div>
    </div>
  );
}

// ── Markdown-lite formatter ───────────────────────────────────────────────────
function FormattedText({ text }) {
  // Parse **bold**, *italic*, `code` inline
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`)/g);
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return (
            <strong key={i} className="text-text-primary font-semibold">
              {part.slice(2, -2)}
            </strong>
          );
        }
        if (part.startsWith("*") && part.endsWith("*")) {
          return (
            <em key={i} className="text-text-secondary italic">
              {part.slice(1, -1)}
            </em>
          );
        }
        if (part.startsWith("`") && part.endsWith("`")) {
          return (
            <code
              key={i}
              className="font-mono text-accent-cyan bg-accent-cyan/10 px-1.5 py-0.5 rounded text-xs"
            >
              {part.slice(1, -1)}
            </code>
          );
        }
        return <span key={i}>{part}</span>;
      })}
    </>
  );
}

// ── Dot progress indicator ────────────────────────────────────────────────────
function SlideDots({ total, current, color }) {
  return (
    <div className="flex items-center justify-center gap-1.5">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className="rounded-full transition-all duration-300"
          style={{
            width: i === current ? 20 : 8,
            height: 8,
            backgroundColor: i === current ? color : "#2e3347",
          }}
        />
      ))}
    </div>
  );
}

// ── Main TheoryScreen ─────────────────────────────────────────────────────────
export default function TheoryScreen({ lesson, module, onComplete, onExit, roundNum, totalRounds }) {
  const slides = lesson.theory || [];
  const [idx, setIdx] = useState(0);

  if (!slides.length) {
    onComplete();
    return null;
  }

  const slide = slides[idx];
  const isLast = idx === slides.length - 1;

  const handleNext = () => {
    if (isLast) {
      onComplete();
    } else {
      setIdx((i) => i + 1);
    }
  };

  const renderSlide = () => {
    switch (slide.type) {
      case "welcome":
        return <WelcomeSlide slide={slide} />;
      case "concept":
        return <ConceptSlide slide={slide} moduleLanguage={module.language} />;
      case "code":
        return <CodeSlide slide={slide} moduleLanguage={module.language} />;
      case "compare":
        return <CompareSlide slide={slide} />;
      case "tip":
        return <TipSlide slide={slide} moduleLanguage={module.language} />;
      default:
        return <ConceptSlide slide={slide} moduleLanguage={module.language} />;
    }
  };

  return (
    <div className="min-h-dvh bg-bg-primary flex flex-col">
      {/* Top strip with module color */}
      <div
        className="h-1.5 w-full"
        style={{
          background: `linear-gradient(90deg, ${module.color}, ${module.color}60)`,
        }}
      />

      {/* Header */}
      <div className="flex items-center justify-between px-4 pt-4 pb-2 max-w-lg mx-auto w-full">
        <div className="flex items-center gap-2">
          <button
            id="theory-close-btn"
            type="button"
            onClick={() => onExit?.()}
            className="p-1.5 rounded-lg hover:bg-bg-tertiary text-text-muted hover:text-text-primary transition-colors"
          >
            <X size={18} />
          </button>
          <span
            className="text-xs font-mono font-bold uppercase tracking-widest"
            style={{ color: module.color }}
          >
            {module.language}
          </span>
          <span className="text-text-muted text-xs">·</span>
          <span className="text-text-muted text-xs font-semibold truncate max-w-[130px]">
            {lesson.title}
          </span>
          {roundNum && totalRounds && (
            <>
              <span className="text-text-muted text-xs">·</span>
              <span
                className="text-xs font-mono font-bold px-1.5 py-0.5 rounded-full"
                style={{ backgroundColor: `${module.color}20`, color: module.color }}
              >
                R{roundNum}/{totalRounds}
              </span>
            </>
          )}
        </div>
        <span className="text-text-muted text-xs font-mono">
          {idx + 1}/{slides.length}
        </span>
      </div>

      {/* Slide content — scrollable */}
      <div className="flex-1 px-4 py-4 max-w-lg mx-auto w-full overflow-y-auto">
        <div key={slide.id} className="animate-slide-up">
          {renderSlide()}
        </div>
      </div>

      {/* Bottom: dots + button */}
      <div className="px-4 pb-8 pt-4 max-w-lg mx-auto w-full flex flex-col gap-4">
        <SlideDots total={slides.length} current={idx} color={module.color} />

        <button
          id="theory-next-btn"
          onClick={handleNext}
          className="w-full py-4 rounded-2xl font-bold text-base flex items-center justify-center gap-2 transition-all duration-200 active:scale-95"
          style={{
            backgroundColor: module.color,
            color: "#1a1e2e",
          }}
        >
          {isLast ? (
            <>
              <CheckCircle size={20} />
              ¡A practicar!
            </>
          ) : (
            <>
              Continuar
              <ChevronRight size={20} />
            </>
          )}
        </button>

        {/* Skip theory */}
        {!isLast && (
          <button
            id="theory-skip-btn"
            onClick={onComplete}
            className="text-text-muted text-xs font-semibold text-center hover:text-text-secondary transition-colors"
          >
            Saltar teoría →
          </button>
        )}
      </div>
    </div>
  );
}
