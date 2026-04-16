// src/components/ui/ModuleIcon.jsx
// Maps module language IDs to Lucide icon components
import { Globe, Palette, Zap, Code2 } from 'lucide-react';

const iconMap = {
  HTML: Globe,
  CSS: Palette,
  JS: Zap,
  default: Code2,
};

export default function ModuleIcon({ language, size = 24, color, className = '' }) {
  const Icon = iconMap[language] || iconMap.default;
  return <Icon size={size} className={className} style={color ? { color } : undefined} />;
}
