export function RavenFlight() {
  return (
    <div className="fx-layer fx-ravens" aria-hidden="true">
      {[0, 1, 2].map((i) => (
        <svg
          key={i}
          className={`raven raven-${i}`}
          viewBox="0 0 40 20"
          preserveAspectRatio="xMidYMid meet"
        >
          <path
            d="M0 10 Q10 0 20 10 Q30 0 40 10 Q30 6 20 10 Q10 6 0 10 Z"
            fill="#0a0908"
            stroke="#1a1815"
            strokeWidth="0.5"
          />
        </svg>
      ))}
    </div>
  );
}
