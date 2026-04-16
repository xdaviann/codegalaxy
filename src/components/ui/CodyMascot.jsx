// src/components/ui/CodyMascot.jsx
export default function CodyMascot({ size = 80, animate = false }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={animate ? 'animate-float' : ''}
    >
      {/* Antenna */}
      <rect x="37" y="2" width="6" height="10" rx="3" fill="#9fa3b1" />
      <circle cx="40" cy="2" r="4" fill="#00d4ff" />

      {/* Head */}
      <rect x="12" y="12" width="56" height="44" rx="12" fill="#2a2f42" stroke="#3d4460" strokeWidth="2" />

      {/* Eyes background */}
      <rect x="20" y="22" width="18" height="18" rx="5" fill="#1a1e2e" />
      <rect x="42" y="22" width="18" height="18" rx="5" fill="#1a1e2e" />

      {/* Eye glow */}
      <rect x="22" y="24" width="14" height="14" rx="4" fill="#00d4ff" opacity="0.9" />
      <rect x="44" y="24" width="14" height="14" rx="4" fill="#00d4ff" opacity="0.9" />

      {/* Eye highlights */}
      <rect x="24" y="26" width="5" height="5" rx="1" fill="white" opacity="0.8" />
      <rect x="46" y="26" width="5" height="5" rx="1" fill="white" opacity="0.8" />

      {/* Mouth */}
      <rect x="26" y="46" width="28" height="5" rx="2.5" fill="#9fa3b1" opacity="0.5" />
      <rect x="28" y="47" width="8" height="3" rx="1.5" fill="#00d4ff" />
      <rect x="44" y="47" width="8" height="3" rx="1.5" fill="#00d4ff" />

      {/* Ears */}
      <rect x="4" y="22" width="10" height="18" rx="4" fill="#2a2f42" stroke="#3d4460" strokeWidth="2" />
      <rect x="66" y="22" width="10" height="18" rx="4" fill="#2a2f42" stroke="#3d4460" strokeWidth="2" />
      <rect x="6" y="25" width="6" height="6" rx="2" fill="#00d4ff" opacity="0.6" />
      <rect x="68" y="25" width="6" height="6" rx="2" fill="#00d4ff" opacity="0.6" />

      {/* Body */}
      <rect x="20" y="58" width="40" height="18" rx="8" fill="#2a2f42" stroke="#3d4460" strokeWidth="2" />
      <circle cx="32" cy="67" r="3" fill="#00d4ff" opacity="0.7" />
      <circle cx="40" cy="67" r="3" fill="#00d4ff" opacity="0.4" />
      <circle cx="48" cy="67" r="3" fill="#00d4ff" opacity="0.7" />
    </svg>
  );
}
