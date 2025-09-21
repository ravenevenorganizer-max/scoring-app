// src/components/icons/RacketIcon.jsx
export default function RacketIcon({ className = "w-8 h-8", color = "currentColor" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      fill="none"
      stroke={color}
      strokeWidth="2"
      className={className}
    >
      {/* Gagang */}
      <rect x="28" y="38" width="8" height="20" rx="4" ry="4" fill={color} />
      {/* Kepala raket oval */}
      <ellipse cx="32" cy="22" rx="16" ry="22" stroke={color} fill="none" />
      {/* Jaring dalam raket */}
      <line x1="32" y1="0" x2="32" y2="44" stroke={color} />
      <line x1="16" y1="22" x2="48" y2="22" stroke={color} />
    </svg>
  );
}
